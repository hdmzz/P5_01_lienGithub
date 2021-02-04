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
}