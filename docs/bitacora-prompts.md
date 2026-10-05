# Bitácora de prompts — Muak

> Borrador armado a partir de la conversación del 28 y 29 de septiembre de 2026 con Claude (Claude Code).
> **Revísalo y reescribe "Qué aprendí" con tus palabras.** La rúbrica califica que la bitácora sea tuya y honesta, y que las entradas estén repartidas en el tiempo: agrega una entrada nueva cada día que uses IA.

---

## 2026-09-28 · Idea del portal y nombres

**Herramienta:** Claude (Claude Code)

**Qué pedí:** "Un portal informativo de deportes diseñado para mujeres, tipo portal de chismes, muy femenino, paleta rosada, estética Mean Girls y revistas de mujeres [...]. Entre pinksports, iconicsports y fashionsports creo que está la decisión del nombre."

**Qué salió:** Una tabla comparando los nombres, alternativas ("Pitch Please", "Goal Diggers"), un plan por fases (portal, personalización, mascota) y avisos legales (derechos de fotos, chismes sobre personas reales).

**Qué corregí o decidí yo:** Descarté las propuestas de logo basadas en siluetas deportivas porque no me convencían.

**Qué aprendí:** _(escríbelo tú)_

---

## 2026-09-28 · Logo inspirado en Afrodita

**Herramienta:** Claude

**Qué pedí:** "Pensaba en algo de Afrodita de forma minimalista, tipo Olimpo."

**Qué salió:** Cuatro bocetos en SVG (espejo de Venus, columna jónica, perfil de diosa, concha con perla). Técnicamente correctos, pero se veían toscos.

**Qué no funcionó:** Ninguno me convenció: "los logos están muy mal". Decidí cambiar la temática a algo más "on brand" con el chisme.

**Qué aprendí:** _(escríbelo tú)_

---

## 2026-09-29 · El nombre "Iconik Sports" ya existía

**Herramienta:** Claude (con búsqueda web)

**Qué pedí:** Que el sitio se llamara "Iconik sports" y armar la marca completa antes del prototipo, respondiendo preguntas.

**Qué salió:** La IA buscó el nombre y encontró que **Iconik Sports and Events Limited** es una empresa india de deportes que cotiza en bolsa (cambió su nombre en abril de 2025), además de "Iconic Sports". Propuso "Ikónica", pero al verificarlo también existía: una marca colombiana de leggings para mujer, una agencia en Guayaquil y una empresa de merchandising en Argentina.

**Qué corregí o decidí yo:** Elegí **Muak** (el sonido de un beso), que no tenía marcas deportivas registradas con ese nombre.

**Qué aprendí:** _(por ejemplo: antes de enamorarme de un nombre hay que buscarlo, porque la rúbrica devuelve el trabajo si copia una marca existente)_

---

## 2026-09-29 · La fuente de recortes se veía como bloques negros

**Herramienta:** Claude

**Qué pedí:** Usar la fuente Ramove Aniquis (letras de recortes de revista) para los títulos.

**Qué salió:** Al probarla, la IA encontró que es una fuente a color (OpenType-SVG). En Firefox y Safari se ve bien, pero en **Chrome se ve como bloques negros ilegibles**. Además, la licencia de Freepik prohíbe usarla de forma que terceros puedan acceder al archivo de la fuente, que es lo que pasaría al subirla a un repositorio público.

**Qué se corrigió:** Los títulos se generan como **imágenes** (WebP), letra por letra, con un script. La fuente no se sube al repositorio (está en `.gitignore`). Para el texto normal se usan Google Fonts: Fraunces y Montserrat.

**Qué aprendí:** _(escríbelo tú)_

---

## 2026-09-29 · Paleta, voz y logo definitivo

**Herramienta:** Claude (varios agentes en paralelo)

**Qué pedí:** Definir la marca con preguntas: personalidad (elegí "mezcla" de Gossip Girl, Regina George y Elle Woods), público (18 a 25, Latam, tuteo), paleta (elegí "Burn Book"), deportes (solo fútbol) y logo con beso de labial.

**Qué salió:** Cuatro conceptos de logo (Beso-balón, Balón besado, Lunar-balón, Monolínea), cada uno revisado por un segundo agente. También salió el kit verbal: tagline "El fútbol, con labial.", saludo "Hola, titulares", firma "Un beso al ángulo. — Muak" y el semáforo del chisme.

**Qué no funcionó:** El rosa chicle `#FF3EA5` no sirve para texto chico sobre fondo claro (contraste 2.7:1, cuando el mínimo es 4.5:1), así que solo se usa como fondo o en títulos grandes.

**Qué decidí yo:** Elegí el logo **Balón besado** y la tipografía **Fraunces**, y pedí revisar el kit verbal completo antes de aprobarlo.

**Qué aprendí:** _(escríbelo tú)_

---

## 2026-09-29 · Fondos interactivos

**Herramienta:** Claude

**Qué pedí:** Convertir el fondo de nubes en un fondo que se mueva en loop como nubes reales, y tener temas seleccionables.

**Qué salió:** Las nubes se espejaron para que el loop no tenga cortes y se animan en dos capas a distinta velocidad. Los stickers punk se recortaron uno por uno.

**Qué no funcionó:**
- Los huecos de los stickers (el moño y el candado) quedaron grises y hubo que recortarlos de nuevo.
- La textura de cuero rosa salió primero como "cerámica partida" y después con bandas duras. Recién al tercer intento pareció cuero.

**Qué aprendí:** _(escríbelo tú)_

---

## 2026-09-29 · Prototipo de la portada

**Herramienta:** Claude

**Qué pedí:** "Arma el prototipo" (multipágina, con Pitch Please como sección de chismes).

**Qué salió:** `index.html`, `styles.css` y `script.js` con cuatro temas, un selector de temas, recortes con cinta, el semáforo y un menú para celular.

**Qué no funcionó:**
- En el collage de la portada, el beso tapaba la palabra "titulares".
- En celular había 7 px de scroll horizontal por un sticker que se salía del borde.
- Las capturas automáticas a 390 px mentían: el navegador sin ventana no baja de cierto ancho. Hubo que revisar con emulación real de celular.

**Qué aprendí:** _(escríbelo tú)_
