// Adiciona um novo campo de exercício ao formulário
document.getElementById("addExercicio").addEventListener("click", function () {
  const container = document.getElementById("exerciciosContainer");
  const div = document.createElement("div");
  div.classList.add("exercicio");
  div.innerHTML = `
      <input type="text" name="exercicioNome" placeholder="Nome do Exercício" required>
      <input type="number" name="exercicioCarga" placeholder="Carga (kg)" required>
      <button type="button" class="removeExercicio">Excluir</button>
  `;
  container.appendChild(div);

  // Adiciona o evento de clique ao botão de exclusão
  div.querySelector(".removeExercicio").addEventListener("click", function () {
    div.remove();
  });
});

// Processa o formulário e exibe os resultados na página
document
  .getElementById("treinoForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const treino = document.getElementById("treino").value;
    const nome = document.getElementById("nome").value;
    const exercicios = document.querySelectorAll(".exercicio");
    let resultado = `Treino do Dia: ${treino}\nNome: ${nome}\nExercícios:\n`;

    exercicios.forEach((exercicio, index) => {
      const nomeExercicio = exercicio.querySelector(
        'input[name="exercicioNome"]'
      ).value;
      const cargaExercicio = exercicio.querySelector(
        'input[name="exercicioCarga"]'
      ).value;
      resultado += `\t${index + 1}. ${nomeExercicio} - ${cargaExercicio} kg\n`;
    });

    document.getElementById("treinoResultado").innerText = resultado;
  });

// Exporta os dados exibidos para um arquivo TXT
document.getElementById("exportTxt").addEventListener("click", function () {
  const resultado = document.getElementById("treinoResultado").innerText;
  const blob = new Blob([resultado], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "treino.txt";
  a.click();
  URL.revokeObjectURL(url);
});
