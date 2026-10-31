/** Client-provided office address, preserved verbatim. */
export const officeAddressLines = [
  'First Floor, Rahat Arcade, Block B1 Ext,',
  'Block A Multi Gardens B-17,',
  'Islamabad, Pakistan',
] as const;

export const officeAddress = officeAddressLines.join(' ');
const encodedAddress = encodeURIComponent(officeAddress);

export const officeLocation = {
  address: officeAddress,
  addressLines: officeAddressLines,
  // Google Maps Share → Embed URL, obtained from the listing returned for the
  // exact address above. Coordinates and listing ID are supplied by Google.
  // This is not an independently surveyed or client-confirmed office pin.
  embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.6853432792273!2d72.82649097460775!3d33.69121087329503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfa3b54602a7fb%3A0xed50fa3b0139c6c6!2sRAHAT%20ASSOCIATES!5e0!3m2!1sen!2s!4v1793262942039!5m2!1sen!2s',
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`,
};
