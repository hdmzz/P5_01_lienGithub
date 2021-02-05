class Controller {
    async productListPage(){
        let data = await Model.fetchGet('http://localhost:3000/api/teddies');
        let view = new ProductListView;
        data.map(teddies =>{
            view.showTeddies(teddies)
       })
    }

    async productDetailPage(){
        let searchParams = new URLSearchParams(window.location.search);
        let id = searchParams.get('id');
        let data = await Model.fetchGet('http://localhost:3000/api/teddies/'+ id);
        let view = new ProductDetail;
        view.showTeddiesDetails(data);
    }

    productCartPage(){
        let view = new ProductCart;
        view.renderPanier();
    }

    async sendForm(){
        //on récupere les deux objet contact et products dans le local storage
        let contact = JSON.parse(localStorage.getItem('contact'));
        let products = JSON.parse(localStorage.getItem('products'));
        let order = await this.orderIdRequest(contact, products);
        let orderResponse = JSON.parse(order);
        this.productOrderConfirm(orderResponse);
    }

    async orderIdRequest(contact, products){
        let requestPost = await Model.fetchPost('http://localhost:3000/api/teddies/order', contact, products)
        return requestPost
    }

    productOrderConfirm(orderResponse){
        let view = new ProductOrderConfirm;
        view.orderConfirm(orderResponse);
    }
}