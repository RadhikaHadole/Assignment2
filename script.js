let currentStep = 0;
const totalSteps = document.querySelectorAll('#steps li').length;
let timerInterval; // Variable to hold the timer interval

function updateProgress(step) {
    const progressBar = document.querySelector('.progress');
    const progress = (step / totalSteps) * 100;
    progressBar.style.width = progress + '%';
}

function toggleIngredients() {
    const ingredients = document.getElementById('ingredients');
    ingredients.style.display = ingredients.style.display === 'none' ? 'block' : 'none';
}

function toggleSteps() {
    const steps = document.getElementById('steps');
    steps.style.display = steps.style.display === 'none' ? 'block' : 'none';
}

function startCooking() {
    currentStep = 0; // Reset current step to 0 when starting
    updateProgress(currentStep); // Reset progress bar
    highlightStep(currentStep); // Highlight the first step
    document.querySelector('.next-btn').style.display = 'inline'; // Show next button
    startTimer(25 * 60); // Start a 25-minute timer
}

function highlightStep(step) {
    const steps = document.querySelectorAll('#steps li');
    if (step < totalSteps) {
        steps.forEach((stepElement, index) => {
            stepElement.style.backgroundColor = index === step ? '#ff6f61' : 'transparent';
        });
        updateProgress(step + 1); // Update progress bar for the current step
    } else {
        alert('You have completed all the steps!'); // Alert when all steps are done
        currentStep = 0; // Reset current step for next time
        updateProgress(0); // Reset progress bar for next time
        document.querySelector('.next-btn').style.display = 'none'; // Hide next button
        clearInterval(timerInterval); // Clear timer when done
        document.getElementById('timer-display').innerText = "25:00"; // Reset timer display
    }
}

function startTimer(duration) {
    let timer = duration, minutes, seconds;
    timerInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        // Format timer display
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById('timer-display').textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(timerInterval);
            alert("Time's up!"); // Alert when time is up
        }
    }, 1000);
}

document.querySelector('.start-btn').addEventListener('click', function () {
    startCooking();
});

document.querySelector('.next-btn').addEventListener('click', function () {
    if (currentStep < totalSteps) {
        highlightStep(currentStep);
        currentStep++; // Increment after highlighting
    }
});

function stopTimer() {
  clearInterval(timerInterval); // Stop the timer
  document.querySelector('.stop-btn').style.display = 'none'; // Hide stop button
}