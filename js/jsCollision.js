// Система обработки коллизий
class Collision {
    checkPlatformCollisions(player, platforms) {
        player.isOnGround = false;
        
        for (const platform of platforms) {
            if (this.rectRectCollision(player, platform)) {
                // Определяем сторону столкновения
                const playerBottom = player.y + player.height;
                const platformTop = platform.y;
                const playerTop = player.y;
                const platformBottom = platform.y + platform.height;
                const playerRight = player.x + player.width;
                const platformLeft = platform.x;
                const playerLeft = player.x;
                const platformRight = platform.x + platform.width;
                
                // Столкновение сверху (игрок падает на платформу)
                if (playerBottom > platformTop && 
                    playerBottom - player.velocityY <= platformTop && 
                    playerRight > platformLeft && 
                    playerLeft < platformRight) {
                    
                    player.y = platformTop - player.height;
                    player.velocityY = 0;
                    player.isOnGround = true;
                }
                // Столкновение снизу (игрок прыгает в платформу)
                else if (playerTop < platformBottom && 
                         playerTop - player.velocityY >= platformBottom && 
                         playerRight > platformLeft && 
                         playerLeft < platformRight) {
                    
                    player.y = platformBottom;
                    player.velocityY = 0;
                }
                // Столкновение слева
                else if (playerRight > platformLeft && 
                         playerRight - player.velocityX <= platformLeft && 
                         playerBottom > platformTop && 
                         playerTop < platformBottom) {
                    
                    player.x = platformLeft - player.width;
                }
                // Столкновение справа
                else if (playerLeft < platformRight && 
                         playerLeft - player.velocityX >= platformRight && 
                         playerBottom > platformTop && 
                         playerTop < platformBottom) {
                    
                    player.x = platformRight;
                }
            }
        }
    }
    
    checkCoinCollisions(player, coins, onCollect) {
        for (let i = coins.length - 1; i >= 0; i--) {
            const coin = coins[i];
            
            if (!coin.collected && this.rectRectCollision(player, coin)) {
                coin.collect();
                coins.splice(i, 1);
                onCollect(coin);
            }
        }
    }
    
    rectRectCollision(rect1, rect2) {
        const bounds1 = rect1.getBounds();
        const bounds2 = rect2.getBounds();
        
        return bounds1.x < bounds2.x + bounds2.width &&
               bounds1.x + bounds1.width > bounds2.x &&
               bounds1.y < bounds2.y + bounds2.height &&
               bounds1.y + bounds1.height > bounds2.y;
    }
}