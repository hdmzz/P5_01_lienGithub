class Model {
    //Requête pour récupérer les produits 
    static fetchGet(apiUrl){
        return fetch(apiUrl)
            .then(function(response){
                if(response.ok){
                    return response.json();
                }
                if(!response.ok){
                    throw `Fonction Fetch Get n'aboutit pas erreur ${response.status} ${response.statusText}`;
                }
            })
    };


    //Requête envoie des objets contact et products et retour du serveur avec orderID
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
                } 
                if(!response.ok){
                    throw `Fonction Fetch Post n'aboutit pas erreur ${response.status} ${response.statusText}`
                }
            })
            
    }
}
