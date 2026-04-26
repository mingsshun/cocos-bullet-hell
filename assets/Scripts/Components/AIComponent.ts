export enum AIType {
    CHASER,
    SHOOTER
}

export class AIComponent {
    type: AIType;

    // state = 'idle';
    cooldown = 0;
}