(async function () {
  const dataSource = "https://s5.ssl.qhres.com/static/b0695e2dd30daa64.json";
  const data = await (await fetch(dataSource)).json();
  const regions = d3
    .hierarchy(data)
    .sum((d) => 1)
    .sort((a, b) => b.value - a.value);
  const pack = d3.pack().size([1600, 1600]).padding(3);
  const root = pack(regions);


  function drawCircle(
    root,
    data,
    fillStyle = "rgba(0, 0, 0, 0.2)",
    textFillStyle = "white"
  ) {
    let circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.setAttribute("cx", data.x);
    circle.setAttribute("cy", data.y);
    circle.setAttribute("r", data.r);
    circle.setAttribute("fill", fillStyle);
    circle.setAttribute('data-name', data.data.name);
    root.appendChild(circle);
    if (
      Object.prototype.hasOwnProperty.call(data, "children") &&
      data.children.length > 0
    ) {
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      for (let i = 0; i < data.children.length; i++) {
        drawCircle(g, data.children[i], fillStyle, textFillStyle);
      }
      g.setAttribute('data-name', data.data.name);
      root.appendChild(g);
    } else {
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('text-family', 'Arial');
      text.setAttribute('text-size', '1.5rem');
      text.setAttribute('fill', textFillStyle);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('x', data.x);
      text.setAttribute('y', data.y);
      text.textContent = data.data.name;
      root.appendChild(text);
    }
  }


  function findCurrentSlibing(target) {
      if (!target || !target.parentNode) {
          return null;
      }
      const nodes = target.parentNode.childNodes;
      let result = null;
      for (let i = 1; i < nodes.length; i++) {
        if (nodes[i] === target) {
            result = nodes[i - 1];
            break;
        }
      }
      return result;
  }

  let currentElement = null;
  const titleElement = document.getElementById('title');
  function bindEvent() {
      svgRoot.addEventListener('mousemove', function (event) {
          let target = event.target;
          if (target.nodeName === 'text') {
              const nodes = target.parentNode.childNodes;
              target = findCurrentSlibing(nodes);
              if (target === null) {
                  return;
              }
          }
          if (currentElement !== null && currentElement !== target) {
              currentElement.setAttribute('fill', 'rgba(0, 0, 0, 0.2)');
          }
          target.setAttribute('fill', 'rgba(0, 128, 0, 0.1)');
          currentElement = target;

          titleElement.textContent = target.getAttribute('data-name');

      })
  }


  const svgRoot = document.querySelector("svg");
  drawCircle(svgRoot, root);
  bindEvent();
})();
