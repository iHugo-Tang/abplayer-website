"use client";

import { useEffect, useState } from "react";

type Language = "zh" | "en";

const languageStorageKey = "abplayer-changelog-language";

const copy = {
  zh: {
    versionLabel: "Version",
    versionNumber: "0.4.12",
    title: "字典查询与单词管理",
    intro: "这个版本把词汇学习接入精听流程：遇到生词时可以直接查询，练习后也可以管理沉淀下来的单词。",
    unsupportedVideo: "当前浏览器不支持播放此视频。",
    languageLabel: "语言",
    updates: [
      {
        title: "安装字典，查询单词",
        video: "/0412/install_and_lookup_vocabulary.mp4",
        body: "安装本地字典后，可以在精听过程中直接查询单词，减少离开当前材料的次数。",
      },
      {
        title: "管理单词",
        video: "/0412/manage_vocabulary.mp4",
        body: "练习中积累的单词可以统一管理，方便之后回到对应语境复习。",
      },
    ],
  },
  en: {
    versionLabel: "Version",
    versionNumber: "0.4.12",
    title: "Dictionary Lookup and Vocabulary Management",
    intro:
      "This release brings vocabulary learning into focused listening: look up words while practicing, then manage the words you collect afterward.",
    unsupportedVideo: "Your browser does not support this video.",
    languageLabel: "Language",
    updates: [
      {
        title: "Install a dictionary and look up words",
        video: "/0412/install_and_lookup_vocabulary.mp4",
        body: "After installing a local dictionary, you can look up words directly during focused listening without leaving the current material.",
      },
      {
        title: "Manage vocabulary",
        video: "/0412/manage_vocabulary.mp4",
        body: "Words collected during practice can be managed in one place, making it easier to review them later with their original context.",
      },
    ],
  },
} satisfies Record<Language, {
  versionLabel: string;
  versionNumber: string;
  title: string;
  intro: string;
  unsupportedVideo: string;
  languageLabel: string;
  updates: Array<{ title: string; video: string; body: string }>;
}>;

function getDefaultLanguage(): Language {
  if (typeof window === "undefined") {
    return "zh";
  }

  const savedLanguage = window.localStorage.getItem(languageStorageKey);
  if (savedLanguage === "zh" || savedLanguage === "en") {
    return savedLanguage;
  }

  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  return languages.some((language) => language.toLowerCase().startsWith("zh")) ? "zh" : "en";
}

export default function Changelog0412() {
  const [language, setLanguage] = useState<Language>("zh");
  const content = copy[language];

  useEffect(() => {
    setLanguage(getDefaultLanguage());
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    window.localStorage.setItem(languageStorageKey, nextLanguage);
  }

  return (
    <main className="internal-changelog">
      <div className="internal-language" aria-label={content.languageLabel}>
        <button
          type="button"
          className={language === "zh" ? "active" : ""}
          aria-pressed={language === "zh"}
          onClick={() => changeLanguage("zh")}
        >
          中
        </button>
        <button
          type="button"
          className={language === "en" ? "active" : ""}
          aria-pressed={language === "en"}
          onClick={() => changeLanguage("en")}
        >
          EN
        </button>
      </div>

      <section className="internal-header">
        <div className="release-version-block">
          <span>{content.versionLabel}</span>
          <strong>{content.versionNumber}</strong>
        </div>
        <h1>{content.title}</h1>
        <p>{content.intro}</p>
      </section>

      <section className="internal-update-list">
        {content.updates.map((update) => (
          <article className="internal-update" key={update.title}>
            <div className="internal-copy">
              <h2>{update.title}</h2>
              <p>{update.body}</p>
            </div>
            <div className="internal-video">
              <video controls preload="metadata" playsInline>
                <source src={update.video} type="video/mp4" />
                {content.unsupportedVideo}
              </video>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
