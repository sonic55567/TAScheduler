var str = "[ 4 ]1-2 , [3] 2- A";
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

var arr = new Array(112);
for(i=0;i<=112;i++) {
    arr[i] = 0;
}

// ignore space
cut = str.split(" ");
str = "";
console.log(timeTable["N"]);
for(i in cut){
    str = str.concat(cut[i]);
}
console.log(str);

// cut base on ","
cut = str.split(",");
console.log(cut);
timeArray = cut;

// parse time string
for(i in timeArray) {
    console.log(timeArray[i]);
    if(timeArray[i].charAt(0) == "[" && timeArray[i].charAt(2) == "]" && timeArray[i].charAt(4) == "-") {
        var weekDay = parseInt(timeArray[i].charAt(1), 10);
        var time1 = timeTable[timeArray[i].charAt(3)];
        var time2 = timeTable[timeArray[i].charAt(5)];
        console.log(time1);
        console.log(time2);

        for(j=time1+(16*(weekDay-1));j<=time2+(16*(weekDay-1));j++) {
            arr[j] = 1;
            console.log("add!");
        }
    }
    // wrong format
    else {
        alert("節次格式錯誤");
    }
}
for (i in arr) {
    console.log(i + ":");
    console.log(arr[i]);
}

function isWorkable(a, b) {
    // a : TA ; b : class
    for(i in b) {
        if(b[i] == 1) {
            if(a[i] != 1) {
                return false;
            }
        }
    }
    return true;
}

console.log("helloworld");
stt = "helloworld";
console.log(stt.charAt(2));
stt[2] = 'a'
console.log(stt);

sss = [0,0,0,1,1,1,0,0,0,0];
aaa = [0,0,1,1,1,0,0,0,0,0];
console.log(sss);
console.log(aaa);
console.log(isWorkable(sss,aaa));
console.log(sss);
console.log(aaa);