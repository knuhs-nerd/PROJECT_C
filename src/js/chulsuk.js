function getCookie(key) {
    let cookies = document.cookie.split("; ");

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].split("=");

        if (cookie[0] == key) {
            return cookie[1];
        }
    }

    return null;
}

function putCookie(key, value) {
    document.cookie += `${key}=${value};`;
}

const sess_name = getCookie("JOBAR_SESS");

async function chulsuk() {
    let id = document.querySelector(".number").value;

    document.querySelector(".number").value = "";
    
    let req = await new XHR("/src/php/chulsuk")
        .data("id", id)
        .post();

    if (req.status != 200) {
        alert("서버에서 오류가 발생했습니다.");
        return;
    }

    let data = JSON.parse(req.response);

    if (data.result != "success") {
        alert(data.message);
        return;
    }

    alert(data.message);
}

async function sess_check(deep=1) {
    if (deep > 10) return alert("missing session");

    let req  = await new XHR("/src/php/sess_check.php").post();

    //console.log(req.text, req.response, req.status);

    if (req.status != 200) {
        console.log("서버에서 오류가 발생했습니다.");
        return sess_check(deep+1);
    }

    if (req.response != "ok") {
        putCookie("JOBAR_SESS", sess_name);
        return sess_check(deep + 1);
    }
}

setInterval(sess_check, 1000 * 60 * 10);