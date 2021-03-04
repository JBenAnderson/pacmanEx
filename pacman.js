// // pos is the PacMan image position variable- it is set to 0 initially
// var pos = 0;
// //pageWidth is the width of the webpage. This is later used to calculate when Pac-Man needs to turn around.
// let pageWidth = window.innerWidth;
// //This array contains all the PacMan movement images
// const pacArray = [
//   ["./images/PacMan1.png", "./images/PacMan2.png"],
//   ["./images/PacMan3.png", "./images/PacMan4.png"],
// ];

// // this variable defines what direction should PacMan go into:
// // 0 = left to right
// // 1 = right to left (reverse)
// var direction = 0;

// // This variable helps determine which PacMan image should be displayed. It flips between values 0 and 1
// var focus = 0;

// // This function is called on mouse click. Every time it is called, it updates the PacMan image, position and direction on the screen.
// function Run() {
//   const img = document.getElementById("PacMan");
//   const imgWidth = img.width;
//   focus = (focus + 1) % 2;
//   direction = checkPageBounds(direction, imgWidth, pos, null);
//   img.src = pacArray[direction][focus];
//   if (direction) {
//     pos -= 20;
//     img.style.left = pos + "px";
//   } else {
//     pos += 20;
//     img.style.left = pos + "px";
//   }
// }
// setInterval(Run, 0200, pos, pageWidth);
// // TODO: Add a setInterval call to run every 200 milliseconds. Note: in the video, Dr. Williams uses setTimeout, but here we are going to use a slightly different
// //function call of setInterval, so that you can have practice using this function call. This will also have us add a couple of extra arguments, pos (position), which was declared
// //on line 2, and pageWidth, which is declared on line 4.

// // This function determines the direction of PacMan based on screen edge detection.
// function checkPageBounds(direction, imgWidth, pos, pageWidth) {
//   // TODO: Complete this to reverse direction upon hitting screen edge
//   pageWidth = window.innerWidth - imgWidth;

//   if (pos < 0 && direction == 1) {
//     direction = 0;
//   } else if (pos < 0 && direction == 0) {
//     direction = 1;
//   } else if (pos >= pageWidth && direction == 0) {
//     direction = 1;
//   } else if (pos >= pageWidth && direction == 1) {
//     direction = 0;
//   }

//   return direction;
// }

let pos = 0;
const pacArray = [
  ["./images/PacMan1.png", "./images/PacMan2.png"],
  ["./images/PacMan3.png", "./images/PacMan4.png"],
];
let direction = 0;
const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);

  // Add image to div id = game
  let game = document.getElementById("game");
  let newimg = document.createElement("img");
  newimg.style.position = "absolute";
  newimg.src = pacArray;

  //Old image source shows only one PacMan png file
  //newimg.src = 'PacMan1.png';
  newimg.width = 100;

  // TODO: set position here
  newimg.style.left = position.x;
  newimg.style.top = position.y;
  // TODO add new Child image to game
  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    newimg,
  };
}

function update() {
  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  });
  setTimeout(update, 20);
}

function checkCollisions(item) {
  // TODO: detect collision with all walls and make pacman bounce
  if (
    item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
    item.position.x + item.velocity.x < 0
  ) {
    item.velocity.x = -item.velocity.x;
  } else if (
    item.position.y + item.velocity.y + item.newimg.height >
      window.innerHeight ||
    item.position.y + item.velocity.y < 0
  ) {
    item.velocity.y = -item.velocity.y;
  }
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}
