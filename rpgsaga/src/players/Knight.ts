import { Hero } from "./Hero";
import { Logger } from "../game/Logger";

export class Knight extends Hero {
    constructor(name: string, health: number, strength: number, logger: Logger) {
        super(name, health, strength, logger);
    }

    getTypeName(): string { return "Рыцарь"; }

    attack(target: Hero): void {
        const damage = this.strength;
        this.logger.log(`${this.getTypeName()} ${this.getName()} наносит обычный удар половником: ${damage} урона противнику ${target.getName()}`);
        target.takeDamage(damage);
    }

    useAbility(target: Hero): boolean {
        const bonus = 0.3;
        const extraDamage = Math.floor(this.strength * bonus);
        const totalDamage = this.strength + extraDamage;
        this.logger.log(`${this.getTypeName()} ${this.getName()} использует Удар уборщицы и наносит ${totalDamage} урона противнику ${target.getName()}`);
        target.takeDamage(totalDamage);
        return true;
    }
}
