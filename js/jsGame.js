// Основной класс игры
class Game {
    constructor(canvas, ctx, uiElements) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.uiElements = uiElements;
        
        // Игровые параметры
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.isRunning = false;
        this.isPaused = false;
        this.gameOver = false;
        
        // Игровые объекты
        this.player = null;
        this.platforms = [];
        this.coins = [];
        this.inputHandler = null;
        this.collisionSystem = null;
        this.renderer = null;
        
        // Физические параметры
        this.gravity = 0.5;
        
        // Игровой цикл
        this.lastTime = 0;
        this.accumulator = 0;
        this.timeStep = 1000 / 60; // 60 FPS
        
        this.init();
    }
    
    init() {
        // Инициализация систем
        this.inputHandler = new InputHandler();
        this.collisionSystem = new Collision();
        this.renderer = new Renderer(this.ctx, this.canvas);
        
        // Создание игровых объектов
        this.createPlayer();
        this.generateLevel(this.level);
        
        // Обновление UI
        this.updateUI();
    }
    
    createPlayer() {
        this.player = new Player(
            this.canvas.width / 2 - 25,
            this.canvas.height - 150,
            50,
            50
        );
    }
    
    generateLevel(level) {
        // Очистка предыдущих объектов
        this.platforms = [];
        this.coins = [];
        
        // Базовые платформы
        this.platforms.push(new Platform(0, this.canvas.height - 20, this.canvas.width, 20)); // Пол
        this.platforms.push(new Platform(100, 400, 200, 20));
        this.platforms.push(new Platform(400, 350, 150, 20));
        this.platforms.push(new Platform(200, 250, 200, 20));
        this.platforms.push(new Platform(500, 200, 150, 20));
        this.platforms.push(new Platform(100, 150, 200, 20));
        
        // Добавляем платформы в зависимости от уровня
        if (level >= 2) {
            this.platforms.push(new Platform(650, 300, 100, 20));
            this.platforms.push(new Platform(300, 100, 100, 20));
        }
        
        if (level >= 3) {
            this.platforms.push(new Platform(50, 200, 80, 20));
            this.platforms.push(new Platform(700, 150, 80, 20));
        }
        
        // Создание монет
        for (let i = 0; i < 5 + level * 2; i++) {
            const x = Math.random() * (this.canvas.width - 30);
            const y = Math.random() * (this.canvas.height - 150);
            this.coins.push(new Coin(x, y, 20, 20));
        }
    }
    
    start() {
        if (!this.isRunning && !this.gameOver) {
            this.isRunning = true;
            this.isPaused = false;
            this.gameLoop();
        }
    }
    
    pause() {
        this.isPaused = true;
    }
    
    resume() {
        this.isPaused = false;
        this.gameLoop();
    }
    
    restart() {
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.gameOver = false;
        this.isRunning = false;
        this.isPaused = false;
        
        this.createPlayer();
        this.generateLevel(this.level);
        this.updateUI();
    }
    
    nextLevel() {
        this.level++;
        this.createPlayer();
        this.generateLevel(this.level);
        this.updateUI();
        this.start();
    }
    
    gameLoop(currentTime = 0) {
        if (!this.isRunning || this.isPaused) return;
        
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        this.accumulator += deltaTime;
        
        while (this.accumulator >= this.timeStep) {
            this.update(this.timeStep);
            this.accumulator -= this.timeStep;
        }
        
        this.render();
        
        if (!this.gameOver) {
            requestAnimationFrame((time) => this.gameLoop(time));
        }
    }
    
    update(deltaTime) {
        // Обновление игрока
        this.player.update(deltaTime, this.inputHandler.keys, this.gravity);
        
        // Проверка коллизий с платформами
        this.collisionSystem.checkPlatformCollisions(this.player, this.platforms);
        
        // Проверка коллизий с монетами
        this.collisionSystem.checkCoinCollisions(this.player, this.coins, (coin) => {
            this.score += 10;
            this.updateUI();
        });
        
        // Проверка выхода за границы экрана
        if (this.player.y > this.canvas.height) {
            this.lives--;
            this.updateUI();
            
            if (this.lives <= 0) {
                this.endGame();
            } else {
                // Респавн игрока
                this.player.x = this.canvas.width / 2 - 25;
                this.player.y = this.canvas.height - 150;
                this.player.velocityY = 0;
            }
        }
        
        // Проверка завершения уровня
        if (this.coins.length === 0) {
            this.completeLevel();
        }
    }
    
    render() {
        this.renderer.clear();
        this.renderer.drawBackground();
        
        // Отрисовка платформ
        this.platforms.forEach(platform => {
            this.renderer.drawPlatform(platform);
        });
        
        // Отрисовка монет
        this.coins.forEach(coin => {
            this.renderer.drawCoin(coin);
        });
        
        // Отрисовка игрока
        this.renderer.drawPlayer(this.player);
        
        // Отрисовка UI
        this.renderer.drawUI(this.score, this.level, this.lives);
    }
    
    updateUI() {
        this.uiElements.scoreElement.textContent = this.score;
        this.uiElements.levelElement.textContent = this.level;
        this.uiElements.livesElement.textContent = this.lives;
    }
    
    completeLevel() {
        this.isRunning = false;
        this.uiElements.levelCompleteScreen.classList.remove('hidden');
    }
    
    endGame() {
        this.isRunning = false;
        this.gameOver = true;
        this.uiElements.finalScoreElement.textContent = this.score;
        this.uiElements.gameOverScreen.classList.remove('hidden');
    }
}