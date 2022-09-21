// 要素を取得する
const poke_container = document.getElementById("poke-container");

// 定数を定義
// 表示するポケモン数
const pokemon_count = 151;

// カラー
const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};

// colorsのkeyを配列に格納
const main_types = Object.keys(colors);

// ポケモン取得
const fetchPokemons = async () => {
  for (let i = 1; i <= pokemon_count; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  createPokemonCard(data);
};

//Htmlのcardクラスにポケモンカードクラスを入れる
// const pokemoncard = document.createElement("div");
// pokemoncard.classList.add('pokemon-card')
// const card_js = document.getElementById('card')
// pokemonEl.before(card_js);

// ポケモンカードを作成
const createPokemonCard = (pokemon) => {
  // div要素を作成
  const pokemonEl = document.createElement("div");
  // pokemonクラスを追加
  pokemonEl.classList.add("pokemon");


  //ポケモンクラスをポケモンカードクラスの中に
  // pokemonEl.before(pokemoncard);

  // ポケモン情報からデータを格納
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const id = pokemon.id.toString().padStart(3, "0");
  const poke_types = pokemon.types.map((type) => type.type.name);
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);
  const color = colors[type];

  // ポケモンの背景色を設定
  pokemonEl.style.backgroundColor = color;

  // ポケモンカードのテンプレ
  const pokemonInnerHTML = ` 

  <div class="card">

  <!-- 裏面のコンテンツ -->
  <div class="back">
   <div class="img-container">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png" alt="" />
        <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span> </small>
        </div>
      </div>  
    </div>
  <!-- 表面のコンテンツ -->
  <div class="front">
  
    <img src="https://www.pokemon-card.com/assets/images/noimage/poke_ura.jpg" alt="" />
    <p class="quiz">これは誰でしょう？<p>

  </div>

   

  
</div>
`;

  // ポケモンカードのテンプレートを追加
  pokemonEl.innerHTML = pokemonInnerHTML;

  // poke_containerの子要素として追加
  poke_container.appendChild(pokemonEl);
};

// ページが読み込まれた時に実行
fetchPokemons();














