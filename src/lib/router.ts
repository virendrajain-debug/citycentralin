export const HOME_ROUTE = '#/';
export const ABOUT_ROUTE = '#/about';
export const NAVBAR_HEIGHT = 80;

export const PHONE_DISPLAY = '+91 88896 77419';
export const PHONE_TEL = 'tel:+918889677419';
export const WHATSAPP_URL = 'https://wa.me/918889677419';
export const EMAIL_DISPLAY = 'citycentralindia@gmail.com';
export const EMAIL_MAILTO = 'mailto:citycentralindia@gmail.com';

export type Route = 'home' | 'about';

export function getRoute(): Route {
  if (typeof window === 'undefined') return 'home';
  return window.location.hash === ABOUT_ROUTE ? 'about' : 'home';
}

export function isAboutRoute(): boolean {
  return getRoute() === 'about';
}

export function goHome() {
  if (getRoute() !== 'home') {
    window.location.hash = HOME_ROUTE;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function goAbout() {
  window.location.hash = ABOUT_ROUTE;
  window.scrollTo({ top: 0 });
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

let pendingSection: string | null = null;

export function navigateToSection(id: string) {
  if (getRoute() === 'about') {
    pendingSection = id;
    window.location.hash = HOME_ROUTE;
  } else {
    scrollToSection(id);
  }
}

export function consumePendingSection(): string | null {
  const target = pendingSection;
  pendingSection = null;
  return target;
}