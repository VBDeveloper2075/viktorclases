import sharp from "sharp";

const input = "public/logo-viktorclases.jpg";
const output = "public/logo-viktorclases.png";

const { data, info } = await sharp(input)
  .resize({ width: 2048, kernel: "lanczos3" })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height } = info;
const out = Buffer.alloc(width * height * 4);

for (let i = 0; i < width * height; i++) {
  const r = data[i * 3];
  const g = data[i * 3 + 1];
  const b = data[i * 3 + 2];

  // Distancia al blanco -> opacidad. Fondo blanco => transparente.
  const minC = Math.min(r, g, b);
  let alpha = (255 - minC) / 255;
  // Limpia el ruido de JPG cerca del blanco y refuerza los bordes.
  alpha = alpha < 0.06 ? 0 : Math.min(1, alpha * 1.15);

  if (alpha === 0) {
    out[i * 4 + 3] = 0;
    continue;
  }

  // Quita la mezcla con blanco para recuperar el color real.
  const a = Math.max(alpha, 0.0001);
  const unmix = (c) => Math.max(0, Math.min(255, Math.round((c - 255 * (1 - a)) / a)));

  out[i * 4] = unmix(r);
  out[i * 4 + 1] = unmix(g);
  out[i * 4 + 2] = unmix(b);
  out[i * 4 + 3] = Math.round(alpha * 255);
}

await sharp(out, { raw: { width, height, channels: 4 } })
  .trim({ threshold: 5 })
  .extend({ top: 16, bottom: 16, left: 16, right: 16, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile(output);

const meta = await sharp(output).metadata();
console.log(`OK ${output} ${meta.width}x${meta.height}`);
