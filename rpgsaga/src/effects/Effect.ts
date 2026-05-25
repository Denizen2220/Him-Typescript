export enum EffectType {
    BURNING,
    FROST,
    POISON
}

export interface Effect {
    type: EffectType;
    duration: number;
    onApply(target: any): void;
    onTick(target: any): void;
    onRemove(target: any): void;
}

export class FrostEffect implements Effect {
    type = EffectType.FROST;
    duration: number = 3;
    private readonly damagePerTick: number = 2;
    private readonly initialDamage: number;

    constructor(initialDamage: number) {
        this.initialDamage = initialDamage;
    }

    onApply(target: any): void {
        target.takeDamage(this.initialDamage);
    }

    onTick(target: any): void {
        target.takeDamage(this.damagePerTick);
    }

    onRemove(target: any): void {
    }
}
