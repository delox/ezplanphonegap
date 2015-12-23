ftimeload=function(){
	console.log("First Time");
	var _url = "http://myezplan.com/mobile/appdata/data_ajax/map_city_ajax.cfm?rnu="+randomNumberUrl()+"";
	var _urlconfig = {action:"clean"};
	//alert(_url);
	$.post(_url,_urlconfig)
	.error()
	.success(function(response, status, xhr){
		var $popup=$('#new_plan_clean');
		$('#new_plan_clean').showLoading("Please Wait,<br/>Loading...<br/>",false);
		var _url = "http://myezplan.com/mobile/appdata/data_ajax/mapcity_content.cfm?"+randomNumberUrl()+"";
		var _urlconfig = {action:'New_Plan',parametro:'new'};
		$('#new_plan_clean').load(_url,_urlconfig,function (response, status, xhr){
			switch (status){case "error":$('#new_plan_clean').empty();
			break;
			}
		});
		$('body').append('<div id="mask" class="mask"></div>');
		$('#mask').show();
		$popup.show();
		//window.location = "mapcitypopup.cfm?ctid=5&plid=5";//window.location.reload();
	})
}