(async function () {
  const dataSource = "https://s5.ssl.qhres.com/static/b0695e2dd30daa64.json";
  const data = await (await fetch(dataSource)).json();
  const regions = d3
    .hierarchy(data)
    .sum((d) => 1)
    .sort((a, b) => b.value - a.value);
  const pack = d3.pack().size([1600, 1600]).padding(3);
  const root = pack(regions);

  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");

  function drawCircle(data) {
    context.fillStyle = "rgba(0, 0, 0, 0.2)";
    context.beginPath();
    context.arc(data.x, data.y, data.r, 0, 2 * Math.PI);
    context.fill();
    if (
      Object.prototype.hasOwnProperty.call(data, "children") &&
      data.children.length > 0
    ) {
      for (let i = 0; i < data.children.length; i++) {
        drawCircle(data.children[i]);
      }
    } else {
      context.fillStyle = "white";
      context.font = "1.5rem Arial";
      context.textAlign = "center";
      context.fillText(data.data.name, data.x, data.y);
    }
  }

  function drawCircle(data, current) {
    context.fillStyle =
      data === current ? "rgba(0, 181, 0, 0.1)" : "rgba(0, 0, 0, 0.2)";
    context.beginPath();
    context.arc(data.x, data.y, data.r, 0, 2 * Math.PI);
    context.fill();
    if (
      Object.prototype.hasOwnProperty.call(data, "children") &&
      data.children.length > 0
    ) {
      for (let i = 0; i < data.children.length; i++) {
        drawCircle(data.children[i], current);
      }
    } else {
      context.fillStyle = "white";
      context.font = "1.5rem Arial";
      context.textAlign = "center";
      context.fillText(data.data.name, data.x, data.y);
    }
  }

  let current = null;
  function bindEvent() {
    canvas.onmousemove = function (event) {
      var x = event.offsetX * 2;
      var y = event.offsetY * 2;
      const ele = findElement(root, x, y);
      if (current === ele) {
        return;
      }
      current = ele;
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawCircle(root, ele);
    };
  }

  function findElement(data, x, y) {
    const x1 = data.x;
    const y1 = data.y;
    const r = data.r;
    const distanceSquare = (x1 - x) * (x1 - x) + (y1 - y) * (y1 - y);
    if (data.children) {
      for (let i = 0; i < data.children.length; i++) {
        const ret = findElement(data.children[i], x, y);
        if (ret) {
          return ret;
        }
      }
    }
    if (r * r <= distanceSquare) {
      return null;
    } else {
      return data;
    }
  }

  drawCircle(root);
  bindEvent();
})();
