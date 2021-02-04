class ProductListView {
    
    showTeddies(teddies){
        // création du conteneur de chaque article 
            let mainContainer = document.getElementById('main');
            let cardContaineur = document.createElement('div');
            cardContaineur.className ='card col-md-5 m-4 text-center px-0';
           
            
            mainContainer.appendChild(cardContaineur);
            //cardContaineur.appendChild(article);
    
            //Ajout de l'image
            let img = document.createElement('img');
            img.className ='img-fluid';
            img.src = `${teddies.imageUrl}`;
            cardContaineur.appendChild(img);
            //Ajout des nom
            let contentDiv = document.createElement('div');
            contentDiv.className = 'card-body bg-light';
            cardContaineur.appendChild(contentDiv);
            let nameDiv = document.createElement('h2');
            nameDiv.className ='card-title';
            contentDiv.appendChild(nameDiv);
            nameDiv.innerHTML = teddies.name;
            //ajout de la description
            let description = document.createElement('p');
            description.className = 'card-text';
            description.innerHTML = teddies.description;
            contentDiv.appendChild(description);
    
            //ajout des prix
            let priceDiv = document.createElement('p');
            priceDiv.className = 'card-text h3';
            priceDiv.innerHTML = `${teddies.price/100}€`;
            contentDiv.appendChild(priceDiv);
    
            //streched link
            let article = document.createElement('a');
            article.href = `product.html?id=${teddies._id}`;
            article.className ='stretched-link';
            contentDiv.appendChild(article);
        }
    
}