class ProductCart {
    renderPanier(){
        let  panier = JSON.parse(localStorage.getItem('panier'));
        let formSection = document.getElementById('formContainer');
        formSection.setAttribute('style', 'display:none;');
        let mainConteneur = document.getElementById('main');
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
    showCartShopping(teddie){
        let mainConteneur = document.getElementById('main');
        let containeur = document.createElement('div');
        containeur.className = 'row mb-5';
        let imgContaineur = document.createElement('div');
        imgContaineur.className = 'col-3';
        let img = document.createElement('img');
        img.src = teddie.image;
        img.className = 'card-img';
        mainConteneur.appendChild(containeur);
        containeur.appendChild(imgContaineur);
        imgContaineur.appendChild(img);
        //nom
        let nameDiv = document.createElement('div');
        nameDiv.className = 'col-7';
        let name = document.createElement('p');
        name.innerHTML = teddie.name;
        containeur.appendChild(nameDiv);
        nameDiv.appendChild(name);
        //Prix 
        let priceDiv = document.createElement('div');
        priceDiv.className = 'col-2';
        let price = document.createElement('p');
        price.innerHTML = `${teddie.price/100}€`;
        containeur.appendChild(priceDiv);
        priceDiv.appendChild(price);
        //Partie Quantité Création d'une div qui contiendra les deux boutons
        let addBox = document.createElement('div');
        addBox.className = 'qtyAddMin';
        containeur.appendChild(addBox);
    };
    //prix total
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
        //apparition du formulaire et disparition du panier
        let btnCommander = document.getElementById('btnCommander');
        let panierSection = document.getElementById('panierFull');
        
        btnCommander.addEventListener('click', () => {
            let formSection = document.getElementById('formContainer');
            formSection.setAttribute ('style', 'display:initial;');
            panierSection.setAttribute("style", "display:none;");
        });
    };
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
    productConstructor(panier){
    //on constuit un tablau d'id
    let products = [];
    panier.map(teddie => products.push(teddie.id));
    console.log(products);
    return products;
    };
}