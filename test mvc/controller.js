class Controller {
    // Récupère le tableau des produits et lance la fonction permettant un affichage des articles sur la page d'accueil 
    async productListPage(){
        try {
            let data = await Model.fetchGet('http://localhost:3000/api/teddies');
            let view = new ProductListView;
            data.map(teddies =>{
                view.showTeddies(teddies)
            })
        } catch(error){
            console.log(error);
        } 
    }

    async productDetailPage(){
        /* Récupère l'id du produit séléctionné et lance une requête pour récupérer les infos d'un seul produit puis lance une fonction permettant l'affichage d'un seul produit*/
        try {
            let searchParams = new URLSearchParams(window.location.search);
            let id = searchParams.get('id');
            let data = await Model.fetchGet('http://localhost:3000/api/teddies/' + id);
            let view = new ProductDetail;
            view.showTeddiesDetails(data);
        } catch(error) {
            console.error(error)
        }
    }

    productCartPage(){
        /*Appelle à la fonction qui permet l'affichae du panier*/
        try {
            let view = new ProductCart;
            view.renderPanier();
        } catch (error) {
            console.error(error)
        }
    }

    async sendForm(){
        //Récupération des deux objet contact et products dans le local storage puis envoie au serveur avec la fonction orderIdRequest
        try {
            let contact = JSON.parse(localStorage.getItem('contact'));
            let products = JSON.parse(localStorage.getItem('products'));
            let order = await this.orderIdRequest(contact, products);
            let orderResponse = JSON.parse(order);
            this.productOrderConfirm(orderResponse);
        } catch (error) {
            console.log(error)
        }
    }

    async orderIdRequest(contact, products){
        // Requête Post envoie les deux objets au serveur et retourne une réponse avec l'orderId
        try {
            let requestPost = await Model.fetchPost('http://localhost:3000/api/teddies/order', contact, products)
            return requestPost
        } catch (error) {
            throw (error) 
        }
    }

    productOrderConfirm(orderResponse){
        //Fonction qui récupere l'order Id et génère la page de confirmation
        try {
            let view = new ProductOrderConfirm;
            view.orderConfirm(orderResponse);
        } catch (error) {
            throw(error)
        }
    }
}