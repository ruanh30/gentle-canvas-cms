import React, { useState, useCallback } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { HelpCircle, Check, ExternalLink, ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MediaPickerModal } from './MediaPickerModal';

// Tooltip helper
export function HintTooltip({ text }: { text: string }) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle className="h-3 w-3 text-muted-foreground/50 hover:text-muted-foreground cursor-help inline-block ml-1" />
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[220px] text-xs leading-relaxed">
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Color picker — refined
export function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{label}</Label>
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={e => onChange(e.target.value)}
            className="w-8 h-8 rounded-md border border-border/50 cursor-pointer [&::-webkit-color-swatch-wrapper]:p-0.5 [&::-webkit-color-swatch]:rounded [&::-webkit-color-swatch]:border-none hover:scale-105 transition-transform"
          />
        </div>
        <Input value={value} onChange={e => onChange(e.target.value)} className="font-mono text-xs h-8 w-24 uppercase bg-secondary/50 border-border/50" maxLength={7} />
      </div>
    </div>
  );
}

// Section wrapper — premium header
export function EditorSection({ icon: Icon, title, description, children }: {
  icon: React.ElementType; title: string; description: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-foreground/5 border border-border/50">
          <Icon className="h-4 w-4 text-foreground/70" />
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
          <p className="text-[11px] text-muted-foreground/80 leading-relaxed mt-0.5">{description}</p>
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

// Toggle row — cleaner
export function ToggleRow({ label, description, hint, checked, onChange }: {
  label: string; description?: string; hint?: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-2 group">
      <div className="pr-3">
        <p className="text-[13px] font-medium text-foreground/90">{label}{hint && <HintTooltip text={hint} />}</p>
        {description && <p className="text-[11px] text-muted-foreground/70 mt-0.5">{description}</p>}
      </div>
      <Switch checked={checked} onCheckedChange={onChange} className="shrink-0" />
    </div>
  );
}

// Option picker — REDESIGNED: vertical list with radio-style selection, no truncation
export function OptionPicker<T extends string>({ label, options, value, onChange }: {
  label: string;
  options: { value: T; label: string; icon?: React.ElementType; description?: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  const isCompact = options.length <= 4 && options.every(o => (o.label?.length ?? 0) <= 10 && !o.description);

  if (isCompact) {
    return (
      <div className="space-y-2">
        <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{label}</Label>
        <div className="flex gap-1.5">
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={cn(
                'px-3 py-1.5 rounded-md text-[12px] font-medium transition-all border flex-1 text-center',
                value === opt.value
                  ? 'bg-foreground text-background border-foreground shadow-sm'
                  : 'bg-secondary/50 text-muted-foreground border-border/50 hover:bg-secondary hover:text-foreground'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{label}</Label>
      <div className="space-y-1">
        {options.map(opt => {
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={cn(
                'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all',
                isSelected
                  ? 'bg-foreground/5 border border-foreground/20 shadow-sm'
                  : 'border border-transparent hover:bg-secondary/50'
              )}
            >
              <div className={cn(
                'w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors',
                isSelected ? 'border-foreground bg-foreground' : 'border-muted-foreground/30'
              )}>
                {isSelected && <Check className="h-2.5 w-2.5 text-background" />}
              </div>
              {opt.icon && <opt.icon className="h-4 w-4 shrink-0 text-muted-foreground" />}
              <div className="min-w-0 flex-1">
                <p className={cn(
                  'text-[12px] font-medium leading-tight',
                  isSelected ? 'text-foreground' : 'text-foreground/80'
                )}>{opt.label}</p>
                {opt.description && (
                  <p className="text-[10px] text-muted-foreground/70 leading-snug mt-0.5">{opt.description}</p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Number slider — refined
export function NumberSlider({ label, value, onChange, min, max, step = 1, suffix = '' }: {
  label: string; value: number; onChange: (v: number) => void; min: number; max: number; step?: number; suffix?: string;
}) {
  return (
    <div className="space-y-2.5">
      <div className="flex justify-between items-center">
        <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{label}</Label>
        <span className="text-[11px] font-mono text-foreground/60 bg-secondary/50 px-1.5 py-0.5 rounded">{value}{suffix}</span>
      </div>
      <Slider value={[value]} onValueChange={([v]) => onChange(v)} min={min} max={max} step={step} />
    </div>
  );
}

// Font picker
const headingFonts = ['Playfair Display', 'Poppins', 'Montserrat', 'Lora', 'Merriweather', 'Raleway', 'Oswald', 'Cormorant Garamond', 'DM Serif Display', 'Libre Baskerville', 'Bebas Neue', 'Archivo Black', 'Quicksand', 'Josefin Sans', 'Cinzel', 'Abril Fatface', 'Righteous', 'Alfa Slab One', 'Bitter', 'Crimson Text'];
const bodyFonts = ['Inter', 'Roboto', 'Open Sans', 'Lato', 'Nunito', 'Work Sans', 'DM Sans', 'Source Sans 3', 'Rubik', 'Manrope', 'Poppins', 'Outfit', 'Plus Jakarta Sans', 'Mulish', 'Karla', 'Figtree', 'Albert Sans', 'Lexend', 'Urbanist', 'Sora'];

export function FontPicker({ label, value, onChange, type = 'heading' }: {
  label: string; value: string; onChange: (v: string) => void; type?: 'heading' | 'body';
}) {
  const fonts = type === 'heading' ? headingFonts : bodyFonts;

  React.useEffect(() => {
    fonts.forEach(f => {
      const id = `gfont-${f.replace(/\s+/g, '-').toLowerCase()}`;
      if (!document.getElementById(id)) {
        const link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(f)}:wght@400;700&display=swap`;
        document.head.appendChild(link);
      }
    });
  }, [fonts]);

  return (
    <div className="space-y-1.5">
      <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-9 text-sm bg-secondary/30 border-border/50"><SelectValue /></SelectTrigger>
        <SelectContent>
          {fonts.map(f => <SelectItem key={f} value={f}><span style={{ fontFamily: `'${f}', sans-serif` }}>{f}</span></SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );
}

// Select field — refined
export function SelectField<T extends string>({ label, value, onChange, options }: {
  label: string; value: T; onChange: (v: T) => void; options: { value: T; label: string }[];
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{label}</Label>
      <Select value={value} onValueChange={v => onChange(v as T)}>
        <SelectTrigger className="h-9 text-sm bg-secondary/30 border-border/50"><SelectValue /></SelectTrigger>
        <SelectContent>
          {options.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );
}

// Text field — refined
export function TextField({ label, value, onChange, placeholder, multiline }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; multiline?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{label}</Label>
      {multiline ? (
        <Textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} className="text-sm bg-secondary/30 border-border/50" />
      ) : (
        <Input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="h-9 text-sm bg-secondary/30 border-border/50" />
      )}
    </div>
  );
}

// Image URL field with media picker
export function ImageField({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <div className="space-y-1.5">
      <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{label}</Label>
      <div className="flex items-center gap-1.5">
        <Input
          value={value}
          onChange={e => {
            const v = e.target.value;
            // Block dangerous protocols inline
            const lower = v.toLowerCase().replace(/\s/g, '');
            if (lower.startsWith('javascript:') || lower.startsWith('vbscript:') || lower.startsWith('data:text') || lower.startsWith('data:application')) return;
            onChange(v);
          }}
          placeholder={placeholder || 'https://...'}
          className="h-9 text-sm bg-secondary/30 border-border/50 flex-1"
        />
        <button
          onClick={() => setPickerOpen(true)}
          className="h-9 w-9 shrink-0 rounded-lg border border-border/50 bg-secondary/30 hover:bg-secondary flex items-center justify-center transition-colors"
          title="Selecionar da biblioteca de mídia"
        >
          <ImageIcon className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
      {value && (
        <div className="mt-1 rounded-lg overflow-hidden border border-border/30 bg-muted/30 max-h-20">
          <img src={value} alt="Preview" className="w-full h-20 object-cover" />
        </div>
      )}
      <MediaPickerModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={onChange}
        currentValue={value}
      />
    </div>
  );
}

// Divider — elegant
export function SectionDivider({ label }: { label?: string }) {
  return label ? (
    <div className="flex items-center gap-3 pt-3 pb-1">
      <div className="h-px bg-border/60 flex-1" />
      <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/60 font-semibold">{label}</span>
      <div className="h-px bg-border/60 flex-1" />
    </div>
  ) : <div className="h-px bg-border/40 my-1" />;
}

// Cross-link to admin pages
export function AdminLink({ to, label, icon: Icon }: { to: string; label: string; icon: React.ElementType }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors text-left group"
    >
      <Icon className="h-4 w-4 text-primary/70 shrink-0" />
      <span className="text-xs font-medium text-primary/80 flex-1">{label}</span>
      <ExternalLink className="h-3 w-3 text-primary/40 group-hover:text-primary/70 transition-colors" />
    </button>
  );
}
