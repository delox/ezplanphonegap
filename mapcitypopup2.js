/*jslint browser: true*/
/*global $, jQuery, alert*/
/*jslint nomen: true */
function close_reportaproblem() {
   
    $('#mask-reportview').fadeOut(300);
	$('#mask-reportview').empty();
	$('#mask-reportview').remove();
}

function Open_reportaproblem_p(plid) {
   
    $('body').append('<div id="mask-reportview" class="mask-reportview" align="center"><div style="background-color: white;width:95%;max-width:700px;margin-top:50px;-webkit-box-shadow: 0px 0px 15px 4px #eee;-webkit-border-radius: 16px 16px 16px 16px;"><h1 style="text-align:center;"><span class="capitalize_red">R</span>eport a Problem<img style="float:right; padding-right:10px;" height="35px" src="https://lh3.googleusercontent.com/-bVXoUkgEPSE/VTpfDooIleI/AAAAAAANhXg/YYD2Il5daI8/s45/X.png" onclick="Close_reportaproblem();"></h1><div id="reportaproblem-content"></div></div></div>');
    var popZindez = (parseInt($("#roadmapplace-box").css("z-index"), 10)) + 5,
        cf_sid,
	    _url  = "data_ajax/reportaproblem_content.cfm",
	    _urlconfig = {action: 'reportaproblem_p', plid: plid, user: cf_sid};
    $('#mask-reportview').css({'z-index' : popZindez});
    $('#mask-reportview').fadeIn(300);
	$('#reportaproblem-content').load(_url, _urlconfig, function (response, status, xhr) {
	    switch (status) {
		case "error":
            close_reportaproblem();
		    break;
		}
	});
}

function ideasrouteclick(index) {
   
    var arrayideasr,
	    id = arrayideasr[index].id,
	    yatiene = 1;
	if (arrayideasr[index].desc_ === '') {yatiene = 0; }
	ideasroutedetails(id, yatiene);
}

function ideasrouteover(index) {
   
    var arrayideasr;
	arrayideasr[index].setOptions({strokeColor: '#000000'});
	$('.ideasrow_' + index).css('background-color', 'rgb(211, 211, 211)');
}

function ideasrouteout(index) {
   
    var arrayideasr;
	arrayideasr[index].setOptions({strokeColor:arrayideasr[index].color});
	if (arrayideasr[index].added === 1) {
		$('.ideasrow_' + index ).css('background-color', 'rgb(169, 169, 169)');
	}
	    else{
		    $('.ideasrow_' + index ).css('background-color', '');
	    }
}

function armatextolistaideas() {
    var texto = '';
	for (l= 0 ; l < textolistaideas.length; l++ ){
		var texto=texto+ textolistaideas[l];
	}
var texto='<table>'+texto+'</table>';
$('#listadeideas').html(texto);
$('#listadeideas').show();
}
function textodepersonales() {
	var texto=''
	for(pm=0;pm<personalmrks.length;pm++){
		var texto=texto+'<tr class="personalmrk_'+(pm)+'" onmouseover="mrkpersonalover('+(pm+1)+');" onmouseout="mrkpersonalout('+(pm+1)+');" onclick="mrkpersonalclick('+(pm+1)+');"><td><img src="'+personalmrks[pm].getIcon()+'" height="35px;"></td><td>'+personalmrks[pm].getTitle()+'</td></tr>';
	}
	var texto='<div style="max-height:350px; overflow:auto; padding: 5px 5px 5px 5px;max-width: 670px;width:95%;border: solid medium #F2F2F2;border-radius: 20px 20px 20px 20px;"><table>'+texto+'</table></div>';
	$('#transport_descs').html(texto);
}
function mrkpersonalover(oindex) {
var index=oindex-1;
personalmrks[index].setAnimation(google.maps.Animation.BOUNCE);
$('.personalmrk_'+index).css('background-color','rgb(169, 169, 169)');
}
function mrkpersonalout(oindex) {
var index=oindex-1;
personalmrks[index].setAnimation(null);
$('.personalmrk_'+index).css('background-color','');
}
function mrkpersonalclick(oindex) {
var index=oindex-1;
personalmrks[index].userinfowindow.open(mapcitypopup.mapconfig.google.map,personalmrks[index]);
}
function eliminateindexestrans(id) {
var index=-1;
for(d=0;d<listadetrans_ids.length;d++){
	if(listadetrans_ids[d]==id){var index=d;}
}
return index;
}
function eliminatetransfromlist(ids) {
ids_=ids.split(',');
var indexes=[]
for(x=0;x<ids_.length;x++){
	var index=eliminateindexestrans(ids_[x]);
	listadetrans_ids.splice(index,1);
	listadetrans.splice(index,1);
	//alert(listadetrans_ids.join(','));
	if(x==(ids_.length-1)){showtranslist();}
}
}
function eliminateindexesserv(id) {
var index=-1;
for(d=0;d<listadeserv_ids.length;d++){
	if(listadeserv_ids[d]==id){var index=d;}
}
return index;
}
function eliminateservfromlist(ids) {
ids_=ids.split(',');
var indexes=[]
for(x=0;x<ids_.length;x++){
	var index=eliminateindexesserv(ids_[x]);
	listadeserv_ids.splice(index,1);
	listadeserv.splice(index,1);
	//alert(listadetrans_ids.join(','));
	if(x==(ids_.length-1)){showservlist();}
}
}
function showtranslist() {
var texto='<table id="list-trans">';
for(t=0;t<listadetrans.length;t++){
	var texto=texto+listadetrans[t];
}
var texto=texto+'</table>';
if(listadetrans.length>0){
	$('#transport_descs').html('<div style="max-height:350px; overflow:auto; padding: 5px 5px 5px 5px;max-width: 670px;width:95%;" class="box-gray-c">'+texto+'</div>');
}
else{$('#transport_descs').html('');}
}
function showservlist() {
var texto='<table id="list-serv">';
for(t=0;t<listadeserv.length;t++){
	var texto=texto+listadeserv[t];
}
var texto=texto+'</table>';
if(listadeserv.length>0){
	$('#transport_descs').html('<div style="max-height:350px; overflow:auto; padding: 5px 5px 5px 5px;max-width: 670px;width:95%;" class="box-gray-c">'+texto+'</div>');
}
else{$('#transport_descs').html('');}
}
function trasportselected(este) {
var esta=0;
var numdays_=$.cookie("NUMDAYS");
var numdays=1
if(numdays_ && numdays_!=''){var numdays=numdays_}
	for(n=1;n<=numdays;n++){
		var cootransport=$.cookie("EZTRANSPORT_day"+n);
		if(cootransport && cootransport!=''){
			var cotrans=cootransport.split(',');
			for(t=0;t<cotrans.length;t++){if(cotrans[t]==este){var esta=1;}
		}
	}
}
return esta;
}
function trasportselected_day(este,day) {
var esta=0;
		var cootransport=$.cookie("EZTRANSPORT_day"+day);
		if(cootransport && cootransport!=''){
			var cotrans=cootransport.split(',');
			for(t=0;t<cotrans.length;t++){if(cotrans[t]==este){var esta=1;};}
		
		}
return esta;
}
function servicesselected(este) {
var esta=0;
var numdays_=$.cookie("NUMDAYS");
var numdays=1
if(numdays_ && numdays_!=''){var numdays=numdays_}
	for(n=1;n<=numdays;n++){
		var cootransport=$.cookie("EZSERVICES_day"+n);
		if(cootransport && cootransport!=''){
			var cotrans=cootransport.split(',');
			for(t=0;t<cotrans.length;t++){if(cotrans[t]==este){var esta=1;}
		}
	}
}
return esta;
}
function drawpersonalroutes() {
var arraydepr=[];
for(pr=1;pr<=10;pr++){
	var cook=$.cookie("EZPR_"+pr);
	if(cook && cook!=''){
	if(pr==1){
		var color='#FF00FF';
		var icono='https://lh6.googleusercontent.com/-8xxqF9thOCg/U9nRcchbb_I/AAAAAAANgBg/C77KoahO1Sc/s44/64.png';
		}
	if(pr==2){
		var color='#00FFCC';
		var icono='https://lh3.googleusercontent.com/-Tx9ASyR-Pm0/U9nRcry7fQI/AAAAAAANgB4/S4-sPOCQyv4/s44/66.png';
		}
	if(pr==3){
		var color='#6600CC';
		var icono='https://lh3.googleusercontent.com/-Y2nKnJNaweg/U9nRcP8BO4I/AAAAAAANgBc/nnLGfRYqBm8/s45/65.png';
		}
	if(pr==4){
		var color='#FF0033';
		var icono='https://lh5.googleusercontent.com/-E1dAbz_GUo8/U9nRfXIuR0I/AAAAAAANgCw/x-ZRzX81FTM/s44/72.png';
	}
	if(pr==5){
		var color='#99CC33';
		var icono='https://lh4.googleusercontent.com/-Npa9fnZ8jsI/U9nRgTkZovI/AAAAAAANgCg/RYgxYCvC1as/s44/74.png';
	}
	if(pr==6){
		var color='#009999';
		var icono='https://lh3.googleusercontent.com/-yVml473bYZ4/U9nRhTGcy6I/AAAAAAANgC8/b_xcPHU1RM0/s44/77.png';
	}
	if(pr==7){
		var color='#FF6600';
		var icono='https://lh6.googleusercontent.com/-_APxQcrJomA/U9nRhG6kRZI/AAAAAAANgCo/aCfSRKHPbO4/s44/76.png';
	}
	if(pr==8){
		var color='#666600';
		var icono='https://lh6.googleusercontent.com/-f05N3TVBgaQ/U9nReUw3BJI/AAAAAAANgCI/Wqev2rAqxDI/s44/70.png';
	}
	if(pr==9){
		var color='#989898';
		var icono='https://lh6.googleusercontent.com/-gjaXgjiHqzc/U9nRgg5WKcI/AAAAAAANgCk/TQs3DftLy1U/s44/75.png';
	}
	if(pr==10){
		var color='#FF0000';
		var icono='https://lh6.googleusercontent.com/-io7fsMrgN34/U9nRenFm-_I/AAAAAAANgCE/zbAnDMFVe4Q/s44/71.png';
		}
	var cook1=cook.split('!')
	var name=cook1[0];
	var coors_=cook1[1];
	var route=[];
	route.push(name);
	route.push(coors_);
	route.push(pr);
	route.push(color);
	route.push(icono);
	arraydepr.push(route);	
		}
}
map_pr(arraydepr,0);
}
function placeMarker_proute(location,name,route,deonde,icono) {
//if(route==1){
			  var userroutemarker = new google.maps.Marker({
			  position: location,
			  icon: icono, 
			  map: mapcitypopup.mapconfig.google.map,
			  title : name,
			 draggable: false
 			});
			userroutemarker.id=route;
			userroutemarker.icono=icono;
			personalroutesmarks.push(userroutemarker);
			google.maps.event.addListener(userroutemarker, 'click', function() {
				showprdata(route,name);
			});
}
function placeMarker(location) {
	var titulo=  prompt("Please enter Place name","");
	var j = titulo || '';
	if(!j || j==''){alert('Not a valid name, please try again');return false;}
	var coopersonal=$.cookie("EZPERSONAL");
	if(coopersonal && coopersonal!=''){
		var coper=coopersonal.split('!');
		if(coper.length >= 10){alert('You have reached the max(10) of personal points');return false;}
		placesadded2.push(coper.length+1);
	}
	else{
		placesadded2.push(1);
	}
	var clickedLocation = new google.maps.LatLng(location);
	var usermarker = new google.maps.Marker({
		 position: location,
		 icon: 'ezmapas/maps_pics/basic/userplace.png', 
		 map: mapcitypopup.mapconfig.google.map,
		 draggable: true
	});
	usermarker.setTitle(j.toString());
	usermarker.orignumber=personalmrks.length+1;
	personalmrks.push(usermarker);
	var coopersonal=$.cookie("EZPERSONAL");
	if(coopersonal && coopersonal!=''){
		var newcookie_=coopersonal+'!'+titulo+'*'+location;
		//var newcookie=newcookie_.replace(/ /g,'');
		var newcookie=newcookie_;
		$.cookie("EZPERSONAL",newcookie);
	}
	else{
		var newcookie_=titulo+'*'+location;
		//var newcookie=newcookie_.replace(/ /g,'');
		var newcookie=newcookie_;
		$.cookie("EZPERSONAL",newcookie);
	}
	usermarker.userinfowindow = new google.maps.InfoWindow(
	{ content: '<table><tr><th align="center">'+titulo+'</th></tr><tr><td align="center"><input type="button" value="Delete" onclick="deletepersonal('+"'"+titulo+"',"+(personalmrks.length)+');"></td></tr><tr><td align="center"><input type="button" value="Edit Dates" onclick="opencalforpersonals('+"'"+titulo+"',"+(personalmrks.length)+');"></td></tr><tr><td align="center"><input type="button" value="Suggest" onclick="sugestplace('+"'"+titulo+"','"+location+"',"+city_id_var+');"></td></tr></table>',
	size: new google.maps.Size(150,150)
	});
	google.maps.event.addListener(usermarker, 'click', function() {
		mrkpersonalclick(usermarker.orignumber);
	});
	google.maps.event.addListener(usermarker, 'mouseover', function() {
		mrkpersonalover(usermarker.orignumber);
	});
		google.maps.event.addListener(usermarker, 'mouseout', function() {
		mrkpersonalout(usermarker.orignumber);
	});
	google.maps.event.addListener(usermarker, 'dragend', function() {
		updatecoor(usermarker.getTitle(),usermarker.getPosition());
	});
	if(typeof(global_showbutton)!='undefined'){
		if(global_showbutton){
			global_showbutton=false;
			mapcitypopup.showSelPlaces();
		}
	}
	opencalforpersonals(j,personalmrks.length);
	textodepersonales();
}
function opencalforpersonals(name,num) {
	for(m=0;m<personalmrks.length;m++){
		if(personalmrks[m].getTitle()==name && personalmrks[m].orignumber==num){idx=(m+1);}
	}
	var numdays_=$.cookie("NUMDAYS");
	var numdays=1
	if(numdays_ && numdays_!=''){var numdays=numdays_}
	var date1_=$.cookie("EZDATE1");
	var date2_=$.cookie("EZDATE2");
	var date1='';
	var date2='';
	if(date1_ && date1_!=''){var date1=date1_;}
	if(date2_ && date2_!=''){var date2=date2_;}
	var popup = $("#Calendario-mapcitypopup-pan");
	popup.panel({close: function( event, ui ) {}});
	popup.show();
	popup.panel("open");
	//if(window.lastdate1 != date1_ || window.lastdate2 != date2_ || !sessionStorage.getItem("calendarpp"+idx)){
		popup.showLoading("Please Wait,<br/>Loading...<br/>",false);
		var url = "https://myezplan.com/mobile/appdata/data_ajax/mapcity_content3.cfm?rnu=5131616516651";
		var urlconfig = {action:"calendarioplaces",ruta_id:idx,date1:date1,date2:date2,numdays:numdays,source:'Mapcitypopup_p',name:name};
		$.ajax({
			type: "POST",
			url: url,
			async:true, 
			cache:false,
			data: urlconfig,
			success: function(datos){
				$("#Calendario-mapcitypopup-pan .box-body").html(datos).promise().done($('.mask-loading').remove());
				sessionStorage.setItem("calendarpp"+idx,datos);
				window.lastdate1 = date1_;
				window.lastdate2 = date2_;
			}
		});
	/*}else{
		$("#Calendario-mapcitypopup-pan .box-body").html(sessionStorage.getItem("calendarpp"+idx));
	}*/	
	//var popup = $("#Calendario-mapcitypopup");
	var popMargTop = 650; 
	var popMargLeft = ($(popup).width() + 24) / 2; 
	var popZindez = (parseInt(popup.css("z-index"))) + 5;
	$(popup).css({ 

		//'margin-top' : -popMargTop,
		//'margin-left' : -popMargLeft,
		//'z-index' : popZindez + 1
	});
	//$('body').append('<div id="mask-Calendario-box" class="mask"></div>');
	//$('#mask-Calendario-box').fadeIn(300).css('z-index',popZindez);
	/*
	*/
	//$(popup).fadeIn(0);
	//$(popup).scrollToMe();
	window.reloadlastitemcal = function(){opencalforpersonals(name,num)}
}
function placeMarker2(title,pos) {
			var usermarker = new google.maps.Marker({
			  position: pos,
			  icon: 'ezmapas/maps_pics/basic/userplace.png', 
			  map: mapcitypopup.mapconfig.google.map,
			  title:title,
			 draggable: true
 
			});
			personalmrks.push(usermarker);
			usermarker.orignumber=personalmrks.length;
			usermarker.userinfowindow = new google.maps.InfoWindow(
			{ content: '<table><tr><th align="center">'+title+'</th></tr><tr><td align="center"><input type="button" value="Delete" onclick="deletepersonal_ya('+"'"+title+"',"+(personalmrks.length)+');"></td></tr><tr><td align="center"><input type="button" value="Edit Dates" onclick="opencalforpersonals('+"'"+title+"',"+(personalmrks.length)+');"></td></tr><tr><td align="center"><input type="button" value="Suggest" onclick="sugestplace('+"'"+title+"','"+pos+"',"+city_id_var+');"></td></tr></table>',
				size: new google.maps.Size(150,150)
			});
			google.maps.event.addListener(usermarker, 'click', function() {
				mrkpersonalclick(usermarker.orignumber);
			});
			google.maps.event.addListener(usermarker, 'mouseover', function() {
				mrkpersonalover(usermarker.orignumber);
			});
			google.maps.event.addListener(usermarker, 'mouseout', function() {
				mrkpersonalout(usermarker.orignumber);
			});
			google.maps.event.addListener(usermarker, 'dragend', function() {
				updatecoor(usermarker.getTitle(),usermarker.getPosition());
			});
if(typeof(global_showbutton)!='undefined'){if(global_showbutton){global_showbutton=false;mapcitypopup.showSelPlaces();};}
}
function updatecoor(titulo,coors) {
	var new_=titulo+'*'+coors;
	var new__=new_.replace(/ /g,'')
	var coopersonal=$.cookie("EZPERSONAL")
	if(coopersonal && coopersonal!=''){
	var coper=coopersonal.split('!');
	var newcoo='';
	for (co=0;co<coper.length;co++){
	var coper_=coper[co].split('*');
	var titulo2=coper_[0];
if(newcoo==''){var div='';}else{var div='!';}
	if(titulo2!=titulo){var newcoo=newcoo+div+coper[co];} 
	else{var newcoo=newcoo+div+new__;}
	}
$.cookie("EZPERSONAL",newcoo)
}
	}
function deletepersonal_ya(titulo,num) {
	for(m=0;m<personalmrks.length;m++){
			if(personalmrks[m].getTitle()==titulo && personalmrks[m].orignumber==num){personalmrks[m].setMap(null);var idx=m;}
		}
personalmrks.splice(idx,1);
var coopersonal=$.cookie("EZPERSONAL")
			if(coopersonal && coopersonal!=''){
				var coper=coopersonal.split('!');
				var newcoo='';
				for (co=0;co<coper.length;co++){
					var coper_=coper[co].split('*');
					var titulo2=coper_[0];
					if(titulo2!=titulo){
						if(newcoo==''){var div='';}else{var div='!';}
						var newcoo=newcoo+div+coper[co];
						} 
				}
			}
$.cookie("EZPERSONAL",newcoo)
var numdays_=$.cookie("NUMDAYS");
if(numdays_ && numdays_ !='' && numdays_!=0){
for(d=0;d<numdays_;d++){
var loads = $.cookie('EZMAPCITYPLACES_day'+(d+1));
var _loads=$.cookie('EZMAPCITYPLACES2_day'+(d+1));
if(loads && loads != ''){
var loads_= loads.split(',')
var newcookie=''
					for(x=0;x<=(loads_.length-1);x++){
					if(loads_[x]!=idx+1){
					var div = ',';
					if(newcookie==''){var div=''}
						if(loads_[x]<11 && loads_[x]>(idx+1)){var esteid=loads_[x]-1;}
						else{esteid=loads_[x];}
						newcookie=newcookie+div+esteid;
					}
					}
					//alert(newcookie);
					$.cookie('EZMAPCITYPLACES_day'+(d+1),newcookie);
if(_loads && _loads != ''){
var _loads_= _loads.split(',')
var newcookie=''
					for(y=0;y<=(_loads_.length-1);y++){
					if(_loads_[y]!=idx+1){
					var div = ',';
					if(newcookie==''){var div=''}
						if(_loads_[y]<11 && _loads_[y]>(idx+1)){var esteid=_loads_[y]-1;}
						else{esteid=_loads_[y];}
						newcookie=newcookie+div+esteid;
					}
					}
					//alert(newcookie);
					$.cookie('EZMAPCITYPLACES2_day'+(d+1),newcookie);
}
}
}
}
else{
var loads = $.cookie('EZMAPCITYPLACES_day1');
var _loads = $.cookie('EZMAPCITYPLACES2_day1');
if(loads && loads != ''){
var loads_= loads.split(',')
var newcookie=''
					for(x=0;x<=(loads_.length-1);x++){
					if(loads_[x]!=idx+1){
					var div = ',';
					if(newcookie==''){var div=''}
						if(loads_[x]<11 && loads_[x]>(idx+1)){var esteid=loads_[x]-1;}
						else{esteid=loads_[x];}
						newcookie=newcookie+div+esteid;
					}
					}
					//alert(newcookie);
					$.cookie('EZMAPCITYPLACES_day1',newcookie);
if(_loads && _loads != ''){
var _loads_= _loads.split(',')
var newcookie=''
					for(y=0;y<=(_loads_.length-1);y++){
					if(_loads_[y]!=idx+1){
					var div = ',';
					if(newcookie==''){var div=''}
						if(_loads_[y]<11 && _loads_[y]>(idx+1)){var esteid=_loads_[y]-1;}
						else{esteid=_loads_[y];}
						newcookie=newcookie+div+esteid;
					}
					}
					//alert(newcookie);
					$.cookie('EZMAPCITYPLACES2_day1',newcookie);
}
}
}
					updateMapCityCookie();
					placesdeleted2.push(num);
if(typeof(global_showbutton)!='undefined'){if(global_showbutton){global_showbutton=false;mapcitypopup.showSelPlaces();};}
}
function deletepersonal(titulo,num) {
	for(m=0;m<personalmrks.length;m++){
			if(personalmrks[m].getTitle()==titulo && personalmrks[m].orignumber==num){personalmrks[m].setMap(null);var idx=m;}
		}
personalmrks.splice(idx,1);
placetodel=-1;
for(z=0;z<placesadded2.length;z++){
if(placesadded2[z]==idx+1){placetodel=z;}
if(placesadded2[z]>idx+1){placesadded2[z]=placesadded2[z]-1}
}
if(placetodel>=0){placesadded2.splice(placetodel,1);}
var coopersonal=$.cookie("EZPERSONAL")
			if(coopersonal && coopersonal!=''){
				var coper=coopersonal.split('!');
				var newcoo='';
				for (co=0;co<coper.length;co++){
					var coper_=coper[co].split('*');
					var titulo2=coper_[0];
					if(titulo2!=titulo){
						if(newcoo==''){var div='';}else{var div='!';}
						var newcoo=newcoo+div+coper[co];
						} 
				}
			}
$.cookie("EZPERSONAL",newcoo)
var numdays_=$.cookie("NUMDAYS");
if(numdays_ && numdays_ !='' && numdays_!=0){
for(d=0;d<numdays_;d++){
var loads = $.cookie('EZMAPCITYPLACES_day'+(d+1));
var _loads = $.cookie('EZMAPCITYPLACES2_day'+(d+1));
if(loads && loads != ''){
var loads_= loads.split(',')
var newcookie=''
					for(x=0;x<=(loads_.length-1);x++){
					if(loads_[x]!=idx+1){
					var div = ',';
					if(newcookie==''){var div=''}
						if(loads_[x]<11 && loads_[x]>(idx+1)){var esteid=loads_[x]-1;}
						else{esteid=loads_[x];}
						newcookie=newcookie+div+esteid;
					}
					}
					//alert(newcookie);
					$.cookie('EZMAPCITYPLACES_day'+(d+1),newcookie);
if(_loads && _loads != ''){
var _loads_= _loads.split(',')
var newcookie=''
					for(y=0;y<=(_loads_.length-1);y++){
					if(_loads_[y]!=idx+1){
					var div = ',';
					if(newcookie==''){var div=''}
						if(_loads_[y]<11 && _loads_[y]>(idx+1)){var esteid=_loads_[y]-1;}
						else{esteid=_loads_[y];}
						newcookie=newcookie+div+esteid;
					}
					}
					//alert(newcookie);
					$.cookie('EZMAPCITYPLACES2_day'+(d+1),newcookie);
}

}
}
}
else{
var loads = $.cookie('EZMAPCITYPLACES_day1');
var _loads = $.cookie('EZMAPCITYPLACES2_day1');
if(loads && loads != ''){
var loads_= loads.split(',')
var newcookie=''
					for(x=0;x<=(loads_.length-1);x++){
					if(loads_[x]!=idx+1){
					var div = ',';
					if(newcookie==''){var div=''}
						if(loads_[x]<11 && loads_[x]>(idx+1)){var esteid=loads_[x]-1;}
						else{esteid=loads_[x];}
						newcookie=newcookie+div+esteid;
					}
					}
					//alert(newcookie);
					$.cookie('EZMAPCITYPLACES_day1',newcookie);
}
if(_loads && _loads != ''){
var _loads_= _loads.split(',')
var newcookie=''
					for(y=0;y<=(_loads_.length-1);y++){
					if(_loads_[y]!=idx+1){
					var div = ',';
					if(newcookie==''){var div=''}
						if(_loads_[y]<11 && _loads_[y]>(idx+1)){var esteid=_loads_[y]-1;}
						else{esteid=_loads_[y];}
						newcookie=newcookie+div+esteid;
					}
					}
					//alert(newcookie);
					$.cookie('EZMAPCITYPLACES2_day1',newcookie);
}
}
					updateMapCityCookie();
					//placesdeleted.push(idx+1);
if(typeof(global_showbutton)!='undefined'){if(global_showbutton){global_showbutton=false;mapcitypopup.showSelPlaces();};}
}
function personalplaces() {
var coopersonal=$.cookie("EZPERSONAL")
			if(coopersonal && coopersonal!=''){
				var coper=coopersonal.split('!');
				for (co=0;co<coper.length;co++){
					var coper_=coper[co].split('*');
					var titulo=coper_[0];
					var mpos=coper_[1];
					var mpos_=mpos.replace('(','').replace(')','').split(',')
					var _mpos=new google.maps.LatLng(parseFloat(mpos_[0]),parseFloat(mpos_[1]));
					placeMarker2(titulo,_mpos)
					//alert(titulo+' '+_mpos);
				}
			}
}
function sugestplace(name,coors_,city) {
	var coors=coors_.replace(/ /g,'');
	window.plname	= name;
	window.plcoors	= coors;
	window.city 	= city;
showExternalPage('suggest_includes/suggest_content.cfm?PNone&action=suggest_p&name='+name+'&coors='+coors+'&city='+city,'iframe');
}


/*Funciones de mi MI*/
deletepersonalplan_mi=function(itiid,upp_id){
	var conf=confirm('You are going to delete this personal plan, are you sure?')
	if(!conf){return false;}
	var url = "https://myezplan.com/mobile/appdata/data_ajax/mapcity_content_EI.cfm?rnu=5131616516651";
	var urlconfig = {action:"deletepersonal_myiti",itiid:itiid,upp_id:upp_id};
	$("#divitifuncs").load(url,urlconfig)
}
deletedeal_mi=function(itiid,uid_id){
	var conf=confirm('You are going to delete this deal from the itinerary, are you sure?')
	if(!conf){return false;}
	var url = "https://myezplan.com/mobile/appdata/data_ajax/mapcity_content_EI.cfm?rnu=5131616516651";
	var urlconfig = {action:"deletedeal_myiti",itiid:itiid,uid_id:uid_id};
	$("#divitifuncs").load(url,urlconfig)
}
addnotetopersonalplan_mi=function(upp_id,note){
	$(".divitifuncs2").remove();
	if(note=='Add a note'){note='';}
	$("#divitifuncs").append('<div class="divitifuncs2"></div>')
	var url = "https://myezplan.com/mobile/appdata/data_ajax/mapcity_content_EI.cfm?rnu=5131616516651";
	var urlconfig = {action:"addnotepersonal_myiti",note:note,upp_id:upp_id};
	$(".divitifuncs2").load(url,urlconfig)
}
addnotetodeal_mi=function(uid_id,note){
	$(".divitifuncs2").remove();
	if(note=='Add a note'){note='';}
	$("#divitifuncs").append('<div class="divitifuncs2"></div>')
	var url = "https://myezplan.com/mobile/appdata/data_ajax/mapcity_content_EI.cfm?rnu=5131616516651";
	var urlconfig = {action:"addnotedeal_myiti",note:note,uid_id:uid_id};
	$(".divitifuncs2").load(url,urlconfig)
}
emptydaycookies=function(day){
	var conf=confirm('This will delete all places and routes for this day, are you sure');
	if(!conf){return false;}
	$.cookie('EZMAPCITYPLACES_day'+day,false, {path: '/',expires: -1});
	$.cookie('EZMAPCITYPLACES_day'+day,null);
	$.cookie('EZMAPCITYPLACES2_day'+day,false, {path: '/',expires: -1});
	$.cookie('EZMAPCITYPLACES2_day'+day,null);
	$.cookie('EZMAPCITYSUBPLACES_day'+day,false, {path: '/',expires: -1});
	$.cookie('EZMAPCITYSUBPLACES_day'+day,null);
	$.cookie("EZTRANSTOPS_day"+day,false, {path: '/',expires: -1});
	$.cookie('EZTRANSTOPS_day'+day,null);
	$.cookie("EZTRANSPORT_day"+day,false, {path: '/',expires: -1});
	$.cookie('EZTRANSPORT_day'+day,null);
	$.cookie("EZSERVICES_day"+day,false, {path: '/',expires: -1});
	$.cookie('EZSERVICES_day'+day,null);
	$.cookie("EZROUTE_day_"+day,false, {path: '/',expires: -1});
	$.cookie('EZROUTE_day_'+day,null);
	$.cookie("EZGOTM_day_"+day,false, {path: '/',expires: -1});
	$.cookie('EZGOTM_day_'+day,null);
	$.cookie("EZFULLORDER_day"+day,null);
	checkplacesadd();
	checktransportsadd();
	checkservicesadd();
	$(".ui-panel").panel("close");
	var itiid=$.cookie("MYITINERARYID");
	if(itiid && itiid!=''){
		var url = "https://myezplan.com/mobile/appdata/data_ajax/mapcity_content_EI.cfm?rnu=5131616516651";
		var urlconfig = {action:"emptyday_myiti",itiid:itiid,day:day};
		$("#divitifuncs").load(url,urlconfig)		
	}
}
addnotetoday_mi=function(day,note){
	$(".divitifuncs2").remove();
	if(note=='Add a note'){note='';}
	$("#divitifuncs").append('<div class="divitifuncs2"></div>')
	$.cookie("EZNOTE_day"+day,note);
	var itiid=$.cookie("MYITINERARYID");
	if(itiid && itiid!=''){
		var url = "https://myezplan.com/mobile/appdata/data_ajax/mapcity_content_EI.cfm?rnu=5131616516651";
		var urlconfig = {action:"addnotetoday_myiti",itiid:itiid,day:day,note:note};
		$(".divitifuncs2").load(url,urlconfig)		
	}
}
movepersonaltoaday_mi=function(itiid,upp_id,newday){
		var url = "https://myezplan.com/mobile/appdata/data_ajax/mapcity_content_EI.cfm?rnu=5131616516651";
		var urlconfig = {action:"movepersonal_myiti",itiid:itiid,newday:newday,upp_id:upp_id};
		$("#divitifuncs").load(url,urlconfig)	
}
movedealtoaday_mi=function(itiid,uid_id,newday){
		var url = "https://myezplan.com/mobile/appdata/data_ajax/mapcity_content_EI.cfm?rnu=5131616516651";
		var urlconfig = {action:"movedeal_myiti",itiid:itiid,newday:newday,uid_id:uid_id};
		$("#divitifuncs").load(url,urlconfig)	
}
function myDealPrint_mi(evento,method,duid){
	evento.preventDefault();
	var _data = "om="+method+"&duid="+duid+"";
	var _url = "https://myezplan.com/mobile/appdata/voucherpdf.cfm?"+_data+"";
	if(method=="inline"){
		window.open(_url,"voucherpdf","");
		return false;
	}
	window.location.replace(_url);
	return false;
}