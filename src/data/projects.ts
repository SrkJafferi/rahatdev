export type ProjectId = 'rahat-heights' | 'smart-one-heights-2' | 'rahat-heights-ii';

export type Project = {
  id: ProjectId;
  name: string;
  location: string;
  category: string;
  description: string;
  /** Short editorial line used in the sticky project panels. */
  feature: string;
  image: string;
  /** Secondary render from the same brochure, used for layered compositions. */
  detail: string;
  /** Object position tuned per render so cover crops keep the façade in frame. */
  focus: string;
  plan: string;
  brochure: string;
  source: string;
  spaces: string[];
};

export const projects: Project[] = [
  {
    id: 'rahat-heights',
    name: 'Rahat Heights',
    location: 'Faisal Margalla City (FMC)',
    category: 'Residential & commercial',
    description:
      'A residential and commercial address in Faisal Margalla City, bringing apartments and street-level shops together in one considered setting.',
    feature: 'Apartments above street-level commerce, planned as one address.',
    image: '/media/rahat-heights-exterior.webp',
    detail: '/media/rahat-heights-detail.webp',
    focus: 'center 46%',
    plan: '/media/rahat-heights-plan.webp',
    brochure: '/brochures/rahat-heights.pdf',
    source: 'Brochure.pdf, pages 2–3, 7–9, 14–15',
    spaces: ['Apartments', 'Commercial shops', 'Penthouses'],
  },
  {
    id: 'smart-one-heights-2',
    name: 'Smart One Heights 2',
    location: 'Bahria Enclave, Islamabad',
    category: 'Residential, retail & offices',
    description:
      'An expressive façade and a mix of shops, offices and apartments bring living and working together in Bahria Enclave, Islamabad.',
    feature: 'Shops, offices and apartments behind one expressive façade.',
    image: '/media/smart-one-palm-residences.avif',
    detail: '/media/smart-one-heights-2-plan.webp',
    focus: 'center',
    plan: '/media/smart-one-heights-2-plan.webp',
    brochure: '/brochures/smart-one-heights-2.pdf',
    source: 'Smart One Hight re size (1).pdf, pages 1–7',
    spaces: ['Apartments', 'Commercial shops', 'Offices'],
  },
  {
    id: 'rahat-heights-ii',
    name: 'Rahat Heights II',
    location: 'Grand City, Kharian',
    category: 'Residential & commercial',
    description:
      'A distinct architectural expression in Grand City, Kharian, with residential apartments, commercial spaces and offices across its planned floors.',
    feature: 'A distinct architectural expression in Grand City, Kharian.',
    image: '/media/rahat-heights-ii-exterior.webp',
    detail: '/media/rahat-heights-ii-detail.webp',
    focus: 'center 42%',
    plan: '/media/rahat-heights-ii-plan.webp',
    brochure: '/brochures/rahat-heights-ii.pdf',
    source: 'Brochure RH2 PLOT # 11 final.pdf, pages 1–4, 7–10',
    spaces: ['Apartments', 'Commercial spaces', 'Offices'],
  },
];

export type GalleryItem = {
  id: string;
  projectId: ProjectId;
  title: string;
  kind: 'Architectural render' | 'Brochure floor plan';
  image: string;
};

export const gallery: GalleryItem[] = [
  { id: 'smart-one-heights-2-exterior', projectId: 'smart-one-heights-2', title: 'Smart One Heights 2', kind: 'Architectural render', image: projects[1].image },
  { id: 'rahat-heights-exterior', projectId: 'rahat-heights', title: 'Rahat Heights', kind: 'Architectural render', image: projects[0].image },
  { id: 'rahat-heights-ii-detail', projectId: 'rahat-heights-ii', title: 'Rahat Heights II', kind: 'Architectural render', image: projects[2].detail },
  { id: 'rahat-heights-ii-exterior', projectId: 'rahat-heights-ii', title: 'Rahat Heights II', kind: 'Architectural render', image: projects[2].image },
  { id: 'rahat-heights-detail', projectId: 'rahat-heights', title: 'Rahat Heights', kind: 'Architectural render', image: projects[0].detail },
  { id: 'rahat-heights-plan', projectId: 'rahat-heights', title: 'Rahat Heights', kind: 'Brochure floor plan', image: projects[0].plan },
  { id: 'smart-one-heights-2-plan', projectId: 'smart-one-heights-2', title: 'Smart One Heights 2', kind: 'Brochure floor plan', image: projects[1].plan },
  { id: 'rahat-heights-ii-plan', projectId: 'rahat-heights-ii', title: 'Rahat Heights II', kind: 'Brochure floor plan', image: projects[2].plan },
];

export type Service = {
  id: string;
  title: string;
  copy: string;
  /** Service card imagery supplied in reference/. */
  image: string;
  focus: string;
  projectId: ProjectId;
  icon: 'home' | 'commercial' | 'development' | 'enquiry' | 'consultation';
  features: { label: string; icon: 'home' | 'building' | 'diamond' | 'sun' | 'people' | 'store' | 'office' | 'layout' | 'chat' | 'location' | 'plan' | 'key' | 'check' }[];
  action: string;
  caption: string;
  captionLabel: string;
};

export const services: Service[] = [
  {
    id: 'residential-developments',
    title: 'Residential Developments',
    copy: 'Apartments and penthouses planned around daylight, storage and the way a household actually moves through a day.',
    image: '/media/residential-developments.avif',
    focus: 'center',
    projectId: 'rahat-heights',
    icon: 'home',
    features: [{ label: 'Apartments', icon: 'building' }, { label: 'Penthouses', icon: 'diamond' }, { label: 'Daylight planning', icon: 'sun' }, { label: 'Family living', icon: 'people' }],
    action: 'Explore Residential',
    captionLabel: 'Residential perspective',
    caption: 'Homes for modern living',
  },
  {
    id: 'commercial-developments',
    title: 'Commercial Developments',
    copy: 'Street-level shops, retail frontage and office floors in addresses planned to be found, not hidden.',
    image: '/media/commercial-developments1.avif',
    focus: 'center',
    projectId: 'smart-one-heights-2',
    icon: 'commercial',
    features: [{ label: 'Shops', icon: 'store' }, { label: 'Offices', icon: 'office' }, { label: 'Mixed-use spaces', icon: 'layout' }, { label: 'Direct enquiries', icon: 'chat' }],
    action: 'Explore Commercial',
    captionLabel: 'Commercial perspective',
    caption: 'Space for your next chapter',
  },
  {
    id: 'real-estate-development',
    title: 'Real Estate Development',
    copy: 'Mixed-use addresses developed end to end across Faisal Margalla City, Bahria Enclave and Grand City, Kharian.',
    image: '/media/service5.avif',
    focus: 'center',
    projectId: 'rahat-heights-ii',
    icon: 'development',
    features: [{ label: 'Residential', icon: 'home' }, { label: 'Commercial', icon: 'store' }, { label: 'Three locations', icon: 'location' }, { label: 'Floor plans', icon: 'plan' }],
    action: 'Explore Developments',
    captionLabel: 'A connected outlook',
    caption: 'Living and working, together',
  },
  {
    id: 'property-sales-enquiries',
    title: 'Property Sales & Enquiries',
    copy: 'Direct enquiries for apartments, shops and offices across our three developments, handled by the developer.',
    image: '/media/service2.avif',
    focus: 'center',
    projectId: 'rahat-heights',
    icon: 'enquiry',
    features: [{ label: 'Apartments', icon: 'building' }, { label: 'Commercial spaces', icon: 'store' }, { label: 'Project details', icon: 'plan' }, { label: 'Developer contact', icon: 'chat' }],
    action: 'Explore Your Options',
    captionLabel: 'Speak to the developer',
    caption: 'A conversation about your space',
  },
  {
    id: 'project-consultation',
    title: 'Project Consultation',
    copy: 'Guidance on layouts, unit types and current availability before you commit to a space.',
    image: '/media/project-consultation.avif',
    focus: 'center',
    projectId: 'rahat-heights-ii',
    icon: 'consultation',
    features: [{ label: 'Unit layouts', icon: 'layout' }, { label: 'Property types', icon: 'key' }, { label: 'Availability enquiries', icon: 'check' }, { label: 'Project guidance', icon: 'chat' }],
    action: 'Explore Project Details',
    captionLabel: 'Make an informed choice',
    caption: 'Clarity before your next step',
  },
];

// Conflicting historical brochure contacts require client confirmation before activation.
export const contact = {
  facebook: 'https://www.facebook.com/rahatassociates1',
  instagram: 'https://www.instagram.com/rahatassociates/',
  phone: null,
  email: 'info@rahatassociates.com.pk',
  // Confirmed by the user for quotation enquiries.
  whatsapp: '+92 331 6556191',
  office: null,
};
