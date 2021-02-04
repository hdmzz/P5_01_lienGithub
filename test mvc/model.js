class Model {
    static fetchGet(apiUrl){
        return new Promise(function(resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === xhr.DONE) {
                    if (xhr.status === 200) { 
                        let content = JSON.parse(xhr.responseText)
                        resolve(content);
                    } else {
                        reject(xhr);
                    } 
                }
            }
            xhr.open('GET', apiUrl);
            xhr.send();
        });
}

static fetchPost(apiUrl){
    
}
}