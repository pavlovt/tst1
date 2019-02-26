// initialize the app when jQuery loads
$(document).ready(init);

// initialize the app
function init() {
    // by default load the products
    $('main').html($('#products').html());
    initProducts();

    // init the menu
    $('nav a').click(function (e) {
        e.preventDefault();
        // const url = $(this).data('url');
        // $('main').load(url);
        var name = $(this).data().name;
        $('main').empty();
        $('main').html($('#' + name).html());

        if (name === 'products') initProducts()
        else if (name === 'add') initForm()    
    })
}

function initProducts() {
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
}

function initForm() {
    $('form').submit((e) => {
        e.preventDefault();
        // get all form data - it looks like [{name: 'image' value 'http://...'}, {name: 'description', value: '...'}...]
        const frm = $('form').serializeArray();

        // make sure that there are no empty fields
        let isEmpty = true;
        frm.forEach(v => {
            if (_.isEmpty(v.value)) {
                isEmpty = true;
                // stop the execution
                return false;
            }
            isEmpty = false;
        })

        if (isEmpty) {
            alert('Please fill all the fields');
            return;
        }

        let data = {}
        frm.forEach(v => {
            data[v.name] = v.value;
        })

        $.post('http://localhost:3000/products', data)
        .then(() => alert('the product is added'))
        .catch(() => alert('there was a problem adding the product'))
    })
}