function changebegindate(date) {
	var datef = $.cookie("EZDATE1");
	var datet = $.cookie("EZDATE2");
	if (datef && datef != '') {
		var hayfechas = 1;
		var newdate = date;
	} else {
		var datef = date;
		var datet = '';
		var newdate = '';
		var hayfechas = 0;
	}
	if (window.appmobile && window.appmobile == "yes") {
		var url = "https://myezplan.com/data_ajax/mapcity_content3.cfm?rnu=5131616516651";
	}else{
		var url = "data_ajax/mapcity_content3.cfm?rnu=5131616516651";
	}
	var urlconfig = {
		action: "updatebegindate",
		datef: datef,
		datet: datet,
		datenew: newdate,
		type: hayfechas,
		useddays: useddays
	};
	$("#funcsparaadddates").load(url, urlconfig, function(response, status, xhr) {
		switch (status) {
			case "success":
				$('.sortable.grid li').on('click', function(e) {
					var num = $(this).data("num");
					addtoday(num);
				});
		}
	});
}

function addday() {
	var datef = $.cookie("EZDATE1");
	if (!datef || datef == '') {
		var numdaystoadd = prompt('Number of days to Add', 1);
		if (!numdaystoadd || numdaystoadd < 1 || isNaN(numdaystoadd)) {
			alert('Please Type a valid number of days');
			return false;
		}
		var totaldays = useddays + parseInt(numdaystoadd);
		$('.sortable').empty();
		$.cookie("NUMDAYS", totaldays);
		useddays = totaldays;
		var tabla = '';
		for (d = 1; d <= totaldays; d++) {
			var tabla = tabla + '<li id="order_' + d + '" data-num="' + d + '"><dl><dd>&nbsp;</dd><dd><span id="spandia_' + d + '" style="font-weight:bold;">Day ' + d + '</span></dd><dd><span id="spandia2_' + d + '" style="font-size:18px; font-weight:bold;"></span></dd></dl></li>'
		}
		$('.sortable').html(tabla);
		for (d2 = 1; d2 <= totaldays; d2++) {
			checkdaycontent_('' + d2);
		}
		$('.sortable.grid li').on('click', function(e) {
			var num = $(this).data("num");
			addtoday(num);
		});
		return false;
	}
	$('#addadate, #datetoadd').show();
}

function delday() {
	if (useddays == 1) {
		alert("You can't eliminate last day");
		return false;
	}
	var datef = $.cookie("EZDATE1");
	if (!datef || datef == '') {
		datef = '';
	}
	var daytodelete = prompt('Type the number of the day you want to delete(For multiple days 4-7)', useddays);
	var esrango = 0;
	if (daytodelete) {
		var donde = daytodelete.indexOf('-');
		if (donde > 0) {
			var esrango = 1;
			var days = daytodelete.split('-');
			for (d = 0; d < days.length; d++) {
				if (days[d] < 1 || days[d] > useddays || isNaN(days[d])) {
					alert('Please try with a valid day number');
					return false;
				}
			}
		}
	}
	if (esrango == 0) {
		if (!daytodelete || daytodelete < 1 || daytodelete > useddays || isNaN(daytodelete)) {
			alert('Please try with a valid day number');
			return false;
		}
	}
	if (esrango == 1) {
		var toloop = daytodelete.split('-');
		toloop.sort();
		var tienealgo = false;
		var daytienen = [];
		for (x = toloop[0]; x <= toloop[1]; x++) {
			var loads = $.cookie("EZMAPCITYPLACES_day" + x);
			if (loads && loads != '') {
				var tienealgo = true;
				daytienen.push(x);
			}
			var loads = $.cookie("EZTRANSPORT_day" + x);
			if (loads && loads != '') {
				var tienealgo = true;
				daytienen.push(x);
			}
			var loads = $.cookie("EZSERVICES_day" + x);
			if (loads && loads != '') {
				var tienealgo = true;
				daytienen.push(x);
			}
		}
		if (tienealgo) {
			var conf = confirm('Are you sure you want to delete this days, days ' + daytienen.join(',') + ' have places added');
			if (!conf) {
				return false;
			}
		}
	} else {
		var tienealgo = false;
		var loads = $.cookie("EZMAPCITYPLACES_day" + daytodelete);
		if (loads && loads != '') {
			var tienealgo = true;
		}
		var loads = $.cookie("EZTRANSPORT_day" + daytodelete);
		if (loads && loads != '') {
			var tienealgo = true;
		}
		var loads = $.cookie("EZSERVICES_day" + daytodelete);
		if (loads && loads != '') {
			var tienealgo = true;
		}
		if (tienealgo) {
			var conf = confirm('Are you sure you want to delete day ' + daytodelete + ',it have places added');
			if (!conf) {
				return false;
			}
		}
	}
	var url = "https://myezplan.com/mobile/appdata/data_ajax/mapcity_content3.cfm?rnu=5131616516651";
	var urlconfig = {
		action: "delfullday",
		date1: datef,
		useddays: useddays,
		num: daytodelete,
		esrango: esrango
	};
	$("#funcsparaadddates").load(url, urlconfig, function(response, status, xhr) {
		switch (status) {
			case "success":
				$('.sortable.grid li').on('click', function(e) {
					var num = $(this).data("num");
					addtoday(num);
				});
		}
	});
}

function adddate(newdate) {
	$('#addadate').hide();
	var date1 = $.cookie('EZDATE1');
	var date2 = $.cookie('EZDATE2');
	if (window.appmobile && window.appmobile == "yes") {
		var url = "https://myezplan.com/data_ajax/mapcity_content3.cfm?rnu=5131616516651";
	}else{
		var url = "data_ajax/mapcity_content3.cfm?rnu=5131616516651";
	}
	var urlconfig = {
		action: "adddatestofull",
		date1: date1,
		date2: date2,
		datenew: newdate,
		useddays: useddays
	};
	$("#funcsparaadddates").load(url, urlconfig, function(response, status, xhr) {
		switch (status) {
			case "success":
				$('.sortable.grid li').on('click', function(e) {
					var num = $(this).data("num");
					addtoday(num);
				});
		}
	});
}

function fecha(cadena) {
	var separador = "/"
	if (cadena.indexOf(separador) != -1) {
		var posi1 = 0
		var posi2 = cadena.indexOf(separador, posi1 + 1)
		var posi3 = cadena.indexOf(separador, posi2 + 1)
		this.mes = cadena.substring(posi1, posi2)
		this.dia = cadena.substring(posi2 + 1, posi3)
		this.anio = cadena.substring(posi3 + 1, cadena.length)
	} else {
		this.dia = 0
		this.mes = 0
		this.anio = 0
	}
}
/*$(document).ready(function(e) {
 $('#DateToBegin').datepicker({
 onSelect: function(date) {changebegindate(date);},
 minDate: Date.now(),
 changeMonth: true,
 changeYear: true
 });
 $('#datetoadd').datepicker({
 onSelect: function(date) {adddate(date);},
 minDate: Date.now(),
 changeMonth: true,
 changeYear: true
 });
 $('.sortable.grid li').on('click', function(e){
 var num=$(this).data("num");
 addtoday(num);
 });

 });*/

console.log("calendar")
/*$('#DateToBegin').datepicker({
 onSelect: function(date) {
 changebegindate(date);
 var _input 	= 	$('#'+$(this).attr('name'));
 _input.attr('value', date);
 $(this).hide();
 },
 minDate: 0,
 changeMonth: true,
 changeYear: true
 });
 $('#datetoadd').datepicker({
 onSelect: function(date){
 adddate(date);
 var _input 	= 	$('#'+$(this).attr('name'));
 _input.attr('value', date);
 $(this).hide();
 },
 minDate: 0,
 changeMonth: true,
 changeYear: true
 });*/
$("#DateToBegin").hide();
$('.sortable.grid li').on('click', function(e) {
	var num = $(this).data("num");
	addtoday(num);
});
$(window).load(function(e) {
	$('.sortable.grid li').on('click', function(e) {
		var num = $(this).data("num");
		addtoday(num);
	});
});