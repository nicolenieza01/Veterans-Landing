/* =========================================================================
   VETERANS LANDING — site behaviour
   Renders the home page and one page per property from assets/js/properties.js
   Plain JavaScript, no dependencies, no build step.
   ========================================================================= */
(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};
  var PROPS = window.PROPERTIES || [];
  var HOME = window.HOME || {};
  var view = document.getElementById("view");

  /* ------------------------------------------------------------- helpers */
  function cfg(path) {
    return path.split(".").reduce(function (o, k) {
      return o && o[k] != null ? o[k] : null;
    }, CFG);
  }
  function isTodo(v) { return typeof v === "string" && /^TODO/i.test(v.trim()); }
  function clean(v) { return String(v).replace(/^TODO\s*[:\u2014-]?\s*/i, "").trim(); }
  function digits(v) { return String(v).replace(/[^0-9+]/g, ""); }
  function icon(name) { return '<svg aria-hidden="true"><use href="#i-' + name + '"></use></svg>'; }
  function ribbon(cls) {
    return '<span class="ribbon ' + (cls || "") + '" aria-hidden="true"><i></i><i></i><i></i></span>';
  }
  function maybeTodo(v) {
    if (!v) return "";
    return isTodo(v)
      ? '<span class="cfg-todo">' + clean(v) + "</span>"
      : v;
  }
  function bySlug(slug) {
    for (var i = 0; i < PROPS.length; i++) if (PROPS[i].slug === slug) return PROPS[i];
    return null;
  }

  /* -------------------------------------------------- floor plan drawings
     Walls are drawn as separate segments so doorways are real openings.
     Every door gets a leaf line plus a swing arc: entry, bath, bedrooms.
     ------------------------------------------------------------------- */
  var PLANS = {
    oneBed:
      '<svg viewBox="0 0 320 210" role="img" aria-label="One bedroom floor plan: kitchen alcove and living room, with the bathroom and bedroom opening off the living room">' +
      '<rect class="fp-floor" x="10" y="10" width="300" height="190"/>' +
      '<g class="fp-fix">' +
        '<rect x="20" y="20" width="56" height="20" rx="2"/><rect x="32" y="24" width="16" height="12" rx="2"/>' +
        '<rect x="84" y="20" width="24" height="20" rx="2"/>' +
        '<rect x="24" y="140" width="68" height="24" rx="4"/><circle cx="126" cy="152" r="13"/>' +
        '<circle cx="232" cy="32" r="9"/><rect x="250" y="18" width="50" height="24" rx="6"/>' +
        '<rect x="250" y="48" width="26" height="14" rx="3"/>' +
        '<rect x="214" y="112" width="84" height="64" rx="3"/><rect x="214" y="90" width="16" height="16" rx="2"/>' +
      '</g>' +
      '<g class="fp-int"><path d="M174 10V26M174 56V120M174 152V200M174 72H310M10 72H96"/></g>' +
      '<g class="fp-wall"><path d="M10 10H310M310 10V200M310 200H76M44 200H10M10 200V10"/></g>' +
      '<g class="fp-door">' +
        '<path d="M44 200V168"/><path d="M44 168A32 32 0 0 1 76 200"/>' +
        '<path d="M174 26H204"/><path d="M204 26A30 30 0 0 1 174 56"/>' +
        '<path d="M174 120H206"/><path d="M206 120A32 32 0 0 1 174 152"/>' +
      '</g>' +
      '<text class="fp-t" x="58" y="60">KITCHEN</text><text class="fp-t" x="96" y="114">LIVING</text>' +
      '<text class="fp-t" x="206" y="68">BATH</text><text class="fp-t" x="262" y="84">BEDROOM</text></svg>',

    efficiency:
      '<svg viewBox="0 0 320 210" role="img" aria-label="Efficiency floor plan: open studio with a kitchen along one wall and a separate bathroom">' +
      '<rect class="fp-floor" x="10" y="10" width="300" height="190"/>' +
      '<g class="fp-fix">' +
        '<rect x="20" y="20" width="60" height="20" rx="2"/><rect x="32" y="24" width="18" height="12" rx="2"/>' +
        '<rect x="86" y="20" width="24" height="20" rx="2"/>' +
        '<rect x="40" y="90" width="76" height="56" rx="3"/><rect x="130" y="150" width="64" height="24" rx="4"/>' +
        '<rect x="272" y="118" width="26" height="14" rx="3"/><circle cx="236" cy="176" r="9"/>' +
        '<rect x="248" y="160" width="52" height="24" rx="6"/>' +
      '</g>' +
      '<g class="fp-int"><path d="M10 70H118M222 104H310M222 104V130M222 160V200"/></g>' +
      '<g class="fp-wall"><path d="M10 10H310M310 10V200M310 200H10M10 200V182M10 150V10"/></g>' +
      '<g class="fp-door">' +
        '<path d="M10 182H42"/><path d="M42 182A32 32 0 0 0 10 150"/>' +
        '<path d="M222 130H252"/><path d="M252 130A30 30 0 0 1 222 160"/>' +
      '</g>' +
      '<text class="fp-t" x="64" y="58">KITCHEN</text><text class="fp-t" x="152" y="112">STUDIO</text>' +
      '<text class="fp-t" x="266" y="196">BATH</text></svg>',

    twoBed:
      '<svg viewBox="0 0 320 210" role="img" aria-label="Two bedroom floor plan: kitchen alcove and living room on the left, bathroom and two bedrooms on the right">' +
      '<rect class="fp-floor" x="10" y="10" width="300" height="190"/>' +
      '<g class="fp-fix">' +
        '<rect x="20" y="20" width="52" height="18" rx="2"/><rect x="30" y="23" width="16" height="12" rx="2"/>' +
        '<rect x="80" y="20" width="24" height="18" rx="2"/>' +
        '<rect x="22" y="130" width="62" height="22" rx="4"/><circle cx="106" cy="142" r="12"/>' +
        '<rect x="178" y="76" width="26" height="14" rx="3"/><circle cx="228" cy="32" r="9"/>' +
        '<rect x="250" y="20" width="52" height="24" rx="6"/>' +
        '<rect x="174" y="130" width="58" height="58" rx="3"/><rect x="266" y="126" width="38" height="62" rx="3"/>' +
      '</g>' +
      '<g class="fp-int"><path d="M138 10V40M138 70V140M138 172V200M138 100H310M236 100V140M236 164V200M10 76H84"/></g>' +
      '<g class="fp-wall"><path d="M10 10H310M310 10V200M310 200H72M40 200H10M10 200V10"/></g>' +
      '<g class="fp-door">' +
        '<path d="M40 200V168"/><path d="M40 168A32 32 0 0 1 72 200"/>' +
        '<path d="M138 40H168"/><path d="M168 40A30 30 0 0 1 138 70"/>' +
        '<path d="M138 140H170"/><path d="M170 140A32 32 0 0 1 138 172"/>' +
        '<path d="M236 140H260"/><path d="M260 140A24 24 0 0 1 236 164"/>' +
      '</g>' +
      '<text class="fp-t" x="54" y="60">KITCHEN</text><text class="fp-t" x="104" y="112">LIVING</text>' +
      '<text class="fp-t" x="270" y="64">BATH</text>' +
      '<text class="fp-t" x="202" y="118">BED 1</text><text class="fp-t" x="284" y="118">BED 2</text></svg>'
  };

  /* ------------------------------------------------------------- motifs
     Decorative flowers a property can opt into with  motif: "iris"
     ------------------------------------------------------------------- */
  var MOTIFS = {
    iris:
      '<svg class="iris-svg" viewBox="0 0 120 142" aria-hidden="true">' +
      '<path class="iris-stem" d="M60 96v44"/>' +
      '<g class="iris-leaf">' +
        '<path d="M60 134c-16-6-26-22-26-36 12 8 22 20 26 36Z"/>' +
        '<path d="M60 134c16-6 26-22 26-36-12 8-22 20-26 36Z"/>' +
      '</g>' +
      '<g class="iris-fall">' +
        '<path d="M52 56C36 58 16 74 12 94c-4 18 10 28 22 18 12-10 20-34 18-56Z"/>' +
        '<path d="M68 56c16 2 36 18 40 38 4 18-10 28-22 18-12-10-20-34-18-56Z"/>' +
        '<path d="M60 58c-10 8-14 34-10 54 3 14 17 14 20 0 4-20 0-46-10-54Z"/>' +
      '</g>' +
      '<g class="iris-standard">' +
        '<path d="M40 14c-12 10-14 30-4 40 6 6 14 2 12-6-4-12-4-26-8-34Z"/>' +
        '<path d="M80 14c12 10 14 30 4 40-6 6-14 2-12-6 4-12 4-26 8-34Z"/>' +
        '<path d="M60 6c-8 8-12 26-8 42 3 10 13 10 16 0 4-16 0-34-8-42Z"/>' +
      '</g>' +
      '<g class="iris-beard">' +
        '<path d="M60 72v32"/><path d="M51 78l-2 20"/><path d="M69 78l2 20"/>' +
      '</g>' +
      '</svg>'
  };
  function motif(name) { return MOTIFS[name] || ""; }

  /* ------------------------------------------------------- shared blocks */
  function secHead(eyebrow, title, lede, center) {
    return '<div class="sec-head' + (center ? " center" : "") + '">' +
      '<p class="eyebrow">' + ribbon("sm") + " " + eyebrow + "</p>" +
      "<h2>" + title + "</h2>" +
      '<span class="star-rule" aria-hidden="true"><i></i>\u2605<i></i></span>' +
      (lede ? '<p class="sec-lede">' + lede + "</p>" : "") +
      "</div>";
  }

  function ctaBand() {
    return '<section class="cta-band"><div class="wrap">' +
      '<p class="cta-lines"><span>A community that supports you.</span>' +
      "<span>A home that feels right.</span><span>A future you deserve.</span></p>" +
      '<a class="btn btn-gold" href="#contact">Check availability</a>' +
      "</div></section>";
  }

  // Property programs are written as plain strings. Look up a matching icon
  // from the home-page program list, then fall back on a keyword guess.
  var ICON_WORDS = [
    ["va", "handshake"], ["social service", "handshake"], ["meeting", "people"],
    ["peer", "people"], ["employ", "briefcase"], ["job", "briefcase"],
    ["career", "chart"], ["placement", "chart"], ["financ", "book"], ["bank", "book"],
    ["computer", "monitor"], ["technolog", "monitor"], ["laptop", "monitor"],
    ["secure", "shield"], ["safe", "shield"]
  ];
  function iconFor(title) {
    var t = String(title).toLowerCase();
    var home = (HOME.programs || []).filter(function (p) {
      return p.title.toLowerCase() === t;
    })[0];
    if (home) return home.icon;
    for (var i = 0; i < ICON_WORDS.length; i++) {
      if (t.indexOf(ICON_WORDS[i][0]) !== -1) return ICON_WORDS[i][1];
    }
    return "shield";
  }

  function programList(items) {
    return '<ul class="program-grid">' + items.map(function (it) {
      var o = typeof it === "string" ? { icon: iconFor(it), title: it, text: "" } : it;
      return '<li class="program">' +
        '<span class="program-ico">' + icon(o.icon) + "</span>" +
        "<div><h3>" + o.title + "</h3>" + (o.text ? "<p>" + o.text + "</p>" : "") + "</div></li>";
    }).join("") + "</ul>";
  }

  /* ------------------------------------------------------------- HOME */
  function renderHome() {
    var lines = (HOME.headline || "").split("\n");
    var headline = lines.map(function (l, i) {
      return i === lines.length - 1 ? '<span class="accent">' + l + "</span>" : l;
    }).join("<br>");

    var collage = PROPS.slice(0, 2).map(function (p, i) {
      return '<figure class="collage-item c' + (i + 1) + '">' +
        '<img src="' + p.photo + '" alt="' + p.photoAlt + '" loading="' + (i ? "lazy" : "eager") + '">' +
        "<figcaption>" + p.name + "</figcaption></figure>";
    }).join("");

    var cards = PROPS.map(function (p) {
      var stat = (p.stats && p.stats[0]) ? p.stats[0] : null;
      return '<a class="prop-card accent-' + (p.accent || "navy") + '" href="#/' + p.slug + '">' +
        '<span class="prop-photo"><img src="' + p.photo + '" alt="' + p.photoAlt + '" loading="lazy"></span>' +
        '<span class="prop-body">' +
          (p.motif ? '<span class="card-motif">' + motif(p.motif) + "</span>" : "") +
          '<span class="prop-kicker">Veterans Landing</span>' +
          "<h3>" + p.name + "</h3>" +
          '<span class="prop-addr">' + maybeTodo(p.address) + "</span>" +
          "<p>" + p.cardBlurb + "</p>" +
          '<span class="prop-meta">' +
            (stat ? '<b>' + stat.value + "</b> " + stat.label : "") +
          "</span>" +
          '<span class="prop-go">Explore ' + p.name + " " + icon("arrow") + "</span>" +
        "</span></a>";
    }).join("");

    return (
      '<section class="hero-home"><div class="wrap hero-home-inner">' +
        '<div class="hero-copy">' +
          '<p class="eyebrow">' + ribbon("sm") + " A veteran owned community</p>" +
          '<h1 class="display-xl">' + headline + "</h1>" +
          '<p class="lede">' + (HOME.lede || "") + "</p>" +
          '<div class="actions">' +
            '<a class="btn btn-solid" href="#apply">Apply now</a>' +
            '<a class="btn btn-quiet" href="#communities">See the communities</a>' +
          "</div>" +
        "</div>" +
        '<div class="hero-collage">' + collage + "</div>" +
      "</div></section>" +

      '<section class="section" id="communities"><div class="wrap">' +
        secHead("Our communities", "Two places to call home", "Each community has its own building, its own floor plans, and the same commitment behind it.") +
        '<div class="prop-grid">' + cards + "</div>" +
      "</div></section>" +

      '<section class="section section-tint"><div class="wrap">' +
        secHead("Why we're different", "More than an apartment", "") +
        '<ul class="diff-grid">' + (HOME.difference || []).map(function (d) {
          return '<li class="diff card"><span class="diff-ico">' + icon(d.icon) + "</span>" +
            "<h3>" + d.title + "</h3><p>" + d.text + "</p></li>";
        }).join("") + "</ul>" +
      "</div></section>" +

      '<section class="section"><div class="wrap">' +
        secHead("On-site programs", "Support that builds a future", "Every Veterans Landing community has a resource center and a program calendar behind it.") +
        programList(HOME.programs || []) +
      "</div></section>" +

      ctaBand()
    );
  }

  /* --------------------------------------------------------- PROPERTY */
  function renderProperty(p) {
    var stats = (p.stats || []).map(function (s) {
      return '<div class="stat"><b>' + s.value + "</b><span>" + s.label + "</span></div>";
    }).join("");

    var amenities = (p.amenities || []).map(function (a) {
      return '<li class="amenity"><span class="amenity-ico">' + icon(a.icon) + "</span>" +
        "<h3>" + a.title + "</h3><p>" + a.text + "</p></li>";
    }).join("");

    var units = (p.units || []).map(function (u) {
      return '<article class="plan card' + (u.pending ? " is-pending" : "") + '">' +
        '<div class="plan-figure">' + (PLANS[u.plan] || "") + "</div>" +
        '<div class="plan-body">' +
          "<h3>" + u.name + "</h3>" +
          '<p class="plan-rent">' + u.rent + '<span>/ month</span></p>' +
          '<dl class="plan-specs">' +
            "<div><dt>Size</dt><dd>" + u.size + "</dd></div>" +
            (u.count ? "<div><dt>Available</dt><dd>" + u.count + " units</dd></div>" : "") +
          "</dl>" +
          (u.pending ? '<p class="plan-flag">Pricing coming soon</p>' : "") +
        "</div></article>";
    }).join("");

    function starCard(title, blurb, items, ico) {
      return '<article class="list-card card">' +
        '<div class="list-head"><span class="list-ico">' + icon(ico) + "</span>" +
          "<div><h3>" + title + "</h3><p>" + blurb + "</p></div></div>" +
        '<ul class="starlist">' + items.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul>" +
        "</article>";
    }

    return (
      '<section class="hero-prop accent-' + (p.accent || "navy") + '">' +
        (p.motif ? '<span class="hero-motif" aria-hidden="true">' + motif(p.motif) + "</span>" : "") +
        '<div class="wrap hero-prop-inner">' +
        '<div class="hero-copy">' +
          (p.motif ? '<span class="motif-mark">' + motif(p.motif) + "</span>" : "") +
          '<p class="eyebrow">' + ribbon("sm") + " Veterans Landing</p>" +
          '<h1 class="display-xl">' + p.name + "</h1>" +
          '<p class="lede">' + p.tagline + "</p>" +
          '<p class="hero-addr">' + icon("pin") + " " + maybeTodo(p.address) + "</p>" +
          '<div class="actions">' +
            '<a class="btn btn-solid" href="#apply">Apply now</a>' +
            '<a class="btn btn-quiet" href="#floorplans">View floor plans</a>' +
          "</div>" +
        "</div>" +
        '<figure class="hero-photo">' +
          '<img src="' + p.photo + '" alt="' + p.photoAlt + '">' +
        "</figure>" +
      "</div></section>" +

      '<div class="statstrip"><div class="wrap statstrip-inner">' + stats + "</div></div>" +

      '<section class="section"><div class="wrap">' +
        '<div class="intro-split">' +
          "<div>" + secHead("Built for veterans", "Focused on community", "") + "</div>" +
          '<p class="intro-text">' + p.intro + "</p>" +
        "</div>" +
        '<ul class="amenity-grid">' + amenities + "</ul>" +
      "</div></section>" +

      '<section class="section section-tint" id="floorplans"><div class="wrap">' +
        secHead("Apartments", "Comfortable apartments built for veterans", "") +
        '<div class="plan-grid">' + units + "</div>" +
        '<p class="footnote">' + (p.unitsNote || "") + "</p>" +
      "</div></section>" +

      '<section class="section"><div class="wrap">' +
        secHead("Programs", "What's waiting on site", "") +
        programList(p.programs || []) +
        '<div class="duo">' +
          starCard("Connection &amp; community", "A place to belong, share, and build lasting friendships.", p.community || [], "people") +
          starCard("Support for success", "Practical help that opens doors and keeps them open.", p.support || [], "chart") +
        "</div>" +
      "</div></section>" +

      ctaBand()
    );
  }

  /* ------------------------------------------------------------- chrome */
  function buildNav() {
    var items = [{ href: "#/", label: "Home", slug: "" }].concat(
      PROPS.map(function (p) { return { href: "#/" + p.slug, label: p.name, slug: p.slug }; })
    );
    var html = items.map(function (i) {
      return '<a class="nav-link" data-slug="' + i.slug + '" href="' + i.href + '">' + i.label + "</a>";
    }).join("");
    document.getElementById("nav").innerHTML = html +
      '<a class="nav-link" href="#contact">Contact</a>' +
      '<a class="nav-link nav-apply" href="#apply">Apply now</a>';
    document.getElementById("footerNav").innerHTML = html +
      '<a class="nav-link" href="#apply">Apply</a>' +
      '<a class="nav-link" href="#contact">Contact</a>';

    var opts = PROPS.map(function (p) {
      return '<option value="Veterans Landing ' + p.name + '">Veterans Landing ' + p.name + "</option>";
    }).join("") + '<option value="Either / not sure">Not sure yet</option>';
    ["f-property", "a-property"].forEach(function (id) {
      var sel = document.getElementById(id);
      if (sel) sel.innerHTML = opts;
    });
  }

  function markNav(slug) {
    document.querySelectorAll(".nav-link").forEach(function (a) {
      var on = a.getAttribute("data-slug") === slug;
      a.classList.toggle("is-current", on);
      if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
  }

  function applyConfig(root) {
    (root || document).querySelectorAll("[data-cfg]").forEach(function (el) {
      var raw = cfg(el.getAttribute("data-cfg"));
      if (raw == null || raw === "") return;
      var todo = isTodo(raw), val = todo ? clean(raw) : raw;
      if (val) el.textContent = val;
      if (todo) el.classList.add("cfg-todo");
      var kind = el.getAttribute("data-cfg-href");
      if (kind === "tel") el.href = "tel:" + digits(val);
      else if (kind === "mailto") el.href = "mailto:" + val;
      else if (kind === "url") el.href = /^https?:/.test(val) ? val : "https://" + val;
    });
  }

  /* ------------------------------------------------------------- router */
  var currentSlug = null;

  function render(slug) {
    if (currentSlug === slug) return;
    currentSlug = slug;
    var p = slug ? bySlug(slug) : null;

    if (slug && !p) { location.hash = "#/"; return; }

    view.innerHTML = p ? renderProperty(p) : renderHome();
    view.setAttribute("data-page", slug || "home");
    markNav(slug || "");
    document.title = p
      ? p.name + ", Veterans Landing"
      : "Veterans Landing, Veteran Owned Housing in Detroit";
    closeNav();
  }

  function route(scroll) {
    var h = location.hash || "";
    if (h.indexOf("#/") === 0) {
      var before = currentSlug;
      render(h.slice(2));
      if (scroll && before !== null) window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (currentSlug === null) {
      render("");
    }
  }

  /* --------------------------------------------------------- mobile nav */
  var toggle = document.getElementById("navToggle");
  function closeNav() {
    document.body.classList.remove("nav-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("a") : null;
    if (a && a.getAttribute("href") && a.getAttribute("href").charAt(0) === "#") closeNav();
  });

  /* ---------------------------------------------------------- bootstrap */
  buildNav();
  applyConfig();

  document.querySelectorAll("[data-cfg-href]").forEach(function (el) {
    var kind = el.getAttribute("data-cfg-href");
    if (["facebook", "instagram", "linkedin"].indexOf(kind) === -1) return;
    var url = cfg("social." + kind);
    if (url) { el.href = url; el.target = "_blank"; el.rel = "noopener"; }
    else el.remove();
  });
  var row = document.querySelector(".social-row");
  if (row && !row.children.length && row.closest(".social")) row.closest(".social").remove();

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  window.addEventListener("hashchange", function () { route(true); });
  route(false);

  /* --------------------------------------------------------------- forms
     Both forms share one handler. How they send is set by form.mode in
     assets/js/config.js:
       "netlify"  posts to Netlify Forms (saved on the site and emailed to you)
       "endpoint" posts to a form service such as Formspree
       "mailto"   opens the visitor's own email app, pre-filled
     If a netlify or endpoint post fails, it falls back to mailto rather than
     losing what the visitor typed.
     ------------------------------------------------------------------- */
  var LABELS = {
    name: "Name", email: "Email", phone: "Phone", property: "Community",
    unit: "Apartment type", movein: "Hoping to move in", household: "People in the home",
    service: "Service connection", income: "Monthly household income",
    assistance: "Voucher or VA assistance", consent: "Consented", message: "Notes"
  };

  function setNote(el, msg, cls) {
    if (!el) return;
    el.textContent = msg;
    el.className = "form-note" + (cls ? " " + cls : "");
  }

  function asText(data) {
    return Object.keys(data)
      .filter(function (k) { return k !== "form-name" && k !== "bot-field" && data[k] !== ""; })
      .map(function (k) { return (LABELS[k] || k) + ": " + data[k]; })
      .join("\n");
  }

  function openMailto(data, subject, note, why, toPath) {
    var to = clean(cfg(toPath || "general.email") || cfg("general.email") || "");
    window.location.href = "mailto:" + to +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(asText(data));
    setNote(note, why || "Your email app should open with everything filled in. Press send and we will have it.", "ok");
  }

  function wireForm(formId, noteId, subject, success, toPath) {
    var form = document.getElementById(formId);
    var note = document.getElementById(noteId);
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        setNote(note, "Please fill in the fields marked required.", "err");
        return;
      }

      var fd = new FormData(form);
      var data = {};
      fd.forEach(function (v, k) { data[k] = v; });
      if (data["bot-field"]) return; // silently drop bots

      var mode = cfg("form.mode") || "netlify";
      var endpoint = cfg("form.endpoint") || "";

      if (location.protocol === "file:") { openMailto(data, subject, note, null, toPath); return; }

      if (mode === "netlify") {
        setNote(note, "Sending…");
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(fd).toString()
        })
          .then(function (r) {
            if (!r.ok) throw new Error("rejected");
            form.reset();
            setNote(note, success, "ok");
          })
          .catch(function () {
            openMailto(data, subject, note,
              "We could not send it from here, so your email app should be opening with your answers filled in. Press send, or call the leasing office and we will take it over the phone. Nothing you typed has been lost.",
              toPath);
          });
        return;
      }

      if (mode === "endpoint" && endpoint && endpoint.indexOf("YOUR_FORM_ID") === -1) {
        setNote(note, "Sending…");
        fetch(endpoint, { method: "POST", headers: { Accept: "application/json" }, body: fd })
          .then(function (r) {
            if (!r.ok) throw new Error("rejected");
            form.reset();
            setNote(note, success, "ok");
          })
          .catch(function () { openMailto(data, subject, note, null, toPath); });
        return;
      }

      openMailto(data, subject, note, null, toPath);
    });
  }

  wireForm("inquiryForm", "formNote", "Website inquiry",
    "Thank you. Your message is in and we will be in touch shortly.");
  wireForm("applicationForm", "applyNote", "Veterans Landing rental application",
    "Thank you. Your application is in. We confirm receipt within one business day.",
    "applications.email");

  /* --------------------------------------------- reveal the application */
  var applyToggle = document.getElementById("applyToggle");
  var applyForm = document.getElementById("applicationForm");
  if (applyToggle && applyForm) {
    applyToggle.addEventListener("click", function () {
      var open = applyForm.hasAttribute("hidden");
      if (open) {
        applyForm.removeAttribute("hidden");
        applyToggle.setAttribute("aria-expanded", "true");
        applyToggle.textContent = "Hide the application";
        applyForm.scrollIntoView({ behavior: "smooth", block: "start" });
        var first = applyForm.querySelector("input, select, textarea");
        if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, 400);
      } else {
        applyForm.setAttribute("hidden", "");
        applyToggle.setAttribute("aria-expanded", "false");
        applyToggle.textContent = "Start the online application";
      }
    });
  }
})();
