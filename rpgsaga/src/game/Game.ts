// src/game/Game.ts
import { Hero } from "../players/Hero";
import { Logger } from "./Logger";
import { HeroFactory } from "../factory/HeroFactory";
import { RandomService } from "../utils/RandomService";

export class Game {
    private heroes: Hero[];
    private logger: Logger;
    private random: RandomService;

    constructor(playerCount: number, logger: Logger, random: RandomService) {
        if (playerCount % 2 !== 0) throw new Error("Ну тебе же написали что надо чётное количество!");
        this.logger = logger;
        this.random = random;
        this.heroes = HeroFactory.createRandomHeroes(playerCount, logger, random);
    }

    start(): void {
        let round = 0;
        while (this.heroes.length > 1) {
            round++;
            this.logger.log(`\n========== Раунд ${round} ==========`);
            this.heroes = this.playRound(this.heroes);
            this.heroes = this.heroes.filter(h => h.isAlive());
        }
        if (this.heroes.length === 1) {
            const winner = this.heroes[0];
            this.logger.log(`\n🏆 Победитель: ${winner.getTypeName()} ${winner.getName()} 🏆`);
        }
    }

    private playRound(players: Hero[]): Hero[] {
        for (let i = players.length - 1; i > 0; i--) {
            const j = this.random.int(0, i);
            [players[i], players[j]] = [players[j], players[i]];
        }
        const winners: Hero[] = [];
        for (let i = 0; i < players.length; i += 2) {
            if (i + 1 >= players.length) break;
            const winner = this.battle(players[i], players[i+1]);
            winners.push(winner);
        }
        return winners;
    }

    private battle(heroA: Hero, heroB: Hero): Hero {
        this.logger.log(`\n(${heroA.getTypeName()}) ${heroA.getName()} vs (${heroB.getTypeName()}) ${heroB.getName()}`);
        let first = this.random.boolean() ? heroA : heroB;
        let second = first === heroA ? heroB : heroA;
        let turn = 0;
        while (first.isAlive() && second.isAlive()) {
            const attacker = (turn % 2 === 0) ? first : second;
            const defender = attacker === first ? second : first;

            attacker.updateEffects();
            defender.updateEffects();
            if (!defender.isAlive()) break;


            if (this.random.boolean(0.3)) {
                attacker.useAbility(defender);
            } else {
                attacker.attack(defender);
            }
            if (!defender.isAlive()) break;
            turn++;
        }
        const winner = first.isAlive() ? first : second;
        this.logger.log(`${winner.getName()} побеждает!`);
        return winner;
    }
}
