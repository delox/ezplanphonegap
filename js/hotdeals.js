// JavaScript Document
global_itemcategorytimer = 0;
global_showloadinginit = true;
$(window).scroll(function() {
    check_image_load();
});

function is_in_view(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));
}

function check_image_load() {
    $('[data-real-src]').each(function(e) {
        if (is_in_view($(this))) {
            if ($(this).attr('data-real-type') == "image") {
                $(this).css('backgroundImage', 'url('+$(this).attr('data-real-src')+')').removeAttr('data-real-src').hide().fadeIn(2000);
                $(this).error(function() {
                    //this.src = 'images/myezplan-free-vacation-planner.svg';
                    //this.style.background = "url(images/myezplan-free-vacation-planner.svg)";
                    this.style.background = "url(images/myezplan-free-vacation-planner.svg) no-repeat center";
                });
            }
        }

    });
}

function Open_myezplan_() {
    var csel = $('#selcity_h').val();
    window.open('mapcitypopup.html?ctid=' + csel + '&plid=14#', '_blank');
}

function EditHotdealsDates(ruta) {
    var numdays_ = $.cookie("NUMDAYS");
    var numdays = 1
    if (numdays_ && numdays_ != '') {
        var numdays = numdays_
    }
    var date1_ = $.cookie("EZDATE1");
    var date2_ = $.cookie("EZDATE2");
    var date1 = '';
    var date2 = '';
    if (date1_ && date1_ != '') {
        var date1 = date1_;
    };
    if (date2_ && date2_ != '') {
        var date2 = date2_;
    }
    $('body').append('<div id="mask-hotdealsview" data-role="panel" data-position="right" data-display="overlay" data-theme="a" class="panel mask-reportview" align="center"><div style=""><h1 style="text-align:center;"><span class="capitalize_red">M</span>y calendar <a style="float:left; padding-right:10px;" height="35px" class="cursor" onclick="returntohotdeals();"><svg class="icon icon-close" style="width:30px;height:30px;fill:#c00000"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-close"></use></svg></a></h1><div id="hotdeals-calendar" ></div></div></div>');
    //var docViewTop = $(window).scrollTop();
    //$('#mask-hotdealsview').css('top',(docViewTop+25));
    $('#mask-hotdealsview').panel();
    $('#mask-hotdealsview').panel('open');
    $('#mask-hotdealsview').fadeIn(300);
    window.top.$("#deals_panel").panel()
    window.top.$("#deals_panel").panel('close')
    //	$('#hotdealspannel-calendar').showLoading("Please Wait,<br/>Loading...<br/>",false);
    var url = "https://myezplan.com/data_ajax/mapcity_content3.cfm?rnu=5131616516651";
    var urlconfig = {
        action: "calendarioplaces",
        ruta_id: ruta,
        date1: date1,
        date2: date2,
        numdays: numdays,
        source: 'Hotdeals-ext'
    };
    $("#hotdeals-calendar").load(url, urlconfig);
}

function returntohotdeals() {
    $('#mask-hotdealsview').panel('close').empty().remove();
    window.top.$("#deals_panel").panel('open');
}

function muestra(cual) {
    if (varmuestra == cual) {
        varmuestra = 0;
        $('.hh' + cual).fadeOut(300);
        $('.muestramore').fadeOut(300);
        //$('#button-searchhotdeals').attr('style','display:inline-block;background-color:lightgray;');
        $('#button-searchhotdealsnew svg').attr('style','fill:;width:35px;height:35px;');
        //$('#button-filters').attr('src', '../glyphicons/png/glyphicons-191-circle-plus.png');
        $("#button-filters use").attr('xlink:href','#icon-expand_more');
    } else {
        if (cual == 1) {
            //$('#button-filters').attr('src', '../glyphicons/png/glyphicons-191-circle-plus.png');            
            $("#button-filters use").attr('xlink:href','#icon-expand_more');
            $('#button-searchhotdealsnew svg').attr('style','fill:#17375e;width:35px;height:35px;');
            var csel = $('#selcity_h').val();
            changecountry($('#selcountry_h').val());
            changecity(csel);
            $('#selcity_h').val(csel);
            $('.hh2').hide();
        } else {
            //$('#button-filters').attr('src', '../glyphicons/png/glyphicons-192-circle-minus.png');
            $("#button-filters use").attr('xlink:href','#icon-expand_less');
            //$('#button-searchhotdeals').attr('style', 'display:inline-block;background-color:lightgray;');
            $('#button-searchhotdealsnew svg').attr('style','fill:;width:35px;height:35px;');
            changecity(varcityo_h);
            $('.hh1').hide();
        }
        varmuestra = cual;
        $('.hh' + cual).fadeIn(300);
        $('.muestramore').fadeIn(300);
    }
    if (varmuestramap == 1) {
        Filter_Map();
    }
}

function changecountry(id) {
    $('.ocultaciudad').hide();
    $('.ocultaplan').hide();
    $('#selcity_h').val(0);
    $('#selplan_h').val(0);
    $('.countryview_' + id).show();
}

function changecity(id) {
    $('.ocultaplan').hide();
    $('#selplan_h').val(0);
    $('.cityview_' + id).show();
}

function ChangeHotdealsCity_() {
    var csel = $('#selcity_h').val();
    var cname = $('#selcity_h option:selected').html();
    if (csel == 0) {
        alert('Please select a city');
        return false;
    }
    varcityo_h = csel;
    $("#citytitle h2").html(cname);
    var psel = $('#selplan_h').val();
    //var _url = "https://myezplan.com/data_ajax/hotdeal_pannel.cfm";
    var _url = "https://myezplan.com/data_ajax/deals_ajax_content.cfm";
    var _urlconfig = {
        action: 'bringhotdeals',
        cityid: csel,
        hotcliente_: varhotdealclient,
        plan: psel
    };
    $('#listadehotdeals').showLoading("Loading Deals", false);
    $(".mask-loading-image").css('top','1%');
    $('#listadehotdeals').load(_url, _urlconfig,function(){
    	$(".mask-loading-image").css('top','50%');
    });
    window.history.pushState('myezplan', 'myezplan hotdeals', '/hotdeals.cfm?city=' + csel);
    muestra(varmuestra);
}

function Filter_() {
    var psel = $('#selplan_h').val();
    if (psel != 0) {
        $('.ocultaareas_').hide();
        $('.area__' + psel).show();
    } else {
        $('.ocultaareas_').show();
    }
    var csel = $('#selcat_h').val();
    if (csel != 0) {
        $('.hideacat').hide();
        $('.hidecat_' + csel).show();
    } else {
        $('.hideacat').show();
    }
    muestra(varmuestra);
}

function Filter_Map() {
    var Bounds = new google.maps.LatLngBounds();
    if (varmuestramap == 1) {
        varmuestramap = 0;
        $('.muestramap').fadeOut(300);
        $('#button-searchhotdeals4').attr('style', 'display:inline-block;background-color:lightgray;');
    } else {
        varmuestramap = 1;
        $('#button-searchhotdeals4').attr('style', 'display:inline-block;background-color:#4f6228;');
        $('.muestramap').show();
        var psel = parseInt($('#selplan_h').val());
        var csel = parseInt($('#selcat_h').val());
        for (h = 0; h < arraydehotdeals.length; h++) {
            var areapasa = 0;
            var catpasa = 0;
            if (psel == 0) {
                areapasa = 1;
            } else {
                if (parseInt(arraydehotdeals[h].planid) == psel) {
                    areapasa = 1
                };
            }
            if (csel == 0) {
                catpasa = 1;
            } else {
                for (c = 0; c < arraydehotdeals[h].cats.length; c++) {
                    if (parseInt(arraydehotdeals[h].cats[c]) == csel) {
                        catpasa = 1;
                    }
                }
            }
            if (areapasa == 1 && catpasa == 1) {
                arraydehotdeals[h].setMap(hotmap);
                Bounds.extend(arraydehotdeals[h].getPosition());
            } else {
                arraydehotdeals[h].setMap(null);
            }
        }
        hotmap.fitBounds(Bounds);
        google.maps.event.trigger(hotmap, 'resize');
    }
}

function HotDealToCart(id, unico, mapa, provider) {
    console.log("es el local");
    if (provider == 1) {
        if (cf_sid == "") {
            pedir_sesion(1, "HotDealToCart(" + id + ",'" + unico + "','" + mapa + "','" + provider + "')");
            return;
        }
        $.ajax({
            type: "POST",
            url: "https://myezplan.com/data_ajax/cart_ajax_events.cfm",
            async: false,
            cache: false,
            data: "mapa=" + mapa + "&rnu=35135151351&unico=" + unico + "&action=addcartitem",
            success: function(datos) {
                alert(datos);
                $('#boton1_' + id).fadeOut(300);
                $('#boton2_' + id).fadeIn(300);
                EditHotdealsDates(id);
            }
        });

    }
    if (provider == 2) {
        if (cf_sid == "") {
            pedir_sesion(1, "HotDealToCart(" + id + ",'" + unico + "','" + mapa + "','" + provider + "')");
        }
        $.ajax({
            type: "POST",
            url: "https://myezplan.com/data_ajax/cart_ajax_events.cfm",
            async: false,
            cache: false,
            data: "mapa=" + mapa + "&rnu=54324654325&unico=" + unico + "&action=addcartitem_v",
            success: function(datos) {
                alert(datos);
                $('#boton1_' + id).fadeOut(300);
                $('#boton2_' + id).fadeIn(300);
                EditHotdealsDates(id);
            }
        });
    }
    if (provider > 2 && provider < 6) {
        if (cf_sid != '') {
            $.ajax({
                type: "POST",
                url: "https://myezplan.com/data_ajax/cart_ajax_events.cfm",
                async: false,
                cache: false,
                data: "rnu=51315651356513&rutaid=" + id + "&action=addcartitem_external",
                success: function(datos) {
                    alert(datos);
                }
            });
        }
        $('#boton1_' + id).fadeOut(300);
        $('#boton2_' + id).fadeIn(300);
        EditHotdealsDates(id);
    }
    if (provider == 6) {
        if (cf_sid == "") {
            pedir_sesion(1, "HotDealToCart(" + id + ",'" + unico + "','" + mapa + "','" + provider + "')");
        }
        $.ajax({
            type: "POST",
            url: "https://myezplan.com/data_ajax/cart_ajax_events.cfm",
            async: false,
            cache: false,
            data: "mapa=" + mapa + "&rnu=354343555313545&unico=" + unico + "&action=addcartitem_cl",
            success: function(datos) {
                alert(datos);
                $('#boton1_' + id).fadeOut(300);
                $('#boton2_' + id).fadeIn(300);
                EditHotdealsDates(id);
            }
        });
    }
}

function HotDealFromCart(id, unico, mapa, provider) {
    if (provider == 1 || provider == 6) {
        $.ajax({
            type: "POST",
            url: "https://myezplan.com/data_ajax/cart_ajax_events.cfm",
            async: false,
            cache: false,
            data: "mapa=" + mapa + "&rnu=32321321321&rid=" + unico + "&action=deletecartitem",
            success: function(datos) {
                $('#boton1_' + id).fadeIn(300);
                $('#boton2_' + id).fadeOut(300);
            }
        });
    }
    if (provider == 2) {
        $.ajax({
            type: "POST",
            url: "https://myezplan.com/data_ajax/cart_ajax_events.cfm",
            async: false,
            cache: false,
            data: "mapa=" + mapa + "&rnu=665656666&rid=" + unico + "&action=deletecartitem",
            success: function(datos) {
                $('#boton1_' + id).fadeIn(300);
                $('#boton2_' + id).fadeOut(300);
            }
        });
    }
    if (provider > 2 && provider < 6) {
        if (cf_sid != '') {
            $.ajax({
                type: "POST",
                url: "https://myezplan.com/data_ajax/cart_ajax_events.cfm",
                async: false,
                cache: false,
                data: "rnu=545464654654&rutaid=" + id + "&action=deleteexternalcartitem",
            });
        }
        $('#boton1_' + id).fadeIn(300);
        $('#boton2_' + id).fadeOut(300);

    }
}
