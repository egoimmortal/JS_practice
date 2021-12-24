var fs = require("fs");
const path = require("path");
var xlsx = require("xlsx");

let workbook = xlsx.utils.book_new();
let new_ws_name = "SheetJS";
let ws_data = [
    ["S", "h", "e", "e", "t", "J", "S"],
    [1, 2, 3, 4, 5]
];
let ws = xlsx.utils.aoa_to_sheet(ws_data);
xlsx.utils.book_append_sheet(workbook, ws, new_ws_name);


xlsx.writeFile(workbook, __dirname + path.sep + 'out.xlsx');