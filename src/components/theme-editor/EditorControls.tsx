import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

// Tooltip helper
export function HintTooltip({ text }: { text: string }) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle className="h-3 w-3 text-muted-foreground/60 hover:text-muted-foreground cursor-help inline-block ml-1" />
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[200px] text-xs">
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Color picker
export function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-8 h-8 rounded border border-input cursor-pointer [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded [&::-webkit-color-swatch]:border-none"
        />
        <Input value={value} onChange={e => onChange(e.target.value)} className="font-mono text-xs h-8 w-24 uppercase" maxLength={7} />
      </div>
    </div>
  );
}

// Section wrapper
export function EditorSection({ icon: Icon, title, description, children }: {
  icon: React.ElementType; title: string; description: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-md bg-secondary"><Icon className="h-3.5 w-3.5 text-muted-foreground" /></div>
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-[11px] text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

// Toggle row
export function ToggleRow({ label, description, hint, checked, onChange }: {
  label: string; description?: string; hint?: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-sm font-medium">{label}{hint && <HintTooltip text={hint} />}</p>
        {description && <p className="text-[11px] text-muted-foreground">{description}</p>}
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

// Option picker (visual cards)
export function OptionPicker<T extends string>({ label, options, value, onChange }: {
  label: string;
  options: { value: T; label: string; icon?: React.ElementType; description?: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className={cn('grid gap-2', options.length <= 3 ? 'grid-cols-3' : options.length <= 5 ? 'grid-cols-5' : 'grid-cols-3')}>
        {options.map(opt => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={cn(
              'p-2.5 rounded-lg border-2 transition-all text-center',
              value === opt.value ? 'border-foreground bg-secondary' : 'border-border hover:border-foreground/30'
            )}
          >
            {opt.icon && <opt.icon className="h-4 w-4 mx-auto mb-1" />}
            <p className="text-[11px] font-medium">{opt.label}</p>
            {opt.description && <p className="text-[9px] text-muted-foreground">{opt.description}</p>}
          </button>
        ))}
      </div>
    </div>
  );
}

// Number slider
export function NumberSlider({ label, value, onChange, min, max, step = 1, suffix = '' }: {
  label: string; value: number; onChange: (v: number) => void; min: number; max: number; step?: number; suffix?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label className="text-xs text-muted-foreground">{label}</Label>
        <span className="text-xs font-mono text-muted-foreground">{value}{suffix}</span>
      </div>
      <Slider value={[value]} onValueChange={([v]) => onChange(v)} min={min} max={max} step={step} />
    </div>
  );
}

// Font picker
const headingFonts = ['Playfair Display', 'Poppins', 'Montserrat', 'Lora', 'Merriweather', 'Raleway', 'Oswald', 'Cormorant Garamond', 'DM Serif Display', 'Libre Baskerville'];
const bodyFonts = ['Inter', 'Roboto', 'Open Sans', 'Lato', 'Nunito', 'Work Sans', 'DM Sans', 'Source Sans 3', 'Rubik', 'Manrope'];

export function FontPicker({ label, value, onChange, type = 'heading' }: {
  label: string; value: string; onChange: (v: string) => void; type?: 'heading' | 'body';
}) {
  const fonts = type === 'heading' ? headingFonts : bodyFonts;
  return (
    <div className="space-y-1">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
        <SelectContent>
          {fonts.map(f => <SelectItem key={f} value={f}><span style={{ fontFamily: f }}>{f}</span></SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );
}

// Select field
export function SelectField<T extends string>({ label, value, onChange, options }: {
  label: string; value: T; onChange: (v: T) => void; options: { value: T; label: string }[];
}) {
  return (
    <div className="space-y-1">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Select value={value} onValueChange={v => onChange(v as T)}>
        <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
        <SelectContent>
          {options.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );
}

// Text field
export function TextField({ label, value, onChange, placeholder, multiline }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; multiline?: boolean;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {multiline ? (
        <Textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} className="text-sm" />
      ) : (
        <Input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="h-9 text-sm" />
      )}
    </div>
  );
}

// Divider
export function SectionDivider({ label }: { label?: string }) {
  return label ? (
    <div className="flex items-center gap-2 pt-2">
      <div className="h-px bg-border flex-1" />
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{label}</span>
      <div className="h-px bg-border flex-1" />
    </div>
  ) : <div className="h-px bg-border" />;
}
