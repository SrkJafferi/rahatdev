import type { ProjectId } from './projects';

export type FloorPlan = {
  id: string;
  projectId: ProjectId;
  title: string;
  floors: string;
  use: string;
  description: string;
  page: number;
  image: string;
  /** Faithful drawing excerpts from the same brochure page, with dimension notes intact. */
  drawings?: { title: string; image: string }[];
};

// Page numbers refer to the original supplied PDF, including its cover.
export const floorPlans: FloorPlan[] = [
  { id: 'rh-residential', projectId: 'rahat-heights', title: 'Residential floor layouts', floors: 'First to fifth', use: 'Apartments', description: 'Two residential layouts from the brochure: first and second floors, followed by the third to fifth floors. Explore the original room arrangements and circulation.', page: 9, image: '/media/rahat-heights-floor-9.webp', drawings: [{ title: 'First & Second Floor Plan', image: '/media/rahat-heights-first-second-drawing.webp' }, { title: '3rd to 5th Floor Plan', image: '/media/rahat-heights-third-fifth-drawing.webp' }] },
  { id: 'rh-lower', projectId: 'rahat-heights', title: 'Lower ground floor', floors: 'Lower ground', use: 'Commercial shops', description: 'The original lower ground drawing shows shop positions, dimensions and the shared access arrangement.', page: 7, image: '/media/rahat-heights-floor-7.webp' },
  { id: 'rh-ground', projectId: 'rahat-heights', title: 'Ground floor', floors: 'Ground', use: 'Commercial shops', description: 'View the ground floor shop layout and its access points in the developer-supplied brochure.', page: 8, image: '/media/rahat-heights-floor-8.webp' },
  { id: 'smart-mixed', projectId: 'smart-one-heights-2', title: 'Office & apartment layouts', floors: 'First to third', use: 'Offices & apartments', description: 'The first floor office plan sits alongside the second to third floor apartment layout, showing how work and living spaces are arranged within the building.', page: 6, image: '/media/smart-one-heights-2-floor-6.webp' },
  { id: 'smart-shops', projectId: 'smart-one-heights-2', title: 'Commercial floor layouts', floors: 'Lower ground & ground', use: 'Commercial shops', description: 'Compare the lower ground and ground floor shop plans, with the original dimensions and service areas shown in the brochure.', page: 5, image: '/media/smart-one-heights-2-floor-5.webp' },
  { id: 'smart-fourth', projectId: 'smart-one-heights-2', title: 'Fourth floor layout', floors: 'Fourth', use: 'Residential', description: 'The brochure labels this drawing as the fourth floor plan. Inspect its bedrooms, lounge and circulation in the original layout.', page: 7, image: '/media/smart-one-heights-2-floor-7.webp' },
  { id: 'rhii-residential', projectId: 'rahat-heights-ii', title: 'Residential floor layouts', floors: 'Second to sixth', use: 'Apartments', description: 'The second floor layout and the third to sixth floor layout are presented together, with apartment arrangements and shared circulation drawn in detail.', page: 10, image: '/media/rahat-heights-ii-floor-10.webp' },
  { id: 'rhii-lower', projectId: 'rahat-heights-ii', title: 'Basement & lower ground', floors: 'Basement & lower ground', use: 'Commercial spaces', description: 'Two original drawings show the basement and lower ground commercial layouts at Rahat Heights II.', page: 7, image: '/media/rahat-heights-ii-floor-7.webp' },
  { id: 'rhii-ground', projectId: 'rahat-heights-ii', title: 'Ground floor layout', floors: 'Ground', use: 'Commercial shops', description: 'Explore the ground floor shop positions and circulation directly from the supplied project brochure.', page: 8, image: '/media/rahat-heights-ii-floor-8.webp' },
  { id: 'rhii-offices', projectId: 'rahat-heights-ii', title: 'Mezzanine & first floor', floors: 'Mezzanine & first', use: 'Offices', description: 'The mezzanine and first floor office drawings show individual spaces, dimensions and their connections to the shared passages.', page: 9, image: '/media/rahat-heights-ii-floor-9.webp' },
];
