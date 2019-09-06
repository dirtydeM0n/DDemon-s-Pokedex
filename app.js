console.log("Welcome to DDemon's Pokedex v1.0");
const pokedex = document.getElementById('pokedex');
console.log(pokedex);
const fetchPokemon = () => {
  const promises = [];
  // Change variable i to increase request count of pokemons
  for (let i = 1; i <= 300; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;

    promises.push(fetch(url).then(res => res.json()));
  }
  Promise.all(promises).then(results => {
    const pokemon = results.map(data => ({
      name: data.name,
      id: data.id,
      image: data.sprites['front_default'],
      type: data.types.map(type => type.type.name).join(', ')
    }));
    displayPokemon(pokemon);
    // data.types.forEach(type => {
    //   pokemon['type'] = pokemon['type'] + ', ' + type.type.name;
    // });
  });
};

const displayPokemon = pokemon => {
  console.log(pokemon);
  const PokemonHTMLString = pokemon
    .map(
      pokemonky =>
        `
  <li class = "card">
  <img class = "card-image" src="${pokemonky.image}"/>
  <h2 class = "card-title">${pokemonky.id}. ${pokemonky.name}</h2>
  <p class = "card-subtitle">Type: ${pokemonky.type}</p>
  </li>
  `
    )
    .join('');
  pokedex.innerHTML = PokemonHTMLString;
};

fetchPokemon();
