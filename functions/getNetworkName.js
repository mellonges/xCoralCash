export default function networkName(id) {
    switch (Number(id)) {
        case 1:
            return 'Main'
        case 3:
            return 'Ropsten'
        case 4:
            return 'Rinkeby'
        case 5:
            return 'Goerli'
        case 42:
            return 'Kovan'
        case 100:
            return 'Xdai'
        case 'localhost':
            return 'localhost'
        default:
            return 'unsupported'
    }
}