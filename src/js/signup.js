async function signup(is_teacher = false) {
    const url = "/account/back/signup";

    if (!XHR || !ENCRYPT) {
        alert("ERROR");
        return false;
    }

    let req, en, id, pw, name;

    en = new ENCRYPT();
    id = document.querySelector("#id").value;
    pw = await en.encrypt(document.querySelector("#pw").value, "signup")
    name = document.querySelector("#name").value;
    cls = document.querySelector("#class").value;
    
    try {
        req = await new XHR(url)
            .data("id", id)
            .data("pw", pw)
            .data("name", name)
            .data("class", cls)
            .post();
    }catch(e) {
        alert("오류\n잠시후 다시 시도해주세요.")
        console.log(e);
        return false;
    }
    
    let data = JSON.parse(req.text);

    if (data.status != "success") {
        alert(data.message);
        return false;
    }else {
        location.href = "./signin";
        return true;
    }
}

window.addEventListener("load", function(event) {
    document.querySelector("#form").addEventListener("keydown", function() {
        console.log(event.keyCode);
        if (event.keyCode == 13) {
            signin();
        }
    });
})