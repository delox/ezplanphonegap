$('html').on('touchstart',function(event) {

    if($('#myeztravel-faq').is(":visible"))
    {
        event.preventDefault();
        event.stopPropagation();
        closefaq()
    }
});

$('html').on('touchstart','#myeztravel-faq, .Help-btn',function(event){
    console.log('t')
    event.stopPropagation();
});

$('html').on('click','#myeztravel-faq, .Help-btn',function(event){
    console.log('c')

    event.stopPropagation();
});

$('html').on('touchend','#myeztravel-faq, .Help-btn',function(event){
    console.log('te')

    event.stopPropagation();
});

/**
 * Created by josesolorzano on 12/18/15.
 */
