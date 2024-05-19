const gunViolenceTemplate = "What was the rate of violent gun deaths in 2019 in {country} per 100K?";
const gunOwnershipPer100Template = "What was the rate of gun ownership per 100 people in {country} in 2024?";
const violentGunDeathsTotalTemplate = "How many violent gun deaths were there in {country} in 2019?";
const dangerLevelTemplate = "What is the danger level in {country}?";
const numberFirearmsCountry = "How many firearms are there in total in {country} in 2024?";
const numberGunDeathsCountry = "How many gun deaths were there in total in {country} in 2019?";

// These have also a pre-computed answer
const biggestNumberOfGunDeathsTemplate = "Which country had the highest number of gun deaths in 2019?";
const biggestOwnershipPer100Template = "Which country had the highest rate of gun ownership per 100 people in 2024?";
const smallestNumberOfGunDeathsTemplate = "Which country had the lowest number of gun deaths in 2019?";
const smallestOwnershipPer100Template = "Which country had the lowest rate of gun ownership per 100 people in 2024?";


const biggestNumberOfGunDeathsAnswer = "El Salvador";
const biggestOwnershipPer100Answer = "United States";
const smallestNumberOfGunDeathsAnswer = "Singapore";
const smallestOwnershipPer100Answer = "Indonesia";




    //====================================================================================================

// var countriesGuns = null;
// var countriesDeaths = null;
function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function chooseQuestion(num_questions, lastTemplateIndex) {
    const randomNumber = Math.random();
    if (randomNumber < 0.5) {
        return Math.floor(Math.random() * lastTemplateIndex);
    }
    else {
        return Math.floor(Math.random() * num_questions);
    }
}

async function loadCountries() {
    try {
        const countriesGunsData = await d3.json('assets/data/basic_dataset/gun-ownership-by-country-2024.json')
        const countriesGunsSet = new Set(countriesGunsData.map(d => d.country));
        const countriesGuns = Array.from(countriesGunsSet);

        
        const countriesDeathsData = await d3.json('assets/data/basic_dataset/gun-deaths-by-country-2024.json')
        const countriesDeathsSet = new Set(countriesDeathsData.map(d => d.country));
        const countriesDeaths = Array.from(countriesDeathsSet);

        return [countriesGuns, countriesDeaths];
    } catch (err) {
        console.error("Error loading JSON file ", err);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const numberMCQChoices = 4;
    getQuestionAndAnswers(numberMCQChoices).then(([question, answer, options]) => {
        // console.log("Question: ", question);
        // console.log("Answer: ", answer);
        // console.log("Options: ", options);

        //Only experimental
        document.getElementById('question-text').innerText = question;
        const choicesElement = document.getElementById('quiz-choices');
        options.forEach((option) => {
            const optButton = document.createElement('button');
            optButton.textContent = option;
            optButton.className = "option-button"
            optButton.onclick = () => checkAnswer(option, answer);
            choicesElement.appendChild(optButton);
        });
    }).catch(err => console.error("Error getting question and answers ", err));
    // const [question, answer, options] = await getQuestionAndAnswers(numberMCQChoices);
});

async function getQuestionAndAnswers(numberMCQChoices) {
    // Do not change the order of the lists
    const questions = [
        gunViolenceTemplate,
        violentGunDeathsTotalTemplate,
        numberGunDeathsCountry,
        gunOwnershipPer100Template,
        numberFirearmsCountry,
        biggestNumberOfGunDeathsTemplate,
        smallestNumberOfGunDeathsTemplate,
        biggestOwnershipPer100Template,
        smallestOwnershipPer100Template
    ]

    const static_answers = [
        biggestNumberOfGunDeathsAnswer,
        smallestNumberOfGunDeathsAnswer,
        biggestOwnershipPer100Answer,
        smallestOwnershipPer100Answer
    ]

    // const index = Math.floor(Math.random() * questions.length);
    const index = chooseQuestion(questions.length, 5);
    // const index = Math.floor(Math.random() * 2);
    const [countriesGuns, countriesDeaths] = await loadCountries();

    if (index > 4) {
        const answer = static_answers[index - 5]
        var options = [answer]; 
        let otherCountries;
        do {
            otherCountries = _.sampleSize(countriesGuns, numberMCQChoices - 1);
        }
        while (otherCountries.includes(answer));
        // const otherCountries = _.sampleSize(countriesGuns, numberMCQChoices - 1);

        options = options.concat(otherCountries);
    
        options = shuffle(options);

        return [questions[index], answer, options]
    } 

    var electedCountry = null;
    let a = 0;
    let question;
    let answer;
    while (a === 0) {
        if (index <= 2) {
            const randomIndex = Math.floor(Math.random() * countriesDeaths.length);
            electedCountry = countriesDeaths[randomIndex];
        }
        else {
            electedCountry = countriesGuns[Math.floor(Math.random() * countriesGuns.length)];
        }

        question = questions[index].replace("{country}", electedCountry);
        answer = await getCorrectAnswer(electedCountry, index);
        if (answer !== null) {
            a = 1;
        }

    }
    const choices = generateMultipleChoices(answer, numberMCQChoices, 50, index === 1 || index === 2 || index === 4);
    return [question, answer, choices]
}


function generateMultipleChoices(correctValue, numberOfOptions, variationPercentage, isInteger = true) {
    const corrValue = isInteger ? correctValue.toString() : correctValue.toFixed(2);
    const options = [corrValue];
    const variation = correctValue * (variationPercentage / 100);
    let curr_variation = variation;

    // Generate false options
    while (options.length < numberOfOptions) {
        const sign = Math.random() < 0.5 ? -1 : 1; // Randomly choose positive or negative variation
        let falseValue;
        if (isInteger) {
            falseValue = correctValue + sign * Math.floor(Math.random() * curr_variation);
            falseValue = falseValue.toString();
        }
        else {
            falseValue = correctValue + sign * Math.random() * curr_variation;
            falseValue = falseValue.toFixed(2);
        }

        if (!options.includes(falseValue)) {
            options.push(falseValue);
        }
        else {
            curr_variation = curr_variation * 1.5;
        }
    }

    const shuffledOptions = shuffle(options);

    return shuffledOptions;
}
// Définir un tableau d'attributs pour chaque index
const attributes = [
    'GunDeathsViolentRatePer100k2019', 
    'GunDeathsViolentTotal2019', 
    'GunDeathsAllCausesTotal2019', 
    'gunOwnershipByCountry_per100', 
    'gunOwnershipByCountry_firearms'
];

// Charger les données une fois au début
let deathsData, ownershipData;

d3.json('assets/data/basic_dataset/gun-deaths-by-country-2024.json')
    .then(data => { deathsData = data; })
    .catch(err => console.error("Error loading JSON file ", err));

d3.json('assets/data/basic_dataset/gun-ownership-by-country-2024.json')
    .then(data => { ownershipData = data; })
    .catch(err => console.error("Error loading JSON file ", err));

// La fonction simplifiée
function getCorrectAnswer(country, index) {
    if (index < 0 || index >= attributes.length) {
        throw new Error("Invalid index");
    }

    let data = (index < 3) ? deathsData : ownershipData;  // Choisissez le bon ensemble de données
    
    const record = data.find(d => d.country === country) || {};
    return record[attributes[index]] || null;
}


function nextQuestion() {
    const numberMCQChoices = 4;
    getQuestionAndAnswers(numberMCQChoices).then(([question, answer, options]) => {
        console.log("Question: ", question);
        console.log("Answer: ", answer);
        console.log("Options: ", options);

        //Only experimental
        document.getElementById('question-text').innerText = question;
        const choicesElement = document.getElementById('quiz-choices');
        choicesElement.innerHTML = "";
        options.forEach((option) => {
            const optButton = document.createElement('button');
            optButton.textContent = option;
            optButton.className = "option-button"
            optButton.onclick = () => {
                if (answer) {
                    checkAnswer(option, answer);
                } else {
                    console.error("Answer is empty");
                }
            };


            choicesElement.appendChild(optButton);
        });
    }).catch(err => console.error("Error getting question and answers ", err));
}
let nb_question =6
let questionCount = nb_question;
let correctAnswers = 0;
function checkAnswer(selectedOption, correctAnswer) {
    questionCount--;
    if (selectedOption == correctAnswer) {
        correctAnswers++;
    }

    if (questionCount > 0) {
        nextQuestion();
    } else {
        // Effacer le contenu du quiz
        if (questionCount <= 0) {
            const scoreDisplay = `<div class="score-circle">${correctAnswers}/${nb_question}</div>`;
            document.getElementById('quiz-section').innerHTML = '<h1>Quiz Over!</h1> <p>Your score:</p>' + scoreDisplay + '<button id="restart-button" onclick="window.location.href=\'quiz_2.html\'">Restart</button>';

        }
        
    }
}

