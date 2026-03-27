function checkAnswer(questionId, correctAnswer) {
  const question = document.getElementById(questionId);
  const selected = question.querySelector('input[type="radio"]:checked');
  const result = question.querySelector('.result');

  if (!selected) {
    result.innerText = "⚠️ Please select an answer first.";
    result.style.color = "orange";
    return;
  }

  if (selected.value === correctAnswer) {
    result.innerText = "✅ Correct!";
    result.className = "result correct";
  } else {
    result.innerText = "❌ Wrong!";
    result.className = "result wrong";
  }
}

// quiz
let draggedWord = "";

// drag start
document.querySelectorAll(".quiz .word").forEach(word => {
  word.addEventListener("dragstart", (e) => {
    draggedWord = e.target.innerText;
  });
});

// allow drop
document.querySelectorAll(".quiz .blank").forEach(blank => {
  blank.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  blank.addEventListener("drop", (e) => {
    e.preventDefault();
    blank.innerText = draggedWord;
  });
});

// submit quiz
function submitQuiz() {
  let score = 0;

  document.querySelectorAll(".quiz .question").forEach(q => {
    const blank = q.querySelector(".blank");
    const result = q.querySelector(".result");
    const correct = blank.dataset.answer;

    if (blank.innerText.trim() === correct) {
      result.innerText = "✅ Correct!";
      result.style.color = "green";
      score++;
    } else {
      result.innerText = `❌ Wrong! 正确答案是：${correct}`;
      result.style.color = "red";
    }
  });

  document.querySelector(".quiz #score").innerText =
    `Your score: ${score}/3`;
}