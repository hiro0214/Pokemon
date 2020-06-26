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
  <div class="pokemon-content" id="enemy">
    <div class="pokemon-content__name">ピカチュウ</div>
    <div class="pokemon-content__img">
      <img src="./assets/images/pikachuu_f.png" />
    </div>
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
  <div class="pokemon-content" id="player">
    <div class="pokemon-content__name">リザードン</div>
    <div class="pokemon-content__img">
      <img src="./assets/images/riza-don_b.png" />
    </div>
    <div class="pokemon-content__lv">50</div>
    <div class="pokemon-content__gauge">
      <div class="pokemon-content__gauge--min">90</div>
      <div class="pokemon-content__gauge--max">110</div>
    </div>
  </div>
</div>

<ul class="trick">
  <li class="current">だいもんじ</li>
  <li>かえんほうしゃ</li>
  <li>きりさく</li>
  <li>つばさでうつ</li>
</ul>
<div class="textbox" id="textBox"></div>
</div>
`;