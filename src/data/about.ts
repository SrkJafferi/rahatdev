import { projects } from './projects';

// Use the original brochure render for Smart One on this page. The homepage's
// approved illustrative image and the shared factual project data stay intact.
export const aboutProjects = projects.map((project) => project.id === 'smart-one-heights-2'
  ? { ...project, image: '/media/smart-one-exterior.webp' }
  : project);

// Proposed editorial statements; management can revise these independently.
export const aboutPrinciples = {
  mission: 'To develop residential and commercial spaces that respond to practical needs, encourage comfortable living and support evolving business opportunities.',
  vision: 'To contribute to contemporary real estate development through thoughtful projects that connect people, places and possibilities.',
};
