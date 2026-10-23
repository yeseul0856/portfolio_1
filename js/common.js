// 모든 메뉴는 새 창(팝업 윈도우)으로 연다
function openWindow(url, name) {
  const w = Math.min(1280, screen.availWidth - 80);
  const h = Math.min(860, screen.availHeight - 80);
  const left = Math.round((screen.availWidth - w) / 2);
  const top = Math.round((screen.availHeight - h) / 2);
  const win = window.open(url, name || "_blank", `width=${w},height=${h},left=${left},top=${top},resizable=yes,scrollbars=yes`);
  // 팝업이 차단되면 새 탭으로라도 연다
  if (!win) window.open(url, "_blank");
  else win.focus();
}

// a[data-window] 링크는 클릭 시 새 창으로
document.addEventListener("click", (e) => {
  const a = e.target.closest("a[data-window]");
  if (!a) return;
  e.preventDefault();
  openWindow(a.getAttribute("href"), a.dataset.window);
});

// 검색 폼: 결과를 새 창으로
function bindSearch(form, { sameWindow = false } = {}) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = form.q.value.trim();
    if (!q) return form.q.focus();
    const url = `search.html?q=${encodeURIComponent(q)}`;
    if (sameWindow) location.href = url;
    else openWindow(url, "papercut-search");
  });
}

const store = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem("papercut:" + key);
      return v === null ? fallback : JSON.parse(v);
    } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem("papercut:" + key, JSON.stringify(value)); } catch {}
  },
};

const DEFAULT_SETTINGS = { summaries: true, count: 10, sort: "relevance", openInWindow: true };
const getSettings = () => ({ ...DEFAULT_SETTINGS, ...store.get("settings", {}) });

const DEFAULT_SOURCES = [
  "Fault Detection Effectiveness of Source Test Case Generation Strategies for Metamorphic Testing",
  "Morphy: A Datamorphic Software Test Automation Tool",
];
const getSources = () => store.get("sources", DEFAULT_SOURCES);
const setSources = (list) => store.set("sources", list);

const PAPERS = [
  { title: "Lecture Notes: Optimization for Machine Learning", date: "9/8/19", authors: "Elad Hazan",
    summary: "This summary provides lecture notes on optimization techniques tailored for machine learning applications. The content is derived from a course at Princeton University and tutorials presented at MLSS, Buenos Aires, and the Simons Foundation, Berkeley." },
  { title: "An Optimal Control View of Adversarial Machine Learning", date: "11/11/18", authors: "Xiaojin Zhu",
    summary: "This paper explores an optimal control perspective on adversarial machine learning, viewing the machine learner as a dynamical system and adversarial actions as inputs. The control costs are based on the adversary's goals to cause harm and evade detection, encompassing various types of attacks." },
  { title: "Minimax deviation strategies for machine learning and recognition with short learning samples", date: "7/16/17", authors: "Michail Schlesinger, Evgeniy Vodolazskiy",
    summary: "This paper discusses the challenge of small learning samples in machine learning and identifies flaws in maximum likelihood and minimax learning methods. It introduces the concept of minimax deviation learning as a solution that overcomes these flaws." },
  { title: "Machine Learning for Clinical Predictive Analytics", date: "9/19/19", authors: "Wei-Hung Weng",
    summary: "This chapter provides an overview of applying machine learning techniques in clinical predictive analytics, covering data preparation, model selection and evaluation for real-world healthcare settings." },
  { title: "Attention Is All You Need", date: "6/12/17", authors: "Ashish Vaswani, Noam Shazeer, Niki Parmar, et al.",
    summary: "This paper proposes the Transformer, a network architecture based solely on attention mechanisms, dispensing with recurrence and convolutions entirely, and achieving state-of-the-art results in machine translation." },
  { title: "Deep Residual Learning for Image Recognition", date: "12/10/15", authors: "Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun",
    summary: "This paper presents a residual learning framework that eases the training of substantially deeper neural networks, winning first place in the ILSVRC 2015 classification task." },
  { title: "Fault Detection Effectiveness of Source Test Case Generation Strategies for Metamorphic Testing", date: "2/20/18", authors: "Prashanta Saha, Upulee Kanewala",
    summary: "This paper evaluates how different source test case generation strategies affect the fault detection effectiveness of metamorphic testing, comparing random and coverage-based approaches." },
  { title: "Morphy: A Datamorphic Software Test Automation Tool", date: "12/20/19", authors: "Hong Zhu, Ian Bayley, Dongmei Liu, Xiaoyu Zheng",
    summary: "This paper introduces Morphy, a tool that automates datamorphic testing by managing test entities such as seeds, datamorphisms, metamorphisms and test strategies." },
  { title: "Software Testing with Large Language Models: Survey, Landscape, and Vision", date: "7/14/23", authors: "Junjie Wang, Yuchao Huang, Chunyang Chen, et al.",
    summary: "This survey reviews the use of large language models in software testing, covering unit test generation, test oracle problems, program repair and the open challenges that remain." },
  { title: "Reinforcement Learning: An Introduction", date: "11/13/18", authors: "Richard S. Sutton, Andrew G. Barto",
    summary: "This book provides a clear account of the key ideas and algorithms of reinforcement learning, from tabular methods to function approximation and policy gradient methods." },
];
