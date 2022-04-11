/*
Copyright (c) 2015, comScore Inc. All rights reserved.
version: 5.1.3
*/
COMSCORE.SiteRecruit.Builder.config = {
	version: "5.1.3",
	
	// invitations' settings
	invitation: [
							
											{ 	methodology: 2,
					projectId: 'p12345',
					weight: 100,
					isRapidCookie: false,
					acceptUrl: '',
					secureUrl: '',
					acceptParams: {
						raw: '',
						siteCode: '01',
												cookie: [
													],
												otherVariables: [
													]
					},
					viewUrl: '',
					viewParams: '',
					content: '<table width="390" cellpadding="2" cellspacing="2" border="0px" class="main" style="border:1px solid #9B4F96; border-top:8px solid #9B4F96"><tr><td class="content"><div style="font-family:\'Segoe UI\'; font-size:18px;color:#666666;background-color:#FFFFFF;margin:4px;"><img src="//siterecruit.comscore.com/sr/windowsphone/WPhone_logo_300.jpg" border="0"/></div><div style="font-family:\'Segoe UI\'; font-size:14px; color:#666666;">$trackerText</div><p><div class="srtext">$privacyText</div></p></td></tr></table>',
					grayMask: false,
					closeWithEsc: true,
					height: 0,
					width: 0,
					revealDelay: 0,
					horizontalAlignment: 1,
					verticalAlignment: 0,
					horizontalMargin: 0,
					verticalMargin: 0,
					startingHorizontalAlignment: 1,
					startingVerticalAlignment: 0,
					startingHorizontalMargin: 0,
					startingVerticalMargin: 0,
					isHideBlockingElements: true,
					isAutoCentering: true,
					url: 'SiteRecruit_Tracker.htm',
					trackerGracePeriod: 8,
					usesSilverlight: false
					
					//silverlight config
										
											,trackerWindow: {
							width: 0,
							height: 0,
							orientation: 0,
							offsetX: 0,
							offsetY: 0,
							hideToolBars: false,
							trackerPageConfigUrl: 'trackerConfig_blank.js'
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
