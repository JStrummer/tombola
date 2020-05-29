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
