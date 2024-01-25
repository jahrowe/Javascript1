// script.js
const rouletteNumbers = 
[
    0, 34, 10, 21, 28, 4, 18, 9, 27, 22, 12, 3, 17, 20, 11, 33, 2, 10, 32, 0o0, 15, 8, 25, 1, 31, 20, 14, 30, 7, 24, 29, 35, 6, 13, 23, 19, 5, 36
];

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

    // Print results to debug console
    console.log(`The number: ${resultNumber}`);
    console.log(`${color}, ${evenOdd}, ${failedPassed}`);
}

// Call the function when the web page is loaded
document.addEventListener('DOMContentLoaded', function () 
{
    spinRoulette();
});
