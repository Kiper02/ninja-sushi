export default function ms(time: string) {
    const value = parseInt(time);
    const type = time.slice(-1).toLowerCase();

    switch (type) {
        case 's':
            return value * 1000;
        case 'm':
            return value * 60 * 1000;
        case 'h':
            return value * 60 * 60 * 1000;
        case 'd':
            return value * 24 * 60 * 60 * 1000;
        default:
            throw new Error(`Invalid time type: ${type}`);
    }
}