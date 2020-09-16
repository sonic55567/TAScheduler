function test() {
    if(!TAFile.files[0] || !classFile.files[0]) {
        alert("請先選取檔案");
        return;
    }
    console.log(TAFile.files[0]['name']);
}
