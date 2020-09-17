function reformatTA(data) {
    for(i=0;i<data[sheet].length;i++) {
        TAArray[0].push(data[sheet][i][key1]);
        TAArray[1].push(data[sheet][i][key2]);
        TATimeArray.push(new Array(112));
        // initialize parse table
        for(j=0;j<=112;j++) {
            TATimeArray[i][j] = 0;
        }
    }
}

function reformatClass(data) {
    for(i=0;i<data[sheet].length;i++) {
        classArray[0].push(data[sheet][i][key1]);
        classArray[1].push(data[sheet][i][key2]);
        classTimeArray.push(new Array(112));
        // initialize parse table
        for(j=0;j<=112;j++) {
            classTimeArray[i][j] = 0;
        }
    }
}

function test() {
    if(!TAFile.files[0] || !classFile.files[0]) {
        alert("請先選取檔案");
        return;
    }
}

function parseTime() {
    // 建一個dict對應節數
    var timeTable = {
        "0" : 0,
        "1" : 1,
        "2" : 2,
        "3" : 3,
        "4" : 4,
        "N" : 5,
        "5" : 6,
        "6" : 7,
        "7" : 8,
        "8" : 9,
        "9" : 10,
        "A" : 11,
        "B" : 12,
        "C" : 13,
        "D" : 14,
        "E" : 15
    }
    // It's TA Time!!
    for(count in TAArray[1]) {
        str = TAArray[1][count]
        // ignore space
        cut = str.split(" ");
        str = "";
        for(i in cut){
            str = str.concat(cut[i]);
        }

        // cut base on ","
        cut = str.split(",");
        console.log(cut);
        timeArray = cut;

        // parse time string
        for(i in timeArray) {
            console.log(timeArray[i]);
            // 只有一節
            if(timeArray[i].length == 4) { 
                var weekDay = parseInt(timeArray[i].charAt(1), 10);
                var time1 = timeTable[timeArray[i].charAt(3)];
                var time2 = timeTable[timeArray[i].charAt(3)];
                for(j=time1+(16*(weekDay-1));j<=time2+(16*(weekDay-1));j++) {
                    classTimeArray[count][j] = 1;
                    console.log("add!");
                }

                console.log("one!");
            }
            else if(timeArray[i].charAt(0) == "[" && timeArray[i].charAt(2) == "]" && timeArray[i].charAt(4) == "-") {
                var weekDay = parseInt(timeArray[i].charAt(1), 10);
                var time1 = timeTable[timeArray[i].charAt(3)];
                var time2 = timeTable[timeArray[i].charAt(5)];
                for(j=time1+(16*(weekDay-1));j<=time2+(16*(weekDay-1));j++) {
                    TATimeArray[count][j] = 1;
                    console.log("add!");
                }
            }
            // wrong format
            else {
                alert("TA班表格式錯誤, 第" + count + "筆資料");
                break;
            }
        }
    }

    // Next, Class!!
    for(count in classArray[1]) {
        str = classArray[1][count]
        // ignore space
        cut = str.split(" ");
        str = "";
        for(i in cut){
            str = str.concat(cut[i]);
        }

        // cut base on ","
        cut = str.split(",");
        console.log(cut);
        timeArray = cut;

        // parse time string
        for(i in timeArray) {
            console.log(timeArray[i]);
            // 只有一節
            if(timeArray[i].length == 4) { 
                var weekDay = parseInt(timeArray[i].charAt(1), 10);
                var time1 = timeTable[timeArray[i].charAt(3)];
                var time2 = timeTable[timeArray[i].charAt(3)];
                for(j=time1+(16*(weekDay-1))-0;j<=time2+(16*(weekDay-1))+0;j++) {
                    classTimeArray[count][j] = 1;
                }
            }
            else if(timeArray[i].charAt(0) == "[" && timeArray[i].charAt(2) == "]" && timeArray[i].charAt(4) == "-") {
                var weekDay = parseInt(timeArray[i].charAt(1), 10);
                var time1 = timeTable[timeArray[i].charAt(3)];
                var time2 = timeTable[timeArray[i].charAt(5)];
                for(j=time1+(16*(weekDay-1))-0;j<=time2+(16*(weekDay-1))+0;j++) {
                    classTimeArray[count][j] = 1;
                }
            }
            
            // wrong format
            else {
                alert("課程班表格式錯誤, 第" + count + "筆資料");
                break;
            }
        }
    }
    
}

function isWorkable(a, b) {
    // a : TA ; b : class
    for(index=0;index<b.length;index++) {
        if(b[index] == 1) {
            if(a[index] != 1) {
                return false;
            }
        }
    }
    return true;
}

function outputFile() {
    outputData.push(new Array());
    outputData[0].push("名字");
    outputData[0].push("節次");
    outputData[0].push("可配對課程名稱");
    outputData[0].push("課程節次");
    //outputData.push(new Array());
    console.log(TATimeArray.length);
    console.log(TATimeArray[0]);
    if(isWorkable(TATimeArray[0], classTimeArray[2])) {
        console.log("c c ");
    }
    console.log(TATimeArray[0]);
    for(i=0;i<TATimeArray.length;i++) {
        // output TA's info
        outputData.push([]);

        outputData[parseInt(i)+1].push(TAArray[0][parseInt(i)]);
        outputData[parseInt(i)+1].push(TAArray[1][parseInt(i)]);
        
        // search candidates
        
        for(j=0;j<classTimeArray.length;j++) {
            console.log("here");
            console.log(i);
            console.log(j);
            if(isWorkable(TATimeArray[i], classTimeArray[j])) {
                console.log("in if");
                outputData[parseInt(i)+1].push(classArray[0][parseInt(j)]);
                outputData[parseInt(i)+1].push(classArray[1][parseInt(j)]);
            }
        }
    }

    alert("檔案已可下載！")
}
