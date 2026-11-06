/* "Open app" pill in the header + "/" hint in search + Cmd/Ctrl+K */
(function () {
  function init() {
    var inner = document.querySelector(".md-header__inner");
    if (inner && !inner.querySelector(".gm-open-app")) {
      var a = document.createElement("a");
      a.className = "gm-open-app";
      a.href = "https://gmoon.trade";
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = "Open app";
      inner.appendChild(a);
    }
    var form = document.querySelector(".md-search__form");
    if (form && !form.querySelector(".gm-kbd")) {
      var k = document.createElement("kbd");
      k.className = "gm-kbd";
      k.textContent = "/";
      form.appendChild(k);
    }
  }
  document.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      var t = document.querySelector("[data-md-toggle=search]");
      var i = document.querySelector(".md-search__input");
      if (t) t.checked = true;
      if (i) i.focus();
    }
  });
  if (typeof document$ !== "undefined") document$.subscribe(init);
  else document.addEventListener("DOMContentLoaded", init);
})();
