// JavaScript Document
    function openreportfaq(donde){
			if(donde==0){
				var pagefaq='report_p';
			}else{
				if(placeorutasostops==0){var pagefaq='report_p_places';}
				if(placeorutasostops==1){var pagefaq='report_p_rutas';}
				if(placeorutasostops==2){var pagefaq='report_p_stops';}
			}
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
		var popZindez = (parseInt($("#mask-reportview").css("z-index"))) + 5;
		$('#mask-faq').css({'z-index' : popZindez});
		var popZindez2=popZindez+5;
		$('#myeztravel-faq').css({'z-index' : popZindez2});
		$('#mask-faq').fadeIn(300);
		$('#myeztravel-faq').fadeIn(300);
		}
	});
	}
function CreateCaptcha(){
			var url = "data_ajax/reportaproblem_content.cfm?rnu=5131616516651";
			var urlconfig = {action:'CreateCaptcha'};
			$("#captcha_nologin").load(url,urlconfig);
}
function changecity_(){
var city=document.getElementById('selcity').value;
if(city==0){return false;}
var url = "4t_createnew.cfm";
var urlconfig = {city:city};
$("#createmapa").load(url,urlconfig);
}
function changecity_2(){
var city=document.getElementById('selcity').value;if(city==0){return false;}

			var url = "4s_createnew.cfm";
			var urlconfig = {city:city};
			$("#createmapa_js").load(url,urlconfig);
}
function changecountry_(){
	var suma=0;
var estado=document.getElementById('selcountry').value;
var sel='<select class="select_m" id="selcity" onchange="changecity_();"><option value="0">Select City</option>';
for(x=0;x<cityesarray.length;x++){
var thiscity=cityesarray[x].split('*');
var thised=thiscity[0];
var thisid=thiscity[1];
var thisname=thiscity[2];
if(thised==estado)
{
	
	sel+='<option value="'+thisid+'">'+thisname+'</option>';
	suma+=1;
	
}
}
sel+='</select>';
if(suma==0){/*hacer una accion para que aparezca el mapa entonces en el country*/}
document.getElementById('div_selcity').innerHTML=sel;
$('#selcity').width($('#selcountry').width());
}
function changecountry_2(){
var estado=document.getElementById('selcountry').value;
var sel='<select  class="select_m"  id="selcity" onchange="changecity_2();"><option value="0">Select City</option>';
for(x=0;x<cityesarray.length;x++){
var thiscity=cityesarray[x].split('*');
var thised=thiscity[0];
var thisid=thiscity[1];
var thisname=thiscity[2];
if(thised==estado){var sel=sel+'<option value="'+thisid+'">'+thisname+'</option>'}
}
var sel=sel+'</select>';
document.getElementById('div_selcity').innerHTML=sel;
$('#selcity').width($('#selcountry').width());
}
function reportaproblem_t_new(city,id){
if(city==0 && id != 0){
	var urlconfig = {action:'Report',city:city,plid:id};
}
if(city==0 && id==0){
	var urlconfig = {action:'Suggest',city:city,plid:id};
}
if(city!=0 && id != 0){
	var conf=confirm('You will create a new transport route, and will lose all modifications to this route, are you sure?')
	if(!conf){return false;}
	var urlconfig = {action:'Suggest',city:city,plid:id};
}
			var url = "reportaproblem_include_t.cfm?rnu=5131616516651";
			$("#middle_mapandcheck").load(url,urlconfig);
}
function reportaproblem_s_new(city,rid,sid){
if(city==0 && rid != 0){
	var urlconfig = {action:'Report',city:city,plid:rid,sid:sid};
}
if(city==0 && rid==0){
	var urlconfig = {action:'Suggest',city:city,plid:rid,sid:sid};
}
if(city!=0 && rid != 0){
	var conf=confirm('You will create a new service, and will lose all modifications to this one, are you sure?')
	if(!conf){return false;}
	var urlconfig = {action:'Suggest',city:city,plid:rid,sid:sid};
}
			var url = "reportaproblem_include_s.cfm?rnu=5131616516651";
			$("#middle_mapandcheck").load(url,urlconfig);
}
savesaspending_s=function(){
	var type=document.getElementById('form_type').value;
	if(type=='SR'){document.getElementById('form_type').value='PSR';}
	else{document.getElementById('form_type').value='PSS';}
	var nombre = document.getElementById('detail_name').value;
	var links=[];
	for(x=0;x<=linkscant;x++){
			var valor=document.getElementById('urllink'+x).value;
			if(valor!=''){
				alguncambio=true;
				links.push(valor);
			}
	}
	document.getElementById('urllinks').value=links.join('*');
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
	for(s=1;s<=4;s++){
		var che=document.getElementById('detail_services'+s).checked;
		if(che){services_.push(s);}
	}
	document.getElementById('detailservices').value=services_.join(',');
	var transport_=[];
	for(t=1;t<=5;t++){
		var chea=document.getElementById('detail_transportation'+t).checked;
		if(chea){transport_.push(t);}
	}
	document.getElementById('detailtransportation').value=transport_.join(',');
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
	document.getElementById('report_id').value=idunico(1);
	if(arraySR_SRP.length==0){
		var ismap=0;
		document.getElementById('ismap').value=ismap;
	}
	else{
		var ismap=1;
		document.getElementById('ismap').value=ismap;
	}
	if (ismap!=0){
		var textoderutas=[];
		var textodestops=[];
		for(ind=0;ind<arraySR_SRP.length;ind++){
			if(arraySR_SRP[ind].locations.length!=0){
				var thisrutatext=[];
				for(ind2=0;ind2<arraySR_SRP[ind].locations.length;ind2++){
					thisrutatext.push(arraySR_SRP[ind].locations[ind2].toString().replace(/ /g,''));
				}
				textoderutas.push(ind+'!'+arraySR_SRP[ind].name+'!'+arraySR_SRP[ind].color.replace('#','')+'!'+arraySR_SRP[ind].rid+'!'+thisrutatext.join('*')+'!'+arraySR_SRP[ind].icon)
				for(ind3=0;ind3<arraySR_SRP[ind].stops.length;ind3++){
					var desc=arraySR_SRP[ind].stops[ind3].desc;
					if(desc=='' || desc==' '){var desc='NODESC';}
					textodestops.push(arraySR_SRP[ind].stops[ind3].getPosition().toString().replace(/ /g,'')+'*'+arraySR_SRP[ind].stops[ind3].getTitle()+'*'+desc+'*'+arraySR_SRP[ind].stops[ind3].inroute)
				}
			}
		}
		document.getElementById('ruta_data').value=textoderutas.join('?');
		document.getElementById('stops_data').value=textodestops.join('!');
	}
	document.getElementById('detail_type').value=document.getElementById('detail_type').value;
$("#form_reportaproblem").submit();
}
ValidateSave4= function(){
	var hayusr=document.getElementById('hayuser').value;
	if(hayusr==0){
		var create_captcha = $.trim($("#create_captcha").val());
		if(!(create_rnd == create_captcha)){
			alert('Verification code incorrect. Please try again');
			CreateCaptcha();
			return false;
		}
	}
document.getElementById('rutacoors').value=locations.join('*').toString().replace(/ /g,'');	
stops_=[];
for(s=0;s<stops.length;s++){
	var desc=' ';
	if(stops[s].desc!=''){var desc=' ';}
	stops_.push(stops[s].getPosition().toString().replace(/ /g,'')+'*'+stops[s].name+'*'+desc+'*0')
}
document.getElementById('rutastops').value=stops_.join('!');
document.getElementById('id_reporte').value=idunico(1);
var services_=[];var transport_=[];
for(c=1;c<=4;c++){
	var che=document.getElementById('detail_services'+c).checked;
	if(che){services_.push(c);}
}
document.getElementById('detailservices').value=services_.join(',');
for(c=1;c<=5;c++){
	var che=document.getElementById('detail_transportation'+c).checked;
	if(che){transport_.push(c);}
}
document.getElementById('detailtransportation').value=transport_.join(',');
	var links=[];
	for(x=0;x<=linkscant;x++){
			var valor=document.getElementById('urllink'+x).value;
			if(valor!=''){
				alguncambio=true;
				links.push(valor);
			}
	}
	document.getElementById('urllinks').value=links.join('*');
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
$('#form_suggestroute').submit();
}
closereport=function(){
window.close();
}
savesaspending_i=function(){
document.getElementById('rutacoors').value=locations.join('*').toString().replace(/ /g,'');	
document.getElementById('form_type').value='PIR';
stops_=[];
for(s=0;s<stops.length;s++){
	var desc=' ';
	if(stops[s].desc!=''){var desc=' ';}
	stops_.push(stops[s].getPosition().toString().replace(/ /g,'')+'*'+stops[s].name+'*'+desc+'*0')
}
document.getElementById('rutastops').value=stops_.join('!');
document.getElementById('id_reporte').value=idunico(1);
var services_=[];var transport_=[];
for(c=1;c<=4;c++){
	var che=document.getElementById('detail_services'+c).checked;
	if(che){services_.push(c);}
}
document.getElementById('detailservices').value=services_.join(',');
for(c=1;c<=5;c++){
	var che=document.getElementById('detail_transportation'+c).checked;
	if(che){transport_.push(c);}
}
document.getElementById('detailtransportation').value=transport_.join(',');
	var links=[];
	for(x=0;x<=linkscant;x++){
			var valor=document.getElementById('urllink'+x).value;
			if(valor!=''){
				alguncambio=true;
				links.push(valor);
			}
	}
	document.getElementById('urllinks').value=links.join('*');
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
$('#form_suggestroute').submit();
}
ValidateSave3= function(){
	var hayusr=document.getElementById('hayuser').value;
	if(hayusr==0){
		var create_captcha = $.trim($("#create_captcha").val());
		if(!(create_rnd == create_captcha)){
			alert('Verification code incorrect. Please try again');
			CreateCaptcha();
			return false;
		}
	}
	var type=document.getElementById('form_type').value;
	var nombre = document.getElementById('detail_name').value;
	if(nombre=='' && type == 'SS'){
		alert('Please enter a valid name');
		document.getElementById('detail_name').focus();
		return false;
	}

	var links=[];
	for(x=0;x<=linkscant;x++){
			var valor=document.getElementById('urllink'+x).value;
			if(valor!=''){
				alguncambio=true;
				links.push(valor);
			}
	}
	document.getElementById('urllinks').value=links.join('*');
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
	for(s=1;s<=4;s++){
		var che=document.getElementById('detail_services'+s).checked;
		if(che){services_.push(s);}
	}
	document.getElementById('detailservices').value=services_.join(',');
	var transport_=[];
	for(t=1;t<=5;t++){
		var chea=document.getElementById('detail_transportation'+t).checked;
		if(chea){transport_.push(t);}
	}
	document.getElementById('detailtransportation').value=transport_.join(',');
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
	document.getElementById('report_id').value=idunico(1);
	if(arraySR_SRP.length==0){
		var ismap=0;
		document.getElementById('ismap').value=ismap;
	}
	else{
		var ismap=1;
		document.getElementById('ismap').value=ismap;
	}
	if (ismap!=0){
		var textoderutas=[];
		var textodestops=[];
		for(ind=0;ind<arraySR_SRP.length;ind++){
			if(arraySR_SRP[ind].locations.length!=0){
				var thisrutatext=[];
				for(ind2=0;ind2<arraySR_SRP[ind].locations.length;ind2++){
					thisrutatext.push(arraySR_SRP[ind].locations[ind2].toString().replace(/ /g,''));
				}
				textoderutas.push(ind+'!'+arraySR_SRP[ind].name+'!'+arraySR_SRP[ind].color.replace('#','')+'!'+arraySR_SRP[ind].rid+'!'+thisrutatext.join('*')+'!'+arraySR_SRP[ind].icon)
				for(ind3=0;ind3<arraySR_SRP[ind].stops.length;ind3++){
					var desc=arraySR_SRP[ind].stops[ind3].desc;
					if(desc=='' || desc==' '){var desc='NODESC';}
					textodestops.push(arraySR_SRP[ind].stops[ind3].getPosition().toString().replace(/ /g,'')+'*'+arraySR_SRP[ind].stops[ind3].getTitle()+'*'+desc+'*'+arraySR_SRP[ind].stops[ind3].inroute)
				}
			}
		}
		document.getElementById('ruta_data').value=textoderutas.join('?');
		document.getElementById('stops_data').value=textodestops.join('!');
	}
	document.getElementById('detail_type').value=document.getElementById('detail_type').value;
$("#form_reportaproblem").submit();
}
savesaspending_t= function(){
	var hayusr=document.getElementById('hayuser').value;
	if(hayusr==0){
		var create_captcha = $.trim($("#create_captcha").val());
		if(!(create_rnd == create_captcha)){
			alert('Verification code incorrect. Please try again');
			CreateCaptcha();
			return false;
		}
	}
	var type=document.getElementById('form_type').value;
	if(type=='TR')
	{
		document.getElementById('form_type').value='PTR';
	}else{
		document.getElementById('form_type').value='PTS';
	}
		
	var nombre = document.getElementById('detail_name').value;
	var links=[];
	for(x=0;x<=linkscant;x++){
			var valor=document.getElementById('urllink'+x).value;
			if(valor!=''){
				alguncambio=true;
				links.push(valor);
			}
	}
	document.getElementById('urllinks').value=links.join('*');
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
	for(s=1;s<=4;s++){
		var che=document.getElementById('detail_services'+s).checked;
		if(che){services_.push(s);}
	}
	document.getElementById('detailservices').value=services_.join(',');
	var transport_=[];
	for(t=1;t<=5;t++){
		var chea=document.getElementById('detail_transportation'+t).checked;
		if(chea){transport_.push(t);}
	}
	document.getElementById('detailtransportation').value=transport_.join(',');
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
	document.getElementById('report_id').value=idunico(1);
	if(!locations){ alert("You must select a location"); return false;}
	if(locations.length>=2){
		var textoderutas=[];
		var textodestops=[];
		for(ind2=0;ind2<locations.length;ind2++){
					textoderutas.push(locations[ind2].toString().replace(/ /g,''));
		}
		for(ind3=0;ind3<stops.length;ind3++){
			var desc=stops[ind3].desc;
			if(desc=='' || desc==' '){var desc='NODESC';}
			textodestops.push(stops[ind3].getPosition().toString().replace(/ /g,'')+'*'+stops[ind3].getTitle()+'*'+desc)
		}
		document.getElementById('ruta_data').value=textoderutas.join('*');
		document.getElementById('stops_data').value=textodestops.join('!');
	}

// verificador $("[name=report_status]");
$("#form_reportaproblem")[0].submit();
}

function VADS()
{/*"userreport_status"*/
INPUTARRAY=["city" ,"ruta_id" ,"report_id" ,"ruta_data" ,"stops_data" ,"placecoors" ,"ismap" ,"form_type" ,"form_type2" ,"report_status" ,"detail_name" ,"detail_type" ,"detail_desc" ,"desc_url" ,"img_links" ,"img_toupload" ,"detail_hoursoperation" ,"detail_regularprice" ,"detail_tips" ,"detail_duration" ,"detail_activities" ,"urllink0" ,"urllinks" ,"fechai_0" ,"fechaf_0" ,"w_text_0" ,"whats" ,"detailservices" ,"detailtransportation" ,"detail_phone" ,"detail_website" ,"detail_address" ,"detail_comment" ,"detailcomment" ,"hayuser"];
for(i=0;i<=INPUTARRAY.length-1;i++)
/*f*/{
if(!$("[name="+INPUTARRAY[i]+"]")[0])
{
  alert(INPUTARRAY[i]+' No defined');
  //return false;
}
/*f*/}
}

ValidateSave2= function(){


	var hayusr=document.getElementById('hayuser').value;
	if(hayusr==0){
		var create_captcha = $.trim($("#create_captcha").val());
		if(!(create_rnd == create_captcha)){
			alert('Verification code incorrect. Please try again');
			CreateCaptcha();
			return false;
		}
	}
	var type=document.getElementById('form_type').value;
	var nombre = document.getElementById('detail_name').value;

	if(nombre=='' && type == 'TS'){
		alert('Please enter a valid name');
		document.getElementById('detail_name').focus();
		return false;
	}
	var sta=document.getElementById('userreport_status').value;
	var links=[];
	for(x=0;x<=linkscant;x++){
			var valor=document.getElementById('urllink'+x).value;
			if(valor!=''){
				alguncambio=true;
				links.push(valor);
			}
	}
	document.getElementById('urllinks').value=links.join('*');
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
	for(s=1;s<=4;s++){
		var che=document.getElementById('detail_services'+s).checked;
		if(che){services_.push(s);}
	}
	document.getElementById('detailservices').value=services_.join(',');
	var transport_=[];
	for(t=1;t<=5;t++){
		var chea=document.getElementById('detail_transportation'+t).checked;
		if(chea){transport_.push(t);}
	}
	document.getElementById('detailtransportation').value=transport_.join(',');
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
	document.getElementById('report_id').value=idunico(1);
	if(locations.length>=2){
		var textoderutas=[];
		var textodestops=[];
		for(ind2=0;ind2<locations.length;ind2++){
					textoderutas.push(locations[ind2].toString().replace(/ /g,''));
		}
		for(ind3=0;ind3<stops.length;ind3++){
			var desc=stops[ind3].desc;
			if(desc=='' || desc==' '){var desc='NODESC';}
			textodestops.push(stops[ind3].getPosition().toString().replace(/ /g,'')+'*'+stops[ind3].getTitle()+'*'+desc)
		}
		document.getElementById('ruta_data').value=textoderutas.join('*');
		document.getElementById('stops_data').value=textodestops.join('!');
	}
	else{alert('you have to create a valid route');return false;}
	
    
	
	document.getElementById('form_reportaproblem').submit();
}
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
function addplacetoroute_RP(rutaid,idx){
//	alert(idx);
	for(p=0;p<placesasstops.length;p++){
		if(placesasstops[p].placeid==rutaid){
			var icon_ = placesasstops[p].getIcon();
			var icon=icon_.replace('.png','s.png');
			placesasstops[p].setIcon(icon);
			placesasstops[p].isadded=1;
			placesasstops[p].inroute=idx;
		}
	}
	arraySR_RP[idx].ids.push(rutaid);
	CloseInfo_RP();
}
function unaddplacetoroute_RP(rutaid,idx){
	for(p=0;p<placesasstops.length;p++){
		if(placesasstops[p].placeid==rutaid){
			var icon_ = placesasstops[p].getIcon();
			var icon=icon_.replace('s.png','.png');
			placesasstops[p].setIcon(icon);
			placesasstops[p].isadded=0;
			placesasstops[p].inroute=-1;
			if(!viewsp){placesasstops[p].setMap(null);}
		}
	}
	var index=-1;
	for(a=0;a<arraySR_RP[idx].ids.length;a++){
		if(arraySR_RP[idx].ids[a]==rutaid){var index=a;}
	}
	if(index!=-1){arraySR_RP[idx].ids.splice(index,1);}
	CloseInfo_RP();
}
function ShowInfo_RP(rutaid){
			var textoboton='Add';
			for(s=0;s<arraySR_RP[actualroute_RP].stops.length;s++){
				if(rutaid==arraySR_RP[actualroute_RP].stops[s].placeid){var textoboton='Remove';}
			}
			var urlconfig = {action:'stopsdata',ruta_id:rutaid,source:'report_panel',texto:textoboton};
			var url = "data_ajax/reportaproblem_content.cfm?rnu=5131616516651";
			$("#div_stopsdata_RP").load(url,urlconfig);
			$("#div_stopsdata_RP").scrollToMe();
}
function CloseInfo_RP(){
	$("#div_stopsdata_RP").empty();
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
			
//			
			$(popup).fadeIn(150);
			//$(popup).scrollToMe();
}
function ViewHidePlaces(){
if(viewsp){
	viewsp=false;
	$("#div_stopsdata_RP").empty();
	document.getElementById('buttplacesasstops').style.backgroundColor='lightgray';
	$('#spanplacesasstops').hide();
	$('#spanplacesnormal').show();
for(p=0;p<placesasstops.length;p++){
	placesasstops[p].setMap(null);
}
}
else{
	viewsp=true;
	document.getElementById('buttplacesasstops').style.backgroundColor='#17375E';
	$('#spanplacesasstops').show();
	$('#spanplacesnormal').hide();
	for(p=0;p<placesasstops.length;p++){
		if(map.getBounds().contains(placesasstops[p].getPosition())){
			placesasstops[p].setMap(map);
		};
	}
}
}
function ver_cambio(valor){
//alert(valor);
if(valor!=''){alguncambio=true;}
}
function idunico(lolo){
aleat = Math.random() * 9999999999999999;
aleat2 = Math.random() * 9999999999999999;
aleatf = Math.round(aleat+aleat2);
return aleatf;
}
savesaspending=function(){

	var nombre = document.getElementById('detail_name').value;
	var plcoors=usermarker.getPosition().toString().replace(/ /g,'');
	document.getElementById('placecoors').value=plcoors;
	var links=[];
	for(x=0;x<=linkscant;x++){
			var valor=document.getElementById('urllink'+x).value;
			if(valor!=''){
				alguncambio=true;
				links.push(valor);
			}
	}
	document.getElementById('urllinks').value=links.join('*');
	document.getElementById('form_type').value='PR';
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
	document.getElementById('report_id').value=idunico(1);
	if(arraySR_RP.length==0){
		var ismap=0;
		document.getElementById('ismap').value=ismap;
	}
	else{
		var ismap=1;
		document.getElementById('ismap').value=ismap;
	}
	if (ismap!=0){
		var textoderutas=[];
		var textodestops=[];
		for(ind=0;ind<arraySR_RP.length;ind++){
			if(arraySR_RP[ind].locations.length!=0){
				var thisrutatext=[];
				for(ind2=0;ind2<arraySR_RP[ind].locations.length;ind2++){
					thisrutatext.push(arraySR_RP[ind].locations[ind2].toString().replace(/ /g,''));
				}
				textoderutas.push(ind+'!'+arraySR_RP[ind].name+'!'+arraySR_RP[ind].color.replace('#','')+'!'+arraySR_RP[ind].rid+'!'+thisrutatext.join('*')+'!'+arraySR_RP[ind].icon)
				for(ind3=0;ind3<arraySR_RP[ind].stops.length;ind3++){
					var desc=arraySR_RP[ind].stops[ind3].desc;
					if(desc=='' || desc==' '){var desc='NODESC';}
					textodestops.push(arraySR_RP[ind].stops[ind3].getPosition().toString().replace(/ /g,'')+'*'+arraySR_RP[ind].stops[ind3].getTitle()+'*'+desc+'*'+arraySR_RP[ind].stops[ind3].inroute+'*'+arraySR_RP[ind].stops[ind3].placeid)
				}
//				for(p=0;p<placesasstops.length;p++){
//					if(placesasstops[p].isadded==1 && placesasstops[p].inroute==ind){
//						textodestops.push(placesasstops[p].getPosition().toString().replace(/ /g,'')+'*'+placesasstops[p].getTitle()+'*NODESC*'+placesasstops[p].inroute+'*'+placesasstops[p].placeid);
//					}
//				}
			}
		}
		document.getElementById('ruta_data').value=textoderutas.join('?');
		document.getElementById('stops_data').value=textodestops.join('!');
	}
//if(!alguncambio && !modificadopunto && !modificastops && !modificaruta && transport_.join(',')=='' && services_.join(',')==''){alert('Nothing to save');return false;}
$("#form_reportaproblem").submit();
setTimeout(Close_reportaproblem(),500);
}
ValidateSave_RP_P=function(){
	var hayusr=document.getElementById('hayuser').value;
	if(hayusr==0){
		var create_captcha = $.trim($("#create_captcha").val());
		if(!(create_rnd == create_captcha)){
			alert('Verification code incorrect. Please try again');
			CreateCaptcha();
			return false;
		}
	}

	var nombre = document.getElementById('detail_name').value;
	var plcoors=usermarker.getPosition().toString().replace(/ /g,'');
	document.getElementById('placecoors').value=plcoors;

	var links=[];
	for(x=0;x<=linkscant;x++){
			var valor=document.getElementById('urllink'+x).value;
			if(valor!=''){
				alguncambio=true;
				links.push(valor);
			}
	}
	document.getElementById('urllinks').value=links.join('*');
	document.getElementById('form_type').value='R';
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
	document.getElementById('report_id').value=idunico(1);
	if(arraySR_RP.length==0){
		var ismap=0;
		document.getElementById('ismap').value=ismap;
	}
	else{
		var ismap=1;
		document.getElementById('ismap').value=ismap;
	}
	if (ismap!=0){
		var textoderutas=[];
		var textodestops=[];
		for(ind=0;ind<arraySR_RP.length;ind++){
			if(arraySR_RP[ind].locations.length!=0){
				var thisrutatext=[];
				for(ind2=0;ind2<arraySR_RP[ind].locations.length;ind2++){
					thisrutatext.push(arraySR_RP[ind].locations[ind2].toString().replace(/ /g,''));
				}
				textoderutas.push(ind+'!'+arraySR_RP[ind].name+'!'+arraySR_RP[ind].color.replace('#','')+'!'+arraySR_RP[ind].rid+'!'+thisrutatext.join('*')+'!'+arraySR_RP[ind].icon)
				for(ind3=0;ind3<arraySR_RP[ind].stops.length;ind3++){
					var desc=arraySR_RP[ind].stops[ind3].desc;
					if(desc=='' || desc==' '){var desc='NODESC';}
					textodestops.push(arraySR_RP[ind].stops[ind3].getPosition().toString().replace(/ /g,'')+'*'+arraySR_RP[ind].stops[ind3].getTitle()+'*'+desc+'*'+arraySR_RP[ind].stops[ind3].inroute+'*'+arraySR_RP[ind].stops[ind3].placeid)
				}
//				for(p=0;p<placesasstops.length;p++){
//					if(placesasstops[p].isadded==1 && placesasstops[p].inroute==ind){
//						textodestops.push(placesasstops[p].getPosition().toString().replace(/ /g,'')+'*'+placesasstops[p].getTitle()+'*NODESC*'+placesasstops[p].inroute+'*'+placesasstops[p].placeid);
//					}
//				}
			}
		}
		document.getElementById('ruta_data').value=textoderutas.join('?');
		document.getElementById('stops_data').value=textodestops.join('!');
	}
if(!alguncambio && !modificadopunto && !modificastops && !modificaruta && transport_.join(',')=='' && services_.join(',')==''){alert('Nothing to save');return false;}
$("#form_reportaproblem").submit();
setTimeout(Close_reportaproblem(),500);
}
ValidateSave= function(){
var hayusr=document.getElementById('hayuser').value;
if(hayusr==0){
var create_captcha = $.trim($("#create_captcha").val());
if(!(create_rnd == create_captcha)){
alert('Verification code incorrect. Please try again');
return false;
}
}

var nombre = document.getElementById('detail_name').value;
var plcoors=usermarker.getPosition();
document.getElementById('placecoors').value=plcoors;
var fname=document.getElementById('detail_photo').value;
document.getElementById('file_n').value=fname;
var ismap=document.getElementById('ismap').value;
if (ismap!=0){
	var rutapath=armarutassave('texto');
	document.getElementById('ruta_data').value=rutapath;
if(stopsarray.length>0){
var stops_='';
for(var i=0; i<stopsarray.length;i++){
if(stops_==''){var div='';}else{var div='!';}
var stops_=stops_+div+stopsarray[i].getPosition()+'*'+stopsarray[i].getTitle()+'*'+stopsarray[i].desc+'*'+stopsarray[i].inroute+'*'+0;
}
for(p=0;p<placesasstops.length;p++){
if(placesasstops[p].isadded==1){
if(stops_==''){var div='';}else{var div='!';}
	stops_=stops_+div+placesasstops[p].getPosition()+'*'+placesasstops[p].getTitle()+'*ND*'+placesasstops[p].inroute+'*'+placesasstops[p].placeid;
	}
}
document.getElementById('stops_data').value=stops_;
//alert(stops_)
}
}
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
var cheb1=document.getElementById('detail_commentbutton1').checked;
if(cheb1){comment_.push('Audio');}
var cheb2=document.getElementById('detail_commentbutton2').checked;
if(cheb2){comment_.push('Text');}
var cheb3=document.getElementById('detail_commentbutton3').checked;
if(cheb3){comment_.push('Video');}
var cheb4=document.getElementById('detail_commentbutton4').checked;
if(cheb4){comment_.push('Pictures');}
var cheb5=document.getElementById('detail_commentbutton5').checked;
if(cheb5){comment_.push('What');}
var cheb6=document.getElementById('detail_commentbutton6').checked;
if(cheb6){comment_.push('Deal');}
document.getElementById('detailcomment').value=comment_.join(',');
document.getElementById('report_id').value=idunico(1);
if(!alguncambio && !modificadopunto && !modificastops && !modificaruta && transport_.join(',')=='' && services_.join(',')==''){alert('Nothing to save');return false;}
$("#form_reportaproblem").submit();
}
		 control_place=function(){
				 $('#control_place').css("background-color", "#17375E");
				 $('#control_route').attr('src','https://lh3.googleusercontent.com/-IpnwTDPvKJ8/VEE9ewLerrI/AAAAAAANgqk/oj0a3G6Oes0/s53/route%2520b%2526w%2520small.png');
				 $('#control_stops').css("background-color", "lightgray");
				 $('#control_place2').hide();
				 $("#mapareport").show();
				 $('#divformcontent').show();
				$("#mapareport_r").hide();
				$('#div_data_r').hide();
				$("#mapareport_s").hide();
				$('#div_data_s').hide();
				google.maps.event.trigger(map, 'resize');
        }
		 control_route=function(){
				 $('#control_place').css("background-color", "lightgray");
				 $('#control_route').attr('src','https://lh3.googleusercontent.com/-uPG50w9EmkM/VEDXQ-LPnnI/AAAAAAANgqE/VvaMNuGpOac/s53/9.png');
				 $('#control_stops').css("background-color", "lightgray");
				 $('#control_place2').show();
				$("#mapareport").hide();
				$('#divformcontent').hide(); 
				$("#mapareport_r").show();
				$('#div_data_r').show();
				$('#div_data_s').hide();				
				$("#mapareport_s").hide();
				map2.setCenter(usermarker.getPosition());
				google.maps.event.trigger(map2, 'resize');
        }
		 control_stops=function(){
				 $('#control_place').css("background-color", "lightgray");
				 $('#control_route').attr('src','https://lh3.googleusercontent.com/-IpnwTDPvKJ8/VEE9ewLerrI/AAAAAAANgqk/oj0a3G6Oes0/s53/route%2520b%2526w%2520small.png');
				 $('#control_stops').css("background-color", "#17375E");
				 $('#control_place2').show();
				 $("#mapareport").hide();
				 $('#divformcontent').hide();
				$("#mapareport_r").hide();
				$('#div_data_r').hide();
				$('#div_data_s').show();				
				$("#mapareport_s").show();
				map3.setCenter(usermarker.getPosition())
				google.maps.event.trigger(map3, 'resize');
        }
		 control_place_RP=function(){
				 $('#control_place').css("background-color", "#17375E");
				 $('#control_route').attr('src','https://lh3.googleusercontent.com/-IpnwTDPvKJ8/VEE9ewLerrI/AAAAAAANgqk/oj0a3G6Oes0/s53/route%2520b%2526w%2520small.png');
				 $('#control_stops').css("background-color", "lightgray");
				 $('#control_stops').hide();
				 $('#control_place2').hide();
				 $('#divformcontent').show();
				 $('#div_data_r').hide();
				 $('#div_data_s').hide();
				 for(a=0;a<arraySR_RP.length;a++){
					 arraySR_RP[a].setMap(null);
					 for(m=0;m<arraySR_RP[a].markers.length;m++){
						 arraySR_RP[a].markers[m].setMap(null);
					 }
					 for(s=0;s<arraySR_RP[a].stops.length;s++){
						 arraySR_RP[a].stops[s].setMap(null);
					 }
				 }
				 for(p=0;p<placesasstops.length;p++){
					placesasstops[p].setMap(null);
				 }
				 if(viewsp){ViewHidePlaces();}
				 map.setCenter(usermarker.getPosition());
				 map.setZoom(10);
				 setactualroute_RP(-1);
				 viewstopsRP=0;
				 usermarker.setOptions({draggable: true});
				 placeorutasostops=0;
        }
		 control_route_RP=function(){
				 $('#control_place').css("background-color", "lightgray");
				 $('#control_route').attr('src','https://lh3.googleusercontent.com/-uPG50w9EmkM/VEDXQ-LPnnI/AAAAAAANgqE/VvaMNuGpOac/s53/9.png');
				 $('#control_stops').css("background-color", "lightgray");
				 $('#control_stops').show();
				 $('#control_place2').show();
				$('#divformcontent').hide();
				$('#div_data_r').show();
				$('#div_data_s').hide();				
				 if(actualroute_RP==-1){
					 if(arraySR_RP.length>=2){
						 map.fitBounds(todaslasrutasBounds);
						 for(a=0;a<arraySR_RP.length;a++){
							 arraySR_RP[a].setMap(map);
						 }
					 }
				 }
				 else{
					 if(arraySR_RP[actualroute_RP].locations.length>=2){
						  map.fitBounds(arraySR_RP[actualroute_RP].bounds);
					 }
					 for(m=0;m<arraySR_RP[actualroute_RP].markers.length;m++){
						 arraySR_RP[actualroute_RP].markers[m].setMap(map);
					 }
					 for(s=0;s<arraySR_RP[actualroute_RP].stops.length;s++){
						 arraySR_RP[actualroute_RP].stops[s].setMap(null);
					 }
				 }
 				 for(p=0;p<placesasstops.length;p++){
					placesasstops[p].setMap(null);
				 }
				 if(viewsp){ViewHidePlaces();}
				 viewstopsRP=0;
				 usermarker.setOptions({draggable: false});
				 placeorutasostops=1;
        }
		 control_stops_RP=function(){
			// alert(actualroute_RP);
			 if(actualroute_RP!=-1){
				 $('#control_route').attr('src','https://lh3.googleusercontent.com/-IpnwTDPvKJ8/VEE9ewLerrI/AAAAAAANgqk/oj0a3G6Oes0/s53/route%2520b%2526w%2520small.png');
				 $('#control_stops').css("background-color", "#17375E");
				 $('#divformcontent').hide();
				$('#div_data_r').hide();
				$('#div_data_s').show();
				for(m=0;m<arraySR_RP[actualroute_RP].markers.length;m++){
					arraySR_RP[actualroute_RP].markers[m].setMap(null);
				}
				for(s=0;s<arraySR_RP[actualroute_RP].stops.length;s++){
					arraySR_RP[actualroute_RP].stops[s].setMap(map);
				}
				for(p=0;p<placesasstops.length;p++){
					if(placesasstops[p].isadded==1 && placesasstops[p].inroute==actualroute_RP){
						placesasstops[p].setMap(map);
					}
				}
				viewstopsRP=1;
				usermarker.setOptions({draggable: false});
				placeorutasostops=2;
			 }
			 else{
				 alert('You have to select a subroute first');
			 }
        }
$(document).ready(function(e) {
	sendform_ajax=function(formbase){
		var _url = 'data_ajax/reportaproblem_ajax_event.cfm?rnu='+randomNumberUrl();
		var _urlconfig = formbase.serialize()+"&action=sendreport";
		console.log(_urlconfig);
		$.post(_url,_urlconfig)
			.error(sendform_ajax_error)
			.success(sendform_ajax_success)
		;
	}
	sendform_ajax_error=function(xhr, ajaxOptions, thrownError){
		alert(thrownError);
	}
	sendform_ajax_success=function(response, status, xhr){
		var _response=$.parseJSON(response);
		if(_response.MESSAGE){
		}
		alert(_response.MESSAGE);
	}
});
$(document).ready(function(e) {
	$("#form").submit(function(e) {
		e.stopPropagation();e.preventDefault();
		var _emptyform=true;
		var _inputs=$(this).find("input:text,input:checkbox,textarea");
		_inputs.each(function(index, element) {
			var _input=$(element);
			//console.log(_input);
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
		//console.log(_emptyform);
		sendform_ajax($(this));
		return false;
	});
	alguncambio=false;
	modificadopunto=false;
	modificastops=false;
	modificaruta=false;
	$("#form_report").slideToggle(250);
	varmas = 1
    $(".showmore_opt").click(function(){
		$("#form_report").slideToggle(250);
		if (varmas==0){
			varmas=1;
			$(this).css("background-color", "lightgray")
		}
		else{
			varmas=0;
			 $(this).css("background-color", "#17375E");
		}	  
    });	
	//if(cf_sid==""){pedir_sesion("");}
	return false;
});