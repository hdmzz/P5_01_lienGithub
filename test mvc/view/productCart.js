class ProductCart {
    renderPanier(){
        //Récupération du panier 
        let  panier = JSON.parse(localStorage.getItem('panier'));
        console.log(panier);
        let formSection = document.getElementById('formContainer');
        formSection.setAttribute('style', 'display:none;');
        let mainConteneur = document.getElementById('main');
        //Si le panier est vide un message apparait 
        if(panier == null){
            let emptyCartContaineur = document.createElement('div');
            emptyCartContaineur.setAttribute('style', 'text-align:center;')
            emptyCartContaineur.innerHTML = '<h1 class="mb-4">Votre panier est vide</h1>';
            mainConteneur.appendChild(emptyCartContaineur);
            btnCommander.setAttribute('style', 'display:none');
        } else{
            panier.map(teddie => this.showCartShopping(teddie));
            this.totalPrice(panier);
            this.formApparition();
            this.submitForm(panier); 
        }
    };
    // Affichage du panier avc toutes les informations 
    showCartShopping(teddie){
        console.log(teddie);
        let mainConteneur = document.getElementById('main');
        let containeur = document.createElement('div');
        containeur.className = 'row mb-5';
        //Création du conteneur de l'image
        let imgContaineur = document.createElement('div');
        imgContaineur.className = 'col-3';
        let img = document.createElement('img');
        //Ajout de lien de l'image
        img.src = teddie.image;
        img.className = 'card-img';
        mainConteneur.appendChild(containeur);
        containeur.appendChild(imgContaineur);
        imgContaineur.appendChild(img);
        //Ajout du nom
        let nameDiv = document.createElement('div');
        nameDiv.className = 'col-7';
        let name = document.createElement('p');
        name.innerHTML = teddie.name;
        containeur.appendChild(nameDiv);
        nameDiv.appendChild(name);
        //Ajout du Prix 
        let priceDiv = document.createElement('div');
        priceDiv.className = 'col-2';
        let price = document.createElement('p');
        price.innerHTML = `${teddie.price/100}€`;
        containeur.appendChild(priceDiv);
        priceDiv.appendChild(price);
    };
    //Calcul du prix total
    totalPrice(panier){
        let priceSum = 0;
        let calculPrice = (teddie) => {
            let singlePrice = parseInt(teddie.price);
            priceSum += singlePrice;
            let priceTotalContainer = document.getElementById('sum');
            priceTotalContainer.innerHTML = 'Prix total du panier :' + ' ' + priceSum/100 + '€';
        }
        panier.map(teddie => calculPrice(teddie))
    };
    formApparition(){
        //Apparition du formulaire et disparition du panier
        let btnCommander = document.getElementById('btnCommander');
        let panierSection = document.getElementById('panierFull');
        //Au click le formulaire apparait et le panier disparait
        btnCommander.addEventListener('click', () => {
            let formSection = document.getElementById('formContainer');
            formSection.setAttribute ('style', 'display:initial;');
            panierSection.setAttribute("style", "display:none;");
        });
    };
    //Envoie des objets nécéssaire à la requête POST sur le local storage
    submitForm(panier){
        let form = document.getElementById('form');
        form.addEventListener('submit', () => {
            let contact = this.contactConstructor();
            let products = this.productConstructor(panier);
            if(contact == null || products == null){
                throw "erreur objet de la requete";
            } else {
                localStorage.setItem('contact', JSON.stringify(contact));
                localStorage.setItem('products', JSON.stringify(products)); 
            }
        });
    };
    //Construit l'objet Contact avec les inputs du formulaire
    contactConstructor(){
        let contact = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            email: document.getElementById('email').value,
        }
        console.log(contact)
        return contact
    };
    //Constuit un tablau d'id pour envoie au serveur
    productConstructor(panier){
    let products = [];
    panier.map(teddie => products.push(teddie.id));
    console.log(products);
    return products;
    };
}