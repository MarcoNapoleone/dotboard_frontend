export const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    const cookieOptions = {
        path: '/',
        sameSite: 'Lax',
        secure: window.location.protocol === 'https:',
    };
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; ${formatCookieOptions(cookieOptions)}`;
};

const formatCookieOptions = (options) => {
    return Object.entries(options)
      .map(([key, value]) => {
          if (value === true) {
              return key;
          } else {
              return `${key}=${value}`;
          }
      })
      .join('; ');
};
export const getCookie = (name: string) => {
    const value = '; ' + document.cookie
    const parts = value.split('; ' + name + '=')
    if (parts.length === 2) return decodeURIComponent(parts.pop()?.split(';').shift())
}

export const deleteCookie = (name) => {
    const cookies = document.cookie.split(';');
    const updatedCookies = cookies.map(cookie => {
        const trimmedCookie = cookie.trim();
        if (trimmedCookie.indexOf(name) !== 0) {
            return trimmedCookie;
        }
        return `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=${window.location.pathname}; SameSite=Lax; Secure`;
    });
    document.cookie = updatedCookies.join(';');
};