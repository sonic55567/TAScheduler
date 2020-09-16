function reformatTA(data) {
    for(i=0;i<data[sheet].length;i++) {
        TAArray[0].push(data[sheet][i][key1]);
        TAArray[1].push(data[sheet][i][key2]);
    }
}

function reformatClass(data) {
    for(i=0;i<data[sheet].length;i++) {
        classArray[0].push(data[sheet][i][key1]);
        classArray[1].push(data[sheet][i][key2]);
    }
}

function test() {
    if(!TAFile.files[0] || !classFile.files[0]) {
        alert("請先選取檔案");
        return;
    }
}

function parseTime() {
    
}
