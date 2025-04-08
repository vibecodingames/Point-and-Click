class Input {
    static canvas = null;

    static init(canvasElement) {
        this.canvas = canvasElement;
        this.setupEventListeners();
    }

    static setupEventListeners() {
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
    }

    static handleClick(event) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        
        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;
        
        SceneManager.handleClick(x, y);
    }
}