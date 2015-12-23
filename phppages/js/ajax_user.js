/*!
 * Developed by Ronald Salazar (RASC88@gmail.com)
 * Date 2015/06/15.
 * Contact (https://rasc88.wordpress.com/2015/03/03/contac-us/)
 */

//funciones jQuery
$(function () {

	$("#contenido").on('click', 'img', function () {
		$("#contenidocode2").html("");
		$("#contenidocode").html("");
		$("#contenidonota").html("");
		var id = this.id;
		var array = this.name.split(',');
		var tabla = array[0];
		var idoption = array[1];
		var type = array[2];
		var seleccionado = false;

		$("[id*=imgfeature], [id*=imghandy]").each(function () { //loop through each img

			if (this.id == id) {
				if ($(this).hasClass('grises')) {
					$(this).removeClass("grises");
				} else {
					$(this).addClass("grises");
					seleccionado = true;
				}
			} else {
				$(this).addClass("grises");
			}
		});
		if (seleccionado == false) {

			//abre el modal loading
			var $modal = $('.js-loading-bar');
			$modal.modal('show');

			if (type == "1") {
				var ajax = $.ajax({
						url : "https://myezplan.com/phppages/php/data_option.php",
						type : "GET",
						dataType : "html",
						data : {
							"idciudad" : idciudad,
							"id" : idoption,
							"tabla" : tabla
						},
						success : function (data) {
							$("#contenidocode2").html(data);

						}
					}); //ajax
			} else {
				var oldDocumentWrite = document.write;
				document.write = function (node) {
					$("#contenidocode").append(node)
				}

				var ajax = $.ajax({
						url : "https://myezplan.com/phppages/php/data_option.php",
						type : "GET",
						dataType : "html",
						data : {
							"idciudad" : idciudad,
							"id" : idoption,
							"tabla" : tabla
						},
						success : function (data) {
							SetContainerHTML("contenidocode", data);

						}
					}); //ajax

				$.getScript("", function () {
					setTimeout(function () {
						document.write = oldDocumentWrite
					}, 100)
				});

			} //fin si
			var ajax = $.ajax({
					url : "https://myezplan.com/phppages/php/data_option_nota.php",
					type : "GET",
					dataType : "html",
					data : {
						"idciudad" : idciudad,
						"id" : idoption,
						"tabla" : tabla
					},
					success : function (data) {
						$("#contenidonota").html(data);

					}

				}); //ajax

			ajax.done(function () { //cierra el modal loading

				setTimeout(function () {
					$modal.modal('hide');
				}, 0);
			}); //fin done

		} //fin seleccionado
	});

}); // fin funcion sin nombre de jquery

/*funcion lee los script del html recibido y los asigna inserta dentro del documento*/
function SetContainerHTML(id_contenedor, responseText) {
	var mydiv = document.getElementById(id_contenedor);
	mydiv.innerHTML = responseText;
	var elementos = mydiv.getElementsByTagName('script');

	for (i = 0; i < elementos.length; i++) {
		old = document.getElementById('prefix' + i);
		if (old)
			mydiv.removeChild(old)
			var elemento = elementos[i];
		nuevoScript = document.createElement('script');
		nuevoScript.text = elemento.innerHTML;
		nuevoScript.type = 'text/javascript';
		nuevoScript.id = 'prefix' + i;
		if (elemento.src != null && elemento.src.length > 0) {
			nuevoScript.src = elemento.src;
		}
		elemento.parentNode.replaceChild(nuevoScript, elemento);
	}
} //fin funcion