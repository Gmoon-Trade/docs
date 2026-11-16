/* Hover readout for fee charts (.gm-scrub): a guide line, a dot and "3.4s · 53.48%" that follow the pointer
   smoothly along the line (no snapping to whole seconds).
   The chart div carries its geometry and fee curve in data attributes:
   data-fee-start / data-fee-base (percent), data-seconds (length of the fall), data-max (last second on the axis, flat after the fall),
   data-x0 / data-dx (x of second 0 and px per second), data-y0 / data-ky (y of 0% and px per percent).
   Delegated on document, so it keeps
   working after Material's instant navigation swaps the page. */
(function () {
  if (window.__gmScrub) return;
  window.__gmScrub = true;

  var NS = "http://www.w3.org/2000/svg";
  var active = null;

  function make(tag, attrs, parent) {
    var node = document.createElementNS(NS, tag);
    for (var k in attrs) node.setAttribute(k, attrs[k]);
    parent.appendChild(node);
    return node;
  }

  function parts(svg) {
    if (svg.__scrub) return svg.__scrub;
    var g = make("g", { "class": "d-scrub" }, svg);
    svg.__scrub = {
      g: g,
      line: make("path", { "class": "d-scrub-line" }, g),
      dot: make("circle", { "class": "d-scrub-dot", r: 5 }, g),
      label: make("text", { "class": "d-title" }, g)
    };
    return svg.__scrub;
  }

  function show(svg, evt) {
    var d = svg.parentNode.dataset;
    var start = +d.feeStart, base = +d.feeBase, n = +d.seconds, max = +(d.max || d.seconds);
    var x0 = +d.x0, dx = +d.dx, y0 = +d.y0, ky = +d.ky;

    var pt = svg.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    var p = pt.matrixTransform(svg.getScreenCTM().inverse());

    var t = Math.max(0, Math.min(max, (p.x - x0) / dx));
    var fee = t >= n ? base : start - ((start - base) * t) / n;
    var cx = x0 + dx * t;
    var cy = y0 - ky * fee;

    var s = parts(svg);
    s.line.setAttribute("d", "M" + cx + " " + (y0 - ky * start) + "V" + y0);
    s.dot.setAttribute("cx", cx);
    s.dot.setAttribute("cy", cy);
    var right = t > max * 0.7;
    s.label.setAttribute("x", right ? cx - 14 : cx + 14);
    s.label.setAttribute("y", cy - 12);
    s.label.style.textAnchor = right ? "end" : "start";
    s.label.textContent = t.toFixed(1) + "s · " + fee.toFixed(2) + "%";

    if (active && active !== svg) hide();
    svg.classList.add("is-scrub");
    active = svg;
  }

  function hide() {
    if (!active) return;
    active.classList.remove("is-scrub");
    active = null;
  }

  function onMove(evt) {
    var card = evt.target.closest && evt.target.closest(".gm-scrub");
    var svg = card && card.querySelector(":scope > svg");
    if (svg) show(svg, evt);
    else hide();
  }

  document.addEventListener("pointermove", onMove);
  document.addEventListener("pointerdown", onMove);
  document.addEventListener("pointerleave", hide);
})();
