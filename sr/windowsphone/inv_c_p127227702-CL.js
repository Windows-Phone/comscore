/*
Copyright (c) 2012, comScore Inc. All rights reserved.
version: 5.0.3
*/
COMSCORE.SiteRecruit.Builder.config = {
	version: "5.0.3",
	
	// invitations' settings
	invitation: [
							
											{ 	methodology: 2,
					projectId: 'p127227702',
					weight: 100,
					isRapidCookie: false,
					acceptUrl: 'http://survey2.surveysite.com/wix/p127227702.aspx',
					secureUrl: 'https://survey2.securestudies.com/wix/p127227702.aspx',
					acceptParams: {
						raw: 'l=13322&H_SurveyType=2',
						siteCode: '2253',
												cookie: [
													],
												otherVariables: [
													]
					},
					viewUrl: 'https://web.survey-poll.com/tc/CreateLog.aspx',
					viewParams: 'log=comscore/view/p127227702-view.log',
					content: '<div id="srinvite" style="width:450px; border:1px solid #9B4F96; border-top:8px solid #9B4F96; margin:0; background-color:#FFFFFF; padding:0">   	 	<div class="srtext" style="margin:10px 60px 0 50px; font-family:\'Segoe UI\'; font-size:18px; color:#666666; background-color:#FFFFFF;">  		<img src="WPhone_logo_300.jpg" border="0"/> 	</div>  		 	<div class="srtext" style="position:relative; top:-40px; right:-30px;width:25px;"> 		<a href="Close" onclick="@declineHandler" style="border:none;"><img src="close.gif" style="border:0; margin-left:360px; padding:0;"/></a> 	</div> 	<div class="srtext" style="margin:0px 50px; font-family:\'Segoe UI\'; font-size:14px; color:#666666; background-color:#FFFFFF;width:300px;"> 		¡Hola!<br />Puede ayudarnos a mejorar windowsphone.com. Queremos saber qué páginas visita hoy y luego le pediremos que responda una breve encuesta (solo tardará unos minutos).<br /><br /> ¿Desea participar? </div> 	 		 	<DIV style="margin:20px 30px 10px 50px;"> 			 		<table style="line-height:12px;font-family:\'Segoe UI\';font-size:12px;color:#666666;border:0;"> 				 			<tr><td style="width:100px;vertical-Align:bottom;"><a href="http://privacy.microsoft.com/es-cl/default.mspx" style="font-family:\'Segoe UI\';font-size:12px;color:#666666;" target="_blank">Declaración de Privacidad</a></td>   				 				<td width="225" align="center">  					<input type="button" style="border-style:none; background-color:#9B4F96; color:#FFFFFF; font-size:14px; height:35px;" value=" Sí, claro " onclick="@acceptHandler;"/>	 &nbsp;  					<input type="button" style="border-style:none; background-color:#9B4F96; color:#FFFFFF; font-size:14px; height:35px;" value=" No, gracias " onclick="@declineHandler;"/>	<br /> 				</td></tr></table> <br /> </DIV></div>',
					height: 400,
					width: 450,
					revealDelay: 1000,
					horizontalAlignment: 1,
					verticalAlignment: 1,
					horizontalMargin: 0,
					verticalMargin: 0,
					isHideBlockingElements: false,
					isAutoCentering: true,
					url: 'SiteRecruit_Tracker.htm',
					trackerGracePeriod: 5
					,usesSilverlight: false
					
					//silverlight config
										
											,trackerWindow: {
							width: 400,
							height: 270,
							orientation: 1,
							offsetX: 0,
							offsetY: 0,
							hideToolBars: true,
							trackerPageConfigUrl: 'trackerConfig_p127227702-CL.js'
							// future feature: 
							//features: "location=0,menubar=0,resizable=1,scrollbars=1,toolbar=0"
						}
																				,Events: {
						beforeRender: function() {
														
													}
						,beforeDestroy: function() {
														
													}
						,beforeAccept: function() {
														
													}
						,beforeDecline: function() {
														
													}
						,beforeRenderUpdate: function() {
														
													}
						,afterRender: function() {
														
													}
					}
				}
						]
};
COMSCORE.SiteRecruit.Builder.run();
