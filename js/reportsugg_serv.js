// JavaScript Document
function Viewpending(){
	window.open('report_suggest_pendings.cfm','_blank')
}
function createnewcaptcha(){
	var url = "data_ajax/suggestions_ajax_content.cfm?rnu=5131616516651";
	var urlconfig = {action:'createcaptcha'};
	$("#captcha_nologin").load(url,urlconfig);
}
function validateterms(){
	var che=document.getElementById('cheagree').checked;
	if(che)
	{
		$('#buttonsend').attr("disabled",false);
	}
	else{
		$('#buttonsend').attr("disabled",true);
	}
}
function changesvcname(){
	var newname=document.getElementById('NAME').value;
	if(newname==''){return false;}
	SVCmarker.setTitle(newname);
}
function opentransfaq(){
			 if(rutaostops==0){var pagefaq='report_services_places';}
			 if(rutaostops==1){var pagefaq='report_services_rutas';}
			 if(rutaostops==2){var pagefaq='report_services_stops';}
		$('#myeztravel-faq').showLoading("Please Wait,<br/>Retriving Topics...<br/>",false);
		$('body').append('<div id="mask-faq" class="mask-faq"></div>');
		var _url = "data_ajax/faq_ajax_content.cfm?page="+pagefaq;
		var _urlconfig = {action:'Faq_index'};
	$('#myeztravel-faq').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){
		case "error":
		$('#myeztravel-faq').empty();alert("We are sorry, There aren't any help files in this page");
		break;
		case "success":
		$('#mask-faq').fadeIn(300);
		$('#myeztravel-faq').fadeIn(300);
		}
	});
}
function selstops(){
	if(cualruta==-1){alert('No route selected');return false;}
document.getElementById('control_place').style.backgroundColor='lightgray';
document.getElementById('control_route').src="https://lh3.googleusercontent.com/-IpnwTDPvKJ8/VEE9ewLerrI/AAAAAAANgqk/oj0a3G6Oes0/s53/route%2520b%2526w%2520small.png";

$('#divformcontent').hide();
$('#div_data_s').show();
$('#div_data_r').hide();
rutaostops=2;
document.getElementById('letrero_ros').innerHTML='Click or Drag the icons to edit stops';
for(r=0;r<arraySR_SRP.length;r++){
	for(s=0;s<arraySR_SRP[r].stops.length;s++){
		arraySR_SRP[r].stops[s].setMap(null);
	}
	for(m=0;m<arraySR_SRP[r].markers.length;m++){
		arraySR_SRP[r].markers[m].setMap(null);
	}
}
for(s=0;s<arraySR_SRP[cualruta].stops.length;s++){
	arraySR_SRP[cualruta].stops[s].setMap(map);
}
SVCmarker.setOptions({draggable: false});
}
function selplace(){
document.getElementById('control_place').style.backgroundColor='#17375E';
document.getElementById('control_route').src="https://lh3.googleusercontent.com/-IpnwTDPvKJ8/VEE9ewLerrI/AAAAAAANgqk/oj0a3G6Oes0/s53/route%2520b%2526w%2520small.png";

$('#divformcontent').show();
$('#div_data_s').hide();
$('#div_data_r').hide();
rutaostops=0;
document.getElementById('letrero_ros').innerHTML='Click or Drag the icon to edit service';
for(r=0;r<arraySR_SRP.length;r++){
	for(s=0;s<arraySR_SRP[r].stops.length;s++){
		arraySR_SRP[r].stops[s].setMap(null);
	}
	for(m=0;m<arraySR_SRP[r].markers.length;m++){
		arraySR_SRP[r].markers[m].setMap(null);
	}
}
SVCmarker.setOptions({draggable: true});
}
function selroute(){
document.getElementById('control_place').style.backgroundColor='none';
document.getElementById('control_route').src="https://lh3.googleusercontent.com/-uPG50w9EmkM/VEDXQ-LPnnI/AAAAAAANgqE/VvaMNuGpOac/s53/9.png";
$('#divformcontent').hide();
$('#div_data_s').hide();
$('#div_data_r').show();
rutaostops=1;
cualruta=-1;
document.getElementById('letrero_ros').innerHTML='Click or Drag the icons to edit route';
for(r=0;r<arraySR_SRP.length;r++){
	for(s=0;s<arraySR_SRP[r].stops.length;s++){
		arraySR_SRP[r].stops[s].setMap(null);
	}
	for(m=0;m<arraySR_SRP[r].markers.length;m++){
		arraySR_SRP[r].markers[m].setMap(null);
	}
}
updaterutas_SRP();
SVCmarker.setOptions({draggable: false});
}
function settomylocation_2(){
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var current_center = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
			if(!hayplace){CreatePlace(current_center);}
			else{
				SVCmarker.setPosition(current_center);
				map.setCenter(SVCmarker.getPosition());
				document.getElementById('placecoors').value=SVCmarker.getPosition().toString().replace(/ /g,'');
			}
		})
	}
	else if (google.gears) {
		var geo = google.gears.factory.create('beta.geolocation');
		geo.getCurrentPosition(function(position) {
			var current_center = new google.maps.LatLng(position.latitude,position.longitude);
			if(!hayplace){CreatePlace(current_center);}
			else{
				SVCmarker.setPosition(current_center);
				map.setCenter(SVCmarker.getPosition());
				document.getElementById('placecoors').value=SVCmarker.getPosition().toString().replace(/ /g,'');
			}
		}, function() {
			alert("Geolocation service failed.");
		});

	}
	else{
		alert("Browser doesn't support Geolocation");
		return false;
	}
}
 function Codeaddress() {
    var address = document.getElementById("addtoplace").value;
    if (geocoder) {
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
			var current_center=results[0].geometry.location;
			if(!hayplace){CreatePlace(current_center);}
			else{
				SVCmarker.setPosition(current_center);
				map.setCenter(SVCmarker.getPosition());
				document.getElementById('placecoors').value=SVCmarker.getPosition().toString().replace(/ /g,'');
			}
		}
		else{
			alert('Error geocoding address, please try again');
		}
	  })
	}
 }
function settomylocation(){
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var current_center = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
			SVCmarker.setPosition(current_center);
			map.setCenter(SVCmarker.getPosition());
			document.getElementById('placecoors').value=SVCmarker.getPosition().toString().replace(/ /g,'');
			$('#reset_place').show();
		})
	}
	else if (google.gears) {
		var geo = google.gears.factory.create('beta.geolocation');
		geo.getCurrentPosition(function(position) {
			var current_center = new google.maps.LatLng(position.latitude,position.longitude);
			SVCmarker.setPosition(current_center);
			map.setCenter(SVCmarker.getPosition());
			document.getElementById('placecoors').value=SVCmarker.getPosition().toString().replace(/ /g,'');
			$('#reset_place').show();
//			arg_map.setCenter(initialLocation);
		}, function() {
			alert("Geolocation service failed.");
		});

	}
	else{
		alert("Browser doesn't support Geolocation");
		return false;
	}
}
function resetplace(){
	SVCmarker.setPosition(originalcoors);
	map.setCenter(originalcoors);
	$('#reset_place').hide();
}
function removeroute(index){
	var conf=confirm("You are going to delete this route and all it's elements, are you sure??")
	if(!conf){return false;}
	if(index==cualruta){
		cualruta=-1;
	}
	else{
		if(cualruta>index){
			cualruta=cualruta-1;
		}
	}
	$('.newroute').show();
	for(x=0;x<arraySR_SRP[index].markers.length;x++){
		arraySR_SRP[index].markers[x].setMap(null);
	}
	arraySR_SRP[index].setMap(null);
	arraySR_SRP.splice(index,1);
	for(r=0;r<arraySR_SRP.length;r++){
		arraySR_SRP[r].index=r;
		if(r==0){
			var color='#FF00FF';
			var icon='https://lh6.googleusercontent.com/-8xxqF9thOCg/U9nRcchbb_I/AAAAAAANgBg/C77KoahO1Sc/s44/64.png';
		}
		if(r==1){
			var color='#00FFCC';
			var icon='https://lh3.googleusercontent.com/-Tx9ASyR-Pm0/U9nRcry7fQI/AAAAAAANgB4/S4-sPOCQyv4/s44/66.png';
		}
		if(r==2){
			var color='#6600CC';
			var icon='https://lh3.googleusercontent.com/-Y2nKnJNaweg/U9nRcP8BO4I/AAAAAAANgBc/nnLGfRYqBm8/s45/65.png';
		}
		arraySR_SRP[r].setOptions({strokeColor:color});
		arraySR_SRP[r].color=color;
		arraySR_SRP[r].icon=icon;
		for(m=0;m<arraySR_SRP[r].markers.length;m++){
			arraySR_SRP[r].markers[m].route=r
			arraySR_SRP[r].markers[m].infowindow = new google.maps.InfoWindow(
			{ content: '<input type="button" value="Remove" class="button-round-2" style="background-color:#C00;" onclick="deletemarker_r('+arraySR_SRP[r].markers[m].route+','+arraySR_SRP[r].markers[m].index+');"/>',
				size: new google.maps.Size(150,150)
			});
		}
		for(s=0;s<arraySR_SRP[r].stops.length;s++){
			arraySR_SRP[r].stops[s].setIcon(icon);
			arraySR_SRP[r].stops[s].route=r
				arraySR_SRP[r].stops[s].infowindow= new google.maps.InfoWindow(
				{ content: '<input placeholder="Name:" id="stopname" type="text" value="'+arraySR_SRP[r].stops[s].name+'"/><br/><input placeholder="Description:" id="stopdesc" type="text" value="'+arraySR_SRP[r].stops[s].desc+'"/><br/><input type="button" value="Update" class="button-round-2" style="background-color:rgb(23, 55, 94);" onclick="changestop_nd('+r+','+s+');">&nbsp;<input type="button" value="Remove" class="button-round-2" style="background-color:#C00;" onclick="deletestop('+r+','+s+');">',
				size: new google.maps.Size(400,400)
				});
		}
	}
	updaterutas_SRP();
}
function Reset_Route(index){
if(rutaostops==1){
	var conf=confirm('This will reset the route to the original state, are you sure?');
	if(!conf){return false;}
	for(m=0;m<arraySR_SRP[index].markers.length;m++){
		arraySR_SRP[index].markers[m].setMap(null);
	}
	arraySR_SRP[index].markers=[];
	arraySR_SRP[index].locations=[];
	arraySR_SRP[index].setPath(arraySR_SRP[index].locations);
}
else{
	var conf=confirm('This will reset the stops to the original state, are you sure?');
	if(!conf){return false;}
	for(s=0;s<arraySR_SRP[index].stops.length;s++){
		arraySR_SRP[index].stops[s].setMap(null);
	}
	arraySR_SRP[index].stops=[];
}
}
function createStopMarker(location,titulo,desc,inroute,index){
       var StopMarker = new google.maps.Marker();
	   StopMarker.desc=desc;
		var contar=(index+1)
        StopMarker.setOptions({
         icon: arraySR_SRP[inroute].icon,
		title: titulo,	
          draggable: true,
          map: map,
          position: location
        });
		StopMarker.inroute=inroute;
		StopMarker.index=index;
		StopMarker.desc=desc;
			StopMarker.infowindow= new google.maps.InfoWindow(
			{ content: '<input placeholder="Name:" type="text" id="namestp" value="'+titulo+'"/><br/><input placeholder="Description:" type="text" id="descstp" value="'+desc+'"/><br/><input type="button" value="Update" class="button-round-2" style="background-color:rgb(23, 55, 94);" onclick="changestop_nd('+StopMarker.inroute+','+StopMarker.index+');">&nbsp;<input type="button" value="Remove" class="button-round-2" style="background-color:#C00;" onclick="deletestop('+StopMarker.inroute+','+StopMarker.index+');">',
				size: new google.maps.Size(250,250)
			});
 		google.maps.event.addListener(StopMarker, 'click', function() { 
			for(y=0;y< arraySR_SRP[StopMarker.inroute].stops.length;y++){
			if ( arraySR_SRP[StopMarker.inroute].stops[y].index!=StopMarker.index){
			 arraySR_SRP[StopMarker.inroute].stops[y].infowindow.close(map,arraySR_SRP[StopMarker.inroute].stops[y]);
			}
			}
			StopMarker.infowindow= new google.maps.InfoWindow(
			{ content: '<input placeholder="Name:" type="text" id="namestp" value="'+StopMarker.getTitle()+'"/><br/><input type="text" id="descstp" placeholder="Description:" value="'+StopMarker.desc+'"/><br/><input type="button" value="Update" class="button-round-2" style="background-color:rgb(23, 55, 94);" onclick="changestop_nd('+StopMarker.inroute+','+StopMarker.index+');">&nbsp;<input type="button" value="Remove" class="button-round-2" style="background-color:#C00;" onclick="deletestop('+StopMarker.inroute+','+StopMarker.index+');">',
				size: new google.maps.Size(250,250)
			});
			StopMarker.infowindow.open(map,StopMarker);
		});
        return StopMarker;
      }
function changestop_nd(route,index){
modificastops=true;
var titulo=document.getElementById('namestp').value;
if(titulo==''){alert('Invalid name');return false;}
var desc=document.getElementById('descstp').value;
arraySR_SRP[route].stops[index].infowindow.close(map,arraySR_SRP[route].stops[index]);
arraySR_SRP[route].stops[index].infowindow= new google.maps.InfoWindow(
			{ content: '<input placeholder="Name:" type="text" id="namestp" value="'+titulo+'"/><br/><input placeholder="Description:" type="text" id="descstp" value="'+desc+'"/><br/><input type="button" value="Update" class="button-round-2" style="background-color:rgb(23, 55, 94);" onclick="changestop_nd('+route+','+index+');">&nbsp;<input type="button" value="Remove" class="button-round-2" style="background-color:#C00;" onclick="deletestop('+route+','+index+');">',
				size: new google.maps.Size(250,250)
			});
arraySR_SRP[route].stops[index].desc=desc;
arraySR_SRP[route].stops[index].setTitle(titulo);
}
function deletestop(route,index){
	arraySR_SRP[route].stops[index].infowindow.close(map,arraySR_SRP[route].stops[index]);
	arraySR_SRP[route].stops[index].setMap(null);
	arraySR_SRP[route].stops.splice(index,1);
	for(s=0;s<arraySR_SRP[route].stops.length;s++){
		arraySR_SRP[route].stops[s].index=s;
	}
}

function createLocationMarker_RP(location,index){
       var locationMarker = new google.maps.Marker();
        locationMarker.setOptions({
          icon: 'https://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png',
          draggable: true,
          map: map,
          position: location
        });
		locationMarker.route=index;
		arraySR_SRP[index].bounds.extend(location);
		//locationMarker.index=arraySR_RP[index].markers.length;
		if(arraySR_SRP[index].direction==1){
			locationMarker.index=arraySR_SRP[index].markers.length;
			locationMarker.infowindow = new google.maps.InfoWindow(
				{ content: '<input type="button" value="Remove" class="button-round-2" style="background-color:#C00;" onclick="deletemarker_r('+locationMarker.route+','+locationMarker.index+');"/>',
				size: new google.maps.Size(150,150)
			});
			arraySR_SRP[index].markers.push(locationMarker);
			arraySR_SRP[index].locations.push(location);
		}
		else{
			locationMarker.index=0;
			locationMarker.infowindow = new google.maps.InfoWindow(
				{ content: '<input type="button" value="Remove" class="button-round-2" style="background-color:#C00;" onclick="deletemarker_r('+locationMarker.route+',0);"/>',
				size: new google.maps.Size(150,150)
			});
			arraySR_SRP[index].markers.splice(0,0,locationMarker);
			arraySR_SRP[index].locations.splice(0,0,location);
			for(m=1;m<arraySR_SRP[index].markers.length;m++){
				arraySR_SRP[index].markers[m].index=m;
				arraySR_SRP[index].markers[m].infowindow=new google.maps.InfoWindow(
				{ content: '<input type="button" value="Remove" class="button-round-2" style="background-color:#C00;" onclick="deletemarker_r('+index+','+m+');"/>',
				size: new google.maps.Size(150,150)
			});
			}
		}
		arraySR_SRP[index].setPath(arraySR_SRP[index].locations);
if(arraySR_SRP[index].locations.length>=2){map.fitBounds(arraySR_SRP[index].bounds);}
			google.maps.event.addListener(locationMarker, 'click', function() {
				locationMarker.infowindow.open(map,locationMarker);
			});
       google.maps.event.addListener(locationMarker, "dragend", function() {
            var nLatLng = locationMarker.getPosition();
            var modifiedLocation = nLatLng;
            arraySR_SRP[index].locations[locationMarker.index] = modifiedLocation;
			arraySR_SRP[index].setPath(arraySR_SRP[index].locations);
			modificaruta=true;
			arraySR_SRP[index].bounds=new google.maps.LatLngBounds();
			arraySR_SRP[index].bounds.extend(SVCmarker.getPosition());
			for(x=0;x<arraySR_SRP[index].locations.length;x++){
				arraySR_SRP[index].bounds.extend(arraySR_SRP[index].locations[x]);
			}
if(arraySR_SRP[index].locations.length>=2){map.fitBounds(arraySR_SRP[index].bounds);}
        });

        return locationMarker;
      }
function deletemarker_r(route,index){
	arraySR_SRP[route].markers[index].setMap(null);
	arraySR_SRP[route].markers.splice(index,1);
	arraySR_SRP[route].locations.splice(index,1);
	arraySR_SRP[route].setPath(arraySR_SRP[route].locations);
	for(m=0;m<arraySR_SRP[route].markers.length;m++){
		arraySR_SRP[route].markers[m].index=m;
		arraySR_SRP[route].markers[m].infowindow = new google.maps.InfoWindow(
			{ content: '<input type="button" value="Remove" class="button-round-2" style="background-color:#C00;" onclick="deletemarker_r('+arraySR_SRP[route].markers[m].route+','+arraySR_SRP[route].markers[m].index+');"/>',
				size: new google.maps.Size(150,150)
			});
	}
	arraySR_SRP[route].bounds=new google.maps.LatLngBounds();
	arraySR_SRP[route].bounds.extend(SVCmarker.getPosition());
	for(x=0;x<arraySR_SRP[route].locations.length;x++){
		arraySR_SRP[route].bounds.extend(arraySR_SRP[route].locations[x]);
	}
	if(arraySR_SRP[route].locations.length>=2){map.fitBounds(arraySR_SRP[route].bounds);}
}
function updaterutas_SRP(){
$('#div_data_r2').empty();
$('#div_data_s2').empty();
var texto='';
for(x=0;x<arraySR_SRP.length;x++){
	var visible='none';
	if(x==cualruta){
		var visible='block';
	}
var imgdir='https://lh3.googleusercontent.com/-qrnDeaWgEQQ/VTqVNrMCWpI/AAAAAAANhYE/Q3yDCYDKwiU/s45/lado%25201.png';
if(arraySR_SRP[x].direction==2)
{
var imgdir='https://lh3.googleusercontent.com/-F2okjA-0vfw/VTqY10fI9uI/AAAAAAANhYQ/SuL705uuREI/s45/lado%25202.png';}

var texto=texto+'<div id="RP_sr_'+x+'"><table><tr><td onclick="setactualroute_SRP('+x+');"><input type="text" id="routename_'+x+'" style="font-weight:bold;color:'+arraySR_SRP[x].color+';" value="'+arraySR_SRP[x].name+'" onchange="changeroutename(this.value,'+x+');"/>&nbsp;</td><td onclick="setactualroute_SRP('+x+');"><img style="width: 35px; height:35px;" src="'+imgdir+'" onclick="changeroutedirection('+x+');"/></td><td onclick="setactualroute_SRP('+x+');"><img  widht="35px" height="35px" id="control_stops" onclick="selstops();" src="https://lh5.googleusercontent.com/-dw-HxABt9TY/VEDXP0utKBI/AAAAAAANgp0/oSLoN9fjBzc/s60/6.png" style="background-color: rgb(23, 55, 94);"></td><td onclick="setactualroute_SRP('+x+');"><img src="https://lh4.googleusercontent.com/-_azh1IzUzH8/VEDXP-fY7qI/AAAAAAANgqI/eA7XL4KAW9o/s52/7.png" onclick="Reset_Route('+x+');" id="RP_but_'+x+'" style="width: 35px; height:35px;"></td><td><img src="https://lh4.googleusercontent.com/-J8QLIopkdW4/VOdmvVtfapI/AAAAAAANhJA/FcImfqWSudY/s46/basura3.png" onclick="removeroute('+x+');" style="width: 35px; height:35px;"/></td></tr></table></div>';
}





$('#div_data_r2').append(texto);
setactualroute_SRP(cualruta);	
}
function changeroutedirection(index){
	var dir=arraySR_SRP[index].direction;
	if(dir==1){arraySR_SRP[index].direction=2;}
	else{arraySR_SRP[index].direction=1;}
	updaterutas_SRP();
}
function changeroutename(name,index){
	arraySR_SRP[index].name=name
}
function setactualroute_SRP(index){
cualruta=index;
for(a=0;a<arraySR_SRP.length;a++){
if(a==index){
	if(rutaostops==1){
		for(m=0;m<arraySR_SRP[a].markers.length;m++){
			arraySR_SRP[a].markers[m].setMap(map);
		}
	}
	if(rutaostops==2){
		for(s=0;s<arraySR_SRP[a].stops.length;s++){
			arraySR_SRP[a].stops[s].setMap(map);
		}
	}
$('#RP_imgact_'+a).show();
document.getElementById('RP_but_'+a).style.backgroundColor='none';
if(arraySR_SRP[a].locations.length>=2){map.fitBounds(arraySR_SRP[a].bounds);}
var text='<table><tr><td><span style=" font-weight:bolder;color:'+arraySR_SRP[a].color+';">'+arraySR_SRP[a].name+' | stops</span></td><td><img widht="35px" height="35px" onclick="Reset_Route('+cualruta+');" src="https://lh4.googleusercontent.com/-_azh1IzUzH8/VEDXP-fY7qI/AAAAAAANgqI/eA7XL4KAW9o/s52/7.png"></td></tr></table>';





$('#div_data_s2').html(text);
}
else{
	 for(m=0;m<arraySR_SRP[a].markers.length;m++){
		 arraySR_SRP[a].markers[m].setMap(null);
	 }
	 for(s=0;s<arraySR_SRP[a].stops.length;s++){
		 arraySR_SRP[a].stops[s].setMap(null);
	 }
$('#RP_imgact_'+a).hide();
document.getElementById('RP_but_'+a).style.backgroundColor='none';
}
}	
}
function createnewroute_SRP(){
	if(arraySR_SRP.length==0){
		var color='#FF00FF';
		var icon='https://lh6.googleusercontent.com/-8xxqF9thOCg/U9nRcchbb_I/AAAAAAANgBg/C77KoahO1Sc/s44/64.png';
		var num=1;
	}
	else if(arraySR_SRP.length==1){
		var color='#00FFCC';
		var icon='https://lh3.googleusercontent.com/-Tx9ASyR-Pm0/U9nRcry7fQI/AAAAAAANgB4/S4-sPOCQyv4/s44/66.png';
		var num=2;
	}
	else{
		var color='#6600CC';
		var icon='https://lh3.googleusercontent.com/-Y2nKnJNaweg/U9nRcP8BO4I/AAAAAAANgBc/nnLGfRYqBm8/s45/65.png';
		var num=3;
	}
	var name=prompt("Route's Name","Route "+num) || '';
	if(name==''){alert('Invalid Name');return false;}
      var latlngsRP = new google.maps.MVCArray();
	  var polylineRP = new google.maps.Polyline({
        path: latlngsRP
        , map: map
        , strokeColor: color
        , strokeWeight: 7
        , strokeOpacity: 0.5
    });
	  polylineRP.locations = [];
	  polylineRP.name=name;
	  polylineRP.markers = [];
	  polylineRP.color=color;
	  polylineRP.stops=[];
	  polylineRP.icon=icon;
	  polylineRP.direction=1;
	  polylineRP.bounds=new google.maps.LatLngBounds();
	  var index=arraySR_SRP.length;
	  polylineRP.index=index;
	  if(index==2){$('#buttaddroute').hide();}
	  arraySR_SRP.push(polylineRP);
 		google.maps.event.addListener(polylineRP, 'click', function() { 
			setactualroute_SRP(polylineRP.index);
	});
	cualruta=index;
	updaterutas_SRP()
	return polylineRP;
	polylineRP.bounds.extend(SVCmarker.getPosition());
}
		function addnewimg(){
			imgcants=imgcants+1;
			imgcants2=imgcants2+1;
			if(imgcants==10){$('#linkaddimg').hide();}
			if(uploadimg==2){
				var text='<div id="imgup_'+imgcants2+'"><table><tr><td><input id="img_link_'+imgcants2+'" class="img_link" type="text" value="" onchange="addpreviewimg('+imgcants2+');"/></td><td class="previewimg_'+imgcants2+'"></td><td><img src="https://lh5.googleusercontent.com/-Cb5dhSGmMSA/U5I5STA1muI/AAAAAAANfGk/1rOXlx8756Q/s52/Untitled8.png" height="25" onclick="deleteimg('+imgcants2+');"></td></tr></div>';
			}
			if(uploadimg==1){
				imgtoupload.push(imgcants2);
				var text='<div id="imgup_'+imgcants2+'"><table><tr><td><input id="upload_f_'+imgcants2+'" name="upload_f_'+imgcants2+'" type="file" onchange="readURL('+imgcants2+');"/><input type="hidden" id="upload_n_'+imgcants2+'" name="upload_n_'+imgcants2+'" value=""></td><td><img src="http://www.myezplan.com/ezmapas/maps_pics/7553404376376420_dc.png" id="uploadPreview_'+imgcants2+'" style="width: 50px; height: 50px;" /></td><td><img src="https://lh5.googleusercontent.com/-Cb5dhSGmMSA/U5I5STA1muI/AAAAAAANfGk/1rOXlx8756Q/s52/Untitled8.png" height="25" onclick="deleteimg('+imgcants2+');"></td></tr></div>';
			}
			$('#imglinks').append(text);;
		}
		function addpreviewimg(cual){
			var imgsrc=document.getElementById('img_link_'+cual).value;
			var img='';
			if(imgsrc!=''){var img='<img src="'+imgsrc+'" height="50px" width="50px"/>';}
			$('.previewimg_'+cual).html(img);
		}
		function readURL(cual) {
			var oFReader = new FileReader();
			oFReader.readAsDataURL(document.getElementById('upload_f_'+cual).files[0]);
			oFReader.onload = function (oFREvent) {
				document.getElementById("uploadPreview_"+cual).src = oFREvent.target.result;
				document.getElementById('upload_n_'+cual).value=document.getElementById('upload_f_'+cual).value;
			};
    }
		
		function deleteimg(cual){
			var imgtoupload2=[];
			for(i=0;i<imgtoupload.length;i++){
				if(imgtoupload[i]!=cual){imgtoupload2.push(imgtoupload[i]);}
			}
			imgtoupload=imgtoupload2;
			$('#linkaddimg').show();
			$('#imgup_'+cual).remove();
			imgcants=imgcants-1;
			document.getElementById('img_toupload').value=imgtoupload.join(',');
		}
		function add_rprice(){
				var value=document.getElementById('selde_rprice').value;
				if(value==''){return false;}
				var texto=document.getElementById('detail_regularprice').value;
				var espacio=' ';
				if(texto==''){var espacio='';}
				var texto=texto+espacio+value;
				document.getElementById('detail_regularprice').value=texto;
		}
		function add_hours(){
				var value=document.getElementById('selde_hours').value;
				if(value==''){return false;}
				var texto=document.getElementById('detail_hoursoperation').value;
				var espacio=' ';
				if(texto==''){var espacio='';}
				var texto=texto+espacio+value;
				document.getElementById('detail_hoursoperation').value=texto;
		}
			function add_tips(){
				var value=document.getElementById('selde_tips').value;
				if(value==''){return false;}
				var texto=document.getElementById('detail_tips').value;
				var espacio=' ';
				if(texto==''){var espacio='';}
				var texto=texto+espacio+value;
				document.getElementById('detail_tips').value=texto;
			}
			function add_duration(){
				var value=document.getElementById('selde_duration').value;
				if(value==''){return false;}
				var texto=document.getElementById('detail_duration').value;
				var espacio=' ';
				if(texto==''){var espacio='';}
				var texto=texto+espacio+value;
				document.getElementById('detail_duration').value=texto;
			}
			function add_activities(){
				var value=document.getElementById('selde_activities').value;
				if(value==''){return false;}
				var texto=document.getElementById('detail_activities').value;
				var espacio=' ';
				if(texto==''){var espacio='';}
				var texto=texto+espacio+value;
				document.getElementById('detail_activities').value=texto;
			}
		
		function addnewevent(){
			cuentaeventos=cuentaeventos+1
			if(cuentaeventos==9){$('#buttnewevent').hide();}
			var text='<tr id="trdeevento'+cuentaeventos+'"><td><table><tr><td><input type="text" id="fechai_'+cuentaeventos+'" name="fechai_'+cuentaeventos+'" /></td><td>&nbsp;</td><td><input type="text" id="fechaf_'+cuentaeventos+'" name="fechaf_'+cuentaeventos+'" /></td><td>&nbsp;</td><td><img src="https://lh5.googleusercontent.com/-Cb5dhSGmMSA/U5I5STA1muI/AAAAAAANfGk/1rOXlx8756Q/s52/Untitled8.png" height="25" onclick="deleteevent('+cuentaeventos+');"></td></td></tr><tr><td colspan="5" align="center"><textarea id="w_text_'+cuentaeventos+'" name="w_text_'+cuentaeventos+'" style="margin: 0px; width: 100%; height: 35px;"></textarea></td></tr></table></tr>';
			$('#listadeeventos').append(text);
		$('#fechai_'+cuentaeventos).datepicker();
		$('#fechaf_'+cuentaeventos).datepicker();
		}
		function deleteevent(index){
			var fechai=[];
			var fechaf=[];
			var textos=[];
			for(c=0;c<=cuentaeventos;c++){
				if(index!=c){
					fechai.push(document.getElementById('fechai_'+c).value);
					fechaf.push(document.getElementById('fechaf_'+c).value);
					textos.push(document.getElementById('w_text_'+c).value);
				}
			}
			cuentaeventos=cuentaeventos-1
			$('#buttnewevent').show();
			$('#listadeeventos').empty();
			for(c=0;c<=cuentaeventos;c++){
			var text='<tr id="trdeevento'+c+'"><td><table><tr><td><input type="text" id="fechai_'+c+'" name="fechai_'+c+'" value="'+fechai[c]+'" /></td><td>&nbsp;</td><td><input type="text" id="fechaf_'+c+'" name="fechaf_'+c+'" value="'+fechaf[c]+'"/></td><td>&nbsp;</td><td><img src="https://lh5.googleusercontent.com/-Cb5dhSGmMSA/U5I5STA1muI/AAAAAAANfGk/1rOXlx8756Q/s52/Untitled8.png" height="25" onclick="deleteevent('+c+');"></td></td></tr><tr><td colspan="5" align="center"><textarea id="w_text_'+c+'" name="w_text_'+c+'" style="margin: 0px; width: 100%; height: 35px;">'+textos[c]+'</textarea></td></tr></table></tr>';
			$('#listadeeventos').append(text);
		$('#fechai_'+c).datepicker();
		$('#fechaf_'+c).datepicker();
			}			
		}
			function add_coments(){
				var value=document.getElementById('selde_comment').value;
				if(value==''){return false;}
				var texto=document.getElementById('detail_comment').value;
				var espacio=' ';
				if(texto==''){var espacio='';}
				var texto=texto+espacio+value;
				document.getElementById('detail_comment').value=texto;
			}					