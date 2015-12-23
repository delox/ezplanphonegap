// JavaScript Document
$(window).ready(function(e) {
	//myezAlert.render("Menu busi2");
	/* Click editprofile */
	//$("#menucl-settings").click(function(event){
	$("#menu-business").off("click","#menucl-settings");
	$("#menu-business").on("click","#menucl-settings",function(e){
		//console.log("settings")
		faqpage = 'cl_settings';
		pageheadercityname.innerHTML = "<span class='capitalize_red'>M</span>y Settings";
		if (window.appmobile && window.appmobile == "yes") {
			var _url = "https://myezplan.com/data_ajax/clsettings.cfm?rnu=1354684656";
		}else{
			var _url = "data_ajax/clsettings.cfm?rnu=1354684656";
		}
		var _urlconfig = {action:"ShowSettings",upuserid:sessionStorage.cf_sid};
		$.post(_url,_urlconfig)
			//.error(myezplan.utils.ajaxError)
			.success(function(response, status, xhr){
				$('#cl_content').html(response);
				$("#menu-business").panel("close");
				//Saveclient();
			});
		return false;		
	});	
	$("#menu-business").off("click","#menucl-profile");
	$("#menu-business").on("click","#menucl-profile",function(e){
		faqpage = 'cl_settings';
		pageheadercityname.innerHTML = "<span class='capitalize_red'>M</span>y Account";
		if (window.appmobile && window.appmobile == "yes") {
			var _url = "https://myezplan.com/data_ajax/clsettings.cfm?rnu=1354684656";
		}else{
			var _url = "data_ajax/clsettings.cfm?rnu=1354684656";
		}
		var _urlconfig = {action:"profile",upuserid:sessionStorage.cf_sid};
		$.post(_url,_urlconfig)
			//.error(myezplan.utils.ajaxError)
			.success(function(response, status, xhr){
				$('#cl_content').html(response);
				$("#menu-business").panel("close");
			});
		return false;		
	});
	//$("#menucl-promotions").click(function(event){
	$("#menu-business").off("click","#menucl-promotions");
	$("#menu-business").on("click","#menucl-promotions",function(e){
		faqpage = 'cl_promotions';
		pageheadercityname.innerHTML = "<span class='capitalize_red'>M</span>y Promotions";
		var url = "data_ajax/clpromotions.cfm?rnu=1354684656";
		var urlconfig = {action:"UserPromotions",upuserid:sessionStorage.cf_sid};
		$('#cl_content').load(url,urlconfig,function (response, status, xhr){
			switch (status){case "error":$('#cl_content').empty();break;}
			$("#menu-business").panel("close");			
		});
	});
	$("#menu-business").off("click","#menucl-sales");
	$("#menu-business").on("click","#menucl-sales",function(e){
		faqpage = 'cl_sales';
		pageheadercityname.innerHTML = "<span class='capitalize_red'>M</span>y Sales";
		var _url = "cl_salesrecords.html";
		$('#cl_content').load(_url);
		$("#menu-business").panel("close");
		return false;		
	});
	$("#menucl-changepassword").click(function(event){
		var popup = $("#changepassword-box");
		$(popup).fadeIn(300);
		var popMargTop = ($(popup).height() + 24) / 2; 
		var popMargLeft = ($(popup).width() + 24) / 2; 
		$(popup).css({'margin-left':-popMargLeft});
		$('body').append('<div id="mask" class="mask"></div>');
		$('#mask').fadeIn(300);
		return false;
	});
	$("#menu-business").off("click","#menucl-upgrades");
	$("#menu-business").on("click","#menucl-upgrades",function(e){
		$("#openphp").css("maxWidth","initial");
		Openphp('shop.html',sessionStorage.cf_sid,sessionStorage.cf_uidclient);
	});
	/* close click FAQ */
	$('#changepassword-box a.close').click( function() { 
		closePopup();
		return false;
	});
	var _formUser = $("#changepassword-box form");
	var _messagechangepassword = $("#messageerror-changepassword");
	validatePasswordFormCompare=function(event){
		emptyMessageError(_messagechangepassword);
		var _objfield1 = _formUser.find("#user_passwordnew");
		var _objfield2 = _formUser.find("#user_passwordretype");
		var _thisform = $(_objfield2).closest('form');
		$(_objfield1).removeClass("required-bg1");
		$(_objfield2).removeClass("required-bg1");
		var _val1 = $.trim($(_objfield1).val());
		var _val2 = $.trim($(_objfield2).val());
		var _message = "password doesn't match. Please try again";
		
		var _isvalid = ((_val1 == _val2) );
		if(!_isvalid){
			$(_objfield1).addClass("required-bg1");
			$(_objfield2).addClass("required-bg1");
			showMessageError(_messagechangepassword,_message,300);
			hideMessageError(_messagechangepassword,false,300);
			_thisform.data("errormessage",_message);
			return false;
		}
		_thisform.data("errormessage","");
		return true;
	}
	validateRequiredForm=function(event){
		var _objfield = $(this);
		var _thisform = _objfield.closest('form');
		_objfield.removeClass("required-bg1");
		if($.trim(_objfield.val()) == ""){
			_objfield.addClass("required-bg1");
			_thisform.data("errormessage","The field is required");
			return false;
		}
		_thisform.data("errormessage","");
		return true;
	}
	_formUser.find("#user_passwordnew").blur(validatePasswordFormCompare);
	_formUser.find("#user_passwordretype").blur(validatePasswordFormCompare);
	_formUser.find("#user_passwordnew").blur(validateRequiredForm);
	_formUser.find("#user_passwordretype").blur(validateRequiredForm);
	$('#changepassword-box #user_submit').click(function(e) { 
		e.stopPropagation();e.preventDefault();
		var _thisform = $(this).closest('form');
		var _thisformerrors = _thisform.data("errormessage");
		emptyMessageError(_messagechangepassword);
		event.preventDefault();
		event.stopPropagation();
		if(_thisformerrors.length>0){ 
			showMessageError(_messagechangepassword,_thisformerrors,300);
			return false;
		}
		$.ajax({
			type: "GET",
			url: "https://customer.myezplan.com/cfc/usersign.cfc?method=changepassword_jsonp,",
			dataType:'jsonp',
			data:_formUser.serialize(),
			async:false,
			error: function(xhr, ajaxOptions, thrownError){
				showMessageError(_messagechangepassword,thrownError,300);
				hideMessageError(_messagechangepassword,false,300);
			},
			success: function(datos){
				showMessageError(_messagechangepassword,datos,300);
				hideMessageError(_messagechangepassword,true,300);
			}
		});
	});
});
$(window).ready(function(e) {
	//$("#form-validatevoucher-submit").click(function(e) {
	$("#business").off("click","#form-validatevoucher-submit");
	$("#business").on("click","#form-validatevoucher-submit",function(e){
		e.preventDefault();
		validateVoucher();
	});
	validateVoucher=function(){
		var _message = $("#messageerror-validatevoucher");
		_message.hide();
		var _objcid = $("#cid");
		var _objvid = $("#vid");
		var _objvn = $("#vn");
		var _cid = _objcid.val();
		var _vid = _objvid.val();
		var _vn = _objvn.val();
		if(_vn == ""){
			return;
		}
		var _vnurl = getUrlParamValue("vn");
		if(_vnurl!=_vn){_vid="";}
		$("#body-content").empty();
		var _data = {action:"validatevoucher",cid:_cid,vid:_vid,vn:_vn,upuserid:sessionStorage.cf_sid,uidclient:sessionStorage.cf_uidclient};
		if (window.appmobile && window.appmobile == "yes") {
			var vurl = "https://myezplan.com/data_ajax/clredeemvoucher_ajax.cfm?"+randomNumberUrl();
		}else{
			var vurl = "data_ajax/clredeemvoucher_ajax.cfm?"+randomNumberUrl();
		}
		$.ajax({
			type: "POST",
			url: vurl,
			async:true, 
			cache:false,
			data: _data,
			error: function(xhr, ajaxOptions, thrownError){
				showMessageError(_message,thrownError,300);
			},
			success: function(response){
				var _arrresponse = response.split("|");
				var _result = _arrresponse[0];
				var _resultstr = _arrresponse[1];
				if(_result==0){
					showMessageError(_message,_resultstr,300);
					return;
				}
				getVoucherInfo();
			}
		});
	}
	getVoucherInfo=function(){
		var _message = $("#messageerror-validatevoucher");
		_message.hide();
		var _objcid = $("#cid");
		var _objvid = $("#vid");
		var _objvn = $("#vn");
		var _cid = _objcid.val();
		var _vid = _objvid.val();
		var _vn = _objvn.val();
		if(_vn == ""){
			return;
		}

		var popup = $("#body-content");
		popup.panel();
		popup.show();
		popup.panel("open");
		var popMargTop = ($(popup).height() + 24) / 2; 
		var popMargLeft = ($(popup).width() + 24) / 2; 
		$(popup).css({ 
			//'margin-left' : popMargLeft
		});

		//$("#body-content").show();
		$("#body-content").showLoading("Loading Voucher ...",true);
		var _vnurl = getUrlParamValue("vn");
		if(_vnurl!=_vn){_vid="";}
		var _url="https://myezplan.com/mobile/appdata/data_ajax/clredeemvoucher_ajax.cfm?"+randomNumberUrl();
		var _data = {action:"getvoucherinfo",cid:_cid,vid:_vid,vn:_vn,upuserid:sessionStorage.cf_sid,uidclient:sessionStorage.cf_uidclient};
		$("#body-content").load(_url,_data,function(response, status, xhr){});
	}
	
	$(document).on("click","#redeemyes",function(e){
		var _message = $("#messageerror-redeemvoucher");
		var _objvid = $("#vid");
		var _objvn = $("#vn");
		var _vid = _objvid.val();
		var _vn = _objvn.val();
		if(_vn == ""){
			return;
		}
		var _data = {action:"redeemvoucher",vid:_vid,vn:_vn,upuserid:sessionStorage.cf_sid,uidclient:sessionStorage.cf_uidclient};
		$.ajax({
			type: "POST",
			url:"https://myezplan.com/mobile/appdata/data_ajax/clredeemvoucher_ajax.cfm?"+randomNumberUrl(),
			async:true, 
			cache:false,
			data: _data,
			error: function(xhr, ajaxOptions, thrownError){
				showMessageError(_message,thrownError,300);
			},
			success: function(response){
				showMessageError(_message,response,300);
				hideMessageError(_message,true,200);
			}
		});
	})
	$(document).on("click","#redeemno",function(e){
		var _message = $("#messageerror-redeemvoucher");
		showMessageError(_message,"The Voucher has not been redeemed",300);
		hideMessageError(_message,false,200);
		$(".ui-panel").panel("close");
	})
	closePopup=function(){
		if( getUrlParamValue("vn")!="" || getUrlParamValue("ce")!="" || getUrlParamValue("ce")!="" ){
			var t=window.setTimeout(function(){window.location.replace(_documenturlbase);},600)
		}else{
			$("#body-content").toggle();
			$("#body-content").empty();
			$("#vn").val("");
			$("#vn").focus();
		}
	}
	$("#vn").focus();
	window.setTimeout(validateVoucher,100);
	addsuprtext = function (tagid, div){
		console.log("addsuprtext"+tagid);
		var tips=document.getElementById(div).value;				
		var opt = document.getElementById(tagid);
		var _text = $("#"+tagid).attr("data-text");		
		if(($("#"+tagid).hasClass("tip-active"))){
			console.log(tips);
			var tips=tips.replace(_text,'');
			document.getElementById(div).value=tips;
			opt.style.backgroundColor="#f8f8f8";
			opt.style.color="#000";	
			$("#"+tagid).removeClass("tip-active");	
			console.log(tips);			
		}else{
			var tips=tips+" "+_text;
			document.getElementById(div).value=tips;
			opt.style.backgroundColor="#17375e";
			opt.style.color="#fff";
			$("#"+tagid).addClass("tip-active");
		}
	}
	
});
