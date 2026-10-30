# 勉齋書法 作品展示網站

純靜態網站(HTML / CSS / JS),不需要後端,可以直接放到 GitHub Pages。

## 本機預覽
直接用瀏覽器開啟 `index.html` 即可(字型需要連網才會載入)。

## 放上 GitHub Pages
1. 在 GitHub 建立新的 repository(Public),例如 `calligraphy`
2. 用 GitHub Desktop 把這個資料夾的**全部內容**放進去,Commit 後按 Publish / Push
3. 到 repository 的 Settings → Pages → Source 選 `main` 分支、`/ (root)`,存檔
4. 等 1~3 分鐘,網址會是 `https://你的帳號.github.io/calligraphy/`

## 新增作品
1. 把圖片放進 `images/full/`(大圖,長邊約 1600px 以內)和 `images/thumb/`(縮圖,寬約 640px),兩邊檔名要相同
2. 打開 `js/works.js`,複製一筆作品資料,改標題、書體、釋文和圖片檔名
3. 同一件作品有多個版本(原稿、木刻、裝裱、示意),就在 `versions` 裡多加幾筆

版本類型 `type`:`original` 原稿、`carved` 木刻、`mounted` 裝裱、`mockup` 效果示意(會自動標示「非實際成品」)。

## 網站結構
- `index.html` 首頁與作品牆
- `about.html` 關於老師與聯絡方式
- `js/works.js` 作品資料(最常修改的檔案)
- `css/style.css` 外觀
