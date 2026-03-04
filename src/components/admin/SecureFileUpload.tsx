import React, { useRef, useState, useCallback } from 'react';
import { Upload, AlertTriangle, X, FileImage, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Security config                                                    */
/* ------------------------------------------------------------------ */

const ALLOWED_TYPES: Record<string, string[]> = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
  'image/gif': ['.gif'],
  'video/mp4': ['.mp4'],
  'video/webm': ['.webm'],
};

const MAGIC_BYTES: Record<string, number[][]> = {
  'image/jpeg': [[0xFF, 0xD8, 0xFF]],
  'image/png': [[0x89, 0x50, 0x4E, 0x47]],
  'image/webp': [[0x52, 0x49, 0x46, 0x46]], // RIFF
  'image/gif': [[0x47, 0x49, 0x46, 0x38]], // GIF8
  'video/mp4': [[0x00, 0x00, 0x00], [0x66, 0x74, 0x79, 0x70]], // ftyp (offset 4)
  'video/webm': [[0x1A, 0x45, 0xDF, 0xA3]],
};

/** Dangerous extensions — blocked unconditionally */
const BLOCKED_EXTENSIONS = new Set([
  '.php', '.phtml', '.phar', '.php3', '.php4', '.php5', '.phps',
  '.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs',
  '.sh', '.bash', '.zsh', '.bat', '.cmd', '.ps1',
  '.exe', '.dll', '.bin', '.com', '.msi', '.scr',
  '.py', '.rb', '.pl', '.cgi', '.asp', '.aspx', '.jsp',
  '.htaccess', '.htpasswd', '.svg', '.html', '.htm', '.xml',
  '.shtml', '.shtm', '.swf',
]);

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_VIDEO_SIZE = 20 * 1024 * 1024; // 20MB

/* ------------------------------------------------------------------ */
/*  Validation helpers                                                 */
/* ------------------------------------------------------------------ */

/** Extract ALL extensions from a filename (catches double-extension attacks) */
function getAllExtensions(name: string): string[] {
  const parts = name.split('.');
  if (parts.length <= 1) return [];
  return parts.slice(1).map(ext => `.${ext.toLowerCase()}`);
}

function getExtension(name: string): string {
  const dot = name.lastIndexOf('.');
  return dot >= 0 ? name.slice(dot).toLowerCase() : '';
}

/** Check if ANY extension in the filename is blocked (prevents double-extension bypass) */
function hasBlockedExtension(name: string): boolean {
  const allExts = getAllExtensions(name);
  return allExts.some(ext => BLOCKED_EXTENSIONS.has(ext));
}

function isExtensionAllowed(name: string): boolean {
  const ext = getExtension(name);
  return Object.values(ALLOWED_TYPES).flat().includes(ext);
}

/** Reject filenames with multiple extensions (e.g. image.jpg.php) */
function hasDoubleExtension(name: string): boolean {
  const allExts = getAllExtensions(name);
  return allExts.length > 1;
}

function isMimeAllowed(mime: string): boolean {
  return mime in ALLOWED_TYPES;
}

function extensionMatchesMime(name: string, mime: string): boolean {
  const ext = getExtension(name);
  const allowedExts = ALLOWED_TYPES[mime];
  return allowedExts ? allowedExts.includes(ext) : false;
}

async function validateMagicBytes(file: File): Promise<boolean> {
  const buffer = await file.slice(0, 12).arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const mime = file.type;
  const patterns = MAGIC_BYTES[mime];

  if (!patterns) return false;

  // For mp4, check ftyp at offset 4
  if (mime === 'video/mp4') {
    const ftypBytes = [bytes[4], bytes[5], bytes[6], bytes[7]];
    return ftypBytes[0] === 0x66 && ftypBytes[1] === 0x74 && ftypBytes[2] === 0x79 && ftypBytes[3] === 0x70;
  }

  return patterns.some(pattern =>
    pattern.every((byte, i) => bytes[i] === byte)
  );
}

function isFileSizeValid(file: File): boolean {
  const isVideo = file.type.startsWith('video/');
  return file.size <= (isVideo ? MAX_VIDEO_SIZE : MAX_FILE_SIZE);
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Generate a cryptographically random filename (never use user-provided names for storage) */
function generateSafeFilename(originalName: string): string {
  const ext = getExtension(originalName);
  const randomPart = crypto.randomUUID().replace(/-/g, '');
  return `${randomPart}${ext}`;
}

/** Strip metadata from images by re-encoding through canvas */
async function stripImageMetadata(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => {
      // Sanity check dimensions (anti-decompression bomb)
      if (img.width > 8000 || img.height > 8000) {
        reject(new Error('Imagem com dimensões excessivas (máx 8000×8000px).'));
        return;
      }
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) { reject(new Error('Erro ao processar imagem.')); return; }
      ctx.drawImage(img, 0, 0);
      // Re-encode as the same type (strips EXIF/metadata)
      const outputMime = file.type === 'image/png' ? 'image/png' : file.type === 'image/webp' ? 'image/webp' : 'image/jpeg';
      const quality = outputMime === 'image/png' ? undefined : 0.92;
      const dataUrl = canvas.toDataURL(outputMime, quality);
      URL.revokeObjectURL(img.src);
      resolve(dataUrl);
    };
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error('Arquivo corrompido ou não é uma imagem válida.'));
    };
    img.src = URL.createObjectURL(file);
  });
}

/** Check file content for suspicious script patterns */
function scanForScriptContent(bytes: Uint8Array): boolean {
  // Convert first 1KB to string and check for script signatures
  const textSlice = new TextDecoder('utf-8', { fatal: false }).decode(bytes.slice(0, 1024));
  const lower = textSlice.toLowerCase();
  const suspicious = [
    '<?php', '<%', '<script', 'eval(', 'exec(', 'system(',
    '#!/bin', 'import os', 'require(', 'child_process',
  ];
  return suspicious.some(sig => lower.includes(sig));
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface SecureFileUploadProps {
  onFileAccepted: (dataUrl: string, file: File) => void;
  multiple?: boolean;
  accept?: string;
  className?: string;
  compact?: boolean;
}

export default function SecureFileUpload({
  onFileAccepted,
  multiple = false,
  accept,
  className,
  compact = false,
}: SecureFileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const acceptStr = accept || Object.entries(ALLOWED_TYPES)
    .flatMap(([mime, exts]) => [mime, ...exts])
    .join(',');

  const processFile = useCallback(async (file: File) => {
    setError(null);

    // 0. Block dangerous extensions (anti-webshell)
    if (hasBlockedExtension(file.name)) {
      setError('Tipo de arquivo bloqueado por segurança. Extensão executável ou perigosa detectada.');
      return false;
    }

    // 0b. Block double extensions (e.g. image.jpg.php)
    if (hasDoubleExtension(file.name)) {
      setError('Arquivo com múltiplas extensões não é permitido (ex: foto.jpg.php). Possível tentativa de bypass.');
      return false;
    }

    // 1. Extension allowlist check
    if (!isExtensionAllowed(file.name)) {
      setError(`Extensão não permitida: ${getExtension(file.name)}. Use JPG, PNG, WebP, GIF, MP4 ou WebM.`);
      return false;
    }

    // 2. MIME type allowlist check
    if (!isMimeAllowed(file.type)) {
      setError(`Tipo de arquivo inválido: ${file.type}`);
      return false;
    }

    // 3. Extension ↔ MIME consistency (prevents extension spoofing)
    if (!extensionMatchesMime(file.name, file.type)) {
      setError('Extensão do arquivo não corresponde ao conteúdo. Possível manipulação detectada.');
      return false;
    }

    // 4. File size limit
    if (!isFileSizeValid(file)) {
      const isVideo = file.type.startsWith('video/');
      setError(`Arquivo muito grande (${formatSize(file.size)}). Máximo: ${isVideo ? '20MB' : '5MB'}.`);
      return false;
    }

    // 5. Magic bytes (binary header) validation
    const magicValid = await validateMagicBytes(file);
    if (!magicValid) {
      setError('Conteúdo do arquivo não corresponde ao tipo declarado. Upload bloqueado por segurança.');
      return false;
    }

    // 6. Scan for embedded script content
    const scanBuffer = await file.slice(0, 1024).arrayBuffer();
    if (scanForScriptContent(new Uint8Array(scanBuffer))) {
      setError('Conteúdo suspeito detectado no arquivo. Upload bloqueado por segurança.');
      return false;
    }

    // 7. For images: strip metadata via canvas re-encode + validate rendering
    if (file.type.startsWith('image/')) {
      try {
        const sanitizedDataUrl = await stripImageMetadata(file);
        // Generate safe filename (never trust user-provided names)
        const safeName = generateSafeFilename(file.name);
        const sanitizedFile = new File([file], safeName, { type: file.type });
        onFileAccepted(sanitizedDataUrl, sanitizedFile);
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao processar imagem.');
        return false;
      }
    }

    // 8. For videos: read as data URL (no metadata stripping available client-side)
    return new Promise<boolean>(resolve => {
      const reader = new FileReader();
      reader.onload = () => {
        const safeName = generateSafeFilename(file.name);
        const sanitizedFile = new File([file], safeName, { type: file.type });
        onFileAccepted(reader.result as string, sanitizedFile);
        resolve(true);
      };
      reader.onerror = () => {
        setError('Erro ao ler o arquivo.');
        resolve(false);
      };
      reader.readAsDataURL(file);
    });
  }, [onFileAccepted]);

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setProcessing(true);
    setError(null);

    const list = multiple ? Array.from(files) : [files[0]];
    for (const file of list) {
      await processFile(file);
    }
    setProcessing(false);
    if (inputRef.current) inputRef.current.value = '';
  }, [multiple, processFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  if (compact) {
    return (
      <div className={className}>
        <input ref={inputRef} type="file" accept={acceptStr} multiple={multiple} className="hidden"
          onChange={e => handleFiles(e.target.files)} />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5"
          disabled={processing}
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="h-3.5 w-3.5" />
          {processing ? 'Validando...' : 'Upload'}
        </Button>
        {error && (
          <div className="flex items-start gap-1.5 mt-2 p-2 bg-destructive/10 border border-destructive/20 rounded-md">
            <AlertTriangle className="h-3.5 w-3.5 text-destructive mt-0.5 shrink-0" />
            <p className="text-[11px] text-destructive leading-tight">{error}</p>
            <button onClick={() => setError(null)} className="ml-auto shrink-0"><X className="h-3 w-3 text-destructive" /></button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <input ref={inputRef} type="file" accept={acceptStr} multiple={multiple} className="hidden"
        onChange={e => handleFiles(e.target.files)} />

      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          'border-2 border-dashed rounded-lg py-6 px-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors',
          dragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40 hover:bg-muted/30',
          processing && 'pointer-events-none opacity-60'
        )}
      >
        <div className="flex items-center gap-2 text-muted-foreground">
          <FileImage className="h-5 w-5" />
          <Film className="h-5 w-5" />
        </div>
        <p className="text-sm font-medium text-foreground">
          {processing ? 'Validando arquivo...' : 'Arraste ou clique para enviar'}
        </p>
        <p className="text-[11px] text-muted-foreground text-center">
          JPG, PNG, WebP, GIF (máx 5MB) · MP4, WebM (máx 20MB)
        </p>
      </div>

      {error && (
        <div className="flex items-start gap-2 mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
          <p className="text-xs text-destructive leading-relaxed flex-1">{error}</p>
          <button onClick={() => setError(null)} className="shrink-0"><X className="h-3.5 w-3.5 text-destructive" /></button>
        </div>
      )}
    </div>
  );
}
