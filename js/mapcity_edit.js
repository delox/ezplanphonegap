/* load global function */
global_addtocurrentplan=false;
mapcity.Gomyiti=function(){
window.location.href = "myitinerary.html";
}
mapcity.mapcityloadingimgagepath="images/loading.png";
advopt_faqEdit =function(){
	$('#box_advoptions_edit .advance_opt').hide();
	var_win_advopt=true;
		//alert(faqpage);//openPopupFAQ();
	$('#myeztravel-faq').showLoading("Please Wait,<br/>Retriving Topics...<br/>",false);
	$('body').append('<div id="mask-faq" class="mask-faq"></div>');
	var _url = "http://myezplan.com/mobile/appdata/data_ajax/faq_ajax_content.cfm?page=mapcity_advopt";
	var _urlconfig = {action:'Faq_index',edit:'edit'};
	//$('#editPlan_panel').append($('#myeztravel-faq'));
	$('#myeztravel-faq').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){
			case "error":
			$('#myeztravel-faq').empty();alert("We are sorry, There aren't any help files in this page");
			break;
			case "success":
			$('#mask-faq').css("z-index","1512");
			$('#mask-faq').fadeIn(0);
			$('#myeztravel-faq').fadeIn(0);
		}
	});
	return false;//alert('llega al final');
}
AudioTour_f=function(arg_url){
	//$('body').append('<div id="mask" class="mask"></div>');
	//$('#mask').fadeIn(0);
	//$("#boxaudiotour").fadeIn(0);
	$("#boxaudiotour").panel();
	$("#boxaudiotour").show();
	$("#boxaudiotour").panel('open');
	$("#boxaudiotour").find("#box-body").html('<iframe id="iframe_audiobox" width="560" height="315" frameborder="0" allowfullscreen></iframe>');
	$('#iframe_audiobox').showLoading("Please Wait,<br/>Searching For<br/>Audio Tour...",false);
	$('#iframe_audiobox').attr("src",arg_url);
	//$('#maskload').fadeOut(300);
	return false;
}
mapcity.getCookiePlaces=function(){
	var _pl=[];
	var _cookie=$.cookie(mapcity.selectorsEdit.cookieplaces);
	if(!($.isEmptyObject(_cookie))){
		mapcity.placesEdit.pl=_cookie.split(",");
		$.each(mapcity.placesEdit.pl,function(index,value){if($.isNumeric(value)){mapcity.placesEdit.pl[index]=parseInt(value);}});
		$(mapcity.selectorsEdit.pl).val(mapcity.placesEdit.pl.join(","));
	}else{mapcity.mapconfig.vacio= true;}
}
OpenmyItineraryToMap= function(arg_uiid){
		var popup = $("#shareitplans-box");
		$(popup).fadeOut(300);
		var popup = $("#mapplanscity-box2");
		$(popup).fadeIn(300);
		var popMargTop = ($(popup).height() + 24) / 2; 
		var popMargLeft = ($(popup).width() + 24) / 2; 
		$(popup).css({ 
			/*'margin-top' : -popMargTop+$(document).scrollTop(),*/
			/*'margin-left' : -popMargLeft*/
		});
//		$('body').append('<div id="mask" class="mask"></div>');
//		$('#mask').fadeIn(300);
		/* ------------------------ */
		var _urliframepopup = "myitineraryplansmappopup.cfm?uiid="+arg_uiid;
		$('#iframe_mapplanscity2').attr("src",_urliframepopup);
		$('#iframe_mapplanscity2').fadeIn(300);
		return false;
		}
OpenmyItineraryToMap2= function(arg_uiid){
		var popup = $("#shareitplans-box2");
		$(popup).fadeOut(300);
		var popup = $("#mapplanscity-box3");
		$(popup).fadeIn(300);
		var popMargTop = ($(popup).height() + 24) / 2; 
		var popMargLeft = ($(popup).width() + 24) / 2; 
		$(popup).css({ 
			'margin-top' : -popMargTop+$(document).scrollTop(),
			'margin-left' : -popMargLeft
		});
//		$('body').append('<div id="mask" class="mask"></div>');
//		$('#mask').fadeIn(300);
		/* ------------------------ */
		var _urliframepopup = "myitineraryplansmappopup.cfm?uiid="+arg_uiid;
		$('#iframe_mapplanscity3').attr("src",_urliframepopup);
		$('#iframe_mapplanscity3').fadeIn(300);
		return false;
		}

OpenmyPlanToMap=function(url,pais,ciudad){
var url_ = url.replace('mapcity.cfm?','?');
var _cookie_pl=decodeURIComponent(getUrlStringParamValue(url,"pl"));
$('#myuserplan-box').hide();
var _countryid = pais;
var _cityid = ciudad;
setCountryToMapCity_ajax(_countryid,_cityid,true);
mapcity.countryid=_countryid;
mapcity.cityid=_cityid;
$.cookie("EZMAPCITYQUERY_edit",url_);
$.cookie("EZMAPCITYSAVELOAD", 'SAVED');
//		mapcity.placesEdit.pl=_cookie_pl.split(",");
//		$.each(mapcity.placesEdit.pl,function(index,value){if($.isNumeric(value)){mapcity.placesEdit.pl[index]=parseInt(value);}});
//		$(mapcity.selectorsEdit.pl).val(mapcity.placesEdit.pl.join(","));
		mapcity.placesEdit.pl=_cookie_pl.split(",");
		$.each(mapcity.placesEdit.pl,function(index,value){if($.isNumeric(value)){
		var _url = "http://myezplan.com/mobile/appdata/data_ajax/map_city_ajax.cfm?rnu="+randomNumberUrl()+"";
		var _urlconfig = {pid:value,action:"add"};
		$.post(_url,_urlconfig)
		}});
$('#mask').remove();
window.setTimeout("mapcity.initPage();",10);
$(mapcity.selectorsEdit.city)=_cityid;
mapcity.getPlansByCity();
mapcity.updateMapCityConfig();
mapcity.getCookieQuery();
mapcity.getPlaces();
mapcity.routeMap();
}
mapcity.setCookieQuery=function(){
//	var loginafter=$.cookie("EZMAPCITYLOGINAFTER");
//	var loginafter2=$.cookie("EZMAPCITYSAVELOGIN");
//	var loads = $.cookie(mapcity.selectorsEdit.cookieload);
//	if (loads != 'SAVED' && loginafter != 'LOGIN' && loginafter2 !='LOGIN'){$.cookie(mapcity.selectorsEdit.cookiequery, mapcity.pageurlEdit.getUrlQuery());}
	$.cookie(mapcity.selectorsEdit.cookiequery_edit, mapcity.pageurlEdit.getUrlQuery());
	var _cookie=$.cookie(mapcity.selectorsEdit.cookiequery_edit);
	//alert(_cookie);
	return mapcity.getCookieQuery();
}
mapcity.getCookieQuery=function(arg_renewcookie){
	var _renewcookie=(typeof(arg_renewcookie)=="boolean")?arg_renewcookie:false;
	if(_renewcookie){mapcity.setCookieQuery();}
	//var _cookie=$.cookie(mapcity.selectorsEdit.cookiequery);
	var _cookie = window.myUrl;
	//alert('aqui es el fish'+_cookie);
	//console.log(_cookie);
	var _cookie_plse=decodeURIComponent(getUrlStringParamValue(_cookie,"plse"));
	if(!($.isEmptyObject(_cookie_plse))){
		mapcity.placesEdit.plse=_cookie_plse.split(",");
		$.each(mapcity.placesEdit.plse,function(index,value){if($.isNumeric(value)){mapcity.placesEdit.plse[index]=parseInt(value);}});
	}
	var _cookie_plom=decodeURIComponent(getUrlStringParamValue(_cookie,"plom"));
	if(!($.isEmptyObject(_cookie_plom))){
		mapcity.placesEdit.plom=_cookie_plom.split(",");
		$.each(mapcity.placesEdit.plom,function(index,value){
			if($.isNumeric(value)){
				mapcity.placesEdit.plom[index]=parseInt(value);
			}
		});
	}
	mapcity.placesEdit.sp=decodeURIComponent(getUrlStringParamValue(_cookie,"sp"));
	mapcity.placesEdit.ep=decodeURIComponent(getUrlStringParamValue(_cookie,"ep"));
	mapcity.placesEdit.gotm=decodeURIComponent(getUrlStringParamValue(_cookie,"gotm")) || mapcity.mapconfig.maptravelmode;
	mapcity.placesEdit.upid=decodeURIComponent(getUrlStringParamValue(_cookie,"upid"));
	mapcity.placesEdit.edit=decodeURIComponent(getUrlStringParamValue(_cookie,"edit"));
	mapcity.placesEdit.cname=decodeURIComponent(getUrlStringParamValue(_cookie,"cname"));
	window.cnameEdit = mapcity.placesEdit.cname;
	return _cookie;
}
mapcity.setUPID=function(arg_upid){
	mapcity.placesEdit.upid=arg_upid;
	$(mapcity.selectorsEdit.upid).val(arg_upid);
	var c_query='?sp='+mapcity.placesEdit.sp+'&ep='+mapcity.placesEdit.ep+'&gotm='+mapcity.placesEdit.gotm+'&pl='+mapcity.placesEdit.pl.join(",")+'&plse='+mapcity.placesEdit.plse.join(",")+'&upid='+arg_upid;
	$.cookie("EZMAPCITYQUERY_edit",c_query)
	//alert(c_query);
	mapcity.setCookieQuery();
}
mapcity.cleanUPID=function(){
	mapcity.placesEdit.upid=0;
	$(mapcity.selectorsEdit.upid).val(0);
	var c_query='';
	$.cookie("EZMAPCITYQUERY_edit",c_query)
}
mapcity.isFormValidToProcess=function(){
	if(
		 mapcity.placesEdit.sp==""
	|| mapcity.placesEdit.ep==""
	|| mapcity.placesEdit.plse==""
	|| mapcity.placesEdit.gotm==""
	){
		return false;
	}
	return true;
}
mapcity.changePageVariablesEdit=function(){
	mapcity.pageurlEdit.cityname=window.cnameEdit;
	$(document).attr("title","Things to do in " + mapcity.cityname);
	$("#pageheadercityname").html(mapcity.cityname);
	$("#mapplanscity-box #city-name").html(mapcity.cityname);
}
mapcity.getCitiesByCountry=function(){
	var _select=$(mapcity.selectorsEdit.city);
	myezplan.forms.select.removeOptionsByJqueySelector($(_select.selector+" option[value!='']"));
	//myezplan.forms.select.removeAllOptions(_select);
	mapcity.getCitiesByCountry_Ajax();
}
mapcity.getCitiesByCountry_Ajax=function(){
	var _url = "http://myezplan.com/mobile/appdata/cfc/applocation.cfc";
	//var _urlconfig = {method:"getCitiesByCountry_json",countryid:mapcity.countryid};
	var _urlconfig = {method:"getCitiesByCountry_json",countryid:window.plaid};
	var _select=$(mapcity.selectorsEdit.city);
	$.getJSON(_url,_urlconfig)
		.error(myezplan.utils.ajaxError)
		.success(function(response, status, xhr){
			var _map=$.map( response.data, function( item ) {return {name:item.name,id:item.id}});
			myezplan.forms.select.addOptionsMapNameId(_select,_map);
			var _option=myezplan.forms.select.selectByValue(_select,mapcity.cityid,true);
			if(_option.length>0){_select.change();}
		});
	;
}
mapcity.getPlansByCity=function(){
	var _select=$(mapcity.selectorsEdit.city);
	mapcity.cityid=_select.val();
	if(mapcity.cityid!="0"){
		mapcity.cityname=$(_select.selector+" option:selected").text();
		mapcity.changePageVariablesEdit();
		mapcity.getPlansByCity_Ajax(mapcity.cityid);
	}
}
mapcity.getPlansByCity_Ajax=function(arg_cityid){
	$(mapcity.selectorsEdit.plan).ddslick('destroy');
	var _url = "http://myezplan.com/mobile/appdata/cfc/mapcity.cfc";
	var _urlconfig = {method:"getPlansByCity_json",cityid:arg_cityid};
	$.getJSON(_url,_urlconfig)
		.error(myezplan.utils.ajaxError)
		.success(function(response, status, xhr){
			$(mapcity.selectorsEdit.plan).ddslick({
				data:response.data,
				width:"100%",
				selectText:"Select an Area",
				truncateDescription:true,
				onSelected: function (data) {
					mapcity.showPopupMapCityPopup(arg_cityid,data.selectedData.value);
				}
			});
			if(mapcity.placesEdit.pl.length==0 && mapcity.cityname!=""){
				$(mapcity.selectorsEdit.plan).ddslick('open');
				$("div.loadi").show(0);
			}
		});
	;
};
mapcity.getUserPlanName=function(){
	if(!mapcity.placesEdit.upid){return;}
	var _url="http://myezplan.com/mobile/appdata/cfc/mapcity.cfc";
	var _urlconfig={method:"getUserPlanNameById_json",upid:mapcity.placesEdit.upid};
	$.getJSON(_url,_urlconfig)
		.error(myezplan.utils.ajaxError)
		.success(function(response, status, xhr){
			if(response.count>0){
				var _data=response.data[0];
				mapcity.placesEdit.upname=_data.up_name;
				$("#map-top-planname").text("-"+mapcity.placesEdit.upname);
			}
		});
	;
};

mapcity.updateMapCityConfig=function(){
	var $select=$(mapcity.selectorsEdit.city);
	mapcity.cityid=$select.val();
	if(mapcity.cityid!="0"){
		mapcity.updateMapCityConfig_ajax(mapcity.cityid);
	}
}
mapcity.updateMapCityConfig_ajax=function(){
	var _url = "http://myezplan.com/mobile/appdata/cfc/applocation.cfc";
	var _urlconfig = {method:"getCityById_json",cityid:mapcity.cityid};
	var $select=$(mapcity.selectorsEdit.city);
	$.getJSON(_url,_urlconfig)
		.error(myezplan.utils.ajaxError)
		.success(function(response, status, xhr){
			//console.log(response);
			if(response.count>0){
			var _data=response.data[0];
			$("#mapcityloadingimgage").prop("src",mapcity.mapcityloadingimgagepath);$("#big_box_header").css("background-image","");$("#large_box_footer").css("background-image","");$("#footer_box").css("background-image","");
			if(_data.city_loadingbanner){
			var ldng=_data.city_loadingbanner;
			var n=ldng.search("http");
				if(n==0){
					$("#mapcityloadingimgage").prop("src", _data.city_loadingbanner);
					}
				else{	
				$("#mapcityloadingimgage").prop("src",myezplan.pathmapscity + _data.city_loadingbanner);
				};}
			if(_data.city_upperbanner){
				var upb=_data.city_upperbanner;
				var n1=upb.search("http");
				 if(n1==0){
				$("#big_box_header").css("background-image",'url(' + _data.city_upperbanner + ')')	 
					 }
				 else{
				 $("#big_box_header").css("background-image",'url(' + myezplan.pathmapscity + _data.city_upperbanner + ')') 
				 };}
			if(_data.city_lowerbanner){
				var lwr=_data.city_lowerbanner
				var n2=lwr.search("http");
				 if(n2==0){
				$("#large_box_footer").css("background-image",'url(' + _data.city_lowerbanner + ')')	 
					 }
				 else{
				 $("#large_box_footer").css("background-image",'url(' + myezplan.pathmapscity + _data.city_lowerbanner + ')') 
				 };}
			if(_data.city_lowerleftbanner){
				var lwrl=_data.city_lowerleftbanner
				var n3=lwrl.search("http");
				 if(n3==0){
				$("#footer_box").css("background-image",'url(' + _data.city_lowerleftbanner + ')')	 
					 }
				 else{
				 $("#footer_box").css("background-image",'url(' + myezplan.pathmapscity + _data.city_lowerleftbanner + ')') 
				 };}			}
		});
	;
};

mapcity.showPopupMapCityPopup=function(centro_lat,centro_long) {
var _url = "http://myezplan.com/mobile/appdata/cfc/mapcity.cfc";
	var _urlconfig = {method:"getPlacesByIdGroupedByCity",pids:mapcity.placesEdit.pl.join(",")};
	//var _urlconfig = {method:"getPlacesByIdGroupedByCity",pids:"435,444,472,540,573,579"};
	var $canvas=$("#places_list_edit");
	$.getJSON(_url,_urlconfig)
	
	
	
		.error(myezplan.utils.ajaxError)
		.success(function(response, status, xhr){
			var _data = response.data[0];
			var _tablecity="";
			if(_data){
				mapcity.loading=true;
				mapcity.mapconfig.mapchanged=true;
				mapcity.getCookieQuery();
				/* clean map to redraw */
				//$(mapcity.selectorsEdit.pl).val("");
				$(mapcity.selectorsEdit.plse).val("");
				$(mapcity.selectorsEdit.plom).val("");
				$.each(mapcity.mapconfig.markers,function(index,value){
					value.setMap(null);
				});
				
				mapcity.mapconfig.markers=[];
				mapcity.mapconfig.mapcenter=null;
				if(mapcity.mapconfig.google.directionsdisplay){
					mapcity.mapconfig.google.directionsdisplay.setMap(null);
					mapcity.mapconfig.google.directionsdisplay=null;
				}
				
				var _countericon=0;
				/*var centro_lat = value2.lat;
				var centro_long = value2.lon;*/
			
				$.each(_data,function(index1,value1){
					_tablecity+='<table id="menu_place_table" class="table" cellspacing="0"><caption class="tc bold">' + index1 + '</caption>'; 
					
					$.each(value1,function(index2,value2){
						_countericon++;_icon=mapcity.pathtoicon+"basic/"+_countericon+"b.png";
					
						myezplan.maps.createMyezplanMarker(value2.ruta_id, new google.maps.LatLng(value2.lat,value2.lon),value2.ruta_name,_icon,null,mapcity.mapconfig.markers);
						myezplan.maps.config.mapcenter=new google.maps.LatLng(centro_lat,centro_long);
						
						_tablecity+='<tr>';
						_tablecity+='<td class="t1"><input id="plsecheck" type="checkbox" value="'+value2.ruta_id+'" class="plsecheck cursor formitemchanged checkplaceadd" title="Click Here to add/remove this place from route" data-id="'+value2.ruta_id+'" data-name="'+value2.ruta_name+'" /></td>';
						/*_tablecity+='<td>'+value2.lat+'</td>';
						_tablecity+='<td>'+value2.lon+'</td>';
						_tablecity+='<td><input class="button-round-2 button-round-blue2" type="button" name="Boton1" value="'+index1+'" OnClick="mapcity.nextPlaces('+value2.lat+','+value2.lon+');"></td>';*/
						
						var largonombre = value2.ruta_name.length;
						if (largonombre>38){var nombrefull = value2.ruta_name.substr(0,35)+'...';}
						else{var nombrefull = value2.ruta_name}
						_tablecity+='<td class="placetooltip" data-tipicon="'+_icon+'" data-tipprov="'+value2.serviceprovider_id+'" data-tipname="'+value2.ruta_name+'" data-tipname="'+value2.ruta_name+'" data-tipimage="'+value2.info_imageurl+'" data-tiptype="'+value2.detail_type+'" data-id="'+value2.ruta_id+'" data-idunico="'+value2.ruta_idunico+'" ><table class="table"><tr><td class="t2"><img aligin="middle" src="'+ _icon + '" class="cursor img-checkbox-point" /></td><td class="t3">' + nombrefull + '</td></tr></table></td>';
						_tablecity+='<th class="t4 cursor textredmyezplan imgplaceremove" /*title="Remove from plan"*/ data-id="'+value2.ruta_id+'" data-name="'+value2.ruta_name+'" >&times;</th>';
						_tablecity+='</tr>';
					});
					_tablecity+='</table>'; 
				});
				myezplan.forms.select.removeAllOptions($(mapcity.selectorsEdit.sp));
				myezplan.forms.select.removeAllOptions($(mapcity.selectorsEdit.ep));
				if(mapcity.mapconfig.google.map){
					//myLocationControlAdd(mapcity.mapconfig.google.map);
					//mapcity.mapconfig.mapzoom=mapcity.mapconfig.google.map.getZoom();
					//mapcity.mapconfig.mapcenter=mapcity.mapconfig.google.map.getCenter();
				}
				$canvas.html(_tablecity);
				//$("#places_list_edit .checkplaceadd").prop("checked",true);
				//$("#places_list_edit .checkplaceadd").click();
				//console.log(mapcity.placesEdit);
				$("#places_list_edit .checkplaceadd").each(function(index, element) {
					mapcity.addToMapCity(element,"load");
				});
				//mapcity.setCookieQuery();
				//mapcity.sortSelectsWhereTo();
				if(
					mapcity.placesEdit.sp=="" 
					|| mapcity.placesEdit.ep=="" 
					|| !(mapcity.placesEdit.userselection.changed) 
					|| ($.trim(mapcity.placesEdit.sp)===$.trim(mapcity.placesEdit.ep))&&!(mapcity.placesEdit.userselection.changed)
				){
					//alert('entra aqui');
					console.log("Sort By Lat");
					mapcity.sortSelectsWhereTo();
					$(mapcity.selectorsEdit.gotm).val("WALKING");
				}
			}
			mapcity.loading=true;
			/*
			$.each(mapcity.placesEdit.plse,function(index,value){
				$("#places_list_edit .checkplaceadd[value='"+value+"']").click();
			});
			*/
				/*
			$.each(mapcity.placesEdit.plom,function(index,value){
				$("#places_list_edit .checkplaceadd[value='"+value+"']").each(function(index1, element) {
					$("#places_list_edit .checkplaceadd[value='"+value+"']").prop("checked",true);
					mapcity.addToMapCity(element,"load");
				});
				$("#places_list_edit .checkplaceadd[value='"+value+"']").click();
			});
				*/
			///*
			$(mapcity.selectorsEdit.sp).val(mapcity.placesEdit.sp);
			$(mapcity.selectorsEdit.ep).val(mapcity.placesEdit.ep);
			//*/
			if(mapcity.placesEdit.userselection.changed){
				$(mapcity.selectorsEdit.gotm).val(mapcity.placesEdit.gotm);}
			$(mapcity.selectorsEdit.upid).val(mapcity.placesEdit.upid);
			mapcity.setCookieQuery();
			mapcity.getUserPlanName();
			
			
			if(mapcity.placesEdit.pl.length==0 && mapcity.cityid=="0"){
				//$('a#menu-home').click();
				$("#mapcitycity-box").slideDown("slow");
				$('body').append('<div id="mask" class="mask"></div>');
				$('#mask').fadeIn(300);
			}else{
				$("div.loadi").hide(0);
				mapcity.initMap();
			}
			mapcity.loading=false;
		});
	;


}
mapcity.getPlaces_mapaEdit=function(){
$('#middle_mapcityandcheck_edit').showLoading("Please Wait,<br/>Searching Route<br/>For You...",false);
	var $canvas=$("#places_list_edit");
	$canvas.empty()
var ordenaruta=0;
var rutanueva=0;
guarda_=false;
//ifs para saber si modificar la ruta o dejarla tal como esta
//alert('/'+mapcity.placesEdit.sp+'/'+mapcity.placesEdit.ep+'/'+mapcity.mapconfig.ruta);
//alert(mapcity.placesEdit.plse.join(','));
if(mapcity.placesEdit.sp!="" && mapcity.placesEdit.ep!="" && !mapcity.mapconfig.ruta){var rutanueva=1;var ordenaruta=1;
guarda_=true;plse_=mapcity.placesEdit.plse.join(',');pl_=mapcity.placesEdit.pl.join(',');sp_=mapcity.placesEdit.sp;ep_ =mapcity.placesEdit.ep;_gotm=mapcity.placesEdit.gotm;}
if(mapcity.placesEdit.sp=="" && mapcity.placesEdit.ep=="" && !mapcity.mapconfig.ruta){var rutanueva=0;var ordenaruta=0;}
if(mapcity.placesEdit.sp!="" && mapcity.placesEdit.ep!="" && mapcity.mapconfig.ruta){var rutanueva=0;var ordenaruta=1;
guarda_=true;plse_=mapcity.placesEdit.plse.join(',');pl_=mapcity.placesEdit.pl.join(',');sp_=mapcity.placesEdit.sp;ep_ =mapcity.placesEdit.ep;_gotm=mapcity.placesEdit.gotm;}
if(mapcity.placesEdit.sp==0 && mapcity.placesEdit.ep==0 && mapcity.mapconfig.ruta){var rutanueva=1;var ordenaruta=1;
guarda_=true;plse_=mapcity.placesEdit.plse.join(',');pl_=mapcity.placesEdit.pl.join(',');sp_=mapcity.placesEdit.sp;ep_ =mapcity.placesEdit.ep;_gotm=mapcity.placesEdit.gotm;}
//trae los valores de la cookie
mapcity.getCookiePlaces();
if(mapcity.placesEdit.plse==''){mapcity.placesEdit.plse=mapcity.placesEdit.pl;}
if(mapcity.placesEdit.pl==''){mapcity.placesEdit.pl=mapcity.placesEdit.plse;}
//trae el plan id si existe
if(mapcity.placesEdit.upid==0 || mapcity.placesEdit.upid==''){mapcity.getCookieQuery();}
//alert(ordenaruta+' '+rutanueva)alert('lolo')
if(ordenaruta==0){//
	latmas=-1000;
	latmenos=1000;
var haynopersonal=0
for(pp=0;pp<mapcity.placesEdit.plse.length;pp++){
if(mapcity.placesEdit.plse[pp]>5){var haynopersonal=1;}
}
//alert(haynopersonal);
if(haynopersonal==1){
	var _url = "http://myezplan.com/mobile/appdata/cfc/mapcity.cfc";
	var _urlconfig = {method:"getPlacesByIdGroupedByCity",pids:mapcity.placesEdit.plse.join(","),ruta:rutanueva,sp:mapcity.placesEdit.sp,ep:mapcity.placesEdit.ep};
	$.getJSON(_url,_urlconfig)
		.error(myezplan.utils.ajaxError)
		.success(function(response, status, xhr){
			var _data = response.data[0];
				$.each(_data,function(index1,value1){
					//alert(index1+' '+value1);
					$.each(value1,function(index2,value2){
						if( value2.lat > latmas && rutanueva==0){latmas=value2.lat;mapcity.placesEdit.ep=value2.ruta_id;}
						if( value2.lat < latmenos && rutanueva==0){latmenos =value2.lat;mapcity.placesEdit.sp=value2.ruta_id;}
						});
					});
			var coopersonal=$.cookie("EZPERSONAL");
			var plp='';
			if(coopersonal && coopersonal!=''){
				var coper=coopersonal.split('!');
				for (co=0;co<coper.length;co++){
					var coper_=coper[co].split('*');
					var titulo=coper_[0];
					var mpos=coper_[1];
					var mpos_=mpos.replace('(','').replace(')','').split(',')
					if( mpos_[0] > latmas && rutanueva==0){latmas=mpos_[0];mapcity.placesEdit.ep=co+1;}
					if( mpos_[0] < latmenos && rutanueva==0){latmenos =mpos_[0];mapcity.placesEdit.sp=co+1;}
					//mapcity.placesEdit.plse.push(co+1)
					if(plp==''){var div='';}else{var div ='!';}
					var plp=plp+div+(co+1)+'*'+coper[co]					
				}
			}			
					mapcity.getPlaces_ajax_map_edit(mapcity.placesEdit.pl.join(","),mapcity.placesEdit.plse.join(","),mapcity.placesEdit.sp,mapcity.placesEdit.ep,rutanueva,mapcity.placesEdit.gotm,plp,mapcity.placesEdit.edit);
									})
}else{
			var coopersonal=$.cookie("EZPERSONAL");
			var plp='';
			if(coopersonal && coopersonal!=''){
				var coper=coopersonal.split('!');
				for (co=0;co<coper.length;co++){
					var coper_=coper[co].split('*');
					var titulo=coper_[0];
					var mpos=coper_[1];
					var mpos_=mpos.replace('(','').replace(')','').split(',')
					if( mpos_[0] > latmas && rutanueva==0){latmas=mpos_[0];mapcity.placesEdit.ep=co+1;}
					if( mpos_[0] < latmenos && rutanueva==0){latmenos =mpos_[0];mapcity.placesEdit.sp=co+1;}
					//mapcity.placesEdit.plse.push(co+1)
					if(plp==''){var div='';}else{var div ='!';}
					var plp=plp+div+(co+1)+'*'+coper[co]					
				}
			}			
					mapcity.getPlaces_ajax_map_edit(mapcity.placesEdit.pl.join(","),mapcity.placesEdit.plse.join(","),mapcity.placesEdit.sp,mapcity.placesEdit.ep,rutanueva,mapcity.placesEdit.gotm,plp,mapcity.placesEdit.edit);	
	}
}
else{
	if(guarda_){mapcity.placesEdit.pl=pl_.split(',');mapcity.placesEdit.plse=plse_.split(',');mapcity.placesEdit.sp=sp_;mapcity.placesEdit.ep=ep_;mapcity.placesEdit.gotm=_gotm;}
			var coopersonal=$.cookie("EZPERSONAL");
			var plp='';
			if(coopersonal && coopersonal!=''){
				var coper=coopersonal.split('!');
				for (co=0;co<coper.length;co++){
					var coper_=coper[co].split('*');
					if(plp==''){var div='';}else{var div ='!';}
					var plp=plp+div+(co+1)+'*'+coper[co]
					//mapcity.placesEdit.plse.push(co+1)					
				}
			}
	mapcity.getPlaces_ajax_map_edit(mapcity.placesEdit.pl.join(","),mapcity.placesEdit.plse.join(","),mapcity.placesEdit.sp,mapcity.placesEdit.ep,rutanueva,mapcity.placesEdit.gotm,plp,mapcity.placesEdit.edit);
}
}
mapcity.getPlaces_ajax_map_edit=function(pids,plse,sp,ep,ruta,gotm,plp,edit){
if(plse=='' && sp ==0 && ep==0){ var ruta = 2;}
change=0;
//alert(pids+' '+plse+' '+sp+' '+ep+' '+ruta+' '+plp);
if(plse !=''){
var placescount=plse.split(',');
if(placescount.length>10){
alert('This route is bigger than permited(10), all places will be included but only 10 will be in route')
var plse_new=[];
var pl_add=[];
var countplse=1;
for(y=0;y<placescount.length;y++){
if(placescount[y]!=sp && placescount[y]!=ep && countplse<=8){countplse=countplse+1;plse_new.push(placescount[y]);}
//if(placescount[y]!=sp && placescount[y]!=ep && countplse>8){pl_add.push(placescount[y]);}
}
plse=plse_new.join(',');
//var div=',';
//if(pids==''){var div='';};
//var pids=pids+div+pl_add.join[','];
}
}
//alert('sp/'+sp+'/'+'ep/'+ep+'/'+'pl/'+pids+'/'+'plse/'+plse+'plp/'+plp)
var plse_=plse.split(',')
var haycero=0;
for(z=0;z<plse_.length;z++){
if(plse_[z]==0){haycero=1;}
}
if(haycero==1){
for(z=0;z<plse_.length;z++){
if(plse_[z]<5){plse_[z]=parseInt(plse_[z])+1;}
}
	}
plse=plse_.join(',');
//alert('sp/'+sp+'/'+'ep/'+ep+'/'+'pl/'+pids+'/'+'plse/'+plse+'plp/'+plp)	
var c_query='?sp='+sp+'&ep='+ep+'&gotm='+gotm+'&pl='+pids+'&plse='+plse+'&upid='+mapcity.placesEdit.upid;
	$.cookie("EZMAPCITYQUERY_edit",c_query)
	mapcity.selectorsEdit.cookiequery_edit=c_query;
	var showtransport=$.cookie("EZTRANSPORT") || '';
	var showservices=$.cookie("EZSERVICES") || '';
	var _url = "http://myezplan.com/mobile/appdata/data_ajax/mapcity_content.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'Get_Plan_map_list',cityid:window.citid,pids:pids,plse:plse,sp:sp,ep:ep,ruta:ruta,gotm:gotm,upid:mapcity.placesEdit.upid,plp:plp,transport:showtransport,services:showservices,edit:edit};
	//var _urlconfig = {action:'Get_Plan_map_list',cityid:mapcity.cityid,pids:pids,plse:plse,sp:sp,ep:ep,ruta:ruta,gotm:gotm,upid:mapcity.placesEdit.upid,plp:plp,transport:showtransport,services:showservices};
	$('#middle_mapcityandcheck_edit').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$('#route_plan').empty();
		break;
		}
	});
}
mapcity.getPlaces=function(){
	var $canvas=$("#places_list_edit");
	$canvas.empty()
	mapcity.getCookiePlaces();
	mapcity.getPlaces_Ajax(mapcity.cityid);
}

mapcity.nextPlaces=function(){
	var $canvas=$("#places_list_edit");
	$canvas.empty()
	mapcity.getCookiePlaces();
	mapcity.getPlaces_Ajax(mapcity.cityid);
}
mapcity.getPlaces_Ajax=function(arg_cityid){
	var _url = "http://myezplan.com/mobile/appdata/cfc/mapcity.cfc";
	var _urlconfig = {method:"getPlacesByIdGroupedByCity",pids:mapcity.placesEdit.pl.join(",")};
	//var _urlconfig = {method:"getPlacesByIdGroupedByCity",pids:"435,444,472,540,573,579"};
	var $canvas=$("#places_list_edit");
	$.getJSON(_url,_urlconfig)
	
	
	
		.error(myezplan.utils.ajaxError)
		.success(function(response, status, xhr){
			var _data = response.data[0];
			var _tablecity="";
			if(_data){
				mapcity.loading=true;
				mapcity.mapconfig.mapchanged=true;
				mapcity.getCookieQuery();
				/* clean map to redraw */
				//$(mapcity.selectorsEdit.pl).val("");
				$(mapcity.selectorsEdit.plse).val("");
				$(mapcity.selectorsEdit.plom).val("");
				$.each(mapcity.mapconfig.markers,function(index,value){
					value.setMap(null);
				});
				
				mapcity.mapconfig.markers=[];
				mapcity.mapconfig.mapcenter=null;
				if(mapcity.mapconfig.google.directionsdisplay){
					mapcity.mapconfig.google.directionsdisplay.setMap(null);
					mapcity.mapconfig.google.directionsdisplay=null;
				}
				
				var _countericon=0;
				var centro_lat = 42.118599;
				var centro_long = -5.109501;
			
				$.each(_data,function(index1,value1){
					_tablecity+='<table id="menu_place_table" class="table" cellspacing="0"><caption class="tc bold">' + index1 + '</caption>'; 
					
					$.each(value1,function(index2,value2){
						_countericon++;_icon=mapcity.pathtoicon+"basic/"+_countericon+".png";
						if(index2==0 && mapcity.mapconfig.mapcenter==null){
							mapcity.mapconfig.mapcenter=new google.maps.LatLng(value2.centro_mapa1,value2.centro_mapa2);
						}
						myezplan.maps.showInfoplaceMyezplanMarker(myezplan.maps.createMyezplanMarker(value2.ruta_id, new google.maps.LatLng(value2.lat,value2.lon),value2.ruta_name,_icon,null,mapcity.mapconfig.markers),value2.ruta_idunico,value2.ruta_id, 'mapcity');
						_tablecity+='<tr>';
						_tablecity+='<td class="t1"><input id="'+value2.ruta_idunico+'" type="checkbox" value="'+value2.ruta_id+'" class="plsecheck cursor formitemchanged checkplaceadd squaredTwo squaredTwoMediano" title="Click Here to add/remove this place from route" data-id="'+value2.ruta_id+'" data-name="'+value2.ruta_name+'" /><label for="'+value2.ruta_idunico+'"></label></td>';
						/*_tablecity+='<td>'+value2.lat+'</td>';
						_tablecity+='<td>'+value2.lon+'</td>';
						_tablecity+='<td><input class="button-round-2 button-round-blue2" type="button" name="Boton1" value="'+index1+'" OnClick="mapcity.showPopupMapCityPopup('+value2.lat+','+value2.lon+');"></td>';
						_tablecity+='<td>'+value2.ruta_id+'</td> ';
						_tablecity+='<td>---</td> ';
						
						_tablecity+='<td>'+value2.coordenadas+'</td> ';*/
						
						var largonombre = value2.ruta_name.length;
						if (largonombre>38){var nombrefull = value2.ruta_name.substr(0,35)+'...';}
						else{var nombrefull = value2.ruta_name}
						_tablecity+='<td class="placetooltip" data-tipicon="'+_icon+'" data-tipprov="'+value2.serviceprovider_id+'" data-tipname="'+value2.ruta_name+'" data-tipname="'+value2.ruta_name+'" data-tipimage="'+value2.info_imageurl+'" data-tiptype="'+value2.detail_type+'" data-id="'+value2.ruta_id+'" data-idunico="'+value2.ruta_idunico+'" ><table class="table"><tr><td class="t2"><img aligin="middle" src="'+ _icon + '" class="cursor img-checkbox-point" /></td><td class="t3">' + nombrefull + '<br> <h4>Type: '+value2.detail_type+'</h4></label></div></td><td id="table_img"> <img  src='+value2.info_imageurl+'></td></tr></table></td>';
						_tablecity+='<th class="t4 cursor textredmyezplan imgplaceremove" /*title="Remove from plan" */data-id="'+value2.ruta_id+'" data-name="'+value2.ruta_name+'" >&times;</th>';
						_tablecity+='</tr>';
					});
					
					
					_tablecity+='</table>'; 
				});
				myezplan.forms.select.removeAllOptions($(mapcity.selectorsEdit.sp));
				myezplan.forms.select.removeAllOptions($(mapcity.selectorsEdit.ep));
				if(mapcity.mapconfig.google.map){
					//myLocationControlAdd(mapcity.mapconfig.google.map);
					//mapcity.mapconfig.mapzoom=mapcity.mapconfig.google.map.getZoom();
					//mapcity.mapconfig.mapcenter=mapcity.mapconfig.google.map.getCenter();
				}
				$canvas.html(_tablecity);
				//$("#places_list_edit .checkplaceadd").prop("checked",true);
				//$("#places_list_edit .checkplaceadd").click();
				//console.log(mapcity.placesEdit);
				$("#places_list_edit .checkplaceadd").each(function(index, element) {
					mapcity.addToMapCity(element,"load");
				});
				//mapcity.setCookieQuery();
				//mapcity.sortSelectsWhereTo();
				if(
					mapcity.placesEdit.sp=="" 
					|| mapcity.placesEdit.ep=="" 
					|| !(mapcity.placesEdit.userselection.changed) 
					|| ($.trim(mapcity.placesEdit.sp)===$.trim(mapcity.placesEdit.ep))&&!(mapcity.placesEdit.userselection.changed)
				){
					//alert('entra aqui');
					console.log("Sort By Lat");
					mapcity.sortSelectsWhereTo();
					$(mapcity.selectorsEdit.gotm).val("WALKING");
				}
			}
			mapcity.loading=true;
			/*
			$.each(mapcity.placesEdit.plse,function(index,value){
				$("#places_list_edit .checkplaceadd[value='"+value+"']").click();
			});
			*/
				/*
			$.each(mapcity.placesEdit.plom,function(index,value){
				$("#places_list_edit .checkplaceadd[value='"+value+"']").each(function(index1, element) {
					$("#places_list_edit .checkplaceadd[value='"+value+"']").prop("checked",true);
					mapcity.addToMapCity(element,"load");
				});
				$("#places_list_edit .checkplaceadd[value='"+value+"']").click();
			});
				*/
			///*
			$(mapcity.selectorsEdit.sp).val(mapcity.placesEdit.sp);
			$(mapcity.selectorsEdit.ep).val(mapcity.placesEdit.ep);
			//*/
			if(mapcity.placesEdit.userselection.changed){
				$(mapcity.selectorsEdit.gotm).val(mapcity.placesEdit.gotm);}
			$(mapcity.selectorsEdit.upid).val(mapcity.placesEdit.upid);
			mapcity.setCookieQuery();
			mapcity.getUserPlanName();
			
			
			if(mapcity.placesEdit.pl.length==0 && mapcity.cityid=="0"){
				//$('a#menu-home').click();
				$("#mapcitycity-box").slideDown("slow");
				$('body').append('<div id="mask" class="mask"></div>');
				$('#mask').fadeIn(300);
			}else{
				$("div.loadi").hide(0);
				mapcity.initMap();
			}
			mapcity.loading=false;
		});
	;
}


mapcity.initMap=function(){
	if(mapcity.mapconfig.google.map==null || mapcity.mapconfig.mapchanged){
		myezplan.maps.initializeGoogleMap(mapcity.mapconfig,function(arg_mapconfig,status,result){
			if(status=="ERROR"){
				console.log(status + ":" + result.errormessage);
				return false;
			}
			$("#mapcitycity-box").hide("fast");
			if(mapcity.mapconfig.google.map){
				myLocationControlAdd(mapcity.mapconfig.google.map);
			}
			mapcity.routeMap();
		});
	}else{
		//mapcity.mapconfig.setCenterByBounds();
		console.log("no changes to draw");
	}
}
mapcity.routeMap=function(){
	//alert('routemap');
	mapcity.setCookieQuery();
	var loads = $.cookie(mapcity.selectorsEdit.cookieload);
	if (loads != 'NEW'){$.cookie("EZMAPCITYSAVELOAD", 'NEW');}
	var loginafter=$.cookie("EZMAPCITYLOGINAFTER");
	if (loginafter != 'LOGINP'){$.cookie("EZMAPCITYLOGINAFTER", 'LOGINP');}
	var loginafter2=$.cookie("EZMAPCITYSAVELOGIN");
	if (loginafter2 != 'LOGINP'){$.cookie("EZMAPCITYSAVELOGIN", 'LOGINP');}
	var $1=mapcity.loading==false;
	var $2=(mapcity.placesEdit.sp=='' || mapcity.placesEdit.ep=='');
	/*if($1 && $2){alert("Please select at least one place.");return false;}*/
	if($2){return false;}
	mapcity.mapconfig.maptravelmode=mapcity.placesEdit.gotm;
	mapcity.mapconfig.waypoints=[];
	/*
	$.each(mapcity.placesEdit.pl,function(index,value){
		if(mapcity.placesEdit.plse.indexOf(value)>=0 && value!=mapcity.placesEdit.sp && value!=mapcity.placesEdit.ep){
			mapcity.mapconfig.waypoints.push({location:mapcity.mapconfig.getMarkerPosition(value) ,stopover:true});
		}
	});
	*/
	var _limit=(mapcity.constplse-1);if(parseInt(mapcity.placesEdit.sp)==parseInt(mapcity.placesEdit.ep)){_limit-=1;}
	$.each(mapcity.mapconfig.markers,function(index,value){
		var _value=parseInt(value.mk_id);
		if(mapcity.placesEdit.plse.indexOf(_value)>=0 && _value!=parseInt(mapcity.placesEdit.sp) && _value!=parseInt(mapcity.placesEdit.ep)){
			if(mapcity.mapconfig.waypoints.length>=_limit){
				return;
			}
			mapcity.mapconfig.waypoints.push({location:value.position,stopover:true});
		}
	});
	myezplan.maps.calculateGoogleRoute(mapcity.mapconfig,function(status,result){
		//console.log(status + ":" + result.errormessage);
		//mapcity.mapconfig.mapchanged=mapcity.loadingmap;
		//mapcity.mapconfig.mapchanged=false;
		return true;
	});
}
mapcity.addToMapCity=function(arg_obj,arg_method){
	var $this=$(arg_obj);
	if(!$this){
		e.stopPropagation();e.preventDefault();
		return;
	}
	arg_method=(arg_method)?arg_method:"click";
	//console.log(arg_method);
	mapcity.mapconfig.vacio=false;
	var _checkvalue=parseInt(arg_obj.value);
	var _checkname=$this.data("name");
	var _form=$(mapcity.selectorsEdit.form);
	var _form_sp=$(mapcity.selectorsEdit.sp);
	var _form_ep=$(mapcity.selectorsEdit.ep);
	var _form_plse=$(mapcity.selectorsEdit.plse);
	var _array_plse=[];
	var _val_plse=$.trim(_form_plse.val());
	if(_val_plse!=""){
		_array_plse=_val_plse.split(",");
		$.each(_array_plse,function(index,value){if($.isNumeric(value)){_array_plse[index]=parseInt(value);}});
	}
	var _form_plom=$(mapcity.selectorsEdit.plom);
	var _array_plom=[];
	var _val_plom=$.trim(_form_plom.val());
	if(_val_plom!=""){
		_array_plom=_val_plom.split(",");
		$.each(_array_plom,function(index,value){if($.isNumeric(value)){_array_plom[index]=parseInt(value);}});
	}
	/*
	if(_array_plse.length>=10){
		arg_obj.checked=false;
	}
	*/
	if(arg_method==="load"){
		//console.log(_checkvalue);console.log(mapcity.placesEdit.plse);
		arg_obj.checked=true;
		if($.inArray(_checkvalue,mapcity.placesEdit.plse)>=0){
			if(_array_plse.length>=mapcity.constplse){
				arg_obj.checked=false;
			}
		}else if($.inArray(_checkvalue,mapcity.placesEdit.plom)>=0){
			arg_obj.checked=false;
		}else{
			if(_array_plse.length>=mapcity.constplse){
				arg_obj.checked=false;
			}
		}
		if(arg_obj.checked==true && _array_plse.length>=mapcity.constplse){
			//arg_obj.checked=false;
		}
	}else if(arg_method==="click"){
		if(_array_plse.length>=mapcity.constplse && arg_obj.checked){
			alert("You have reached the maximum number of places ("+mapcity.constplse+") per map.");
			arg_obj.checked=false;
			return;
		}
	}
	if(arg_obj.checked){
		_array_plse.push(_checkvalue);
		if(_array_plom.indexOf(_checkvalue)>=0){
			_array_plom.splice(_array_plom.indexOf(_checkvalue),1);
		}
		//if(arg_method==="click"){mapcity.sortSelectsWhereTo();}
		myezplan.forms.select.addOption(_form_sp, _checkvalue, _checkname);/*_form_sp.change();*/
		myezplan.forms.select.addOption(_form_ep, _checkvalue, _checkname);/*_form_ep.change();*/
	}else{
		if(_array_plse.indexOf(_checkvalue)>=0){
			_array_plse.splice(_array_plse.indexOf(_checkvalue),1);
		}
		_array_plom.push(_checkvalue);
		var _current_sp=parseInt($(mapcity.selectorsEdit.sp).val()), _current_ep=parseInt($(mapcity.selectorsEdit.ep).val());
		if(_current_sp===_checkvalue){
			mapcity.placesEdit.sp=mapcity.getNextPlaceByLatOrder(_checkvalue,_current_ep).id;
			$(mapcity.selectorsEdit.sp).val(mapcity.placesEdit.sp);
			mapcity.setCookieQuery();
		}
		if(_current_ep===_checkvalue){
			mapcity.placesEdit.ep=mapcity.getPreviousPlaceByLatOrder(_checkvalue,_current_sp).id;
			$(mapcity.selectorsEdit.ep).val(mapcity.placesEdit.ep);
			mapcity.setCookieQuery();
		}
		//if(arg_method==="click"){mapcity.sortSelectsWhereTo();}
		myezplan.forms.select.removeOptionByValue(_form_sp, _checkvalue);/*_form_sp.change();*/
		myezplan.forms.select.removeOptionByValue(_form_ep, _checkvalue);/*_form_ep.change();*/
	}
	
	_array_plse.sort(function(a,b){return a-b});
	_form_plse.val(_array_plse.join());
	_array_plom.sort(function(a,b){return a-b});
	_form_plom.val(_array_plom.join());
	//mapcity.placesEdit.plse=_array_plse;
}
pllat_SortByLatAsc=function(a, b){var sortA=a.lat,sortB=b.lat;if(sortA<sortB)return -1;if(sortA>sortB) return 1; return 0;};
pllat_SortByLonAsc=function(a, b){var sortA=a.lon,sortB=b.lon;if(sortA<sortB)return -1;if(sortA>sortB) return 1; return 0;};
function dynamicSort(property){
	var sortOrder = 1;if(property[0] === "-") {sortOrder = -1;property = property.substr(1, property.length - 1);}
	return function (a,b){var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;return result * sortOrder;}
}
mapcity.sortSelectsWhereTo=function(){
	mapcity.setCookieQuery();
	mapcity.placesEdit.pllat=[];
	$.each(mapcity.placesEdit.plse,function(index2,value2){
		$.each(mapcity.mapconfig.markers,function(index1,value1){
			if(value1.mk_id==value2){
				mapcity.placesEdit.pllat.push({id:value2,lat:value1.position.jb,lon:value1.position.kb});
			}
		});
	});
	if(mapcity.placesEdit.pllat.length>=1){
		mapcity.placesEdit.pllat.sort(dynamicSort("-lat"));
		/*
		$(mapcity.selectorsEdit.sp).find("option[value='"+mapcity.placesEdit.pllat[0].id+"']").attr("selected",true).change();
		$(mapcity.selectorsEdit.ep).find("option[value='"+mapcity.placesEdit.pllat[mapcity.placesEdit.pllat.length-1].id+"']").attr("selected",true).change();
		*/
		/*
		$(mapcity.selectorsEdit.sp).val(mapcity.placesEdit.pllat[0].id);
		$(mapcity.selectorsEdit.ep).val(mapcity.placesEdit.pllat[mapcity.placesEdit.pllat.length-1].id);
		*/
		mapcity.placesEdit.sp=mapcity.placesEdit.pllat[0].id;
		mapcity.placesEdit.ep=mapcity.placesEdit.pllat[mapcity.placesEdit.pllat.length-1].id;
	}
}
mapcity.getNextPlaceByLatOrder=function(arg_placeid,arg_placeidommit){
	var _newselected=false;
	var _return={id:null,index:-1,};
	if(!(arg_placeid)){return _return;}
	$.each(mapcity.placesEdit.pllat,function(index){
		//console.log(value)
		if(_newselected){return;}
		if(this.id==arg_placeid){
			//console.log(mapcity.placesEdit.pllat[index]);
			//console.log(mapcity.placesEdit.pllat[index+1]);
			if(mapcity.placesEdit.pllat[index+1]){
				var _next=mapcity.placesEdit.pllat[index+1];
				if(_next.id!=arg_placeidommit){
					_newselected=true;
					_return={id:_next.id,index:index+1,}
					return;
				}
			}
		}
	});
	return _return;
}
mapcity.getPreviousPlaceByLatOrder=function(arg_placeid,arg_placeidommit){
	var _newselected=false;
	var _return={id:null,index:-1,};
	if(!(arg_placeid)){return _return;}
	$.each(mapcity.placesEdit.pllat,function(index){
		//console.log(value)
		if(_newselected){return;}
		if(this.id==arg_placeid){
			//console.log(mapcity.placesEdit.pllat[index]);
			//console.log(mapcity.placesEdit.pllat[index-1]);
			if(mapcity.placesEdit.pllat[index-1]){
				var _previous=mapcity.placesEdit.pllat[index-1];
				if(_previous.id!=arg_placeidommit){
					_newselected=true;
					_return={id:_previous.id,index:index-1,}
					return;
				}
			}
		}
	});
	return _return;
}
mapcity.removeFromMapCity_mapa=function(arg_this){
	var $this=$(arg_this);
	var $num=$this.data("order");
	var $id=$this.data("id");
	//alert($id)
	if($id>6){
	delpointEdit($num);
	deleteFromMapCityPopup($id,"mapcity",function(arg_pid,response){
		mapcity.getCookiePlaces();
	});
		}
	if($id<6){
		mapcity.deletePersonalPlan($id,function(arg_pid,response){
		mapcity.getCookiePlaces();
	});
	delpointEdit($num);
		}
}
mapcity.deletePersonalPlan=function(id){
var coopersonal=$.cookie("EZPERSONAL")
			if(coopersonal && coopersonal!=''){
				var coper=coopersonal.split('!');
				coper.splice(id-1,1);
				var newcoo=coper.join('!');
			}
$.cookie("EZPERSONAL",newcoo)
//alert(newcoo);
}
mapcity.removeFromMapCity=function(arg_this){
	var $this=$(arg_this);
	var $thisrow=$this.parent();
	var $table=$thisrow.closest("table");
	var $checkbox=$thisrow.find(".checkplaceadd");
	var $name=$this.data("name");
	var $id=$this.data("id");
	//if($checkbox.is(":checked")){$checkbox.click();}
	deleteFromMapCityPopup($id,"mapcity",function(arg_pid,response){
		mapcity.getCookiePlaces();
		$thisrow.css("background-color","#990000").animate({opacity: 0.1}, "slow",function(){
			$thisrow.hide("slow").remove();
			if($table.find(">tbody>tr").length==0){
				$table.animate({opacity: 0.05}, "fast").slideToggle("fast",function(){
				$table.hide("slow").remove(); 
				});
			}
			var $markerpos=mapcity.mapconfig.getMarkerByPlaceId($id);
			mapcity.mapconfig.markers[$markerpos.index].setMap(null);
			mapcity.mapconfig.markers.splice($markerpos.index,1);
			if(!(mapcity.mapconfig.vacio)){
			if(mapcity.mapconfig.google.directionsdisplay){
				mapcity.mapconfig.google.directionsdisplay.setMap(null);
				mapcity.mapconfig.google.directionsdisplay=null;
				mapcity.getPlaces();
			}
			}
		});
	});
}
mapcity.cleanCurrentMapCity=function(){
alert("cleaning");
$.cookie("EZPERSONAL",false, {
				path: '/',
				expires: -1
			});
var cookiecats=$.cookie("EZCATS");
if(cookiecats && cookiecats!=''){
	var cookie_c=cookiecats.split('*');
	for(x=0;x<cookie_c.length;x++){
		$.cookie(cookie_c[x],false, {
				path: '/',
				expires: -1
			});
		}
$.cookie("EZCATS",'');
	}
var cookieareas=$.cookie("EZAREAS");
if(cookieareas && cookieareas!=''){
	var cookie_a=cookieareas.split('*');
	for(x=0;x<cookie_a.length;x++){
		$.cookie(cookie_a[x],false, {
				path: '/',
				expires: -1
			});
		}
$.cookie("EZAREAS",'');
	}
$.cookie("EZMAPCITYPLACES", '');
$.cookie("EZTRANSTOPS", '');
$.cookie("EZTRANSPORT", '');
mapcity.cleanUPID();
mapcity.placesEdit.pl='';
mapcity.placesEdit.plse='';
mapcity.placesEdit.sp="";
mapcity.placesEdit.ep="";
mapcity.selectorsEdit.sp="";
mapcity.selectorsEdit.ep="";
mapcity.selectorsEdit.pl="";
mapcity.selectorsEdit.plse="";
	var _url = "http://myezplan.com/mobile/appdata/data_ajax/map_city_ajax.cfm?rnu="+randomNumberUrl()+"";
	var _urlconfig = {action:"clean"};
	$.post(_url,_urlconfig)
		.error(myezplan.utils.ajaxError)
		.success(function(response, status, xhr){
			var $popup=$('#new_plan');
			$( "#new_plan" ).show();
			$( "#new_plan" ).panel("open");
			$('#lololo').showLoading("Please Wait,<br/>Loading...<br/>",false);
	var _url = "http://myezplan.com/mobile/appdata/data_ajax/mapcity_content.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'New_Plan',parametro:'new'};
	$('#new_plan').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$('#new_plan').empty();
		break;
		}
	});
		//$('body').append('<div id="mask" class="mask"></div>');
		//$('#mask').fadeIn(300);
		//$popup.fadeIn(300);
			//window.location = "mapcitypopup.cfm?ctid=5&plid=5";//window.location.reload();
		})
	;
}
/* save userplan */
mapcity.mapSaveInit=function(){
	var _upid=mapcity.placesEdit.upid;
	var _upname=encodeURIComponent($.trim(mapcity.save.$fname.val()));
	if(sessionStorage.cf_sid==undefined){
		$.cookie("EZMAPCITYSAVELOGIN", 'LOGIN');
		pedir_sesion(1,"mapcity.mapSaveInit()");
		return false;
	}
	//update userplan	without showing popup when userplan exists
	if(_upid!="" && _upid!=0){
		var _confirm=window.confirm("Do you want to replace your current Plan?");
		if(_confirm){mapcity.mapSaveAjax("u");return true;}else{mapcity.placesEdit.upid=0;}
	}
	closePopup(0);
	//alert(cf_sid);
	//mapcity.save.$popup.fadeIn(300);
	mapcity.save.$popup.panel();
	mapcity.save.$popup.show();
	mapcity.save.$popup.panel("open");
	var popMargTop = (mapcity.save.$popup.height() + 24) / 2; 
	var popMargLeft = (mapcity.save.$popup.width() + 24) / 2; 
	//mapcity.save.$popup.css({'margin-left' : -popMargLeft});
	//$('body').append('<div id="mask" class="mask"></div>');
	//$('#mask').fadeIn(300);
	$("#Datepicker_").datepicker();
		$.ajax({
			type: "POST",
			url: "http://myezplan.com/mobile/appdata/data_ajax/saveplans_itineraryajaxsearch.cfm",
			async:true, 
			cache:false,
			data: "action=searchitineraries&uid="+sessionStorage.cf_sid,
			success: function(datos){
				$("#search_itinerary").html(datos);
			}
		});	
	mapcity.save.$fname.focus();
	return true;
}

plantoItineraryValida= function(A,B,C,D){
		var _url="http://myezplan.com/mobile/appdata/data_ajax/myitinerary_content_ajax.cfm";
		var _urlconfig={action:"saveuseritinerary",saveaction:"validalimiteplansI",aditi:D};
				$.ajax({type:"POST",url:_url,async:false,cache:false,data:_urlconfig})
				.success(function(datos){
					if (datos==30){
						alert('Your Plan has been saved, but your current itinerary have reached the maximum limit of Plans (30), if you want to add it to a itinerary go to My Itinerary');return false;
						}else{myPlanAddToItinerary(A,B,C,D);}
					});
		}

planValida= function(param){
		var _url="http://myezplan.com/mobile/appdata/data_ajax/myitinerary_content_ajax.cfm";
		var _urlconfig={action:"saveuseritinerary",saveaction:"validalimiteplans"};
				$.ajax({type:"POST",url:_url,async:false,cache:false,data:_urlconfig})
				.success(function(datos){
					if (datos==60){
						alert('You have reached the maximum limit of Plans (60), if you want to create a new one you have to delete one of your old Plans');return false;
						}else{mapcity.mapSaveAjax("i")}
						});
		}

mapcity.mapSaveAjax=function(saveaction){
//	alert(session.uid);
	var _shareit=mapcity.save.$share.is(":checked");
	var _addto=mapcity.save.$addtoitinerary.is(":checked");
	var _addto2=mapcity.save.$addtoitinerary2.is(":checked");
	var _itin=$("#sel-itinerary").val();
	var _date =$("#Datepicker_").val();
	//alert(_itin+' '+_date+' '+_shareit);
	global_addtocurrentplan=false;
	var plp='';
	var plpcoo=$.cookie("EZPERSONAL");
	if(plpcoo && plpcoo!=''){
	var plp='&plp='+plpcoo
	}
	var plt='';
	var pltcoo=$.cookie("EZTRANSPORT");
	if(pltcoo && pltcoo!=''){
	var plt='&plt='+pltcoo
	}
	var plts='';
	var pltscoo=$.cookie("EZTRANSTOPS");
	if(pltscoo && pltscoo!=''){
	var plts='&plts='+pltscoo
	}
	var pls='';
	var plscoo=$.cookie("EZSERVICES");
	if(plscoo && plscoo!=''){
	var pls='&pls='+plscoo
	}
	var plss='';
	var plsscoo=$.cookie("EZSERVICESSTOPS");
	if(plsscoo && plsscoo!=''){
	var plss='&plss='+plsscoo
	}
	this.pageurlEdit.urlquery=$.cookie("EZMAPCITYQUERY_edit")+plp+plt+plts+pls+plss;
	var _upurl=encodeURIComponent(this.pageurlEdit.urlquery);
	//alert(_upurl);
	_upname=encodeURIComponent(mapcity.save.$fname.val());
		_upid=mapcity.placesEdit.upid||0;
	if (!(_upid)){_upid = 0}
	//alert(_upid+' '+saveaction);
	var c_query =$.cookie("EZMAPCITYQUERY_edit");
	var _cookie_plse=decodeURIComponent(getUrlStringParamValue(c_query,"plse"));
//	alert(_cookie_plse)
	if(_cookie_plse==''){saveaction='N_'+saveaction;}
	var _url = "http://myezplan.com/mobile/appdata/data_ajax/map_usersplans_ajax.cfm?rnu="+randomNumberUrl()+"";
	var _urlconfig = "action=saveuserplanmapcity&saveaction="+saveaction+"&upname="+_upname+"&upurl="+_upurl+"&upplanid=0&upid="+_upid+"&upshareit="+_shareit+"&upuserid="+sessionStorage.cf_sid;
//	alert(_urlconfig);
	//alert(_addto)
	$.ajax({type:"POST",url:_url,async:true,cache:false,data:_urlconfig})
		.error(function(xhr, ajaxOptions, thrownError){
			showMessageError(mapcity.save.$message,thrownError,300);
			hideMessageError(mapcity.save.$message,false,300);
		})
		.success(function(response){
			var _arrResponse = response.split("|");
			if(_arrResponse.length>1){
				mapcity.setUPID(_arrResponse[1]);
				//alert(_arrResponse[1]);
				if(_addto){
					plantoItineraryValida("stepitinerary-box",_arrResponse[1],_date,0);
					//myPlanAddToItinerary("stepitinerary-box",_arrResponse[1],_date,_itin);
				}
				if(_addto2){
					plantoItineraryValida("stepitinerary-box",_arrResponse[1],_date,_itin);
					//myPlanAddToItinerary("stepitinerary-box",_arrResponse[1],_date,_itin);
				}
			}
			//alert(_arrResponse[0]);
			showMessageError(mapcity.save.$message,_arrResponse[0],300);
			hideMessageError(mapcity.save.$message,true,300);
		})
	;
}
mapcity.mapSaveForm=function(){
	emptyMessageError(mapcity.save.$message);
	_upname=encodeURIComponent($.trim(mapcity.save.$fname.val()));
	/* verify all inputs */
	if(_upname==""){
		showMessageError(mapcity.save.$message,"Name is required. Please try again",300);
		hideMessageError(mapcity.save.$message,false,300,false);
		mapcity.save.$fname.focus();
		return false;
	}
	var _url="http://myezplan.com/mobile/appdata/data_ajax/map_usersplans_ajax.cfm?rnu="+randomNumberUrl()+"";
	var _urlconfig={action:"checkuserplanbyid",upname:_upname,upuserid:sessionStorage.cf_sid};
	$.ajax({type: "POST",url: _url,data: _urlconfig,async:false,cache:false})
		.error(function(xhr, ajaxOptions, thrownError){
			showMessageError(mapcity.save.$message,thrownError,300);
			hideMessageError(mapcity.save.$message,false,300);
		})
		.success(function(response){
			if(response>0){
				mapcity.setUPID(response);
				var _confirm = confirm('You already have a plan under the same name. Do you want to replace it ?');
				if (!_confirm){
					$(mapcity.save.$fname).focus();
					return false;
				}else{
					//update userplan	without showing popup
					mapcity.mapSaveAjax("u");
					return false;
				}
			}
			//create an userplan	
			planValida('i');
			//alert(valida);
			//mapcity.mapSaveAjax("i")
			return false;
		})
	;
}
/* save userplan */
mapcity.showPopupShareitPlans=function(){
	var $popup=$("#shareitplans-box");
	$popup.fadeIn(300);
	var popMargTop=($popup.height() + 24) / 2; 
	var popMargLeft=($popup.width() + 24) / 2; 
	/*$popup.css({'margin-left':-popMargLeft});*/
	$('body').append('<div id="mask" class="mask"></div>');
	$('#mask').fadeIn(300);
	mapcity.showPopupShareitPlansAjax();
}
mapcity.showPopupShareitPlans2=function(){
	var $popup=$("#shareitplans-box2");
	$popup.fadeIn(300);
	var popMargTop=($popup.height() + 24) / 2; 
	var popMargLeft=($popup.width() + 24) / 2; 
	$popup.css({'margin-left':-popMargLeft});
	mapcity.showPopupShareitPlansAjax2();
	$('#mapcitycity-box').fadeOut(300);
}
mapcity.showPopupAdvanceOptionsEdit=function(){
	 if(emptyplan!=0){alert('Empty Plan, Please Add Places');return false;}
	 if(emptyroute!=0){alert('Empty Route, Please Add Places');return false;}
	var $popup=$("#box_advoptions_edit .box_content");
	$popup.fadeIn(0);
	var popMargTop=($popup.height() + 24) / 2; 
	var popMargLeft=($popup.width() + 24) / 2; 
	$popup.css({//'margin-left':-popMargLeft
	});
	$popup.css("z-index","1512");
	$('#editPlan_panel').append('<div id="mask" class="mask"></div>');
	$('#mask').css({"z-index":"1511","width":"150%","height":"150%"});
	$('#mask').fadeIn(0);
}
mapcity.closePopupAdvanceOptions=function(){
	var $popup=$("#box_advoptions .box_content");
	$popup.fadeOut(0);
//	var popMargTop=($popup.height() + 24) / 2; 
//	var popMargLeft=($popup.width() + 24) / 2; 
//	$popup.css({//'margin-left':-popMargLeft
//	});
	//$('body').append('<div id="mask" class="mask"></div>');
	$('#mask').fadeOut(0);
}
mapcity.showPopupAdvanceOptions_old=function(){
		e.stopPropagation();e.preventDefault();
		var $pos=$("#right_map_box").position();
		var $width=$("#right_map_box").width()/2;
		var $height=$("#right_map_box").height()/2;
		//console.log($pos);
		$('#box_advoptions .box_content')
		.css("top",$pos.top+"px")
		.css("left",$pos.left+"px")
		.css("width",$width+"px")
		.css("height",$height+"px")
		.toggle(0)
		;
		/*
		var $parentwidth=$('#box_advoptions').width()-20;
		var $thisheight=($('#box_advoptions .box_content').height()-20)*-1;
		.css("top",$thisheight+"px")
		.css("width",$parentwidth+"px")
		.css("padding-left","6px")
		.slideToggle("slow");
		*/
}
mapcity.showPopupShareitPlansAjax2=function(){
	var $popupbody=$("#shareitplans-box2 #box-body");
	$popupbody.empty();
	var url="http://myezplan.com/mobile/appdata/data_ajax/shareit_ajax_content.cfm?rnu="+randomNumberUrl()+"";
	var urlconfig = {action: "getsuggesteditinerarys2",ciid:mapcity.cityid};
	$popupbody.load(url,urlconfig,function(response, status, xhr){}).error(myezplan.utils.ajaxError);
}
mapcity.showPopupShareitPlansAjax=function(){
	var $popupbody=$("#shareitplans-box #box-body");
	$popupbody.empty();
	var url="http://myezplan.com/mobile/appdata/data_ajax/shareit_ajax_content.cfm?rnu="+randomNumberUrl()+"";
	var urlconfig = {action: "getsuggesteditinerarys",ciid:mapcity.cityid};
	$popupbody.load(url,urlconfig,function(response, status, xhr){}).error(myezplan.utils.ajaxError);
}
mapcity.initPage=function(){
	//$(document).tooltip({track: true});
	//$(".selector").tooltip();
	mapcity.getCookieQuery();
	mapcity.getCookiePlaces();
	mapcity.getCitiesByCountry();
	mapcity.getPlaces_mapaEdit();
	mapcity.mapconfig.mapchanged=false;
	mapcity.loading=false;
}

/* load global variables */
$(document).ready(function(e) {
//alert("loading content");
faqpage='mapcity';
	/* Google Map */
	mapcity.mapconfig=new myezplan.maps.config;
	mapcity.mapconfig.canvasmap=$('#right_map_box #map_canvas').get([0]);
	mapcity.mapconfig.google.mapoptions.navigationControl=false;
	/* */
	mapcity.loading=true;
	mapcity.constplse=10;
	mapcity.loadingmap=true;
	mapcity.mapconfig.mapchanged=false;
	mapcity.mapconfig.ruta=false;
	mapcity.pathtoicon="ezmapas/maps_pics/";
	mapcity.selectorsEdit={};
	mapcity.selectorsEdit.form="#middle_mapcityandcheck_edit form#drawform";
	mapcity.selectorsEdit.city=mapcity.selectorsEdit.form+" #city";
	mapcity.selectorsEdit.plan=mapcity.selectorsEdit.form+" #plan";
	mapcity.selectorsEdit.pl=mapcity.selectorsEdit.form+" #pl";
	mapcity.selectorsEdit.plse=mapcity.selectorsEdit.form+" #plse";
	mapcity.selectorsEdit.plom=mapcity.selectorsEdit.form+" #plom";
	mapcity.selectorsEdit.sp=mapcity.selectorsEdit.form+" #sp";
	mapcity.selectorsEdit.ep=mapcity.selectorsEdit.form+" #ep";
	mapcity.selectorsEdit.gotm=mapcity.selectorsEdit.form+" #gotm";
	mapcity.selectorsEdit.upid=mapcity.selectorsEdit.form+" #upid";
	mapcity.selectorsEdit.itemchanged=mapcity.selectorsEdit.form+" .formitemchanged";
	mapcity.selectorsEdit.cookieplaces="EZMAPCITYPLACES_edit";
	mapcity.selectorsEdit.cookiequery_edit="EZMAPCITYQUERY_edit";
	mapcity.selectorsEdit.cookieload="EZMAPCITYSAVELOAD";
	mapcity.pageurlEdit=new myezplan.pageurl();
	mapcity.pageurlEdit.cityname=window.cnameEdit;
	mapcity.pageurlEdit.searchmethod="form";
	mapcity.pageurlEdit.printpage="http://myezplan.com/mobile/appdata/mapcityprint.cfm";
	mapcity.pageurlEdit.searchform=mapcity.selectorsEdit.form;
	mapcity.pageurlEdit.mapValidToProcess=mapcity.isFormValidToProcess;
	mapcity.placesEdit=mapcity.mapconfig.places;
	mapcity.save={};
	mapcity.save.$message=$("#messageerror-saveplan");
	mapcity.save.$popup=$("#saveplan-box");
	mapcity.save.$form=mapcity.save.$popup.find("form");
	mapcity.save.$fname=mapcity.save.$form.find("#saveplan_name");
	mapcity.save.$share=mapcity.save.$form.find("#saveplan_shareit");
	mapcity.save.$itin=mapcity.save.$form.find("#sel-itinerary");
	mapcity.save.$date_=mapcity.save.$form.find("#Datepicker_");
	mapcity.save.$addtoitinerary=mapcity.save.$form.find("#saveplan_addtoitinerary");
	mapcity.save.$addtoitinerary2=mapcity.save.$form.find("#saveplan_addtoitinerary2");
	
	mapcity.save.$form.submit(function(e) {
		alert("saving");
		e.stopPropagation();e.preventDefault();
		mapcity.mapSaveForm();
	});
	$(mapcity.selectorsEdit.city).change(function(e) {
		mapcity.getPlansByCity();
		mapcity.updateMapCityConfig();
	});
	$(document).on("mouseover","#places_list_edit .placetooltip",function(e) {
		var $this=$(this);
		myezplan.showGloboTooltip(e.target,{tipimage:$this.data("tipimage"),tipicon:$this.data("tipicon"),tipname:$this.data("tipname"),tiptype:$this.data("tiptype"),tipprov:$this.data("tipprov")});
	});
	$(document).on("click","#places_list_edit .placetooltip",function(e) {
	//$('.placetooltip ').click( function(e) {
		var $this=$(this);
		showinfoplace($this.data("idunico"),$this.data("id"), 'mapcity');
	});
	$('#mapplanscity-box a.closesmall,#mapplanscity-box #button-add').click( function(e) {
		e.stopPropagation();e.preventDefault();
		mapcity.getPlaces();
		$("#iframe_mapplanscity").empty().attr("src","");
		closePopup();
	});
		$('#mapplanscity-box2 a.closesmall').click( function(e) {
		e.stopPropagation();e.preventDefault();
		$("#iframe_mapplanscity2").empty().attr("src","");
		$('#mapplanscity-box2').fadeOut();
		var popup = $("#shareitplans-box");
		$(popup).fadeIn(300);
	});
		$('#mapplanscity-box3 a.closesmall').click( function(e) {
		e.stopPropagation();e.preventDefault();
		$("#iframe_mapplanscity3").empty().attr("src","");
		$('#mapplanscity-box3').fadeOut();
		var popup = $("#shareitplans-box2");
		$(popup).fadeIn(300);
	});
	
	$(document).on("click",".imgplaceremove",function(e) {
		mapcity.removeFromMapCity_mapa(this);
	});
	$(document).on("change",".checkplaceadd",function(e) {
		mapcity.addToMapCity(this);
	});
	$(document).on("change",mapcity.selectorsEdit.sp,function(e) {
		if(!mapcity.loading){mapcity.placesEdit.sp=this.value;}
	});
	$(document).on("change",mapcity.selectorsEdit.ep,function(e) {
		if(!mapcity.loading){mapcity.placesEdit.ep=this.value;}
	});
	$(document).on("change",mapcity.selectorsEdit.itemchanged,function(e) {
		mapcity.mapconfig.mapchanged=true;
		return false;
	});
	$("#right_bottom_steps_edit .save-img").unbind();
	$(document).on("click","#right_bottom_steps_edit .save-img",function(e) {
		e.stopPropagation();e.preventDefault();
		if(emptyplan!=0){alert('Empty Plan, Please Add Places');return false;}
		//if(mapcity.mapconfig.vacio){alert('Please select at least one place');return false;}
		//mapcity.routeMap();
		mapcity.mapSaveInit();
	});
	$("#right_bottom_steps_edit .print-img").unbind();
	$(document).on("click","#right_bottom_steps_edit .print-img",function(e) {
		e.stopPropagation();e.preventDefault();
		if(emptyplan!=0){alert('Empty Plan, Please Add Places');return false;}
		if(emptyroute!=0){alert('Empty Route, Please Add Places');return false;}
		//if(mapcity.mapconfig.vacio){alert('Please select at least one place');return false;}
		//mapcity.routeMap();
		//mapcity.pageurlEdit.mapchanged=mapcity.mapconfig.mapchanged;
		return mapcity.pageurlEdit.mapPrint2Edit();
	});
	$(document).on("click","#right_bottom_steps_edit .button_steps-itinerary",function(e) {
		e.stopPropagation();e.preventDefault();
		//alert('myiti')
		//if(cf_sid==""){
		if(sessionStorage.cf_sid==undefined){
			pedir_sesion(1,"mapcity.Gomyiti()");
			return false;
		}else{mapcity.Gomyiti();}
	});
	$(document).on("click","#right_bottom_steps_edit .share-img",function(e) {
		e.stopPropagation();e.preventDefault();
		if(emptyplan!=0){alert('Empty Plan, Please Add Places');return false;}
		if(emptyroute!=0){alert('Empty Route, Please Add Places');return false;}
//		mapcity.routeMap();
//		mapcity.pageurlEdit.mapchanged=mapcity.mapconfig.mapchanged;
//		mapcity.getCookieQuery(true);
		return mapcity.pageurlEdit.mapShare2Edit();
	});
	$(document).on("click","form #draw_button",function(e) {
		e.stopPropagation();e.preventDefault();
		mapcity.mapconfig.mapchanged=false;
		//mapcity.initMap();
		mapcity.routeMap();
	});
	$(document).on("click","form .plsecheck",function(e) {
		//e.stopPropagation();e.preventDefault();
		mapcity.mapconfig.mapchanged=false;
		//mapcity.initMap();
		mapcity.routeMap();
	});
	$("form #draw_button-advoption_edit").unbind();
	$(document).on("click","form #draw_button-advoption_edit",function(e) {
		e.stopPropagation();e.preventDefault();
		mapcity.placesEdit.gotm = $( '#box_advoptions_edit #gotm' ).val();
		//mapcity.placesEdit.gotm=document.getElementById('gotm').value;
		$('#box_advoptions_edit .box_content .close').click();
		mapcity.mapconfig.mapchanged=false;
		mapcity.placesEdit.userselection.changed=true;
		mapcity.mapconfig.ruta=false;
			var orden_n_=$('#places_list_edit').sortable('serialize');
			var quitar=orden_n_.split('&');
			var quitarep=quitar.length;
			var idep = $( '#places_list_edit #idplace'+quitarep ).val();
			var idsp = $( '#places_list_edit #idplace1' ).val();
			//var idep = document.getElementById('idplace'+quitarep).value;
			//var idsp = document.getElementById('idplace1').value;
			if(idep==idsp){delpointEdit(quitarep);}
		mapcity.placesEdit.sp=$(mapcity.selectorsEdit.sp).val();
		mapcity.placesEdit.ep=$(mapcity.selectorsEdit.ep).val();
		mapcity.getPlaces_mapaEdit();
		//mapcity.routeMap();
	});
	$(document).on("click","form #draw_button-optimize_edit",function(e) {
		e.stopPropagation();e.preventDefault();
		$('#box_advoptions_edit .box_content .close').click();
		mapcity.mapconfig.mapchanged=false;
		mapcity.placesEdit.userselection.changed=true;
		mapcity.mapconfig.ruta=false;
		mapcity.placesEdit.sp='';//$(mapcity.selectorsEdit.sp).val();
		mapcity.placesEdit.ep='';//$(mapcity.selectorsEdit.ep).val();
		mapcity.getPlaces_mapaEdit();
		//mapcity.routeMap();
	});
	$(".map-top-button-hotdeal").click( function(e) {
		e.stopPropagation();e.preventDefault();
		if(mapcity.cityid!="0"){
			var _url = "http://myezplan.com/mobile/appdata/hotdeals.html?q=search&city="+mapcity.cityid+"&#SearchResults";
			window.top.location.href=_url;
		}
		return true;
	});
	/*$('#go_mapcitypopup').click( function(e) {
		e.stopPropagation();e.preventDefault();
		//alert(mapcity.cityid)
		if(mapcity.cityid!="0"){
			var _url = "mapcitypopup.html?ctid="+mapcity.cityid+"&plid="+mapcity.countryid+"&cname="+mapcity.cityname;
			window.top.location.href=_url;
		}
		return true;
	});*/
	$('.map-top-button-newmap').click( function(e) {
		//alert("cleaning 1");
		e.stopPropagation();e.preventDefault();
		if(window.confirm("You are going to create a new plan. Your current plan will be lost if not saved. Do you want to continue?")){
			//mapcity.placesEdit.gotm == "WALKING";
			//mapcity.mapconfig.maptravelmode == "WALKING";
			$.cookie("page", 1);
			mapcity.cleanCurrentMapCity();
		}
		return true;
	});
	$('#map-top-button-shareitplan').click( function(e) {
		alert('aqui es');
		//mapcity.showPopupShareitPlans();
	});
	$('#button_steps-itinerary_old').click( function(e) {
		e.stopPropagation();e.preventDefault();
		mapcity.goToItinerary();
	});
	mapcity.goToItinerary=function(){
		alert("my itine");
		if(!sessionStorage.cf_sid){pedir_sesion("1","mapcity.goToItinerary(1)");return;}
		window.location.href="myitinerary.html";
	}
	goToItinerary=function(){
		if(!cf_sid){pedir_sesion("1","mapcity.goToItinerary(1)");return;}
		window.location.href="myitinerary.html";
	}
	$('.link_text').click( function(e) {
		mapcity.showPopupAdvanceOptionsEdit();
	});
	$('#box_advoptions .box_content .close').click( function(e) {
		e.stopPropagation();e.preventDefault();
		closePopup();
	});
	mapcity.initPage();
});
