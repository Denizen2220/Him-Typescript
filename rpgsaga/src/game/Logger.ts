export class Logger {
    private logs: string[] = [];

    log(message: string): void {
        this.logs.push(message);
        console.log(message);
    }

    getFullLog(): string {
        return this.logs.join('\n');
    }

    clear(): void {
        this.logs = [];
    }
}
