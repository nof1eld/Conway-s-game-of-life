# Conway's Game of Life

This project is an implementation of Conway's Game of Life using HTML, CSS, and JavaScript. The Game of Life is a cellular automaton made by the British mathematician John Horton Conway in 1970. It is a zero-player game, this means that it's evolution is determined by its initial state, requiring no further input from user.

## How It Works

### Game Rules

The Game of Life is played on a grid of cells, where each cell can be either alive or dead. The state of the grid evolves over discrete time steps according to the following rules:

1. Any live cell with fewer than two live neighbors dies.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies.
4. Any dead cell with exactly three live neighbors becomes a live cell.

### Game Implementation

The implementation consists of three main components:

1. **Game Class**: Manages the state of the grid and contains methods to update the grid according to the rules of the Game of Life.

   - **Constructor**: Initializes the game with a specified number of rows, columns, and cell size. It also creates an empty grid and sets the running state to false.
   - **CreateEmptyGrid**: Creates and returns a 2D array representing the grid, with all cells initialized to false (dead).
   - **Randomize**: Randomly sets cells to alive or dead as an initial state.
   - **Draw"pattern"**: Draws a specific pattern on the grid.
   - **Count neighbors**: Counts the number of alive neighbors for a given cell.
   - **Update**: Updates the grid into the next generation.

2. **Renderer Class**: Handles the drawing of the grid on an HTML canvas element.

   - **Constructor**: Initializes the renderer with a canvas element and a game instance. It also sets up the canvas dimensions and initializes the drawing state.
   - **Draw**: Draws the current state of the grid on the canvas. It fills the canvas with a background color and draws alive cells with a specific color.
   - **Handle mouse input**: Draws cells on the grid as the mouse moves over the canvas while the mouse button is pressed.

3. **Event Listeners**: Manage buttons that manage user interactions such as starting/stopping the game, clearing the grid, randomizing the grid etc...

### Usage

1. Open `index.html` in a web browser.
2. Use the buttons to control the simulation:
   - **Start/Stop**: Start or stop the simulation.
   - **Clear**: Clear the grid.
   - **Random**: Randomize the grid.
   - **Glider Gun**: Draw a Gosper Glider Gun on the grid.
   - **Pulsar**: Draw a Pulsar pattern on the grid.
   - **PentaDecathlon**: Draw a PentaDecathlon pattern on the grid.
   - **Speed Control**: Adjust the speed of the simulation (Normal, Fast, Slow).
   - **Dark Mode**: Toggle between light and dark mode.

### Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/nof1eld/Conway-s-game-of-life.git
   ```
2. Navigate to the project directory:
3. Open index.html in your preferred web browser.