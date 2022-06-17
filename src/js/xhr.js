class XHR {
    constructor(url) {
        this.url = url;
        this.headerForm = {};
        this.dataForm = new FormData();
        this.xhr = new XMLHttpRequest();
    }

    data(key, value) {
        this.dataForm.append(key, value);
        return this;
    }

    datas(json) {
        for (let key in json) this.data(key, json[key]);
        return this;
    }

    header(key, value) {
        this.xhr.headerForm[key] = value;
        return this;
    }

    headers(json) {
        for (let key in json) this.header(key, json[key]);
        return this;
    }

    timeout(time) {
        this.xhr.timeout = time;
        return this;
    }

    responseType(type) {
        this.xhr.responseType = type;
        return this;
    }

    post() {
        return new Promise(function(resolve, reject) {
            this.xhr.onreadystatechange = function() {
                if (this.xhr.readyState == 4) {
                    if (this.xhr.status == 200) {
                        resolve({
                            response: this.xhr.response,
                            text: this.xhr.responseText,
                            type: this.xhr.responseType,
                            url: this.xhr.responseURL,
                            xml: this.xhr.responseXML,
                            status: this.xhr.status
                        });
                    } else {
                        reject({
                            status: this.xhr.status,
                            message: this.xhr.statusText
                        });
                    }
                }
            }.bind(this);

            this.xhr.ontimeout = function (e) {
                reject(Object.assign({
                    status: -1,
                    message: "timeout"
                }, e));
            };

            this.xhr.open("POST", this.url);
            for (let key in this.headerForm) this.xhr.setRequestHeader(key, this.headerForm[key]);
            this.xhr.send(this.dataForm);
        }.bind(this));
    }

    get() {
        return new Promise(function(resolve, reject) {
            this.xhr.onreadystatechange = function() {
                if (this.xhr.readyState == 4) {
                    if (this.xhr.status == 200) {
                        resolve({
                            response: this.xhr.response,
                            text: this.xhr.responseText,
                            type: this.xhr.responseType,
                            url: this.xhr.responseURL,
                            xml: this.xhr.responseXML,
                            status: this.xhr.status
                        });
                    } else {
                        reject({
                            status: this.xhr.status,
                            message: this.xhr.statusText
                        });
                    }
                }
            }.bind(this);

            this.xhr.ontimeout = function (e) {
                reject(Object.assign({
                    status: -1,
                    message: "timeout"
                }, e));
            };

            this.xhr.open("GET", this.url);
            for (let key in this.headerForm) this.xhr.setRequestHeader(key, this.headerForm[key]);
            this.xhr.send(this.dataForm);
        }.bind(this));
    }
}