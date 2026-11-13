/* Header search, same behaviour as the front's LiveTokenSearch (front/src/components/layout/live-token-search.tsx):
   - focus opens the list under the field (empty query = every page), typing filters it;
   - "/" anywhere focuses the field; the "/" key turns into a clear cross while the field is focused and has text;
   - arrows move through the rows, Enter opens the selected (or first) one, Escape and a click outside close;
   - rows are bars until the index has loaded; "No results found" when nothing matches.
   Data: Material's search index (search/search_index.json), loaded on first focus. Phones (<=760px) open the
   field over the header from the search icon, with Cancel, like the front's mobile search. */
(function () {
  if (window.__gmSearch) return;
  window.__gmSearch = true;

  var script = document.currentScript;
  var base = new URL("../", script.src);
  var indexUrl = new URL("search/search_index.json", base).href;
  var MAX_MATCHES = 20;
  var LOADING_ROWS = 3;

  var entries = null;
  var loading = null;

  function strip(html) {
    var div = document.createElement("div");
    div.innerHTML = html;
    return (div.textContent || "").replace(/\s+/g, " ").trim();
  }
  function load() {
    if (loading) return loading;
    loading = fetch(indexUrl)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var pages = {};
        data.docs.forEach(function (d) {
          if (d.location.indexOf("#") === -1) pages[d.location] = d.title;
        });
        entries = data.docs
          .map(function (d, order) {
            var hash = d.location.indexOf("#");
            var path = hash === -1 ? d.location : d.location.slice(0, hash);
            return {
              url: new URL(d.location, base).href,
              title: d.title,
              page: hash === -1 ? null : pages[path] || null,
              text: strip(d.text),
              order: order,
            };
          })
          // The page's own H1 anchor repeats the page row.
          .filter(function (e) { return !(e.page && e.page === e.title); });
      })
      .catch(function () { entries = []; });
    return loading;
  }

  function matches(query) {
    var q = query.trim().toLowerCase();
    if (!q) return entries.filter(function (e) { return !e.page; }).slice(0, MAX_MATCHES);
    return entries
      .map(function (e) {
        var inTitle = e.title.toLowerCase().indexOf(q) !== -1;
        var inText = e.text.toLowerCase().indexOf(q) !== -1;
        return { e: e, rank: inTitle ? (e.page ? 1 : 0) : inText ? (e.page ? 3 : 2) : -1 };
      })
      .filter(function (m) { return m.rank >= 0; })
      .sort(function (a, b) { return a.rank - b.rank || a.e.order - b.e.order; })
      .slice(0, MAX_MATCHES)
      .map(function (m) { return m.e; });
  }

  function esc(s) {
    return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }
  function snippet(e, query) {
    if (e.page) return e.page;
    var q = query.trim().toLowerCase();
    var at = q ? e.text.toLowerCase().indexOf(q) : -1;
    var start = at > 30 ? at - 30 : 0;
    return (start ? "…" : "") + e.text.slice(start, start + 90);
  }

  var DOC_ICON =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>';
  var HASH_ICON =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 9h14M5 15h14M10 4 8 20M16 4l-2 16"/></svg>';

  function init() {
    var header = document.querySelector(".gm-header");
    if (!header || header.__gm) return;
    header.__gm = true;
    var root = header.querySelector(".gm-search");
    var field = root.querySelector(".header-search");
    var input = field.querySelector("input");
    var kbd = field.querySelector("kbd");
    var clear = field.querySelector('button[aria-label="Clear search"]');
    var dropdown = root.querySelector(".search-dropdown");
    var openButton = header.querySelector(".gm-search-open");
    var cancel = header.querySelector(".gm-search-cancel");

    var open = false;
    var focused = false;
    var active = -1;
    var list = [];

    function syncKey() {
      var showClear = !!input.value && focused;
      clear.hidden = !showClear;
      kbd.hidden = showClear;
    }
    function render() {
      dropdown.hidden = !open;
      input.setAttribute("aria-expanded", open ? "true" : "false");
      if (!open) return;
      var html;
      if (!entries) {
        var bars = "";
        for (var i = 0; i < LOADING_ROWS; i++) {
          bars +=
            '<div class="search-row" aria-hidden="true"><span class="skeleton search-row-icon"></span><span class="search-coin">' +
            '<b><span class="skeleton skeleton-inline" style="width:120px;height:1lh"></span></b>' +
            '<small><span class="skeleton skeleton-inline" style="width:80px;height:1lh"></span></small></span></div>';
        }
        html = '<p class="search-heading" aria-hidden="true">Pages</p><div class="search-options-frame"><div class="search-options">' + bars + "</div></div>";
        dropdown.setAttribute("aria-busy", "true");
      } else {
        dropdown.setAttribute("aria-busy", "false");
        list = matches(input.value);
        if (!list.length) {
          html = '<div class="search-empty"><b>No results found</b><span>Try a different word or phrase</span></div>';
        } else {
          html =
            '<p class="search-heading" aria-hidden="true">Pages</p><div class="search-options-frame"><div class="search-options">' +
            list
              .map(function (e, n) {
                return (
                  '<a class="search-row" role="option" id="gm-search-option-' + n + '" aria-selected="' + (n === active) + '" href="' + esc(e.url) + '">' +
                  '<span class="search-row-icon">' + (e.page ? HASH_ICON : DOC_ICON) + "</span>" +
                  '<span class="search-coin"><b>' + esc(e.title) + "</b><small>" + esc(snippet(e, input.value)) + "</small></span></a>"
                );
              })
              .join("") +
            "</div></div>";
        }
      }
      dropdown.innerHTML = html;
      var options = dropdown.querySelector(".search-options");
      if (options) {
        options.addEventListener("scroll", function () {
          options.parentNode.setAttribute("data-scrolled", options.scrollTop > 0 ? "true" : "false");
        });
      }
      input.setAttribute("aria-activedescendant", active >= 0 ? "gm-search-option-" + active : "");
      var selected = dropdown.querySelector('[aria-selected="true"]');
      if (selected) selected.scrollIntoView({ block: "nearest" });
    }
    function show() {
      open = true;
      render();
      if (!entries) load().then(render);
    }
    function close() {
      open = false;
      active = -1;
      render();
    }
    function closeMobile() {
      header.classList.remove("gm-search-active");
    }
    function go(url) {
      // A real link click, so Material's instant navigation handles it.
      var a = document.createElement("a");
      a.href = url;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }

    field.addEventListener("focusin", function () { focused = true; syncKey(); });
    field.addEventListener("focusout", function (event) {
      if (!field.contains(event.relatedTarget)) { focused = false; syncKey(); }
    });
    input.addEventListener("focus", show);
    input.addEventListener("input", function () {
      open = true;
      active = -1;
      syncKey();
      render();
    });
    input.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        close();
        input.blur();
        closeMobile();
      }
      if ((event.key === "ArrowDown" || event.key === "ArrowUp") && list.length) {
        event.preventDefault();
        active = Math.max(0, Math.min(list.length - 1, active + (event.key === "ArrowDown" ? 1 : -1)));
        render();
      }
      if (event.key === "Enter") {
        var target = list[active >= 0 ? active : 0];
        if (entries && target) {
          close();
          input.blur();
          closeMobile();
          go(target.url);
        }
      }
    });
    // Keeps focus in the field, so the cross doesn't vanish under the click (Safari doesn't focus buttons on click).
    clear.addEventListener("mousedown", function (event) { event.preventDefault(); });
    clear.addEventListener("click", function () {
      input.value = "";
      active = -1;
      syncKey();
      render();
      input.focus();
    });
    dropdown.addEventListener("click", function (event) {
      if (event.target.closest("a.search-row")) {
        close();
        closeMobile();
      }
    });
    document.addEventListener("pointerdown", function (event) {
      if (!root.contains(event.target)) close();
    });
    document.addEventListener("keydown", function (event) {
      var t = event.target;
      if (event.key === "/" && !(t instanceof HTMLInputElement) && !(t instanceof HTMLTextAreaElement) && !t.isContentEditable) {
        event.preventDefault();
        if (getComputedStyle(openButton).display !== "none") header.classList.add("gm-search-active");
        input.focus();
      }
    });
    openButton.addEventListener("click", function () {
      header.classList.add("gm-search-active");
      input.focus();
    });
    cancel.addEventListener("click", function () {
      close();
      closeMobile();
    });

    // A new page starts with an empty, closed search (the front remounts it per route).
    if (typeof document$ !== "undefined") {
      document$.subscribe(function () {
        input.value = "";
        close();
        closeMobile();
        syncKey();
      });
    }
    syncKey();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
