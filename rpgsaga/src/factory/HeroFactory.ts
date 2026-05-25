// src/factory/HeroFactory.ts
import { Hero } from "../players/Hero";
import { Knight } from "../players/Knight";
import { Archer } from "../players/Archer";
import { Mage } from "../players/Mage";
import { Logger } from "../game/Logger";
import { RandomService } from "../utils/RandomService";

export class HeroFactory {
    private static readonly NAMES: string[] = ["Артур", "Гэндальф", "Леголас", "Мерлин", "Робин", "Вильямс", "Denizen", "Валера труба", "Вова автоподбор", "Кратос", "Иваныч"]

    static createHero(type: string, name: string, health: number, strength: number, logger: Logger): Hero {
        switch (type.toLowerCase()) {
            case "knight": return new Knight(name, health, strength, logger);
            case "archer": return new Archer(name, health, strength, logger);
            case "mage":   return new Mage(name, health, strength, logger);
            default: throw new Error(`Unknown hero type: ${type}`);
        }
    }

    static createRandomHeroes(count: number, logger: Logger, random: RandomService): Hero[] {
        const heroes: Hero[] = [];
        for (let i = 0; i < count; i++) {
            const type = random.pick(["knight", "archer", "mage"]);
            const name = random.pick(this.NAMES);
            const health = random.int(50, 150);
            const strength = random.int(10, 40);
            heroes.push(this.createHero(type, name, health, strength, logger));
        }
        return heroes;
    }
}
