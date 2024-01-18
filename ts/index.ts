const form = document.querySelector("#search-form > form");
const input: HTMLInputElement | null =
  document.querySelector("#input-localizacao");

const sectionTempoInfo = document.querySelector("#tempo-info");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!input || !sectionTempoInfo) return;

  const localizacao = input?.value;

  if (localizacao.length < 3) {
    alert("o local digitado precisa ter pelo menos 3 letras");
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=10abef09befd35450fdd512c94d9ace2&lang=pt_br&units=metric`
  );
  const dados = await response.json();

  const infos = {
    temperatura: Math.round(dados.main.temp),
    local: dados.name,
    icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`,
  };

  sectionTempoInfo.innerHTML = `
  <div class="tempo-dados">
    <h2>${infos.local}</h2>
    <span>${infos.temperatura}</span>
  </div>
  <img src="${infos.icone}" alt="icone referenciando ao tipo do tempo" />`;
});
