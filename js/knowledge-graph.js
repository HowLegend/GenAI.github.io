document.addEventListener("DOMContentLoaded", () => {
    const shell = document.querySelector(".knowledge-graph-shell");
    const panel = document.querySelector("#graph-detail-panel");
    const graphButtons = document.querySelectorAll("[data-graph-node]");
    const toggleButton = document.querySelector("[data-graph-toggle]");

    if (!shell || !panel || graphButtons.length === 0) {
        return;
    }

    const links = {
        policy: { label: "查看政策导读", href: "#policy" },
        guide: { label: "查看 AI 规范", href: "#guide" },
        cases: { label: "进入案例库", href: "cases.html" },
        resources: { label: "学习资源中心", href: "resources.html" },
        quiz: { label: "在线测评", href: "assessment.html" },
        agent: { label: "AI 科研诚信官", href: "agent.html" }
    };

    const graphData = {
        core: {
            badge: "Map Overview",
            title: "科研诚信与 AI 辅助科研",
            accent: "#2a5a9e",
            summary: "这张图谱把科研流程、规范体系、AI 使用边界、风险案例和学习训练连接起来，帮助学习者从全局理解诚信责任。",
            points: [
                "中心原则：AI 可以辅助学习和表达，但不能替代真实贡献、真实数据和真实来源。",
                "判断路径：先看科研阶段，再看行为边界，最后用政策和案例校准风险。",
                "学习闭环：课程学习、案例识别、智能体问答和在线测评相互支撑。"
            ],
            actions: [links.policy, links.guide, links.agent]
        },
        process: {
            badge: "Research Process",
            title: "科研全过程",
            accent: "#1683e9",
            summary: "科研诚信贯穿从文献检索到成果传播的每一步，不是提交论文前的最后检查。",
            points: [
                "选题和设计要真实、可解释、可复核。",
                "数据采集、处理和分析要保留原始记录与版本痕迹。",
                "写作、投稿和交流要如实表达贡献、局限和来源。"
            ],
            actions: [links.resources, links.quiz]
        },
        ai: {
            badge: "AI Usage Boundary",
            title: "AI 辅助科研行为",
            accent: "#2a9d8f",
            summary: "AI 使用需要区分合理使用、限制性使用和禁止使用，并做到人工复核、过程留痕和必要披露。",
            points: [
                "合理使用：解释概念、整理提纲、润色语言、生成检索关键词。",
                "限制性使用：代码、数据、图像和方法建议必须由研究者复核。",
                "禁止使用：代写核心成果、伪造数据、虚构引用、冒充作者贡献。"
            ],
            actions: [links.guide, links.agent]
        },
        risk: {
            badge: "Risk Cases",
            title: "学术风险与不端行为",
            accent: "#e05a47",
            summary: "风险节点用于提醒学习者：很多违规并不只发生在论文写作阶段，而是藏在数据、图像、引用和披露细节里。",
            points: [
                "数据造假、图像篡改和选择性报告会直接破坏结论可信度。",
                "AI 代写、虚假引用和隐私泄露会破坏作者责任与学术共同体信任。",
                "遇到不确定边界时，应主动咨询导师、课程要求或平台智能体。"
            ],
            actions: [links.cases, links.quiz]
        },
        policy: {
            badge: "Integrity Policy",
            title: "科研诚信规范体系",
            accent: "#7a5cbd",
            summary: "政策导读将规范要求拆解为选题、数据、写作、署名、发表、评议和利益冲突等责任边界。",
            points: [
                "规范不是限制创新，而是保证研究可被信任、检验和传播。",
                "任何成果都应能说明来源、方法、贡献和责任主体。",
                "AI 参与科研时，更需要明确披露使用范围和人工复核过程。"
            ],
            actions: [links.policy, links.guide]
        },
        learning: {
            badge: "Learning Center",
            title: "学习中心与训练闭环",
            accent: "#d79a2b",
            summary: "学习中心把视频课程、资源下载、案例库、在线测评和 AI 科研诚信官组织成可反复练习的训练路径。",
            points: [
                "视频课程建立概念框架。",
                "资源材料支持课堂讨论、作业自查和项目记录。",
                "测评与智能体问答帮助定位薄弱点。"
            ],
            actions: [links.resources, links.quiz, links.agent]
        },
        allowed: {
            badge: "Allowed",
            title: "合理使用",
            accent: "#2a9d8f",
            summary: "AI 可用于学习解释、语言润色、格式整理和检索启发，但研究判断仍由学习者完成。",
            points: ["保留关键提示词和输出结果。", "核验 AI 给出的事实、文献和方法建议。", "不要把辅助表达包装成原创贡献。"],
            actions: [links.guide]
        },
        caution: {
            badge: "Caution",
            title: "限制性使用",
            accent: "#d79a2b",
            summary: "当 AI 参与代码、数据、图像或实验设计时，必须提高复核强度，并按课程或期刊要求披露。",
            points: ["代码需要测试和解释。", "数据与图像处理需保存原始文件、参数和处理版本。", "方法建议只能作为参考，不能替代研究方案。"],
            actions: [links.guide, links.agent]
        },
        prohibited: {
            badge: "Prohibited",
            title: "禁止使用",
            accent: "#e05a47",
            summary: "凡是替代真实数据、真实贡献或真实来源的 AI 使用，都属于高风险或禁止行为。",
            points: ["不得生成或篡改实验数据、访谈材料和图像证据。", "不得虚构参考文献、伦理审批或同行评议。", "不得让 AI 代写论文核心创新和结论。"],
            actions: [links.cases]
        },
        governance: {
            badge: "Governance",
            title: "披露与留痕",
            accent: "#7a5cbd",
            summary: "负责任的 AI 使用需要可说明、可核验、可追溯。",
            points: ["记录工具名称、版本、用途、时间和关键提示词。", "说明 AI 参与范围和人工复核方式。", "涉及隐私或未公开资料时先确认授权。"],
            actions: [links.policy, links.guide]
        },
        literature: {
            badge: "Research Process",
            title: "文献检索与信息获取",
            accent: "#1683e9",
            summary: "AI 可以帮助生成检索词和解释概念，但不能替代数据库核验。",
            points: ["使用学校图书馆、数据库或出版商页面确认文献信息。", "警惕 AI 生成的不存在文献。", "记录检索式和筛选标准。"],
            actions: [links.resources]
        },
        design: {
            badge: "Research Process",
            title: "研究选题与设计",
            accent: "#1683e9",
            summary: "研究问题、假设、样本、排除标准和伦理要求应在研究开始前明确。",
            points: ["避免为迎合结论临时修改假设。", "AI 建议可以参考，但方案合理性由研究者负责。", "必要时完成伦理审查或导师确认。"],
            actions: [links.policy]
        },
        data: {
            badge: "Research Process",
            title: "数据采集",
            accent: "#1683e9",
            summary: "数据采集要保证来源合法、过程完整、记录可追溯。",
            points: ["保留原始数据和采集记录。", "不得补造样本或删除不符合预期的记录。", "涉及个人信息时遵守授权和脱敏要求。"],
            actions: [links.cases]
        },
        analysis: {
            badge: "Research Process",
            title: "统计分析",
            accent: "#1683e9",
            summary: "分析过程应可复现，异常处理和模型选择应有理由。",
            points: ["保留脚本、参数和处理日志。", "不得选择性报告显著结果。", "AI 生成代码必须测试并理解。"],
            actions: [links.quiz]
        },
        writing: {
            badge: "Research Process",
            title: "论文写作",
            accent: "#1683e9",
            summary: "写作应忠实呈现研究贡献、证据、局限和来源。",
            points: ["AI 润色可用，但核心论证不能代写。", "引用必须可核验。", "必要时披露 AI 使用范围。"],
            actions: [links.guide]
        },
        share: {
            badge: "Research Process",
            title: "学术交流",
            accent: "#1683e9",
            summary: "报告、答辩和学术交流同样需要诚实表达研究边界。",
            points: ["不夸大结论适用范围。", "明确合作贡献和数据来源。", "尊重未公开成果和团队约定。"],
            actions: [links.agent]
        },
        topic: {
            badge: "Integrity Policy",
            title: "选题规范",
            accent: "#7a5cbd",
            summary: "选题应基于真实问题和合理证据，而不是为已有结论寻找包装。",
            points: ["问题真实。", "方案可解释。", "伦理边界清楚。"],
            actions: [links.policy]
        },
        policyData: {
            badge: "Integrity Policy",
            title: "数据规范",
            accent: "#7a5cbd",
            summary: "数据与图像规范强调来源清楚、处理透明和结果可复核。",
            points: ["原始数据可追溯。", "处理参数可说明。", "图像调整不改变科学含义。"],
            actions: [links.policy, links.cases]
        },
        citation: {
            badge: "Integrity Policy",
            title: "引用规范",
            accent: "#7a5cbd",
            summary: "引用是学术对话的证据链，不能使用未核验或不存在的来源。",
            points: ["引用原始来源。", "核验作者、题名、期刊、年份和 DOI。", "区分引用、转述和个人观点。"],
            actions: [links.policy]
        },
        author: {
            badge: "Integrity Policy",
            title: "署名与发表",
            accent: "#7a5cbd",
            summary: "署名体现贡献与责任，不应由职位、关系或工具使用替代。",
            points: ["贡献与署名匹配。", "投稿材料真实完整。", "AI 不能作为作者承担责任。"],
            actions: [links.policy]
        },
        conflict: {
            badge: "Integrity Policy",
            title: "利益冲突",
            accent: "#7a5cbd",
            summary: "可能影响判断的资助、合作、兼职、亲属或商业关系应主动披露。",
            points: ["披露不等于违规。", "隐瞒利益关系会削弱研究可信度。", "评审和合作中尤其要注意回避。"],
            actions: [links.policy]
        },
        review: {
            badge: "Integrity Policy",
            title: "同行评议",
            accent: "#7a5cbd",
            summary: "同行评议应保持独立、保密和公正。",
            points: ["不得泄露评审材料。", "不得让 AI 处理未授权的保密稿件。", "评价应基于学术质量而非关系。"],
            actions: [links.policy]
        },
        riskData: {
            badge: "Risk Case",
            title: "数据造假风险",
            accent: "#e05a47",
            summary: "伪造、篡改、选择性删除或补造数据都会直接破坏研究结论。",
            points: ["不要删除不符合预期的数据点。", "异常值处理必须有预设规则或清楚理由。", "保留原始记录以便复核。"],
            actions: [links.cases]
        },
        imageRisk: {
            badge: "Risk Case",
            title: "图像篡改风险",
            accent: "#e05a47",
            summary: "图像处理不能改变科学含义，也不能隐藏处理痕迹。",
            points: ["避免局部增强、拼接或遮挡关键区域。", "保留原图和处理参数。", "必要时在图注或方法中说明。"],
            actions: [links.cases]
        },
        aiGhost: {
            badge: "Risk Case",
            title: "AI 代写风险",
            accent: "#e05a47",
            summary: "AI 代写会让作者无法真实承担研究问题、论证和结论责任。",
            points: ["不能交由 AI 生成核心创新。", "不能用 AI 输出冒充个人研究成果。", "可用于润色但要人工复核。"],
            actions: [links.guide, links.cases]
        },
        refRisk: {
            badge: "Risk Case",
            title: "虚假引用风险",
            accent: "#e05a47",
            summary: "AI 容易生成看似真实但不存在的文献，引用前必须逐条核验。",
            points: ["不要直接复制 AI 给出的参考文献。", "使用数据库或出版商页面核验。", "无法核验的来源不应进入参考文献表。"],
            actions: [links.cases]
        }
    };

    const renderDetail = (id) => {
        const detail = graphData[id] || graphData.core;

        graphButtons.forEach((button) => {
            button.classList.toggle("active", button.dataset.graphNode === id);
        });

        panel.style.setProperty("--detail-accent", detail.accent);
        panel.innerHTML = `
            <span class="detail-kicker">${detail.badge}</span>
            <h3>${detail.title}</h3>
            <p>${detail.summary}</p>
            <ul>
                ${detail.points.map((point) => `<li>${point}</li>`).join("")}
            </ul>
            <div class="graph-actions">
                ${detail.actions.map((action) => `<a class="graph-action" href="${action.href}">${action.label}</a>`).join("")}
            </div>
        `;
    };

    graphButtons.forEach((button) => {
        button.addEventListener("click", () => {
            shell.classList.add("expanded");
            if (toggleButton) {
                toggleButton.textContent = "收起图谱信息";
            }
            renderDetail(button.dataset.graphNode);
        });
    });

    toggleButton?.addEventListener("click", () => {
        const isExpanded = shell.classList.toggle("expanded");
        toggleButton.textContent = isExpanded ? "收起图谱信息" : "展开图谱信息";
        renderDetail("core");
        panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });

    renderDetail("core");
});
