const a: number = 2.0;
const b: number = 0.95;

console.log("=== Задача A ===");
console.log("x1 = 1.25, xk = 2.75, Δx = 0.3");

const x1: number = 1.25;
const xk: number = 2.75;
const dx: number = 0.3;

const xArrayA: number[] = [];

const steps: number = Math.round((xk - x1) / dx); // = 5
for (let i: number = 0; i <= steps; i++) {
    let x: number = x1 + i * dx;
    xArrayA.push(x);
}

for (let i: number = 0; i < xArrayA.length; i++) {
    let x: number = xArrayA[i];

    let logVal: number = Math.log10(x / a);
    let numerator: number = 1 + logVal * logVal;
    let denominator: number = b - Math.exp(x);
    let y: number = numerator / denominator;

    console.log(`x = ${x.toFixed(5)}  ->  y = ${y.toFixed(5)}`);
}

console.log();

console.log("=== Задача B ===");
console.log("Заданные x: 2.2, 3.78, 4.51, 6.58, 1.2");

const xArrayB: number[] = [2.2, 3.78, 4.51, 6.58, 1.2];

for (let i: number = 0; i < xArrayB.length; i++) {
    let x: number = xArrayB[i];

    let logVal: number = Math.log10(x / a);
    let numerator: number = 1 + logVal * logVal;
    let denominator: number = b - Math.exp(x);
    let y: number = numerator / denominator;

    console.log(`x = ${x.toFixed(5)}  ->  y = ${y.toFixed(5)}`);
}
