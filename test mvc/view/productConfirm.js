class ProductOrderConfirm{
    //Récupération de l'order Id et affichage de celui ci avec le prix total du panier
    orderConfirm(orderResponse){
        if(orderResponse == undefined){
            throw 'orderResponse non définie';
        }
        console.log(orderResponse.orderId);
        let orderId = orderResponse.orderId;
        let ref = document.getElementById('reference');
        ref.innerHTML = `La référence de votre commande est ${orderId}`;
        //Récupération du panier pour totalPrice
        let panier = JSON.parse(localStorage.getItem('panier'));
        if (panier == undefined){
            throw 'panier non définie';
        }
        this.totalPrice(panier);
        // On efface le local storage
        localStorage.clear();
    }
    //Fonction qui calcul le prix total du panier
    totalPrice(panier){
        let priceSum = 0;
        let calculPrice = (teddie) =>{
            let singlePrice = parseInt(teddie.price);
            priceSum += singlePrice;
            let priceTotalContainer = document.getElementById('sum');
            priceTotalContainer.innerHTML = 'Prix total du panier :' + ' ' + priceSum/100 + '€';
        }
        panier.map(teddie => calculPrice(teddie));
    }
}