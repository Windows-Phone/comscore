﻿/*
Copyright (c) 2012, comScore Inc. All rights reserved.
version: 5.0.3
*/
COMSCORE.SiteRecruit.Tracker.config = {
	isAutoFocus: true,
	title: 'Umfrage zur Microsoft',
	content: '<table width="390" cellpadding="2" cellspacing="2" border="0px" class="main" style="border:1px solid #9B4F96; border-top:8px solid #9B4F96">      	 	 	<tr><td class="content"> 			 			 		<div style="font-family:\'Segoe UI\'; font-size:18px; color:#666666; background-color:#FFFFFF;margin:4px;"> <img src="'+document.location.protocol+'//siterecruit.comscore.com/sr/windowsphone/WPhone_logo_300.jpg" border="0"/></div> 			 			 		<div style="font-family:\'Segoe UI\'; font-size:14px; color:#666666;">Dieses Fenster bitte nicht schließen.<br /> Vielen Dank! Die Umfrage wird gegen Ende Ihres Besuchs in diesem Fenster angezeigt. <b>Daher dieses Fenster bitte nicht schließen.</b> </div> 		<p id="counterText" style="font-family:\'Segoe UI\'; font-size:14px; color:#666666;font-weight:bold" class="srtext">Dieses Fenster wird in <span id="counter">10</span> Sekunden minimiert.</p>              			 			 		<p><div class="srtext"><a href="http://privacy.microsoft.com/de-de/default.mspx" target="_blank"  style="font-family:\'Segoe UI\'; font-size:14px; color:#666666;">Datenschutzbestimmungen</a></div></p>          		 	 	</td></tr>            </table>    <script id="customScript">  	 	 	COMSCORE.Custom = (function() { 	return { 		getCounter: function() 		{ 		    var el = document.getElementById(\'counter\'); 		    return el; 		}, 		getCounterValue: function() 		{ 		    var el = COMSCORE.Custom.getCounter(); 		    var v = Number(el.innerHTML); 		    return v; 		}, 		 	 		decrementCounter: function() 		{ 		    var el = COMSCORE.Custom.getCounter(); 		    var v = COMSCORE.Custom.getCounterValue(); 		    if (v > 0) el.innerHTML = --v; 		    if (v > 0) 		    { 		        window.setTimeout(function() { 					COMSCORE.Custom.decrementCounter(); 					 				}, \'1000\'); 		    } 		    else 		    { 		        self.blur(); 				document.getElementById(\'counterText\').innerHTML = \'&nbsp;\'; 		    } 		}, 		 		 	 		initCounter: function(){ 		     	window.setTimeout(function(){ COMSCORE.Custom.decrementCounter();}, \'1000\');}};   })();     if(/msie/i.test(navigator.userAgent)){  	COMSCORE.Custom.initCounter(); }else{  	try{ 		var element = document.getElementById("counterText");element.parentNode.removeChild(element); 	}catch(err){}  }   </script> ',	// content to inject in the new window
	match: '',	// browserable regex match
	isCaptureTrail: true,
	gracePeriod: 5
};
COMSCORE.SiteRecruit.Tracker.start();