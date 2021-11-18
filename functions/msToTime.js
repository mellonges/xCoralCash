export function msToTimeForDashboard(time) {
    let v = 1
    const object = {
        min: ((time * (v /= 60)) | 0) % 60,
        hrs: ((time * (v /= 60)) | 0) % 24,
        day: ((time * (v /= 24)) | 0) % 500,
        // month: ((time * (v /= 30)) | 0) % 12,
        // year: ((time * (v /= 12)) | 0)
    }

    return Object.keys(object).reverse().map(e => ({ key: e, value: object[e] })).filter(e => e.value).map(e => `${e.value}${e.key}`).join(' ')
}


export function msToTime(time) {
    let timeSeconds = time 
    if (timeSeconds < 36000) {
        return (Math.floor(timeSeconds / 60)) + "mins"
    }
    else if (timeSeconds < 3500000) {
        return (Math.floor(timeSeconds / 3600)) + "hrs"
    }
    else return (Math.floor(timeSeconds / 86400)) + "days"
}

