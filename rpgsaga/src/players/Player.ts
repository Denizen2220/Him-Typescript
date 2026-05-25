import { Logger } from "../game/Logger";

export abstract class Player {
    protected name: string;
    protected health: number;
    protected strength: number;
    protected logger: Logger;

    constructor(name: string, health: number, strength: number, logger: Logger) {
        this.name = name;
        this.health = health;
        this.strength = strength;
        this.logger = logger;
    }

    getName(): string { return this.name; }
    getHealth(): number { return this.health; }
    isAlive(): boolean { return this.health > 0; }

    takeDamage(damage: number): void {
        if (damage <= 0) return;
        this.health -= damage;
        this.logger.log(`${this.name} получает ${damage} урона. Здоровье: ${this.health}`);
        if (this.health <= 0) {
            this.logger.log(`${this.name} погибает!`);
        }
    }

    abstract attack(target: Player): void;

    abstract useAbility(target: Player): boolean;

    getTypeName(): string {
        return this.constructor.name;
    }
    protected skipNextTurn: boolean = false;

    shouldSkipTurn(): boolean {
        return this.skipNextTurn;
    }

    clearSkipTurn(): void {
        this.skipNextTurn = false;
    }

    setSkipTurn(skip: boolean): void {
        this.skipNextTurn = skip;
    }

}
