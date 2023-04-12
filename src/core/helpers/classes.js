export const classes = (...args) => {

    return args.reduce((cls, classes) => {
        if (typeof classes === 'string') {
            cls.push(classes)
        } else if (!!classes) {
            const validCLs = Object.keys(classes).filter(clsKey => classes[clsKey])
            cls.push(validCLs.join(" "))
        }
        return cls
    }, []).join(" ")
}
