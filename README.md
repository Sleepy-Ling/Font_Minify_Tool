# Font_Minify_Tool

#### description
A tool for minifying the size of ttf files base on characters appearing in excel.

#### Prepare
1. download or update the module packages.
```
npm i
```
2. drop the ttf files into folder: "src/fonts" or you can change the path as you wish in index.js by changing "FONT_PATH" and "FONT_PACKAGE_NAME" param.
3. drop the excel file into folder: "src/excel" or you can change the path as you wish in index.js by changing "EXCEL_PATH" and "EXCEL_FILE_NAME" param.

#### Usage
start minifying
```
npm run start
```

#### Explanation
All the following  param can be found in index.js.

```
EXCEL_PATH ： Directory for storing excel.
Default value : "./src/excel/"

EXCEL_FILE_NAME : A excel file name.The content of this excel will provide all characters.Then the tool will minify the target ttf file basing on the characters.
Default value : "xxx.xlsx"  ps:You have to change.

EXCEL_SHEET_INDEX : Specify the sheet index of target excel.
Default value : 1

FONT_PATH : Directory for storing ttf.
Default value : "./src/fonts/"

FONT_PACKAGE_NAME : The files are ready to be minified.
Default value : "./src/fonts/"
```
