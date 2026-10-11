'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import styles from './custom-select.module.css';

type Option = { value: string; label: string; disabled?: boolean };
type Props = {
  id: string;
  name: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  required?: boolean;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
};

export function CustomSelect({ id, name, value, options, onChange, required, ...accessible }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const items = useRef<(HTMLButtonElement | null)[]>([]);
  const selected = options.find((option) => option.value === value) ?? options[0];
  const enabled = options.map((option, index) => option.disabled ? -1 : index).filter((index) => index >= 0);

  useEffect(() => {
    if (!open) return;
    items.current[active]?.focus({ preventScroll: true });
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [open, active]);

  function show() {
    const index = options.findIndex((option) => option.value === value && !option.disabled);
    setActive(index >= 0 ? index : enabled[0]);
    setOpen(true);
  }

  return (
    <div ref={root} className={styles.root} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <button ref={trigger} type="button" role="combobox" id={id} name={name} className={styles.trigger} aria-haspopup="listbox" aria-expanded={open} aria-controls={`${id}-options`} aria-labelledby={`${id}-label ${id}-value`} aria-required={required} {...accessible} onClick={() => open ? setOpen(false) : show()} onKeyDown={(event) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); show(); }
      }}>
        <span id={`${id}-value`}>{selected.label}</span><ChevronDown size={18} aria-hidden="true" className={open ? styles.rotated : undefined} />
      </button>
      {open && <div className={styles.list} id={`${id}-options`} role="listbox" aria-labelledby={`${id}-label`} onKeyDown={(event) => {
        if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); setOpen(false); trigger.current?.focus(); }
        if (event.key === 'Tab') { setOpen(false); trigger.current?.focus(); }
        if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
          event.preventDefault();
          const position = enabled.indexOf(active);
          setActive(event.key === 'Home' ? enabled[0] : event.key === 'End' ? enabled[enabled.length - 1] : enabled[(position + (event.key === 'ArrowDown' ? 1 : -1) + enabled.length) % enabled.length]);
        }
      }}>
        {options.map((option, index) => <button key={option.value} ref={(element) => { items.current[index] = element; }} type="button" role="option" aria-selected={value === option.value} aria-disabled={option.disabled || undefined} disabled={option.disabled} tabIndex={active === index ? 0 : -1} onClick={() => { onChange(option.value); setOpen(false); trigger.current?.focus({ preventScroll: true }); }}>
          <span>{option.label}</span>{value === option.value && <Check size={18} aria-hidden="true" />}
        </button>)}
      </div>}
    </div>
  );
}
