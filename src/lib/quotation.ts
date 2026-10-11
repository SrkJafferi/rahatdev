import { budgetOptions, propertyOptions, quotationProjects } from '@/data/quotation';

export type QuotationValues = {
  name: string; phone: string; email: string; project: string; interest: string;
  property: string; budget: string; requirements: string; consent: boolean;
};
export type QuotationErrors = Partial<Record<keyof QuotationValues, string>>;

export function normalizePhone(raw: string): string | null {
  if (!/^[+\d\s().-]+$/.test(raw.trim())) return null;
  let phone = raw.replace(/[\s().-]/g, '');
  if (phone.startsWith('00')) phone = `+${phone.slice(2)}`;
  if (/^03\d{9}$/.test(phone)) phone = `+92${phone.slice(1)}`;
  else if (/^0\d{9,10}$/.test(phone)) phone = `+92${phone.slice(1)}`;
  else if (/^92\d{10}$/.test(phone)) phone = `+${phone}`;
  if (!/^\+[1-9]\d{7,14}$/.test(phone)) return null;
  if (phone.startsWith('+92') && !/^\+92\d{10}$/.test(phone)) return null;
  return phone;
}

export function validateQuotation(values: QuotationValues): QuotationErrors {
  const errors: QuotationErrors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your full name.';
  if (!normalizePhone(values.phone)) errors.phone = 'Enter a valid Pakistani number or an international number with country code.';
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Enter a valid email address, or leave this field blank.';
  if (!quotationProjects.some((project) => project.value === values.project) && values.project !== 'guidance') errors.project = 'Please select a project or request guidance.';
  if (!['Buy', 'General Project Enquiry'].includes(values.interest)) errors.interest = 'Please select Buy or General Project Enquiry.';
  if (values.property && !propertyOptions(values.project).includes(values.property)) errors.property = 'Choose a property type offered by this project.';
  if (values.budget && !budgetOptions.includes(values.budget)) errors.budget = 'Please select a budget preference.';
  if (!values.consent) errors.consent = 'Please acknowledge that your details will be included in the WhatsApp message.';
  return errors;
}

export function formatQuotation(values: QuotationValues): string {
  const project = quotationProjects.find((item) => item.value === values.project)?.label ?? 'Not Sure / Need Guidance';
  return `Hello Rahat Associates,\n\nI would like to request a property quotation.\n\nName: ${values.name.trim()}\nPhone: ${normalizePhone(values.phone)}\nEmail: ${values.email.trim() || 'Not provided'}\n\nProject: ${project}\nInterested In: ${values.interest}\nProperty Type: ${values.property || 'Not specified'}\nBudget (PKR): ${values.budget || 'Not specified'}\n\nAdditional Requirements:\n${values.requirements.trim() || 'None specified'}\n\nPlease share relevant property options, pricing and availability.\n\nThank you.`;
}

export function quotationWhatsAppUrl(destination: string | null, message: string): string | null {
  const normalized = destination && normalizePhone(destination);
  return normalized ? `https://wa.me/${normalized.slice(1)}?text=${encodeURIComponent(message)}` : null;
}
