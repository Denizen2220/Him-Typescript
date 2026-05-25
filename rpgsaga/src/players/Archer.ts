import { Hero } from "./Hero";
import { FrostEffect } from "../effects/Effect";
import { Logger } from "../game/Logger";

export class Archer extends Hero {
    private frostAbilityUsedCount: number = 0;
    private readonly maxFrostUses: number = 2;

    constructor(name: string, health: number, strength: number, logger: Logger) {
        super(name, health, strength, logger);
    }

    getTypeName(): string { return "Лучник"; }

    attack(target: Hero): void {
        const damage = this.strength;
        this.logger.log(`${this.getTypeName()} ${this.name} наносит обычный урон выстрелива Samsung Galaxy S7: ${damage} урона противнику ${target.getName()}`);
        target.takeDamage(damage);
    }

    useAbility(target: Hero): boolean {
        if (this.frostAbilityUsedCount >= this.maxFrostUses) {
            this.logger.log(`${this.getTypeName()} ${this.name} пытается использовать Спиртовые стрелы, но весь спирт выпили.`);
            return false;
        }
        this.frostAbilityUsedCount++;
        const initialDamage = this.strength;
        const effect = new FrostEffect(initialDamage);
        target.addEffect(effect);
        this.logger.log(`${this.getTypeName()} ${this.name} использует Спиртовые стрелы! Наносит ${initialDamage} урона и накладывает опьянение на 3 хода.`);
        return true;
    }
}
