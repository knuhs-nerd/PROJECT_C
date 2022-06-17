class ENCRYPT {
    n;
    pb_key;
    #url = "/src/php/key_generator";

    get_n() {
        return this.n;
    }

    get_pb_key() {
        return this.pb_key;
    }

    async encrypt(text, f, deep = 0) {
        if (deep > 5) {
            alert("키 생성에 실패했습니다.\n잠시후에 다시 시도해주세요.");
            return false;
        }
        if (!await this.get_key(f)) return this.encrypt(text, deep + 1);
        let buffer = [];
        for (let i = 0; i < text.length; i++) {
            let v = text.charCodeAt(i), sum = 1;
            for (let j = 0; j < this.pb_key; j++) {
                sum *= v;
                sum %= this.n;
            }
            buffer.push(sum);
        }
        return buffer
    }

    async get_key(f, min=237) {
        if (!XHR) {
            alert("Error!");
            return false;
        }

        let req;

        try {
            req = await new XHR(this.#url)
                .data("min", min)
                .data("strength", 4)
                .data("for", f)
                .timeout(1000)
                .post();
        }catch(e) {
            alert("error");
            return false;
        }

        if (req.status !== 200) return false;

        let data = JSON.parse(req.text);

        if (data.status === "success") {
            this.pb_key = data.data.key;
            this.n = data.data.n;
            return true;
        }else {
            alert(data.sattus);
            return false;
        }
    }
}