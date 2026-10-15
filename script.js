const PERSONALIZACAO = {
  apelido: "minha princesa", //
  data: "amanhã 💜",       // Ex.: "15 de outubro de 2026"
  mensagemFinal: `amanhã finalmente irei te ver pessoalmente, e eu tô bemm feliz por isso.
achei justo você saber que, além de uma "namo" linda rs, deve ter percebido que você também ganhou alguém que vai usar programação como desculpa pra fazer essas surpresas pra você. então se acostuma: isso aqui é só a versão 1.0 KKKKK brincadeiras à parte, eu gosto de te surpreender e ver que ficou feliz. quero ser alguém com quem você possa contar, conversar e sempre ser você mesma. tô doida pra transformar essas nossas conversas em memórias reais cntg. enfim...

te vejo amanhã, neném.`
};

// Atualiza os campos personalizáveis no HTML.
document.querySelectorAll("[data-custom]").forEach((element) => {
  const key = element.dataset.custom;
  if (PERSONALIZACAO[key]) element.textContent = PERSONALIZACAO[key];
});

const screens = [...document.querySelectorAll(".screen")];
let typed = false;
let typingTimer;

function showScreen(id) {
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.id === id);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (id === "mensagem" && !typed) {
    typed = true;
    typeMessage(PERSONALIZACAO.mensagemFinal);
  }
}

function typeMessage(message) {
  const target = document.getElementById("typed-message");
  let index = 0;
  target.textContent = "";
  const cursor = document.createElement("span");
  cursor.className = "cursor";
  cursor.textContent = "▍";
  target.appendChild(cursor);

  function typeNext() {
    if (index >= message.length) {
      cursor.remove();
      return;
    }
    cursor.before(document.createTextNode(message[index]));
    index += 1;
    typingTimer = window.setTimeout(typeNext, message[index - 1] === "\n" ? 280 : 22);
  }
  typeNext();
}

document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.go));
});

document.getElementById("reveal-button").addEventListener("click", (event) => {
  const note = document.getElementById("hidden-note");
  note.classList.add("visible");
  event.currentTarget.textContent = "segredo desbloqueado ✓";
  event.currentTarget.disabled = true;
  event.currentTarget.style.opacity = ".72";
});

document.getElementById("restart-button").addEventListener("click", () => {
  window.clearTimeout(typingTimer);
  typed = false;
  document.getElementById("hidden-note").classList.remove("visible");
  const revealButton = document.getElementById("reveal-button");
  revealButton.textContent = "tem mais uma coisa... ♡";
  revealButton.disabled = false;
  revealButton.style.opacity = "1";
  showScreen("inicio");
});

// Barra de preparação com um pequeno efeito visual.
window.setTimeout(() => {
  const bar = document.getElementById("progress-bar");
  if (bar) bar.style.width = "94%";
  const value = document.getElementById("progress-value");
  if (value) value.textContent = "94%";
}, 700);
