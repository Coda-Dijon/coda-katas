// Fourni : la visualisation. Vous n'avez pas besoin de modifier ce fichier,
// tout se passe dans src/fire.ts (et dans vos tests).
import { randomDice } from "./dice.js";
import { createFire, extinguish, ignite, MAX_INTENSITY, spreadFire, toRgba, type Fire } from "./fire.js";
import { PALETTE } from "./palette.js";

const DEBUG_CELL_SIZE = 48;

type Status = { state: "ok" | "todo" | "error"; message?: string };

const canvas = document.querySelector<HTMLCanvasElement>("#fire")!;
const context = canvas.getContext("2d")!;
const frameCount = document.querySelector<HTMLSpanElement>("#frame-count")!;
const playButton = document.querySelector<HTMLButtonElement>("#play")!;
const stepButton = document.querySelector<HTMLButtonElement>("#step")!;
const toggleFireButton = document.querySelector<HTMLButtonElement>("#toggle-fire")!;
const resetButton = document.querySelector<HTMLButtonElement>("#reset")!;
const sizeSelect = document.querySelector<HTMLSelectElement>("#size")!;
const fpsInput = document.querySelector<HTMLInputElement>("#fps")!;
const fpsValue = document.querySelector<HTMLSpanElement>("#fps-value")!;
const statusList = document.querySelector<HTMLUListElement>("#status")!;
const paletteContainer = document.querySelector<HTMLDivElement>("#palette")!;

const statuses = new Map<string, Status>(
  ["createFire", "spreadFire", "extinguish", "ignite", "toRgba"].map((name) => [name, { state: "todo" }]),
);

let fire: Fire | undefined;
let frame = 0;
let playing = true;
let burning = true;
let lastTick = 0;

// ── Appels au code des étudiants ─────────────────────────────────────────

const attempt = <T>(name: string, call: () => T, validate: (result: T) => string | undefined): T | undefined => {
  try {
    const result = call();
    const problem = validate(result);
    updateStatus(name, problem ? { state: "error", message: problem } : { state: "ok" });
    return problem ? undefined : result;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const notImplemented = message.includes("pas encore implémentée");
    updateStatus(name, notImplemented ? { state: "todo", message } : { state: "error", message });
    return undefined;
  }
};

const updateStatus = (name: string, status: Status) => {
  const previous = statuses.get(name);
  if (previous?.state === status.state && previous.message === status.message) return;
  statuses.set(name, status);
  renderStatuses();
};

const validateFire =
  (width: number, height: number) =>
  (candidate: Fire): string | undefined => {
    if (candidate.width !== width || candidate.height !== height)
      return `Taille attendue ${width} × ${height}, reçue ${candidate.width} × ${candidate.height}`;
    if (candidate.pixels.length !== width * height)
      return `pixels devrait contenir ${width * height} valeurs, il en contient ${candidate.pixels.length}`;
    const invalid = candidate.pixels.findIndex((p) => !Number.isInteger(p) || p < 0 || p > MAX_INTENSITY);
    if (invalid !== -1)
      return `pixels[${invalid}] = ${candidate.pixels[invalid]} n'est pas une intensité entre 0 et ${MAX_INTENSITY}`;
    return undefined;
  };

const validateRgba = (expectedLength: number) => (rgba: Uint8ClampedArray) =>
  rgba instanceof Uint8ClampedArray && rgba.length === expectedLength
    ? undefined
    : `Un Uint8ClampedArray de ${expectedLength} octets (4 par pixel) est attendu`;

const sameShape = (current: Fire) => validateFire(current.width, current.height);

// ── Cycle de vie du feu ───────────────────────────────────────────────────

const selectedSize = (): [number, number] => {
  const [width, height] = sizeSelect.value.split("x").map(Number);
  return [width!, height!];
};

const reset = () => {
  const [width, height] = selectedSize();
  fire = attempt("createFire", () => createFire(width, height), validateFire(width, height));
  frame = 0;
  burning = true;
  toggleFireButton.textContent = "💨 Éteindre";
  render();
};

const step = () => {
  if (!fire) return;
  const current = fire;
  const next = attempt("spreadFire", () => spreadFire(current, randomDice), sameShape(current));
  if (!next) {
    pause();
    return;
  }
  fire = next;
  frame++;
  render();
};

const toggleFire = () => {
  if (!fire) return;
  const current = fire;
  const next = burning
    ? attempt("extinguish", () => extinguish(current), sameShape(current))
    : attempt("ignite", () => ignite(current), sameShape(current));
  if (!next) return;
  fire = next;
  burning = !burning;
  toggleFireButton.textContent = burning ? "💨 Éteindre" : "🔥 Allumer";
  render();
};

// ── Rendu ────────────────────────────────────────────────────────────────

// Tant que toRgba n'est pas implémentée, on affiche les intensités en niveaux de gris.
const grayscale = (current: Fire): Uint8ClampedArray => {
  const rgba = new Uint8ClampedArray(current.pixels.length * 4);
  current.pixels.forEach((intensity, i) => {
    const level = Math.round((intensity / MAX_INTENSITY) * 255);
    rgba.set([level, level, level, 255], i * 4);
  });
  return rgba;
};

const render = () => {
  frameCount.textContent = String(frame);
  if (!fire) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }
  const current = fire;
  const rgba =
    attempt("toRgba", () => toRgba(current, PALETTE), validateRgba(current.pixels.length * 4)) ?? grayscale(current);

  if (current.width * DEBUG_CELL_SIZE <= 1000) renderDebug(current, rgba);
  else renderPixels(current, rgba);
};

const renderPixels = (current: Fire, rgba: Uint8ClampedArray) => {
  canvas.width = current.width;
  canvas.height = current.height;
  context.putImageData(new ImageData(new Uint8ClampedArray(rgba), current.width, current.height), 0, 0);
};

const renderDebug = (current: Fire, rgba: Uint8ClampedArray) => {
  canvas.width = current.width * DEBUG_CELL_SIZE;
  canvas.height = current.height * DEBUG_CELL_SIZE;
  context.font = `${DEBUG_CELL_SIZE / 2.6}px ui-monospace, monospace`;
  context.textAlign = "center";
  context.textBaseline = "middle";

  current.pixels.forEach((intensity, i) => {
    const x = (i % current.width) * DEBUG_CELL_SIZE;
    const y = Math.floor(i / current.width) * DEBUG_CELL_SIZE;
    const [r, g, b] = rgba.subarray(i * 4, i * 4 + 3);
    context.fillStyle = `rgb(${r} ${g} ${b})`;
    context.fillRect(x, y, DEBUG_CELL_SIZE, DEBUG_CELL_SIZE);
    context.strokeStyle = "#00000080";
    context.strokeRect(x, y, DEBUG_CELL_SIZE, DEBUG_CELL_SIZE);
    context.fillStyle = intensity > 24 ? "#000" : "#fff";
    context.fillText(String(intensity), x + DEBUG_CELL_SIZE / 2, y + DEBUG_CELL_SIZE / 2);
  });
};

const ICONS: Record<Status["state"], string> = { ok: "✅", todo: "⏳", error: "❌" };

const renderStatuses = () => {
  statusList.replaceChildren(
    ...[...statuses].map(([name, status]) => {
      const item = document.createElement("li");
      item.className = status.state;
      item.innerHTML = `<span>${ICONS[status.state]}</span><code></code>`;
      item.querySelector("code")!.textContent = name;
      if (status.message) {
        const message = document.createElement("span");
        message.className = "message";
        message.textContent = status.message;
        item.append(message);
      }
      return item;
    }),
  );
};

const renderPalette = () => {
  paletteContainer.replaceChildren(
    ...PALETTE.map(([r, g, b], intensity) => {
      const swatch = document.createElement("div");
      swatch.className = "swatch";
      swatch.style.background = `rgb(${r} ${g} ${b})`;
      swatch.style.color = intensity > 24 ? "#000" : "#fff";
      swatch.textContent = String(intensity);
      swatch.title = `Intensité ${intensity} : rgb(${r}, ${g}, ${b})`;
      return swatch;
    }),
  );
};

// ── Boucle d'animation et contrôles ───────────────────────────────────────

const play = () => {
  playing = true;
  playButton.textContent = "⏸ Pause";
};

const pause = () => {
  playing = false;
  playButton.textContent = "▶ Lecture";
};

const loop = (now: number) => {
  if (playing && now - lastTick >= 1000 / Number(fpsInput.value)) {
    lastTick = now;
    step();
  }
  requestAnimationFrame(loop);
};

playButton.addEventListener("click", () => (playing ? pause() : play()));
stepButton.addEventListener("click", () => {
  pause();
  step();
});
toggleFireButton.addEventListener("click", toggleFire);
resetButton.addEventListener("click", reset);
sizeSelect.addEventListener("change", () => {
  // En mode debug, on démarre en pause pour pouvoir suivre les valeurs pas à pas.
  if (sizeSelect.value === "16x10") pause();
  reset();
});
fpsInput.addEventListener("input", () => (fpsValue.textContent = fpsInput.value));

renderPalette();
renderStatuses();
reset();
requestAnimationFrame(loop);
