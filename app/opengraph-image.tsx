import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "man jeremy — software engineer at Intuit";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#0a0a0a";
const FG = "#ededed";
const MUTED = "#8a8a8a";
const ORANGE = "#FF6521";

export default async function Image() {
  const [regular, bold] = await Promise.all([
    readFile(join(process.cwd(), "assets/JetBrainsMono-Regular.ttf")),
    readFile(join(process.cwd(), "assets/JetBrainsMono-Bold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          color: FG,
          fontFamily: "JetBrains Mono",
          padding: "72px 80px",
        }}
      >
        {/* terminal window dots */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#ff5f56", marginRight: 14 }} />
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#ffbd2e", marginRight: 14 }} />
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#27c93f" }} />
        </div>

        {/* body */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 42, marginBottom: 52 }}>
            <span style={{ color: ORANGE }}>$ </span>
            <span style={{ marginLeft: 16 }}>man jeremy</span>
            <div style={{ width: 22, height: 44, background: ORANGE, marginLeft: 16 }} />
          </div>

          <div style={{ display: "flex", fontSize: 26, fontWeight: 700, color: MUTED, marginBottom: 18 }}>
            NAME
          </div>
          <div style={{ display: "flex", fontSize: 52, fontWeight: 700, marginBottom: 22 }}>
            jeremy — software engineer
          </div>
          <div style={{ display: "flex", fontSize: 30, color: MUTED }}>
            at Intuit · Linux enthusiast · open-source contributor
          </div>
        </div>

        {/* footer rule */}
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
          <span style={{ color: ORANGE }}>zavbala.com</span>
          <span style={{ color: MUTED }}>JEREMY(1)</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "JetBrains Mono", data: regular, style: "normal", weight: 400 },
        { name: "JetBrains Mono", data: bold, style: "normal", weight: 700 },
      ],
    }
  );
}
