export default function configUtil<T>(variable: string): T {
    const value = process.env[variable];
    if (!value) {
        throw new Error('Invalid variable variable');
    }
    return value as T;
}