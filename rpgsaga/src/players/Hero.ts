import { Logger } from "../game/Logger";
import { Effect, EffectType } from "../effects/Effect";

export abstract class Hero {
    protected readonly name: string;
    protected health: number;
    protected readonly strength: number;
    protected readonly logger: Logger;
    private effects: Effect[] = [];
    private immunities: Set<EffectType> = new Set();
    private skipNextTurn: boolean = false;

    constructor(name: string, health: number, strength: number, logger: Logger) {
        this.name = name;
        this.health = health;
        this.strength = strength;
        this.logger = logger;
    }

    getName(): string { return this.name; }
    getHealth(): number { return this.health; }
    isAlive(): boolean { return this.health > 0; }

    addImmunity(effectType: EffectType): void { this.immunities.add(effectType); }
    isImmuneTo(effectType: EffectType): boolean { return this.immunities.has(effectType); }

    addEffect(effect: Effect): void {
        if (this.isImmuneTo(effect.type)) {
            this.logger.log(`${this.name} иммунитетен к эффекту ${effect.type}`);
            return;
        }
        this.effects.push(effect);
        effect.onApply(this);
    }

    updateEffects(): void {
        for (const effect of [...this.effects]) {
            effect.onTick(this);
            effect.duration--;
            if (effect.duration <= 0) {
                effect.onRemove(this);
                this.effects = this.effects.filter(e => e !== effect);
            }
        }
    }

    takeDamage(amount: number): void {
        if (amount <= 0) return;
        this.health -= amount;
        this.logger.log(`${this.name} получает ${amount} урона. Здоровье: ${this.health}`);
        if (this.health <= 0) this.logger.log(`${this.name} погибает!`);
    }

    heal(amount: number): void {
        this.health += amount;
        this.logger.log(`${this.name} восстанавливает ${amount} здоровья. Здоровье: ${this.health}`);
    }

    cleanseEffects(): void {
        for (const effect of this.effects) {
            effect.onRemove(this);
        }
        this.effects = [];
        this.logger.log(`${this.name} очищен от всех эффектов.`);
    }

    setSkipTurn(skip: boolean): void { this.skipNextTurn = skip; }
    shouldSkipTurn(): boolean { return this.skipNextTurn; }
    clearSkipTurn(): void { this.skipNextTurn = false; }

    abstract attack(target: Hero): void;
    abstract useAbility(target: Hero): boolean;
    abstract getTypeName(): string;
}
