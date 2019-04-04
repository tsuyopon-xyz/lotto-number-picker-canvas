"use strict";

(() => {
  // Set how many numbers to use.
  const NO_OF_NUM = 40;

  // This boolean decides weather the app is stopped or not.
  let isPaused = false;

  // Set how fast the image changes. Smaller number means faster.
  const SPEED = [30, 40, 10, 5, 200, 5];

  const ONE_SECOND = 1000;

  // Set the image paths.
  const IMAGE_PATH = "images/numbers1.png";

  // Set the current indexes.
  let currentIndex1 = 0;
  let currentIndex2 = 0;
  let currentIndex3 = 0;
  let currentIndex4 = 0;
  let currentIndex5 = 0;
  let currentIndex6 = 0;

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
    currentIndex1 = 0;
    currentIndex2 = 0;
    currentIndex3 = 0;
    currentIndex4 = 0;
    currentIndex5 = 0;
    currentIndex6 = 0;

    restartButton.addEventListener("click", () => {
      window.location.reload();
    });

    imageObj.onload = () => {
      draw(numberCanvas1, numberContext1, imageObj, currentIndex1, SPEED[0]);
      draw(numberCanvas2, numberContext2, imageObj, currentIndex2, SPEED[1]);
      draw(numberCanvas3, numberContext3, imageObj, currentIndex3, SPEED[2]);
      draw(numberCanvas4, numberContext4, imageObj, currentIndex4, SPEED[3]);
      draw(numberCanvas5, numberContext5, imageObj, currentIndex5, SPEED[4]);
      draw(numberCanvas6, numberContext6, imageObj, currentIndex6, SPEED[5]);

      stopButton.addEventListener("click", () => {
        // Set array for each index when "stop" button pressed.
        const indexes = [index1, index2, index3, index4, index5, index6];

        // Check for duplicated numbers.
        const duplicatedIndexes = indexes.filter((x, i, self) => {
          return self.indexOf(x) !== i;
        });
        console.log(duplicatedIndexes);
        if (duplicatedIndexes.length === 0) {
          isPaused = true;
        } else {
          fixDuplication(indexes, duplicatedIndexes);
          isPaused = true;
        }
      });
    };
  }

  // Function for drawing the image on each canvas repeatedly.
  function draw(canvas, context, imageObject, currentIndex, speed) {
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

  // Change a duplicated number to an other random number.
  function fixDuplication(indexes, duplicatedIndexes) {
    // Find out the index of duplicated number in indexes array.
    const num = indexes.indexOf(duplicatedIndexes[0]);

    // Declare max number for Math.floor function and new index.
    const max = NO_OF_NUM - 1;
    let newIndex;

    // Set a new index which does not duplicate with any other numbers on the canvases.
    while (newIndex === undefined || indexes[newIndex] >= 0) {
      newIndex = Math.floor(Math.random() * Math.floor(max));
    }

    // Draw image for the canvas where duplicated number is.
    if (num === 0) {
      drawAgain(numberCanvas1, numberContext1, imageObj, newIndex);
    } else if (num === 1) {
      drawAgain(numberCanvas2, numberContext2, imageObj, newIndex);
    } else if (num === 2) {
      drawAgain(numberCanvas3, numberContext3, imageObj, newIndex);
    } else if (num === 3) {
      drawAgain(numberCanvas4, numberContext4, imageObj, newIndex);
    } else if (num === 4) {
      drawAgain(numberCanvas5, numberContext5, imageObj, newIndex);
    } else if (num === 5) {
      drawAgain(numberCanvas6, numberContext6, imageObj, newIndex);
    }
  }

  main();
})();
