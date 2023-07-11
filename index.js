/**存放目标excel表格目录路径 */
const EXCEL_PATH = "./src/excel/";
/**目标excel 文件名  */
const EXCEL_FILE_NAME = "xxx.xlsx";
/**表单序号 */
const EXCEL_SHEET_INDEX = 1;

/**待处理文件夹 */
const FONT_PATH = "./src/fonts/";
/**待处理文本文件名 */
const FONT_PACKAGE_NAME = "*.ttf";

var XLSX = require("xlsx");

//读取某个配置表
var workbook = XLSX.readFile(`${EXCEL_PATH}${EXCEL_FILE_NAME}`, { type: "string" });

const sheet_name_list = workbook.SheetNames;
const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[EXCEL_SHEET_INDEX]]);

/**用来简单记录某个字符出现次数 */
var map = {};

console.log("=================== start process chars ===================");
console.time("record char");
var rowStart = 2;//从第几行开始，获取数据
for (let index = rowStart; index < data.length; index++) {
    const element = data[index];

    for (const char of JSON.stringify(element)) {
        let charCode = char.charCodeAt(0);

        map[charCode] = map[charCode] ? map[charCode] + 1 : 1;
    }


}

console.timeEnd("record char");

// console.log("map ->", map);

console.time("collect displaying char");

/**将要处理的文字 (不要手动修改) */
let collectStr = "";
for (const key in map) {
    if (Object.hasOwnProperty.call(map, key)) {
        const element = map[key];
        // console.log(`${String.fromCharCode(Number(key))}  ======> times:${element}`);

        collectStr += String.fromCharCode(Number(key));
    }
}
console.log(collectStr);

console.timeEnd("collect displaying char");

console.log("=================== finished process chars ===================");

console.log("=================== start minify font package ===================");
var Fontmin = require('fontmin');
var rename = require('gulp-rename');

console.time("minify");
var fontmin = new Fontmin()
    .src(`${FONT_PATH}${FONT_PACKAGE_NAME}`)
    .use(Fontmin.glyph({
        text: collectStr,
        hinting: false         // keep ttf hint info (fpgm, prep, cvt). default = true
    }))
    .use(rename(function (path) {
        console.log("rename =========>");
        console.log(path);

        return {
            dirname: path.dirname,
            basename: path.basename + "_mini",
            extname: ".ttf"
        }
    }))
    .dest('build/fonts');


fontmin.run(function (err, files) {
    if (err) {
        throw err;
    }

    console.log("=================== finished minify font package ===================");
    console.timeEnd("minify");
});