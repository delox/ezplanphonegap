// JavaScript Document
function OpenmyPlanToMap(url,pais,ciudad){
var url_full ='http://www.myezplan.com/'+url;
window.open(url_full,'_parent');
;}
/* jquery events */
$(document).ready(function(e) {
/* ----------------------------------------- */
	saveitininit=function(){
		$(document).off('click', '#saveplan-box #saveplan_submit');
		$(document).on("click", "#saveplan-box #saveplan_submit", function(e){
		//$('#saveplan-box #saveplan_submit').click( function(e) {
			e.preventDefault();
			var _message = $("#messageerror-saveplan");
			var _saveplan_name = $("#saveplan_name");
			var _saveplan_nameValue = $.trim($(_saveplan_name).val());
			var _addtosaved=$("#saveplan_addtoitinerary2").is(":checked");
			emptyMessageError(_message);
			if(!_addtosaved){
			/* verify all inputs */
			if(_saveplan_nameValue==""){
				//showMessageError(_message,"Name is required. Please try again",300);
				//hideMessageError(_message,false,300,false);
				$(_saveplan_name).select();
				$(_saveplan_name).focus();
				var notice = new PNotify({
					title: 'Myezplan Notice',
					text: 'Name is required. Please try again',
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
				return false;
			}
			//alert(_saveplan_nameValue);
			var _data = {action:"checkuserItynerarybyname",upname:_saveplan_nameValue};
			$.ajax({
				type: "POST",
				url: "http://myezplan.com/mobile/appdata/data_ajax/map_usersplans_ajax.cfm",
				async:false, 
				cache:false,
				data: _data,
				error: function(xhr, ajaxOptions, thrownError){
					showMessageError(_message,thrownError,300);
					hideMessageError(_message,false,300);
				},
				success: function(response){
					if(response>0){
						currentuserplan = response;
						var _confirm = confirm('You already have a plan under the same name. Do you want to replace it ?');
						if (!_confirm){
							$(_saveplan_name).focus();
							return false;
						}else{
							//update plan	without showing popup
							$.cookie("MYITINERARYID",currentuserplan);
							$.cookie("MYITINERARYNAME",_saveplan_nameValue);
							saveUserPlan("up", currentuserplan,_saveplan_nameValue);
							//alert('update');
							return false;
						}
					}
					//create plan	
					saveUserPlan("i",_saveplan_nameValue)
					//alert('Insert');
					return false;
				}
			});
			}
			else{
				AddtouserItinerary_Init();		
			}
		});
	}
	AddtouserItinerary_Init = function(){
		var adtoiti=document.getElementById('sel-itinerary').value;
		var _data = "action=savemapcitypopupItinerary&saveaction=countcookies&uid="+adtoiti;
		$.ajax({
			type: "POST",
			url: "http://myezplan.com/mobile/appdata/data_ajax/map_usersplans_ajax.cfm",
			async:true,
			cache:false,
			data: _data,
			error: function(xhr, ajaxOptions, thrownError){
				showMessageError(_message,thrownError,300);
				hideMessageError(_message,false,300);
			},
			success: function(response){
				//alert(response);
				var counts_=response.split(',');
				var count_ideas=counts_[0];
				var count_personal=counts_[1];
				var count_personal_r=counts_[2];
				var count_days=counts_[3];
				var cuantasideas=0;
				var cuantaspersonal=0;
				var ideas=$.cookie("EZIDEAS");
				if(ideas && ideas!=''){
					var ideas_=ideas.split('!');
					var cuantasideas=ideas_.length;
				}
				var personal=$.cookie("EZPERSONAL");
				if(personal && personal!=''){
					var personal_=personal.split('!');
					var cuantaspersonal=personal_.length;
				}
				var cuantaspersonal_r=0;
				for(pr=1;pr<=10;pr++){
					var pr_=$.cookie("EZPR_"+pr);
					if(pr_ && pr_!=''){
						cuantasperonal_r=cuantaspersonal_r+1;
					}
				}
				//alert('ideas'+count_ideas+' '+cuantasideas);
				//alert('personal'+count_personal+' '+cuantaspersonal);
				//alert('personal_r'+count_personal_r+' '+cuantaspersonal_r);
				if((parseInt(count_ideas)+parseInt(cuantasideas))>10){
					alert("Can't add to itinerary, the ideas routes number is bigger than the max number permitted");
					return false;
				}
				if((parseInt(count_personal)+parseInt(cuantaspersonal))>10){
					alert("Can't add to itinerary, the personal places number is bigger than the max number permitted");
					return false;
				}
				if((parseInt(count_personal_r)+parseInt(count_personal_r))>10){
					alert("Can't add to itinerary, the personal routes number is bigger than the max number permitted");
					return false;
				}
				AddtouserItinerary_days(adtoiti,count_ideas,count_personal,count_personal_r,count_days);
			}
		});
	}
	AddtouserItinerary_days = function(adtoiti,count_ideas,count_personal,count_personal_r,count_days){
		var _message = $("#messageerror-saveplan");
		var numdays_=$.cookie("NUMDAYS");
		var numdays=1;
		if(numdays_ && numdays_!=''){var numdays=numdays_;}
		var url_data = "action=adddaystojoin&addto="+adtoiti+'&upinumdays='+numdays;
		$.ajax({
			type: "POST",
			url: "http://myezplan.com/mobile/appdata/data_ajax/map_usersplans_ajax.cfm",
			async:true, 
			cache:false,
			data: url_data,
			error: function(xhr, ajaxOptions, thrownError){
				showMessageError(_message,thrownError,300);
				hideMessageError(_message,false,300);
			},
			success: function(response){
				AddtouserItinerary_cookies(_message,adtoiti,count_ideas,count_personal,count_personal_r,count_days,numdays);
			}
		});
	}
	AddtouserItinerary_cookies = function(_message,adtoiti,count_ideas,count_personal,count_personal_r,count_days,numdays){
		var lolo=[];
		var cookiearray=armaarraydecookies(lolo);
		var cookienames=cookiearray[0];
		var cookiedata=cookiearray[1];
		var cookietypes=cookiearray[2];
		if(cookienames.length==0){
			AddtouserItinerary_adddays(_message,adtoiti,count_ideas,count_personal,count_personal_r,count_days,numdays)
		}
		for(co=0;co<cookienames.length;co++){
			var url_data = "action=joincookies&addto="+adtoiti+'&upinumdays='+numdays+'&ideascount='+count_ideas+'&personalcount='+count_personal+'&personal_rcount='+count_personal_r+"&cookname="+cookienames[co].replace(/EZPR_/g,'').replace(/_S/g,'')+"&cookdata="+cookiedata[co]+'&cooktype='+cookietypes[co]+'&encualva='+co;
			$.ajax({
				type: "POST",
				url: "http://myezplan.com/mobile/appdata/data_ajax/map_usersplans_ajax.cfm",
				async:true, 
				cache:false,
				data: url_data,
				error: function(xhr, ajaxOptions, thrownError){
					showMessageError(_message,thrownError,300);
					hideMessageError(_message,false,300);
				},
				success: function(response){
					//alert(response+' '+(cookienames.length-1))
					if(response==(cookienames.length-1)){
						AddtouserItinerary_adddays(_message,adtoiti,count_ideas,count_personal,count_personal_r,count_days,numdays);
					}
				}
			});
		}
	}
	AddtouserItinerary_adddays = function(_message,adtoiti,count_ideas,count_personal,count_personal_r,count_days,numdays){
		for(x=1;x<=numdays;x++){
			var places=$.cookie("EZMAPCITYPLACES_day"+x);
			if(!places){var places='';}
			var places2=$.cookie("EZMAPCITYPLACES2_day"+x);
			if(!places2){var places2='';}
			var subrutas=$.cookie("EZMAPCITYSUBPLACES_day"+x);
			if(!subrutas){var subrutas='';}
			var transports=$.cookie("EZTRANSPORT_day"+x);
			if(!transports){var transports='';}
			var transportstops=$.cookie("EZTRANSPORT_S_day"+x);
			if(!transportstops){var transportstops='';}
			var services=$.cookie("EZSERVICES_day"+x);
			if(!services){var services='';}
			var ruta=$.cookie("EZROUTE_day_"+x);
			if(!ruta){var ruta=0;}else{var ruta=1;}
			var gotm=$.cookie("EZGOTM_day_"+x);
			if(!gotm){var gotm='';}	
			var url_data = "action=adddaysrouteiti&uid="+adtoiti+"&numday="+x+'&daysbefore='+count_days+'&places='+places+'&places2='+places2+'&subplaces='+subrutas+'&transports='+transports+'&trasportstops='+transportstops+'&services='+services+'&ideascount='+count_ideas+'&personalcount='+count_personal+'&personal_rcount='+count_personal_r+'&ruta='+ruta+'&gotm='+gotm+'&encualva='+x;
			$.ajax({
				type: "POST",
				url: "http://myezplan.com/mobile/appdata/data_ajax/map_usersplans_ajax.cfm",
				async:true, 
				cache:false,
				data: url_data,
				error: function(xhr, ajaxOptions, thrownError){
					showMessageError(_message,thrownError,300);
					hideMessageError(_message,false,300);
				},
				success: function(response){
					var resp=response.split(',');
					var newid=resp[0];
					var encualva=resp[1];
					if(encualva==numdays){
						showMessageError(_message,'Itinerary Saved',300);
						hideMessageError(_message,true,300);
						var confsavednoti = new PNotify({
							title: 'myezplan notice',
							text: 'Would you like to load your updated itinerary?',
							icon: 'glyphicon glyphicon-question-sign',
							styling: 'jqueryui',
							hide: false,
							confirm: {
								confirm: true,
								buttons: [{
									text: 'Yes',
									addClass: 'btn-primary',
									click: function(notice) {
										window.location ='http://myezplan.com/mobile/appdata/mapcityurl.cfm?ui_id='+newid;
									}
								}, {
									text: 'No',
									click: function(notice) {
										confsavednoti.get().click(function() {
											notice.remove();
										});	
										var warningsaveiti = new PNotify({
											title: 'myezplan Warning',
											text: 'If you do not load your updated itinerary, every time you save your current one, it will be duplicated if you do it in the same saved itinerary.',
											icon: true,
											type: 'error',
											styling: 'jqueryui',
											hide: false,
											confirm: {
												confirm: true
											},
											buttons: {
												closer: true,
												sticker: true
											}
										});
										warningsaveiti.get().on('pnotify.confirm', function() {
											warningsaveiti.get().click(function() {
												warningsaveiti.remove();
											});	
										}).on('pnotify.cancel', function() {
											warningsaveiti.get().click(function() {
												warningsaveiti.remove();
											});
											confsavednoti.open();
										});
									}
								}]
							},
							buttons: {
								closer: false,
								sticker: false
							},
							history: {
								history: false
							}
						});
						//window.location ='http://myezplan.com/mobile/appdata/mapcityurl.cfm?ui_id='+newid;
					}
				}
			});
		}
	}
	mapcitypopup.PrintItinerary=function(){
		var iti_id=$.cookie("MYITINERARYID");
		var iti_name=$.cookie("MYITINERARYNAME");
		//alert(iti_id+' '+iti_name);
		//window.open('http://www.myezplan.com/mobile/appdata/myitineraryprint.cfm','_blank');
		window.open('http://myezplan.com/mobile/appdata/myitineraryprint_o.cfm?ui_id='+iti_id,'_blank');
		
		
	}
	mapcitypopup.PrintItinerary_day=function(iti_id,day){
		window.open('http://www.myezplan.com/mobile/appdata/mapcityprint.cfm?ui_id='+iti_id+'&day='+day+'#','_blank');
	}
	mapcitypopup.ShareItinerary=function(iti_id){
	    varfullurl='http://myezplan.com/mobile/appdata/mapcityurl.cfm?ui_id='+iti_id
		var _url="http://myezplan.com/mobile/appdata/cfc/mapcity.cfc"; 
		var _urlconfig={method:"googleURLShorten_json",url:varfullurl}; 
		$.ajax({url:_url,data:_urlconfig,async:false,dataType:'json'})
			.error(varshorturl=varfullurl)
			.success(function(response) {
				varshorturl=response.URL;
		})
//		alert(varfullurl);
//		alert(varshorturl);
		var _popup = $("#share-box");
		//_popup.fadeIn(300);
		_popup.panel();
		_popup.show();
		_popup.panel("open");
		_popup.find('#title-box-2').click();
		var popMargTop = (_popup.height() + 24) / 2; 
		var popMargLeft = (_popup.width() + 24) / 2;
		$('body').append('<div id="mask" class="mask"></div>');
		//$('#mask').fadeIn(300);
		var facebook=getFacebookUrl(varfullurl);
		var tweeter=getTweeterUrl(varshorturl);
		var blogger=getBloggerUrl(varshorturl);
		var mail=getMailUrl(varshorturl);
		var gpx= getGpxUrl(varfullurl); 
		_popup.find("#share-box-facebook-e").click(function(e) {
			window.open(facebook,'sharer','toolbar=0,status=0,width=626,height=436'); return false;
		});
		_popup.find("#share-box-twitter-e").attr("href",tweeter);
		_popup.find("#share-box-blogger-e").attr("href",blogger);
		_popup.find("#share-box-2 #sharelink").val(mail);
		_popup.find("#share-box-2 #sharelinkgpx").val(gpx);
	}
	getFacebookUrl=function(url){
		return "http://www.facebook.com/sharer.php?u="+encodeURIComponent(url)+"&t=Things to do in "+varcitynombre+"&id=myezplan";
	}
	getTweeterUrl=function(url){
		var titulo= document.getElementById('titulo_aleatorio').value;
		return "http://twitter.com/intent/tweet?via=myezplan1&url="+url+"&text="+titulo+" "+varcitynombre+"&related=myezplan";
	}
	getBloggerUrl=function(url){
		var titulo= document.getElementById('titulo_aleatorio').value;
		return "http://api.addthis.com/oexchange/0.8/forward/blogger/offer?url="+url+"&title="+titulo+" "+varcitynombre+"";
	}
	getMailUrl=function(url){
		return encodeURIComponent(url);
	}
	getGpxUrl=function(url){
		return encodeURIComponent(url);
	}
	saveUserPlan = function(saveaction, upname){
		var _message = $("#messageerror-saveplan");
		var numdays_=$.cookie("NUMDAYS");
		var numdays=1
		if(numdays_ && numdays_!=''){var numdays=numdays_}
		var date1_=$.cookie("EZDATE1");
		var date2_=$.cookie("EZDATE2");
		var date1='';
		var date2='';
		if(date1_ && date1_!=''){var date1=date1_;}
		if(date2_ && date2_!=''){var date2=date2_;}
//		var _saveplan_shareValue = true;
//		if(saveaction=="i"){ 
//			_saveplan_shareValue = $(_saveplan_share).is(":checked");
//		}
//		var _saveplan_share = $("#saveplan_addtoitinerary");
		var shareit=0;
		var _addto=$("#saveplan_shareit").is(":checked");
		if(_addto){var shareit=1;}
		var _data = "action=savemapcitypopupItinerary&saveaction="+saveaction+'&usid='+cf_sid+"&upname="+upname+"&date1="+date1+"&date2="+date2+"&upshareit="+shareit+'&upinumdays='+numdays+'&cityid='+city_id_var;
		//global_urlpagequery = encodeURIComponent(_decodedurlquery);+"&upid="+currentuserplan
		$.ajax({
			type: "POST",
			url: "http://myezplan.com/mobile/appdata/data_ajax/map_usersplans_ajax.cfm",
			async:true, 
			cache:false,
			data: _data,
			error: function(xhr, ajaxOptions, thrownError){
				showMessageError(_message,thrownError,300);
				hideMessageError(_message,false,300);
			},
			success: function(response){
				if(saveaction=='i'){
					$.cookie("MYITINERARYID",response);
					$.cookie("MYITINERARYNAME",upname);
					itineraryid=response;
					var lolo=[];
					var cookiearray=armaarraydecookies(lolo);
					var cookienames=cookiearray[0];
					var cookiedata=cookiearray[1];
					var cookietypes=cookiearray[2];
					for(co=0;co<cookienames.length;co++){
						var data_ = "action=savemapcitypopupItinerary&saveaction=cookies&uid="+response+"&cookname="+cookienames[co]+"&cookdata="+cookiedata[co]+'&cooktype='+cookietypes[co];
						$.ajax({
							type: "POST",
							url: "http://myezplan.com/mobile/appdata/data_ajax/map_usersplans_ajax.cfm",
							async:true, 
							cache:false,
							data: data_,
							error: function(xhr, ajaxOptions, thrownError){
								showMessageError(_message,thrownError,300);
								hideMessageError(_message,false,300);
							}//,
//			success: function(response){
//				//alert('siguardo');
//
//			}
						});
					}
					for(x=1;x<=numdays;x++){
						var places=$.cookie("EZMAPCITYPLACES_day"+x);
						if(!places){var places='';}
						var places2=$.cookie("EZMAPCITYPLACES2_day"+x);
						if(!places2){var places2='';}
						var fullorder=$.cookie("EZFULLORDER_day"+x);
						if(!fullorder){fullorder='';}
						var subrutas=$.cookie("EZMAPCITYSUBPLACES_day"+x);
						if(!subrutas){var subrutas='';}
						var transports=$.cookie("EZTRANSPORT_day"+x);
						if(!transports){var transports='';}
						var transportstops=$.cookie("EZTRANSPORT_S_day"+x);
						if(!transportstops){var transportstops='';}
						var services=$.cookie("EZSERVICES_day"+x);
						if(!services){var services='';}
						var ruta=$.cookie("EZROUTE_day_"+x);
						if(!ruta){var ruta=0;}else{var ruta=1;}
						var gotm=$.cookie("EZGOTM_day_"+x);
						if(!gotm){var gotm='';}		
						var _data_ = "action=savemapcitypopupItinerary&saveaction=insertdays&uid="+response+"&numday="+x+'&places='+places+'&places2='+places2+'&subplaces='+subrutas+'&transports='+transports+'&trasportstops='+transportstops+'&services='+services+'&ruta='+ruta+'&gotm='+gotm+'&fullorder='+fullorder;
						$.ajax({
							type: "POST",
							url: "http://myezplan.com/mobile/appdata/data_ajax/map_usersplans_ajax.cfm",
							async:true, 
							cache:false,
							data: _data_,
							error: function(xhr, ajaxOptions, thrownError){
								showMessageError(_message,thrownError,300);
								hideMessageError(_message,false,300);
							}//,
//			success: function(response){
//				alert(response)
//			}
						});
					}
				}
//				var _arrResponse = response.split("|");
//				var _currupid=getUrlParamValue("upid");
//				var _updatelocation=(_currupid!=_arrResponse[1]);
//				currentuserplan = _arrResponse[1];
//				$("#upid").val(_arrResponse[1]);
//				var _urlupid = "&upid="+currentuserplan;
//				var _decodedurlquery = decodeURIComponent(global_urlpagequery);
//				global_urlpagequery += _urlupid;
//				var _locationreplace=global_urlpagename+"?"+decodeURIComponent(global_urlpagequery);
//				var _time=100;
//				if(_addto){
//					_time=1000;
//					myPlanAddToCurrentItinerary("stepitinerary-box",currentuserplan);
//				}
//				if(_updatelocation){
//					window.setTimeout("window.location.replace",_time,_locationreplace);
//				}
				//showMessageError(_message,'Itinerary Saved',300);
				//hideMessageError(_message,true,300);
				var notice = new PNotify({
					title: 'Myezplan Notice',
					text: 'Itinerary Saved',
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
				});		
			}
		});
	}
armaarraydecookies=function(lolo){
					var cookiearray=[];
					var cookiedataarray=[];
					var cookienamesarray=[];
					var cookietypesarray=[];
					var ideas=$.cookie("EZIDEAS");
					if(ideas && ideas!=''){
						cookienamesarray.push("EZIDEAS");
						cookiedataarray.push(ideas);
						cookietypesarray.push(1);
					}
					var ideas_c=$.cookie("EZIDEAS_C");
					if(ideas_c && ideas_c!=''){
						cookienamesarray.push("EZIDEAS_C");
						cookiedataarray.push(ideas_c);
						cookietypesarray.push(2);
					}
					var personal=$.cookie("EZPERSONAL");
					if(personal && personal!=''){
						cookienamesarray.push("EZPERSONAL");
						cookiedataarray.push(personal);
						cookietypesarray.push(3);
					}
					for(pr=1;pr<=10;pr++){
						var pr_=$.cookie("EZPR_"+pr);
						if(pr_ && pr_!=''){
							cookienamesarray.push("EZPR_"+pr);
							cookiedataarray.push(pr_);
							cookietypesarray.push(4);
						}
						var prs=$.cookie("EZPR_"+pr+"_S");
						if(prs && prs!=''){
							cookienamesarray.push("EZPR_"+pr+"_S");
							cookiedataarray.push(prs);
							cookietypesarray.push(5);
						}
					}
//					for(co=0;co<cookienamesarray.length;co++){
//						alert(cookienamesarray[co]+' '+cookiedataarray[co]);
//					}
					cookiearray.push(cookienamesarray);
					cookiearray.push(cookiedataarray);
					cookiearray.push(cookietypesarray);
return cookiearray;
}

/* ----------------------------------------- */
});
/* jquery events */
closeMyLocation=function(arg_map){
	if(typeof(initialLocation)!="undefined"){
		arg_map.setCenter(initialLocation);
		myLocationControlChange("disable");
		clearTimeout(gtml_time1);
		clearTimeout(gtml_time2);
	}
MyLocationDiv.remove();
}
goToMyLocation=function(e,arg_map){
	//alert('gotomylocation');
	if(typeof(initialLocation)=="undefined"){initialLocation=arg_map.getCenter();}
	clearTimeout(gtml_time1);
	clearTimeout(gtml_time2);
	if(navigator.geolocation) {
		if(myLocationMarker!=null){
			myLocationMarker.setMap(null);
			myLocationMarker=null;
			arg_map.setCenter(initialLocation);
			if(typeof(e) == "undefined" || e==null){
				gtml_time2=window.setTimeout(goToMyLocation,10000,e,arg_map);
			}else{
				myLocationControlChange("disable");
				clearTimeout(gtml_time1);
				clearTimeout(gtml_time2);
			}
			return;
		}
		browserSupportFlag = true;
		$('#middle_mapcityandcheck').showLoading("Finding location",false);
		watchID = navigator.geolocation.watchPosition(function(position) {
			if(myLocationMarker!=null){
				myLocationMarker.setMap(null);
			}
			var current_center = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
			arg_map.setCenter(current_center);
			myLocationMarker = new google.maps.Marker({
				position: current_center,
				map: arg_map,
				title:"You are here!",
				icon: myLocationMarkerIcon,
				zIndex:google.maps.Marker.MAX_ZINDEX+1
			});
			myLocationControlChange("enable");
			clearTimeout(gtml_time2);
			$('.mask-loading').remove();
			//gtml_time1=window.setTimeout(goToMyLocation,10000,null,arg_map);
		}, 
		function() {
			handleNoGeolocation(browserSupportFlag);
		}
		//onErrorW
		,window.gpsoptions
		);
	// Try Google Gears Geolocation
	} else if (google.gears) {
		browserSupportFlag = true;
		var geo = google.gears.factory.create('beta.geolocation');
		geo.getCurrentPosition(function(position) {
			initialLocation = new google.maps.LatLng(position.latitude,position.longitude);
			arg_map.setCenter(initialLocation);
		}, function() {
			handleNoGeoLocation(browserSupportFlag);
		});
	// Browser doesn't support Geolocation
	} else {
		browserSupportFlag = false;
		handleNoGeolocation(browserSupportFlag);
	}
}
function handleNoGeolocation(errorFlag) {
	if (errorFlag == true) {
		alert("Geolocation service failed. Is your GPS enabled?");
		$('.mask-loading').remove();
		navigator.geolocation.clearWatch(watchID);
	} else {
		alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
	}
}
function myLocationControlChange(arg_active) {
	$("#controluimylocation").css("background-color","transparent");
	if(arg_active=="disable"){
	//	$("#controluimylocation").css("background-color","white");
	//	$("#controluimylocation").css("color","black");
		navigator.geolocation.clearWatch(watchID);
		controlText.innerHTML = '<svg class="icon icon-my_location" style="width: 30px; height: 30px;"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-my_location"></use></svg>';
	}else if(arg_active=="enable"){
//		$("#controluimylocation").css("background-color","#C00000");
//		$("#controluimylocation").css("color","white");
		controlText.innerHTML = '<svg class="icon icon-location_disabled" style="width: 30px; height: 30px;"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-location_disabled"></use></svg>';
	}
}
function myLocationControlAdd(arg_map) {
	var _myLocationControlDiv = document.createElement('div');
	var _myLocationControl = new myLocationControl(_myLocationControlDiv, arg_map);
	_myLocationControlDiv.index = 1;
	_myLocationControlDiv.id = 'mapbtn-container';
	arg_map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(_myLocationControlDiv);
}
function myLocationControl(controlDiv, arg_map) {
	$("#controluimylocation").remove();
	MyLocationDiv=controlDiv;
	controlDiv.style.padding = '3px';
	var controlUI = document.createElement('div');
	controlUI.style.backgroundColor = 'transparent';
//	controlUI.style.color = 'black';
//	controlUI.style.borderStyle = 'solid';
//	controlUI.style.borderWidth = '1px';
	controlUI.style.cursor = 'pointer';
	controlUI.style.textAlign = 'center';
	controlUI.style.padding = '3px';
	controlUI.style.display = 'inline-block';
	//controlUI.title = 'Click to see My Location';
	controlUI.id = 'controluimylocation'; 
	controlDiv.appendChild(controlUI);
	controlText = document.createElement('div');
	controlText.id='imgbuttmyloca';
	controlText.style.fontFamily = 'Arial,sans-serif';
	controlText.style.fontSize = '12px';
	controlText.style.paddingLeft = '4px';
	controlText.style.paddingRight = '4px';
	controlText.innerHTML = '<svg class="icon icon-my_location" style="width: 30px; height: 30px;"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-my_location"></use></svg>'; //'<strong>My Location</strong>';
	/*extrainfo = document.createElement('div');
	extrainfo.id='imgextrainfo';
	extrainfo.style.fontFamily = 'Arial,sans-serif';
	extrainfo.style.fontSize = '12px';
	extrainfo.style.paddingLeft = '0px';
	extrainfo.style.paddingRight = '0px';
	//extrainfo.style.display = 'inline-block';
	extrainfo.style.textAlign = 'center';
	extrainfo.style.cursor = 'pointer';
	extrainfo.innerHTML = '<img id="extrainfoimg2" onclick="extrainfofunc();" src="https://lh6.googleusercontent.com/-44bFjug7xpE/U5I5oAOzU_I/AAAAAAANfHI/a1ItxGAYBN0/s50/Untitled35.png" height="35"></a>';//'<strong>My Location</strong>';
	controlDiv.appendChild(extrainfo);*/
	$("#controluimylocation").empty();
	if ($("#controluimylocation").css("display") != "block"){
		controlUI.appendChild(controlText);
	}
	google.maps.event.addDomListener(controlUI, 'click', function(e) {
		goToMyLocation(e,arg_map);
	});
}
function goToMapPlace(origin,edit){
	var _url="mapplace.cfm?plid=";
	var _plid="";
	switch(origin){
		case "start":
			if(edit=='edit'){
				_plid=$.trim($("#editPlan_panel #partida_").val()) || $.trim($("#editPlan_panel form #sp").val());
			}else{
				_plid=$.trim($("#partida_").val()) || $.trim($("form #sp").val());
			}
			if(_plid==""){
				return false;
			}
			if(_plid<6){
				var _url='mapplace_per.cfm?';
				var plpcoo=$.cookie("EZPERSONAL");
				var plp_=plpcoo.split('!');
				var este=plp_[_plid-1];
				var este_=este.split('*');
				var nombre='plname='+este_[0];
				var coors=este_[1].replace('(','').replace(')','').split(',');
				var lat='&pllat='+coors[0];
				var lng='&pllng='+coors[1];
				var _url=_url+nombre+lat+lng;
				break;}
			else{
			_url+=_plid;			
			break;}
		case "end":
			if(edit=='edit'){				
				_plid=$.trim($("#editPlan_panel #llegada_").val()) || $.trim($("#editPlan_panel form #ep").val());
			}else{
				_plid=$.trim($("#llegada_").val()) || $.trim($("form #ep").val());
			}
			if(_plid==""){
				return false;
			}
			if(_plid<6){
				var _url='mapplace_per.cfm?';
				var plpcoo=$.cookie("EZPERSONAL");
				var plp_=plpcoo.split('!');
				var este=plp_[_plid-1];
				var este_=este.split('*');
				var nombre='plname='+este_[0];
				var coors=este_[1].replace('(','').replace(')','').split(',');
				var lat='&pllat='+coors[0];
				var lng='&pllng='+coors[1];
				var _url=_url+nombre+lat+lng;
				break;}
			else{
			_url+=_plid;			
			break;}
	}
	//window.open(_url,"mapplace");//alert(_url);
	openexternalmedia_mapplace(_plid);
}
function tooltip_(msg){
	if(msg!=''){
		document.getElementById('globo').innerHTML=msg;
		document.getElementById('globo').style.display='block';
	}
}
function toolout_(){
	document.getElementById('globo').innerHTML='';
	document.getElementById('globo').style.display='none';
}
function extrainfofunc(){
	if($("#titlehead").css("display") == "none"){
		$("#body_map_canvas .gm-style").removeClass("gmstylefull");
		$("#titlehead").show();
		$("#titlehead_virt").show();	
		$('.buttonsforplanday').show();
		document.getElementById("extrainfoimg2").src="https://lh6.googleusercontent.com/-ZQfQ41ScQuk/U5I5oMgzbnI/AAAAAAANfHE/ur_4Fpn-eT0/s51/Untitled39.png";
	}else{
		$("#body_map_canvas .gm-style").addClass("gmstylefull");
		$("#titlehead").hide();
		$("#titlehead_virt").hide();	
		$('.buttonsforplanday').hide();
		document.getElementById("extrainfoimg2").src="https://lh6.googleusercontent.com/-44bFjug7xpE/U5I5oAOzU_I/AAAAAAANfHI/a1ItxGAYBN0/s50/Untitled35.png";
	}
}
/*
getPageUrl=function(arg_origin){
	//arg_origin = ['form','url']
	var _origin=($.trim(arg_origin)!="")?arg_origin:"url";
	switch(_origin.toLowerCase()){
		case "form":
			var _form = $("#drawform");
			//global_urlpagequery="?"+_form.serialize();
			global_urlpagequery="?"+_form.find(":input[value][value!='']").serialize();
			break;
		case "url":
			var _re=new RegExp('[\\?]').exec(global_urlpagequery);
			global_urlpagequery="?"+global_urlpagequery.replace(_re,"");
			break;
	}
	return $.trim(global_urlpagename)+""+$.trim(global_urlpagequery);
}
getShortenPageUrl_ajax=function(arg_origin){
	var _url = "cfc/mapcity.cfc";
	var _urlconfig = {method:"googleURLShorten_json",url:getPageUrl(arg_origin)};
	$.getJSON(_url,_urlconfig,getShortenPageUrl_ajax_result);
}
getShortenPageUrl_ajax_result=function(response, status, xhr){
	global_urlShortenFullpage=response.URL;
	var _popup = $("#share-box");
	_popup.find("#share-box-twitter-e").attr("href",getTweeterUrl());
	_popup.find("#share-box-blogger-e").attr("href",getBloggerUrl());
	_popup.find("#share-box-2 #sharelink").val(getMailUrl());
	_popup.find("#share-box-2 #sharelinkgpx").val(getGpxUrl());
}
getShortenPageUrl=function(){
	return global_urlShortenFullpage;
}
myPlanCityShare=function(event,parentobj,arg_origin){
	getShortenPageUrl_ajax(arg_origin);
	var _popup = $("#share-box");
	_popup.fadeIn(300);
	_popup.find('#title-box-2').click();
	var popMargTop = (_popup.height() + 24) / 2; 
	var popMargLeft = (_popup.width() + 24) / 2; 
	_popup.css({ 
		//'margin-top' : -popMargTop,
		'margin-left' : -popMargLeft
	});
	$('body').append('<div id="mask" class="mask"></div>');
	$('#mask').fadeIn(300);
	_popup.find("#share-box-facebook-e").click(function(e) {
		window.open(getFacebookUrl(),'sharer','toolbar=0,status=0,width=626,height=436'); return false;
	});
}
showPrint=function(arg_showhide,arg_object){
	$("#"+arg_object+"").toggle(arg_showhide);
}
*/