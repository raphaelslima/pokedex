const url = "https://pokeapi.co/api/v2/pokemon/";
const pokemon_name = document.querySelector(".pokemon_name");
const pokemon_number = document.querySelector(".pokemon_number");
const pokemon_image = document.querySelector(".pokemon_image");
const separator = document.querySelector(".separator");
const form = document.querySelector(".form");
const input_search = document.querySelector(".input_search");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
let numberPokemonSearch = 25;

const fetchPokemon = async (pokemon) => {
  const APIresponse = await fetch(`${url}${pokemon}`);

  if (APIresponse.status === 200) {
    const data = await APIresponse.json();
    numberPokemonSearch = data.id;
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemon_name.innerHTML = "Loading...";
  separator.innerHTML = "";
  pokemon_number.innerHTML = "";

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemon_name.innerHTML = data.name;
    separator.innerHTML = "-";
    pokemon_image.style.display = "block";
    numberPokemonSearch = data.id;
    pokemon_number.innerHTML = data.id;
    pokemon_image.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
  } else {
    pokemon_name.innerHTML = "Not Found :(";
    separator.innerHTML = "";
    pokemon_image.style.display = "none";
    pokemon_number.innerHTML = "";
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  renderPokemon(input_search.value.toLowerCase().toString());
  input_search.value = "";
});

btnNext.addEventListener("click", () => {
  numberPokemonSearch = numberPokemonSearch + 1;
  renderPokemon(numberPokemonSearch.toString());
});

btnPrev.addEventListener("click", () => {
  if (numberPokemonSearch > 1) {
    numberPokemonSearch = numberPokemonSearch - 1;
  }
  renderPokemon(numberPokemonSearch.toString());
});

renderPokemon(numberPokemonSearch.toString());
