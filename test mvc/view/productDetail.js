class ProductDetail{
    showTeddiesDetails(data){
        console.log(data);
    // creation d'un article conteneur des info du produit
    let mainContainer = document.getElementById('main');
    let article = document.createElement('div');
    article.className ='card col-10 col-md-8 px-0 mx-auto';
    mainContainer.appendChild(article);
    
    // insertion de l'image
    let img = document.createElement('img');
    img.className = 'card-img-top';
    img.src = data.imageUrl;
    article.appendChild(img);
    //creation d'une div pour les specificitées
    let specs = document.createElement('div');
    specs.id ='desPrNo';
    specs.className = 'card-body'
    article.appendChild(specs);
    // Ajout du noms
    let nameDiv = document.createElement('p');
    nameDiv.className = 'card-title h2';
    nameDiv.innerHTML = data.name;
    specs.appendChild(nameDiv);
    //ajout des prix
    let priceDiv = document.createElement('p');
    priceDiv.className = 'card-text h3 mb-1';
    priceDiv.innerHTML = `${data.price/100}€`;
    specs.appendChild(priceDiv);
    //Description
    let description = document.createElement('p');
    description.className = 'card-text';
    description.innerHTML = data.description;
    console.log(data.description);
    specs.appendChild(description);
    //Ajout des options
    //let selectBtn =  document.getElementById('selectColors');
    let divInputs = document.createElement('div');
    divInputs.className ='inputs';
    specs.appendChild(divInputs);
    //Label Colors
    let label = document.createElement('label');
    label.for = 'colors';
    label.name = 'colors';
    label.innerHTML = 'Choix des couleurs : ';
    divInputs.appendChild(label);
    //Colors
    let colors = document.createElement('select');
    colors.id = 'colors'
    colors.name = 'colors';
    divInputs.appendChild(colors);
    //
    let teddieColors = data.colors;//recupe des choix de couleurs
    teddieColors.map(color => {
        let optionColor = document.createElement('option')
        optionColor.value = color;
        optionColor.innerHTML = color;
        colors.appendChild(optionColor);
        });
    //Bouton ajout panier
    let ajoutPanier = document.createElement('button');
    ajoutPanier.id = 'btnAjouter';
    ajoutPanier.className = 'btn btn-primary mt-2'
    ajoutPanier.innerHTML = 'Ajouter au panier'
    specs.appendChild(ajoutPanier);
    ajoutPanier.addEventListener('click', () => this.addToCart(data));
    };
    
    // declaration d'un objet qu l'on va stringifier après
    addToCart(data){
        const myTeddie = {
            id: data._id,
            image: data.imageUrl,
            name: data.name,
            description: data.description,
            price: data.price,
        }
        this.addItemToCart(myTeddie)
    }
    
    addItemToCart(myTeddie){
        let panier = localStorage.getItem('panier')
        console.log(panier);
        if (panier == null){
            panier = [];
        } else {
            panier = JSON.parse(panier)
        }
        console.log('addItemToCart');
        console.log(panier)
        panier.push(myTeddie);
        localStorage.setItem('panier', JSON.stringify(panier));
        console.log(localStorage);
    }
}