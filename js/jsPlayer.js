// Класс игрока
class Player {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        // Физические свойства
        this.velocityX = 0;
        this.velocityY = 0;
        this.speed = 5;
        this.jumpPower = 12;
        this.isOnGround = false;
        
        // Визуальные свойства
        this.color = '#E74C3C';
    }
    
    update(deltaTime, keys, gravity) {
        // Применение гравитации
        this.velocityY += gravity;
        
        // Обработка ввода
        this.velocityX = 0;
        
        if (keys['ArrowLeft'] || keys['KeyA']) {
            this.velocityX = -this.speed;
        }
        
        if (keys['ArrowRight'] || keys['KeyD']) {
            this.velocityX = this.speed;
        }
        
        if ((keys['Space'] || keys['KeyW'] || keys['ArrowUp']) && this.isOnGround) {
            this.velocityY = -this.jumpPower;
            this.isOnGround = false;
        }
        
        // Обновление позиции
        this.x += this.velocityX;
        this.y += this.velocityY;
        
        // Ограничение движения в пределах экрана
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > 800) this.x = 800 - this.width;
        
        // Сброс состояния на земле (будет установлено при коллизии)
        this.isOnGround = false;
    }
    
    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
}