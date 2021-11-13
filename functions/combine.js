export function combineTableInfo(obj) {
    const arr = [];

    const maxLengthArr = Math.max(obj[0].length, obj[1].length, obj[2].length);

    for (let i = 0; i < maxLengthArr; i++) {
        const el = {
            0: obj[0][i],
            1: obj[1][i],
            2: obj[2][i],
        };

        arr.push(el);
    }
    return arr

}