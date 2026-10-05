/* =========================================================
   MUAK — interacciones compartidas por todas las páginas
   ========================================================= */
(function () {
  "use strict";

  // Rutas relativas a este archivo (sirve igual desde / y desde /pages/)
  var BASE = new URL(".", document.currentScript ? document.currentScript.src : location.href);
  var raiz = document.documentElement;
  var reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function guardar(clave, valor) {
    try { localStorage.setItem(clave, valor); } catch (e) { /* modo privado: no pasa nada */ }
  }

  /* ---------- Temas ---------- */
  var TEMAS = ["nubes", "diario", "punk", "gala"];

  function aplicarTema(tema) {
    if (TEMAS.indexOf(tema) === -1) tema = "nubes";
    raiz.setAttribute("data-tema", tema);
    document.querySelectorAll("[data-tema-opcion]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-tema-opcion") === tema));
    });
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", tema === "gala" ? "#1A0A12" : "#FFE3EF");
    if (tema === "diario" || tema === "punk") crearStickers();
  }

  var botonTema = document.querySelector(".boton-tema");
  var panelTema = document.getElementById("panel-tema");

  function cerrarPanelTema() {
    if (!panelTema || panelTema.hidden) return;
    panelTema.hidden = true;
    botonTema.setAttribute("aria-expanded", "false");
  }

  if (botonTema && panelTema) {
    botonTema.addEventListener("click", function (e) {
      e.stopPropagation();
      var abrir = panelTema.hidden;
      panelTema.hidden = !abrir;
      botonTema.setAttribute("aria-expanded", String(abrir));
      if (abrir) {
        var activo = panelTema.querySelector('[aria-pressed="true"]') || panelTema.querySelector("button");
        if (activo) activo.focus();
      }
    });
    panelTema.addEventListener("click", function (e) { e.stopPropagation(); });
    document.addEventListener("click", cerrarPanelTema);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !panelTema.hidden) { cerrarPanelTema(); botonTema.focus(); }
    });
  }

  document.querySelectorAll("[data-tema-opcion]").forEach(function (b) {
    b.addEventListener("click", function () {
      var tema = b.getAttribute("data-tema-opcion");
      aplicarTema(tema);
      guardar("muak-tema", tema);
    });
  });

  /* ---------- Fondo animado: stickers y destellos ---------- */
  var fondo = document.querySelector(".fondo");

  var STICKERS = [
    "corazon-roto", "mono", "gafas-corazon", "candado", "labios", "diamante",
    "chat-corazon", "corazon-flecha", "rayo", "calavera-mono", "llave", "anillo",
    "corazones-gancho", "ojo-pestanas", "gema", "corazon-curita"
  ];

  // Números pseudoaleatorios estables: el fondo se ve igual en cada visita
  function azar(semilla) {
    var s = semilla;
    return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  }

  // Los stickers pesan: solo se descargan cuando un tema los necesita
  function crearStickers() {
    var capaStickers = fondo && fondo.querySelector(".stickers");
    if (capaStickers && !capaStickers.children.length) {
      var r = azar(7);
      var ancho = window.innerWidth;
      var cantidad = ancho < 600 ? 7 : ancho < 1000 ? 10 : 14;
      for (var i = 0; i < cantidad; i++) {
        var img = document.createElement("img");
        img.className = "sticker";
        img.alt = "";
        img.decoding = "async";
        img.src = new URL("assets/img/stickers/" + STICKERS[i % STICKERS.length] + ".webp", BASE).href;
        // repartir en una grilla suelta para que no se amontonen
        var col = i % 4, fila = Math.floor(i / 4);
        img.style.setProperty("--x", (col * 25 + r() * 16 - 4).toFixed(1) + "%");
        img.style.setProperty("--y", (fila * (100 / Math.ceil(cantidad / 4)) + r() * 12).toFixed(1) + "%");
        img.style.setProperty("--w", Math.round(80 + r() * 70) + "px");
        img.style.setProperty("--r", Math.round(r() * 40 - 20) + "deg");
        img.style.setProperty("--dur", (7 + r() * 6).toFixed(1) + "s");
        img.style.setProperty("--delay", (-r() * 8).toFixed(1) + "s");
        img.style.setProperty("--prof", Math.round(8 + r() * 22) + "px");
        capaStickers.appendChild(img);
      }
    }
  }

  if (fondo) {
    var capaDestellos = fondo.querySelector(".destellos");
    if (capaDestellos && !capaDestellos.children.length) {
      var r2 = azar(21);
      for (var j = 0; j < 46; j++) {
        var d = document.createElement("span");
        d.className = "destello";
        d.style.setProperty("--x", (r2() * 100).toFixed(1) + "%");
        d.style.setProperty("--y", (r2() * 100).toFixed(1) + "%");
        d.style.setProperty("--s", Math.round(6 + r2() * 14) + "px");
        d.style.setProperty("--c", r2() > 0.6 ? "#FF3EA5" : "#FFE3EF");
        d.style.setProperty("--dur", (2.2 + r2() * 3).toFixed(1) + "s");
        d.style.setProperty("--delay", (-r2() * 5).toFixed(1) + "s");
        capaDestellos.appendChild(d);
      }
    }

    // Parallax suave de los stickers con el mouse (solo con puntero fino)
    if (!reducirMovimiento && window.matchMedia("(pointer: fine)").matches) {
      var pendiente = false, mx = 0, my = 0;
      window.addEventListener("pointermove", function (e) {
        mx = (e.clientX / window.innerWidth - 0.5) * 2;
        my = (e.clientY / window.innerHeight - 0.5) * 2;
        if (pendiente) return;
        pendiente = true;
        requestAnimationFrame(function () {
          fondo.style.setProperty("--mx", mx.toFixed(3));
          fondo.style.setProperty("--my", my.toFixed(3));
          pendiente = false;
        });
      }, { passive: true });
    }
  }

  aplicarTema(raiz.getAttribute("data-tema"));

  /* ---------- Menú en celular ---------- */
  var botonMenu = document.querySelector(".boton-menu");
  var nav = document.getElementById("menu-principal");
  if (botonMenu && nav) {
    botonMenu.addEventListener("click", function () {
      var abierta = nav.classList.toggle("abierta");
      botonMenu.setAttribute("aria-expanded", String(abierta));
    });
    nav.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("abierta")) {
        nav.classList.remove("abierta");
        botonMenu.setAttribute("aria-expanded", "false");
        botonMenu.focus();
      }
    });
  }

  /* ---------- Filtros (por ejemplo, el semáforo de Pitch Please) ---------- */
  document.querySelectorAll("[data-filtros]").forEach(function (grupo) {
    var objetivo = document.querySelector(grupo.getAttribute("data-filtros"));
    if (!objetivo) return;
    var aviso = document.querySelector(grupo.getAttribute("data-aviso") || "#aviso-filtro");
    grupo.querySelectorAll("[data-filtro]").forEach(function (b) {
      b.addEventListener("click", function () {
        var valor = b.getAttribute("data-filtro");
        grupo.querySelectorAll("[data-filtro]").forEach(function (o) {
          o.setAttribute("aria-pressed", String(o === b));
        });
        var visibles = 0;
        objetivo.querySelectorAll("[data-semaforo]").forEach(function (item) {
          var etiquetas = item.getAttribute("data-semaforo").split(" ");
          var mostrar = valor === "todo" || etiquetas.indexOf(valor) !== -1;
          item.hidden = !mostrar;
          if (mostrar) visibles++;
        });
        if (aviso) aviso.textContent = visibles === 1 ? "Mostrando 1 chisme." : "Mostrando " + visibles + " chismes.";
      });
    });
  });

  /* ---------- Pestañas accesibles ---------- */
  document.querySelectorAll(".pestanas").forEach(function (caja) {
    var tabs = Array.prototype.slice.call(caja.querySelectorAll('[role="tab"]'));
    function activar(tab, enfocar) {
      tabs.forEach(function (t) {
        var activo = t === tab;
        t.setAttribute("aria-selected", String(activo));
        t.tabIndex = activo ? 0 : -1;
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !activo;
      });
      if (enfocar) tab.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { activar(t, false); });
      t.addEventListener("keydown", function (e) {
        var destino = null;
        if (e.key === "ArrowRight") destino = tabs[(i + 1) % tabs.length];
        if (e.key === "ArrowLeft") destino = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === "Home") destino = tabs[0];
        if (e.key === "End") destino = tabs[tabs.length - 1];
        if (destino) { e.preventDefault(); activar(destino, true); }
      });
    });
  });

  /* ---------- Mini quiz ---------- */
  document.querySelectorAll("[data-quiz]").forEach(function (quiz) {
    var salida = quiz.querySelector(".resultado");
    quiz.querySelectorAll("button[data-opcion]").forEach(function (b) {
      b.addEventListener("click", function () {
        var bien = b.hasAttribute("data-correcta");
        quiz.querySelectorAll("button[data-opcion]").forEach(function (o) {
          o.removeAttribute("data-estado");
          o.setAttribute("aria-pressed", "false");
        });
        b.setAttribute("data-estado", bien ? "bien" : "mal");
        b.setAttribute("aria-pressed", "true");
        if (salida) {
          salida.textContent = bien
            ? (quiz.getAttribute("data-bien") || "¡Al ángulo! Respuesta correcta.")
            : (quiz.getAttribute("data-mal") || "Casi. Mira la regla otra vez e inténtalo de nuevo.");
        }
      });
    });
  });

  /* ---------- Buscador del glosario ---------- */
  function sinTildes(t) {
    return t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }
  document.querySelectorAll("[data-buscador]").forEach(function (input) {
    var lista = document.querySelector(input.getAttribute("data-buscador"));
    var vacio = document.getElementById(input.getAttribute("data-vacio") || "sin-resultados");
    if (!lista) return;
    input.addEventListener("input", function () {
      var q = sinTildes(input.value.trim());
      var visibles = 0;
      lista.querySelectorAll("[data-termino]").forEach(function (item) {
        var ok = !q || sinTildes(item.textContent).indexOf(q) !== -1;
        item.hidden = !ok;
        if (ok) visibles++;
      });
      if (vacio) vacio.hidden = visibles !== 0;
    });
  });

  /* ---------- Formulario de contacto (prototipo) ---------- */
  document.querySelectorAll("[data-form-muak]").forEach(function (form) {
    var exito = form.querySelector(".mensaje-exito") || document.getElementById("mensaje-exito");
    var MENSAJES = {
      valueMissing: "Este campo es obligatorio, titular.",
      typeMismatch: "Ese correo no parece un correo. VAR-ifícalo.",
      tooShort: "Cuéntanos un poquito más (mínimo {n} caracteres)."
    };
    function validar(campo) {
      var error = document.getElementById(campo.id + "-error");
      var msg = "";
      if (campo.validity.valueMissing) msg = MENSAJES.valueMissing;
      else if (campo.validity.typeMismatch) msg = MENSAJES.typeMismatch;
      else if (campo.validity.tooShort) msg = MENSAJES.tooShort.replace("{n}", campo.minLength);
      campo.setAttribute("aria-invalid", msg ? "true" : "false");
      if (error) error.textContent = msg;
      return !msg;
    }
    var campos = form.querySelectorAll("input, select, textarea");
    campos.forEach(function (c) {
      c.addEventListener("blur", function () { if (c.value) validar(c); });
      c.addEventListener("input", function () { if (c.getAttribute("aria-invalid") === "true") validar(c); });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var primero = null;
      campos.forEach(function (c) {
        if (c.type === "submit" || c.type === "button") return;
        if (!validar(c) && !primero) primero = c;
      });
      if (primero) { primero.focus(); return; }
      if (exito) {
        exito.hidden = false;
        exito.focus();
      }
      form.reset();
      campos.forEach(function (c) { c.removeAttribute("aria-invalid"); });
    });
  });

  /* ---------- Año en el pie ---------- */
  document.querySelectorAll("[data-anio]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
