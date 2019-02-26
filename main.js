// initialize the app when jQuery loads
$(document).ready(init);

// initialize the app
function init() {
    $('nav a').click(function (e) {
        e.preventDefault();
        // const url = $(this).data('url');
        // $('main').load(url);
        var name = $(this).data().name;
        $('main').html($('#' + name).html());

        // get the product template as text
        let tpl = $('#product').html(), tpl1;
        // get the products
        $.get('http://localhost:3000/products')
        .then((products) => {
            console.log(products);
            products.forEach((product) => {
                // wrap it in div and create jQuery element of it
                tpl1 = $('<div>'+tpl+'</div>')
                tpl1.find('h3').html(product.name);
                tpl1.find('.desc').html(product.name + ' description');
                console.log(product.name, tpl1.html())
                $('main .product-list').append(tpl1);
            })

        })
    })
}