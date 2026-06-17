document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("quiz-app");
  if (!root) return;

  const data = window.quizData || quizData;
  let index = 0;
  let correctCount = 0;
  const wrongAnswers = [];

  const progress = root.querySelector("#quiz-progress");
  const scoreEl = root.querySelector("#quiz-score");
  const question = root.querySelector("#question-text");
  const meta = root.querySelector("#question-meta");
  const options = root.querySelector("#options-container");
  const explanation = root.querySelector("#quiz-explanation");
  const nextBtn = root.querySelector("#next-btn");
  const resultPanel = root.querySelector("#result-panel");
  const reviewPanel = root.querySelector("#wrong-review");

  function renderQuestion() {
    const item = data[index];
    progress.textContent = `第 ${index + 1} 题 / ${data.length} 题`;
    scoreEl.textContent = getScore();
    meta.textContent = `${item.category} · ${item.difficulty}`;
    question.textContent = item.question;
    options.innerHTML = "";
    explanation.hidden = true;
    explanation.textContent = "";
    nextBtn.hidden = true;
    resultPanel.hidden = true;

    item.options.forEach((text, optionIndex) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "option-btn";
      button.textContent = text;
      button.addEventListener("click", () => selectAnswer(optionIndex, button));
      options.appendChild(button);
    });
  }

  function selectAnswer(optionIndex, selectedButton) {
    const item = data[index];
    const buttons = [...options.querySelectorAll(".option-btn")];
    buttons.forEach((button) => button.disabled = true);

    if (optionIndex === item.correct) {
      selectedButton.classList.add("correct");
      correctCount += 1;
    } else {
      selectedButton.classList.add("wrong");
      buttons[item.correct].classList.add("correct");
      wrongAnswers.push({ item, selected: optionIndex });
    }

    scoreEl.textContent = getScore();
    explanation.textContent = item.explanation;
    explanation.hidden = false;
    nextBtn.hidden = false;
  }

  function getAdvice(finalScore) {
    if (finalScore >= 90) return "优秀，已较好掌握科研诚信与 AI 使用边界。";
    if (finalScore >= 75) return "良好，建议继续复习高风险案例。";
    if (finalScore >= 60) return "基本掌握，建议重点学习文献核验、数据合规和披露规范。";
    return "建议重新学习政策导读、AI 规范和案例库。";
  }

  function getScore() {
    return Math.round((correctCount / data.length) * 100);
  }

  function finishQuiz() {
    progress.textContent = "测评完成";
    question.textContent = "测评结果";
    meta.textContent = "";
    options.innerHTML = "";
    explanation.hidden = true;
    nextBtn.hidden = true;
    resultPanel.hidden = false;
    const finalScore = getScore();
    resultPanel.querySelector(".result-score").textContent = `${finalScore} 分`;
    resultPanel.querySelector(".result-advice").textContent = getAdvice(finalScore);

    reviewPanel.innerHTML = "";
    if (wrongAnswers.length === 0) {
      reviewPanel.innerHTML = "<h3>错题回顾</h3><p>本次没有错题，请继续保持严谨的学习习惯。</p>";
      return;
    }

    const title = document.createElement("h3");
    title.textContent = `错题回顾（${wrongAnswers.length} 题）`;
    reviewPanel.appendChild(title);

    wrongAnswers.forEach(({ item, selected }, wrongIndex) => {
      const block = document.createElement("article");
      block.className = "review-item";
      block.innerHTML = `
        <strong>${wrongIndex + 1}. ${item.question}</strong>
        <p>你的选择：${item.options[selected]}</p>
        <p>正确答案：${item.options[item.correct]}</p>
        <p>解析：${item.explanation}</p>
      `;
      reviewPanel.appendChild(block);
    });
  }

  nextBtn.addEventListener("click", () => {
    index += 1;
    if (index < data.length) renderQuestion();
    else finishQuiz();
  });

  root.querySelector("[data-restart-quiz]").addEventListener("click", () => {
    index = 0;
    correctCount = 0;
    wrongAnswers.length = 0;
    renderQuestion();
  });

  renderQuestion();
});
