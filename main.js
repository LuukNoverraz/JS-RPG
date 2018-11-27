var player1Name = prompt("Player 1: select a name");
var player2Name = prompt("Player 2: select a name");
var player1Turn = true;
var player2Turn = true;
var dark = false;
var healing = true;
var intHp = 100;
var intMaxDamage = 30;
document.getElementById("p1").innerHTML = player1Name;
document.getElementById("p2").innerHTML = player2Name;
function hover(element) {
  if (dark == false) {
    element.setAttribute('src', 'images/moon-32-hover.png');
  }
  else {
    element.setAttribute('src', 'images/sun-32-hover.png');
  }
}
function unhover(element) {
  if (dark == false) {
    element.setAttribute('src', 'images/moon-32.png');
  }
  else {
      element.setAttribute('src', 'images/sun-32.png');
  }
}
function darkTheme() {
  if (dark == true) {
    dark = false
    //Terug naar light theme
    document.getElementById("darkTheme").src = "images/moon-32.png";
    document.getElementById("css").href = "style/style.css";
    document.getElementById("github").src = "images/github-icon.png"
  }
  else if (dark == false) {
    dark = true;
    //Veranderen naar dark theme
    document.getElementById("darkTheme").src = "images/sun-32.png";
    document.getElementById("css").href = "style/darkstyle.css";
    document.getElementById("github").src = "images/github-icon-dark.png"
  }
}
function changeHpValue() {
  var hpValuePrompt = prompt("Enter new amount of HP");
  intHp = Number(hpValuePrompt);
  if (intHp < 10) {
    alert("You can not set the hp value under 10.");
  }
  else if (intHp > 200) {
    alert("Setting the HP that high is a bit excessive, is it not?")
  }
  else if (isNaN(intHp) == false) {
    document.getElementById("hpValue").innerHTML = "HP: " + intHp;
    document.getElementById("player1Hp").innerHTML = intHp;
    document.getElementById("player2Hp").innerHTML = intHp;
  }
  else {
    alert("Please only choose a number.");
  }
}
function changeMaxDamageValue() {
  var maxDamageValuePrompt = prompt("Enter new amount of maximum damage per attack");
  intMaxDamage = Number(maxDamageValuePrompt);
  if (intMaxDamage < 2) {
    alert("You can not set the maximum damage value under 2.");
  }
  else if (intHp - intMaxDamage < 0) {
    alert("You can not set the maximum damage value above the HP value.")
  }
  else if (isNaN(intMaxDamage) == false) {
    document.getElementById("maxDamageValue").innerHTML = "Maximum damage per attack: " + intMaxDamage;
  }
  else {
    alert("Please only choose a number.");
  }
}
function changeHealingOnOff() {
  if (healing) {
    document.getElementById("healingValue").innerHTML = "Healing is off ";
    document.getElementById("healingButton").innerHTML = "Enable";
    healing = false;
  }
  else {
    document.getElementById("healingValue").innerHTML = "Healing is on ";
    document.getElementById("healingButton").innerHTML = "Disable";
    healing = true;
  }
}
function gameStart() {
  document.getElementById("start").outerHTML = "";
  document.getElementById("changeButton").outerHTML = "";
  document.getElementById("changeButton2").outerHTML = "";
  document.getElementById("healingButton").outerHTML = "";
  document.getElementById("pickFirst").innerHTML = "Choosing player that gets to attack first randomly...";
  setTimeout(function(){
    randomFirstPlayer = Math.floor((Math.random() * 2) + 1);
    console.log(randomFirstPlayer);
    if (randomFirstPlayer == 1) {
      document.getElementById("pickFirst").innerHTML = "Result: " + player1Name + " (Player 1) chooses first";
      document.getElementById("inputBar").style.opacity = 1.0;
    }
    else if (randomFirstPlayer == 2) {
      document.getElementById("pickFirst").innerHTML = "Result: " + player2Name + " (Player 2) chooses first";
      document.getElementById("inputBar").style.opacity = 1.0;
    }
  }, 2000);

}
function useAttack() {
  var attackValue = document.getElementById("attackName").value;
  var damageValue = document.getElementById("damageAmount").value;
  var intDamageValue = Number(damageValue);
  if (isNaN(intDamageValue) == false && intDamageValue > 0 && intDamageValue <= intMaxDamage) {
    if (randomFirstPlayer == 1 && player1Turn == true) {
      player1Turn = false;
      player2Turn = true;
      document.getElementById("attackButton").style.opacity = 0.0;
      document.getElementById("attackP").innerHTML = player1Name + " used " + attackValue + " and dealt " + damageValue + " damage.";
      document.getElementById("player2Hp").innerHTML = Number(document.getElementById("player2Hp").innerHTML) - damageValue;
      document.getElementById("nextTurn").style.opacity = 1.0;
      document.getElementById("nextButton").style.opacity = 1.0;
      console.log(document.getElementById("player2Hp"))
      randomFirstPlayer = 2;
    }
    else if (randomFirstPlayer == 2 && player2Turn == true) {
      player2Turn = false;
      player1Turn = true;
      document.getElementById("attackButton").style.opacity = 0.0;
      document.getElementById("attackP").innerHTML = player2Name + " used " + attackValue + " and dealt " + damageValue + " damage.";
      document.getElementById("player1Hp").innerHTML = Number(document.getElementById("player1Hp").innerHTML) - damageValue;
      document.getElementById("nextTurn").style.opacity = 1.0;
      document.getElementById("nextButton").style.opacity = 1.0;
      console.log(document.getElementById("player1Hp"))
      randomFirstPlayer = 1;
    }
  }
  else {
    alert("You can only use whole positive numbers in your amount of damage or you have exceeded your max damage limit.");
  }
}
function turnDone() {
  if (Number(document.getElementById("player1Hp").innerHTML) <= 0 || Number(document.getElementById("player2Hp").innerHTML) <= 0) {
    alert("Gij bent dood.");
  }
  else if (randomFirstPlayer == 1) {
    document.getElementById("pickFirst").innerHTML = player1Name + " goes next!";
    document.getElementById("attackP").innerHTML = "";
    document.getElementById("attackName").value = "sample text";
    document.getElementById("damageAmount").value = "10";
    document.getElementById("nextButton").style.opacity = 0.0;
    document.getElementById("attackButton").style.opacity = 1.0;
    document.getElementById("pickFirst").style.opacity = 1.0;
  }
  else if (randomFirstPlayer == 2) {
    document.getElementById("pickFirst").innerHTML = player2Name + " goes next!";
    document.getElementById("attackP").innerHTML = "";
    document.getElementById("attackName").value = "sample text";
    document.getElementById("damageAmount").value = "10";
    document.getElementById("nextButton").style.opacity = 0.0;
    document.getElementById("attackButton").style.opacity = 1.0;
    document.getElementById("pickFirst").style.opacity = 1.0;
  }
}
