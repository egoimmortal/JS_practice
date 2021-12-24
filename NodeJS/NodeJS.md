# Node.js

Windows環境
開啟VSC，然後到要安裝的目錄
開啟Terminal，輸入CMD
輸入npm init(前提要先安裝好node.js)，會產生package.json檔案

```
{
  "name": "nodejs",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

在Terminal輸入 "node 檔案名稱"，就可以執行該程式，通常預設使用index.js
可以藉由輸入 npm run test 來呼叫"scripts"的"test"的事情，如果將test的內容更改為 node 路徑 + \\ + index.js，那麼只要輸入npm run test 就會執行index.js檔案了

## Excel

### Install
npm install xlsx

### Use

```
var xlsx = require("xlsx");

//新增活頁簿
let workbook = xlsx.utils.book_new();
//活頁簿頁籤名稱
let new_ws_name = "SheetJS";
//活頁簿內容
let ws_data = [
    ["S", "h", "e", "e", "t", "J", "S"],
    [1, 2, 3, 4, 5]
];

//生成活頁表
let ws = xlsx.utils.aoa_to_sheet(ws_data);
//將活頁表新增進活頁簿
xlsx.utils.book_append_sheet(workbook, ws, new_ws_name);

//將活頁簿寫進生成的excel中，如果只有空的活頁簿就使用寫入的話將會報錯，活頁簿內必須要有活頁表
xlsx.writeFile(workbook, __dirname + path.sep + 'out.xlsx');
```