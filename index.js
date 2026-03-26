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