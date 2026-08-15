/**
 * Draws the approved retail cover (white paper, tilted black display letters,
 * red subtitle accent) onto canvases at runtime, after webfonts load.
 * Also draws the spine and the back cover with the black check mark.
 */

const PAPER = "#f7f5f0";
const INK = "#111008";
const RED = "#d0202a";

/**
 * next/font exposes hashed family names through CSS variables, so resolve the
 * real families from the document before drawing to canvas.
 */
function cssFamily(varName: string, fallback: string): string {
  if (typeof document === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return v || fallback;
}

let DISPLAY = "Impact";
let UI = "Helvetica";

async function fontReady(): Promise<void> {
  if (typeof document === "undefined" || !("fonts" in document)) return;
  DISPLAY = cssFamily("--font-anton", "Impact");
  UI = cssFamily("--font-archivo", "Helvetica");
  try {
    await Promise.all([
      document.fonts.load(`80px ${DISPLAY}`),
      document.fonts.load(`700 30px ${UI}`),
      document.fonts.ready,
    ]);
  } catch {}
}

/** Tilted, kerned display word — mimics the cover's hand-set look. */
function drawTiltedWord(
  ctx: CanvasRenderingContext2D,
  word: string,
  cx: number,
  y: number,
  size: number,
  tilts: number[],
  spacing = 0.96
) {
  ctx.save();
  ctx.font = `${size}px ${DISPLAY}, Impact, sans-serif`;
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "center";
  const widths = [...word].map((ch) => ctx.measureText(ch).width * spacing);
  const total = widths.reduce((a, b) => a + b, 0);
  let x = cx - total / 2;
  [...word].forEach((ch, i) => {
    const tilt = tilts[i % tilts.length];
    ctx.save();
    ctx.translate(x + widths[i] / 2, y);
    ctx.rotate((tilt * Math.PI) / 180);
    ctx.fillText(ch, 0, 0);
    ctx.restore();
    x += widths[i];
  });
  ctx.restore();
}

export async function makeFrontCover(w = 1024, h = 1434): Promise<HTMLCanvasElement> {
  await fontReady();
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;

  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, w, h);

  // faint paper tone variation
  const g = ctx.createRadialGradient(w * 0.5, h * 0.42, h * 0.1, w * 0.5, h * 0.5, h * 0.75);
  g.addColorStop(0, "rgba(255,255,255,0.5)");
  g.addColorStop(1, "rgba(190,185,170,0.25)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = INK;
  const s = w / 1024;

  // NOTHING / IS / RANDOM — tilted stacked letters
  drawTiltedWord(ctx, "NOTHING", w * 0.5, 330 * s, 225 * s, [-5, 3, -2, 4, -3, 3, -4]);
  drawTiltedWord(ctx, "IS", w * 0.5, 560 * s, 220 * s, [-4, 4]);
  drawTiltedWord(ctx, "RANDOM", w * 0.5, 800 * s, 225 * s, [4, -4, 3, -3, 4, -3]);

  // subtitle
  ctx.textAlign = "center";
  ctx.font = `700 ${34 * s}px ${UI}, Helvetica, sans-serif`;
  ctx.fillStyle = INK;
  ctx.fillText("MAKING SENSE OF WHAT LIFE’S", w * 0.5, 960 * s);
  ctx.fillStyle = RED;
  ctx.fillText("BEEN TRYING TO TELL YOU", w * 0.5, 1010 * s);

  // author
  ctx.fillStyle = INK;
  ctx.font = `${64 * s}px ${DISPLAY}, Impact, sans-serif`;
  ctx.fillText("B. AMECHI", w * 0.5, 1160 * s);
  ctx.textAlign = "left";

  return c;
}

export async function makeBackCover(w = 1024, h = 1434): Promise<HTMLCanvasElement> {
  await fontReady();
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, w, h);

  // the black check / boomerang mark
  ctx.fillStyle = INK;
  ctx.save();
  ctx.translate(w * 0.5, h * 0.45);
  ctx.scale(w / 1024, w / 1024);
  ctx.beginPath();
  ctx.moveTo(-150, -10);
  ctx.bezierCurveTo(-60, -90, 90, -150, 150, -160);
  ctx.bezierCurveTo(80, -80, 40, -10, 30, 60);
  ctx.bezierCurveTo(10, 30, -60, 0, -150, -10);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  ctx.textAlign = "center";
  ctx.fillStyle = INK;
  ctx.font = `600 ${26 * (w / 1024)}px ${UI}, Helvetica, sans-serif`;
  ctx.fillText("CNFDNT.CO", w * 0.5, h * 0.9);
  return c;
}

export async function makeSpine(w = 160, h = 1434): Promise<HTMLCanvasElement> {
  await fontReady();
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.translate(w / 2, h / 2);
  ctx.rotate(Math.PI / 2);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = INK;
  ctx.font = `${w * 0.42}px ${DISPLAY}, Impact, sans-serif`;
  ctx.fillText("NOTHING IS RANDOM", 0, -w * 0.02);
  ctx.restore();

  // red square + author initial marks
  ctx.fillStyle = RED;
  ctx.fillRect(w * 0.42, h * 0.055, w * 0.16, w * 0.16);
  ctx.save();
  ctx.translate(w / 2, h * 0.93);
  ctx.rotate(Math.PI / 2);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = INK;
  ctx.font = `${w * 0.3}px ${DISPLAY}, Impact, sans-serif`;
  ctx.fillText("B. AMECHI", 0, 0);
  ctx.restore();
  return c;
}

export function makePages(w = 256, h = 1434): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#e8e4d8";
  ctx.fillRect(0, 0, w, h);
  // page striations
  for (let y = 0; y < h; y += 3) {
    ctx.fillStyle = Math.random() > 0.5 ? "rgba(255,255,255,0.5)" : "rgba(160,152,132,0.35)";
    ctx.fillRect(0, y, w, 1.4);
  }
  return c;
}
