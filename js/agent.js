document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const messages = document.getElementById("chat-messages");
  const clearButton = document.getElementById("clear-chat");

  if (!form || !input || !messages) return;

  const intro = "你好，我是 AI科研诚信官。这里是静态网页中的模拟对话界面，不会调用真实 API。你可以问我 AI 写作边界、数据合规、文献核验、论文披露或投稿前自查等问题。";

  const replies = [
    "建议先确认这件事是否涉及核心学术贡献。如果 AI 只是用于润色、整理表达或查漏补缺，通常风险较低；如果替代你完成观点、数据解释或论文主体写作，就需要谨慎甚至避免。",
    "请优先保留过程记录：包括使用目的、提示词要点、AI 输出、人工修改和最终采纳内容。正式论文或报告中是否披露，应以课程、导师、学校或期刊要求为准。",
    "如果问题涉及数据、隐私、伦理审查材料或未公开课题资料，不建议输入公共 AI 工具。你可以使用脱敏示例讨论方法，但不能上传真实敏感信息。",
    "文献相关内容一定要回到原始来源核验。AI 给出的题名、作者、期刊、年份和 DOI 都可能出错，不能直接作为引用依据。",
    "投稿前建议做五项自查：数据是否可追溯，图片处理是否有记录，参考文献是否核验，AI 使用是否按要求披露，作者和承诺内容是否经过确认。"
  ];

  function addMessage(role, text, thinking = false) {
    const item = document.createElement("div");
    item.className = `chat-message ${role}${thinking ? " thinking" : ""}`;
    item.innerHTML = `<span>${role === "bot" ? "AI科研诚信官" : "你"}</span><p>${text}</p>`;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
    return item;
  }

  function chooseReply(text) {
    const value = text.toLowerCase();
    if (value.includes("文献") || value.includes("doi") || value.includes("引用")) return replies[3];
    if (value.includes("数据") || value.includes("隐私") || value.includes("伦理") || value.includes("上传")) return replies[2];
    if (value.includes("披露") || value.includes("记录") || value.includes("说明")) return replies[1];
    if (value.includes("投稿") || value.includes("审稿") || value.includes("回复")) return replies[4];
    return replies[0];
  }

  function resetChat() {
    messages.innerHTML = "";
    addMessage("bot", intro);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    addMessage("user", text);
    input.value = "";

    const thinking = addMessage("bot", "思考中…正在根据科研诚信学习规则整理提示。", true);
    setTimeout(() => {
      thinking.remove();
      addMessage("bot", chooseReply(text));
    }, 800);
  });

  clearButton?.addEventListener("click", resetChat);
  resetChat();
});
