document.addEventListener("DOMContentLoaded", () => {
    const wordList = [
        {
            english: "Hello",
            german: ["Hallo", "Moin", "Guten Tag"],
            spanish: ["Hola"],
            french: ["Bonjour"],
            latin: ["Salve"],
        },
        {
            english: ["Bye"],
            german: ["Auf Wiedersehen", "Tschüss", "Bis bald"],
            spanish: ["Adiós"],
            french: ["Au revoir"],
            latin: ["Vale"],
        },
        {
            english: "Please",
            german: ["Bitte", "Bitte schön"],
            spanish: ["Por favor"],
            french: ["Beans"],
            latin: ["Quaeso"],
        },
        {
            english: "Thank you",
            german: ["Danke", "Danke schön"],
            spanish: ["Gracias"],
            french: ["Merci"],
            latin: ["Gratias tibi ago"],
        },
        {
            english: "Yes",
            german: ["Ja", "Ja bitte"],
            spanish: ["Sí"],
            french: ["Oui"],
            latin: ["Ita"],
        },
        {
            english: "No",
            german: ["Nein", "Nein danke"],
            spanish: ["No"],
            french: ["Non"],
            latin: ["Non"],
        },
    ];

    let currentIndex = 0;
    let currentLanguage = "english-to-german";
    let incorrectWords = [];
    let correctCount = 0;
    const totalWords = wordList.length;
    let confetti;

    const selectionScreen = document.getElementById("selection-screen");
    const cardContainer = document.getElementById("card-container");
    const flashcard = document.getElementById("flashcard");
    const currentWordElement = document.getElementById("current-word");
    const answerInput = document.getElementById("answer-input");
    const submitBtn = document.getElementById("submit-btn");
    const nextBtn = document.getElementById("next-btn");
    const correctAnswerElement = document.getElementById("correct-answer");
    const feedbackElement = document.getElementById("feedback");
    const toggleThemeBtn = document.getElementById("toggle-theme");
    const progressBar = document.getElementById("progress");
    const progressText = document.getElementById("progress-text");
    const endScreen = document.getElementById("end-screen");
    const retryBtn = document.getElementById("retry-btn");
    const backToSelectionBtn = document.getElementById("back-to-selection-btn");

    // Cheatttttt
    let cheatMode = true;

    function celebrateCorrectAnswer() {
        if (confetti) {
            confetti.clear();
            confetti = null;
        }

        const existingCanvas = document.getElementById("confetti-canvas");
        if (existingCanvas) {
            existingCanvas.remove();
        }

        const newCanvas = document.createElement("canvas");
        newCanvas.id = "confetti-canvas";
        document.body.appendChild(newCanvas);

        confetti = new ConfettiGenerator({
            target: newCanvas,
            max: 100,
            size: 1,
            animate: true,
            props: ["circle", "square", "triangle", "line"],
            colors: [
                [165, 104, 246],
                [230, 61, 135],
                [0, 199, 228],
                [253, 214, 126],
            ],
            clock: 25,
            rotate: true,
            width: window.innerWidth,
            height: window.innerHeight,
            start_from_edge: true,
            respawn: true,
        });

        confetti.render();

        setTimeout(() => {
            if (confetti) {
                confetti.clear();
                confetti = null;
            }
            newCanvas.remove();
        }, 3000);
    }

    function loadWord() {
        if (cheatMode) {
            endScreen.style.display = "block";
            cardContainer.style.display = "none";
            return;
        }

        if (currentIndex < wordList.length) {
            const wordData = wordList[currentIndex];
            switch (currentLanguage) {
                case "english-to-german":
                    currentWordElement.textContent = wordData.english;
                    break;
                case "german-to-english":
                    currentWordElement.textContent = wordData.german[0];
                    break;
                case "english-to-spanish":
                    currentWordElement.textContent = wordData.english;
                    break;
                case "spanish-to-eng":
                    currentWordElement.textContent = wordData.spanish[0];
                    break;
                case "english-to-french":
                    currentWordElement.textContent = wordData.english;
                    break;
                case "french-to-eng":
                    currentWordElement.textContent = wordData.french[0];
                    break;
                case "english-to-latin":
                    currentWordElement.textContent = wordData.english;
                    break;
                case "latin-to-eng":
                    currentWordElement.textContent = wordData.latin[0];
                    break;
            }
            answerInput.value = "";
            feedbackElement.textContent = "";
            flashcard.classList.remove("flipped");
            updateProgress();
        } else if (incorrectWords.length > 0) {
            wordList.push(...incorrectWords);
            incorrectWords = [];
            loadWord();
        } else {
            endScreen.style.display = "block";
            cardContainer.style.display = "none";
            celebrateCorrectAnswer();
        }
    }

    function updateProgress() {
        const progressWidth = (correctCount / totalWords) * 100;
        progressBar.style.width = `${progressWidth}%`;
        progressText.textContent = `${correctCount} out of ${totalWords}`;
    }

    submitBtn.addEventListener("click", () => {
        const userAnswer = answerInput.value.trim().toLowerCase();
        let correctAnswers;

        switch (currentLanguage) {
            case "english-to-german":
                correctAnswers = wordList[currentIndex].german.map((answer) =>
                    answer.toLowerCase()
                );
                break;
            case "german-to-english":
                correctAnswers = [wordList[currentIndex].english.toLowerCase()];
                break;
            case "english-to-spanish":
                correctAnswers = wordList[currentIndex].spanish.map((answer) =>
                    answer.toLowerCase()
                );
                break;
            case "spanish-to-eng":
                correctAnswers = [wordList[currentIndex].english.toLowerCase()];
                break;
            case "english-to-french":
                correctAnswers = wordList[currentIndex].french.map((answer) =>
                    answer.toLowerCase()
                );
                break;
            case "french-to-eng":
                correctAnswers = [wordList[currentIndex].english.toLowerCase()];
                break;
            case "english-to-latin":
                correctAnswers = wordList[currentIndex].latin.map((answer) =>
                    answer.toLowerCase()
                );
                break;
            case "latin-to-eng":
                correctAnswers = [wordList[currentIndex].english.toLowerCase()];
                break;
        }

        if (correctAnswers.includes(userAnswer)) {
            feedbackElement.textContent = "Correct!";
            feedbackElement.style.color = "green";
            correctCount++;
            celebrateCorrectAnswer();
            updateProgress();
            currentIndex++;
        } else {
            feedbackElement.textContent = "Incorrect! Try again later.";
            feedbackElement.style.color = "red";
            incorrectWords.push(wordList[currentIndex]);
            currentIndex++;
        }

        flashcard.classList.add("flipped");
        correctAnswerElement.textContent = correctAnswers.join(", ");
        loadWord();
    });

    nextBtn.addEventListener("click", () => {
        flashcard.classList.remove("flipped");
        loadWord();
    });

    retryBtn.addEventListener("click", () => {
        endScreen.style.display = "none";
        cardContainer.style.display = "block";
        incorrectWords = [];
        currentIndex = 0;
        correctCount = 0;
        updateProgress();
        loadWord();
    });

    backToSelectionBtn.addEventListener("click", () => {
        endScreen.style.display = "none";
        selectionScreen.style.display = "block";
        cardContainer.style.display = "none";
    });

    toggleThemeBtn.addEventListener("click", () => {
        alert("WIP");
    });

    selectionScreen.addEventListener("click", (event) => {
        if (event.target.id === "eng-to-ger") {
            currentLanguage = "english-to-german";
        } else if (event.target.id === "ger-to-eng") {
            currentLanguage = "german-to-english";
        } else if (event.target.id === "eng-to-spanish") {
            currentLanguage = "english-to-spanish";
        } else if (event.target.id === "spanish-to-eng") {
            currentLanguage = "spanish-to-eng";
        } else if (event.target.id === "eng-to-french") {
            currentLanguage = "english-to-french";
        } else if (event.target.id === "french-to-eng") {
            currentLanguage = "french-to-eng";
        } else if (event.target.id === "eng-to-latin") {
            currentLanguage = "english-to-latin";
        } else if (event.target.id === "latin-to-eng") {
            currentLanguage = "latin-to-eng";
        }

        selectionScreen.style.display = "none";
        cardContainer.style.display = "block";
        loadWord();
    });

    loadWord();
});
