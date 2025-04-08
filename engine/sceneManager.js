class SceneManager {
    static async init() {
        try {
            // Load scenes data
            const scenesResponse = await fetch('data/scenes.json');
            const characterResponse = await fetch('data/character.json');
            
            const scenesData = await scenesResponse.json();
            const characterData = await characterResponse.json();

            // Initialize game state
            GameState.scenes = scenesData;
            GameState.character = new Character(characterData);
            GameState.currentScene = 'scene1';

            // Preload images
            await this.preloadImages();
        } catch (error) {
            console.error('Failed to initialize game:', error);
        }
    }

    static async preloadImages() {
        const imagePromises = [];
        const images = {};

        // Load background images
        Object.values(GameState.scenes).forEach(scene => {
            const img = new Image();
            img.src = `assets/images/${scene.background}`;
            imagePromises.push(new Promise(resolve => {
                img.onload = resolve;
            }));
            images[scene.background] = img;
        });

        // Load character sprite
        const characterImg = new Image();
        characterImg.src = `assets/images/${GameState.character.sprite}`;
        imagePromises.push(new Promise(resolve => {
            characterImg.onload = resolve;
        }));
        images[GameState.character.sprite] = characterImg;

        await Promise.all(imagePromises);
        GameState.images = images;
    }

    static update() {
        GameState.character.update();
        
        // Check for scene transitions
        const currentSceneData = GameState.scenes[GameState.currentScene];
        for (const exit of currentSceneData.exits) {
            if (this.isCharacterInArea(exit.area)) {
                GameState.changeScene(exit.to);
                this.adjustCharacterPosition(exit);
                break;
            }
        }
    }

    static isCharacterInArea(area) {
        const char = GameState.character;
        return char.x >= area.x && 
               char.x <= area.x + area.width && 
               char.y >= area.y && 
               char.y <= area.y + area.height;
    }

    static handleClick(x, y) {
        // Move character to clicked position
        GameState.character.moveTo(x, y);
    }

    static adjustCharacterPosition(exit) {
        const char = GameState.character;
        // If exiting through left, place on right of new scene
        if (exit.area.x === 0) {
            char.x = Renderer.GAME_WIDTH - 150;
            char.targetX = char.x; // Update target position
            char.y = 600; // Keep character at bottom area
            char.targetY = char.y;
        } else {
            // If exiting through right, place on left of new scene
            char.x = 150;
            char.targetX = char.x;
            char.y = 600;
            char.targetY = char.y;
        }
        char.moving = false; // Stop any ongoing movement
    }
}