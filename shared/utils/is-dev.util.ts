export function isDevUtil(): boolean {
    const mode = process.env.NOVE_ENV || 'development';
    return mode === 'development';
}