// JavaScript Document
function reloadpage() {
	location.reload();
}
function markviatorredeemed(dpdu_id) {
	var _url = "https://myezplan.com/mobile/appdata/data_ajax/myaccount_user_ajax.cfm";
	var _urlconfig = {
		action : "markviatorredeemed",
		id : dpdu_id
	};
	//		$("#MyPurchasedDeals").load(_url,_urlconfig,
	//		function (response, status, xhr){
	//			switch (status){
	//				case "error":
	//					$("#MyPurchasedDeals").empty();
	//					console.log("error getting data: " + xhr.statusText);
	//					break;
	//			}
	//		});
	$.ajax({
		type : "POST",
		url : "https://myezplan.com/mobile/appdata/data_ajax/myaccount_user_ajax.cfm",
		async : false,
		cache : false,
		data : "action=markviatorredeemed&id=" + dpdu_id,
		error : function (xhr, ajaxOptions, thrownError) {
			alert('it was a problem redeeming your voucher, please try again');
		},
		success : function (datos) {
			if (datos == 'Voucher redeemed') {
				location.reload(true);
			}
		}
	});
}
function showHideTab2(tabid, action, button) {
	if (tabid == 'MyPurchasedDeals') {
		//showHideTab('mysaves', 'hide','mySplansimg');
		showHideTab('OtherOptions', 'hide', 'myOoptionsimg');
	}
	if (tabid == 'mysaves') {
		showHideTab('MyPurchasedDeals', 'hide', 'myPurchDeimg');
		showHideTab('OtherOptions', 'hide', 'myOoptionsimg');
	}
	if (tabid == 'OtherOptions') {
		showHideTab('MyPurchasedDeals', 'hide', 'myPurchDeimg');
		//showHideTab('mysaves','hide','mySplansimg');
	}
	var _tab = $("#" + tabid);
	var _icon = _tab.parent().find("a:first");
	var _tabhidden = ($("#" + tabid + ":hidden").length > 0);
	var _action = action;

	if (!(_action == "show" || _action == "hide")) {
		if (_tabhidden) {
			_action = "show";
		} else {
			_action = "hide";
		}
	}
	if (_action == "hide") {
		showHideTab(tabid, _action, button);
		//_icon.css("background-image","url('https://lh6.googleusercontent.com/-44bFjug7xpE/U5I5oAOzU_I/AAAAAAANfHI/a1ItxGAYBN0/s50/Untitled35.png')","heigth('35px')");
		return;
	}
	//_icon.css("background-image","url('https://lh6.googleusercontent.com/-ZQfQ41ScQuk/U5I5oMgzbnI/AAAAAAANfHE/ur_4Fpn-eT0/s51/Untitled39.png')");
	showHideTab(tabid, _action, button);
	//_tab.scrollToMe();
}
$(document).ready(function (e) {
	faqpage = 'myaccount';
	//showHideTab2('MyPurchasedDeals', 'hide');
	//showHideTab2('mysaves', 'hide');
	//showHideTab2('OtherOptions', 'hide');
	//showHideTab('OtherOptions','hide');
	if (getUrlHash()) {
		var _hash = getUrlHash();
		showHideTab(_hash, 'show');
	}
	/* Click editprofile */
	$("#button-editprofile").click(function (event) {
		var popup = $("#editprofile-box");
		//$(popup).fadeIn(300);
		$(popup).panel();
		$(popup).show();
		$(popup).panel("open");

		var popMargTop = ($(popup).height() + 24) / 2;
		var popMargLeft = ($(popup).width() + 24) / 2;

		$(popup).css({
			//'margin-top' : -popMargTop,
			//'margin-left' : -popMargLeft
		});
		var T = $(window).height() / 3 - 100 / 1 + $(window).scrollTop();
		/*var	L = $(window).width() / 2 - popup.width() / 2;*/
		popup.css({
			//top: T,

		})
		//$('body').append('<div id="mask" class="mask"></div>');
		//$('#mask').fadeIn(300);

		return false;
	});
	/* Click Close button editprofile-box */
	$('#editprofile-box a.close').click(function (event) {
		//openshowAccount();
		var welcome = document.getElementById("box-welcome");
		welcome.innerHTML = ("Welcome " + sessionStorage.cf_ufname);
		$("#myaccount_panel").panel('open');
		return false;
	});
	$(".MyPurchasedDeals-tabs").tabs({
		collapsible : false
	});
	$(document).on("click", "#tipplan-box #tipplan_submit", function (e) {
		e.preventDefault();
		e.stopPropagation();
		var _popup = $("#tipplan-box");
		var _up_id = _popup.find("#tipplan_id").val();
		var _up_description = _popup.find("#tipplan_description").val();
		var _messageObj = _popup.find("#message-tipplan");
		if (!_up_id) {
			showMessageError(_messageObj, "No ID!", 300);
			hideMessageError(_messageObj, false, 300);
			return;
		}
		myPlanTipUpdate(_up_id, _up_description, _messageObj)
	});
	$(document).on("click", "#buttonTipPlan", function (e) {
		e.preventDefault();
		e.stopPropagation();
		myPlanTipShow($(this));
	});
	$(document).on("click", "#tipplan-box a.close", function () {
		closePopup();
		return false;
	});
});
/* ----------------------------------------- */

/* ----------------------------------------- */

$(document).ready(function (e) {
	var _formUser = $("#editprofile-box form");
	var _messagepassword = $("#messageerror-editprofile-password");
	var _messageemail1 = $("#messageerror-editprofile-email1");
	var _messageemail2 = $("#messageerror-editprofile-email2");
	var _messagepassword = $("#messageerror-editprofile-password");
	var _messageeditprofile = $("#messageerror-editprofile");
	validateEmailForm = function (event) {
		emptyMessageError(_messageemail1);
		var _objfield = $(this);
		var _thisform = $(_objfield).closest('form');
		var _val = $.trim(_objfield.val());
		var _message = _objfield.data("errormessage");
		_objfield.removeClass("required");
		var _isvalid = validateEmail(_val);
		if (!_isvalid && _val.length > 0) {
			_objfield.addClass("required");
			showMessageError(_messageemail1, _message, 300);
			hideMessageError(_messageemail1, false, 300);
			_thisform.data("errormessage", _message);
			return false;
		}
		_thisform.data("errormessage", "");
		return true;
	}
	validateEmailFormCompare = function (event) {
		emptyMessageError(_messageemail2);
		var _objfield1 = _formUser.find("#user_emailnew");
		var _objfield2 = _formUser.find("#user_emailretype");
		var _thisform = $(_objfield2).closest('form');
		$(_objfield1).removeClass("required-bg1");
		$(_objfield2).removeClass("required-bg1");
		var _val1 = $.trim($(_objfield1).val());
		var _val2 = $.trim($(_objfield2).val());
		var _message = "Email doesn't match. Please try again";

		var _isvalid = ((_val1 == _val2) && (!(_thisform.data("errormessage").length > 0)));
		if (!_isvalid) {
			$(_objfield1).addClass("required-bg1");
			$(_objfield2).addClass("required-bg1");
			showMessageError(_messageemail2, _message, 300);
			hideMessageError(_messageemail2, false, 300);
			_thisform.data("errormessage", _message);
			return false;
		}
		_thisform.data("errormessage", "");
		return true;
	}
	validatePasswordFormCompare = function (event) {
		emptyMessageError(_messagepassword);
		var _objfield1 = _formUser.find("#user_passwordnew");
		var _objfield2 = _formUser.find("#user_passwordretype");
		var _thisform = $(_objfield2).closest('form');
		$(_objfield1).removeClass("required-bg1");
		$(_objfield2).removeClass("required-bg1");
		var _val1 = $.trim($(_objfield1).val());
		var _val2 = $.trim($(_objfield2).val());
		var _message = "password doesn't match. Please try again";

		var _isvalid = ((_val1 == _val2));
		if (!_isvalid) {
			$(_objfield1).addClass("required-bg1");
			$(_objfield2).addClass("required-bg1");
			showMessageError(_messagepassword, _message, 300);
			hideMessageError(_messagepassword, false, 300);
			_thisform.data("errormessage", _message);
			return false;
		}
		_thisform.data("errormessage", "");
		return true;
	}
	validateRequiredForm = function (event) {
		var _objfield = $(this);
		var _thisform = _objfield.closest('form');
		_objfield.removeClass("required-bg1");
		if ($.trim(_objfield.val()) == "") {
			_objfield.addClass("required-bg1");
			_thisform.data("errormessage", "The field is required");
			return false;
		}
		_thisform.data("errormessage", "");
		return true;
	}
	_formUser.find("#user_emailnew").blur(validateEmailForm);
	_formUser.find("#user_emailretype").blur(validateEmailForm);
	_formUser.find("#user_emailnew").blur(validateEmailFormCompare);
	_formUser.find("#user_emailretype").blur(validateEmailFormCompare);

	_formUser.find("#user_passwordnew").blur(validatePasswordFormCompare);
	_formUser.find("#user_passwordretype").blur(validatePasswordFormCompare);
	_formUser.find("#user_name").blur(validateRequiredForm);

	$('#editprofile-box #user_submit').unbind("click");
	$('#editprofile-box #user_submit').click(function (event) {
		var _thisform = $(this).closest('form');
		var _thisformerrors = _thisform.data("errormessage");
		emptyMessageError(_messageeditprofile);
		event.preventDefault();
		event.stopPropagation();
		if (_thisformerrors.length > 0) {
			showMessageError($('#general-msg'), _thisformerrors, 300, 'error', 'top');
			hideMessageError($('#general-msg'), false, 300);
			return false;
		}
		var _formdata = _formUser.serialize();
		$.ajax({
			type : "POST",
			url : "https://myezplan.com/mobile/appdata/data_ajax/myaccount_user_ajax.cfm",
			async : false,
			cache : false,
			data : "action=saveuser&saveaction=u&" + _formUser.serialize() + "&userid=" + sessionStorage.cf_sid,
			error : function (xhr, ajaxOptions, thrownError) {
				showMessageError($('#general-msg'), thrownError, 300, 'error', 'top');
				hideMessageError($('#general-msg'), false, 300);
			},
			success : function (datos) {
				showMessageError($('#general-msg'), datos, 300, 'success', 'top');
				hideMessageError($('#general-msg'), false, 300);
				sessionStorage.cf_ufname = _formUser.find("#user_name").val();
				loadmenuItems();
				$("#myaccount_panel #box-body").load("myaccount.html"); 
			}
		});
	});
	goToItinerary = function () {
		window.open("myitinerary.cfm", "_self");
	}
	myPlanTipShow = function (arg_button) {
		var _popup = $("#tipplan-box");
		//_popup.fadeIn(0);
		_popup.panel();
		_popup.show();
		_popup.panel("open");
		var popMargTop = (_popup.height() + 24) / 2;
		var popMargLeft = (_popup.width() + 24) / 2;
		/*_popup.css({'margin-left':-popMargLeft});*/
		var $popupbody = $("#tipplan-box .box-body");
		$popupbody.empty();
		var url = "https://myezplan.com/mobile/appdata/data_ajax/map_usersplans_ajax.cfm?rnu=" + randomNumberUrl() + "";
		var urlconfig = {
			action : "getplantip",
			up_id : arg_button.data("id")
		};
		$popupbody.load(url, urlconfig, function (response, status, xhr) {
			_popup.find("#tipplan_description").focus();
		}).error(myezplan.utils.ajaxError);
		var T = $(window).height() / 3 - 100 / 1 + $(window).scrollTop();
		/*var	L = $(window).width() / 2 - popup.width() / 2;*/
		_popup.css({
			//top: T,

		})
		//$('body').append('<div id="mask" class="mask"></div>');
		//$('#mask').fadeIn(300);
	}
	myPlanTipUpdate = function (up_id, up_description, messageObj) {
		var _message = messageObj;
		var _data = {
			action : "saveuserplan",
			saveaction : "updatetip",
			up_description : up_description,
			up_id : up_id
		};
		$.ajax({
			type : "POST",
			url : "https://myezplan.com/mobile/appdata/data_ajax/map_usersplans_ajax.cfm",
			async : false,
			cache : false,
			data : _data,
			error : function (xhr, ajaxOptions, thrownError) {
				showMessageError(_message, thrownError, 300);
				hideMessageError(_message, false, 300);
			},
			success : function (response) {
				showMessageError(_message, response, 300);
				hideMessageError(_message, false, 300);
			}
		});
	}
	/* ----------------------------------------- */
});