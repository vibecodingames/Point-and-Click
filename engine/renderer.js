class Renderer {
    static ctx = null;
    static GAME_WIDTH = 800;
    static GAME_HEIGHT = 600;

    static init(context) {
        this.ctx = context;
    }

    static render() {
        const currentScene = GameState.scenes[GameState.currentScene];
        if (!currentScene) return;

        // Draw background (scaled to fit 800x600)
        const bgImage = GameState.images[currentScene.background];
        if (bgImage) {
            this.ctx.drawImage(bgImage, 0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
        }

        // Draw character (scaled appropriately)
        const character = GameState.character;
        const characterSprite = GameState.images[character.sprite];
        if (characterSprite) {
            // Adjust character size relative to screen height
            const charHeight = this.GAME_HEIGHT / 4; // Character takes 1/4 of screen height
            const charWidth = charHeight / 2; // Maintain character proportion

            this.ctx.drawImage(
                characterSprite,
                character.x,
                this.GAME_HEIGHT - charHeight - 10, // Place character near bottom
                charWidth,
                charHeight
            );
        }
    }
}