class ProductOrderConfirm{
    orderConfirm(orderResponse){
        console.log(orderResponse.orderId);
        let orderId = orderResponse.orderId;
        console.log(orderId);
        let ref = document.getElementById('reference');
        ref.innerHTML = `La référence de votre commande est ${orderId}`;
        //recupération du panier pour totalPrice
        let panier = JSON.parse(localStorage.getItem('panier'));
        this.totalPrice(panier);
        localStorage.clear();
    }
    totalPrice(panier){
        let priceSum = 0;
        let calculPrice = (teddie) =>{
            let singlePrice = parseInt(teddie.price);
            priceSum += singlePrice;
            let priceTotalContainer = document.getElementById('sum');
            priceTotalContainer.innerHTML = 'Prix total du panier :' + ' ' + priceSum/100 + '€';
        }
        panier.map(teddie => calculPrice(teddie))
    }
}