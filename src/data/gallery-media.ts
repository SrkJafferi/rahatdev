import imageDimensions from './gallery-image-dimensions.json';
import { portfolioProjects } from './project-portfolio';
import { unitAlbums } from './unit-albums';
import type { GalleryMedia } from './gallery-media-types';
export { unitAlbums } from './unit-albums';
const media: GalleryMedia[] = [
  ...portfolioProjects.flatMap((p) => [p.image, ...(p.detail !== p.image ? [p.detail] : [])].map((src, i) => ({ id: `${p.id}-architecture-${i}`, projectId: p.id, kind: 'image' as const, category: 'exterior' as const, title: `${p.name} · ${i ? 'Façade detail' : 'Architectural perspective'}`, src, isRender: true }))),
  ...unitAlbums.flatMap((album) => album.images),
  ...['301', '401'].map((unit) => ({ id: `rh-${unit}-tour`, projectId: 'rahat-heights' as const, unit, kind: 'video' as const, category: 'interior' as const, title: `Rahat Heights · Unit ${unit} walkthrough`, src: `/media/gallery/rahat-heights/${unit}/property-tour.mp4`, poster: `/media/gallery/rahat-heights/${unit}/video-poster.webp` })),
];

export const galleryMedia: GalleryMedia[] = media.map((item) => ({ ...item, ...(imageDimensions as Record<string, { width: number; height: number }>)[item.src] }));
