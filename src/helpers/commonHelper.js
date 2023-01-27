export function generateRandomString(length) {
    let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

export function distanceArray(startValue, endValue) {
    let result = [];
    for (let i = startValue; i <= endValue; i++) result.push(i);
    return result;
}