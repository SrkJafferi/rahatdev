import { projects, type Project } from './projects';
import { floorPlans } from './floor-plans';

/** Public summaries only. Original inventory and financial schedules stay in reference/. */
export type PortfolioProject = Project & {
  eyebrow: string;
  rental: boolean;
  pricing: { category: string; amount: string }[];
  priceNote: string;
  specifications: string[];
  amenities: string[];
  plans: { id: string; title: string; kind: string; image: string }[];
};

export const portfolioProjects: PortfolioProject[] = projects.map((project, index) => ({
  ...project,
  image: index === 1 ? '/media/smart-one-exterior.webp' : project.image,
  detail: index === 1 ? '/media/smart-one-exterior.webp' : project.detail,
  location: index === 0 ? 'Faisal Margalla City (FMC), Islamabad' : project.location,
  eyebrow: ['Featured project', 'Prime development', 'Living & business'][index],
  rental: index === 0,
  pricing: index === 0
    ? [{ category: 'Commercial resale', amount: 'PKR 9 Million' }, { category: 'Long-term commercial rent', amount: 'PKR 30,000 / month' }]
    : index === 1 ? [{ category: 'Offices · indicative brochure price', amount: 'PKR 10.848 Million' }]
      : [{ category: 'Apartments price', amount: 'PKR 4.845 Million' }],
  priceNote: index === 0 ? 'Supplied resale inventory, undated. Pricing and availability require current confirmation.' : 'Indicative source price only; current pricing and availability require confirmation.',
  specifications: index === 0 ? ['2 & 3 bedroom apartments · 863–1,063 sq ft', 'Commercial shops · 158–220 sq ft', 'Penthouses · 1,900 sq ft']
    : index === 1 ? ['Shops · 349–740 sq ft in the price schedule', 'Offices · 452–570 sq ft', '2 bedroom apartments · 880–1,060 sq ft']
      : ['1 bedroom apartments · 323–526 sq ft', '2 bedroom apartments · 776–1,044 sq ft', 'Offices · 315–523 sq ft'],
  amenities: index === 0 ? ['Gymnasium', 'Smart-card elevator', 'CCTV surveillance', 'Front & back parking']
    : index === 1 ? ['Commercial floors', 'Office layouts', 'Residential floors', 'Lift in floor plans']
      : ['Gymnasium', 'Elevator facility', 'CCTV surveillance', 'Three-side parking'],
  plans: floorPlans.filter((plan) => plan.projectId === project.id).map((plan) => ({ id: plan.id, title: `${project.name} · ${plan.title}`, kind: 'Brochure floor plan', image: plan.image })),
}));
