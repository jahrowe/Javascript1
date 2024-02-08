// script.js
const rouletteNumbers =
[
    0, 34, 10, 21, 28, 4, 18, 9, 27, 22, 12, 3, 17, 20, 11, 33, 2, 10, 32, 0o0, 15, 8, 25, 1, 31, 20, 14, 30, 7, 24, 29, 35, 6, 13, 23, 19, 5, 36
];

let spinHistory = [];

let sock = new WebSocket("ws://localhost:8000/sock");

function updateDisplay()
{
    // Update result display
    const resultDisplay = document.getElementById('result-display');
    resultDisplay.innerHTML = `
    <p>The number: ${spinHistory[spinHistory.length - 1].number}</p>
    <p>Color: ${spinHistory[spinHistory.length - 1].color}</p>
    <p>Even/Odd: ${spinHistory[spinHistory.length - 1].evenOdd}</p>
    <p>Failed/Passed: ${spinHistory[spinHistory.length - 1].failedPassed}</p>
    `;


    // Update history display
    const historyDisplay = document.getElementById('history-display');
    historyDisplay.innerHTML = '<Spin History>'; // Set the heading


    // Create a new line for the spin's history
    const historyString = spinHistory.map((spin, index) => `<p>Spin ${index + 1}: Number ${spin.number}, Color ${spin.color}, Even/Odd ${spin.evenOdd}, Failed/Passed ${spin.failedPassed}</p>`).join(' ');
    historyDisplay.innerHTML += historyString;
}

function spinRoulette()
{
    const randomIndex = Math.floor(Math.random() * rouletteNumbers.length);
    const resultNumber = rouletteNumbers[randomIndex];


    // Determine the color
    const color = resultNumber === 0 ? 'Rouge' : (resultNumber === 0o0 ? 'Noir' : resultNumber % 2 === 0 ? 'Rouge' : 'Noir');


    // Determine even/odd
    const evenOdd = resultNumber % 2 === 0 ? 'Pair' : 'Impair';


    // Determine failed/passed
    const failedPassed = resultNumber >= 1 && resultNumber <= 18 ? 'Manque' : 'Passe';


    // Update spin history
    spinHistory.push({ number: resultNumber, color, evenOdd, failedPassed });


    // Update display
    updateDisplay();

    // Send result to server via WebSocket
    if (sock.readyState === WebSocket.OPEN)
    {
        sock.send(JSON.stringify({ number: resultNumber, color, evenOdd, failedPassed }));
    }
}

function keyWasPressed(event)
{
    console.log("Key was pressed");
}

function sendIt()
{
    console.log("Sending data");
}

document.addEventListener('DOMContentLoaded', function () {

    sock.addEventListener("open", () => {
        console.log("WebSocket connection established");
        
        // Start spinning the roulette wheel
        spinRoulette();
    });

    sock.addEventListener("message", (ev) => {
        const data = JSON.parse(ev.data);
        console.log("The data");
        const chatbox = document.getElementById('chatbox');
        const message = `Number: ${data.number}, Color: ${data.color}, Even/Odd: ${data.evenOdd}, Failed/Passed: ${data.failedPassed}`;
        chatbox.value += message + '\n';
    });

    
    sock.addEventListener("close", () => {
        console.log("WebSocket connection closed");
    });
});
