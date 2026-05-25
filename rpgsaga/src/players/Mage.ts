import { Hero } from "./Hero";
import { Logger } from "../game/Logger";

export class Mage extends Hero {
    private healUsed: boolean = false;

    constructor(name: string, health: number, strength: number, logger: Logger) {
        super(name, health, strength, logger);
    }

    getTypeName(): string { return "Маг"; }

    attack(target: Hero): void {
        const damage = this.strength;
        this.logger.log(`${this.getTypeName()} ${this.getName()} наносит магический удар как Гарри Поттер: ${damage} урона противнику ${target.getName()}`);
        target.takeDamage(damage);
    }

    useAbility(target: Hero): boolean {
        if (!this.healUsed && Math.random() < 0.5) {
            return this.castHeal(target);
        } else {
            return this.castCharm(target);
        }
    }

    private castCharm(target: Hero): boolean {
        this.logger.log(`${this.getTypeName()} ${this.getName()} даёт таблетку снотворного ${target.getName()}`);
        target.setSkipTurn(true);
        return true;
    }

    private castHeal(target: Hero): boolean {
        this.healUsed = true;
        const healAmount = 20;
        target.heal(healAmount);
        target.cleanseEffects();
        this.logger.log(`${this.getTypeName()} ${this.getName()} Смотрит как на позорище и лечит ${target.getName()} на ${healAmount} HP и снимает все эффекты`);
        return true;
    }
}
