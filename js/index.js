"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("#search-form > form");
const input = document.querySelector("#input-localizacao");
const sectionTempoInfo = document.querySelector("#tempo-info");
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    if (!input || !sectionTempoInfo)
        return;
    const localizacao = input === null || input === void 0 ? void 0 : input.value;
    if (localizacao.length < 3) {
        alert("o local digitado precisa ter pelo menos 3 letras");
    }
    const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=10abef09befd35450fdd512c94d9ace2&lang=pt_br&units=metric`);
    const dados = yield response.json();
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
}));
