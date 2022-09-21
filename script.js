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








const num = 151; //表示したい画像の数

// HTMLを動的に作成しmain部を表示する関数
async function callApi() {
    for (i = 1; i <= num; i++) {
        // APIでjsonを取得する
        var res = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + i + "/");
        var data = await res.json();

        // ID、名前、画像URLを取得する
        var pokeId = data['id']
        var pokeName = data['names'][0]['name']
        var pokemonUrl = data['varieties'][0]['pokemon']['url']


        res = await fetch(pokemonUrl)
        data = await res.json();

        var pokeImageUrl = data['sprites']['front_default']
        var pokeType = data['types'][0]['type']['name']


        // HTMLを生成していく
        // 1データのdivを生成
        var div = document.createElement('div');
        div.id = i;
        div.className = 'box';

        // 図鑑番号と名前用のpタグを作成し、divタグに挿入
        var p = document.createElement('p');
        div.appendChild(p); // p要素をdiv要素の子要素に追加

        // 図鑑番号を挿入
        var id = document.createElement('span');
        id.textContent = pokeId + '.';
        p.appendChild(id);

        // 名前を挿入
        var name = document.createElement('span');
        name.textContent = pokeName;
        p.appendChild(name);

        // 画像を挿入
        var img = document.createElement('img');
        img.src = pokeImageUrl; // 画像パスを追加
        div.appendChild(img);

        var p = document.createElement('p');
        div.appendChild(p); // p要素をdiv要素の子要素に追加

        // タイプを表示
        var type = document.createElement('p');
        type.textContent = pokeType;
        p.appendChild(type);


        // 生成したdiv要素を、wrapperに追加、表示する
        document.getElementById('main').appendChild(div);
    }
}


// details部（詳細データ）の表示関数
async function DetailsDisplay() {
    // APIでjsonを取得する
    var res = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + x);
    var data = await res.json();

    // ID、名前、属名、説明文を取得する。
    var pokeId = data['id']
    var pokeName = data['names'][0]['name']
    var pokeGenus = data['genera'][0]['genus']
    var pokeFlavorText = data['flavor_text_entries'][29]['flavor_text']

    // 画像、たかさ、おもさのデータを取得するためエンドポイントを変える。
    var pokemonUrl = data['varieties'][0]['pokemon']['url']
    res = await fetch(pokemonUrl)
    data = await res.json();

    // 画像を取得
    var pokeImage = data['sprites']['front_default']
    // 後ろからの画像は↓
    // pokeImage1 = data['sprites']['back_default']
    // 色違いの画像は↓
    // pokeImage1 = data['sprites']['front_shiny']

    // たかさ、おもさを取得
    var pokeHeight = data['height'] / 10;
    var pokeWeight = data['weight'] / 10;


    // HTMLを生成していく
    // 画像部を作成
    var div = document.createElement('div');
    div.className = 'img-box';

    // img要素を生成
    var img = document.createElement('img');
    img.src = pokeImage; // 画像パスを追加
    div.appendChild(img); // img要素をdiv要素の子要素に追加

    // Noを生成
    var no = document.createElement('p');
    no.textContent = "No." + pokeId;
    div.appendChild(no);

    // 画像部分（img-box）を表示
    document.getElementById('details').appendChild(div);



    // 詳細部を作成
    var div = document.createElement('div');
    div.className = 'details-box';

    const name = document.createElement('p');
    name.textContent = pokeName;
    div.appendChild(name);

    var genus = document.createElement('p');
    genus.textContent = pokeGenus;
    div.appendChild(genus);

    var height = document.createElement('p');
    height.textContent = "たかさ " + pokeHeight + "m";
    div.appendChild(height);

    var weight = document.createElement('p');
    weight.textContent = "おもさ " + pokeWeight + "kg";
    div.appendChild(weight);

    // 詳細部分を表示
    document.getElementById('details').appendChild(div);


    // 説明部を生成
    var div = document.createElement('div');
    div.className = 'flavor-text-box';

    const flavorText = document.createElement('p');
    flavorText.textContent = pokeFlavorText;
    div.appendChild(flavorText);

    // 説明部を表示
    document.getElementById('details').after(div);
}


// 表示関数を実行
callApi();


// クリックされた時の処理
$(document).on("click", ".box", function (event) {
    // クリックされた要素のidを取得
    x = $(this).attr('id');

    // details部の表示関数を実行。
    DetailsDisplay();

    // main部分を非表示。
    var main = document.getElementById("main");
    main.remove();
});






