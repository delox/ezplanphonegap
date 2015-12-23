// JavaScript Document
/* functions */
$(document).ready(function (e) {
	/* ----------------------------------------- */
	/* addToMapCityPopup */
	addToMapCityPopup = function (arg_pid, arg_origin, arg_callback) {
		if ($.trim(arg_pid) == "") {
			return;
		}
		addToMapCityPopup_ajax(arg_pid, arg_origin, arg_callback);
	}
	addToMapCityPopup_ajax = function (arg_pid, arg_origin, arg_callback) {
		var _url = "https://myezplan.com/mobile/appdata/data_ajax/map_city_ajax.cfm?rnu=" + randomNumberUrl() + "";
		//var _url = "data_ajax/map_mix_ajax_old.cfm?rnu="+randomNumberUrl()+"";
		var _urlconfig = {
			pid : arg_pid,
			action : "add",
			orig : arg_origin
		};
		$.post(_url, _urlconfig)
		.error(function (xhr, ajaxOptions, thrownError) {
			alert(thrownError);
		})
		.success(function (response, status, xhr) {
			var _response = $.parseJSON(response);
			if (!arg_pid) {
				arg_pid = _response.pid;
			};
			if (arg_callback && typeof(arg_callback) == "function") {
				arg_callback(arg_pid, _response);
			}
		});
	}
	addToMapCityPopup_ajax2 = function (arg_pid, arg_origin) {
		var _url = "https://myezplan.com/mobile/appdata/data_ajax/map_city_ajax.cfm?rnu=" + randomNumberUrl() + "";
		//var _url = "data_ajax/map_mix_ajax_old.cfm?rnu="+randomNumberUrl()+"";
		var _urlconfig = {
			pid : arg_pid,
			action : "add2",
			orig : arg_origin
		};
		$.post(_url, _urlconfig)
		//		.error(function(xhr, ajaxOptions, thrownError){alert(thrownError);})
		//		.success(function(response, status, xhr){alert('exito');
		//			var _response=$.parseJSON(response);
		//			if(!arg_pid){arg_pid=_response.pid;};
		//			if(arg_callback && typeof(arg_callback)=="function"){arg_callback(arg_pid,_response);}
		//		})
	;
	}
	/* addToMapCityPopup */
	/* deleteFromMapCityPopup */
	deleteFromMapCityPopup = function (arg_pid, arg_origin, arg_callback) {
		if ($.trim(arg_pid) == "") {
			return;
		}
		deleteFromMapCityPopup_ajax(arg_pid, arg_origin, arg_callback);
	}
	deleteFromMapCityPopup_ajax = function (arg_pid, arg_origin, arg_callback) {
		var _url = "https://myezplan.com/mobile/appdata/data_ajax/map_city_ajax.cfm?rnu=" + randomNumberUrl() + "";
		var _urlconfig = {
			pid : arg_pid,
			action : "del",
			orig : arg_origin
		};
		$.ajax({
			url : _url,
			data : _urlconfig,
			async : false,
			dataType : 'json',
			type : "POST"
		})
		.error(myezplan.utils.ajaxError)
		.success(function (response, status, xhr) {
			/*
			if(response.ORIGIN!="mapcitypopup"){
			alert(response.MESSAGE);
			}
			updateMapCityCookie();
			 */
			if (arg_callback && typeof(arg_callback) == "function") {
				arg_callback(arg_pid, response);
			}
		}); ;

		/*
		$.post(_url,_urlconfig)
		.error(deleteFromMapCityPopup_ajax_error)
		.success(deleteFromMapCityPopup_ajax_success);
		deleteFromMapCityPopup_ajax_error=function(xhr, ajaxOptions, thrownError){
		alert(thrownError);
		}
		deleteFromMapCityPopup_ajax_success=function(response, status, xhr){
		var _response=$.parseJSON(response);
		if(_response.ORIGIN!="mapcitypopup"){
		alert(_response.MESSAGE);
		}
		updateMapCityCookie();
		}
		 */
	}
	deleteFromMapCityPopup_ajax_success = function (response, status, xhr) {
		var _response = $.parseJSON(response);
		if (_response.ORIGIN != "mapcitypopup") {
			alert(_response.MESSAGE);
		}
		updateMapCityCookie();
	}
	/* deleteFromMapCityPopup */
});
/* jquery events */
$(document).ready(function (e) {
	/* ----------------------------------------- */
	window.onbeforeunload = function (e) {
		//alert('entra')
		if (typeof(intervalid) != 'undefined') {
			clearInterval(intervalid);
		};
	};
	$(document).on("click", '#roadmapplace-box #tabsx_checkboxmix2', function (e) {
		var _checkmix = $(this);
		//		if(!_checkmix){
		//			e.stopPropagation();e.preventDefault();
		//			return;
		//		}
		var _pid = _checkmix.val();
		var _buyurl = _checkmix.data("urllink");
		if (!_buyurl) {
			_buyurl = '';
		}
		var _origin = "mapcitypopup";
		var _iframewindow = window["iframe_mapplanscity"];

		var $d = $('#menu_place_table');
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
		}
		if (date2_ && date2_ != '') {
			var date2 = date2_;
		}
		$('#tabcalendario').show();
		$('#tabinfopanel').hide();
		$('#tabcalendario').showLoading("Please Wait,<br/>Loading...<br/>", false);
		var url = "data_ajax/mapcity_content3.cfm?rnu=5131616516651";
		var urlconfig = {
			action : "calendarioplaces",
			ruta_id : _pid,
			date1 : date1,
			date2 : date2,
			numdays : numdays,
			source : 'infoplace',
			cualche : 'tabsx_checkboxmix2',
			_buyurl : _buyurl
		};
		$("#tabcalendario").load(url, urlconfig);
	});
	$(document).on("click", '#roadmapplace-box_panel #tabsx_checkboxmix', function (e) {
		$('#roadmapplace-box_panel').css('max-width', '500px');
		//alert("chechk working");
		//alert("click: #roadmapplace-box #tabsx_checkboxmix");
		var _checkmix = $(this);
		//		if(!_checkmix){
		//			e.stopPropagation();e.preventDefault();
		//			return;
		//		}
		var _pid = _checkmix.val();
		var _buyurl = _checkmix.data("urllink");
		if (!_buyurl) {
			_buyurl = '';
		}
		var _origin = "mapcitypopup";
		var _iframewindow = window["iframe_mapplanscity"];
		var $d = $('#menu_place_table');
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
		}
		if (date2_ && date2_ != '') {
			var date2 = date2_;
		}
		$('#tabcalendario').show();
		$('#tabinfopanel').hide();
		$('#tabcalendario').showLoading("Please Wait,<br/>Loading...<br/>", false);
		if (window.appmobile && window.appmobile == "yes") {
			var url = "https://myezplan.com/data_ajax/mapcity_content3.cfm?rnu=5131616516651";
		}else{
			var url = "data_ajax/mapcity_content3.cfm?rnu=5131616516651";
		}
		var urlconfig = {
			action : "calendarioplaces",
			ruta_id : _pid,
			date1 : date1,
			date2 : date2,
			numdays : numdays,
			source : 'infoplace',
			cualche : 'tabsx_checkboxmix',
			_buyurl : _buyurl
		};
		$("#tabcalendario").load(url, urlconfig);
		window.reloadlastitemcal = function () {
			$('#roadmapplace-box_panel #tabsx_checkboxmix').trigger("click");
		}
	});
	/*
	$(document).on("click",'#tabinfo-picvideo-content-link',function(e) {
	var _url=$(this).attr("href");
	openexternalmedia(_url);
	return false;
	});
	 */
	/* ----------------------------------------- */
});
closeinfocalendario = function (ruta_id, cualche) {
	$('#roadmapplace-box_panel').css('max-width', '400px');
	$('#tabcalendario').hide();
	$('#tabcalendario').empty();
	$('#tabinfopanel').show();
	updateMapCityCookie();
	var esta = 0;
	for (y = 0; y < global_MapCityCookie.length; y++) {
		if (global_MapCityCookie[y] == ruta_id) {
			var esta = 1;
		}
	}
	if (esta == 1) {
		document.getElementById(cualche).checked = true;
	} else {
		document.getElementById(cualche).checked = false;
	}
	checktransportsadd();
	checkservicesadd();
	checkplacesadd();
	if (global_showbutton) {
		mapcitypopup.showSelPlaces2();
	}
}
var showinfoplace_pname = "";
var showinfoplace_pid = "";
var showinfoplace_source = "";
var showinfoplace_myiti = "";
showinfoplace = function (pid, pname, source, myiti) {
	showinfoplace_pname = pname;
	showinfoplace_pid = pid;
	showinfoplace_source = source;
	showinfoplace_myiti = myiti;
	if (showinfoplace_myiti == 'yes') {
		global_showbutton = true;
	}
	var popup = $("#roadmapplace-box_panel");
	//$(popup).fadeOut(0);
	closeAllMapMarkers();
	$("#roadmapplace-box_panel").show();
	$("#roadmapplace-box_panel").panel();
	$("#roadmapplace-box_panel").panel("open");
	$("#roadmapplace-box_panel #box-body").empty();
	if (!sessionStorage.getItem('counttabs' + showinfoplace_pid)) {
		var _url = "https://myezplan.com/mobile/appdata/map_place_tabinfo.cfm?rnu=" + randomNumberUrl() + "";
		var _urlconfig = {
			pid : showinfoplace_pid,
			action : "counttabs",
			cartinfo : sessionStorage.cart,
			externalcart : sessionStorage.externalcart,
			upuserid : sessionStorage.cf_sid
		};
		$.post(_url, _urlconfig, showinfoplace_result1);
		$(".load_img").css("display", "block");
	} else {
		var counttabsdata = sessionStorage.getItem('counttabs' + showinfoplace_pid).split("|");
		showinfoplace_result1(counttabsdata[0], counttabsdata[1], counttabsdata[2]);
	}
	//$("#titlehead").hide();$("#titlehead_virt").hide();
}
function showinfoplace_result1(response, status, xhr) {
	if (!sessionStorage.getItem('counttabs' + showinfoplace_pid)) {
		sessionStorage.setItem('counttabs' + showinfoplace_pid, response + '|' + status + '|' + xhr);
	}
	//alert("showinfoplace_result1 func");
	//console.log(response+','+status+','+xhr.statusText);
	switch (status) {
	case "error":
		console.log("error getting data: " + xhr.statusText);
		break;
	case "success":
		if (response == 0) {
			console.log("no files to show.");
			break;
		}
		if (typeof(showinfoplace_before) == 'undefined') {
			showinfoplace_before = false;
		}
		if (faqpage == 'mapcitypopup') {
			showinfoplace_before_c = mapcitypopup.mapconfig.google.map.getCenter();
			showinfoplace_before_z = mapcitypopup.mapconfig.google.map.getZoom();
			if (!global_showbutton) {
				if (mapAndplaces == 0) {
					showinfoplace_before = 'places';
					$("#show_maps").trigger('click');
				} else {
					showinfoplace_before = 'map';
				}
			} else {
				showinfoplace_before = 'myitinerary';
				$('#show_places').trigger('click');
				$("#show_maps").trigger('click');
			}
			var esdeestaciudad = false;
			google.maps.event.trigger(mapcitypopup.mapconfig.google.map, 'resize');
			$.each(mapcitypopup.mapconfig.markers, function (index, value) {
				if (mapcitypopup.mapconfig.markers[index].mk_category.idunico == showinfoplace_pid) {
					mapcitypopup.mapconfig.markers[index].setVisible(true);
					mapcitypopup.mapconfig.markers[index].setAnimation(google.maps.Animation.BOUNCE);
					var newcenter = mapcitypopup.mapconfig.markers[index].getPosition();
					mapcitypopup.mapconfig.google.map.setCenter(newcenter);
					mapcitypopup.mapconfig.google.map.setZoom(13);
					var esdeestaciudad = true;
					window.location.href = "#show_box";
				}
			});
			if (!esdeestaciudad) {
				$.each(othercityarray, function (index, value) {
					if (othercityarray[index].mk_category.idunico == showinfoplace_pid) {
						othercityarray[index].setAnimation(google.maps.Animation.BOUNCE);
						othercityarray[index].setMap(mapcitypopup.mapconfig.google.map);
						var newcenter = othercityarray[index].getPosition();
						mapcitypopup.mapconfig.google.map.setCenter(newcenter);
						mapcitypopup.mapconfig.google.map.setZoom(13);
					}
				});
			}
		}
		if (!sessionStorage.getItem('infoplace' + showinfoplace_pid)) {
			var url = "https://myezplan.com/mobile/appdata/map_place_tabinfo.cfm?rnu=" + randomNumberUrl() + "";
			var urlconfig = {
				pid : showinfoplace_pid,
				action : "gettabinfo",
				source : showinfoplace_source,
				upuserid : sessionStorage.cf_sid,
				cartinfo : sessionStorage.cart,
				externalcart : sessionStorage.externalcart
			};
			//alert(urlconfig);
			$("#roadmapplace-box_panel #box-body").load(url, urlconfig, showinfoplace_result2);
		} else {
			var placedata = sessionStorage.getItem('infoplace' + showinfoplace_pid).split("|");
			$("#roadmapplace-box_panel #box-body").html(placedata[0]);
			showinfoplace_result2(placedata[0], placedata[1], placedata[2]);
			if (window.cartArr2.indexOf(showinfoplace_pid) != -1) {
				var chkbase = window.infdeal[0];
				var unico = window.infdeal[1];
				var mapa = window.infdeal[2];
				var name = window.infdeal[3];
				$('#divbuttbuy').html('<button onclick="showUserCart();" class="button-square-2 button-round-green2">Checkout</button><span style="color:#c00000;font-weight:bold;" onclick="unbuy_v(' + "'" + chkbase + "','" + unico + "','" + mapa + "','" + name + "'" + ')"><image src="https://lh5.googleusercontent.com/-Cb5dhSGmMSA/U5I5STA1muI/AAAAAAANfGk/1rOXlx8756Q/s52/Untitled8.png" height="35"></span>');
			}
			$(".load_img").css("display", "none");
		}
		break;
	default:
		break;
	}
}
function showinfoplace_result2(response, status, xhr) {
	//alert("showinfoplace_result2 func");
	if (!sessionStorage.getItem('infoplace' + showinfoplace_pid)) {
		sessionStorage.setItem('infoplace' + showinfoplace_pid, response + '|' + status + '|' + xhr);
	}
	var popup = $("#roadmapplace-box_panel");
	if (faqpage == "mapcity") {
		$(".traddto").hide();
	} else {
		$(".traddto").show();
	}
	switch (status) {
	case "error":
		console.log("error getting data: " + xhr.statusText);
		break;
	case "success":
		//var popMargTop = ($(popup).height() + 24) / 2;
		//var popMargLeft = ($(popup).width() + 24) / 2;
		//var popZindez = (parseInt(popup.css("z-index"))) + 5;
		$(popup).css({

			//'margin-top' : -popMargTop,
			//'margin-left' : -popMargLeft,
			//'z-index' : popZindez + 1
		});
		//$('body').append('<div id="mask-roadmapplace-box" class="mask"></div>');
		//$('#mask-roadmapplace-box').fadeIn(300).css('z-index',popZindez);
		/*
		 */
		//$(popup).fadeIn(150);
		selectTabIn_mostrartab("tabsx_in", 0);
		setCheckedValueFromLeftCheckExternal(showinfoplace_pname);
		// centered, centrado ligthbox
		var T = $(window).height() / 3 - 200 / 1 + $(window).scrollTop();
		/*var	L = $(window).width() / 2 - popup.width() / 2;*/
		popup.css({
			//	top: T,

		})

		break;
	default:
		break;
	}
}
closeAllMapMarkers = function () {
	/*
	for (var mk=0; mk<marcadores.length;mk++ ){
	marcadores[mk].infowindow.close();
	}
	 */
}
selectTabIn_mostrartab = function (tabdiv, delay) {
	var _delay = typeof(delay) == "number" ? delay : 750;
	//$("#vardiv").ready(function() {
	window.setTimeout(function () {
		mostrar_tab('tabinfo-deal-content', 'tabinfo-deal-tab', tabdiv, 'nocambiar');
	}, _delay);
	//});
}
function mostrar_tab(cual, obja, objp, nombre) {
	// imgs urls and variables
	/*var tab_desc_img = "https://lh5.googleusercontent.com/-t5dnDDVO4xs/U6UER9CwbuI/AAAAAAANfME/hF5ZAFNrL30/s55/Untitled90.png"
	var tab_deta_img = "https://lh6.googleusercontent.com/-eL5CWY-aG7g/U6UESSMHOfI/AAAAAAANfLA/cVG_LScIdho/s55/Untitled91.png"
	var tab_pics_img = "https://lh5.googleusercontent.com/-rGEouwo8JC4/U6UESSVi9LI/AAAAAAANfLM/01_vXIZo2oI/s55/Untitled92.png"
	var tab_revi_img = "https://lh6.googleusercontent.com/-vBl7JZL1h5Y/U6UESztVvcI/AAAAAAANfL8/leteG07-Tzs/s55/Untitled93.png"
	var tab_deal_img = "https://lh6.googleusercontent.com/-TLwwc2W92Zw/U6UETa1rxzI/AAAAAAANfLc/qVgbxyfMDvQ/s54/Untitled95.png"
	if (obja == "tabinfo-description-tab") {
	var tab_img = tab_desc_img;
	} else if (obja == "tabinfo-details-tab") {
	var tab_img = tab_deta_img;
	} else if (obja == "tabinfo-picvideo-tab") {
	var tab_img = tab_pics_img;
	} else if (obja == "tabinfo-deal-tab") {
	var tab_img = tab_deal_img;
	} else if (obja == "tabinfo-review-tab") {
	var tab_img = tab_revi_img;
	}*/
	// end of imgs urls and variables
	if (nombre != 'nocambiar') {
		document.querySelector('.placename1').innerHTML = (nombre);
	}
	if(faqpage == 'mapcitypopup'){
		raction = "getreviews";
	}else{
		raction = "getreviews-stops";
	}
	//if (cual=='tabinfo-review-content' && !reviews_loaded){
	if (!sessionStorage.getItem('inforating' + reviews_idunico)) {
		var url = "https://myezplan.com/mobile/appdata/map_place_tabinfo.cfm?rnu=" + randomNumberUrl() + "";
		var urlconfig = {
			action : raction,
			pid : reviews_idunico,
			ruta_idunico : reviews_idunico,
			tabsx : reviews_contador,
			plan_id : reviews_planid,
			ext_reviews : reviews_ext,
			cartinfo : sessionStorage.cart,
			externalcart : sessionStorage.externalcart,
			upuserid : sessionStorage.cf_sid
		};
		//$("#tabinfo-review-content").load(url,urlconfig);
		$.ajax({
			type : "POST",
			url : url,
			async : true,
			cache : true,
			data : urlconfig,
			error : function (xhr, ajaxOptions, thrownError) {
				alert("No Rating");
			},
			success : function (data) {
				$("#tabinfo-review-content").html(data);
				sessionStorage.setItem('inforating' + reviews_idunico, data);
			}
		});
		//alert(reviews_id);
	} else {
		$("#tabinfo-review-content").html(sessionStorage.getItem('inforating' + reviews_idunico));
	}
	//}
	try {
		document.getElementById("tabinfo-description-content").style.display = 'none';
	} catch (err) {}
	//try{ document.getElementById("tabinfo-description-content_texttour").style.display = 'none'; } catch(err){ }
	try {
		document.getElementById("tabinfo-details-content").style.display = 'none';
	} catch (err) {}
	try {
		document.getElementById("tabinfo-picvideo-content").style.display = 'none';
	} catch (err) {}
	try {
		document.getElementById("tab-3").style.display = 'none';
	} catch (err) {}
	try {
		document.getElementById("tabinfo-deal-content").style.display = 'none';
	} catch (err) {}
	//try{ document.getElementById("tabinfo-deal-content_textdeal").style.display = 'none'; } catch(err){ }
	try {
		document.getElementById("tabinfo-review-content").style.display = 'none';
	} catch (err) {}
	try {
		document.getElementById("tab-7").style.display = 'none';
	} catch (err) {}
	try {
		document.getElementById("tab-8").style.display = 'none';
	} catch (err) {}

	try {
		document.getElementById('tabinfo-description-icon').display.fill = '';
	} catch (err) {}
	try {
		document.getElementById('tabinfo-details-icon').src = 'https://lh4.googleusercontent.com/-3xTqPhzPqjE/U6UEUY0pjTI/AAAAAAANfL4/cZMq2a8JGRA/s55/Untitled97.png';
	} catch (err) {}
	try {
		document.getElementById('tabinfo-picvideo-icon').src = 'https://lh5.googleusercontent.com/-ww1PSLxBnZs/U6UEUbl-SfI/AAAAAAANfLs/hw0HtcrmLB8/s54/Untitled98.png';
	} catch (err) {}
	try {
		document.getElementById('tab3a').style.background = '#AAAAAA';
	} catch (err) {}
	try {
		document.getElementById('tabinfo-deal-icon').src = 'https://lh6.googleusercontent.com/-2eQp2Gp-6ss/U6UES0rNURI/AAAAAAANfLQ/ojPN0ED0uM8/s55/Untitled94.png';
	} catch (err) {}
	try {
		document.getElementById('tabinfo-review-icon').src = 'https://lh6.googleusercontent.com/-Gc2NgdgzOMk/U6UEVID4ZDI/AAAAAAANfMA/fA-C-WhwEAI/s54/Untitled99.png';
	} catch (err) {}
	try {
		document.getElementById('tab7a').style.background = '#AAAAAA';
	} catch (err) {}
	try {
		document.getElementById('tab8a').style.background = '#AAAAAA';
	} catch (err) {}
	if (cual == 'tabinfo-deal-content') {
		$('#divaddtomp').hide();
		$('#reportlink').hide();
		$('#reportlink2').show();
	} else {
		$('#divaddtomp').show();
		$('#reportlink2').hide();
		$('#reportlink').show();
	}
	var _cual = $("#" + objp).find("#" + cual)[0];
	var _obja = $("#" + obja).find("svg")[0];
	try {
		_cual.style.display = 'block';
	} catch (e) {
		document.getElementById('tabinfo-description-content').style.display = 'block';
		$('#divaddtomp').show();
		$('#reportlink2').hide();
		$('#reportlink').show();
	}
	try {
		$("#roadmapplace-box_panel .tabs svg").css('fill','#ddd');
		_obja.style.fill = '';
	} catch (e) {
		document.getElementById('tabinfo-description-icon').src = 'https://lh5.googleusercontent.com/-t5dnDDVO4xs/U6UER9CwbuI/AAAAAAANfME/hF5ZAFNrL30/s55/Untitled90.png';
		$('#divaddtomp').show();
		$('#reportlink2').hide();
		$('#reportlink').show();
	}
}
function mostrar_tab2(cual, obja, objp, nombre) {
	if (nombre != 'nocambiar') {
		document.querySelector('.placename2').innerHTML = (nombre);
	}
	try {
		document.getElementById("tabinfo-description-content2").style.display = 'none';
	} catch (err) {}
	try {
		document.getElementById("tabinfo-description-content_texttour").style.display = 'none';
	} catch (err) {}
	try {
		document.getElementById("tabinfo-details-content2").style.display = 'none';
	} catch (err) {}
	try {
		document.getElementById("tabinfo-picvideo-content2").style.display = 'none';
	} catch (err) {}
	try {
		document.getElementById("tab-3").style.display = 'none';
	} catch (err) {}
	try {
		document.getElementById("tabinfo-deal-content2").style.display = 'none';
	} catch (err) {}
	try {
		document.getElementById("tabinfo-deal-content_textdeal").style.display = 'none';
	} catch (err) {}
	try {
		document.getElementById("tabinfo-review-content2").style.display = 'none';
	} catch (err) {}
	try {
		document.getElementById("tab-7").style.display = 'none';
	} catch (err) {}
	try {
		document.getElementById("tab-8").style.display = 'none';
	} catch (err) {}

	try {
		document.getElementById('tabinfo-description-tab2').style.background = '#AAAAAA';
	} catch (err) {}
	try {
		document.getElementById('tabinfo-details-tab2').style.background = '#AAAAAA';
	} catch (err) {}
	try {
		document.getElementById('tabinfo-picvideo-tab2').style.background = '#AAAAAA';
	} catch (err) {}
	try {
		document.getElementById('tab3a').style.background = '#AAAAAA';
	} catch (err) {}
	try {
		document.getElementById('tabinfo-deal-tab2').style.background = '#C00000';
	} catch (err) {}
	try {
		document.getElementById('tabinfo-review-tab2').style.background = '#AAAAAA';
	} catch (err) {}
	try {
		document.getElementById('tab7a').style.background = '#AAAAAA';
	} catch (err) {}
	try {
		document.getElementById('tab8a').style.background = '#AAAAAA';
	} catch (err) {}
	var _cual = $("#" + objp).find("#" + cual)[0];
	var _obja = $("#" + objp).find("#" + obja)[0];
	try {
		_cual.style.display = 'block';
	} catch (e) {
		document.getElementById('tabinfo-description-content2').style.display = 'block';
	}
	try {
		_obja.style.background = '#000000';
	} catch (e) {
		document.getElementById('tabinfo-description-tab2').style.background = '#000000';
	}
}
function setCheckedValueFromLeftCheckExternal(pname) {
	var chkpoint = $("#roadmapplace-box #box-body #tabsx_in_checkbox");
	var checksLeft = $("#left_check :checkbox:checked");
	for (var i = 0; i < checksLeft.size(); i++) {
		var chk = checksLeft[i];
		if ($(chk).val() == pname) {
			$(chkpoint).attr("checked", true);
		}
	}
}
function votar(unico, mapa, pregunta, voto, divtemp, isvoto) {
	//alert(sessionStorage.cf_sid);
	var rnu = randomNumberUrl();
	if (isvoto == 1) {
		alert("You already voted on this review.");
		return false;
	}
	var confirmation = window.confirm("Once you leave feedback, you can't edit it or take it back.");
	if (!confirmation) {
		return false;
	}
	if (sessionStorage.cf_sid == undefined || sessionStorage.cf_sid == '') {
		pedir_sesion(2);
	} else {
		//alert(datos);
		//renovar_votar(unico,mapa,pregunta,voto,divtemp);
		$.ajax({
			type : "POST",
			url : "https://myezplan.com/mobile/appdata/data_ajax/votar_ajax.cfm",
			async : true,
			cache : false,
			data : "mapa=" + mapa + "&rnu=" + rnu + "&unico=" + unico + "&pregunta=" + pregunta + "&voto=" + voto + "&usid=" + sessionStorage.cf_sid,
			error : function (xhr, ajaxOptions, thrownError) {
				//alert(thrownError);
			},
			success : function (datos) {
				if (datos.indexOf('xnox') != -1) {
					pedir_sesion(2);
				} else {
					alert(datos);
					if( datos.indexOf('already voted') == -1){
					  renovar_votar(unico, mapa, pregunta, voto, divtemp);
					}
					
				}
			}
		});
	}
}
function renovar_temp(divin) {
	var aa = document.getElementById(divin).innerHTML;
	document.getElementById(divin + "_").innerHTML = aa;
}
function renovar_votar(unico, mapa, pregunta, voto, divtemp) {
	var rnu = randomNumberUrl();
	$.ajax({
		type : "POST",
		url : "https://myezplan.com/mobile/appdata/data_ajax/renovar_votar_ajax.cfm",
		async : false,
		data : "mapa=" + mapa + "&rnu=" + rnu + "&unico=" + unico + "&pregunta=" + pregunta + "&voto=" + voto + "&usid=" + sessionStorage.cf_sid,
		success : function (datos) {
			if (datos == 'no') {
				//alert(datos);
			} else {
				document.getElementById('preg_' + pregunta).innerHTML = datos;
				renovar_temp(divtemp);
			}
		}
	});
}
function externalBuy(chkbase, unico, mapa, name) {
	var chkbasejqstr = "#" + chkbase;
	var chk = $(chkbasejqstr);
	if (!($(chk).is(':checked'))) {
		$(chk).attr("checked", true);
		$(chk).click();
	}
	$(chk).attr("checked", true);
	comprarAjax(unico, mapa);
	//return;
}
function unbuy_cl(chkbase, unico, mapa, name) {
	var che = document.getElementById(chkbase).checked;
	if (che) {
		$('#' + chkbase).trigger('click');
	}
	unbuyAjax_cl(chkbase, unico, mapa, name);
}
function unbuyAjax_cl(chkbase, unico, mapa, name) {
	var rnu = randomNumberUrl();
	$.ajax({
		type : "POST",
		url : "https://myezplan.com/mobile/appdata/data_ajax/cart_ajax_events.cfm",
		async : true,
		cache : false,
		data : "mapa=" + mapa + "&rnu=" + rnu + "&rid=" + unico + "&action=deletecartitem",
		success : function (datos) {
			//alert(datos);
			$('#divbuttbuy').html('<button onclick="javascript:externalBuy_cl(' + "'" + chkbase + "','" + unico + "','" + mapa + "','" + name + "'" + ');" class="button-round-2 button-round-green2">Add to Cart</button>');
			if (typeof(comprarAjaxLocal_Result) == "function") {
				comprarAjaxLocal_Result();
			}
		}
	});
}
function unbuy_v(chkbase, unico, mapa, name) {
	var che = document.getElementById(chkbase).checked;
	if (che) {
		$('#' + chkbase).trigger('click');
	}
	var index = window.cartArr2.indexOf(showinfoplace_pid);
	window.cartArr2.splice(index, 1);
	unbuyAjax_v(chkbase, unico, mapa, name);
}
function unbuyAjax_v(chkbase, unico, mapa, name) {
	var rnu = randomNumberUrl();
	$.ajax({
		type : "POST",
		url : "https://myezplan.com/mobile/appdata/data_ajax/cart_ajax_events.cfm",
		async : true,
		cache : false,
		data : "mapa=" + mapa + "&rnu=" + rnu + "&rid=" + unico + "&action=deletecartitem&upuserid=" + sessionStorage.cf_sid,
		success : function (datos) {
			//alert(datos);
			$('#divbuttbuy').html('<button onclick="javascript:externalBuy_v(' + "'" + chkbase + "','" + unico + "','" + mapa + "','" + name + "'" + ');" class="button-square-2 button-round-green2">Add to Cart</button>');
			window.cartArr2.splice($.inArray(unico, window.cartArr2), 1);
			sessionStorage.cart2 = JSON.stringify(window.cartArr2);
			if (typeof(comprarAjaxLocal_Result) == "function") {
				comprarAjaxLocal_Result();
			}
		}
	});
}
function externalBuy_v(chkbase, unico, mapa, name) {
	var che = document.getElementById(chkbase).checked;
	//alert(che);
	if (!che) {
		$('#' + chkbase).trigger('click');
	}
	//	var chkbasejqstr = "#"+chkbase;
	//	var chk = $(chkbasejqstr);
	//	if( !($(chk).is(':checked')) ){
	//		$(chk).attr("checked",true);
	//		$(chk).click();
	//	}
	//	$(chk).attr("checked",true);
	comprarAjax_v(chkbase, unico, mapa, name);
	//return;
}
if (sessionStorage.cart2 != undefined) {
	var _cart = JSON.parse(sessionStorage.cart);
	if (_cart[0].placeid != "N") {
		window.cartArr = JSON.parse(sessionStorage.cart);
	} else {
		window.cartArr = [];
		sessionStorage.cart = JSON.stringify([{
						placeid : "N"
					}
				]);
	}
	window.cartArr2 = JSON.parse(sessionStorage.cart2);

} else {
	window.cartArr = [];
	window.cartArr2 = [];
	sessionStorage.cart = JSON.stringify([{
					placeid : "N"
				}
			]);
	sessionStorage.externalcart = JSON.stringify([{
					placeid : "N"
				}
			]);
}
function comprarAjax_v(chkbase, unico, mapa, name, panel) {
	var rnu = randomNumberUrl();
	if (sessionStorage.cf_sid == undefined) {
		pedir_sesion(1, "comprarAjax_v('" + chkbase + "'," + unico + "," + mapa + ",'" + name + "','si')");
		return;
	}
	$.ajax({
		type : "POST",
		url : "https://myezplan.com/mobile/appdata/data_ajax/cart_ajax_events.cfm",
		async : true,
		cache : false,
		data : "mapa=" + mapa + "&rnu=" + rnu + "&unico=" + unico + "&action=addcartitem_v&upuserid=" + sessionStorage.cf_sid,
		success : function (datos) {
			var cartVars = datos.split("*");
			//alert(cartVars[1]);
			showMessageError($('#general-msg'), cartVars[1], 300, 'success', 'top');
			hideMessageError($('#general-msg'), false, 300);
			var newInfo = JSON.parse(cartVars[0]);
			window.cartArr = window.cartArr.concat(newInfo);
			cartVars[2] = cartVars[2].replace(/\s/g, '');
			if (sessionStorage.cart2 != undefined) {
				window.cartArr2 = JSON.parse(sessionStorage.cart2);
			}
			window.cartArr2[cartArr2.length] = cartVars[2];
			//sessionStorage.cart  = cartVars[0]
			sessionStorage.cart2 = JSON.stringify(window.cartArr2);
			sessionStorage.cart = JSON.stringify(window.cartArr);
			$('#divbuttbuy').html('<button onclick="showUserCart();" class="button-square-2 button-round-green2">Checkout</button><span style="color:#c00000;font-weight:bold;" onclick="unbuy_v(' + "'" + chkbase + "','" + unico + "','" + mapa + "','" + name + "'" + ')"><image src="https://lh5.googleusercontent.com/-Cb5dhSGmMSA/U5I5STA1muI/AAAAAAANfGk/1rOXlx8756Q/s52/Untitled8.png" height="35"></span>');
			if (typeof(comprarAjaxLocal_Result) == "function") {
				comprarAjaxLocal_Result();
			}
			if (panel == 'si') {
				$("#roadmapplace-box_panel").panel("open");
			}
		}
	});
}
function externalBuy_cl(chkbase, unico, mapa, name) {
	var che = document.getElementById(chkbase).checked;
	if (!che) {
		$('#' + chkbase).trigger('click');
	}
	comprarAjax_cl(chkbase, unico, mapa, name);
}
function comprarAjax_cl(chkbase, unico, mapa, name) {
	var rnu = randomNumberUrl();
	if (cf_sid == "") {
		pedir_sesion(1, "comprarAjax_cl('" + chkbase + "'," + unico + "," + mapa + ",'" + name + "')");
		return;
	}
	$.ajax({
		type : "POST",
		url : "data_ajax/cart_ajax_events.cfm",
		async : false,
		cache : false,
		data : "mapa=" + mapa + "&rnu=" + rnu + "&unico=" + unico + "&action=addcartitem",
		success : function (datos) {
			alert(datos);
			$('#divbuttbuy').html('<button onclick="showUserCart();" class="button-round-2 button-round-green2">Checkout</button><span style="color:#c00000;font-weight:bold;" onclick="unbuy_cl(' + "'" + chkbase + "','" + unico + "','" + mapa + "','" + name + "'" + ')"><image src="https://lh5.googleusercontent.com/-Cb5dhSGmMSA/U5I5STA1muI/AAAAAAANfGk/1rOXlx8756Q/s52/Untitled8.png" height="35"></span>');
			if (typeof(comprarAjaxLocal_Result) == "function") {
				comprarAjaxLocal_Result();
			}
		}
	});
}

function comprar(objbase, unico, mapa, name) {
	var el = document.getElementById(objbase);
	var inputs = el.getElementsByTagName('INPUT');
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].type == "checkbox") {
			if (inputs[i].value == name) {
				if (!(inputs[i].checked)) {
					var chk = $(inputs[i]);
					$(chk).attr("checked", true);
					$(chk).click();
				}
			}
		}
	}
	comprarAjax(unico, mapa);
	//return;
}
function comprarAjax(unico, mapa) {
	var rnu = randomNumberUrl();
	if (cf_sid == "") {
		pedir_sesion(1, "comprarAjax(" + unico + "," + mapa + ")");
		return;
	}
	$.ajax({
		type : "POST",
		url : "https://myezplan.com/mobile/appdata/data_ajax/cart_ajax_events.cfm",
		async : false,
		cache : false,
		data : "mapa=" + mapa + "&rnu=" + rnu + "&unico=" + unico + "&action=addcartitem",
		success : function (datos) {
			alert(datos);
			if (typeof(comprarAjaxLocal_Result) == "function") {
				comprarAjaxLocal_Result();
			}
		}
	});
}
function rellamar(obj, pointname, verif) {
	var posvv = -1;
	var _checkvalue = obj.value;
	var _checkname = pointname;
	var combopartida = document.getElementById("partida_");
	var combollegada = document.getElementById("llegada_");
	if (typeof(prohibidos_v) == "undefined") {
		return false;
	}
	if (obj.checked == false) {
		var checkboxes = document.getElementsByTagName('INPUT');
		for (i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i].type == "checkbox") {
				if (checkboxes[i].value == _checkvalue && checkboxes[i].id != "tabsx_checkboxmix") {
					checkboxes[i].checked = false;
				}
			}
		}
		prohibidos_v.push(_checkvalue);
		for (var i = 0; i <= combos_mixtos.length; i++) {
			if (combos_mixtos[i] == _checkvalue)
				posvv = i;
		}
		if (verif != 's') {
			combos_mixtos.splice(posvv, 1);
		}
		for (var i = 0; i < combopartida.children.length; i++) {
			if (combopartida.children[i].value == _checkvalue) {
				combopartida.options[i] = null;
			}
		}
		for (var i = 0; i < combollegada.children.length; i++) {
			if (combollegada.children[i].value == _checkvalue) {
				combollegada.options[i] = null;
			}
		}
	} else {
		if (combopartida.options.length > 10) {
			alert("You have reached the maximum number of places(10) per plan.");
			obj.checked = false;
			return;
		}
		var checkboxes = document.getElementsByTagName('INPUT');
		for (i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i].type == "checkbox") {
				if (checkboxes[i].value == _checkvalue && checkboxes[i].id != "tabsx_checkboxmix") {
					checkboxes[i].checked = true;
				}
			}
		}
		for (var i = 0; i <= prohibidos_v.length; i++) {
			if (prohibidos_v[i] == _checkvalue)
				posvv = i;
		}
		prohibidos_v.splice(posvv, 1);
		if (verif != 's') {
			combos_mixtos.push(_checkvalue);
			/*Lo adiciono a los combos*/

			theOption = document.createElement("OPTION");
			theText = document.createTextNode(_checkname);
			theOption.value = _checkvalue;
			theOption.appendChild(theText);
			combopartida.appendChild(theOption);

			theOption2 = document.createElement("OPTION");
			theText2 = document.createTextNode(_checkname);
			theOption2.value = _checkvalue;
			theOption2.appendChild(theText2);
			combollegada.appendChild(theOption2);
		}

	}
	document.getElementById("prohibidos").value = prohibidos_v;
	document.getElementById("combos_mixtos_i").value = combos_mixtos;
	var todosch = document.getElementsByTagName("INPUT");
	for (var i = 0; i < todosch.length; i++) {
		if (todosch[i].type == "checkbox") {
			if (todosch[i].checked == true) {
				//todosch[i].setAttribute('checked', 'checked');
				$(todosch[i]).attr("checked", true);
			} else {
				//todosch[i].removeAttribute('checked');
				$(todosch[i]).attr("checked", false);
			}
		}
	}
}
function changebuybutton(Link, cualche, ruta_id) {
	var rnu = randomNumberUrl();
	if (cf_sid != '') {
		$.ajax({
			type : "POST",
			url : "https://myezplan.com/mobile/appdata/data_ajax/cart_ajax_events.cfm",
			async : false,
			cache : false,
			data : "rnu=" + rnu + "&rutaid=" + ruta_id + "&action=addcartitem_external",
			success : function (datos) {
				alert(datos);
			}
		});
	} else {
		alert('You need to sign in to add items to the Shopping Cart')
	}
	$('#' + cualche).trigger('click');
	var texto = '<button onclick="window.open(' + "'" + Link + "'" + ',' + "'_blank'" + ')" class="button-round-2 button-round-green2">Buy Now</button><button onclick="$(' + "'#" + cualche + "'" + ').trigger(' + "'click'" + ');" class="button-round-2 button-round-blue2">Edit</button>';
	if (cf_sid != '') {
		var texto = texto + '<span style="color:#c00000;font-weight:bold;" onclick="changebuybutton2(' + "'" + Link + "'" + ',' + "'" + cualche + "'" + ',' + ruta_id + ')" class=""><image src="https://lh5.googleusercontent.com/-Cb5dhSGmMSA/U5I5STA1muI/AAAAAAANfGk/1rOXlx8756Q/s52/Untitled8.png" height="35"></span>';
	}
	$('#buttonbuy').html(texto);
}
function changebuybutton2(Link, cualche, ruta_id) {
	var rnu = randomNumberUrl();
	$.ajax({
		type : "POST",
		url : "https://myezplan.com/mobile/appdata/data_ajax/cart_ajax_events.cfm",
		async : false,
		cache : false,
		data : "rnu=" + rnu + "&rutaid=" + ruta_id + "&action=deleteexternalcartitem",
		success : function (datos) {
			$('#' + cualche).trigger('click');
			$('#buttonbuy').html('<button onclick="changebuybutton(' + "'" + Link + "'" + ',' + "'" + cualche + "'" + ',' + ruta_id + ');" class="button-round-2 button-round-green2">Add To Cart</button>');
			if (typeof(comprarAjaxLocal_Result) == "function") {
				comprarAjaxLocal_Result();
			}
		}
	});

}