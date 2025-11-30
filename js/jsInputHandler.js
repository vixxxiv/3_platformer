// Обработчик ввода
class InputHandler {
    constructor() {
        this.keys = {};
        
        // Обработчики событий клавиатуры
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            
            // Предотвращаем прокрутку страницы при использовании пробела
            if (e.code === 'Space') {
                e.preventDefault();
            }
        });
        
        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
        
        // Обработчики для кнопок на экране (для мобильных устройств)
        this.setupTouchControls();
    }
    
    setupTouchControls() {
        // Можно добавить сенсорное управление для мобильных устройств
        // В этой версии фокусируемся на десктопном управлении
    }
}