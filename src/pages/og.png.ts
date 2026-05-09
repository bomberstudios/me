import type { APIRoute } from "astro";
import { readFileSync } from "fs";
import { join } from "path";
import { createElement as h } from "react";
import satori from "satori";
import sharp from "sharp";

const fontData = readFileSync(join(process.cwd(), "public/fonts/BricolageGrotesque-Bold.ttf"));

export const GET: APIRoute = async () => {
  const markup = h(
    "div",
    { style: { display: "flex", flexDirection: "column", justifyContent: "flex-end", width: "100%", height: "100%", padding: "60px", background: "#fff" } },
    h("div", { style: { display: "flex", marginBottom: "24px" } },
      h("div", { style: { width: "128px", height: "128px", borderRadius: "50%", background: "#f60" } })
    ),
    h("div", { style: { display: "flex", fontSize: "72px", fontWeight: 800, color: "#f60", lineHeight: 1.1 } }, "ale, today"),
    h("div", { style: { display: "flex", marginTop: "32px", fontSize: "24px", color: "#737373" } }, "ale.today")
  );

  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [{ name: "Bricolage Grotesque", data: fontData, weight: 700, style: "normal" }],
  });

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
