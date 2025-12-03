// Input Management System

export class InputManager {
    constructor() {
        this.keys = {};
        this.initEventListeners();
    }

    initEventListeners() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;

            // Prevent default for game keys
            const gameKeys = [
                'arrowup', 'arrowdown', 'arrowleft', 'arrowright',
                ' ', 'w', 'a', 's', 'd', 'z', 'x', 'q', 'e', 'escape'
            ];

            if (gameKeys.includes(e.key.toLowerCase())) {
                e.preventDefault();
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });
    }

    isKeyPressed(key) {
        return this.keys[key.toLowerCase()] || false;
    }

    resetKey(key) {
        this.keys[key.toLowerCase()] = false;
    }
}
