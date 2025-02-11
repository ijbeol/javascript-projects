// Select the container
const container = document.querySelector("#container");
Object.assign(container.style, {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
});

let rowChoice = 16; // Default grid size

// Create mis
const mis = document.createElement("img");
Object.assign(mis.style, {
    height: "400px",
    width: "auto",
    position: "absolute",
    top: "0px",
    left: "0px",
    zIndex: 10,
});

mis.src = "mis.jpeg";

// Create button
const button = document.createElement("button");
Object.assign(button.style, {
    height: "50px",
    width: "80px",
    margin: "20px",
});

button.textContent = "Change Grid!";
container.appendChild(button);

// Create grid container
const grid  = document.createElement("div");
container.appendChild(grid);

// Track the total score
let totalScore = 0; // Global variable to track score

// Function to generate random RGB color
const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return { r, g, b }; // Return as an object
};

// Function to darken color
const darkenColor = (color, times) => {
    const factor = 1 - (0.1 * times); // Darken by 10% per hover
    return `rgb(${Math.max(color.r * factor, 0)}, ${Math.max(color.g * factor, 0)}, ${Math.max(color.b * factor, 0)})`;
};

// Function to create the grid
const createGrid = (size) => {
    totalScore = 0;
    grid.innerHTML = ""; // Clear existing grid

    Object.assign(grid.style, {
        display: "grid",
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gridTemplateRows: `repeat(${size}, 1fr)`,
        width: "400px",
        height: "400px",
        position: "relative",
    });

    // Generate the grid cells
    Array.from({ length: size ** 2 }).forEach(() => {
        const cell = document.createElement("div");
        Object.assign(cell.style, {
            border: "1px solid black",
            aspectRatio: "1 / 1",
            backgroundColor: "white",
        });

        let hoverCount = 0; // Track how many times this cell has been hovered over
        const initialColor = getRandomColor(); // Get the initial random color

        // Hover effect, progressive darkening
        cell.addEventListener("mouseenter", () => {
            hoverCount++; // Increment hover count
            cell.style.backgroundColor = darkenColor(initialColor, hoverCount);
            if (hoverCount <= 10) {totalScore++}
            displayScore = Math.floor(10 * totalScore / size ** 2);
            if (displayScore == 100) {
                score.textContent = `You win!!!!!`; // Update score display
                grid.appendChild(mis);
            } else {
            score.textContent = `Current score is: ${displayScore}%`; // Update score display
            }
        });

        grid.appendChild(cell);
    });
};

// Initialize default grid
createGrid(rowChoice);

// Button event listener
button.addEventListener("click", () => {
    const newSize = Number(prompt("Enter grid size (maximum 100): "));
    score.textContent = `Current score is: 0%`;
    if (isNaN(newSize) || newSize < 1 || newSize > 100) {
        alert("Please enter a number between 1 and 100.");
        return;
    }
    createGrid(newSize);
});

// Create score display
const score = document.createElement("div");
Object.assign(score.style, {
    height: "50px",
    width: "200px",
    margin: "20px",
});
score.textContent = `Current score is: 0%`;
container.appendChild(score);
