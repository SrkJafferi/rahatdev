'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Download, X } from 'lucide-react';
import type { Project } from '@/data/projects';

type ModalProps = {
  children: ReactNode;
  open: boolean;
  close: () => void;
  label: string;
  className?: string;
  onArrow?: (direction: number) => void;
};

export function Modal({ children, open, close, label, className = '', onArrow }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      className={`modal ${className}`}
      onCancel={close}
      onKeyDown={(event) => {
        if (onArrow && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
          event.preventDefault();
          onArrow(event.key === 'ArrowRight' ? 1 : -1);
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <button className="modal-close" aria-label="Close dialog" onClick={close}>
        <X size={20} />
      </button>
      {open && children}
    </dialog>
  );
}

export function ProjectButton({
  project,
  children,
  className = '',
  label,
}: {
  project: Project;
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className={className} aria-label={label} onClick={() => setOpen(true)}>
        {children}
      </button>
      <Modal open={open} close={() => setOpen(false)} label={project.name} className="project-modal">
        <div className="modal-project-image">
          <Image
            src={project.image}
            alt={`${project.name} architectural render`}
            fill
            sizes="(max-width: 899px) 100vw, 45vw"
            style={{ objectPosition: project.focus }}
          />
          <span className="media-tag">Architectural render</span>
        </div>
        <div className="modal-project-content">
          <p className="eyebrow">{project.location}</p>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
          <div className="tag-row">
            {project.spaces.map((space) => (
              <span className="tag" key={space}>
                {space}
              </span>
            ))}
          </div>
          <a className="button solid" href={project.brochure} download>
            Download brochure <Download size={16} />
          </a>
          <a
            className="text-link"
            href="#quotation"
            onClick={() => {
              window.dispatchEvent(new CustomEvent('project-enquiry', { detail: project.id }));
              setOpen(false);
            }}
          >
            Enquire about this project <ArrowUpRight size={16} />
          </a>
          <p className="source-note">
            Brochure imagery, layouts and specifications are illustrative. Confirm current details, pricing and
            availability directly with Rahat Associates.
          </p>
        </div>
      </Modal>
    </>
  );
}

export function Lightbox({
  items,
  index,
  onClose,
  onMove,
}: {
  items: { id: string; title: string; kind: string; image: string }[];
  index: number;
  onClose: () => void;
  onMove: (direction: number) => void;
}) {
  const active = index >= 0 ? items[index] : null;
  return (
    <Modal
      open={Boolean(active)}
      close={onClose}
      label={active ? `${active.title} — ${active.kind}` : 'Project image'}
      className="lightbox"
      onArrow={onMove}
    >
      {active && (
        <div>
          <div className="lightbox-image">
            <Image src={active.image} alt={`${active.title}: ${active.kind}`} fill sizes="90vw" quality={90} />
          </div>
          <div className="lightbox-footer">
            <div>
              <strong>{active.title}</strong>
              <small>{active.kind}</small>
            </div>
            <div className="lightbox-controls">
              <button onClick={() => onMove(-1)} aria-label="Previous image">
                <ArrowLeft size={18} />
              </button>
              <span>
                {index + 1} / {items.length}
              </span>
              <button onClick={() => onMove(1)} aria-label="Next image">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
