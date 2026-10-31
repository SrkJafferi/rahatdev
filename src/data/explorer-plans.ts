import { floorPlans } from './floor-plans';

/** Exact drawing groups extracted from their mapped source pages; no inferred floors. */
const groups: Record<string, { title: string; floors: string; use?: string }[]> = {
  'rh-lower': [{ title: 'Lower Ground Floor', floors: 'Lower ground' }],
  'rh-ground': [{ title: 'Ground Floor', floors: 'Ground' }],
  'rh-residential': [{ title: 'First & Second Floor Plan', floors: 'First & second' }, { title: '3rd to 5th Floor Plan', floors: 'Third to fifth' }],
  'smart-shops': [{ title: 'Lower Ground Floor', floors: 'Lower ground' }, { title: 'Ground Floor', floors: 'Ground' }],
  'smart-mixed': [{ title: 'First Floor Offices', floors: 'First', use: 'Offices' }, { title: 'Second & Third Floor Apartments', floors: 'Second & third', use: 'Apartments' }],
  'smart-fourth': [{ title: 'Fourth Floor Plan', floors: 'Fourth' }],
  'rhii-lower': [{ title: 'Basement Floor', floors: 'Basement' }, { title: 'Lower Ground Floor', floors: 'Lower ground' }],
  'rhii-ground': [{ title: 'Ground Floor', floors: 'Ground' }],
  'rhii-offices': [{ title: 'Mezzanine Floor Offices', floors: 'Mezzanine' }, { title: 'First Floor Offices', floors: 'First' }],
  'rhii-residential': [{ title: 'Second Floor Apartments', floors: 'Second' }, { title: 'Third to Sixth Floor Apartments', floors: 'Third to sixth' }],
};
export const explorerPlans = floorPlans.flatMap((source) => groups[source.id].map((drawing, side) => ({
  ...source, ...drawing,
  description: `Original ${drawing.floors.toLowerCase()} floor drawing for ${drawing.use ?? source.use}, reproduced from the project brochure. Inspect the room arrangements, dimensions and shared circulation in the drawing.`,
  id: `${source.id}-${side + 1}`,
  image: `/media/floorplans/${source.id}-${side + 1}.webp`,
}))).sort((a, b) => {
  const order = ['rh-lower-1','rh-ground-1','rh-residential-1','rh-residential-2','smart-shops-1','smart-shops-2','smart-mixed-1','smart-mixed-2','smart-fourth-1','rhii-lower-1','rhii-lower-2','rhii-ground-1','rhii-offices-1','rhii-offices-2','rhii-residential-1','rhii-residential-2'];
  return order.indexOf(a.id) - order.indexOf(b.id);
});
