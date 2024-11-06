function getCookies() {
    return document.cookie.split(';').reduce((cookies, cookie) => {
    const [key, value] = cookie.split('=');
    cookies[key.trim()] = value;
    return cookies;
    }, {});
}

// HTTPOnly Cookieを含む全てのCookieを送信するfetchオプションを取得する
function getFetchOptionsWithCookies(url, options = {}) {
    const cookies = getCookies();
    const cookieHeader = Object.entries(cookies)
    .map(([key, value]) => `${key}=${value}`)
    .join('; ');

    return {
    ...options,
    headers: {
        ...options.headers,
        'Cookie': cookieHeader
    }
    };
}

const fetchOptions = getFetchOptionsWithCookies('/pf-profile')
fetch('/pf-profile', fetchOptions)
    .then(response => response.text())
    .then(html => {
    // Create a temporary DOM element to parse the HTML
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;

    // Now you can use querySelectorAll on the tempElement
    const elms = tempElement.querySelectorAll('.item-e .input-e');
    console.debug(elms[1].textContent)
    })
    .catch(error => {
    console.error('Error:', error);
});
