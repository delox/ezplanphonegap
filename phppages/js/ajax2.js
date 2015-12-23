/*!
 * Developed by Ronald Salazar (RASC88@gmail.com)
 * Date 2015/05/15.
 * Contact (https://rasc88.wordpress.com/2015/03/03/contac-us/)
 */

//funciones jQuery
$(function(){

	
		//carga de select categoria
	   	$("#paises").change(function() {		
	   	    
	   	var paises= $("#paises").val()
	   	if(paises!="-1"){
	   	        $('#chkactive').attr('disabled', true);
	   	        $("#contenido").html("");
 			$("#categoria").empty();
			$("#categoria").append("<option >loading...</option>");//mensaje cargando
			$("#categoria").empty();
			$("#categoria").append("<option value='-1'>Choose</option>");
			$("#categoria").append("<option value='0'>Plans</option>");	
			$("#categoria").append("<option value='1'>Banners</option>");
			$("#categoria").append("<option value='2'>Pricing</option>");
		}else{
		 	$("#categoria").empty();
			$("#categoria").append("<option value='-1'>Choose</option>");
		 }//fin si
		});
		//carga de select categoria
			
		//carga datos categoria
	   	$("#categoria").change(function() {	
        	var categoria = $("#categoria").val()
	        if(categoria!="-1")actualiza_data();	
		});
		//carga datos categoria
		
		//carga datos categoria
	   	$("#chkactive").change(function() {	
	   		var categoria = $("#categoria").val()
	        if(categoria>"-1")actualiza_data();		
		});
		//carga datos categoria


var actualiza_data = function() {
	var categoria = $("#categoria").val()
	var ruta="";  var tabla="";  
	            if(categoria=="0" ){
		        	ruta="plans.php";
		        	tabla="plan";
		        }else if(categoria=="1" ){
					tabla="banner";
		        	ruta="banners.php";
		        }else if(categoria=="2" ){
		        	ruta="plans.php";
		        	tabla="pricing";
	        	}//fin si
        var pais= $("#paises").val()
		var active ;if($("#chkactive").is(':checked'))active=1;else active=0;         	
	   	$("#contenido").html("");
 		$("#contenido").html("<div class='row col-md-12' align='center' ><br><small>Searching...<span class='glyphicon glyphicon-refresh glyphicon-spin'></span></small></div></br>");
                                      
				var ajax = $.ajax({
				   url: "php/"+ruta,
				   type: "post",
				   data: {"categoria":categoria, "active":active,"pais":pais,"tabla":tabla}
				   
				});
				// la función de devolución satisfactoria (sucess)
				ajax.done(function(data){
					$("#contenido").html(data);
		 			$('#chkactive').attr('disabled', false);
				});
	
};//close funcion actualiza data
	


	
});// fin funcion sin nombre de jquery


function save () {
	 var $btn = $("#bsave");
     $btn.button('loading');
     var nota= $("#nota").val(); 
     var pais= $("#paises").val()
     var categoria = $("#categoria").val()
			var ruta="";  var tabla="";
	            if(categoria=="0" ){
		        	ruta="plans.php";
		        	tabla="plan";
		        }else if(categoria=="1" ){
		        	ruta="banners.php";
					tabla="banner";
		        }else if(categoria=="2" ){
		        	ruta="plans.php";
		        	tabla="pricing";
	        	}//fin si
     
     
     
	 var categoriasid = $("#categoriasid").val().split(','); 
	 var datoscategoria = new Array();
	 var datosoption = new Array();
	 var array = new Array();

	  
	for (var indice in categoriasid) {
	  datoscategoria.push(JSON.stringify($('[id*=input'+ categoriasid[indice]+']').serializeArray()));
	  
	  $('[id*=checkplan'+ categoriasid[indice]+']').each(function(){ 
	  	id=$(this).attr('name').replace("id","");
	  	if( $(this).is(':checked') ) value="1"; else value="0";
	  	array.push('{"id":"'+id+'","value":"'+value+'"}'); 
	  })//fineach
		datosoption.push(array);
	    array = [];
	}

    
 	var ajax = $.ajax({
            type: "POST",
            url: "https://myezplan.com/phppages/php/saveplan.php",
           data: {"categoriasid":categoriasid, "datoscategoria":datoscategoria, "datosoption":datosoption,"nota":nota,"pais":pais,"tabla":tabla}
        });
	ajax.done(function(data){
		 //console.log( "datos:"+data);
			
       
		var active ;if($("#chkactive").is(':checked'))active=1;else active=0;         	
	   	$("#contenido").html("");
 		$("#contenido").html("<div class='row col-md-12' align='center' ><br><small>Searching...<span class='glyphicon glyphicon-refresh glyphicon-spin'></span></small></div></br>");
                                      
				var ajax = $.ajax({
				   url: "https://myezplan.com/phppages/php/"+ruta,
				   type: "post",
				   data: {"categoria":categoria, "active":active,"pais":pais,"tabla":tabla}
				   
				});
				// la función de devolución satisfactoria (sucess)
				ajax.done(function(data){
					$("#contenido").html(data);
		 			$('#chkactive').attr('disabled', false);
					$btn.button('reset');
					
				});
				});
  
   
}//fin funcion save

function muestramodal(nombre,id,type,typeid){

	$('#modal').modal('show');//carga del modal 
	$("#modal").on("shown.bs.modal",function(){//se asigna valores 

		$("#idsvoption").val(id);
		$("#typeoption").val(type);
		$("#typeid").val(typeid);
		$("#modaltitulo").html(nombre);
		
		$("#modal").off('shown.bs.modal');
		
	})
}

function savemodal () {
    
     var $btn = $("#savemodal");
     $btn.button('loading');
     var id=$("#idsvoption").val();
	 var type=$("#typeoption").val();
	 var arraytypeid = new Array();
	 arraytypeid = $("#typeid").val().split(','); 
	 
     var nameoption=$("#nameoption").val();
     var pais= $("#paises").val()
	  $("[id*=nmoption"+id+"]").each(function() { //loop por el nombre del option
                $(this).html(nameoption);          
       }); 
	 
     var categoria = $("#categoria").val();
     var ruta=""; var tabla=""; 
	
	var categoriasid = new Array();
	  categoriasid = $("#categoriasid").val().split(','); 
	  
	  		
     if ( ($("#modaltitulo").html()) =="Add" ){
    	 
	                if(categoria=="0" ){
		        	ruta="addoptionplans.php";
		        	tabla="plan";
		        }else if(categoria=="1" ){
		        	ruta="addoptionbanners.php";
					tabla="banner";
		        }else if(categoria=="2" ){
		        	ruta="addoptionplans.php";
		        	tabla="pricing";
	        	}//fin si

				var ajax = $.ajax({
				   url: "https://myezplan.com/phppages/php/"+ruta,
				   type: "post",
				   data: {"name":nameoption,"categoriasid":categoriasid,"tabla":tabla,"pais":pais ,"type":type }
				   
				});
				// la función de devolución satisfactoria (sucess)
				ajax.done(function(data){

				var json = $.parseJSON(data);
				if (tabla=="banner"){
				for (var indice in json.filas)$("#plandiv"+arraytypeid[indice]).append(json.filas[indice]);
				}else{
				 for (var indice in json.filas) $("#plandiv"+categoriasid[indice]).append(json.filas[indice]);
				}
				   

					$btn.button('reset');
					closemodal(); 
				});
					  
				
     }else{//Edit
        		if(categoria=="0" ){
		        	ruta="editoptionplans.php";
		        	tabla="plan";
		        }else if(categoria=="1" ){
		        	ruta="editoptionplans.php";
					tabla="banner";
		        }else if(categoria=="2" ){
		        	ruta="editoptionplans.php";
		        	tabla="pricing";
	        	}//fin si


				var ajax = $.ajax({
				   url: "https://myezplan.com/phppages/php/"+ruta,
				   type: "post",
				   data: {"name":nameoption,"id":id,"tabla":tabla,"pais":pais  }
				   
				});
				// la función de devolución satisfactoria (sucess)
				ajax.done(function(data){
					//console.log("data:"+data);
					 $btn.button('reset');  

					 closemodal(); 
				});
         
         
     }//fin si
     
     
     

}//fin funcion save modal


//cierre del modal	
function closemodal() {

			$("#nameoption").val("");
			$("#modaltitulo").html("");
		    $('#modal').modal('hide');//cierra del modal 

}//fin cerrar modal map
//selecciona todos los checkbos de filas de la categoria
function checkall(id) {
	
        if(document.getElementById("checkall"+id).checked == true) { // check select status
		$("[id*=checkplan"+id+"]").each(function() { //loop through each checkbox
                this.checked = true;  //select all checkboxes with class "checkbox1"               
            	}); 
          //document.getElementById(id+"check").checked=true;
             
        }else{
        $("[id*=checkplan"+id+"]").each(function() { //loop through each checkbox
          
                this.checked = false;  //select all checkboxes with class "checkbox1"               
            });    
        }
 }
//selecciona todos los checkbos de filas de la tabla

function deleteoption(id) {

 if (confirm("Are you sure you want to delete?") == true) {

	var categoria = $("#categoria").val()
	var ruta="";var tabla="";  var pais= $("#paises").val()
	                if(categoria=="0" ){
		        	ruta="deleteoptionplans.php";
		        	tabla="plan";
		        }else if(categoria=="1" ){
		        	ruta="deleteoptionplans.php";
					tabla="banner";
		        }else if(categoria=="2" ){
		        	ruta="deleteoptionplans.php";
		        	tabla="pricing";
	        	}//fin si


				var ajax = $.ajax({
				   url: "php/"+ruta,
				   type: "post",
				   data: {"id":id,"tabla":tabla,"pais":pais }
				   
				});
				// la función de devolución satisfactoria (sucess)
				ajax.done(function(data){
					$("[id*=option"+id+"]").remove();
				});
				
				

	
	}//fin si
	
       
 }//fin delete
 
