import * as readline from 'readline';
import { Game } from "./game/Game";
import { Logger } from "./game/Logger";
import { RandomService } from "./utils/RandomService";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Введите чётное количество игроков: ', (countStr: string) => {
    const count = parseInt(countStr);
    if (isNaN(count) || count % 2 !== 0 || count <= 0) {
        console.log("Ошибка: нужно чётное положительное число.");
        rl.close();
        return;
    }
    const logger = new Logger();
    const random = new RandomService();
    const game = new Game(count, logger, random);
    game.start();
    rl.close();
});
