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

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_VIDEO_SIZE = 20 * 1024 * 1024; // 20MB

/* ------------------------------------------------------------------ */
/*  Validation helpers                                                 */
/* ------------------------------------------------------------------ */

function getExtension(name: string): string {
  const dot = name.lastIndexOf('.');
  return dot >= 0 ? name.slice(dot).toLowerCase() : '';
}

function isExtensionAllowed(name: string): boolean {
  const ext = getExtension(name);
  return Object.values(ALLOWED_TYPES).flat().includes(ext);
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

    // 1. Extension check
    if (!isExtensionAllowed(file.name)) {
      setError(`Extensão não permitida: ${getExtension(file.name)}. Use JPG, PNG, WebP, GIF, MP4 ou WebM.`);
      return false;
    }

    // 2. MIME type check
    if (!isMimeAllowed(file.type)) {
      setError(`Tipo de arquivo inválido: ${file.type}`);
      return false;
    }

    // 3. Extension ↔ MIME consistency (prevents extension spoofing)
    if (!extensionMatchesMime(file.name, file.type)) {
      setError('Extensão do arquivo não corresponde ao conteúdo. Possível manipulação detectada.');
      return false;
    }

    // 4. File size
    if (!isFileSizeValid(file)) {
      const isVideo = file.type.startsWith('video/');
      setError(`Arquivo muito grande (${formatSize(file.size)}). Máximo: ${isVideo ? '20MB' : '5MB'}.`);
      return false;
    }

    // 5. Magic bytes (header) validation
    const magicValid = await validateMagicBytes(file);
    if (!magicValid) {
      setError('Conteúdo do arquivo não corresponde ao tipo declarado. Upload bloqueado por segurança.');
      return false;
    }

    // 6. For images: validate it actually renders
    if (file.type.startsWith('image/')) {
      const valid = await new Promise<boolean>(resolve => {
        const img = new window.Image();
        img.onload = () => {
          // Sanity check dimensions (anti-decompression bomb)
          if (img.width > 8000 || img.height > 8000) {
            setError('Imagem com dimensões excessivas (máx 8000×8000px).');
            resolve(false);
          } else {
            resolve(true);
          }
        };
        img.onerror = () => {
          setError('Arquivo corrompido ou não é uma imagem válida.');
          resolve(false);
        };
        img.src = URL.createObjectURL(file);
      });
      if (!valid) return false;
    }

    // All checks passed → read as data URL
    return new Promise<boolean>(resolve => {
      const reader = new FileReader();
      reader.onload = () => {
        onFileAccepted(reader.result as string, file);
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
