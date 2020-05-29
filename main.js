"use strict";
import {createArray, assignDec, randomN} from './modules/generic-functions.js';
//resize body to fit window
const body = document.querySelector('body');
let winWidth = window.innerWidth;
let winHeight = window.innerHeight;
body.style.width = winWidth + 'px';
body.style.height = winHeight + 'px';

window.onresize = function () {
  winWidth = window.innerWidth;
  winHeight = window.innerHeight;
  body.style.height = winHeight + 'px';
  body.style.width = winWidth + 'px';
}
// global bindings
// Card prototype
function Card() {
  this.c0 = [], this.c1 = [], this.c2 = [], this.c3 = [], this.c4 = [], this.c5 = [], this.c6 = [], this.c7 = [], this.c8 = []
}
var littleCard1 = new Card();
var littleCard2 = new Card();
var littleCard3 = new Card();
var littleCard4 = new Card();
var littleCard5 = new Card();
var littleCard6 = new Card();
var board = [littleCard1,littleCard2,littleCard3,littleCard4,littleCard5,littleCard6];

var unpulledNumbers = [];
var unvalidNumbers = [];



const lastNumber = {output: '', value: undefined, count: 0, history: []};


// HTML Elements


// reference to HTML Elements
const boardAi = document.querySelectorAll('#ai');
const boardPlayer = document.querySelectorAll('#player');

const displayLastNumber = document.getElementById('lastnumber');
let numberFlow = document.getElementById('flow');
let numberList = numberFlow.childNodes;

//buttons
let newGameBtn = document.getElementById('newgame');
let newCardAiBtn = document.getElementById('newAI');
let pullNumberBtn = document.getElementById('pullnumber');




// create tabellone
function createTable() {
  let cartella1 = [].concat(createArray(1,5)).concat(createArray(11,15)).concat(createArray(21,25));
  let cartella2 = [].concat(createArray(6,10)).concat(createArray(16,20)).concat(createArray(26,30));
  let cartella3 = [].concat(createArray(31,35)).concat(createArray(41,45)).concat(createArray(51,55));
  let cartella4 = [].concat(createArray(36,40)).concat(createArray(46,50)).concat(createArray(56,60));
  let cartella5 = [].concat(createArray(61,65)).concat(createArray(71,75)).concat(createArray(81,85));
  let cartella6 = [].concat(createArray(66,70)).concat(createArray(76,80)).concat(createArray(86,90));
  let cartelle = [cartella1,cartella2,cartella3,cartella4,cartella5,cartella6];
  for (let c of cartelle) {
    let cartellaN = `.tabellone${cartelle.indexOf(c)+1}`;
    let cartella = document.querySelector(cartellaN);
    for (let i of c) {
      let para = document.createElement('p');
      para.textContent = `${i}`;
      cartella.appendChild(para);
    }
  }
}



/*function assignDec (n) {
  if (n >= 1 && n <= 9) return 'c0';
  else if (n >= 10 && n <= 19) return 'c1';
  else if (n >= 20 && n <= 29) return 'c2';
  else if (n >= 30 && n <= 39) return 'c3';
  else if (n >= 40 && n <= 49) return 'c4';
  else if (n >= 50 && n <= 59) return 'c5';
  else if (n >= 60 && n <= 69) return 'c6';
  else if (n >= 70 && n <= 79) return 'c7';
  else if (n >= 80 && n <= 90) return 'c8';
}*/

// create 90 random numbers and obj { dec:[0,1,2] } and save it to global bindings board

// create 90 random numbers and obj { dec:[0,1,2] } and save it to global bindings Board
var unpulledNumbers = [], unvalidNumbers = [];

let randomBoard = function() {
  unpulledNumbers = createArray(1,90);
  for (let blankCard of board) {
    unpulledNumbers = unpulledNumbers.concat(unvalidNumbers);
    let count = 0;
    while (count < 15 && unpulledNumbers.length > 0) {
      var n = randomN(unpulledNumbers);
      var dec = assignDec(n);
      if (blankCard[dec].length < 3) {
        blankCard[dec].push(n);
        unpulledNumbers.splice(unpulledNumbers.indexOf(n),1);
        count++;
      } else {
        unvalidNumbers.push(n);
        unpulledNumbers.splice(unpulledNumbers.indexOf(n),1);
      }}}
  unvalidNumbers = [];
}


function randomBoardToHtml (e) {

  let ref;
  if (e.target === newGameBtn) {
    ref = '#cardPlayer';
  } else if (e.target === newCardAiBtn) {
    ref = '#cardAi';
  }
// se su html ci sono gia numeri li cancella
  function clearBoard() {
    for (let cart = 1; cart <= 6; cart++){
      for (let row = 0; row < 3; row++){
        for (let column = 0; column < 9; column++) {
          let string = `${ref} .cartella${cart} .r${row} .c${column}`;
          document.querySelector(string).textContent = '';
        }
      }
    }
  }
  clearBoard();

  randomBoard();


  // create littleCard.row as a Map object and sort board into littleCard.row
  for (let obj of board) {
    obj.row0 = new Map();
    obj.row1 = new Map();
    obj.row2 = new Map();

    for (let c in obj) {
      if (Object.getPrototypeOf(obj[c]) === Array.prototype && obj[c].length == 3) {
        obj.row0.set(c, obj[c][0]);
        obj.row1.set(c, obj[c][1]);
        obj.row2.set(c, obj[c][2]);
      }
    }
    for (let c in obj) {
      if (Object.getPrototypeOf(obj[c]) === Array.prototype && obj[c].length == 2) {
        for (let i = 0; i < obj[c].length; i++){
          let n = obj[c][i];
          let rows = [];
          if (obj.row0.size <5) {rows = rows.concat(['row0'])};
          if (obj.row1.size <5) {rows = rows.concat(['row1'])};
          if (obj.row2.size <5) {rows = rows.concat(['row2'])};
          let row = randomN(rows);
          while (obj[row].has(c)) {
            row = randomN(rows)
          }
          obj[row].set(c,n);
        }
      }
    }
    for (let c in obj) {
      if (Object.getPrototypeOf(obj[c]) === Array.prototype && obj[c].length == 1) {
        let n = obj[c][0];
        let rows = [];
        if (obj.row0.size <5) {rows = rows.concat(['row0'])};
        if (obj.row1.size <5) {rows = rows.concat(['row1'])};
        if (obj.row2.size <5) {rows = rows.concat(['row2'])};
        let row = randomN(rows);
        while (obj[row].has(c)) {
          row = randomN(rows)
        }
        obj[row].set(c,n);
      }
    }
  }
  // link littleCard.row to HTML
  let cartN = 0;
  for (let obj of board) {
    cartN++;
    let rows = ['row0','row1','row2'];
    let rowN = -1;
    for (let r of rows) {
      rowN++;
      let iter = obj[r].keys();
      let c = iter.next().value;
      while (c != undefined) {
        let n = obj[r].get(c);
        let string = `${ref} .cartella${cartN} .r${rowN} .${c}`;
        document.querySelector(string).textContent = n;
        c = iter.next().value;
      }
    }
  }

// azzera tutte le proprieta di board
 for (let obj of board) {
    for (let prop in obj) {
      if (Object.getPrototypeOf(obj[prop]) === Array.prototype) {
        obj[prop] = [];
      }
      if (Object.getPrototypeOf(obj[prop]) === Map.prototype) {
        obj[prop].clear();
      }
    }
  }
}
let numberPool = [];
const smorfia = {
   1: `L'ITALIA`,  2: `'A PICCERELLA`, 3: `'A JATTA`, 4: `'O PUORCO`, 5: `'A MANO`, 6: `CHELLA CA GARDA 'NTERRA`, 7: `'O VASO`, 8: `'A MARONNA`, 9: `'A FIGLIATA`,
  10: `'E FASULE`, 11: `'E SURICILLE`, 12: `'O SURDATE`, 13: `SANT'ANTONIO`, 14: `'MBRIACO`, 15: `'O GUAGLIONE`, 16: `'O CULO`, 17: `'A DISGRAZZIA`, 18: `'O SANGHE`, 19: `'A RESATA`,
  20: `'A FESTA`, 21: `'A FEMMENA ANNURA`, 22: `'O PAZZO`, 23: `'O SCEMO`, 24: `'E GGUARDIE`, 25: `NATALE`, 26: `NANNINELLA`, 27: `'O CANTERO`, 28: `'E ZZIZZE`, 29: `'O PATE D'E CCRIATURE`,
  30: `'E PPALLE D'O TENENTE`, 31: `'O PADRONE 'E CASA`, 32: `'O CAPITONE`, 33: `LL'ANNE 'E CRISTO`, 34: `'A CAPA`, 35: `L'AUCELLUZZ`, 36: `'E CASTAGNELLE`, 37: `'O MONACO`, 38: `'E MMAZZATE`, 39: `'A FUNA N'GANNA`,
  40: `'A PAPOSCIA`, 41: `'O CURTIELLO`, 42: `O' CAFE'`, 43: `'ONNA PARETA FORE 'O BARCONE`, 44: `MIAAAAAAOOOO`, 45: `'O VINO BBUONO`, 46: `'E DENARE`, 47: `'O MUORTO`, 48: `'O MUORTO CHE PPARLA`, 49: `'O PIEZZO 'E CARNE`,
  50: `'O PPANE`, 51: `'O CIARDINO`, 52: `'A MADRE`, 53: `'O VIECCHIO`, 54: `'O CAPPIELLO`, 55: `'A MUSECA`, 56: `'A CARUTA`, 57: `'O SCARTELLATO`, 58: `'O PACCOTTO`, 59: `'E PILE`,
  60: `SE LAMENTA`, 61: `'O CACCIATORE`, 62: `'O MUORTO ACCISO`, 63: `'A SPOSA`, 64: `'A SCIAMMERIA`, 65: `'O CHIANTO`, 66: `'E DDOIE ZETELLE`, 67: `'O TOTARO INT'A CHITARRA`, 68: `'A ZUPPA COTTA`, 69: `SOTT'E 'NCOPPA`,
  70: `'O PALAZZO`, 71: `L'OMMO 'E MMERDA`, 72: `'A MARAVIGLIA`, 73: `'O SPITALE`, 74: `'A ROTTA`, 75: `PULCINELLA`, 76: `'A FUNTANA`, 77: `'E RRRIAVULE`, 78: `'A BBELLA FIGLIOLA`, 79: `'O MARIUOLO`,
  80: `'A VOCCA`, 81: `'E SCIURE`, 82: `'A TAVULA 'MBANDITA`, 83: `'O MALETIEMPO`, 84: `'A CCHIESA`, 85: `'LL ANEME 'O PRIATORIO`, 86: `'A PUTECA`, 87: `'E PERUCCHIE`, 88: `'E CASECAVALLE`, 89: `'A VECCHIA`, 90: `'A PAURA`
}
function newNumberPool() {numberPool = createArray(1,90)};

function pullNumber () {

  if (numberPool.length < 1) {lastNumber.output = 'ULTIMO NUMERO!!!'}

  lastNumber.value = randomN(numberPool);
  lastNumber.count++;
  document.getElementById('pulled').textContent = lastNumber.count;
  numberPool.splice(numberPool.indexOf(lastNumber.value), 1);
  document.getElementById('remanining').textContent = numberPool.length;
  displayLastNumber.textContent = lastNumber.value;
  if (lastNumber.history.length < 5) {lastNumber.history.unshift(lastNumber.value);
  } else {
    lastNumber.history.pop();
    lastNumber.history.unshift(lastNumber.value);
  }
  lastNumber.output = smorfia[lastNumber.value];
  document.getElementById('output').textContent = lastNumber.output;
  for (let n of lastNumber.history) {
    let i = lastNumber.history.indexOf(n) + 1;
    numberList[i].textContent = n;
  }
}

function changeText () {
  let strings = ['TIRALOOOO', 'RAZZOLAAA']
  pullNumberBtn.textContent = randomN(strings);
}
newGameBtn.onclick = randomBoardToHtml;
newCardAiBtn.onclick = randomBoardToHtml;
pullNumberBtn.addEventListener ('click', pullNumber);
pullNumberBtn.addEventListener ('click', changeText);

newNumberPool();
console.log(numberPool);
