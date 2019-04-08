"use strict";

(() => {
  // Set how many numbers to use.
  const NO_OF_NUM = 40;

  // This boolean decides weather the app is stopped or not.
  let isPaused = false;

  // Set how fast the image changes. Smaller number means faster.
  const SPEED = [10, 5, 10, 5, 10, 5];

  const ONE_SECOND = 1000;

  // Set the image paths.
  const IMAGE_PATH = "images/numbers.png";

  // Set index1 to index6 for when "stop" button pressed
  let index1 = 0;
  let index2 = 0;
  let index3 = 0;
  let index4 = 0;
  let index5 = 0;
  let index6 = 0;

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
  const imageObj = new Image();

  // Set src for image objects.
  imageObj.src = IMAGE_PATH;

  // Main function for this app.
  function main() {
    implementDraw();

    restartButton.addEventListener("click", () => {
      window.location.reload();
    });

    imageObj.onload = () => {
      stopButton.addEventListener("click", () => {
        // Set array for each index when "stop" button pressed.
        let indexes = [index1, index2, index3, index4, index5, index6]; // Check for duplicated numbers.

        fixDuplication(indexes);

        isPaused = true;
      });
    };
  }

  // Function for drawing the image on each canvas repeatedly.
  function draw(canvas, context, imageObject, speed) {
    let currentIndex = 0;
    function loop() {
      if (!isPaused) {
        const sx = 20;
        const sy = 40 + 94.5 * currentIndex; // 40 is where the first number of y-axis is and if you add 94.5 the image will jump to the next number.
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

        setTimeout(loop, ONE_SECOND / speed);

        if (currentIndex < NO_OF_NUM - 1) {
          currentIndex++;
        } else {
          currentIndex = 0;
        }

        // Get each index when stop button is pressed.
        if (canvas === numberCanvas1) {
          index1 = currentIndex;
        } else if (canvas === numberCanvas2) {
          index2 = currentIndex;
        } else if (canvas === numberCanvas3) {
          index3 = currentIndex;
        } else if (canvas === numberCanvas4) {
          index4 = currentIndex;
        } else if (canvas === numberCanvas5) {
          index5 = currentIndex;
        } else if (canvas === numberCanvas6) {
          index6 = currentIndex;
        }
      }
    }
    loop();
  }

  // This is the function to draw image in the canvas where a duplicated number is.
  function drawAgain(canvas, context, imageObject, index) {
    const sx = 20;
    const sy = 40 + 94.5 * index; // 40 is where the first number of y-axis is and if you add 94.5 the image will jump to the next number.
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

  function implementDraw() {
    draw(numberCanvas1, numberContext1, imageObj, SPEED[0]);
    draw(numberCanvas2, numberContext2, imageObj, SPEED[1]);
    draw(numberCanvas3, numberContext3, imageObj, SPEED[2]);
    draw(numberCanvas4, numberContext4, imageObj, SPEED[3]);
    draw(numberCanvas5, numberContext5, imageObj, SPEED[4]);
    draw(numberCanvas6, numberContext6, imageObj, SPEED[5]);
  }

  function fixDuplication(indexes) {
    let newIndexes = [];
    const max = NO_OF_NUM - 1;

    // Keep pushing random numbers until the indexes array has no more duplicated values.
    while (newIndexes.length < 7) {
      // Remove duplicated values.
      newIndexes = indexes.filter((x, i, self) => {
        return self.indexOf(x) === i;
      });
      indexes = newIndexes;

      // Push random numbers into the indexes array.
      indexes.push(Math.floor(Math.random() * Math.floor(max)));
    }

    // Draw images on canvas without any duplicated values.
    drawAgain(numberCanvas1, numberContext1, imageObj, indexes[0]);
    drawAgain(numberCanvas2, numberContext2, imageObj, indexes[1]);
    drawAgain(numberCanvas3, numberContext3, imageObj, indexes[2]);
    drawAgain(numberCanvas4, numberContext4, imageObj, indexes[3]);
    drawAgain(numberCanvas5, numberContext5, imageObj, indexes[4]);
    drawAgain(numberCanvas6, numberContext6, imageObj, indexes[5]);
  }

  main();
})();
