class Game {
    constructor(rows, cols, cellSize) {
        this.rows = rows;
        this.cols = cols;
        this.cellSize = cellSize;
        this.grid = this.createEmptyGrid();
        this.isRunning = false;
    }
     
 
    createEmptyGrid() {
        return Array(this.rows).fill().map(() => Array(this.cols).fill(false));
    }

    randomize() {
        this.grid = this.grid.map(row => 
            row.map(() => Math.random() > 0.85)
        );
    }

    drawGliderGun() {
        const matrix = [
            [26, 1],
            [24, 2], [26, 2],
            [14, 3], [15, 3], [22, 3], [23, 3], [36, 3], [37, 3],
            [13, 4], [17, 4], [22, 4], [23, 4], [36, 4], [37, 4],
            [2, 5], [3, 5], [12, 5], [18, 5], [22, 5], [23, 5],
            [2, 6], [3, 6], [12, 6], [16, 6], [18, 6], [19, 6], [24, 6], [26, 6],
            [12, 7], [18, 7], [26, 7],
            [13, 8], [17, 8],
            [14, 9], [15, 9]
        ]

        matrix.forEach(([x, y]) => {
            this.grid[y][x] = true;
        });
    }

    drawPulsar() {
        const matrix = [
            [16, 14], [17, 14], [18, 14], [22, 14], [23, 14], [24, 14],
            [14, 16], [19, 16], [21, 16], [26, 16],
            [14, 17], [19, 17], [21, 17], [26, 17],
            [14, 18], [19, 18], [21, 18], [26, 18],
            [16, 19], [17, 19], [18, 19], [22, 19], [23, 19], [24, 19],
            [16, 21], [17, 21], [18, 21], [22, 21], [23, 21], [24, 21],
            [14, 22], [19, 22], [21, 22], [26, 22],
            [14, 23], [19, 23], [21, 23], [26, 23],
            [14, 24], [19, 24], [21, 24], [26, 24],
            [16, 26], [17, 26], [18, 26], [22, 26], [23, 26], [24, 26]
        ]

        matrix.forEach(([x, y]) => {
            this.grid[y][x] = true;
        });
    }

    drawPentaDecathlon() {
        const matrix = [
            [22, 35], [27, 35],
            [20, 36], [21, 36], [23, 36], [24, 36], [25, 36], [26, 36], [28, 36], [29, 36],
            [22, 37], [27, 37]
        ]


        matrix.forEach(([x, y]) => {
            this.grid[y][x] = true;
          });
        }

    countNeighbors(x, y) {
        let count = 0;
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                if (dx === 0 && dy === 0) continue;
                const nx = (x + dx + this.cols) % this.cols;
                const ny = (y + dy + this.rows) % this.rows;
                if (this.grid[ny][nx]) count++;
            }
        }
        return count;
    }

    update() {
        const newGrid = this.createEmptyGrid();
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const neighbors = this.countNeighbors(x, y);
                const isAlive = this.grid[y][x];
                newGrid[y][x] = (isAlive && (neighbors === 2 || neighbors === 3)) ||
                              (!isAlive && neighbors === 3);
            }
        }
        this.grid = newGrid;
    }

    toggleCell(x, y) {
        this.grid[y][x] = !this.grid[y][x];
    }
}
class Renderer {
    constructor(canvas, game) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.game = game;
        canvas.width = game.cols * game.cellSize;
        canvas.height = game.rows * game.cellSize;
        this.darkMode = false;
        this.isDrawing = false;
    }

    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        document.body.classList.toggle('dark-mode');
        this.draw();
    }

    draw() {
        this.ctx.fillStyle = this.darkMode ? '#1a1a1a' : '#ffffff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let y = 0; y < this.game.rows; y++) {
            for (let x = 0; x < this.game.cols; x++) {
                if (this.game.grid[y][x]) {
                    this.ctx.fillStyle = this.darkMode ? '#00ff00' : '#2c3e50';
                    this.ctx.fillRect(
                        x * this.game.cellSize,
                        y * this.game.cellSize,
                        this.game.cellSize - 1,
                        this.game.cellSize - 1
                    );
                }
            }
        }
    }

    handleMouseDown(event) {
        this.isDrawing = true;
        this.handleMouseMove(event);
    }

    handleMouseUp() {
        this.isDrawing = false;
    }

    handleMouseMove(event) {
        if (!this.isDrawing) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / this.game.cellSize);
        const y = Math.floor((event.clientY - rect.top) / this.game.cellSize);
        
        if (x >= 0 && x < this.game.cols && y >= 0 && y < this.game.rows) {
            this.game.grid[y][x] = true;
            this.draw();
        }
    }
}
// Initialize Game
document.addEventListener('DOMContentLoaded', () => {
    const game = new Game(180, 360, 10);
    const canvas = document.getElementById('gridCanvas');
    const renderer = new Renderer(canvas, game);
    let intervalId = null;
    let speed = 80;
    
    canvas.addEventListener('mousedown', (event) => renderer.handleMouseDown(event));
    canvas.addEventListener('mousemove', (event) => renderer.handleMouseMove(event));
    canvas.addEventListener('mouseup', () => renderer.handleMouseUp());
    canvas.addEventListener('mouseleave', () => renderer.handleMouseUp());

    // Button Event Handlers
    document.getElementById('startBtn').addEventListener('click', () => {
        game.isRunning = !game.isRunning;
        document.getElementById('startBtn').textContent = 
            game.isRunning ? 'Stop' : 'Start';
        if (game.isRunning) {
            intervalId = setInterval(() => {
                game.update();
                renderer.draw();
            }, speed);
        } else {
            clearInterval(intervalId);
        }
    });

    document.getElementById('clearBtn').addEventListener('click', () => {
        game.grid = game.createEmptyGrid();
        renderer.draw();
    });

    document.getElementById('randomBtn').addEventListener('click', () => {
        game.randomize();
        renderer.draw();
    });

    document.getElementById('gliderGunBtn').addEventListener('click', () => {
        game.drawGliderGun();
        renderer.draw();
    });

    document.getElementById('pulsarBtn').addEventListener('click', () => {
        game.drawPulsar();
        renderer.draw();
    });

    document.getElementById('pentaDecathlonBtn').addEventListener('click', () => {
        game.drawPentaDecathlon();
        renderer.draw();
    });
    
    document.getElementById('speedBtn').addEventListener('click', () => {
        if (speed === 80) {
            speed = 20;
            document.getElementById('speedBtn').textContent = 'Speed: Fast';
        } else if (speed === 20) {
            speed = 200;
            document.getElementById('speedBtn').textContent = 'Speed: Slow';
        } else {
            speed = 80; 
            document.getElementById('speedBtn').textContent = 'Speed: Normal';
        }
        
        if (game.isRunning) {
            clearInterval(intervalId);
            intervalId = setInterval(() => {
                game.update();
                renderer.draw();
            }, speed);
        }
    });

    document.getElementById('darkModeBtn').addEventListener('click', () => {
        renderer.toggleDarkMode();
    });

    // Initial Draw
    renderer.draw();
});