//Selection menu déroulant (Couleurs de la tasses)
var selectOutColor = document.getElementById('outsidecolor');
var selectInColor = document.getElementById('insidecolor');

//Selection des Boutons
var btnCreate = document.getElementById('create');
var btnFillCup = document.getElementById('fill');
var btnTakeSip = document.getElementById('sip');
var btnAddLayer = document.getElementById('add');
var btnEmptyCup = document.getElementById('empty');
var btnDestroy = document.getElementById('destroy');
var btnGaucher = document.getElementById('gaucher');
var btnDroitier = document.getElementById('droitier');


//Selection du DOM
var mainTable = document.getElementById('main-table')
var cupDiv = document.getElementById('cup');
var outsideCup = document.getElementsByClassName('cupoutside');
var coffeeLayers = document.getElementsByClassName('tabledatas');
var cupNumber = document.getElementById('cupNumber');
var price = document.getElementById('price');
var leftHandle = document.getElementsByClassName('left-handle');
var rightHandle = document.getElementsByClassName('right-handle');

function init() {
  btnCreate.addEventListener('click', createCup);
  btnFillCup.addEventListener('click', fillCup);
  btnTakeSip.addEventListener('click', takeSip);
  btnAddLayer.addEventListener('click', addCoffee);
  btnEmptyCup.addEventListener('click', emptyCup);
  btnDestroy.addEventListener('click', destroyCup);
  btnGaucher.addEventListener('click', switchSide);
  btnDroitier.addEventListener('click', switchSide);
}

function createCup() {
  if (cupDiv.style.visibility == '') {
    cupCounter();
    for (var i=0; i < outsideCup.length; i++) {
      outsideCup[i].style.backgroundColor = selectOutColor.value;
    }
    for (var j=0; j < coffeeLayers.length; j++) {
      coffeeLayers[j].style.backgroundColor = selectInColor.value;
    }
    cupDiv.style.visibility = 'visible';
  } else {
    alert("Vous avez déjà une tasse");
  }
}

var cupCount = 0;
function cupCounter() {
  cupCount++;
  cupNumber.textContent = cupCount;
}

function fillCup() {
  while (layerCounter < 7 && layerCounter >= 0) {
    addCoffee();
  }
}

function takeSip() {
  if (layerCounter < 6) {
    coffeeLayers[layerCounter+1].style.backgroundColor = selectInColor.value;
    layerCounter++;
  } else {
    alert("La tasse est vide");
  }
}

function emptyCup() {
  while (layerCounter < 6) {
    takeSip();
  }
}

var layerCounter = 6;
var cost = 0.00;
function addCoffee() {
  if (layerCounter >= 0) {
    coffeeLayers[layerCounter].style.backgroundColor = "#1C0702";
    layerCounter--;
    cost = cost + 0.75;
    price.textContent = cost;
  } else {
    alert("Vous ne pouvez pas faire déborder la tasse. L’action d’ajout est annulée")
  }
}

function destroyCup() {
  cupDiv.style.visibility = '';
  cost = 0.00;
  price.textContent = cost;
}

function switchSide() {
  for (var i=0; i < leftHandle.length; i++) {
    if (event.target.id == 'gaucher') {
      leftHandle[i].style.visibility = "visible";
      rightHandle[i].style.visibility = "hidden";
    } else {
      rightHandle[i].style.visibility = '';
      leftHandle[i].style.visibility = '';
    }
  }
}