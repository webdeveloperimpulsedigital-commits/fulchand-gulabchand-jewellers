import { store } from '@/content/site';

/** Contact hrefs. Return null when the client has not supplied the number yet. */
export const telHref = store.phone ? `tel:${store.phone}` : null;
export const instagramHref = store.instagram || 'https://www.instagram.com/fulchandgulabchand/';

export function whatsappHref(message = 'Hello, I would like to plan a visit to the store.') {
  return store.whatsapp ? `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(message)}` : null;
}
