rutadire=0;
function createnewcaptcha(){
	var url = "data_ajax/suggestions_ajax_content.cfm?rnu=5131616516651";
	var urlconfig = {action:'createcaptcha'};
	$("#captcha_nologin").load(url,urlconfig);
}
function validateterms(){
var che=document.getElementById('cheagree').checked;
if(che){
	$('#button_send').prop("disabled",false);
}
else{
	$('#button_send').prop('disabled',true);
}
}
function changeroutedirection(){
if(rutadire==0){
	rutadire=1;
	$('#imgtup').hide();
	$('#imgtdw').show();
}
else{
	rutadire=0;
	$('#imgtup').show();
	$('#imgtdw').hide();
}
}
function opentransfaq(){
			 if(rutaostops==0){var pagefaq='report_transport_rutas';}
			 if(rutaostops==1){var pagefaq='report_transport_stops';}
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
$('#imgtup').hide();
$('#imgtdw').hide();	
$('#control_route').attr('src','https://lh3.googleusercontent.com/-IpnwTDPvKJ8/VEE9ewLerrI/AAAAAAANgqk/oj0a3G6Oes0/s53/route%2520b%2526w%2520small.png');
document.getElementById('control_stops').style.backgroundColor='#17375E';
rutaostops=1;
document.getElementById('letrero_ros').innerHTML='Click or Drag the icons to edit stops';
for(s=0;s<stops.length;s++){
stops[s].setMap(map);
}
for(m=0;m<markers.length;m++){
markers[m].setMap(null);
}

if(stops.length==0){$('#button_resetroute').hide();}else{$('#button_resetroute').show();}


}
function selroute(){


if(rutadire==1)
{
	$('#imgtdw').show();
}
else{

	$('#imgtup').show();
}
	

	
$('#control_route').attr('src','https://lh3.googleusercontent.com/-uPG50w9EmkM/VEDXQ-LPnnI/AAAAAAANgqE/VvaMNuGpOac/s53/9.png');
document.getElementById('control_stops').style.backgroundColor='lightgray';
rutaostops=0;
document.getElementById('letrero_ros').innerHTML='Click or Drag the icons to edit route';
for(s=0;s<stops.length;s++){
stops[s].setMap(null);
}
for(m=0;m<markers.length;m++){
markers[m].setMap(map);
}
if(markers.length==0){$('#button_resetroute').hide();}else{$('#button_resetroute').show();}
}
function resetroute(){
if(rutaostops==0){
	var conf=confirm('This will reset the route to the original state, are you sure?');
	if(!conf){return false;}
	for(m=0;m<markers.length;m++){
		markers[m].setMap(null);
		}
	markers=[];
	locations=[];
	for(l=0;l<locations_o.length;l++){
		locations.push(locations_o[l]);
	}
	polyline.setPath(locations);
	for(m=0;m<locations.length;m++){
		var locationMarker=createLocationMarker(locations[m],'','','','',m);
		markers.push(locationMarker);
		}
	adjustmarkersorder();	
	}
else{
	var conf=confirm('This will reset the stops to the original state, are you sure?');
	if(!conf){return false;}
	for(s=0;s<stops.length;s++){
		stops[s].setMap(null);
		}
	stops=[];
	
	for(s=0;s<stops_o.length;s++){
		stops.push(stops_o[s]);
		}
	for(s=0;s<stops.length;s++){		
		stops[s].desc=stops[s].desc_o;
		stops[s].name=stops[s].name_o;
		stops[s].setTitle(stops[s].name);
		stops[s].setPosition(stops[s].position_o);
		stops[s].infowindow=new google.maps.InfoWindow(
					{ content: '<input placeholder="Name<" id="stopname" type="text" value="'+stops[s].name+'"/><br><input placeholder="Description" id="stopdesc" type="text" value="'+stops[s].desc+'"/><br/><input style=" background-color: rgb(23, 55, 94);" type="button" value="Update" onclick="changestopdata('+s+');"/>&nbsp;<input class="button-round-2" style="background:#C00" type="button" value="Remove" onclick="delstopdata('+s+');"/>',
						size: new google.maps.Size(250,250)
					}); 
		}
	for(s=0;s<stops.length;s++){
		stops[s].setMap(map);
		}
	}
$('#button_resetroute').hide();	
}
function createLocationMarker(location,name,desc,icon,id,index)
{
$('#button_resetroute').show();
if(rutaostops==0){
	
		 var locationMarker = new google.maps.Marker(); 
         locationMarker.setOptions({
          icon: 'https://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png',
          draggable: true,
          map: map,
          position: location
        });
        locationMarker.index=index;
		locationMarker.ruta=subruta;
		locationMarker.infowindow=new google.maps.InfoWindow(
					{ content: '<input  class="button-round-2" style="border-radius: 0px;background-color: #C00;" type="button" value="Remove" onclick="deletemarker('+locationMarker.index+');"/>',
						size: new google.maps.Size(250,250)
					}); 

		google.maps.event.addListener(locationMarker, "click", function() {
		for(m=0;m<markers.length;m++){
			markers[m].infowindow.close(map,markers[m]);
		}
		locationMarker.infowindow.open(map,locationMarker);
		})
		google.maps.event.addListener(locationMarker, "dragend", function() {
		modificaruta=true;
		subruta=locationMarker.ruta;
		rutaostops=0;
// if(subruta==0){
          var index = locationMarker.index;
          if (index >= 0) {
            var nLatLng = locationMarker.getPosition();
            var modifiedLocation = nLatLng;
            locations[index] = modifiedLocation;
			polyline.setPath(locations);
			}
// }
        });
}
else{
		 var locationMarker = new google.maps.Marker(); 
         locationMarker.setOptions({
          icon: icon,
          draggable: true,
          map: map,
		  title: name,
          position: location
        });	
		locationMarker.index=index;
		locationMarker.name=name;
		locationMarker.name_o=name;
		locationMarker.desc=desc;
		locationMarker.desc_0=desc;
		locationMarker.position_o=location;
		locationMarker.icon=icon;
		locationMarker.id_o=id;
		locationMarker.infowindow=new google.maps.InfoWindow(
					{ content: 'Name<br/><input id="stopname" type="text" value="'+locationMarker.name+'"/><br/>Description<br/><input id="stopdesc" type="text" value="'+locationMarker.desc+'"/><br/><input class="button-round-2" type="button" style=" background-color: rgb(23, 55, 94);" value="Update" onclick="changestopdata('+locationMarker.index+');"/>&nbsp;<input type="button" value="Remove" class="button-round-2" style="background:#C00" onclick="delstopdata('+locationMarker.index+');"/>',
						size: new google.maps.Size(250,250)});
		google.maps.event.addListener(locationMarker, "click", function() {
			for(s=0;s<stops.length;s++){
				stops[s].infowindow.close(map,stops[s]);
			}
		locationMarker.infowindow=new google.maps.InfoWindow(
					{ content: '<input placeholder="Name" id="stopname" type="text" value="'+locationMarker.name+'"/><br/><input placeholder="Description" id="stopdesc" type="text" value="'+locationMarker.desc+'"/><br/><input style=" background-color: rgb(23, 55, 94);" class="button-round-2" type="button" value="Update" onclick="changestopdata('+locationMarker.index+');"/>&nbsp;<input class="button-round-2" style="background:#C00" type="button" value="Remove" onclick="delstopdata('+locationMarker.index+');"/>',
						size: new google.maps.Size(250,250)}); 
		locationMarker.infowindow.open(map,locationMarker);
		})

	}
        return locationMarker;
}
function deletemarker(index)
{
markers[index].infowindow.close(map,markers[index]);
markers[index].setMap(null);
markers.splice(index,1);
locations.splice(index,1);
polyline.setPath(locations);
adjustmarkersorder();
}
function adjustmarkersorder(){
for(m=0;m<markers.length;m++){
markers[m].index=m;
markers[m].infowindow=new google.maps.InfoWindow(
					{ content: '<input  class="button-round-2" style="border-radius: 0px;background-color: #C00;" type="button" value="Remove" onclick="deletemarker('+markers[m].index+');"/>',
						size: new google.maps.Size(250,250)
					}); 
					
}

if(markers.length==0){$('#button_resetroute').hide();}else{$('#button_resetroute').show();}
}
function changestopdata(index){
		stops[index].name=document.getElementById('stopname').value;
		stops[index].desc=document.getElementById('stopdesc').value;
		stops[index].infowindow.close(map,stops[index]);
		stops[index].setTitle(stops[index].name);
}
function delstopdata(index){
stops[index].infowindow.close(map,stops[index]);
stops[index].setMap(null);
		stops.splice(index,1);
for(s=0;s<stops.length;s++){		
		stops[s].index=s;
}
if(stops.length==0){$('#button_resetroute').hide();}else{$('#button_resetroute').show();}
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
				var text='<div id="imgup_'+imgcants2+'"><table><tr><td><input id="upload_f_'+imgcants2+'" name="upload_f_'+imgcants2+'" type="file" onchange="readURL('+imgcants2+');"/><input type="hidden" id="upload_n_'+imgcants2+'" name="upload_n_'+imgcants2+'" value=""></td><td><img src="https://www.myezplan.com/ezmapas/maps_pics/7553404376376420_dc.png" id="uploadPreview_'+imgcants2+'" style="width: 50px; height: 50px;" /></td><td><img src="https://lh5.googleusercontent.com/-Cb5dhSGmMSA/U5I5STA1muI/AAAAAAANfGk/1rOXlx8756Q/s52/Untitled8.png" height="25" onclick="deleteimg('+imgcants2+');"></td></tr></div>';
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
		function addnewlink(){
			linkscant=linkscant+1;
			if(linkscant==9){$('#buttnewlink').hide();}
			var text='<tr><td><input id="urllink'+linkscant+'" name="urllink'+linkscant+'" value="" type="text" class="inputbox"/></td><td><img src="https://lh5.googleusercontent.com/-Cb5dhSGmMSA/U5I5STA1muI/AAAAAAANfGk/1rOXlx8756Q/s52/Untitled8.png" height="25" onclick="deletelink('+linkscant+');"></td></tr>'
			$('#adv_options2').append(text);
		}
		function deletelink(index){
			var links=[];
			$('#buttnewlink').show();
			for(x=0;x<=linkscant;x++){
				if(x!=index){
					var valor=document.getElementById('urllink'+x).value;
					links.push(valor);
				}
			}
			linkscant=-1;
			$('#adv_options2').empty();
			for(x2=0;x2<links.length;x2++){
				linkscant=x2;
				var text='<tr><td><input id="urllink'+x2+'" name="urllink'+x2+'" value="'+links[x2]+'" type="text" class="inputbox" maxlength="100"/></td><td><img src="https://lh5.googleusercontent.com/-Cb5dhSGmMSA/U5I5STA1muI/AAAAAAANfGk/1rOXlx8756Q/s52/Untitled8.png" height="25" onclick="deletelink('+x2+');"></td></tr>';
				$('#adv_options2').append(text);
			}
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