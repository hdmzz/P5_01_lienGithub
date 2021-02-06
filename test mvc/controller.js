class Controller {
    async productListPage(){
        try {
            let data = await Model.fetchGet('http://localhost:3000/api/teddies');
            let view = new ProductListView;
            data.map(teddies =>{
                view.showTeddies(teddies)
            })
        } catch (error) {
            console.error(error);
        } 
    }

    async productDetailPage(){
        try {
            let searchParams = new URLSearchParams(window.location.search);
            let id = searchParams.get('id');
            let data = await Model.fetchGet('http://localhost:3000/api/teddies/' + id);
            let view = new ProductDetail;
            view.showTeddiesDetails(data);
        } catch (error) {
            console.error(error)
        }
    }

    productCartPage(){
        try {
            let view = new ProductCart;
            view.renderPanier();
        } catch (error) {
            console.error(error)
        }
    }

    async sendForm(){
        //on récupere les deux objet contact et products dans le local storage
        try {
            let contact = JSON.parse(localStorage.getItem('contact'));
            let products = JSON.parse(localStorage.getItem('products'));
            let order = await this.orderIdRequest(contact, products);
            let orderResponse = JSON.parse(order);
            this.productOrderConfirm(orderResponse);
        } catch (error) {
            console.error(error)
        }
    }

    async orderIdRequest(contact, products){
        try {
            let requestPost = await Model.fetchPost('http://localhost:3000/api/teddies/order', contact, products)
            return requestPost
        } catch (error) {
            console.error(error) 
        }
    }

    productOrderConfirm(orderResponse){
        try {
            let view = new ProductOrderConfirm;
            view.orderConfirm(orderResponse);
        } catch (error) {
            console.error(error)
        }
        
    }
}