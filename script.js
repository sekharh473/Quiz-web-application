document.addEventListener("DOMContentLoaded", function () {
  const questionContainer = document.querySelector(".quiz-container");
  const resultContainer = document.querySelector(".result-container");
  const questionText = document.querySelector(".question");
  const optionsContainer = document.querySelector(".options");
  const nextButton = document.getElementById("next-btn");
  const scoreDisplay = document.getElementById("score");

  let currentQuestionIndex = 0;
  let score = 0;

  // fetch the quiz data from the JSON file
  fetch("quizData.json")
    .then((response) => response.json())
    .then((data) => {
      const questions = data;

      const showQuestion = (index) => {
        const currentQuestion = questions[index];
        if (currentQuestion) {
          questionText.textContent = currentQuestion.question;

          optionsContainer.innerHTML = "";

          currentQuestion.options.forEach((option, index) => {
            const optionElement = document.createElement("div");
            optionElement.textContent = option;
            optionElement.className = "option";
            optionElement.dataset.index = index;
            optionsContainer.appendChild(optionElement);
          });

          optionsContainer.addEventListener("click", handleOptionClick);

          nextButton.style.display = "none";
        } else {
          showResult();
        }
      };

      const handleOptionClick = (event) => {
        if (event.target.classList.contains("option")) {
          const selectedOptionIndex = event.target.dataset.index;
          const currentQuestion = questions[currentQuestionIndex];

          if (
            currentQuestion.options[selectedOptionIndex] ===
            currentQuestion.answer
          ) {
            score++;
          }

          currentQuestionIndex++;
          showQuestion(currentQuestionIndex);
        }
      };

      const showResult = () => {
        questionContainer.style.display = "none";
        resultContainer.style.display = "block";
        scoreDisplay.textContent = score + " out of " + questions.length;

        optionsContainer.removeEventListener("click", handleOptionClick);
      };

      // Start the quiz questions
      showQuestion(currentQuestionIndex);
    })
    .catch((error) => {
      console.error("Error loading questions: " + error);
    });
});
