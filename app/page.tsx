import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "音频导入与恢复",
    desc: "单 MP3，安全书签，重启即回到上次。",
    points: [
      "文件选择器 + 书签存储",
      "启动自动恢复上次文件",
      "导入失败即时提示",
    ],
  },
  {
    title: "精准 A-B 循环",
    desc: "x / c / v 标记，B 必须晚于 A。",
    points: [
      "x 设 A，c 设 B，v 清除",
      "到 B 自动回 A 循环",
      "滑杆拖动并显示进度",
    ],
  },
  {
    title: "片段管理",
    desc: "存片段、去重、排序、重排索引。",
    points: [
      "A-B 一键存，标签递增",
      "重复起止自动去重",
      "按起点升/降序，左右箭头跳段",
    ],
  },
  {
    title: "播放控制",
    desc: "流畅播放与跳转。",
    points: [
      "播放/暂停，后退 5s / 前进 10s",
      "退出前保存 lastPlaybackTime",
      "选片段可自动播放",
    ],
  },
  {
    title: "练习时长",
    desc: "只在播放时计时，自动持久化。",
    points: [
      "播放中累秒并显示 Session",
      "每 5s 与退出时写入",
      "便于统计练习投入",
    ],
  },
  {
    title: "平台与版本信息",
    desc: "macOS 原生 + 透明版本号。",
    points: [
      "SwiftUI + SwiftData + AVPlayer",
      "显示版本与构建号",
      "单窗口，专注单 MP3",
    ],
  },
];

const flowNodes = [
  { title: "启动恢复", desc: "自动加载上次 MP3、进度与片段" },
  { title: "导入 MP3", desc: "安全书签保存，失败即时提示" },
  { title: "设置 A/B", desc: "x / c / v，验证 B > A" },
  { title: "循环练习", desc: "到 B 自动回 A，滑杆可跳转" },
  { title: "保存片段", desc: "去重、排序、左右箭头切换" },
  { title: "退出持久化", desc: "进度与 Session 时长自动落盘" },
];

const shortcuts = [
  { keys: ["X"], label: "设置 A 点" },
  { keys: ["C"], label: "设置 B 点" },
  { keys: ["V"], label: "清除 A/B" },
  { keys: ["←"], label: "上一段" },
  { keys: ["→"], label: "下一段" },
  { keys: ["Space"], label: "播放 / 暂停" },
  { keys: ["⌘", "O"], label: "导入 MP3" },
  { keys: ["f", "5s"], label: "后退 5 秒" },
  { keys: ["g", "10s"], label: "前进 10 秒" },
];

const dataModels = [
  {
    name: "AudioFile",
    fields: [
      "displayName",
      "bookmarkData（安全范围存储）",
      "createdAt",
      "segments: LoopSegment[]",
      "lastPlaybackTime: Double",
    ],
  },
  {
    name: "LoopSegment",
    fields: [
      "label（自动递增）",
      "startTime / endTime（去重相同起止）",
      "index（删除后重新编号）",
      "createdAt",
      "audioFile（关联）",
    ],
  },
  {
    name: "ListeningSession",
    fields: ["startedAt", "durationSeconds（播放中累加）", "endedAt"],
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
              <div className="brand-sub">A-B Loop · 本地 MP3</div>
            </div>
          </div>
          <div className="top-actions">
            <Link className="btn ghost" href="#features">
              产品特性
            </Link>
            <Link className="btn ghost" href="#shortcuts">
              快捷键
            </Link>
            <Link
              className="btn ghost"
              href="https://github.com/iHugo-Tang/ABPlayer"
              target="_blank"
              rel="noreferrer"
            >
              开源仓库
            </Link>
            <Link
              className="btn primary"
              href="https://github.com/iHugo-Tang/ABPlayer/releases"
              target="_blank"
              rel="noreferrer"
            >
              下载 Release
            </Link>
          </div>
        </header>

        <main>
          <section className="hero" id="top">
            <div>
              <div className="eyebrow">A-B Loop practice · macOS</div>
              <h1>导入、标记、循环，打磨每一句 MP3 片段。</h1>
              <p className="muted">
                专为语言学习、短语操练、听力跟读而生的 A-B 循环工具。
                单文件导入、快捷键标记，退出后自动恢复进度与片段，练习时长实时累积。
              </p>
              <div className="cta-row">
                <Link
                  className="btn primary"
                  href="https://github.com/iHugo-Tang/ABPlayer/releases"
                  target="_blank"
                  rel="noreferrer"
                >
                  下载最新版本（GitHub Releases）
                </Link>
                <Link className="btn ghost" href="#preview">
                  查看界面预览
                </Link>
              </div>
              <div className="pill-row">
                <span className="pill">记住上次文件</span>
                <span className="pill">快捷键</span>
                <span className="pill">记录练习时长</span>
              </div>
            </div>

            <div id="preview">
              <div className="preview-frame">
                <Image
                  src="/images/preview.png"
                  alt="ABPlayer Lite 预览界面"
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  priority
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="preview-caption">
                <span className="pill">A-B Loop 练习</span>
                <span className="muted">
                  段落列表、Session 时长与进度一目了然
                </span>
              </div>
            </div>
          </section>

          <section id="features" className="section">
            <div className="section-head">
              <h2>核心功能</h2>
              <p className="muted">摘自 PRD：导入、标记、循环、管理与持久化。</p>
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
              <h2>关键流程</h2>
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
              <h2>快捷键与操作</h2>
              <p className="muted">将 A-B 循环变成肌肉记忆。</p>
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
              <h2 style={{ margin: "6px 0" }}>下载与开源</h2>
              <p className="muted">
                macOS 原生体验，单文件导入、精准 A-B 标记、片段复用与 Session
                计时。专注把每一次练习时间花在声音上，而不是界面上。
              </p>
              <div className="cta-row">
                <Link
                  className="btn primary"
                  href="https://github.com/iHugo-Tang/ABPlayer/releases"
                  target="_blank"
                  rel="noreferrer"
                >
                  前往下载（GitHub Releases）
                </Link>
                <Link
                  className="btn ghost"
                  href="https://github.com/iHugo-Tang/ABPlayer"
                  target="_blank"
                  rel="noreferrer"
                >
                  查看开源代码
                </Link>
              </div>
              <div className="meta-row">
                <span className="pill">macOS 14+</span>
                <span className="pill">SwiftUI · SwiftData · AVPlayer</span>
                <span className="pill">仅 MP3 · 单窗口</span>
                <span className="pill">开源：GitHub / Releases</span>
              </div>
            </div>
          </section>
        </main>

        <footer>
          ABPlayer Lite · A-B Loop 练习工具 · Version 0.0.1
          （nightly-202512050245）。
        </footer>
      </div>
    </div>
  );
}
