class Dog {
    private name: string;
    private breed: string;
    private age: number;

    constructor(name: string, breed: string, age: number) {
        this.name = name;
        this.breed = breed;
        this.age = age;
    }

    getAge(): number {
        return this.age;
    }

    setAge(newAge: number): void {
        if (newAge >= 0) {
            this.age = newAge;
        } else {
            console.log("Ошибка: возраст не может быть отрицательным!");
        }
    }

    bark(): void {
        console.log(`${this.name} гавкает: Гав-гав!`);
    }

    static createDog(name: string, breed: string, age: number): Dog {
        return new Dog(name, breed, age);
    }

    showInfo(): void {
        console.log(`Собака: ${this.name}, порода: ${this.breed}, возраст: ${this.age} лет`);
    }
}

console.log("--- Создаём собаку через new Dog() ---");
const myDog = new Dog("Рекс", "Немецкая овчарка", 3);
myDog.showInfo();
myDog.bark();
console.log(`Возраст через getAge(): ${myDog.getAge()} лет`);

console.log("\n--- Меняем возраст на 4 года ---");
myDog.setAge(4);
myDog.showInfo();

console.log("\n--- Попытка установить отрицательный возраст ---");
myDog.setAge(-1);
myDog.showInfo();

console.log("\n--- Создаём собаку через Dog.createDog() ---");
const anotherDog = Dog.createDog("Бобик", "Дворняга", 5);
anotherDog.showInfo();
anotherDog.bark();

console.log(`Возраст Бобика: ${anotherDog.getAge()}`);
anotherDog.setAge(6);
console.log(`Теперь возраст Бобика: ${anotherDog.getAge()}`);
