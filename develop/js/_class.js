"use strict";
exports.__esModule = true;
var Pokemon = /** @class */ (function () {
    function Pokemon(name, hp, attack, deffence, speed, spAtk, spDef, type1, type2, tricks) {
        this.name = name;
        this.hp = hp;
        this.attack = attack;
        this.deffence = deffence;
        this.speed = speed;
        this.spAtk = spAtk;
        this.spDef = spDef;
        this.type1 = type1;
        this.type2 = type2;
        this.tricks = tricks;
    }
    return Pokemon;
}());
exports["default"] = Pokemon;
