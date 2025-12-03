// Main Entry Point

import { Game } from './core/Game.js';

// Wait for DOM to be fully loaded
window.addEventListener('load', () => {
    console.log('DOM loaded, initializing game...');

    // Get canvas elements
    const gameCanvas = document.getElementById('gameCanvas');
    const uiCanvas = document.getElementById('ui');

    if (!gameCanvas || !uiCanvas) {
        console.error('Canvas elements not found!');
        return;
    }

    // Create game instance
    const game = new Game(gameCanvas, uiCanvas);

    // Setup restart button handlers
    const restartButton = document.getElementById('restartButton');
    const playAgainButton = document.getElementById('playAgainButton');
    const gameOverScreen = document.getElementById('gameOverScreen');
    const levelCompleteScreen = document.getElementById('levelCompleteScreen');

    restartButton.addEventListener('click', () => {
        gameOverScreen.classList.remove('active');
        game.reset();
    });

    playAgainButton.addEventListener('click', () => {
        levelCompleteScreen.classList.remove('active');
        game.reset();
    });

    // Store game instance globally for debugging (optional)
    window.game = game;

    // Start the game
    game.start();

    console.log('Game started successfully!');
});
