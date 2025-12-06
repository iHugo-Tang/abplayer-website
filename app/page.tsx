import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Audio import & resume",
    desc: "Single MP3, secure bookmark, resume instantly.",
    points: [
      "File picker with bookmark storage",
      "Auto-restore last file at launch",
      "Instant feedback when import fails",
    ],
  },
  {
    title: "Precise A-B looping",
    desc: "x / c / v to mark, B must follow A.",
    points: [
      "x sets A, c sets B, v clears",
      "Loop back to A when hitting B",
      "Scrubber drag shows progress",
    ],
  },
  {
    title: "Segment management",
    desc: "Save, dedupe, sort, and reindex segments.",
    points: [
      "One-click save A-B; labels auto-increment",
      "Duplicate start/end are auto-deduped",
      "Sort by start asc/desc; arrow keys to jump",
    ],
  },
  {
    title: "Playback controls",
    desc: "Smooth playback and seeking.",
    points: [
      "Play/Pause, back 5s / forward 10s",
      "Persist lastPlaybackTime before exit",
      "Auto-play when selecting a segment",
    ],
  },
  {
    title: "Practice duration",
    desc: "Counts only while playing; persisted automatically.",
    points: [
      "Accumulates seconds during playback and shows session",
      "Saves every 5s and on exit",
      "Helps track practice effort",
    ],
  },
  {
    title: "Platform & version info",
    desc: "Native macOS with transparent versioning.",
    points: [
      "SwiftUI + SwiftData + AVPlayer",
      "Displays version and build number",
      "Single window focused on one MP3",
    ],
  },
];

const flowNodes = [
  { title: "Launch & resume", desc: "Auto-load last MP3, position, and segments" },
  { title: "Import MP3", desc: "Save secure bookmark with instant failure feedback" },
  { title: "Set A/B", desc: "x / c / v with validation that B > A" },
  { title: "Loop practice", desc: "Return to A at B; scrubber supports jumping" },
  { title: "Save segments", desc: "Deduplicate, sort, switch via arrow keys" },
  { title: "Persist on exit", desc: "Persist progress and session time automatically" },
];

const shortcuts = [
  { keys: ["X"], label: "Set point A" },
  { keys: ["C"], label: "Set point B" },
  { keys: ["V"], label: "Clear A/B" },
  { keys: ["←"], label: "Previous segment" },
  { keys: ["→"], label: "Next segment" },
  { keys: ["Space"], label: "Play / Pause" },
  { keys: ["⌘", "O"], label: "Import MP3" },
  { keys: ["f", "5s"], label: "Back 5 seconds" },
  { keys: ["g", "10s"], label: "Forward 10 seconds" },
];

const dataModels = [
  {
    name: "AudioFile",
    fields: [
      "displayName",
      "bookmarkData (sandbox-safe bookmark)",
      "createdAt",
      "segments: LoopSegment[]",
      "lastPlaybackTime: Double",
    ],
  },
  {
    name: "LoopSegment",
    fields: [
      "label (auto-increment)",
      "startTime / endTime (dedupe identical ranges)",
      "index (renumber after delete)",
      "createdAt",
      "audioFile (relation)",
    ],
  },
  {
    name: "ListeningSession",
    fields: ["startedAt", "durationSeconds (accumulates while playing)", "endedAt"],
  },
];

export default function Home() {
  return (
    <div>
      <div className="container">
        <header className="topbar">
          <div className="brand">
            <Image
              src="/images/AppIcon.png"
              alt="ABPlayer Lite"
              width={42}
              height={42}
              priority
            />
            <div>
              <div className="brand-name">ABPlayer Lite</div>
              <div className="brand-sub">A-B Loop · Local MP3</div>
            </div>
          </div>
          <div className="top-actions">
            <Link className="btn ghost" href="#features">
              Features
            </Link>
            <Link className="btn ghost" href="#shortcuts">
              Shortcuts
            </Link>
            <Link
              className="btn ghost"
              href="https://github.com/iHugo-Tang/ABPlayer"
              target="_blank"
              rel="noreferrer"
            >
              Source code
            </Link>
            <Link
              className="btn primary"
              href="https://github.com/iHugo-Tang/ABPlayer/releases"
              target="_blank"
              rel="noreferrer"
            >
              Download release
            </Link>
          </div>
        </header>

        <main>
          <section className="hero" id="top">
            <div>
              <div className="eyebrow">A-B Loop practice · macOS</div>
              <h1>Import, mark, and loop to polish every MP3 phrase.</h1>
              <p className="muted">
                Built for language learning, phrase drills, and shadowing. Import a single file, mark
                with hotkeys, resume progress and segments after exit, and accumulate practice time
                in real time.
              </p>
              <div className="cta-row">
                <Link
                  className="btn primary"
                  href="https://github.com/iHugo-Tang/ABPlayer/releases"
                  target="_blank"
                  rel="noreferrer"
                >
                  Download latest version (GitHub Releases)
                </Link>
                <Link className="btn ghost" href="#preview">
                  View UI preview
                </Link>
              </div>
              <div className="pill-row">
                <span className="pill">Remember last file</span>
                <span className="pill">Hotkeys</span>
                <span className="pill">Track practice time</span>
              </div>
            </div>

            <div id="preview">
              <div className="preview-frame">
                <Image
                  src="/images/preview.png"
                  alt="ABPlayer Lite preview"
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  priority
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="preview-caption">
                <span className="pill">A-B Loop practice</span>
                <span className="muted">Segment list, session time, and progress at a glance</span>
              </div>
            </div>
          </section>

          <section id="features" className="section">
            <div className="section-head">
              <h2>Core features</h2>
              <p className="muted">From the PRD: import, mark, loop, manage, and persist.</p>
            </div>
            <div className="grid features-grid">
              {features.map((feature) => (
                <div className="card" key={feature.title}>
                  <h3>{feature.title}</h3>
                  <p className="muted">{feature.desc}</p>
                  <ul className="bullet">
                    {feature.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section id="flows" className="section">
            <div className="section-head">
              <h2>Key flows</h2>
            </div>
            <div className="flow-chart">
              {flowNodes.map((node, idx) => (
                <div className="flow-node" key={node.title}>
                  <div className="flow-index">{idx + 1}</div>
                  <h3>{node.title}</h3>
                  <p>{node.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="shortcuts" className="section">
            <div className="section-head">
              <h2>Shortcuts & actions</h2>
              <p className="muted">Build A-B loops into muscle memory.</p>
            </div>
            <div className="keys shortcuts-grid">
              {shortcuts.map((item) => (
                <div className="key-card" key={item.label}>
                  <div className="muted">{item.label}</div>
                  <div>
                    {item.keys.map((key) => (
                      <span className="keycap" key={key}>
                        {key}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="download" className="section">
            <div className="card cta-card">
              <div className="eyebrow">Ready for practice</div>
              <h2 style={{ margin: "6px 0" }}>Download & open source</h2>
              <p className="muted">
                Native macOS experience with single-file import, precise A-B markers, reusable
                segments, and session timing. Stay focused on sound, not UI.
              </p>
              <div className="cta-row">
                <Link
                  className="btn primary"
                  href="https://github.com/iHugo-Tang/ABPlayer/releases"
                  target="_blank"
                  rel="noreferrer"
                >
                  Get it on GitHub Releases
                </Link>
                <Link
                  className="btn ghost"
                  href="https://github.com/iHugo-Tang/ABPlayer"
                  target="_blank"
                  rel="noreferrer"
                >
                  View source code
                </Link>
              </div>
              <div className="meta-row">
                <span className="pill">macOS 14+</span>
                <span className="pill">SwiftUI · SwiftData · AVPlayer</span>
                <span className="pill">MP3 only · single window</span>
                <span className="pill">Open source: GitHub / Releases</span>
              </div>
            </div>
          </section>
        </main>

        <footer>
          ABPlayer Lite · A-B loop practice tool · Version 0.0.1 (nightly-202512050245).
        </footer>
      </div>
    </div>
  );
}
