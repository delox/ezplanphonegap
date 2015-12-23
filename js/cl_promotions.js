function openagreement() {
    var promostatus = $('#status_promo_old').val() || 0;
    var promoaction = $('#actionsource').val() || '';
    var oldid = $('#idunico_old').val() || '';
    if (promoaction == 'u' && promostatus == 2) {
        openoldagreement(oldid);
        return false;
    }
    var cat = $('#detail_type').val() || '';
    if (cat == '') {
        myezAlert.render('Please select a type');
        mostrar_ocultar(2);
        location.href = '#typeshere';
        $('#detail_type').removeClass('Avisox');
        setTimeout(function() {
            $('#detail_type').addClass('Avisox');
        }, 50);
        return false;
    }
    var name = $('#Placename').val();
    var desc = $('#detail_desc').val();
    var expiration = $('#Expires').val();
    var ends = $('#Ends').val();
    var starts = $('#Starts').val();
    var exclusions = $('#detail_rest').val();
    var inclusions = $('#detail_incl').val();
    var tips = $('#detail_tips').val();
    var duration = $('#detail_duration').val();
    var setprice = $("#selsetprice :selected").text(); //$('#selsetprice').val();
    var setprice = parseInt(setprice.replace('%', ''));
    var freecoupon = 0;
    if (couponin) {
        var freecoupon = 1;
    }
    var che1 = document.getElementById('req_nam').checked;
    var che2 = document.getElementById('req_age').checked;
    var che3 = document.getElementById('req_lead').checked;
    var che4 = document.getElementById('req_id').checked;
    var che5 = document.getElementById('req_oth').checked;
    if (che1 == true) {
        var reqnam = 1;
    } else {
        var reqnam = 0;
    }
    if (che2 == true) {
        var reqage = 1;
    } else {
        var reqage = 0;
    }
    if (che3 == true) {
        var reqlead = 1;
    } else {
        var reqlead = 0;
    }
    if (che4 == true) {
        var reqid = 1;
    } else {
        var reqid = 0;
    }
    if (che5 == true) {
        var reqnew = 1;
        var reqnew_name = document.getElementById('req_oth_name').value;
    } else {
        var reqnew = 0;
    }
    var newdaysav_ = [];
    for (d = 1; d <= 7; d++) {
        var che = document.getElementById('day' + d).checked;
        if (che == true) {
            newdaysav_.push(1);
        } else {
            newdaysav_.push(0);
        }
    }
    var newdaysav = newdaysav_.join(',');
    var newprices_ = [];
    $('.che_pri').each(function(index, element) {
        var id_ = $(element).attr('id')
        var id = parseInt(id_.replace('Che_', ''));
        var che = document.getElementById(id_).checked;
        var newpr = document.getElementById('detail_regularprice' + id).value;
        var newps = document.getElementById('detail_specialprice' + id).value;
        if (newpr != '' && newps != '') {
            newprices_.push(id + ',' + newpr + ',' + newps);
        }
    });
    var newprices = newprices_.join('*');
    if (newprices == '' || newprices == '1,,') {
        newprices = '1,0,0';
    }
    if (desc == '') {
        var desc_ = 'NODESC'
    } else {
        var desc_ = desc;
    }
    var optionbase = name + '!' + desc_ + '!' + document.getElementById('resdays').value + '!' + newdaysav + '!' + newprices;
    var contractoptions = [];
    contractoptions.push(optionbase);
    for (x = 0; x < arrayoptions.length; x++) {
        contractoptions.push(arrayoptions[x]);
    }
    var alloptions = contractoptions.join('?');
    $('body').append('<div id="mask-agree" data-role="panel" data-position="right" data-display="overlay" data-theme="a" class="panel mask-agree" align="center"></div>');
    $('.mask-agree').append('<div id="cargaagreeent"></div>');
    $('#cargaagreeent').showLoading("Please Wait,<br/>Retriving Topics...<br/>", false);
    var _url = 'data_ajax/cl_agreement.cfm';
    var _urlconfig = {
        cat: cat,
        name: name,
        desc: desc,
        expiration: expiration,
        ends: ends,
        starts: starts,
        exclusions: exclusions,
        inclusions: inclusions,
        tips: tips,
        duration: duration,
        setprice: setprice,
        freecoupon: freecoupon,
        reqnam: reqnam,
        reqage: reqage,
        reqlead: reqlead,
        reqid: reqid,
        reqnew: reqnew,
        reqnew_name: reqnew_name,
        alloptions: alloptions
    };
    $('#cargaagreeent').load(_url, _urlconfig, function(response, status, xhr) {
        switch (status) {
            case "error":
                $('#cargaagreeent').empty();
                myezAlert.render("We are sorry, There aren't Agreements for this category");
                break;
            case "success":
                $('#mask-agree').panel();
                $('#mask-agree').show();
                $('#mask-agree').panel('open');
                //$('#myeztravel-faq').fadeIn(300);
        }
    });
}

function openoldagreement(oldid) {
    $('body').append('<div id="mask-agree" class="mask-agree" align="center"></div>');
    $('.mask-agree').append('<div id="cargaagreeent"></div>');
    $('#cargaagreeent').showLoading("Please Wait,<br/>Retriving Topics...<br/>", false);
    var _url = 'data_ajax/cl_agreement2.cfm';
    var _urlconfig = {
        idunico: oldid
    };
    $('#cargaagreeent').load(_url, _urlconfig, function(response, status, xhr) {
        switch (status) {
            case "error":
                CloseAgreement();
                myezAlert.render("We are sorry, There aren't Agreements for this category");
                break;
            case "success":
                $('#mask-agree').fadeIn(300);
                //$('#myeztravel-faq').fadeIn(300);
        }
    });
}

function CloseAgreement() {
    $('#mask-agree').fadeOut(300).empty().remove();
}
//funcion para abrir la lap pestaña de pricings desde cualquier lado
function upgradeplan_client() {
    $('#menucl-upgrades').trigger('click');
}

function req_new() {
    var che = document.getElementById('req_oth').checked;
    if (che == true) {
        document.getElementById('req_oth_name').disabled = '';
    } else {
        document.getElementById('req_oth_name').disabled = 'disabled';
    }
}
var maxoptions = 3;
couponin = false;

function showFCoupon() {
    if (couponin) {
        couponin = false;
        $('#couponsdiv').hide();
        document.getElementById('btnfcoupon').style.backgroundColor = 'lightgray';
    } else {
        if (freecoupon == 1) {
            couponin = true;
            $('#couponsdiv').show();
            document.getElementById('btnfcoupon').style.backgroundColor = '#17375e';
        } else {
            /*var upgrade = confirm('You need to upgrade your plan to activate the free coupon ');
            if (!upgrade) {
                return false;
            } else {
                Openphp('shop.html', 155, 9);
            }*/
            myezAlert.render('You need to upgrade your plan to activate the free coupon ', 'conf', function() {
                $('#menucl-upgrades').click();
            })
        }
    }
}

//function Openphp(page,usid,clid){myezAlert.render('Mudar funcion a C({obj})');}
//funcion para abrir la lap pestaña de pricings desde cualquier lado
/*function upgradeplan_client() {
    C({
        D: '#shop',
        op2: 'shop'
    });
}*/
//termina funcion agregada
function refresh_p() {
    window.open('cl_home.cfm', '_self');
}

function addnewimg() {
    imgcants = imgcants + 1;
    imgcants2 = imgcants2 + 1;
    if (imgcants == 10) {
        $('#linkaddimg').hide();
    }
    if (uploadimg == 2) {
        var text = '<div id="imgup_' + imgcants2 + '"><table><tr><td><input id="img_link_' + imgcants2 + '" class="img_link" type="text" value="" onchange="addpreviewimg(' + imgcants2 + ');" /></td><td class="previewimg_' + imgcants2 + '"></td><td><img src="https://lh5.googleusercontent.com/-Cb5dhSGmMSA/U5I5STA1muI/AAAAAAANfGk/1rOXlx8756Q/s52/Untitled8.png" height="25" onclick="deleteimg(' + imgcants2 + ');"/></td></tr></div>';
    }
    if (uploadimg == 1) {
        imgtoupload.push(imgcants2);
        var text = '<div id="imgup_' + imgcants2 + '"><table><tr><td><input id="upload_f_' + imgcants2 + '" name="upload_f_' + imgcants2 + '" type="file" onchange="readURL(' + imgcants2 + ');"/><input type="hidden" id="upload_n_' + imgcants2 + '" name="upload_n_' + imgcants2 + '" value=""></td><td><img src="https://www.myezplan.com/ezmapas/maps_pics/7553404376376420_dc.png" id="uploadPreview_' + imgcants2 + '" style="width: 50px; height: 50px;" /></td><td><img src="https://lh5.googleusercontent.com/-Cb5dhSGmMSA/U5I5STA1muI/AAAAAAANfGk/1rOXlx8756Q/s52/Untitled8.png" height="25" onclick="deleteimg(' + imgcants2 + ');"></td></tr></div>';
    }
    $('#imglinks').append(text);;
}

function addpreviewimg(cual) {
    var imgsrc = document.getElementById('img_link_' + cual).value;
    var img = '';
    if (imgsrc != '') {
        var img = '<img class="imglink_' + cual + '" src="' + imgsrc + '" height="50px" width="50px";/>';
    }
    $('.previewimg_' + cual).html(img);
    $(".imglink_" + cual).error(function() {
        $(this).unbind("error").attr("src", "https://www.myezplan.com/ezmapas/maps_pics/basic/noimage2.png");
    })

}

function readURL(cual) {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById('upload_f_' + cual).files[0]);
    oFReader.onload = function(oFREvent) {
        document.getElementById("uploadPreview_" + cual).src = oFREvent.target.result;
        document.getElementById('upload_n_' + cual).value = document.getElementById('upload_f_' + cual).value;
    };
}

function deleteimg(cual) {
    var imgtoupload2 = [];
    for (i = 0; i < imgtoupload.length; i++) {
        if (imgtoupload[i] != cual) {
            imgtoupload2.push(imgtoupload[i]);
        }
    }
    imgtoupload = imgtoupload2;
    $('#linkaddimg').show();
    $('#imgup_' + cual).remove();
    imgcants = imgcants - 1;
    document.getElementById('img_toupload').value = imgtoupload.join(',');
}

function deleteimg_sub(cual) {
    var imgsrc = document.getElementById('img_link_' + cual).value;
    if (imgsrc.indexOf("https://www.myezplan.com/img_usr/") != -1) {
        imgtodelete.push(imgsrc);
    }
    deleteimg(cual);
}

function helfromtext() {
    //e.stopPropagation();e.preventDefault();
    $('#myeztravel-faq').showLoading("Please Wait,<br/>Retriving Topics...<br/>", false);
    $('body').append('<div id="mask-faq" class="mask-faq"></div>');
    var _url = "data_ajax/faq_ajax_content.cfm?page=promotext";
    var _urlconfig = {
        action: 'Faq_index'
    };
    $('#myeztravel-faq').load(_url, _urlconfig, function(response, status, xhr) {
        switch (status) {
            case "error":
                $('#myeztravel-faq').empty();
                myezAlert.render("We are sorry, There aren't any help files in this page");
                break;
            case "success":
                $('#mask-faq').fadeIn(300);
                $('#myeztravel-faq').fadeIn(300);
        }
    });
    return false; //myezAlert.render('llega al final');
}

function helfromtext2(cual) {
    //e.stopPropagation();e.preventDefault();
    if (cual == 1) {
        var word = 'howigetpay';
    }
    if (cual == 2) {
        var word = 'qrcode';
    }
    $('#myeztravel-faq').showLoading("Please Wait,<br/>Retriving Topics...<br/>", false);
    $('body').append('<div id="mask-faq" class="mask-faq"></div>');
    var _url = "data_ajax/faq_ajax_content.cfm?page=" + word;
    var _urlconfig = {
        action: 'Faq_index'
    };
    $('#myeztravel-faq').load(_url, _urlconfig, function(response, status, xhr) {
        switch (status) {
            case "error":
                $('#myeztravel-faq').empty();
                alert("We are sorry, There aren't any help files in this page");
                break;
            case "success":
                $('#mask-faq').fadeIn(300);
                $('#myeztravel-faq').fadeIn(300);
        }
    });
    return false;
}

function checkrvalue(id) {
    var v = parseFloat(document.getElementById('detail_regularprice' + id).value);
    if (isNaN(v)) {
        myezAlert.render('please insert a valid price');
        document.getElementById('detail_regularprice' + id).focus();
    } else {
        document.getElementById('detail_regularprice' + id).value = v.toFixed(2);
    }
}

function checksvalue(id) {
    var v = parseFloat(document.getElementById('detail_specialprice' + id).value);
    if (isNaN(v)) {
        myezAlert.render('please insert a valid price');
        document.getElementById('detail_specialprice' + id).focus();
    } else {
        document.getElementById('detail_specialprice' + id).value = v.toFixed(2);
    }
}

function addplaceasstop(rutaid, action) {
    if (action == 'I') {
        for (p = 0; p < placesasstops.length; p++) {
            if (placesasstops[p].placeid == rutaid) {
                mark = createStopMarker(placesasstops[p].getPosition(), rutassel, arrayrutas[rutassel].stops.length, rutaid, placesasstops[p].getTitle());
                mark.orgindex = p;
                arrayrutas[rutassel].stops.push(mark);
                placesasstops[p].setMap(null);
                $("#resstops").show();
            }
        }
    } else {
        for (s = 0; s < arrayrutas[rutassel].stops.length; s++) {
            if (arrayrutas[rutassel].stops[s].placeid == rutaid) {
                deletestopdata(s, rutassel);
            }
        }
        if (arrayrutas[rutassel].stops.length == 0) {
            $("#resstops").hide();
        }
    }
    $('#roadmapplace-box_panel a.closesmall').trigger('click');
}

function ShowInfo(rutaid) {

    var url = "../data_ajax/map_stop_tabinfo_new.cfm?rnu=5131616516651";
    var urlconfig = {
        ruta_id: rutaid,
        source: 'clients'
    };
    $("#roadmapplace-box_stops #box-body").load(url, urlconfig);
    var popup = $("#roadmapplace-box_panel");

    $("#roadmapplace-box_panel").show();
    $("#roadmapplace-box_panel").panel("open");
    $("#roadmapplace-box_panel #box-body").empty();
    $('#roadmapplace-box_panel #box-body').html('<p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><center>Loading Stop Info....</center>');
    $.post(url, urlconfig).success(function(response, status, xhr) {
        $('#roadmapplace-box_panel #box-body').html(response);
    });



}

function ViewHidePlaces() {
    if (viewsp) {
        viewsp = false;
        document.getElementById('buttplacesasstops').style.backgroundColor = 'lightgray';
        $('#spanplacesasstops').hide();
        for (p = 0; p < placesasstops.length; p++) {
            if (placesasstops[p].isadded == 0) {
                placesasstops[p].setMap(null);
            }
        };
    } else {
        viewsp = true;
        document.getElementById('buttplacesasstops').style.backgroundColor = '#17375E';
        $('#spanplacesasstops').show();
        for (p = 0; p < placesasstops.length; p++) {
            if (map3.getBounds().contains(placesasstops[p].getPosition())) {
                if (placesasstops[p].isadded == 0) {
                    placesasstops[p].setMap(map3);
                }
            };
        };
    }
}

function hidesuggs(cual) {
    if (cual != 6) {
        $('#DaysVali').hide();
    }
    if (cual != 1) {
        $('#rest_sug').hide();
        $('#Estehka3').hide();
    }
    if (cual != 2) {
        $('#incl_sug').hide();
        $('#Estehka2').hide();
    }
    if (cual != 3) {
        $('#hours_sug').hide();
        document.getElementById('detail_hoursoperation').style.height = '42px';
    }
    if (cual != 4) {
        $('#tips_sug').hide();
        $('#SuggestionsHere').hide();
    }
    if (cual != 5) {
        $('#durexample').hide();
        $('#Estehka').hide();
    }
}



function codefecha(cadena) {
    var separador = "/"
    if (cadena.indexOf(separador) != -1) {
        var posi1 = 0
        var posi2 = cadena.indexOf(separador, posi1 + 1)
        var posi3 = cadena.indexOf(separador, posi2 + 1)
        this.mes = cadena.substring(posi1, posi2)
        this.dia = cadena.substring(posi2 + 1, posi3)
        this.anio = cadena.substring(posi3 + 1, cadena.length)
    } else {
        this.dia = 0
        this.mes = 0
        this.anio = 0
    }
}

function PreviewPromo(cual) {
    var name = $('#Placename').val();
    var desc = $('#detail_desc').val();
    var rest = $('#detail_rest').val();
    var incl = $('#detail_incl').val();
    var tips = $('#detail_tips').val();
    var hours = $('#detail_hoursoperation').val();
    var duration = $('#detail_duration').val();
    var newdaysav_ = [];
    for (d = 1; d <= 7; d++) {
        var che = document.getElementById('day' + d).checked;
        if (che == true) {
            newdaysav_.push(1);
        } else {
            newdaysav_.push(0);
        }
    }
    var newdaysav = newdaysav_.join(',');
    var newprices_ = [];
    $('.che_pri').each(function(index, element) {
        var id_ = $(element).attr('id');
        var id = parseInt(id_.replace('Che_', ''));
        var newpr = document.getElementById('detail_regularprice' + id).value;
        var newps = document.getElementById('detail_specialprice' + id).value;
        if (newpr != '' || newps != '') {
            newprices_.push(id + ',' + newpr + ',' + newps);
        }
    });
    var newprices = newprices_.join('*');
    if (newprices == '' || newprices == '1,,') {
        var newprices = 'NOPRICES';
    }
    var optionbase = name + '!' + desc + '!' + document.getElementById('resdays').value + '!' + newdaysav + '!' + newprices;
    var ends = $('#Ends').val();
    var expires = $('#Expires').val();
    var services_ = [];
    var transport_ = [];
    var req_nam_ = 0;
    var req_age_ = 0;
    var req_lead_ = 0;
    var req_oth_ = 0;
    var req_oth_name = '';
    var req_nam = document.getElementById('req_nam').checked;
    if (req_nam == true) {
        var req_nam_ = 1;
    }
    var req_age = document.getElementById('req_age').checked;
    if (req_age == true) {
        var req_age_ = 1;
    }
    var req_lead = document.getElementById('req_lead').checked;
    if (req_lead == true) {
        var req_lead_ = 1;
    }
    var req_oth = document.getElementById('req_oth').checked;
    if (req_oth == true) {
        var req_oth_ = 1;
        var req_oth_name = document.getElementById('req_oth_name').value;
    }
    var companyname = $('#companyname').val();
    var phone = $('#detail_phone').val();
    var wurl = $('#detail_website').val();
    var address = $('#detail_address').val();
    var email = $('#detail_email').val();
    var placecoors = marker.getPosition();
    var currency = document.getElementById('currselect').value;
    var services_ = [];
    var transport_ = [];
    for (s = 1; s <= 4; s++) {
        var che = document.getElementById('detail_services' + s).checked;
        if (che) {
            services_.push(s);
        }
    }
    var services = services_.join(',');
    for (t = 1; t <= 5; t++) {
        var che = document.getElementById('detail_transportation' + t).checked;
        if (che) {
            transport_.push(t);
        }
    }
    var transport = transport_.join(',');
    var url = "data_ajax/preview_place_tabinfo.cfm?rnu=5131616516651";
    var urlconfig = {
        ruta_name: name,
        info_description: desc,
        rest: rest,
        incl: incl,
        detail_tips: tips,
        detail_duration: duration,
        detail_hoursoperation: hours,
        optionbase: optionbase,
        expires: expires,
        ends: ends,
        reqnam: req_nam_,
        reqage: req_age_,
        reqlead: req_lead_,
        reqoth: req_oth,
        reqothname: req_oth_name,
        companyname: companyname,
        phone: phone,
        wurl: wurl,
        address: address,
        email: email,
        currency: currency,
        services: services,
        transport: transport,
        placecoors: placecoors.toString().replace(/ /g, '')
    };


    $("#prev_panel #box-body").load(url, urlconfig);

    //$("#roadmapplace-box_stops #box-body").load(url,urlconfig);
    var popup = $("#prev_panel");
    var popMargTop = 650;
    var popMargLeft = ($(popup).width() + 24) / 2;

    var popZindez = (parseInt(popup.css("z-index"))) + 5;
    $(popup).css({
        'z-index': popZindez + 1
    });
    $(popup).fadeIn(150);
    $(popup).scrollToMe();
    setTimeout("changeimg()", 3000);



}



/*
function PreviewPromo(cual){
var name=$('#Placename').val();
var desc=$('#detail_desc').val();
var rest=$('#detail_rest').val();
var incl=$('#detail_incl').val();
var tips= $('#detail_tips').val();
var hours=$('#detail_hoursoperation').val();
var duration=$('#detail_duration').val();
var newdaysav_=[];
for(d=1;d<=7;d++){
var che=document.getElementById('day'+d).checked;
if(che==true){newdaysav_.push(1);
}else{newdaysav_.push(0);
}}
var newdaysav=newdaysav_.join(',');
var newprices_=[];
$('.che_pri').each(function(index,element){
var id_=$(element).attr('id')
var id=parseInt(id_.replace('Che_',''));
var che=document.getElementById(id_).checked;
if(che==true){var newpr=document.getElementById('detail_regularprice'+id).value;
var newps=document.getElementById('detail_specialprice'+id).value;
newprices_.push(id+','+newpr+','+newps);
}});
var newprices=newprices_.join('*');
if(newprices==''||newprices=='1,,'){var newprices='NOPRICES';
}
var optionbase=name+'!'+desc+'!'+document.getElementById('resdays').value+'!'+newdaysav+'!'+newprices;
var expires=$('#Expires').val();
var req_nam_=0;
var req_nam=document.getElementById('req_nam').checked;
if(req_nam==true){var req_nam_=1;}
var req_age_=0;
var req_age=document.getElementById('req_age').checked;
if(req_age==true){var req_age_=1;}
var req_lead_=0;
var req_lead=document.getElementById('req_lead').checked;
if(req_lead==true){var req_lead_=1;}
var req_oth=document.getElementById('req_oth').checked;
if(req_oth==true){var req_oth_=1;var req_oth_name=document.getElementById('req_oth_name').value;}
var companyname=$('#companyname').val();
var phone=$('#detail_phone').val();
var wurl=$('#detail_website').val();
var address=$('#detail_address').val();
var email=$('#detail_email').val();
var placecoors=marker.getPosition();
var url="data_ajax/preview_place_tabinfo.cfm?rnu=5131616516651";
var urlconfig={ruta_name:name,info_description:desc,rest:rest,incl:incl,detail_tips:tips,detail_duration:duration,detail_hoursoperation:hours,optionbase:optionbase,expires:expires,reqnam:req_nam_,reqage:req_age_,reqlead:req_lead_,companyname:companyname,phone:phone,wurl:wurl,address:address,email:email,placecoors:placecoors.toString().replace(/ /g,'')};



$("#prev_panel #box-body").load(url,urlconfig);

//$("#roadmapplace-box_stops #box-body").load(url,urlconfig);
var popup=$("#prev_panel");
var popMargTop=650;
var popMargLeft=($(popup).width()+ 24)/ 2;
 
var popZindez=(parseInt(popup.css("z-index")))+ 5;
$(popup).css({'z-index':popZindez+ 1});
$(popup).fadeIn(150);
$(popup).scrollToMe();
setTimeout("changeimg()",3000);
}

*/



function PreviewImgView(ruta_name) {

    var url = "data_ajax/cl_add_promotions.cfm?rnu=5131616516651";
    var urlconfig = {
        action: 'previewIMG',
        ruta_name: ruta_name
    };
    $("#blanco").load(url, urlconfig);
    var popup2 = $("#negro");
    $(popup2).fadeOut(150);
    var popup = $("#blanco");
    var popMargTop = 650;
    var popMargLeft = ($(popup).width() + 24) / 2;
    $(popup2).css({
        'z-index': 2000
    });
    var popZindez = (parseInt(popup2.css("z-index"))) + 5;
    $(popup).css({
        //'margin-top' : -popMargTop,
        //'margin-left' : -popMargLeft,
        'z-index': popZindez + 1
    });
    $(popup).fadeIn(150);
    $(popup).scrollToMe();
    $(popup2).show();
}

function PreviewStreetView(ruta_name, placecoors) {
    var url = "data_ajax/cl_add_promotions.cfm?rnu=5131616516651";
    var urlconfig = {
        action: 'previewSV',
        ruta_name: ruta_name,
        placecoors: placecoors
    };



    $("#streetview_panel #box-body").load(url, urlconfig);
    var popup = $("#streetview_panel");
    $(popup).css({
        'z-index': 2000
    });
    $(popup).fadeIn(150);
    $(popup).scrollToMe();
    $(popup).show();
}

function PreviewRoutesView(ruta_name, placecoors) {
    var url = "data_ajax/cl_add_promotions.cfm?rnu=5131616516651";
    var urlconfig = {
        action: 'previewRV',
        ruta_name: ruta_name,
        placecoors: placecoors
    };
    var popup = $("#roadmapplace-boxmedia_clientpreview");
    $(popup).panel();
    (popup).show();
    $("#roadmapplace-boxmedia_clientpreview #box-body").load(url, urlconfig);
    var popup2 = $("#prev_panel");
    //$(popup2).fadeOut(150);
    var popMargTop = 650;
    var popMargLeft = ($(popup).width() + 24) / 2;
    var popZindez = (parseInt(popup2.css("z-index"))) + 5;
    $(popup).css({
        //'margin-top' : -popMargTop,
        //'margin-left' : -popMargLeft,
        'z-index': popZindez + 1
    });
    $(popup).panel('open');
    //$(popup).scrollToMe();
}

function changeimg() {
    if (imgcants == 0) {
        var primera = 'no';
    } else {
        var numlink = 100;
        var numup = 100;
        for (i = 1; i <= imgcants2; i++) {
            if (numlink == 100) {
                var li = $('#img_link_' + i).val() || '';
                if (li != '') {
                    var numlink = i;
                }
            }
        }
        if (imgtoupload.length > 0) {
            var numup = imgtoupload[0]
        }
        var primera = 'up'
        if (numlink < numup) {
            var primera = 'link'
        }
    }
    if (primera == 'no') {
        //document.getElementById("placeimg").src = 'https://www.myezplan.com/ezmapas/maps_pics/basic/noimage.png';
        $("#mylogo-prev").show();
    }
    if (primera == 'link') {
        var lin = document.getElementById('img_link_' + numlink).value;
        $("#mylogo-prev").hide();
        document.getElementById("placeimg").src = lin;
        $("#placeimg").show();
    }
    if (primera == 'up') {
        var oFReader = new FileReader();
        oFReader.readAsDataURL(document.getElementById('upload_f_' + numup).files[0]);
        oFReader.onload = function(oFREvent) {
            $("#mylogo-prev").hide();
            document.getElementById("placeimg").src = oFREvent.target.result;
            $("#placeimg").show();
        };
    }
}

function gettexts(cat) {
    if (cat == '') {
        $('#tips_sug').html('');
        $('#rest_sug').html('');
        $('#incl_sug').html('');
        $('#tips_sug').html('');
        return false;
    }
    gettext_s(cat);
    gettext_r(cat);
    gettext_i(cat);
    gettext_h(cat);
}

function gettext_s(cat) {
    var url = "data_ajax/cl_add_promotions.cfm?rnu=1354684656";
    var urlconfig = {
        action: "GetTexts",
        cat: cat
    };
    $('#tips_sug').load(url, urlconfig, function(response, status, xhr) {
        switch (status) {
            case "error":
                $('#tips_sug').empty();
                break;
        }
    });
}

function gettext_r(cat) {
    var url = "data_ajax/cl_add_promotions.cfm?rnu=1354684656";
    var urlconfig = {
        action: "GetTexts2",
        cat: cat
    };
    $('#rest_sug').load(url, urlconfig, function(response, status, xhr) {
        switch (status) {
            case "error":
                $('#rest_sug').empty();
                break;
        }
    });
}

function gettext_i(cat) {
    var url = "data_ajax/cl_add_promotions.cfm?rnu=1354684656";
    var urlconfig = {
        action: "GetTexts3",
        cat: cat
    };
    $('#incl_sug').load(url, urlconfig, function(response, status, xhr) {
        switch (status) {
            case "error":
                $('#incl_sug').empty();
                break;
        }
    });
}

function gettext_h(cat) {
    var url = "data_ajax/cl_add_promotions.cfm?rnu=1354684656";
    var urlconfig = {
        action: "GetTexts4",
        cat: cat
    };
    $('#hours_sug').load(url, urlconfig, function(response, status, xhr) {
        switch (status) {
            case "error":
                $('#hours_sug').empty();
                break;
        }
    });
}

function helpsdepartes(cualpage) {
    $('#myeztravel-faq').showLoading("Please Wait,<br/>Retriving Topics...<br/>", false);
    $('body').append('<div id="mask-faq" class="mask-faq"></div>');
    var _url = "data_ajax/faq_ajax_content.cfm?page=" + cualpage;
    var _urlconfig = {
        action: 'Faq_index'
    };
    $('#myeztravel-faq').load(_url, _urlconfig, function(response, status, xhr) {
        switch (status) {
            case "error":
                $('#myeztravel-faq').empty();
                myezAlert.render("We are sorry, There aren't any help files in this page");
                break;
            case "success":
                $('#mask-faq').fadeIn(300);
                $('#myeztravel-faq').fadeIn(300);
                $('#myeztravel-faq').scrollToMe();
        }
    });
}

function Reset_Stops() {
    $('#butt_reset_s').hide();
    for (s = 0; s < stops.length; s++) {
        stops[s].setMap(null);
    }
    stops = [];
    stops_nd = [];
    stopscount = 0;
    for (s2 = 0; s2 < placesasadded.length; s2++) {
        for (s3 = 0; s3 < placesasstops.length; s3++) {
            if (placesasstops[s3].placeid == placesasadded[s2]) {
                var icon_ = placesasstops[s3].getIcon();
                var icon = icon_.replace('s.png', '.png');
                placesasstops[s3].setIcon(icon);
                placesasstops[s3].isadded = 0;
                if (!viewsp) {
                    placesasstops[s3].setMap(null)
                };
            }
        }
    }
}


function createroute() {
    var color = coloresarray[arrayrutas.length];
    var index = arrayrutas.length;
    rutassel = index;
    var num = index + 1;
    //var name = prompt('Route Name', 'Route ' + num) || '';
    window.crteroute = $.Deferred();
    myezPrompt.render('Name of promotion','Route ' + num,function(){crteroute.resolve( 'and' );});
    crteroute.done(function( n ) {
        var name = document.getElementById('prompt_value1').value || '';
        if (!name || name == '') {} else {
            var latlngs = new google.maps.MVCArray();
            var polyline = new google.maps.Polyline({
                path: latlngs,
                map: map,
                strokeColor: color,
                strokeWeight: 7,
                strokeOpacity: 0.5
            });
            polyline.name = name;
            polyline.color = color;
            polyline.idx = index;
            polyline.stops = [];
            polyline.markers = [];
            polyline.locations = [];
            polyline.direction = 1;
            arrayrutas.push(polyline);
            updateroutes();
            $('#todrawtorut').show();
        }
    });
}

function changedirection(index) {
    var olddir = arrayrutas[index].direction;
    if (olddir == 1) {
        arrayrutas[index].direction = 2;
        document.getElementById('dirr_' + index).src = 'https://lh3.googleusercontent.com/-F2okjA-0vfw/VTqY10fI9uI/AAAAAAANhYQ/SuL705uuREI/s45/lado%25202.png';
        $('#dirr_' + index + ' svg use').attr('xlink:href', '#icon-rotate_left');
    } else {
        arrayrutas[index].direction = 1;
        document.getElementById('dirr_' + index).src = 'https://lh3.googleusercontent.com/-qrnDeaWgEQQ/VTqVNrMCWpI/AAAAAAANhYE/Q3yDCYDKwiU/s45/lado%25201.png';
        $('#dirr_' + index + ' svg use').attr('xlink:href', '#icon-rotate_right');
    }
}

function selroute(index) {
    rutassel = index;
    $('#dirr_' + index).attr('style', 'display:inherit;');
    $('#resetr_' + index).attr('style', 'display:inherit;');
    document.getElementById('buttstops_' + index).style.display = 'inherit';
    $('#delr_' + index).attr('style', 'display:inherit;');

    for (m = 0; m < arrayrutas[index].markers.length; m++) {
        arrayrutas[index].markers[m].setMap(map);
    }
    for (r = 0; r < arrayrutas.length; r++) {
        if (r != index) {
            $('#dirr_' + r).attr('style', 'display:none;');
            $('#resetr_' + r).attr('style', 'display:none;');
            document.getElementById('buttstops_' + r).style.display = 'none';
            $('#delr_' + r).attr('style', 'display:none;');
            for (m = 0; m < arrayrutas[r].markers.length; m++) {
                arrayrutas[r].markers[m].setMap(null);
            }
        }
    }
    if (arrayrutas[index].markers.length > 0) {
        $('#resetr_' + index).show();
    } else {
        $('#resetr_' + index).hide();
    }
}

function resetroute(index) {
    console.log(arguments.length);
    var callbak = "function(index){console.log(" + index + ");var index = " + index + ";for (m = 0; m < arrayrutas[index].markers.length; m++){arrayrutas[index].markers[m].setMap(null);}arrayrutas[index].markers = [];arrayrutas[index].locations = [];arrayrutas[index].setPath(arrayrutas[index].locations);if ($('#resetr_' + index)) {$('#resetr_' + index).hide();console.log('si paso');}}"
    myezAlert.render('You are going to reset this route, are you sure?', 'conf', callbak);
    /*var conf = confirm('You are going to reset this route, are you sure?');
    if (!conf) {
        return false;
    } else {
        for (m = 0; m < arrayrutas[index].markers.length; m++) {
            arrayrutas[index].markers[m].setMap(null);
        }
        arrayrutas[index].markers = [];
        arrayrutas[index].locations = [];
        arrayrutas[index].setPath(arrayrutas[index].locations);

        if ($('#resetr_' + index)) {
            $('#resetr_' + index).hide();
            console.log('si paso');
        }

    }*/
}

function deleteroute(index) {
    window.delroute = $.Deferred();
    myezAlert.render('You are going to delete this route, are you sure?','conf',function(){delroute.resolve();});
    //var conf = confirm('You are going to delete this route, are you sure?');
    /*if (!conf) {
        return false;
    }*/
    delroute.done(function() {
        for (m = 0; m < arrayrutas[index].markers.length; m++) {
            arrayrutas[index].markers[m].setMap(null);
        }
        arrayrutas[index].setMap(null);
        arrayrutas.splice(index, 1);
        for (r = 0; r < arrayrutas.length; r++) {
            arrayrutas[r].setOptions({
                strokeColor: coloresarray[r]
            });
            arrayrutas[r].color = coloresarray[r];
            for (m = 0; m < arrayrutas[r].markers.length; m++) {
                arrayrutas[r].markers[m].ridx = r;
            }
            for (s = 0; s < arrayrutas[r].stops.length; s++) {
                arrayrutas[r].stops[s].setIcon(iconosarray[r]);
            }
        }
        if (rutassel == index) {
            if (arrayrutas.length > 0) {
                rutassel = 0;
            } else {
                rutassel = -1;
            }
        }
        if (arrayrutas.length > 0) {
            $('#todrawtorut').show();
        } else {
            $('#todrawtorut').hide();
        }
        updateroutes();
    });
}

function changename(index) {
    arrayrutas[index].name = document.getElementById('namer_' + index).value;
}

function viewpstops() {
    if (viewsp) {
        viewsp = false;
        document.getElementById('buttpstops').style.backgroundColor = 'lightgray';
        for (ps = 0; ps < placesasstops.length; ps++) {
            placesasstops[ps].setMap(null);
        }
    } else {
        viewsp = true;
        document.getElementById('buttpstops').style.backgroundColor = '#17375e';
        for (ps = 0; ps < placesasstops.length; ps++) {
            placesasstops[ps].setMap(map);
        }
    }
}

function updateroutes() {
    var text = '<table>';
    var r2 = '';
    for (r = 0; r < arrayrutas.length; r++) {
        var disp = "none;";
        if (r == rutassel) {
            var disp = "inherit";
            for (m = 0; m < arrayrutas[r].markers.length; m++) {
                arrayrutas[r].markers[m].setMap(map);
            }
            r2 = r;
        } else {
            for (m = 0; m < arrayrutas[r].markers.length; m++) {
                arrayrutas[r].markers[m].setMap(null);
            }
        }
        var dir = 'https://lh3.googleusercontent.com/-qrnDeaWgEQQ/VTqVNrMCWpI/AAAAAAANhYE/Q3yDCYDKwiU/s45/lado%25201.png';
        if (arrayrutas[r].direction == 2) {
            var dir = 'https://lh3.googleusercontent.com/-F2okjA-0vfw/VTqY10fI9uI/AAAAAAANhYQ/SuL705uuREI/s45/lado%25202.png';
        }
        var text = text + '<tr onclick="selroute(' + r + ');" ><td><input id="namer_' + r + '" type="text"  style="font-weight:bolder; width:160px;max-width:160px;color:' + arrayrutas[r].color + '" value="' + arrayrutas[r].name + '" onblur="changename(' + r + ');"/></td><td><a id="dirr_' + r + '"  style=" display:' + disp + '" onclick="changedirection(' + r + ');"><svg class="icon icon-rotate_right" style="width: 35px; height: 35px; fill: rgb(23, 55, 94);"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-rotate_right"></use></svg></<a</td><td><a id="buttstops_' + r + '" style=" display:' + disp + '" onclick="viewstops();"><svg class="icon icon-pin_drop" style="width: 35px; height: 35px; fill: rgb(23, 55, 94);"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-pin_drop"></use></svg></a></td><td><a id="resetr_' + r + '"  style=" display:' + disp + '"  onclick="resetroute(' + r + ');"><svg class="icon icon-refresh" style="width: 35px; height: 35px; fill: rgb(23, 55, 94);"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-refresh"></use></svg></a></td><td><a  id="delr_' + r + '"  style=" display:' + disp + '" onclick="deleteroute(' + r + ');" ><svg class="icon icon-delete" title="Delete" style="width: 30px;height: 30px;fill:#c00000;"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-delete"></use></svg></a></td></tr>';
    }
    if (arrayrutas.length < 5) {
        var text = text + '<tr><td colspan="5" align="center"><input style="background-color:#4F6228;" type="button" value="New" onclick="createroute();" class="button-round-2 button-round-blue2"/></dd>';
    }
    var text = text + '</table>';
    $('#routeslist').html(text);


    if ($('#resetr_' + r2)) {
        if (arrayrutas[r2].markers.length > 0) {
            $('#resetr_' + r2).show();
        } else {
            $('#resetr_' + r2).hide();
        }
    }


}

function viewmap() {
    if (viewsp) {
        viewpstops();
    }
    p_o_r_o_s = 0;
    for (r = 0; r < arrayrutas.length; r++) {
        arrayrutas[r].setMap(null);
        for (m = 0; m < arrayrutas[r].markers.length; m++) {
            arrayrutas[r].markers[m].setMap(null);
        }
        for (s = 0; s < arrayrutas[r].stops.length; s++) {
            arrayrutas[r].stops[s].setMap(null);
        }
    }
    //document.getElementById('buttplace').style.backgroundColor = '#17375e';
    //document.getElementById('buttroute').style.backgroundColor = '#F2F2F2';
    //document.getElementById('buttstops').style.backgroundColor = '#F2F2F2';
    $('#routes_div').hide();
    $('#stops_div').hide();
    map.setCenter(marker.getPosition());
    map.setZoom(10);
}

function viewroute() {
    //if ($("#buttroute").attr('src') !== "https://lh3.googleusercontent.com/-IpnwTDPvKJ8/VEE9ewLerrI/AAAAAAANgqk/oj0a3G6Oes0/s53/route%2520b%2526w%2520small.png") {
    if ($("#buttroute svg").css('fill') !== "rgb(221, 221, 221)") {
        if (viewsp) {
            viewpstops();
        }
        p_o_r_o_s = 0;
        for (r = 0; r < arrayrutas.length; r++) {
            arrayrutas[r].setMap(null);
            for (m = 0; m < arrayrutas[r].markers.length; m++) {
                arrayrutas[r].markers[m].setMap(null);
            }
            for (s = 0; s < arrayrutas[r].stops.length; s++) {
                arrayrutas[r].stops[s].setMap(null);
            }
        }

        //document.getElementById('buttroute').style.backgroundColor = '#F2F2F2';
        //$("#buttroute").attr("src", "https://lh3.googleusercontent.com/-IpnwTDPvKJ8/VEE9ewLerrI/AAAAAAANgqk/oj0a3G6Oes0/s53/route%2520b%2526w%2520small.png");
        $("#buttroute svg").css('fill', '#ddd');
        marker.setOptions({
            draggable: true
        });
        $('#routes_div').hide();
        $('#stops_div').hide();
        map.setCenter(marker.getPosition());
        map.setZoom(10);
        $('#ismapfunctions').hide();
        document.getElementById('button_ismap').style.display = 'inherit';

    } else {
        if (viewsp) {
            viewpstops();
        }
        p_o_r_o_s = 1;

        //$("#buttroute").attr("src", "https://lh3.googleusercontent.com/-uPG50w9EmkM/VEDXQ-LPnnI/AAAAAAANgqE/VvaMNuGpOac/s53/9.png");
        $("#buttroute svg").css('fill', '#17375e');
        marker.setOptions({
            draggable: false
        });
        $('#stops_div').hide();
        for (r = 0; r < arrayrutas.length; r++) {
            arrayrutas[r].setMap(map);
            for (s = 0; s < arrayrutas[r].stops.length; s++) {
                arrayrutas[rutassel].stops[s].setMap(null);
            }
        }
        $('#routes_div').show();
        if (arrayrutas.length > 0) {
            $('#todrawtorut').show();
        } else {
            $('#todrawtorut').hide();
        }
        updateroutes();
        //google.maps.event.trigger(map2, 'resize');
        //map2.setCenter(marker.getPosition());
    }
}

function viewstops() {
    if (rutassel == -1) {
        myezAlert.render('you have to create routes first');
        return false;
    }
    document.getElementById('buttroute').src = 'https://lh3.googleusercontent.com/-IpnwTDPvKJ8/VEE9ewLerrI/AAAAAAANgqk/oj0a3G6Oes0/s53/route%2520b%2526w%2520small.png';
    $("#buttroute svg").css('fill', '#ddd');
    var nombre = arrayrutas[rutassel].name;
    $('#stopslist').html('<center><span style="color:' + arrayrutas[rutassel].color + ';">' + nombre + '</span></center>');
    p_o_r_o_s = 2;
    //document.getElementById('buttroute').style.backgroundColor = '#F2F2F2';
    /*document.getElementById('buttstops').style.backgroundColor='#17375e';*/
    $('#routes_div').hide();
    $('#stops_div').show();
    for (m = 0; m < arrayrutas[rutassel].markers.length; m++) {
        arrayrutas[rutassel].markers[m].setMap(null);
    }
    for (s = 0; s < arrayrutas[rutassel].stops.length; s++) {
        arrayrutas[rutassel].stops[s].setMap(map);
    }
    if (arrayrutas[rutassel].stops.length == 0) {
        if (document.getElementById('resstops')) {
            document.getElementById('resstops').style.display = 'none';
        }
    } else {
        if (document.getElementById('resstops')) {
            document.getElementById('resstops').style.display = 'inherit';
        }
    }
}

function openhelpes() {
    if (p_o_r_o_s == 0) {
        helpsdepartes('promo_map');
    }
    if (p_o_r_o_s == 1) {
        helpsdepartes('promo_route');
    }
    if (p_o_r_o_s == 2) {
        helpsdepartes('promo_stop');
    }
}

function ISMAP() {
    document.getElementById('button_ismap').style.display = 'none';
    $('#ismapfunctions').show();
    document.getElementById('ismap_v').value = 1;
    //crearroute();
    //crearstops();             
    //viewmap();
}

function NOMAP() {
    $('#ismapfunctions').hide();
    $('#button_ismap').html('<input onclick="ISMAP();" type="button" class="button-round-2 button-round-gray2" value="Map Options" />');
    //$('#mapa_r_puntos').hide();
    //$('#mapa_r_draw').hide();
    //$('#mapa_r_puntos').empty();
    //$('#mapa_r_draw').empty();
    //$('#mapa_cl').show();
    document.getElementById('ismap_v').value = 0;
}

function EditPromotion(id, action) {
    $('#div_listaterms').hide();
    document.getElementById('button_1').className = 'button-round-2 button-round-gray2';
    isaddopen = false;
    var url = "data_ajax/cl_add_promotions.cfm?rnu=1354684656";
    var urlconfig = {
        action: "AddUserPromotions",
        id: id,
        param: action
    };
    $('#promotions_data').load(url, urlconfig, function(response, status, xhr) {
        switch (status) {
            case "error":
                $('#promotions_data').empty();
                break;
        }
    });
}

function DeletePromotion(id) {
    //console.log('este es');
    var url = "data_ajax/clpromotions.cfm?rnu=1354684656";
    var urlconfig = {
        action: "DeletePromotion",
        id: id
    };
    $('#result_promo').load(url, urlconfig, function(response, status, xhr) {
        switch (status) {
            case "success":

                break;
            case "error":
                $('#result_promo').empty();
                break;
        }
    });
}

function idunico(lolo) {
    aleat = Math.random() * 9999999999999999;
    aleat2 = Math.random() * 9999999999999999;
    aleatf = Math.round(aleat + aleat2);
    return aleatf;
}

function SavePromo(sub_) {
    document.getElementById('status_promo').value = sub_;
    if (document.getElementById('actionsource').value != 'n') {
        if (imgtodelete.length > 0) {
            document.getElementById('img_todelete').value = imgtodelete.join('*');
        }
    }
    var che1 = document.getElementById('req_nam').checked;
    if (che1 == true) {
        document.getElementById('chename').value;
    }
    var che2 = document.getElementById('req_age').checked;
    if (che2 == true) {
        document.getElementById('cheage').value;
    }
    var che3 = document.getElementById('req_lead').checked;
    if (che3 == true) {
        document.getElementById('chelead').value;
    }
    var che4 = document.getElementById('req_id').checked;
    if (che4 == true) {
        document.getElementById('cheid').value = 1;
    }
    var che5 = document.getElementById('req_oth').checked;
    if (che5 == true) {
        document.getElementById('che_new').value = 1;
        document.getElementById('che_new_name').value = document.getElementById('req_oth_name').value;
    }
    var countryid = document.getElementById('select_country').value;
    var cityid = document.getElementById('select_city').value;
    document.getElementById('placecoors').value = marker.getPosition().toString().replace(/ /g, '');
    document.getElementById('cityid').value = cityid;
    document.getElementById('countryid').value = countryid;
    var name = $('#Placename').val();
    var desc = $('#detail_desc').val();
    var type = $('#detail_type').val();
    if (type == '') {
        type = 0;
    }
    document.getElementById('catid').value = type;
    var moneda = $('#currselect').val();
    document.getElementById('moneda_id').value = moneda;
    var expiration = $('#Expires').val();
    var ends = $('#Ends').val()
    var starts = $('#Starts').val();
    if (starts != '') {
        enddate = Date.parse(ends + " 00:00:00");
        startdate = Date.parse(starts + " 00:00:00");
        if (enddate < startdate) {
            myezAlert.render('Starts date is greater than Ends date, please type valid dates');
            $('#Starts').focus();
            return false;
        }
    }
    var phone = $('#detail_phone').val();
    var address = $('#detail_address').val();
    var setprice = $("#selsetprice :selected").text(); //$('#selsetprice').val();
    var setprice = parseInt(setprice.replace('%', ''));
    if (couponin) {
        document.getElementById('freecoupon').value = 1;
    }
    if (sub_ == 1) {
        if (ends == '') {
            myezAlert.render('All required data must be completed');
            $('#Ends').focus();
            return false;
        }
        if (name == '') {
            myezAlert.render('All required data must be completed');
            $('#Placename').focus();
            return false;
        }
        if (desc == '') {
            myezAlert.render('All required data must be completed');
            $('#detail_desc').focus();
            return false;
        }
        if (type == '') {
            myezAlert.render('All required data must be completed');
            $('#detail_type').focus();
            return false;
        }
        if (phone == '') {
            myezAlert.render('All required data must be completed');
            $('#detail_phone').focus();
            return false;
        }
        if (address == '') {
            myezAlert.render('All required data must be completed');
            $('#detail_address').focus();
            return false;
        }
        if (setprice == '') {
            myezAlert.render('All required data must be completed');
            $('#selsetprice').focus();
            return false;
        }
    }
    document.getElementById('setprice').value = setprice;
    document.getElementById('idunico').value = idunico(1);
    var newdaysav_ = [];
    for (d = 1; d <= 7; d++) {
        var che = document.getElementById('day' + d).checked;
        if (che == true) {
            newdaysav_.push(1);
        } else {
            newdaysav_.push(0);
        }
    }
    var newdaysav = newdaysav_.join(',');
    var newprices_ = [];
    $('.che_pri').each(function(index, element) {
        var id_ = $(element).attr('id')
        var id = parseInt(id_.replace('Che_', ''));
        var che = document.getElementById(id_).checked;
        //      if(che==true){
        var newpr = document.getElementById('detail_regularprice' + id).value;
        var newps = document.getElementById('detail_specialprice' + id).value;
        if (newpr != '' || newps != '') {
            if (newpr == '') {
                newpr = 0;
            }
            if (newps == '') {
                newps = 0;
            }
            newprices_.push(id + ',' + newpr + ',' + newps);
        }
    });
    var newprices = newprices_.join('*');
    if (sub_ == 1) {
        if (prcsError != "") {
            myezAlert.render('You have to check your promo prices');
            $('#selsetprice').focus();
            return false;
        }
        if (newprices == '' || newprices == '1,,') {
            myezAlert.render('You have to include at least one price');
            return false;
        }
        if (prcsError_0 != "") {
            myezAlert.render('You have to check your options prices');
            $('#selsetprice').focus();
            return false;
        }
    } else {
        if (newprices == '' || newprices == '1,,') {
            newprices = '1,0,0';
        }
    }
    if (desc == '') {
        var desc_ = 'NODESC'
    } else {
        var desc_ = desc;
    }
    var optionbase = name + '!' + desc_ + '!' + document.getElementById('resdays').value + '!' + newdaysav + '!' + newprices;
    arrayoptions.splice(0, 0, optionbase);
    document.getElementById('optionsdata').value = arrayoptions.join('?');
    var newagebands_ = [];
    $('.agebands').each(function(index, element) {
        var id_ = $(element).attr('id')
        var id = parseInt(id_.replace('ageband_from_', ''));
        var newagefrom = document.getElementById('ageband_from_' + id).value;
        var newageto = document.getElementById('ageband_to_' + id).value;
        if (newagefrom != '' && newageto != '') {
            newagebands_.push(id + ',' + newagefrom + ',' + newageto);
        }
    });
    document.getElementById('agebands').value = newagebands_.join('*');
    var links = [];
    for (x = 0; x <= arrayurllinks.length; x++) {
        if (arrayurllinks[x] != '') {
            links.push(arrayurllinks[x]);
        }
    }
    document.getElementById('url_links').value = links.join('*');
    for (i = 0; i < imgtoupload.length; i++) {
        if (imgtoupload[i] == '') {
            imgtoupload[i] = 'NOIMAGEN';
        }
    }
    document.getElementById('img_toupload').value = imgtoupload.join(',');
    var imglinks = [];
    $('.img_link').each(function(index, element) {
        if (element.value != '') {
            alguncambio = true;
            imglinks.push(element.value);
        }
    });
    document.getElementById('img_links').value = imglinks.join('*');
    var rutas = [];
    var stops = [];
    for (r = 0; r < arrayrutas.length; r++) {
        if (arrayrutas[r].locations.length >= 2) {
            rutas.push(r + '!' + arrayrutas[r].name + '!' + arrayrutas[r].locations.join('*').replace(/ /g, ''));
            for (s = 0; s < arrayrutas[r].stops.length; s++) {
                var desc = arrayrutas[r].stops[s].desc;
                if (desc == '') {
                    var desc = 'NODESC';
                }
                stops.push(arrayrutas[r].stops[s].getPosition().toString().replace(/ /g, '') + '*' + arrayrutas[r].stops[s].getTitle() + '*' + desc + '*' + r + '*' + arrayrutas[r].stops[s].placeid);
            }
        }
    }
    document.getElementById('ruta_data').value = rutas.join('?');
    document.getElementById('stops_data').value = stops.join('!');
    var services_ = [];
    var transport_ = [];
    for (s = 1; s <= 4; s++) {
        var che = document.getElementById('detail_services' + s).checked;
        if (che) {
            services_.push(s);
        }
    }
    document.getElementById('detailservices').value = services_.join(',');
    for (t = 1; t <= 5; t++) {
        var che = document.getElementById('detail_transportation' + t).checked;
        if (che) {
            transport_.push(t);
        }
    }
    document.getElementById('detailtransportation').value = transport_.join(',');
    //if(counter==0){myezAlert.render('All required data must be completed');return false;}
    ////myezAlert.render(cityid+' '+countryid);
    //var rest=$('#detail_rest').val();
    //var incl=$('#detail_incl').val();
    //var hours=$('#detail_hoursoperation').val();
    //var url=$('#detail_website').val();
    //var rprice=$('#detail_regularprice1').val();
    //var sprice=$('#detail_specialprice1').val();
    //var tips= $('#detail_tips').val();
    //var duration=$('#detail_duration').val();
    //var included=document.getElementById('tckincluded').value
    //if (included==''){myezAlert.render('Include at least one price!');return false;}
    //var included_=included.split(',');
    //var prices_='';
    //for(y=0;y<=(included_.length-1);y++){
    ////myezAlert.render(included_[y]);
    //var div=',';
    //if(prices_==''){var div = '';}
    //var nombre='detail_regularprice'+included_[y];
    //var nombre2='detail_specialprice'+included_[y];
    //var rp=document.getElementById(nombre).value;
    //var sp=document.getElementById(nombre2).value;
    ////myezAlert.render(rp+' '+sp)
    //var pric=rp+'!'+sp;
    //var prices_=prices_+div+pric
    //}
    //document.getElementById('tckprices').value=prices_;
    //if(name=='' || expiration=='' || type=='' || desc=='' || phone=='' || address=='' || rprice=='' || sprice==''){myezAlert.render('All required data must be completed');$('Placename').focus();return false;}
    //var ismap=document.getElementById('ismap_v').value;
    //if (ismap!=0){
    //if(markers.length!=0){
    //  var rutapath='';
    //  for(x=0;x<markers.length;x++){
    //      if(rutapath==''){var div='';}else{var div='*'}
    //      var rutapath=rutapath+div+markers[x].getPosition();
    //      }
    //  document.getElementById('ruta1').value=rutapath;
    //  document.getElementById('ruta1_n').value=polyline.name;
    //  }
    //if(markers2.length!=0){
    //  var rutapath='';
    //  for(x=0;x<markers2.length;x++){
    //      if(rutapath==''){var div='';}else{var div='*'}
    //      var rutapath=rutapath+div+markers2[x].getPosition();
    //      }
    //  document.getElementById('ruta2').value=rutapath;
    //  document.getElementById('ruta2_n').value=polyline2.name;
    //  }
    //if(markers3.length!=0){
    //  var rutapath='';
    //  for(x=0;x<markers3.length;x++){
    //      if(rutapath==''){var div='';}else{var div='*'}
    //      var rutapath=rutapath+div+markers3[x].getPosition();
    //      }
    //  document.getElementById('ruta3').value=rutapath;
    //  document.getElementById('ruta3_n').value=polyline3.name;
    //  }
    //if(markers4.length!=0){
    //  var rutapath='';
    //  for(x=0;x<markers4.length;x++){
    //      if(rutapath==''){var div='';}else{var div='*'}
    //      var rutapath=rutapath+div+markers4[x].getPosition();
    //      }
    //  document.getElementById('ruta4').value=rutapath;
    //  document.getElementById('ruta4_n').value=polyline4.name;
    //  }
    //if(markers5.length!=0){
    //  var rutapath='';
    //  for(x=0;x<markers5.length;x++){
    //      if(rutapath==''){var div='';}else{var div='*'}
    //      var rutapath=rutapath+div+markers5[x].getPosition();
    //      }
    //  document.getElementById('ruta5').value=rutapath;
    //  document.getElementById('ruta5_n').value=polyline5.name;
    //  }
    //if(stops.length>0){
    //var stops_='';
    //for(var i=0; i<stops.length;i++){
    //if(stops_==''){var div='';}else{var div='!';}
    //var unic=idunico(1);
    //var stops_=stops_+div+stops[i].getPosition()+'*'+stops_nd[i]+'*'+unic;
    //}
    //document.getElementById('stopsdata').value=stops_;
    //}
    //if(placesasadded.length>0){
    //var stops_p='';
    //for(i2=0;i2<placesasadded.length;i2++){
    //if(stops_p==''){var div='';}else{var div='!';}
    //var stops_p=stops_p+div+placesasadded[i2];
    //}
    //document.getElementById('stopsdata_p').value=stops_p;
    //
    //  }
    //}
    $("#new_promo").submit();
}

function acc_pri() {
    var che = document.getElementById('check_reg').checked;
    if (che) {
        $('#button_save').html('<input type="button" class="button-round-2 button-round-blue2" onclick="SavePromo(0);" value="Save"/>&nbsp;<input type="button" class="button-round-2 button-round-blue2" onclick="SavePromo(1);" value="Submit"/>');
    } else {
        $('#button_save').html('<input type="button" class="button-round-2 button-round-gray2" style="background-color:lightgray;" value="Save"/>&nbsp;<input type="button" class="button-round-2 button-round-gray2" style="background-color:lightgray;" value="Submit"/>');
    }
}

function add_promotions(userid) {
    if (!isaddopen) {
        isaddopen = true;
        $('#div_listaterms').hide();
        $('#Letrero1').hide();
        document.getElementById('button_1').className = 'button-round-2 button-round-blue2';
        $('#button_1').css('background', '');
        var url = "data_ajax/cl_add_promotions.cfm?rnu=1354684656";
        var urlconfig = {
            action: "AddUserPromotions",
            id: 0,
            param: 'new'
        };
        $('#promotions_data').load(url, urlconfig, function(response, status, xhr) {
            switch (status) {
                case "error":
                    $('#promotions_data').empty();
                    break;
            }
        });
    } else {
        isaddopen = false;
        $('#promotions_data').empty();
        document.getElementById('button_1').className = 'button-round-2 button-round-gray2';
        $('#button_1').css('background', '#ddd');
        $('#div_listaterms').show();
        $('#Letrero1').show();
    }
}



function traerciudadpromotions(estado) {
    var sel = '<select class="select_m"  id="select_city" name="select_city" onchange="crearmapa(this.value);"><option value="">Select City</option>';
    for (x = 0; x <= (countries.length - 1); x++) {
        var city = countries[x].split(',');
        var id = city[0];
        var eid = city[1];
        var name = city[2];
        if (eid == estado) {
            var sel = sel + '<option value="' + id + '">' + name + '</option>';
        }
        if (x == (countries.length - 1)) {
            var sel = sel + '</select>';
            $('#div_select_city').html(sel);
        }
    }
}

function traerciudadpromotions2(estado) {
    var sel = '<select id="select_city" name="select_city" onchange="updatemapa(this.value);"><option value="">Select City</option>';
    for (x = 0; x <= (countries.length - 1); x++) {
        var city = countries[x].split(',');
        var id = city[0];
        var eid = city[1];
        var name = city[2];
        if (eid == estado) {
            var sel = sel + '<option value="' + id + '">' + name + '</option>';
        }
        if (x == (countries.length - 1)) {
            var sel = sel + '</select>';
            $('#div_select_city').html(sel);
        }
    }
}

function updatemapa(city) {
    var url = "data_ajax/cl_add_promotions.cfm?rnu=1354684656";
    var urlconfig = {
        action: "UpdateMap",
        cityid: city
    };
    $('#divcentromapa').load(url, urlconfig, function(response, status, xhr) {
        switch (status) {
            case "error":
                $('#divcentromapa').empty();
                break;
        }
    });
}

function crearmapa(city, id, param) {
    $('#mapa_cl').show();
    if (id) {
        var id = id;
    } else {
        var id = 0;
    }
    var url = "data_ajax/cl_add_promotions.cfm?rnu=1354684656";
    var urlconfig = {
        action: "CreateMap",
        cityid: city,
        id: id,
        param: param
    };
    $('#mapa_cl').load(url, urlconfig, function(response, status, xhr) {
        switch (status) {
            case "error":
                $('#mapa_cl').empty();
                break;
        }
    });
}

function bringpromodata(id, param) {
    $('#mapa_cl').show();
    var url = "data_ajax/cl_add_promotions.cfm?rnu=1354684656";
    var urlconfig = {
        action: "UpdatePromo",
        id: id,
        param: param
    };
    $('#mapa_cl').load(url, urlconfig, function(response, status, xhr) {
        switch (status) {
            case "error":
                $('#mapa_cl').empty();
                break;
        }
    });
}

function placeMarker(location) {
    if (haymarcador == true) {
        marker.setMap(null);
    }
    document.getElementById('placedata').style.display = 'block';
    document.getElementById('button_ismap').style.display = 'block';
    haymarcador = true;
    //mapscenter_ = new google.maps.LatLng(location);
    map.setCenter(location);
    //var clickedLocation = new google.maps.LatLng(location);
    marker = new google.maps.Marker({
        position: location,
        icon: 'https://www.myezplan.com/images/myezplace.svg',
        map: map,
        draggable: true
    });
    //var titulo = prompt("Name of promotion", document.getElementById('Placename').value) || 'Place';
    window.createmarker = $.Deferred();
    myezPrompt.render('Name of promotion',document.getElementById('Placename').value,function(){createmarker.resolve( 'and' );});
    createmarker.done(function( n ) {
        var titulo = document.getElementById('prompt_value1').value || 'Place';
        var j = titulo;
        document.getElementById('Placename').value = titulo;
        document.getElementById('coordenadas').value = location;
        marker.setTitle(j.toString()); //etiqueta label en marcador
        infowindow = new google.maps.InfoWindow({
            content: '<input type="text" value="' + j + '" id="titulomarcador"/><br/><input type="button" value="Change" class="button-round-2 button-round-blue2" onclick="changetitle();">',
            size: new google.maps.Size(150, 150)
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });
        google.maps.event.addListener(marker, 'dragend', function() {
            document.getElementById('coordenadas').value = marker.getPosition();
            if (document.getElementById('ismap_v').value == 1) {
                marker2.setPosition(marker.getPosition());
                marker3.setPosition(marker.getPosition());
            }
        });
    });
}

function changetitle() {
    var titulo = document.getElementById('titulomarcador').value;
    document.getElementById('Placename').value = titulo;
    if (titulo == '') {
        return false;
    }
    marker.setTitle(titulo.toString());
    if (document.getElementById('ismap_v').value == 1) {
        marker2.setTitle(j.toString());
        marker3.setTitle(j.toString());
    }
    infowindow.close(map, marker);
    infowindow.setMap(null);
    infowindow = new google.maps.InfoWindow({
        content: '<input type="text" value="' + titulo + '" id="titulomarcador"/><br/><input type="button" value="Change" class="button-round-2 button-round-blue2" onclick="changetitle();">',
        size: new google.maps.Size(150, 150)
    });
}

function codeAddress() {
    var address = document.getElementById("address_").value;
    if (geocoder) {
        geocoder.geocode({
            'address': address
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                placeMarker(results[0].geometry.location);
            } else {
                myezAlert.render('Error geocoding address, please try again');
            }
        })
    }
}

function resetstops() {
    myezAlert.render('You are going to delete all the stops, are you sure?', 'conf', function() {
        for (s = 0; s < arrayrutas[rutassel].stops.length; s++) {
            arrayrutas[rutassel].stops[s].setMap(null);
        }
        if (viewsp) {
            for (ps = 0; ps < placesasstops.length; ps++) {
                placesasstops[ps].setMap(map);
            }
        }
        arrayrutas[rutassel].stops = [];
        $('#resstops').hide();
    });
    /*if (!conf) {
        return false;
    }
    for (s = 0; s < arrayrutas[rutassel].stops.length; s++) {
        arrayrutas[rutassel].stops[s].setMap(null);
    }
    for (ps = 0; ps < placesasstops.length; ps++) {
        placesasstops[ps].setMap(map);
    }
    arrayrutas[rutassel].stops = [];
    $('#resstops').hide();*/
}

function deletemarker(rindex, index) {
    arrayrutas[rindex].markers[index].infowindow.close(map, arrayrutas[rindex].markers[index]);
    arrayrutas[rindex].markers[index].setMap(null);
    arrayrutas[rindex].markers.splice(index, 1);
    arrayrutas[rindex].locations.splice(index, 1);
    arrayrutas[rindex].setPath(arrayrutas[rindex].locations);
    if (arrayrutas[rindex].markers.length > 0) {
        $('#resetr_' + rindex).show();
    } else {
        $('#resetr_' + rindex).hide();
    }
}

function changestopdata(index, rindex) {
    var newname = document.getElementById('stopname').value;
    var newdesc = document.getElementById('stopdesc').value;
    arrayrutas[rindex].stops[index].infowindow.close(map, arrayrutas[rindex].stops[index])
    arrayrutas[rindex].stops[index].name = newname;
    arrayrutas[rindex].stops[index].desc = newdesc;
    arrayrutas[rindex].stops[index].setTitle(newname);
}

function deletestopdata(index, rindex) {
    arrayrutas[rindex].stops[index].infowindow.close(map, arrayrutas[rindex].stops[index])
    arrayrutas[rindex].stops[index].setMap(null);
    if(arrayrutas[rindex].stops[index].orgindex){
        placesasstops[arrayrutas[rindex].stops[index].orgindex].setMap(map);
    }
    arrayrutas[rindex].stops.splice(index, 1);
    if (arrayrutas[rindex].stops.length == 0) {
        $('#resstops').hide();
    }
}

function createStopMarker(location,rindex,index,placeid,name,desc_){
var iconos=iconosarray[rindex];
var num=index+1;
if(placeid==0 && name==''){
    var titulo=prompt('Stop Name','Stop '+num) || '';
    var desc=prompt('Stop Desc','') || '';
}
if(placeid==0 && name){
        var titulo=name;
        var desc=desc_;
    }
    if(placeid !=0){
        var titulo=name;
        var desc='MyezplanStop';

    }
if(titulo==''){alert('Please Enter a valid name');return false;}
       var locationMarker = new google.maps.Marker();
        locationMarker.setOptions({
          icon: iconos,
          draggable: true,
          title:titulo,
          map: map,
          position: location
        });
        locationMarker.name=titulo;
        locationMarker.desc=desc;
        locationMarker.placeid=placeid;
        locationMarker.inroute=rindex;
        locationMarker.idx=index;
        if(placeid==0){
        locationMarker.infowindow=new google.maps.InfoWindow(
                    { content: '<input type="text" id="stopname" value="'+titulo+'"/><br/><input type="text" id="stopdesc" value="'+desc+'"/><br/><input type="button" onclick="changestopdata('+index+','+rindex+');" value="Update"/><input type="button" onclick="deletestopdata('+index+','+rindex+');" value="Delete"/>',
                        size: new google.maps.Size(250,250)
                    });
        }
        else{
        locationMarker.infowindow=new google.maps.InfoWindow(
                    { content: titulo+'<br/><input type="button" onclick="deletestopdata('+index+','+rindex+');" value="Delete"/>',
                        size: new google.maps.Size(250,250)
                    });
                    locationMarker.setOptions({draggable: false});
        }
        google.maps.event.addListener(locationMarker, "click", function() {
            var rindex=locationMarker.inroute;
            for(s=0;s<arrayrutas[rindex].stops.length;s++){
                arrayrutas[rindex].stops[s].infowindow.close(map,arrayrutas[rindex].stops[s]);
                arrayrutas[rindex].stops[s].idx=s;
            }
            var index=locationMarker.idx;
            var placeid=locationMarker.placeid;
            if(placeid==0){
                locationMarker.infowindow=new google.maps.InfoWindow(
                    { content: '<input type="text" id="stopname" value="'+locationMarker.name+'"/><br/><input type="text" id="stopdesc" value="'+locationMarker.desc+'"/><br/><input type="button" onclick="changestopdata('+index+','+rindex+');" value="Update"/><input type="button" onclick="deletestopdata('+index+','+rindex+');" value="Delete"/>',
                        size: new google.maps.Size(250,250)
                    });
            }
            else{
                locationMarker.infowindow=new google.maps.InfoWindow(
                { content: locationMarker.name+'<br/><input type="button" onclick="deletestopdata('+index+','+rindex+');" value="Delete"/>',
                        size: new google.maps.Size(250,250)
                    });
            }   
            locationMarker.infowindow.open(map,locationMarker);
        })
        console.log(locationMarker);
        return locationMarker;
}

function createLocationMarker(location, rindex, index) {
    console.log('quitar en version final');
    var locationMarker = new google.maps.Marker();
    locationMarker.setOptions({
        icon: 'https://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png',
        shadow: 'https://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_shadow.png',
        draggable: true,
        map: map,
        position: location
    });
    locationMarker.idx = index;
    locationMarker.ridx = rindex;
    locationMarker.infowindow = new google.maps.InfoWindow({
        content: '<input type="button" value="Remove" class="button-round-2 button-round-red2" onclick="deletemarker(' + rindex + ',' + index + ');"/>',
        size: new google.maps.Size(250, 250)
    });
    google.maps.event.addListener(locationMarker, "dragend", function() {
        var rindex = locationMarker.ridx;
        for (m = 0; m < arrayrutas[rindex].markers.length; m++) {
            arrayrutas[rindex].markers[m].infowindow.close(map, arrayrutas[rindex].markers[m]);
            arrayrutas[rindex].markers[m].idx = m;
        }
        var index = locationMarker.idx;
        var nLatLng = locationMarker.getPosition();
        var modifiedLocation = nLatLng;
        arrayrutas[rindex].locations[index] = modifiedLocation;
        arrayrutas[rindex].setPath(arrayrutas[rindex].locations);
    });
    google.maps.event.addListener(locationMarker, "click", function() {
        var rindex = locationMarker.ridx;
        for (m = 0; m < arrayrutas[rindex].markers.length; m++) {
            arrayrutas[rindex].markers[m].infowindow.close(map, arrayrutas[rindex].markers[m]);
            arrayrutas[rindex].markers[m].idx = m;
        }
        var index = locationMarker.idx;
        locationMarker.infowindow = new google.maps.InfoWindow({
            content: '<input type="button" value="Remove" class="button-round-2 button-round-red2" onclick="deletemarker(' + rindex + ',' + index + ');"/>',
            size: new google.maps.Size(250, 250)
        });
        locationMarker.infowindow.open(map, locationMarker);
    });
    return locationMarker;
}

function advfeat() {
    if (advshow) {
        advshow = false;
        document.getElementById('butadvfeat').style.backgroundColor = '#F2F2F2';
    } else {
        advshow = true;
        document.getElementById('butadvfeat').style.backgroundColor = '#17375e';
    }
    $('#advfeat').slideToggle();
}
