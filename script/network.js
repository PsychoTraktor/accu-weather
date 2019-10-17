function request(method, url, callback, data) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {
            callback(JSON.parse(this.responseText));
        }
    }

    xhttp.open(method, url);
    xhttp.send(data);
}

