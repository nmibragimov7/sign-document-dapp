export const crc32 = (...props) => {
    let [s] = props;
    s = String(s)
    let c = 0
    let j = 0
    let polynomial = props.length < 2 ? 0x04C11DB7 : props[1],
        initialValue = props.length < 3 ? 0xFFFFFFFF : props[2],
        finalXORValue = props.length < 4 ? 0xFFFFFFFF : props[3],
        crc = initialValue,
        table = []

    function reverse(x, n) {
        let b = 0
        while (n) {
            b = b * 2 + x % 2
            x /= 2
            x -= x % 1
            n--
        }
        return b
    }

    let range = 255
    c = 0
    for (let i = 0; i < s.length; i++) {
        c = s.charCodeAt(i)
        if(c > range) {
            range = c
        }
    }

    for (let i = range; i >= 0; i--) {
        c = reverse(i, 32)

        for (let j = 0; j < 8; j++) {
            c = ((c * 2) ^ (((c >>> 31) % 2) * polynomial)) >>> 0
        }

        table[i] = reverse(c, 32)
    }

    for (let i = 0; i < s.length; i++) {
        c = s.charCodeAt(i)
        if (c > range) {
            throw new RangeError()
        }
        j = (crc % 256) ^ c
        crc = ((crc / 256) ^ table[j]) >>> 0
    }

    return (crc ^ finalXORValue) >>> 0
}
