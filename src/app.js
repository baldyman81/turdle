const wordLibrary = ["abroad", "accept", "advice", "bright", "client", "jaguar", "cannot", "castle", "defeat", "domain", "global", "length", "jersey", "latter", "liquid", "honest", "ground", "memory", "obtain", "mother", "nature", "option", "orange", "reason", "replay", "safety", "taught", "timely"]
    
document.addEventListener("DOMContentLoaded", () => {
    createSquares();
    let randomNum = Math.floor(Math.random() * wordLibrary.length)
    let wordOTD = wordLibrary[randomNum];
    let guessedWords = [[]];
    let availableSpace = 1;
    let guessedWordCount = 0;
    
    const keys = document.querySelectorAll(".keyboard-row button");

    
        
        

    function whatGuess() {
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords - 1];
    }

    function updateGuessedWords(letter) {
        const currentGuess = whatGuess();

        if (currentGuess && currentGuess.length < 6) {
            currentGuess.push(letter);

            const availableSpaceEl = document.getElementById(String(availableSpace));

            availableSpace = availableSpace + 1;
            availableSpaceEl.textContent = letter;
        }
    }
    
    function createSquares() {
        const gameBoard = document.getElementById('board');

        for (let index = 0; index < 36; index++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square);
            
        }
    }
    function getTileColor(letter, index) {
        const isCorrectLetter = wordOTD.includes(letter);

        if (!isCorrectLetter) {
            return "rgb(58, 58, 60)";
        }

        const isCorrectPosition = letter === wordOTD.charAt(index);

        if (isCorrectPosition) {
            return "rgb(83, 141, 78)";
        }
        return "rgb(181, 159, 59)";
    }

    function handleDeleteLetter() {
        const currentGuess = whatGuess();
        const removedLetter = currentGuess.pop();

        guessedWords[guessedWords.length - 1] = currentGuess;

        const lastLetterEl = document.getElementById(String(availableSpace - 1));
        lastLetterEl.textContent = "";
        availableSpace = availableSpace - 1;
    }

    function handleSubmitGuess() {
        const currentGuess = whatGuess();
        if (currentGuess.length !== 6) {
            window.alert("Word must be 6 letters!");
        }

        const currentWord = currentGuess.join("");

        const firstLetterId = guessedWordCount * 6 + 1;
        const interval = 200;
        currentGuess.forEach((letter, index) => {
            setTimeout(() => {
                const tileColor = getTileColor(letter, index);
                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId);
                letterEl.classList.add("animate__flipInX");
                letterEl.style = `background-color:${tileColor};border-color:${tileColor};`;
            }, interval * index);
        });

        guessedWordCount += 1;

        if (currentWord === wordOTD) {
            //window.alert("Wow! Much Winnner!!!");
        }

        if (guessedWords.length === 7) {
            window.alert("Better luck next time")
        }
        guessedWords.push([]);
    }

    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            const letter = target.getAttribute("data-key");

            if (letter === "enter") {
                handleSubmitGuess();
                return;
            }
            if (letter === "del") {
                handleDeleteLetter();
                return;
            }

            updateGuessedWords(letter);
            console.log(letter);
        }
    }

})