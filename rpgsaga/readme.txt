Коротко о том что внутри
src/	Корневая папка
   players/
	Hero.ts База для героев 
	Knight.ts
	Archer.ts
	Mage.ts
   effects/
	Effect.ts Ну эфекты
   factory/
        HeroFactory.ts Фабрика героев
   game/
	Logger.ts - код для логирования
	Game.ts - код игрового процесса
   tests/
	game.test.ts - код unit тестов
   index.ts - центральный код (начальник всего тут)


npm install --save-dev jest @types/jest ts-jest
npx ts-jest config:init
npx ts-node src/index.ts
