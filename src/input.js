$(document).ready(function () {
      

    //綁定change事件，讀xlsx檔
    $('#upload_input').on('change', function (e) {

        //取得上傳第一個檔案
        var files = e.target.files;
        var f = files[0]; 

        //使用FileReader讀檔
        var reader = new FileReader();

        //檔案名稱
        var name = f.name;

        //onload觸發事件
        reader.onload = function (e) {

            //對象內資料
            var data = e.target.result;
            //讀取xlsx資料
            var retjson = readxlsx(data, 'json');
            var retcsv = readxlsx(data, 'csv');

            //顯示內容
            $('#upload_showjson').html(JSON.stringify(retjson, null, '\t'));
            $('#upload_showcsv').html(retcsv);

        };

        //以BinaryString讀入
        reader.readAsBinaryString(f);

    });

    $('#TAFile').on('change', function (e) {

        //取得上傳第一個檔案
        var files = e.target.files;
        var f = files[0]; 

        //使用FileReader讀檔
        var reader = new FileReader();

        //檔案名稱
        var name = f.name;

        //onload觸發事件
        reader.onload = function (e) {

            //對象內資料
            var data = e.target.result;
            //讀取xlsx資料
            var retjson = readxlsx(data, 'json');
            var retcsv = readxlsx(data, 'csv');
            TAJson = retjson;
            reformatTA(retjson);

        };

        //以BinaryString讀入
        reader.readAsBinaryString(f);

    });

    $('#classFile').on('change', function (e) {

        //取得上傳第一個檔案
        var files = e.target.files;
        var f = files[0]; 

        //使用FileReader讀檔
        var reader = new FileReader();

        //檔案名稱
        var name = f.name;

        //onload觸發事件
        reader.onload = function (e) {

            //對象內資料
            var data = e.target.result;
            //讀取xlsx資料
            var retjson = readxlsx(data, 'json');
            var retcsv = readxlsx(data, 'csv');
            classJson = retjson;
            reformatClass(retjson);
            
        };

        //以BinaryString讀入
        reader.readAsBinaryString(f);

    });

    $('#match').on('click', function () {
        parseTime();
        outputFile();
        classToTA();
        $('#showMessage').html("檔案已可下載！");
    });

    //綁定click事件，下載xlsx檔
    $('#download_button').on('click', function () {

        //檔名
        var filename = 'download.xlsx';

        //表名
        var sheetname = 'sheet1';

        //測試資料
        var data = [
            ['name', 'number', 'date'],
            ['abc', 1, new Date().toLocaleString()],
            ['def', 123.456, new Date('2015-03-25T13:30:12Z')],
        ];

        //下載
        downloadxlsx(filename, sheetname, outputData);


    })

    // class to TA
    $('#download_button2').on('click', function () {

        //檔名
        var filename = 'download.xlsx';

        //表名
        var sheetname = 'sheet1';

        //測試資料
        var data = [
            ['name', 'number', 'date'],
            ['abc', 1, new Date().toLocaleString()],
            ['def', 123.456, new Date('2015-03-25T13:30:12Z')],
        ];

        //下載
        downloadxlsx(filename, sheetname, outputClassToTA);


    })


});


function readxlsx(inpdata, fmt) {
    //讀取xlsx檔

    //參數
    //inpdata為由input file讀入之data
    //fmt為讀取格式，可有"json"或"csv"，csv格式之分欄符號為逗號，分行符號為[\n]

    //說明
    //所使用函式可參考js-xlsx的GitHub文件[https://github.com/SheetJS/js-xlsx]


    //to_json
    function to_json(workbook) {
        var result = {};
        sheetName = workbook.SheetNames[0] 
        sheet = sheetName;
        key1 = workbook.Sheets[sheetName]['A1'].v;
        key2 = workbook.Sheets[sheetName]['B1'].v;
        var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        if (roa.length > 0) {
            result[sheetName] = roa;
        }
        
        return result;
    }


    //to_csv
    function to_csv(workbook) {
        var result = [];
        workbook.SheetNames.forEach(function(sheetName) {
            var csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
            if(csv.length > 0){
                result.push('SHEET: ' + sheetName);
                result.push('\n');
                result.push(csv);
            }
        });
        return result;
    }


    //讀檔
    var workbook = XLSX.read(inpdata, { type: 'binary' });


    //轉為json物件回傳
    if (fmt === 'json') {
        return to_json(workbook);
    }
    else {
        return to_csv(workbook);
    }


}


function downloadxlsx(filename, sheetname, data) {
    //儲存xlsx檔

    //參數
    //filename為要下載儲存之xlsx檔名，，sheetname為資料表名，data為要下載之資料，需為二維陣列。以下為使用範例：
    //var filename = 'download.xlsx';
    //var sheetname = 'test';
    //var data = [
    //    ['name', 'number', 'date'],
    //    ['abc', 1, new Date().toLocaleString()],
    //    ['def', 123.456, new Date('2015-03-25T13:30:12Z')],
    //];
    //downloadxlsx(filename, sheetname, data);

    //說明
    //所使用函式可參考js-xlsx的GitHub文件[https://github.com/SheetJS/js-xlsx]


    //datenum
    function datenum(v, date1904) {
        if (date1904) v += 1462;
        var epoch = Date.parse(v);
        return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
    }


    //sheet_from_array_of_arrays
    function sheet_from_array_of_arrays(data, opts) {
        var ws = {};
        var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
        for (var R = 0; R != data.length; ++R) {
            for (var C = 0; C != data[R].length; ++C) {
                if (range.s.r > R) range.s.r = R;
                if (range.s.c > C) range.s.c = C;
                if (range.e.r < R) range.e.r = R;
                if (range.e.c < C) range.e.c = C;
                var cell = { v: data[R][C] };
                if (cell.v == null) continue;
                var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

                if (typeof cell.v === 'number') cell.t = 'n';
                else if (typeof cell.v === 'boolean') cell.t = 'b';
                else if (cell.v instanceof Date) {
                    cell.t = 'n'; cell.z = XLSX.SSF._table[14];
                    cell.v = datenum(cell.v);
                }
                else cell.t = 's';

                ws[cell_ref] = cell;
            }
        }
        if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
        return ws;
    }


    //s2ab
    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }


    //Workbook
    function Workbook() {
        if (!(this instanceof Workbook)) return new Workbook();
        this.SheetNames = [];
        this.Sheets = {};
    }


    //write
    var wb = new Workbook();
    var ws = sheet_from_array_of_arrays(data);
    wb.SheetNames.push(sheetname);
    wb.Sheets[sheetname] = ws;
    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });


    //saveAs
    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), filename)


}