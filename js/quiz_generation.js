const gunViolenceTemplate = "What was the rate of violent gun deaths in 2019 in {country} per 100K?";
const gunOwnershipPer100Template = "What was the rate of gun ownership per 100 people in {country} in 2024?";
const violentGunDeathsTotalTemplate = "How many violent gun deaths were there in {country} in 2019?";
const dangerLevelTemplate = "What is the danger level in {country}?";

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

async function loadCountries() {
    try {
        const countriesGunsData = await d3.json('assets/data/gun-ownership-by-country-2024.json')
        const countriesGunsSet = new Set(countriesGunsData.map(d => d.country));
        const countriesGuns = Array.from(countriesGunsSet);

        const countriesDeathsData = await d3.json('assets/data/gun-deaths-by-country-2024.json')
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
        console.log("Question: ", question);
        console.log("Answer: ", answer);
        console.log("Options: ", options);

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
        gunOwnershipPer100Template,
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

    const index = Math.floor(Math.random() * questions.length);
    const [countriesGuns, countriesDeaths] = await loadCountries();

    if (index > 2) {
        const answer = static_answers[index - 3]
        var options = [answer];
        //TODO not working
        const otherCountries = _.sampleSize(countriesGuns, numberMCQChoices - 1);

        options = options.concat(otherCountries);
    
        options = shuffle(options);

        return [questions[index], answer, options]
    } 

    var electedCountry = null;
    if (index === 0 || index === 1) {
        const randomIndex = Math.floor(Math.random() * countriesDeaths.length);
        // console.log("Random Index: ", randomIndex)
        // console.log(typeof countriesDeaths)
        electedCountry = countriesDeaths[randomIndex];
    }
    else {
        electedCountry = countriesGuns[Math.floor(Math.random() * countriesGuns.length)];
    }

    const question = questions[index].replace("{country}", electedCountry);
    const answer = await getCorrectAnswer(electedCountry, index);
    const choices = generateMultipleChoices(answer, numberMCQChoices, 50, index === 1);
    return [question, answer, choices]
}



function generateMultipleChoices(correctValue, numberOfOptions, variationPercentage, isInteger = true) {
    const corrValue = isInteger ? correctValue.toString() : correctValue.toFixed(2);
    const options = [corrValue];
    const variation = correctValue * (variationPercentage / 100);

    // Generate false options
    for (let i = 0; i < numberOfOptions - 1; i++) {
        const sign = Math.random() < 0.5 ? -1 : 1; // Randomly choose positive or negative variation
        if (isInteger) {
            const falseValue = correctValue + sign * Math.floor(Math.random() * variation);
            options.push(falseValue.toString());
        }
        else {
            const falseValue = correctValue + sign * Math.random() * variation;
            options.push(falseValue.toFixed(2)); // Round to 2 decimal places
        }
    }

    console.log("Options", options)
    const shuffledOptions = shuffle(options);

    return shuffledOptions;
}

function getCorrectAnswer(country, index) {
    switch (index) {
        case 0:
            return d3.json('assets/data/gun-deaths-by-country-2024.json').then(data => {
                const deaths = data.find(d => d.country === country) || {};
                return deaths.GunDeathsViolentRatePer100k2019 || null;
            }).catch(err => console.error("Error loading JSON file ", err));
        case 1:
            return d3.json('assets/data/gun-deaths-by-country-2024.json').then(data => {
                const deaths = data.find(d => d.country === country) || {};
                return deaths.GunDeathsViolentTotal2019 || null;
            }).catch(err => console.error("Error loading JSON file ", err));
        case 2:
            return d3.json('assets/data/gun-ownership-by-country-2024.json').then(data => {
                const ownership = data.find(d => d.country === country) || {};
                return ownership.gunOwnershipByCountry_per100 || null;
            }).catch(err => console.error("Error loading JSON file ", err));
        default:
            throw new Error("Invalid index");
    }
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
    if (selectedOption === correctAnswer) {
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

