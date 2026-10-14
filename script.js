/*
  PERSONALIZE AQUI 💜
  Troque os textos entre aspas. Você não precisa mexer no resto do código.
*/
const PERSONALIZACAO = {
  apelido: "minha princesa", //
  data: "amanhã 💜",       // Ex.: "15 de outubro de 2026"
  mensagemFinal: `Amanhã a gente finalmente vai se encontrar pessoalmente, e eu tô feliz demais por isso.

achei justo você saber que, além de uma "namo" linda rs, você também ganhou alguém que vai usar programação como desculpa pra fazer essas surpresas pra você. Então se acostuma: isso aqui é só a versão 1.0 KKKKK.

Brincadeiras à parte, eu gosto de te ver feliz. Gosto de ser alguém com quem você pode rir, conversar e ser você mesma. Tô ansiosa pra transformar nossas conversas em memórias de verdade.

Não precisa ser perfeito. Só quero que seja nosso.

Te vejo amanhã, neném. ♡`
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
