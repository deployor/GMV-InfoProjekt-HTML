let flagsData = [];
let score = 0;
let currentRound = 0;
const maxRounds = 10;

async function startQuiz(difficulty) {
    const populationRanges = {
        easy: [130000000, 9999900000],
        medium: [10000000, 50000000],
        hard: [500000, 10000000]
    };
    const [minPop, maxPop] = populationRanges[difficulty];

    document.getElementById('difficulty-selection').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');

    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();

    flagsData = countries.filter(country => country.population >= minPop && country.population <= maxPop);

    nextFlag();
}

function nextFlag() {
    if (currentRound >= maxRounds) {
        endQuiz();
        return;
    }

    const randomCountry = flagsData[Math.floor(Math.random() * flagsData.length)];

    document.getElementById('flag').src = randomCountry.flags.svg;
    document.getElementById('flag').dataset.countryName = randomCountry.name.common;
    document.getElementById('country-info').classList.add('hidden');
    document.getElementById('answer-input').value = '';
    document.getElementById('submit-btn').classList.remove('hidden');
    document.getElementById('next-btn').classList.add('hidden');

    currentRound++;
}

function submitAnswer() {
    const userAnswer = document.getElementById('answer-input').value.trim().toLowerCase();
    const correctAnswer = document.getElementById('flag').dataset.countryName.toLowerCase();

    const resultMessage = document.getElementById('result-message');
    if (userAnswer === correctAnswer) {
        score++;
        resultMessage.innerText = 'Richtigggg!';
    } else {
        resultMessage.innerText = `Falschhh! Richtig ist ${correctAnswer}`;
    }

    document.getElementById('result').classList.remove('hidden');
    document.getElementById('submit-btn').classList.add('hidden');
    document.getElementById('next-btn').classList.remove('hidden');
}

function endQuiz() {
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');
    const resultMessage = score >= 7 ? 'You Win!' : 'You Lose!';
    document.getElementById('result-message').innerText = `Your score: ${score}. ${resultMessage}`;
}