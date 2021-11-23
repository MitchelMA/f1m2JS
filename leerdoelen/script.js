document.documentElement.addEventListener("click", myMouseEvent);
document.documentElement.addEventListener("keyup", myKeyboardEvent);
var myHeading = document.getElementById("btn");
let myNum = 13;
let myStr = "String";
let myB = true;

console.log(typeof myNum);
console.log(typeof myStr);
console.log(typeof myB);
console.log(typeof document);

// for loop van 0 tot en met 9;
for (let i = 0; i < 10; i++) {
  console.log(i);
}

let myArr = ["A", "B", "C"];
console.log(myArr, myArr.length);
myArr.push("D");
console.log(myArr, myArr.length);
myArr.splice(-1, 1);
console.log(myArr, myArr.length);

var myObject = new Object();
myObject.x = 10;
myObject.y = 9;
console.table(myObject);

function myMouseEvent(e) {
  // log event
  console.log("Er is op de documentElement geklikt: ");
  console.log(e);
}

function myKeyboardEvent(e) {
  // log  event
  console.log("Er is op een toets gedrukt: ");
  console.log(e);
  // waarde van een variabele checken
  if (e.code === "Space" || e.keyCode == 32 || e.which == 32) {
    console.log("Spatie ingedrukt");
    // debug to show I can debug with the console
    debugger;
  }
}

function addpara(elem) {
  // log the string value of the element (button);
  console.log(elem.textContent);
  // create new paragraph
  let newP = document.createElement("p");
  // set textcontent of paragraph
  newP.textContent = "Dit is een nieuwe paragraaf";
  // append paragraph to body
  document.body.appendChild(newP);

  // change the textcontent of the element
  elem.textContent = "Er is een paragraaf toegevoegd";
}
