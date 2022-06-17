window.addEventListener('load', function() {
    const list = document.querySelector('#user_list');

    this.window.denyUser = this.window.delUser = async function(id, t) {
        let req = await new XHR("/src/php/deny_user")
            .data("id", id)
            .post();

        if (req.status != 200) {
            alert("서버에 접속할 수 없습니다.\n잠시 후 다시 시도해주세요.");
            return;
        }

        let data = JSON.parse(req.text);

        if (data.result != "success") {
            alert("오류: " + data.message);
            return;
        }

        t.parentNode.parentNode.remove();
    };

    this.window.allowUser = async function(id, t) {
        let req = await new XHR("/src/php/allow_user")
            .data("id", id)
            .post();

        if (req.status != 200) {
            alert("서버에 접속할 수 없습니다.\n잠시 후 다시 시도해주세요.");
            return;
        }

        let data = JSON.parse(req.text);

        if (data.result != "success") {
            alert("오류: " + data.message);
            return;
        }

        let doc = t.parentNode;
        let d = doc.parentNode;
        let du = document.createElement("span");
        let dt = document.createElement("span");
        du.innerText = "계정삭제";
        dt.innerText = "팀삭제";
        du.classList.add("red", "cursor-pointer");
        dt.classList.add("red", "cursor-pointer");
        du.addEventListener("click", delUser);
        dt.addEventListener("click", delClass);
        doc.remove();
        doc = document.createElement("th");
        doc.width = "4%";
        doc.appendChild(du);
        doc.appendChild(getSpace());
        doc.appendChild(dt);
        d.appendChild(doc);
    };

    this.window.delClass = async function(id, t) {
        let req = await new XHR("/src/php/del_class")
            .data("id", id)
            .post();

        if (req.status != 200) {
            alert("서버에 접속할 수 없습니다.\n잠시 후 다시 시도해주세요.");
            return;
        }

        let data = JSON.parse(req.text);

        if (data.result != "success") {
            alert("오류: " + data.message);
            return;
        }

        let docs = [];
        for (let v of t.parentNode.parentNode.parentNode.children) {
            if (v.dataset.cls == id) {
                docs.push(v);
                //v.remove();
            }
        }
        //console.log(docs);
        docs.map(v => v.remove());
    };

    function getSpace() {
        let space = document.createElement("span");
        space.innerHTML = ' ';
        return space;
    }
});