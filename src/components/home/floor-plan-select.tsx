'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown, Layers3 } from 'lucide-react';
import styles from './floor-plans.module.css';

export function FloorPlanSelect({ options, selectedIndex, onSelect }: {
  options: { id: string; title: string }[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const items = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;
    items.current[activeIndex]?.focus({ preventScroll: true });
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [open, activeIndex]);

  const show = (index = selectedIndex) => { setActiveIndex(index); setOpen(true); };
  const choose = (index: number) => { onSelect(index); setOpen(false); trigger.current?.focus({ preventScroll: true }); };

  return (
    <div ref={root} className={styles.selector} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <span id={`${id}-label`}>Explore a floor layout</span>
      <button ref={trigger} type="button" className={styles.selectFrame} aria-haspopup="listbox" aria-expanded={open} aria-controls={`${id}-list`} aria-labelledby={`${id}-label ${id}-value`} onClick={() => open ? setOpen(false) : show()} onKeyDown={(event) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); show(); }
        if (event.key === 'Home' || event.key === 'End') { event.preventDefault(); show(event.key === 'Home' ? 0 : options.length - 1); }
      }}>
        <Layers3 size={20} strokeWidth={1.4} aria-hidden="true" />
        <span id={`${id}-value`}>{options[selectedIndex].title}</span>
        <ChevronDown size={18} aria-hidden="true" className={open ? styles.chevronOpen : undefined} />
      </button>
      {open && <div id={`${id}-list`} className={styles.optionList} role="listbox" aria-labelledby={`${id}-label`} onKeyDown={(event) => {
        if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); setOpen(false); trigger.current?.focus(); }
        if (event.key === 'Tab') setOpen(false);
        if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
          event.preventDefault();
          setActiveIndex((current) => event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 : (current + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length);
        }
      }}>
        {options.map((option, index) => <button key={option.id} ref={(element) => { items.current[index] = element; }} type="button" role="option" aria-selected={index === selectedIndex} tabIndex={index === activeIndex ? 0 : -1} onClick={() => choose(index)}>
          <span>{option.title}</span>{index === selectedIndex && <Check size={18} aria-hidden="true" />}
        </button>)}
      </div>}
    </div>
  );
}
