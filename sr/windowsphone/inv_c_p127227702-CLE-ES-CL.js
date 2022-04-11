/*
Copyright (c) 2012, comScore Inc. All rights reserved.
version: 5.0.3
*/
COMSCORE.SiteRecruit.Builder.config = {
	version: "5.0.3",
	
	// invitations' settings
	invitation: [
							
											{ 	methodology: 0,
					projectId: 'p127227702',
					weight: 100,
					isRapidCookie: false,
					acceptUrl: 'http://survey2.surveysite.com/wix/p127227702.aspx',
					secureUrl: '',
					acceptParams: {
						raw: 'l=13322&H_SurveyType=1',
						siteCode: (_site)?_site:'2253',
												cookie: [
													],
												otherVariables: [
													]
					},
					viewUrl: 'http://web.survey-poll.com/tc/CreateLog.aspx',
					viewParams: 'log=comscore/view/p127227702-CLE-ES-CL-view.log',
					content: '<div id="srinvite" style="width:450px; border:1px solid #9B4F96; border-top:8px solid #9B4F96; margin:0; background-color:#FFFFFF; padding:0">   	 	<div class="srtext" style="margin:10px 60px 0 50px; font-family:\'Segoe UI\'; font-size:18px; color:#666666; background-color:#FFFFFF;text-Align:left;">  		<img src="WPhone_logo_300.jpg" border="0"/> 	</div>  		 	<div class="srtext" style="position:relative; top:-40px; right:-30px;width:25px;"> 		<a href="javascript:void(0);" onclick="go_back();" style="border:none;"><img src="close.gif" style="border:0; margin-left:360px; padding:0;"/></a> 	</div> 	<div class="srtext" style="margin:0px 50px; font-family:\'Segoe UI\'; font-size:14px; color:#666666; background-color:#FFFFFF;width:300px;text-Align:left;"> <br />	Microsoft está llevando a cabo una encuesta en línea. <br /><br /> ¿Desea participar?	</div> 	 		 	<DIV style="margin:20px 30px 10px 50px;"> 			 		<table style="line-height:12px;font-family:\'Segoe UI\';font-size:12px;color:#666666;border:0;"> 				 			<tr> 				 				<td width="400" align="left">  					<input type="button" style="border-style:none; background-color:#9B4F96; color:#FFFFFF; font-size:16px; height:35px;" value=" Sí " onclick="fSubmit();"/>	 &nbsp;  		&nbsp;			<a href="javascript:void(0);" onClick="go_back();" style="font-size:12px;color:#666666"> No, volver al sitio web de Windows Phone </a> <br /><br /> 	</td></tr><tr><td style="width:100px;vertical-Align:bottom;"><a href="http://privacy.microsoft.com/es-cl/default.mspx" style="font-family:\'Segoe UI\';font-size:11px;color:#666666;" target="_blank">Declaración de privacidad</a></td> </tr></table> <br /> </DIV></div>',
					height: 300,
					width: 450,
					revealDelay: 500,
					horizontalAlignment: 1,
					verticalAlignment: 0,
					horizontalMargin: 0,
					verticalMargin: 4,
					startingHorizontalAlignment: 1,
					startingVerticalAlignment: 0,
					startingHorizontalMargin: 0,
					startingVerticalMargin: 0,					
					isHideBlockingElements: false,
					isAutoCentering: true,
					url: 'SiteRecruit_Tracker.htm',
					trackerGracePeriod: 5
					,usesSilverlight: false
					
					//silverlight config
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
