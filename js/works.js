/*
  作品資料清單
  新增作品:複製下面任一筆 { ... },改文字、改圖片檔名即可。
  圖片放在 images/full/(大圖)和 images/thumb/(縮圖),兩邊檔名要相同。

  每件作品可以有多個「版本」(versions),type 可用:
    original  原稿
    carved    木刻作品
    mounted   裝裱成品
    mockup    效果示意(會自動標示「非實際成品」)
  version 的順序就是顯示順序,第一個會當作牆面上的封面。
*/
window.SITE = {
  teacher: "洪崇猛",
  courtesy: "子寬",
  studio: "勉齋書法教室",
  links: {
    youtube: "https://www.youtube.com/@zikuan.caligraphy",
    facebook: "https://www.facebook.com/share/16uj8rfAd9/",
    map: "https://maps.app.goo.gl/7oSth86F2hMCGLrWA?g_st=il"
  }
};

window.WORKS = [
  {
    id: "zhu-tingyu",
    title: "朱庭玉句",
    style: "行書",
    text: "",
    versions: [
      { type: "original", label: "原稿", file: "zhu-tingyu-original.jpg" },
      { type: "carved", label: "木刻示意", file: "zhu-tingyu-wood.jpg" }
    ]
  },
  {
    id: "li-shangyin",
    title: "李商隱〈無題〉句",
    style: "行書",
    text: "昨夜星辰昨夜風,畫樓西畔桂堂東。身無彩鳳雙飛翼,心有靈犀一點通。隔座送鉤春酒暖,分曹射覆蠟燈紅。嗟余聽鼓應官去,走馬蘭臺類轉蓬。",
    versions: [
      { type: "carved", label: "木刻示意", file: "li-shangyin-wood.jpg" }
    ]
  },
  {
    id: "caigentan-jing",
    title: "菜根譚・從靜中觀物動",
    style: "行書",
    text: "從靜中觀物動,向閒處看人忙,才得超塵脫俗的趣味;遇忙處會偷閒,處閒中能取靜,便是安身立命的工夫。",
    versions: [
      { type: "mounted", label: "掛軸示意", file: "caigentan-scroll.jpg" }
    ]
  },
  {
    id: "caigentan-jinyu",
    title: "菜根譚・欲做精金美玉",
    style: "行書",
    text: "欲做精金美玉的人品,定從烈火中煅來;思立揭天的事功,須向薄冰上履過。",
    versions: [
      { type: "mockup", label: "裱框示意", file: "caigentan-jinyu-mockup.jpg" }
    ]
  },
  {
    id: "caigentan-stone",
    title: "菜根譚・車爭險道",
    style: "行書",
    text: "車爭險道,馬騁先鞭,到敗處未免噬臍;眾喜堆山,金誇過斗,臨行時還是空手。",
    versions: [
      { type: "mockup", label: "石碑示意", file: "caigentan-stone-mockup.jpg" }
    ]
  }
];
