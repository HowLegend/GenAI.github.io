document.addEventListener("DOMContentLoaded", () => {
  const featuredWrap = document.getElementById("featured-cases");
  const caseList = document.getElementById("case-list");
  const filters = document.querySelectorAll("[data-case-filter]");
  const modal = document.getElementById("case-modal");

  function levelClass(level) {
    if (level.includes("高")) return "high";
    if (level.includes("中")) return "medium";
    return "low";
  }

  function createCard(item, compact = false) {
    const card = document.createElement("article");
    card.className = `case-card ${levelClass(item.level)}`;
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `查看案例：${item.title}`);
    card.innerHTML = `
      <span>${item.level}</span>
      <small>${item.category}</small>
      <h3>${item.title}</h3>
      <p>${item.scenario}</p>
      ${compact ? "" : `<strong>学习提示：${item.tip}</strong>`}
    `;
    card.addEventListener("click", () => openModal(item));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModal(item);
      }
    });
    return card;
  }

  function renderFeaturedCases() {
    if (!featuredWrap || !window.caseData && typeof caseData === "undefined") return;
    const data = (window.caseData || caseData).slice(0, 6);
    featuredWrap.innerHTML = "";
    data.forEach((item) => featuredWrap.appendChild(createCard(item, true)));
  }

  function renderCases(filter = "全部") {
    if (!caseList) return;
    const data = window.caseData || caseData;
    const filtered = data.filter((item) => {
      if (filter === "全部") return true;
      if (["高风险", "中风险", "低风险"].includes(filter)) return item.level === filter;
      return item.category === filter;
    });
    caseList.innerHTML = "";
    filtered.forEach((item) => caseList.appendChild(createCard(item)));
    const count = document.getElementById("case-count");
    if (count) count.textContent = `${filtered.length} 个案例`;
  }

  function openModal(item) {
    if (!modal) return;
    modal.querySelector(".modal-title").textContent = item.title;
    modal.querySelector(".modal-meta").textContent = `${item.category} · ${item.level} · ${item.id}`;
    modal.querySelector(".modal-body").innerHTML = `
      <section><h4>场景描述</h4><p>${item.scenario}</p></section>
      <section><h4>风险点</h4><p>${item.risk}</p></section>
      <section><h4>可能后果</h4><p>${item.consequence}</p></section>
      <section><h4>正确做法</h4><p>${item.recommendation}</p></section>
      <section><h4>学习提示</h4><p>${item.tip}</p></section>
    `;
    modal.hidden = false;
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      filters.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderCases(button.dataset.caseFilter);
    });
  });

  document.querySelectorAll("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });

  renderFeaturedCases();
  renderCases();
});
