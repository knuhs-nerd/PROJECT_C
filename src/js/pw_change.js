let old_pw;

function fe() {
    if (event.keyCode == 13) {
        pw_check();
    }
}

async function pw_check() {
    let en = new ENCRYPT();
    let pw = document.querySelector(".text").value;
    let req = await new XHR("/src/php/pw_check")
        .data("pw", await en.encrypt(pw, 'pw_check'))
        .post();
        
    if (req.status != 200) {
        alert("서버 오류");
        return;
    }

    let data = JSON.parse(req.response);

    if (data.result != "success") {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }

    old_pw = pw;
    document.querySelector(".text").value = "";
    document.querySelector(".text").placeholder = "비밀번호를 입력하세요";
    document.querySelector(".container").removeEventListener("keydown", fe);
    document.querySelector(".container").addEventListener("keydown", function() {
        if (event.keyCode == 13) {
            pw_change();
        }
    });
}

async function pw_change() {
    let en = new ENCRYPT();
    let pw = document.querySelector(".text").value;
    let req = await new XHR("/src/php/pw_change")
        .data("pw", await en.encrypt(pw, 'pw_change'))
        .data("old", await en.encrypt(old_pw, 'pw_change_old'))
        .post();

    if (req.status != 200) {
        alert("서버 오류");
        return;
    }

    let data = JSON.parse(req.response);

    if (data.result != "success") {
        alert(data.message);
        return;
    }

    alert("비밀번호가 변경되었습니다.");
    location.href = "/";
}