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

let draggedItem = null;

//drag start from arrange words
document.querySelectorAll(".item").forEach(item => {
  item.addEventListener("dragstart", (e) => {
    draggedItem = e.target;
  })
})

//allow drop into answer box
// allow drop into all answer boxes
document.querySelectorAll(".answer-box").forEach(box => {
  box.addEventListener("dragover", (e) => {
    e.preventDefault(); // allow drop
  });

  box.addEventListener("drop", () => {
    if (draggedItem) {
      box.appendChild(draggedItem); // move dragged word here
    }
  });
});

// ✅ handle MCQ questions
document.querySelectorAll(".mcq-question").forEach(q => {
  const selected = q.querySelector('input[type="radio"]:checked');
  const result = q.querySelector(".result");
  const correct = result.dataset.answer;

  if (!selected) {
    result.innerText = "⚠️ Please select an answer.";
    result.style.color = "orange";
    return;
  }

  if (selected.value === correct) {
    result.innerText = "✅ Correct!";
    result.style.color = "green";
    score++;
  } else {
    result.innerText = `❌ Wrong! 正确答案是：${correct}`;
    result.style.color = "red";
  }
});

// submit quiz

function submitQuiz() {
  let score = 0;

  // normal fill-in-the-blank questions
  document.querySelectorAll(".quiz .question").forEach(q => {

    // skip arrange question
    if (q.classList.contains("arrange-question")) return;

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

  // ✅ handle arrange question
  const arrangeQ = document.querySelector(".arrange-question");

  if (arrangeQ) {
    const correct = arrangeQ.dataset.answer;
    const result = arrangeQ.querySelector(".result");

    const words = arrangeQ.querySelectorAll(".answer-box .item");
    let userAnswer = "";

    words.forEach(w => {
      userAnswer += w.innerText;
    });

    if (userAnswer === correct) {
      result.innerText = "✅ Correct!";
      result.style.color = "green";
      score++;
    } else {
      result.innerText = `❌ Wrong! 正确答案是：${correct}`;
      result.style.color = "red";
    }
  }

  const totalQuestions = document.querySelectorAll(".question").length;
  document.querySelector(".quiz #score").innerText =
    `Your score: ${score}/${totalQuestions}`;
}