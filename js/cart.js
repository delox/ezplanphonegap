// JavaScript Document
function markdealasbuyed(ruta_id, cityname, plan_name, ruta_name, Title, BuyNowLink, coordenadas, serviceprovider_id, buyed){
	var che=document.getElementById('buyeddealche_'+ruta_id).checked;
	var todo=0;
	if(che){var todo=1;}
		var _url = "https://myezplan.com/data_ajax/cart_ajax_content.cfm?"+randomNumberUrl()+"";
		var _urlconfig = {action: "markbuyedexternaldeal", todo:todo, ruta_id:ruta_id, cityname:cityname, plan_name:plan_name, ruta_name:ruta_name, Title:Title, BuyNowLink:BuyNowLink, coordenadas:coordenadas, serviceprovider_id:serviceprovider_id, buyed:buyed};
		$(".div_funcs_"+ruta_id).load(_url,_urlconfig,
		function (response, status, xhr){
			switch (status){
				case "error":
					$(".div_funcs_"+ruta_id).empty();
					console.log("error getting data: " + xhr.statusText);
					break;
				case "success":
					break;
				default:
					break;
			}
		});
}
function showhidedet(){
if(showhide_dets){
showhide_dets=false;
$('.trhide').hide("slow");
document.getElementById('buttonshohide').style.backgroundColor='lightgray';
}
else{
showhide_dets=true;
$('.trhide').show("slow");
document.getElementById('buttonshohide').style.backgroundColor='rgb(23, 55, 94)';
}
}
faqpage='shoppingcart';
global_carttotal = 0;
global_cartchanged=false;
global_cartitemcategorytimer=0;
global_showloadinginit=true;
/* Functions */
testbooking = function(pcode,ocode,idunico){
var xmlString='<ProductItemReservation>'; 
var xmlString=xmlString+'<DistributorItemReference>'+idunico+'-'+ocode+'</DistributorItemReference>';
var date=$.cookie(idunico+'_'+ocode+'_date');
var date1= new fecha(date);
var xmlString=xmlString+'<ProductCode>SIC.'+pcode+'</ProductCode><OptionCode>'+ocode+'</OptionCode><TravelDate>'+date1.anio+'-'+date1.mes+'-'+date1.dia+'+00:00</TravelDate>'
var data=$.cookie(idunico+'_'+ocode)
var data_=data.split('!')
var cat1=0;var cat2=0;var cat3=0;var cat4=0;var cat5=0;
var travelers=[];
for(d=0;d<data_.length;d++){
var este=data_[d].split('*');
var catid=este[0];
var _catid=catid.toString()
var catid_=catid.toString().substring((_catid.length-1),_catid.length);
if(catid_=='1'){var cat1=cat1+1;}
if(catid_=='2'){var cat2=cat2+1;}
if(catid_=='3'){var cat3=cat3+1;}
if(catid_=='4'){var cat4=cat4+1;}
if(catid_=='5'){var cat5=cat5+1;}
var nombre=este[2];
var age=este[3];
travelers.push(nombre+'*'+age);
}
var xmlString=xmlString+'<NumAdults>'+cat4+'</NumAdults><NumChildren>'+cat2+'</NumChildren><NumYouth>'+cat3+'</NumYouth><NumInfant>'+cat1+'</NumInfant><NumSenior>'+cat5+'</NumSenior>';
var amount=$('#sbt_'+idunico).html();
var amount=amount.replace('$','');
var xmlString=xmlString+'<Price><Currency>USD</Currency><Amount>'+amount+'</Amount></Price>';
var xmlString=xmlString+'<Travellers>'
for(t=0;t<travelers.length;t++){
var tra=travelers[t].split('*');
var nam=tra[0].split(' ');
var name=nam[0];
var name2=nam[1];
var age=tra[1];
var xmlString=xmlString+'<Traveller><GivenName>'+name+'</GivenName><FamilyName>'+name2+'</FamilyName><Title>Mr</Title><Age>'+age+'</Age><Email>'+$.cookie("EMAILGEN")+'</Email></Traveller>';
}
var xmlString=xmlString+'</Travellers></ProductItemReservation>'
arraydexmls_v.push(xmlString);
for(a=0;a<arraydexmls_v.length;a++){
//alert(arraydexmls_v[a])
}
$.cookie("XMLBOOKING",arraydexmls_v.join(''))
//	var _url = "data_ajax/cart_ajax_content.cfm?"+randomNumberUrl()+"";
//		var _urlconfig = {action: "viatorbooking",xml:xmlString};
//		$("#viatorresponse").load(_url,_urlconfig,
//		function (response, status, xhr){
//			switch (status){
//				case "error":
//					$("#viatorresponse").empty();
//					console.log("error getting data: " + xhr.statusText);
//					break;
//				case "success":
//					break;
//				default:
//					break;
//			}
//		});
}
fecha = function(cadena){  
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
cookiemails=function(ocode,idunico){
var email=document.getElementById(idunico+'_'+ocode+'_email').value;
if(email!=''){
if(email.indexOf('@')==-1 || email.indexOf('.')==-1){alert('Not a valid email address');return false;}
	$.cookie("EMAILGEN",email);
	$.cookie(idunico+'_'+ocode+'_email',email);
	}
}
cookiedates=function(ocode,idunico){
var fecha1=document.getElementById(idunico+'_'+ocode+'_date').value;
var fechaf=document.getElementById(idunico+'_'+ocode+'_date_f').value;
var fechat=document.getElementById(idunico+'_'+ocode+'_date_t').value;
var fecha2=document.getElementById('fechahoy').value;
var da=parseInt(document.getElementById(idunico+'_'+ocode+'_date_d').value);
if(fecha1!=''){
    var fecha_1 = new fecha(fecha1) 
	var miFecha1 = new Date(fecha_1.anio, fecha_1.mes, fecha_1.dia )
	var fecha_2= new fecha(fecha2)
	var miFecha2= new Date(fecha_2.anio, fecha_2.mes, fecha_2.dia )
	var fecha_f= new fecha(fechaf)
	var miFecha_f=new Date(fecha_f.anio, fecha_f.mes, fecha_f.dia)
	var fecha_t= new fecha(fechat)
	var miFecha_t=new Date(fecha_t.anio, fecha_t.mes, fecha_t.dia)
	var diferencia_da = miFecha1.getTime() - miFecha2.getTime()   
    var dias_da = Math.floor(diferencia_da / (1000 * 60 * 60 * 24))
	var diferencia_df = miFecha1.getTime() - miFecha_f.getTime()   
    var dias_df = Math.floor(diferencia_df / (1000 * 60 * 60 * 24))
	var diferencia_dt = miFecha_t.getTime() - miFecha1.getTime()   
    var dias_dt = Math.floor(diferencia_dt / (1000 * 60 * 60 * 24))
if(dias_da >=da && dias_df>=0 && dias_dt>=0){$.cookie(idunico+'_'+ocode+'_date',fecha1);}
else{
	if(dias_da<da){alert('You have to make reservation with '+da+' days in advance');return false;};
	if(dias_df<0 || dias_dt<0){alert('Out of valid dates, Please enter a valid date');return false;};
	}
}
}
changeages=function(name,age){
$('#'+agetochange).val(age);
$('#'+agetochange).focus();
}
armaautos= function(){
var _cook2=$.cookie("NAMESYAGES");
if(_cook2 && _cook2 != ''){
var namearray=[];
cook2_=_cook2.split('!');
for(c=0;c<cook2_.length;c++){
var este=cook2_[c].split('*')
namearray.push({value:este[0],age:este[1]})
}
}
for(a=0;a<togenerataauto.length;a++){
var campos=togenerataauto[a].split('!');
var thisname=campos[0];
var thisage=campos[1];
	$(thisname).autocomplete({
      minLength: 0,
      source: namearray,
	  select: function( event, ui ) {
        changeages(ui.item.value,ui.item.age)
	  }
    });
$(thisname).attr("autocomplete",'on');
	}
}
$(document).ready(function(e) {
showhide_dets=false;
updateoptdata=function(catid,idunico,x,opid){
var _cook=$.cookie(idunico+"_"+opid);
var _cook2=$.cookie("NAMESYAGES");
var name=document.getElementById(x+'name_'+catid+'_'+idunico+'_'+opid).value || ' ';
var age=document.getElementById(x+'age_'+catid+'_'+idunico+'_'+opid).value ||' ';
if(name !=''){
if(!_cook2 || _cook2==''){$.cookie("NAMESYAGES",name+'*'+age);}
else{
var names_=_cook2.split('!');
var yasta=0;
var replaceage='';
for(n=0;n<names_.length;n++){
var este=names_[n].split('*');
var name2=este[0];
var age2=este[1];
if(name2==name){var yasta=1;if(age2!=age){var replaceage=names_[n];};}
}
if(yasta==0){$.cookie("NAMESYAGES",_cook2+'!'+name+'*'+age);}
if(yasta==1 && replaceage!=''){_cook2=_cook2.replace(replaceage,name+'*'+age);$.cookie("NAMESYAGES",_cook2);}
	}
}
//updatenamesfromcook();
if(!_cook || _cook==''){
	$.cookie(idunico+"_"+opid,catid+'*'+x+'*'+name+'*'+age);
	}
else{
	var cadena='';
	var cook_=_cook.split('!');
	for(c=0;c<cook_.length;c++){
		var este=cook_[c].split('*')
		var cat=este[0];
		var ord=este[1];
		if(cat==catid && ord==x){var cadena=cook_[c];}
		}
if(cadena!=''){var _cook=_cook.replace(cadena,catid+'*'+x+'*'+name+'*'+age);}
else{var _cook=_cook+'!'+catid+'*'+x+'*'+name+'*'+age}
$.cookie(idunico+"_"+opid,_cook);
	}
}

	adddatatooptcat=function(catid,opid,_cant,idunico,W){
var lolo=$.cookie(idunico+'_'+opid+'_date');
if(lolo && lolo !=''){
document.getElementById(idunico+'_'+opid+'_date').value=lolo;
}
var lola=$.cookie(idunico+'_'+opid+'_email');
if(lola && lola !=''){
document.getElementById(idunico+'_'+opid+'_email').value=lola;
}
else{
var lola=$.cookie("EMAILGEN");
document.getElementById(idunico+'_'+opid+'_email').value=lola;
	}
togenerataauto=[];
	if(W=='O'){var cant=parseInt(_cant.val());}
	else{var cant=_cant;}
	var _catid=catid.toString()
	var catid_=catid.toString().substring((_catid.length-1),_catid.length);
	var _cook=$.cookie(idunico+"_"+opid);
	if(!_cook || _cook==''){var cook_=''}else{var cook_=_cook.split('!');}
	if(catid_ == 1 || catid_== '1'){
		var content='<table><tr><td>Name &amp; Last Name</td><td>&nbsp;</td><td align="center">Age</td><td>&nbsp;</td><td>Lead</td></tr>';
	for(x=0;x<cant;x++){
		var name='';
		var age='';
	for(c=0;c<cook_.length;c++){
		var este=cook_[c].split('*')
		var cat=este[0];
		var ord=este[1];
		if(cat==catid && ord==x){var name=este[2];var age=este[3];}
		}
		var content=content+'<tr><td align="center"><input onfocus="agetochange='+"'"+x+'age_'+catid+'_'+idunico+'_'+opid+"';"+'nametochange='+"'"+x+'name_'+catid+'_'+idunico+'_'+opid+"';"+'" onblur="updateoptdata('+catid+','+"'"+idunico+"'"+','+x+','+"'"+opid+"'"+');" type="text" id="'+x+'name_'+catid+'_'+idunico+'_'+opid+'" value="'+name+'" ></td><td align="center">&nbsp;</td><td><input size="4" onblur="updateoptdata('+catid+','+"'"+idunico+"'"+','+x+','+"'"+opid+"'"+');" type="text" id="'+x+'age_'+catid+'_'+idunico+'_'+opid+'" value="'+age+'"></td><td>&nbsp;</td><td align="center"><input type="radio" name="lolo"></td></tr>';
togenerataauto.push("#"+x+'name_'+catid+'_'+idunico+'_'+opid+'!'+'#'+x+'age_'+catid+'_'+idunico+'_'+opid)
		}
	}	
	if(catid_ == 2 || catid_== '2'){
		var content='<table><tr><td>Name &amp; Last Name</td><td>&nbsp;</td><td align="center">Age</td><td>&nbsp;</td><td>Lead</td></tr>';
	for(x=0;x<cant;x++){
		var name='';
		var age='';
	for(c=0;c<cook_.length;c++){
		var este=cook_[c].split('*')
		var cat=este[0];
		var ord=este[1];
		if(cat==catid && ord==x){var name=este[2];var age=este[3];}
		}
		var content=content+'<tr><td align="center"><input onfocus="agetochange='+"'"+x+'age_'+catid+'_'+idunico+'_'+opid+"';"+'nametochange='+"'"+x+'name_'+catid+'_'+idunico+'_'+opid+"';"+'" onblur="updateoptdata('+catid+','+"'"+idunico+"'"+','+x+','+"'"+opid+"'"+');" type="text" id="'+x+'name_'+catid+'_'+idunico+'_'+opid+'" value="'+name+'" ></td><td align="center">&nbsp;</td><td><input size="4" onblur="updateoptdata('+catid+','+"'"+idunico+"'"+','+x+','+"'"+opid+"'"+');" type="text" id="'+x+'age_'+catid+'_'+idunico+'_'+opid+'" value="'+age+'"></td><td>&nbsp;</td><td align="center"><input type="radio" name="lolo"></td></tr>';
togenerataauto.push("#"+x+'name_'+catid+'_'+idunico+'_'+opid+'!'+'#'+x+'age_'+catid+'_'+idunico+'_'+opid)
		}
	}	
	if(catid_ == 3 || catid_== '3'){
		var content='<table><tr><td>Name &amp; Last Name</td><td>&nbsp;</td><td align="center">Age</td><td>&nbsp;</td><td>Lead</td></tr>';
	for(x=0;x<cant;x++){
		var name='';
		var age='';
	for(c=0;c<cook_.length;c++){
		var este=cook_[c].split('*')
		var cat=este[0];
		var ord=este[1];
		if(cat==catid && ord==x){var name=este[2];var age=este[3];}
		}
		var content=content+'<tr><td align="center"><input onfocus="agetochange='+"'"+x+'age_'+catid+'_'+idunico+'_'+opid+"';"+'nametochange='+"'"+x+'name_'+catid+'_'+idunico+'_'+opid+"';"+'" onblur="updateoptdata('+catid+','+"'"+idunico+"'"+','+x+','+"'"+opid+"'"+');" type="text" id="'+x+'name_'+catid+'_'+idunico+'_'+opid+'" value="'+name+'" ></td><td align="center">&nbsp;</td><td><input size="4" onblur="updateoptdata('+catid+','+"'"+idunico+"'"+','+x+','+"'"+opid+"'"+');" type="text" id="'+x+'age_'+catid+'_'+idunico+'_'+opid+'" value="'+age+'"></td><td>&nbsp;</td><td align="center"><input type="radio" name="lolo"></td></tr>';
togenerataauto.push("#"+x+'name_'+catid+'_'+idunico+'_'+opid+'!'+'#'+x+'age_'+catid+'_'+idunico+'_'+opid)
		}
	}	
	if(catid_ == 4 || catid_== '4'){
		var content='<table><tr><td>Name &amp; Last Name</td><td>&nbsp;</td><td align="center">Age</td><td>&nbsp;</td><td>Lead</td></tr>';
	for(x=0;x<cant;x++){
		var name='';
		var age='';
	for(c=0;c<cook_.length;c++){
		var este=cook_[c].split('*')
		var cat=este[0];
		var ord=este[1];
		if(cat==catid && ord==x){var name=este[2];var age=este[3];}
		}
		var content=content+'<tr><td align="center"><input onfocus="agetochange='+"'"+x+'age_'+catid+'_'+idunico+'_'+opid+"';"+'nametochange='+"'"+x+'name_'+catid+'_'+idunico+'_'+opid+"';"+'" onblur="updateoptdata('+catid+','+"'"+idunico+"'"+','+x+','+"'"+opid+"'"+');" type="text" id="'+x+'name_'+catid+'_'+idunico+'_'+opid+'" value="'+name+'" ></td><td align="center">&nbsp;</td><td><input size="4" onblur="updateoptdata('+catid+','+"'"+idunico+"'"+','+x+','+"'"+opid+"'"+');" type="text" id="'+x+'age_'+catid+'_'+idunico+'_'+opid+'" value="'+age+'"></td><td>&nbsp;</td><td align="center"><input type="radio" name="lolo"></td></tr>';
togenerataauto.push("#"+x+'name_'+catid+'_'+idunico+'_'+opid+'!'+'#'+x+'age_'+catid+'_'+idunico+'_'+opid)
		}
	}
	if(catid_ == 5 || catid_== '5'){
		var content='<table><tr><td>Name &amp; Last Name</td><td>&nbsp;</td><td align="center">Age</td><td>&nbsp;</td><td>Lead</td></tr>';
	for(x=0;x<cant;x++){
		var name='';
		var age='';
	for(c=0;c<cook_.length;c++){
		var este=cook_[c].split('*')
		var cat=este[0];
		var ord=este[1];
		if(cat==catid && ord==x){var name=este[2];var age=este[3];}
		}
		var content=content+'<tr><td align="center"><input onfocus="agetochange='+"'"+x+'age_'+catid+'_'+idunico+'_'+opid+"';"+'nametochange='+"'"+x+'name_'+catid+'_'+idunico+'_'+opid+"';"+'" onblur="updateoptdata('+catid+','+"'"+idunico+"'"+','+x+','+"'"+opid+"'"+');" type="text" id="'+x+'name_'+catid+'_'+idunico+'_'+opid+'" value="'+name+'" ></td><td align="center">&nbsp;</td><td><input size="4" onblur="updateoptdata('+catid+','+"'"+idunico+"'"+','+x+','+"'"+opid+"'"+');" type="text" id="'+x+'age_'+catid+'_'+idunico+'_'+opid+'" value="'+age+'"></td><td>&nbsp;</td><td align="center"><input type="radio" name="lolo"></td></tr>';
togenerataauto.push("#"+x+'name_'+catid+'_'+idunico+'_'+opid+'!'+'#'+x+'age_'+catid+'_'+idunico+'_'+opid)
		}
	}					
var content=content+'</table>'
	if(cant>0){
		$('#div_add_data_'+catid_+'_'+idunico+'_'+opid).show().html(content);
		}
	else{
		$('#div_add_data_'+catid_+'_'+idunico+'_'+opid).hide().html('');
		}
armaautos();
	}
	getDataPage=function(){
		getcartpurchasedetails();
		getcartexternaldeals();
		getcartmissingdeals();
	}
	getcartpurchasedetails=function(){
		if(global_showloadinginit){
			$("#cartpage-fieldset #cartpage").showLoading("Loading Cart Items...",true);
		}
		/*global_showloadinginit=true;*/
		var _url = "https://myezplan.com/data_ajax/cart_ajax_content.cfm?"+randomNumberUrl()+"";
		var _urlconfig = {action: "getcartpurchasedetails"};
		$("#cartpage-fieldset #cartpage").load(_url,_urlconfig,
		function (response, status, xhr){
			switch (status){
				case "error":
					$("#cartpage-fieldset #cartpage").empty();
					console.log("error getting data: " + xhr.statusText);
					break;
				case "success":
					$("#cartpage-fieldset #cartpage .numberinteger").spinner({
						step: 1,
						min: 0,
						numberFormat: "n",
						change: function( e, ui ) {
							$(this).change();
							global_cartchanged=true;
						}
					});
					break;
				default:
					break;
			}
		});
	}
	getcartmissingdeals=function(){
		if(global_showloadinginit){
			$("#cartmissingdeals-fieldset #cartpage").showLoading("Loading Missing Deals ...",true);
		}
		/*global_showloadinginit=true;*/
		var numdays_=$.cookie("NUMDAYS");
		var numdays=1
		if(numdays_ && numdays_!=''){var numdays=numdays_}
		var addedarray=[];
		for(x=1;x<=numdays;x++){
			var loads_=$.cookie("EZMAPCITYPLACES_day"+x);
			if(loads_ && loads_!=''){
				var loads=loads_.split(',');
				for(l=0;l<loads.length;l++){addedarray.push(loads[x]);}
			}
		}
		if(addedarray.length==0){
			$('#cartmissingdeals-fieldset').hide("slow");
			return false;
		}
		var _url = "https://myezplan.com/data_ajax/cart_ajax_content.cfm?"+randomNumberUrl()+"";
		var _urlconfig = {action: "cartmissingdeals", added:addedarray.join(',')};
		$("#cartmissingdeals-fieldset #cartpage").load(_url,_urlconfig,
		function (response, status, xhr){
			switch (status){
				case "error":
					$("#cartmissingdeals-fieldset #cartpage").empty();
					console.log("error getting data: " + xhr.statusText);
					break;
				case "success":
					break;
				default:
					break;
			}
		});
	}
	getcartexternaldeals=function(){
		if(global_showloadinginit){
			$("#externalcartpage-fieldset #cartpage").showLoading("Loading External Deals ...",true);
		}
		/*global_showloadinginit=true;*/
		var _url = "https://myezplan.com/data_ajax/cart_ajax_content.cfm?"+randomNumberUrl()+"";
		var _urlconfig = {action: "externalpurchasedeals"};
		$("#externalcartpage-fieldset #cartpage").load(_url,_urlconfig,
		function (response, status, xhr){
			switch (status){
				case "error":
					$("#externalcartpage-fieldset #cartpage").empty();
					console.log("error getting data: " + xhr.statusText);
					break;
				case "success":
					break;
				default:
					break;
			}
		});
	}
	validatepaypal=function(){
		if(global_cartchanged){
			alert("We have noticed that you have made additional changes to your cart. Please recalculate the cart before Paying.");
			return false;
		}
		var _validcheck = $("#paypalcheck").is(":checked");
		if(!(_validcheck)){
			alert("You must agree to the terms and conditions before continue");
			return false;
		}
		if(global_carttotal == 0){
			alert("Please select at least 1 quantity");
			return false;
		}
		return true;
	}

	openMyCoupons=function(){
		var _popup = $("#mycoupons-box");
		_popup.fadeIn(300);
		var popMargTop = (_popup.height() + 24) / 2; 
		var popMargLeft = (_popup.width() + 24) / 2; 
		_popup.css({ 
			'margin-left' : -popMargLeft
		});
		$('body').append('<div id="mask" class="mask"></div>');
		$('#mask').fadeIn(300);
		openMyCoupons_ajax();
	}
	openMyCoupons_ajax=function(){
		$("#mycoupons-box .box-body").empty();
		var _url = "https://myezplan.com/data_ajax/cart_ajax_content.cfm";
		var _urlconfig = {action:"getmycoupons"};
		$("#mycoupons-box .box-body").load(_url,_urlconfig,openMyCoupons_ajax_result);
	}
	openMyCoupons_ajax_result=function(response, status, xhr){
	}
	assignCoupon=function(arg_coupon){
		var _obj=$("#textapplycoupon");
		_obj.val(arg_coupon);
		_obj.focus();
		validatecoupon(true,true);
	}
	validatecoupon=function(arg_showmessage,arg_applycoupon){
		var _showmessage=(typeof(arg_showmessage)=="boolean"?arg_showmessage:false);
		var _applycoupon=(typeof(arg_applycoupon)=="boolean"?arg_applycoupon:false);

		var _obj=$("#textapplycoupon");
		var _val=$.trim(_obj.val());
		if(_val==""){
			_obj.focus();
			alert("Please enter a valid Coupon");
			return false;
		}
		var _data = {action:"validatecoupon",coupon:_val};
		$.ajax({
			type: "POST",
			dataType:"json",
			url: "https://myezplan.com/data_ajax/cart_ajax_events.cfm",
			async:true, 
			cache:false,
			data: _data,
			beforeSend: function(){
				//$("#cartpage-fieldset #cartpage").showLoading("Updating Cart ...",false);
			},
			error: function(xhr, ajaxOptions, thrownError){
				alert(thrownError);
			},
			success: function(response){
				if($.trim(response.MESSAGE).length>0 && _showmessage){
					alert(response.MESSAGE);
				}
				if(response.OK && _applycoupon){
					applycoupon();
				}
			},
			complete: function(){
			}
		});
		return false;
	}
	applycoupon=function(){
		var _obj=$("#textapplycoupon");
		var _val=$.trim(_obj.val());
		if(_val==""){
			_obj.focus();
			return false;
		}
		var _data = {action:"applycoupon",coupon:_val};
		
		$.ajax({
			type: "POST",
			dataType:"json",
			url: "https://myezplan.com/data_ajax/cart_ajax_events.cfm",
			async:true, 
			cache:false,
			data: _data,
			beforeSend: function(){
				/*$("#cartpage-fieldset #cartpage").showLoading("Updating Cart ...",false);*/
			},
			error: function(xhr, ajaxOptions, thrownError){
				alert(thrownError);
			},
			success: function(response){
				if(response.OK){
					getcartpurchasedetails();
					getcartmissingdeals();
				}else{
					if($.trim(response.MESSAGE).length>0){
						alert(response.MESSAGE);
					}
				}
			},
			complete: function(){
			}
		});
		return true;
	}
	updatecartitemcategory=function(){
	}
	updatecartitems=function(){
		var _form = $("#form-cart");
		$("#dumpform").empty();
		if(!(global_cartchanged)){
			/*alert("no changes");*/
			return false;
		}
		global_cartchanged=false;
		var _formserialized=_form.serialize();
		console.log(_formserialized);
		global_showloadinginit=false;
		var _data = _formserialized+"&action=updatecartitems";
		$.ajax({
			type: "POST",
			url: "https://myezplan.com/data_ajax/cart_ajax_events.cfm",
			async:true, 
			cache:false,
			data: _data,
			beforeSend: function(){
				$("#cartpage-fieldset #cartpage").showLoading("Updating Cart ...",false);
			},
			error: function(xhr, ajaxOptions, thrownError){
				alert(thrownError);
			},
			success: function(response){
				getcartpurchasedetails();
				getcartmissingdeals();
			}
		});
	}
	addToCartLocal_cl=function(unico,mapa){
		comprarAjax_cl(unico,mapa);
	}
	addToCartLocal_v=function(unico,mapa){
		comprarAjax_v(unico,mapa);
	}
	comprarAjaxLocal_Result=function(){
		global_showloadinginit=false;
		global_cartitemcategorytimer=setTimeout(getDataPage,0);
	}
});
/* jquery events */
$(document).ready(function(e) {
	window.setTimeout(getDataPage,300);
	$(".buttonrefresh").click(function(e) {
		getDataPage();
	});
	$(document).on("change",".cartitemnumber",function(e) {
		var _obj = $(this);
		var catid=parseInt(_obj.attr('data-tcid'));
		var _defval = 0;
		if(typeof(this.defaultValue)!="undefined"){
			_defval = parseInt(this.defaultValue);
		}
		if(!$.isNumeric(_obj.val())){
			_obj.val(_defval);
			return;
		}
		clearTimeout(global_cartitemcategorytimer);
		if(catid > 100){
		var opid=_obj.attr('data-opid')
		var idunico=_obj.attr('data-idunico')
		adddatatooptcat(catid,opid,_obj,idunico,'O');
		global_cartitemcategorytimer=setTimeout(updatecartitems,60000);
			}
		else{
		global_cartitemcategorytimer=setTimeout(updatecartitems,4000);
		}
	});
	$(document).on("click","#buttonRecalculatecart",function(e) {
		clearTimeout(global_cartitemcategorytimer);
		updatecartitems();
	});
	$(document).on("click","#buttonapplycoupon",function(e) {
		e.preventDefault();
		validatecoupon(true,true);
	});
	$(document).on("click","#buttonmycoupons",function(e) {
		e.stopPropagation();e.preventDefault();
		openMyCoupons();
		return false;
	});
	/* close click FAQ */
	$('#mycoupons-box a.close').click( function() { 
		closePopup();
		return false;
	});
	$(document).off("submit","#form-paypal"	);
	$(document).on("submit","#form-paypal",function(e) {
		return validatepaypal();
		e.preventDefault();
	});
	$(document).off("click",".cart-city-item .close");
	$(document).on("click",".cart-city-item .close",function(e) {
		e.preventDefault();
		clearTimeout(global_cartitemcategorytimer);
		var _countcartcitycontent = 1;
		var _objevt = $(this)
		var _divcartcity = _objevt.closest(".cart-city");
		var _divcartcitycontent = _objevt.closest(".cart-city-item");
		var _ruta_idunicoObj = _divcartcitycontent.find("#ruta_idunico");
		var _ruta_idunico = _ruta_idunicoObj.val();
		var _divcartcityhead = _divcartcity.prev('h3');
		var _data = "action=deletecartitem&rid="+_ruta_idunico;
		$.ajax({
			type: "POST",
			url: "https://myezplan.com/data_ajax/cart_ajax_events.cfm",
			async:false, 
			cache:false,
			data: _data,
			error: function(xhr, ajaxOptions, thrownError){
				alert(thrownError);
			},
			success: function(response){
				_divcartcitycontent.animate({opacity: 0.05}, "slow").delay(350).slideToggle("fast",function(){
					_divcartcitycontent.remove();
					_countcartcitycontent = _divcartcity.find(".cart-city-item").length;
					if(_countcartcitycontent == 0){
						_divcartcity.animate({opacity: 0.05}, "fast").slideToggle("fast",function(){
							_divcartcity.remove(); 
							_divcartcityhead.fadeOut('slow',function(){
								$(this).remove();
							});
						});
					}
					global_showloadinginit=false;
					global_cartitemcategorytimer=setTimeout(getDataPage,0);
					/*
					global_cartitemcategorytimer=setTimeout(getcartpurchasedetails,200);
					global_cartitemcategorytimer=setTimeout(getcartmissingdeals,200);
					*/
				});
				window.cartArr2.splice( $.inArray(_ruta_idunico, window.cartArr2), 1 );
				sessionStorage.cart2 = JSON.stringify(window.cartArr2);
				var _cart = JSON.parse(sessionStorage.cart);
				if (_cart[0].placeid == "N" && sessionStorage.planscart == '') {
					$('#cart-panel').panel('close');
					$('#icon-s_cart').hide();
				}
			}
		});
	});
	$(document).off("click",".cart-plans-item .close");
	$(document).on("click",".cart-plans-item .close",function(e) {
		e.preventDefault();
		clearTimeout(global_cartitemcategorytimer);
		var _countcartcitycontent = 1;
		var _objevt = $(this)
		var _divcartcity = _objevt.closest(".cart-city");
		var _divcartcitycontent = _objevt.closest(".cart-plans-item");
		var _plan_idObj = _divcartcitycontent.find("#planid");
		var planid = _plan_idObj.val();
		var _plan_typeObj = _divcartcitycontent.find("#planid_t");
		var tipo = _plan_typeObj.val();
		var _divcartcityhead = _divcartcity.prev('h3');
		var _data = "id="+planid+"&type="+tipo+"&action=deleteplancartitem";
		$.ajax({
			type: "POST",
			url: "https://myezplan.com/data_ajax/cart_ajax_events.cfm",
			async:false, 
			cache:false,
			data: _data,
			error: function(xhr, ajaxOptions, thrownError){
				alert(thrownError);
			},
			success: function(response){
				_divcartcitycontent.animate({opacity: 0.05}, "slow").delay(350).slideToggle("fast",function(){
					_divcartcitycontent.remove();
					_countcartcitycontent = _divcartcity.find(".cart-plans-item").length;
					if(_countcartcitycontent == 0){
						_divcartcity.animate({opacity: 0.05}, "fast").slideToggle("fast",function(){
							_divcartcity.remove(); 
							_divcartcityhead.fadeOut('slow',function(){
								$(this).remove();
							});
						});
					}
					global_showloadinginit=false;
					global_cartitemcategorytimer=setTimeout(getDataPage,0);
					/*
					global_cartitemcategorytimer=setTimeout(getcartpurchasedetails,200);
					global_cartitemcategorytimer=setTimeout(getcartmissingdeals,200);
					*/
				});
				window.planscart.splice( $.inArray(planid, window.planscart), 1 );
				if(window.planscart.length == 0){
					sessionStorage.planscart = '';
				}else{
					sessionStorage.planscart = JSON.stringify(window.planscart);
				}
				var _cart = JSON.parse(sessionStorage.cart);
				if (_cart[0].placeid == "N" && sessionStorage.planscart == '') {
					$('#cart-panel').panel('close');
					$('#icon-s_cart').hide();
				}
			}
		});
	});
//	$('#planinfo a.closesmall').click( function(e) {
//		e.stopPropagation();e.preventDefault();
//		$('#planinfo').fadeOut(300 , function() {
//			$('#planinfo #box-body').empty();
//		}); 
//		return false;
//	});
});

function showplaninfo(planid,plantype){
	$(".load_img").css("display","block");
		var url = "https://myezplan.com/data_ajax/cart_ajax_content.cfm?"+randomNumberUrl()+"";
		var urlconfig = {action: "getcartplaninfo", planid:planid,plantype:plantype};
		$("#planinfo #box-body").load(url,urlconfig);
			$('#planinfo').css({'top': 50})
$('#planinfo').fadeIn(300);
$(".load_img").css("display","none");
}
function closeplaninfo(){
		$('#planinfo').fadeOut(300 , function() {
			$('#planinfo #box-body').empty();
		}); 
}