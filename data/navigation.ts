export interface NavItem {
  key: string;
  href: string;
  labelKey: string;
}

export const navigationItems: NavItem[] = [
  { key: 'home', href: '/', labelKey: 'nav.home' },
  { key: 'services', href: '/services', labelKey: 'nav.services' },
  { key: 'projects', href: '/projects', labelKey: 'nav.projects' },
  { key: 'about', href: '/about', labelKey: 'nav.about' },
  { key: 'blog', href: '/blog', labelKey: 'nav.blog' },
  { key: 'contact', href: '/contact', labelKey: 'nav.contact' },
];

export const footerQuickLinks: NavItem[] = [
  { key: 'services', href: '/services', labelKey: 'nav.services' },
  { key: 'projects', href: '/projects', labelKey: 'nav.projects' },
  { key: 'about', href: '/about', labelKey: 'nav.about' },
  { key: 'contact', href: '/contact', labelKey: 'nav.contact' },
  { key: 'privacy', href: '/privacy-policy', labelKey: 'nav.privacy' },
];
