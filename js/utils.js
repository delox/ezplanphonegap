// JavaScript Document
sugestplace = function(name, coors_, city) {
    console.log("Suggest");
    var coors = coors_.replace(/ /g, '');
    window.plname = name;
    window.plcoors = coors;
    window.city = city;

    showExternalPage('suggest_includes/suggest_content.cfm?PNone&action=suggest_p&name=' + name + '&coors=' + coors + '&city=' + city, 'iframe');


}
showhowitworks = function() {
    window.open('howitworks.html', "_blank");
}
closefaq = function() {
    $('#showvideo').empty();
    if (typeof(var_win_advopt) != 'undefined' && var_win_advopt) {
        var_win_advopt = false;
        $('.advance_opt').show();
    }
    if (typeof(isfromrutasview) != 'undefined' && isfromrutasview) {
        isfromrutasview = false;
        $('#myeztravel-faq').fadeOut(300);
        $('#roadmapplace-boxmedia_r').fadeIn(1000);
    }
    if (typeof(isfromprutasview) != 'undefined' && isfromprutasview) {
        isfromprutasview = false;
        $('#myeztravel-faq').fadeOut(300);
        $('#drawroutes').fadeIn(1000);
    }
    if (typeof(isfromrutasview) == 'undefined' && typeof(isfromprutasview) == 'undefined') {
        $('#mask-faq').fadeOut(300);
        $('#myeztravel-faq').fadeOut(300);
        $('#mask-faq').remove(this);
    }
}
showsubtopics_steps_ = function(ST_id, ST_order, donde) {
    $('#Faq_subtopics_steps').showLoading("Please Wait,<br/>Retriving Steps...<br/>", false);
    var _url = "https://myezplan.com/mobile/appdata/data_ajax/faq_ajax_content.cfm?aleat=123819283791";
    var _urlconfig = {
        action: 'Faq_subtopics_steps_',
        stid: ST_id,
        storder: ST_order,
        donde: donde
    };
    $('#Faq_subtopics_steps').load(_url, _urlconfig, function(response, status, xhr) {
        switch (status) {
            case "error":
                $('#Faq_subtopics_steps').empty();
                break;
        }
    });
}
showsubtopics_steps = function(ST_id) {
    $('#Faq_subtopics_steps').showLoading("Please Wait,<br/>Retriving Steps...<br/>", false);
    if (!sessionStorage.getItem('subfaqst' + ST_id)) {
        var _url = "https://myezplan.com/mobile/appdata/data_ajax/faq_ajax_content.cfm?aleat=123819283791";
        var _urlconfig = {
            action: 'Faq_subtopics_steps',
            stid: ST_id
        };
        $('#Faq_subtopics_steps').load(_url, _urlconfig, function(response, status, xhr) {
            switch (status) {
                case "error":
                    $('#Faq_subtopics_steps').empty();
                    break;
                case "success":
                    sessionStorage.setItem('subfaqst' + ST_id, response);
            }
        });
    } else {
        $('#Faq_subtopics_steps').html(sessionStorage.getItem("subfaqst" + ST_id));
    }
}
showsubtopics = function(T_id) {
    $('#Faq_subtopics').showLoading("Please Wait,<br/>Retriving SubTopics...<br/>", false);
    $('#Faq_subtopics_steps').empty();
    if (!sessionStorage.getItem('subfaq' + T_id)) {
        var _url = "https://myezplan.com/mobile/appdata/data_ajax/faq_ajax_content.cfm?aleat=123819283791";
        var _urlconfig = {
            action: 'Faq_subtopics',
            tid: T_id
        };
        $('#Faq_subtopics').load(_url, _urlconfig, function(response, status, xhr) {
            switch (status) {
                case "error":
                    $('#Faq_subtopics').empty();
                    break;
                case "success":
                    sessionStorage.setItem('subfaq' + T_id, response);
            }
        });
    } else {
        $('#Faq_subtopics').html(sessionStorage.getItem("subfaq" + T_id));
    }
}
$(document).ready(function(e) {
    /*	var _popup=$(".centerligthbox");
    	var T = $(window).height() / 2 - _popup.height() / 0.7 + $(window).scrollTop();
    			var	L = $(window).width() / 2 - popup.width() / 2;
    			_popup.css({
    				top: T,
    				
    			})*/

    $(".show_load").click(function() {
        /* alert("works");*/
        $(".load_img").css("display", "block");
    });
});

function validateEmail(email) {
    // creamos nuestra regla con expresiones regulares.
    var filtermail = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    //var filtermail = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
    //var filtermail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    //var filtermail = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    // utilizamos test para comprobar si el parametro valor cumple la regla
    return filtermail.test(email);
}

function formatPhoneNumber(number) {
    var regexObj = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var formattedPhoneNumber = "";
    if (regexObj.test(number)) {
        var formattedPhoneNumber = number.replace(regexObj, "$1$2$3");
    }
    return formattedPhoneNumber;
}
emptyMessageError = function(htmlmessage) {
    $(htmlmessage).empty();
}
ishidingmessageerror = false;
global_messageerrortimer = 0;
/* Close popup */
closePopup = function(timefade) {
    var _timefade = typeof(timefade) == "undefined" ? 0 : timefade;
    $('#mask, .popup-inside').fadeOut(_timefade, function() {
        $('#mask').remove();
    });
}
closePopup2 = function() {
    var _timefade = 300;
    $('#shareitplans-box2').fadeOut(_timefade, function() {
        $('#mapcitycity-box').fadeIn(300);
    });
}
hideMessageError = function(htmlmessage, isclosing, timefade, ispendingrefresh) {
    if (ishidingmessageerror) {
        return;
    }
    var _message = htmlmessage;
    var _isclosing = typeof(isclosing) == "undefined" ? false : isclosing;
    var _timefade = typeof(timefade) == "undefined" ? 300 : timefade;
    var _ispendingrefresh = typeof(ispendingrefresh) == "undefined" ? true : ispendingrefresh;
    ishidingmessageerror = true;
    clearTimeout(global_messageerrortimer);
    if (_isclosing) {
        global_messageerrortimer = window.setTimeout(function() {
            $(_message).html();
            $(_message).fadeOut(timefade);
            closePopup();
            ishidingmessageerror = false;
            if (_ispendingrefresh) {
                verifyPendingRefresh();
            }
        }, 3000);
    } else {
        global_messageerrortimer = window.setTimeout(function() {
            $(_message).html();
            $(_message).fadeOut(timefade);
            ishidingmessageerror = false;
            if (_ispendingrefresh) {
                verifyPendingRefresh();
            }
        }, 3000);
    }
}
showMessageError = function(htmlMessage, texMessage, timefade, type, pos) {
    var _message = htmlMessage;
    var _timefade = typeof(timefade) == "undefined" ? 300 : timefade;
    $(_message).removeClass();
    if (pos && pos != "") {
        $(_message).addClass('message message-' + type + ' message-' + pos);
    } else {
        $(_message).addClass('message message-' + type);
    }
    $(_message).html(texMessage);
    $(_message).fadeIn(timefade);
}
existsUrlHash = function() {
    return (window.location.hash);
}
getUrlHash = function() {
    return window.location.hash.replace("#", "");
}
getUrlParamValue = function(name) {
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return "";
    } else {
        return results[1] || 0;
    }
}
getUrlParamFromString = function(arg_urlstring, arg_name) {
    //return new RegExp('[\\?&]' + arg_name + '=([^&#]*)').exec(arg_urlstring);
    return new RegExp('[\\?&]' + arg_name + '=([^&#]*)').exec(arg_urlstring);
}
getUrlStringParam = function(arg_urlstring, arg_name) {
    var results = getUrlParamFromString(arg_urlstring, arg_name);
    if (results == null) {
        return "";
    } else {
        return results[0] || "";
    }
}
getUrlStringParamValue = function(arg_urlstring, arg_name) {
    var results = getUrlParamFromString(arg_urlstring, arg_name);
    if (results == null) {
        return "";
    } else {
        return results[1] || "";
    }
}
verifyPendingRefresh = function() {
        if (typeof(cf_sidP) == "undefined") {
            return;
        }
        if (cf_sidP) {
            window.top.location.reload();
        }
    }
    /* ----------------------------------------- */
    /* basic functions */
function randomNumberUrl() {
    return Math.random() * 9999999999999999;
}

function goToCart(urlpass, urlself) {

    console.log("cart");
    var _urlpass = (typeof(urlpass) == "undefined") ? "" : urlpass;
    var _urlself = (typeof(urlself) != "undefined" && typeof(urlself) == "boolean") ? urlself : true;
    var _urlcart = "https://myezplan.com/cart.cfm" + ((_urlpass == "") ? "" : "?" + urlpass);
    $.ajax({
        type: "POST",
        url: "https://myezplan.com/mobile/appdata/data_ajax/cart_ajax_events.cfm",
        async: false,
        cache: false,
        data: {
            action: "countitems"
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        },
        success: function(datos) {
            if (!(parseInt(datos) > 0)) {
                alert("Your Shopping Cart is empty.");
                return false;
            }
            if (_urlself) {
                window.open(_urlcart, "_blank");
            } else {
                window.open(_urlcart, "_cart");
            }
        }
    });
}
function showHideTab(tabid, action, button, type) {
    if (type && type == "class") {
        var sel = ".";
    } else {
        var sel = "#";
    }
    if (button == undefined) {
        var _tab = $(sel + tabid);
        var _icon = _tab.parent().find("a:first");
        var _tabhidden = ($(sel + tabid + ":hidden").length > 0);
        var _action = action;

        if (!(_action == "show" || _action == "hide")) {
            if (_tabhidden) {
                _action = "show";
            } else {
                _action = "hide";
            }
        }
        if (_action == "hide") {
            _tab.hide();
            //_icon.css("background-image","url('https://lh6.googleusercontent.com/-44bFjug7xpE/U5I5oAOzU_I/AAAAAAANfHI/a1ItxGAYBN0/s50/Untitled35.png')");
            return;
        }
        //_icon.css("background-image","url('https://lh6.googleusercontent.com/-ZQfQ41ScQuk/U5I5oMgzbnI/AAAAAAANfHE/ur_4Fpn-eT0/s51/Untitled39.png')");
        _tab.show();
        //_tab.scrollToMe();
    } else {
        //myezAlert.render("si "+button);
        var _tab = $(sel + tabid);
        var _icon = $(button);
        var _tabhidden = ($(sel + tabid + ":hidden").length > 0);
        var _action = action;

        if (!(_action == "show" || _action == "hide")) {
            if (_tabhidden) {
                _action = "show";
            } else {
                _action = "hide";
            }
        }
        if (_action == "hide") {
            _tab.hide();
            $("#"+button+" use").attr('xlink:href','#icon-expand_more');
            return;
        }
        $("#"+button+" use").attr('xlink:href','#icon-expand_less');
        _tab.show();
    }
}
/** Load CityMap **/
cargar_citypic = function(cityid) {
        $("#citymap_img_map_preview").attr("src", _img_map_preview);
        //var idciudad = ciudad;
        var aleat = Math.random() * 9999999999999999;
        $.ajax({
            type: "POST",
            url: "html_ajax/cargar_citypic_ajax.cfm",
            async: true,
            cache: false,
            data: "idciudad=" + cityid + "&aleat=" + aleat,
            success: function(datos) {
                if (datos != "") {
                    $("#citymap_img_map_preview").attr("src", datos);
                }
            }
        });
    }
    /* ----------------------------------------- */
    /* jQuery Extends */
jQuery.fn.extend({
    formReset: function() {
        $(this).each(function() {
            this.reset();
        });
    }
});
jQuery.fn.extend({
    scrollToMe: function() {
        var x = jQuery(this).offset().top - 25;
        jQuery('html,body').animate({
            scrollTop: x
        }, 200);
    }
});
jQuery.fn.extend({
    showLoading: function(testmessage, empty) {
        var _testmessage = (typeof(testmessage) == "string") ? "<br />" + testmessage : "";
        var _empty = (typeof(empty) == "boolean") ? empty : false;
        var x = $(this);
        if (_empty) {
            x.empty();
        }
        x.prepend('<div class="mask-loading"><div class="mask-loading-image"><img src="images/icons/32/loader1.gif" />' + _testmessage + '</div></div>');
        var y = x.find('.mask-loading');
        var z = y.find('.mask-loading-image');
        var i = z.find('img');
        y.fadeIn("fast");
        y.height(x.height());
        y.width(x.width());
        z.css({
            'margin-top': -(z.height() / 2),
            'margin-left': -(z.width() / 2)
        });
    }
});
jQuery.fn.extend({
    serializeToObject: function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    }
});
/* ----------------------------------------- */

/* function count userplan */
countMyUserPlan = function() {
    var _data = "action=countuserplan&";
    $.ajax({
        type: "POST",
        url: "mobile/appdata/data_ajax/map_usersplans_ajax.cfm?upuserid=" + sessionStorage.cf_sid,
        async: false,
        cache: false,
        data: _data,
        error: function(xhr, ajaxOptions, thrownError) {
            countuserplan = 0;
        },
        success: function(response) {
            countuserplan = response;
        }
    });
}
myPlanRename = function(parentobj, upid) {
    var _parentobj = $("#" + parentobj);
    var _message = $(_parentobj).find("#messageerror-myuserplan");
    var _upnamenewObj = $(_parentobj).find("#up_namenew_" + upid);
    var _upnamenewStr = $.trim($(_upnamenewObj).val());
    var _upnamecurObj = $(_parentobj).find("#up_name_" + upid);
    if (_upnamenewStr == "") {
        $(_upnamenewObj).focus();
        showMessageError(_message, "Name is required. Please try again.", 300);
        hideMessageError(_message, false, 300);
        return;
    }
    var _data = "action=saveuserplan&saveaction=up&upname=" + _upnamenewStr + "&upid=" + upid + "&upuserid=" + sessionStorage.cf_sid;
    $.ajax({
        type: "POST",
        url: "https://myezplan.com/mobile/appdata/data_ajax/map_usersplans_ajax.cfm",
        async: false,
        cache: false,
        data: _data,
        error: function(xhr, ajaxOptions, thrownError) {
            showMessageError(_message, thrownError, 300);
            hideMessageError(_message, false, 300);
        },
        success: function(response) {
            var _arrResponse = response.split("|");
            $(_upnamecurObj).html(_upnamenewStr);
            showMessageError(_message, _arrResponse[0], 300);
            hideMessageError(_message, false, 300);
        }
    });
}
myPlanPrint = function(printurl) {
    var win = window.open(printurl, "mywindow");
    win.focus();
}
myPlanShare = function(event, parentobj, shareoption) {
    $("#share-box").panel();
    var _parentobj = $("#" + parentobj);
    var _f = $(event.currentTarget).attr("data-f");
    //console.log(_f);
    var _str_mail_s = _parentobj.find("#share-mail-s").attr("href");
    var _str_facebook_s = _parentobj.find("#share-facebook-s").attr("href");
    var _str_twitter_s = _parentobj.find("#share-twitter-s").attr("href");
    var _str_blogger_s = _parentobj.find("#share-blogger-s").attr("href");
    var _share_gpx_s = _parentobj.find("#share-gpx-s").attr("href");
    var _popup = $("#share-box");
    _popup.find("#share_submit_1").attr("data-url", _str_mail_s);
    _popup.find("#share-box-mail-e").attr("href", _str_mail_s);
    _popup.find("#share-box-2 #sharelink").val(_str_mail_s);
    _popup.find("#share-box-2 #sharelinkgpx").val(_share_gpx_s);
    _popup.find("#share_option").val(shareoption);
    //console.log(_str_facebook_s);
    _popup.find("#share-box-facebook-e").click(function(e) {
        //_str_facebook_s
        window.open(_str_facebook_s, 'sharer', 'toolbar=0,status=0,height=436');
        return false;
    });
    //_popup.find("#share-box-facebook-e").attr("href",_str_facebook_s);
    //console.log(_popup.find("#share-box-facebook-e").html());
    _popup.find("#share-box-twitter-e").attr("href", _str_twitter_s);
    _popup.find("#share-box-blogger-e").attr("href", _str_blogger_s);
    //console.log(_str_mail_s);
    //console.log(_popup.find("#share-box-mail-e").attr("href"));

    //_popup.fadeIn(300);
    $("#share-box").show();
    $("#share-box").panel("open");
    _popup.find('#title-box-2').click();

    var popMargTop = (_popup.height() + 24) / 2;
    var popMargLeft = (_popup.width() + 24) / 2;

    _popup.css({
        //'margin-top' : -popMargTop,
        /*'margin-left' : -popMargLeft*/
    });
    var T = $(window).height() / 3 - 100 / 1 + $(window).scrollTop();
    /*var	L = $(window).width() / 2 - popup.width() / 2;*/
    _popup.css({
            //top: T,

        })
        //$('body').append('<div id="mask" class="mask"></div>');
        //$('#mask').fadeIn(300);
}
myPersonalPlanShare = function(_str_mail_s, _str_facebook_s, _str_twitter_s, _str_blogger_s, _share_gpx_s, shareoption) {
    var _f = $(event.currentTarget).attr("data-f");
    var _popup = $("#share-box");
    _popup.panel();
    _popup.show();
    _popup.panel("open");
    _popup.find("#share_submit_1").attr("data-url", _str_mail_s);
    _popup.find("#share-box-mail-e").attr("href", _str_mail_s);
    _popup.find("#share-box-2 #sharelink").val(_str_mail_s);
    _popup.find("#share-box-2 #sharelinkgpx").val(_share_gpx_s);
    _popup.find("#share_option").val(shareoption);
    //console.log(_str_facebook_s);
    _popup.find("#share-box-facebook-e").click(function(e) {
        //_str_facebook_s
        window.open(_str_facebook_s, 'sharer', 'toolbar=0,status=0,height=436');
        return false;
    });
    //_popup.find("#share-box-facebook-e").attr("href",_str_facebook_s);
    //console.log(_popup.find("#share-box-facebook-e").html());
    _popup.find("#share-box-twitter-e").attr("href", _str_twitter_s);
    _popup.find("#share-box-blogger-e").attr("href", _str_blogger_s);
    //console.log(_str_mail_s);
    //console.log(_popup.find("#share-box-mail-e").attr("href"));

    //_popup.fadeIn(300);
    _popup.find('#title-box-2').click();

    var popMargTop = (_popup.height() + 24) / 2;
    var popMargLeft = (_popup.width() + 24) / 2;

    _popup.css({
        //'margin-top' : -popMargTop,
        /*'margin-left' : -popMargLeft*/
    });
    var T = $(window).height() / 3 - 100 / 1 + $(window).scrollTop();
    /*var	L = $(window).width() / 2 - popup.width() / 2;*/
    _popup.css({
            //top: T,

        })
        //$('body').append('<div id="mask" class="mask"></div>');
        //$('#mask').fadeIn(300);
}
myPlanDelete = function(parentobj, upid) {
    var _parentobj = $("#" + parentobj);
    var _message = _parentobj.find("#messageerror-myuserplan");
    var _rowObj = _parentobj.find("#row_" + upid);
    var _data = "action=saveuserplan&saveaction=dp&upid=" + upid + "&upuserid=" + sessionStorage.cf_sid;
    var _confirm = window.confirm("You are going to permanently delete this plan. Are you sure?");
    if (!_confirm) {
        return;
    }
    $.ajax({
        type: "POST",
        url: "https://myezplan.com/mobile/appdata/data_ajax/map_usersplans_ajax.cfm",
        async: false,
        cache: false,
        data: _data,
        error: function(xhr, ajaxOptions, thrownError) {
            showMessageError(_message, thrownError, 300);
            hideMessageError(_message, false, 300);
        },
        success: function(response) {
            var _arrResponse = response.split("|");
            $(_parentobj).css("background-color", "#990000").slideToggle(250);;
            showMessageError(_message, _arrResponse[0], 300);
            hideMessageError(_message, false, 300);
        }
    });
}
plantocurrentItineraryValida = function(parentobj, upid) {
    var _url = "https://myezplan.com/mobile/appdata/data_ajax/myitinerary_content_ajax.cfm";
    var _urlconfig = {
        action: "saveuseritinerary",
        saveaction: "validalimiteplanscurrenI",
        ui_userid: sessionStorage.cf_sid
    };
    $.ajax({
            type: "POST",
            url: _url,
            async: false,
            cache: false,
            data: _urlconfig
        })
        .success(function(datos) {
            if (datos == 30) {
                alert('You have reached the maximum limit of Plans for Itinerary (30), if you want to add more plans you have to create a new one');
                return false;
            } else {
                myPlanAddToCurrentItinerary(parentobj, upid);
            }
        });
}
myPlanAddToCurrentItinerary = function(parentobj, upid) {
    var _parentobj = $("#" + parentobj);
    var _message = _parentobj.find(".message-error");
    var _rowObj = _parentobj.find("#row_" + upid);
    var _data = "action=addplantocurrentitinerary&up_id=" + upid + "&ui_userid=" + sessionStorage.cf_sid;
    $.ajax({
        type: "POST",
        url: "https://myezplan.com/mobile/appdata/data_ajax/myitinerary_content_ajax.cfm",
        async: false,
        cache: false,
        data: _data,
        error: function(xhr, ajaxOptions, thrownError) {
            showMessageError(_message, thrownError, 300);
            hideMessageError(_message, false, 300);
        },
        success: function(response) {
            if (!global_addtocurrentplan) {
                $(_rowObj).css("background-color", "#4F6228").animate({
                    opacity: 0.5
                }, 1000, function() {
                    $(_rowObj).css("background-color", "transparent").animate({
                        opacity: 1.0
                    });
                });
                showMessageError(_message, response, 300);
                if (global_addtocurrentplan) {
                    hideMessageError(_message, true, 300);
                }
                hideMessageError(_message, false, 300);
            }
            global_addtocurrentplan = false;
        }
    });
}
myPlanAddToItinerary = function(parentobj, upid, daydate, uiid) {
    var _parentobj = $("#" + parentobj);
    //message-saveplan
    var _message = $('#message-saveplan');
    //var _message = _parentobj.find(".message-error");
    var _rowObj = _parentobj.find("#row_" + upid);
    //var uiid_= parseInt(uiid);
    //alert(uiid+' '+upid);
    var _data = "action=addplantoitinerary&up_id=" + upid + '&aditi=' + uiid + '&addate=' + daydate;
    $.ajax({
        type: "POST",
        url: "https://myezplan.com/mobile/appdata/data_ajax/myitinerary_content_ajax.cfm",
        async: false,
        cache: false,
        data: _data,
        error: function(xhr, ajaxOptions, thrownError) {
            showMessageError(_message, thrownError, 300);
            hideMessageError(_message, false, 300);
        },
        success: function(response) {
            //if(!global_addtocurrentplan){
            /*				$(_rowObj).css("background-color","#4F6228").animate({opacity: 0.5}, 1000,function(){
            					$(_rowObj).css("background-color","transparent").animate({opacity: 1.0});
            				});
            				showMessageError(_message,response,300);*/
            //				if(global_addtocurrentplan){
            hideMessageError(_message, true, 300);
            //				}
            hideMessageError(_message, false, 300);
            //}
            global_addtocurrentplan = false;
        }
    });
}
myPlanShowAudioTour = function(parentobj, upid) {
    var _popup = $("#audiotour-box");
    //_popup.fadeIn(300);
    _popup.panel();
    _popup.show();
    _popup.panel("open");
    var popMargTop = (_popup.height() + 24) / 2;
    var popMargLeft = (_popup.width() + 24) / 2;
    _popup.css({
        /*'margin-left' : -popMargLeft*/
    });
    var T = $(window).height() / 3 - 100 / 1 + $(window).scrollTop();
    /*var	L = $(window).width() / 2 - popup.width() / 2;*/
    _popup.css({
            //top: T,

        })
        //$('body').append('<div id="mask" class="mask"></div>');
        //$('#mask').fadeIn(300);
    myPlanShowAudioTour_ajax(parentobj, upid);
}
myPlanShowAudioTour_ajax = function(parentobj, upid) {
    var _parentobj = $("#" + parentobj);
    var _message = _parentobj.find(".message-error");
    var _rowObj = _parentobj.find("#row_" + upid);
    var _url = "https://myezplan.com/mobile/appdata/data_ajax/map_usersplans_ajax.cfm"
    var _urlconfig = {
        action: "getaudiotourbypid",
        up_id: upid
    };
    $("#audiotour-box #box-body").load(_url, _urlconfig, myPlanShowAudioTour_ajax_result);
}
myPlanShowAudioTour_ajax_result = function(response, status, xhr) {
    //alert(status);
}
myPlanShowAudioTour_ajax_result = function(response, status, xhr) {
    //alert(status);
}
checkAudioPlan = function(plaId, elem) {
    var _url = "https://myezplan.com/mobile/appdata/data_ajax/map_usersplans_ajax.cfm"
    var _urlconfig = {
        action: "getaudiotourbypid",
        up_id: plaId
    };
    $("#audiotour-box #box-body").load(_url, _urlconfig);
    $.post(_url, _urlconfig)
        .error()
        .success(function(response, status, xhr) {
            console.log(elem);
            var _response = response;
            _response = response.replace(/\s+/g, '');
            console.log(_response);
            if (_response == "No-audio") {
                $("." + elem).hide();
            } else {
                $("." + elem).show();
            }
        })
}
openexternalmedia3 = function(arg_url) {
    //$('body').append('<iframe width="560" height="315" src="'+arg_url+'" frameborder="0" allowfullscreen></iframe>');
    //window.open(arg_url);
    var popup = $("#faq-box");
    $(popup).fadeOut(0);
    var _popup = $("#roadmapplace-boxmedia3");
    _popup.fadeIn(300);

    var popMargTop = (_popup.height() + 24) / 2;
    var popMargLeft = (_popup.width() + 24) / 2;
    var popZindez = (parseInt(_popup.css("z-index"))) + 100;
    _popup.css({
        //'margin-left' : -popMargLeft
        'z-index': popZindez + 1
    });
    //	$('body').append('<div id="mask-roadmapplace-boxmedia" class="mask" style="z-index:0;"></div>');
    //	var _mask = $('#mask-roadmapplace-boxmedia');
    //	_mask.css('z-index',popZindez);
    //	_mask.fadeIn(300);
    _popup.find("#box-body").html('<iframe width="560" height="315" src="' + arg_url + '" frameborder="0" allowfullscreen></iframe>');
    return false;
}
openexternalmedia = function(arg_url) {
    //$('body').append('<iframe width="560" height="315" src="'+arg_url+'" frameborder="0" allowfullscreen></iframe>');
    //window.open(arg_url);
    //var popup = $("#roadmapplace-box");
    //$(popup).fadeOut(0);
    var _popup = $("#roadmapplace-boxmedia");
    _popup.panel();
    _popup.showLoading("Please Wait", false);
    _popup.show();
    _popup.panel("open");
    var popMargTop = (_popup.height() + 24) / 2;
    var popMargLeft = (_popup.width() + 24) / 2;
    var popZindez = (parseInt(_popup.css("z-index"))) + 100;
    _popup.css({
        //'margin-left' : -popMargLeft
        //'z-index' : popZindez + 1
    });
    //	$('body').append('<div id="mask-roadmapplace-boxmedia" class="mask" style="z-index:0;"></div>');
    //	var _mask = $('#mask-roadmapplace-boxmedia');
    //	_mask.css('z-index',popZindez);
    //	_mask.fadeIn(300);
    _popup.find("#box-body").html('<iframe width="560" height="700" src="' + arg_url + '" frameborder="0" allowfullscreen></iframe>').promise().done($('.mask-loading').remove());
    /*alert("video here");*/
    var T = $(window).height() / 3 - 100 / 1 + $(window).scrollTop();
    /*var	L = $(window).width() / 2 - popup.width() / 2;*/
    _popup.css({
        //top: T,
    })
    return false;
}
openexternalmedia_prd = function(arg_url) {
    //$('body').append('<iframe width="560" height="315" src="'+arg_url+'" frameborder="0" allowfullscreen></iframe>');
    //window.open(arg_url);
    var popup = $("#drawroutes");
    $(popup).fadeOut(0);
    var _popup = $("#roadmapplace-boxmedia_prd");
    _popup.fadeIn(300);

    var popMargTop = (_popup.height() + 24) / 2;
    var popMargLeft = (_popup.width() + 24) / 2;
    var popZindez = (parseInt(_popup.css("z-index"))) + 100;
    _popup.css({
        //'margin-left' : -popMargLeft
        //'z-index' : popZindez + 1
    });
    //	$('body').append('<div id="mask-roadmapplace-boxmedia" class="mask" style="z-index:0;"></div>');
    //	var _mask = $('#mask-roadmapplace-boxmedia');
    //	_mask.css('z-index',popZindez);
    //	_mask.fadeIn(300);
    $("#roadmapplace-boxmedia").panel("open");
    _popup.find("#box-body").html('<iframe width="560" height="700" src="' + arg_url + '" frameborder="0" allowfullscreen></iframe>');
    /*alert("video here");*/
    var T = $(window).height() / 3 - 100 / 1 + $(window).scrollTop();
    /*var	L = $(window).width() / 2 - popup.width() / 2;*/
    _popup.css({
        //top: T,
    })
    return false;
}
openexternalmedia_f_prd = function(arg_url) {
    var popup = $("#drawroutes");
    $(popup).fadeOut(0);
    var _popup = $("#roadmapplace-boxmedia_f_prd");
    _popup.fadeIn(300);

    var popMargTop = (_popup.height() + 24) / 2;
    var popMargLeft = (_popup.width() + 24) / 2;
    var popZindez = (parseInt(_popup.css("z-index"))) + 100;
    _popup.css({
        //'margin-left' : -popMargLeft
        'z-index': popZindez + 1
    });
    //	$('body').append('<div id="mask-roadmapplace-boxmedia" class="mask" style="z-index:0;"></div>');
    //	var _mask = $('#mask-roadmapplace-boxmedia');
    //	_mask.css('z-index',popZindez);
    //	_mask.fadeIn(300);
    _popup.find("#box-body").html('<iframe width="700" height="550" src="' + arg_url + '" frameborder="0" allowfullscreen></iframe>');
    /*alert("street here")*/
    var T = $(window).height() / 3 - 100 / 1 + $(window).scrollTop();
    /*var	L = $(window).width() / 2 - popup.width() / 2;*/
    _popup.css({
        //top: T,
    })
    return false;
}
openexternalmedia_f = function(arg_url, plid) {
    var popup = $("#roadmapplace-box");
    $(popup).fadeOut(0);
    var _popup = $("#roadmapplace-boxmedia_f");
    _popup.panel();
    _popup.show();
    //_popup.panel("open");
    //_popup.fadeIn(0);
    //var heightr = $("#roadmapplace-box_panel").height()-40;
    if ($(window).width() <= 800) {
        _popup.css('right', 0);
        _popup.panel("open");
    } else {
        _popup.css('right', 400);
        //console.log(heightr);
        _popup.removeClass('ui-panel-closed');
        _popup.addClass('ui-panel-open');
    }
    var popMargTop = (_popup.height() + 24) / 2;
    var popMargLeft = (_popup.width() + 24) / 2;
    var popZindez = (parseInt(_popup.css("z-index"))) + 100;
    _popup.css({
        //'margin-left' : -popMargLeft
        //'z-index' : popZindez + 1
    });
    //	$('body').append('<div id="mask-roadmapplace-boxmedia" class="mask" style="z-index:0;"></div>');
    //	var _mask = $('#mask-roadmapplace-boxmedia');
    //	_mask.css('z-index',popZindez);
    //	_mask.fadeIn(300);
    if (!sessionStorage.getItem("infopics" + plid)) {
        //_popup.find("#box-body").html('<iframe width="100%" height="550" src="'+arg_url+'" frameborder="0" allowfullscreen></iframe>');
        _popup.find("#box-body").load(arg_url, function(response) {
            sessionStorage.setItem("infopics" + plid, response);
        });
    } else {
        _popup.find("#box-body").html(sessionStorage.getItem("infopics" + plid));
    }
    /*alert("street here")*/
    var T = $(window).height() / 3 - 100 / 1 + $(window).scrollTop();
    /*var	L = $(window).width() / 2 - popup.width() / 2;*/
    _popup.css({
        //top: T,

    })
    return false;
}
openexternalmedia_r2 = function(arg_url) {
    var popup = $("#roadmapplace-box");
    $(popup).fadeOut(0);
    var _popup = $("#roadmapplace-boxmedia_r2");
    _popup.fadeIn(300);

    var popMargTop = 50;
    var popMargLeft = 50;
    var popZindez = (parseInt(_popup.css("z-index"))) + 100;
    _popup.css({
        /*'margin-left' : -popMargLeft,*/
        'z-index': popZindez + 1
    });
    var T = $(window).height() / 3 - 100 / 1 + $(window).scrollTop();

    _popup.css({
        top: T
    })
    $('body').append('<div id="mask-roadmapplace-boxmedia" class="mask" style="z-index:0;"></div>');
    var _mask = $('#mask-roadmapplace-boxmedia');
    _mask.css('z-index', popZindez);
    _mask.fadeIn(300);
    _popup.find("#box-body").html('<iframe src="' + arg_url + '" frameborder="0" allowfullscreen></iframe>');
    /*alert("street here")*/
    var T = $(window).height() / 3 - 100 / 1 + $(window).scrollTop();
    /*var	L = $(window).width() / 2 - popup.width() / 2;*/
    _popup.css({
        top: T
    })
    return false;
}
openexternalmedia_r = function(arg_url) {
    var popup = $("#roadmapplace-box");
    $(popup).fadeOut(0);
    var _popup = $("#roadmapplace-boxmedia_r");
    _popup.panel();
    _popup.show();
    _popup.panel("open");
    var popMargTop = 50;
    var popMargLeft = 50;
    var popZindez = (parseInt(_popup.css("z-index"))) + 100;
    _popup.css({
        //'margin-left' : -popMargLeft
        //'z-index' : popZindez + 1
    });
    $('body').append('<div id="mask-roadmapplace-boxmedia" class="mask" style="z-index:0;"></div>');
    //var _mask = $('#mask-roadmapplace-boxmedia');
    //_mask.css('z-index',popZindez);
    //_mask.fadeIn(300);
    //_popup.find("#box-body").html('<iframe src="'+arg_url+'" frameborder="0" allowfullscreen></iframe>');
    _popup.find("#box-body").load(arg_url);
    /*alert("street here")*/
    var T = $(window).height() / 3 - 100 / 1 + $(window).scrollTop();
    /*var	L = $(window).width() / 2 - popup.width() / 2;*/
    _popup.css({
        //top: T,

    })
    return false;
}
openexternalmedia2 = function(arg_url) {
    //var popup = $("#roadmapplace-box");
    //$(popup).fadeOut(0);
    var _popup = $("#roadmapplace-boxmedia2");
    //_popup.fadeIn(300);
    $("#roadmapplace-boxmedia2").panel();
    var popMargTop = (_popup.height() + 24) / 2;
    var popMargLeft = (_popup.width() + 24) / 2;
    var popZindez = (parseInt(_popup.css("z-index"))) + 100;
    _popup.css({
        //'margin-left' : -popMargLeft
        //'z-index' : popZindez + 1
    });
    //	$('body').append('<div id="mask-roadmapplace-boxmedia" class="mask" style="z-index:0;"></div>');
    //	var _mask = $('#mask-roadmapplace-boxmedia');
    //	_mask.css('z-index',popZindez);
    //	_mask.fadeIn(300);
    $("#roadmapplace-boxmedia2").panel("open");
    _popup.find("#box-body").html('<iframe width="100%" height="350" src="' + arg_url + '" frameborder="0" allowfullscreen></iframe>');
    /*alert("street here")*/
    var T = $(window).height() / 3 - 100 / 1 + $(window).scrollTop();
    /*var	L = $(window).width() / 2 - popup.width() / 2;*/
    _popup.css({
        //top: T,

    })
    return false;
}
openexternalmedia_m2 = function(arg_url) {
    var popup = $("#roadmapplace-box");
    $(popup).fadeOut(0);
    var _popup = $("#roadmapplace-boxmedia_m2");
    //_popup.fadeIn(300);
    _popup.panel();
    _popup.show();
    _popup.panel("open");
}
openexternalmedia_m2_prd = function(arg_url) {
    var popup = $("#drawroutes");
    $(popup).fadeOut(0);
    var _popup = $("#roadmapplace-boxmedia_m2_prd");
    _popup.fadeIn(300);
    var popMargTop = (_popup.height() + 24) / 2;
    var popMargLeft = (_popup.width() + 24) / 2;
    var popZindez = (parseInt(_popup.css("z-index"))) + 100;
    _popup.css({
        //'margin-left' : -popMargLeft
        //'z-index' : popZindez + 1
    });
    //	$('body').append('<div id="mask-roadmapplace-boxmedia" class="mask" style="z-index:0;"></div>');
    //	var _mask = $('#mask-roadmapplace-boxmedia');
    //	_mask.css('z-index',popZindez);
    //	_mask.fadeIn(300);
    _popup.find("#box-body").html('<iframe width="100%" height="460" src="' + arg_url + '" frameborder="0" allowfullscreen></iframe>');
    /*alert("street here")*/
    var T = $(window).height() / 3 - 100 / 1 + $(window).scrollTop();
    /*var	L = $(window).width() / 2 - popup.width() / 2;*/
    _popup.css({
        //top: T,

    })
    return false;
}
openexternalmedia_m = function(arg_url) {
    var _popup = $("#roadmapplace-boxmedia_m");
    _popup.fadeIn(300);

    var popMargTop = (_popup.height() + 24) / 2;
    var popMargLeft = (_popup.width() + 24) / 2;
    var popZindez = (parseInt(_popup.css("z-index"))) + 100;
    _popup.css({
        /*'margin-left' : -popMargLeft,*/
        'z-index': popZindez + 1
    });
    var T = $(window).height() / 3 - 100 / 1 + $(window).scrollTop();
    _popup.css({
        top: T
    })
    $('body').append('<div id="mask-roadmapplace-boxmedia" class="mask" style="z-index:0;"></div>');
    var _mask = $('#mask-roadmapplace-boxmedia');
    _mask.css('z-index', popZindez);
    _mask.fadeIn(300);
    _popup.find("#box-body").html('<iframe width="100%" height="400" src="' + arg_url + '" frameborder="0" allowfullscreen></iframe>');
    return false;
}
openexternalmedia4 = function(arg_url) {
    //alert(arg_url);
    var popup = $("#roadmapplace-boxmedia");
    $(popup).fadeOut(300);
}
openexternalmedia_mapplace = function(plid) {
    window.plid = plid;
    var _popup = $("#mapplace_panel");
    _popup.showLoading("Loading Place", false);
    _popup.show();
    _popup.panel("open");
    _popup.find("#box-body").load('mapplace_panel.html?plid=' + plid).promise().done();
    return false;
}
openexternalmedia_mapplacePer = function(pllat, pllng, plname) {
    window.pllat = pllat;
    window.pllng = pllng;
    window.plname = plname;
    var _popup = $("#mapplace_panel");
    _popup.show();
    _popup.panel("open");
    _popup.find("#box-body").load('mapplace_per.html');
    return false;
}
writeConsole = function(val) {
    var _counttextarea = $("#consolepage").size();
    if (_counttextarea == 0) {
        $('body').append('<div id="consolepage" style="width:90%; height:8em;"></div>');
    }
    var _val = $("#consolepage").html() + "<p>" + val + "</p>";
    $("#consolepage").html(_val);
}

/* getCountryFromMapCity */
global_countrymapcity = 0;
//global_citymapcity=0;
getCountryFromMapCity_ajax = function() {
    var _url = "https://myezplan.com/mobile/appdata/data_ajax/map_city_ajax.cfm?rnu=" + randomNumberUrl() + "";
    var _urlconfig = {
        action: "getcountry"
    };
    $.post(_url, _urlconfig)
        .error(getCountryFromMapCity_ajax_error)
        .success(getCountryFromMapCity_ajax_success);
}
getCountryFromMapCity_ajax_error = function(xhr, ajaxOptions, thrownError) {
    console.log(thrownError);
}
getCountryFromMapCity_ajax_success = function(response, status, xhr) {
        var _response = $.parseJSON(response);
        global_countrymapcity = _response.MESSAGE;
    }
    /* getCountryFromMapCity */
    /* setCountryToMapCity */
setCountryToMapCity_ajax = function(arg_ctyid, arg_ctid, arg_replacesession) {
    var _replacesession = typeof(arg_replacesession) == "boolean" ? arg_replacesession : false;
    var _url = "https://myezplan.com/mobile/appdata/data_ajax/map_city_ajax.cfm?rnu=" + randomNumberUrl() + "";
    var _urlconfig = {
        action: "setcountry",
        ctyid: arg_ctyid,
        ctid: arg_ctid,
        replacesession: arg_replacesession
    };
    $.post(_url, _urlconfig)
        .error(setCountryToMapCity_ajax_error)
        .success(setCountryToMapCity_ajax_success);
}
setCountryToMapCity_ajax_error = function(xhr, ajaxOptions, thrownError) {
    if ($.trim(thrownError)) {
        alert(thrownError);
    }
}
setCountryToMapCity_ajax_success = function(response, status, xhr) {
        var _response = $.parseJSON(response);
        global_countrymapcity = _response.MESSAGE;
    }
    /* setCountryToMapCity */
global_MapCityCookie = [];
/* jQuery Function */
$(document).ready(function(e) {
    updateMapCityCookie = function() {
            global_MapCityCookie = [];
            var numdays_ = $.cookie("NUMDAYS");
            if (numdays_ && numdays_ != '' && numdays_ != 0) { //alert(numdays_);
                for (x = 0; x < numdays_; x++) { //alert(x);
                    var _placesselected = $.cookie('EZMAPCITYPLACES_day' + (x + 1));
                    //alert(_placesselected);
                    if (_placesselected) {
                        var lolo = _placesselected.split(",");
                        for (y = 0; y < lolo.length; y++) {
                            global_MapCityCookie.push(lolo[y])
                        }
                    }
                }
            } else {
                var _placesselected = $.cookie('EZMAPCITYPLACES_day1');
                if (_placesselected) {
                    global_MapCityCookie = _placesselected.split(",");
                }
            }
            //		var _placesselected=$.cookie('EZMAPCITYPLACES');
            //		if(_placesselected){
            //			global_MapCityCookie=_placesselected.split(",");
            //		}
            $.each(global_MapCityCookie, function(index, value) {
                if ($.isNumeric(value)) { //alert(value);
                    global_MapCityCookie[index] = parseInt(value);
                }
            });
            //if($.isArray(global_MapCityCookie)){}
            //console.log(_placesselected+":"+global_MapCityCookie);
        }
        /* ----------------------------------------- */
        /*$('#title-box-1').click(function() {
        	$("#title-box-2").fadeIn(0);
        	$("#title-box-1").fadeOut(0);
        	$("#share-box-2").fadeIn(0);
        	$("#share-box-1").fadeOut(0);
        });
        $('#title-box-2').click(function() {
        	$("#title-box-1").fadeIn(0);
        	$("#title-box-2").fadeOut(0);
        	$("#share-box-1").fadeIn(0);
        	$("#share-box-2").fadeOut(0);
        });*/

    showFeedBack = function(arg_page) {
        var _popup = $("#feedback-box");
        _popup.fadeIn(300);
        var popMargTop = (_popup.height() + 24) / 2;
        var popMargLeft = (_popup.width() + 24) / 2;
        _popup.css({
            //'margin-top' : -popMargTop,
            'margin-left': -popMargLeft
        });
        $('body').append('<div id="mask" class="mask"></div>');
        $('#mask').fadeIn(300);
        return false;
    }
});
/* jQuery Events */
$(document).ready(function(e) {
    //	$("#img_map_preview").attr("src",_img_map_preview);
    /* ----------------------------------------- */
    /* click function on  menu-home */
    $('a#menu-home').click(function() {
        getCountryFromMapCity_ajax();
        var _popup = $("#menuhome-box");
        _popup.fadeIn(300);
        var popMargTop = (_popup.height() + 24) / 2;
        var popMargLeft = (_popup.width() + 24) / 2;
        _popup.css({
            //'margin-top' : -popMargTop,
            'margin-left': -popMargLeft
        });

        $('body').append('<div id="mask" class="mask"></div>');
        $('#mask').fadeIn(300);

        return false;
    });
    /* when ready menuhome-selectcountry load it */
    $('#menuhome-selectcountry').ready(function() {
        $("#menuhome-selectcountry").empty();
        var aleat = Math.random() * 9999999999999999;
        var url = "https://myezplan.com/mobile/appdata/map_homemenu_ajax.cfm?aleat=" + aleat + "&";
        var urlconfig = {
            action: "getcountries"
        };
        $("#menuhome-selectcountry,#mapcitycity-selectcountry").load(url, urlconfig,
            function(response, status, xhr) {
                switch (status) {
                    case "error":
                        console.log("error getting data: " + xhr.statusText);
                        break;
                    case "success":
                        $("#menuhome-selectcountry").attr("disabled", false);
                        break;
                    default:
                        break;
                }
            });
    });
    /* change function menuhome-selectcountry */
    $("#mapcitycity-selectcountry").change(function() {
        $("#mapcitycity-selectcity").empty();
        $("#mapcitycity-selectcity").attr("disabled", true);
        var _countryid = $("#mapcitycity-selectcountry").val();
        if (_countryid == "") {
            return;
        }
        var aleat = Math.random() * 9999999999999999;
        var url = "https://myezplan.com/mobile/appdata/data_ajax/map_homemenu_ajax.cfm?aleat=" + aleat + "&";
        var urlconfig = {
            action: "getcitiesbycountry",
            countryid: _countryid
        };
        $("#mapcitycity-selectcity").load(url, urlconfig,
            function(response, status, xhr) {
                switch (status) {
                    case "error":
                        console.log("error getting data: " + xhr.statusText);
                        break;
                    case "success":
                        $("#mapcitycity-selectcity").attr("disabled", false);
                        break;
                    default:
                        break;
                }
            });
    });
    $('#mapcitycity-Ideas').click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var _message = $("#message-mapcitycity");
        var _countryid = $.trim($("#mapcitycity-selectcountry").val());
        var _cityid = $.trim($("#mapcitycity-selectcity").val());
        if (_cityid == "") {
            showMessageError(_message, "You must select a City. Please try again", 300);
            hideMessageError(_message, false, 300);
            return;
        }
        mapcity.countryid = _countryid;
        mapcity.cityid = _cityid;
        //mapcity.initPage();
        //$('#mask').remove();
        mapcity.showPopupShareitPlans2();
    });
    $('#mapcitycity-viewmaps').click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var _message = $("#message-mapcitycity");
        var _countryid = $.trim($("#mapcitycity-selectcountry").val());
        var _cityid = $.trim($("#mapcitycity-selectcity").val());
        if (_cityid == "") {
            showMessageError(_message, "You must select a City. Please try again", 300);
            hideMessageError(_message, false, 300);
            return;
        }
        setCountryToMapCity_ajax(_countryid, _cityid, true);
        //window.setTimeout("window.location.reload();",1000);
        mapcity.countryid = _countryid;
        mapcity.cityid = _cityid;
        $('#mask').remove();
        var _url = "mapcitypopup.cfm?ctid=" + mapcity.cityid + "&plid=" + mapcity.countryid;
        window.top.location.href = _url;
        /*window.setTimeout("mapcity.initPage();",1000);*/
    });
    /* change function menuhome-selectcountry */
    $("#menuhome-selectcountry").change(function() {
        $("#menuhome-selectcity").empty();
        $("#menuhome-selectcity").attr("disabled", true);
        $("#menuhome-selectplan").empty();
        $("#menuhome-selectplan").attr("disabled", true);
        var _countryid = $("#menuhome-selectcountry").val();
        if (_countryid == "") {
            return;
        }
        var aleat = Math.random() * 9999999999999999;
        var url = "https://myezplan.com/mobile/appdata/data_ajax/map_homemenu_ajax.cfm?aleat=" + aleat + "&";
        var urlconfig = {
            action: "getcitiesbycountry",
            countryid: _countryid
        };
        $("#menuhome-selectcity").load(url, urlconfig,
            function(response, status, xhr) {
                switch (status) {
                    case "error":
                        console.log("error getting data: " + xhr.statusText);
                        break;
                    case "success":
                        $("#menuhome-selectcity").attr("disabled", false);
                        break;
                    default:
                        break;
                }
            });
    });
    /* change function menuhome-selectcity */
    $('#menuhome-selectcity').change(function(e) {
        $("#menuhome-selectplan").empty();
        var _cityid = $("#menuhome-selectcity").val();
        if (_cityid == "") {
            $("#menuhome-selectplan").attr("disabled", true);
            return;
        }
        var aleat = Math.random() * 9999999999999999;
        var url = "https://myezplan.com/mobile/appdata/data_ajax/map_homemenu_ajax.cfm?aleat=" + aleat + "&";
        var urlconfig = {
            action: "getplansbycity",
            cityid: _cityid
        };
        $("#menuhome-selectplan").load(url, urlconfig,
            function(response, status, xhr) {
                switch (status) {
                    case "error":
                        console.log("error getting data: " + xhr.statusText);
                        break;
                    case "success":
                        $("#menuhome-selectplan").attr("disabled", false);
                        break;
                    default:
                        break;
                }
            });
    });
    /* click function menuhome-viewmaps */
    $('#menuhome-box #menuhome-viewmaps').click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var _message = $("#message-menuhome");
        var _countryid = $.trim($("#menuhome-selectcountry").val());
        var _cityid = $.trim($("#menuhome-selectcity").val());
        var _planid = $.trim($("#menuhome-selectplan").val());
        if (_planid == "") {
            showMessageError(_message, "You must select a Plan. Please try again", 300);
            hideMessageError(_message, false, 300);
            return;
        }
        //window.location.replace("map.cfm?mapa="+_planid+"&ciudad="+_cityid);
        if (_planid == 0) {
            var _conf = false;
            if (global_countrymapcity != 0 && global_countrymapcity != _countryid) {
                _conf = window.confirm("Do you want to change the country without saving your plan (Mix & Match)?");
                if (!_conf) {
                    window.location.href = "mapcity.cfm";
                    return;
                }
            }
            setCountryToMapCity_ajax(_countryid, _cityid, _conf);
            window.setTimeout("window.location.href='mapcity.cfm';", 1000);
        } else {
            window.location.href = "map.cfm?mapa=" + _planid + "&ciudad=" + _cityid;
        }
    });
    /* click function menuhome-viewdeals */
    $('#menuhome-box #menuhome-viewdeals').click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var _message = $("#message-menuhome");
        var _url = "hotdeals.cfm?q=search&";
        var _urlconfig = "";
        var _urlhash = "#SearchResults";
        var _city = $.trim($("#menuhome-selectcity").val());
        var _tour = $.trim($("#menuhome-selectplan").val());
        if (_city == '') {
            showMessageError(_message, "You must select a City. Please try again", 300);
            hideMessageError(_message, false, 300);
            return;
        }
        if (_city != '') {
            _urlconfig += "city=" + _city + "&";
        }
        if (_tour != '') {
            _urlconfig += "tour=" + _tour + "&";
        }
        location.href = _url + _urlconfig + _urlhash;
    });
    /* Click citymap */
    $('#menuhome-box #menuhome-viewmap').click(function(e) {
        e.preventDefault();
        var _message = $("#message-menuhome");
        var _cityid = $.trim($("#menuhome-selectcity").val());
        if (_cityid == "") {
            showMessageError(_message, "You must select a City. Please try again", 300);
            hideMessageError(_message, false, 300);
            return;
        }
        cargar_citypic(_cityid);
        var _popup = $("#citymap-box");
        _popup.fadeIn(300);

        var popMargTop = (_popup.height() + 24) / 2;
        var popMargLeft = (_popup.width() + 24) / 2;
        var popZindez = (parseInt(_popup.css("z-index")));
        _popup.css({
            //'margin-left' : -popMargLeft,
            'z-index': popZindez + 1
        });
        $('body').append('<div id="mask-citymap" class="mask" style="z-index:0;"></div>');
        var _mask = $('#mask-citymap');
        _mask.css('z-index', popZindez);
        _mask.fadeIn(300);
        return false;
    });

    /* click function on  button-searchhotdeals */
    $('#button-searchhotdeals').click(function(event) {
        //alert("deals popup");
        event.preventDefault();
        var _url = "https://myezplan.com/mobile/appdata/hotdeals.cfm?q=search&";
        var _urlconfig = "";
        var _urlhash = "#SearchResults";
        //		var _city=document.getElementById('ciudad_sel').value;
        //		var _tour=document.getElementById('tour_sel').value;
        //		var _country=document.getElementById('estado_sel').value;
        //		if(_country=='' ){
        /*alert('For deals you must select the Country.');*/
        var _popup = $("#menusearchdeals-box");
        _popup.fadeIn();

        var popMargTop = (_popup.height() + 24) / 2;
        var popMargLeft = (_popup.width() + 24) / 2;

        _popup.css({
            //'margin-top' : -popMargTop,
            //'margin-left' : -popMargLeft
        });

        $('body').append('<div id="mask" class="mask"></div>');
        $('#mask').fadeIn();

        return false;

        //		}else{
        //			if(_city!=''){
        //				_urlconfig+="city="+_city+"&";
        //			}
        //			if(_tour!=''){
        //				_urlconfig+="tour="+_tour+"&";
        //			}
        //				location.href=_url+_urlconfig+_urlhash;
        //		}
    });
    /* when ready menusearchdeals-selectcountry load it */
    $('#menusearchdeals-selectcountry').ready(function() {
        $("#menusearchdeals-selectcountry").empty();
        var aleat = Math.random() * 9999999999999999;
        var url = "https://myezplan.com/mobile/appdata/data_ajax/map_homemenu_ajax.cfm?aleat=" + aleat + "&";
        var urlconfig = {
            action: "getcountries"
        };
        $("#menusearchdeals-selectcountry").load(url, urlconfig,
            function(response, status, xhr) {
                switch (status) {
                    case "error":
                        console.log("error getting data: " + xhr.statusText);
                        break;
                    case "success":
                        $("#menusearchdeals-selectcountry").attr("disabled", false);
                        break;
                    default:
                        break;
                }
            });
    });
    /* change function menusearchdeals-selectcountry */
    $('#menusearchdeals-selectcountry').change(function() {
        $("#menusearchdeals-selectcity").empty();
        $("#menusearchdeals-selectcity").attr("disabled", true);
        $("#menusearchdeals-selectplan").empty();
        $("#menusearchdeals-selectplan").attr("disabled", true);
        var _countryid = $("#menusearchdeals-selectcountry").val();
        if (_countryid == "") {
            return;
        }
        var aleat = Math.random() * 9999999999999999;
        var url = "https://myezplan.com/mobile/appdata/data_ajax/map_homemenu_ajax.cfm?aleat=" + aleat + "&";
        var urlconfig = {
            action: "getcitiesbycountry",
            countryid: _countryid
        };
        $("#menusearchdeals-selectcity").load(url, urlconfig,
            function(response, status, xhr) {
                switch (status) {
                    case "error":
                        console.log("error getting data: " + xhr.statusText);
                        break;
                    case "success":
                        $("#menusearchdeals-selectcity").attr("disabled", false);
                        break;
                    default:
                        break;
                }
            });
    });
    /* change function menusearchdeals-selectcity */
    $('#menusearchdeals-selectcity').change(function() {
        $("#menusearchdeals-selectplan").empty();
        var _cityid = $("#menusearchdeals-selectcity").val();
        if (_cityid == "") {
            $("#menusearchdeals-selectplan").attr("disabled", true);
            return;
        }
        var aleat = Math.random() * 9999999999999999;
        var url = "https://myezplan.com/mobile/appdata/data_ajax/map_homemenu_ajax.cfm?aleat=" + aleat + "&";
        var urlconfig = {
            action: "getplansbycity",
            cityid: _cityid
        };
        $("#menusearchdeals-selectplan").load(url, urlconfig,
            function(response, status, xhr) {
                switch (status) {
                    case "error":
                        console.log("error getting data: " + xhr.statusText);
                        break;
                    case "success":
                        $("#menusearchdeals-selectplan").attr("disabled", false);
                        break;
                    default:
                        break;
                }
            });
    });
    /* click function menusearchdeals-send */
    //function menusearchdealsSend(){
    $('#menusearchdeals-send').click(function(event) {
        event.preventDefault();
        var _url = "hotdeals.html?q=search&";
        var _urlconfig = "";
        var _urlhash = "#SearchResults";
        var _message = $("#message-menusearchdeals");
        var _country = $.trim($("#menusearchdeals-selectcountry").val());
        var _city = $.trim($("#menusearchdeals-selectcity").val());
        var _tour = $.trim($("#menusearchdeals-selectplan").val());
        window.citdeals = _city;
        if (_city == '') {
            showMessageError(_message, "You must select a City. Please try again", 300);
            hideMessageError(_message, false, 300);
            return;
        }
        var country_cookie = $.cookie("PAIS");
        var myezplan = $.cookie("EZPLAN");
        if (country_cookie != _country && myezplan != 'NO') {
            if (confirm('Do you want to change the country and reset myezplan?')) {
                $.cookie("PAIS", _country);
                $.cookie("EZPLAN", 'NO');
                $.cookie("EZPLANsp", 'NO');
                $.cookie("EZPLANep", 'NO');
            } else {
                closePopup();
                return false;
            }
        }
        if (_city != '') {
            _urlconfig += "city=" + _city + "&";
        }
        if (_tour != '') {
            _urlconfig += "tour=" + _tour + "&";
        }
        _urlconfig += randomNumberUrl();
        $.ajax({
            type: "POST",
            url: "https://myezplan.com/mobile/appdata/data_ajax/deals_ajax_content.cfm",
            async: false,
            cache: false,
            data: {
                action: "countsearchingdeals",
                city: _city,
                tour: _tour
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(thrownError);
            },
            success: function(datos) {
                if ((parseInt(datos) == 0)) {
                    showMessageError(_message, "Sorry, there are currently no special offers in this area. Please check later.", 300);
                    hideMessageError(_message, false, 300);
                    return false;
                }
                var url = _url + _urlconfig + _urlhash;
                //window.location.href=url;
                $("#deals_panel #box-body").empty();
                $("#deals_panel #box-body").load(url);
                var _popup = $("#menusearchdeals-box");
                _popup.fadeOut();
                $('#mask').fadeOut();
                $('#mask').fadeOut();
            }
        });

        //window.location.replace(_url+_urlconfig+_urlhash);
    });
    //}
    /* Click citymap */
    $('#menusearchdeals-box #menuhome-viewmap').click(function(event) {
        event.preventDefault();
        var _message = $("#message-menusearchdeals");
        var $selectcity = $("#menusearchdeals-selectcity");
        var $cityid = $.trim($selectcity.val());
        var $cityname = $selectcity.find("option[value=" + $cityid + "]").text();
        if ($cityid == "") {
            showMessageError(_message, "You must select a City. Please try again", 300);
            hideMessageError(_message, false, 300);
            return;
        }
        $("#citymap-box #citymap_img_cityname").text($cityname);
        cargar_citypic($cityid);
        var _popup = $("#citymap-box");
        _popup.fadeIn(300);

        var popMargTop = (_popup.height() + 24) / 2;
        var popMargLeft = (_popup.width() + 24) / 2;
        var popZindez = (parseInt(_popup.css("z-index")));
        _popup.css({
            //'margin-left' : -popMargLeft,
            'z-index': popZindez + 1
        });
        $('body').append('<div id="mask-citymap" class="mask" style="z-index:0;"></div>');
        var _mask = $('#mask-citymap');
        _mask.css('z-index', popZindez);
        _mask.fadeIn(300);
        return false;
    });
});
/* ----------------------------------------- */

/* ----------------------------------------- */
$(window).load(function(e) {
    window.setTimeout(getuserplantable, 1000);

    $(document).on("click", "a#menu-mycart, #menu-mycart", function(e) {
        $("#cart-panel #box-body").empty();
        showUserCart();
        return false;
    });

    $(document).on("click", "a#menu-myaccount, #menu-myaccount", function(e) {
        openshowAccount();
        return false;
    });
    $(document).on("click", "a#menu-myitinerary, #menu-myitinerary", function(e) {
        mapcitypopup.showSelPlaces2();
        return false;
    });
    $(document).on("click", "a#menu-mytrips, #menu-mytrips", function(e) {
        mapcitypopup.MyItinerariesView();
        return false;
    });
    $(document).on("click", "a#menu-mybusiness, #menu-mybusiness", function(e) {
        showmybusiness();
        return false;
    });
    $(document).on("click", "a#menu-myplans, #menu-myplans, a#buttonAddPlanItinerary", function(e) {
        showUserPlanTable();
        return false;
    });
    showUserCart = function() {
        console.log("cart")
        var _cart = JSON.parse(sessionStorage.cart);
        if (_cart[0].placeid != "N") {
            var $popup = $("#cart-panel");
            var $popupL = $("#cart-panel #box-body");
            $popupL.empty();
            $popup.panel();
            $popup.show();
            $popup.panel("open");
            $popupL.load("cart.html");
        } else {
            var notice = new PNotify({
                title: 'Myezplan Notice',
                text: 'Your Shopping cart is empty',
                styling: 'jqueryui',
                type: 'error',
                delay: 1000,
                mouse_reset: false,
                buttons: {
                    closer: false,
                    sticker: false
                }
            });
            notice.get().click(function() {
                notice.remove();
            });
        }
    }
    showmybusiness = function(_page) {
            /*var $panel  = $("#business-panel");
            var $panelL = $("#business-panel #box-body");
            $panel.panel();
            $panel.show();
            $panel.panel("open");
            $panelL.load("cl_redeemvoucher.html");	*/
            //window.location.href="#business";
        //    $("#menu-business .ui-panel-inner").load("cftags/headmenu.html .business .sessionOn", function() {
        //        var menubusi = $("#menu-business");
        //        menubusi.trigger('create');
        //        menubusi.show();
        //        menubusi.panel("close");
        //    });
        //    var busipage = $("#business");
        //    $(".page-div").hide();
        //    busipage.show();
        //    if (typeof _page != 'undefined') {
        //        busipage.load("cl_redeemvoucher.html").promise().done(showclSettings());
        //    } else {
        //        busipage.load("cl_redeemvoucher.html", function() {
        //            $('#cl_content').show();
        //        })
        //
        //    }
        //    pageheadercityname.innerHTML = "<span class='capitalize_red'>R</span>edeem";
        //    $("#menu_panel").panel("close");
        //    $("#gen-menu-btn").hide();
        //    $("#bus-menu-btn").show();
        //    window.returnpage = "page1";
        //    backarrow_nav = 1;
        //    $("#go_backgreen").show();
        //    $("#Gen_footer").hide();
        //
        //}

        console.log("business...")
        /* Click boton myuserplan */
        //$('a#menu-myplans, a#buttonAddPlanItinerary').click(function() {

    /* obtain myuserplan-box table inside */
    showUserPlanTable = function() {
        var $popup = $("#myuserplan-box");
        $popup.panel();
        $popup.show();
        $popup.panel("open");
        countMyUserPlan();
        if (!(countuserplan > 0)) {
            alert("You don't have Saved Plans");
            $popup.panel("close");
            return false;
        }
        //$popup.fadeIn(300);
        var popMargTop = ($popup.height() + 24) / 2;
        var popMargLeft = ($popup.width() + 24) / 2;
        /*$popup.css({'margin-left' : -popMargLeft});*/
        //$('body').append('<div id="mask" class="mask"></div>');
        //$('#mask').fadeIn(300);
        getuserplantable();
    }

    function getuserplantable() {
        if (cf_sid == "") {
            return;
        }
        countMyUserPlan();
        if (!(countuserplan > 0)) {
            return;
        }
        //alert("Get counter");
        $("#myuserplan-box #body").empty();
        var aleat = Math.random() * 9999999999999999;
        var url = "mobile/appdata/data_ajax/map_usersplans_ajax.cfm?aleat=" + aleat + "";
        var urlconfig = {
            action: "getuserplantable",
            upuserid: sessionStorage.cf_sid
        };
        $("#myuserplan-box #box-body").load(url, urlconfig, getuserplantable_result);
        $(".load_img").css("display", "none");
    }

    function getuserplantable_result(response, status, xhr) {
        var popup = $("#myuserplan-box");
        switch (status) {
            case "error":
                console.log("error getting data: " + xhr.statusText);
                break;
            case "success":
                break;
            default:
                break;
        }
    }
    /* ----------------------------------------- */

    /* ----------------------------------------- */

    $('#map-top-button-option').click(function(e) {
        if (global_countrymapcity == 0) {
            setCountryToMapCity_ajax(countryid, cityid, true);
        } else {
            window.top.location.href = "mapcity.cfm";
        }
        return false;
    });
    /* open click FAQ */
    $('#map-top-button-faq').click(function(e) {
        console.log('asd')
        e.stopPropagation();
        e.preventDefault();
        //alert(faqpage);//openPopupFAQ();
        $('#myeztravel-faq').showLoading("Please Wait,<br/>Retriving Topics...<br/>", false);
        $('body').append('<div id="mask-faq" class="mask-faq"></div>');
        $('#mask-faq').fadeIn(0);
        $('#myeztravel-faq').fadeIn(0);
        if (!sessionStorage.getItem('ppfaq' + faqpage)) {
            var _url = "https://myezplan.com/mobile/appdata/data_ajax/faq_ajax_content.cfm?page=" + faqpage;
            var _urlconfig = {
                action: 'Faq_index'
            };
            $('#myeztravel-faq').load(_url, _urlconfig, function(response, status, xhr) {

                $.getScript('js/closePopup.js',function(){
                    console.log('loaded')
                })

                switch (status) {
                    case "error":
                        $('#myeztravel-faq').empty();
                        alert("We are sorry, There aren't any help files in this page");
                        break;
                    case "success":
                        sessionStorage.setItem('ppfaq' + faqpage, response);
                        $.getScript('js/closePopup.js',function(){
                            console.log('loaded')
                        })
                }
            });
        } else {
            $('#myeztravel-faq').html(sessionStorage.getItem("ppfaq" + faqpage));
            $.getScript('js/closePopup.js',function(){
                console.log('loaded')
            })
        }
        return false; //alert('llega al final');
    });
    /*$('#real_body_header .map-top-button-faq').click(function(e) {
    	e.stopPropagation();e.preventDefault();
    	openPopupFAQ();
    	return false;
    });*/
    openPopupFAQ = function() {
        var _popup = $("#faq-box");
        _popup.fadeIn(300);
        var popMargTop = (_popup.height() + 24) / 2;
        var popMargLeft = (_popup.width() + 24) / 2;
        _popup.css({
            //'margin-left' : -popMargLeft
        });
        $('body').append('<div id="mask" class="mask"></div>');
        $('#mask').fadeIn(300);
        openPopupFAQ_ajax();
    }
    openPopupFAQ_ajax = function() {
        $("#faq-box .box-body").empty();
        var _url = "https://myezplan.com/mobile/appdata/data_ajax/faq_ajax_content.cfm";
        var _urlconfig = {
            action: "getitemspopup"
        };
        $("#faq-box .box-body").load(_url, _urlconfig, openPopupFAQ_ajax_result);
    }
    openPopupFAQ_ajax_result = function(response, status, xhr) {}

    $.getScript('js/closePopup.js',function(){
        console.log('loaded')
    })

    if ($(document).tooltip) {
        $(document).tooltip();
    }

    // close date-picker when tap or click outside
    $(document).mouseup(function(e) {
        var container = $(".hasDatepicker");
        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            container.hide();
        }
    });
    $('html').on('touchstart', function(e) {
        var container = $(".hasDatepicker");
        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            container.hide();
        }
    })


    /* ----------------------------------------- */

    /* End document ready*/
});

function go_mytinierary() {
    $("#myitin_panel #box-body").empty();
    $("#gene_int_info")[0].innerHTML = "<img width='35px' src='https://lh6.googleusercontent.com/-44bFjug7xpE/U5I5oAOzU_I/AAAAAAANfHI/a1ItxGAYBN0/s50/Untitled35.png'>";
    $("#myitin_panel").show();
    $("#myitin_panel").panel("open");
    $("#myitin_panel #box-body").load("myitinerary.html");
}

function loadnewcitypage() {
    $("#page1").load("mapcitypopup_2.html", function() {
        $("#page1").load("mapcitypopup_2.html");
    });
}

function openLastPanel() {
    var cPanel = '';
    var lPanel = '';
    //.panel("open");
}

function closemyitin() {
    $("#myitin_panel").panel("open");
}

function showdealsfromitine(dcity, dtour) {
    $("#deals_panel .box-body").empty();
    //window.top.location.href=_url;
    window.citdeals = dcity;
    window.tourdeals = dtour;
    $("#deals_panel #box-body").load("hotdeals.html");
    $("#deals_panel").panel();
    $("#deals_panel").show();
    $("#deals_panel").panel("open");
    return true;
}

function checkPlnDls(dcity, dtour, elem) {
    $.ajax({
        type: "POST",
        url: "https://myezplan.com/mobile/appdata/data_ajax/deals_ajax_content.cfm",
        async: false,
        cache: false,
        data: {
            action: "countsearchingdeals",
            city: dcity,
            tour: dtour
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        },
        success: function(datos) {
            if ((parseInt(datos) == 0)) {
                $("." + elem).hide();
                return false;
            } else {
                $("." + elem).show();
            }
        }
    });
}

function myEditPlan(myUrl) {
    $("#editPlan_panel #box-body").empty();
    window.myUrl = myUrl;
    window.shaMyUrl = myUrl.replace("mapcity_edit.html", "https://www.myezplan.com/mapcity.cfm");
    $("#editPlan_panel").show();
    $("#editPlan_panel").panel("open");
    $("#editPlan_panel #box-body").load(myUrl);
}

function openReport(rurl, plid) {
    window.RPlid = plid;
    var rPanel = $("#report_panel");
    var rBody = $("#report_panel .box-body");
    rPanel.show();
    rPanel.panel("open");
    rBody.load(rurl);
}

function inlineDate(did, type) {
    if (typeof type != 'undefined' && type == "class") {
        var datedid = $('.' + did);
    } else {
        var datedid = $('#' + did);
    }
    console.log(did);
    if (datedid.css('display') == 'none') {
        datedid.show();
    } else {
        datedid.hide();
    }
}

function truncateString(word, wordCount) {
    var expr = new RegExp("(([^\\s]+\\s+){" + wordCount + "}).+");
    return word.replace(expr, "$1...");
}
/*$(document).ready(function(e) {
	
			$(".round").click(function(){
				$(".show_sop").hide();
				$('.'+$(this).attr('id')).slideToggle(250);
				if($(this).attr('name')=="siagree1"){
					$(".share_submit_2").hide();
					}
				else{
					$(".share_submit_2").show();
					}
		});
});*/
function showExternalPage(_url, where) {
    _panel = $("#externalP-panel");
    _panel.panel();
    _panel.show();
    _panel.panel("open");
    if (where || where == "iframe") {
        _panelLoad = $("#externalP-panel iframe");
        _panelLoad.show();
        _panelLoad.attr("src", _url);
    } else {
        _panelLoad = $("#externalP-panel #box-body");
        _panelLoad.show();
        _panelLoad.empty();
        _panelLoad.load(_url);
    }
}

function faqMyAccount() {
    //e.stopPropagation();e.preventDefault();
    //alert(faqpage);//openPopupFAQ();
    $('#myeztravel-faq').showLoading("Please Wait,<br/>Retriving Topics...<br/>", false);
    $('body').append('<div id="mask-faq" class="mask-faq"></div>');
    $('#mask-faq').fadeIn(0);
    $('#myeztravel-faq').fadeIn(0);
    if (!sessionStorage.getItem('accfaq')) {
        var _url = "https://myezplan.com/mobile/appdata/data_ajax/faq_ajax_content.cfm?page=myaccount";
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
                    sessionStorage.setItem('accfaq', response);
            }
        });
    } else {
        $('#myeztravel-faq').html(sessionStorage.getItem("accfaq"));
    }
    return false; //alert('llega al final');
}

function showContactus() {
    _panel = $("#contactus-panel");
    _paneload = $("#contactus-panel .box-body");
    _paneload.empty();
    _panel.panel();
    _panel.show();
    _panel.panel("open");
    _paneload.load("contactus.html");
}

function showHowitworks() {
    _panel = $("#hworks-panel");
    _paneload = $("#hworks-panel .box-body");
    _paneload.empty();
    _panel.panel();
    _panel.show();
    _panel.panel("open");
    _paneload.load("howitworks.html");
}

function closeContact() {
    _panel = $("#contactus-panel");
    _panel.panel("close");
}

function closehworks() {
    _panel = $("#hworks-panel");
    _panel.panel("close");
}

function logOut() {
    $.ajax({
        type: "GET",
        url: "https://myezplan.com/mobile/appdata/data_ajax/log_out.cfm",
        async: true,
        cache: false,
        success: function(data) {
            window.returnpage = "page1";
            sessionStorage.clear();
            returnHome();
            sessionStorage.cart = JSON.stringify([{
                placeid: "N"
            }]);
            sessionStorage.externalcart = JSON.stringify([{
                placeid: "N"
            }]);
            $("#business").empty();
            $("#menu-business .ui-panel-inner").empty();
            $("#menu_panel").panel("close");
            var notice = new PNotify({
                title: 'Myezplan Notice',
                text: 'Sign out successful',
                styling: 'jqueryui',
                type: 'error',
                delay: 1000,
                mouse_reset: false,
                buttons: {
                    closer: false,
                    sticker: false
                }
            });
            notice.get().click(function() {
                notice.remove();
            });
            var data = "cftags/headmenu.html ." + faqpage + " .sessionOff";
            //setTimeout('$( "#menu_panel .ui-panel-inner" ).load( data )',1000);
            $("#menu_panel .ui-panel-inner").load(data, function() {
                $("#menu_panel").trigger('create');
            });
        }
    });
}

function getCatpcha(_img, cptext) {
    $.ajax({
        url: 'https://myezplan.com/mobile/appdata/data_ajax/get_catpcha.cfm',
        success: function(data) {
            _data = data.split(";");
            document.getElementById(_img).src = _data[0];
            $("#" + cptext).val(_data[1]);
            _code = _data[2].replace(/\s+/g, '');
            //console.log(_code);
            signup_rnd = _code;
        }
    });
}

function uploadFileAjax(_form) {
    /*$("#loading")
.ajaxStart(function(){
$(this).show();
})
.ajaxComplete(function(){
$(this).hide();
});*/
    $.ajaxFileUpload({
        url: 'https://myezplan.com/mobile/appdata/sube_fichero_ajax.cfm',
        secureuri: false,
        fileElementId: 'subirimagen',
        dataType: 'json',
        success: function(data, status) {
            /*if(typeof(data.error) != 'undefined')
            {
            if(data.error != '')
            {
            alert(data.error);
            }else
            {
            alert(data.msg);
            }
            }*/
            alert("logo updated");
        },
        error: function(data, status, e) {
            alert(e);
        }
    })
}

function getInFirst() {
    fromlogin = 1;
    Continue_new();
}

function showclSettings() {
    faqpage = 'cl_settings';
    pageheadercityname.innerHTML = "<span class='capitalize_red'>M</span>y Settings";
    var _url = "https://myezplan.com/mobile/appdata/data_ajax/clsettings.cfm?rnu=1354684656";
    var _urlconfig = {
        action: "ShowSettings",
        upuserid: sessionStorage.cf_sid
    };
    $.post(_url, _urlconfig)
        //.error(myezplan.utils.ajaxError)
        .success(function(response, status, xhr) {
            $('#cl_content').html(response);
            $('#cl_content').show();
            pageheadercityname.innerHTML = "<span class='capitalize_red'>M</span>y Settings";
            $("#menu-business").panel("close");
        });
    return false;
}

function showTabGen(_el) {
    if ($("#" + _el).css("display") == "none") {
        $("#" + _el).show();
    } else {
        $("#" + _el).hide();
    }
}

function faqPayment() {
    //e.stopPropagation();e.preventDefault();
    //alert(faqpage);//openPopupFAQ();
    $('#myeztravel-faq').showLoading("Please Wait,<br/>Retriving Topics...<br/>", false);
    $('body').append('<div id="mask-faq" class="mask-faq"></div>');
    $('#mask-faq').fadeIn(0);
    $('#myeztravel-faq').fadeIn(0);
    if (!sessionStorage.getItem('payment')) {
        var _url = "https://myezplan.com/mobile/appdata/data_ajax/faq_ajax_content.cfm?page=payment";
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
                    sessionStorage.setItem('payment', response);
            }
        });
    } else {
        $('#myeztravel-faq').html(sessionStorage.getItem("payment"));
    }
    return false; //alert('llega al final');
}

function changeitiname_edit(id) {
    var newname = document.getElementById('nametochange-edit').value;
    if (newname == '') {
        alert('please type a valid name');
        return false;
    }
    //document.getElementById('itinameh1').innerHTML=newname;
    //document.getElementById('linkview_'+id).innerHTML=newname;
    $.cookie("MYITINERARYNAME", newname);
    var url = "https://myezplan.com/mobile/appdata/data_ajax/mapcity_content_VI.cfm?rnu=5131616516651";
    var urlconfig = {
        action: "ChangeItineraryName",
        itiid: id,
        newname: newname
    };
    $("#Itinenrary_funcs").load(url, urlconfig, function() {
        var notice = new PNotify({
            title: 'Myezplan Notice',
            text: 'The name has been changed.',
            styling: 'jqueryui',
            type: 'success',
            delay: 1000,
            mouse_reset: false,
            buttons: {
                closer: false,
                sticker: false
            }
        });
        notice.get().click(function() {
            notice.remove();
        });
    });
}

function makeShortUrl(longUrl, callback) {
    var request = gapi.client.urlshortener.url.insert({
        'resource': {
            'longUrl': longUrl
        }
    });
    request.execute(function(response) {
        if (response.id != null) {
            /*str ="<b>Long URL:</b>"+longUrl+"<br>";
            str +="<b>Short URL:</b> <a href='"+response.id+"'>"+response.id+"</a><br>";
            console.log(str)*/
            window.shortUrl = response.id;
            callback();
        } else {
            alert("error: creating short url n" + response.error);
        }

    });
}

function delfromArrayList(arr, arg) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i].genid === arg) {
            arr.splice(i, 1);
        }
    }
}

function Mapfullscreen(state) {
    if (state == "on") {
        $("#titlehead, #show_categ, #show_places, #areas_desc, #myitin_content").hide();
        $("#body_map_canvas .gm-style").addClass("gmstylefull");
        $("#body_map").css("height", "100%");
        $(".wrap").css("height", "100%");
    } else {
        $("#titlehead, #show_categ, #show_places, #areas_desc, #myitin_content").show();
        $("#body_map_canvas .gm-style").removeClass("gmstylefull");
        $("#body_map").css("height", "235px;");
        $(".wrap").css("height", "auto");
    }
}

function bringcountrylist(type, sel) {
    $.ajax({
        url: 'https://myezplan.com/data_ajax/cargar_country_ajax.cfm',
        async: true,
        success: function(data) {
            arraycountry = JSON.parse(data);
            if (type == "select") {
                var arrsize = arraycountry.length;
                sel.append('<option value="">Select Country</option>');
                for (c = 0; c < arrsize; c++) {
                    var countrysel = arraycountry[c];
                    sel.append('<option value="' + countrysel.ID + '" class="' + countrysel.COUNTRY + '">' + countrysel.COUNTRY + '</option>');
                }
            }
        }
    });
}

function geteSminfo(div1, div2, type) {
    var _type = type || 'all';
    var _div1 = div1 || '#rsoc';
    var _div2 = div2 || '#recommend';
    var smitems = 0;
    var appitems = 0;
    var rcmitems = 0;
    if (window.appmobile && window.appmobile == "yes") {
        var smurl = "https://myezplan.com/data_ajax/get_extrainfo.cfm?action=sminfo";
    } else {
        var smurl = "data_ajax/get_extrainfo.cfm?action=sminfo";
    }

    $.getJSON(smurl, function(data) {
        console.log("icons Ready");
        $.each(data, function(key, val) {
            if (val.URL.indexOf("facebook") != -1) {
                var imgalt = 'Facebook';
            }
            if (val.URL.indexOf("instagram") != -1) {
                var imgalt = 'Instagram';
            }
            if (val.URL.indexOf("twitter") != -1) {
                var imgalt = 'Twitter';
            }
            if (val.URL.indexOf("android") != -1) {
                var imgalt = 'Android';
            }
            if (val.URL.indexOf("apple") != -1) {
                var imgalt = 'Apple';
            }
            if (val.TYPE == "sm") {
                smitems++;
                if (_type == "sminfo" || _type == "all") {
                    $(_div1 + " #smicons").append("<a href='" + val.URL + "' target='_blank' style='padding: 0px 3px;'><img alt='" + imgalt + "' src='" + val.ICON + "' height='24px'></a>");
                }

            } else if (val.TYPE == "app") {
                appitems++;
                if (_type == "sminfo" || _type == "all") {
                    $(_div1 + " #appicons").append("<a href='" + val.URL + "' target='_blank' style='padding: 0px 3px;'><img alt='" + imgalt + "' src='" + val.ICON + "' height='24px'></a>");
                }

            } else {
                rcmitems++;
                if (_type == "rcminfo" || _type == "all") {
                    $(_div2 + " span").append("<a href='" + val.URL + "' target='_blank' style='padding: 0px 3px;'><img src='" + val.ICON + "' height='50px'></a>");
                }
            }
        });
        $('#rsoc').show(250);
        if (rcmitems != 0) {
            $('#recommend').show(250);
        }
    });
}

function Getfaqs(faqp) {
    //e.stopPropagation();e.preventDefault();
    //alert(faqpage);//openPopupFAQ();
    $('#myeztravel-faq').showLoading("Please Wait,<br/>Retriving Topics...<br/>", false);
    $('body').append('<div id="mask-faq" class="mask-faq"></div>');
    $('#mask-faq').fadeIn(0);
    $('#myeztravel-faq').fadeIn(0);
    if (!sessionStorage.getItem(faqp)) {
        var _url = "https://myezplan.com/mobile/appdata/data_ajax/faq_ajax_content.cfm?page=" + faqp;
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
                    sessionStorage.setItem(faqp, response);
            }
        });


    } else {
        $('#myeztravel-faq').html(sessionStorage.getItem(faqp));
    }
    return false; //alert('llega al final');
}
window.idleLimit = 6;
function idleTime() {
    window.idleReset = 1;
    window.idleT = 0;
    window.idleInterval;
    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;
    window.lastIdleTime = new Date(Date());
    window.crrtIdleTime = '';
    idleInterval = window.setTimeout(chckIdle, 300000);
}
function chckIdle() {
    console.log(idleT);
    var d = new Date();
    var h = d.getHours()
    var m = d.getMinutes();
    console.log(h + ":" + m);
    //console.log(Date());
    crrtIdleTime = new Date(Date());
    var diffTimes = crrtIdleTime.getTime() - lastIdleTime.getTime()
    if (diffTimes >= 300000) {
        idleT++;
        if (idleT == 5) {
            idleReset = 0;
            myezAlert.render("You have been idle about 25 minutes, your session will be closed in 5 minutes. Would you like to continue?", 'conf', function() {
                idleReset = 1;
                resetTimer();
            });
        }
        if (idleT == idleLimit) {
            //console.log("You are now logged out.");
            clearTimeout(idleInterval);
            resetTimer();
            myezAlert.ok();
            logOut();
        } else {
            //console.log("still login");
            lastIdleTime = new Date(Date());
            idleInterval = window.setTimeout(chckIdle, 300000);
        }
    } else {
        console.log("To fast");
        idleInterval = window.setTimeout(chckIdle, 300000);
    }
}
function resetTimer() {
    if (idleReset == 1) {
        //console.log("moving");
        // clearTimeout(idleInterval);
        idleT = 0;
    } else {
        console.log("Waiting");
    }
}
loadExternalAjaxPage_Result = function (response, status, xhr) {
    switch (status) {
    case "error":
        $(this).html(xhr.statusText);
        break;
    case "success":
        break;
    }
}
function opensocialmedia() {
    //$('body').append('<div id="mask-openmedia" class="mask-faq"></div>');
    if (window.appmobile && window.appmobile == "yes") {
        var _url = "https://myezplan.com/data_ajax/socialmedia.cfm";
    } else {
        var _url = "data_ajax/socialmedia.cfm";
    }
    var _urlconfig = {
        action : 'GetSocMed'
    };
    $('#openmedia .box-body').load(_url, _urlconfig, loadExternalAjaxPage_Result);
    //$('#mask-openmedia').fadeIn(100);
    $("#openmedia").panel();
    $("#openmedia").css('maxWidth','300px');
    $("#openmedia").show();
    $("#openmedia").panel('open');
    return false;
}
function close_panel() {
    $(".ui-panel").panel("close");
}
function openapplinks() {
    if (window.appmobile && window.appmobile == "yes") {
        var _url = "https://myezplan.com/data_ajax/socialmedia.cfm";
    } else {
        var _url = "data_ajax/socialmedia.cfm";
    }
    var _urlconfig = {
        action : 'GetAppLink'
    };
    $('#openmedia .box-body').load(_url, _urlconfig, loadExternalAjaxPage_Result);
    $("#openmedia").panel();
    $("#openmedia").css('maxWidth','200px');
    $("#openmedia").show();
    $("#openmedia").panel('open');
    return false;
}
function LoadScript(url, cllb) {
    var d = document,
        t = 'script',
        o = d.createElement(t),
        s = d.getElementsByTagName(t)[0];
    o.src = url;
    if (cllb) {
        o.addEventListener('load', function(e) {
            cllb(null, e);
        }, false);
    }
    s.parentNode.insertBefore(o, s);
}