const section = document.getElementById("section");

// Cria um contêiner .cards e o adiciona à seção
const divCards = document.createElement("div");
divCards.classList.add("cards");
section.appendChild(divCards);

// Função para criar e mostrar um modal com detalhes do Pokémon
function showPokemonDetails(pokemonDetails) {
    // Aqui você pode criar um modal ou um elemento de detalhe e preenchê-lo com os dados de pokemonDetails
    const detailsModal = document.createElement("div");
    detailsModal.classList.add("pokemon-details-modal");

    const name = document.createElement("h2");
    name.innerText = pokemonDetails.name;

    const image = document.createElement("img");
    image.src = pokemonDetails.sprites.front_default;

    const height = document.createElement("p");
    height.innerText = `Height: ${pokemonDetails.height}`;

    const weight = document.createElement("p");
    weight.innerText = `Weight: ${pokemonDetails.weight}`;

    // Adiciona os detalhes ao modal
    detailsModal.appendChild(name);
    detailsModal.appendChild(image);
    detailsModal.appendChild(height);
    detailsModal.appendChild(weight);

    // Adiciona um botão para fechar o modal
    const closeButton = document.createElement("button");
    closeButton.innerText = "Close";
    closeButton.onclick = () => detailsModal.remove();
    detailsModal.appendChild(closeButton);

    // Adiciona o modal ao corpo do documento
    document.body.appendChild(detailsModal);
}

async function getPokemon() {
    const url = "https://pokeapi.co/api/v2/pokemon";
    const request = await fetch(url);
    const response = await request.json();
    const data = response.results.reverse();

    data.forEach(async (res) => {
        const detailResponse = await fetch(res.url);
        const requestDetail = await detailResponse.json();
        const imageUrl = requestDetail.sprites.front_default;

        const card = document.createElement("div");
        const title = document.createElement("h1");
        const image = document.createElement("img");

        card.classList.add("card");
        title.innerHTML = res.name;
        image.src = imageUrl;

        card.appendChild(image);
        card.appendChild(title);
        
        // Adiciona um evento de clique ao cartão para mostrar mais detalhes
        card.onclick = () => showPokemonDetails(requestDetail);

        divCards.appendChild(card);
    })
}

getPokemon();
