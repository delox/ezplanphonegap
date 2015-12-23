<cfparam name="plid" default="0">
<cfparam name="sid" default="0">
<cfscript>
if(Not(isNumeric(plid))){plid=0;}
if(Not(isNumeric(sid))){sid=0;}
</cfscript>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-US" lang="en-US">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
<title>Report a Problem</title>
<cfinclude template="cftags/headmeta.cfm">
<script type="text/javascript" src="js/reportaproblem.js"></script>
<script type="text/javascript" src="js/reportsugg_serv.js"></script>
<script type="text/javascript" src="https://maps.google.com/maps/api/js?sensor=false"></script>
<script type="text/javascript" src="js/infoplace.js"></script>
<link href="style/infoplace.css" type="text/css" rel="stylesheet" />
<link href="style/reportaproblem.css" rel="stylesheet" type="text/css" />
<style type="text/css">
.mask-faq {display: none;background-color: #111; left: 0; top: 0; z-index: 1501; width: 100%; height:100%; -moz-opacity:0.7; opacity:.70; filter: alpha(opacity=80); position:fixed;}
div.popup-inside-faq { display:none; /*min-width:380px;*/ min-height:150px; padding: 10px; border: 2px solid #ddd; float: left; position: fixed; top: 5%; left: 50%; z-index: 1502; border-radius:5px 5px 5px 5px; }
	#real_body {width: 95%;}
</style>
<script type="application/javascript">
	$(document).ready(function(){
		faqpage='reportaproblem_s';
		alguncambio=false;
		modificadopunto=false;
		modificastops=false;
		modificaruta=false;
		rutadire=0;
	uploadimg=1;
	imgcants=0;
	imgcants2=0;
	imgtoupload=[];
	})
</script>
</head>
<body>
<cfinclude template="cftags/lightboxsign_1_0.cfm">

<!-- wrap -->
<div id="wrap"> 
	<!-- wraper -->
	<div id="wrapper">
		<div id="real_body">
			<cfset PageHeaderTitle = "<span class=""capitalize_red"">R</span>eport a problem">
			<!---<cfinclude template="cftags/pageheader.cfm">--->
            <cfinclude template="cftags/pageheaderrmobile.cfm">
			<div id="real_body_middle">
				<div id="middle_mapandcheck">
						<script type="text/javascript">
						reportaproblem_s_new(0,<cfoutput>#plid#,#sid#</cfoutput>);
						</script>
				</div>
			</div>
				<!-- middle_mapandcheck -->
					<cfinclude template="cftags/divmenu.cfm">
				<!---<cfinclude template="footer.cfm">--->
                <div id="footer" class="real_body_footer copyright" style="margin:5px 0;"> <cfoutput>myezplan &copy; #Year(Now())# - All Rights Reserved.		</cfoutput> <a href="http://www.facebook.com/pages/Myezplan/480330711998380" target="_blank" class="followus"><img src="images/facebook.png" width="20" height="20" alt="follow us at Facebook" /></a> <a href="https://twitter.com/#!/myezplan1 " target="_blank" class="followus"><img src="images/twitter.png" width="20" height="20" alt="follow us at Twitter" /></a> <a href="http://myezplan.blogspot.com/" target="_blank" class="followus"><img src="images/blogger.png" width="20" height="20" alt="follow us at Blogger" /></a> </div>
					</div>
			</div>
			<!-- real_body_middle --> 
			<div id="real_body_footer"></div>
		</div>
		<!--real_body--> 
		<br class="clearboth" />
	</div>
	<!-- //wrapper --> 
</div>
<!-- //wrap --> 
<div id="myeztravel-faq" class="popup-inside-faq" style=" display:none; width:90%; max-width:300px;margin:0 auto;right:0;left:0;top:2px; position:absolute;">
</div>
</body>
</html>