PadreReport="";
    linkscant=0; 
	uploadimg=1;
	imgcants=0;
	imgcants2=0;
	imgtoupload=[];
         $(PadreReport+".addimg").click(function(){
			  if (uploadimg==1){
				 uploadimg=2;
				 $(PadreReport+'#imgfile').css("background-color", "lightgray")
				 $(PadreReport+'#imglink').css("background-color", "#17375E");
			 }else{
				 uploadimg=1;
				 $(PadreReport+'#imglink').css("background-color", "lightgray")
				 $(PadreReport+'#imgfile').css("background-color", "#17375E");
				 }	  
        });	
	adv_sugg = 1
         $(PadreReport+".showadv_opt").click(function(){
			 $(PadreReport+"#adv_options").slideToggle(250);
			  if (adv_sugg==0){
				 adv_sugg=1;
				 $(this).css("background-color", "lightgray")
			 }else{
				 adv_sugg=0;
				 $(this).css("background-color", "#17375E");
				 }	  
        });
		 isroute=0;

		 $(PadreReport+".is_route").click(function(){
			if (isroute==1){
				 isroute=0;
				 actualroute_RP=-1;
				  $(PadreReport+'#ismap').val(0);
				 $(this).css("background-color", "lightgray");
				 $(PadreReport+"#mapareport_controls").hide();
				 control_place();
				$(PadreReport+'#div_data_r2').hide();
				$(PadreReport+'#spanrutanamestops').html('');
				$(PadreReport+'.newroute').show();
				for(r=0;r<arraySR_RP.length;r++)
				{
					arraySR_RP[r].setMap(null);
					for(m=0;m<arraySR_RP[r].markers.length;m++){
						arraySR_RP[r].markers[m].setMap(null);
					}
					for(s=0;s<arraySR_RP[r].stops.length;r++){
						arraySR_RP[r].stops[s].setMap(null);
					}
				}
				
				
				
if($(PadreReport+'#control_place').attr("src")=="https://lh3.googleusercontent.com/-uPG50w9EmkM/VEDXQ-LPnnI/AAAAAAANgqE/VvaMNuGpOac/s53/9.png"){control_place_RP();}								 
			}else{
				 isroute=1;
				 $(PadreReport+'#ismap').val(1);
				 $(this).css("background","rgb(23, 55, 94)");
				 
				
				 $(PadreReport+"#mapareport_controls").show();
			}	  
        });

$(PadreReport+".inputbox").click(function(){
$(PadreReport+'.ocultar').hide();
var toshowrp=$(this).data('toshowrp');
if(toshowrp && toshowrp != ''){$(PadreReport+'.'+toshowrp).show();}});

function validateterms_RP2(){
var che=$(PadreReport+'#cheagree').prop("checked");
if(che){$(PadreReport+'#buttonsend').prop("disabled",false);}
else{$(PadreReport+'#buttonsend').prop("disabled",true);}
}

function settomylocation(){
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var current_center = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
			usermarker.setPosition(current_center);
			map.setCenter(usermarker.getPosition());
			$(PadreReport+'#reset_place').show();
		})
	}
	else if (google.gears) {
		var geo = google.gears.factory.create('beta.geolocation');
		geo.getCurrentPosition(function(position) {
			var current_center = new google.maps.LatLng(position.latitude,position.longitude);
			usermarker.setPosition(current_center);
			map.setCenter(usermarker.getPosition());
			$(PadreReport+'#reset_place').show();

		}, function() {
			alert("Geolocation service failed.");
		});

	}
	else{
		alert("Browser doesn't support Geolocation");
		return false;
	}


}
function removeroute(index){
	
	
	var conf=confirm("You are going to delete this route and all it's elements, are you sure??")
	if(!conf){return false;}
	
	if(index==actualroute_RP){actualroute_RP=-1;}else{actualroute_RP=actualroute_RP-1;}
	
	$(PadreReport+'.newroute').show();
	
	for(x=0;x<arraySR_RP[index].markers.length;x++){
		
		arraySR_RP[index].markers[x].setMap(null);
	}
	arraySR_RP[index].setMap(null);
	arraySR_RP.splice(index,1);
	for(r=0;r<arraySR_RP.length;r++){
		arraySR_RP[r].index=r;
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
		arraySR_RP[r].setOptions({strokeColor:color});
		arraySR_RP[r].color=color;
		arraySR_RP[r].icon=icon;
		for(m=0;m<arraySR_RP[r].markers.length;m++)
		{
			arraySR_RP[r].markers[m].route=r;
			
			arraySR_RP[r].markers[m].infowindow = new google.maps.InfoWindow(
			{ content: '<input type="button" value="Remove" onclick="deletemarker_r('+arraySR_RP[r].markers[m].route+','+arraySR_RP[r].markers[m].index+');"/>',
				size: new google.maps.Size(150,150)
			});
			
			
		}
		for(s=0;s<arraySR_RP[r].stops.length;s++){
			arraySR_RP[r].stops[s].setIcon(icon);
			arraySR_RP[r].stops[s].route=r
			if(arraySR_RP[r].stops[s].placeid==0){
				arraySR_RP[r].stops[s].infowindow= new google.maps.InfoWindow(
				{ content: '<input id="stopname" placeholder="Name" type="text" value="'+arraySR_RP[r].stops[s].name+'"/><br/><input placeholder="Description" id="stopdesc" type="text" value="'+arraySR_RP[r].stops[s].desc+'"/><br/><input type="button" value="Update" onclick="changestop_nd('+r+','+s+');">&nbsp;<input type="button" value="Remove" onclick="deletestop('+r+','+s+');">',
				size: new google.maps.Size(400,400)
				});
			}
			else{
				arraySR_RP[r].stops[s].infowindow= new google.maps.InfoWindow(
				{ content: 'Name: '+arraySR_RP[r].stops[s].name+'<br/><input type="button" value="Info" onclick="ShowInfo_RP('+arraySR_RP[r].stops[s].placeid+');"/>&nbsp;<input type="button" value="Remove" onclick="deletestop('+r+','+s+');"/>',
				size: new google.maps.Size(400,400)
				});
			}
		}
	}
	updaterutas_RP();
}
function createsubroute_rp(id,color,name, icon){
	
      var latlngsRP = new google.maps.MVCArray();
	  var polylineRP = new google.maps.Polyline({
        path: latlngsRP
        , map: map
        , strokeColor: color
        , strokeWeight: 7
        , strokeOpacity: 0.5
    });
	  polylineRP.locations_o = [];
	  polylineRP.locations = [];
	  polylineRP.name=name;
	  polylineRP.markers = [];
	  polylineRP.rid=id;
	  polylineRP.color=color;
	  polylineRP.stops=[];
	  polylineRP.stops_o=[];
	  polylineRP.ids=[];
	  polylineRP.icon=icon;
	  polylineRP.direction=1;
	  polylineRP.bounds=new google.maps.LatLngBounds();
var index=arraySR_RP.length;
polylineRP.index=index;

if(index==2){$(PadreReport+'#buttaddroute').hide();}
arraySR_RP.push(polylineRP);

google.maps.event.addListener(polylineRP, 'click', function() {setactualroute_RP(polylineRP.index);});

updaterutas_RP();
return polylineRP;
}
function createnewroute_RP(){
modificaruta=true;
if(arraySR_RP.length==0){
var color='#FF00FF';
var icon='https://lh6.googleusercontent.com/-8xxqF9thOCg/U9nRcchbb_I/AAAAAAANgBg/C77KoahO1Sc/s44/64.png';
var num=1;
}
else if(arraySR_RP.length==1){
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
polyline=createsubroute_rp(0,color,name,icon);
polyline.bounds.extend(usermarker.getPosition());
setactualroute_RP(num-1);
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
		arraySR_RP[index].bounds.extend(location);
		//locationMarker.index=arraySR_RP[index].markers.length;
		if(arraySR_RP[index].direction==1){
			locationMarker.index=arraySR_RP[index].markers.length;
			locationMarker.infowindow = new google.maps.InfoWindow(
				{ content: '<input type="button" value="Remove" onclick="deletemarker_r('+locationMarker.route+','+locationMarker.index+');"/>',
				size: new google.maps.Size(150,150)
			});
			arraySR_RP[index].markers.push(locationMarker);
			arraySR_RP[index].locations.push(location);
		}
		else{
			locationMarker.index=0;
			locationMarker.infowindow = new google.maps.InfoWindow(
				{ content: '<input type="button" value="Remove" onclick="deletemarker_r('+locationMarker.route+',0);"/>',
				size: new google.maps.Size(150,150)
			});
			arraySR_RP[index].markers.splice(0,0,locationMarker);
			
			arraySR_RP[index].locations.splice(0,0,location);
			for(m=1;m<arraySR_RP[index].markers.length;m++){
				arraySR_RP[index].markers[m].index=m;
				arraySR_RP[index].markers[m].infowindow=new google.maps.InfoWindow(
				{ content: '<input type="button" value="Remove" onclick="deletemarker_r('+index+','+m+');"/>',
				size: new google.maps.Size(150,150)
			});
			}
		}
		arraySR_RP[index].setPath(arraySR_RP[index].locations);
if(arraySR_RP[index].locations.length>=2){map.fitBounds(arraySR_RP[index].bounds);}
			google.maps.event.addListener(locationMarker, 'click', function() {
				locationMarker.infowindow.open(map,locationMarker);
			});
       google.maps.event.addListener(locationMarker, "dragend", function() {
            var nLatLng = locationMarker.getPosition();
            var modifiedLocation = nLatLng;
            arraySR_RP[index].locations[locationMarker.index] = modifiedLocation;
			arraySR_RP[index].setPath(arraySR_RP[index].locations);
			modificaruta=true;
			arraySR_RP[index].bounds=new google.maps.LatLngBounds();
			arraySR_RP[index].bounds.extend(usermarker.getPosition());
			for(x=0;x<arraySR_RP[index].locations.length;x++){
				arraySR_RP[index].bounds.extend(arraySR_RP[index].locations[x]);
			}
if(arraySR_RP[index].locations.length>=2){map.fitBounds(arraySR_RP[index].bounds);}
        });

        return locationMarker;
      }
function deletemarker_r(route,index){
	arraySR_RP[route].markers[index].setMap(null);
	arraySR_RP[route].markers.splice(index,1);
	arraySR_RP[route].locations.splice(index,1);
	arraySR_RP[route].setPath(arraySR_RP[route].locations);
	for(m=0;m<arraySR_RP[route].markers.length;m++){
		arraySR_RP[route].markers[m].index=m;
		arraySR_RP[route].markers[m].infowindow = new google.maps.InfoWindow(
			{ content: '<input type="button" value="Remove" onclick="deletemarker_r('+arraySR_RP[route].markers[m].route+','+arraySR_RP[route].markers[m].index+');"/>',
				size: new google.maps.Size(150,150)
			});
	}
	arraySR_RP[route].bounds=new google.maps.LatLngBounds();
	arraySR_RP[route].bounds.extend(usermarker.getPosition());
	for(x=0;x<arraySR_RP[route].locations.length;x++){
		arraySR_RP[route].bounds.extend(arraySR_RP[route].locations[x]);
	}
	if(arraySR_RP[route].locations.length>=2){map.fitBounds(arraySR_RP[route].bounds);}
	
if(arraySR_RP[route].markers.length>0){$(PadreReport+'#RP_but_'+route).show();}	else{$(PadreReport+'#RP_but_'+route).hide();}
}
function updaterutas_RP(){
$(PadreReport+'#div_data_r2').empty();
$(PadreReport+'#div_data_s2').empty();
var texto='<table>';
for(x=0;x<arraySR_RP.length;x++){
	var visible='none';
	if(x==actualroute_RP){
		var visible='block';
	}
	var imgdir='https://lh3.googleusercontent.com/-qrnDeaWgEQQ/VTqVNrMCWpI/AAAAAAANhYE/Q3yDCYDKwiU/s45/lado%25201.png';
		if(arraySR_RP[x].direction==2){var imgdir='https://lh3.googleusercontent.com/-F2okjA-0vfw/VTqY10fI9uI/AAAAAAANhYQ/SuL705uuREI/s45/lado%25202.png';}

texto+='<tr id="RP_sr_'+x+'"><td onclick="setactualroute_RP('+x+');"><input type="text" id="routename_'+x+'" style="font-weight:bold;color:'+arraySR_RP[x].color+';" value="'+arraySR_RP[x].name+'" onchange="changeroutename(this.value,'+x+');"/>&nbsp;</td><td onclick="setactualroute_RP('+x+');"><img style="display:'+visible+';" id="OnDirection_'+x+'" widht="35px" height="35px" src="'+imgdir+'" onclick="changeroutedirection('+x+');"/></td><td onclick="setactualroute_RP('+x+');"><img style="display:'+visible+';" id="IdStops_'+x+'" onclick="control_stops_RP();"  width="35px" height="35px" src="https://lh5.googleusercontent.com/-dw-HxABt9TY/VEDXP0utKBI/AAAAAAANgp0/oSLoN9fjBzc/s60/6.png"/></td><td onclick="setactualroute_RP('+x+');"><img style="display:none;vertical-align:middle" id="RP_but_'+x+'"   onclick="Reset_Route('+x+');" width="35px" height="35px" src="https://lh4.googleusercontent.com/-_azh1IzUzH8/VEDXP-fY7qI/AAAAAAANgqI/eA7XL4KAW9o/s52/7.png"/></td><td><img src="https://lh4.googleusercontent.com/-J8QLIopkdW4/VOdmvVtfapI/AAAAAAANhJA/FcImfqWSudY/s46/basura3.png" onclick="removeroute('+x+');"  id="TrashMy_'+x+'" style="display:'+visible+';" widht="35px" height="35px"/></td></tr>';
}
$(PadreReport+'#div_data_r2').html(texto+'</table>');
setactualroute_RP(actualroute_RP);	
}
function changeroutedirection(index){
	var dir=arraySR_RP[index].direction;
	if(dir==1){arraySR_RP[index].direction=2;}
	else{arraySR_RP[index].direction=1;}
	updaterutas_RP();
}

function changeroutename(name,index){
	arraySR_RP[index].name=name
}
function setactualroute_RP(index){
actualroute_RP=index;


for(a=0;a<arraySR_RP.length;a++)
{
if(a==index)
{

if(placeorutasostops==1){for(m=0;m<arraySR_RP[a].markers.length;m++){arraySR_RP[a].markers[m].setMap(map);}}
if(placeorutasostops==2){for(s=0;s<arraySR_RP[a].stops.length;s++){arraySR_RP[a].stops[s].setMap(map);}}



/*-------------------------------------------------------------------*/
if(arraySR_RP[a].locations.length>=2){map.fitBounds(arraySR_RP[a].bounds);}
var text='<table><tr><td style=" font-weight:bolder; color:'+arraySR_RP[a].color+';">'+arraySR_RP[a].name+' </td><td><img id="reset_stops" onclick="reset_Stops();" width="35px" height="35px" src="https://lh4.googleusercontent.com/-_azh1IzUzH8/VEDXP-fY7qI/AAAAAAANgqI/eA7XL4KAW9o/s52/7.png"></td></tr></table>';$(PadreReport+'#div_data_s2').html(text);
/*-------------------------------------------------------------------*/

if(arraySR_RP[index].markers.length>0){$(PadreReport+'#RP_but_'+index).show();}



$(PadreReport+'#OnDirection_'+index).show();
$(PadreReport+'#TrashMy_'+index).show();
$(PadreReport+'#IdStops_'+a).show();

}else{
$(PadreReport+'#IdStops_'+a).hide();
$(PadreReport+'#RP_but_'+a).hide()	
$(PadreReport+'#OnDirection_'+a).hide()
$(PadreReport+'#TrashMy_'+a).hide()

	 for(m=0;m<arraySR_RP[a].markers.length;m++){arraySR_RP[a].markers[m].setMap(null);	 }
	 for(s=0;s<arraySR_RP[a].stops.length;s++){ arraySR_RP[a].stops[s].setMap(null);	 }

}/*else*/	
}/*for*/
}/*funtion*/

function Addthisplace_RP(ruta_id){
	var add=true;
	for(s=0;s<arraySR_RP[actualroute_RP].stops.length;s++){
		if(ruta_id==arraySR_RP[actualroute_RP].stops[s].placeid){var add=false;var index=s;}
	}
	if(!add){
		deletestop(actualroute_RP,index);
		$(PadreReport+'button_sugg_add').val('Add as Stop');
	}
	else{
		for(p=0;p<placesasstops.length;p++){
			if(placesasstops[p].placeid==ruta_id){
				var coors=placesasstops[p].getPosition();
				var name=placesasstops[p].getTitle();
			}
		}
		var index=arraySR_RP[actualroute_RP].stops.length;
		arraySR_RP[actualroute_RP].stops.push(createStopMarker(coors,name,'MYEZPLAN PLACE',actualroute_RP,index,ruta_id))
		$(PadreReport+'button_sugg_add').val('Remove as Stop'); 
	}
}
function deletestop(route,index){
modificastops=true;
	arraySR_RP[route].stops[index].infowindow.close(map,arraySR_RP[route].stops[index]);
	arraySR_RP[route].stops[index].setMap(null);
	arraySR_RP[route].stops.splice(index,1);
	for(s=0;s<arraySR_RP[route].stops.length;s++){
		arraySR_RP[route].stops[s].index=s;
		if(arraySR_RP[route].stops[s].placeid==0){
			arraySR_RP[route].stops[s].infowindow= new google.maps.InfoWindow(
			{ content: '<input placeholder="Name" type="text" id="namestp" value="'+arraySR_RP[route].stops[s].getTitle()+'"/><br/><input placeholder="Description"  type="text" id="descstp" value="'+arraySR_RP[route].stops[s].desc+'"/><br/><input type="button" value="Update" onclick="changestop_nd('+arraySR_RP[route].stops[s].inroute+','+arraySR_RP[route].stops[s].index+');">&nbsp;<input type="button" value="Remove" onclick="deletestop('+arraySR_RP[route].stops[s].inroute+','+arraySR_RP[route].stops[s].index+');">',
				size: new google.maps.Size(400,400)
			});
		}
		else{
			arraySR_RP[route].stops[s].infowindow= new google.maps.InfoWindow(
			{ content: 'Name: '+arraySR_RP[route].stops[s].name+'<br/><input type="button" value="Info" onclick="ShowInfo_RP('+arraySR_RP[route].stops[s].placeid+');"/>&nbsp;<input type="button" value="Remove" onclick="deletestop('+arraySR_RP[route].stops[s].inroute+','+arraySR_RP[route].stops[s].index+');"/>',
				size: new google.maps.Size(400,400)
			});
		}
	}
	
}
function createStopMarker(location,titulo,desc,inroute,index,placeid){
       var StopMarker = new google.maps.Marker();
	   StopMarker.desc=desc;
		var contar=(index+1)
        StopMarker.setOptions({
         icon: arraySR_RP[inroute].icon,
		title: titulo,	
          draggable: true,
          map: map,
          position: location
        });
		StopMarker.inroute=inroute;
		StopMarker.index=index;
		StopMarker.desc=desc;
		StopMarker.placeid=placeid;
		if(placeid==0){
			StopMarker.infowindow= new google.maps.InfoWindow(
			{ content: '<input placeholder="Name" type="text" id="namestp" value="'+titulo+'"/><br/><input placeholder="Description"  type="text" id="descstp" value="'+desc+'"/><br/><input type="button" value="Update" onclick="changestop_nd('+StopMarker.inroute+','+StopMarker.index+');">&nbsp;<input type="button" value="Remove" onclick="deletestop('+StopMarker.inroute+','+StopMarker.index+');">',
				size: new google.maps.Size(250,250)
			});
		}
		else{
			StopMarker.infowindow= new google.maps.InfoWindow(
			{ content: 'Name<br/>'+titulo+'<br/><input type="button" value="Info" onclick="ShowInfo_RP('+StopMarker.placeid+');"/>&nbsp;<input type="button" value="Remove" onclick="deletestop('+StopMarker.inroute+','+StopMarker.index+');">',
				size: new google.maps.Size(250,250)
			});
		}
 		google.maps.event.addListener(StopMarker, 'click', function() { 
			StopMarker.infowindow.open(map,StopMarker);
			var marcadordestop=StopMarker.index;
			for(y=0;y< arraySR_RP[StopMarker.inroute].stops.length;y++){
			if ( arraySR_RP[StopMarker.inroute].stops[y].index!=marcadordestop){
			 arraySR_RP[StopMarker.inroute].stops[y].infowindow.close(map,arraySR_RP[StopMarker.inroute].stops[y]);
			}
			}
		});
		google.maps.event.addListener(StopMarker, 'dragend', function() {
			modificastops=true;
		})
        return StopMarker;
      }
function changestop_nd(route,index){
modificastops=true;
var titulo=document.getElementById('namestp').value;
if(titulo==''){alert('Invalid name');return false;}
var desc=document.getElementById('descstp').value;
arraySR_RP[route].stops[index].infowindow.close(map,arraySR_RP[route].stops[index]);
arraySR_RP[route].stops[index].infowindow= new google.maps.InfoWindow(
			{ content: '<input placeholder="Name" type="text" id="namestp" value="'+titulo+'"/><br/><input placeholder="Description"  type="text" id="descstp" value="'+desc+'"/><br/><input type="button" value="Update" onclick="changestop_nd('+route+','+index+');">&nbsp;<input type="button" value="Remove" onclick="deletestop('+route+','+index+');">',
				size: new google.maps.Size(250,250)
			});
arraySR_RP[route].stops[index].desc=desc;
arraySR_RP[route].stops[index].setTitle(titulo);
}	  