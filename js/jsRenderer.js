// Класс для отрисовки
class Renderer {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
    }
    
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    drawBackground() {
        // Градиентный фон
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#1E90FF');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Облака
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        this.ctx.beginPath();
        this.ctx.arc(100, 80, 30, 0, Math.PI * 2);
        this.ctx.arc(130, 70, 40, 0, Math.PI * 2);
        this.ctx.arc(160, 80, 30, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.beginPath();
        this.ctx.arc(600, 120, 35, 0, Math.PI * 2);
        this.ctx.arc(630, 110, 45, 0, Math.PI * 2);
        this.ctx.arc(660, 120, 35, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    drawPlayer(player) {
        // Тело игрока
        this.ctx.fillStyle = player.color;
        this.ctx.fillRect(player.x, player.y, player.width, player.height);
        
        // Глаза
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(player.x + 10, player.y + 10, 8, 8);
        this.ctx.fillRect(player.x + player.width - 18, player.y + 10, 8, 8);
        
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(player.x + 12, player.y + 12, 4, 4);
        this.ctx.fillRect(player.x + player.width - 16, player.y + 12, 4, 4);
        
        // Улыбка
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 2;
        this.ctx.arc(player.x + player.width / 2, player.y + 30, 10, 0.2, Math.PI - 0.2);
        this.ctx.stroke();
    }
    
    drawPlatform(platform) {
        // Основная платформа
        this.ctx.fillStyle = platform.color;
        this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        
        // Текстура платформы
        this.ctx.fillStyle = '#27AE60';
        for (let i = 0; i < platform.width; i += 20) {
            this.ctx.fillRect(platform.x + i, platform.y, 10, 5);
        }
    }
    
    drawCoin(coin) {
        coin.update();
        
        // Анимация вращения монеты
        const scale = 0.8 + Math.sin(coin.animationFrame * 0.1) * 0.2;
        const coinX = coin.x + coin.width / 2;
        const coinY = coin.y + coin.height / 2;
        const radius = coin.width / 2 * scale;
        
        // Внешний круг (золотой)
        const gradient = this.ctx.createRadialGradient(
            coinX, coinY, 0,
            coinX, coinY, radius
        );
        gradient.addColorStop(0, '#FFD700');
        gradient.addColorStop(1, '#B8860B');
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(coinX, coinY, radius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Внутренний круг
        this.ctx.fillStyle = '#FFF8DC';
        this.ctx.beginPath();
        this.ctx.arc(coinX, coinY, radius * 0.6, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Блики
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        this.ctx.beginPath();
        this.ctx.arc(coinX - radius * 0.3, coinY - radius * 0.3, radius * 0.2, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    drawUI(score, level, lives) {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(10, 10, 150, 80);
        
        this.ctx.fillStyle = 'white';
        this.ctx.font = '16px Arial';
        this.ctx.fillText(`Очки: ${score}`, 20, 30);
        this.ctx.fillText(`Уровень: ${level}`, 20, 50);
        this.ctx.fillText(`Жизни: ${lives}`, 20, 70);
    }
}