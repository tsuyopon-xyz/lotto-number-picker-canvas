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

  // Get element by id.
  const canvasList = [
    document.getElementById("number1"),
    document.getElementById("number2"),
    document.getElementById("number3"),
    document.getElementById("number4"),
    document.getElementById("number5"),
    document.getElementById("number6")
  ];

  const stopButton = document.getElementById("stop_button");
  const restartButton = document.getElementById("restart_button");

  // 共通処理をループで行えるようにcanvas毎の設定値を配列に同じデータ構造で格納
  const canvasConfigList = canvasList.map((canvas, index) => {
    return {
      currentFrame: 0,
      speed: SPEED[index],
      canvas, // 変数名とプロパティ名が一緒なら値は省略できる({canvas: canvas}と同じ)
      context: canvas.getContext("2d")
    };
  });

  // Create new Image objects.
  const imageObj = new Image();

  // Set src for image objects.
  imageObj.src = IMAGE_PATH;

  // Main function for this app.
  function main() {
    restartButton.addEventListener("click", () => {
      window.location.reload();
    });
    stopButton.addEventListener("click", () => {
      if(!isPaused) {
        fixDuplication();
        isPaused = true;
      }
    });

    imageObj.onload = () => {
      canvasConfigList.forEach(canvasConfig => {
        /**
         * 以下の3行を1行に書いた形式
         *
         * const speed = canvasConfig.speed;
         * const canvas = canvasConfig.canvas;
         * const context = canvasConfig.context;
         */
        const {canvas, context, speed} = canvasConfig;

        // setIntervalを使うと、setTimeoutのループを簡単に行える
        // https://developer.mozilla.org/ja/docs/Web/API/Window/setInterval
        setInterval(() => {
          if (!isPaused) {
            canvasConfig.currentFrame++;
            draw(canvas, context, canvasConfig.currentFrame);
          }
        }, ONE_SECOND / speed);
      });
    };
  }

  // Function for drawing the image on each canvas repeatedly.
  // function draw(canvas, context, imageObject, speed) {
  function draw(canvas, context, currentFrame) {
    // currentFrame === 39のとき : 39 % 40 → 39 (インデックス番号39)
    // currentFrame === 40のとき : 40 % 40 → 0 (インデックス番号0)
    // currentFrame === 41のとき : 40 % 40 → 1 (インデックス番号1)
    const indexOfImage = currentFrame % NO_OF_NUM;

    const sx = 20;
    const sy = 40 + 94.5 * indexOfImage; // 40 is where the first number of y-axis is and if you add 94.5 the image will jump to the next number.
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(
      imageObj,
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

  function fixDuplication() {
    // currentFrameをinde0~39のインデックス番号に変換した配列を生成
    const currentIndexes = canvasConfigList.map(canvasConfig => {
      return canvasConfig.currentFrame % NO_OF_NUM;
    });

    const uniqueIndexes = [];
    currentIndexes.forEach(index => {
      let uniqueIndex = index;
      while(uniqueIndexes.indexOf(uniqueIndex) !== -1) {
        // 1 ~ 40の数字を出す
        //
        // - Math.random() * NO_OF_NUMで0 < x < 40の実数(小数)
        // - Math.floorで小数点以下を切り捨て (0 < x < 39)
        // - プラス1を加えて1~40が出るようにする (0 < x + 1 < 39 → 1 < x < 40 )
        uniqueIndex = Math.floor( (Math.random() * NO_OF_NUM) ) + 1;
      }
      uniqueIndexes.push(uniqueIndex);
    });

    canvasConfigList.forEach((canvasConfig, index) => {
      const {canvas, context} = canvasConfig;
      const uniqueIndex = uniqueIndexes[index];
      draw(canvas, context, uniqueIndex);
    });
  }
  main();
})();
