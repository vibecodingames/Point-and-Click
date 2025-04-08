class GameState {
    static currentScene = null;
    static character = null;
    static mousePosition = { x: 0, y: 0 };
    static scenes = {};

    static init(initialScene, characterData) {
        this.currentScene = initialScene;
        this.character = characterData;
    }

    static updateMousePosition(x, y) {
        this.mousePosition.x = x;
        this.mousePosition.y = y;
    }

    static changeScene(sceneName) {
        if (this.scenes[sceneName]) {
            this.currentScene = sceneName;
            return true;
        }
        return false;
    }
}