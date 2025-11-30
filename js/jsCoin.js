// Класс монеты
class Coin {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.collected = false;
        this.animationFrame = 0;
    }
    
    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
    
    update() {
        // Анимация вращения монеты
        this.animationFrame = (this.animationFrame + 1) % 60;
    }
    
    collect() {
        this.collected = true;
    }
}