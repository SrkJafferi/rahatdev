import type { ProjectId } from './projects';
export type GalleryMedia = { id: string; projectId: ProjectId; unit?: string; kind: 'image' | 'video'; category: 'exterior' | 'interior'; title: string; src: string; poster?: string; width?: number; height?: number; isRender?: boolean };
export type UnitAlbum = { unit: string; projectId: ProjectId; descriptor: string; images: GalleryMedia[] };
