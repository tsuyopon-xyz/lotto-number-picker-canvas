"use strict";

(() => {
  // Set how many numbers to use.
  const no_of_num = 40;

  // Set y-axis of each numbers on the image.
  const num_y_axis = [];

  // This boolean decides weather the app is stopped or not.
  let isPaused = false;

  // Set how fast the image changes. Smaller number means faster.
  const speed = [30, 10, 100, 1000, 20, 200];

  // Set the image paths.
  const image_path1 = "images/numbers1.png";
  const image_path2 = "images/numbers2.png";
  const image_path3 = "images/numbers3.png";
  const image_path4 = "images/numbers4.png";
  const image_path5 = "images/numbers5.png";
  const image_path6 = "images/numbers6.png";

  // Set the current indexes.
  let currentIndex1 = 0;
  let currentIndex2 = 0;
  let currentIndex3 = 0;
  let currentIndex4 = 0;
  let currentIndex5 = 0;
  let currentIndex6 = 0;

  // Create array for y-axis of the image.
  function createArray() {
    let y = 40;
    for (let i = 0; i < no_of_num; i++) {
      if (num_y_axis.length) {
        y += 94.5;
        num_y_axis.push(y);
      } else {
        num_y_axis.push(y);
      }
    }
  }
  // Get element by id.
  const numberCanvas1 = document.getElementById("number1");
  const numberCanvas2 = document.getElementById("number2");
  const numberCanvas3 = document.getElementById("number3");
  const numberCanvas4 = document.getElementById("number4");
  const numberCanvas5 = document.getElementById("number5");
  const numberCanvas6 = document.getElementById("number6");
  const stopButton = document.getElementById("stop_button");
  const restartButton = document.getElementById("restart_button");

  // Get context for the canvases.
  const numberContext1 = numberCanvas1.getContext("2d");
  const numberContext2 = numberCanvas2.getContext("2d");
  const numberContext3 = numberCanvas3.getContext("2d");
  const numberContext4 = numberCanvas4.getContext("2d");
  const numberContext5 = numberCanvas5.getContext("2d");
  const numberContext6 = numberCanvas6.getContext("2d");

  // Create new Image objects.
  const imageObj1 = new Image();
  const imageObj2 = new Image();
  const imageObj3 = new Image();
  const imageObj4 = new Image();
  const imageObj5 = new Image();
  const imageObj6 = new Image();

  // Set src for image objects.
  imageObj1.src = image_path1;
  imageObj2.src = image_path2;
  imageObj3.src = image_path3;
  imageObj4.src = image_path4;
  imageObj5.src = image_path5;
  imageObj6.src = image_path6;

  // Main function for this app.
  function main() {
    currentIndex1 = 0;
    currentIndex2 = 0;
    currentIndex3 = 0;
    currentIndex4 = 0;
    currentIndex5 = 0;
    currentIndex6 = 0;

    restartButton.addEventListener("click", () => {
      window.location.reload();
    });

    imageObj1.onload = () => {
      function loop1() {
        if (!isPaused) {
          draw(numberCanvas1, numberContext1, imageObj1, currentIndex1);
          setTimeout(loop1, 1000 / speed[0]);
          if (currentIndex1 < 40) {
            currentIndex1++;
          } else {
            currentIndex1 = 0;
          }
        }
      }
      function loop2() {
        if (!isPaused) {
          draw(numberCanvas2, numberContext2, imageObj2, currentIndex2);
          setTimeout(loop2, 1000 / speed[1]);
          if (currentIndex2 < 40) {
            // currentIndex = 10;
            currentIndex2++;
          } else {
            currentIndex2 = 0;
          }
        }
      }
      function loop3() {
        if (!isPaused) {
          draw(numberCanvas3, numberContext3, imageObj3, currentIndex3);
          setTimeout(loop3, 1000 / speed[2]);
          if (currentIndex3 < 40) {
            currentIndex3++;
          } else {
            currentIndex3 = 0;
          }
        }
      }
      function loop4() {
        if (!isPaused) {
          draw(numberCanvas4, numberContext4, imageObj4, currentIndex4);
          setTimeout(loop4, 1000 / speed[3]);
          if (currentIndex4 < 40) {
            currentIndex4++;
          } else {
            currentIndex4 = 0;
          }
        }
      }
      function loop5() {
        if (!isPaused) {
          draw(numberCanvas5, numberContext5, imageObj5, currentIndex5);
          setTimeout(loop5, 1000 / speed[4]);
          if (currentIndex5 < 40) {
            currentIndex5++;
          } else {
            currentIndex5 = 0;
          }
        }
      }
      function loop6() {
        if (!isPaused) {
          draw(numberCanvas6, numberContext6, imageObj6, currentIndex6);
          setTimeout(loop6, 1000 / speed[5]);
          if (currentIndex6 < 40) {
            currentIndex6++;
          } else {
            currentIndex6 = 0;
          }
        }
      }
      stopButton.addEventListener("click", () => {
        isPaused = true;
      });

      createArray();
      loop1();
      loop2();
      loop3();
      loop4();
      loop5();
      loop6();
    };
  }

  // Function for drawing the image on a canvas.
  function draw(canvas, context, imageObject, index) {
    const sx = 20;
    const sy = num_y_axis[index];

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(
      imageObject,
      sx,
      sy,
      80,
      80,
      0,
      0,
      canvas.width,
      canvas.height
    );
  }
  main();
})();
