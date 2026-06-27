import type { StorageLike } from '@vueuse/core';

const maxCookieAgeSeconds = 60 * 60 * 24 * 400;

export const localeCookieKey = 'it-tools-locale';
export const legacyLocaleCookieKey = 'it-tools:locale';
export const favoriteToolsCookieKey = 'it-tools-favorite-tools';
export const legacyFavoriteToolsCookieKey = 'it-tools:favoriteToolsName';

function getCookieOptions() {
  const options = [
    `Max-Age=${maxCookieAgeSeconds}`,
    'Path=/',
    'SameSite=Lax',
  ];

  if (window.location.protocol === 'https:') {
    options.push('Secure');
  }

  return options.join('; ');
}

export const permanentCookieStorage: StorageLike = {
  getItem(key: string) {
    const encodedKey = encodeURIComponent(key);
    const cookie = document.cookie
      .split(';')
      .map(cookie => cookie.trim())
      .find(cookie => cookie.startsWith(`${encodedKey}=`));

    if (!cookie) {
      return null;
    }

    return decodeURIComponent(cookie.slice(encodedKey.length + 1));
  },

  setItem(key: string, value: string) {
    document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; ${getCookieOptions()}`;
  },

  removeItem(key: string) {
    document.cookie = `${encodeURIComponent(key)}=; Max-Age=0; Path=/; SameSite=Lax`;
  },
};
