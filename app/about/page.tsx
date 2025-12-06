import Link from "next/link";

export default function About() {
  return (
    <div className="container narrow">
      <div className="card">
        <div className="eyebrow">About ABPlayer Lite</div>
        <h1 style={{ marginTop: 0, marginBottom: 12 }}>
          A focused macOS tool for A-B loop practice
        </h1>
        <p className="muted">
          Built for MP3 practice: import audio, mark A/B points, loop playback, save segments, and
          track practice time. Built with SwiftUI + SwiftData + AVPlayer to keep a minimal
          black-and-white single-window experience.
        </p>
        <ul className="bullet" style={{ marginTop: 12 }}>
          <li>Automatically remembers last playback position</li>
          <li>Hotkeys for fast A/B marking</li>
          <li>One-click segment saving and reuse</li>
          <li>Session timer to track practice volume</li>
        </ul>
        <div className="cta-row" style={{ marginTop: 18 }}>
          <Link className="btn primary" href="/">
            Back to home
          </Link>
          <Link className="btn ghost" href="/#features">
            View core features
          </Link>
        </div>
      </div>
    </div>
  );
}
