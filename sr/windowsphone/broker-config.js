/*
Copyright (c) 2015, comScore Inc. All rights reserved.
version: 5.1.3
*/
COMSCORE.SiteRecruit.Broker.config = {
	version: "5.1.3",
	cddsDomains: '.microsoft.com|www.microsoftstore.com|www.xbox.com|(templates|support).office.com|windowsphone.com',
	cddsInProgress: 'cddsinprogress',
	domainSwitch: 'tracking3p',
	domainMatch: '([\\da-z\.-]+\.com)',
	delay: 0,
	cddsIntervalMax: 10,

	crossDomainCheck: function() {
		if (this.cddsIntervalMax > 1) {
			this.cddsIntervalMax --;

			if (COMSCORE.SiteRecruit.Utils.UserPersistence.getCookieValue(this.cddsInProgress) != false ) {
				COMSCORE.SiteRecruit.DDKeepAlive.setDDTrackerCookie();
				COMSCORE.SiteRecruit._halt = true;
				this.clearCrossDomainCheck();
			}
		}
		else {
			this.clearCrossDomainCheck();
		}
	},

	clearCrossDomainCheck: function() {
		window.clearInterval(crossDomainInterval);
	},

	isolateDomain: function(a) {
		a = a.substring(a.indexOf("//")+2,a.length);
		a = a.substring(0,a.indexOf("/"));
		return a;
	},

	testMode: false,
	addEventDelay: 1000,
	
	cookie:{
		name: 'msresearch',
		path: '/',
		domain:  '.windowsphone.com' ,
		duration: 90,
		rapidDuration: 0,
		expireDate: ''
	},
	tracker:{
		std:'http://www.windowsphone.com/SiteRecruit_Tracker.htm?',
		ssl:'https://www.windowsphone.com/SiteRecruit_Tracker.htm?'
	},
	mobile:{
		match: 'iphone|ipad|ipod|android|opera mini|blackberry|windows (phone|ce)|iemobile|htc|nokia|bb10',
		halt: true
	},
	graceIncr:{
		name: 'graceIncr',
		initDelay: 0,
		clickDelay: 5000,
		match: 'auth\/signin|\/my|\/family',
		altTag: 'class',
		htmlMatch: 'sign in'
	},
	
	prefixUrl: "",
	
		mapping:[
	// m=regex match, c=page config file (prefixed with configUrl), f=frequency
	{m: '', c: 'inv_c_blank.js', f: 0, p: 0  ,halt: true 	}
],

	//events
	Events: {
		beforeRecruit: function() {
							// ADD shortcuts
			var csbc = COMSCORE.SiteRecruit.Broker.config;
			var csuu = COMSCORE.SiteRecruit.Utils.UserPersistence;

			COMSCORE.SiteRecruit.Broker.custom = {
				captLinks: function(u) {
					var v = csuu.getCookieValue('captLinks');
					var c = "";

					if (v == false) {
						c = escape(u) + ';';
					}
					else {
						if (c.length + v.length < 1440) {
							c = v + escape(u) + ';';
						}
					}

					if (c != "") {
						csuu.createCookie('captLinks', c, {path:'/',domain:csbc.cookie.domain,duration:'s'});
					}
				},

				allTags: function(x,x1,y,z) {
					/*
						x:  Tag type
						x1: Alt Match pattern
						y:  Match pattern
						z: 
		  	  				1 - CDDS
		  	  				2 - graceIncr
		  	  				3 - captLinks
					*/

					if (x == 'class') {
						if (/msie 8/i.test(navigator.userAgent)) { return; }
						var aTags = document.getElementsByClassName(x1);
					}
					else {
						var aTags = document.getElementsByTagName(x);
					}

					var sr_r = new RegExp(y,'i');
					for (var i = 0; i < aTags.length; i++) {
				 		if ( (x == 'a' && sr_r.test(aTags[i].href)) || (x == 'class' && sr_r.test(aTags[i].innerHTML))	) {
							if (aTags[i].addEventListener) {
								this.href = aTags[i].href;
								if (z == 1) {
									aTags[i].addEventListener('click', function(event) {
										if (/windowsphone.com/i.test(this.href) ) {
											if (/windowsphone.com\/\w\w\-\w\w\/phones/i.test(this.href)) {
												var loc = this.href.toString();
												loc = loc.substring(loc.indexOf('.com/') + 5,loc.indexOf('/phones'));
												var nLink = "//www.microsoft.com/" + loc + "/windows/phones";
												if (sr_r.test(this.href)) {	csuu.createCookie(csbc.domainSwitch, nLink, {path:'/',domain:csbc.cookie.domain,duration:'s'})	}
											}
											if (/windowsphone.com\/\w\w\-\w\w\/store/i.test(this.href)) {
												var loc = this.href.toString();
												loc = loc.substring(loc.indexOf('.com/') + 5,loc.indexOf('/store/overview'));
												var nLink = "//www.microsoft.com/" + loc + "/store/apps/windows-phone";
												if (sr_r.test(this.href)) {	csuu.createCookie(csbc.domainSwitch, nLink, {path:'/',domain:csbc.cookie.domain,duration:'s'})	}
											}
											if (/windowsphone.com\/\w\w\-\w\w\/features/i.test(this.href)) {
												var loc = this.href.toString();
												loc = loc.substring(loc.indexOf('.com/') + 5,loc.indexOf('/features'));
												var nLink = "//www.microsoft.com/" + loc + "/windows/features";
												if (sr_r.test(this.href)) {	csuu.createCookie(csbc.domainSwitch, nLink, {path:'/',domain:csbc.cookie.domain,duration:'s'})	}
											}
										}
										else {
											if (sr_r.test(this.href)) {	csuu.createCookie(csbc.domainSwitch, this.href, {path:'/',domain:csbc.cookie.domain,duration:'s'})	}	
										}
									}, false);
								}
								else if (z == 2) {
									aTags[i].addEventListener('click',function(event){	csuu.createCookie("graceIncr", 1, {path:'/',domain:csbc.cookie.domain,duration:'s'})	},false);
								}
								else if (z == 3 && COMSCORE.isDDInProgress()) {
									aTags[i].addEventListener('click',function(event){ COMSCORE.SiteRecruit.Broker.custom.captLinks(this.href)	},false);	
								}
							}
							else if (aTags[i].attachEvent) {
								if (z == 1) {
									aTags[i].attachEvent('onclick', function(e) {
										if (/windowsphone.com/i.test(e.srcElement) ) {
											if (/windowsphone.com\/\w\w\-\w\w\/phones/i.test(e.srcElement)) {
												var loc = e.srcElement.toString();
												loc = loc.substring(loc.indexOf('.com/') + 5,loc.indexOf('/phones'));
												var nLink = "//www.microsoft.com/" + loc + "/phones";
												csuu.createCookie(csbc.domainSwitch, nLink, {path:'/',domain:csbc.cookie.domain,duration:'s'});
											}
											if (/windowsphone.com\/\w\w\-\w\w\/store/i.test(e.srcElement)) {
												var loc = e.srcElement.toString();
												loc = loc.substring(loc.indexOf('.com/') + 5,loc.indexOf('/store/overview'));
												var nLink = "//www.microsoft.com/" + loc + "/store/apps/windows-phone";
												csuu.createCookie(csbc.domainSwitch, nLink, {path:'/',domain:csbc.cookie.domain,duration:'s'});
											}
											if (/windowsphone.com\/\w\w\-\w\w\/features/i.test(e.srcElement)) {
												var loc = e.srcElement.toString();
												loc = loc.substring(loc.indexOf('.com/') + 5,loc.indexOf('/features'));
												var nLink = "//www.microsoft.com/" + loc + "/windows/features";
												csuu.createCookie(csbc.domainSwitch, nLink, {path:'/',domain:csbc.cookie.domain,duration:'s'});
											}
										}
										else {
											if (sr_r.test(e.srcElement)) {	csuu.createCookie(csbc.domainSwitch, e.srcElement, {path:'/',domain:csbc.cookie.domain,duration:'s'})		}
										}
									});
								}
								else if (z == 2) {
									aTags[i].attachEvent('onclick',function()	{	csuu.createCookie("graceIncr", 1, {path:'/',domain:csbc.cookie.domain,duration:'s'})	});
								}
								else if (z == 3 && COMSCORE.isDDInProgress()) {
									aTags[i].attachEvent('onclick',function()	{ 	COMSCORE.SiteRecruit.Broker.custom.captLinks(e.srcElement)	} );	
								}
							}
							else {}
						}
 					}
				}
			};

			// Initialize graceIncr cookie
			var gIdelay = 0;
			if (COMSCORE.SiteRecruit.Utils.UserPersistence.getCookieValue("graceIncr") == 1) {	gIdelay = 5000;	}
			setTimeout(function(){COMSCORE.SiteRecruit.Utils.UserPersistence.createCookie("graceIncr", 0, {path:'/',domain:csbc.cookie.domain,duration:'s'})},gIdelay);

			// ADD onclick EVENTS FOR CDDS
			setTimeout(function() { COMSCORE.SiteRecruit.Broker.custom.allTags('a','',csbc.cddsDomains,1) }, csbc.addEventDelay );
			setTimeout(function() { COMSCORE.SiteRecruit.Broker.custom.allTags('a','',csbc.graceIncr.match,2) }, csbc.addEventDelay );
			//setTimeout(function() { COMSCORE.SiteRecruit.Broker.custom.allTags(csbc.graceIncr.altTag,"msame_Header_name msame_TxtTrunc",csbc.graceIncr.htmlMatch,2) }, csbc.addEventDelay );
			//setTimeout(function() { COMSCORE.SiteRecruit.Broker.custom.allTags('a','','',3) }, csbc.addEventDelay );
					}
	}
};

//CUSTOM - CHECK FOR THE CROSS-DOMAIN COOKIE. IF PRESENT, HALT RECRUITMENT AND SET DD TRACKING COOKIE
var crossDomainInterval = window.setInterval('COMSCORE.SiteRecruit.Broker.config.crossDomainCheck()', '1000');
//END CROSS_DOMAIN DEPARTURE FUNCTIONALITY

//CUSTOM - ADD 5 SECOND DELAY ON CALLING BROKER.RUN()
if (COMSCORE.SiteRecruit.Broker.delayConfig == true)  {
	COMSCORE.SiteRecruit.Broker.config.delay = 5000;
}
window.setTimeout('COMSCORE.SiteRecruit.Broker.run()', COMSCORE.SiteRecruit.Broker.config.delay);
//END CUSTOM