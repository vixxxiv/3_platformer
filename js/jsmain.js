// Главный файл для инициализации игры
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    const startButton = document.getElementById('startButton');
    const pauseButton = document.getElementById('pauseButton');
    const restartButton = document.getElementById('restartButton');
    const nextLevelButton = document.getElementById('nextLevelButton');
    
    const scoreElement = document.getElementById('score');
    const levelElement = document.getElementById('level');
    const livesElement = document.getElementById('lives');
    const finalScoreElement = document.getElementById('finalScore');
    
    const gameOverScreen = document.getElementById('gameOver');
    const levelCompleteScreen = document.getElementById('levelComplete');
    
    // Создаем экземпляр игры
    const game = new Game(canvas, ctx, {
        scoreElement,
        levelElement,
        livesElement,
        finalScoreElement,
        gameOverScreen,
        levelCompleteScreen
    });
    
    // Обработчики кнопок
    startButton.addEventListener('click', () => {
        game.start();
        startButton.disabled = true;
        pauseButton.disabled = false;
    });
    
    pauseButton.addEventListener('click', () => {
        if (game.isPaused) {
            game.resume();
            pauseButton.textContent = 'Пауза';
        } else {
            game.pause();
            pauseButton.textContent = 'Продолжить';
        }
    });
    
    restartButton.addEventListener('click', () => {
        game.restart();
        gameOverScreen.classList.add('hidden');
        startButton.disabled = true;
        pauseButton.disabled = false;
        pauseButton.textContent = 'Пауза';
    });
    
    nextLevelButton.addEventListener('click', () => {
        game.nextLevel();
        levelCompleteScreen.classList.add('hidden');
        startButton.disabled = true;
        pauseButton.disabled = false;
        pauseButton.textContent = 'Пауза';
    });
    
    // Инициализация игры
    game.init();
});