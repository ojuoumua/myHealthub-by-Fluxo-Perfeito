var vm = function () {
    console.log('ViewModel initiated...');
    //--- Local Variables
    var self = this;
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');

    //--- User
    self.isLogged = ko.observable('');
    self.email = ko.observable('');
    self.fullName = ko.observable('');
    self.products = ko.observableArray([]);
    self.cart = ko.observableArray([]); // Carrinho de compras

    //--- Computed Observables
    self.totalPrice = ko.computed(function () {
        let total = 0;
        self.cart().forEach(item => {
            total += parseFloat(item.Price);
        });
        return total.toFixed(2); // Retorna o total formatado com 2 casas decimais
    });

    //--- Page Events
    self.activate = function () {
        const user = JSON.parse(localStorage.currentUser);
        self.email(user.email);
        self.isLogged(user.isLogged);
        self.fullName(user.fullName);

        self.products(JSON.parse(localStorage.products));
    };

    // Adicionar produto ao carrinho
    self.addToCart = function (product) {
        self.cart.push(product); // Adiciona o produto ao carrinho
        localStorage.setItem('cart', JSON.stringify(self.cart())); // Atualiza o carrinho no localStorage
    };

    // Remover produto do carrinho
    self.removeFromCart = function (product) {
        self.cart.remove(product); // Remove o produto do carrinho
        localStorage.setItem('cart', JSON.stringify(self.cart())); // Atualiza o carrinho no localStorage
    };

    // Carregar carrinho do localStorage (se existir)
    if (localStorage.cart) {
        self.cart(JSON.parse(localStorage.cart));
    }

    function sleep(milliseconds) {
        const start = Date.now();
        while (Date.now() - start < milliseconds);
    }

    //--- Start ....
    self.activate();
    console.log("VM initialized!");
};


function loadProducts() {
    const products = [
        {
            'Name':'Paracetamol',
            'Image':'img/paracetamol.jpg',
            'Desc':'Ideal para dor de cabeça',
            'Price':'4.99'
        },
        {
            'Name':'ben-u-ron',
            'Image':'img/benuron.jpg',
            'Desc':'Ideal para todo o tipo de dor',
            'Price':'3.99'
        },
        {
            'Name':'Brufen',
            'Image':'img/brufen.jpg',
            'Desc':'Ideal para inflamações e infeções',
            'Price':'5.99'
        }
    ]
    localStorage.setItem('products', JSON.stringify(products))
}

$(document).ready(function () {
    if (localStorage.isLogged != 'true') { window.location.replace('index.html') }
    loadProducts();
    ko.applyBindings(new vm());
})