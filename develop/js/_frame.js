export const openingFrame =
`
<div class="opening">
  <div class="opening__star"></div>
  <div class="opening__text">
    <p>1995 Nintendo</p>
    <p>1995 Creatures Inc.</p>
    <p>1995 GAME FREAK Inc.</p>
  </div>
  <div class="opening__top-band"></div>
  <div class="opening__bottom-band"></div>
  <div class="opening__logo">
    <img src="./assets/images/opening/gamefreak_logo.png" />
    <p>GAME FREAK</p>
    <div id="starPos"></div>
  </div>
  <div class="opening__battle">
    <div class="back"></div>
    <div class="front"></div>
  </div>
</div>
`;


export const titleFrame =
`
<div class="title">
  <h1>ポケットモンスター</h1>
</div>
`;

export const fieldFrame =
`
<div class="field">
  <p>field</p>
</div>
`;

export const battleFrame =
`
<div class="status-block enemy-block" state="status">
  <ul id="enemyBall">
    <li class="show"></li>
    <li class="show"></li>
    <li class="show"></li>
    <li class="show"></li>
    <li class="show"></li>
    <li class="show"></li>
  </ul>
  <div id="enemy" class="pokemon-content">
    <div class="pokemon-content__name"></div>
    <div class="pokemon-content__img"></div>
    <div class="pokemon-content__lv">50</div>
    <div class="pokemon-content__gauge"></div>
  </div>
</div>

<div class="status-block player-block" state="status">
  <ul id="playerBall">
    <li class="show"></li>
    <li class="show"></li>
    <li class="show"></li>
    <li class="show"></li>
    <li class="show"></li>
    <li class="show"></li>
  </ul>
  <div id="player" class="pokemon-content">
    <div class="pokemon-content__name"></div>
    <div class="pokemon-content__img"></div>
    <div class="pokemon-content__lv">50</div>
    <div class="pokemon-content__gauge">
      <div class="pokemon-content__gauge--min">90</div>
      <div class="pokemon-content__gauge--max"></div>
    </div>
  </div>
</div>

<ul id="trickColumn" class="trick"></ul>
<div class="textbox" id="textBox"></div>
`;