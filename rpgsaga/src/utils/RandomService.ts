export class RandomService {
    int(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    pick<T>(array: T[]): T {
        return array[Math.floor(Math.random() * array.length)];
    }
    boolean(chance: number = 0.5): boolean {
        return Math.random() < chance;
    }
}
