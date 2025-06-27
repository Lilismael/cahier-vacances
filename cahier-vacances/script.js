document.getElementById("load").addEventListener("click", () => {
  const day = document.getElementById("day").value;
  if (!day) return;
  fetch(`questions/jour${day}.json`)
    .then(res => res.json())
    .then(data => showQuiz(data));
});

function showQuiz(questions) {
  const quizArea = document.getElementById("quiz-area");
  quizArea.innerHTML = "";

  questions.forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "question-block";
    div.innerHTML = `<p><strong>Q${i + 1}.</strong> ${q.question}</p>`;

    q.choices.forEach((choice, j) => {
      const id = `q${i}_c${j}`;
      div.innerHTML += `
        <label>
          <input type="radio" name="q${i}" value="${choice}" />
          ${choice}
        </label><br/>
      `;
    });

    quizArea.appendChild(div);
  });

  const btn = document.createElement("button");
  btn.textContent = "Valider mes réponses";
  btn.onclick = () => checkAnswers(questions);
  quizArea.appendChild(btn);
}

function checkAnswers(questions) {
  let score = 0;

  questions.forEach((q, i) => {
    const selected = document.querySelector(\`input[name="q\${i}"]:checked\`);
    if (!selected) return;
    const answer = selected.value;

    if (Array.isArray(q.answer)) {
      if (q.answer.includes(answer)) score++;
    } else {
      if (answer === q.answer) score++;
    }
  });

  alert(\`Tu as obtenu \${score} point\${score > 1 ? 's' : ''} sur \${questions.length} !\`);
}
