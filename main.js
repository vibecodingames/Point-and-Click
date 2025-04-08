const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = 600;
    canvas.height = 800;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

async function initGame() {
    try {
        await SceneManager.init();
        Input.init(canvas);
        Renderer.init(ctx);
        gameLoop();
    } catch (error) {
        console.error('Error during initialization:', error);
    }
}

function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update game state and character
    SceneManager.update();
    
    // Render current scene
    Renderer.render();
    
    // Continue the game loop
    requestAnimationFrame(gameLoop);
}

window.addEventListener('load', initGame);