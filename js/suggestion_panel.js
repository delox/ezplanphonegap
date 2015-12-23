$(document).ready(function(){
    uploadimg=1;
	imgcants=0;
	imgcants2=0;
	imgtoupload=[];
	$('#imglink1').html("Add a single photo.");
	
    $("#imglink").click(function(){
        uploadimg=2;
		$('#imgfile').css("background-color", "lightgray")
		$('#imglink').css("background-color", "#17375E");
		$('#imglink1').html("Add an album");
		
	});
    
	$("#imgfile").click(function(){
		uploadimg=1;				 
		$('#imglink').css("background-color", "lightgray")
		$('#imgfile').css("background-color", "#17375E");
		$('#imglink1').html("Add a single photo.");
	});

	adv_sugg = 1;
    $(".showadv_opt").click(function(){
        $("#adv_options").slideToggle(250);
        if (adv_sugg==0){
            adv_sugg=1;
            $(this).css("background-color", "lightgray")
        }else{
            adv_sugg=0;
            $(this).css("background-color", "#17375E");
        }	  
    });
	
    puntomodificado=0;
	
    $("#form_suggest").slideToggle(250);
	
    mas_sugg = 1;
    
    $(".showmore_opt").click(function(){
			 $("#form_suggest").slideToggle(250);
			  if (mas_sugg==0){
				 mas_sugg=1;
				 $(this).css("background-color", "lightgray")
			 }else{
				 mas_sugg=0;
				 $(this).css("background-color", "#17375E");
				 }	  
        });
    
    isroute=0;	
    $(".is_route").click(function(){        
        
        
            isroute=1;
            document.getElementById('ismap').value=1;
            $(this).hide();
            rutaseltoedit=-1
            $("#mapasugg_controls").show();  
    });
    
    $("#form_suggest_1 .inputbox").click(function(){
		$('#form_suggest_1 .ocultar').hide();
		var toshow=$(this).data('toshow');
		if(toshow && toshow != ''){
			$('.'+toshow).show();
		}
	})
})

function placeMarker_r(location) {
			rutasarray[rutaseltoedit].bounds.extend(location);
       var locationMarker = new google.maps.Marker();
        locationMarker.setOptions({
          icon: 'https://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png',
          draggable: true,
          map: map_sugg,
          position: location
        });
		locationMarker.route=rutaseltoedit;
		if(rutasarray[rutaseltoedit].direction==1){
			locationMarker.index=rutasarray[rutaseltoedit].markers.length;
			locationMarker.infowindow = new google.maps.InfoWindow(
				{ content: '<input type="button" value="Remove" onclick="deletemarker_r('+locationMarker.route+','+locationMarker.index+');"/>',
				size: new google.maps.Size(150,150)
			});
			rutasarray[rutaseltoedit].markers.push(locationMarker);
			rutasarray[rutaseltoedit].locations.push(location);
		}
		else{
			locationMarker.index=0;
			locationMarker.infowindow = new google.maps.InfoWindow(
				{ content: '<input type="button" value="Remove" onclick="deletemarker_r('+locationMarker.route+',0);"/>',
				size: new google.maps.Size(150,150)
			});
			rutasarray[rutaseltoedit].markers.splice(0,0,locationMarker);
			rutasarray[rutaseltoedit].locations.splice(0,0,location);
			for(m=1;m<rutasarray[rutaseltoedit].markers.length;m++){
				rutasarray[rutaseltoedit].markers[m].index=m;
				rutasarray[rutaseltoedit].markers[m].infowindow=new google.maps.InfoWindow(
				{ content: '<input type="button" value="Remove" onclick="deletemarker_r('+rutaseltoedit+','+m+');"/>',
				size: new google.maps.Size(150,150)
			});
			}
		}
			rutasarray[rutaseltoedit].setPath(rutasarray[rutaseltoedit].locations);
			if(rutasarray[rutaseltoedit].locations.length>=2){map_sugg.fitBounds(rutasarray[rutaseltoedit].bounds);}
			google.maps.event.addListener(locationMarker, 'click', function() {
				locationMarker.infowindow.open(map_sugg,locationMarker);
			});
       google.maps.event.addListener(locationMarker, "dragend", function() {
            var nLatLng = locationMarker.getPosition();
            var modifiedLocation = nLatLng;
            rutasarray[locationMarker.route].locations[locationMarker.index] = modifiedLocation;
			rutasarray[locationMarker.route].setPath(rutasarray[locationMarker.route].locations);
			rutasarray[locationMarker.route].bounds=new google.maps.LatLngBounds();
			for(x=0;x<rutasarray[locationMarker.route].locations.length;x++){
				rutasarray[locationMarker.route].bounds.extend(rutasarray[locationMarker.route].locations[x]);
			}
			if(rutasarray[locationMarker.route].locations.length>=2){map_sugg.fitBounds(rutasarray[locationMarker.route].bounds);}
        });
}
function createnewroute(){
    var name=prompt('Name This Route','Route '+(rutasarray.length+1)) || '';
	if(name==false){return false;}
    
	if(!name || name==''){
        alert('invalid name');return false;
    }
    
    rutaseltoedit=rutasarray.length;
	
    if(rutaseltoedit==0){
        var color='FF00FF';
    }

    if(rutaseltoedit==1){
        var color='00FFCC';
    }
    
    if(rutaseltoedit==2){
        $('.newroute').hide();
        var color='6600CC';
    }
    
    $('#titulosmapa').html('To draw, click on the map');
    $('#titulosmapa').show();
	
    var latlngs = new google.maps.MVCArray();
    var polyline = new google.maps.Polyline({
        path: latlngs
        , map: map_sugg
        , strokeColor: '#'+color
        , strokeWeight: 7
        , strokeOpacity: 0.5
    });
    
    polyline.markers = [];
	polyline.locations = [];
	polyline.stops=[];
	polyline.name=name;
	polyline.color=color;
	polyline.index=rutasarray.length;
	polyline.direction=1;
	polyline.bounds=new google.maps.LatLngBounds();
	rutasarray.push(polyline);
	google.maps.event.addListener(polyline, 'click', function() {
        setroutetoedit(polyline.index);
    });
    updaterutas();
}
function placeMarker_s(location,placeid,name,desc) {
			var index=rutasarray[rutaseltoedit].stops.length;
			if(rutaseltoedit==0){
				var icon='https://lh6.googleusercontent.com/-8xxqF9thOCg/U9nRcchbb_I/AAAAAAANgBg/C77KoahO1Sc/s44/64.png';
			}
			if(rutaseltoedit==1){
				var icon='https://lh3.googleusercontent.com/-Tx9ASyR-Pm0/U9nRcry7fQI/AAAAAAANgB4/S4-sPOCQyv4/s44/66.png';
			}
			if(rutaseltoedit==2){
				var icon='https://lh3.googleusercontent.com/-Y2nKnJNaweg/U9nRcP8BO4I/AAAAAAANgBc/nnLGfRYqBm8/s45/65.png';
			}
       var locationMarker = new google.maps.Marker();
        locationMarker.setOptions({
          icon: icon,
          draggable: true,
          map: map_sugg,
		  title: name,
          position: location
        });
		locationMarker.name=name;
		locationMarker.desc=desc;
		locationMarker.route=rutaseltoedit;
		locationMarker.index=index;
		locationMarker.placeid=placeid;
		if(placeid==0){
			locationMarker.infowindow = new google.maps.InfoWindow(
				{ content: 'Name:<input id="stopname" type="text" value="'+name+'"/><br/>Desc:<input id="stopdesc" type="text" value="'+desc+'"/><br/><input type="button" value="Update" onclick="updatemarker_s('+locationMarker.route+','+locationMarker.index+');"/>&nbsp;<input type="button" value="Remove4" onclick="deletemarker_s('+locationMarker.route+','+locationMarker.index+');"/>',
				size: new google.maps.Size(400,400)
			});
		}
		else{
			locationMarker.setOptions({draggable: false});
			locationMarker.infowindow = new google.maps.InfoWindow(
				{ content: 'Name: '+name+'<br/><input type="button" value="Info" onclick="ShowInfo('+placeid+');"/>&nbsp;<input type="button" value="Remove" onclick="deletemarker_s('+locationMarker.route+','+locationMarker.index+');"/>',
				size: new google.maps.Size(400,400)
			});
		}
			rutasarray[rutaseltoedit].stops.push(locationMarker);
			google.maps.event.addListener(locationMarker, 'click', function() {
		if(placeid==0){
			locationMarker.infowindow = new google.maps.InfoWindow(
				{ content: 'Name:<input id="stopname" type="text" value="'+locationMarker.getTitle()+'"/><br/>Desc:<input id="stopdesc" type="text" value="'+locationMarker.desc+'"/><br/><input type="button" value="Update" onclick="updatemarker_s('+locationMarker.route+','+locationMarker.index+');"/>&nbsp;<input type="button" value="Remove" onclick="deletemarker_s('+locationMarker.route+','+locationMarker.index+');"/>',
				size: new google.maps.Size(400,400)
			});
		}
				locationMarker.infowindow.open(map_sugg,locationMarker);
			});
		}
function adjustplaces(){
	for(p=0;p<placesasstops.length;p++){
		if(map_sugg.getBounds().contains(placesasstops[p].getPosition())){
			placesasstops[p].setMap(map_sugg);
		}
		else{placesasstops[p].setMap(null);}
	}
}
function updatemarker_s(route,index){
	var name=document.getElementById('stopname').value;
	var desc=document.getElementById('stopdesc').value;
	rutasarray[route].stops[index].infowindow.close(map_sugg,rutasarray[route].stops[index]);
	rutasarray[route].stops[index].name=name;
	rutasarray[route].stops[index].setTitle(name); 
	rutasarray[route].stops[index].desc=desc;
	rutasarray[route].stops[index].infowindow= new google.maps.InfoWindow(
			{ content: 'Name:<input id="stopname" type="text" value="'+name+'"/><br/>Desc:<input id="stopdesc" type="text" value="'+desc+'"/><br/><input type="button" value="Update" onclick="updatemarker_s('+route+','+index+');"/>&nbsp;<input type="button" value="Remove" onclick="deletemarker_s('+route+','+index+');"/>',
				size: new google.maps.Size(400,400)
			});
}
function deletemarker_s(route,index){
	rutasarray[route].stops[index].infowindow.close(map_sugg,rutasarray[route].stops[index]);
	rutasarray[route].stops[index].setMap(null);
	rutasarray[route].stops.splice(index,1);
	for(s=0;s<rutasarray[route].stops.length;s++){
		rutasarray[route].stops[s].index=s;
		if(rutasarray[route].stops[s].placeid==0){
			rutasarray[route].stops[s].infowindow= new google.maps.InfoWindow(
			{ content: 'Name:<input id="stopname" type="text" value="'+rutasarray[route].stops[s].name+'"/><br/>Desc:<input id="stopdesc" type="text" value="'+rutasarray[route].stops[s].desc+'"/><br/><input type="button" value="Update" onclick="updatemarker_s('+route+','+s+');"/>&nbsp;<input type="button" value="Remove" onclick="deletemarker_s('+route+','+s+');"/>',
				size: new google.maps.Size(400,400)
			});
		}
		else{
			rutasarray[route].stops[s].infowindow= new google.maps.InfoWindow(
			{ content: 'Name: '+rutasarray[route].stops[s].name+'<br/><input type="button" value="Info" onclick="ShowInfo('+rutasarray[route].stops[s].placeid+');"/>&nbsp;<input type="button" value="Remove" onclick="deletemarker_s('+route+','+s+');"/>',
				size: new google.maps.Size(400,400)
			});
		}
	}
	
}
function Reset_Place(){
	$('#but_rp').hide();
	usermarker.setPosition(suggplace_coors);
	usermarker.setTitle(suggplace_name);
	document.getElementById('detail_name').value=suggplace_name;
	map_sugg.setCenter(usermarker.getPosition());
}
function Reset_Place1(){
	$('#but_rp').hide();
    $('#but_rp2').hide();
    $('#setmylocation').show();
	usermarker.setPosition(suggplace_coors);
	usermarker.setTitle(suggplace_name);
	document.getElementById('detail_name').value=suggplace_name;
	map_sugg.setCenter(usermarker.getPosition());
}
function createnewcaptcha(){
	var url = "data_ajax/suggestions_ajax_content.cfm?rnu=5131616516651";
	var urlconfig = {action:'createcaptcha'};
	$("#captcha_nologin").load(url,urlconfig);
}
function opensuggfaq(){
    if(placeorutaostops==0){var pagefaq='suggestions_places';}
    if(placeorutaostops==1){var pagefaq='suggestions_rutas';}
    if(placeorutaostops==2){var pagefaq='suggestions_stops';}
	$('#myeztravel-faq').showLoading("Please Wait,<br/>Retriving Topics...<br/>",false);
	$('body').append('<div id="mask-faq" class="mask-faq"></div>');
	var _url = "http://myezplan.com/webtemp2/data_ajax/faq_ajax_content.cfm?page="+pagefaq;
	var _urlconfig = {action:'Faq_index'};
	$('#myeztravel-faq').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){
		case "error":
		$('#myeztravel-faq').empty();alert("We are sorry, There aren't any help files in this page");
		break;
		case "success":
		var popZindez = (parseInt($("#mask-suggestview").css("z-index"))) + 5;
		$('#mask-faq').css({'z-index' : popZindez});
		var popZindez2=popZindez+5;
		$('#myeztravel-faq').css({'z-index' : popZindez2});
		$('#mask-faq').fadeIn(300);
		$('#myeztravel-faq').fadeIn(300);
		}
	});
	}

function updaterutas(){
	
	$('#div_data_r2').empty();
	var focusin=-1;
	var texto='<table>';
    
	for(r=0;r<rutasarray.length;r++)
	{
		if(r==rutaseltoedit)
		{
			var visible='block';
        }
		else
		{
            var visible='none';
        }
        
		var imgdir='https://lh3.googleusercontent.com/-qrnDeaWgEQQ/VTqVNrMCWpI/AAAAAAANhYE/Q3yDCYDKwiU/s45/lado%25201.png';
        
		if(r==(rutasarray.length-1))
		{			
		    if(rutasarray[r].direction==2)
			{
				var imgdir='https://lh3.googleusercontent.com/-F2okjA-0vfw/VTqY10fI9uI/AAAAAAANhYQ/SuL705uuREI/s45/lado%25202.png';
            }
			texto=texto+'<tr><td onclick="setroutetoedit('+r+');"></td><td onclick="setroutetoedit('+r+');"><input 	onfocus="prueba('+r+')" type="text" id="routename_'+r+'" style="font-weight:bolder; width:160px;color:#'+rutasarray[r].color+';" value="'+rutasarray[r].name+'" onchange="changeroutename(this.value,'+r+');"/></td><td onclick="setroutetoedit('+r+');"><img style="vertical-align:middle" id="direct'+r+'" src="'+imgdir+'" height:"35px" width="35px" onclick="changeroutedirection('+r+');"/></td><td><div id="control_stops" onclick="control_stops();" class="button-round-2 botonesResponsive" style="border:none;padding-left: 0px; padding-right: 0px;border-right-width: 0px;border-left-width: 0px;"><img id="imgstop'+r+'" src="https://lh5.googleusercontent.com/-dw-HxABt9TY/VEDXP0utKBI/AAAAAAANgp0/oSLoN9fjBzc/s60/6.png" width="35px" height="35"/></div></td><td onclick="setroutetoedit('+r+');"><img style="vertical-align:middle" id="basura_'+r+'" onclick="resetroute('+r+');" width="35px" height="35px" src="https://lh4.googleusercontent.com/-_azh1IzUzH8/VEDXP-fY7qI/AAAAAAANgqI/eA7XL4KAW9o/s52/7.png"/></td><td><img style="vertical-align:middle" id="papelera_'+r+'" src="https://lh4.googleusercontent.com/-J8QLIopkdW4/VOdmvVtfapI/AAAAAAANhJA/FcImfqWSudY/s46/basura3.png" widht="35px" height="35px" onclick="removeroute('+r+');"/></td></tr>';
		}
		else
		{
			if(rutasarray[r].direction==2)
			{
                var imgdir='https://lh3.googleusercontent.com/-F2okjA-0vfw/VTqY10fI9uI/AAAAAAANhYQ/SuL705uuREI/s45/lado%25202.png';
            }
            texto=texto+'<tr><td onclick="setroutetoedit('+r+');"></td><td onclick="setroutetoedit('+r+');"><input onfocus="prueba('+r+')" type="text" id="routename_'+r+'" style="font-weight:bolder; width:160px;color:#'+rutasarray[r].color+';" value="'+rutasarray[r].name+'" onchange="changeroutename(this.value,'+r+');"/></td><td onclick="setroutetoedit('+r+');"><img style="display:none;" id="direct'+r+'" src="'+imgdir+'" height:"35px" width="35px" onclick="changeroutedirection('+r+');"/></td><td><div id="control_stops" onclick="control_stops();" class="button-round-2 botonesResponsive" style="border:none;padding-left: 0px; padding-right: 0px;border-right-width: 0px;border-left-width: 0px;"><img id="imgstop'+r+'" src="https://lh5.googleusercontent.com/-dw-HxABt9TY/VEDXP0utKBI/AAAAAAANgp0/oSLoN9fjBzc/s60/6.png" width="35px"height="35" style="display:none;"/></div></td><td onclick="setroutetoedit('+r+');"><img style="display:none" id="basura_'+r+'" onclick="resetroute('+r+');" width="35px" height="35px" src="https://lh4.googleusercontent.com/-_azh1IzUzH8/VEDXP-fY7qI/AAAAAAANgqI/eA7XL4KAW9o/s52/7.png"/></td><td><img style="display:none" id="papelera_'+r+'" src="https://lh4.googleusercontent.com/-J8QLIopkdW4/VOdmvVtfapI/AAAAAAANhJA/FcImfqWSudY/s46/basura3.png" widht="35px" height="35px" onclick="removeroute('+r+');"/></td></tr>'
		}
	}
	
    texto=texto+'</table>';	
    $('#div_data_r2').append(texto);	
    setroutetoedit(rutaseltoedit);		
}
function prueba(id){
	for(r=0;r<rutasarray.length;r++){
		$("#direct"+r).hide();
	 	$("#basura_"+r).hide();
	 	$("#papelera_"+r).hide();
	 	$("#imgstop"+r).hide();	
	}
	 $("#direct"+id).show();
	 $("#basura_"+id).show();
	 $("#papelera_"+id).show();
     $("#imgstop"+id).show();	
}

function resetstops(){
	for(s=0;s<rutasarray[rutaseltoedit].stops.length;s++){
		rutasarray[rutaseltoedit].stops[s].setMap(null);
	}
	rutasarray[rutaseltoedit].stops=[];
}
function resetroute(index){
	rutasarray[index].locations=[];
	for(m=0;m<rutasarray[index].markers.length;m++){
		rutasarray[index].markers[m].setMap(null);
	}
	rutasarray[index].markers=[];
	rutasarray[index].bounds=new google.maps.LatLngBounds();
	rutasarray[index].setPath(rutasarray[index].locations);
}
function setroutetoedit(index){
	rutaseltoedit=index;
    for(r=0;r<rutasarray.length;r++)
	{
        $('#active_r_'+r).hide();
        
        if(r==rutaseltoedit)
		{
			if(rutasarray[r].markers.length>=2)
			{
				map_sugg.fitBounds(rutasarray[r].bounds);
			}
			
			var name=rutasarray[r].name;
			var color=rutasarray[r].color;
			$("#spanrutanamestops").html(name);
			document.getElementById('spanrutanamestops').style.color='#'+color;
			var visible='block';
			
			if(placeorutaostops==1)
			{
				var focusin=r;
				for(m=0;m<rutasarray[r].markers.length;m++)
				{
					rutasarray[r].markers[m].setMap(map_sugg);
				}
			}
			if(placeorutaostops==2)
			{
				for(s=0;s<rutasarray[r].stops.length;s++)
				{
					rutasarray[r].stops[s].setMap(map_sugg);
				}				
			}
		}
		else{
			for(m=0;m<rutasarray[r].markers.length;m++)
			{
				rutasarray[r].markers[m].setMap(null);
			}
			for(s=0;s<rutasarray[r].stops.length;s++)
			{
				rutasarray[r].stops[s].setMap(null);
			}				
		}
	}
	$('#active_r_'+rutaseltoedit).show();

}
function changeroutename(name,index){
	rutasarray[index].name=name
}
function changeroutedirection(index){
	var dir=rutasarray[index].direction;
	if(dir==1){rutasarray[index].direction=2;}
	else{rutasarray[index].direction=1;}
	updaterutas();
}
function removeroute(index){
	var conf=confirm("You are going to delete this route and all it's elements, are you sure??")
	if(!conf){return false;}

	$('.newroute').show();
	for(x=0;x<rutasarray[index].markers.length;x++){
		rutasarray[index].markers[x].setMap(null);
	}
	rutasarray[index].setMap(null);
	rutasarray.splice(index,1);
	for(r=0;r<rutasarray.length;r++){
		rutasarray[r].index=r;
		if(r==0){
			var color='FF00FF';
			var icon='https://lh6.googleusercontent.com/-8xxqF9thOCg/U9nRcchbb_I/AAAAAAANgBg/C77KoahO1Sc/s44/64.png';
		}
		if(r==1){
			var color='00FFCC';
			var icon='https://lh3.googleusercontent.com/-Tx9ASyR-Pm0/U9nRcry7fQI/AAAAAAANgB4/S4-sPOCQyv4/s44/66.png';
		}
		if(r==2){
			var color='6600CC';
			var icon='https://lh3.googleusercontent.com/-Y2nKnJNaweg/U9nRcP8BO4I/AAAAAAANgBc/nnLGfRYqBm8/s45/65.png';
		}
		rutasarray[r].setOptions({strokeColor:'#'+color});
		rutasarray[r].color=color;
		for(m=0;m<rutasarray[r].markers.length;m++){
			rutasarray[r].markers[m].route=r
			rutasarray[r].markers[m].infowindow = new google.maps.InfoWindow(
			{ content: '<input type="button" value="Remove" onclick="deletemarker_r('+rutasarray[r].markers[m].route+','+rutasarray[r].markers[m].index+');"/>',
				size: new google.maps.Size(150,150)
			});
		}
		for(s=0;s<rutasarray[r].stops.length;s++){
			rutasarray[r].stops[s].setIcon(icon);
			rutasarray[r].stops[s].route=r
			if(rutasarray[r].stops[s].placeid==0){
				rutasarray[r].stops[s].infowindow= new google.maps.InfoWindow(
				{ content: 'Name:<input id="stopname" type="text" value="'+rutasarray[r].stops[s].name+'"/><br/>Desc:<input id="stopdesc" type="text" value="'+rutasarray[r].stops[s].desc+'"/><br/><input type="button" value="Update" onclick="updatemarker_s('+r+','+s+');"/>&nbsp;<input type="button" value="Remove" onclick="deletemarker_s('+r+','+s+');"/>',
				size: new google.maps.Size(400,400)
				});
			}
			else{
				rutasarray[r].stops[s].infowindow= new google.maps.InfoWindow(
				{ content: 'Name: '+rutasarray[r].stops[s].name+'<br/><input type="button" value="Info" onclick="ShowInfo('+rutasarray[r].stops[s].placeid+');"/>&nbsp;<input type="button" value="Remove" onclick="deletemarker_s('+r+','+s+');"/>',
				size: new google.maps.Size(400,400)
				});
			}
		}
	}
	if(rutasarray.length==0){
		$('#titulosmapa').html('');
	}
	if(index==rutaseltoedit){
		rutaseltoedit=-1;
	}
	else{
		rutaseltoedit=rutaseltoedit-1;
	}

	updaterutas();
}
function deletemarker_r(route,index){
	rutasarray[route].markers[index].setMap(null);
	rutasarray[route].markers.splice(index,1);
	rutasarray[route].locations.splice(index,1);
	rutasarray[route].setPath(rutasarray[route].locations);
	for(m=0;m<rutasarray[route].markers.length;m++){
		rutasarray[route].markers[m].index=m;
		rutasarray[route].markers[m].infowindow = new google.maps.InfoWindow(
			{ content: '<input type="button" value="Remove" onclick="deletemarker_r('+rutasarray[route].markers[m].route+','+rutasarray[route].markers[m].index+');"/>',
				size: new google.maps.Size(150,150)
			});
	}
	rutasarray[route].bounds=new google.maps.LatLngBounds();
	for(x=0;x<rutasarray[route].locations.length;x++){
		rutasarray[route].bounds.extend(rutasarray[route].locations[x]);
	}
	if(rutasarray[route].locations.length>=2){map_sugg.fitBounds(rutasarray[route].bounds);}
}
function Addthisplace(ruta_id){
	var add=true;
	for(s=0;s<rutasarray[rutaseltoedit].stops.length;s++){
		if(ruta_id==rutasarray[rutaseltoedit].stops[s].placeid){var add=false;var index=s;}
	}
	if(!add){
		deletemarker_s(rutaseltoedit,index);
		document.getElementById('button_sugg_add').value='Add as Stop';
	}
	else{
		for(p=0;p<placesasstops.length;p++){
			if(placesasstops[p].placeid==ruta_id){
				var coors=placesasstops[p].getPosition();
				var name=placesasstops[p].getTitle();
			}
		}
		 placeMarker_s(coors,ruta_id,name,'MYEZPLAN PLACE');
		 document.getElementById('button_sugg_add').value='Remove as Stop';
	}
}
function settomylocation(){
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var current_center = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
			usermarker.setPosition(current_center);
			map_sugg.setCenter(usermarker.getPosition());
			$('#but_rp2').show();
			$("#setmylocation").hide();
		})
	}
	else if (google.gears) {
		var geo = google.gears.factory.create('beta.geolocation');
		geo.getCurrentPosition(function(position) {
			var current_center = new google.maps.LatLng(position.latitude,position.longitude);
			usermarker.setPosition(current_center);
			map_sugg.setCenter(usermarker.getPosition());
			$('#but_rp').show();
		}, function() {
			alert("Geolocation service failed.");
		});

	}
	else{
		alert("Browser doesn't support Geolocation");
		return false;
	}
}
function validatetermsLogin(){
    var che=$('#cheagree').prop( "checked" );
    if(che){$('#button_send').prop('disabled',false);}
	else{ $('#button_send').prop('disabled',true);}
}
function validatetermsLogout(){
    var che=document.getElementById('cheagree').checked;
    if(che){
        $('#button_send').html('<div style="background-color: rgb(23, 55, 94);margin-right: 10px;" type="button" onclick="panelMensajes();" class="button-round-2">Send </div><cfif hay_user eq 0><input type="button" style="background-color: rgb(23, 55, 94);" id="singbutton_panel_suggest" class="button-square-blue-sign" onclick="pedir_sesion(2);" value="Sign In"></cfif>');
    }
    else{
        $('#button_send').html('<div class="button-round-2" style="background-color: lightgray;margin-right: 10px;">Send</div><cfif hay_user eq 0><input type="button" style="background-color: rgb(23, 55, 94);" id="singbutton_panel_suggest" class="button-square-blue-sign" onclick="pedir_sesion(2);" value="Sign In"></cfif>');
    }
}