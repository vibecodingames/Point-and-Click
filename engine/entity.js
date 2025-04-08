class Entity {
    constructor(x, y, width, height, sprite) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = sprite;
        this.targetX = x;
        this.targetY = y;
        this.speed = 3;
        this.moving = false;
    }

    isPointInside(x, y) {
        return x >= this.x && 
               x <= this.x + this.width && 
               y >= this.y && 
               y <= this.y + this.height;
    }

    update() {
        if (this.moving) {
            const dx = this.targetX - this.x;
            const dy = this.targetY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > this.speed) {
                this.x += (dx / distance) * this.speed;
                this.y += (dy / distance) * this.speed;
            } else {
                this.x = this.targetX;
                this.y = this.targetY;
                this.moving = false;
            }
        }
    }
}

class Character extends Entity {
    constructor(characterData) {
        super(
            characterData.position.x,
            characterData.position.y,
            50,
            100,
            characterData.sprite
        );
        this.name = characterData.name;
        this.speed = 5; // Increased speed for better responsiveness
    }

    moveTo(x, y) {
        this.targetX = Math.max(50, Math.min(x, Renderer.GAME_WIDTH - 100));
        this.targetY = Math.max(500, Math.min(y, Renderer.GAME_HEIGHT - 150)); // Restrict vertical movement
        this.moving = true;
    }

    update() {
        if (this.moving) {
            const dx = this.targetX - this.x;
            const dy = this.targetY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > this.speed) {
                this.x += (dx / distance) * this.speed;
                this.y += (dy / distance) * this.speed;
            } else {
                this.x = this.targetX;
                this.y = this.targetY;
                this.moving = false;
            }
        }
    }
}