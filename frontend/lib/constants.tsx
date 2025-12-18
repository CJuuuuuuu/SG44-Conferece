"use client";
import { ConferenceInfo, NewsItem, TimelineEvent, Topic } from "./types";

const serverData = (window as any).WAGTAIL_DATA;

export const CONFERENCE_INFO: ConferenceInfo = serverData?.info || {
  title: "第四十四屆測量及空間資訊研討會",
  subtitle: "SG44 Conference on Surveying and Geomatics",
  theme: "智測國土 X 韌啟未來",
  themeEn: "Smart Surveying of National Land, Resilient Future",
  date: "115年 8月 20日 (四) - 21日 (五)",
  location: "國立政治大學 法學院",
  organizer: "國立政治大學 地政學系",
};

export const NEWS_DATA: NewsItem[] = serverData?.news || [
  {
    id: 1,
    date: "114-12-15",
    category: "重要公告",
    title: "第四十四屆測量與空間資訊研討會 ─ 第一次籌備會通知",
    content: `第四十四屆測量與空間資訊研討會
第一次籌備會通知

主辦單位：國立政治大學地政學系

【籌備會組織】
召集人：甯方璽 教授
主辦人員：
• 詹進發 教授
• 林士淵 教授
• 邱式鴻 教授
• 范噶色 副教授
• 蕭文斌 行政專員
聯絡人：李泱儒 博士生
E-mail：sg44@nccu.edu.tw

【會議資訊】
• 會議時間：中華民國一一四年十二月三十日（星期二）下午 2 時整
• 會議方式：視訊會議（報名後將以電子郵件寄送連結）

【重要事項】
一、報名期限
    請於中華民國一一四年十二月二十六日（星期五）中午 12 時前，完成 Google 表單線上報名。
二、會議連結通知
    大會將於中華民國一一四年十二月三十日（星期二）上午 11 時前，以電子郵件寄送視訊會議連結，請準時上線參與討論。
三、聯絡方式
    若有任何問題，請透過以下方式聯繫：
    • E-mail：sg44@nccu.edu.tw（李泱儒 博士生）
    • 電話：02-2939-3091 分機 50641（蕭文斌 行政專員）`,
  },
];

export const TIMELINE_DATA: TimelineEvent[] = serverData?.timeline || [
  { date: "114/12/30", title: "第一次籌備會議", isPast: false },
  { date: "115/04/01", title: "公告及開放早鳥報名", isPast: false },
  { date: "115/06/30", title: "文章投稿截止", isPast: false },
  { date: "115/07/18", title: "論文審查結果公告", isPast: false },
  { date: "115/08/20", title: "SG44 研討會開幕", isPast: false },
];

export const TOPICS_DATA: Topic[] = [
  {
    id: "t1",
    title: "大地測量與導航技術",
    description: "衛星定位、重力測量、導航演算法與應用。",
    iconName: "Map",
  },
  {
    id: "t2",
    title: "車載測繪與室內定位",
    description: "行動測繪系統(MMS)、室內圖資建置與定位技術。",
    iconName: "Zap",
  },
  {
    id: "t3",
    title: "無人載具與災害調查",
    description: "UAV 應用於地形監測、災情判別與風險管理。",
    iconName: "Shield",
  },
  {
    id: "t4",
    title: "攝影測量與測繪管理",
    description: "數位攝影測量、影像匹配與測繪法規標準管理。",
    iconName: "Database",
  },
  {
    id: "t5",
    title: "智慧科技與跨域應用",
    description: "空間資訊與智慧城市、物聯網及交通之整合應用。",
    iconName: "Cpu",
  },
  {
    id: "t6",
    title: "數位城市與資訊服務",
    description: "3D 城市建模、數位孿生與空間數據服務平台。",
    iconName: "Globe",
  },
  {
    id: "t7",
    title: "環境永續與韌性防災",
    description: "空間資訊技術在氣候變遷與永續發展之應用。",
    iconName: "Shield",
  },
  {
    id: "t8",
    title: "衛星遙測與海洋測繪",
    description: "多光譜衛星影像分析、水下地形與海岸變遷。",
    iconName: "Database",
  },
  {
    id: "t9",
    title: "國土政策與規劃治理",
    description: "空間資訊支援國土計畫、城鄉發展與土地管理。",
    iconName: "Map",
  },
  {
    id: "t10",
    title: "International Session",
    description: "Cross-Cutting International Research and Case Studies.",
    iconName: "Globe",
  },
];

export const AI_SYSTEM_INSTRUCTION = `
你是一位專業的 SG44 研討會助理。你的任務是回答關於「第四十四屆測量及空間資訊研討會」的問題。
研討會主題：智測國土 X 韌啟未來。
主辦單位：國立政治大學地政學系。
研討會日期：115年8月20日(四)至21日(五)。
地點：國立政治大學 法學院。
開幕時間：115年8月20日 10:00。
徵稿主題共有 10 項子題。
目前最新公告：114年12月30日(二) 14:00 將召開第一次籌備會議。
聯絡信箱：sg44@nccu.edu.tw。
請保持專業、禮貌且簡潔的口吻。
`;
