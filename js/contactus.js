// JavaScript Document
$(document).ready(function() {
	/* Click boton send By E-Mail */
	$(document).off('click', 'a.send-imgbyemail, a.send-abyemail');
	$(document).on("click", "a.send-imgbyemail, a.send-abyemail", function(e){	
	//$('a.send-imgbyemail, a.send-abyemail').click(function() {
		var popup = $("#send-box");
		if(!sessionStorage.cf_sid){
			get_catpcha();
		}else{
			$(".cachainfo").hide();
			$("#byemail_captcha").val(1);
			$("#byemail_captchahash").val(1);						
		}
		$(popup).fadeIn(0);

		var popMargTop = ($(popup).height() + 24) / 2; 
		var popMargLeft = ($(popup).width() + 24) / 2; 
		var byemail_name = $("#byemail_name");

		$(popup).css({ 
			//'margin-top' : -popMargTop,
			//'margin-left' : -popMargLeft
		});
		
		//$('body').append('<div id="mask" class="mask"></div>');
		//$('#mask').fadeIn(300);
		$(byemail_name).focus();
		
		return false;
	});
	/* Click Close button */
	$(document).off('click', '#send-box a.close');
	$(document).on("click", "#send-box a.close", function(e){	
	//$('#send-box a.close').click( function() { 
		var popup = $("#send-box");
		popup.hide();
		return false;
	});
	/* Click Submit button */
	$(document).off('click', '#send-box #byemail_submit');
	$(document).on("click", "#send-box #byemail_submit", function(e){	
	//$('#send-box a#byemail_submit').click( function() { 
		//alert("sending information");
		var aleat = Math.random() * 9999999999999999;
		var _message = $("#messagecont");
		var byemail_name = $.trim($("#byemail_name").val());
		var byemail_email = $.trim($("#byemail_email").val());
		var byemail_subject = $.trim($("#byemail_subject").val());
		var byemail_message = $.trim($("#byemail_message").val());
		var byemail_captcha = $.trim($("#byemail_captcha").val());
		var byemail_captchahash = $.trim($("#byemail_captchahash").val());

		event.preventDefault();
		emptyMessageError(_message);

		if(byemail_name=="" || byemail_email=="" || byemail_subject=="" ||  byemail_message=="" ||  byemail_message==""){
			showMessageError(_message,"All information must be complete.<br />Please try again",300,'error');
			hideMessageError(_message,false,300);
			return false;
		}
		if(!validateEmail(byemail_email))
		{
			showMessageError(_message,"Email not valid. Please try again",300,'error');
			hideMessageError(_message,false,300);
			return false;
		}
		
		//return false;
		if(window.appmobile && window.appmobile == "yes"){
			var url = "https://myezplan.com/mobile/appdata/data_ajax/contactus_sendbyemail.cfm";
		}else{
			var url = "mobile/appdata/data_ajax/contactus_sendbyemail.cfm";
		}
		$.ajax({
			type: "POST",
			url: url,
			async:false,
			data: "aleat="+aleat+"&byemailname="+byemail_name+"&byemailemail="+byemail_email
			+"&byemailsubject="+byemail_subject+"&byemailmessage="+byemail_message
			+"&byemailcaptcha="+byemail_captcha+"&byemailcaptchahash="+byemail_captchahash,
			error: function(xhr, ajaxOptions, thrownError){
				showMessageError(_message,thrownError,300,'error');
				hideMessageError(_message,false,300);
			},
			success: function(datos){
				var msj = datos.split(',');
				if(msj[0] == 'CodeError'){
					showMessageError(_message,msj[1],300,'error');
				}else{
					showMessageError(_message,msj[1],300,'success');
				}
				hideMessageError(_message,false,300);
			}
		});
		return false;
	});
});
