import { projects } from './projects';

export const quotationProjects = projects.map(({ id, name, location }) => ({ value: id, label: `${name} — ${location}` }));
export const budgetOptions = ['Under PKR 5 Million', 'PKR 5M – 10M', 'PKR 10M – 20M', 'PKR 20M – 50M', 'Above PKR 50M', 'Prefer Not to Specify'];

/** No verified, available rental inventory is configured in the frontend dataset. */
export const rentalEnquiriesEnabled = false;

export function propertyOptions(projectId: string) {
  const project = projects.find(({ id }) => id === projectId);
  const spaces = project?.spaces ?? projects.flatMap((item) => item.spaces);
  return [
    ...(spaces.includes('Apartments') ? ['Apartment'] : []),
    ...(spaces.some((space) => space.startsWith('Commercial')) ? ['Commercial Shop'] : []),
    ...(spaces.includes('Offices') ? ['Office'] : []),
    'Other / Not Sure',
  ];
}
