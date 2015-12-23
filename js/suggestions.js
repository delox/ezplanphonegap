imgtoupload=[];
function addplaceasstop(rutaid,action){
$('#roadmapplace-box a.closesmall').trigger('click');
modificastops=true;
if(action=='I'){
	placesasadded.push(rutaid);
for(p=0;p<placesasstops.length;p++){
	if(placesasstops[p].placeid==rutaid){
		var icon_ = placesasstops[p].getIcon();
		var icon=icon_.replace('.png','s.png');
		placesasstops[p].setIcon(icon);
		placesasstops[p].isadded=1;
		placesasstops[p].inroute=actualroute;
		}
	}
	}
else{
	for(p=0;p<placesasadded.length;p++){
		if(rutaid==placesasadded[p]){var index=p;}
		}
placesasadded.splice(index,1);
for(p2=0;p2<placesasstops.length;p2++){
	if(placesasstops[p2].placeid==rutaid){
		var icon_ = placesasstops[p2].getIcon();
		var icon=icon_.replace('s.png','.png');
		placesasstops[p2].setIcon(icon);
		placesasstops[p2].isadded=0;
		if(!viewsp){placesasstops[p2].setMap(null)};
		}
	}
	}
}
function ShowInfo(rutaid){
	var url = "data_ajax/map_stop_tabinfo.cfm?rnu=5131616516651";
	var urlconfig = {ruta_id:rutaid};
	$("#roadmapplace-box #box-body").load(url,urlconfig);
	var popup = $("#roadmapplace-box");
	var popMargTop = 650; 
	var popMargLeft = ($(popup).width() + 24) / 2; 
	var popZindez = (parseInt(popup.css("z-index"))) + 5;
	$(popup).css({ 
		
				//'margin-top' : -popMargTop,
				//'margin-left' : -popMargLeft,
				'z-index' : popZindez + 1
		});
	$('body').append('<div id="mask-roadmapplace-box" class="mask"></div>');
	$('#mask-roadmapplace-box').fadeIn(300).css('z-index',popZindez);
	$(popup).fadeIn(150);
	$(popup).scrollToMe();
}
function ShowInfo_sugg(rutaid){
	/*var textoboton='Add';	
	for(s=0;s<rutasarray[rutaseltoedit].stops.length;s++)
	{
		if(rutaid==rutasarray[rutaseltoedit].stops[s].placeid){var textoboton='Remove';}
	}
	
	var url = "data_ajax/map_stop_tabinfo_new.cfm?rnu=5131616516651";
	var urlconfig = {ruta_id:rutaid,source:'sugg_panel',texto:textoboton};
	$("#roadmapplace-box #box-body").load(url,urlconfig);
	var popup = $("#roadmapplace-box");
	var popMargTop = 650; 
	var popMargLeft = ($(popup).width() + 24) / 2; 
	var popZindez = (parseInt($("#mask-suggestview").css("z-index"))) + 5;
	
	$(popup).css({ 
			//'margin-top' : -popMargTop,
				//'margin-left' : -popMargLeft,
				'z-index' : popZindez + 1
	});
	
	$('body').append('<div id="mask-roadmapplace-box" class="mask"></div>');
	$('#mask-roadmapplace-box').fadeIn(300).css('z-index',popZindez);
	$(popup).fadeIn(150);
	$(popup).scrollToMe();*/
}
function ViewHidePlaces(){

	if(viewsp)
	{
		viewsp=false;
		document.getElementById('buttplacesasstops').style.backgroundColor='lightgray';
		$('#titulosmapa').html('To add, click on the map');
		for(p=0;p<placesasstops.length;p++)
		{
			placesasstops[p].setMap(null);
		}
	}
	else
	{
		viewsp=true;
		document.getElementById('buttplacesasstops').style.backgroundColor='#17375E';
		$('#titulosmapa').html('To add, click on the icon');
		
		for(p=0;p<placesasstops.length;p++)
		{
			if(typeof(map)!='undefined')
			{
				if(map.getBounds().contains(placesasstops[p].getPosition()))
				{
					placesasstops[p].setMap(map);
				}
			}
			if(typeof(map_sugg)!='undefined')
			{
				if(map_sugg.getBounds().contains(placesasstops[p].getPosition()))
				{
					placesasstops[p].setMap(map_sugg);
				}
			}
		}
	}
}
function idunico(lolo){
aleat = Math.random() * 9999999999999999;
aleat2 = Math.random() * 9999999999999999;
aleatf = Math.round(aleat+aleat2);
return aleatf;
}
function panelPending(){
    var conf=confirm("Your Suggestion has been saved in pendings. Do you want to view pendings ?");    
    //cancelar
    if(!conf){
        //window.close();
    }//aceptar
    else{        
        savesaspending();
		console.log('.a.a.a.');
        showExternalPage('report_suggest_pendings.cfm');
    }
}

function savesaspending(PN){
/*#halperiano*/
    if(typeof(usermarker)=='undefined'){
        alert('please create a valid point in map');
        return false;
    }
    
    var nombre = document.getElementById('detail_name').value;
    if(nombre==''){
        alert('please type a valid name');
        document.getElementById('detail_name').focus();
        return false;
    }
    
    var plcoors=usermarker.getPosition();
    document.getElementById('placecoors').value=plcoors;
    document.getElementById('report_id').value=idunico(1);
    
    var cityid=document.getElementById('city').value;
    if(cityid==''){
        var cityid=document.getElementById('selcity').value;
        document.getElementById('city').value=cityid;
    }
    
    var sta=document.getElementById('userreport_status').value;
    document.getElementById('report_status').value=sta;
    
    var links=[];
    for(x=0;x<=linkscant;x++){
        var valor=document.getElementById('urllink'+x).value;
        if(valor!=''){
            alguncambio=true;
            links.push(valor);
        }
    }
    
	document.getElementById('urllinks').value=links.join('*');
	document.getElementById('form_type').value='PS';
	for(i=0;i<imgtoupload.length;i++){
		if(imgtoupload[i]==''){imgtoupload[i]='NOIMAGEN';}
	}
    
	document.getElementById('img_toupload').value=imgtoupload.join(',');
	var imglinks=[];
	$('.img_link').each(function(index, element) {
		if(element.value!=''){
        alguncambio=true;
			imglinks.push(element.value);
		}
    });
	document.getElementById('img_links').value=imglinks.join('*');
    
    var services_=[];
    var che1=document.getElementById('detail_services1').checked;
    if(che1){services_.push(1);}
    var che2=document.getElementById('detail_services2').checked;
    if(che2){services_.push(2);}
    var che3=document.getElementById('detail_services3').checked;
    if(che3){services_.push(3);}
    var che4=document.getElementById('detail_services4').checked;
    if(che4){services_.push(4);}
    document.getElementById('detailservices').value=services_.join(',');
    
    var transport_=[];
    var chea1=document.getElementById('detail_transportation1').checked;
    if(chea1){transport_.push(1);}
    var chea2=document.getElementById('detail_transportation2').checked;
    if(chea2){transport_.push(2);}
    var chea3=document.getElementById('detail_transportation3').checked;
    if(chea3){transport_.push(3);}
    var chea4=document.getElementById('detail_transportation4').checked;
    if(chea4){transport_.push(4);}
    var chea5=document.getElementById('detail_transportation5').checked;
    if(chea5){transport_.push(5);}
    document.getElementById('detailtransportation').value=transport_.join(',');
   
    
    var comment_=[];
    var textos=[];
    for(c=0;c<=cuentaeventos;c++){
			var fecha1=document.getElementById('fechai_'+c).value;
			if(fecha1==''){var fecha1='NODATE';}
			var fecha2=document.getElementById('fechaf_'+c).value;
			if(fecha2==''){var fecha2='NODATE';}
			var texto=document.getElementById('w_text_'+c).value;
			if(texto==''){var texto='NO DATA';}
			if(fecha1!='NODATE' && fecha2!='NODATE' && texto !='NO DATA'){
				textos.push(fecha1+'*'+fecha2+'*'+texto)
			}
	}
    
    document.getElementById('whats').value=textos.join('!');			
    var ismap=document.getElementById('ismap').value;
    var rutas=[];
    var stops=[];
    if (ismap!=0){
	for(r=0;r<rutasarray.length;r++){
		if(r==0){var icon='https://lh6.googleusercontent.com/-8xxqF9thOCg/U9nRcchbb_I/AAAAAAANgBg/C77KoahO1Sc/s44/64.png';}
		if(r==1){var icon='https://lh3.googleusercontent.com/-Tx9ASyR-Pm0/U9nRcry7fQI/AAAAAAANgB4/S4-sPOCQyv4/s44/66.png';}
		if(r==2){var icon='https://lh3.googleusercontent.com/-Y2nKnJNaweg/U9nRcP8BO4I/AAAAAAANgBc/nnLGfRYqBm8/s45/65.png';}
		if(rutasarray[r].locations.length>=2){
			rutas.push(r+'!'+rutasarray[r].name+'!'+rutasarray[r].color+'!0!'+rutasarray[r].locations.join('*').replace(/ /g,'')+'!'+icon);
			for(s=0;s<rutasarray[r].stops.length;s++){
				var desc=rutasarray[r].stops[s].desc;
				if(desc==''){var desc='NODESC';}
				stops.push(rutasarray[r].stops[s].getPosition().toString().replace(/ /g,'')+'*'+rutasarray[r].stops[s].getTitle()+'*'+desc+'*'+r+'*'+rutasarray[r].stops[s].placeid);
			}
		}
	}
	document.getElementById('ruta_data').value=rutas.join('?');
	document.getElementById('stops_data').value=stops.join('!');

}
   
    if(rutas.length==0){document.getElementById('ismap').value=0;}
	
	
  
C({D:"#sugestPanelInterPlace",F:"#form_suggest_1",u:"../../../sube_report.cfm?PNone"});
}
function panelMensajes(){Validasave();}
function Validasave(){
    
    var hayusr=document.getElementById('hayuser').value;
    if(hayusr==0){
		var create_captcha = $.trim($("#create_captcha").val());
		if(!(create_rnd == create_captcha)){
			createnewcaptcha();
			alert('Verification code incorrect. Please try again');
			return false;
		}
	}
    
    if(typeof(usermarker)=='undefined'){alert('please create a valid point in map');return false;}
    var nombre = document.getElementById('detail_name').value;
    if(nombre==''){alert('please type a valid name');document.getElementById('detail_name').focus();return false;}
    var plcoors=usermarker.getPosition();
    document.getElementById('placecoors').value=plcoors;
    document.getElementById('report_id').value=idunico(1);
    var cityid=document.getElementById('city').value
    if(cityid==''){
var cityid=document.getElementById('selcity').value;
document.getElementById('city').value=cityid;
}
	var sta=document.getElementById('userreport_status').value;
	document.getElementById('report_status').value=sta;
	var links=[];
	for(x=0;x<=linkscant;x++){
			var valor=document.getElementById('urllink'+x).value;
			if(valor!=''){
				alguncambio=true;
				links.push(valor);
			}
	}
	document.getElementById('urllinks').value=links.join('*');
	document.getElementById('form_type').value='S';
	for(i=0;i<imgtoupload.length;i++){
		if(imgtoupload[i]==''){imgtoupload[i]='NOIMAGEN';}
		else{alguncambio=true;}
	}
	document.getElementById('img_toupload').value=imgtoupload.join(',');
	var imglinks=[];
	$('.img_link').each(function(index, element) {
		if(element.value!=''){
        alguncambio=true;
			imglinks.push(element.value);
		}
    });
	document.getElementById('img_links').value=imglinks.join('*');

    var services_=[];
    var che1=document.getElementById('detail_services1').checked;
    if(che1){services_.push(1);}
    var che2=document.getElementById('detail_services2').checked;
    if(che2){services_.push(2);}
    var che3=document.getElementById('detail_services3').checked;
    if(che3){services_.push(3);}
    var che4=document.getElementById('detail_services4').checked;
    if(che4){services_.push(4);}
    document.getElementById('detailservices').value=services_.join(',');
    var transport_=[];
    var chea1=document.getElementById('detail_transportation1').checked;
    if(chea1){transport_.push(1);}
    var chea2=document.getElementById('detail_transportation2').checked;
    if(chea2){transport_.push(2);}
    var chea3=document.getElementById('detail_transportation3').checked;
    if(chea3){transport_.push(3);}
    var chea4=document.getElementById('detail_transportation4').checked;
    if(chea4){transport_.push(4);}
    var chea5=document.getElementById('detail_transportation5').checked;
    if(chea5){transport_.push(5);}
    document.getElementById('detailtransportation').value=transport_.join(',');
    var comment_=[];
        var textos=[];
        for(c=0;c<=cuentaeventos;c++){
                var fecha1=document.getElementById('fechai_'+c).value;
                if(fecha1==''){var fecha1='NODATE';}
                var fecha2=document.getElementById('fechaf_'+c).value;
                if(fecha2==''){var fecha2='NODATE';}
                var texto=document.getElementById('w_text_'+c).value;
                if(texto==''){var texto='NO DATA';}
                if(fecha1!='NODATE' && fecha2!='NODATE' && texto !='NO DATA'){
                    textos.push(fecha1+'*'+fecha2+'*'+texto);
                    alguncambio=true;
                }
        }
        document.getElementById('whats').value=textos.join('!');			
    var ismap=document.getElementById('ismap').value;
        var rutas=[];
        var stops=[];
    if (ismap!=0){
        for(r=0;r<rutasarray.length;r++){
            if(rutasarray[r].locations.length>=2){
                if(r==0){var icon='https://lh6.googleusercontent.com/-8xxqF9thOCg/U9nRcchbb_I/AAAAAAANgBg/C77KoahO1Sc/s44/64.png';}
                if(r==1){var icon='https://lh3.googleusercontent.com/-Tx9ASyR-Pm0/U9nRcry7fQI/AAAAAAANgB4/S4-sPOCQyv4/s44/66.png';}
                if(r==2){var icon='https://lh3.googleusercontent.com/-Y2nKnJNaweg/U9nRcP8BO4I/AAAAAAANgBc/nnLGfRYqBm8/s45/65.png';}
                rutas.push(r+'!'+rutasarray[r].name+'!'+rutasarray[r].color+'!0!'+rutasarray[r].locations.join('*').replace(/ /g,'')+'!'+icon);
                for(s=0;s<rutasarray[r].stops.length;s++){
                    var desc=rutasarray[r].stops[s].desc;
                    if(desc==''){var desc='NODESC';}
                    stops.push(rutasarray[r].stops[s].getPosition().toString().replace(/ /g,'')+'*'+rutasarray[r].stops[s].getTitle()+'*'+desc+'*'+r+'*'+rutasarray[r].stops[s].placeid);
                }
            }
        }
        document.getElementById('ruta_data').value=rutas.join('?');
        document.getElementById('stops_data').value=stops.join('!');
    }
    if(rutas.length==0){document.getElementById('ismap').value=0;}
    
 
 

    
   C({D:"#sugestPanelInterPlace",F:"#form_suggest_1",u:"../sube_report.cfm"});
    

    
}

function control_place(){
			 	$("#imgnose").attr("src","https://lh3.googleusercontent.com/-IpnwTDPvKJ8/VEE9ewLerrI/AAAAAAANgqk/oj0a3G6Oes0/s53/route%2520b%2526w%2520small.png");
			 	$("#imgstop").attr("src","https://lh6.googleusercontent.com/-Ed5eM4fjk_o/VEE9e1Q9hTI/AAAAAAANgqo/DuklrSRrCbw/s59/stops%2520b%2526w%2520small.png");

				 $('#control_place2').hide();
				 if(puntomodificado==1){$('#but_rp').show();}
				 $("#mapasugg").show();
				 $('#divformcontent').show();
				$("#mapasugg_r").hide();
				$('#div_data_r').hide();
				$("#mapasugg_s").hide();
				$('#div_data_s').hide();

				google.maps.event.trigger(map, 'resize');
        }
function control_route(){
    
	if($("#imgnose").attr('src')=="https://lh3.googleusercontent.com/-uPG50w9EmkM/VEDXQ-LPnnI/AAAAAAANgqE/VvaMNuGpOac/s53/9.png"){
        $("#imgnose").attr("src","https://lh3.googleusercontent.com/-IpnwTDPvKJ8/VEE9ewLerrI/AAAAAAANgqk/oj0a3G6Oes0/s53/route%2520b%2526w%2520small.png");
        $("#imgstop").attr("src","https://lh6.googleusercontent.com/-Ed5eM4fjk_o/VEE9e1Q9hTI/AAAAAAANgqo/DuklrSRrCbw/s59/stops%2520b%2526w%2520small.png");
        $("#mapasugg").show();
        $('#divformcontent').show();
        $("#mapasugg_r").hide();
        $('#div_data_r').hide();
        $("#mapasugg_s").hide();
        $('#div_data_s').hide();
        $('#titulosmapa').hide();
        $('#mapasugg_controls').hide();
        $('#isroutebutton').show();
        placeorutaostops=0;
        for(x=0;x<rutasarray.length;x++){
            for(r=0;r<rutasarray[x].markers.length;r++){
                rutasarray[x].markers[r].setMap(null);
            }
            for(s=0;s<rutasarray[x].stops.length;s++){
                rutasarray[x].stops[s].setMap(null);
            }
        }
        
        usermarker.setOptions({draggable: true});
        $('#titulosmapa').html('');
        if(typeof(map)!='undefined'){
            map.setCenter(usermarker.getPosition());
          console.log(1);  map.setZoom(10);
        }
        
        if(typeof(map_sugg)!='undefined'){
            map_sugg.setCenter(usermarker.getPosition());
            map_sugg.setZoom(10);console.log(2);
        }
        
        if(viewsp){ViewHidePlaces();}
    }
    else{
        $("#imgnose").attr("src","https://lh3.googleusercontent.com/-uPG50w9EmkM/VEDXQ-LPnnI/AAAAAAANgqE/VvaMNuGpOac/s53/9.png");
        $("#imgstop").attr("src","https://lh6.googleusercontent.com/-Ed5eM4fjk_o/VEE9e1Q9hTI/AAAAAAANgqo/DuklrSRrCbw/s59/stops%2520b%2526w%2520small.png");
        $('#control_place2').show();
        $('#but_rp').hide();
        $("#mapasugg").show();
        $('#divformcontent').show();
        
        if($('#titulosmapa').text()=='To add, click on the map')
		{ 
            $('#titulosmapa').html('To draw, click on the map');
        }else{
            $('#titulosmapa').hide();
        }
		
        $("#mapasugg_r").show();
        $('#div_data_r').show();
        $('#div_data_s').hide();				
        $("#mapasugg_s").hide();
        
		placeorutaostops=1;
        for(x=0;x<rutasarray.length;x++){
            if(x==rutaseltoedit)
			{
                for(r=0;r<rutasarray[x].markers.length;r++){
                    if(typeof(map)!='undefined'){
                        rutasarray[x].markers[r].setMap(map);
                    }
                    if(typeof(map_sugg)!='undefined'){
                        rutasarray[x].markers[r].setMap(map_sugg);
                    }							
                }
            }
            for(s=0;s<rutasarray[x].stops.length;s++){
                rutasarray[x].stops[s].setMap(null);
            }
        }
        usermarker.setOptions({draggable: false});
        if(viewsp){ViewHidePlaces();}
    }
	
    google.maps.event.trigger(map_sugg, 'resize');
}
function control_stops(){
    
    if(rutaseltoedit==-1){
        alert('you have to select a route first');
        return false;				 
    }
    
    if($("#imgstop").attr('src')=="https://lh5.googleusercontent.com/-dw-HxABt9TY/VEDXP0utKBI/AAAAAAANgp0/oSLoN9fjBzc/s60/6.png"){
        $("#imgstop").attr("src","https://lh6.googleusercontent.com/-Ed5eM4fjk_o/VEE9e1Q9hTI/AAAAAAANgqo/DuklrSRrCbw/s59/stops%2520b%2526w%2520small.png");
        $("#mapasugg").show();
        $('#divformcontent').show();
        $("#mapasugg_r").hide();
        $('#div_data_r').hide();
        $("#mapasugg_s").hide();
        $('#titulosmapa').hide();
        $('#div_data_s').hide();
        $('#mapasugg_controls').hide();
        $('#isroutebutton').show();
        
        placeorutaostops=0;
        
        for(x=0;x<rutasarray.length;x++){
            for(r=0;r<rutasarray[x].markers.length;r++){
                rutasarray[x].markers[r].setMap(null);
            }
            for(s=0;s<rutasarray[x].stops.length;s++){
                rutasarray[x].stops[s].setMap(null);
            }
        }
        
        usermarker.setOptions({draggable: true});
        $('#titulosmapa').html('');
        
        if(typeof(map)!='undefined'){
            map.setCenter(usermarker.getPosition());
            map.setZoom(10);console.log(3);
        }
        
        if(typeof(map_sugg)!='undefined'){
            map_sugg.setCenter(usermarker.getPosition());
            map_sugg.setZoom(10);console.log(4);
        }
        
        if(viewsp){
            ViewHidePlaces();
        }
    }
    else{
        $("#imgstop").attr("src","https://lh5.googleusercontent.com/-dw-HxABt9TY/VEDXP0utKBI/AAAAAAANgp0/oSLoN9fjBzc/s60/6.png");
        $("#imgnose").attr("src","https://lh3.googleusercontent.com/-IpnwTDPvKJ8/VEE9ewLerrI/AAAAAAANgqk/oj0a3G6Oes0/s53/route%2520b%2526w%2520small.png");
        $('#control_place2').show();
        $('#but_rp').hide();
        $("#mapasugg").show();
        $('#divformcontent').show();
        $("#mapasugg_r").hide();
        $('#div_data_r').hide();
        $('#titulosmapa').show();
        $('#div_data_s').show();
        $("#mapasugg_s").show();
        $('#isroutebutton').hide();

        placeorutaostops=2;
    
        for(x=0;x<rutasarray.length;x++){
            
            for(r=0;r<rutasarray[x].markers.length;r++){
                rutasarray[x].markers[r].setMap(null);
            }
            
            
            
            if(x==rutaseltoedit){
                for(s=0;s<rutasarray[x].stops.length;s++){
                    if(typeof(map)!='undefined'){
                        rutasarray[x].stops[s].setMap(map);
                    }
                    if(typeof(map_sugg)!='undefined'){
                        rutasarray[x].stops[s].setMap(map_sugg);
                    }
                }
            }
        }
        
        usermarker.setOptions({draggable: false});
        $('#titulosmapa').html('To add, click on the map');				
    }				 
    
    google.maps.event.trigger(map3, 'resize');
}
function changepointname(){
puntomodificado=1;
$('#but_rp').show();
var newname=document.getElementById('detail_name').value;
usermarker.setTitle(newname.toString());
			userinfowindow = new google.maps.InfoWindow(
			{ content: newname.toString(),
				size: new google.maps.Size(150,150)
			});
var isr=document.getElementById('isroute').value;
if (isr==1){
usermarker2.setTitle(newname.toString());
usermarker3.setTitle(newname.toString());
}
}
function Createmap_ya(plname,plcoors,city){
	var _url = "http://myezplan.com/webtemp2/data_ajax/suggestions_ajax_content.cfm";
	var _urlconfig = {action:'Createmapa_ya',plname:plname,plcoors:plcoors,city:city};
	$('#createmapa').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$('#createmapa').empty();alert('Error Creating Map, Please try again');
		break;
		}
	});
}
function Createmap(){
	var city=document.getElementById('selcity').value;
	if(city==''){alert('Please select a city');return false;}
	var _url = "http://myezplan.com/webtemp2/data_ajax/suggestions_ajax_content.cfm";
	var _urlconfig = {action:'Createmapa',city:city};
	$('#createmapa').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$('#createmapa').empty();alert('Error Creating Map, Please try again');
		break;
		}
	});
}
$(document).ready(function(e) {
	sendform_ajax=function(formbase){
		document.getElementById('form').submit();
	}
	alert_message=function(){
		alert("Your message has been sent. Thanks for your support");
	}
});
$(document).ready(function(e) {
	$("#form").submit(function(e) {
        e.stopPropagation();
        e.preventDefault();
        var photo_name = $("#detail_photo").val();
        $("#file_n").val(photo_name);
        var _emptyform=true;
        var _inputs=$(this).find("input:text,input:file,input:checkbox,textarea,#detail_photo");
        _inputs.each(function(index, element) {
            var _input=$(element);
            console.log(_input);
            if(element.type=="checkbox"){
                if(_input.is(":checked")){
                    _emptyform=false;
                    return false;
                }
            }else{
                if(_input.val()!=""){
                    _emptyform=false;
                    return false;
                }
            }
        });
        
        if(_emptyform){
			alert("At least one field must be completed. Please try again");
			return false;
		}
		var _buttonsel=false;
		var _inputs=$(this).find("input:checkbox[name='detail_commentbutton']");
		var _commentempty=$("#detail_comment").val()=="";
		_inputs.each(function(index, element) {
			if($(element).is(":checked")){
				_buttonsel=true;
				return false;
			}
		});
		if(_buttonsel && _commentempty){
			alert("At least one field must be completed. Please try again");
			return false;
		}
		sendform_ajax($(this));
		return false;
	});

	return false;
});
