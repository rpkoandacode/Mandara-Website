// quiz
let draggedWordEl = null;

// drag start
document.querySelectorAll(".quiz .word").forEach(word => {
  word.addEventListener("dragstart", (e) => {
    draggedWordEl = e.target;
  });
});

// allow drop into blanks
document.querySelectorAll(".quiz .blank").forEach(blank => {
  blank.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  blank.addEventListener("drop", (e) => {
    e.preventDefault();
    if (!draggedWordEl) return;

    // if this blank already had a word, return it to the choices list
    const oldText = blank.innerText.trim();
    if (oldText) {
      const quiz = blank.closest(".quiz");
      const choices = quiz.querySelector(".choices");
      const oldSpan = document.createElement("span");
      oldSpan.className = "word";
      oldSpan.draggable = true;
      oldSpan.innerText = oldText;
      choices.appendChild(oldSpan);

      // reattach dragstart to the new word
      oldSpan.addEventListener("dragstart", (e2) => {
        draggedWordEl = e2.target;
      });
    }

    // set new word in blank
    blank.innerText = draggedWordEl.innerText;

    // remove the dragged word from choices
    draggedWordEl.remove();
    draggedWordEl = null;
  });
});


let draggedItem = null;

//drag start from arrange words
document.querySelectorAll(".item").forEach(item => {
  item.addEventListener("dragstart", (e) => {
    draggedItem = e.target;
  })
})

// allow drop into all answer boxes
document.querySelectorAll(".answer-box").forEach(box => {
  box.addEventListener("dragover", (e) => {
    e.preventDefault(); // allow drop
  });

  box.addEventListener("drop", (e) => {
    e.preventDefault();
    if (draggedItem) {
      box.appendChild(draggedItem);
      draggedItem = null;
    }
  });
});

// submit quiz

function submitQuiz() {
  let score = 0;

  // normal fill-in-the-blank questions
  document.querySelectorAll(".quiz .question").forEach(q => {

    if (q.classList.contains("arrange-question")) return;
    if (q.classList.contains("mcq-question")) return;

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

  document.querySelectorAll(".mcq-question").forEach(q => {
    const selected = q.querySelector('input[type="radio"]:checked');
    const result = q.querySelector(".result");
    const correct = q.dataset.answer;

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

  // arrange question

  const arrangeQ = document.querySelector(".arrange-question");

  if (arrangeQ) {
    const correct = arrangeQ.dataset.answer;
    const result = arrangeQ.querySelector(".result");

    const words = arrangeQ.querySelectorAll(".answer-box .item");
    let userAnswer = Array.from(words).map(w => w.innerText).join("");

    if (userAnswer === correct) {
      result.innerText = "✅ Correct!";
      result.style.color = "green";
      score++;
      } else {
      result.innerText = `❌ Wrong! 正确答案是：${correct}`;
      result.style.color = "red";
      }
    }

  // score
    const total =
      document.querySelectorAll(".quiz .blank").length +
      document.querySelectorAll(".mcq-question").length +
      document.querySelectorAll(".arrange-question").length;

    document.querySelector("#score").innerText =
      `Your score: ${score}/${total}`;

  }