window.main=window.main||{};

/** traer_ciudad **/
function traer_ciudad(valor){
	$("#img_map_preview").attr("src",_img_map_preview);
	if(valor==''){
		$("#div_ciudad").html('<select class="select_m" id="ciudad_sel"><option value="">Choose One ... </option></select>');
		$("#div_tour").html('<select class="select_m" id="tour_sel"><option value="">Choose One ... </option></select>');
	}else{
		/*$("#div_ciudad").html("<img src='images/loader.gif' />");*/
		
		$("#div_tour").html('<select class="select_m" id="tour_sel"><option value="">Choose One ... </option></select>');
		var estado_id = $.trim($("#estado_sel").val());
		var aleat = Math.random() * 9999999999999999;
		$.ajax({
			type: "POST",
			url: "http://myezplan.com/html_ajax/cargar_ciudad_ajax.cfm",
			async:true, 
			data: "estado_id="+estado_id+"&aleat="+aleat,
			crossDomain : true,
			success: function(datos){
				$("#div_ciudad").html(datos);
			}
		});
		/*viewPlanByCity();*/
	}
}
/** cargar_tours_citypic **/
function cargar_tours_citypic(objSelect){
	var text = objSelect.options[objSelect.options.selectedIndex].text;
	var value = objSelect.options[objSelect.options.selectedIndex].value;
	cargar_tours(value);
	main.cargar_citypic(text);
}
/** cargar_tours **/
function cargar_tours(text){
	$("#div_tour").html("<img src='images/loader.gif' />");
	var ciudad = text;
	var aleat = Math.random() * 9999999999999999;
	if(ciudad==''){
		$("#div_tour").html('<select id="tour_sel"><option value="">Choose One ... </option></select>');
		return;
	}
	$.ajax({
		type: "POST",
		url: "http://myezplan.com/mobile/appdata/html_ajax/cargar_tour_ajax.cfm",
		async:true, 
		data: "ciudad="+ciudad+"&aleat="+aleat,
		success: function(datos){
			$("#div_tour").html(datos);
		}
	});
}
/** cargar_citypic **/
main.cargar_citypic=function(text){
	$("#img_map_preview").attr("src",_img_map_preview);
	var idciudad = $.trim($("#ciudad_sel").val());
	var ciudad = text;
	var aleat = Math.random() * 9999999999999999;
	if(ciudad==''){
		return;
	}
	$.ajax({
		type: "POST",
		url: "http://myezplan.com/mobile/appdata/html_ajax/cargar_citypic_ajax.cfm",
		async:true, 
		data: "idciudad="+idciudad+"&aleat="+aleat,
		success: function(datos){
			if(datos != ""){
				$("#img_map_preview").attr("src",datos);
			}
		}
	});
}
function cargar_ultimo(valor){
	var tour = $("#tour_sel").val();
	var ciudad = $("#ciudad_sel").val();
}
function viewPlans(){
	var tourv = document.getElementById('tour_sel').value;
	var cityv = document.getElementById('ciudad_sel').value;
	var countryv = document.getElementById('estado_sel').value;
	if(tourv==null || tourv =='' || cityv==null || cityv =='' || countryv==null || countryv =='' || (cityv =='' && countryv =='' && tourv ==''  ) ){
		alert('Before continuing, you must select an Area.');
		return false;
	}
	window.location.href="map.cfm?mapa="+tourv+"&ciudad="+cityv;
	/*
	else{
		if(tourv==0){
			var _conf=false;
			if(global_countrymapcity!=0 && global_countrymapcity!=countryv){
				_conf=window.confirm("Do you want to change the country without saving your plan (Mix & Match)?");
				if(!_conf){
					window.location.href="mapcity.cfm";
					return;
				}
			}
			setCountryToMapCity_ajax(countryv,cityv,_conf);
			window.setTimeout("window.location.href='mapcity.cfm';",1000);
		}else{
			window.location.href="map.cfm?mapa="+tourv+"&ciudad="+cityv;
		}
	}
	*/
}
function viewPlanByCity(){
	var _url="mapcitypopup.html?ctid="
	var _conf=false;
	var _country=$.trim($("#estado_sel").val());
	var _city=$.trim($("#ciudad_sel").val());
	var _cityname=$("#ciudad_sel option[value="+_city+"]").text();
	if(_city=='' ){
		alert('Before continuing, you must select the City.');
		return;
	}
//	if(global_countrymapcity!=0 && global_countrymapcity!=_country){
//		_conf=window.confirm("Do you want to change the country without saving your plan?");
//		if(!_conf){
//			window.location.href="mapcity.cfm";
//		}
//	}
	setCountryToMapCity_ajax(_country,_city,_conf);
	//location.href=_url+_city+"&plid="+_country+"&cname="+_cityname;
	
	//app functionality width phonegap steroids. To normal web functionality uncomment the line above;
	localStorage._country	 = _country;
	localStorage._city	 = _city;
	localStorage._cityname = _cityname;
	_cityname = _cityname.replace(/ /g,':');
	webview_url= decodeURIComponent(_url+_city+"&plid="+_country+"&cname="+_cityname);
	var showStep2 = new steroids.views.WebView(webview_url);
	//showStep2.preload();
	steroids.layers.push(showStep2);
}
function viewHotDeals(){
	var _url="hotdeals.cfm?q=search&amp;";
	var _urlconfig="";
	var _urlhash="#SearchResults";
	var _country=$.trim($("#estado_sel").val());
	var _city=$.trim($("#ciudad_sel").val());
	var _tour=$.trim($("#tour_sel").val());
	if(_city=='' ){
		alert('Before continuing, you must select the City.');
		return;
	}
	if(_city!=''){
		_urlconfig+="city="+_city+"&";
	}
	if(_tour!=''){
		_urlconfig+="tour="+_tour+"&";
	}
	location.href=_url+_urlconfig+_urlhash;
}
getCountryFromMapCity_ajax_1=function(){
	var _url = "http://myezplan.com/data_ajax/map_city_ajax.cfm?rnu="+randomNumberUrl()+"";
	var _urlconfig = {action:"getcountry" };
	$.post(_url,_urlconfig)
		.error(getCountryFromMapCity_ajax_error_1)
		.success(getCountryFromMapCity_ajax_success_1)
	;
}
getCountryFromMapCity_ajax_error_1=function(xhr, ajaxOptions, thrownError){
	console.log(thrownError);
}
getCountryFromMapCity_ajax_success_1=function(response, status, xhr){
	var _response=$.parseJSON(response);
	global_countrymapcity=_response.MESSAGE;
}
function showPopupArea(){
	var _city=$.trim($("#ciudad_sel").val());
	if(_city=='' ){
		alert('Before continuing, you must select the City.');
		return;
	}
	var _cityname=$("#ciudad_sel option[value="+_city+"]").text();
	var $popup=$("#mappreview-box");
	$popup.fadeIn(300);
	var popMargTop=($popup.height() + 24) / 2; 
	var popMargLeft=($popup.width() + 24) / 2; 
	$popup.css({'margin-left':-popMargLeft});
	$('body').append('<div id="mask" class="mask"></div>');
	$popup.find(".box-header h1").html(_cityname);
	$('#mask').fadeIn(300);
}
$(document).ready(function(e) {
	getCountryFromMapCity_ajax_1();
	$("#linktobussines").click(function(e) {
		e.preventDefault();e.stopPropagation();
		alert("This feature will be available in the near future");
	});
	/* */
	$('.page-index #map-top-button-area').click( function(e) {
		e.preventDefault();e.stopPropagation();
		showPopupArea();
	});
	/* close mappreview-box */
	$('#mappreview-box a.close').click( function(e) { 
		e.preventDefault();e.stopPropagation();
		closePopup();
	});
	/* */
	$("#map-top-button-allareas").click(function(e) {
		e.preventDefault();e.stopPropagation();
		viewPlanByCity();
	});
	$("#more_opt_login").hide();
});
//$(window).load(function(e) {
//	$("#more_opt_login").hide();
//	 var login = 0
//	 	$("#btn_more_login").click(function(e){
////			 alert("buttom working");
//			  if (login==0){
//				 login=1;
//				 $("#more_opt_login").show();
//				 $('#btn_more_login').css("box-shadow", "inset 0px 0px 15px 4px #eee")		
//				 $('#btn_more_login').css("-moz-box-shadow", "inset 0px 0px 15px 4px #eee")
//				 $('#btn_more_login').css("-webkit-box-shadow", "inset 0px 0px 15px 4px #eee")
//				 	
//			 }else{
//				 login=0;
//				 $("#more_opt_login").hide();
//				 $('#btn_more_login').css("box-shadow", "inset 0px 0px 0px 0px #eee")		
//				 $('#btn_more_login').css("-moz-box-shadow", "inset 0px 0px 0px 0px #eee")
//				 $('#btn_more_login').css("-webkit-box-shadow", "inset 0px 0px 0px 0px #eee")
//				 }	  
//		     e.stopPropagation();
//		});
//		 $(".click_menu_intem").click(function(e){
//			 login=0;
//			$('#more_opt_login').hide();
//			$('#btn_more_login').css("box-shadow", "inset 0px 0px 0px 0px #eee")		
//			$('#btn_more_login').css("-moz-box-shadow", "inset 0px 0px 0px 0px #eee")
//			$('#btn_more_login').css("-webkit-box-shadow", "inset 0px 0px 0px 0px #eee")
//			 
//		 });
//			$( document ).on( 'click', function ( e ) {
//			if ( $( e.target ).closest( $('#more_opt_login') ).length === 0 ) {
//				login=0;
//				$('#more_opt_login').hide();
//				$('#btn_more_login').css("box-shadow", "inset 0px 0px 0px 0px #eee")		
//				$('#btn_more_login').css("-moz-box-shadow", "inset 0px 0px 0px 0px #eee")
//				$('#btn_more_login').css("-webkit-box-shadow", "inset 0px 0px 0px 0px #eee")
//    	 }	
//	});
//});
