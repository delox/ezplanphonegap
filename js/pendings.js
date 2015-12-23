function showExternalPage(_url) {

	var ex = '?&PNone';
	if (_url.indexOf('?') != -1) {
		ex = '&PNone';
	}
	location.href = _url + ex;

}

$(document).ready(function () {
	faqpage = 'pendings';
});
function openpenfaq() {
	if (placeorutaostopsPS == 0) {
		var pagefaq = 'pendings_places';
	}
	if (placeorutaostopsPS == 1) {
		var pagefaq = 'pendings_rutas';
	}
	if (placeorutaostopsPS == 2) {
		var pagefaq = 'pendings_stops';
	}
	$('#myeztravel-faq').showLoading("Please Wait,<br/>Retriving Topics...<br/>", false);
	$('body').append('<div id="mask-faq" class="mask-faq"></div>');
	var _url = "data_ajax/faq_ajax_content.cfm?page=" + pagefaq;
	var _urlconfig = {
		action : 'Faq_index'
	};
	$('#myeztravel-faq').load(_url, _urlconfig, function (response, status, xhr) {
		switch (status) {
		case "error":
			$('#myeztravel-faq').empty();
			alert("We are sorry, There aren't any help files in this page");
			break;
		case "success":
			$('#mask-faq').fadeIn(300);
			$('#myeztravel-faq').fadeIn(300);
		}
	});
}
function opentransfaq() {
	if (rutaostops == 0) {
		var pagefaq = 'pendingstrans_route';
	}
	if (rutaostops == 1) {
		var pagefaq = 'pendingstrans_stops';
	}
	$('#myeztravel-faq').showLoading("Please Wait,<br/>Retriving Topics...<br/>", false);
	$('body').append('<div id="mask-faq" class="mask-faq"></div>');
	var _url = "data_ajax/faq_ajax_content.cfm?page=" + pagefaq;
	var _urlconfig = {
		action : 'Faq_index'
	};
	$('#myeztravel-faq').load(_url, _urlconfig, function (response, status, xhr) {
		switch (status) {
		case "error":
			$('#myeztravel-faq').empty();
			alert("We are sorry, There aren't any help files in this page");
			break;
		case "success":
			$('#mask-faq').fadeIn(300);
			$('#myeztravel-faq').fadeIn(300);
		}
	});
}
function openideasfaq() {
	if (rutaostops == 0) {
		var pagefaq = 'pendingsideas_route';
	}
	if (rutaostops == 1) {
		var pagefaq = 'pendingsideas_stops';
	}
	$('#myeztravel-faq').showLoading("Please Wait,<br/>Retriving Topics...<br/>", false);
	$('body').append('<div id="mask-faq" class="mask-faq"></div>');
	var _url = "data_ajax/faq_ajax_content.cfm?page=" + pagefaq;
	var _urlconfig = {
		action : 'Faq_index'
	};
	$('#myeztravel-faq').load(_url, _urlconfig, function (response, status, xhr) {
		switch (status) {
		case "error":
			$('#myeztravel-faq').empty();
			alert("We are sorry, There aren't any help files in this page");
			break;
		case "success":
			$('#mask-faq').fadeIn(300);
			$('#myeztravel-faq').fadeIn(300);
		}
	});
}
function opensvcfaq() {
	if (rutaostops == 0) {
		var pagefaq = 'pendingssvc_place';
	}
	if (rutaostops == 1) {
		var pagefaq = 'pendingssvc_route';
	}
	if (rutaostops == 2) {
		var pagefaq = 'pendingssvc_stops';
	}
	$('#myeztravel-faq').showLoading("Please Wait,<br/>Retriving Topics...<br/>", false);
	$('body').append('<div id="mask-faq" class="mask-faq"></div>');
	var _url = "data_ajax/faq_ajax_content.cfm?page=" + pagefaq;
	var _urlconfig = {
		action : 'Faq_index'
	};
	$('#myeztravel-faq').load(_url, _urlconfig, function (response, status, xhr) {
		switch (status) {
		case "error":
			$('#myeztravel-faq').empty();
			alert("We are sorry, There aren't any help files in this page");
			break;
		case "success":
			$('#mask-faq').fadeIn(300);
			$('#myeztravel-faq').fadeIn(300);
		}
	});
}
function refreshpending() {
	window.open('report_suggest_pendings.cfm', '_self');
}
function closepending() {
	$('#pendingslist').slideToggle(250);
	$("#vieweditpending").empty();
}
function viewpending(id) {
	showExternalPage("data_ajax/pending_content.cfm?rnu=5131616516651&action=viewpending&id=" + id);
}

function viewpending2(id) {
	showExternalPage("data_ajax/pending_content_2.cfm?rnu=5131616516651&action=viewpending&id=" + id);
}

function viewpending3(id) {
	showExternalPage("data_ajax/pending_content3.cfm?rnu=5131616516651&action=viewpending3&id=" + id);
}

function viewpending4(id) {
	showExternalPage("data_ajax/pending_content4.cfm?rnu=5131616516651&action=viewpending4&id=" + id);
}

function deleteallpendings() {
	var conf = confirm('are you sure you want to delete all youre pendings ?');
	if (!conf) {
		return false;
	}
	var ul = "data_ajax/pending_content.cfm?rnu=5131616516651&action=deletepending_all";
	C({
		D : "#pendingslist",
		u : ul
	});
}
function deletepending(id) {
	var conf = confirm('This will eliminate this pending from your list, Are you sure?');
	if (!conf) {
		return false;
	}
	var ul = "data_ajax/pending_content.cfm?rnu=5131616516651&action=deletepending&id=" + id;
	C({
		D : "#pendingslist",
		u : ul
	});
}
function validateterms() {
	var che = document.getElementById('cheagree').checked;
	if (che) {
		$('#buttonsend').attr("disabled", false);
	} else {
		$('#buttonsend').attr("disabled", true);
	}
}
function validateterms_t() {
	var che = document.getElementById('cheagree').checked;
	if (che) {
		$('#buttonsend').attr("disabled", false);

	} else {
		$('#buttonsend').attr("disabled", true);
	}
}
function validateterms_s() {
	var che = document.getElementById('cheagree').checked;
	if (che) {

		console.log("Alert agregar evento click"); //onclick="ValidateSave_RS_P();"
		$('#buttonsend').attr("disabled", true);
	} else {
		$('#buttonsend').attr("disabled", false);
	}
}
function validateterms_i() {
	var che = document.getElementById('cheagree').checked;
	if (che) {
		console.log("Alert agregar evento click"); //onclick="ValidateSave_RI_P();"
		$('#buttonsend').attr("disabled", false);
	} else {
		$('#buttonsend').attr("disabled", true);
	}
}
function settomylocation() {

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			var current_center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			usermarker.setPosition(current_center);
			map.setCenter(usermarker.getPosition());
			console.log(6);
			$('#botonAzul').show();
			$('#botonGris').hide();
		})
	} else if (google.gears) {
		var geo = google.gears.factory.create('beta.geolocation');
		geo.getCurrentPosition(function (position) {
			var current_center = new google.maps.LatLng(position.latitude, position.longitude);
			usermarker.setPosition(current_center);
			map.setCenter(usermarker.getPosition());
			console.log(7);
			$('#botonAzul').show();
			$('#botonGris').hide();
		}, function () {
			alert("Geolocation service failed.");
		});

	} else {
		alert("Browser doesn't support Geolocation");
		return false;
	}
}
function Reset_Place() {
	$('#botonAzul').hide();
	$('#botonGris').show();
	$('#reset_place').hide();
	usermarker.setPosition(originalcoors);
	map.setCenter(usermarker.getPosition());
	console.log(8);
}
function Reset_Place1() {
	$('#reset_place').hide();
	$('#botonAzul').hide();
	$('#botonGris').show();
	usermarker.setPosition(originalcoors);
	map.setCenter(usermarker.getPosition());
	console.log(9);
}
function resetstopsPS() {
	for (s = 0; s < arraySR_RP[actualroute_RP].stops.length; s++) {
		arraySR_RP[actualroute_RP].stops[s].setMap(null);
	}
	arraySR_RP[actualroute_RP].stops = [];
}
function placeMarker_sPS(location, placeid, name, desc) {

	console.log("----placeMarker_sPS---");

	var index = arraySR_RP[actualroute_RP].stops.length;

	if (actualroute_RP == 0) {
		var icon = 'https://lh6.googleusercontent.com/-8xxqF9thOCg/U9nRcchbb_I/AAAAAAANgBg/C77KoahO1Sc/s44/64.png';
	}
	if (actualroute_RP == 1) {
		var icon = 'https://lh3.googleusercontent.com/-Tx9ASyR-Pm0/U9nRcry7fQI/AAAAAAANgB4/S4-sPOCQyv4/s44/66.png';
	}
	if (actualroute_RP == 2) {
		var icon = 'https://lh3.googleusercontent.com/-Y2nKnJNaweg/U9nRcP8BO4I/AAAAAAANgBc/nnLGfRYqBm8/s45/65.png';
	}

	var locationMarker = new google.maps.Marker();

	locationMarker.setOptions({
		icon : icon,
		draggable : true,
		map : mapPS,
		title : name,
		position : location
	});

	locationMarker.name = name;
	locationMarker.desc = desc;
	locationMarker.route = actualroute_RP;
	locationMarker.index = index;
	locationMarker.placeid = placeid;

	if (placeid == 0) {
		locationMarker.infowindow = new google.maps.InfoWindow({
				content : 'Name:<input id="stopname" type="text" value="' + name + '"/><br/>Desc:<input id="stopdesc" type="text" value="' + desc + '"/><br/><input type="button" value="Update" onclick="updatemarker_s(' + locationMarker.route + ',' + locationMarker.index + ');"/>&nbsp;<input type="button" value="Delete4" onclick="deletemarker_s(' + locationMarker.route + ',' + locationMarker.index + ');"/>',
				size : new google.maps.Size(400, 400)
			});
	} else {
		locationMarker.setOptions({
			draggable : false
		});
		locationMarker.infowindow = new google.maps.InfoWindow({
				content : 'Name: ' + name + '<br/><input type="button" value="Info" onclick="ShowInfo(' + placeid + ');"/>&nbsp;<input type="button" value="Delete5" onclick="deletemarker_s(' + locationMarker.route + ',' + locationMarker.index + ');"/>',
				size : new google.maps.Size(400, 400)
			});
	}
	arraySR_RP[actualroute_RP].stops.push(locationMarker);

	google.maps.event.addListener(locationMarker, 'click', function () {
		if (placeid == 0) {
			locationMarker.infowindow = new google.maps.InfoWindow({
					content : 'Name:<input id="stopname" type="text" value="' + locationMarker.getTitle() + '"/><br/>Desc:<input id="stopdesc" type="text" value="' + locationMarker.desc + '"/><br/><input type="button" value="Update" onclick="updatemarker_s(' + locationMarker.route + ',' + locationMarker.index + ');"/>&nbsp;<input type="button" value="Delete6" onclick="deletemarker_s(' + locationMarker.route + ',' + locationMarker.index + ');"/>',
					size : new google.maps.Size(400, 400)
				});
		}
		locationMarker.infowindow.open(mapPS, locationMarker);
	});
}
function placeMarker_r(location) {

	arraySR_RP[actualroute_RP].bounds.extend(location);
	var locationMarkerPS = new google.maps.Marker();

	locationMarkerPS.setOptions({
		icon : 'https://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png',
		draggable : true,
		map : mapPS,
		position : location
	});

	locationMarkerPS.route = actualroute_RP;

	if (arraySR_RP[actualroute_RP].direction == 1) {
		locationMarkerPS.index = arraySR_RP[actualroute_RP].markers.length;

		locationMarkerPS.infowindow = new google.maps.InfoWindow({
				content : '<input type="button" value="Remove" onclick="deletemarker_r(' + locationMarkerPS.route + ',' + locationMarkerPS.index + ');"/>',
				size : new google.maps.Size(150, 150)
			});

		arraySR_RP[actualroute_RP].markers.push(locationMarkerPS);
		arraySR_RP[actualroute_RP].locations.push(location);
	} else {
		locationMarkerPS.index = 0;

		locationMarkerPS.infowindow = new google.maps.InfoWindow({
				content : '<input type="button" value="Remove" onclick="deletemarker_r(' + locationMarkerPS.route + ',0);"/>',
				size : new google.maps.Size(150, 150)
			});

		arraySR_RP[actualroute_RP].markers.splice(0, 0, locationMarkerPS);
		arraySR_RP[actualroute_RP].locations.splice(0, 0, location);

		for (m = 1; m < arraySR_RP[actualroute_RP].markers.length; m++) {
			arraySR_RP[actualroute_RP].markers[m].index = m;
			arraySR_RP[actualroute_RP].markers[m].infowindow = new google.maps.InfoWindow({
					content : '<input type="button" value="Remove" onclick="deletemarker_r(' + actualroute_RP + ',' + m + ');"/>',
					size : new google.maps.Size(150, 150)
				});
		}
	}

	arraySR_RP[actualroute_RP].setPath(arraySR_RP[actualroute_RP].locations);

	if (arraySR_RP[actualroute_RP].locations.length >= 2) {
		mapPS.fitBounds(arraySR_RP[actualroute_RP].bounds);
	}

	google.maps.event.addListener(locationMarkerPS, 'click', function () {
		locationMarkerPS.infowindow.open(mapPS, locationMarkerPS);
	});

	google.maps.event.addListener(locationMarkerPS, "dragend", function () {
		var nLatLng = locationMarkerPS.getPosition();
		var modifiedLocation = nLatLng;
		arraySR_RP[locationMarkerPS.route].locations[locationMarkerPS.index] = modifiedLocation;
		arraySR_RP[locationMarkerPS.route].setPath(arraySR_RP[locationMarkerPS.route].locations);
		arraySR_RP[locationMarkerPS.route].bounds = new google.maps.LatLngBounds();
		for (x = 0; x < arraySR_RP[locationMarkerPS.route].locations.length; x++) {
			arraySR_RP[locationMarkerPS.route].bounds.extend(arraySR_RP[locationMarkerPS.route].locations[x]);
		}
		if (arraySR_RP[locationMarkerPS.route].locations.length >= 2) {
			mapPS.fitBounds(arraySR_RP[locationMarkerPS.route].bounds);
		}
	});

}
function control_routePS() {
	console.log(" control_routePS ");
	//mapa color
	if ($("#imgnosePS").attr('src') == "https://lh3.googleusercontent.com/-uPG50w9EmkM/VEDXQ-LPnnI/AAAAAAANgqE/VvaMNuGpOac/s53/9.png") {
		$("#imgnosePS").attr("src", "https://lh3.googleusercontent.com/-IpnwTDPvKJ8/VEE9ewLerrI/AAAAAAANgqk/oj0a3G6Oes0/s53/route%2520b%2526w%2520small.png");
		$("#imgstop").attr("src", "https://lh6.googleusercontent.com/-Ed5eM4fjk_o/VEE9e1Q9hTI/AAAAAAANgqo/DuklrSRrCbw/s59/stops%2520b%2526w%2520small.png");
		$("#mapareport").show();
		$('#divformcontent').show();
		$('#div_data_rPS').hide();
		$("#mapasugg_s").hide();
		$('#titulosmapaPS').hide();
		$('#mapasugg_controls').hide();
		$('#isroutebutton').show();
		placeorutaostopsPS = 0;
		for (x = 0; x < arraySR_RP.length; x++) {
			for (r = 0; r < arraySR_RP[x].markers.length; r++) {
				arraySR_RP[x].markers[r].setMap(null);
			}
			for (s = 0; s < arraySR_RP[x].stops.length; s++) {
				arraySR_RP[x].stops[s].setMap(null);
			}
		}

		usermarker.setOptions({
			draggable : true
		});

		if (typeof(map) != 'undefined') {
			console.log(1);
			map.setCenter(usermarker.getPosition());
			map.setZoom(10);
		}

		if (typeof(mapPS) != 'undefined') {
			console.log(2);
			mapPS.setCenter(usermarker.getPosition());
			mapPS.setZoom(10);
		}

		if (viewsp) {
			ViewHidePlaces();
		}
	} //mapa gris
	else {
		$("#imgnosePS").attr("src", "https://lh3.googleusercontent.com/-uPG50w9EmkM/VEDXQ-LPnnI/AAAAAAANgqE/VvaMNuGpOac/s53/9.png");
		$("#imgstop").attr("src", "https://lh6.googleusercontent.com/-Ed5eM4fjk_o/VEE9e1Q9hTI/AAAAAAANgqo/DuklrSRrCbw/s59/stops%2520b%2526w%2520small.png");
		$('#control_place2').show();
		$('#but_rp').hide();
		$("#mapareport").show();
		$('#divformcontent').show();
		$('#div_data_rPS').show();
		$('#div_data_sPS').hide();
		$('#div_data_r2PS').show();

		if ($('#titulosmapaPS').text() == 'To add, click on the map') {
			$('#titulosmapaPS').html('To draw, click on the map');
		} else {
			$('#titulosmapaPS').hide();
		}
		$('#titulosmapaPS').show();

		placeorutaostopsPS = 1;
		for (x = 0; x < arraySR_RP.length; x++) {
			if (x == actualroute_RP) {
				for (r = 0; r < arraySR_RP[x].markers.length; r++) {
					if (typeof(map) != 'undefined') {
						arraySR_RP[x].markers[r].setMap(map);
					}
					if (typeof(mapPS) != 'undefined') {
						arraySR_RP[x].markers[r].setMap(mapPS);
					}
				}
			}
			for (s = 0; s < arraySR_RP[x].stops.length; s++) {
				arraySR_RP[x].stops[s].setMap(null);
			}
		}
		usermarker.setOptions({
			draggable : false
		});
		if (viewsp) {
			ViewHidePlaces();
		}
	}

	console.log("Var placeorutaostopsPS=" + placeorutaostopsPS);
}
function createnewroutePS() {
	console.log(" createnewroutePS ");

	var name = prompt('Name This Route', 'Route ' + (arraySR_RP.length + 1)) || '';

	if (!name || name == '') {
		alert('invalid name');
		return false;
	}

	actualroute_RP = arraySR_RP.length;

	if (actualroute_RP == 0) {
		var color = 'FF00FF';
	}
	if (actualroute_RP == 1) {
		var color = '00FFCC';
	}
	if (actualroute_RP == 2) {
		$('.newroute').hide();
		var color = '6600CC';
	}

	$('#titulosmapaPS').html('To draw, click on the map');
	$('#titulosmapaPS').show();

	var latlngs = new google.maps.MVCArray();
	var polyline = new google.maps.Polyline({
			path : latlngs,
			map : mapPS,
			strokeColor : '#' + color,
			strokeWeight : 7,
			strokeOpacity : 0.5
		});

	polyline.markers = [];
	polyline.locations = [];
	polyline.stops = [];
	polyline.name = name;
	polyline.color = color;
	polyline.index = arraySR_RP.length;
	polyline.direction = 1;
	polyline.bounds = new google.maps.LatLngBounds();
	arraySR_RP.push(polyline);

	google.maps.event.addListener(polyline, 'click', function () {
		setroutetoeditPS(polyline.index);
	});

	updaterutasPS();

	console.log("Var placeorutaostopsPS=" + placeorutaostopsPS);
}
function updaterutasPS() {
	console.log("updaterutasPS");
	$('#div_data_r2PS').empty();
	var focusin = -1;
	var texto = '<table>';

	for (r = 0; r < arraySR_RP.length; r++) {
		if (r == actualroute_RP) {
			var visible = 'block';
		} else {
			var visible = 'none';
		}

		var imgdir = 'https://lh3.googleusercontent.com/-qrnDeaWgEQQ/VTqVNrMCWpI/AAAAAAANhYE/Q3yDCYDKwiU/s45/lado%25201.png';

		if (r == (arraySR_RP.length - 1)) {
			if (arraySR_RP[r].direction == 2) {
				var imgdir = 'https://lh3.googleusercontent.com/-F2okjA-0vfw/VTqY10fI9uI/AAAAAAANhYQ/SuL705uuREI/s45/lado%25202.png';
			}
			texto = texto + '<tr><td onclick="setroutetoeditPS(' + r + ');"></td><td onclick="setroutetoeditPS(' + r + ');"><input 	onfocus="pruebaPS(' + r + ')" type="text" id="routename_' + r + '" style="font-weight:bolder; width:160px;color:#' + arraySR_RP[r].color + ';" value="' + arraySR_RP[r].name + '" onchange="changeroutename(this.value,' + r + ');"/></td><td onclick="setroutetoeditPS(' + r + ');"><img style="vertical-align:middle" id="direct' + r + '" src="' + imgdir + '" height:"35px" width="35px" onclick="changeroutedirection(' + r + ');"/></td><td><div id="control_stops_RP" onclick="control_stops_RP();" class="button-round-2 botonesResponsive" style="border:none;padding-left: 0px; padding-right: 0px;border-right-width: 0px;border-left-width: 0px;"><img id="imgstop' + r + '" src="https://lh5.googleusercontent.com/-dw-HxABt9TY/VEDXP0utKBI/AAAAAAANgp0/oSLoN9fjBzc/s60/6.png" width="35px" height="35"/></div></td><td onclick="setroutetoeditPS(' + r + ');"><img style="vertical-align:middle" id="basura_' + r + '" onclick="resetroute(' + r + ');" width="35px" height="35px" src="https://lh4.googleusercontent.com/-_azh1IzUzH8/VEDXP-fY7qI/AAAAAAANgqI/eA7XL4KAW9o/s52/7.png"/></td><td><img style="vertical-align:middle" id="papelera_' + r + '" src="https://lh4.googleusercontent.com/-J8QLIopkdW4/VOdmvVtfapI/AAAAAAANhJA/FcImfqWSudY/s46/basura3.png" widht="35px" height="35px" onclick="removeroute(' + r + ');"/></td></tr>';
		} else {
			if (arraySR_RP[r].direction == 2) {
				var imgdir = 'https://lh3.googleusercontent.com/-F2okjA-0vfw/VTqY10fI9uI/AAAAAAANhYQ/SuL705uuREI/s45/lado%25202.png';
			}
			texto = texto + '<tr><td onclick="setroutetoeditPS(' + r + ');"></td><td onclick="setroutetoeditPS(' + r + ');"><input onfocus="pruebaPS(' + r + ')" type="text" id="routename_' + r + '" style="font-weight:bolder; width:160px;color:#' + arraySR_RP[r].color + ';" value="' + arraySR_RP[r].name + '" onchange="changeroutename(this.value,' + r + ');"/></td><td onclick="setroutetoeditPS(' + r + ');"><img style="display:none;" id="direct' + r + '" src="' + imgdir + '" height:"35px" width="35px" onclick="changeroutedirection(' + r + ');"/></td><td><div id="control_stops_RP" onclick="control_stops_RP();" class="button-round-2 botonesResponsive" style="border:none;padding-left: 0px; padding-right: 0px;border-right-width: 0px;border-left-width: 0px;"><img id="imgstop' + r + '" src="https://lh5.googleusercontent.com/-dw-HxABt9TY/VEDXP0utKBI/AAAAAAANgp0/oSLoN9fjBzc/s60/6.png" width="35px"height="35" style="display:none;"/></div></td><td onclick="setroutetoeditPS(' + r + ');"><img style="display:none" id="basura_' + r + '" onclick="resetroute(' + r + ');" width="35px" height="35px" src="https://lh4.googleusercontent.com/-_azh1IzUzH8/VEDXP-fY7qI/AAAAAAANgqI/eA7XL4KAW9o/s52/7.png"/></td><td><img style="display:none" id="papelera_' + r + '" src="https://lh4.googleusercontent.com/-J8QLIopkdW4/VOdmvVtfapI/AAAAAAANhJA/FcImfqWSudY/s46/basura3.png" widht="35px" height="35px" onclick="removeroute(' + r + ');"/></td></tr>'
		}
	}

	texto = texto + '</table>';
	$('#div_data_r2PS').append(texto);
	setroutetoeditPS(actualroute_RP);
	console.log("Var placeorutaostopsPS=" + placeorutaostopsPS);
}
function pruebaPS(id) {
	for (r = 0; r < arraySR_RP.length; r++) {
		$("#direct" + r).hide();
		$("#basura_" + r).hide();
		$("#papelera_" + r).hide();
		$("#imgstop" + r).hide();
	}
	$("#direct" + id).show();
	$("#basura_" + id).show();
	$("#papelera_" + id).show();
	$("#imgstop" + id).show();
}
function setroutetoeditPS(index) {
	console.log(" setroutetoeditPS ");
	actualroute_RP = index;

	for (r = 0; r < arraySR_RP.length; r++) {
		$('#active_r_' + r).hide();

		if (r == actualroute_RP) {
			if (arraySR_RP[r].markers.length >= 2) {
				mapPS.fitBounds(arraySR_RP[r].bounds);
			}

			var name = arraySR_RP[r].name;
			var color = arraySR_RP[r].color;
			$("#spanrutanamestopsPS").html(name);
			document.getElementById('spanrutanamestopsPS').style.color = '#' + color;
			var visible = 'block';

			if (placeorutaostopsPS == 1) {
				var focusin = r;
				for (m = 0; m < arraySR_RP[r].markers.length; m++) {
					arraySR_RP[r].markers[m].setMap(mapPS);
				}
			}
			if (placeorutaostopsPS == 2) {
				for (s = 0; s < arraySR_RP[r].stops.length; s++) {
					arraySR_RP[r].stops[s].setMap(mapPS);
				}
			}
		} else {
			for (m = 0; m < arraySR_RP[r].markers.length; m++) {
				arraySR_RP[r].markers[m].setMap(null);
			}
			for (s = 0; s < arraySR_RP[r].stops.length; s++) {
				arraySR_RP[r].stops[s].setMap(null);
			}
		}
	}

	$('#active_r_' + actualroute_RP).show();

	console.log("Var placeorutaostopsPS=" + placeorutaostopsPS);
}
function changeroutename(name, index) {
	arraySR_RP[index].name = name
}
function changeroutedirection_t() {
	if (rutadire == 0) {
		rutadire = 1;
		$('#imgtup').hide();
		$('#imgtdw').show();
	} else {
		rutadire = 0;
		$('#imgtup').show();
		$('#imgtdw').hide();
	}
}
function changeroutedirection(index) {
	var dir = arraySR_RP[index].direction;
	if (dir == 1) {
		arraySR_RP[index].direction = 2;
	} else {
		arraySR_RP[index].direction = 1;
	}
	updaterutas();
}
function resetroute_trans() {
	if (rutaostops == 0) {
		var conf = confirm('This will reset the route to the original state, are you sure?');
		if (!conf) {
			return false;
		}
		for (m = 0; m < markers.length; m++) {
			markers[m].setMap(null);
		}
		markers = [];
		locations = [];
		for (l = 0; l < locations_o.length; l++) {
			locations.push(locations_o[l]);
		}
		polyline.setPath(locations);
		for (m = 0; m < locations.length; m++) {
			var locationMarker = createLocationMarker_t(locations[m], '', '', '', '', m);
			markers.push(locationMarker);
		}
		adjustmarkersorder();
	} else {
		var conf = confirm('This will reset the stops to the original state, are you sure?');
		if (!conf) {
			return false;
		}
		for (s = 0; s < stops.length; s++) {
			stops[s].setMap(null);
		}
		stops = [];
		for (s = 0; s < stops_o.length; s++) {
			stops.push(stops_o[s]);
		}
		for (s = 0; s < stops.length; s++) {
			stops[s].desc = stops[s].desc_o;
			stops[s].name = stops[s].name_o;
			stops[s].setTitle(stops[s].name);
			stops[s].setPosition(stops[s].position_o);
			stops[s].infowindow = new google.maps.InfoWindow({
					content : '<input id="stopname" placeholder="Name" type="text" value="' + stops[s].name + '"/><br/><input placeholder="Description" id="stopdesc" type="text" value="' + stops[s].desc + '"/><br/><input type="button" value="Change" onclick="changestopdata(' + s + ');"/>&nbsp;<input type="button" value="Delete" onclick="delstopdata(' + s + ');"/>',
					size : new google.maps.Size(250, 250)
				});
		}
		for (s = 0; s < stops.length; s++) {
			stops[s].setMap(map);
		}
	}
}
function resetroute(index) {
	arraySR_RP[index].locations = [];
	for (m = 0; m < arraySR_RP[index].markers.length; m++) {
		arraySR_RP[index].markers[m].setMap(null);
	}
	arraySR_RP[index].markers = [];
	arraySR_RP[index].bounds = new google.maps.LatLngBounds();
	arraySR_RP[index].setPath(arraySR_RP[index].locations);
}
function removeroute(index) {
	var conf = confirm("You are going to delete this route and all it's elements, are you sure??")
		if (!conf) {
			return false;
		}

		$('.newroute').show();
	for (x = 0; x < arraySR_RP[index].markers.length; x++) {
		arraySR_RP[index].markers[x].setMap(null);
	}
	arraySR_RP[index].setMap(null);
	arraySR_RP.splice(index, 1);
	for (r = 0; r < arraySR_RP.length; r++) {
		arraySR_RP[r].index = r;
		if (r == 0) {
			var color = 'FF00FF';
			var icon = 'https://lh6.googleusercontent.com/-8xxqF9thOCg/U9nRcchbb_I/AAAAAAANgBg/C77KoahO1Sc/s44/64.png';
		}
		if (r == 1) {
			var color = '00FFCC';
			var icon = 'https://lh3.googleusercontent.com/-Tx9ASyR-Pm0/U9nRcry7fQI/AAAAAAANgB4/S4-sPOCQyv4/s44/66.png';
		}
		if (r == 2) {
			var color = '6600CC';
			var icon = 'https://lh3.googleusercontent.com/-Y2nKnJNaweg/U9nRcP8BO4I/AAAAAAANgBc/nnLGfRYqBm8/s45/65.png';
		}
		arraySR_RP[r].setOptions({
			strokeColor : '#' + color
		});
		arraySR_RP[r].color = color;
		for (m = 0; m < arraySR_RP[r].markers.length; m++) {
			arraySR_RP[r].markers[m].route = r
				arraySR_RP[r].markers[m].infowindow = new google.maps.InfoWindow({
					content : '<input type="button" value="Delete10" onclick="deletemarker_r(' + arraySR_RP[r].markers[m].route + ',' + arraySR_RP[r].markers[m].index + ');"/>',
					size : new google.maps.Size(150, 150)
				});
		}
		for (s = 0; s < arraySR_RP[r].stops.length; s++) {
			arraySR_RP[r].stops[s].setIcon(icon);
			arraySR_RP[r].stops[s].route = r
				if (arraySR_RP[r].stops[s].placeid == 0) {
					arraySR_RP[r].stops[s].infowindow = new google.maps.InfoWindow({
							content : 'Name:<input id="stopname" type="text" value="' + arraySR_RP[r].stops[s].name + '"/><br/>Desc:<input id="stopdesc" type="text" value="' + arraySR_RP[r].stops[s].desc + '"/><br/><input type="button" value="Update" onclick="updatemarker_s(' + r + ',' + s + ');"/>&nbsp;<input type="button" value="Delete11" onclick="deletemarker_s(' + r + ',' + s + ');"/>',
							size : new google.maps.Size(400, 400)
						});
				} else {
					arraySR_RP[r].stops[s].infowindow = new google.maps.InfoWindow({
							content : 'Name: ' + arraySR_RP[r].stops[s].name + '<br/><input type="button" value="Info" onclick="ShowInfo(' + arraySR_RP[r].stops[s].placeid + ');"/>&nbsp;<input type="button" value="Remove" onclick="deletemarker_s(' + r + ',' + s + ');"/>',
							size : new google.maps.Size(400, 400)
						});
				}
		}
	}
	if (arraySR_RP.length == 0) {
		$('#titulosmapaPS').html('');
	}
	if (index == actualroute_RP) {
		actualroute_RP = -1;
	} else {
		actualroute_RP = actualroute_RP - 1;
	}

	updaterutas();
}
function createsubroute_rp(id, color, name, icon) {
	//alert(id+' '+color+' '+name+' '+icon);
	var latlngsRP = new google.maps.MVCArray();
	var polylineRP = new google.maps.Polyline({
			path : latlngsRP,
			map : map,
			strokeColor : color,
			strokeWeight : 7,
			strokeOpacity : 0.5
		});
	polylineRP.locations_o = [];
	polylineRP.locations = [];
	polylineRP.name = name;
	polylineRP.markers = [];
	polylineRP.rid = id;
	polylineRP.color = color;
	polylineRP.stops = [];
	polylineRP.stops_o = [];
	polylineRP.ids = [];
	polylineRP.icon = icon;
	polylineRP.direction = 1;
	polylineRP.bounds = new google.maps.LatLngBounds();
	if (index == 2) {
		$('#buttaddroute').hide();
	}
	google.maps.event.addListener(polylineRP, 'click', function () {
		setactualroute_RP(polylineRP.index);
	});
	var index = arraySR_RP.length;
	if (index == 2) {
		$('#buttaddroute').hide();
	}
	polylineRP.index = index;
	arraySR_RP.push(polylineRP);
	updaterutas_RP()
	return polylineRP;
}
function createLocationMarker_RP(location, index) {
	var locationMarkerPS = new google.maps.Marker();
	locationMarkerPS.setOptions({
		icon : 'https://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png',
		draggable : true,
		map : map,
		position : location
	});
	locationMarkerPS.route = index;
	arraySR_RP[index].bounds.extend(location);

	if (arraySR_RP[index].direction == 1) {
		locationMarkerPS.index = arraySR_RP[index].markers.length;
		locationMarkerPS.infowindow = new google.maps.InfoWindow({
				content : '<input type="button" value="Remove" onclick="deletemarker_r(' + locationMarkerPS.route + ',' + locationMarkerPS.index + ');"/>',
				size : new google.maps.Size(150, 150)
			});
		arraySR_RP[index].markers.push(locationMarkerPS);
		arraySR_RP[index].locations.push(location);
	} else {
		locationMarkerPS.index = 0;
		locationMarkerPS.infowindow = new google.maps.InfoWindow({
				content : '<input type="button" value="Remove" onclick="deletemarker_r(' + locationMarkerPS.route + ',0);"/>',
				size : new google.maps.Size(150, 150)
			});
		arraySR_RP[index].markers.splice(0, 0, locationMarkerPS);
		arraySR_RP[index].locations.splice(0, 0, location);
		for (m = 1; m < arraySR_RP[index].markers.length; m++) {
			arraySR_RP[index].markers[m].index = m;
			arraySR_RP[index].markers[m].infowindow = new google.maps.InfoWindow({
					content : '<input type="button" value="Remove" onclick="deletemarker_r(' + index + ',' + m + ');"/>',
					size : new google.maps.Size(150, 150)
				});
		}
	}
	arraySR_RP[index].setPath(arraySR_RP[index].locations);
	if (arraySR_RP[index].locations.length >= 2) {
		map.fitBounds(arraySR_RP[index].bounds);
	}
	google.maps.event.addListener(locationMarkerPS, 'click', function () {
		locationMarkerPS.infowindow.open(map, locationMarkerPS);
	});
	google.maps.event.addListener(locationMarkerPS, "dragend", function () {
		var nLatLng = locationMarkerPS.getPosition();
		var modifiedLocation = nLatLng;
		arraySR_RP[index].locations[locationMarkerPS.index] = modifiedLocation;
		arraySR_RP[index].setPath(arraySR_RP[index].locations);
		modificaruta = true;
		arraySR_RP[index].bounds = new google.maps.LatLngBounds();
		arraySR_RP[index].bounds.extend(usermarker.getPosition());
		for (x = 0; x < arraySR_RP[index].locations.length; x++) {
			arraySR_RP[index].bounds.extend(arraySR_RP[index].locations[x]);
		}
		if (arraySR_RP[index].locations.length >= 2) {
			map.fitBounds(arraySR_RP[index].bounds);
		}
	});

	return locationMarkerPS;
}
function createStopMarker(location, titulo, desc, inroute, index, placeid) {
	var StopMarker = new google.maps.Marker();
	StopMarker.desc = desc;
	var contar = (index + 1)
	StopMarker.setOptions({
		icon : arraySR_RP[inroute].icon,
		title : titulo,
		draggable : true,
		map : map,
		position : location
	});
	StopMarker.inroute = inroute;
	StopMarker.index = index;
	StopMarker.desc = desc;
	StopMarker.placeid = placeid;
	if (placeid == 0) {
		StopMarker.infowindow = new google.maps.InfoWindow({
				content : '<input placeholder="Name" type="text" id="namestp" value="' + titulo + '"/><br/><input placeholder="Description" type="text" id="descstp" value="' + desc + '"/><br/><input type="button" value="Update" onclick="changestop_nd(' + StopMarker.inroute + ',' + StopMarker.index + ');">&nbsp;<input type="button" value="Eliminate" onclick="deletestop(' + StopMarker.inroute + ',' + StopMarker.index + ');">',
				size : new google.maps.Size(250, 250)
			});
	} else {
		StopMarker.infowindow = new google.maps.InfoWindow({
				content : 'Name:<br/>' + titulo + '<br/><input type="button" value="Info" onclick="ShowInfo_RP(' + StopMarker.placeid + ');"/>&nbsp;<input type="button" value="Remove" onclick="deletestop(' + StopMarker.inroute + ',' + StopMarker.index + ');">',
				size : new google.maps.Size(250, 250)
			});
	}
	google.maps.event.addListener(StopMarker, 'click', function () {
		var marcadordestop = StopMarker.index;
		for (y = 0; y < arraySR_RP[StopMarker.inroute].stops.length; y++) {
			if (arraySR_RP[StopMarker.inroute].stops[y].index != marcadordestop) {
				arraySR_RP[StopMarker.inroute].stops[y].infowindow.close(map, arraySR_RP[StopMarker.inroute].stops[y]);
			}
		}
		if (StopMarker.placeid == 0) {
			StopMarker.infowindow = new google.maps.InfoWindow({
					content : '<input placeholder="Name" type="text" id="namestp" value="' + StopMarker.getTitle() + '"/><br/><input placeholder="Description" type="text" id="descstp" value="' + StopMarker.desc + '"/><br/><input type="button" value="Update" onclick="changestop_nd(' + StopMarker.inroute + ',' + StopMarker.index + ');">&nbsp;<input type="button" value="Eliminate" onclick="deletestop(' + StopMarker.inroute + ',' + StopMarker.index + ');">',
					size : new google.maps.Size(250, 250)
				});
		}
		StopMarker.infowindow.open(map, StopMarker);
	});
	google.maps.event.addListener(StopMarker, 'dragend', function () {
		modificastops = true;
	})
	return StopMarker;
}
function control_place_RP() {
	$('#control_place').css("background-color", "#17375E");
	$('#control_route').css("background-color", "lightgray");
	$('#control_stops_RP').css("background-color", "lightgray");
	$('#control_stops_RP').hide();
	$('#control_place2').hide();
	$('#divformcontent').show();
	$('#div_data_r').hide();
	$('#div_data_s').hide();
	for (a = 0; a < arraySR_RP.length; a++) {
		arraySR_RP[a].setMap(null);
		for (m = 0; m < arraySR_RP[a].markers.length; m++) {
			arraySR_RP[a].markers[m].setMap(null);
		}
		for (s = 0; s < arraySR_RP[a].stops.length; s++) {
			arraySR_RP[a].stops[s].setMap(null);
		}
	}
	for (p = 0; p < placesasstops.length; p++) {
		placesasstops[p].setMap(null);
	}
	if (viewsp) {
		ViewHidePlaces();
	}
	map.setCenter(usermarker.getPosition());
	map.setZoom(10);
	console.log(3);
	setactualroute_RP(-1);
	viewstopsRP = 0;
	usermarker.setOptions({
		draggable : true
	});
	placeorutaostopsPS = 0;
}
function control_route_RP() {
	var padre = "#form_reportaproblem";

	if ($(padre + " #imgnose").attr('src') == "https://lh3.googleusercontent.com/-uPG50w9EmkM/VEDXQ-LPnnI/AAAAAAANgqE/VvaMNuGpOac/s53/9.png") {

		$(padre + " #imgnose").attr("src", "https://lh3.googleusercontent.com/-IpnwTDPvKJ8/VEE9ewLerrI/AAAAAAANgqk/oj0a3G6Oes0/s53/route%2520b%2526w%2520small.png");

		$(padre + " #imgstop").attr("src", "https://lh6.googleusercontent.com/-Ed5eM4fjk_o/VEE9e1Q9hTI/AAAAAAANgqo/DuklrSRrCbw/s59/stops%2520b%2526w%2520small.png");
		$(padre + " #mapasugg").show();
		$(padre + ' #divformcontent').show();
		$(padre + " #mapasugg_r").hide();
		$(padre + ' #div_data_r').hide();
		$(padre + " #mapasugg_s").hide();
		$(padre + ' #div_data_s').hide();
		$(padre + ' #titulosmapa').hide();
		$(padre + ' #mapasugg_controls').hide();
		$(padre + ' #isroutebutton').show();

	} else {
		$(padre + " #imgnose").attr("src", "https://lh3.googleusercontent.com/-uPG50w9EmkM/VEDXQ-LPnnI/AAAAAAANgqE/VvaMNuGpOac/s53/9.png");
		$(padre + " #imgstop").attr("src", "https://lh6.googleusercontent.com/-Ed5eM4fjk_o/VEE9e1Q9hTI/AAAAAAANgqo/DuklrSRrCbw/s59/stops%2520b%2526w%2520small.png");
		$(padre + ' #control_place2').show();
		$(padre + ' #but_rp').hide();
		$(padre + " #mapasugg").show();
		$(padre + ' #divformcontent').show();

		if ($(padre + ' #titulosmapa').text() == 'To add, click on the map') {
			$(padre + ' #titulosmapa').html('To draw, click on the map');
		} else {
			$(padre + ' #titulosmapa').hide();
		}

		$(padre + " #mapasugg_r").show();
		$(padre + ' #div_data_r').show();
		$(padre + ' #div_data_s').hide();
		$(padre + " #mapasugg_s").hide();

	}

	if (actualroute_RP == -1) {
		if (arraySR_RP.length >= 1) {
			map.fitBounds(todaslasrutasBounds);
			for (a = 0; a < arraySR_RP.length; a++) {
				arraySR_RP[a].setMap(map);
			}
		}
	} else {
		if (arraySR_RP[actualroute_RP].locations.length >= 2) {
			map.fitBounds(arraySR_RP[actualroute_RP].bounds);
		}
		for (m = 0; m < arraySR_RP[actualroute_RP].markers.length; m++) {
			arraySR_RP[actualroute_RP].markers[m].setMap(map);
		}
		for (s = 0; s < arraySR_RP[actualroute_RP].stops.length; s++) {
			arraySR_RP[actualroute_RP].stops[s].setMap(null);
		}
	}
	for (p = 0; p < placesasstops.length; p++) {
		placesasstops[p].setMap(null);
	}
	if (viewsp) {
		ViewHidePlaces();
	}
	viewstopsRP = 0;
	usermarker.setOptions({
		draggable : false
	});
	placeorutaostopsPS = 1;
}
function control_stops_RP() {
	console.log("control_stops_RP");

	if (actualroute_RP == -1) {
		alert('you have to select a route first');
		return false;
	}

	if ($("#imgstop").attr('src') == "https://lh5.googleusercontent.com/-dw-HxABt9TY/VEDXP0utKBI/AAAAAAANgp0/oSLoN9fjBzc/s60/6.png") {
		$("#imgstop").attr("src", "https://lh6.googleusercontent.com/-Ed5eM4fjk_o/VEE9e1Q9hTI/AAAAAAANgqo/DuklrSRrCbw/s59/stops%2520b%2526w%2520small.png");
		$("#mapasugg").show();
		$('#divformcontent').show();
		$("#mapasugg_r").hide();
		$('#div_data_r').hide();
		$("#mapasugg_s").hide();
		$('#titulosmapaPS').hide();
		$('#div_data_s').hide();
		$('#mapasugg_controls').hide();
		$('#isroutebutton').show();

		placeorutaostopsPS = 0;

		for (x = 0; x < arraySR_RP.length; x++) {
			for (r = 0; r < arraySR_RP[x].markers.length; r++) {
				arraySR_RP[x].markers[r].setMap(null);
			}
			for (s = 0; s < arraySR_RP[x].stops.length; s++) {
				arraySR_RP[x].stops[s].setMap(null);
			}
		}

		usermarker.setOptions({
			draggable : true
		});
		$('#titulosmapaPS').html('');

		if (typeof(map) != 'undefined') {
			map.setCenter(usermarker.getPosition());
			map.setZoom(10);
			console.log(4);
		}

		if (typeof(mapPS) != 'undefined') {
			mapPS.setCenter(usermarker.getPosition());
			mapPS.setZoom(10);
			console.log(5);
		}

		if (viewsp) {
			ViewHidePlaces();
		}
	} else {
		$("#imgnosePS").attr("src", "https://lh3.googleusercontent.com/-IpnwTDPvKJ8/VEE9ewLerrI/AAAAAAANgqk/oj0a3G6Oes0/s53/route%2520b%2526w%2520small.png");
		$("#imgstop").attr("src", "https://lh5.googleusercontent.com/-dw-HxABt9TY/VEDXP0utKBI/AAAAAAANgp0/oSLoN9fjBzc/s60/6.png");
		$('#div_data_sPS').show();
		$('#div_data_rPS').hide();
		$('#div_data_r2PS').hide();

		placeorutaostopsPS = 2;

		for (x = 0; x < arraySR_RP.length; x++) {

			for (r = 0; r < arraySR_RP[x].markers.length; r++) {
				arraySR_RP[x].markers[r].setMap(null);
			}

			if (x == actualroute_RP) {
				for (s = 0; s < arraySR_RP[x].stops.length; s++) {
					if (typeof(map) != 'undefined') {
						arraySR_RP[x].stops[s].setMap(map);
					}
					if (typeof(mapPS) != 'undefined') {
						arraySR_RP[x].stops[s].setMap(mapPS);
					}
				}
			}
		}

		usermarker.setOptions({
			draggable : false
		});
		$('#titulosmapaPS').html('To add, click on the map');
	}

	console.log("Var placeorutaostopsPS=" + placeorutaostopsPS);
}
function setactualroute_RP(index) {
	actualroute_RP = index;
	for (r = 0; r < arraySR_RP.length; r++) {
		$('#active_r_' + r).hide();

		if (r == actualroute_RP) {
			if (arraySR_RP[r].markers.length >= 2) {
				mapPS.fitBounds(arraySR_RP[r].bounds);
			}

			var name = arraySR_RP[r].name;
			var color = arraySR_RP[r].color;
			$("#spanrutanamestops").html(name);
			document.getElementById('spanrutanamestops').style.color = '#' + color;
			var visible = 'block';

			if (placeorutaostopsPS == 1) {
				var focusin = r;
				for (m = 0; m < arraySR_RP[r].markers.length; m++) {
					arraySR_RP[r].markers[m].setMap(mapPS);
				}
			}
			if (placeorutaostopsPS == 2) {
				for (s = 0; s < arraySR_RP[r].stops.length; s++) {
					arraySR_RP[r].stops[s].setMap(mapPS);
				}
			}
		} else {
			for (m = 0; m < arraySR_RP[r].markers.length; m++) {
				arraySR_RP[r].markers[m].setMap(null);
			}
			for (s = 0; s < arraySR_RP[r].stops.length; s++) {
				arraySR_RP[r].stops[s].setMap(null);
			}
		}
	}
	$('#active_r_' + actualroute_RP).show();

}
function deletemarker_r(route, index) {
	alert("pendings.js");
	arraySR_RP[route].markers[index].setMap(null);
	arraySR_RP[route].markers.splice(index, 1);
	arraySR_RP[route].locations.splice(index, 1);
	arraySR_RP[route].setPath(arraySR_RP[route].locations);
	for (m = 0; m < arraySR_RP[route].markers.length; m++) {
		arraySR_RP[route].markers[m].index = m;
		arraySR_RP[route].markers[m].infowindow = new google.maps.InfoWindow({
				content : '<input type="button" value="Remove" onclick="deletemarker_r(' + arraySR_RP[route].markers[m].route + ',' + arraySR_RP[route].markers[m].index + ');"/>',
				size : new google.maps.Size(150, 150)
			});
	}
	arraySR_RP[route].bounds = new google.maps.LatLngBounds();
	arraySR_RP[route].bounds.extend(usermarker.getPosition());
	for (x = 0; x < arraySR_RP[route].locations.length; x++) {
		arraySR_RP[route].bounds.extend(arraySR_RP[route].locations[x]);
	}
	if (arraySR_RP[route].locations.length >= 2) {
		map.fitBounds(arraySR_RP[route].bounds);
	}
}
function Addthisplace_RP(ruta_id) {
	var add = true;
	for (s = 0; s < arraySR_RP[actualroute_RP].stops.length; s++) {
		if (ruta_id == arraySR_RP[actualroute_RP].stops[s].placeid) {
			var add = false;
			var index = s;
		}
	}
	if (!add) {
		deletestop(actualroute_RP, index);
		document.getElementById('button_sugg_add').value = 'Add as Stop';
	} else {
		for (p = 0; p < placesasstops.length; p++) {
			if (placesasstops[p].placeid == ruta_id) {
				var coors = placesasstops[p].getPosition();
				var name = placesasstops[p].getTitle();
			}
		}
		var index = arraySR_RP[actualroute_RP].stops.length;
		arraySR_RP[actualroute_RP].stops.push(createStopMarker(coors, name, 'MYEZPLAN PLACE', actualroute_RP, index, ruta_id))
		document.getElementById('button_sugg_add').value = 'Remove as Stop';
	}
}
function deletestop(route, index) {
	modificastops = true;
	arraySR_RP[route].stops[index].infowindow.close(map, arraySR_RP[route].stops[index]);
	arraySR_RP[route].stops[index].setMap(null);
	arraySR_RP[route].stops.splice(index, 1);
	for (s = 0; s < arraySR_RP[route].stops.length; s++) {
		arraySR_RP[route].stops[s].index = s;
		if (arraySR_RP[route].stops[s].placeid == 0) {
			arraySR_RP[route].stops[s].infowindow = new google.maps.InfoWindow({
					content : '<input placeholder="Name" type="text" id="namestp" value="' + arraySR_RP[route].stops[s].getTitle() + '"/><br/><input placeholder="Description" type="text" id="descstp" value="' + arraySR_RP[route].stops[s].desc + '"/><br/><input type="button" value="Update" onclick="changestop_nd(' + arraySR_RP[route].stops[s].inroute + ',' + arraySR_RP[route].stops[s].index + ');">&nbsp;<input type="button" value="Eliminate" onclick="deletestop(' + arraySR_RP[route].stops[s].inroute + ',' + arraySR_RP[route].stops[s].index + ');">',
					size : new google.maps.Size(400, 400)
				});
		} else {
			arraySR_RP[route].stops[s].infowindow = new google.maps.InfoWindow({
					content : 'Name: ' + arraySR_RP[route].stops[s].name + '<br/><input type="button" value="Info" onclick="ShowInfo_RP(' + arraySR_RP[route].stops[s].placeid + ');"/>&nbsp;<input type="button" value="Remove" onclick="deletestop(' + arraySR_RP[route].stops[s].inroute + ',' + arraySR_RP[route].stops[s].index + ');"/>',
					size : new google.maps.Size(400, 400)
				});
		}
	}

}
function changestop_nd(route, index) {
	modificastops = true;
	var titulo = document.getElementById('namestp').value;
	if (titulo == '') {
		alert('Invalid name');
		return false;
	}
	var desc = document.getElementById('descstp').value;
	arraySR_RP[route].stops[index].infowindow.close(map, arraySR_RP[route].stops[index]);
	arraySR_RP[route].stops[index].infowindow = new google.maps.InfoWindow({
			content : '<input placeholder="Name" type="text" id="namestp" value="' + titulo + '"/><br/><input placeholder="Description" type="text" id="descstp" value="' + desc + '"/><br/><input type="button" value="Update" onclick="changestop_nd(' + route + ',' + index + ');">&nbsp;<input type="button" value="Eliminate" onclick="deletestop(' + route + ',' + index + ');">',
			size : new google.maps.Size(250, 250)
		});
	arraySR_RP[route].stops[index].desc = desc;
	arraySR_RP[route].stops[index].setTitle(titulo);
}
function ViewHidePlacesPS() {
	if (viewsp) {
		viewsp = false;
		$("#div_stopsdata_RP").empty();
		document.getElementById('buttplacesasstops').style.backgroundColor = 'lightgray';
		$('#spanplacesasstops').hide();
		$('#spanplacesnormal').show();

		for (p = 0; p < placesasstops.length; p++) {
			placesasstops[p].setMap(null);
		}
	} else {
		viewsp = true;
		document.getElementById('buttplacesasstops').style.backgroundColor = '#17375E';
		$('#spanplacesasstops').show();
		$('#spanplacesnormal').hide();

		for (p = 0; p < placesasstops.length; p++) {
			if (mapPS.getBounds().contains(placesasstops[p].getPosition())) {
				placesasstops[p].setMap(mapPS);
			};
		}
	}
}
function ShowInfo_RP(rutaid) {
	var textoboton = 'Add';
	for (s = 0; s < arraySR_RP[actualroute_RP].stops.length; s++) {
		if (rutaid == arraySR_RP[actualroute_RP].stops[s].placeid) {
			var textoboton = 'Remove';
		}
	}
	$('#viewstopinfo').show();
	var urlconfig = {
		action : 'stopsdata',
		ruta_id : rutaid,
		source : 'report_pending',
		texto : textoboton
	};
	var url = "data_ajax/reportaproblem_content.cfm?rnu=5131616516651";
	$("#viewstopinfo").load(url, urlconfig);
}
function CloseInfo_RP() {
	$('#viewstopinfo').empty().hide();
}
function savesaspending_i() {
	document.getElementById('rutacoors').value = locations.join('*').toString().replace(/ /g, '');
	//document.getElementById('form_typePS').value='PIR';
	stops_ = [];
	for (s = 0; s < stops.length; s++) {
		var desc = ' ';
		if (stops[s].desc != '') {
			var desc = ' ';
		}
		stops_.push(stops[s].getPosition().toString().replace(/ /g, '') + '*' + stops[s].name + '*' + desc + '*0')
	}
	document.getElementById('rutastops').value = stops_.join('!');
	//document.getElementById('id_reporte').value=idunico(1);
	var services_ = [];
	var transport_ = [];
	for (c = 1; c <= 4; c++) {
		var che = document.getElementById('detail_servicesPS' + c).checked;
		if (che) {
			services_.push(c);
		}
	}
	document.getElementById('detailservices').value = services_.join(',');
	for (c = 1; c <= 5; c++) {
		var che = document.getElementById('detail_transportationPS' + c).checked;
		if (che) {
			transport_.push(c);
		}
	}
	document.getElementById('detailtransportation').value = transport_.join(',');
	var links = [];
	for (x = 0; x <= linkscant; x++) {
		var valor = document.getElementById('urllinkPS' + x).value;
		if (valor != '') {
			alguncambio = true;
			links.push(valor);
		}
	}
	document.getElementById('urllinks').value = links.join('*');
	for (i = 0; i < imgtoupload.length; i++) {
		if (imgtoupload[i] == '') {
			imgtoupload[i] = 'NOIMAGEN';
		} else {
			alguncambio = true;
		}
	}
	document.getElementById('img_toupload').value = imgtoupload.join(',');
	var imglinks = [];
	$('.img_link').each(function (index, element) {
		if (element.value != '') {
			alguncambio = true;
			imglinks.push(element.value);
		}
	});
	document.getElementById('img_links').value = imglinks.join('*');
	var textos = [];
	for (c = 0; c <= cuentaeventos; c++) {
		var fecha1 = document.getElementById('fechai_' + c).value;
		if (fecha1 == '') {
			var fecha1 = 'NODATE';
		}
		var fecha2 = document.getElementById('fechaf_' + c).value;
		if (fecha2 == '') {
			var fecha2 = 'NODATE';
		}
		var texto = document.getElementById('w_text_PS' + c).value;
		if (texto == '') {
			var texto = 'NO DATA';
		}
		if (fecha1 != 'NODATE' && fecha2 != 'NODATE' && texto != 'NO DATA') {
			textos.push(fecha1 + '*' + fecha2 + '*' + texto);
			alguncambio = true;
		}
	}
	document.getElementById('whats').value = textos.join('!');
	$('#form_reportaproblem').submit();
}

function savesaspendingPS() {

	if (confirm("Your Suggestion has been saved in pendings. Do you want to view pendings ?")) {
		if (typeof(usermarker) == 'undefined') {
			alert('please create a valid point in map');
			return false;
		}

		var nombre = document.getElementById('detail_namePS').value;

		if (nombre == '') {
			alert('please type a valid name');
			document.getElementById('detail_namePS').focus();
			return false;
		}

		var plcoors = usermarker.getPosition();
		document.getElementById('placecoors').value = plcoors;
		document.getElementById('report_id').value = idunico(1);

		var cityid = document.getElementById('city').value;
		if (cityid == '') {
			var cityid = document.getElementById('selcity').value;
			document.getElementById('city').value = cityid;
		}

		var sta = document.getElementById('userreport_status').value;
		document.getElementById('report_status').value = sta;

		var links = [];
		for (x = 0; x <= linkscant; x++) {
			var valor = document.getElementById('urllink' + x).value;
			if (valor != '') {
				alguncambio = true;
				links.push(valor);
			}
		}

		document.getElementById('urllinks').value = links.join('*');
		document.getElementById('form_type').value = 'PS';
		for (i = 0; i < imgtoupload.length; i++) {
			if (imgtoupload[i] == '') {
				imgtoupload[i] = 'NOIMAGEN';
			}
		}

		document.getElementById('img_toupload').value = imgtoupload.join(',');
		var imglinks = [];
		$('.img_link').each(function (index, element) {
			if (element.value != '') {
				alguncambio = true;
				imglinks.push(element.value);
			}
		});

		document.getElementById('img_links').value = imglinks.join('*');

		var services_ = [];
		var che1 = document.getElementById('detail_services1').checked;
		if (che1) {
			services_.push(1);
		}
		var che2 = document.getElementById('detail_services2').checked;
		if (che2) {
			services_.push(2);
		}
		var che3 = document.getElementById('detail_services3').checked;
		if (che3) {
			services_.push(3);
		}
		var che4 = document.getElementById('detail_services4').checked;
		if (che4) {
			services_.push(4);
		}
		document.getElementById('detailservices').value = services_.join(',');

		var transport_ = [];
		var chea1 = document.getElementById('detail_transportation1').checked;
		if (chea1) {
			transport_.push(1);
		}
		var chea2 = document.getElementById('detail_transportation2').checked;
		if (chea2) {
			transport_.push(2);
		}
		var chea3 = document.getElementById('detail_transportation3').checked;
		if (chea3) {
			transport_.push(3);
		}
		var chea4 = document.getElementById('detail_transportation4').checked;
		if (chea4) {
			transport_.push(4);
		}
		var chea5 = document.getElementById('detail_transportation5').checked;
		if (chea5) {
			transport_.push(5);
		}
		document.getElementById('detailtransportation').value = transport_.join(',');

		var comment_ = [];
		var textos = [];
		for (c = 0; c <= cuentaeventos; c++) {
			var fecha1 = document.getElementById('fechai_' + c).value;
			if (fecha1 == '') {
				var fecha1 = 'NODATE';
			}
			var fecha2 = document.getElementById('fechaf_' + c).value;
			if (fecha2 == '') {
				var fecha2 = 'NODATE';
			}
			var texto = document.getElementById('w_text_' + c).value;
			if (texto == '') {
				var texto = 'NO DATA';
			}
			if (fecha1 != 'NODATE' && fecha2 != 'NODATE' && texto != 'NO DATA') {
				textos.push(fecha1 + '*' + fecha2 + '*' + texto)
			}
		}

		document.getElementById('whats').value = textos.join('!');
		var ismap = document.getElementById('ismap').value;
		var rutas = [];
		var stops = [];
		if (ismap != 0) {
			for (r = 0; r < rutasarray.length; r++) {
				if (r == 0) {
					var icon = 'https://lh6.googleusercontent.com/-8xxqF9thOCg/U9nRcchbb_I/AAAAAAANgBg/C77KoahO1Sc/s44/64.png';
				}
				if (r == 1) {
					var icon = 'https://lh3.googleusercontent.com/-Tx9ASyR-Pm0/U9nRcry7fQI/AAAAAAANgB4/S4-sPOCQyv4/s44/66.png';
				}
				if (r == 2) {
					var icon = 'https://lh3.googleusercontent.com/-Y2nKnJNaweg/U9nRcP8BO4I/AAAAAAANgBc/nnLGfRYqBm8/s45/65.png';
				}
				if (rutasarray[r].locations.length >= 2) {
					rutas.push(r + '!' + rutasarray[r].name + '!' + rutasarray[r].color + '!0!' + rutasarray[r].locations.join('*').replace(/ /g, '') + '!' + icon);
					for (s = 0; s < rutasarray[r].stops.length; s++) {
						var desc = rutasarray[r].stops[s].desc;
						if (desc == '') {
							var desc = 'NODESC';
						}
						stops.push(rutasarray[r].stops[s].getPosition().toString().replace(/ /g, '') + '*' + rutasarray[r].stops[s].getTitle() + '*' + desc + '*' + r + '*' + rutasarray[r].stops[s].placeid);
					}
				}
			}

			document.getElementById('ruta_data').value = rutas.join('?');
			document.getElementById('stops_data').value = stops.join('!');
		}
		if (rutas.length == 0) {
			document.getElementById('ismap').value = 0;
		}

		$("#form_reportaproblem").submit(function (ev) {
			$.ajax({
				type : $("#form_reportaproblem").attr('method'),
				url : $("#form_reportaproblem").attr('action'),
				data : $("#form_reportaproblem").serialize(),
				success : function (data) {
					//alert('ok');
				}
			});
			ev.preventDefault();
		});
		$("#form_reportaproblem").submit();

		showExternalPage('report_suggest_pendings.cfm');
	}

}

function ValidateSave_RI_P() {
	document.getElementById('rutacoors').value = locations.join('*').toString().replace(/ /g, '');
	var type_ = document.getElementById('form_type').value;
	if (type_ == 'PIR') {
		document.getElementById('form_type').value = 'IR';
	}
	if (type_ == 'PIS') {
		document.getElementById('form_type').value = 'IS';
		var nombre = document.getElementById('rutaname').value;
		if (nombre == '') {
			alert('you must type a valid name to segguest a route');
			document.getElementById('rutaname').focus();
			return false;
		}
	}
	stops_ = [];
	for (s = 0; s < stops.length; s++) {
		var desc = ' ';
		if (stops[s].desc != '') {
			var desc = ' ';
		}
		stops_.push(stops[s].getPosition().toString().replace(/ /g, '') + '*' + stops[s].name + '*' + desc + '*0')
	}
	document.getElementById('rutastops').value = stops_.join('!');
	var services_ = [];
	var transport_ = [];
	for (c = 1; c <= 4; c++) {
		var che = document.getElementById('detail_services' + c).checked;
		if (che) {
			services_.push(c);
		}
	}
	document.getElementById('detailservices').value = services_.join(',');
	for (c = 1; c <= 5; c++) {
		var che = document.getElementById('detail_transportation' + c).checked;
		if (che) {
			transport_.push(c);
		}
	}
	document.getElementById('detailtransportation').value = transport_.join(',');
	var links = [];
	for (x = 0; x <= linkscant; x++) {
		var valor = document.getElementById('urllink' + x).value;
		if (valor != '') {
			alguncambio = true;
			links.push(valor);
		}
	}
	document.getElementById('urllinks').value = links.join('*');
	for (i = 0; i < imgtoupload.length; i++) {
		if (imgtoupload[i] == '') {
			imgtoupload[i] = 'NOIMAGEN';
		} else {
			alguncambio = true;
		}
	}
	document.getElementById('img_toupload').value = imgtoupload.join(',');
	var imglinks = [];
	$('.img_link').each(function (index, element) {
		if (element.value != '') {
			alguncambio = true;
			imglinks.push(element.value);
		}
	});
	document.getElementById('img_links').value = imglinks.join('*');
	var textos = [];
	for (c = 0; c <= cuentaeventos; c++) {
		var fecha1 = document.getElementById('fechai_' + c).value;
		if (fecha1 == '') {
			var fecha1 = 'NODATE';
		}
		var fecha2 = document.getElementById('fechaf_' + c).value;
		if (fecha2 == '') {
			var fecha2 = 'NODATE';
		}
		var texto = document.getElementById('w_text_' + c).value;
		if (texto == '') {
			var texto = 'NO DATA';
		}
		if (fecha1 != 'NODATE' && fecha2 != 'NODATE' && texto != 'NO DATA') {
			textos.push(fecha1 + '*' + fecha2 + '*' + texto);
			alguncambio = true;
		}
	}
	document.getElementById('whats').value = textos.join('!');
	$('#form_reportaproblem').submit();
}
function ValidateSave_RP_P() {
	if (typeof(usermarker) == 'undefined') {
		alert('please create a valid point in map');
		return false;
	}
	var nombre = document.getElementById('detail_name').value;
	var plcoors = usermarker.getPosition().toString().replace(/ /g, '');
	document.getElementById('placecoors').value = plcoors;
	var sta = document.getElementById('userreport_status').value;
	document.getElementById('report_status').value = sta;
	var links = [];
	for (x = 0; x <= linkscant; x++) {
		var valor = document.getElementById('urllink' + x).value;
		if (valor != '') {
			alguncambio = true;
			links.push(valor);
		}
	}
	document.getElementById('urllinks').value = links.join('*');
	if (document.getElementById('form_type').value == 'PR') {
		var tipoo = 'R';
	}
	if (document.getElementById('form_type').value == 'PS') {
		var tipoo = 'S';
	}
	document.getElementById('form_type').value = tipoo;
	for (i = 0; i < imgtoupload.length; i++) {
		if (imgtoupload[i] == '') {
			imgtoupload[i] = 'NOIMAGEN';
		}
	}
	document.getElementById('img_toupload').value = imgtoupload.join(',');
	var imglinks = [];
	$('.img_link').each(function (index, element) {
		if (element.value != '') {
			alguncambio = true;
			imglinks.push(element.value);
		}
	});
	document.getElementById('img_links').value = imglinks.join('*');
	//	var fname=document.getElementById('detail_photo').value;
	//	document.getElementById('file_n').value=fname;
	var services_ = [];
	var che1 = document.getElementById('detail_services1').checked;
	if (che1) {
		services_.push(1);
	}
	var che2 = document.getElementById('detail_services2').checked;
	if (che2) {
		services_.push(2);
	}
	var che3 = document.getElementById('detail_services3').checked;
	if (che3) {
		services_.push(3);
	}
	var che4 = document.getElementById('detail_services4').checked;
	if (che4) {
		services_.push(4);
	}
	document.getElementById('detailservices').value = services_.join(',');
	var transport_ = [];
	var chea1 = document.getElementById('detail_transportation1').checked;
	if (chea1) {
		transport_.push(1);
	}
	var chea2 = document.getElementById('detail_transportation2').checked;
	if (chea2) {
		transport_.push(2);
	}
	var chea3 = document.getElementById('detail_transportation3').checked;
	if (chea3) {
		transport_.push(3);
	}
	var chea4 = document.getElementById('detail_transportation4').checked;
	if (chea4) {
		transport_.push(4);
	}
	var chea5 = document.getElementById('detail_transportation5').checked;
	if (chea5) {
		transport_.push(5);
	}
	document.getElementById('detailtransportation').value = transport_.join(',');
	var comment_ = [];
	var textos = [];
	for (c = 0; c <= cuentaeventos; c++) {
		var fecha1 = document.getElementById('fechai_' + c).value;
		if (fecha1 == '') {
			var fecha1 = 'NODATE';
		}
		var fecha2 = document.getElementById('fechaf_' + c).value;
		if (fecha2 == '') {
			var fecha2 = 'NODATE';
		}
		var texto = document.getElementById('w_text_' + c).value;
		if (texto == '') {
			var texto = 'NO DATA';
		}
		if (fecha1 != 'NODATE' && fecha2 != 'NODATE' && texto != 'NO DATA') {
			textos.push(fecha1 + '*' + fecha2 + '*' + texto)
		}
	}
	document.getElementById('whats').value = textos.join('!');
	//	document.getElementById('report_id').value=idunico(1);
	if (arraySR_RP.length == 0) {
		var ismap = 0;
		document.getElementById('ismap').value = ismap;
	} else {
		var ismap = 1;
		document.getElementById('ismap').value = ismap;
	}
	if (ismap != 0) {
		var textoderutas = [];
		var textodestops = [];
		for (ind = 0; ind < arraySR_RP.length; ind++) {
			if (arraySR_RP[ind].locations.length != 0) {
				var thisrutatext = [];
				for (ind2 = 0; ind2 < arraySR_RP[ind].locations.length; ind2++) {
					thisrutatext.push(arraySR_RP[ind].locations[ind2].toString().replace(/ /g, ''));
				}
				textoderutas.push(ind + '!' + arraySR_RP[ind].name + '!' + arraySR_RP[ind].color.replace('#', '') + '!' + arraySR_RP[ind].rid + '!' + thisrutatext.join('*') + '!' + arraySR_RP[ind].icon)
				for (ind3 = 0; ind3 < arraySR_RP[ind].stops.length; ind3++) {
					var desc = arraySR_RP[ind].stops[ind3].desc;
					if (desc == '' || desc == ' ') {
						var desc = 'NODESC';
					}
					textodestops.push(arraySR_RP[ind].stops[ind3].getPosition().toString().replace(/ /g, '') + '*' + arraySR_RP[ind].stops[ind3].getTitle() + '*' + desc + '*' + arraySR_RP[ind].stops[ind3].inroute + '*' + arraySR_RP[ind].stops[ind3].placeid)
				}
				//				for(p=0;p<placesasstops.length;p++){
				//					if(placesasstops[p].isadded==1 && placesasstops[p].inroute==ind){
				//						textodestops.push(placesasstops[p].getPosition().toString().replace(/ /g,'')+'*'+placesasstops[p].getTitle()+'*NODESC*'+placesasstops[p].inroute+'*'+placesasstops[p].placeid);
				//					}
				//				}
			}
		}
		document.getElementById('ruta_data').value = textoderutas.join('?');
		document.getElementById('stops_data').value = textodestops.join('!');
	}

	$("#form_reportaproblem").submit();
}
function savesaspending_t() {
	//	var type=document.getElementById('form_typePS').value;
	//	if(type=='TR'){document.getElementById('form_typePS').value='PTR';}
	//	else{document.getElementById('form_typePS').value='PTS';}
	var nombre = document.getElementById('detail_name').value;
	var sta = document.getElementById('userreport_status').value;
	document.getElementById('report_status').value = sta;
	var links = [];
	for (x = 0; x <= linkscant; x++) {
		var valor = document.getElementById('urllink' + x).value;
		if (valor != '') {
			alguncambio = true;
			links.push(valor);
		}
	}
	document.getElementById('urllinks').value = links.join('*');
	for (i = 0; i < imgtoupload.length; i++) {
		if (imgtoupload[i] == '') {
			imgtoupload[i] = 'NOIMAGEN';
		} else {
			alguncambio = true;
		}
	}
	document.getElementById('img_toupload').value = imgtoupload.join(',');
	var imglinks = [];
	$('.img_link').each(function (index, element) {
		if (element.value != '') {
			alguncambio = true;
			imglinks.push(element.value);
		}
	});
	document.getElementById('img_links').value = imglinks.join('*');
	var services_ = [];
	for (s = 1; s <= 4; s++) {
		var che = document.getElementById('detail_services' + s).checked;
		if (che) {
			services_.push(s);
		}
	}
	document.getElementById('detailservices').value = services_.join(',');
	var transport_ = [];
	for (t = 1; t <= 5; t++) {
		var chea = document.getElementById('detail_transportation' + t).checked;
		if (chea) {
			transport_.push(t);
		}
	}
	document.getElementById('detailtransportation').value = transport_.join(',');
	var textos = [];
	for (c = 0; c <= cuentaeventos; c++) {
		var fecha1 = document.getElementById('fechai_' + c).value;
		if (fecha1 == '') {
			var fecha1 = 'NODATE';
		}
		var fecha2 = document.getElementById('fechaf_' + c).value;
		if (fecha2 == '') {
			var fecha2 = 'NODATE';
		}
		var texto = document.getElementById('w_text_' + c).value;
		if (texto == '') {
			var texto = 'NO DATA';
		}
		if (fecha1 != 'NODATE' && fecha2 != 'NODATE' && texto != 'NO DATA') {
			textos.push(fecha1 + '*' + fecha2 + '*' + texto);
			alguncambio = true;
		}
	}
	document.getElementById('whats').value = textos.join('!');
	if (locations.length >= 2) {
		var textoderutas = [];
		var textodestops = [];
		for (ind2 = 0; ind2 < locations.length; ind2++) {
			textoderutas.push(locations[ind2].toString().replace(/ /g, ''));
		}
		for (ind3 = 0; ind3 < stops.length; ind3++) {
			var desc = stops[ind3].desc;
			if (desc == '' || desc == ' ') {
				var desc = 'NODESC';
			}
			textodestops.push(stops[ind3].getPosition().toString().replace(/ /g, '') + '*' + stops[ind3].getTitle() + '*' + desc)
		}
		document.getElementById('ruta_data').value = textoderutas.join('*');
		document.getElementById('stops_data').value = textodestops.join('!');
	}

	$("#form_reportaproblem").submit();
}
function savesaspending_s() {
	//	var type=document.getElementById('form_typePS').value;
	//	if(type=='TR'){document.getElementById('form_typePS').value='PTR';}
	//	else{document.getElementById('form_typePS').value='PTS';}
	var nombre = document.getElementById('detail_name').value;
	var links = [];
	for (x = 0; x <= linkscant; x++) {
		var valor = document.getElementById('urllink' + x).value;
		if (valor != '') {
			alguncambio = true;
			links.push(valor);
		}
	}
	document.getElementById('urllinks').value = links.join('*');
	for (i = 0; i < imgtoupload.length; i++) {
		if (imgtoupload[i] == '') {
			imgtoupload[i] = 'NOIMAGEN';
		} else {
			alguncambio = true;
		}
	}
	document.getElementById('img_toupload').value = imgtoupload.join(',');
	var imglinks = [];
	$('.img_link').each(function (index, element) {
		if (element.value != '') {
			alguncambio = true;
			imglinks.push(element.value);
		}
	});
	document.getElementById('img_links').value = imglinks.join('*');
	var services_ = [];
	for (s = 1; s <= 4; s++) {
		var che = document.getElementById('detail_services' + s).checked;
		if (che) {
			services_.push(s);
		}
	}
	document.getElementById('detailservices').value = services_.join(',');
	var transport_ = [];
	for (t = 1; t <= 5; t++) {
		var chea = document.getElementById('detail_transportation' + t).checked;
		if (chea) {
			transport_.push(t);
		}
	}
	document.getElementById('detailtransportation').value = transport_.join(',');
	var textos = [];
	for (c = 0; c <= cuentaeventos; c++) {
		var fecha1 = document.getElementById('fechai_' + c).value;
		if (fecha1 == '') {
			var fecha1 = 'NODATE';
		}
		var fecha2 = document.getElementById('fechaf_' + c).value;
		if (fecha2 == '') {
			var fecha2 = 'NODATE';
		}
		var texto = document.getElementById('w_text_' + c).value;
		if (texto == '') {
			var texto = 'NO DATA';
		}
		if (fecha1 != 'NODATE' && fecha2 != 'NODATE' && texto != 'NO DATA') {
			textos.push(fecha1 + '*' + fecha2 + '*' + texto);
			alguncambio = true;
		}
	}
	document.getElementById('whats').value = textos.join('!');
	if (arraySR_SRP.length == 0) {
		var ismap = 0;
		document.getElementById('ismap').value = ismap;
	} else {
		var ismap = 1;
		document.getElementById('ismap').value = ismap;
	}
	if (ismap != 0) {
		var textoderutas = [];
		var textodestops = [];
		for (ind = 0; ind < arraySR_SRP.length; ind++) {
			if (arraySR_SRP[ind].locations.length != 0) {
				var thisrutatext = [];
				for (ind2 = 0; ind2 < arraySR_SRP[ind].locations.length; ind2++) {
					thisrutatext.push(arraySR_SRP[ind].locations[ind2].toString().replace(/ /g, ''));
				}
				textoderutas.push(ind + '!' + arraySR_SRP[ind].name + '!' + arraySR_SRP[ind].color.replace('#', '') + '!' + arraySR_SRP[ind].rid + '!' + thisrutatext.join('*') + '!' + arraySR_SRP[ind].icon)
				for (ind3 = 0; ind3 < arraySR_SRP[ind].stops.length; ind3++) {
					var desc = arraySR_SRP[ind].stops[ind3].desc;
					if (desc == '' || desc == ' ') {
						var desc = 'NODESC';
					}
					textodestops.push(arraySR_SRP[ind].stops[ind3].getPosition().toString().replace(/ /g, '') + '*' + arraySR_SRP[ind].stops[ind3].getTitle() + '*' + desc + '*' + arraySR_SRP[ind].stops[ind3].inroute)
				}
			}
		}
		document.getElementById('ruta_data').value = textoderutas.join('?');
		document.getElementById('stops_data').value = textodestops.join('!');
	}
	document.getElementById('detail_type').value = document.getElementById('seldecat').value;
	$("#form_reportaproblem").submit();
}
function ValidateSave_RT_P() {
	var type = document.getElementById('form_type').value;
	if (type == 'PTS') {
		document.getElementById('form_type').value = 'TS';
	}
	if (type == 'PTR') {
		document.getElementById('form_type').value = 'TR';
	}
	var nombre = document.getElementById('detail_name').value;
	if (nombre == '') {
		alert('please enter a valid name');
		document.getElementById('detail_name').focus();
		return false;
	}
	var sta = document.getElementById('userreport_status').value;
	document.getElementById('report_status').value = sta;
	var links = [];
	for (x = 0; x <= linkscant; x++) {
		var valor = document.getElementById('urllink' + x).value;
		if (valor != '') {
			alguncambio = true;
			links.push(valor);
		}
	}
	document.getElementById('urllinks').value = links.join('*');
	for (i = 0; i < imgtoupload.length; i++) {
		if (imgtoupload[i] == '') {
			imgtoupload[i] = 'NOIMAGEN';
		} else {
			alguncambio = true;
		}
	}
	document.getElementById('img_toupload').value = imgtoupload.join(',');
	var imglinks = [];
	$('.img_link').each(function (index, element) {
		if (element.value != '') {
			alguncambio = true;
			imglinks.push(element.value);
		}
	});
	document.getElementById('img_links').value = imglinks.join('*');
	var services_ = [];
	for (s = 1; s <= 4; s++) {
		var che = document.getElementById('detail_services' + s).checked;
		if (che) {
			services_.push(s);
		}
	}
	document.getElementById('detailservices').value = services_.join(',');
	var transport_ = [];
	for (t = 1; t <= 5; t++) {
		var chea = document.getElementById('detail_transportation' + t).checked;
		if (chea) {
			transport_.push(t);
		}
	}
	document.getElementById('detailtransportation').value = transport_.join(',');
	var textos = [];
	for (c = 0; c <= cuentaeventos; c++) {
		var fecha1 = document.getElementById('fechai_' + c).value;
		if (fecha1 == '') {
			var fecha1 = 'NODATE';
		}
		var fecha2 = document.getElementById('fechaf_' + c).value;
		if (fecha2 == '') {
			var fecha2 = 'NODATE';
		}
		var texto = document.getElementById('w_text_' + c).value;
		if (texto == '') {
			var texto = 'NO DATA';
		}
		if (fecha1 != 'NODATE' && fecha2 != 'NODATE' && texto != 'NO DATA') {
			textos.push(fecha1 + '*' + fecha2 + '*' + texto);
			alguncambio = true;
		}
	}
	document.getElementById('whats').value = textos.join('!');
	if (locations.length >= 2) {
		var textoderutas = [];
		var textodestops = [];
		for (ind2 = 0; ind2 < locations.length; ind2++) {
			textoderutas.push(locations[ind2].toString().replace(/ /g, ''));
		}
		for (ind3 = 0; ind3 < stops.length; ind3++) {
			var desc = stops[ind3].desc;
			if (desc == '' || desc == ' ') {
				var desc = 'NODESC';
			}
			textodestops.push(stops[ind3].getPosition().toString().replace(/ /g, '') + '*' + stops[ind3].getTitle() + '*' + desc)
		}
		document.getElementById('ruta_data').value = textoderutas.join('*');
		document.getElementById('stops_data').value = textodestops.join('!');
	} else {
		alert('you have to draw a valid route');
		return false;
	}
	document.getElementById('detail_type').value = document.getElementById('seldecat').value;
	$("#form_reportaproblem").submit();
}

function createLocationMarker_t(location, name, desc, icon, id, index) {
	if (rutaostops == 0) {
		var locationMarkerPS = new google.maps.Marker();
		locationMarkerPS.setOptions({
			icon : 'https://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png',
			draggable : true,
			map : map,
			position : location
		});
		locationMarkerPS.index = index;
		locationMarkerPS.ruta = subruta;
		locationMarkerPS.infowindow = new google.maps.InfoWindow({
				content : '<input type="button" value="Remove" onclick="deletemarker_t(' + locationMarkerPS.index + ');"/>',
				size : new google.maps.Size(250, 250)
			});

		google.maps.event.addListener(locationMarkerPS, "click", function () {
			for (m = 0; m < markers.length; m++) {
				markers[m].infowindow.close(map, markers[m]);
			}
			locationMarkerPS.infowindow.open(map, locationMarkerPS);
		})
		google.maps.event.addListener(locationMarkerPS, "dragend", function () {
			modificaruta = true;
			subruta = locationMarkerPS.ruta;
			rutaostops = 0;
			// if(subruta==0){
			var index = locationMarkerPS.index;
			if (index >= 0) {
				var nLatLng = locationMarkerPS.getPosition();
				var modifiedLocation = nLatLng;
				locations[index] = modifiedLocation;
				polyline.setPath(locations);
			}
			// }
		});
	} else {
		var locationMarkerPS = new google.maps.Marker();
		locationMarkerPS.setOptions({
			icon : icon,
			draggable : true,
			map : map,
			title : name,
			position : location
		});
		locationMarkerPS.index = index;
		locationMarkerPS.name = name;
		locationMarkerPS.name_o = name;
		locationMarkerPS.desc = desc;
		locationMarkerPS.desc_0 = desc;
		locationMarkerPS.position_o = location;
		locationMarkerPS.icon = icon;
		locationMarkerPS.id_o = id;
		locationMarkerPS.infowindow = new google.maps.InfoWindow({
				content : '<input id="stopname" type="text" placeholder="Name" value="' + locationMarkerPS.name + '"/><br/><input placeholder="Description" id="stopdesc" type="text" value="' + locationMarkerPS.desc + '"/><br/><input type="button" value="Update" onclick="changestopdata(' + locationMarkerPS.index + ');"/>&nbsp;<input type="button" value="Remove" onclick="delstopdata(' + locationMarkerPS.index + ');"/>',
				size : new google.maps.Size(250, 250)
			});
		google.maps.event.addListener(locationMarkerPS, "click", function () {
			for (s = 0; s < stops.length; s++) {
				stops[s].infowindow.close(map, stops[s]);
			}
			locationMarkerPS.infowindow = new google.maps.InfoWindow({
					content : '<input placeholder="Name" id="stopname" type="text" value="' + locationMarkerPS.name + '"/><br/><input placeholder="Description" id="stopdesc" type="text" value="' + locationMarkerPS.desc + '"/><br/><input type="button" value="Update" onclick="changestopdata(' + locationMarkerPS.index + ');"/>&nbsp;<input type="button" value="Remove" onclick="delstopdata(' + locationMarkerPS.index + ');"/>',
					size : new google.maps.Size(250, 250)
				});
			locationMarkerPS.infowindow.open(map, locationMarkerPS);
		})

	}
	return locationMarkerPS;
}
function adjustmarkersorder() {
	for (m = 0; m < markers.length; m++) {
		markers[m].index = m;
		markers[m].infowindow = new google.maps.InfoWindow({
				content : '<input type="button" value="Remove" onclick="deletemarker_t(' + markers[m].index + ');"/>',
				size : new google.maps.Size(250, 250)
			});
	}
}
function delstopdata(index) {
	stops[index].infowindow.close(map, stops[index]);
	stops[index].setMap(null);
	stops.splice(index, 1);
	for (s = 0; s < stops.length; s++) {
		stops[s].index = s;
	}
}
function changestopdata(index) {
	stops[index].name = document.getElementById('stopname').value;
	stops[index].desc = document.getElementById('stopdesc').value;
	stops[index].infowindow.close(map, stops[index]);
	stops[index].setTitle(stops[index].name);
}
function deletemarker_t(index) {
	markers[index].infowindow.close(map, markers[index]);
	markers[index].setMap(null);
	markers.splice(index, 1);
	locations.splice(index, 1);
	polyline.setPath(locations);
	adjustmarkersorder();
}
function ValidateSave_RS_P() {
	var type = document.getElementById('form_type').value;
	if (type == 'PSS') {
		document.getElementById('form_type').value = 'SS';
	}
	if (type == 'PSR') {
		document.getElementById('form_type').value = 'SR';
	}
	var nombre = document.getElementById('detail_name').value;
	if (nombre == '') {
		alert('please enter a valid name');
		document.getElementById('detail_name').focus();
		return false;
	}
	var links = [];
	for (x = 0; x <= linkscant; x++) {
		var valor = document.getElementById('urllink' + x).value;
		if (valor != '') {
			alguncambio = true;
			links.push(valor);
		}
	}
	document.getElementById('urllinks').value = links.join('*');
	for (i = 0; i < imgtoupload.length; i++) {
		if (imgtoupload[i] == '') {
			imgtoupload[i] = 'NOIMAGEN';
		} else {
			alguncambio = true;
		}
	}
	document.getElementById('img_toupload').value = imgtoupload.join(',');
	var imglinks = [];
	$('.img_link').each(function (index, element) {
		if (element.value != '') {
			alguncambio = true;
			imglinks.push(element.value);
		}
	});
	document.getElementById('img_links').value = imglinks.join('*');
	var services_ = [];
	for (s = 1; s <= 4; s++) {
		var che = document.getElementById('detail_services' + s).checked;
		if (che) {
			services_.push(s);
		}
	}
	document.getElementById('detailservices').value = services_.join(',');
	var transport_ = [];
	for (t = 1; t <= 5; t++) {
		var chea = document.getElementById('detail_transportation' + t).checked;
		if (chea) {
			transport_.push(t);
		}
	}
	document.getElementById('detailtransportation').value = transport_.join(',');
	var textos = [];
	for (c = 0; c <= cuentaeventos; c++) {
		var fecha1 = document.getElementById('fechai_' + c).value;
		if (fecha1 == '') {
			var fecha1 = 'NODATE';
		}
		var fecha2 = document.getElementById('fechaf_' + c).value;
		if (fecha2 == '') {
			var fecha2 = 'NODATE';
		}
		var texto = document.getElementById('w_text_' + c).value;
		if (texto == '') {
			var texto = 'NO DATA';
		}
		if (fecha1 != 'NODATE' && fecha2 != 'NODATE' && texto != 'NO DATA') {
			textos.push(fecha1 + '*' + fecha2 + '*' + texto);
			alguncambio = true;
		}
	}
	document.getElementById('whats').value = textos.join('!');
	if (arraySR_SRP.length == 0) {
		var ismap = 0;
		document.getElementById('ismap').value = ismap;
	} else {
		var ismap = 1;
		document.getElementById('ismap').value = ismap;
	}
	if (ismap != 0) {
		var textoderutas = [];
		var textodestops = [];
		for (ind = 0; ind < arraySR_SRP.length; ind++) {
			if (arraySR_SRP[ind].locations.length != 0) {
				var thisrutatext = [];
				for (ind2 = 0; ind2 < arraySR_SRP[ind].locations.length; ind2++) {
					thisrutatext.push(arraySR_SRP[ind].locations[ind2].toString().replace(/ /g, ''));
				}
				textoderutas.push(ind + '!' + arraySR_SRP[ind].name + '!' + arraySR_SRP[ind].color.replace('#', '') + '!' + arraySR_SRP[ind].rid + '!' + thisrutatext.join('*') + '!' + arraySR_SRP[ind].icon)
				for (ind3 = 0; ind3 < arraySR_SRP[ind].stops.length; ind3++) {
					var desc = arraySR_SRP[ind].stops[ind3].desc;
					if (desc == '' || desc == ' ') {
						var desc = 'NODESC';
					}
					textodestops.push(arraySR_SRP[ind].stops[ind3].getPosition().toString().replace(/ /g, '') + '*' + arraySR_SRP[ind].stops[ind3].getTitle() + '*' + desc + '*' + arraySR_SRP[ind].stops[ind3].inroute)
				}
			}
		}
		document.getElementById('ruta_data').value = textoderutas.join('?');
		document.getElementById('stops_data').value = textodestops.join('!');
	}
	document.getElementById('detail_type').value = document.getElementById('seldecat').value;
	$("#form_reportaproblem").submit();
}