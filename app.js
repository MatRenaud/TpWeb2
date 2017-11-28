//Selection menu déroulant (Couleurs de la tasses)
var selectOutColor = document.getElementById('outsidecolor');
var selectInColor = document.getElementById('insidecolor');

//Initialisation des variables nb de Cup et layer de café
var layerCounter = 6;
var cupCount = 0;

//Selection des Boutons
var allButtons = document.getElementsByClassName('buttons');
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
  disableButtons();
}

function disableButtons() {
  for (var i=1; i < allButtons.length; i++) {
    allButtons[i].disabled = true;
  }
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
    for (var k=1; k < allButtons.length; k++) {
      allButtons[k].disabled = false;
    }
    btnEmptyCup.disabled = true;
    btnTakeSip.disabled = true;
    btnCreate.disabled = true;
    btnDroitier.disabled = true;
    cupDiv.style.visibility = 'visible';
  } else {
    alert("Vous avez déjà une tasse");
  }
}

function cupCounter() {
  cupCount++;
  cupNumber.textContent = cupCount;
}

function fillCup() {
  while (layerCounter < 7 && layerCounter >= 0) {
    addCoffee();
  }
  if (layerCounter == -1) {
    btnFillCup.disabled = true;
    btnEmptyCup.disabled = false;
    btnAddLayer.disabled = true;
    btnTakeSip.disabled = false;
  }
}

function takeSip() {
  if (layerCounter < 5) {
    coffeeLayers[layerCounter+1].style.backgroundColor = selectInColor.value;
    layerCounter++;
    btnFillCup.disabled = false;
    btnAddLayer.disabled = false;
  } else if (layerCounter == 5) {
    coffeeLayers[layerCounter+1].style.backgroundColor = selectInColor.value;
    layerCounter++;
    btnTakeSip.disabled = true;
    btnEmptyCup.disabled = true;
  }
}

function emptyCup() {
  while (layerCounter < 6) {
    takeSip();
  }
  if (layerCounter == 6) {
    btnEmptyCup.disabled = true;
    btnFillCup.disabled = false;
    btnTakeSip.disabled = true;
  }
}

var cost = 0.00;
function addCoffee() {
  if (layerCounter > 0) {
    coffeeLayers[layerCounter].style.backgroundColor = "#1C0702";
    layerCounter--;
    cost = cost + parseFloat(0.75);
    price.textContent = parseFloat(cost).toFixed(2);
    btnTakeSip.disabled = false;
    btnEmptyCup.disabled = false;
  } else if (layerCounter == 0) {
    coffeeLayers[layerCounter].style.backgroundColor = "#1C0702";
    layerCounter--;
    cost = cost + 0.75;
    price.textContent = cost;
    btnAddLayer.disabled = true;
    btnFillCup.disabled = true;
  }
}

function destroyCup() {
  cupDiv.style.visibility = '';
  cost = 0.00;
  price.textContent = cost;
  disableButtons();
  btnCreate.disabled = false;
}

function switchSide() {
  for (var i=0; i < leftHandle.length; i++) {
    if (event.target.id == 'gaucher') {
      leftHandle[i].style.visibility = "visible";
      rightHandle[i].style.visibility = "hidden";
      btnDroitier.disabled = false;
      btnGaucher.disabled = true;;
    } else {
      rightHandle[i].style.visibility = '';
      leftHandle[i].style.visibility = '';
      btnGaucher.disabled = false;
      btnDroitier.disabled = true;
    }
  }
}

//Set Clock
var secHand = document.getElementById('second-hand')
var minHand = document.getElementById('min-hand')
var hourHand = document.getElementById('hour-hand');

function setDate() {
  var now = new Date();
  var sec = now.getSeconds();
  var min = now.getMinutes();
  var hour = now.getHours();
  if (sec < 11) {
    secHand.textContent = '0' + sec;
  } else {
    secHand.textContent = sec;
  }
  minHand.textContent = min;
  hourHand.textContent = hour;
}

setInterval(setDate, 1000);