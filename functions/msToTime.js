export function msToTime(time) {
    let v = 1
    const object = {
        m: ((time * (v /= 60)) | 0) % 60,
        h: ((time * (v /= 60)) | 0) % 24,
        D: ((time * (v /= 24)) | 0) % 30,
        M: ((time * (v /= 30)) | 0) % 12,
        Y: ((time * (v /= 12)) | 0) 
    }

    return Object.keys(object).reverse().map(e => ({key: e, value: object[e]})).filter(e => e.value).map(e => `${e.value}${e.key}`).join(' ')
}
