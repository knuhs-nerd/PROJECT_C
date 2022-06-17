async function signin() {
    const url = "/account/back/signin";

    try {
        if (!ENCRYPT || !XHR) {
            alert(5)
            alert("오류.\n잠시후 다시 시도해주세요.");
            return false;
        }
    }catch(e) {
        alert(e);
    }

    let req, en, id, pw;
    
    en = new ENCRYPT();
    id = document.querySelector("#id").value;
    pw = await en.encrypt(document.querySelector("#pw").value, 'signin');

    try {
        req = await new XHR(url)
            .data("id", id)
            .data("pw", pw)
            .post();
    }catch(e) {
        alert("오류\n잠시후 다시 시도해주세요.");
        console.log(e);
        return false;
    }

    let data = JSON.parse(req.text);

    if (data.status != "success") {
        alert("아이디 또는 비밀번호가 틀렸습니다.");
        return false;
    }else {
        location.href = "/";
        return true;
    }
}

window.addEventListener("load", function() {
    document.querySelector("#form").addEventListener("keydown", function() {
        if (event.keyCode == 13) {
            signin();
        }
    });
});