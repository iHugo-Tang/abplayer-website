import Link from "next/link";

export default function About() {
  return (
    <div className="container narrow">
      <div className="card">
        <div className="eyebrow">About ABPlayer Lite</div>
        <h1 style={{ marginTop: 0, marginBottom: 12 }}>
          专注 A-B 循环练习的 macOS 小工具
        </h1>
        <p className="muted">
          为 MP3 练习场景而生：导入音频、标记 A/B 点、循环播放、保存片段并记录练习时长。
          基于 SwiftUI + SwiftData + AVPlayer 打造，保持黑白极简的单窗口体验。
        </p>
        <ul className="bullet" style={{ marginTop: 12 }}>
          <li>自动记住上次播放进度</li>
          <li>快捷键快速设置 A/B 点</li>
          <li>片段一键保存与复用</li>
          <li>Session 计时，追踪练习量</li>
        </ul>
        <div className="cta-row" style={{ marginTop: 18 }}>
          <Link className="btn primary" href="/">
            返回首页
          </Link>
          <Link className="btn ghost" href="/#features">
            查看核心功能
          </Link>
        </div>
      </div>
    </div>
  );
}
