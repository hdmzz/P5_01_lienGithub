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
                        throw 'response not Ok';
                    } 
                }
            }
            xhr.open('GET', apiUrl);
            xhr.send();
        });
}

static fetchPost(apiUrl, contact, products){
    return fetch (apiUrl, 
        {
            method: 'POST',
            headers: 
            {
                'Content-Type':'application/json'
            },
            body: (JSON.stringify({contact, products})),
        })
        .then(function(response){
            if(response.ok){
                return response.text();
            } else {
                throw "response not Ok";
            }
            
        })
        
}
}
