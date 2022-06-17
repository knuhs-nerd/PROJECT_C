window.addEventListener('load', function() {
    const list = document.querySelector('#user_list');

    this.window.addUser = function(){
        let doc = document.createElement("tr");
        let id = document.createElement("th");
        let num = document.createElement("th");
        let name = document.createElement("th");
        let last = document.createElement("th");
        let manage = document.createElement("th");

        let num_int_field = document.createElement("input");
        let name_text_field = document.createElement("input");

        num_int_field.type = "number";
        num_int_field.value = "";
        num_int_field.min = 1;
        num_int_field.max = 999;

        name_text_field.type = "text";
        name_text_field.value = "";

        let ok = document.createElement("span");
        let del = document.createElement("span");
        ok.innerText = "완료";
        del.innerText = "취소";
        ok.classList.add("blue");
        del.classList.add("red");
        ok.classList.add("cursor-pointer");
        del.classList.add("cursor-pointer");
        ok.addEventListener('click', addUser_);
        del.addEventListener('click', addUserCancel);
        manage.appendChild(ok);
        manage.appendChild(getSpace());
        manage.appendChild(del);

        num.appendChild(num_int_field);
        name.appendChild(name_text_field);

        doc.appendChild(num);
        doc.appendChild(id);
        doc.appendChild(name);
        doc.appendChild(last);
        doc.appendChild(manage);

        list.insertBefore(doc, list.childNodes[list.childNodes.length - 2]);
    }

    this.window.addUserCancel = function(e) {
        e.target.parentNode.parentNode.remove();
    }

    this.window.addUser_ = async function(e) {
        let name, num;
        const data = e.target.parentNode.parentNode;

        num = data.childNodes[0].childNodes[0].value;
        name = data.childNodes[2].childNodes[0].value;

        if (num == "" || name == "") {
            alert("정보를 입력해주세요.");
            return;
        }

        let req = await new XHR("/src/php/add_user")
            .data("num", num)
            .data("name", name)
            .post();

        if (req.status != 200) {
            alert("서버에 접속할 수 없습니다.\n잠시 후 다시 시도해주세요.");
            return;
        }

        let data_ = JSON.parse(req.text);

        if (data_.result != "success") {
            alert("오류: " + data_.reason);
            return;
        }

        let doc = document.createElement("tr");
        let id = document.createElement("th");
        let num_ = document.createElement("th");
        let name_ = document.createElement("th");
        let last = document.createElement("th");
        let manage = document.createElement("th");

        num_.innerText = num;
        name_.innerText = name;
        id.innerText = data_.id;
        last.innerText = "정보없음";

        //let ma = document.createElement("span");
        let del = document.createElement("span");
        //ma.innerText = "수정";
        del.innerText = "삭제";
        //ma.classList.add("blue");
        del.classList.add("red");
        //ma.classList.add("cursor-pointer");
        del.classList.add("cursor-pointer");
        del.addEventListener('click', delUser);
        //manage.appendChild(ma);
        manage.appendChild(getSpace());
        manage.appendChild(del);

        doc.appendChild(num_);
        doc.appendChild(id);
        doc.appendChild(name_);
        doc.appendChild(last);
        doc.appendChild(manage);

        data.parentNode.replaceChild(doc, data);
    }

    this.window.delUser = async function(e) {
        let num = e.target.parentNode.parentNode.children[0].innerText;

        let req = await new XHR("/src/php/del_user")
            .data("num", Number(num))
            .post();

        if (req.status != 200) {
            alert("서버에 접속할 수 없습니다.\n잠시 후 다시 시도해주세요.");
            return;
        }

        let data_ = JSON.parse(req.text);

        if (data_.result != "success") {
            alert("오류: " + data_.reason);
            return;
        }

        e.target.parentNode.parentNode.remove();
    }

    function getSpace() {
        let space = document.createElement("span");
        space.innerHTML = ' ';
        return space;
    }
    
    (function() {
        let doc = document.querySelector("#user_list").children;
        for (let v of doc) {
            if (v.dataset['last'] == "1") continue;
            v.children[4].children[0].addEventListener("click", function() {
            });
            v.children[4].children[1].addEventListener("click", delUser);
        }
    })();
});