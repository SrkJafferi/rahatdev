import { portfolioProjects } from '@/data/project-portfolio';
import { propertyOptions } from '@/data/quotation';
import { normalizePhone } from './quotation';

export type ContactValues = { name: string; phone: string; email: string; project: string; type: string; property: string; message: string; consent: boolean };
export const contactEnquiryTypes = ['Property Purchase', 'Project Information', 'Floor Plans', 'Site Visit Request', 'Other Enquiry'];
export function enquiryTypes(project: string) {
  return portfolioProjects.find((p) => p.id === project)?.rental ? [...contactEnquiryTypes.slice(0, 1), 'Rental Enquiry', ...contactEnquiryTypes.slice(1)] : contactEnquiryTypes;
}
export function validateContact(values: ContactValues) {
  const errors: Partial<Record<keyof ContactValues, string>> = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your full name.';
  if (!normalizePhone(values.phone)) errors.phone = 'Enter a valid Pakistani number or an international number with country code.';
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Enter a valid email address or leave this field blank.';
  if (!portfolioProjects.some((p) => p.id === values.project) && values.project !== 'guidance') errors.project = 'Please choose a project or General Enquiry.';
  if (!enquiryTypes(values.project).includes(values.type)) errors.type = 'Please select an enquiry type.';
  if (values.property && !propertyOptions(values.project).includes(values.property)) errors.property = 'Choose a property type for the selected project.';
  if (values.message.trim().length < 5) errors.message = 'Please share a short description of your requirements.';
  if (!values.consent) errors.consent = 'Please acknowledge how your information will be shared.';
  return errors;
}
export function formatContact(values: ContactValues) {
  const project = portfolioProjects.find((p) => p.id === values.project)?.name ?? 'General Enquiry';
  return `Hello Rahat Associates,\n\nI would like to enquire about your developments.\n\nName: ${values.name.trim()}\nPhone: ${normalizePhone(values.phone)}${values.email.trim() ? `\nEmail: ${values.email.trim()}` : ''}\nProject: ${project}\nEnquiry Type: ${values.type}${values.property ? `\nProperty Type: ${values.property}` : ''}\n\nMy Requirements:\n${values.message.trim()}\n\nPlease share the relevant information and next steps.\n\nThank you.`;
}
