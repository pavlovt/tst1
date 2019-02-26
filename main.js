// initialize the app when jQuery loads
$(document).ready(init);

// initialize the app
function init() {
    $('nav a').click(function (e) {
        e.preventDefault();
        // const url = $(this).data('url');
        // $('main').load(url);
        $('main').html($('#products').html())
    })
}