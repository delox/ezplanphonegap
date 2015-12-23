// JavaScript Document
cf_sidP = false; /*<!--- Pending Refresh for javascript --->*/
function traerciudadlogin(estado) {
    $('#signup_city').val('');
    var sel = '<select id="signup_city" name="signup_city"><option value="">Choose one...</option>';
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
            $('#clcitysel').html(sel);
        }
    }
}

function lightbox() {
    document.getElementById('light_box').style.display = 'block';
    document.getElementById('light_box_cont').style.display = 'block';
}

function lightbox2(num) {
    //document.getElementById('light_box').style.display='block';
    $("#light_box_cont_signin").panel();
    document.getElementById('light_box_cont_signin').style.display = 'block';
    document.getElementById('light_box_cont_signin_num').value = num;
    document.getElementById('usuariologin').focus();
    $("#light_box_cont_signin").panel("open");

}

function lightboxr(num) {
    var _panel = $("#light_box_cont_signup");
    _panel.panel();
    _panel.show();
    _panel.panel("open");
    //document.getElementById('light_box').style.display='block';
    document.getElementById('light_box_cont_signup').style.display = 'block';
    document.getElementById('light_box_cont_signup_num').value = num;
    $("#signup_email").val('');
    getCatpcha('siup-catpcha-img', 'signup_captchahash');
    //var clogo = $.cookie("PAGELOGO");
    //if(clogo && clogo!=''){$(".img_logo").attr('src',clogo);}
    var cook_cliente = $.cookie("CL_U_ID");
    if (cook_cliente && cook_cliente != '' && cook_cliente != '0-0') {
        var cook = cook_cliente.split('-');
        var cliusr = cook[1];
        var cliid = cook[0];
        document.getElementById('clientsource').value = parseInt(cliid);
        document.getElementById('clientuser').value = parseInt(cliusr);
    }
}

function lightboxf() {
    var _panel = $("#light_box_cont_forgot");
    _panel.panel();
    _panel.show();
    _panel.panel("open");
    //document.getElementById('light_box').style.display='block';
    document.getElementById('light_box_cont_forgot').style.display = 'block';
}

function pedir_sesion(num, jsaction) {
    cf_sidjs = jsaction;
    lightbox2(num);
}
signup_email_error = false;

function verify_email() {
    aleat = Math.random() * 9999999999999999;
    var correo = $("#signup_email").val();
    var errmsj = $('#general-msg');
    /*
    $("#signup_pass").attr("disabled",true);
    $("#signup_pass2").attr("disabled",true);
    $('input[name="signup_gender"]').attr("disabled",true);
    $('input[name="signup_age"]').attr("disabled",true);
    */
    var _isemail = validateEmail(correo);
    if (!_isemail) {
        document.getElementById('inc_msgr').style.display = 'block';
        showMessageError(errmsj, 'Invalid Email. Please try again', 300, 'error', 'top');
        hideMessageError(errmsj, false, 300);
        /*$("#signup_email").focus().select();*/
        return false;
    }
    $("#input_td_loading").css("display", "block");
    //--------------
    $.ajax({
        type: "POST",
        url: "https://myezplan.com/mobile/appdata/data_ajax/verify_email.cfm",
        async: true,
        data: "correo=" + correo + "&aleat=" + aleat,
        success: function(datos) {
            if (datos.indexOf("xnox") != -1) {
                document.getElementById('inc_msgr').style.display = 'none';
                signup_email_error = false;
                /*
                $("#signup_pass").attr("disabled",false);
                $("#signup_pass2").attr("disabled",false);
                $('input[name="signup_gender"]').attr("disabled",false);
                $('input[name="signup_age"]').attr("disabled",false);
                */
                $("#signup_pass").focus();
                showMessageError(errmsj, 'The email account is available.', 300, 'success', 'top');
                hideMessageError(errmsj, false, 300);
            } else {
                document.getElementById('inc_msgr').style.display = 'block';
                //document.getElementById('inc_msgr').innerHTML='The email account is already in use';
                showMessageError(errmsj, 'The email account is already in use', 300, 'error', 'top');
                hideMessageError(errmsj, false, 300);
                /*var notice = new PNotify({
                title: 'Myezplan Notice',
                text: 'The email account is already in use',
                styling: 'jqueryui',
                type: 'error',
                delay:1000,
                mouse_reset: false, buttons: {
                	closer: false,
                	sticker: false
                }
                });
                notice.get().click(function() {
                	notice.remove();
                });*/
                signup_email_error = true;
            }
            $("#input_td_loading").css("display", "none");
        }
    });
    //--------------
}

function acc_pri() {
    var chk = document.getElementById("check_reg"); //$("#check_reg").;
    if (chk.checked) {
        $("#divbr1").css("display", "none");
        $(".singbuttonUp").css("display", "block");

    } else {
        $("#divbr1").css("display", "block");
        $(".singbuttonUp").css("display", "none");
    }
}
signup_passcompare_error = false;

function verify_match() {
    var correo = $.trim($("#signup_pass").val());
    var correo2 = $.trim($("#signup_pass2").val());
    if (correo != '' && correo2 != '' && correo != correo2) {
        document.getElementById('inc_msgr').style.display = 'block';
        showMessageError($('#general-msg'), 'Password doesn\'t match', 300, 'error', 'top');
        signup_passcompare_error = true;
    } else {
        document.getElementById('general-msg').style.display = 'none';
        signup_passcompare_error = false;
    }
}

function send_lightbox_signin() {
    var _objusulo = $("#usuariologin");
    var _usulo = _objusulo.val();
    var _objpaslo = $("#passlogin");
    var _paslo = _objpaslo.val();
    var num_ = $("#light_box_cont_signin_num").val();
    var _orig = $("#signorigin").val();
    var _msg = $("#inc_msg");
    var _cid = getUrlParamValue("cid");
    _msg.hide();
    if (_usulo == '' || _paslo == '') {
        _msg.html('All information must be complete');
        _msg.show();
        if (_usulo == '') {
            _objusulo.focus();
            return;
        }
        if (_paslo == '') {
            _objpaslo.focus();
            return;
        }
    }
    var _isemail = validateEmail(_usulo);
    if (!_isemail) {
        _msg.html('Invalid Email. Please try again');
        _msg.show();
        _objusulo.focus().select();
        return false;
    }
    if (window.appmobile && window.appmobile == "yes") {
        var url = "https://myezplan.com/mobile/appdata/data_ajax/login_ajax.cfm";
    } else {
        var url = "mobile/appdata/data_ajax/login_ajax.cfm";
    }
    $.ajax({
        type: "POST",
        url: url,
        async: true,
        data: {
            usulo: _usulo,
            paslo: _paslo,
            orig: _orig,
            cid: _cid
        },
        success: function(datos) {
            var sessionLVars = datos.split(";");
            if (datos.indexOf('xnox') != -1) {
                _msg.html('Incorrect Email or Password. Please try again');
                _msg.show();
            } else {
                $.cookie("EZMAPCITYLOGINAFTER", 'LOGIN');
                //$.cookie("cf_sid",$.trim(datos) );
                sessionStorage.cf_sid = sessionLVars[0];
                sessionStorage.cf_ufname = sessionLVars[1];
                sessionStorage.cf_user = sessionLVars[2];
                sessionStorage.cf_uidclient = sessionLVars[3].replace(/\s+/g, '');
                //sessionStorage.cart 		 		= sessionLVars[4];
                sessionStorage.externalcart = JSON.stringify([{
                    placeid: "N"
                }]);
                sessionStorage.cartcoupons = JSON.stringify([]);
                sessionStorage.carttotals = JSON.stringify({});
                sessionStorage.carttotals_cart = 0;
                sessionStorage.carttotals_coupons = 0;
                sessionStorage.pricingid = sessionLVars[11].replace(/\s+/g, '');
                sessionStorage.clientplan = sessionLVars[12].replace(/\s+/g, '');
                pricingid = sessionStorage.pricingid;
                haveuser = 1;
                document.href = document.URL;
                /*var data = "cftags/headmenu.html ."+faqpage+" .sessionOn";
                $( "#menu" ).load( "cftags/headmenu.html ."+faqpage+" .sessionOn" );
                $( "#menu_panel .ui-panel-inner" ).load( "cftags/headmenu.html ."+faqpage+" .sessionOn" );
                setTimeout("$('#menu_panel').trigger('create')",1500);*/
                loadmenuItems();
                $('#light_box_cont_signin').hide();
                $('#light_box').hide();
                showMessageError($('#general-msg'), 'Login successful', 300, 'success', 'top');
                hideMessageError($('#general-msg'), false, 300);
                idleTime();
                /*var notice = new PNotify({
                	title: 'Myezplan Notice',
                	text: 'Login Successful',
                	styling: 'jqueryui',
                	type: 'success',
                	delay:1000,
                	mouse_reset: false, buttons: {
                		closer: false,
                		sticker: false
                	}
                });
                notice.get().click(function() {
                	notice.remove();
                });*/
                /*$(".ui-icon").hover(function(){
                	// Get the current title
                	var title = $(this).attr("title");
                	// Store it in a temporary attribute
                	$(this).attr("tmp_title", title);
                	// Set the title to nothing so we don't see the tooltips
                	$(this).attr("title","");					
                });*/
                //$("#menu_panel").trigger('create');
                //window.top.location.reload();
                if (num_ == 1) {
                    //cf_sid= $.trim(datos);
                    //cf_sidP = true;
                    if (cf_sidjs != "") {
                        eval(cf_sidjs);
                    }
                    if (typeof(signin_success) == "function") {
                        signin_success();
                    }
                }
                if (typepage && typepage == "external") {
                    window.location.reload();
                }
            }
        }
    });
}

function send_lightbox_signup_cl() {
    var signup_name = $.trim($("#signup_name").val());
    var signup_cname = $.trim($("#signup_cname").val());
    var signup_url = $.trim($("#signup_url").val());
    var signup_email = $.trim($("#signup_email").val());
    var signup_phone = $.trim($("#signup_phone").val());
    var signup_country = $.trim($("#signup_country").val());
    var signup_city = $.trim($("#signup_city").val());
    var signup_pass = $.trim($("#signup_pass").val());
    var signup_pass2 = $.trim($("#signup_pass2").val());
    var signup_captcha = $.trim($("#signup_captcha").val());
    var _isemail = validateEmail(signup_email);
    if (!_isemail) {
        document.getElementById('inc_msgr').style.display = 'block';
        document.getElementById('inc_msgr').innerHTML = 'Invalid Email. Please try again';
        $("#signup_email").focus().select();
        return false;
    }
    if (signup_email_error) {
        document.getElementById('inc_msgr').style.display = 'block';
        document.getElementById('inc_msgr').innerHTML = 'The email account is already in use';
        return false;
    }
    //alert(signup_passcompare_error);
    if (signup_passcompare_error) {
        document.getElementById('inc_msgr').style.display = 'block';
        document.getElementById('inc_msgr').innerHTML = 'Password doesn\'t match';
        return false;
    }
    if (signup_name == "" || signup_cname == "" || signup_country == "" || signup_city == "" || signup_email == "" || signup_pass == "" || signup_pass2 == "" || signup_captcha == "" || signup_phone == "") {
        document.getElementById('inc_msgr').style.display = 'block';
        document.getElementById('inc_msgr').innerHTML = 'All information must be complete';
        return false;
    }
    if (!(signup_rnd == signup_captcha)) {
        document.getElementById('inc_msgr').style.display = 'block';
        document.getElementById('inc_msgr').innerHTML = 'Verification code incorrect. Please try again';
        return false;
    }
    $("#formsignup").submit();
}

function send_lightbox_signup() {
    var signup_name = $.trim($("#signup_name").val());
    var signup_age = $.trim($("#signup_age").val());
    var signup_gender = $.trim($("#signup_gender").val());
    var signup_email = $.trim($("#signup_email").val());
    var signup_pass = $.trim($("#signup_pass").val());
    var signup_pass2 = $.trim($("#signup_pass2").val());
    var signup_captcha = $.trim($("#signup_captcha").val());
    var signup_country = $.trim($("#sel_usercountry").val());
    var _isemail = validateEmail(signup_email);
    var errmsj = $('#general-msg');
    if (signup_name == "" || signup_email == "" || signup_pass == "" || signup_pass2 == "" || signup_captcha == "") {
        document.getElementById('inc_msgr').style.display = 'block';
        showMessageError(errmsj, 'All information must be complete', 300, 'error', 'top');
        hideMessageError(errmsj, false, 300);
        return false;
    }
    if (!_isemail) {
        document.getElementById('inc_msgr').style.display = 'block';
        showMessageError(errmsj, 'Invalid Email. Please try again', 300, 'error', 'top');
        hideMessageError(errmsj, false, 300);
        $("#signup_email").focus().select();
        return false;
    }
    if (signup_country == '') {
        document.getElementById('inc_msgr').style.display = 'block';
        showMessageError(errmsj, 'Invalid Country. Please try again', 300, 'error', 'top');
        hideMessageError(errmsj, false, 300);
        $("#sel_usercountry").focus().select();
        return false;
    }
    document.getElementById('usercountry').value = signup_country;
    if (signup_email_error) {
        document.getElementById('inc_msgr').style.display = 'block';
        showMessageError(errmsj, 'The email account is already in use', 300, 'error', 'top');
        hideMessageError(errmsj, false, 300);
        return false;
    }
    //alert(signup_passcompare_error);
    if (signup_passcompare_error) {
        document.getElementById('inc_msgr').style.display = 'block';
        showMessageError(errmsj, 'Password doesn\'t match', 300, 'error', 'top');
        hideMessageError(errmsj, false, 300);
        return false;
    }
    if (!(signup_rnd == signup_captcha)) {
        document.getElementById('inc_msgr').style.display = 'block';
        showMessageError(errmsj, 'Verification code incorrect. Please try again', 300, 'error', 'top');
        hideMessageError(errmsj, false, 300);
        return false;
    }
    var _thisform = $('#formsignup');
    var _furl = _thisform.attr("action");
    event.preventDefault();
    event.stopPropagation();
    var _formdata = _thisform.serialize();
    $.ajax({
        type: "POST",
        url: _furl,
        async: true,
        cache: false,
        data: _formdata,
        error: function(xhr, ajaxOptions, thrownError) {

        },
        success: function(data) {
            _data = data.replace(/\s+/g, '');
            if (_data == "welcome") {
                showMessageError(errmsj, 'Welcome to myezplan, Now you can Sign in.', 300, 'success', 'top');
                hideMessageError(errmsj, false, 300);
                pedir_sesion();
            } else {
                showMessageError(errmsj, 'Error creating your user.', 300, 'error', 'top');
                hideMessageError(errmsj, false, 300);
                getCatpcha('siup-catpcha-img', 'signup_captchahash');
            }
        }
    });
    return false;
}

function send_lightbox_forgotpass() {
    aleat = Math.random() * 9999999999999999;
    var correo = $.trim($("#send_pass").val());
    document.getElementById('inc_msgf').innerHTML = '...';
    if (correo == "") {
        document.getElementById('inc_msgf').style.display = 'block';
        document.getElementById('inc_msgf').innerHTML = 'Invalid Email. Please try again';
        return false;
    }
    $.ajax({
        type: "POST",
        url: "https://myezplan.com/mobile/appdata/data_ajax/send_ajax_pass.cfm",
        async: true,
        data: "correo=" + correo + "&aleat=" + aleat,
        success: function(datos) {
            if (datos.indexOf("xnox") != -1) {
                document.getElementById('inc_msgf').style.display = 'block';
                document.getElementById('inc_msgf').innerHTML = 'E-mail not found. Please try again.';
            } else {
                document.getElementById('inc_msgf').style.display = 'block';
                document.getElementById('inc_msgf').innerHTML = 'Your password has been sent to<br /> your e-mail account.';
                //alert('Your password has been sent to your email.'); 
                window.setTimeout(function() {
                    document.getElementById('inc_msgf').style.display = "none";
                    document.getElementById('inc_msgf').innerHTML = "";
                    cerrar_login();
                    lightbox2();
                }, 4000);
            }
        }
    });
}

function cerrar_login() {
    /*document.getElementById('light_box').style.display='none';
    document.getElementById('light_box_cont_signup').style.display='none';
    document.getElementById('light_box_cont_forgot').style.display='none';
    document.getElementById('light_box_cont_signin').style.display='none';*/
    $("#menu_panel").panel("open");
}
$('#light_box_cont_signup #singbutton').click(function(event) {
    send_lightbox_signup();
});

function logOut() {
    if (window.appmobile && window.appmobile == "yes") {
        url = "https://myezplan.com/mobile/appdata/data_ajax/log_out.cfm";
    } else {
        url = "mobile/appdata/data_ajax/log_out.cfm";
    }
    $.ajax({
        type: "GET",
        url: url,
        async: true,
        cache: false,
        success: function(data) {
            window.returnpage = "page1";
            sessionStorage.clear();
            if (!typepage || typepage != "external") {
                returnHome();
            }
            sessionStorage.cart = JSON.stringify([{
                placeid: "N"
            }]);
            sessionStorage.externalcart = JSON.stringify([{
                placeid: "N"
            }]);
            $("#business").empty();
            $("#menu-business .ui-panel-inner").empty();
            $("#menu_panel").panel("close");
            showMessageError($('#general-msg'), 'Sign out successful', 300, 'success', 'top');
            hideMessageError($('#general-msg'), false, 300);
            /*var notice = new PNotify({
                title: 'Myezplan Notice'
                , text: 'Sign out successful'
                , styling: 'jqueryui'
                , type: 'error'
                , delay: 1000
                , mouse_reset: false
                , buttons: {
                    closer: false
                    , sticker: false
                }
            });
            notice.get().click(function() {
                notice.remove();
            });*/
            loadmenuItems();
            if (typepage && typepage == "external") {
                window.location.reload();
            }
        }
    });
}
