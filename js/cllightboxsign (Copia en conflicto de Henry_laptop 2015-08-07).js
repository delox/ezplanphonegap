// JavaScript Document
cf_sidP = false; /*<!--- Pending Refresh for javascript --->*/
function lightbox(){
	document.getElementById('light_box').style.display='block';
	document.getElementById('light_box_cont').style.display='block';
}
function lightbox2(num){
	//document.getElementById('light_box').style.display='block';
	$( "#light_box_cont_signin" ).panel();
	document.getElementById('light_box_cont_signin').style.display='block';
	document.getElementById('light_box_cont_signin_num').value=num;
	document.getElementById('usuariologin').focus();
	$( "#light_box_cont_signin" ).panel("open");
	
}
function lightboxr(num){
	var _panel =$("#light_box_cont_signup");
	_panel.panel();
	_panel.show();
	_panel.panel("open");
	//document.getElementById('light_box').style.display='block';
	document.getElementById('light_box_cont_signup').style.display='block';
	document.getElementById('light_box_cont_signup_num').value=num;
	$("#signup_email").val('');
	//getCatpcha('siup-catpcha-img','signup_captchahash');
}
function lightboxf(){
	var _panel =$("#light_box_cont_forgot");
	_panel.panel();
	_panel.show();
	_panel.panel("open");
	//document.getElementById('light_box').style.display='block';
	document.getElementById('light_box_cont_forgot').style.display='block';
}
function pedir_sesion(num,jsaction){
	cf_sidjs=jsaction;
	lightbox2(num);
}
signup_email_error=false;
function verify_email(){
	aleat = Math.random() * 9999999999999999;
	var correo = $("#signup_email").val();
	/*
	$("#signup_pass").attr("disabled",true);
	$("#signup_pass2").attr("disabled",true);
	$('input[name="signup_gender"]').attr("disabled",true);
	$('input[name="signup_age"]').attr("disabled",true);
	*/
	var _isemail = validateEmail(correo);
	if(!_isemail){
		document.getElementById('inc_msgr').style.display='block';
		document.getElementById('inc_msgr').innerHTML='Invalid Email. Please try again';
		/*$("#signup_email").focus().select();*/
		return false;
	}
	$("#input_td_loading").css("display","block");
	//--------------
	$.ajax({
		type: "POST",
		url: "data_ajax/verify_email.cfm",
		async:true, 
		data: "correo="+correo+"&aleat="+aleat,
		success: function(datos){
			  if(datos.indexOf("xnox")!=-1)
			  {
					document.getElementById('inc_msgr').style.display='none';
					signup_email_error=false;
					/*
					$("#signup_pass").attr("disabled",false);
					$("#signup_pass2").attr("disabled",false);
					$('input[name="signup_gender"]').attr("disabled",false);
					$('input[name="signup_age"]').attr("disabled",false);
					*/
					//$("#signup_pass").focus();
					$("#signup_phone").focus();					
			  }else{
					document.getElementById('inc_msgr').style.display='block';
					//document.getElementById('inc_msgr').innerHTML='The email account is already in use';
					var notice = new PNotify({
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
					});		
					signup_email_error=true;
			  }
			$("#input_td_loading").css("display","none");
		}
	});
	//--------------
}
function acc_pri(){
	var chk = document.getElementById("check_reg"); //$("#check_reg").;
	if(chk.checked){
		$("#divbr1").css("display","none");
		$(".singbuttonUp").css("display","block");
		
	}else{
		$("#divbr1").css("display","block");
		$(".singbuttonUp").css("display","none");
	}
}	
signup_passcompare_error=false;
function verify_match(){
	var correo = $.trim($("#signup_pass").val());
	var correo2 = $.trim($("#signup_pass2").val());
	if(correo != '' && correo2 != '' && correo != correo2)
	{
		document.getElementById('inc_msgr').style.display='block';
		document.getElementById('inc_msgr').innerHTML='Password doesn\'t match';
		signup_passcompare_error=true;
	}else{
		document.getElementById('inc_msgr').style.display='none';
		signup_passcompare_error=false;
	}
}
function send_lightbox_signin(){
	var _objusulo = $("#usuariologin");
	var _usulo = _objusulo.val();
	var _objpaslo = $("#passlogin");
	var _paslo = _objpaslo.val();
	var num_ = $("#light_box_cont_signin_num").val();
	var _orig = $("#signorigin").val();
	var _msg = $("#inc_msg");
	var _cid = getUrlParamValue("cid");
	_msg.hide();

	if(_usulo=='' || _paslo==''){
		_msg.html('All information must be complete');
		_msg.show();
		if(_usulo==''){
			_objusulo.focus(); return;
		}
		if(_paslo==''){_objpaslo.focus(); return;}
	}
	var _isemail = validateEmail(_usulo);
	if(!_isemail){
		_msg.html('Invalid Email. Please try again');
		_msg.show();
		_objusulo.focus().select();
		return false;
	}

	$.ajax({
	type: "POST",
	url: "https://myezplan.com/mobile/appdata/data_ajax/login_ajax.cfm",
	cache:false,
	async:false, 
	data: {usulo:_usulo,paslo:_paslo,orig:_orig,cid:_cid},
	success: function(datos)
		{
			if(datos.indexOf('xnox')!=-1)
			{
				_msg.html('Incorrect Email or Password. Please try again');
				_msg.show();
			} 
			else
			{ 
				$('#light_box_cont_signin').hide();
				$('#light_box').hide();
				if(num_==1){
					cf_sid= $.trim(datos);
					cf_sidP = true;
					if(cf_sidjs!=""){
						eval(cf_sidjs);
					}
					if(typeof(signin_success)=="function"){
						signin_success();
					}
				}else{
					$.cookie("EZMAPCITYLOGINAFTER", 'LOGIN');
					document.href = document.URL;
					window.top.location.reload();
					console.log("log");
				}
			}
		}
	});
}
function send_lightbox_signup_cl(){
	var signup_name = $.trim($("#signup_name").val());
	var signup_cname= $.trim($("#signup_cname").val());
	var signup_url= $.trim($("#signup_url").val());
	var signup_email = $.trim($("#signup_email").val());
	var signup_phone = $.trim($("#signup_phone").val());
	var signup_country=$.trim($("#signup_country").val());
	var signup_city=$.trim($("#signup_city").val());
	var signup_pass = $.trim($("#signup_pass").val());
	var signup_pass2 = $.trim($("#signup_pass2").val());
	var signup_captcha = $.trim($("#signup_captcha").val());
	var _isemail = validateEmail(signup_email);
	var errmsj = $("#inc_msgr");
	if(!_isemail){
		document.getElementById('inc_msgr').style.display='block';
		showMessageError(errmsj,'Invalid Email. Please try again',300,'error','top');
		$("#signup_email").focus().select();
		hideMessageError(errmsj,false,300);
		return false;
	}
	if(signup_email_error){
		document.getElementById('inc_msgr').style.display='block';
		showMessageError(errmsj,'The email account is already in use',300,'error','top');
		hideMessageError(errmsj,false,300);
		return false;
	}
	//alert(signup_passcompare_error);
	if(signup_passcompare_error){
		document.getElementById('inc_msgr').style.display='block';
		document.getElementById('inc_msgr').innerHTML='Password doesn\'t match';
		return false;
	}
	if(signup_name=="" || signup_cname=="" || signup_country=="" || signup_city=="" ||signup_email=="" || signup_pass=="" ||  signup_pass2=="" || signup_captcha=="" || signup_phone==""){
		document.getElementById('inc_msgr').style.display='block';
		document.getElementById('inc_msgr').innerHTML='All information must be complete';
		showMessageError(errmsj,'All information must be complete',300,'error','top');
		hideMessageError(errmsj,false,300);
		return false;
	}
	if(!(signup_rnd == signup_captcha)){
		document.getElementById('inc_msgr').style.display='block';
		document.getElementById('inc_msgr').innerHTML='Verification code incorrect. Please try again';
		return false;
	}
	//$("#formsignup").submit();
	var _thisform = $("#light_box_cont_signup form");
	var _furl = _thisform.attr("action");
	event.preventDefault();
	event.stopPropagation();
	var _formdata = _thisform.serialize();
	$.ajax({
		type: "POST",
		url: _furl,
		async:true,
		cache:false,
		data: _formdata,
		error: function(xhr, ajaxOptions, thrownError){

		},
		success: function(data){
			_data = data.replace(/\s+/g, '');
			if(_data == "welcome"){
				/*var notice = new PNotify({
					title: 'Myezplan Notice',
					text: 'Welcome to myezplan.',
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
				window.location.reload();
			}else{
			
			}
				
		}
	});
	return false;
}

function send_lightbox_signup(){
	//alert("sending ...");
	var signup_name = $.trim($("#signup_name").val());
	var signup_age = $.trim($("#signup_age").val());
	var signup_gender = $.trim($("#signup_gender").val());
	var signup_email = $.trim($("#signup_email").val());
	var signup_pass = $.trim($("#signup_pass").val());
	var signup_pass2 = $.trim($("#signup_pass2").val());
	var signup_captcha = $.trim($("#signup_captcha").val());
	var _isemail = validateEmail(signup_email);
	if(!_isemail){
		document.getElementById('inc_msgr').style.display='block';
		document.getElementById('inc_msgr').innerHTML='Invalid Email. Please try again';
		$("#signup_email").focus().select();
		return false;
	}
	if(signup_email_error){
		document.getElementById('inc_msgr').style.display='block';
		document.getElementById('inc_msgr').innerHTML='The email account is already in use';
		return false;
	}
	//alert(signup_passcompare_error);
	if(signup_passcompare_error){
		document.getElementById('inc_msgr').style.display='block';
		document.getElementById('inc_msgr').innerHTML='Password doesn\'t match';
		return false;
	}
	if(signup_name=="" || signup_email=="" || signup_pass=="" ||  signup_pass2=="" || signup_captcha==""){
		document.getElementById('inc_msgr').style.display='block';
		document.getElementById('inc_msgr').innerHTML='All information must be complete';
		return false;
	}
	if(!(signup_rnd == signup_captcha)){
		document.getElementById('inc_msgr').style.display='block';
		document.getElementById('inc_msgr').innerHTML='Verification code incorrect. Please try again';
		return false;
	}
	$("#light_box_cont_signup #formsignup").submit();
}
function send_lightbox_forgotpass(){
	aleat = Math.random() * 9999999999999999;
	var correo = $.trim( $("#send_pass").val() );
	document.getElementById('inc_msgf').innerHTML='...';
	if(correo == ""){
		document.getElementById('inc_msgf').style.display='block';
		document.getElementById('inc_msgf').innerHTML='Invalid Email. Please try again';
		return false;
	}
	$.ajax({
		type: "POST",
		url: "data_ajax/send_ajax_pass.cfm",
		async:false, 
		data: "correo="+correo+"&aleat="+aleat,
		success: function(datos){
			  if(datos.indexOf("xnox")!=-1)
			  {
					document.getElementById('inc_msgf').style.display='block';
					document.getElementById('inc_msgf').innerHTML='E-mail not found. Please try again.';
			  }else{
					document.getElementById('inc_msgf').style.display='block';
					document.getElementById('inc_msgf').innerHTML='Your password has been sent to<br /> your e-mail account.';
				//alert('Your password has been sent to your email.'); 
					window.setTimeout(function(){
						document.getElementById('inc_msgf').style.display="none";
						document.getElementById('inc_msgf').innerHTML="";
						cerrar_login();
						lightbox2();
					},4000);
			  }
		}
	});
}
function cerrar_login(){
	document.getElementById('light_box').style.display='none';
	document.getElementById('light_box_cont_signup').style.display='none';
	document.getElementById('light_box_cont_forgot').style.display='none';
	document.getElementById('light_box_cont_signin').style.display='none';
}
/*$('#light_box_cont_signup #singbutton').click(function(event) { 
	var _thisform = $(this).closest('form');
	var _furl = _thisform.attr("action");
	event.preventDefault();
	event.stopPropagation();
	var _formdata = _thisform.serialize();
	$.ajax({
		type: "POST",
		url: _furl,
		async:true,
		cache:false,
		data: _formdata,
		error: function(xhr, ajaxOptions, thrownError){

		},
		success: function(datos){

		}
	});
	return false;
});*/
function logOut_gen(){
	$.ajax({
		type: "GET",
		url: "data_ajax/log_out.cfm",
		async:true, 
		cache:false,
		success: function(data){
			window.location.reload();
		}
	});
}
$(document).ready( function(){
	$('#light_box_cont_signup #singbutton').click(function(event) {
		var signup_name = $.trim($("#signup_name").val());
		var signup_age = $.trim($("#signup_age").val());
		var signup_gender = $.trim($("#signup_gender").val());
		var signup_email = $.trim($("#signup_email").val());
		var signup_pass = $.trim($("#signup_pass").val());
		var signup_pass2 = $.trim($("#signup_pass2").val());
		var signup_captcha = $.trim($("#signup_captcha").val());
		var _isemail = validateEmail(signup_email);
		if(!_isemail){
			document.getElementById('inc_msgr').style.display='block';
			document.getElementById('inc_msgr').innerHTML='Invalid Email. Please try again';
			$("#signup_email").focus().select();
			return false;
		}
		if(signup_email_error){
			document.getElementById('inc_msgr').style.display='block';
			document.getElementById('inc_msgr').innerHTML='The email account is already in use';
			return false;
		}
		//alert(signup_passcompare_error);
		if(signup_passcompare_error){
			document.getElementById('inc_msgr').style.display='block';
			document.getElementById('inc_msgr').innerHTML='Password doesn\'t match';
			$("#signup_pass").focus().select();
			return false;
		}
		if(signup_name=="" ||signup_email=="" || signup_pass=="" ||  signup_pass2=="" || signup_captcha==""){
			document.getElementById('inc_msgr').style.display='block';
			document.getElementById('inc_msgr').innerHTML='All information must be complete';			
			return false;
		}
		if(!(signup_rnd == signup_captcha)){
			document.getElementById('inc_msgr').style.display='block';
			document.getElementById('inc_msgr').innerHTML='Verification code incorrect. Please try again';
			$("#signup_captcha").focus().select();
			return false;
		}
		var _thisform = $(this).closest('form');
		var _furl = _thisform.attr("action");
		event.preventDefault();
		event.stopPropagation();
		var _formdata = _thisform.serialize();
		$.ajax({
			type: "POST",
			url: _furl,
			async:true,
			cache:false,
			data: _formdata,
			error: function(xhr, ajaxOptions, thrownError){

			},
			success: function(data){
				_data = data.replace(/\s+/g, '');
				if(_data == "welcome"){
					window.location.reload();				
				}else{
				
				}			
			}
		});
		return false;
	});
});