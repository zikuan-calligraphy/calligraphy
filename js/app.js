(function () {
  var TYPE_LABEL = { original: "原稿", carved: "木刻作品", mounted: "裝裱成品", mockup: "效果示意" };
  var works = window.WORKS || [];
  var site = window.SITE || {};

  var state = { style: "全部", type: "全部" };
  var current = { work: null, ver: 0, list: [] };

  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "class") n.className = attrs[k];
      else if (k === "text") n.textContent = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { n.appendChild(c); });
    return n;
  }
  function typeName(v) { return v.label || TYPE_LABEL[v.type] || ""; }
  function unique(arr) { return arr.filter(function (v, i) { return v && arr.indexOf(v) === i; }); }

  /* ---------- Filters ---------- */
  function buildFilters() {
    var box = document.getElementById("filters");
    if (!box) return;
    box.innerHTML = "";
    var styles = ["全部"].concat(unique(works.map(function (w) { return w.style; })));
    var types = ["全部"].concat(unique([].concat.apply([], works.map(function (w) {
      return w.versions.map(function (v) { return v.type; });
    }))));

    function row(label, items, key, fmt) {
      if (items.length <= 2) return; // 只有一種就不用顯示篩選
      var r = el("div", { class: "filter-row" }, [el("span", { class: "label", text: label })]);
      items.forEach(function (it) {
        var b = el("button", { class: "chip", type: "button", "aria-pressed": String(state[key] === it), text: fmt ? fmt(it) : it });
        b.addEventListener("click", function () { state[key] = it; buildFilters(); renderGrid(); });
        r.appendChild(b);
      });
      box.appendChild(r);
    }
    row("書體", styles, "style");
    row("形式", types, "type", function (t) { return t === "全部" ? t : TYPE_LABEL[t]; });
  }

  /* ---------- Grid ---------- */
  function visibleWorks() {
    return works.filter(function (w) {
      var okStyle = state.style === "全部" || w.style === state.style;
      var okType = state.type === "全部" || w.versions.some(function (v) { return v.type === state.type; });
      return okStyle && okType;
    });
  }

  function renderGrid() {
    var grid = document.getElementById("grid");
    if (!grid) return;
    grid.innerHTML = "";
    var list = visibleWorks();
    if (!list.length) { grid.appendChild(el("p", { class: "empty", text: "目前沒有符合的作品。" })); return; }
    list.forEach(function (w) {
      var v0 = w.versions[0];
      var frame = el("div", { class: "frame" }, [
        el("img", { src: "images/thumb/" + v0.file, alt: w.title + "(" + typeName(v0) + ")", loading: "lazy" })
      ]);
      if (w.versions.length > 1) frame.appendChild(el("span", { class: "badge", text: w.versions.length + " 個版本" }));
      var tags = el("div", { class: "tags" }, w.versions.map(function (v) {
        return el("span", { class: "tag" + (v.type === "mockup" ? " mockup" : ""), text: typeName(v) });
      }));
      var card = el("button", { class: "card", type: "button", "aria-label": "查看 " + w.title }, [
        frame,
        el("div", { class: "meta" }, [
          el("h3", { text: w.title }),
          el("div", { class: "sub", text: w.style }),
          tags
        ])
      ]);
      card.addEventListener("click", function () { openLightbox(w, 0, list); });
      grid.appendChild(card);
    });
  }

  /* ---------- Lightbox ---------- */
  var lb, lbImg, lbTitle, lbSub, lbVers, lbNote, lbText, lbCount;

  function buildLightbox() {
    if (lb) return;
    lbImg = el("img", { alt: "" });
    lbCount = el("div", { class: "lb-count" });
    var close = el("button", { class: "lb-close", type: "button", "aria-label": "關閉", text: "×" });
    var prev = el("button", { class: "lb-nav prev", type: "button", "aria-label": "上一件", text: "‹" });
    var next = el("button", { class: "lb-nav next", type: "button", "aria-label": "下一件", text: "›" });
    close.addEventListener("click", closeLightbox);
    prev.addEventListener("click", function () { step(-1); });
    next.addEventListener("click", function () { step(1); });

    lbTitle = el("h3");
    lbSub = el("div", { class: "sub" });
    lbVers = el("div", { class: "versions" });
    lbNote = el("p", { class: "vnote" });
    lbText = el("div", { class: "text" });

    lb = el("div", { class: "lb", role: "dialog", "aria-modal": "true", "aria-label": "作品檢視" }, [
      el("div", { class: "lb-stage" }, [lbImg, close, prev, next, lbCount]),
      el("aside", { class: "lb-panel" }, [lbTitle, lbSub, lbVers, lbNote, lbText])
    ]);
    lb.addEventListener("click", function (e) { if (e.target.classList.contains("lb-stage")) closeLightbox(); });
    document.body.appendChild(lb);

    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
  }

  function showVersion() {
    var w = current.work, v = w.versions[current.ver];
    lbImg.src = "images/full/" + v.file;
    lbImg.alt = w.title + "(" + typeName(v) + ")";
    lbTitle.textContent = w.title;
    lbSub.textContent = [w.style, w.year, w.size].filter(Boolean).join(" · ");
    lbVers.innerHTML = "";
    if (w.versions.length > 1) {
      w.versions.forEach(function (ver, i) {
        var b = el("button", { class: "vbtn", type: "button", "aria-pressed": String(i === current.ver), text: typeName(ver) });
        b.addEventListener("click", function () { current.ver = i; showVersion(); });
        lbVers.appendChild(b);
      });
    }
    var note = v.type === "mockup" ? "此為效果示意圖,非實際成品。" : (v.note || "");
    lbNote.textContent = note;
    lbNote.style.display = note ? "" : "none";
    lbText.textContent = w.text || "";
    lbText.style.display = w.text ? "" : "none";
    var idx = current.list.indexOf(w);
    lbCount.textContent = (idx + 1) + " / " + current.list.length;
    if (history.replaceState) history.replaceState(null, "", "#" + w.id);
  }

  function openLightbox(w, ver, list) {
    buildLightbox();
    current.work = w; current.ver = ver || 0; current.list = list || works;
    showVersion();
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lb.classList.remove("open");
    document.body.style.overflow = "";
    if (history.replaceState) history.replaceState(null, "", location.pathname + location.search);
  }
  function step(d) {
    var i = current.list.indexOf(current.work);
    var n = (i + d + current.list.length) % current.list.length;
    current.work = current.list[n]; current.ver = 0; showVersion();
  }

  /* ---------- Init ---------- */
  buildFilters();
  renderGrid();
  var hash = location.hash.replace("#", "");
  if (hash) {
    var target = works.filter(function (w) { return w.id === hash; })[0];
    if (target) openLightbox(target, 0, works);
  }
})();
