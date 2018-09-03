function createCanvas(width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function drawPoint(context, x, y) {
  context.fillRect(x, y, 1, 1);
}

// 将 value 从区间 start1 ~ stop1 映射到区间 start2 ~ stop2
function mapRange(value, start1, stop1, start2, stop2) {
  return start2 + (stop2 - start2) * (value - start1) / (stop1 - start1);
}

function getBarnsleyFernPoint(x0, y0) {
  let x, y;
  const factor = Math.random();

  if (factor < 0.01) { // 1%, 梗
    x = 0;
    y = 0.16 * y0;
  } else
  if (factor < 0.86) { // 85%, 连续的小叶
    x = 0.85 * x0 + 0.04 * y0;
    y = -0.04 * x0 + 0.85 * y0 + 1.6;
  } else
  if (factor < 0.93) { // 7%, 左大叶
    x = 0.2 * x0 - 0.26 * y0;
    y = 0.23 * x0 + 0.22 * y0 + 1.6;
  } else { // 7%, 右大叶
    x = -0.15 * x0 + 0.28 * y0;
    y = 0.26 * x0 + 0.24 * y0 + 0.44;
  }

  return { x, y };
}

const canvas = createCanvas(600, 600);
const context = canvas.getContext("2d");

document.addEventListener("DOMContentLoaded", () => {
  document.body.appendChild(canvas);

  context.fillStyle = "#f9f9f9";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "green";

  let point = { x: 0, y: 0 };

  setInterval(() => {
    let i = 0;
    while (i++ < 100) {
      point = getBarnsleyFernPoint(point.x, point.y);

      let pointX = mapRange(point.x, -2.182, 2.6558, 0, canvas.width);
      let pointY = mapRange(point.y, 0, 9.9983, canvas.height, 0);

      drawPoint(context, pointX, pointY);
    }
  }, 1);
});
