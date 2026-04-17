// -----------------------------
// DRAG & DROP FOR FILL-IN WORDS
// -----------------------------

let draggedWordEl = null;

// Attach dragstart to all .word elements
function setupWordDragging() {
  document.querySelectorAll(".quiz .word").forEach(word => {
    word.addEventListener("dragstart", e => {
      draggedWordEl = e.target;
    });
  });
}

// Create a new draggable word span (used when returning old words)
function createWordSpan(text) {
  const span = document.createElement("span");
  span.className = "word";
  span.draggable = true;
  span.innerText = text;

  // Make it draggable
  span.addEventListener("dragstart", e => {
    draggedWordEl = e.target;
  });

  return span;
}

// Setup drop behavior for blanks
function setupBlankDropping() {
  document.querySelectorAll(".quiz .blank").forEach(blank => {

    blank.addEventListener("dragover", e => e.preventDefault());

    blank.addEventListener("drop", e => {
      e.preventDefault();
      if (!draggedWordEl) return;

      // If blank already has a word, return it to choices
      const oldText = blank.innerText.trim();
      if (oldText) {
        const quiz = blank.closest(".quiz");
        const choices = quiz.querySelector(".choices");
        choices.appendChild(createWordSpan(oldText));
      }

      // Put new word into blank
      blank.innerText = draggedWordEl.innerText;

      // Remove dragged word from choices
      draggedWordEl.remove();
      draggedWordEl = null;
    });
  });
}


// -----------------------------
// DRAG & DROP FOR ARRANGE ITEMS
// -----------------------------

let draggedItem = null;

function setupArrangeDragging() {
  document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("dragstart", e => {
      draggedItem = e.target;
    });
  });

  document.querySelectorAll(".answer-box").forEach(box => {
    box.addEventListener("dragover", e => e.preventDefault());
    box.addEventListener("drop", e => {
      e.preventDefault();
      if (draggedItem) {
        box.appendChild(draggedItem);
        draggedItem = null;
      }
    });
  });
}


// -----------------------------
// QUIZ SUBMISSION
// -----------------------------

function checkFillInQuestions() {
  let score = 0;

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

  return score;
}

function checkMCQ() {
  let score = 0;

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

  return score;
}

function checkArrange() {
  const arrangeQ = document.querySelector(".arrange-question");
  if (!arrangeQ) return 0;

  const correct = arrangeQ.dataset.answer;
  const result = arrangeQ.querySelector(".result");

  const words = arrangeQ.querySelectorAll(".answer-box .item");
  const userAnswer = Array.from(words).map(w => w.innerText).join("");

  if (userAnswer === correct) {
    result.innerText = "✅ Correct!";
    result.style.color = "green";
    return 1;
  } else {
    result.innerText = `❌ Wrong! 正确答案是：${correct}`;
    result.style.color = "red";
    return 0;
  }
}

function submitQuiz() {
  let score = 0;

  score += checkFillInQuestions();
  score += checkMCQ();
  score += checkArrange();

  const total =
    document.querySelectorAll(".quiz .blank").length +
    document.querySelectorAll(".mcq-question").length +
    document.querySelectorAll(".arrange-question").length;

  const percent = Math.round((score / total) * 100);
  document.querySelector("#score").innerText = 
  `Your score: ${score}/${total} (${percent}%)`;
}

// -----------------------------
// INITIAL SETUP
// -----------------------------

setupWordDragging();
setupBlankDropping();
setupArrangeDragging();

