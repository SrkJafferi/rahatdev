/** Keep shared navigation usable from both the homepage and internal pages. */
export function siteHref(href: string, internalPage = false) {
  if (href === '#story') return '/about';
  if (href === '#projects') return '/projects';
  if (href === '#floor-plans') return '/floor-plans';
  if (href === '#services') return '/services';
  if (!internalPage || !href.startsWith('#')) return href;
  return href === '#home' ? '/' : `/${href}`;
}

