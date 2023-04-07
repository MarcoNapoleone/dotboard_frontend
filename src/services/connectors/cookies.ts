export const setCookie = async (name: string, value: string, days: number) => {
    return new Promise(resolve => {
        const expires = new Date(Date.now() + days * 864e5).toUTCString()
        document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/' + '; SameSite=Lax'
        setTimeout(resolve, 1000);
    })
}

export const getCookie = (name: string) => {
    const value = '; ' + document.cookie
    const parts = value.split('; ' + name + '=')
    if (parts.length === 2) return decodeURIComponent(parts.pop()?.split(';').shift())
}

export const deleteCookie = (name: string) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}
