followtransroute=function(direction){
	$("#butres2").show();
	if(vartransportinview_idx!=-1){
		$('.lista_st_'+vartransportinview_idx).css("background-color",'');
		$('.lista_st_'+vartransportinview_idx+' td').css("padding",'0px');
	}
	if(direction=='n'){vartransportinview_idx = vartransportinview_idx+1;}
	if(direction=='p'){vartransportinview_idx = vartransportinview_idx-1;}
	if(vartransportinview_idx < 0){vartransportinview_idx =0;}
	if(vartransportinview_idx > (array_tras_stops.length -1)){vartransportinview_idx =(array_tras_stops.length -1);}
	mapcitypopup.mapconfig.google.map.setCenter(array_tras_stops[vartransportinview_idx].getPosition());
	mapcitypopup.mapconfig.google.map.setZoom(14);
	var texto='<span>'+array_tras_stops[vartransportinview_idx].nombre+'</span>'
	$('.lista_st_'+vartransportinview_idx).css("background-color",'#eee');
	$('.lista_st_'+vartransportinview_idx+' td').css("padding",'5px');
	$('html, body').animate({ scrollTop: $('.lista_st_'+vartransportinview_idx).offset().top - $("#show_box2").height() - 100 }, 'fast');
	$('#map_titulos_subroutestops').html(texto);
}
resetsubroutemap_t=function(){
	$('#butres').hide();
	mapcitypopup.mapconfig.google.map.fitBounds(estediarutamarkers[var_index_route].bounds);
	$('#map_titulos_subroutestops').empty();
	$('.lista_st_'+vartransportinview_idx).css("background-color",'');
	vartransportinview_idx=-1;
}
view_subroute_t=function(rid){
	if(vartransportinview==0){
		vartransportinview=rid;
		vartransportinview_idx=-1;
		$('#flecha1').hide();
		$('#flecha2').hide();
		$('#butres').hide();
		document.getElementById('imgicon_t_'+rid).src='https://lh4.googleusercontent.com/-V07ECwbLDo0/VElVKc2RT2I/AAAAAAANg6g/MrFn3V4wQPo/s45/subroutas%2520small%2520color.png';
		$('#map_titulos_subplace').showLoading("Please Wait,<br/>Loading...<br/>",false);
		var text='<div align="center"><img id="flecha3" onclick="followtransroute('+"'p'"+');" class="mouse_pointer" src="https://lh4.googleusercontent.com/-PJV-nFwVQcc/VEg-Cq0dY0I/AAAAAAANg5Q/w0jy_POMxG8/s49/flecha%2520azul%2520izq.png" height="35" style="vertical-align:middle;" class="cursor"  /><img id="butres2" onclick="resetsubroutemap_t();" class="mouse_pointer" src="https://lh3.googleusercontent.com/-sVU-NVhZ8Bw/VEkJ1zK2dPI/AAAAAAANg6E/e2gPM8d79V4/s49/zoom%2520blue%2520small.png" height="35" style="vertical-align:middle;display:none;" class="cursor"  />           <img id="flecha4" onclick="followtransroute('+"'n'"+');" class="mouse_pointer" src="https://lh6.googleusercontent.com/-01xJjkAMotE/VEg-CKpxkBI/AAAAAAANg5M/nUWBMuFTYvg/s50/Flecha%2520azul%2520der.png" height="35" style="vertical-align:middle;" class="cursor" /><br/><div id="map_titulos_subroutestops" style=" font-weight:bolder;"></div></div>';
//		var url = "data_ajax/mapcity_content3.cfm?rnu=5131616516651";
//		var urlconfig = {action:"IdeasrouteView",ruta_id:esteid,index:index2};
		$("#map_titulos_subplace").html(text)
		var texto='<div align="center"><table>';
		for(st=0;st<array_tras_stops.length;st++){
			var texto=texto+'<tr class="lista_st_'+st+'"><td>'+array_tras_stops[st].nombre+'</td></tr>';
		}
		var texto=texto+'</table></div>';
		$('#div_subroute_t_'+rid).html(texto);
	}
	else{
		vartransportinview=0;
		$('#flecha1').show();
		$('#flecha2').show();
		$('#butres').show();
		document.getElementById('imgicon_t_'+rid).src='https://lh5.googleusercontent.com/--_jadcU4AAc/VElVKu0BhdI/AAAAAAANg6k/owydaBAle9I/s45/subroutas%2520small.png';
		$('#map_titulos_subplace').empty();
		$('#div_subroute_t_'+rid).empty();
		mapcitypopup.mapconfig.google.map.fitBounds(estediarutamarkers[var_index_route].bounds);
	}
}
view_subroute_i=function(index2){
var index=index2-21;
var cookie=$.cookie("EZIDEAS").split(',');
var esteid=cookie[index];
if(varideasrouteinview==0){
	varideasrouteinview=1;
	var_index_ideasroute=-1;
		$('#flecha1').hide();
		$('#flecha2').hide();
		$('#butres').hide();
		document.getElementById('imgicon_i_'+index2).src='https://lh4.googleusercontent.com/-V07ECwbLDo0/VElVKc2RT2I/AAAAAAANg6g/MrFn3V4wQPo/s45/subroutas%2520small%2520color.png';
		mapcenterIR = mapcitypopup.mapconfig.google.map.getCenter();
		mapzoomIR= mapcitypopup.mapconfig.google.map.getZoom();
		$('#map_titulos_subplace').showLoading("Please Wait,<br/>Loading...<br/>",false);
		var url = "http://myezplan.com/mobile/appdata/data_ajax/mapcity_content3.cfm?rnu=5131616516651";
		var urlconfig = {action:"IdeasrouteView",ruta_id:esteid,index:index2};
		$("#map_titulos_subplace").load(url,urlconfig)
}
else{
	varideasrouteinview=0;
		$('#flecha1').show();
		$('#flecha2').show();
		$('#butres').show();
		document.getElementById('imgicon_i_'+index2).src='https://lh5.googleusercontent.com/--_jadcU4AAc/VElVKu0BhdI/AAAAAAANg6k/owydaBAle9I/s45/subroutas%2520small.png';
		$('#map_titulos_subplace').empty();
		$('#div_subroute_'+index2).empty();
		for(s=0;s<IdeasViewStops.length;s++){
			IdeasViewStops[s].setMap(null);
		}
		mapcitypopup.mapconfig.google.map.setCenter(mapcenterIR);
		mapcitypopup.mapconfig.google.map.setZoom(mapzoomIR);
}
}
resetsubroutemap_p=function(){
	$('#butres2').hide();
	mapcitypopup.mapconfig.google.map.fitBounds(PersonalrouteBounds);
	$('#map_titulos_subroutestops').empty();
	$('.table_count_'+var_index_personalroute).css("background-color",'');
	var_index_personalroute=-1;
}
function followsubroute_p(direction){
	$('#butres2').show();
	if(var_index_personalroute!=-1){
		$('.table_count_'+var_index_personalroute).css("background-color",'');
	}
	if(direction=='n'){var_index_personalroute = var_index_personalroute+1;}
	if(direction=='p'){var_index_personalroute = var_index_personalroute-1;}
	if(var_index_personalroute < 0){var_index_personalroute =0;}
	if(var_index_personalroute > (PersonalrouteStops.length -1)){var_index_personalroute =(PersonalrouteStops.length -1);}
	mapcitypopup.mapconfig.google.map.setCenter(PersonalrouteStops[var_index_personalroute].getPosition());
	mapcitypopup.mapconfig.google.map.setZoom(18);
	var texto='<span>'+PersonalrouteStops[var_index_personalroute].getTitle()+'</span>'
	$('.table_count_'+var_index_personalroute).css("background-color",'#eee');
	$('#map_titulos_subroutestops').html(texto);
}
view_subroute_p=function(prid){
if(varpersonalrouteinview==0){
	mapcenterPR = mapcitypopup.mapconfig.google.map.getCenter();
	mapzoomPR= mapcitypopup.mapconfig.google.map.getZoom();
	PersonalrouteBounds=new google.maps.LatLngBounds();
	PersonalrouteStops=[];
	varpersonalrouteinview=1;
	var_index_personalroute=-1;
		$('#flecha1').hide();
		$('#flecha2').hide();
		$('#butres').hide();
		document.getElementById('imgicon_p_'+prid).src='https://lh4.googleusercontent.com/-V07ECwbLDo0/VElVKc2RT2I/AAAAAAANg6g/MrFn3V4wQPo/s45/subroutas%2520small%2520color.png';
		$('#map_titulos_subplace').showLoading("Please Wait,<br/>Loading...<br/>",false);
					if(prid==1){
						var color='#FF00FF';
						var icono='https://lh6.googleusercontent.com/-8xxqF9thOCg/U9nRcchbb_I/AAAAAAANgBg/C77KoahO1Sc/s44/64.png';
					}
					if(prid==2){
						var color='#00FFCC';
						var icono='https://lh3.googleusercontent.com/-Tx9ASyR-Pm0/U9nRcry7fQI/AAAAAAANgB4/S4-sPOCQyv4/s44/66.png'
					}
					if(prid==3){
						var color='#6600CC';
						var icono='https://lh3.googleusercontent.com/-Y2nKnJNaweg/U9nRcP8BO4I/AAAAAAANgBc/nnLGfRYqBm8/s45/65.png'
					}
					if(prid==4){
						var color='#FF0033';
						var icono='https://lh5.googleusercontent.com/-E1dAbz_GUo8/U9nRfXIuR0I/AAAAAAANgCw/x-ZRzX81FTM/s44/72.png'
					}
					if(prid==5){
						var color='#99CC33';
						var icono='https://lh4.googleusercontent.com/-Npa9fnZ8jsI/U9nRgTkZovI/AAAAAAANgCg/RYgxYCvC1as/s44/74.png'
					}
					if(prid==6){
						var color='#009999';
						var icono='https://lh3.googleusercontent.com/-yVml473bYZ4/U9nRhTGcy6I/AAAAAAANgC8/b_xcPHU1RM0/s44/77.png'
					}
					if(prid==7){
						var color='#FF6600';
						var icono='https://lh6.googleusercontent.com/-_APxQcrJomA/U9nRhG6kRZI/AAAAAAANgCo/aCfSRKHPbO4/s44/76.png'
					}
					if(prid==8){
						var color='#666600';
						var icono='https://lh6.googleusercontent.com/-f05N3TVBgaQ/U9nReUw3BJI/AAAAAAANgCI/Wqev2rAqxDI/s44/70.png'
					}
					if(prid==9){
						var color='#989898';
						var icono='https://lh6.googleusercontent.com/-gjaXgjiHqzc/U9nRgg5WKcI/AAAAAAANgCk/TQs3DftLy1U/s44/75.png'
					}
					if(prid==10){
						var color='#FF0000';
						var icono='https://lh6.googleusercontent.com/-io7fsMrgN34/U9nRenFm-_I/AAAAAAANgCE/zbAnDMFVe4Q/s44/71.png'
					}
					var cookieper=$.cookie("EZPR_"+prid);
					var cookieper_=cookieper.split('!');
					var coors=cookieper_[1].split('*');
					for(c=0;c<coors.length;c++){
						var coors_=coors[c].replace('(','').replace(')','').split(',');
						var loca = new google.maps.LatLng(parseFloat(coors_[0]),parseFloat(coors_[1]));
						PersonalrouteBounds.extend(loca);
					}
					mapcitypopup.mapconfig.google.map.fitBounds(PersonalrouteBounds);
					var test='<div align="center"><img id="flecha3" onclick="followsubroute_p('+"'p'"+');" class=" mouse_pointer" src="https://lh4.googleusercontent.com/-PJV-nFwVQcc/VEg-Cq0dY0I/AAAAAAANg5Q/w0jy_POMxG8/s49/flecha%2520azul%2520izq.png" height="35" style="vertical-align:middle;" class="cursor"  /><img id="butres2" onclick="resetsubroutemap_p();" class=" mouse_pointer" src="https://lh3.googleusercontent.com/-sVU-NVhZ8Bw/VEkJ1zK2dPI/AAAAAAANg6E/e2gPM8d79V4/s49/zoom%2520blue%2520small.png" height="35" style="vertical-align:middle;display:none;margin:0 4px;" class="cursor"  /><img id="flecha4" onclick="followsubroute_p('+"'n'"+');" class="mouse_pointer" src="https://lh6.googleusercontent.com/-01xJjkAMotE/VEg-CKpxkBI/AAAAAAANg5M/nUWBMuFTYvg/s50/Flecha%2520azul%2520der.png" height="35" width="35" style="vertical-align:middle;" class="cursor" /><br/><div id="map_titulos_subroutestops" style=" font-weight:bolder;"></div></div>'
					$('#map_titulos_subplace').html(test);
					var cookieper_s=$.cookie("EZPR_"+prid+"_S");
					var cookieper_s_=cookieper_s.split('!');
					var subtexto='';
					for(cc=0;cc<cookieper_s_.length;cc++){
						var estestop=cookieper_s_[cc].split('*');
						var name=estestop[1];
						var desc=estestop[2];
						var placeid=estestop[3];
						var imgurl=estestop[4];
						var coors=estestop[0].replace('(','').replace(')','').split(',');
						var lat_=coors[0];
						var lng_=coors[1];
						var loca = new google.maps.LatLng(parseFloat(lat_),parseFloat(lng_));
						var StopMarker = new google.maps.Marker();
						StopMarker.setOptions({icon: icono,draggable: true,map: mapcitypopup.mapconfig.google.map,    title: name,position: loca});
						var subtexto=subtexto+'<table class="table table_count_'+cc+'"><tr><td style="width:103px">&nbsp;&nbsp;&nbsp;&nbsp;</td><td class="t3" ><label class="cursor label_check"><span style="color:'+color+';">'+name+'</span><td class="table_img"><div><img src="https://lh3.googleusercontent.com/-N4Sfx6aRnhg/VMm8iyKc2fI/AAAAAAANhEk/BWpxO6zkDo4/s136/Subrutas.png"></div></td></label></td></tr></table>';
						PersonalrouteStops.push(StopMarker);
					}
					$('#div_subroute_'+(prid+10)).html(subtexto);
}
else{
varpersonalrouteinview=0;
		$('#flecha1').show();
		$('#flecha2').show();
		$('#butres').show();
		document.getElementById('imgicon_p_'+prid).src='https://lh5.googleusercontent.com/--_jadcU4AAc/VElVKu0BhdI/AAAAAAANg6k/owydaBAle9I/s45/subroutas%2520small.png';
		$('#map_titulos_subplace').empty();
		mapcitypopup.mapconfig.google.map.setCenter(mapcenterPR);
		mapcitypopup.mapconfig.google.map.setZoom(mapzoomPR);
		for(prs=0;prs<PersonalrouteStops.length;prs++){
			PersonalrouteStops[prs].setMap(null);
		}
		$('#div_subroute_'+(prid+10)).empty();
}

}
view_subroute=function(rid,srid){
	var subrouteinview=varsubrouteinview;
	if(subrouteinview==srid){
		document.getElementById('imgicon_'+srid).src='https://lh5.googleusercontent.com/--_jadcU4AAc/VElVKu0BhdI/AAAAAAANg6k/owydaBAle9I/s45/subroutas%2520small.png';
		for(x=0;x<PolylineSubruta.subroutes.length;x++){
			PolylineSubruta.subroutes[x].setMap(null);
		}
		for(c=0;c<PolylineSubruta.stops.length;c++){
			PolylineSubruta.stops[c].setMap(null);
		}
		PolylineSubruta.setMap(null);
		mapcitypopup.mapconfig.google.map.setCenter(mapcenterSR);
		mapcitypopup.mapconfig.google.map.setZoom(mapzoomSR);
		$('#div_subroute_'+rid).empty();	
		$('#map_titulos_subplace').empty();
		$('#flecha1').show();
		$('#flecha2').show();
		$('#butres').show();
		varsubrouteinview=1;	
	}
	if(subrouteinview==1){
		mapcenterSR = mapcitypopup.mapconfig.google.map.getCenter();
		mapzoomSR= mapcitypopup.mapconfig.google.map.getZoom();
		$('#flecha1').hide();
		$('#flecha2').hide();
		$('#butres').hide();
		varsubrouteinview=srid;
		$('#map_titulos_subplace').showLoading("Please Wait,<br/>Loading...<br/>",false);
		var url = "http://myezplan.com/mobile/appdata/data_ajax/mapcity_content3.cfm?rnu=5131616516651";
		var urlconfig = {action:"SubrouteView",subruta_id:srid,ruta_id:rid};
		$("#map_titulos_subplace").load(url,urlconfig);
		document.getElementById('imgicon_'+srid).src='https://lh4.googleusercontent.com/-V07ECwbLDo0/VElVKc2RT2I/AAAAAAANg6g/MrFn3V4wQPo/s45/subroutas%2520small%2520color.png';
	}
	if(subrouteinview!=1 && subrouteinview!=srid){
		document.getElementById('imgicon_'+subrouteinview).src='https://lh5.googleusercontent.com/--_jadcU4AAc/VElVKu0BhdI/AAAAAAANg6k/owydaBAle9I/s45/subroutas%2520small.png';
		varsubrouteinview=srid;
		for(x=0;x<PolylineSubruta.subroutes.length;x++){
			PolylineSubruta.subroutes[x].setMap(null);
		}
		for(c=0;c<PolylineSubruta.stops.length;c++){
			PolylineSubruta.stops[c].setMap(null);
		}
		PolylineSubruta.setMap(null);
		$('#div_subroute_'+rid).empty();
		$('#map_titulos_subplace').showLoading("Please Wait,<br/>Loading...<br/>",false);
		var url = "http://myezplan.com/mobile/appdata/data_ajax/mapcity_content3.cfm?rnu=5131616516651";
		var urlconfig = {action:"SubrouteView",subruta_id:srid,ruta_id:rid};
		$("#map_titulos_subplace").load(url,urlconfig);	}
}
unadplacefromroute=function(day,id,lpos){
	resetroutemap();
	newcookie=[];
	var cookpl2=$.cookie("EZMAPCITYPLACES2_day"+day);
	if(cookpl2 && cookpl2!=''){
		newcookie=cookpl2.split(',');
	}
	newcookie.push(id);
	$.cookie("EZMAPCITYPLACES2_day"+day,newcookie.join(','));
	/*var navarrows = $('#show_box2');
	navarrows.css("position","absolute");
	navarrows.css("z-index","2");
	navarrows.css("right","0");
	navarrows.css("left","0");
	navarrows.css("border","0px");
	$('.div_plans_route').hide();
	$('.div_plans_route_label').hide();
	$('.div_plans_noroute').hide();
	$('.button-show-MEP').css("background-color",'rgb(211, 211, 211)');
	$('.button-show-MEP').html("List"); */	
	//varshowmep=false;
	if(typeof(directionsDisplay)!='undefined'){directionsDisplay.setMap(null);}
	if(typeof(initialLocation)!="undefined"){
		mapcitypopup.mapconfig.google.map.setCenter(initialLocation);
		myLocationControlChange("disable");
		clearTimeout(gtml_time1);
		clearTimeout(gtml_time2);
	}
	MyLocationDiv.remove();
	var comp = "'"+id+"'";
	if(	comp.indexOf('s')>-1 || comp.indexOf('t')>-1){
		id2 = "'"+id+"'";
	}else{
		id2 = id;
	}
	$('.div_plans_noroute').show();
	$('.div_plans_noroute').append($("#div_route_"+day+"_"+id));
	$("#div_route_"+day+"_"+id+" .t4:first").empty();
	$("#div_route_"+day+"_"+id+" .t4:first").append('<img style="width:25px;" src="https://lh3.googleusercontent.com/-lxmYejGOw0k/VMlfaxYOftI/AAAAAAANhEE/zDluXu8_qi0/s45/Check%2520inactive%25202.png" onclick="adplacefromroute('+day+','+id2+','+lpos+');">');
	$("#div_route_"+day+"_"+id+" table").attr("id", "");
	$("#div_route_"+day+"_"+id+" table").removeClass("table_"+lpos);
	var dayOrder = $('.div_plans_route').sortable('toArray').toString().replace(/div_route_/g,'').split(',');
	var order=[];
	var orderf=[];
	for(x=0;x<dayOrder.length;x++){
		var dayOrder_=dayOrder[x].split('_');
		var day=dayOrder_[0];
		orderf.push(dayOrder_[1]);
		if(dayOrder_[1].indexOf('t')<0 && dayOrder_[1].indexOf('s')<0){
			order.push(dayOrder_[1]);
		}
	}
	var coo2=$.cookie("EZMAPCITYPLACES2_day"+day);
	if(coo2 && coo2!=''){
		var coo2_=coo2.split(',');
		for(f=0;f<coo2_.length;f++){
			order.push(coo2_[f]);
			orderf.push(coo2_[f]);
		}
	}
	$.cookie("EZROUTE_day_"+day,true);
	$.cookie("EZMAPCITYPLACES_day"+day,order.join(','));
	$.cookie("EZFULLORDER_day"+day,orderf.join(','));
	resetdayarray(day);
	varlistchanged = true;
	//viewrouteforday(day);
}
adplacefromroute=function(day,id,lpos){
	var newcookie=[];
	var cookpl2=$.cookie("EZMAPCITYPLACES2_day"+day);
	cookpl2_=cookpl2.split(',');
	for(c=0;c<cookpl2_.length;c++){
		if(cookpl2_[c]!=id){
			newcookie.push(cookpl2_[c]);
		}
	}
	if(newcookie.length!=0){$.cookie("EZMAPCITYPLACES2_day"+day,newcookie.join(','));}
	else{
		console.log("no places");
		$.cookie("EZMAPCITYPLACES2_day"+day,false, {path: '/',expires: -1});
		$.cookie("EZMAPCITYPLACES2_day"+day,false, null);
	}
	/*$('.div_plans_route').hide();
	$('.div_plans_noroute').hide();
	$('.div_plans_route_label').hide();
	$('.button-show-MEP').css("background-color",'rgb(211, 211, 211)');
	$('.button-show-MEP').html("List"); 		
	varshowmep=false;*/
	if(typeof(directionsDisplay)!='undefined'){directionsDisplay.setMap(null);}
	if(typeof(initialLocation)!="undefined"){
		mapcitypopup.mapconfig.google.map.setCenter(initialLocation);
		myLocationControlChange("disable");
		clearTimeout(gtml_time1);
		clearTimeout(gtml_time2);
	}
	MyLocationDiv.remove();
	var comp = "'"+id+"'";
	if(	comp.indexOf('s')>-1 || comp.indexOf('t')>-1){
		id2 = "'"+id+"'";
	}else{
		id2 = id;
	}
	$('.div_plans_route').append($("#div_route_"+day+"_"+id));
	$("#div_route_"+day+"_"+id+" .t4:first").empty()
	$("#div_route_"+day+"_"+id+" .t4:first").append('<img style="width:25px;" src="https://lh3.googleusercontent.com/-0SnpBef6i6I/VMlfa9qKEQI/AAAAAAANhEM/6nLOyRI7udI/s45/Check%2520active.png" onclick="unadplacefromroute('+day+','+id2+','+lpos+');">')
	$("#div_route_"+day+"_"+id+" table").attr("id", "tablelist"+lpos);
	//$("#div_route_"+day+"_"+id+" table").addClass("table_"+lpos);
	var dayOrder = $('.div_plans_route').sortable('toArray').toString().replace(/div_route_/g,'').split(',');
	var order=[];
	var orderf=[];
	for(x=0;x<dayOrder.length;x++){
		var dayOrder_=dayOrder[x].split('_');
		var day=dayOrder_[0];
		orderf.push(dayOrder_[1]);
		if(dayOrder_[1].indexOf('t')<0 && dayOrder_[1].indexOf('s')<0){
			order.push(dayOrder_[1]);
		}
	}
	var coo2=$.cookie("EZMAPCITYPLACES2_day"+day);
	if(coo2 && coo2!=''){
		var coo2_=coo2.split(',');
		for(f=0;f<coo2_.length;f++){
			order.push(coo2_[f]);
			orderf.push(coo2_[f]);
		}
	}
	$.cookie("EZROUTE_day_"+day,true);
	$.cookie("EZMAPCITYPLACES_day"+day,order.join(','));
	$.cookie("EZFULLORDER_day"+day,orderf.join(','));
	resetdayarray(day);
	varlistchanged = true;
	//viewrouteforday(day)
}
saveadvopt=function(day){
$('.div_plans_route').hide();
$('.div_plans_noroute').hide();
$('.div_plans_route_label').hide();
$('.button-show-MEP').css("background-color",'rgb(211, 211, 211)');  
varshowmep=false;
if(typeof(directionsDisplay)!='undefined'){directionsDisplay.setMap(null);}
if(typeof(initialLocation)!="undefined"){
	mapcitypopup.mapconfig.google.map.setCenter(initialLocation);
	myLocationControlChange("disable");
	clearTimeout(gtml_time1);
	clearTimeout(gtml_time2);
}
MyLocationDiv.remove();
var gotm=document.getElementById('gotm').value;
$.cookie("EZGOTM_day_"+day,gotm);
$.cookie("EZFULLORDER_day"+day,false, {path: '/',expires: -1});
$.cookie("EZFULLORDER_day"+day,null);
if(varoptimizeacive){
	varreorder=false;
	orderrouteforday(day);
}
else{
var cookpl=$.cookie("EZMAPCITYPLACES_day"+day);
var cookpl_=cookpl.split(',');
var newcook=[];
var sp=document.getElementById('sel_sp').value;
var ep=document.getElementById('sel_ep').value;
newcook.push(parseInt(sp));
for(x=0;x<cookpl_.length;x++){
	//alert(parseInt(cookpl_[x])+' '+parseInt(sp)+' '+parseInt(ep));
	if(parseInt(cookpl_[x])!= parseInt(sp) && parseInt(cookpl_[x])!=parseInt(ep)){
		newcook.push(parseInt(cookpl_[x]));
		}
}
newcook.push(parseInt(ep));
$.cookie("EZMAPCITYPLACES_day"+day,newcook.join(','));
//alert(newcook.join(','));
	varreorder=true;
	orderrouteforday(day);
}
}
advopt_optimize=function(){
	if(varoptimizeacive){
		varoptimizeacive=false;
		document.getElementById('sel_sp').disabled=false;
		document.getElementById('sel_ep').disabled=false;
		document.getElementById('adv_opt_optimize').style.backgroundColor='rgb(211, 211, 211)';
	}
	else{
		varoptimizeacive=true;
		document.getElementById('sel_sp').disabled=true;
		document.getElementById('sel_ep').disabled=true;
		document.getElementById('adv_opt_optimize').style.backgroundColor='rgb(23, 55, 94)';
	}
}
showadvopt=function(){
	var _panel = $('.advopt');
	if(varshowadvopt){
		_panel.panel("close");
		varshowadvopt=false;
	}
	else{
		_panel.panel({close: function(){varshowadvopt=false;_panel.hide();}});
		_panel.show();
		_panel.panel("open");
		varshowadvopt=true;
	}
}
AudioTour_f=function(arg_url){
	$('body').append('<div id="mask" class="mask"></div>');
	$('#mask').fadeIn(300);
	$("#boxaudiotour").fadeIn(300);
	$("#boxaudiotour").find("#box-body").html('<iframe id="iframe_audiobox" width="560" height="315" frameborder="0" allowfullscreen></iframe>');
$('#iframe_audiobox').showLoading("Please Wait,<br/>Searching For<br/>Audio Tour...",false);
$('#iframe_audiobox').attr("src",arg_url);
//$('#maskload').fadeOut(300);
	return false;
}
function resetroutemap(){
	$("#butres").hide();
	if(var_index_route != -1){
		$('.table_'+var_index_route).css("background-color",'');
		$('#div_plans_route .table').css("background-color",'');
		mapcitypopup.mapconfig.google.map.setCenter(mapcenterO);
		mapcitypopup.mapconfig.google.map.setZoom(mapzoomO);
		var_index_route=-1;
		$('#map_titulos_place').empty();
		if(var_view_trans_serv!=-1){
			if(estediarutamarkers[var_view_trans_serv].mk_type==10 && estediarutamarkers[var_view_trans_serv].type==1){
				for(st=0;st<estediarutamarkers[var_view_trans_serv].arraystops.length;st++){
					estediarutamarkers[var_view_trans_serv].arraystops[st].setVisible(false);
					estediarutamarkers[var_view_trans_serv].arraystops[st].stopinfo.close(mapcitypopup.mapconfig.google.map,estediarutamarkers[var_view_trans_serv].arraystops[st]);
				}
			}
			else{
				estediarutamarkers[var_view_trans_serv].stopinfo.close(mapcitypopup.mapconfig.google.map,estediarutamarkers[var_view_trans_serv]);
			}
			var_view_trans_serv=-1;
		}
	}
}
function followroute(direction){
	$("#butres").show();
varsubrouteinview=1;
varpersonalrouteinview=0;
varideasrouteinview=0;
vartransportinview=0;
//console.log(var_index_route);
if(var_index_route==-1){
	mapcenterO = mapcitypopup.mapconfig.google.map.getCenter();
	mapzoomO= mapcitypopup.mapconfig.google.map.getZoom();
}
else{
	$('.table_'+var_index_route).css("background-color",'');
	if(var_view_trans_serv!=-1){
		if(estediarutamarkers[var_view_trans_serv].mk_type==10 && estediarutamarkers[var_view_trans_serv].type==1){
			for(st=0;st<estediarutamarkers[var_view_trans_serv].arraystops.length;st++){
				estediarutamarkers[var_view_trans_serv].arraystops[st].setVisible(false);
				estediarutamarkers[var_view_trans_serv].arraystops[st].stopinfo.close(mapcitypopup.mapconfig.google.map,estediarutamarkers[var_view_trans_serv].arraystops[st]);
			}
		}
		else{
			estediarutamarkers[var_view_trans_serv].stopinfo.close(mapcitypopup.mapconfig.google.map,estediarutamarkers[var_view_trans_serv]);
		}
		var_view_trans_serv=-1;
	}
}
if(direction=='n'){var_index_route = var_index_route+1;}
if(direction=='p'){var_index_route = var_index_route-1;}
if(var_index_route < 0){var_index_route =0;}
if(var_index_route > (estediarutamarkers.length -1)){var_index_route =(estediarutamarkers.length -1);}
if(estediarutamarkers[var_index_route].mk_type>=10){
	console.log("here");
	var_view_trans_serv=var_index_route;
	mapcitypopup.mapconfig.google.map.fitBounds(estediarutamarkers[var_index_route].bounds);
	if(estediarutamarkers[var_index_route].mk_type==10){
		if(estediarutamarkers[var_index_route].type==1){
			//mapcitypopup.mapconfig.google.map.setZoom(10);
			var srtext='&nbsp;&nbsp;<a href="javascript:;"  style="text-decoration:none;color:#990000;font-weight:bold;" onclick="view_subroute_t('+estediarutamarkers[var_index_route].rid+');" ><img id="imgicon_t_'+estediarutamarkers[var_index_route].rid+'" src="https://lh5.googleusercontent.com/--_jadcU4AAc/VElVKu0BhdI/AAAAAAANg6k/owydaBAle9I/s45/subroutas%2520small.png" height="35" title="Subroutes"/></a><div id="map_titulos_subplace"></div>';
			array_tras_stops=[];
			var cookst=$.cookie("EZTRANSPORT_S_day"+viewingday).split(',');			
			for(st=0;st<estediarutamarkers[var_index_route].arraystops.length;st++){
				estediarutamarkers[var_index_route].arraystops[st].setVisible(true);
				var esta=0;
				for(sst=0;sst<cookst.length;sst++){
					if(parseInt(cookst[sst])==parseInt(estediarutamarkers[var_index_route].arraystops[st].id_)){
						var esta=1;
					}
				}
				if(esta==1){
					estediarutamarkers[var_index_route].arraystops[st].setIcon(estediarutamarkers[var_index_route].arraystops[st].icon_s);
					estediarutamarkers[var_index_route].arraystops[st].stopinfo.open(mapcitypopup.mapconfig.google.map,estediarutamarkers[var_index_route].arraystops[st]);
					array_tras_stops.push(estediarutamarkers[var_index_route].arraystops[st]);
				}
				else{
					estediarutamarkers[var_index_route].arraystops[st].setIcon(estediarutamarkers[var_index_route].arraystops[st].icon_);
				}
			}
			
		}
		else{
			mapcitypopup.mapconfig.google.map.setZoom(13);
			var srtext='<a onclick="openexternalmedia_mapplacePer('+estediarutamarkers[var_index_route].position.A+','+estediarutamarkers[var_index_route].position.F+','+"'"+estediarutamarkers[var_index_route].nombre+"'"+')" target="_new" style="text-decoration:none;color:#990000;font-weight:bold;"><img src="https://lh4.googleusercontent.com/-iyHoYeRcWPc/VEg8rt95vvI/AAAAAAANg44/AUPYLGq8Cm0/s57/Untitled27.png" height="35"></a>';
			estediarutamarkers[var_index_route].stopinfo.open(mapcitypopup.mapconfig.google.map,estediarutamarkers[var_index_route]);
		}
		var texto='<span style="color:#'+estediarutamarkers[var_index_route].color+';">'+estediarutamarkers[var_index_route].nombre+'</span><br>'+srtext;
	}
	else{
		mapcitypopup.mapconfig.google.map.setZoom(15);
		var srtext='<a onclick="openexternalmedia_mapplacePer('+estediarutamarkers[var_index_route].position.A+','+estediarutamarkers[var_index_route].position.F+','+"'"+estediarutamarkers[var_index_route].nombre+"'"+')" target="_new" style="text-decoration:none;color:#990000;font-weight:bold;"><img src="https://lh4.googleusercontent.com/-iyHoYeRcWPc/VEg8rt95vvI/AAAAAAANg44/AUPYLGq8Cm0/s57/Untitled27.png" height="35"></a>';
		var texto='<span style="color:#'+estediarutamarkers[var_index_route].color+';">'+estediarutamarkers[var_index_route].nombre+'</span><br>'+srtext;
		estediarutamarkers[var_index_route].stopinfo.open(mapcitypopup.mapconfig.google.map,estediarutamarkers[var_index_route]);
	}
}
else{
mapcitypopup.mapconfig.google.map.setCenter(estediarutamarkers[var_index_route].getPosition());
mapcitypopup.mapconfig.google.map.setZoom(15);
if(estediarutamarkers[var_index_route].mk_type==1){
	var texto='<span onclick="window.top.showinfoplace(\''+estediarutamarkers[var_index_route].mk_category.idunico+'\',\''+estediarutamarkers[var_index_route].mk_id+'\', \'myezplan\');">'+estediarutamarkers[var_index_route].getTitle()+'</span>&nbsp;&nbsp;<br><a onclick="openexternalmedia_mapplace('+estediarutamarkers[var_index_route].mk_id+')" target="_new" style="text-decoration:none;color:#990000;font-weight:bold;" ><img src="https://lh4.googleusercontent.com/-iyHoYeRcWPc/VEg8rt95vvI/AAAAAAANg44/AUPYLGq8Cm0/s57/Untitled27.png" height="35" title="Address"/></a>'
	if(typeof(estediarutamarkers[var_index_route].audio_link)!='undefined' && estediarutamarkers[var_index_route].audio_link !=''){
		var texto=texto+'&nbsp;&nbsp;<a href="javascript:;"  style="text-decoration:none;color:#990000;font-weight:bold;" onclick="openexternalmedia('+"'"+estediarutamarkers[var_index_route].audio_link+"'"+');" ><img src="https://lh6.googleusercontent.com/-OUWV6bn9bLk/VEg8rckUTeI/AAAAAAANg40/w-TxBQp8fuk/s51/Untitled26.png" height="35" title="Audio Tour"/></a>'
	}
if(estediarutamarkers[var_index_route].ismap==1){
	var subids=[];
	var cookie=$.cookie("EZMAPCITYSUBPLACES_day"+viewingday);
	if(cookie && cookie!=''){
				var cookie_=cookie.split('!');
				for(ll=0;ll<cookie_.length;ll++){
					var _este=cookie_[ll].split('*');
					var _esteid=_este[0];
					var _estesubid=_este[1];
					if(parseInt(_esteid)==parseInt(estediarutamarkers[var_index_route].mk_id)){
						subids.push(_estesubid);
					}
				}
	}
	if(subids.length==0){subids.push('0');}
	for(si=0;si<subids.length;si++){
		var texto=texto+'&nbsp;&nbsp;<a href="javascript:;"  style="text-decoration:none;color:#990000;font-weight:bold;" onclick="view_subroute('+estediarutamarkers[var_index_route].mk_id+','+subids[si]+');" ><img id="imgicon_'+subids[si]+'" src="https://lh5.googleusercontent.com/--_jadcU4AAc/VElVKu0BhdI/AAAAAAANg6k/owydaBAle9I/s45/subroutas%2520small.png" height="35" title="Subroutes"/></a>';	
	}
	var texto=texto+'<div id="map_titulos_subplace"></div>';
	}
}
else{
	var srtext='';
	if(estediarutamarkers[var_index_route].mk_type==4){
		var srtext='&nbsp;&nbsp;<a href="javascript:;"  style="text-decoration:none;color:#990000;font-weight:bold;" onclick="view_subroute_i('+estediarutamarkers[var_index_route].id+');" ><img id="imgicon_i_'+estediarutamarkers[var_index_route].id+'" src="https://lh5.googleusercontent.com/--_jadcU4AAc/VElVKu0BhdI/AAAAAAANg6k/owydaBAle9I/s45/subroutas%2520small.png" height="35" title="Subroutes"/></a><div id="map_titulos_subplace"></div>'
	}
	if(estediarutamarkers[var_index_route].mk_type==3){
		var cookieper_s=$.cookie("EZPR_"+estediarutamarkers[var_index_route].id+"_S");
		if(cookieper_s != null){
			var srtext='&nbsp;&nbsp;<a href="javascript:;"  style="text-decoration:none;color:#990000;font-weight:bold;" onclick="view_subroute_p('+estediarutamarkers[var_index_route].id+');" ><img id="imgicon_p_'+estediarutamarkers[var_index_route].id+'" src="https://lh5.googleusercontent.com/--_jadcU4AAc/VElVKu0BhdI/AAAAAAANg6k/owydaBAle9I/s45/subroutas%2520small.png" height="35" title="Subroutes"/></a><div id="map_titulos_subplace"></div>'
		}else{
			var srtext='';
		}
	}
	if(estediarutamarkers[var_index_route].mk_type==2){
		var srtext='';
	}
	var coors=estediarutamarkers[var_index_route].getPosition().toString().replace(/ /g,'').replace('(','').replace(')','').split(',');
	var lat=coors[0];
	var lng=coors[1];	
	var address='openexternalmedia_mapplacePer('+lat+','+lng+','+"'"+estediarutamarkers[var_index_route].getTitle()+"'"+')';
	var texto='<span>'+estediarutamarkers[var_index_route].getTitle()+'</span><br><a onclick="'+address+'" target="_new" style="text-decoration:none;color:#990000;font-weight:bold;" ><img src="https://lh4.googleusercontent.com/-iyHoYeRcWPc/VEg8rt95vvI/AAAAAAANg44/AUPYLGq8Cm0/s57/Untitled27.png" height="35" title="Address"/></a>'+srtext;
}
}
$('#map_titulos_place').html(texto);
//window.location.href = "#tablelist"+estediarutamarkers[var_index_route].mk_id;
// To detect is element is in viewport.
/*var curPos = $('#tablelist'+var_index_route).offset();
var curTop = curPos.top;
var screenHeight = $(window).height();*/
//return (curTop > screenHeight) ? false : true;
var listpos = estediarutamarkers[var_index_route].listpos;
//console.log(listpos);
$('#div_plans_route .table').css("background-color",'');
$('.table_'+listpos).css("background-color",'#ddd');
$('[title]').each(function() {
	$this = $(this);
	$.data(this, 'title', $this.attr('title'));
	$this.removeAttr('title');
});
$('html, body').animate({ scrollTop: $('.table_'+listpos).offset().top - $("#show_box2").height() - 100 }, 'fast');
}
function orderrouteforday(day,arg_mapconfig){
		arg_mapconfig=arg_mapconfig || mapcitypopup.mapconfig;
		var cookpl=$.cookie("EZMAPCITYPLACES_day"+day);
		var cookpl2=$.cookie("EZMAPCITYPLACES2_day"+day);
		var cooktr=$.cookie("EZTRANSPORT_day"+day);
		var cooksr=$.cookie("EZSERVICES_day"+day);
		if(cookpl && cookpl !=''){
			hayruta=true;
			var coo1=cookpl.split(',')
			coo2=[];
			if(cookpl2 && cookpl2!=''){
				var coo=[];
				coo2=oookpl2.split(',')
				for(c=0;c<coo1.length;c++){
					if(coo2.indexOf(coo1[c])<0){coo.push(coo1[c]);}
				}
			}
			else{
				var coo=coo1;
			}
			if(coo.length<=1){viewrouteforday(day);return false;}
			estediarutamarkers=[];
			estediacoors=[];
			estedialats=[];
			estedialats2=[];
			for(c=0;c<coo.length;c++){
				if(coo[c] > 40){
					for(mm=0;mm<arg_mapconfig.markers.length;mm++){
						var esdeestaciudad=false;
						if(arg_mapconfig.markers[mm].mk_id==coo[c]){
							var esdeestaciudad=true;
							_marker=arg_mapconfig.markers[mm];
							thiscoors=_marker.getPosition().toString().replace('(','').replace(')','').split(',');
							var thislat=parseFloat(thiscoors[0]);
							estediacoors.push(thiscoors.join(','));
							estedialats.push(thislat);
							estedialats2.push(thislat);
						}
					}
					if(!esdeestaciudad){
						for(xx=0;xx<othercityarray.length;xx++){
							if(othercityarray[xx].mk_id==coo[c]){
							_marker=othercityarray[xx];
							thiscoors=_marker.getPosition().toString().replace('(','').replace(')','').split(',');
							estediacoors.push(thiscoors.join(','));
							var thislat=parseFloat(thiscoors[0]);
							estedialats.push(thislat);
							estedialats2.push(thislat);
							}
						}
					}
				}
				if(coo[c] < 11){
					var cookieper=$.cookie("EZPERSONAL");
					var cookieper_=cookieper.split('!');
					var esteper=cookieper_[(coo[c]-1)].split('*');
					var estenom=esteper[0];
					var estecoors=esteper[1];
					thiscoors=estecoors.replace('(','').replace(')','').split(',');
					estediacoors.push(thiscoors.join(','));
					var thislat=parseFloat(thiscoors[0]);
					estedialats.push(thislat);
					estedialats2.push(thislat);
					var _marker=personalmrks[(coo[c]-1)]
				}
				if(coo[c] > 10 && coo[c] <21){
					var este=(coo[c]-10);
					var cookieper=$.cookie("EZPR_"+este);
					var cookieper_=cookieper.split('!');
					var estenom=cookieper_[0];
					for(pm=0;pm<personalroutesmarks.length;pm++){
						if(personalroutesmarks[pm].id==(coo[c]-10)){
							var _marker=personalroutesmarks[pm];
							}
					}
							thiscoors=_marker.getPosition().toString().replace('(','').replace(')','').split(',');
							estediacoors.push(thiscoors.join(','));
							var thislat=parseFloat(thiscoors[0]);
							estedialats.push(thislat);
							estedialats2.push(thislat);					
				}
				if(coo[c] >20 && coo[c] <31){
					var este=(coo[c]-21);
					var cookieideas=$.cookie("EZIDEAS_C").split('!');
					var esteideas=cookieideas[este].split('*');
					var estenom=esteideas[0];
					var estecolor='#'+esteideas[3];
					var estecoors=esteideas[1]+','+esteideas[2];
					estediacoors.push(estecoors);
					var thislat=parseFloat(esteideas[1]);
					estedialats.push(thislat);
					estedialats2.push(thislat);
				}
			}
		}
	if(!varreorder){estedialats.sort();}
	$.each(estedialats2,function(index,value){
		if(estedialats[0]==estedialats2[index]){
			sp_i=coo[index];
			sp_coors=estediacoors[index];
			index1=index;
		}
		if(estedialats[(estedialats.length-1)]==estedialats2[index]){
			ep_i=coo[index];
			ep_coors=estediacoors[index];
			index2=index;
		}

	});	
		if(index2 > index1){
			coo.splice(index2,1);
			estediacoors.splice(index2,1);
			coo.splice(index1,1);
			estediacoors.splice(index1,1);
		}
		else{
			coo.splice(index1,1);
			estediacoors.splice(index1,1);
			coo.splice(index2,1);
			estediacoors.splice(index2,1);
		}
		if(coo.length>1){
		//gotm=$.cookie("EZGOTM_day_"+day);
		$.ajax({
			type: "POST",
			url: "http://myezplan.com/mobile/appdata/data_ajax/mapcity_content3.cfm",
			async:true, 
			cache:false,
			data: "action=googlerouteorder&ids="+coo.join(',')+'&coors='+estediacoors.join('*')+'&sp='+sp_i+'&sp_coors='+sp_coors+'&ep='+ep_i+'&ep_coors='+ep_coors+'&gotm='+gotm,
			success: function(datos){
			if(datos==0){alert('Imposible to Optimize Route, You have to oder it');}
			else{
				newcook_=[]
				newcook_.push(sp_i);
				var datos_=datos.split(',');
				for(d=0;d<datos_.length;d++){
					var index=parseInt(datos_[d]);
					newcook_.push(coo[index]);
				}
				newcook_.push(ep_i);
				for(r=0;r<coo2.length;r++){
					newcook_.push(coo2[r]);
				}
				newcook=newcook_.join(',');
				//alert(newcook);
				$.cookie("EZMAPCITYPLACES_day"+day,newcook);
				//$.cookie("EZROUTE_day_"+day,true);
			}
			}
		});	
		}
		else{
			if(coo.length==0){
				var newcook_=[];
				newcook_.push(sp_i);
				newcook_.push(ep_i);
				for(r=0;r<coo2.length;r++){
					newcook_.push(coo2[r]);
				}
				newcook=newcook_.join(',');
				//alert(newcook);
				$.cookie("EZMAPCITYPLACES_day"+day,newcook);
				//$.cookie("EZROUTE_day_"+day,true);
			}
			else{
				var newcook_=[];
				newcook_.push(sp_i);
				newcook_.push(coo[0]);
				newcook_.push(ep_i);
				for(r=0;r<coo2.length;r++){
					newcook_.push(coo2[r]);
				}
				newcook=newcook_.join(',');
				$.cookie("EZMAPCITYPLACES_day"+day,newcook);
				//$.cookie("EZROUTE_day_"+day,true);
			}
		}
viewrouteforday(day);
}
function viewrouteforday(day,arg_mapconfig){
	console.log("List days");
	varlistchanged = false;
	currentday = day;
	if(typeof var_index_route != "undefined" && var_index_route != -1){
		resetroutemap();
	}
	daytoprint=day;
	gotm=$.cookie("EZGOTM_day_"+day);
	viewingday=day;
	if(!gotm){$.cookie("EZGOTM_day_"+day,'WALKING');gotm='WALKING';}
	var yahayruta=$.cookie("EZROUTE_day_"+day);
	if(!yahayruta){
	$.cookie("EZROUTE_day_"+day,true);
	varreorder=false;
	orderrouteforday(day);
	return false;
	}
		var_index_route=-1;
		var_view_trans_serv=-1;
		varshowmep=false;
		var itiname = $.cookie("MYITINERARYNAME");
		var numdays_= $.cookie("NUMDAYS");
		var numdays=1
		if(numdays_ && numdays_!=''){var numdays=numdays_};
		var date1_=$.cookie("EZDATE1");
		var date1='';
		var hayfechas=0;
		if(date1_ && date1_!=''){
			var fecha1 = new codefecha(date1_);   
			var miFecha1 = new Date( fecha1.anio, (fecha1.mes-1), fecha1.dia )  
			var date1=m_names_dates[miFecha1.getMonth()]+' '+miFecha1.getDate()+', '+miFecha1.getFullYear();
			var date_1 = $.datepicker.formatDate('m/d/y', new Date($.cookie("EZDATE1")))
			var hayfechas=1;  
		}
		newdate_2 ="";
		if(hayfechas!=0){
			var newdate = new Date(miFecha1);
			newdate.setDate(newdate.getDate() + (day-1));
			var newdate2=m_names_dates[newdate.getMonth()]+' '+newdate.getDate()+', '+newdate.getFullYear();
			var newdate_2 = ' - '+$.datepicker.formatDate('m/d/y', new Date(newdate))
		}
		$("#myztitledayname").remove();
		$("#myztitleday").remove();
		$("#titlehr").remove();
		if(itiname != null){
			$("#pageheadercityname").append("<span id='myztitledayname' class='myztitleday'>"+itiname+"</span><hr id='titlehr' style='margin: -5px; visibility: hidden;'/>");
		}
		faqpage = "mapcity";
		$("#pageheadercityname").append("<span id='myztitleday' class='myztitleday'>Day "+day+" of "+numdays+newdate_2+"</span>");
		$("#pageheadercityname").append($("#buttonsforplanday"));
		var navarrows = $('#show_box2');
		navarrows.css("position","absolute");
		navarrows.css("z-index","2");
		navarrows.css("right","0");
		navarrows.css("left","0");
		navarrows.css("border","0px");
		$("#flecha1").show();
		$("#flecha2").show();
		$('.button-show-MEP').html("List"); 
		$("#body_map").css("height","95%").css("margin-bottom","-25px");
		$("#body_map_canvas .gm-style").addClass("gmstylefull");
		$("#footer").hide();
		$("#titlehead").hide();
		//$("#titlehead_virt").hide();		
		$('.hider').hide();
		$('.hider2').hide();
		$('.Step').hide();
		$('.MI').hide();
		$('.4').show();
		$('.MEP').show();
		$('.div_plans_route').empty();
		$('.div_plans_noroute').empty();
		$('.div_plans_route').hide();
		$('.div_plans_noroute').hide();
		$('.div_plans_route_label').hide();		
		$('#Gen_footer').show();
		$('.buttonsforplanday').hide();
		document.getElementById('extrainfoimg2').src = "https://lh6.googleusercontent.com/-44bFjug7xpE/U5I5oAOzU_I/AAAAAAANfHI/a1ItxGAYBN0/s50/Untitled35.png";
		$("#myitin-panel").panel("close");
		$(".wrap").css("height","100%");
		$('.button-show-MEP').css("background-color",'rgb(211, 211, 211)'); 
		google.maps.event.trigger(mapcitypopup.mapconfig.google.map, 'resize');
		$('.returnfromroute').show();
		varselect='';
		varshowadvopt=false;
		varoptimizeacive=false;
		var fullorder=$.cookie("EZFULLORDER_day"+day);
		var cookpl=$.cookie("EZMAPCITYPLACES_day"+day);
		if(fullorder && fullorder!=''){
			cookpl=fullorder;
		}
		idsnoroute=[];
		varnumenruta=0;
		var cookpl2=$.cookie("EZMAPCITYPLACES2_day"+day);
		if(cookpl2 && cookpl2!=''){
			idsnoroute=cookpl2.split(',');
		}
		var cooktr=$.cookie("EZTRANSPORT_day"+day);
		var cooktr_s=$.cookie("EZTRANSPORT_S_day"+day);
		var cooksr=$.cookie("EZSERVICES_day"+day);
		arg_mapconfig=arg_mapconfig || mapcitypopup.mapconfig;
		$.each(arg_mapconfig.markers,function(index,value){
			arg_mapconfig.markers[index].setVisible(false);
		});
		$.each(personalmrks,function(index,value){
			personalmrks[index].setVisible(false);
		});
		$.each(personalroutesmarks, function(index,value){
			personalroutesmarks[index].setVisible(false);
			personalroutespolylines[index].setVisible(false);
		});
		$.each(ideasroutesmarks, function(index,value){
			ideasroutesmarks[index].setVisible(false);
		});
		if(typeof(arraydeals)!='undefined'){
			$.each(arraydeals,function(index,value){arraydeals[index].setVisible(false);});
		}
		if(typeof(arrayideasr)!='undefined'){
		$.each(arrayideasr,function(index,value){
			if(arrayideasr[index].added==1){
				arrayideasr[index].setVisible(false);
			}
		});
		}
		$.each(arraydetransports,function(index,value){arraydetransports[index].setVisible(false);});
		$.each(otherarraytrans, function(index,value){otherarraytrans[index].setVisible(false);});		
		$.each(arraydeservices,function(index,value){arraydeservices[index].setVisible(false);});
		$.each(otherarrayserv, function(index,value){otherarrayserv[index].setVisible(false);});
		hayruta=false;
		estediarutamarkers=[];
		estediawaypoints=[];
		Plan_Bounds=new google.maps.LatLngBounds();
		if(cookpl && cookpl !=''){
			hayruta=true;
			var coo=cookpl.split(',')
			for(c=0;c<coo.length;c++){
				if(coo[c].indexOf('t')<0 && coo[c].indexOf('s')<0){
				if(coo[c] > 40){
					for(mm=0;mm<arg_mapconfig.markers.length;mm++){
						var esdeestaciudad=false;
						if(arg_mapconfig.markers[mm].mk_id==coo[c]){
							var esdeestaciudad=true;
							arg_mapconfig.markers[mm].setVisible(true);
							arg_mapconfig.markers[mm].mk_type=1;
							_marker=arg_mapconfig.markers[mm];
							Plan_Bounds.extend(_marker.getPosition());
							var largonombre = _marker.title.length;
							if (largonombre > 30){
								var titulomarkador=_marker.title.substr(0,30)+'...'
							}
							else{
								var titulomarkador=_marker.title;
							}
							var noesruta=0;
							for(no=0;no<idsnoroute.length;no++){
								if(parseInt(coo[c])==parseInt(idsnoroute[no])){
									var noesruta=1;
								}							
							}
						_marker.genid = coo[c];
						if(noesruta==0){
							varnumenruta=varnumenruta+1;
							_marker.listpos = c;							
							_marker.setIcon('ezmapas/maps_pics/basic/'+varnumenruta+'.png');
							estediarutamarkers.push(_marker);
							thiscoors=_marker.getPosition().toString().replace('(','').replace(')','').split(',');
							var thislat=parseFloat(thiscoors[0]);
							var thislng=parseFloat(thiscoors[1]);
							estediawaypoints.push({
								location:new google.maps.LatLng(parseFloat(thislat), parseFloat(thislng)),
								stopover:true});
							varselect=varselect+'<option value="'+coo[c]+'">'+titulomarkador+'</option>';
							$('.div_plans_route').append('<div class="container" id="div_route_'+day+'_'+coo[c]+'"><table id="tablelist'+c+'" class="table table_'+c+'"><tr><td class="t4"><img style="width:25px;" src="https://lh3.googleusercontent.com/-0SnpBef6i6I/VMlfa9qKEQI/AAAAAAANhEM/6nLOyRI7udI/s45/Check%2520active.png" onclick="unadplacefromroute('+day+','+coo[c]+','+c+');"></td><td class="t3" onclick="window.top.showinfoplace(\''+_marker.mk_category.idunico+'\',\''+_marker.mk_id+'\', \'myezplan\');"><label class="cursor label_check">'+titulomarkador+'<br><div id="'+_marker.mk_category.idunico+'newtype">'+_marker.areacity__+'</div><td class="table_img" onclick="window.top.showinfoplace(\''+_marker.mk_category.idunico+'\',\''+_marker.mk_id+'\', \'myezplan\');"> <div id="'+_marker.mk_category.idunico+'newimg">'+_marker.img__+'</div></td></label></td></tr></table><div id="div_subroute_'+coo[c]+'"></div></div>');
						}
						else{
							_marker.setIcon('ezmapas/maps_pics/basic/area.png');
						$('.div_plans_noroute').append('<div class="container"  id="div_route_'+day+'_'+coo[c]+'"><table class="table"><tr><td class="t4"><img style="width:25px;" src="https://lh3.googleusercontent.com/-lxmYejGOw0k/VMlfaxYOftI/AAAAAAANhEE/zDluXu8_qi0/s45/Check%2520inactive%25202.png" onclick="adplacefromroute('+day+','+coo[c]+','+c+');"></td><td class="t3" onclick="window.top.showinfoplace(\''+_marker.mk_category.idunico+'\',\''+_marker.mk_id+'\', \'myezplan\');"><label class="cursor label_check">'+titulomarkador+'<br><div id="'+_marker.mk_category.idunico+'newtype">'+_marker.areacity__+'</div><td class="table_img" onclick="window.top.showinfoplace(\''+_marker.mk_category.idunico+'\',\''+_marker.mk_id+'\', \'myezplan\');"> <div id="'+_marker.mk_category.idunico+'newimg">'+_marker.img__+'</div></td></label></td></tr></table><div id="div_subroute_'+coo[c]+'"></div></div>');
						}
						}
					}
					if(!esdeestaciudad){
						for(xx=0;xx<othercityarray.length;xx++){
							//console.log("listing");
							if(othercityarray[xx].mk_id==coo[c]){
							othercityarray[xx].setMap(mapcitypopup.mapconfig.google.map);
							othercityarray[xx].mk_type=1;
							_marker=othercityarray[xx];
							Plan_Bounds.extend(_marker.getPosition());
							var largonombre = _marker.title.length;
							if (largonombre > 30){
								var titulomarkador=_marker.title.substr(0,30)+'...'
							}
							else{
								var titulomarkador=_marker.title;
							}								
							var noesruta=0;
							for(no=0;no<idsnoroute.length;no++){
								if(parseInt(coo[c])==parseInt(idsnoroute[no])){
									var noesruta=1;
								}							
							}
							_marker.genid = coo[c];
							if(noesruta==0){
								varnumenruta=varnumenruta+1;
								_marker.setIcon('ezmapas/maps_pics/basic/'+varnumenruta+'.png');
								_marker.listpos = c;								
								thiscoors=_marker.getPosition().toString().replace('(','').replace(')','').split(',');
								var thislat=parseFloat(thiscoors[0]);
								var thislng=parseFloat(thiscoors[1]);
								estediawaypoints.push({
									location:new google.maps.LatLng(parseFloat(thislat), parseFloat(thislng)),
									stopover:true
								});
								estediarutamarkers.push(_marker);
								varselect=varselect+'<option value="'+coo[c]+'">'+titulomarkador+'</option>';
								$('.div_plans_route').append('<div class="container"  id="div_route_'+day+'_'+coo[c]+'"><table id="tablelist'+c+'" class="table table_'+c+'"><tr><td class="t4"><img style="width:25px;" src="https://lh3.googleusercontent.com/-0SnpBef6i6I/VMlfa9qKEQI/AAAAAAANhEM/6nLOyRI7udI/s45/Check%2520active.png" onclick="unadplacefromroute('+day+','+coo[c]+');"></td><td class="t3" onclick="window.top.showinfoplace(\''+_marker.mk_category.idunico+'\',\''+_marker.mk_id+'\', \'myezplan\');"><label class="cursor label_check">'+titulomarkador+'<br><div id="'+_marker.mk_category.idunico+'newtype">'+_marker.areacity__+'</div><td class="table_img" onclick="window.top.showinfoplace(\''+_marker.mk_category.idunico+'\',\''+_marker.mk_id+'\', \'myezplan\');"> <div id="'+_marker.mk_category.idunico+'newimg">'+_marker.img__+'</div></td></label></td></tr></table><div id="div_subroute_'+coo[c]+'"></div></div>');
							}
							else{
								_marker.setIcon('ezmapas/maps_pics/basic/area.png');
								$('.div_plans_noroute').append('<div class="container"  id="div_route_'+day+'_'+coo[c]+'"><table class="table"><tr><td class="t4"><img style="width:25px;" src="https://lh3.googleusercontent.com/-lxmYejGOw0k/VMlfaxYOftI/AAAAAAANhEE/zDluXu8_qi0/s45/Check%2520inactive%25202.png" onclick="adplacefromroute('+day+','+coo[c]+');"></td><td class="t3" onclick="window.top.showinfoplace(\''+_marker.mk_category.idunico+'\',\''+_marker.mk_id+'\', \'myezplan\');"><label class="cursor label_check">'+titulomarkador+'<br><div id="'+_marker.mk_category.idunico+'newtype">'+_marker.areacity__+'</div><td class="table_img" onclick="window.top.showinfoplace(\''+_marker.mk_category.idunico+'\',\''+_marker.mk_id+'\', \'myezplan\');"> <div id="'+_marker.mk_category.idunico+'newimg">'+_marker.img__+'</div></td></label></td></tr></table><div id="div_subroute_'+coo[c]+'"></div></div>');
							}
							}
						}
					}
				}
				if(coo[c] < 11){
					var cookieper=$.cookie("EZPERSONAL");
					var cookieper_=cookieper.split('!');
					var esteper=cookieper_[(coo[c]-1)].split('*');
					var estenom=esteper[0];
					var estecoors=esteper[1];
					var _marker=personalmrks[(coo[c]-1)]
					Plan_Bounds.extend(_marker.getPosition());
					_marker.mk_type=2;
					_marker.setVisible(true);
					_marker.setOptions({draggable: false});
					var noesruta=0;
					for(no=0;no<idsnoroute.length;no++){
						if(parseInt(coo[c])==parseInt(idsnoroute[no])){
							var noesruta=1;
						}							
					}
					_marker.genid = coo[c];
					if(noesruta==0){
					varnumenruta=varnumenruta+1;
					_marker.setIcon('ezmapas/maps_pics/basic/'+varnumenruta+'.png');
					_marker.listpos = c;					
					thiscoors=estecoors.replace('(','').replace(')','').split(',');
					var thislat=parseFloat(thiscoors[0]);
					var thislng=parseFloat(thiscoors[1]);
					estediawaypoints.push({
								location:new google.maps.LatLng(parseFloat(thislat), parseFloat(thislng)),
								stopover:true});
					estediarutamarkers.push(_marker);					
					varselect=varselect+'<option value="'+coo[c]+'">'+estenom+'</option>';
					var extramypinfo = '<div id="moremypl'+coo[c]+'" style="display:none;"><table class="table"><tr><td class="t4"></td><td class="t3"><span class="capitalize_red">No information available.</span></td><td class="table_img"></td></table></div>';
					var divextra = '#moremypl'+coo[c];
					$('.div_plans_route').append('<div class="container"  id="div_route_'+day+'_'+coo[c]+'"><table id="tablelist'+c+'" class="table table_'+c+'"><tr><td class="t4"><img style="width:25px;" src="https://lh3.googleusercontent.com/-0SnpBef6i6I/VMlfa9qKEQI/AAAAAAANhEM/6nLOyRI7udI/s45/Check%2520active.png" onclick="unadplacefromroute('+day+','+coo[c]+','+c+');"></td><td class="t3" ><label class="cursor label_check">'+estenom+'<td class="table_img"> <div><img src="https://lh3.googleusercontent.com/-UZliDkbBQtA/VMk6xwLihKI/AAAAAAANhC4/02ZcZPiK-LE/s136/MY%2520PLACE.png" onclick="$('+"'"+divextra+"'"+').slideToggle(0);"></div></td></label></td></tr></table>'+extramypinfo+'</div>');
				}
				else{
					_marker.setIcon('ezmapas/maps_pics/basic/area.png');
					var extramypinfo = '<div id="moremypl'+coo[c]+'" style="display:none;"><table class="table"><tr><td class="t4"></td><td class="t3"><span class="capitalize_red">No information available.</span></td><td class="table_img"></td></table></div>';
					var divextra = '#moremypl'+coo[c];
					$('.div_plans_noroute').append('<div class="container"  id="div_route_'+day+'_'+coo[c]+'"><table class="table"><tr><td class="t4"><img style="width:25px;" src="https://lh3.googleusercontent.com/-lxmYejGOw0k/VMlfaxYOftI/AAAAAAANhEE/zDluXu8_qi0/s45/Check%2520inactive%25202.png" onclick="adplacefromroute('+day+','+coo[c]+','+c+');"></td><td class="t3" ><label class="cursor label_check">'+estenom+'<td class="table_img"> <div><img src="https://lh3.googleusercontent.com/-UZliDkbBQtA/VMk6xwLihKI/AAAAAAANhC4/02ZcZPiK-LE/s136/MY%2520PLACE.png" onclick="$('+"'"+divextra+"'"+').slideToggle(0);"></div></td></label></td></tr></table>'+extramypinfo+'</div>');
				}
				}
				if(coo[c] > 10 && coo[c] <21){
					var este=(coo[c]-10);
					if(este==1){var color='#FF00FF';}
					if(este==2){var color='#00FFCC';}
					if(este==3){var color='#6600CC';}
					if(este==4){var color='#FF0033';}
					if(este==5){var color='#99CC33';}
					if(este==6){var color='#009999';}
					if(este==7){var color='#FF6600';}
					if(este==8){var color='#666600';}
					if(este==9){var color='#989898';}
					if(este==10){var color='#FF0000';}
					var cookieper=$.cookie("EZPR_"+este);
					var cookieper_=cookieper.split('!');
					var estenom=cookieper_[0];
					for(pm=0;pm<personalroutesmarks.length;pm++){
						if(personalroutesmarks[pm].id==(coo[c]-10)){
							personalroutesmarks[pm].setVisible(true);
							personalroutespolylines[pm].setVisible(true);
							var _marker=personalroutesmarks[pm];
							}
					}
					Plan_Bounds.extend(_marker.getPosition());
							_marker.mk_type=3;
					var noesruta=0;
					for(no=0;no<idsnoroute.length;no++){
						if(parseInt(coo[c])==parseInt(idsnoroute[no])){
							var noesruta=1;
						}							
					}
					_marker.genid = coo[c];
					if(noesruta==0){
						varnumenruta=varnumenruta+1;
						_marker.setIcon('ezmapas/maps_pics/basic/'+varnumenruta+'.png');
						_marker.listpos = c;						
						thiscoors=_marker.getPosition().toString().replace('(','').replace(')','').split(',');
						var thislat=parseFloat(thiscoors[0]);
						var thislng=parseFloat(thiscoors[1]);
						estediawaypoints.push({
							location:new google.maps.LatLng(parseFloat(thislat), parseFloat(thislng)),
							stopover:true});							
						estediarutamarkers.push(_marker);
						varselect=varselect+'<option value="'+coo[c]+'">'+estenom+'</option>';
						var extramyrouinfo = '<div id="moremyro'+coo[c]+'" style="display:none;"><table class="table"><tr><td class="t4"></td><td class="t3"><span class="capitalize_red">No information available.</span></td><td class="table_img"></td></table></div>';
						var divextra = '#moremyro'+coo[c];
						$('.div_plans_route').append('<div class="container"  id="div_route_'+day+'_'+coo[c]+'"><table id="tablelist'+c+'" class="table table_'+c+'"><tr><td class="t4"><img style="width:25px;" src="https://lh3.googleusercontent.com/-0SnpBef6i6I/VMlfa9qKEQI/AAAAAAANhEM/6nLOyRI7udI/s45/Check%2520active.png" onclick="unadplacefromroute('+day+','+coo[c]+','+c+');"></td><td class="t3" ><label class="cursor label_check"><span style="color:'+color+';">'+estenom + '</span><td class="table_img"><div><img src="https://lh5.googleusercontent.com/-z3w2lJQ_1fI/VMk6x5OQwmI/AAAAAAANhC8/ZxxaZOhYVxI/s136/MY%2520f" onclick="$('+"'"+divextra+"'"+').slideToggle(0);"></div></td></label></td></tr></table><div id="div_subroute_'+coo[c]+'"></div>'+extramyrouinfo+'</div>');
					}
					else{
						_marker.setIcon('ezmapas/maps_pics/basic/area.png');
						var extramyrouinfo = '<div id="moremyro'+coo[c]+'" style="display:none;"><table class="table"><tr><td class="t4"></td><td class="t3"><span class="capitalize_red">No information available.</span></td><td class="table_img"></td></table></div>';
						var divextra = '#moremyro'+coo[c];
						$('.div_plans_noroute').append('<div class="container"  id="div_route_'+day+'_'+coo[c]+'"><table class="table"><tr><td class="t4"><img style="width:25px;" src="https://lh3.googleusercontent.com/-lxmYejGOw0k/VMlfaxYOftI/AAAAAAANhEE/zDluXu8_qi0/s45/Check%2520inactive%25202.png" onclick="adplacefromroute('+day+','+coo[c]+','+c+');"></td><td class="t3" ><label class="cursor label_check"><span style="color:'+color+';">'+estenom + '</span><td class="table_img"><div><img src="https://lh5.googleusercontent.com/-z3w2lJQ_1fI/VMk6x5OQwmI/AAAAAAANhC8/ZxxaZOhYVxI/s136/MY%2520ROUTE.png" onclick="$('+"'"+divextra+"'"+').slideToggle(0);"></div></td></label></td></tr></table><div id="div_subroute_'+coo[c]+'"></div>'+extramyrouinfo+'</div>');
					}
				}
				if(coo[c] >20 && coo[c] <31){
					var este=(coo[c]-21);
					ideasroutesmarks[este].setVisible(true);
					$.each(arrayideasr,function(index,value){
						if(arrayideasr[index].added_index==este && arrayideasr[index].added==1){
							arrayideasr[index].setVisible(true);
						}
					});
					//ideasroutespolylines[este].setVisible(true);
					
					var cookieideas=$.cookie("EZIDEAS_C").split('!');
					var esteideas=cookieideas[este].split('*');
					var estenom=esteideas[0];
					var estecolor='#'+esteideas[3];
					var _marker=ideasroutesmarks[este];
					Plan_Bounds.extend(_marker.getPosition());
					_marker.mk_type=4;
					_marker.id=coo[c];
					var noesruta=0;
					for(no=0;no<idsnoroute.length;no++){
						if(parseInt(coo[c])==parseInt(idsnoroute[no])){
							var noesruta=1;
						}							
					}
					_marker.genid = coo[c];
					if(noesruta==0){
						varnumenruta=varnumenruta+1;
						_marker.setIcon('ezmapas/maps_pics/basic/'+varnumenruta+'.png');
						_marker.listpos = c;						
						estediawaypoints.push({
							location:new google.maps.LatLng(parseFloat(esteideas[1]), parseFloat(esteideas[2])),
							stopover:true
						});
						estediarutamarkers.push(_marker);
						varselect=varselect+'<option value="'+coo[c]+'">'+estenom+'</option>';
						var extramyideinfo = '<div id="moremyide'+coo[c]+'" style="display:none;"><table class="table"><tr><td class="t4"></td><td class="t3"><span class="capitalize_red">No information available.</span></td><td class="table_img"></td></table></div>';
						var divextra = '#moremyide'+coo[c];
						$('.div_plans_route').append('<div class="container"  id="div_route_'+day+'_'+coo[c]+'"><table id="tablelist'+c+'" class="table table_'+c+'"><tr><td class="t4"><img style="width:25px;" src="https://lh3.googleusercontent.com/-0SnpBef6i6I/VMlfa9qKEQI/AAAAAAANhEM/6nLOyRI7udI/s45/Check%2520active.png" onclick="unadplacefromroute('+day+','+coo[c]+','+c+');"></td><td class="t3" ><label class="cursor label_check"><span style="color:'+estecolor+';">'+estenom + '</span><td class="table_img"><div><img src="https://lh4.googleusercontent.com/-4Cd3GYz2ebM/VMk6Bczpl9I/AAAAAAANhCk/9Clp7mY95fQ/s136/IDEAS%25202.png" onclick="$('+"'"+divextra+"'"+').slideToggle(0);"></div></td></label></td></tr></table><div id="div_subroute_'+coo[c]+'"></div>'+extramyideinfo+'</div>');
					}else{
						var extramyideinfo = '<div id="moremyide'+coo[c]+'" style="display:none;"><table class="table"><tr><td class="t4"></td><td class="t3"><span class="capitalize_red">No information available.</span></td><td class="table_img"></td></table></div>';
						var divextra = '#moremyide'+coo[c];
						_marker.setIcon('ezmapas/maps_pics/basic/area.png');
						$('.div_plans_noroute').append('<div class="container"  id="div_route_'+day+'_'+coo[c]+'"><table class="table"><tr><td class="t4"><img style="width:25px;" src="https://lh3.googleusercontent.com/-lxmYejGOw0k/VMlfaxYOftI/AAAAAAANhEE/zDluXu8_qi0/s45/Check%2520inactive%25202.png" onclick="adplacefromroute('+day+','+coo[c]+','+c+');"></td><td class="t3" ><label class="cursor label_check"><span style="color:'+estecolor+';">'+estenom + '</span><td class="table_img"><div><img src="https://lh4.googleusercontent.com/-4Cd3GYz2ebM/VMk6Bczpl9I/AAAAAAANhCk/9Clp7mY95fQ/s136/IDEAS%25202.png" onclick="$('+"'"+divextra+"'"+').slideToggle(0);"></div></td></label></td></tr></table><div id="div_subroute_'+coo[c]+'"></div>'+extramyideinfo+'</div>');
					}
				}
			}
			else{
				if(coo[c].indexOf('t')>-1){
					var esteid=coo[c].replace('t','');
					var coo2=[];
					if(cooktr_s && cooktr_s !=''){var coo2=cooktr_s.split(',');}
					var stopes=[];
					traesdeestaciudad = false;
					$.each(arraydetransports,function(index,value){
						if(parseInt(arraydetransports[index].rid)===parseInt(esteid)){
							traesdeestaciudad = true;							
							var noesruta=0;
							for(no=0;no<idsnoroute.length;no++){
								if(coo[c]==idsnoroute[no]){
									var noesruta=1;
								}							
							}						
							if(parseInt(arraydetransports[index].type)==1){
								for(st=0;st<arraydetransports[index].arraystops.length;st++){
									for(cs=0;cs<coo2.length;cs++){
										Plan_Bounds.extend(arraydetransports[index].arraystops[st].getPosition());
										if(parseInt(coo2[cs])==parseInt(arraydetransports[index].arraystops[st].id_)){
											stopes.push(arraydetransports[index].arraystops[st].nombre);
										}
									}
								}
							}
							else{
								Plan_Bounds.extend(arraydetransports[index].getPosition());
							}
							var stopsnames=stopes.join(', ');
							arraydetransports[index].mk_type=10;							
							if(stopsnames.length>40){var stopsnames=stopsnames.substring(0,36)+'...';}
							arraydetransports[index].genid = coo[c];
							if(noesruta==0){
								estediarutamarkers.push(arraydetransports[index]);
								arraydetransports[index].setVisible(true);
								arraydetransports[index].listpos = c;																
								var extramytrainfo = '<div id="moremytra'+coo[c]+'" style="display:none;"><table class="table"><tr><td class="t4"></td><td class="t3"><span class="capitalize_red">No information available.</span></td><td class="table_img"></td></table></div>';
								var divextra = '#moremytra'+coo[c];
								$('.div_plans_route').append('<div class="container" id="div_route_'+day+'_t'+esteid+'"><table id="tablelist'+c+'" class="table table_'+c+'"><tr><td class="t4"><img style="width:25px;" src="https://lh3.googleusercontent.com/-0SnpBef6i6I/VMlfa9qKEQI/AAAAAAANhEM/6nLOyRI7udI/s45/Check%2520active.png" onclick="unadplacefromroute('+day+','+"'t"+esteid+"',"+''+c+');"></td><td class="t3" ><label class="cursor label_check"><span  id="span_t_'+x+'" style="color:#'+arraydetransports[index].color+';">'+arraydetransports[index].nombre+'</span><br><h4>'+stopsnames+'</h4><td class="table_img"><div><img src="https://lh6.googleusercontent.com/-5enOtqMjn8Y/VMk6B6MVGJI/AAAAAAANhCo/XV-BGDFNPQU/s136/TRANSPORT.png" onclick="$('+"'"+divextra+"'"+').slideToggle(0);"></div></td></label></td></tr></table><div id="div_subroute_t_'+esteid+'"></div>'+extramytrainfo+'</div>');
							}else{
								var extramytrainfo = '<div id="moremytra'+coo[c]+'" style="display:none;"><table class="table"><tr><td class="t4"></td><td class="t3"><span class="capitalize_red">No information available.</span></td><td class="table_img"></td></table></div>';
								var divextra = '#moremytra'+coo[c];
								$('.div_plans_noroute').append('<div class="container" id="div_route_'+day+'_t'+esteid+'"><table class="table"><tr><td class="t4"><img style="width:25px;" src="https://lh3.googleusercontent.com/-lxmYejGOw0k/VMlfaxYOftI/AAAAAAANhEE/zDluXu8_qi0/s45/Check%2520inactive%25202.png" onclick="adplacefromroute('+day+','+"'t"+esteid+"',"+''+c+');"></td><td class="t3" ><label class="cursor label_check"><span  id="span_t_'+x+'" style="color:#'+arraydetransports[index].color+';">'+arraydetransports[index].nombre+'</span><br><h4>'+stopsnames+'</h4><td class="table_img"><div><img src="https://lh6.googleusercontent.com/-5enOtqMjn8Y/VMk6B6MVGJI/AAAAAAANhCo/XV-BGDFNPQU/s136/TRANSPORT.png" onclick="$('+"'"+divextra+"'"+').slideToggle(0);"></div></td></label></td></tr></table><div id="div_subroute_t_'+esteid+'"></div>'+extramytrainfo+'</div>');
							}
						}
					});
					if(!traesdeestaciudad){
						for(index=0;index<otherarraytrans.length;index++){
							//console.log(otherarraytrans[index].rid);
							//console.log("listing");
							//if(otherarraytrans[xx].rid==coo[c]){
							if(parseInt(otherarraytrans[index].rid)===parseInt(esteid)){
								var noesruta=0;
								for(no=0;no<idsnoroute.length;no++){
									if(coo[c]==idsnoroute[no]){
										var noesruta=1;
									}							
								}						
								if(parseInt(otherarraytrans[index].type)==1){
									for(st=0;st<otherarraytrans[index].arraystops.length;st++){
										for(cs=0;cs<coo2.length;cs++){
											Plan_Bounds.extend(otherarraytrans[index].arraystops[st].getPosition());
											if(parseInt(coo2[cs])==parseInt(otherarraytrans[index].arraystops[st].id_)){
												stopes.push(otherarraytrans[index].arraystops[st].nombre);
											}
										}
									}
								}
								else{
									Plan_Bounds.extend(otherarraytrans[index].getPosition());
								}
								var stopsnames=stopes.join(', ');
								otherarraytrans[index].mk_type=10;							
								if(stopsnames.length>40){var stopsnames=stopsnames.substring(0,36)+'...';}
								otherarraytrans[index].genid = coo[c];
								if(noesruta==0){
									estediarutamarkers.push(otherarraytrans[index]);
									otherarraytrans[index].setVisible(true);
									otherarraytrans[index].listpos = c;																
									var extramytrainfo = '<div id="moremytra'+coo[c]+'" style="display:none;"><table class="table"><tr><td class="t4"></td><td class="t3"><span class="capitalize_red">No information available.</span></td><td class="table_img"></td></table></div>';
									var divextra = '#moremytra'+coo[c];
									$('.div_plans_route').append('<div class="container" id="div_route_'+day+'_t'+esteid+'"><table id="tablelist'+c+'" class="table table_'+c+'"><tr><td class="t4"><img style="width:25px;" src="https://lh3.googleusercontent.com/-0SnpBef6i6I/VMlfa9qKEQI/AAAAAAANhEM/6nLOyRI7udI/s45/Check%2520active.png" onclick="unadplacefromroute('+day+','+"'t"+esteid+"',"+''+c+');"></td><td class="t3" ><label class="cursor label_check"><span  id="span_t_'+x+'" style="color:#'+otherarraytrans[index].color+';">'+otherarraytrans[index].nombre+'</span><br><h4>'+stopsnames+'</h4><td class="table_img"><div><img src="https://lh6.googleusercontent.com/-5enOtqMjn8Y/VMk6B6MVGJI/AAAAAAANhCo/XV-BGDFNPQU/s136/TRANSPORT.png" onclick="$('+"'"+divextra+"'"+').slideToggle(0);"></div></td></label></td></tr></table><div id="div_subroute_t_'+esteid+'"></div>'+extramytrainfo+'</div>');
								}else{
									var extramytrainfo = '<div id="moremytra'+coo[c]+'" style="display:none;"><table class="table"><tr><td class="t4"></td><td class="t3"><span class="capitalize_red">No information available.</span></td><td class="table_img"></td></table></div>';
									var divextra = '#moremytra'+coo[c];
									$('.div_plans_noroute').append('<div class="container" id="div_route_'+day+'_t'+esteid+'"><table class="table"><tr><td class="t4"><img style="width:25px;" src="https://lh3.googleusercontent.com/-lxmYejGOw0k/VMlfaxYOftI/AAAAAAANhEE/zDluXu8_qi0/s45/Check%2520inactive%25202.png" onclick="adplacefromroute('+day+','+"'t"+esteid+"',"+''+c+');"></td><td class="t3" ><label class="cursor label_check"><span  id="span_t_'+x+'" style="color:#'+otherarraytrans[index].color+';">'+otherarraytrans[index].nombre+'</span><br><h4>'+stopsnames+'</h4><td class="table_img"><div><img src="https://lh6.googleusercontent.com/-5enOtqMjn8Y/VMk6B6MVGJI/AAAAAAANhCo/XV-BGDFNPQU/s136/TRANSPORT.png" onclick="$('+"'"+divextra+"'"+').slideToggle(0);"></div></td></label></td></tr></table><div id="div_subroute_t_'+esteid+'"></div>'+extramytrainfo+'</div>');
								}
							}
						}
					}						
				}
				if(coo[c].indexOf('s')>-1){
					var esteid=coo[c].replace('s','');
					servesdeestaciudad = false;
					$.each(arraydeservices, function(index,value){
						if(parseInt(arraydeservices[index].sid)==parseInt(esteid)){
							servesdeestaciudad = true;
							var noesruta=0;
							for(no=0;no<idsnoroute.length;no++){
								//console.log(idsnoroute[no]);
								if(coo[c]==idsnoroute[no]){
									var noesruta=1;
								}							
							}
							arraydeservices[index].genid = coo[c];
							if(noesruta==0){
								arraydeservices[index].setVisible(true);
								arraydeservices[index].mk_type=11;
								arraydeservices[index].listpos = c;										
								Plan_Bounds.extend(arraydeservices[index].getPosition());
								estediarutamarkers.push(arraydeservices[index]);
								var extramyserinfo = '<div id="moremyser'+esteid+'" style="display:none;"><table class="table"><tr><td class="t4"></td><td class="t3"><span class="capitalize_red">No information available.</span></td><td class="table_img"></td></table></div>';
								var divextra = '#moremyser'+esteid;
								$('.div_plans_route').append('<div class="container"  id="div_route_'+day+'_s'+esteid+'"><table id="tablelist'+c+'" class="table table_'+c+'"><tr><td class="t4"><img style="width:25px;" src="https://lh3.googleusercontent.com/-0SnpBef6i6I/VMlfa9qKEQI/AAAAAAANhEM/6nLOyRI7udI/s45/Check%2520active.png" onclick="unadplacefromroute('+day+','+"'s"+esteid+"',"+''+c+');"></td><td class="t3" ><label class="cursor label_check"><span  id="span2_'+x+'_t_'+c+'">'+arraydeservices[index].catname+' - '+arraydeservices[index].nombre+'</span><td class="table_img"><div><img src="https://lh5.googleusercontent.com/-Lbqsh6kBgUA/VEg3r6f9CmI/AAAAAAANg4c/R7wFJ1lLlx8/s136/5%2520service.png" onclick="$('+"'"+divextra+"'"+').slideToggle(0);"></div></td></label></td></tr></table><div id="div_subroute_s_'+esteid+'"></div>'+extramyserinfo+'</div>');
							}else{
								var extramyserinfo = '<div id="moremyser'+esteid+'" style="display:none;"><table class="table"><tr><td class="t4"></td><td class="t3"><span class="capitalize_red">No information available.</span></td><td class="table_img"></td></table></div>';
								var divextra = '#moremyser'+esteid;
								$('.div_plans_noroute').append('<div class="container"  id="div_route_'+day+'_s'+esteid+'"><table class="table"><tr><td class="t4"><img style="width:25px;" src="https://lh3.googleusercontent.com/-lxmYejGOw0k/VMlfaxYOftI/AAAAAAANhEE/zDluXu8_qi0/s45/Check%2520inactive%25202.png" onclick="adplacefromroute('+day+','+"'s"+esteid+"',"+''+c+');"></td><td class="t3" ><label class="cursor label_check"><span  id="span2_'+x+'_t_'+c+'">'+arraydeservices[index].catname+' - '+arraydeservices[index].nombre+'</span><td class="table_img"><div><img src="https://lh5.googleusercontent.com/-Lbqsh6kBgUA/VEg3r6f9CmI/AAAAAAANg4c/R7wFJ1lLlx8/s136/5%2520service.png" onclick="$('+"'"+divextra+"'"+').slideToggle(0);"></div></td></label></td></tr></table><div id="div_subroute_s_'+esteid+'"></div>'+extramyserinfo+'</div>');
							}
						}
					})
					if(!servesdeestaciudad){
						console.log("serv other");
						for(index=0;index<otherarrayserv.length;index++){
							//console.log(otherarrayserv[index].rid);
							//console.log("listing");
							//if(otherarrayserv[xx].rid==coo[c]){
							if(parseInt(otherarrayserv[index].sid)==parseInt(esteid)){
								var noesruta=0;
								for(no=0;no<idsnoroute.length;no++){
									//console.log(idsnoroute[no]);
									if(coo[c]==idsnoroute[no]){
										var noesruta=1;
									}							
								}
								otherarrayserv[index].genid = coo[c];
								if(noesruta==0){
									otherarrayserv[index].setVisible(true);
									otherarrayserv[index].mk_type=11;
									otherarrayserv[index].listpos = c;										
									Plan_Bounds.extend(otherarrayserv[index].getPosition());
									estediarutamarkers.push(otherarrayserv[index]);
									var extramyserinfo = '<div id="moremyser'+esteid+'" style="display:none;"><table class="table"><tr><td class="t4"></td><td class="t3"><span class="capitalize_red">No information available.</span></td><td class="table_img"></td></table></div>';
									var divextra = '#moremyser'+esteid;
									$('.div_plans_route').append('<div class="container"  id="div_route_'+day+'_s'+esteid+'"><table id="tablelist'+c+'" class="table table_'+c+'"><tr><td class="t4"><img style="width:25px;" src="https://lh3.googleusercontent.com/-0SnpBef6i6I/VMlfa9qKEQI/AAAAAAANhEM/6nLOyRI7udI/s45/Check%2520active.png" onclick="unadplacefromroute('+day+','+"'s"+esteid+"',"+''+c+');"></td><td class="t3" ><label class="cursor label_check"><span  id="span2_'+x+'_t_'+c+'">'+otherarrayserv[index].catname+' - '+otherarrayserv[index].nombre+'</span><td class="table_img"><div><img src="https://lh5.googleusercontent.com/-Lbqsh6kBgUA/VEg3r6f9CmI/AAAAAAANg4c/R7wFJ1lLlx8/s136/5%2520service.png" onclick="$('+"'"+divextra+"'"+').slideToggle(0);"></div></td></label></td></tr></table><div id="div_subroute_s_'+esteid+'"></div>'+extramyserinfo+'</div>');
								}else{
									var extramyserinfo = '<div id="moremyser'+esteid+'" style="display:none;"><table class="table"><tr><td class="t4"></td><td class="t3"><span class="capitalize_red">No information available.</span></td><td class="table_img"></td></table></div>';
									var divextra = '#moremyser'+esteid;
									$('.div_plans_noroute').append('<div class="container"  id="div_route_'+day+'_s'+esteid+'"><table class="table"><tr><td class="t4"><img style="width:25px;" src="https://lh3.googleusercontent.com/-lxmYejGOw0k/VMlfaxYOftI/AAAAAAANhEE/zDluXu8_qi0/s45/Check%2520inactive%25202.png" onclick="adplacefromroute('+day+','+"'s"+esteid+"',"+''+c+');"></td><td class="t3" ><label class="cursor label_check"><span  id="span2_'+x+'_t_'+c+'">'+otherarrayserv[index].catname+' - '+otherarrayserv[index].nombre+'</span><td class="table_img"><div><img src="https://lh5.googleusercontent.com/-Lbqsh6kBgUA/VEg3r6f9CmI/AAAAAAANg4c/R7wFJ1lLlx8/s136/5%2520service.png" onclick="$('+"'"+divextra+"'"+').slideToggle(0);"></div></td></label></td></tr></table><div id="div_subroute_s_'+esteid+'"></div>'+extramyserinfo+'</div>');
								}
							}
						}
					}
				}
			}
			}
			if(estediawaypoints.length >1){
				var Renderoptions ={suppressMarkers:true,suppressInfoWindows:true};
				directionsDisplay = new google.maps.DirectionsRenderer(Renderoptions);
				directionsDisplay.setMap(mapcitypopup.mapconfig.google.map);
				if(estediawaypoints.length==2){
					start=estediawaypoints[0].location;
					end=estediawaypoints[(estediawaypoints.length-1)].location;
					var request = {origin:start,destination:end,travelMode: google.maps.TravelMode.WALKING};
					if(gotm=='WALKING'){
						var request = {origin:start,destination:end,travelMode: google.maps.TravelMode.WALKING};
					}
					if(gotm=='BICYCLING'){
						var request = {origin:start,destination:end,travelMode: google.maps.TravelMode.BICYCLING};
					}
					if(gotm=='DRIVING'){
						var request = {origin:start,destination:end,travelMode: google.maps.TravelMode.DRIVING};
					}
					
				}
				if(estediawaypoints.length>2){
					start=estediawaypoints[0].location;
					end=estediawaypoints[(estediawaypoints.length-1)].location;
					estediawaypoints.splice(0,1);
					estediawaypoints.splice((estediawaypoints.length-1),1);
					var request = {origin:start,destination:end,waypoints: estediawaypoints, optimizeWaypoints: false,travelMode: google.maps.TravelMode.WALKING};
					if(gotm=='WALKING'){
						var request = {origin:start,destination:end,waypoints: estediawaypoints,			  optimizeWaypoints: false,travelMode: google.maps.TravelMode.WALKING};
					}
					if(gotm=='BICYCLING'){
						var request = {origin:start,destination:end,waypoints: estediawaypoints,			  optimizeWaypoints: false,travelMode: google.maps.TravelMode.BICYCLING};
					}
					if(gotm=='DRIVING'){
						var request = {origin:start,destination:end,waypoints: estediawaypoints,			  optimizeWaypoints: false,travelMode: google.maps.TravelMode.DRIVING};
					}
					 
				}
				directionsService.route(request, function(result, status) {
					if (status == google.maps.DirectionsStatus.OK) {
						//alert('OK');
						directionsDisplay.setDirections(result);
					}
				});
			}
	}
	if(!fullorder || fullorder==''){
		var contar_r=estediarutamarkers.length || 0;
		var contar_r=contar_r-1;
		if(cooktr && cooktr!=''){
			var cotra=cooktr.split(',');
			var coo2=[];
			if(cooktr_s && cooktr_s !=''){var coo2=cooktr_s.split(',');}
			for(cc=0;cc<cotra.length;cc++){
				traesdeestaciudad = false;
				var contar_r=contar_r+1;
				var stopes=[];
				$.each(arraydetransports,function(index,value){				
					if(parseInt(arraydetransports[index].rid)===parseInt(cotra[cc])){
						traesdeestaciudad = true;
						var noesruta=0;
						for(no=0;no<idsnoroute.length;no++){
							if('t'+cotra[cc]==idsnoroute[no]){
								var noesruta=1;
							}							
						}					
						if(parseInt(arraydetransports[index].type)==1){
							for(st=0;st<arraydetransports[index].arraystops.length;st++){
								for(cs=0;cs<coo2.length;cs++){
									Plan_Bounds.extend(arraydetransports[index].arraystops[st].getPosition());
									if(parseInt(coo2[cs])==parseInt(arraydetransports[index].arraystops[st].id_)){
										stopes.push(arraydetransports[index].arraystops[st].nombre);
									}
								}
							}
						}
						else{
							Plan_Bounds.extend(arraydetransports[index].getPosition());
						}
						var stopsnames=stopes.join(', ');
						if(stopsnames.length>40){var stopsnames=stopsnames.substring(0,36)+'...';}
						arraydetransports[index].mk_type=10;						
						arraydetransports[index].genid = coo[c];
						if(noesruta==0){
							estediarutamarkers.push(arraydetransports[index]);
							arraydetransports[index].setVisible(true);
							arraydetransports[index].listpos = contar_r;							
							var extramytrainfo = '<div id="moremytra'+cotra[cc]+'" style="display:none;"><table class="table"><tr><td class="t4"></td><td class="t3"><span class="capitalize_red">No information available.</span></td><td class="table_img"></td></table></div>';
							var divextra = '#moremytra'+cotra[cc];
							$('.div_plans_route').append('<div class="container"  id="div_route_'+day+'_t'+cotra[cc]+'"><table id="tablelist'+contar_r+'" class="table table_'+contar_r+'"><tr><td class="t4"><img style="width:25px;" src="https://lh3.googleusercontent.com/-0SnpBef6i6I/VMlfa9qKEQI/AAAAAAANhEM/6nLOyRI7udI/s45/Check%2520active.png" onclick="unadplacefromroute('+day+','+"'t"+cotra[cc]+"',"+''+cc+');"></td><td class="t3" ><label class="cursor label_check"><span  id="span_t_'+x+'" style="color:#'+arraydetransports[index].color+';">'+arraydetransports[index].nombre+'</span><br><h4>'+stopsnames+'</h4><td class="table_img"><div><img src="https://lh6.googleusercontent.com/-5enOtqMjn8Y/VMk6B6MVGJI/AAAAAAANhCo/XV-BGDFNPQU/s136/TRANSPORT.png" onclick="$('+"'"+divextra+"'"+').slideToggle(0);"></div></td></label></td></tr></table><div id="div_subroute_t_'+cotra[cc]+'"></div>'+extramytrainfo+'</div>');
						}else{
							var extramytrainfo = '<div id="moremytra'+cotra[cc]+'" style="display:none;"><table class="table"><tr><td class="t4"></td><td class="t3"><span class="capitalize_red">No information available.</span></td><td class="table_img"></td></table></div>';
							var divextra = '#moremytra'+cotra[cc];
							$('.div_plans_noroute').append('<div class="container"  id="div_route_'+day+'_t'+cotra[cc]+'"><table class="table"><tr><td class="t4"><img style="width:25px;" src="https://lh3.googleusercontent.com/-lxmYejGOw0k/VMlfaxYOftI/AAAAAAANhEE/zDluXu8_qi0/s45/Check%2520inactive%25202.png" onclick="adplacefromroute('+day+','+"'t"+cotra[cc]+"',"+''+cc+');"></td><td class="t3" ><label class="cursor label_check"><span  id="span_t_'+x+'" style="color:#'+arraydetransports[index].color+';">'+arraydetransports[index].nombre+'</span><br><h4>'+stopsnames+'</h4><td class="table_img"><div><img src="https://lh6.googleusercontent.com/-5enOtqMjn8Y/VMk6B6MVGJI/AAAAAAANhCo/XV-BGDFNPQU/s136/TRANSPORT.png" onclick="$('+"'"+divextra+"'"+').slideToggle(0);"></div></td></label></td></tr></table><div id="div_subroute_t_'+cotra[cc]+'"></div>'+extramytrainfo+'</div>');
						}
					}
				});
				//console.log(traesdeestaciudad);
				if(!traesdeestaciudad){
					//console.log(cotra[cc]+"other trans route");
					for(index=0;index<otherarraytrans.length;index++){
						//console.log(otherarraytrans[index].rid);
						//console.log("listing");
						//if(otherarraytrans[xx].rid==coo[c]){
						if(parseInt(otherarraytrans[index].rid)===parseInt(cotra[cc])){
							//console.log("is in other trans route");
							var noesruta=0;
							for(no=0;no<idsnoroute.length;no++){
								if('t'+cotra[cc]==idsnoroute[no]){
									var noesruta=1;
								}							
							}					
							if(parseInt(otherarraytrans[index].type)==1){
								for(st=0;st<otherarraytrans[index].arraystops.length;st++){
									for(cs=0;cs<coo2.length;cs++){
										Plan_Bounds.extend(otherarraytrans[index].arraystops[st].getPosition());
										if(parseInt(coo2[cs])==parseInt(otherarraytrans[index].arraystops[st].id_)){
											stopes.push(otherarraytrans[index].arraystops[st].nombre);
										}
									}
								}
							}
							else{
								Plan_Bounds.extend(otherarraytrans[index].getPosition());
							}
							var stopsnames=stopes.join(', ');
							if(stopsnames.length>40){var stopsnames=stopsnames.substring(0,36)+'...';}
							otherarraytrans[index].mk_type=10;							
							otherarraytrans[index].genid = coo[c];
							if(noesruta==0){
								estediarutamarkers.push(otherarraytrans[index]);
								otherarraytrans[index].setVisible(true);
								otherarraytrans[index].listpos = contar_r;							
								var extramytrainfo = '<div id="moremytra'+cotra[cc]+'" style="display:none;"><table class="table"><tr><td class="t4"></td><td class="t3"><span class="capitalize_red">No information available.</span></td><td class="table_img"></td></table></div>';
								var divextra = '#moremytra'+cotra[cc];
								$('.div_plans_route').append('<div class="container"  id="div_route_'+day+'_t'+cotra[cc]+'"><table id="tablelist'+contar_r+'" class="table table_'+contar_r+'"><tr><td class="t4"><img style="width:25px;" src="https://lh3.googleusercontent.com/-0SnpBef6i6I/VMlfa9qKEQI/AAAAAAANhEM/6nLOyRI7udI/s45/Check%2520active.png" onclick="unadplacefromroute('+day+','+"'t"+cotra[cc]+"',"+''+cc+');"></td><td class="t3" ><label class="cursor label_check"><span  id="span_t_'+x+'" style="color:#'+otherarraytrans[index].color+';">'+otherarraytrans[index].nombre+'</span><br><h4>'+stopsnames+'</h4><td class="table_img"><div><img src="https://lh6.googleusercontent.com/-5enOtqMjn8Y/VMk6B6MVGJI/AAAAAAANhCo/XV-BGDFNPQU/s136/TRANSPORT.png" onclick="$('+"'"+divextra+"'"+').slideToggle(0);"></div></td></label></td></tr></table><div id="div_subroute_t_'+cotra[cc]+'"></div>'+extramytrainfo+'</div>');
							}else{
								var extramytrainfo = '<div id="moremytra'+cotra[cc]+'" style="display:none;"><table class="table"><tr><td class="t4"></td><td class="t3"><span class="capitalize_red">No information available.</span></td><td class="table_img"></td></table></div>';
								var divextra = '#moremytra'+cotra[cc];
								$('.div_plans_noroute').append('<div class="container"  id="div_route_'+day+'_t'+cotra[cc]+'"><table class="table"><tr><td class="t4"><img style="width:25px;" src="https://lh3.googleusercontent.com/-lxmYejGOw0k/VMlfaxYOftI/AAAAAAANhEE/zDluXu8_qi0/s45/Check%2520inactive%25202.png" onclick="adplacefromroute('+day+','+"'t"+cotra[cc]+"',"+''+cc+');"></td><td class="t3" ><label class="cursor label_check"><span  id="span_t_'+x+'" style="color:#'+otherarraytrans[index].color+';">'+otherarraytrans[index].nombre+'</span><br><h4>'+stopsnames+'</h4><td class="table_img"><div><img src="https://lh6.googleusercontent.com/-5enOtqMjn8Y/VMk6B6MVGJI/AAAAAAANhCo/XV-BGDFNPQU/s136/TRANSPORT.png" onclick="$('+"'"+divextra+"'"+').slideToggle(0);"></div></td></label></td></tr></table><div id="div_subroute_t_'+cotra[cc]+'"></div>'+extramytrainfo+'</div>');
							}
						}
					}
				}
			}
		}
		if(cooksr && cooksr !=''){
			var coo=cooksr.split(',')
			for(c=0;c<coo.length;c++){
				servesdeestaciudad = false;
				var contar_r=contar_r+1;
				$.each(arraydeservices, function(index,value){					
					if(parseInt(arraydeservices[index].sid)==parseInt(coo[c])){
						servesdeestaciudad = true;
						var noesruta=0;
						for(no=0;no<idsnoroute.length;no++){
							//console.log(idsnoroute[no]);
							if('s'+coo[c]==idsnoroute[no]){
								var noesruta=1;
								
							}							
						}
						arraydeservices[index].genid = coo[c];
						if(noesruta==0){
							arraydeservices[index].setVisible(true);
							arraydeservices[index].mk_type=11;
							arraydeservices[index].listpos = contar_r;
							Plan_Bounds.extend(arraydeservices[index].getPosition());
							estediarutamarkers.push(arraydeservices[index]);
							var extramyserinfo = '<div id="moremyser'+coo[c]+'" style="display:none;"><table class="table"><tr><td class="t4"></td><td class="t3"><span class="capitalize_red">No information available.</span></td><td class="table_img"></td></table></div>';
							var divextra = '#moremyser'+coo[c];
							$('.div_plans_route').append('<div class="container" id="div_route_'+day+'_s'+coo[c]+'"><table id="tablelist'+contar_r+'"  class="table table_'+contar_r+'"><tr><td class="t4"><img style="width:25px;" src="https://lh3.googleusercontent.com/-0SnpBef6i6I/VMlfa9qKEQI/AAAAAAANhEM/6nLOyRI7udI/s45/Check%2520active.png" onclick="unadplacefromroute('+day+','+"'s"+coo[c]+"',"+''+contar_r+');"></td><td class="t3" ><label class="cursor label_check"><span  id="span2_'+x+'_t_'+contar_r+'">'+arraydeservices[index].catname+' - '+arraydeservices[index].nombre+'</span><td class="table_img"><div><img src="https://lh5.googleusercontent.com/-Lbqsh6kBgUA/VEg3r6f9CmI/AAAAAAANg4c/R7wFJ1lLlx8/s136/5%2520service.png" onclick="$('+"'"+divextra+"'"+').slideToggle(0);"></div></td></label></td></tr></table><div id="div_subroute_s_'+coo[c]+'"></div>'+extramyserinfo+'</div>');
						}else{
							var extramyserinfo = '<div id="moremyser'+coo[c]+'" style="display:none;"><table class="table"><tr><td class="t4"></td><td class="t3"><span class="capitalize_red">No information available.</span></td><td class="table_img"></td></table></div>';
							var divextra = '#moremyser'+coo[c];
							$('.div_plans_noroute').append('<div class="container" id="div_route_'+day+'_s'+coo[c]+'"><table class="table"><tr><td class="t4"><img style="width:25px;" src="https://lh3.googleusercontent.com/-lxmYejGOw0k/VMlfaxYOftI/AAAAAAANhEE/zDluXu8_qi0/s45/Check%2520inactive%25202.png" onclick="adplacefromroute('+day+','+"'s"+coo[c]+"',"+''+contar_r+');"></td><td class="t3" ><label class="cursor label_check"><span  id="span2_'+x+'_t_'+contar_r+'">'+arraydeservices[index].catname+' - '+arraydeservices[index].nombre+'</span><td class="table_img"><div><img src="https://lh5.googleusercontent.com/-Lbqsh6kBgUA/VEg3r6f9CmI/AAAAAAANg4c/R7wFJ1lLlx8/s136/5%2520service.png" onclick="$('+"'"+divextra+"'"+').slideToggle(0);"></div></td></label></td></tr></table><div id="div_subroute_s_'+coo[c]+'"></div>'+extramyserinfo+'</div>');
						}
					}
				})
				if(!servesdeestaciudad){
					console.log("serv other");
					for(index=0;index<otherarrayserv.length;index++){
						//console.log(otherarrayserv[index].rid);
						//console.log("listing");
						//if(otherarrayserv[xx].rid==coo[c]){
						if(parseInt(otherarrayserv[index].sid)==parseInt(coo[c])){
							var noesruta=0;
							for(no=0;no<idsnoroute.length;no++){
								//console.log(idsnoroute[no]);
								if('s'+coo[c]==idsnoroute[no]){
									var noesruta=1;
									
								}							
							}
							otherarrayserv[index].genid = coo[c];
							if(noesruta==0){
								otherarrayserv[index].setVisible(true);
								otherarrayserv[index].mk_type=11;
								otherarrayserv[index].listpos = contar_r;
								Plan_Bounds.extend(otherarrayserv[index].getPosition());
								estediarutamarkers.push(otherarrayserv[index]);
								var extramyserinfo = '<div id="moremyser'+coo[c]+'" style="display:none;"><table class="table"><tr><td class="t4"></td><td class="t3"><span class="capitalize_red">No information available.</span></td><td class="table_img"></td></table></div>';
								var divextra = '#moremyser'+coo[c];
								$('.div_plans_route').append('<div class="container" id="div_route_'+day+'_s'+coo[c]+'"><table id="tablelist'+contar_r+'"  class="table table_'+contar_r+'"><tr><td class="t4"><img style="width:25px;" src="https://lh3.googleusercontent.com/-0SnpBef6i6I/VMlfa9qKEQI/AAAAAAANhEM/6nLOyRI7udI/s45/Check%2520active.png" onclick="unadplacefromroute('+day+','+"'s"+coo[c]+"',"+''+contar_r+');"></td><td class="t3" ><label class="cursor label_check"><span  id="span2_'+x+'_t_'+contar_r+'">'+otherarrayserv[index].catname+' - '+otherarrayserv[index].nombre+'</span><td class="table_img"><div><img src="https://lh5.googleusercontent.com/-Lbqsh6kBgUA/VEg3r6f9CmI/AAAAAAANg4c/R7wFJ1lLlx8/s136/5%2520service.png" onclick="$('+"'"+divextra+"'"+').slideToggle(0);"></div></td></label></td></tr></table><div id="div_subroute_s_'+coo[c]+'"></div>'+extramyserinfo+'</div>');
							}else{
								var extramyserinfo = '<div id="moremyser'+coo[c]+'" style="display:none;"><table class="table"><tr><td class="t4"></td><td class="t3"><span class="capitalize_red">No information available.</span></td><td class="table_img"></td></table></div>';
								var divextra = '#moremyser'+coo[c];
								$('.div_plans_noroute').append('<div class="container" id="div_route_'+day+'_s'+coo[c]+'"><table class="table"><tr><td class="t4"><img style="width:25px;" src="https://lh3.googleusercontent.com/-lxmYejGOw0k/VMlfaxYOftI/AAAAAAANhEE/zDluXu8_qi0/s45/Check%2520inactive%25202.png" onclick="adplacefromroute('+day+','+"'s"+coo[c]+"',"+''+contar_r+');"></td><td class="t3" ><label class="cursor label_check"><span  id="span2_'+x+'_t_'+contar_r+'">'+otherarrayserv[index].catname+' - '+otherarrayserv[index].nombre+'</span><td class="table_img"><div><img src="https://lh5.googleusercontent.com/-Lbqsh6kBgUA/VEg3r6f9CmI/AAAAAAANg4c/R7wFJ1lLlx8/s136/5%2520service.png" onclick="$('+"'"+divextra+"'"+').slideToggle(0);"></div></td></label></td></tr></table><div id="div_subroute_s_'+coo[c]+'"></div>'+extramyserinfo+'</div>');
							}
						}					
					}
				}
			}
		}
	}
	if(estediawaypoints.length<=1){
		mapcitypopup.mapconfig.google.map.fitBounds(Plan_Bounds);
		$("#advoptbtn").hide();
	}
	else{
	//$('.div_plans_noroute').append('<div id="adv_opt" style="display:none;" class="button-show button-square-2 button-round-blue2" onclick="showadvopt();">Advanced Options</div>');
	var divadv='<div id="advopt" class="advopt panel" style="" align="center" data-role="panel" data-position="right" data-display="overlay" data-theme="a">';
	var divadv=divadv+'<div id="box-header" class="box-header"><a href="javascript:;" onclick="showadvopt();" title="" alt="Close Window alt" style="float:left;"><img style=" padding-right:10px;" height="35px" src="https://lh5.googleusercontent.com/-Cb5dhSGmMSA/U5I5STA1muI/AAAAAAANfGk/1rOXlx8756Q/s52/Untitled8.png"></a></div>';
	var divadv=divadv+'<div align="center" style="max-width:200px;"><h1 style="width:200px;"><span class="capitalize_red">+</span>Options</h1><span class="capitalize_red">3 Ways to do it</span></div><div align="center" class="box-gray-c"><span class="titleseszplan "><img src="https://lh3.googleusercontent.com/-wSITGniEFBc/VUKLRATdIwI/AAAAAAANhY0/f2YfXZ377ug/s57/a.png" style="vertical-align:middle;height:50px;"><span class="">W</span>here&nbsp;</span><span style="font-size: 0.9em;font-weight: bold;"></span><br/>';
	var divadv=divadv+'<span>To Start</span><br/><select id="sel_sp" class="select_m">'+varselect+'</select><br/>';
	var divadv=divadv+'<span>To End</span><br/><select id="sel_ep" class="select_m">'+varselect+'</select></div>'
	var divadv=divadv+'<div align="center" class="box-gray-c"><span class="titleseszplan"><img src="https://lh3.googleusercontent.com/-_mg1sGNr9bw/VUKLRBtx1rI/AAAAAAANhYw/bP2XiUKQQLU/s57/b.png" style="vertical-align:middle;height:50px;"><span class="">H</span>ow&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br/><span style="font-size: 0.9em;">Will you get there?</span><br/>';
	var divadv=divadv+'<select name="gotm" id="gotm" class="select_m"><option value="WALKING">Walking</option><option value="BICYCLING">Bicycling</option><option value="DRIVING">By Car</option></select></div>';
	var divadv=divadv+'<div align="center" class="box-gray-c"><img src="https://lh3.googleusercontent.com/-BxJYR7EmgGM/VUKLRVBaIwI/AAAAAAANhY4/5FMRKE2ibjY/s57/c.png" style="vertical-align:middle;height:50px;"><div id="adv_opt_optimize" class="button-show button-square-2 button-round-blue2" onclick="advopt_optimize();">Optimize</div></div>';
	var divadv=divadv+'<div id="adv_opt_save" class="button-show button-square-2 button-round-blue2" onclick="saveadvopt('+day+');">Save</div></div>';
	$("#advoptbtn").show();
	$('#advopt_cont').empty();
	$('#advopt_cont').append(divadv);
	document.getElementById('sel_sp').value=coo[0];
	document.getElementById('sel_ep').value=coo[(coo.length-1)];
	document.getElementById('gotm').value=gotm;
	document.getElementById('adv_opt_optimize').style.backgroundColor='rgb(211, 211, 211)';
	}
	$('.div_plans_route').sortable({handle:'.table_img img',update : function (e, ui) { 
		var dayOrder = $(this).sortable('toArray').toString().replace(/div_route_/g,'').split(',');
					var order=[];
					var orderf=[];
					for(x=0;x<dayOrder.length;x++){
						var dayOrder_=dayOrder[x].split('_');
						var day=dayOrder_[0];
						orderf.push(dayOrder_[1]);
						if(dayOrder_[1].indexOf('t')<0 && dayOrder_[1].indexOf('s')<0){
							order.push(dayOrder_[1]);
						}
					}
					var coo2=$.cookie("EZMAPCITYPLACES2_day"+day);
					if(coo2 && coo2!=''){
						var coo2_=coo2.split(',');
						for(f=0;f<coo2_.length;f++){
							order.push(coo2_[f]);
							orderf.push(coo2_[f]);
						}
					}
					$.cookie("EZROUTE_day_"+day,true);
					$.cookie("EZMAPCITYPLACES_day"+day,order.join(','));
					$.cookie("EZFULLORDER_day"+day,orderf.join(','));
					/*$('.div_plans_route').hide();
					$('.div_plans_route_label').hide();
					$('.div_plans_noroute').hide();
					$('.button-show-MEP').css("background-color",'rgb(211, 211, 211)');  
					varshowmep=false;*/
					if(typeof(directionsDisplay)!='undefined'){directionsDisplay.setMap(null);}
					if(typeof(initialLocation)!="undefined"){
						mapcitypopup.mapconfig.google.map.setCenter(initialLocation);
						myLocationControlChange("disable");
						clearTimeout(gtml_time1);
						clearTimeout(gtml_time2);
					}
					//console.log(day);
					varlistchanged = true;
					MyLocationDiv.remove();
					resetdayarray(day);
					//viewrouteforday(day);
		} 
	});
	if(!sessionStorage.cf_sid){
		var userid = "";
	}else{
		var userid = sessionStorage.cf_sid;
		var itiid = $.cookie("MYITINERARYID")
		var numdays = $.cookie("NUMDAYS")
		var orders = $.cookie("EZFULLORDER_day"+day)
		var url = "http://myezplan.com/mobile/appdata/data_ajax/mapcity_content_EI.cfm?rnu=5131616516651";
		var urlconfig = {action:"dealsfornav",itiid:itiid,numdays:numdays,userid:userid,orders:orders,day:day};
		//$("#divitifuncs").load(url,urlconfig)
		$.ajax({
			type: "POST",
			url: url,
			async:true, 
			data: urlconfig ,
			success: function(datos){
				$("#divitifuncs").html(datos);
				//resetdayarray(day);				
			}
		});
	}
	myLocationControlAdd(mapcitypopup.mapconfig.google.map);
//	$('.nocheck_place_route').attr('Checked',false);
//	$('.check_place_route').attr('Checked',true);
//	setTimeout(aplicachecks(),500);
	//console.log($("#div_plans_noroute").is(':empty'));
	if($("#div_plans_route").is(':empty')){
		console.log("empty");
		$("#div_plans_route").hide();
	}
	if($("#div_plans_noroute").is(':empty')){
		$("#div_plans_noroute").hide();
	}
}
//function aplicachecks(){
//	$('.nocheck_place_route').attr('Checked',false);
//	$('.check_place_route').attr('Checked',true);
//}
function returnfromrouteday(){	
	faqpage = "mapcitypopup";
	viewingday=0;
	$("#myztitledayname").remove();
	$("#myztitleday").remove();
	$("#titlehr").remove();
	$(".wrap").css("height","auto");
	$("#body_map").css("height","235px").css("margin-bottom","0px");
	$("#footer").show();
	$("#titlehead").show();
	//$("#titlehead_virt").show();	
	$('.hider').show();
	$('.hider2').show();
	$('.Step').show();
	$('.MI').show();
	$('.4').hide();
	$('.3').hide();
	$('.MEP').hide();
	$('#Gen_footer').hide();
	$('.buttonsforplanday').hide();
	$('.div_plans_route').hide();
	$('.div_plans_noroute').hide();
	$('.div_plans_route_label').hide();
	$('.returnfromroute').hide();
	if(typeof(directionsDisplay)!='undefined'){directionsDisplay.setMap(null);}
	if(typeof(initialLocation)!="undefined"){
		mapcitypopup.mapconfig.google.map.setCenter(initialLocation);
		myLocationControlChange("disable");
		clearTimeout(gtml_time1);
		clearTimeout(gtml_time2);
	}
	MyLocationDiv.remove();
	//closeMyLocation(mapcitypopup.mapconfig.google.map);
	mapcitypopup.showPlaces();
	$.each(personalmrks,function(index,value){
		personalmrks[index].setVisible(true);
		personalmrks[index].setOptions({draggable: true});
		personalmrks[index].setIcon('ezmapas/maps_pics/basic/userplace.png');
	});
	$.each(personalroutesmarks, function(index,value){
		personalroutesmarks[index].setVisible(true);
		personalroutesmarks[index].setIcon(personalroutesmarks[index].icono);
		personalroutespolylines[index].setVisible(true);
	});
	$.each(othercityarray,function(index,value){
		othercityarray[index].setMap[null];
	})
	$.each(ideasroutesmarks, function(index,value){
		ideasroutesmarks[index].setVisible(true);
		ideasroutesmarks[index].setIcon('http://www.myezplan.com/ezmapas/maps_pics/basic/area.png');
	});
	if(typeof(arrayideasr)!='undefined'){
		$.each(arrayideasr,function(index,value){
			if(arrayideasr[index].added==1){arrayideasr[index].setVisible(true);}
		});
	}
	$.each(arraydetransports,function(index,value){
		if(arraydetransports[index].sel_t==1){
			arraydetransports[index].setVisible(true);
		}
	});
	$.each(arraydeservices,function(index,value){
		if(arraydeservices[index].sel_t==1){
			arraydeservices[index].setVisible(true);
		}
	});
	if(typeof(arraydeals)!='undefined'){
		$.each(arraydeals,function(index,value){arraydeals[index].setVisible(false);});
	}
	mapcitypopup.showSelPlaces2();
}
function checkallareas(deonde){
var selectallareas=document.getElementById('plan_all').checked
var cookieareas=$.cookie("EZAREAS");
if(cookieareas && cookieareas!=''){var areasnewcookie=cookieareas.split('*');}
else{var areasnewcookie=[];}
if(selectallareas){
$(".check_plan").each(function() {
			/*var esta=0;
			for(ck=0;ck<areasnewcookie.length;ck++){
				if(areasnewcookie[ck]==$(this).attr("id")){var esta=1;}
			}*/
			//alert($(this).attr("id")+' '+esta);
			//if(esta==0){
				//areasnewcookie.push($(this).attr("id"));
				//$(this).trigger("click");
				$(this).prop("checked", true);
				$.cookie($(this).attr("id"), $(this).prop('checked'), {path: '/',expires: 365});
			//}
	});			
$.cookie("EZAREAS",areasnewcookie.join('*'), {path: '/',expires: 365});	
}		 
else{
$(".check_plan").each(function() {
				/*var index=-1;
				for(ck=0;ck<areasnewcookie.length;ck++){
					if(areasnewcookie[ck]==$(this).attr("id")){
						var index=ck;
					}
				}*/
				//alert($(this).attr("id")+' '+index);
				//if(index!=-1){
					//$(this).trigger("click");
					$(this).prop("checked", false);
					$.cookie($(this).attr("id"),false, {path: '/',expires: -1});
					$.cookie($(this).attr("id"),null);
					//areasnewcookie.splice(index,1)
				//}
	});			
$.cookie("EZAREAS",areasnewcookie.join('*'), {path: '/',expires: 365});	
}
polygonsel();
setTimeout('mapcitypopup.showPlaces();',20);
if(deonde==0){
//$('#show_categ').trigger("click");
}
}
function codefecha(cadena){  
   var separador = "/"  
   if (cadena.indexOf(separador)!= -1) {  
        var posi1 = 0  
        var posi2 = cadena.indexOf( separador, posi1 + 1 )  
        var posi3 = cadena.indexOf( separador, posi2 + 1 )  
        this.mes = cadena.substring( posi1, posi2 )  
        this.dia = cadena.substring( posi2 + 1, posi3 )  
        this.anio = cadena.substring( posi3 + 1, cadena.length )  
   } else {  
        this.dia = 0  
        this.mes = 0  
        this.anio = 0     
   }  
}
function checkplacesadd(){
updateMapCityCookie();
$('.check_place').attr('Checked',false);
for(y=0;y<global_MapCityCookie.length;y++){
	var existe =$('#place_'+global_MapCityCookie[y]).val() || 0;
		if(existe!=0){document.getElementById('place_'+global_MapCityCookie[y]).checked=true;}
}
}
function checktransportsadd(){
for(tn=0;tn<arraydetransports.length;tn++){
	var rid=arraydetransports[tn].rid;
	var yaesta=0;
	arraydetransports[tn].sel_t=0;
	if(arraydetransports[tn].type==1){
		arraydetransports[tn].setOptions({strokeColor:'#'+arraydetransports[tn].color});
		for(x=0;x<arraydetransports[tn].subroutes.length;x++){
				arraydetransports[tn].subroutes[x].setOptions({strokeColor:'#'+arraydetransports[tn].color});
		}
	}
	else{arraydetransports[tn].setIcon(arraydetransports[tn].icon_);}
	var numdays_=$.cookie("NUMDAYS");
	var numdays=1
	if(numdays_ && numdays_!=''){var numdays=numdays_}
	for(n=1;n<=numdays;n++){
		var cook=$.cookie("EZTRANSPORT_day"+n);
		if(cook && cook!=''){
			var cook2=cook.split(',');
			for(c1=0;c1<cook2.length;c1++){
				if(rid==cook2[c1]){var yaesta=1;}
			}
		}
	}
	if(yaesta==1){
		//alert(rid)
		arraydetransports[tn].sel_t=1;
		if(typeof(listadetrans_ids)!='undefined'){
			var index=-1;
			for(l=0;l<listadetrans_ids.length;l++){
				if(listadetrans_ids[l]==rid){var index=l;}
			}
			if(index!=-1){
				var ester=listadetrans[index];
				if(ester.indexOf('169, 169, 169')<1){
					var ester=ester.replace('class="trans_'+rid+'"','style="background-color: rgb(169, 169, 169);" class="trans_'+rid+'"');
					listadetrans[index]=ester;
				}
			}
		}
		if(arraydetransports[tn].type==1){
			arraydetransports[tn].setOptions({strokeColor:'#000099'});
			for(x=0;x<arraydetransports[tn].subroutes.length;x++){
				arraydetransports[tn].subroutes[x].setOptions({strokeColor:'#000099'});
			}
		}
		else{arraydetransports[tn].setIcon(arraydetransports[tn].icon_s);}
	}
	else{
		if(typeof(listadetrans_ids)!='undefined'){
			var index=-1;
			for(l=0;l<listadetrans_ids.length;l++){
				if(listadetrans_ids[l]==rid){var index=l;}
			}
			if(index!=-1){
				var ester=listadetrans[index];
				if(ester.indexOf('169, 169, 169')>1){
					var ester=ester.replace('style="background-color: rgb(169, 169, 169);" class="trans_'+rid+'"','class="trans_'+rid+'"');
					listadetrans[index]=ester;
				}
			}
		}
	}
}
}
function checkservicesadd(){
for(tn=0;tn<arraydeservices.length;tn++){
	var rid=arraydeservices[tn].sid;
	var yaesta=0;
	arraydeservices[tn].sel_t=0;
	arraydeservices[tn].setIcon(arraydeservices[tn].icon_);
	var numdays_=$.cookie("NUMDAYS");
	var numdays=1
	if(numdays_ && numdays_!=''){var numdays=numdays_}
	for(n=1;n<=numdays;n++){
		var cook=$.cookie("EZSERVICES_day"+n);
		if(cook && cook!=''){
			var cook2=cook.split(',');
			for(c1=0;c1<cook2.length;c1++){
				if(rid==cook2[c1]){var yaesta=1;}
			}
		}
	}
	if(yaesta==1){
		arraydeservices[tn].sel_t=1;
		if(typeof(listadeserv_ids)!='undefined'){
			var index=-1;
			for(l=0;l<listadeserv_ids.length;l++){
				if(listadeserv_ids[l]==rid){var index=l;}
			}
			if(index!=-1){
				var ester=listadeserv[index];
				if(ester.indexOf('169, 169, 169')<1){
					var ester=ester.replace('class="serv_'+rid+'"','style="background-color: rgb(169, 169, 169);" class="serv_'+rid+'"');
					listadeserv[index]=ester;
				}
			}
		}
		arraydeservices[tn].setIcon(arraydeservices[tn].icon_s);
	}
	else{
		if(typeof(listadeserv_ids)!='undefined'){
			var index=-1;
			for(l=0;l<listadeserv_ids.length;l++){
				if(listadeserv_ids[l]==rid){var index=l;}
			}
			if(index!=-1){
				var ester=listadeserv[index];
				if(ester.indexOf('169, 169, 169')>1){
					var ester=ester.replace('style="background-color: rgb(169, 169, 169);" class="serv_'+rid+'"','class="serv_'+rid+'"');
					listadeserv[index]=ester;
				}
			}
		}
	}	
}
}
function closeinfocalendario_pr_pop(){
	$('#showmpplacesdiv').hide();
	$('#showmpplacesdiv').empty();
	$('#showroutesdiv').show();
	$('.check_place').attr('Checked',false);
	checkplacesadd();
	checktransportsadd();
	checkservicesadd();
	google.maps.event.trigger(map_dr, 'resize');
	if (global_showbutton){mapcitypopup.showSelPlaces2();}
}
function closefullcalendario(){
	$("#myitin-panel .box-header").show();
	$("#myitibutt").show();
	$("#itemp-editdate").show();
	updateMapCityCookie();
	var popup = $("#Calendario-mapcitypopup");
	$('#mask-Calendario-box').fadeOut(0);
	$(popup).fadeOut(0);
	$("#Calendario-mapcitypopup").empty();
	$('#mask-Calendario-box').remove();
	checkplacesadd();
	checktransportsadd();
	checkservicesadd();
	if (global_showbutton){mapcitypopup.showSelPlaces2();}
	
}
function closerutascalendario(){
	var popup = $("#Calendario-mapcitypopup");
	var popup_pan = $("#Calendario-mapcitypopup-pan");
	//$('#mask-Calendario-box').fadeOut(0);
	$(popup).fadeOut(0);
	$(popup_pan).fadeOut(0);
	//$(".ui-panel").panel("close");
	popup.empty();
	$("#Calendario-mapcitypopup-pan .box-body").empty();
	$("#myitibutt").show();
	//$('#mask-Calendario-box').remove();
	checkplacesadd();
	checktransportsadd();
	checkservicesadd();
	if (global_showbutton){mapcitypopup.showSelPlaces2();}
}
function addelminateroute_s(rutaid,stopid){
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
	popup.panel({close: function( event, ui ) {closerutascalendario();}});
	popup.show();
	popup.panel("open");
	popup.showLoading("Please Wait,<br/>Loading...<br/>",false);
	var url = "http://myezplan.com/mobile/appdata/data_ajax/mapcity_content3.cfm?rnu=5131616516651";
	var urlconfig = {action:"calendariotransports",ruta_id:stopid,date1:date1,date2:date2,numdays:numdays,source:'Services_Add',oruta_id:rutaid};
	$("#Calendario-mapcitypopup-pan .box-body").load(url,urlconfig).promise().done($('.mask-loading').remove());
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
	//$(popup).fadeIn(150);
	//$(popup).scrollToMe();
	window.reloadlastitemcal = function(){addelminateroute_s(rutaid,stopid)}
}
function addelminateroute_t(rutaid,tipo,stopid){
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
	popup.panel({close: function( event, ui ) {closerutascalendario();}});
	popup.show();
	popup.panel("open");
	//if(window.lastdate1 != date1_ || window.lastdate2 != date2_ || !sessionStorage.getItem("calendar"+rutaid)){
		popup.showLoading("Please Wait,<br/>Loading...<br/>",false);
		var url = "http://myezplan.com/mobile/appdata/data_ajax/mapcity_content3.cfm?rnu=5131616516651";
		var urlconfig = {action:"calendariotransports",ruta_id:rutaid,date1:date1,date2:date2,numdays:numdays,source:'Transport_Add',tipo:tipo,stop_id:stopid};
		$.ajax({
			type: "POST",
			url: url,
			async:true, 
			cache:false,
			data: urlconfig,
			success: function(datos){
				$("#Calendario-mapcitypopup-pan .box-body").html(datos).promise().done($('.mask-loading').remove());
				sessionStorage.setItem("calendar"+rutaid,datos);
				window.lastdate1 = date1_;
				window.lastdate2 = date2_;
			}
		});
	/*}else{
		$("#Calendario-mapcitypopup-pan .box-body").html(sessionStorage.getItem("calendar"+rutaid));
	}*/		
	var popMargTop = 650; 
	var popMargLeft = ($(popup).width() + 24) / 2; 
	var popZindez = (parseInt(popup.css("z-index"))) + 5;
	$(popup).css({
		//'margin-top' : -popMargTop,
		//'margin-left' : -popMargLeft,
		'z-index' : popZindez + 1
	});
	//$('body').append('<div id="mask-Calendario-box" class="mask"></div>');
	//$('#mask-Calendario-box').fadeIn(300).css('z-index',popZindez);
	/*
	*/
	//$(popup).fadeIn(0);
	//$(popup).scrollToMe();
	window.reloadlastitemcal = function(){addelminateroute_t(rutaid,tipo,stopid)}
}
function editideasroutedates(rid){
var cook=$.cookie("EZIDEAS_C");
var cook3=$.cookie("EZIDEAS");
var cook4=cook3.split(',');
var cook1=cook.split('!');
for(xc=0;xc<cook4.length;xc++){
if(parseFloat(cook4[xc])==parseFloat(rid)){
	var num=(xc+21);
	var estaruta=cook1[xc].split('*');
	var name=estaruta[0]
	opencalforideasroutes(num,name);
	}
}
}
function opencalforideasroutes(id,name){
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
	popup.showLoading("Please Wait,<br/>Loading...<br/>",false);
	var url = "http://myezplan.com/mobile/appdata/data_ajax/mapcity_content3.cfm?rnu=5131616516651";
	var urlconfig = {action:"calendarioplaces",ruta_id:id,name:name,date1:date1,date2:date2,numdays:numdays,source:'Ideasroutes_Add'};
	$("#Calendario-mapcitypopup-pan .box-body").load(url,urlconfig).promise().done($('.mask-loading').remove());
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
			//$(popup).fadeIn(150);
			//$(popup).scrollToMe();
	window.reloadlastitemcal = function(){opencalforideasroutes(id,name);}
}
function opencalforpersonalroutes(num){
	var ruta_id=(parseInt(num)+10);
	for(m=0;m<personalroutesmarks.length;m++){
		if(personalroutesmarks[m].id==num){var name=personalroutesmarks[m].getTitle();}
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
	$('#Calendario-mapcitypopup').showLoading("Please Wait,<br/>Loading...<br/>",false);
			var url = "http://myezplan.com/mobile/appdata/data_ajax/mapcity_content3.cfm?rnu=5131616516651";
			var urlconfig = {action:"calendarioplaces",ruta_id:ruta_id,name:name,date1:date1,date2:date2,numdays:numdays,source:'Personalroutes_info'};
			$("#Calendario-mapcitypopup").load(url,urlconfig);
	//var popup = $("#Calendario-mapcitypopup");
	var popup = $("#Calendario-mapcitypopup-pan");
	popup.panel();
	popup.panel("open");	
	popup.show();
	popup.showLoading("Please Wait,<br/>Loading...<br/>",false);
	var url = "http://myezplan.com/mobile/appdata/data_ajax/mapcity_content3.cfm?rnu=5131616516651";
	var urlconfig = {action:"calendarioplaces",ruta_id:ruta_id,name:name,date1:date1,date2:date2,numdays:numdays,source:'Personalroutes_info'};
	$("#Calendario-mapcitypopup-pan .box-body").load(url,urlconfig, function(){$('.mask-loading').remove()});	
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
	window.reloadlastitemcal = function(){opencalforpersonalroutes(num);}
}
function editItinerarydates(){
	$("#myitin-panel .box-header").hide();
	$("#myitin-panel h1").hide();
	$("#myitibutt").hide();
	$("#itemp-editdate").hide();
	var numdays_=$.cookie("NUMDAYS");
	var numdays=1
	if(numdays_ && numdays_!=''){var numdays=numdays_}
	var date1_=$.cookie("EZDATE1");
	var date2_=$.cookie("EZDATE2");
	var date1='';
	var date2='';
	if(date1_ && date1_!=''){var date1=date1_;}
	if(date2_ && date2_!=''){var date2=date2_;}
	//if(window.lastdate1 != date1_ || window.lastdate2 != date2_  ){
		$('#Calendario-mapcitypopup').showLoading("Please Wait,<br/>Loading...<br/>",false);
		var url = "http://myezplan.com/mobile/appdata/data_ajax/mapcity_content3.cfm?rnu=5131616516651";
		var urlconfig = {action:"calendariofull",date1:date1,date2:date2,numdays:numdays,source:'MyItinerary'};
		$.ajax({
			type: "POST",
			url: "http://myezplan.com/mobile/appdata/data_ajax/mapcity_content3.cfm",
			async:true, 
			cache:false,
			data: urlconfig,
			success: function(datos){
				$("#Calendario-mapcitypopup").html(datos);
				sessionStorage.calendar=datos;
				window.lastdate1 = date1_;
				window.lastdate2 = date2_;
			}
		});
	/*}else{
		$("#Calendario-mapcitypopup").html(sessionStorage.calendar);
	}*/
	var popup = $("#Calendario-mapcitypopup");
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
	$(popup).fadeIn(0);
	$(popup).scrollToMe();
}
function Showmpstopdetails(placeid){
	var popup = $("#roadmapplace-box_panel");
	popup.panel();
	popup.show(); 	
	popup.panel("open"); 
	$('#roadmapplace-box_panel #box-body').showLoading("Please Wait,<br/>Loading...<br/>",false);
	var url = "http://myezplan.com/mobile/appdata/data_ajax/map_stop_tabinfo.cfm?rnu=5131616516651";
	var urlconfig = {ruta_id:placeid,source:'mapcitypopup'};
	$("#roadmapplace-box_panel #box-body").load(url,urlconfig);	
	var popMargTop = 650; 
	var popMargLeft = ($(popup).width() + 24) / 2; 
	var popZindez = (parseInt(popup.css("z-index"))) + 5;
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
	//$(popup).scrollToMe();
}
function reopenpredit(){
	$('#drawroutes').fadeOut(0);
	//$('#mask').fadeOut(0);
	edit_pr(0);
}
function drawideasroutes(){
var cook=$.cookie("EZIDEAS");
if(cook && cook != ''){
		var _url = URLFINAL+"mobile/appdata/data_ajax/mapcity_content2.cfm";
		var _urlconfig = {action:'bringallideas',city:city_id_var,idsadded:cook};
	$('#ideasjavafuncs').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){
		case "error":
		$('#ideasjavafuncs').empty();alert("We are sorry, There is a problem loading ideas routes data");
		break;
		}
	});
}
}

function addideasroute_topr(id){
closeideasroutedata();
		var _url = URLFINAL+"mobile/appdata/data_ajax/mapcity_content2.cfm";
		var _urlconfig = {action:'addideasroute_topr',id:id};
	$('#ideasjavafuncs2').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){
		case "error":
		$('#ideasjavafuncs2').empty();alert("We are sorry, There is a problem loading ideas routes data");
		break;
		}
	});
}
function closeideasroutedata(){
$.each(arrayideasr,function(index,value){
var div=arrayideasr[index].desc_;
$('#'+div).hide();
for(x=0;x<arrayideasr[index].stops.length;x++){
	arrayideasr[index].stops[x].setMap(null);
}
})
irinview=0;
if(shideas){$('#listadeideas').show();}
}
function ideasroutedetails(id,yatiene){
if(typeof(irinview)=='undefined'){irinview=0;}
var irinview2=irinview;
if(irinview!=0){closeideasroutedata();$('#listadeideas').show();}
if(irinview2 != id){
irinview=id;
//	alert(id+' '+yatiene);
if(yatiene==0){
		$('#body_map_canvas .gm-style').removeClass('gmstylefull');
		var _url = URLFINAL+"mobile/appdata/data_ajax/mapcity_content2.cfm";
		var _urlconfig = {action:'bringideas_details',id:id};
		var nombre='<div id="div_desc_ir_'+id+'" style="max-height:350px; overflow:auto; padding: 5px 5px 5px 5px;max-width: 670px;width:95%;" class="box-gray-c"></div>'
	$('#ideas_descs').append(nombre);
	$('#listadeideas').hide();
	$('#div_desc_ir_'+id).load(_url,_urlconfig,function (response, status, xhr){
	switch (status){
		case "error":
		$('#listadeideas').show();alert("We are sorry, There is a problem loading ideas routes data");
		break;
		}
	});
}
else{
	$('#listadeideas').hide();
	$.each(arrayideasr,function(index,value){
		if(arrayideasr[index].id==id){
			var div=arrayideasr[index].desc_;
			$('#'+div).show();
			for(x=0;x<arrayideasr[index].stops.length;x++){
				arrayideasr[index].stops[x].setMap(mapcitypopup.mapconfig.google.map);
			}
		}
	})
	if ($('#ideas_descs').is(':empty')){
		$('#body_map_canvas .gm-style').addClass('gmstylefull');
	}
}
}
}
function Showinfodeasroutedates(id){
	var _elem = $('#routeinfo_'+id);
	var _img  = 'inforoutesimg'+id;
	if(_elem.css("display") == "none"){
		_elem.show();
		document.getElementById(_img).src="https://lh6.googleusercontent.com/-u6H1MzJ_ZjA/U9v3-XjdS0I/AAAAAAANgJI/LFPgZTF8RD4/s54/143.png";
	}else{
		_elem.hide();
		document.getElementById(_img).src="https://lh4.googleusercontent.com/-bq4S5zX1Mrs/U9v3_7fZnTI/AAAAAAANgI0/bSilp7VnO5o/s54/148.png";
	}
}
function filterideasroutes(){
closeideasroutedata();
textolistaideas=[];
		var _plans=[];
		var _plan=$("input:checkbox[name='plan']:checked").each(function(index, element) {_plans.push(parseInt($(element).val()));});
		var type=document.getElementById('selideas_cat').value;
hayideasroutessearch=0;
$.each(arrayideasr,function(index,value){
	if(arrayideasr[index].added!=1){
		arrayideasr[index].setMap(null);
		for(su=0;su<arrayideasr[index].subs.length;su++){
			arrayideasr[index].subs[su].setMap(null);
		}
	}
})
$.each(arrayideasr,function(index,value){
if(arrayideasr[index].added!=1){
var estaplan=0;
var plans_1=arrayideasr[index].plan;
for(pp=0;pp<plans_1.length;pp++){
	if(_plans.indexOf(plans_1[pp])>=0){var estaplan=1;}
}
	if(estaplan==1){
		if(type=='ALL'){
			arrayideasr[index].setMap(mapcitypopup.mapconfig.google.map);
			for(su=0;su<arrayideasr[index].subs.length;su++){
				arrayideasr[index].subs[su].setMap(mapcitypopup.mapconfig.google.map);
			}
			hayideasroutessearch=1;
			textolistaideas.push('<tr class="ideasrow_'+index+'" onmouseover="ideasrouteover('+index+')" onmouseout="ideasrouteout('+index+')" onclick="ideasrouteclick('+index+')"><td><span style="color:'+arrayideasr[index].color+';">'+arrayideasr[index].name+'</span></td></tr><tr><td class="td-gray-line" colspan="1"></td></tr>');
		}
		else{
			var pertenece=0;
			for(c=0;c<arrayideasr[index].type.length;c++){
				if(type.trim()==arrayideasr[index].type[c].trim()){var pertenece=1;}
			}
			if(pertenece==1){
//			if(arrayideasr[index].type.trim()==type.trim()){
				arrayideasr[index].setMap(mapcitypopup.mapconfig.google.map);
				for(su=0;su<arrayideasr[index].subs.length;su++){
					arrayideasr[index].subs[su].setMap(mapcitypopup.mapconfig.google.map);
				}
				hayideasroutessearch=1;
				textolistaideas.push('<tr class="ideasrow_'+index+'" onmouseover="ideasrouteover('+index+')" onmouseout="ideasrouteout('+index+')" onclick="ideasrouteclick('+index+')"><td><span style="color:'+arrayideasr[index].color+';">'+arrayideasr[index].name+'</span></td></tr>');
			}
		}
	}
}
else{
	textolistaideas.push('<tr class="ideasrow_'+index+'" onmouseover="ideasrouteover('+index+')" onmouseout="ideasrouteout('+index+')" onclick="ideasrouteclick('+index+')" style="background-color:rgb(169, 169, 169);"><td><span style="color:'+arrayideasr[index].color+';">'+arrayideasr[index].name+'</span></td></tr><tr><td class="td-gray-line" colspan="1"></td></tr>');
}
})
if(hayideasroutessearch==1){
	mapcitypopup.mapconfig.google.map.fitBounds(ideasrutasBounds);
	armatextolistaideas();
	}
else{
	alert('No Ideas Routes With this areas or Types');
	$('#listadeideas').html('No Ideas Routes With this areas or Types');
}
}
function showhideideasroutes(){
	$('#body_map_canvas .gm-style').addClass('gmstylefull');
	$('#transport_descs').hide();
if(typeof(arrayideasr)=='undefined'){bringallideas();return false;}
closesubroutedata();
closeideasroutedata();
if(shpoly){showhidepolygons();}
if(shtrans){showhidetransports();}	
if(shservices){showhideservices();}
if(shpersonal){showhidepersonalplaces();}
if(shideas){
 mapcitypopup.mapconfig.google.map.setCenter(MC_ir);
 mapcitypopup.mapconfig.google.map.setZoom(MZ_ir);
	$("#but_ideas_routes").removeClass('sprite-ideasAct');
	$("#but_ideas_routes").addClass('sprite-ideas');
	document.getElementById('but_ideas_routes').src='https://lh4.googleusercontent.com/-_OBoAP17jnI/U9zik85MhCI/AAAAAAANgNw/bKZ8kir0irc/s54/173.png';
	shideas=false;
	$('#ideasroutesfilter').hide();
$.each(arrayideasr,function(index,value){
if(arrayideasr[index].added!=1){
	arrayideasr[index].setMap(null);
	for(su=0;su<arrayideasr[index].subs.length;su++){
		arrayideasr[index].subs[su].setMap(null);
	}
}
})
$('#places_legend').show();
$('#trasport_legend').hide();
$('#trasport_legend').empty();
$('#listadeideas').hide();
	}
else{
$('#places_legend').hide();
document.getElementById('trasport_legend').innerHTML='<span style="color:#c00000;">Click on route to see details</span>';
MC_ir =  mapcitypopup.mapconfig.google.map.getCenter();
MZ_ir=  mapcitypopup.mapconfig.google.map.getZoom();
	$("#but_ideas_routes").removeClass('sprite-ideasAct');
	$("#but_ideas_routes").addClass('sprite-ideas');
document.getElementById('but_ideas_routes').src='https://lh3.googleusercontent.com/-Gox7V6-tkDE/U9zilckN13I/AAAAAAANgNg/_Y7l3CYb6TA/s54/174.png';
	shideas=true;
	$('#ideasroutesfilter').show();
		var _plans=[];
		var _plan=$("input:checkbox[name='plan']:checked").each(function(index, element) {_plans.push(parseInt($(element).val()));});
		var type=document.getElementById('selideas_cat').value;
hayideasroutessearch=0;
textolistaideas=[];
$.each(arrayideasr,function(index,value){
if(arrayideasr[index].added!=1){
var estaplan=0;
var plans_1=arrayideasr[index].plan;
for(pp=0;pp<plans_1.length;pp++){
	if(_plans.indexOf(plans_1[pp])>=0){var estaplan=1;}
}
	if(estaplan==1){
		if(type=='ALL'){
			arrayideasr[index].setMap(mapcitypopup.mapconfig.google.map);
			for(su=0;su<arrayideasr[index].subs.length;su++){
				arrayideasr[index].subs[su].setMap(mapcitypopup.mapconfig.google.map);
			}
			hayideasroutessearch=1;
			textolistaideas.push('<tr class="ideasrow_'+index+'" onmouseover="ideasrouteover('+index+')" onmouseout="ideasrouteout('+index+')" onclick="ideasrouteclick('+index+')"><td><span style="color:'+arrayideasr[index].color+';">'+arrayideasr[index].name+'</span></td></tr><tr><td class="td-gray-line" colspan="1"></td></tr>');
		}
		else{
			var pertenece=0;
			for(c=0;c<arrayideasr[index].type.length;c++){
				if(type.trim()==arrayideasr[index].type[c].trim()){var pertenece=1;}
			}
			if(pertenece==1){
//			if(arrayideasr[index].type.trim()==type.trim()){
				arrayideasr[index].setMap(mapcitypopup.mapconfig.google.map);
				for(su=0;su<arrayideasr[index].subs.length;su++){
					arrayideasr[index].subs[su].setMap(mapcitypopup.mapconfig.google.map);
				}
				hayideasroutessearch=1;
				textolistaideas.push('<tr class="ideasrow_'+index+'" onmouseover="ideasrouteover('+index+')" onmouseout="ideasrouteout('+index+')" onclick="ideasrouteclick('+index+')"><td><span style="color:'+arrayideasr[index].color+';">'+arrayideasr[index].name+'</span></td></tr><tr><td class="td-gray-line" colspan="1"></td></tr>');
				}
			}
		}
	}
	else{
		textolistaideas.push('<tr class="ideasrow_'+index+'" onmouseover="ideasrouteover('+index+')" onmouseout="ideasrouteout('+index+')" onclick="ideasrouteclick('+index+')" style="background-color:rgb(169, 169, 169);"><td><span style="color:'+arrayideasr[index].color+';">'+arrayideasr[index].name+'</span></td></tr>');
	}
})
if(hayideasroutessearch==1){
	mapcitypopup.mapconfig.google.map.fitBounds(ideasrutasBounds);
	armatextolistaideas();
	}
else{alert('No Ideas Routes With this areas or Types')}
	}
}
function bringallideas(){
console.log("IDEAS");
var cook=$.cookie("EZIDEAS");
if(!cook || cook == ''){cook='0';}
	var _url = URLFINAL+"mobile/appdata/data_ajax/mapcity_content2.cfm";
	var _urlconfig = {action:'bringallideas',city:city_id_var,idsadded:cook};
	$('#ideasjavafuncs').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){
		case "error":
		$('#ideasjavafuncs').empty();alert("We are sorry, There is a problem loading ideas routes data");
		break;
		case "success":
		showhideideasroutes();
		}
	});
}
function delpersonalroute_fd(num){
closesubroutedata();
for(r=0;r<personalroutespolylines.length;r++){
personalroutespolylines[r].setMap(null);
}
for(r=0;r<personalroutesmarks.length;r++){
personalroutesmarks[r].setMap(null);
}
personalroutesmarks=[];
personalroutespolylines=[];
for(d=num;d<10;d++){
$.cookie("EZPR_"+d,$.cookie("EZPR_"+(d+1)));
$.cookie("EZPR_"+d+"_S",$.cookie("EZPR_"+(d+1)+"_S"));
$.cookie("EZPR_"+(d+1),'');
$.cookie("EZPR_"+(d+1)+"_S",'');
}
var numdays=$.cookie("NUMDAYS");
if(numdays && numdays!=''){
	for(n=1;n<=numdays;n++){
var loads = $.cookie("EZMAPCITYPLACES_day"+n);
var _loads = $.cookie("EZMAPCITYPLACES2_day"+n);
if(loads && loads!=''){
var loads_= loads.split(',')
var newcookie=[];
					for(x=0;x<=(loads_.length-1);x++){
					if(parseInt(loads_[x])>10 && loads_[x]<=20){
						if(parseInt(loads_[x])>(num+10)){newcookie.push((parseInt(loads_[x])-1));}
						else{if(parseInt(loads_[x])!=(num+10)){newcookie.push(loads_[x]);};}
					}
					else{
						newcookie.push(loads_[x]);					
					}
					}
					//alert(n+' '+newcookie.join(','));
					$.cookie("EZMAPCITYPLACES_day"+n,newcookie.join(','));
					updateMapCityCookie();
					var newcookie2=[];
					if(_loads && _loads!=''){
						var _loads_=_loads.split(',');
						for(y=0;y<_loads_.length;y++){
					if(parseInt(_loads_[y])>10 && parseInt(_loads_[y])<=20){
						if(parseInt(_loads_[y])>(num+10)){newcookie2.push((parseInt(_loads_[y])-1));}
						else{if(parseInt(_loads_[y])!=(num+10)){newcookie2.push(_loads_[y]);};}
					}
					else{
						newcookie2.push(_loads_[y]);					
					}							
						}
						$.cookie("EZMAPCITYPLACES2_day"+n,newcookie2.join(','));
					}
					//placesdeleted2.push(num);
}
		}
	}
else{
var loads = $.cookie("EZMAPCITYPLACES_day1");
var _loads = $.cookie("EZMAPCITYPLACES2_day1");
if(loads && loads!=''){
var loads_= loads.split(',')
var newcookie=[];
					for(x=0;x<=(loads_.length-1);x++){
					if(parseInt(loads_[x])>10 && loads_[x]<=20){
						if(parseInt(loads_[x])>(num+10)){newcookie.push((parseInt(loads_[x])-1));}
						else{if(parseInt(loads_[x])!=(num+10)){newcookie.push(loads_[x]);};}
					}
					else{
						newcookie.push(loads_[x]);					
					}
					}
					//alert(newcookie);
					$.cookie("EZMAPCITYPLACES_day1",newcookie.join(','));
					updateMapCityCookie();
if(_loads && _loads !=''){
var _loads_= _loads.split(',')
var newcookie2=[];
					for(y=0;y<=(_loads_.length-1);y++){
					if(parseInt(_loads_[y])>10 && _loads_[y]<=20){
						if(parseInt(_loads_[y])>(num+10)){newcookie2.push((parseInt(_loads_[y])-1));}
						else{if(parseInt(_loads_[y])!=(num+10)){newcookie2.push(_loads_[y]);};}
					}
					else{
						newcookie2.push(_loads_[y]);					
					}
					}
					//alert(newcookie);
					$.cookie("EZMAPCITYPLACES2_day1",newcookie2.join(','));}
}
}
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
map_pr(arraydepr,1);
//var cook=$.cookie("EZPR_1");
//if(cook && cook!=''){
//var cook1=cook.split('!')
//var name=cook1[0];
//var coors_=cook1[1];
//map_pr(name,coors_,1,1);
//}
//var cook=$.cookie("EZPR_2");
//if(cook && cook!=''){
//var cook2=cook.split('!')
//var name=cook2[0];
//var coors_=cook2[1];
//map_pr(name,coors_,2,1);
//}
//var cook=$.cookie("EZPR_3");
//if(cook && cook!=''){
//var cook3=cook.split('!')
//var name=cook3[0];
//var coors_=cook3[1];
//map_pr(name,coors_,3,1);
//}
}
function showprdata(route,name){
if(typeof(shpersonal_r)=='undefined'){shpersonal_r=0;}
shpersonal_r2=shpersonal_r;
closesubroutedata();
if(shpoly){showhidepolygons();}
if(shtrans){showhidetransports();}	
if(shservices){showhideservices();}
if(shpersonal){showhidepersonalplaces();}
if(shideas){showhideideasroutes();}
if(shpersonal_r2 != route){
shpersonal_r=route;
		var _url = URLFINAL+"mobile/appdata/data_ajax/mapcity_content2.cfm";
		var _urlconfig = {action:'prdetails',route:route,name:name};
	$('#transport_descs').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){
		case "error":
		$('#transport_descs').empty();alert("We are sorry, There is a problem loading this route's data");
		break;
		}
	});
}
else{shpersonal_r=0;}
}

function map_pr_pre(){
for(r=0;r<personalroutespolylines.length;r++){
personalroutespolylines[r].setMap(null);
}
for(r=0;r<personalroutesmarks.length;r++){
personalroutesmarks[r].setMap(null);
}
personalroutesmarks=[];
personalroutespolylines=[];
if(typeof(global_showbutton)!='undefined'){if(global_showbutton){global_showbutton=false;mapcitypopup.showSelPlaces();};}
var numdays=$.cookie("NUMDAYS");
if(numdays && numdays!=''){
	for(n=1;n<=numdays;n++){
var loads = $.cookie("EZMAPCITYPLACES_day"+n);
var _loads = $.cookie("EZMAPCITYPLACES2_day"+n);
if(loads && loads!=''){
var loads_= loads.split(',')
var newcookie=''
					for(x=0;x<=(loads_.length-1);x++){
					if(loads_[x]<=10 || loads_[x]>20){
					var div = ',';
					if(newcookie==''){var div=''}
						newcookie=newcookie+div+loads_[x];
					}
					}
					//alert(newcookie);
					$.cookie("EZMAPCITYPLACES_day"+n,newcookie);
					updateMapCityCookie();
					//placesdeleted2.push(num);
if(_loads && _loads!=''){
var _loads_= _loads.split(',')
var newcookie=''
					for(y=0;y<=(_loads_.length-1);y++){
					if(_loads_[y]<=10 || _loads_[y]>20){
					var div = ',';
					if(newcookie==''){var div=''}
						newcookie=newcookie+div+_loads_[y];
					}
					}
					$.cookie("EZMAPCITYPLACES2_day"+n,newcookie);
}

}
		}
	}
else{
var loads = $.cookie("EZMAPCITYPLACES_day1");
var _loads = $.cookie("EZMAPCITYPLACES2_day1");
if(loads && loads!=''){
var loads_= loads.split(',')
var newcookie=''
					for(x=0;x<=(loads_.length-1);x++){
					if(loads_[x]<=10 || loads_[x]>20){
					var div = ',';
					if(newcookie==''){var div=''}
						newcookie=newcookie+div+loads_[x];
					}
					}
					//alert(newcookie);
					$.cookie("EZMAPCITYPLACES_day1",newcookie);
					updateMapCityCookie();
					//placesdeleted2.push(num);
if(_loads && _loads!=''){
var _loads_= _loads.split(',')
var newcookie=''
					for(y=0;y<=(_loads_.length-1);y++){
					if(_loads_[y]<=10 || _loads_[y]>20){
					var div = ',';
					if(newcookie==''){var div=''}
						newcookie=newcookie+div+_loads_[y];
					}
					}
					$.cookie("EZMAPCITYPLACES2_day1",newcookie);
}
}
	}
}
function createpersonalroutespolylines(color,coors_,deonde,name,num,icono){
      var prlocations=[];
	  var pr_latlngs = new google.maps.MVCArray();
	  var Polyline_pr = new google.maps.Polyline({
        path: pr_latlngs
        , map: mapcitypopup.mapconfig.google.map
        , strokeColor: color
        , strokeWeight: 7
        , strokeOpacity: 0.5
    });
Polyline_pr.prname=name;
Polyline_pr.prnum=num;
Polyline_pr.prcolor=color;
var _coors_=coors_.split('*');
var lolo=_coors_[0].replace('(','').replace(')','').split(',');
var lat_=lolo[0];
var lng_=lolo[1];
var markador1coors = new google.maps.LatLng(parseFloat(lat_),parseFloat(lng_));
var markador1name = name;
placeMarker_proute(markador1coors, markador1name,num,deonde,icono);
for(c=0;c<_coors_.length;c++){
var coors=_coors_[c].replace('(','').replace(')','').split(',');
var lat_=coors[0];
var lng_=coors[1];
var loca = new google.maps.LatLng(parseFloat(lat_),parseFloat(lng_));
prlocations.push(loca);
Polyline_pr.setPath(prlocations);
}
			google.maps.event.addListener(Polyline_pr, 'click', function() {
				showprdata(num,Polyline_pr.prname);
			});
return Polyline_pr;
}
function map_pr(array,deonde){
personalroutespolylines=[];
for(x=0;x<array.length;x++){
	var name=array[x][0];
	var coors=array[x][1];
	var route=array[x][2];
	var color=array[x][3];
	var icono=array[x][4];
polyline=createpersonalroutespolylines(color,coors,deonde,name,route,icono);
personalroutespolylines.push(polyline);
}
}
function edit_pr(num){	
	var $popup=$('#drawroutes');
	$popup.panel();
	$popup.show();
	$popup.panel("open");
	if(!sessionStorage.getItem('drawroutes'+city_id_var)){
		$('#drawroutes .box-body').showLoading("Please Wait,<br/>Loading...<br/>",false);
		var mc=mapcitypopup.mapconfig.google.map.getCenter().toString();
		var _url = URLFINAL+"mobile/appdata/data_ajax/mapcity_content2.cfm?"+randomNumberUrl()+"";
		var _urlconfig = {action:'Drawroutes',center:mc,num:num,city:city_id_var};
		$('#drawroutes .box-body').load(_url,_urlconfig,function (response, status, xhr){
			switch (status){case "error":$('#drawroutes .box-body').empty();
			break;
			case "success": 
			console.log("Creating draws cache");
			sessionStorage.setItem('drawroutes'+city_id_var,response);
			pproutecontent();
			}
		});
	}else{
		$('#drawroutes .box-body').html(sessionStorage.getItem('drawroutes'+city_id_var));
		pproutecontent();
	}
	//$('body').append('<div id="mask" class="mask"></div>');
	//$('#mask').fadeIn(0);
	//$popup.fadeIn(300);
	//document.getElementById('drawroutes').style.width='600px';
	
}
function pproutecontent(){
	closesubroutedata();
	var rcontent = '<div style="max-height:350px; overflow:auto; padding: 5px 5px 5px 5px;max-width: 670px;width:95%;border: solid thin #ddd;margin:5px;"><table id="rcontent"><tbody></tbody></table></div>'
	$('#transport_descs').append(rcontent);
	for(c=0;c<=9;c++){
		if(markersarray[c].length > 0){
			console.log("hay "+c+1+" rutas "+polylinesarray[c].rname)
			var ritem = '<tr><td style="width:40px;text-align:center;"><img src="https://lh3.googleusercontent.com/-CIesigaJbDc/U5jiLlMUeII/AAAAAAANfIw/BEcEm_XJey4/s65/Untitled56.png" height="35px"></td><td>'+polylinesarray[c].rname+'</td></tr>'
			$('#rcontent').append(ritem);
		}
	}
}
function helpdeproutes(){
	//$('#drawroutes').fadeOut(0);
	isfromprutasview=true;
////			e.stopPropagation();e.preventDefault();
	$('#myeztravel-faq').showLoading("Please Wait,<br/>Retriving Topics...<br/>",false);
	$('body').append('<div id="mask-faq" class="mask-faq"></div>');
	$('#mask-faq').fadeIn(0);
	var _url = "http://myezplan.com/mobile/appdata/data_ajax/faq_ajax_content.cfm?page=personalruotes";
	var _urlconfig = {action:'Faq_index'};
	$('#myeztravel-faq').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){
		case "error":
			$('#myeztravel-faq').empty();alert("We are sorry, There aren't any help files in this page");
			$('#mask-faq').fadeOut(0);
			break;
			case "success":
		      //$('#mask-faq').fadeIn(0);
		//		var popZindez = (parseInt(popup.css("z-index"))) + 5;
			$('#myeztravel-faq').css({ 
				//'margin-top' : -popMargTop,
				//'margin-left' : -popMargLeft,
				'z-index' : 1750
			});
			$('#myeztravel-faq').fadeIn(0);
		}
	});
	return false;
		//$('#roadmapplace-boxmedia_r').fadeIn(1000);
}
	function helpderoutes(){
	//$('#roadmapplace-boxmedia_r').fadeOut(0);
		isfromrutasview=true;
		//e.stopPropagation();e.preventDefault();
		$('#myeztravel-faq').showLoading("Please Wait,<br/>Retriving Topics...<br/>",false);
		$('body').append('<div id="mask-faq" class="mask-faq"></div>');
		var _url = "http://myezplan.com/mobile/appdata/data_ajax/faq_ajax_content.cfm?page=ruotespopup";
		var _urlconfig = {action:'Faq_index'};
		$('#myeztravel-faq').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){
		case "error":
		$('#myeztravel-faq').empty();alert("We are sorry, There aren't any help files in this page");
		break;
		case "success":
		$('#mask-faq').fadeIn(0);
//		var popZindez = (parseInt(popup.css("z-index"))) + 5;
			$('#myeztravel-faq').css({ 
				//'margin-top' : -popMargTop,
				//'margin-left' : -popMargLeft,
				'z-index' : 1750
			});
		$('#myeztravel-faq').fadeIn(0);
			}
			});
			return false;
		//$('#roadmapplace-boxmedia_r').fadeIn(1000);
		}
function drawplacessubroutes(){
var cook=$.cookie("EZRUTASPLACES");
if(cook && cook!=''){
		var _url = "http://myezplan.com/mobile/appdata/data_ajax/mapcity_content.cfm";
		var _urlconfig = {action:'tarersubrutas',stopids:cook};
	$('#funcionesparaeliminarsubrutas').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){
		case "error":
		$('#funcionesparaeliminarsubrutas').empty();
		break;
		}	
	});
}
}
function deleterouteandstops(rid){
closesubroutedata();
deletesubroutefrompopup(rid,0,0,1);
		var _url = "http://myezplan.com/mobile/appdata/data_ajax/mapcity_content.cfm";
		var _urlconfig = {action:'eliminatesubroutes',rid:rid};
	$('#funcionesparaeliminarsubrutas').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){
		case "error":
		$('#funcionesparaeliminarsubrutas').empty();
		break;
		}
	});

}
function delsoubroutestop(placeid){
					var loads = $.cookie("EZMAPCITYPLACES");
					//if(loads==null){loads='';}
					var loads_= loads.split(',')
					var newcookie=''
					for(x=0;x<=(loads_.length-1);x++){
					if(loads_[x]!=placeid){
					var div = ',';
					if(newcookie==''){var div=''}
					newcookie=newcookie+div+loads_[x];
					}
					}
					$.cookie("EZMAPCITYPLACES",newcookie);
					placesdeleted.push(placeid);
					var newdeleted='';
						for(y=0;y<=(placesadded.length-1);y++){
						if(placesadded[y]!=placeid){
						var div=',';
						if(newdeleted==''){var div='';}
						var newdeleted=newdeleted+div+placesadded[y];
						}
						}
					placesadded=newdeleted.split(',');				
					//alert('added '+newdeleted+' del'+placesdeleted.join(','));
				updateMapCityCookie();
}
function addsoubroutestop(placeid){
	var loads = $.cookie("EZMAPCITYPLACES");
	var esta=0;
	if(loads && loads!=''){
		var coo=loads.split(',');
		for(c=0;c<coo.length;c++){
			if(coo[c]==placeid){var esta=1;}
		}
	}
if(esta==0){
					var loads = $.cookie("EZMAPCITYPLACES");
					if(!loads || loads==''){loads='';}
					var div = '';
					if(loads!=''){var div=','}
					var loads=loads+div+placeid;
					$.cookie("EZMAPCITYPLACES",loads);
					updateMapCityCookie();
					placesadded.push(placeid);
					var newdeleted='';
						for(y=0;y<=(placesdeleted.length-1);y++){
						if(placesdeleted[y]!=placeid){
						var div=',';
						if(newdeleted==''){var div='';}
						var newdeleted=newdeleted+div+placesdeleted[y];
						}
						}
					placesdeleted=newdeleted.split(',');
$('#place_'+placeid).attr('checked',true);
}
}
function closesubroutedata(){
if(typeof(stopsinview)=='undefined'){stopsinview=[];}
for(x=0;x<stopsinview.length;x++){
stopsinview[x].setMap(null);
}
$('#transport_descs').html('');
shpersonal_r=0;
}
function showsubroutedata(rid){
closesubroutedata();
if(shpoly){showhidepolygons();}
if(shtrans){showhidetransports();}	
if(shservices){showhideservices();}
if(shpersonal){showhidepersonalplaces();}
if(shideas){showhideideasroutes();}
//$('#transport_descs').showLoading("Please Wait,<br/>Retriving Topics...<br/>",false);
		var _url = "http://myezplan.com/mobile/appdata/data_ajax/mapcity_content.cfm";
		var _urlconfig = {action:'subroutedetails',rid:rid};
	$('#transport_descs').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){
		case "error":
		$('#transport_descs').empty();alert("We are sorry, There is a problem loading his route's data");
		break;
		}
	});

}
function deletesubroutefrompopup(rutaid,stopid,placeid,cual){
//if(placeid!==0){delsoubroutestop(placeid);}
if(cual==1){
var index=-1;
for(x=0;x<subroutesarray.length;x++){
if(subroutesarray[x].rid==rutaid){
	subroutesarray[x].setMap(null);
	var index=x;
	for(x2=0;x2<subroutesarray[x].subs.length;x2++){
		subroutesarray[x].subs[x2].setMap(null);
		}
	}
}
if (index!=-1){subroutesarray.splice(index,1);}
}
}
function addsubroutefrompopup(rutaid,stopid,locationsarray,linecolor,placeid,subs,mp_placeid){
		var _checkmix = $('#tabsx_checkboxmix2');
		var _pid=_checkmix.val();
		if(!_pid || typeof(_pid)=='undefined' || parseFloat(_pid)!=parseFloat(mp_placeid)){
		var _checkmix = $('#tabsx_checkboxmix');
		var _pid=_checkmix.val();		
		}
		if(!_checkmix.is(":checked")){$(_checkmix).trigger('click');}
//if(placeid!=0){addsoubroutestop(placeid);}

      var sr_latlngs = new google.maps.MVCArray();
	  var sr_polyline = new google.maps.Polyline({
        path: sr_latlngs
        , map: mapcitypopup.mapconfig.google.map
        , strokeColor: linecolor
        , strokeWeight: 7
        , strokeOpacity: 0.5
    });
sr_polyline.rid=rutaid;
sr_polyline.pid=mp_placeid;
			google.maps.event.addListener(sr_polyline, 'click', function() {
				showsubroutedata(rutaid);
			});
if(typeof(subroutesarray)=='undefined'){subroutesarray=[];}
sr_polyline.subs=[];
subroutesarray.push(sr_polyline);
for(x=0;x<locationsarray.length;x++){
var coors=locationsarray[x].toString().replace('(','').replace(')','').split(',');
var latr=coors[0];
var lngr=coors[1];
//alert(latr);
var loca = new google.maps.LatLng(parseFloat(latr),parseFloat(lngr));
sr_polyline.getPath().push(loca);
	}
if(subs != ''){
var subs_=subs.split('!');
for(s=0;s<subs_.length;s++){
      var ssr_latlngs = new google.maps.MVCArray();
	  var ssr_polyline = new google.maps.Polyline({
        path: ssr_latlngs
        , map: mapcitypopup.mapconfig.google.map
        , strokeColor: linecolor
        , strokeWeight: 7
        , strokeOpacity: 0.5
    });
sr_polyline.subs.push(ssr_polyline);
			google.maps.event.addListener(ssr_polyline, 'click', function() {
				showsubroutedata(rutaid);
			});
	var subs2_=subs_[s].split('*')
	for(s2=0;s2<subs2_.length;s2++){
	var coors=subs2_[s2].toString().replace('(','').replace(')','').split(',');
	var latr=coors[0];
	var lngr=coors[1];
	var loca = new google.maps.LatLng(parseFloat(latr),parseFloat(lngr));	
	ssr_polyline.getPath().push(loca);
		}
	}
}
}
function closesearch(){
	$('#closeplacesearch').html('');
	setTimeout("mapcitypopup.showPlaces()", 250);
	document.getElementById('searchplaces_').value='';
}
function select_likeplace_area(id,plan){
var che = document.getElementById('_che_'+id).checked;
if(che){
	document.getElementById('plan_'+plan).checked= false;$('#plan_'+plan).trigger('click');
var existe =document.getElementById('place_'+id);
if(existe){document.getElementById('place_'+id).checked= true;}
					var loads = $.cookie("EZMAPCITYPLACES");
					if(!loads || loads==''){loads='';}
					var div = '';
					if(loads!=''){var div=','}
					var loads=loads+div+id;
					$.cookie("EZMAPCITYPLACES",loads);
					updateMapCityCookie();
					placesadded.push(id);
					var newdeleted='';
						for(y=0;y<=(placesdeleted.length-1);y++){
						if(placesdeleted[y]!=id){
						var div=',';
						if(newdeleted==''){var div='';}
						var newdeleted=newdeleted+div+placesdeleted[y];
						}
						}
					placesdeleted=newdeleted.split(',');
	}
else{
var existe =document.getElementById('place_'+id);
if(existe){document.getElementById('place_'+id).checked= false;}
	//document.getElementById('plan_'+plan).checked= true;$('#plan_'+plan).trigger('click');
					var loads = $.cookie("EZMAPCITYPLACES");
					//if(loads==null){loads='';}
					var loads_= loads.split(',')
					var newcookie=''
					for(x=0;x<=(loads_.length-1);x++){
					if(loads_[x]!=id){
					var div = ',';
					if(newcookie==''){var div=''}
					newcookie=newcookie+div+loads_[x];
					}
					}
					$.cookie("EZMAPCITYPLACES",newcookie);
					placesdeleted.push(id);
					var newdeleted='';
						for(y=0;y<=(placesadded.length-1);y++){
						if(placesadded[y]!=id){
						var div=',';
						if(newdeleted==''){var div='';}
						var newdeleted=newdeleted+div+placesadded[y];
						}
						}
					placesadded=newdeleted.split(',');				
					//alert('added '+newdeleted+' del'+placesdeleted.join(','));
				updateMapCityCookie();
	}
}
function searchlikeplacename(){
var likeplace=document.getElementById('searchareabyplacename').value;
if(likeplace==''){alert('Nothing to search');return false;}
	$('#searchbyplacename_result').showLoading("Please Wait,<br/>Loading...<br/>",false);
	var _url = "http://myezplan.com/mobile/appdata/data_ajax/mapcity_content.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'likeplace',likeplace:likeplace,cityid:mapcitypopup.cityid};
	$('#searchbyplacename_result').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$('#searchbyplacename_result').html('No results for your search');
		break;
		}
	});
}
//$(window).scroll(function() { check_image_load();check_plandiv_load(); });
function check_plandiv_load(){
    $('.pla_class').each(function(e) { 
	if($(this).attr('data-plan')!=0){
        if (is_in_view($(this))){
			$('.tr_pla_'+$(this).attr('data-plan')).show();
			$('.tr_pla_'+$(this).attr('data-plan')).each(function(e) {
				//bringplacedata2($(this).attr('data-pid'),$(this));
            });
			//$(this).attr('data-plan',0);
		}
		else{
			$('.tr_pla_'+$(this).attr('data-plan')).hide();
		}
	}
    });
	
//	$('.tr_place').each(function(e) {
////      $.each(mapcitypopup.markers,function(index,value){
////		  if (is_in_view($(this))){
////			  if(mapcitypopup.markers[index].mk_id==$(this).attr('data-pid')){
////				  var _marker=mapcitypopup.markers[index]
////				  alert(_marker.queryed);
////			  }
////		  }
////	  });
//	    
//    });
}
function check_plandiv_load2(){
    $('.pla_class').each(function(e) { 
	if($(this).attr('data-plan')!=0){
		console.log($(this).attr('data-plan'));
        if (is_in_view($(this))){
			$('.tr_pla_'+$(this).attr('data-plan')).show();
			$('.tr_pla_'+$(this).attr('data-plan')).each(function(e) {
				//console.log($('.tr_pla_'+$(this).attr('data-plan')));
				//bringplacedata2($(this).attr('data-pid'),$(this));
				var iduniq = $(this).attr('data-iduniq');
				var imgurl = $(this).attr('data-orgimg');
				var imgdiv = $('#'+iduniq+'newimg img');
				//imgdiv.hide();
				$('#body_col4_canvas #'+iduniq+'newimg').html('<img id="plimg'+iduniq+'" src="'+imgurl+'"/>').hide().fadeIn(1000);
				console.log(iduniq+' '+imgurl );
				var raitng_data = $(this).attr('data-rating');
				var rating='';
				var divrating = $('#'+iduniq+'newrating');
				if(raitng_data!=''){
					var rating_=raitng_data.split('*');
					var tot=rating_[1];
					if(tot<=0){var rating='<img src="https://lh4.googleusercontent.com/-TLwXMNb8CNs/U1XRW4MTRdI/AAAAAAANdbM/s6JUnAie7lE/s149/0.png?gl=GB">';}
					if(tot>0 && tot<1){var rating='<img data-real-type="image" src="https://lh4.googleusercontent.com/-TLwXMNb8CNs/U1XRW4MTRdI/AAAAAAANdbM/s6JUnAie7lE/s149/0.png?gl=GB" data-real-src="https://lh5.googleusercontent.com/-GfdcKY-LHBE/U1XRWhXRRII/AAAAAAANdbI/Ce_XJwWJ2Og/s149/0.5.png?gl=GB" />';}
					if(tot>=1 && tot<1.5){var rating='<img data-real-type="image" src="https://lh4.googleusercontent.com/-TLwXMNb8CNs/U1XRW4MTRdI/AAAAAAANdbM/s6JUnAie7lE/s149/0.png?gl=GB" data-real-src="https://lh6.googleusercontent.com/-ANHA0UKAE7w/U1XRXKeQd8I/AAAAAAANdbc/KassLOg2RzE/s149/1.png?gl=GB">';}
					if(tot>=1.5 && tot<2){var rating='<img data-real-type="image" src="https://lh4.googleusercontent.com/-TLwXMNb8CNs/U1XRW4MTRdI/AAAAAAANdbM/s6JUnAie7lE/s149/0.png?gl=GB" data-real-src="https://lh6.googleusercontent.com/-I3wkJZS3zmg/U1XRWnxKLgI/AAAAAAANdbQ/foq03cGWRnE/s149/1.5.png?gl=GB">';}
					if(tot>=2 && tot<2.5){var rating='<img data-real-type="image" src="https://lh4.googleusercontent.com/-TLwXMNb8CNs/U1XRW4MTRdI/AAAAAAANdbM/s6JUnAie7lE/s149/0.png?gl=GB" data-real-src="https://lh6.googleusercontent.com/-ugxVqZR1pE4/U1XRX5Rhp1I/AAAAAAANdbg/7In2wUxiptg/s149/2.png?gl=GB">';}
					if(tot>=2.5 && tot<3){var rating='<img data-real-type="image" src="https://lh4.googleusercontent.com/-TLwXMNb8CNs/U1XRW4MTRdI/AAAAAAANdbM/s6JUnAie7lE/s149/0.png?gl=GB" data-real-src="https://lh4.googleusercontent.com/-zcIvmrsZiQQ/U1XRX-sfd5I/AAAAAAANdbw/SgyRReCah5c/s149/2.5.png?gl=GB">';}
					if(tot>=3 && tot<3.5){var rating='<img data-real-type="image" src="https://lh4.googleusercontent.com/-TLwXMNb8CNs/U1XRW4MTRdI/AAAAAAANdbM/s6JUnAie7lE/s149/0.png?gl=GB" data-real-src="https://lh5.googleusercontent.com/-OeqG3M4pQaE/U1XRYZ5mUTI/AAAAAAANdb4/yl4qWcGhGmI/s149/3.png?gl=GB">';}
					if(tot>=3.5 && tot<4){var rating='<img data-real-type="image" src="https://lh4.googleusercontent.com/-TLwXMNb8CNs/U1XRW4MTRdI/AAAAAAANdbM/s6JUnAie7lE/s149/0.png?gl=GB" data-real-src="https://lh4.googleusercontent.com/-hu7jm-6ScSE/U1XRYUQZCuI/AAAAAAANdb0/6BGICInShXA/s149/3.5.png?gl=GB">';}
					if(tot>=4 && tot<4.5){var rating='<img data-real-type="image" src="https://lh4.googleusercontent.com/-TLwXMNb8CNs/U1XRW4MTRdI/AAAAAAANdbM/s6JUnAie7lE/s149/0.png?gl=GB" data-real-src="https://lh4.googleusercontent.com/-Ra4lBYxKf1Y/U1XRZRMF1JI/AAAAAAANdcM/HogqnEBdIuo/s149/4.png?gl=GB">';}
					if(tot>=4.5 && tot<5){var rating='<img data-real-type="image" src="https://lh4.googleusercontent.com/-TLwXMNb8CNs/U1XRW4MTRdI/AAAAAAANdbM/s6JUnAie7lE/s149/0.png?gl=GB" data-real-src="https://lh6.googleusercontent.com/-SV1R2yH6iic/U1XRY7cdW8I/AAAAAAANdcI/IAvEVm13H-c/s149/4.5.png?gl=GB">';}
					if(tot>=5){var rating='<img data-real-type="image" src="https://lh4.googleusercontent.com/-TLwXMNb8CNs/U1XRW4MTRdI/AAAAAAANdbM/s6JUnAie7lE/s149/0.png?gl=GB" data-real-src="https://lh5.googleusercontent.com/-cK7qK9FdSPQ/U1XRZcm2h0I/AAAAAAANdcQ/WEe93TcJllA/s149/5.png?gl=GB">';}
				}
				var _rating_='<h4>'+rating+'</h4>';
				divrating.empty();
				divrating.html(rating);
				//_marker.rating__=_rating_;
            });
			$(this).attr('data-plan',0);
		}
		else{
			$('.tr_pla_'+$(this).attr('data-plan')).hide();
		}
	}
    });
}
function check_image_load() {  //alert('lolo');
	$('[data-image]').each(function(e) { 
        if (is_in_view($(this))){
			$(this).append('<img src="'+$(this).attr('data-image')+'" width="'+$(this).attr('data-imagew')+'" height="'+$(this).attr('data-imageh')+'" />').removeAttr('data-image').hide().fadeIn(1000);
        }  

    });  

    $('[data-real-src]').each(function(e) { 
        if (is_in_view($(this))){
			if($(this).attr('data-real-type')=="image"){
			   $(this).attr('src',$(this).attr('data-real-src')).removeAttr('data-real-src').hide().fadeIn(1000);
			}
      }  

    });  
} 
new_country_city= function(action){
	var $popup=$('#new_plan');
	$popup.panel();
	$popup.show();
	$popup.panel("open");
	if(!sessionStorage.getItem('newcity')){
		$popup.showLoading("Please Wait,<br/>Loading...<br/>",false);
		var _url = "http://myezplan.com/mobile/appdata/data_ajax/mapcity_content.cfm?"+randomNumberUrl()+"";
		var _urlconfig = {action:'New_Plan',parametro:'nonew'};
		$.ajax({
			type: "POST",
			url: _url,
			async:true, 
			cache:true,
			data: _urlconfig,
			error: function(xhr, ajaxOptions, thrownError){
				$('#new_plan').empty();
			},
			success: function(data){
				sessionStorage.setItem('newcity', data);
				$("#new_plan").html(data);
				if (action && action == "new"){
					document.getElementById('chenew').checked = true;
				}
				$("#btn-signfirst").hide();
			}
		});		
	}else{
		//$("#new_plan").html(sessionStorage.getItem('newcity'));
		$("#btn-signfirst").hide();
		if (action && action == "new"){
			document.getElementById('chenew').checked = true;
		}
	}
	/*$('#new_plan').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$('#new_plan').empty();
		break;
		}
	});*/
		/*$('body').append('<div id="mask" class="mask"></div>');
		$('#mask').fadeIn(300);
		$popup.fadeIn(300);*/
			//window.location = "mapcitypopup.cfm?ctid=5&plid=5";//window.location.reload();
}
function is_in_view(elem) {  
    var docViewTop = $(window).scrollTop();  
    var docViewBottom = docViewTop + $(window).height();  
    var elemTop = $(elem).offset().top;  
    var elemBottom = elemTop + $(elem).height();  
    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)); 
}
$(document).ready(function(e) {
	mapcitypopup.markers=[];
	mapcitypopup.Close_MyItinerariesView=function(){
		$('#mask_myitis').fadeOut(0);
		$('#mask_myitis').empty();
//		$('body').remove()
		$('#mask_myitis').remove();
		mapcitypopup.showSelPlaces2();
	}
	mapcitypopup.MyItinerariesView=function(){		
		if (sessionStorage.cf_sid == undefined){
		//if(cf_sid==""){
			pedir_sesion(1,"mapcitypopup.MyItinerariesView()");
			return false;
		}
		$("#tripedit-name").hide();
		$("#myitin-panel").show();
		$("#itemp-editdate").hide();		
		$("#myitibutt #body_col5").show();
		$("#myitin-panel").panel("open");
		var iti_id=$.cookie("MYITINERARYID");
		if(!iti_id || iti_id == ''){var iti_id =0;}
		$('#myitin-panel .box-header').hide();
		$('#myitin-panel .ui-panel-inner > h1').hide();
		$('#myitin-panel #body_col5 #myitinerary').html('<div id="mask_myitis" class="mask-itiview" align="center"><div style="/*background-color: white;width:95%;max-width:700px;margin-top:50px;-webkit-box-shadow: 0px 0px 15px 4px #eee;-webkit-border-radius: 16px 16px 16px 16px;"><img style="float:left; padding-right:10px;" height="35px" src="https://lh5.googleusercontent.com/-Cb5dhSGmMSA/U5I5STA1muI/AAAAAAANfGk/1rOXlx8756Q/s52/Untitled8.png" onclick="mapcitypopup.Close_MyItinerariesView();"><img style="float:right;" id="buttonGetUserItineraries" width="35px" src="https://lh3.googleusercontent.com/-ixRxcyVxUL8/VOkdKcYo8BI/AAAAAAANhJQ/fjpQQeza4qY/s45/Trips%2520desactivado.png" onclick="viewlist();"><h1 style="text-align:center;*/"><span class="capitalize_red">M</span>y Trips</h1><div id="myitis-content"></div></div></div>');
		$('#mask_myitis').fadeIn(0);
		var _url = "http://myezplan.com/mobile/appdata/data_ajax/mapcity_content.cfm";
		var _urlconfig = {action:'viewuseritineraries',thisiti:iti_id,user:sessionStorage.cf_sid};
		$('#myitis-content').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){
			case "error":
			mapcitypopup.Close_MyItinerariesView();
			break;
			}
		});
		$("#buttonGetUserItineraries").hide();
	}
	MyItinerariesViewT = function(){
		$("#body_col5").show();
		mapcitypopup.showSelPlaces2();
	}
//	mapcitypopup.save={};
//	mapcitypopup.save.$message=$("#messageerror-saveplan");
//	mapcitypopup.save.$popup=$("#saveplan-box");
	mapcitypopup.mapShareInit=function(){
		var iti_id=$.cookie("MYITINERARYID");
		var iti_name=$.cookie("MYITINERARYNAME");
		if(!iti_id || iti_id==''){
			var _confirm=window.confirm("If you do not save your itinerary, it will be available only for six months");
			if(_confirm){
				mapcitypopup.mapSaveAjax_temp('s');
				return true;
			}
			else{return false;}
		}
		else{
			if(sessionStorage.cf_sid!=undefined){
				mapcitypopup.mapSaveAjax("up",iti_id,iti_name,'share');
				//mapcitypopup.ShareItinerary(iti_id);
			}
			else{
				mapcitypopup.mapSaveAjax("up_t",iti_id,iti_name,'share');
				//mapcitypopup.ShareItinerary(iti_id);
			}
		}		
	}
	mapcitypopup.mapPrintInit=function(){
		var iti_id=$.cookie("MYITINERARYID");
		var iti_name=$.cookie("MYITINERARYNAME");
		if(!iti_id || iti_id==''){
			var _confirm=window.confirm("If you do not save your itinerary, it will be aviable only for six months");
			if(_confirm){
				mapcitypopup.mapSaveAjax_temp('p');
				return true;
			}
			else{return false;}
		}
		else{
			if(sessionStorage.cf_sid!=undefined){
				mapcitypopup.mapSaveAjax("up",iti_id,iti_name,'print');
//				mapcitypopup.PrintItinerary(iti_id);
			}
			else{
				mapcitypopup.mapSaveAjax("up_t",iti_id,iti_name,'print');
//				mapcitypopup.PrintItinerary(iti_id);
			}
		}
	}
	mapcitypopup.mapPrintInit_d=function(){
		var iti_id=$.cookie("MYITINERARYID");
		var iti_name=$.cookie("MYITINERARYNAME");
		if(!iti_id || iti_id==''){
			var _confirm=window.confirm("If you do not save your itinerary, it will be aviable only for six months");
			if(_confirm){
				mapcitypopup.mapSaveAjax_temp('pd');
				return true;
			}
			else{return false;}
		}
		else{
			if(sessionStorage.cf_sid!=undefined){
				mapcitypopup.mapSaveAjax("up",iti_id,iti_name,'printd');
//				mapcitypopup.PrintItinerary_day(iti_id,daytoprint);
			}
			else{
				mapcitypopup.mapSaveAjax("up_t",iti_id,iti_name,'printd');
//				mapcitypopup.PrintItinerary_day(iti_id,daytoprint);
			}
		}
	}
	mapcitypopup.mapSaveInit=function(){
		if(sessionStorage.cf_sid==undefined){
			pedir_sesion(1,"mapcitypopup.mapSaveInit()");
			return false;
		}
		var iti_id=$.cookie("MYITINERARYID");
		var iti_name=$.cookie("MYITINERARYNAME");
		if(iti_id && iti_id!=''){
		var _confirm=window.confirm("Do you want to replace your current Plan?");
		if(_confirm){
			var iti_id=$.cookie("MYITINERARYID");
			var iti_name=$.cookie("MYITINERARYNAME");
			mapcitypopup.mapSaveAjax("up",iti_id,iti_name);
			return true;
		}
//		else{
//			iti_id=0;
//		}
		}
		closePopup(0);
		mapcitypopup.save.$popup.panel();
		mapcitypopup.save.$popup.show();
		mapcitypopup.save.$popup.panel( 'open' );
		var popMargTop = (mapcitypopup.save.$popup.height() + 24) / 2; 
		var popMargLeft = (mapcitypopup.save.$popup.width() + 24) / 2; 
		//mapcity.save.$popup.css({'margin-left' : -popMargLeft});
		//$('body').append('<div id="mask" class="mask"></div>');
		//$('#mask').fadeIn(300);
		//$("#Datepicker_").datepicker();
			$.ajax({
				type: "POST",
				url: "http://myezplan.com/mobile/appdata/data_ajax/saveplans_itineraryajaxsearch.cfm",
				async:true, 
				cache:false,
				data: "action=searchitineraries&uid="+sessionStorage.cf_sid+'&itiid='+iti_id,
				success: function(datos){
					$("#search_itinerary").html(datos);
				}
			});	
		if(!iti_name || iti_name ==''){
			var fecha=$.cookie("EZDATE1");
			if(!fecha || fecha==''){var fecha='';}
			var iti_name='My Itinerary '+fecha;
		}
		document.getElementById('saveplan_name').value=iti_name;
		//mapcitypopup.save.$popup.$fname.focus();
		return true;
	}
mapcitypopup.mapSaveAjax=function(saveaction,iti_id,iti_name,param){
	var numdays_=$.cookie("NUMDAYS");
	var numdays=1
	if(numdays_ && numdays_!=''){var numdays=numdays_}
	var date1_=$.cookie("EZDATE1");
	var date2_=$.cookie("EZDATE2");
	var date1='';
	var date2='';
	if(date1_ && date1_!=''){var date1=date1_;}
	if(date2_ && date2_!=''){var date2=date2_;}
	var hayerror=0;
	if(saveaction=='up'){
		var usid=sessionStorage.cf_sid;
		var url='http://myezplan.com/mobile/appdata/data_ajax/map_usersplans_ajax.cfm'
		var encualva='';
	}
	if(saveaction=='up_t'){
		var usid=0;
		var url='http://myezplan.com/mobile/appdata/data_ajax/map_usersplans_ajax2.cfm'
		var encualva='&encualva=0';
	}
	var loadnotice = new PNotify({
		title: 'Myezplan Notice',
		text: 'Updating itinerary',
		styling: 'jqueryui',
		type: 'info',
		hide: false,
		delay:1000,icon: 'picon-load picon-32 picon-fill-color',
		mouse_reset: false, buttons: {
			closer: false,
			sticker: false
		}
	});
	var _data = "action=savemapcitypopupItinerary&saveaction="+saveaction+'&usid='+usid+"&upid="+iti_id+"&date1="+date1+"&date2="+date2+'&upinumdays='+numdays+'&upname='+iti_name+'&cityid='+city_id_var;
	$.ajax({
		type: "POST",
		url: url,
		async:true, 
		cache:false,
		data: _data,
		error:  function(xhr, ajaxOptions, thrownError){
			alert('error updating your itinerary, please try again'+thrownError);
			var hayerror=1;
		},
		success: function(response){
			var lolo=[];
			var cookiearray=armaarraydecookies(lolo);
			var cookienames=cookiearray[0];
			var cookiedata=cookiearray[1];
			varpaso=0;
			if(cookienames.length ==0){
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
					varpaso2=0;
					var _data_ = "action=savemapcitypopupItinerary&saveaction=insertdays&uid="+iti_id+"&numday="+x+'&places='+places+'&places2='+places2+'&subplaces='+subrutas+'&transports='+transports+'&trasportstops='+transportstops+'&services='+services+'&ruta='+ruta+'&fullorder='+fullorder+'&gotm='+gotm+encualva;
					$.ajax({
						type: "POST",
						url: url,
						async:true, 
						cache:false,
						data: _data_,
						error: function(xhr, ajaxOptions, thrownError){
							alert('error updating your itinerary, please try again'+thrownError);
							return false;
						},
						success: function(response){
							varpaso2=varpaso2+1;
							if(varpaso2==numdays){
								if(param=='share'){mapcitypopup.ShareItinerary(iti_id);}
								if(param=='print'){mapcitypopup.PrintItinerary(iti_id);}
								if(param=='printd'){mapcitypopup.PrintItinerary_day(iti_id,daytoprint);}
								if (loadnotice.remove) loadnotice.remove();
							}
						}
					});
				}
			}
			for(co=0;co<cookienames.length;co++){
				var data_ = "action=savemapcitypopupItinerary&saveaction=cookies_u&uid="+iti_id+"&cookname="+cookienames[co]+"&cookdata="+cookiedata[co]+'&encualva='+varpaso;
				$.ajax({
					type: "POST",
					url: url,
					async:true, 
					cache:false,
					data: data_,
					error: function(xhr, ajaxOptions, thrownError){
						alert('error updating your itinerary, please try again'+thrownError);
					}
					,success: function(response){
						varpaso=varpaso+1;
						if(varpaso==cookienames.length){
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
								varpaso2=0;
								var _data_ = "action=savemapcitypopupItinerary&saveaction=insertdays&uid="+iti_id+"&numday="+x+'&places='+places+'&places2='+places2+'&subplaces='+subrutas+'&transports='+transports+'&trasportstops='+transportstops+'&services='+services+'&ruta='+ruta+'&fullorder='+fullorder+'&gotm='+gotm+encualva;
								$.ajax({
									type: "POST",
									url: url,
									async:true, 
									cache:false,
									data: _data_,
									error: function(xhr, ajaxOptions, thrownError){
										alert('error updating your itinerary, please try again'+thrownError);
									},
									success: function(response){
										varpaso2=varpaso2+1;
										if(varpaso2==numdays){
											if(param=='share'){mapcitypopup.ShareItinerary(iti_id);}
											if(param=='print'){mapcitypopup.PrintItinerary(iti_id);}
											if(param=='printd'){mapcitypopup.PrintItinerary_day(iti_id,daytoprint);}
											//console.log("success");
											if (loadnotice.remove) loadnotice.remove();
											/*var notice = new PNotify({
												title: 'Myezplan Notice',
												text: 'Your itinerary has been updated',
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
											});	*/
											
										}
											
									}
								});
							}
						}
						
					}
				});
			}
		}
	});

}
	mapcitypopup.mapSaveAjax_temp=function(continueaction){
		var numdays_=$.cookie("NUMDAYS");
		var numdays=1
		if(numdays_ && numdays_!=''){var numdays=numdays_}
		var date1_=$.cookie("EZDATE1");
		var date2_=$.cookie("EZDATE2");
		var date1='';
		var date2='';
		if(date1_ && date1_!=''){var date1=date1_;}
		if(date2_ && date2_!=''){var date2=date2_;}
		var iti_name='My Itinerary '+date1;
		var shareit=1;
		var _data = "action=savemapcitypopupItinerary&saveaction=InsertTemp&usid=0&upname="+iti_name+"&date1="+date1+"&date2="+date2+"&upshareit="+shareit+'&upinumdays='+numdays+'&cityid='+city_id_var;
		$.ajax({
			type: "POST",
			url: "http://myezplan.com/mobile/appdata/data_ajax/map_usersplans_ajax2.cfm",
			async:true, 
			cache:false,
			data: _data,
			error: function(xhr, ajaxOptions, thrownError){
				alert('Error saving Itinerary, please try again '+thrownError);
			},
			success: function(response){
				$.cookie("MYITINERARYID",response);
				$.cookie("MYITINERARYNAME",iti_name);
				iti_id=response;
				var lolo=[];
				var cookiearray=armaarraydecookies(lolo);
				var cookienames=cookiearray[0];
				var cookiedata=cookiearray[1];
				if(cookienames.length==0){
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
						var _data_ = "action=savemapcitypopupItinerary&saveaction=insertdays&uid="+iti_id+"&numday="+x+'&places='+places+'&places2='+places2+'&subplaces='+subrutas+'&transports='+transports+'&trasportstops='+transportstops+'&services='+services+'&ruta='+ruta+'&fullorder='+fullorder+'&gotm='+gotm+'&encualva='+x;
						$.ajax({
							type: "POST",
							url: "http://myezplan.com/mobile/appdata/data_ajax/map_usersplans_ajax2.cfm",
							async:true, 
							cache:false,
							data: _data_,
							error: function(xhr, ajaxOptions, thrownError){
								alert('error updating your itinerary, please try again'+thrownError);
							},
							success: function(response){
								if(response==numdays){
									if(continueaction=='p'){mapcitypopup.PrintItinerary(iti_id);}
									if(continueaction=='s'){mapcitypopup.ShareItinerary(iti_id);}
									if(continueaction=='pd'){mapcitypopup.PrintItinerary_day(iti_id,daytoprint);}
								}
							}
						});
					}					
				}
				for(co=0;co<cookienames.length;co++){
					var data_ = "action=savemapcitypopupItinerary&saveaction=cookies&uid="+iti_id+"&cookname="+cookienames[co]+"&cookdata="+cookiedata[co]+'&encualva='+co;
					$.ajax({
						type: "POST",
						url: "http://myezplan.com/mobile/appdata/data_ajax/map_usersplans_ajax2.cfm",
						async:true, 
						cache:false,
						data: data_,
						error: function(xhr, ajaxOptions, thrownError){
							alert('error updating your itinerary, please try again'+thrownError);
						},
						success: function(response){
							if((cookienames.length-1)==response){
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
								var _data_ = "action=savemapcitypopupItinerary&saveaction=insertdays&uid="+iti_id+"&numday="+x+'&places='+places+'&places2='+places2+'&subplaces='+subrutas+'&transports='+transports+'&trasportstops='+transportstops+'&services='+services+'&ruta='+ruta+'&fullorder='+fullorder+'&gotm='+gotm+'&encualva='+x;
								$.ajax({
									type: "POST",
									url: "http://myezplan.com/mobile/appdata/data_ajax/map_usersplans_ajax2.cfm",
									async:true, 
									cache:false,
									data: _data_,
									error: function(xhr, ajaxOptions, thrownError){
										alert('error updating your itinerary, please try again'+thrownError);
									},
									success: function(response){
										if(response==numdays){
											if(continueaction=='p'){
												mapcitypopup.PrintItinerary(iti_id);
											}
											if(continueaction=='s'){
												mapcitypopup.ShareItinerary(iti_id);
											}
											if(continueaction=='pd'){
												mapcitypopup.PrintItinerary_day(iti_id,daytoprint);
											}
										}
									}
								});
							}
						}
						}
					});
				}
			}
		});

	}
	mapcitypopup.showCats=function(arg_mapconfig){
		arg_mapconfig=arg_mapconfig || mapcitypopup.mapconfig;
		$.each(arg_mapconfig.markers,function(index,value){
			var _categories=arg_mapconfig.markers[index].mk_category.category;
			
				if ((parseFloat(_categories[0]))>=0){
					_cat =parseFloat(_categories[0]);
					$('#div_'+_cat).hide();
					}
				if ((parseFloat(_categories[1]))>=0){
					_cat1 =parseFloat(_categories[1]);
					$('#div_'+_cat1).hide();
					}
				if ((parseFloat(_categories[2]))>=0){
					_cat2 =parseFloat(_categories[2]);
					$('#div_'+_cat2).hide();
				}
			});
		}
searchplacesbyname_ =function(arg_mapconfig){
	var likeplace=document.getElementById('searchplaces_').value;
	if(likeplace==''){alert('Nothing to search');return false;}
		arg_mapconfig=arg_mapconfig || mapcitypopup.mapconfig;
		var _divplace=$("#body_col4 #menu_place .table");
		_divplace.empty();
		$('#closeplacesearch').html('X');
		var _currentplan="";
		_countplans=0;
		hayalgo=false;
		$.each(arg_mapconfig.markers,function(index,value){
			arg_mapconfig.markers[index].setVisible(false);
			if(arg_mapconfig.markers[index].title.toUpperCase().indexOf(likeplace.toUpperCase())>=0){
			hayalgo=true;
			arg_mapconfig.markers[index].setVisible(true);	
			var _marker=arg_mapconfig.markers[index], _markerhtml="";
			var _markerplanname=_marker.mk_category.planname;
			
			var largonombre = _marker.title.length;
			//alert(largonombre);
			if (largonombre > 38){var titulomarkador=_marker.title.substr(0,35)+'...'}else{var titulomarkador=_marker.title}
			
			if(_markerplanname!=_currentplan){
				_countplans=_countplans+1;
				if(_countplans<1){check_plandiv_load();}
				_divplace.append('<tr class="pla_class" data-plan="'+_countplans+'"><th class="t0" colspan="3">'+_markerplanname+'<span>Category</span></th></tr>');
			}
			//_divplace.append('<tr class="tr_pla_'+_countplans+' tr_place" data-pid="'+_marker.mk_id+'"><td class="t4"><input type="checkbox" name="place" value="'+_marker.mk_id+'" id="place_'+_marker.mk_id+'" class="check_place squaredTwo squaredTwoGrande" /><label for="place_'+_marker.mk_id+'"></label></td><td class="placetooltip_old"  data-tipid="'+_marker.mk_category.idunico+'" data-tipicon="'+_marker.icon+'"><div><table onclick="window.top.showinfoplace(\''+_marker.mk_category.idunico+'\',\''+_marker.mk_id+'\', \'mapcitypopup\');" class="table show_load"><tr><td class="t3"><label onclick="window.top.showinfoplace(\''+_marker.mk_category.idunico+'\',\''+_marker.mk_id+'\', \'mapcitypopup\');" class="cursor label_check">'+titulomarkador+'<br><div id="'+_marker.mk_category.idunico+'newtype" ></div><div id="'+_marker.mk_category.idunico+'newrating"></div><td class="table_img"> <div id="'+_marker.mk_category.idunico+'newimg"><img src="/images/A.png"/></div></td></tr></table></tr>');
			_divplace.append('<tr class="tr_pla_'+_countplans+' tr_place" data-pid="'+_marker.mk_id+'" data-iduniq="'+_marker.mk_category.idunico+'" data-orgimg="'+_marker.mk_category.imgurl+'" data-rating="'+_marker.mk_category.rating+'"><td class="t4"><input type="checkbox" name="place" value="'+_marker.mk_id+'" id="place_'+_marker.mk_id+'" class="check_place squaredTwo squaredTwoGrande" /><label for="place_'+_marker.mk_id+'"></label></td><td class="placetooltip_old"  data-tipid="'+_marker.mk_category.idunico+'" data-tipicon="'+_marker.icon+'"><div><table onclick="window.top.showinfoplace(\''+_marker.mk_category.idunico+'\',\''+_marker.mk_id+'\', \'mapcitypopup\');" class="table show_load"><tr><td class="t3"><label onclick="window.top.showinfoplace(\''+_marker.mk_category.idunico+'\',\''+_marker.mk_id+'\', \'mapcitypopup\');" class="cursor label_check">'+titulomarkador+'<br><div id="'+_marker.mk_category.idunico+'newtype" ><h4>Type:'+_marker.mk_category.type+'</h4></div><div id="'+_marker.mk_category.idunico+'newrating"></div><td class="table_img"> <div id="'+_marker.mk_category.idunico+'newimg"><img src="https://lh3.googleusercontent.com/-8hkx9WPv230/VMk5SDBx1zI/AAAAAAANhCI/TJmlwVu6qSI/s138/Loading%25202.png"/></div></td></tr></table></tr>');
			if($.inArray(_marker.mk_id,global_MapCityCookie)>=0){
				$("#place_"+_marker.mk_id+"").attr("checked",true);
			}					
			
			_currentplan=_markerplanname;
			}
		});
		
	if(!hayalgo){_divplace.append('<div align="center" style="font-weight:bold;">No results for your search <span onclick="closesearch();" style="color:#c00000;cursor: pointer;">Back</span></div>');}
	else{arg_mapconfig.setCenterByBounds();}
	check_plandiv_load2();
	check_image_load();
//$('#body_search').show();
//$('#body_col4').hide();
//$('#places_legend').hide();
//document.getElementById('closeplacesearch').innerHTML='X';
//	$('#body_search').showLoading("Please Wait,<br/>Loading...<br/>",false);
//	var _url = "http://myezplan.com/mobile/appdata/data_ajax/mapcity_content.cfm?"+randomNumberUrl()+"";
//	var _urlconfig = {action:'likeplace2',likeplace:likeplace,cityid:mapcitypopup.cityid};
//	$('#body_search').load(_url,_urlconfig,function (response, status, xhr){
//		switch (status){case "error":$('#searchbyplacename_result').html('No results for your search <span onclick="closesearch();">Back</span>');
//		break;
//		}
//	});
}
	mapcitypopup.showSelPlaces=function(arg_mapconfig) {
		updateMapCityCookie();
		//PicksBounds=new google.maps.LatLngBounds();
		hayalgo=false;
		arg_mapconfig=arg_mapconfig || mapcitypopup.mapconfig;
		$.each(arg_mapconfig.markers,function(index,value){
			arg_mapconfig.markers[index].setVisible(false);
			if($.inArray(arg_mapconfig.markers[index].mk_id,global_MapCityCookie)>=0){
				arg_mapconfig.markers[index].setVisible(true);
				//PicksBounds.extend(arg_mapconfig.markers[index].getPosition());
				hayalgo=true;
			}
		});
		if(hayalgo){arg_mapconfig.setCenterByBounds();}
		else{
			alert('Please select places first');
			$('.Map_Picks').css("backgroundColor", "rgb(211, 211, 211)");
			showmappicks=false;
			mapcitypopup.showPlaces();
		}
	}
	selectAndall2=0;
	mapcitypopup.showSelPlaces2=function(arg_mapconfig) {
		var _panel = $("#myitin-panel");
		_panel.panel({close: function( event, ui){global_showbutton = false;}});
		_panel.show();
		//_panel.panel("open");
		$('#myitin-panel .box-header, #tripedit-name').show();
		$('#myitin-panel .ui-panel-inner > h1').show();
		$('#Calendario-mapcitypopup').hide();
		$('#myitibutt').show();
		$('#body_col5').show();
		$("#itemp-editdate").show();
		$("#nametochange-edit").val($.cookie("MYITINERARYNAME"))
		arg_mapconfig=arg_mapconfig || mapcitypopup.mapconfig;
		setTimeout(	"mapcitypopup.showSelPlaces2content()",20);
	}
	
	mapcitypopup.showSelPlaces2content=function(arg_mapconfig) {
		restimg_g='0';
		countrestimg_g=0;
	arg_mapconfig=arg_mapconfig || mapcitypopup.mapconfig;
	var selectedids=[];
	var numdays_=$.cookie("NUMDAYS");
	var numdays=1
	if(numdays_ && numdays_!=''){var numdays=numdays_}
	var date1_=$.cookie("EZDATE1");
	var date2_=$.cookie("EZDATE2");
	var date1='';
	var date2='';
	var hayfechas=0;
	if(date1_ && date1_!=''){
	    var fecha1 = new codefecha(date1_);   
	 	var miFecha1 = new Date( fecha1.anio, (fecha1.mes-1), fecha1.dia )  
		var date1=m_names_dates[miFecha1.getMonth()]+' '+miFecha1.getDate()+', '+miFecha1.getFullYear();
		var date_1 = $.datepicker.formatDate('m/d/y', new Date($.cookie("EZDATE1")))
		var hayfechas=1;  
	}
	if(date2_ && date2_!=''){
	    var fecha2 = new codefecha(date2_);   
	 	var miFecha2 = new Date( fecha2.anio, (fecha2.mes-1), fecha2.dia )  
		var date2=m_names_dates[miFecha2.getMonth()]+' '+miFecha2.getDate()+', '+miFecha2.getFullYear();
		var date_2 = $.datepicker.formatDate('m/d/y', new Date($.cookie("EZDATE2")))
	}
//	var _divplace=$("#body_col4 #menu_place .table");
//	_divplace.empty();
	var _diviti=$("#body_col5 #myitinerary");
	_diviti.empty();
	var itiname=$.cookie("MYITINERARYNAME");
	if(!itiname || itiname==''){var itiname='<span class="capitalize_red">M</span>y Itinerary';}
	//_diviti.append('<h1 style="text-align:center;">'+itiname+' <img src="https://lh3.googleusercontent.com/-FfGsgqD06X4/VEm0BLONY7I/AAAAAAANg7k/2JnRmAw-7_s/s55/183.png" style="height:35px;width:34px;" onclick="editItinerarydates();">'
	//_diviti.append('<span id="plus_funcs2" class="help_button help_button_text" name="myint_info" onclick="viewmorefuncs2();">[+]</span><span id="minus_funcs2" style="display:none;" class="help_button help_button_text" name="myint_info" onclick="viewminusfuncs2();">[-]</span></h1>');
	document.getElementById('divitiplusimg').src='https://lh6.googleusercontent.com/-44bFjug7xpE/U5I5oAOzU_I/AAAAAAANfHI/a1ItxGAYBN0/s50/Untitled35.png';
	_diviti.append('<div class="divitiplus" style="max-width:200px;;margin:5px auto;border: solid thin #ddd; display:none;border-radius: 3px;cursor: pointer;background-color:#FFFFFF;padding:5px;"; align="center"><a href="javascript:;" id="buttonAddDealItinerary" onclick="showmoredeals_mi();" class="" style="width:70px;text-decoration: none;color: white;"><img id="showdealsimg-edit" width="40px" src="https://lh3.googleusercontent.com/-QRQ-N37MOi0/VMj5gHyGIbI/AAAAAAANhAo/5gaaJc4NjLo/s46/Hot%2520deals%2520inactive.png"></a><a href="javascript:;" id="buttonTipItinerary" class="" style="width:50px;text-decoration: none;color: white;padding:0 5px;" onclick="showititips_mi();"><img id="showtipsimg-edit" width="40px" src="https://lh5.googleusercontent.com/-FZ1ifjEbMRc/VMj44h9yMeI/AAAAAAANhAU/ap68feoG1lE/s46/Tips%2520inactive.png"></a><a href="javascript:;" id="buttonAddUserPersonalPlan" class="" style="width:70px;text-decoration: none;color: white;" onclick="showmoreplans_mi(0);"><img id="showmimg-edit" width="40px" src="https://lh5.googleusercontent.com/-X49XNVWGXPc/VMj6lmpScrI/AAAAAAANhBA/gYLAyxdaVFQ/s45/pp%2520inactive.png"></a><a href="#" onclick="cleancurrentitin();"><img style="float:right; padding-right:10px;height: 40px;" src="https://lh4.googleusercontent.com/-J8QLIopkdW4/VOdmvVtfapI/AAAAAAANhJA/FcImfqWSudY/s46/basura3.png"></a></div><div id="diviti3" class="diviti2" style="border: solid thin #ddd; display: inline-block;border-radius: 3px;cursor: pointer;width: 99%;background-color:#FFFFFF"; align="center"></div>');
	_diviti.append('<div id="diviti2" class="diviti2"></div>');
	_diviti.append('<div id="diviti4" class="diviti4" style="text-align:center;"></div>');
	_diviti.append('<div id="divitifuncs"></div>');
	_diviti.append('<div id="right_bottom_steps" class="diviti2" align="center"><div style="" align="center"><table><tr><td><a href="#"><img style="width:40px" class="save-img" src="https://lh4.googleusercontent.com/--d97DtXuHZk/U5I5SehwbUI/AAAAAAANfGo/6Sqi4fkn0RQ/s52/Save.png" onclick="mapcitypopup.mapSaveInit();"></a></td><td><a href="#"><img style="width:40px" class="print-img" src="https://lh4.googleusercontent.com/-pdCGb8PAUew/U5I55FgKpxI/AAAAAAANfHY/tRdPDwqVg4w/s53/Untitled43.png" onclick="mapcitypopup.mapPrintInit();"></a></td><td><a href="#"><img style="width:40px" class="share-img" src="https://lh6.googleusercontent.com/-YcfKqCLU7Nw/U5I6DNcji0I/AAAAAAANfHo/SmO-8pcfoqc/s53/Untitled51.png" onclick="mapcitypopup.mapShareInit();"></a></td><td><a style="text-decoration:none;color:#fff;" href="#" id="button_steps-itinerary" class="" onclick="mapcitypopup.MyItinerariesView();"><img width="40" src="https://lh5.googleusercontent.com/-VaTf2efZMEU/VMj4MnXGAWI/AAAAAAANg_4/6qPylcJtnsU/s45/Trip%25202.png"></a></td></tr></table></div></div>');
	_diviti_t=$("#body_col5 #myitinerary #diviti3");
	if(hayfechas==0){
		var lolo='<table width="100%"><tr><th align="center" width="">Days/nights</th></tr>';
		var lolo=lolo+'<tr><td align="center">'+numdays+'/'+(numdays-1)+'</td></tr></table>';
	}
	else{
		var lolo='<table width="100%">';
		var lolo=lolo+'<tr><th align="center" width="30%">Start</th><th align="center" width="30%">End</th><th align="center" width="30%">Days/nights</th></tr>';
		var lolo=lolo+'<tr><td align="center">'+date_1+'</td>';
		var lolo=lolo+'<td align="center">'+date_2+'</td>';
		var lolo=lolo+'<td align="center">'+numdays+'/'+(numdays-1)+'</td></tr>';
		var lolo=lolo+'</table>';
	}
	_diviti_t.append(lolo);
	_diviti=$("#body_col5 #myitinerary #diviti2");
	var hayalgo=false;
	var itiordersarray=[];
	for(x=1;x<=numdays;x++){
		var hayalgo2=false;
		var newdate2	=	'';
		var newdate_2 	=	'';
		if(hayfechas!=0){
			var newdate = new Date(miFecha1);
			newdate.setDate(newdate.getDate() + (x-1));
			var newdate2=m_names_dates[newdate.getMonth()]+' '+newdate.getDate()+', '+newdate.getFullYear();
			var newdate_2 = ' - '+$.datepicker.formatDate('m/d/y', new Date(newdate))
		}
	var placesorder=$.cookie("EZ_P_O_day"+x);
	if(!placesorder || placesorder==''){var placesorder=1;}
	itiordersarray.push(placesorder);
	var itiid=$.cookie("MYITINERARYID");
	if(itiid && itiid !=''){
		var daynote=$.cookie("EZNOTE_day"+x);
		var clase='class="select_m"';
		if(!daynote || daynote==''){var daynote='Add a note';var clase='class="select_m watermark"'}
		var textnote='<input id="daynote_mi" type="text" onblur="addnotetoday_mi('+x+',this.value);" style="width:100%;margin:5px auto;" value="'+daynote+'" '+clase+'>';
	}
	else{var textnote='';}
		//_divplace.append('<tr><th class="t0" colspan="3">Day '+x+' of '+numdays+'  '+newdate+'</th></tr>'); <cfif get_daypp.upp_note eq ''>value="Add a Note" class="input text-notes watermark"<cfelse>value="#get_daypp.upp_note#" class="input text-notes"</cfif>
		_diviti.append('<h3><span class="capitalize_red">Day '+x+' of '+numdays+ '</span>'+newdate_2+'<span style="float:right;" class="capitalize_red expand"></span></h3><div id="divday'+x+'" class="divday_'+x+'"><div id="daycontent_'+x+'_'+placesorder+'" class="daycontent_'+x+'_'+placesorder+' daybox-plan body-rounded-3" data-tipo="pl" style="margin-bottom:5px;text-align:center;"><div id="butt_mp_day_'+x+'" align="center"><img style="float:right; padding-right:10px;height: 40px;" src="https://lh4.googleusercontent.com/-J8QLIopkdW4/VOdmvVtfapI/AAAAAAANhJA/FcImfqWSudY/s46/basura3.png" onclick="emptydaycookies('+x+');"><span class="button-square-2 button-round-red2" style="cursor: pointer;" onclick="viewrouteforday('+x+');">Myezplan</span></div>'+textnote+'<div id="divdaysort_'+x+'" style="margin:5px 0px"></div></div></div>')
		_divititable=$("#body_col5 #myitinerary #divday"+x+" #daycontent_"+x+'_'+placesorder+" #divdaysort_"+x);
		_divititable2=$("#body_col5 #myitinerary #divday"+x+" #daycontent_"+x+"_"+placesorder);
		//_diviti.append('');
		var fullorder=$.cookie("EZFULLORDER_day"+x);
		var cookpl=$.cookie("EZMAPCITYPLACES_day"+x);
		var cooktr=$.cookie("EZTRANSPORT_day"+x);
		var cooktr_s=$.cookie("EZTRANSPORT_S_day"+x);
		var cooksr=$.cookie("EZSERVICES_day"+x);
		othercityarray = [];
		otherarraytrans = [];
		otherarrayserv = [];
		if(fullorder && fullorder!=''){
			var full=fullorder.split(',');
			var pla=cookpl.split(',');
			if(cooktr){var tra=cooktr.split(',');}else{var tra='';}
			if(cooksr){var ser=cooksr.split(',');}else{var ser='';}
			/*|||||||valida si haynuevos||||||||*/
			/*|||||||places,ideas,rutas personales, places personales|||||||*/
			for(pl=0;pl<pla.length;pl++){
				if(full.indexOf(pla[pl])<0){
					full.push(pla[pl]);
				}
			/*|||||||||transports||||||||*/
			for(tr=0;tr<tra.length;tr++){
				este='t'+tra[tr];
				if(full.indexOf(este)<0){
					full.push(este);
				}
			}
			/*||||||||services||||||||*/
			for(sv=0;sv<ser.length;sv++){
				este='s'+ser[sv];
				if(full.indexOf(este)<0){
					full.push(este);
				}
			}
			}
//			alert(full.join(','))
			var newfull=[];
			/*valida si alguno de los places fue eliminado*/
			for(fu=0;fu<full.length;fu++){
				if(full[fu].indexOf('t')>-1){
					var este=full[fu].replace('t','');
					if(tra.indexOf(este)>-1){
						newfull.push(full[fu]);
					}
				}
				else if(full[fu].indexOf('s')>-1){
					var este=full[fu].replace('s','');
					if(ser.indexOf(este)>-1){
						newfull.push(full[fu]);
					}
				}
				else{
					if(pla.indexOf(full[fu])>-1){
						newfull.push(full[fu]);
					}
				}
			}			
//			alert(newfull.join(','))
			$.cookie("EZFULLORDER_day"+x,newfull.join(','));
			var cookpl=newfull.join(',');
		}		
		if(cookpl && cookpl !=''){
			hayalgo =true;
			var hayalgo2=true;
			var coo=cookpl.split(',')
			var estediarruta=[];
			var estedialats=[];
			for(c=0;c<coo.length;c++){
				console.log(coo[c]);
				if(coo[c].indexOf('t')<0 && coo[c].indexOf('s')<0){
				if(coo[c] > 40){
					var esdeciudad=false;
					for(mm=0;mm<arg_mapconfig.markers.length;mm++){
						if(arg_mapconfig.markers[mm].mk_id==coo[c]){
							var esdeciudad=true;
							_marker=arg_mapconfig.markers[mm];
							var largonombre = _marker.title.length;
							if (largonombre > 30){
								var titulomarkador=_marker.title.substr(0,30)+'...'
							}
							else{
								var titulomarkador=_marker.title;
							}
							_divititable.append('<div id="day_'+x+'_'+coo[c]+'" class="day-place-pl"><table onclick="window.top.showinfoplace(\''+_marker.mk_category.idunico+'\',\''+_marker.mk_id+'\', \'mapcitypopup\',\'yes\');" class="table"><tr><td class="t3" style="text-align:center;"><label onclick="window.top.showinfoplace(\''+_marker.mk_category.idunico+'\',\''+_marker.mk_id+'\', \'mapcitypopup\',\'yes\');" class="cursor label_check">'+titulomarkador+'<br><div id="'+_marker.mk_category.idunico+'newtype_'+x+'"></div><td class="table_img"> <div id="'+_marker.mk_category.idunico+'newimg_'+x+'" class="drag_me"><img src="https://lh3.googleusercontent.com/-8hkx9WPv230/VMk5SDBx1zI/AAAAAAANhCI/TJmlwVu6qSI/s138/Loading%25202.png"/></div></td></label></td></tr></table></div>');
							if(_marker.queryed==1){
								$('#'+_marker.mk_category.idunico+'newimg'+'_'+x).empty();
								$('#'+_marker.mk_category.idunico+'newtype'+'_'+x).empty();
								$('#'+_marker.mk_category.idunico+'newimg'+'_'+x).append(_marker.img__);
								$('#'+_marker.mk_category.idunico+'newtype'+'_'+x).append(_marker.areacity__);
							}
							else{
								var divimg=$('#'+_marker.mk_category.idunico+'newimg'+'_'+x);
								var divtype=$('#'+_marker.mk_category.idunico+'newtype'+'_'+x);
								bringplacedata(_marker,restimg_g,x,divimg,divtype);
							}
						}
					}
					if(!esdeciudad){
						_divititable.append('<div id="day_'+x+'_'+coo[c]+'" class="day-place-pl"></div>');
						var url = "http://myezplan.com/mobile/appdata/data_ajax/mapcity_content3.cfm?rnu=5131616516651";
						var urlconfig = {action:"bringothercityplace",ruta_id:coo[c]};
						$('#day_'+x+'_'+coo[c]).load(url,urlconfig);
					}
				}
				if(coo[c] < 11){
					var cookieper=$.cookie("EZPERSONAL");
					var cookieper_=cookieper.split('!');
					var esteper_tmp = cookieper_[(coo[c]-1)];
					if(esteper_tmp != undefined){
						var esteper=cookieper_[(coo[c]-1)].split('*');
						var estenom=esteper[0];
						var estenom2=esteper[0];
						//var stopsnames=stopes.join(', ');
						if(estenom.length>40){var estenom2=estenom.substring(0,36)+'...';}
						var estecoors=esteper[1];
						_divititable.append('<div id="day_'+x+'_'+coo[c]+'" class="day-place-pl"><table class="table"><tr><td class="t3"><label class="cursor label_check">'+estenom2+'<td class="table_img"> <div><img src="https://lh3.googleusercontent.com/-UZliDkbBQtA/VMk6xwLihKI/AAAAAAANhC4/02ZcZPiK-LE/s136/MY%2520PLACE.png" onclick="opencalforpersonals('+"'"+estenom+"'"+','+coo[c]+');"></div></td></label></td></tr></table></div>');
					}
				}
				if(coo[c] > 10 && coo[c] <21){
					var este=(coo[c]-10);
					if(este==1){var color='#FF00FF';}
					if(este==2){var color='#00FFCC';}
					if(este==3){var color='#6600CC';}
					if(este==4){var color='#FF0033';}
					if(este==5){var color='#99CC33';}
					if(este==6){var color='#009999';}
					if(este==7){var color='#FF6600';}
					if(este==8){var color='#666600';}
					if(este==9){var color='#989898';}
					if(este==10){var color='#FF0000';}
					var cookieper=$.cookie("EZPR_"+este);
					if(cookieper != undefined ){
						var cookieper_=cookieper.split('!');
						var estenom=cookieper_[0];
						_divititable.append('<div id="day_'+x+'_'+coo[c]+'" class="day-place-pl"><table class="table"><tr><td class="t3" ><label class="cursor label_check"><span style="color:'+color+';">'+estenom + '</span><td class="table_img"><div onclick="opencalforpersonalroutes('+este+');"><img src="https://lh5.googleusercontent.com/-z3w2lJQ_1fI/VMk6x5OQwmI/AAAAAAANhC8/ZxxaZOhYVxI/s136/MY%2520ROUTE.png"></div></td></label></td></tr></table></div>');					
					}
				}
				if(coo[c] >20 && coo[c] <31){
					//console.log("ideas");
					var este=(coo[c]-21);
					//if(cookieideas != undefined){
					var cookieideas=$.cookie("EZIDEAS_C").split('!');
					var cookieideas2=$.cookie("EZIDEAS").split(',')
					var esteid=cookieideas2[este];
					var esteideas=cookieideas[este].split('*');
					var estenom=esteideas[0];
					var estecolor='#'+esteideas[3];
					_divititable.append('<div id="day_'+x+'_'+coo[c]+'" class="day-place-pl"><table class="table"><tr><td class="t3" ><label class="cursor label_check"><span style="color:'+estecolor+';">'+estenom + '</span><td class="table_img"><div><img src="https://lh4.googleusercontent.com/-4Cd3GYz2ebM/VMk6Bczpl9I/AAAAAAANhCk/9Clp7mY95fQ/s136/IDEAS%25202.png" onclick="editideasroutedates('+esteid+');"></div></td></label></td></tr></table></div>');
				//}
				}
				}
				else{
					if(coo[c].indexOf('t')>-1){
						esdeciudad=false;
						hayalgo =true;
						var esteid=coo[c].replace('t','');
						var hayalgo2=true;
						var coo2=cooktr_s.split(',');
						var stopes=[];
						$.each(arraydetransports,function(index,vaule){
							if(parseInt(arraydetransports[index].rid)==parseInt(esteid)){
								esdeciudad=true;
								var tipo_=parseInt(arraydetransports[index].type);
								if(tipo_==1){
									for(st=0;st<arraydetransports[index].arraystops.length;st++){
										for(cs=0;cs<coo2.length;cs++){
											if(parseInt(coo2[cs])==parseInt(arraydetransports[index].arraystops[st].id_)){
												stopes.push(arraydetransports[index].arraystops[st].nombre);
											}
										}
									}
								}
								var stopsnames=stopes.join(', ');
								if(tipo_==1){var stopid=0;}else{var stopid=arraydetransports[index].rid;}
								if(stopsnames.length>40){var stopsnames=stopsnames.substring(0,36)+'...';}
								_divititable.append('<div id="day_'+x+'_'+coo[c]+'" class="day-place-pl"><table class="table"><tr><td class="t3" ><label class="cursor label_check"><span  id="span_t_'+x+'" style="color:#'+arraydetransports[index].color+';">'+arraydetransports[index].nombre+'</span><br><h4>'+stopsnames+'</h4><td class="table_img"><div class="drag_me"><img src="https://lh6.googleusercontent.com/-5enOtqMjn8Y/VMk6B6MVGJI/AAAAAAANhCo/XV-BGDFNPQU/s136/TRANSPORT.png" onclick="addelminateroute_t('+coo[c]+','+tipo_+','+stopid+');"></div></td></label></td></tr></table></div>');
							}
						})
						if(!esdeciudad){
							_divititable.append('<div id="day_'+x+'_'+coo[c]+'" class="day-place-pl"></div>');
							var url = "http://myezplan.com/mobile/appdata/data_ajax/mapcity_content3.cfm?rnu=5131616516651";
							var urlconfig = {action:"bringothercitytrans",tid:esteid};
							$('#day_'+x+'_'+coo[c]).load(url,urlconfig);
						}
					}
					if(coo[c].indexOf('s')>-1){
						servdeciudad = false;						
						var esteid=coo[c].replace('s','');
						$.each(arraydeservices, function(index,value){
							if(parseInt(arraydeservices[index].sid)==parseInt(esteid)){
								servdeciudad = true;
								_divititable.append('<div id="day_'+x+'_'+coo[c]+'" class="day-place-pl"><table class="table"><tr><td class="t3" ><label class="cursor label_check"><span  id="span2_'+x+'_t_'+c+'">'+arraydeservices[index].catname+' - '+arraydeservices[index].nombre+'</span><td class="table_img"><div class="drag_me"><img src="https://lh5.googleusercontent.com/-Lbqsh6kBgUA/VEg3r6f9CmI/AAAAAAANg4c/R7wFJ1lLlx8/s136/5%2520service.png" onclick="addelminateroute_s('+arraydeservices[index].rid+','+arraydeservices[index].sid+');"></div></td></label></td></tr></table></div>');
							}
						})
						if(!servdeciudad){
							console.log("here");
							_divititable.append('<div id="day_'+x+'_'+coo[c]+'" class="day-place-pl"></div>');
							var url = "http://myezplan.com/mobile/appdata/data_ajax/mapcity_content3.cfm?rnu=5131616516651";
							var urlconfig = {action:"bringothercityserv",sid:esteid};
							$('#day_'+x+'_'+coo[c]).load(url,urlconfig);
						}						
					}
				}
			}
		}			
		if(!fullorder || fullorder==''){
		if(cooktr && cooktr !=''){
			console.log("trans list");
			hayalgo =true;
			tresdeciudad=false;
			var hayalgo2=true;
			var coo=cooktr.split(',');
			var coo2=cooktr_s.split(',');
			for(c=0;c<coo.length;c++){
				tresdeciudad=false;
				var stopes=[];
				$.each(arraydetransports,function(index,vaule){
					if(parseInt(arraydetransports[index].rid)==parseInt(coo[c])){
							tresdeciudad=true;
							var tipo_=parseInt(arraydetransports[index].type);
						if(tipo_==1){
							for(st=0;st<arraydetransports[index].arraystops.length;st++){
								for(cs=0;cs<coo2.length;cs++){
									if(parseInt(coo2[cs])==parseInt(arraydetransports[index].arraystops[st].id_)){
										stopes.push(arraydetransports[index].arraystops[st].nombre);
									}
								}
							}
							
						}
						var stopsnames=stopes.join(', ');
						if(tipo_==1){var stopid=0;}else{var stopid=arraydetransports[index].rid;}
						if(stopsnames.length>40){var stopsnames=stopsnames.substring(0,36)+'...';}
						_divititable.append('<div id="day_'+x+'_t'+coo[c]+'" class="day-place-pl"><table class="table"><tr><td class="t3" ><label class="cursor label_check"><span  id="span_t_'+x+'" style="color:#'+arraydetransports[index].color+';">'+arraydetransports[index].nombre+'</span><br><h4>'+stopsnames+'</h4><td class="table_img"><div class="drag_me"><img src="https://lh6.googleusercontent.com/-5enOtqMjn8Y/VMk6B6MVGJI/AAAAAAANhCo/XV-BGDFNPQU/s136/TRANSPORT.png" onclick="addelminateroute_t('+coo[c]+','+tipo_+','+stopid+');"></div></td></label></td></tr></table></div>');
					}
					
				})
				//console.log(tresdeciudad);
				if(!tresdeciudad){
					console.log("trans list no"+coo[c]);
					_divititable.append('<div id="day_'+x+'_t'+coo[c]+'" class="day-place-pl"></div>');
					var url = "http://myezplan.com/mobile/appdata/data_ajax/mapcity_content3.cfm?rnu=5131616516651";
					var urlconfig = {action:"bringothercitytrans",tid:coo[c]};
					$('#day_'+x+'_t'+coo[c]).load(url,urlconfig);
				}
			}
		}
		if(cooksr && cooksr !=''){
			hayalgo =true;
			var hayalgo2=true;
			var coo=cooksr.split(',')
			for(c=0;c<coo.length;c++){
				servdeciudad = false;
				$.each(arraydeservices, function(index,value){
					if(parseInt(arraydeservices[index].sid)==parseInt(coo[c])){
						servdeciudad = true;
						_divititable.append('<div id="day_'+x+'_s'+coo[c]+'" class="day-place-pl"><table class="table"><tr><td class="t3" ><label class="cursor label_check"><span  id="span2_'+x+'_t_'+c+'">'+arraydeservices[index].catname+' - '+arraydeservices[index].nombre+'</span><td class="table_img"><div class="drag_me"><img src="https://lh5.googleusercontent.com/-Lbqsh6kBgUA/VEg3r6f9CmI/AAAAAAANg4c/R7wFJ1lLlx8/s136/5%2520service.png" onclick="addelminateroute_s('+arraydeservices[index].rid+','+arraydeservices[index].sid+');"></div></td></label></td></tr></table></div>');
					}
				})
				if(!servdeciudad){
					console.log("here");
					_divititable.append('<div id="day_'+x+'_s'+coo[c]+'" class="day-place-pl"></div>');
					var url = "http://myezplan.com/mobile/appdata/data_ajax/mapcity_content3.cfm?rnu=5131616516651";
					var urlconfig = {action:"bringothercityserv",sid:coo[c]};
					$('#day_'+x+'_s'+coo[c]).load(url,urlconfig);
				}	
			}
		}
		}
		if(!hayalgo2){
			_divititable2.prepend('<div class="" style="text-shadow:none;">No Places Added</div>');
			$('#butt_mp_day_'+x).remove();	 
		}	
		_divititable.sortable({handle:'.drag_me',update : function (e, ui) { 
					//e.stopPropagation();e.preventDefault();
					var dayOrder = $(this).sortable('toArray').toString().replace(/day_/g,'').split(',');
					var order=[];
					var orderf=[];
					for(x=0;x<dayOrder.length;x++){
						var dayOrder_=dayOrder[x].split('_');
						var day=dayOrder_[0];
						orderf.push(dayOrder_[1]);
						if(dayOrder_[1].indexOf('t')<0 && dayOrder_[1].indexOf('s')<0){
							order.push(dayOrder_[1]);
						}
					}
					$.cookie("EZROUTE_day_"+day,true);
					$.cookie("EZMAPCITYPLACES_day"+day,order.join(','));
					$.cookie("EZFULLORDER_day"+day,orderf.join(','));
			} 
		});	
	}	
	_diviti.accordion({collapsible: true,active: false,animated: 'bounceslide',heightStyle: "content"});
	var itiid=$.cookie("MYITINERARYID");
	if(itiid && itiid!=''){traepersonalesyhotdeals(itiid,numdays,itiordersarray.join(','));$('#plus_funcs2').show();}
	else{$('#plus_funcs2').hide();}
	if(!hayalgo){
		alert('Please make a selection.');
		var _category=parseInt($("input:radio[name='category']:checked").val());
		if(!_category || _category=='' || _category==0){
			if($("#body_col2").css("display") == "none"){
				$('#show_categ').trigger('click');
			}
		}
		else{$('#show_places').trigger('click');}
//		mapcitypopup.showPlaces();
//		global_showbutton = false;
//		$('#button-show').css("background-color", "lightgray");
		return false;
	}
	var _panel = $("#myitin-panel");
	_panel.panel("open");	
	//check_plandiv_load();
	check_image_load();
}
traepersonalesyhotdeals=function(itiid,numdays,orders){
	if(!sessionStorage.cf_sid){
		var userid = "";
	}else{
		var userid = sessionStorage.cf_sid;
	}	
	var url = "http://myezplan.com/mobile/appdata/data_ajax/mapcity_content_EI.cfm?rnu=5131616516651";
	var urlconfig = {action:"personalyhotdeal_myiti",itiid:itiid,numdays:numdays,userid:userid,orders:orders};
	//$("#divitifuncs").load(url,urlconfig)
	$.ajax({
		type: "POST",
		url: url,
		async:true, 
		data: urlconfig ,
		success: function(datos){
			$("#divitifuncs").html(datos);
		}
	});
}
bringplacedata3=function(_marker,divimg,divtype,divrating){
if(_marker.queryed==1){
				divimg.empty();
				divtype.empty();
				divrating.empty();
				divimg.append(_marker.img__);
				divtype.append(_marker.type__);
				divrating.append(_marker.rating__);
				check_image_load();
}
else{
		$.ajax({
			type: "POST",
			url: "http://myezplan.com/mobile/appdata/data_ajax/mapcity_content.cfm",
			async:true, 
			cache:true,
			data: "action=imgytype&pids="+_marker.mk_category.idunico+'&restimg_g='+restimg_g+'&day=0',
			error: function(){
				img='<img src="https://lh3.googleusercontent.com/-8hkx9WPv230/VMk5SDBx1zI/AAAAAAANhCI/TJmlwVu6qSI/s138/Loading%25202.png"/>';type_='<h4>Type: Atraction</h4>';
				divimg.empty();
				divtype.empty();
				divrating.empty();
				divimg.append(img);
				divtype.append(type_);
				},
			success: function(datos){
				_marker.queryed=1;
				var datos_=datos.split('!');
				img='<img data-real-type="image" src="https://lh3.googleusercontent.com/-xhmo8Iinz68/VEnrYWO4eWI/AAAAAAANg80/yBuZi9jSgYc/s109/Loading3%2520small.png" data-real-src="'+datos_[1]+'" />';
				type_='<h4>Type: '+datos_[0]+'</h4>';
				areacity_='<h4>'+datos_[5]+ ' - ' +datos_[4]+'</h4>';
				_marker.areacity__=areacity_;
				_marker.type__=type_;
				_marker.audio_link=datos_[6];
				_marker.ismap=datos_[7];
				_marker.img__=img;
				var rating='';
				if(datos_[3]!=''){
				var rating_=datos_[3].split('*');
				var tot=rating_[1];
				if(tot<=0){var rating='<img src="https://lh4.googleusercontent.com/-TLwXMNb8CNs/U1XRW4MTRdI/AAAAAAANdbM/s6JUnAie7lE/s149/0.png?gl=GB">';}
				if(tot>0 && tot<1){var rating='<img data-real-type="image" src="https://lh4.googleusercontent.com/-TLwXMNb8CNs/U1XRW4MTRdI/AAAAAAANdbM/s6JUnAie7lE/s149/0.png?gl=GB" data-real-src="https://lh5.googleusercontent.com/-GfdcKY-LHBE/U1XRWhXRRII/AAAAAAANdbI/Ce_XJwWJ2Og/s149/0.5.png?gl=GB" />';}
				if(tot>=1 && tot<1.5){var rating='<img data-real-type="image" src="https://lh4.googleusercontent.com/-TLwXMNb8CNs/U1XRW4MTRdI/AAAAAAANdbM/s6JUnAie7lE/s149/0.png?gl=GB" data-real-src="https://lh6.googleusercontent.com/-ANHA0UKAE7w/U1XRXKeQd8I/AAAAAAANdbc/KassLOg2RzE/s149/1.png?gl=GB">';}
				if(tot>=1.5 && tot<2){var rating='<img data-real-type="image" src="https://lh4.googleusercontent.com/-TLwXMNb8CNs/U1XRW4MTRdI/AAAAAAANdbM/s6JUnAie7lE/s149/0.png?gl=GB" data-real-src="https://lh6.googleusercontent.com/-I3wkJZS3zmg/U1XRWnxKLgI/AAAAAAANdbQ/foq03cGWRnE/s149/1.5.png?gl=GB">';}
				if(tot>=2 && tot<2.5){var rating='<img data-real-type="image" src="https://lh4.googleusercontent.com/-TLwXMNb8CNs/U1XRW4MTRdI/AAAAAAANdbM/s6JUnAie7lE/s149/0.png?gl=GB" data-real-src="https://lh6.googleusercontent.com/-ugxVqZR1pE4/U1XRX5Rhp1I/AAAAAAANdbg/7In2wUxiptg/s149/2.png?gl=GB">';}
				if(tot>=2.5 && tot<3){var rating='<img data-real-type="image" src="https://lh4.googleusercontent.com/-TLwXMNb8CNs/U1XRW4MTRdI/AAAAAAANdbM/s6JUnAie7lE/s149/0.png?gl=GB" data-real-src="https://lh4.googleusercontent.com/-zcIvmrsZiQQ/U1XRX-sfd5I/AAAAAAANdbw/SgyRReCah5c/s149/2.5.png?gl=GB">';}
				if(tot>=3 && tot<3.5){var rating='<img data-real-type="image" src="https://lh4.googleusercontent.com/-TLwXMNb8CNs/U1XRW4MTRdI/AAAAAAANdbM/s6JUnAie7lE/s149/0.png?gl=GB" data-real-src="https://lh5.googleusercontent.com/-OeqG3M4pQaE/U1XRYZ5mUTI/AAAAAAANdb4/yl4qWcGhGmI/s149/3.png?gl=GB">';}
				if(tot>=3.5 && tot<4){var rating='<img data-real-type="image" src="https://lh4.googleusercontent.com/-TLwXMNb8CNs/U1XRW4MTRdI/AAAAAAANdbM/s6JUnAie7lE/s149/0.png?gl=GB" data-real-src="https://lh4.googleusercontent.com/-hu7jm-6ScSE/U1XRYUQZCuI/AAAAAAANdb0/6BGICInShXA/s149/3.5.png?gl=GB">';}
				if(tot>=4 && tot<4.5){var rating='<img data-real-type="image" src="https://lh4.googleusercontent.com/-TLwXMNb8CNs/U1XRW4MTRdI/AAAAAAANdbM/s6JUnAie7lE/s149/0.png?gl=GB" data-real-src="https://lh4.googleusercontent.com/-Ra4lBYxKf1Y/U1XRZRMF1JI/AAAAAAANdcM/HogqnEBdIuo/s149/4.png?gl=GB">';}
				if(tot>=4.5 && tot<5){var rating='<img data-real-type="image" src="https://lh4.googleusercontent.com/-TLwXMNb8CNs/U1XRW4MTRdI/AAAAAAANdbM/s6JUnAie7lE/s149/0.png?gl=GB" data-real-src="https://lh6.googleusercontent.com/-SV1R2yH6iic/U1XRY7cdW8I/AAAAAAANdcI/IAvEVm13H-c/s149/4.5.png?gl=GB">';}
				if(tot>=5){var rating='<img data-real-type="image" src="https://lh4.googleusercontent.com/-TLwXMNb8CNs/U1XRW4MTRdI/AAAAAAANdbM/s6JUnAie7lE/s149/0.png?gl=GB" data-real-src="https://lh5.googleusercontent.com/-cK7qK9FdSPQ/U1XRZcm2h0I/AAAAAAANdcQ/WEe93TcJllA/s149/5.png?gl=GB">';}
				}
				var _rating_='<h4>'+rating+'</h4>';
				_marker.rating__=_rating_;
				if(datos_[2]!=0){
				restimg_g=restimg_g+','+datos_[2];
				countrestimg_g=countrestimg_g+1;
				if(countrestimg_g>19){
					restimg_g='0';
					countrestimg_g=0;
				}
				}
				//alert(datos_[3]);
				divimg.empty();
				divtype.empty();
				divrating.empty();
				divimg.append(img);
				divtype.append(type_);
				divrating.append(_rating_);
				check_image_load();
			}
		});				 
}
}
bringplacedata2= function(pid,obj,arg_mapconfig){
	arg_mapconfig=arg_mapconfig || mapcitypopup.mapconfig;
	$.each(arg_mapconfig.markers,function(index,value){
		if(arg_mapconfig.markers[index].mk_id==pid){
			_marker=arg_mapconfig.markers[index];
			var divimg= $('#'+_marker.mk_category.idunico+"newimg");
			var divtype=$('#'+_marker.mk_category.idunico+"newtype");
			var divrating=$('#'+_marker.mk_category.idunico+"newrating");
			bringplacedata3(_marker,divimg,divtype,divrating);
		}
	});
}
bringplacedata = function(_marker,restimg,day,divimg,divtype){
		$.ajax({
			type: "POST",
			url: "http://myezplan.com/mobile/appdata/data_ajax/mapcity_content.cfm",
			async:true, 
			cache:true,
			data: "action=imgytype_picks&pids="+_marker.mk_category.idunico+'&restimg_g='+restimg,
			success: function(datos){
				var datos_=datos.split('!');
				img='<img data-real-type="image" src="https://lh3.googleusercontent.com/-xhmo8Iinz68/VEnrYWO4eWI/AAAAAAANg80/yBuZi9jSgYc/s109/Loading3%2520small.png" data-real-src="'+datos_[1]+'" />';
				type_='<h4>'+datos_[3]+' - '+datos_[0]+'</h4>';
				_marker.img__=img;
				_marker.areacity__=type_;
				_marker.audio_link=datos_[4];
				_marker.ismap=datos_[5];
				if(datos_[2]!=0){
				restimg_g=restimg_g+','+datos_[2];
				countrestimg_g=countrestimg_g+1;
				if(countrestimg_g>19){
					restimg_g='0';
					countrestimg_g=0;
				}
				}
				divimg.html(img);
				divtype.html(type_);
				check_image_load();
			}
		});	
}
	mapcitypopup.showPlaces=function(arg_mapconfig) {
		updateMapCityCookie();
		global_showbutton = false;
		arg_mapconfig=arg_mapconfig || mapcitypopup.mapconfig;
		mapcitypopup.markers=[];
		var markersl = arg_mapconfig.markers.length;
		for (m=0;m<markersl;m++){
		//$.each(arg_mapconfig.markers,function(index,value){
			if(typeof(arg_mapconfig.markers[m].queryed)=='undefined'){arg_mapconfig.markers[m].queryed=0;}
			var icon_ = arg_mapconfig.markers[m].icon;
			if ((icon_.indexOf('s.png'))>0){
				var _icon_=icon_.replace('s.png','.png');
				arg_mapconfig.markers[m].icon=_icon_;
				}
			arg_mapconfig.markers[m].setVisible(false);
			mapcitypopup.markers.push(arg_mapconfig.markers[m]);
			//return true;
		//});
		}
		var _divplace=$("#body_col4 #menu_place .table");_divplace.empty();
		var _diviti=$("#body_col4 #myitinerary");_diviti.empty();
		var _currentplan="";
		var markersl2 = mapcitypopup.markers.length;
		for (m=0;m<markersl2;m++){
		//$.each(mapcitypopup.markers,function(index,value){
			var _url = "cfc/mapcity.cfc";
			var _marker=mapcitypopup.markers[m], _markerhtml="";
			var _markerplanname=_marker.mk_category.planname;
			if(_markerplanname!=_currentplan){
				_divplace.append('<tr><th class="t0" colspan="3">'+_markerplanname+'</th></tr>');
				}
			_divplace.append('<tr><th class="t1"><input type="checkbox" name="place" value="'+_marker.mk_id+'" id="place_'+_marker.mk_id+'" class="check_place"/></th></tr>');										
			if($.inArray(_marker.mk_id,global_MapCityCookie)>=0){
				$("#place_"+_marker.mk_id+"").attr("checked",true);
			}
			_currentplan=_markerplanname;
		//});
		}
		mapcitypopup.showCats();
		mapcitypopup.showPlaces2();
	}

	mapcitypopup.showPlaces2=function(arg_mapconfig) {
		arg_mapconfig=arg_mapconfig || mapcitypopup.mapconfig;
		mapcitypopup.markers=[];
		restimg_g='0';
		countrestimg_g=0;
		var _plans=[];
		var _plan=$("input:checkbox[name='plan']:checked").each(function(index, element) {_plans.push(parseInt($(element).val()));});
		var _places=[];
		var _place=$("input:checkbox[name='place']:checked").each(function(index, element) {_places.push(parseInt($(element).val()));});
		var _category=parseInt($("input:radio[name='category']:checked").val());
		var markersl = arg_mapconfig.markers.length;
		for (mc=0;mc<markersl;mc++){
		//$.each(arg_mapconfig.markers,function(mc,value){
			arg_mapconfig.markers[mc].setVisible(false);
			var _placesvals=arg_mapconfig.markers[mc].mk_id;
			if($.inArray(_placesvals,_places)>=0){
				var icon2_ = arg_mapconfig.markers[mc].icon;
				var _icon2_=icon2_.replace('.png','s.png');
//				alert(_icon2_);
				arg_mapconfig.markers[mc].icon=_icon2_
				arg_mapconfig.markers[mc].setVisible(true);
//				mapcitypopup.markers.push(arg_mapconfig.markers[index]);
//				return true;
			}
			var _categoryvals=arg_mapconfig.markers[mc].mk_category.category;
			var _planval=parseInt(arg_mapconfig.markers[mc].mk_category.planid);
			if($.inArray(_planval,_plans)>=0){
				var _cat_=arg_mapconfig.markers[mc].mk_category.category;
				if ((parseFloat(_cat_[0]))>=0){
					_cat =parseFloat(_cat_[0]);
					$('#div_'+_cat).show();
				}
				if ((parseFloat(_cat_[1]))>=0){
					_cat1 =parseFloat(_cat_[1]);
					$('#div_'+_cat1).show();
				}
				if ((parseFloat(_cat_[2]))>=0){
					_cat2 =parseFloat(_cat_[2]);
					$('#div_'+_cat2).show();
				}
				if($.inArray(_category,_categoryvals)>=0){
					arg_mapconfig.markers[mc].setVisible(true);
					mapcitypopup.markers.push(arg_mapconfig.markers[mc]);
					//return true;
				}
			}
		//});
		}
		var _divplace=$("#body_col4 #menu_place .table");_divplace.empty();
		var _diviti=$("#body_col4 #myitinerary");_diviti.empty();
		var _currentplan="";
		_countplans=0;
		var markersl2 = mapcitypopup.markers.length;
		for (mp=0;mp<markersl2;mp++){
		//$.each(mapcitypopup.markers,function(index,value){
			var _marker=mapcitypopup.markers[mp], _markerhtml="";
			var _markerplanname=_marker.mk_category.planname;
			var img='<img data-real-type="image" src="https://lh3.googleusercontent.com/-xhmo8Iinz68/VEnrYWO4eWI/AAAAAAANg80/yBuZi9jSgYc/s109/Loading3%2520small.png" data-real-src="'+_marker.mk_category.imgurl+'" />';
			var type_='<h4>Type: '+_marker.mk_category.type+'</h4>';
			var areacity_='<h4>'+_marker.mk_category.cyname+' - '+_marker.mk_category.planname+'</h4>';
			_marker.queryed=1;
			_marker.areacity__=areacity_;
			_marker.type__=type_;
			_marker.audio_link=_marker.mk_category.audiourl;
			_marker.ismap= _marker.mk_category.ismap;
			_marker.img__=img;
			var largonombre = _marker.title.length;
			//alert(largonombre);
			if (largonombre > 38){var titulomarkador=_marker.title.substr(0,35)+'...'}else{var titulomarkador=_marker.title}
			
			if(_markerplanname!=_currentplan){
				_countplans=_countplans+1;
				if(_countplans<1){check_plandiv_load();}
				_divplace.append('<tr class="pla_class" data-plan="'+_countplans+'"><th class="t0" colspan="3">'+_markerplanname+'</th></tr>');
			}
			_divplace.append('<tr class="tr_pla_'+_countplans+' tr_place" data-pid="'+_marker.mk_id+'" data-iduniq="'+_marker.mk_category.idunico+'" data-orgimg="'+_marker.mk_category.imgurl+'" data-rating="'+_marker.mk_category.rating+'"><td class="t4"><input type="checkbox" name="place" value="'+_marker.mk_id+'" id="place_'+_marker.mk_id+'" class="check_place squaredTwo squaredTwoGrande" /><label for="place_'+_marker.mk_id+'"></label></td><td class="placetooltip_old"  data-tipid="'+_marker.mk_category.idunico+'" data-tipicon="'+_marker.icon+'"><div><table onclick="window.top.showinfoplace(\''+_marker.mk_category.idunico+'\',\''+_marker.mk_id+'\', \'mapcitypopup\');" class="table show_load"><tr><td class="t3"><label onclick="window.top.showinfoplace(\''+_marker.mk_category.idunico+'\',\''+_marker.mk_id+'\', \'mapcitypopup\');" class="cursor label_check">'+titulomarkador+'<br><div id="'+_marker.mk_category.idunico+'newtype" ><h4>Type:'+_marker.mk_category.type+'</h4></div><div id="'+_marker.mk_category.idunico+'newrating"></div><td class="table_img"> <div id="'+_marker.mk_category.idunico+'newimg"><img src="https://lh3.googleusercontent.com/-8hkx9WPv230/VMk5SDBx1zI/AAAAAAANhCI/TJmlwVu6qSI/s138/Loading%25202.png"/></div></td></tr></table></tr>');
			if($.inArray(_marker.mk_id,global_MapCityCookie)>=0){
				$("#place_"+_marker.mk_id+"").attr("checked",true);
			}					
			
			_currentplan=_markerplanname;
			
					
		//});
		}
		arg_mapconfig.setCenterByBounds();
		check_plandiv_load();
		check_image_load();		
	}

	mapcitypopup.callBackGoogleMapCityPopup=function(arg_mapconfig,status,result){
		updateMapCityCookie();
		mapcitypopup.showPlaces(arg_mapconfig);
	}

});
$(window).load(function(e) {
var watermark_usernote = 'Add a note';
	$(document).on("blur", "#daynote_mi", function(e){
	if ($(this).val().length == 0)
		$(this).val(watermark_usernote).addClass('watermark');
	}).on("focus", "#daynote_mi", function(e){
	if ($(this).val() == watermark_usernote)
		$(this).val('').removeClass('watermark');
	}).val(watermark_usernote).addClass('watermark');
faqpage='mapcitypopup';
placesadded=[];
placesdeleted=[];
placesadded2=[];
placesdeleted2=[];
	/*$(".check_plan").change(function(e) {
		//alert('gatitos');
		
		mapcitypopup.showCats();
		setTimeout('mapcitypopup.showPlaces();',20);
		//mapcitypopup.showPlaces();
	});
	$(".check_category").change(function(e) {
		mapcitypopup.showPlaces();
	});*/
	varshowmep=false;
	$('.button-show-MEP').on('click', function(e){
		if(varlistchanged == true){
			viewrouteforday(currentday);
		}else{
			var navarrows = $('#show_box2');
			if(varshowmep){
				varshowmep=false; 
				$('.4').show();
				$('.div_plans_route').hide();
				$('.div_plans_noroute').hide();
				$('.div_plans_route_label').hide();
				$('.button-show-MEP').css("background-color",'rgb(211, 211, 211)');
				$('.button-show-MEP').html("List");			
				$('.wrap').css("height",'100%');
				navarrows.css("position","absolute");
				navarrows.css("z-index","2");
				navarrows.css("right","0");
				navarrows.css("left","0");
				navarrows.css("border","0px");
				google.maps.event.trigger(mapcitypopup.mapconfig.google.map, 'resize');
			}
			else{
				varshowmep=true;
				resetdayarray(currentday);
				$('.4').hide();
				//$('.div_plans_route').show();
				if($("#div_plans_route").is(':empty')){
					$("#div_plans_route").hide();
				}else{
					$('.div_plans_route').show();
				}
				//$('.div_plans_noroute').show();
				if($("#div_plans_noroute").is(':empty')){
					$("#div_plans_noroute").hide();
				}else{
					$('.div_plans_noroute').show();
				}
				$('.div_plans_route_label').show();
				check_image_load();
				navarrows.css("position","initial");
				navarrows.css("border","1px solid #ddd");
				$('.button-show-MEP').css("background-color",'rgb(23, 55, 94)');
				$('.button-show-MEP').html("Map");
				$('.wrap').css("height",'auto');
			}
		}
	});
	$(document).on("change",".check_place",function(e) {
		var numdays_=$.cookie("NUMDAYS");
		var numdays=1
		if(numdays_ && numdays_!=''){var numdays=numdays_}
		var date1_=$.cookie("EZDATE1");
		var date2_=$.cookie("EZDATE2");
		var date1='';
		var date2='';
		if(date1_ && date1_!=''){var date1=date1_;}
		if(date2_ && date2_!=''){var date2=date2_;}
		var _checkmix = $(this);
		var popup = $("#Calendario-mapcitypopup-pan");
		popup.panel({close: function( event, ui ) {closerutascalendario();}});
		popup.show();
		popup.panel("open");		
		//if(window.lastdate1 != date1_ || window.lastdate2 != date2_  ){
			popup.showLoading("Please Wait,<br/>Loading...<br/>",false);
			var url = "http://myezplan.com/mobile/appdata/data_ajax/mapcity_content3.cfm?rnu=5131616516651";
			var urlconfig = {action:"calendarioplaces",ruta_id:_checkmix.val(),date1:date1,date2:date2,numdays:numdays,source:'Mapcitypopup'};
			$.ajax({
				type: "POST",
				url: url,
				async:true, 
				cache:false,
				data: urlconfig,
				success: function(datos){
					$("#Calendario-mapcitypopup-pan .box-body").html(datos).promise().done($('.mask-loading').remove());
					sessionStorage.calendar=datos;
					window.lastdate1 = date1_;
					window.lastdate2 = date2_;
				}
			});
		/*}else{
			$("#Calendario-mapcitypopup-pan .box-body").html(sessionStorage.calendar);
		}*/	
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
		//		if(!_checkmix){
		//			e.stopPropagation();e.preventDefault();
		//			return;
		//		}
		//		if(_checkmix.is(":checked")){//alert('checked');alert(_checkmix.val());
		//					var loads = $.cookie("EZMAPCITYPLACES");
		//					if(!loads || loads==''){loads='';}
		//					var div = '';
		//					if(loads!=''){var div=','}
		//					var loads=loads+div+_checkmix.val();
		//					$.cookie("EZMAPCITYPLACES",loads);
		//					updateMapCityCookie();
		//					placesadded.push(_checkmix.val());
		//					var newdeleted='';
		//						for(y=0;y<=(placesdeleted.length-1);y++){
		//						if(placesdeleted[y]!=_checkmix.val()){
		//						var div=',';
		//						if(newdeleted==''){var div='';}
		//						var newdeleted=newdeleted+div+placesdeleted[y];
		//						}
		//						}
		//					placesdeleted=newdeleted.split(',');
		//		}else{//alert('nochecked');
		//					var loads = $.cookie("EZMAPCITYPLACES");
		//					var loads_= loads.split(',')
		//					var newcookie=''
		//					for(x=0;x<=(loads_.length-1);x++){
		//					if(loads_[x]!=_checkmix.val()){
		//					var div = ',';
		//					if(newcookie==''){var div=''}
		//					newcookie=newcookie+div+loads_[x];
		//					}
		//					}
		//					$.cookie("EZMAPCITYPLACES",newcookie);
		//					placesdeleted.push(_checkmix.val());
		//					var newdeleted='';
		//						for(y=0;y<=(placesadded.length-1);y++){
		//						if(placesadded[y]!=_checkmix.val()){
		//						var div=',';
		//						if(newdeleted==''){var div='';}
		//						var newdeleted=newdeleted+div+placesadded[y];
		//						}
		//						}
		//					placesadded=newdeleted.split(',');				
		//				updateMapCityCookie();
		//if(typeof(subroutesarray)!='undefined'){
		//	for(x=0;x<subroutesarray.length;x++){
		//		if(subroutesarray[x].pid==_checkmix.val()){deleterouteandstops(subroutesarray[x].rid);}
		//	}
		//}
		//	}
		window.reloadlastitemcal = function(){_checkmix.trigger("click");}
	});
	return false;
});
function cleancurrentitin(){
	var confcleaniti = new PNotify({
		title: 'myezplan warnig',
		text: 'WARNING!, this process can not be undone.\nWhat would you like to clean?',
		icon: 'glyphicon glyphicon-question-sign',
		styling: 'jqueryui',
		type: 'error',
		hide: false,
		confirm: {
			confirm: true,
			buttons: [{
				text: 'Days',
				addClass: 'btn-primary',
				click: function(notice) {
					global_showbutton = false;
					$(".ui-panel").panel("close");
					confcleaniti.remove();
					cleanitidays();
				}
			}, {
				text: 'All',
				click: function(notice) {
					global_showbutton = false;
					$(".ui-panel").panel("close");
					confcleaniti.remove();
					cleanitiall();
				}
			},{
				text: 'Cancel',
				click: function(notice) {
					confcleaniti.remove();
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
}
function cleanitidays(){
	var numdays=$.cookie("NUMDAYS");
	for(x=1;x<=numdays;x++){
		console.log(x);
		$.cookie('EZMAPCITYPLACES_day'+x,false, {path: '/',expires: -1});
		$.cookie('EZMAPCITYPLACES_day'+x,false, {path: '/mobile/appdata',expires: -1});
		$.cookie("EZMAPCITYPLACES_day"+x, null);
		$.cookie('EZMAPCITYPLACES2_day'+x,false, {path: '/',expires: -1});
		$.cookie('EZMAPCITYPLACES2_day'+x,false, {path: '/mobile/appdata',expires: -1});
		$.cookie("EZMAPCITYPLACES2_day"+x, null);
		$.cookie('EZMAPCITYSUBPLACES_day'+x,false, {path: '/',expires: -1});
		$.cookie('EZMAPCITYSUBPLACES_day'+x,false, {path: '/mobile/appdata',expires: -1});
		$.cookie("EZMAPCITYSUBPLACES_day"+x, null);
		$.cookie("EZTRANSTOPS_day"+x,false, {path: '/',expires: -1});
		$.cookie("EZTRANSTOPS_day"+x,false, {path: '/mobile/appdata',expires: -1});
		$.cookie("EZTRANSTOPS_day"+x, null);
		$.cookie("EZTRANSPORT_day"+x,false, {path: '/',expires: -1});
		$.cookie("EZTRANSPORT_day"+x,false, {path: '/mobile/appdata',expires: -1});
		$.cookie("EZTRANSPORT_day"+x, null);
		$.cookie("EZSERVICES_day"+x,false, {path: '/',expires: -1});
		$.cookie("EZSERVICES_day"+x,false, {path: '/mobile/appdata',expires: -1});
		$.cookie("EZSERVICES_day"+x, null);
		$.cookie("EZROUTE_day_"+x,false, {path: '/',expires: -1});
		$.cookie("EZROUTE_day_"+x,false, {path: '/mobile/appdata',expires: -1});
		$.cookie("EZROUTE_day_"+x, null);
		$.cookie("EZGOTM_day_"+x,false, {path: '/',expires: -1});
		$.cookie("EZGOTM_day_"+x,false, {path: '/mobile/appdata',expires: -1});
		$.cookie("EZGOTM_day_"+x, null);
		$.cookie("EZ_P_O_day"+x,false, {path: '/',expires: -1});
		$.cookie("EZ_P_O_day"+x,false, {path: '/mobile/appdata',expires: -1});
		$.cookie("EZ_P_O_day"+x, null);
		$.cookie("EZNOTE_day"+x,false, {path: '/',expires: -1});
		$.cookie("EZNOTE_day"+x,false, {path: '/mobile/appdata',expires: -1});
		$.cookie("EZNOTE_day"+x, null);
		$.cookie("EZFULLORDER_day"+x,false, {path: '/',expires: -1});
		$.cookie("EZFULLORDER_day"+x,false, {path: '/mobile/appdata',expires: -1});
		$.cookie("EZFULLORDER_day"+x, null);
		$.cookie("EZDEALS_day"+x,false, {path: '/',expires: -1});
		$.cookie("EZDEALS_day"+x,false, {path: '/mobile/appdata',expires: -1});
		$.cookie("EZDEALS_day"+x, null);
		$.cookie("EZPPLAN_day"+x,false, {path: '/',expires: -1});
		$.cookie("EZPPLAN_day"+x,false, {path: '/mobile/appdata',expires: -1});
		$.cookie("EZPPLAN_day"+x, null);			
	}
	for(pr=1;pr<=10;pr++){
		$.cookie("EZPR"+pr,false, {path: '/',expires: -1});
		$.cookie("EZPR"+pr,false, {path: '/mobile/appdata/webtest',expires: -1});
		$.cookie("EZPR"+pr,false, {path: '/mobile/appdata',expires: -1});
		$.cookie("EZPR"+pr, null);
		$.cookie("EZPR_"+pr,false, {path: '/',expires: -1});
		$.cookie("EZPR_"+pr,false, {path: '/mobile/appdata/webtest',expires: -1});
		$.cookie("EZPR_"+pr,false, {path: '/mobile/appdata',expires: -1});
		$.cookie("EZPR_"+pr, null);
		$.cookie("EZPR"+pr+"_S",false, {path: '/',expires: -1});
		$.cookie("EZPR"+pr,false, {path: '/mobile/appdata/webtest',expires: -1});
		$.cookie("EZPR"+pr,false, {path: '/mobile/appdata',expires: -1});
		$.cookie("EZPR"+pr+"_S", null);
		$.cookie("EZPR_"+pr+"_S",false, {path: '/',expires: -1});
		$.cookie("EZPR_"+pr,false, {path: '/mobile/appdata/webtest',expires: -1});
		$.cookie("EZPR_"+pr,false, {path: '/mobile/appdata',expires: -1});
		$.cookie("EZPR_"+pr+"_S", null);
	}
	checkplacesadd();
	checktransportsadd();
	checkservicesadd();
}
function cleanitiall(){
	cleanitidays();
	$.cookie("EZDATE1",false, {path: '/',expires: -1});
	$.cookie("EZDATE1",false, {path: '/mobile/appdata/webtest',expires: -1});
	$.cookie("EZDATE1", null);
	$.cookie("EZDATE2",false, {path: '/',expires: -1});
	$.cookie("EZDATE2",false, {path: '/mobile/appdata/webtest',expires: -1});
	$.cookie("EZDATE2", null);
	$.cookie("EZIDEAS",false, {path: '/',expires: -1});
	$.cookie("EZIDEAS",false, {path: '/mobile/appdata/webtest',expires: -1});
	$.cookie("EZIDEAS", null);
	$.cookie("EZIDEAS_C",false, {path: '/',expires: -1});
	$.cookie("EZIDEAS_C",false, {path: '/mobile/appdata/webtest',expires: -1});
	$.cookie("EZIDEAS_C", null);
	$.cookie("EZPERSONAL",false, {path: '/',expires: -1});
	$.cookie("EZPERSONAL",false, {path: '/mobile/appdata/webtest',expires: -1});
	$.cookie("EZPERSONAL", null);
	$.cookie("EZRUTASPLACES",false, {path: '/',expires: -1});
	$.cookie("EZRUTASPLACES",false, {path: '/mobile/appdata/webtest',expires: -1});
	$.cookie("EZRUTASPLACES", null);
	$.cookie("NUMDAYS",false, {path: '/',expires: -1});
	$.cookie("NUMDAYS",false, {path: '/mobile/appdata/webtest',expires: -1});
	$.cookie("NUMDAYS",false, {path: '/mobile/appdata',expires: -1});
	$.cookie("NUMDAYS", null);
}
/*$(window).load(function() {
	var stickyNavTop = $('#show_box2').offset().top;
	var stickyNav = function(){
		var scrollTop = $(window).scrollTop();
		if($("#div_plans_route").css("display") != "none"){
			if (scrollTop > stickyNavTop) { 
				$('#show_box2').css('position','fixed');
			} else {
				$('#show_box2').css('position','initial'); 
			}
		}
	};
	stickyNav();
	$(window).scroll(function() {
		stickyNav();
	});
});*/
function Showmemore(_div){
	$("#"+_div).slideToggle(0);
	
}
function resetdayarray(day){
	arg_mapconfig = mapcitypopup.mapconfig;
	var fullorder=$.cookie("EZFULLORDER_day"+day);
	var cookpl=$.cookie("EZMAPCITYPLACES_day"+day);
	if(fullorder && fullorder!=''){
		cookpl=fullorder;
	}
	idsnoroute=[];
	varnumenruta=0;
	var cookpl2=$.cookie("EZMAPCITYPLACES2_day"+day);
	if(cookpl2 && cookpl2!=''){
		idsnoroute=cookpl2.split(',');
	}
	var cooktr=$.cookie("EZTRANSPORT_day"+day);
	var cooktr_s=$.cookie("EZTRANSPORT_S_day"+day);
	var cooksr=$.cookie("EZSERVICES_day"+day);
	estediarutamarkers=[];
	if(cookpl && cookpl !=''){
		var coo=cookpl.split(',')
		for(c=0;c<coo.length;c++){
			if(coo[c].indexOf('t')<0 && coo[c].indexOf('s')<0){
				if(coo[c] > 40){
					for(mm=0;mm<arg_mapconfig.markers.length;mm++){
						var esdeestaciudad=false;
						if(arg_mapconfig.markers[mm].mk_id==coo[c]){
							var esdeestaciudad=true;
							arg_mapconfig.markers[mm].setVisible(true);
							arg_mapconfig.markers[mm].mk_type=1;
							_marker=arg_mapconfig.markers[mm];
							Plan_Bounds.extend(_marker.getPosition());
							var largonombre = _marker.title.length;
							if (largonombre > 30){
								var titulomarkador=_marker.title.substr(0,30)+'...'
							}
							else{
								var titulomarkador=_marker.title;
							}
							var noesruta=0;
							for(no=0;no<idsnoroute.length;no++){
								if(parseInt(coo[c])==parseInt(idsnoroute[no])){
									var noesruta=1;
								}							
							}
							_marker.genid = coo[c];
							if(noesruta==0){
								varnumenruta=varnumenruta+1;
								_marker.listpos = c;							
								_marker.setIcon('ezmapas/maps_pics/basic/'+varnumenruta+'.png');
								estediarutamarkers.push(_marker);							
								$("#div_route_"+day+"_"+coo[c]+" table").removeClass();
								$("#div_route_"+day+"_"+coo[c]+" table").addClass("table table_"+c);								
							}else{
								$("#div_route_"+day+"_"+coo[c]+" table").removeClass();
								$("#div_route_"+day+"_"+coo[c]+" table").addClass("table");
							}
						}
					}
					if(!esdeestaciudad){
						for(xx=0;xx<othercityarray.length;xx++){
							if(othercityarray[xx].mk_id==coo[c]){
								othercityarray[xx].setMap(mapcitypopup.mapconfig.google.map);
								othercityarray[xx].mk_type=1;
								_marker=othercityarray[xx];
								Plan_Bounds.extend(_marker.getPosition());
								var largonombre = _marker.title.length;
								if (largonombre > 30){
									var titulomarkador=_marker.title.substr(0,30)+'...'
								}
								else{
									var titulomarkador=_marker.title;
								}								
								var noesruta=0;
								for(no=0;no<idsnoroute.length;no++){
									if(parseInt(coo[c])==parseInt(idsnoroute[no])){
										var noesruta=1;
									}							
								}
								_marker.genid = coo[c];
								if(noesruta==0){
									varnumenruta=varnumenruta+1;
									_marker.setIcon('ezmapas/maps_pics/basic/'+varnumenruta+'.png');
									_marker.listpos = c;							
									estediarutamarkers.push(_marker);
									$("#div_route_"+day+"_"+coo[c]+" table").removeClass();
									$("#div_route_"+day+"_"+coo[c]+" table").addClass("table table_"+c);								
								}else{
									$("#div_route_"+day+"_"+coo[c]+" table").removeClass();
									$("#div_route_"+day+"_"+coo[c]+" table").addClass("table");
								}			
							}
						}
					}
				}
				if(coo[c] < 11){
					var cookieper=$.cookie("EZPERSONAL");
					var cookieper_=cookieper.split('!');
					var esteper=cookieper_[(coo[c]-1)].split('*');
					var estenom=esteper[0];
					var estecoors=esteper[1];
					var _marker=personalmrks[(coo[c]-1)]
					Plan_Bounds.extend(_marker.getPosition());
					_marker.mk_type=2;
					_marker.setVisible(true);
					_marker.setOptions({draggable: false});
					var noesruta=0;
					for(no=0;no<idsnoroute.length;no++){
						if(parseInt(coo[c])==parseInt(idsnoroute[no])){
							var noesruta=1;
						}							
					}
					_marker.genid = coo[c];
					if(noesruta==0){
						varnumenruta=varnumenruta+1;
						_marker.setIcon('ezmapas/maps_pics/basic/'+varnumenruta+'.png');
						_marker.listpos = c;				
						estediarutamarkers.push(_marker);
						$("#div_route_"+day+"_"+coo[c]+" table").removeClass();
						$("#div_route_"+day+"_"+coo[c]+" table").addClass("table table_"+c);								
					}else{
						$("#div_route_"+day+"_"+coo[c]+" table").removeClass();
						$("#div_route_"+day+"_"+coo[c]+" table").addClass("table");
					}
					
				}
				if(coo[c] > 10 && coo[c] <21){
					var este=(coo[c]-10);				
					var cookieper=$.cookie("EZPR_"+este);
					var cookieper_=cookieper.split('!');
					var estenom=cookieper_[0];
					for(pm=0;pm<personalroutesmarks.length;pm++){
						if(personalroutesmarks[pm].id==(coo[c]-10)){
							personalroutesmarks[pm].setVisible(true);
							personalroutespolylines[pm].setVisible(true);
							var _marker=personalroutesmarks[pm];
							}
					}
					Plan_Bounds.extend(_marker.getPosition());
							_marker.mk_type=3;
					var noesruta=0;
					for(no=0;no<idsnoroute.length;no++){
						if(parseInt(coo[c])==parseInt(idsnoroute[no])){
							var noesruta=1;
						}							
					}
					_marker.genid = coo[c];
					if(noesruta==0){
						varnumenruta=varnumenruta+1;
						_marker.setIcon('ezmapas/maps_pics/basic/'+varnumenruta+'.png');
						_marker.listpos = c;												
						estediarutamarkers.push(_marker);					
						$("#div_route_"+day+"_"+coo[c]+" table").removeClass();
						$("#div_route_"+day+"_"+coo[c]+" table").addClass("table table_"+c);								
					}else{
						$("#div_route_"+day+"_"+coo[c]+" table").removeClass();
						$("#div_route_"+day+"_"+coo[c]+" table").addClass("table");
					}
				}
				if(coo[c] >20 && coo[c] <31){
					var este=(coo[c]-21);
					ideasroutesmarks[este].setVisible(true);
					$.each(arrayideasr,function(index,value){
						if(arrayideasr[index].added_index==este && arrayideasr[index].added==1){
							arrayideasr[index].setVisible(true);
						}
					});
					//ideasroutespolylines[este].setVisible(true);
					
					var cookieideas=$.cookie("EZIDEAS_C").split('!');
					var esteideas=cookieideas[este].split('*');
					var estenom=esteideas[0];
					var estecolor='#'+esteideas[3];
					var _marker=ideasroutesmarks[este];
					Plan_Bounds.extend(_marker.getPosition());
					_marker.mk_type=4;
					_marker.id=coo[c];
					var noesruta=0;
					for(no=0;no<idsnoroute.length;no++){
						if(parseInt(coo[c])==parseInt(idsnoroute[no])){
							var noesruta=1;
						}							
					}
					_marker.genid = coo[c];
					if(noesruta==0){
						varnumenruta=varnumenruta+1;
						_marker.setIcon('ezmapas/maps_pics/basic/'+varnumenruta+'.png');
						_marker.listpos = c;						
						estediarutamarkers.push(_marker);						
						$("#div_route_"+day+"_"+coo[c]+" table").removeClass();
						$("#div_route_"+day+"_"+coo[c]+" table").addClass("table table_"+c);								
					}else{
						$("#div_route_"+day+"_"+coo[c]+" table").removeClass();
						$("#div_route_"+day+"_"+coo[c]+" table").addClass("table");
					}
				}
				if( typeof(arraymstuff) != undefined ){
					var contar_r=estediarutamarkers.length || 0;
					var contar_r=contar_r-1;
					$.each(arraymstuff, function(index,value){
						if(arraymstuff[index].msid==(coo[c])){
							var msid = arraymstuff[index].msid
							var noesruta=0;
							for(no=0;no<idsnoroute.length;no++){
								//console.log(idsnoroute[no]);
								if(msid==idsnoroute[no]){
									var noesruta=1;								
								}							
							}
							if(noesruta==0){
								contar_r=contar_r+1;
								arraymstuff[index].listpos = c;
								Plan_Bounds.extend(arraymstuff[index].getPosition());
								estediarutamarkers.push(arraymstuff[index]);
								$("#div_route_"+day+"_"+msid+" table").removeClass();
								$("#div_route_"+day+"_"+msid+" table").addClass("table table_"+c);	
							}else{
								$("#div_route_"+day+"_"+msid+" table").removeClass();
								$("#div_route_"+day+"_"+msid+" table").addClass("table");
							}
						}
					})
				}
				if( typeof(arraydeals) != undefined ){
					var contar_r=estediarutamarkers.length || 0;
					var contar_r=contar_r-1;
					$.each(arraydeals, function(index,value){
						if(arraydeals[index].did==(coo[c])){
							var did = arraydeals[index].did
							var noesruta=0;
							for(no=0;no<idsnoroute.length;no++){
								//console.log(idsnoroute[no]);
								if(did==idsnoroute[no]){
									var noesruta=1;								
								}							
							}
							if(noesruta==0){
								contar_r=contar_r+1;
								arraydeals[index].listpos = c;
								Plan_Bounds.extend(arraydeals[index].getPosition());
								estediarutamarkers.push(arraydeals[index]);
								$("#div_route_"+day+"_"+did+" table").removeClass();
								$("#div_route_"+day+"_"+did+" table").addClass("table table_"+c);	
							}else{
								$("#div_route_"+day+"_"+did+" table").removeClass();
								$("#div_route_"+day+"_"+did+" table").addClass("table");
							}
						}
					})
				}
			}
			else{
				if(coo[c].indexOf('t')>-1){
					var esteid=coo[c].replace('t','');
					var coo2=[];
					if(cooktr_s && cooktr_s !=''){var coo2=cooktr_s.split(',');}
					var stopes=[];
					traesdeestaciudad = false;
					$.each(arraydetransports,function(index,value){
						if(parseInt(arraydetransports[index].rid)===parseInt(esteid)){
							traesdeestaciudad = true;
							var noesruta=0;
							for(no=0;no<idsnoroute.length;no++){
								if(coo[c]==idsnoroute[no]){
									var noesruta=1;
								}							
							}						
							if(parseInt(arraydetransports[index].type)==1){
								for(st=0;st<arraydetransports[index].arraystops.length;st++){
									for(cs=0;cs<coo2.length;cs++){
										Plan_Bounds.extend(arraydetransports[index].arraystops[st].getPosition());
										if(parseInt(coo2[cs])==parseInt(arraydetransports[index].arraystops[st].id_)){
											stopes.push(arraydetransports[index].arraystops[st].nombre);
										}
									}
								}
							}
							else{
								Plan_Bounds.extend(arraydetransports[index].getPosition());
							}
							var stopsnames=stopes.join(', ');
							arraydetransports[index].mk_type=10;							
							if(stopsnames.length>40){var stopsnames=stopsnames.substring(0,36)+'...';}
							arraydetransports[index].genid = coo[c];
							if(noesruta==0){
								estediarutamarkers.push(arraydetransports[index]);
								arraydetransports[index].setVisible(true);
								arraydetransports[index].listpos = c;
								$("#div_route_"+day+"_"+coo[c]+" table").removeClass();
								$("#div_route_"+day+"_"+coo[c]+" table").addClass("table table_"+c);								
							}else{
								$("#div_route_"+day+"_"+coo[c]+" table").removeClass();
								$("#div_route_"+day+"_"+coo[c]+" table").addClass("table");
							}
						}
					});
					if(!traesdeestaciudad){
						for(index=0;index<otherarraytrans.length;index++){
							//console.log(otherarraytrans[index].rid);
							//console.log("listing");
							//if(otherarraytrans[xx].rid==coo[c]){
							if(parseInt(otherarraytrans[index].rid)===parseInt(esteid)){
								console.log("ths tra");
								var noesruta=0;
								for(no=0;no<idsnoroute.length;no++){
									if(coo[c]==idsnoroute[no]){
										var noesruta=1;
									}							
								}						
								if(parseInt(otherarraytrans[index].type)==1){
									for(st=0;st<otherarraytrans[index].arraystops.length;st++){
										for(cs=0;cs<coo2.length;cs++){
											Plan_Bounds.extend(otherarraytrans[index].arraystops[st].getPosition());
											if(parseInt(coo2[cs])==parseInt(otherarraytrans[index].arraystops[st].id_)){
												stopes.push(otherarraytrans[index].arraystops[st].nombre);
											}
										}
									}
								}
								else{
									Plan_Bounds.extend(otherarraytrans[index].getPosition());
								}
								var stopsnames=stopes.join(', ');
								otherarraytrans[index].mk_type=10;							
								if(stopsnames.length>40){var stopsnames=stopsnames.substring(0,36)+'...';}
								otherarraytrans[index].genid = coo[c];
								if(noesruta==0){
									estediarutamarkers.push(otherarraytrans[index]);
									otherarraytrans[index].setVisible(true);
									otherarraytrans[index].listpos = c;
									$("#div_route_"+day+"_"+coo[c]+" table").removeClass();
									$("#div_route_"+day+"_"+coo[c]+" table").addClass("table table_"+c);
								}else{
									$("#div_route_"+day+"_"+coo[c]+" table").removeClass();
									$("#div_route_"+day+"_"+coo[c]+" table").addClass("table");
								}
							}
						}
					}
				}
				if(coo[c].indexOf('s')>-1){
					console.log("serv no order");
					servesdeestaciudad = false;
					var esteid=coo[c].replace('s','');
					$.each(arraydeservices, function(index,value){
						if(parseInt(arraydeservices[index].sid)==parseInt(esteid)){
							servesdeestaciudad = true;					
							var noesruta=0;
							for(no=0;no<idsnoroute.length;no++){
								//console.log(idsnoroute[no]);
								if(coo[c]==idsnoroute[no]){
									var noesruta=1;
								}							
							}
							arraydeservices[index].genid = coo[c];
							if(noesruta==0){
								arraydeservices[index].setVisible(true);
								arraydeservices[index].mk_type=11;
								console.log(c);
								arraydeservices[index].listpos = c;										
								Plan_Bounds.extend(arraydeservices[index].getPosition());
								estediarutamarkers.push(arraydeservices[index]);
								$("#div_route_"+day+"_"+coo[c]+" table").removeClass();
								$("#div_route_"+day+"_"+coo[c]+" table").addClass("table table_"+c);	
							}else{
								$("#div_route_"+day+"_"+coo[c]+" table").removeClass();
								$("#div_route_"+day+"_"+coo[c]+" table").addClass("table");
							}
						}
					})
					if(!servesdeestaciudad){
						console.log("serv other");
						for(index=0;index<otherarrayserv.length;index++){
							//console.log(otherarrayserv[index].rid);
							//console.log("listing");
							//if(otherarrayserv[xx].rid==coo[c]){
							if(parseInt(otherarrayserv[index].sid)==parseInt(esteid)){
								var noesruta=0;
								for(no=0;no<idsnoroute.length;no++){
									//console.log(idsnoroute[no]);
									if(coo[c]==idsnoroute[no]){
										var noesruta=1;
									}							
								}
								otherarrayserv[index].genid = coo[c];
								if(noesruta==0){
									otherarrayserv[index].setVisible(true);
									otherarrayserv[index].mk_type=11;
									otherarrayserv[index].listpos = c;										
									Plan_Bounds.extend(otherarrayserv[index].getPosition());
									estediarutamarkers.push(otherarrayserv[index]);
									$("#div_route_"+day+"_"+coo[c]+" table").removeClass();
									$("#div_route_"+day+"_"+coo[c]+" table").addClass("table table_"+c);	
								}else{
									$("#div_route_"+day+"_"+coo[c]+" table").removeClass();
									$("#div_route_"+day+"_"+coo[c]+" table").addClass("table");
								}
							}
						}
					}
				}
			}
		}
	}
	if(!fullorder || fullorder==''){
		var contar_r=estediarutamarkers.length || 0;
		var contar_r=contar_r-1;
		if(cooktr && cooktr!=''){
			console.log("tra");
			var cotra=cooktr.split(',');
			var coo2=[];
			if(cooktr_s && cooktr_s !=''){var coo2=cooktr_s.split(',');}
			for(cc=0;cc<cotra.length;cc++){
				var contar_r=contar_r+1;
					var stopes=[];
				$.each(arraydetransports,function(index,value){				
					if(parseInt(arraydetransports[index].rid)===parseInt(cotra[cc])){
						var noesruta=0;
						for(no=0;no<idsnoroute.length;no++){
							if('t'+cotra[cc]==idsnoroute[no]){
								var noesruta=1;
							}							
						}					
						if(parseInt(arraydetransports[index].type)==1){
							for(st=0;st<arraydetransports[index].arraystops.length;st++){
								for(cs=0;cs<coo2.length;cs++){
									Plan_Bounds.extend(arraydetransports[index].arraystops[st].getPosition());
									if(parseInt(coo2[cs])==parseInt(arraydetransports[index].arraystops[st].id_)){
										stopes.push(arraydetransports[index].arraystops[st].nombre);
									}
								}
							}
						}
						else{
							Plan_Bounds.extend(arraydetransports[index].getPosition());
						}
						var stopsnames=stopes.join(', ');
						if(stopsnames.length>40){var stopsnames=stopsnames.substring(0,36)+'...';}
						arraydetransports[index].mk_type=10;					
						arraydetransports[index].genid = coo[c];
						console.log(noesruta);
						if(noesruta==0){
							console.log("add tra");
							arraydetransports[index].setVisible(true);
							arraydetransports[index].listpos = contar_r;
							estediarutamarkers.push(arraydetransports[index]);
							$("#div_route_"+day+"_t"+coo[c]+" table").addClass("table_"+c);
						}
					}
				});
				if(!traesdeestaciudad){
					//console.log(cotra[cc]+"other trans route");
					for(index=0;index<otherarraytrans.length;index++){
						//console.log(otherarraytrans[index].rid);
						//console.log("listing");
						//if(otherarraytrans[xx].rid==coo[c]){
						if(parseInt(otherarraytrans[index].rid)===parseInt(cotra[cc])){
							console.log("ths tra");
							//console.log("is in other trans route");
							var noesruta=0;
							for(no=0;no<idsnoroute.length;no++){
								if('t'+cotra[cc]==idsnoroute[no]){
									var noesruta=1;
								}							
							}					
							if(parseInt(otherarraytrans[index].type)==1){
								for(st=0;st<otherarraytrans[index].arraystops.length;st++){
									for(cs=0;cs<coo2.length;cs++){
										Plan_Bounds.extend(otherarraytrans[index].arraystops[st].getPosition());
										if(parseInt(coo2[cs])==parseInt(otherarraytrans[index].arraystops[st].id_)){
											stopes.push(otherarraytrans[index].arraystops[st].nombre);
										}
									}
								}
							}
							else{
								Plan_Bounds.extend(otherarraytrans[index].getPosition());
							}
							var stopsnames=stopes.join(', ');
							if(stopsnames.length>40){var stopsnames=stopsnames.substring(0,36)+'...';}
							otherarraytrans[index].mk_type=10;							
							otherarraytrans[index].genid = coo[c];
							if(noesruta==0){
								estediarutamarkers.push(otherarraytrans[index]);
								otherarraytrans[index].setVisible(true);
								otherarraytrans[index].listpos = contar_r;
								$("#div_route_"+day+"_t"+coo[c]+" table").addClass("table_"+c);								
							}
						}
					}
				}
			}
		}
		if(cooksr && cooksr !=''){
			console.log("serves")
			var coo=cooksr.split(',')
			for(c=0;c<coo.length;c++){
				servesdeestaciudad = false;
				var contar_r=contar_r+1;
				$.each(arraydeservices, function(index,value){					
					if(parseInt(arraydeservices[index].sid)==parseInt(coo[c])){
						servesdeestaciudad = true;
						var noesruta=0;
						for(no=0;no<idsnoroute.length;no++){
							//console.log(idsnoroute[no]);
							if('s'+coo[c]==idsnoroute[no]){
								var noesruta=1;								
							}							
						}
						arraydeservices[index].genid = coo[c];
						if(noesruta==0){
							arraydeservices[index].setVisible(true);
							arraydeservices[index].mk_type=11;
							arraydeservices[index].listpos = contar_r;
							Plan_Bounds.extend(arraydeservices[index].getPosition());
							estediarutamarkers.push(arraydeservices[index]);
							$("#div_route_"+day+"_s"+coo[c]+" table").addClass("table_"+contar_r);							
						}
					}
				})
				if(!servesdeestaciudad){
					console.log("serv other");
					for(index=0;index<otherarrayserv.length;index++){
						//console.log(otherarrayserv[index].rid);
						//console.log("listing");
						//if(otherarrayserv[xx].rid==coo[c]){
						if(parseInt(otherarrayserv[index].sid)==parseInt(coo[c])){
							var noesruta=0;
							for(no=0;no<idsnoroute.length;no++){
								//console.log(idsnoroute[no]);
								if('s'+coo[c]==idsnoroute[no]){
									var noesruta=1;									
								}							
							}
							otherarrayserv[index].genid = coo[c];
							if(noesruta==0){
								otherarrayserv[index].setVisible(true);
								otherarrayserv[index].mk_type=11;
								otherarrayserv[index].listpos = contar_r;
								Plan_Bounds.extend(otherarrayserv[index].getPosition());
								estediarutamarkers.push(otherarrayserv[index]);
								$("#div_route_"+day+"_s"+coo[c]+" table").addClass("table_"+contar_r);
							}
						}					
					}
				}
			}
		}
	}
	if($("#div_plans_route").is(':empty')){
		$("#div_plans_route").hide();
	}else{
		$("#div_plans_route").show();
	}
	if($("#div_plans_noroute").is(':empty')){
		$("#div_plans_noroute").hide();
	}else{
		$("#div_plans_noroute").show();
	}
}