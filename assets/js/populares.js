const listaAnime = document.querySelector("#listaAnime");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://www.npmjs.com/package/anime-api";

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarAnime(data))
}

function mostrarAnime(anime) {

    let tipos = anime.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let animeId = anime.id.toString();
    if (animeId.length === 1) {
        animeId = "00" + animeId;
    } else if (animeId.length === 2) {
        animeId = "0" + animeId;
    }


    const div = document.createElement("div");
    div.classList.add("anime");
    div.innerHTML = `
        <p class="anime-id-back">#${animeId}</p>
        <div class="anime-imagen">
            <img src="${anime.sprites.other["official-artwork"].front_default}" alt="${anime.name}">
        </div>
        <div class="anime-info">
            <div class="nombre-contenedor">
                <p class="anime-id">#${animeId}</p>
                <h2 class="anime-nombre">${anime.name}</h2>
            </div>
            <div class="anime-tipos">
                ${tipos}
            </div>
            <div class="anime-stats">
                <p class="stat">${anime.height}m</p>
                <p class="stat">${anime.weight}kg</p>
            </div>
        </div>
    `;
    listaAnime.append(div);
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaAnime.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if(botonId === "ver-todos") {
                    mostrarAnime(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarAnime(data);
                    }
                }

            })
    }
}))