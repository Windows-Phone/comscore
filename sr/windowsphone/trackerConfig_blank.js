/*
Copyright (c) 2015, comScore Inc. All rights reserved.
version: 5.1.3
*/

COMSCORE.SiteRecruit.Tracker.config = {
	isAutoFocus: false,
	title: 'Microsoft Survey',
	content: '<table width="390" cellpadding="2" cellspacing="2" border="0px" class="main" style="border:1px solid #9B4F96; border-top:8px solid #9B4F96"><tr><td class="content"><div style="font-family:\'Segoe UI\'; font-size:18px;color:#666666;background-color:#FFFFFF;margin:4px;"><img src="//siterecruit.comscore.com/sr/windowsphone/WPhone_logo_300.jpg" border="0"/></div><div style="font-family:\'Segoe UI\'; font-size:14px; color:#666666;">Please do not close this window.<br /><br />Thank you! The survey will appear here when you\'ve completed your visit, so <b>please do not close this window</b>.</div><p><div class="srtext"><a href="http://privacy.microsoft.com/en-us/default.mspx" target="_blank"  style="font-family:\'Segoe UI\'; font-size:14px; color:#666666;">Privacy Statement</a></div></p></td></tr></table>',	// content to inject in the new window
	match: '',	// browserable regex match
	isCaptureTrail: true,
	delay: 0,
	gracePeriod: 8,
	graceFlag: false,
	isWithinGraceTime: false,

	cookie: {
		name: 'cddsinprogress',
		path: '/',
		domain: '.windowsphone.com'
	},
	
	trackerMappings: [
				
						{
			d: '.microsoftstore.com',
			c: 'www.microsoft.com/library/svy/msftstore/trackerConfig_p329970507.js',
			t: '//www.microsoftstore.com/SiteRecruit_Tracker.htm',
			k: 'msresearch'
		}
						,
				{
			d: '.xbox.com',
			c: 'i3.microsoft.com/library/svy/xbox/trackerConfig_p329970507.js',
			t: '//www.xbox.com/shell/siterecruit_tracker_v2.htm',
			k: 'xboxresearch'
		}
						,
				{
			d: '.microsoft.com',
			c: 'i3.microsoft.com/library/svy/support/trackerConfig_p329970507.js',
			t: '//www.microsoft.com/library/svy/support/SiteRecruit_Tracker.htm',
			k: 'msresearch'
		}
						,
				{
			d: '.office.com',
			c: 'www.microsoft.com/library/svy/office/support/trackerConfig_p329970507.js',
			t: '//support.office.com/core/siterecruit_tracker.htm',
			k: 'msresearch'
		}
			],

	propMappings: {
		prop001m: new RegExp('(windows.microsoft.com)|(microsoft.com\/\w\w\-\w\w\/windows)|(microsoft.com\/\w\w\-\w\w\/windowsforbusiness)','i'),
		prop002m: new RegExp('(search.microsoft.com)|(www.microsoft.com\/\w\w\-\w\w\/search)|(microsoft.com\/\w\w\-\w\w\/NewSearch)','i'),
		prop003m: new RegExp('microsoft.com\/\w\w\-\w\w\/download','i'),
		prop004m: new RegExp('office.(microsoft.com|live.com|com)','i'),
		prop005m: new RegExp('microsoft.com\/surface','i'),
		prop006m: new RegExp('microsoft.com\/security','i'),
		prop007m: new RegExp('support.microsoft.com','i'),
		prop008m: new RegExp('www.microsoft.com\/\w\w\-\w\w\/news','i'),
		prop009m: new RegExp('www.microsoft.com\/\w\w\-\w\w\/sitemap.aspx','i'),
		prop010m: new RegExp('technet.microsoft.com','i'),
		prop011m: new RegExp('careers.microsoft.com','i'),
		prop012m: new RegExp('msdn.microsoft.com','i'),
		prop013m: new RegExp('(microsoftstore.com\/store)|(microsoft.com\/\w\w\-\w\w\/store\/locations)','i'),
		prop014m: new RegExp('www.microsoft.com\/\w\w\-\w\w($|\/$|\/default.aspx)','i'),
		prop015m: new RegExp('xbox.com','i'),
		prop016m: new RegExp('windowsphone.com|\/windows\/phones\/','i'),
		prop017m: new RegExp('(microsoftbusinesshub.com|smallbusiness.support.microsoft.com|microsoft.com\/\w\w\-\w\w\/business)','i'),
		prop018m: new RegExp('microsoft.com\/microsoft\-band','i'),
		prop019m: new RegExp('microsoft.com\/\w\w\-\w\w\/mobile','i')
	},

	pathMappings: {
		path001m: 'www.microsoft.com\/en\-us\/download\/details\.aspx\?id\=3',
		path002m: 'www.microsoftstore.com\/store\/msusa\/en\_us\/home'
	},
	
	isCDDS: true,
	domainSwitch: 'tracking3p',
	domainMatch: '([\\da-z\.-]+\.com)',
	cddsEventMessage: 'cddsMessage',
	
	propFromUrl: function() {
		if (/prop001/i.test(window.location)) {
			if (/propOrd=(.*)&/i.test(window.location)) {cs_tobj.propOrd = RegExp.$1;}
			if (/prop001\=(\d+)/i.test(window.location)){cs_tobj.prop001 = RegExp.$1;}
			if (/prop002\=(\d+)/i.test(window.location)){cs_tobj.prop002 = RegExp.$1;}
			if (/prop003\=(\d+)/i.test(window.location)){cs_tobj.prop003 = RegExp.$1;}
			if (/prop004\=(\d+)/i.test(window.location)){cs_tobj.prop004 = RegExp.$1;}
			if (/prop005\=(\d+)/i.test(window.location)){cs_tobj.prop005 = RegExp.$1;}
			if (/prop006\=(\d+)/i.test(window.location)){cs_tobj.prop006 = RegExp.$1;}
			if (/prop007\=(\d+)/i.test(window.location)){cs_tobj.prop007 = RegExp.$1;}
			if (/prop008\=(\d+)/i.test(window.location)){cs_tobj.prop008 = RegExp.$1;}
			if (/prop009\=(\d+)/i.test(window.location)){cs_tobj.prop009 = RegExp.$1;}
			if (/prop010\=(\d+)/i.test(window.location)){cs_tobj.prop010 = RegExp.$1;}
			if (/prop011\=(\d+)/i.test(window.location)){cs_tobj.prop011 = RegExp.$1;}
			if (/prop012\=(\d+)/i.test(window.location)){cs_tobj.prop012 = RegExp.$1;}
			if (/prop013\=(\d+)/i.test(window.location)){cs_tobj.prop013 = RegExp.$1;}
			if (/prop014\=(\d+)/i.test(window.location)){cs_tobj.prop014 = RegExp.$1;}
			if (/prop015\=(\d+)/i.test(window.location)){cs_tobj.prop015 = RegExp.$1;}
			if (/prop016\=(\d+)/i.test(window.location)){cs_tobj.prop016 = RegExp.$1;}
			if (/prop017\=(\d+)/i.test(window.location)){cs_tobj.prop017 = RegExp.$1;}
			if (/prop018\=(\d+)/i.test(window.location)){cs_tobj.prop018 = RegExp.$1;}
			if (/prop019\=(\d+)/i.test(window.location)){cs_tobj.prop019 = RegExp.$1;}
			if (/prop998\=(\d+)/i.test(window.location)){cs_tobj.prop998 = RegExp.$1;}
			if (/prop999\=(\d+)/i.test(window.location)){cs_tobj.prop999 = RegExp.$1;}
			if (/path001\=(\d+)/i.test(window.location)){cs_tobj.path001 = RegExp.$1;}
			if (/path002\=(\d+)/i.test(window.location)){cs_tobj.path002 = RegExp.$1;}
			if (/bcncnt\=(\d+)/i.test(window.location)) {cs_tobj.bcncnt  = RegExp.$1;}
			if (/ns__p\=(\d+)/i.test(window.location)){cs_tobj.ns__p = RegExp.$1;}
			if (/ns__ts\=(\d+)/i.test(window.location)){cs_tobj.ns__ts = RegExp.$1;}
			return true;
		}
		else {
			return false;
		}
	},
	propInitialize: function() {
		cs_tobj.propOrd = "";
		cs_tobj.prop001 = "0";
		cs_tobj.prop002 = "0";
		cs_tobj.prop003 = "0";
		cs_tobj.prop004 = "0";
		cs_tobj.prop005 = "0";
		cs_tobj.prop006 = "0";
		cs_tobj.prop007 = "0";
		cs_tobj.prop008 = "0";
		cs_tobj.prop009 = "0";
		cs_tobj.prop010 = "0";
		cs_tobj.prop011 = "0";
		cs_tobj.prop012 = "0";
		cs_tobj.prop013 = "0";
		cs_tobj.prop014 = "0";
		cs_tobj.prop015 = "0";
		cs_tobj.prop016 = "0";
		cs_tobj.prop017 = "0";
		cs_tobj.prop018 = "0";
		cs_tobj.prop019 = "0";
		cs_tobj.prop998 = "0";
		cs_tobj.prop999 = "0";
		cs_tobj.bcncnt  = "0";
		cs_tobj.path001 = "0";
		cs_tobj.path002 = "0";
		cs_tobj.ns__p 	= "0";
		cs_tobj.ns__ts 	= "0";
	},
	propFromStorage: function() {
		if (window.sessionStorage.csProp != undefined) {
			cs_tobj.dnt = true;
			if (/propOrd=(.*)&/i.test(window.sessionStorage.csProp)) {cs_tobj.propOrd = RegExp.$1;}
			if (/prop001\=(\d+)/i.test(window.sessionStorage.csProp)){cs_tobj.prop001 = RegExp.$1;}
			if (/prop002\=(\d+)/i.test(window.sessionStorage.csProp)){cs_tobj.prop002 = RegExp.$1;}
			if (/prop003\=(\d+)/i.test(window.sessionStorage.csProp)){cs_tobj.prop003 = RegExp.$1;}
			if (/prop004\=(\d+)/i.test(window.sessionStorage.csProp)){cs_tobj.prop004 = RegExp.$1;}
			if (/prop005\=(\d+)/i.test(window.sessionStorage.csProp)){cs_tobj.prop005 = RegExp.$1;}
			if (/prop006\=(\d+)/i.test(window.sessionStorage.csProp)){cs_tobj.prop006 = RegExp.$1;}
			if (/prop007\=(\d+)/i.test(window.sessionStorage.csProp)){cs_tobj.prop007 = RegExp.$1;}
			if (/prop008\=(\d+)/i.test(window.sessionStorage.csProp)){cs_tobj.prop008 = RegExp.$1;}
			if (/prop009\=(\d+)/i.test(window.sessionStorage.csProp)){cs_tobj.prop009 = RegExp.$1;}
			if (/prop010\=(\d+)/i.test(window.sessionStorage.csProp)){cs_tobj.prop010 = RegExp.$1;}
			if (/prop011\=(\d+)/i.test(window.sessionStorage.csProp)){cs_tobj.prop011 = RegExp.$1;}
			if (/prop012\=(\d+)/i.test(window.sessionStorage.csProp)){cs_tobj.prop012 = RegExp.$1;}
			if (/prop013\=(\d+)/i.test(window.sessionStorage.csProp)){cs_tobj.prop013 = RegExp.$1;}
			if (/prop014\=(\d+)/i.test(window.sessionStorage.csProp)){cs_tobj.prop014 = RegExp.$1;}
			if (/prop015\=(\d+)/i.test(window.sessionStorage.csProp)){cs_tobj.prop015 = RegExp.$1;}
			if (/prop016\=(\d+)/i.test(window.sessionStorage.csProp)){cs_tobj.prop016 = RegExp.$1;}
			if (/prop017\=(\d+)/i.test(window.sessionStorage.csProp)){cs_tobj.prop017 = RegExp.$1;}
			if (/prop018\=(\d+)/i.test(window.sessionStorage.csProp)){cs_tobj.prop018 = RegExp.$1;}
			if (/prop019\=(\d+)/i.test(window.sessionStorage.csProp)){cs_tobj.prop019 = RegExp.$1;}
			if (/prop998\=(\d+)/i.test(window.sessionStorage.csProp)){cs_tobj.prop998 = RegExp.$1;}
			if (/prop999\=(\d+)/i.test(window.sessionStorage.csProp)){cs_tobj.prop999 = RegExp.$1;}
			if (/path001\=(\d+)/i.test(window.sessionStorage.csProp)){cs_tobj.path001 = RegExp.$1;}
			if (/path002\=(\d+)/i.test(window.sessionStorage.csProp)){cs_tobj.path002 = RegExp.$1;}
			if (/bcncnt\=(\d+)/i.test(window.sessionStorage.csProp)) {cs_tobj.bcncnt  = RegExp.$1;}
			if (/ns__p\=(\d+)/i.test(window.sessionStorage.csProp)){cs_tobj.ns__p = RegExp.$1;}
			if (/ns__ts\=(\d+)/i.test(window.sessionStorage.csProp)){cs_tobj.ns__ts = RegExp.$1;}
			return true;
		}
		else {
			return false;
		}
	},
	cddsCheck: function() {
		if (/crossDomain=1/i.test(window.location)) {
			COMSCORE.SiteRecruit.Tracker.config.delay = 5000;
	
			// SEND SIGNAL TO BROKER TO STOP RECRUITMENT
			var d = COMSCORE.SiteRecruit.Tracker.config.cookie;
	
			var c = d.name + '=1'
				+ '; path=' + d.path
				+ '; domain=' + d.domain;
				document.cookie = c;
		}
	},
	setBcnCnt: function() {
		// SET VARIABLE TO DETERMINE WHETHER OR NOT USER ALLOWS TRAFFIC TO SCORECARDRESEARCH
		if (/bcn=(true|false)&/i.test(window.location)) {
			cs_tobj.bcn = RegExp.$1;
		}
		else if (window.sessionStorage.csProp != undefined) {
			if (/bcn=(true|false)&/i.test(window.sessionStorage.csProp)) {
				cs_tobj.bcn = RegExp.$1;
			}
			else {
				cs_tobj.bcn = false;
			}
		}
		else {
			cs_tobj.bcn = false;
		}
	},
	populateProp: function() {
		if (typeof(Storage) == "undefined") {
			// NO SUPPORT
			cs_tobj.sstor = false;
			if (cstc.propFromUrl() == false) {
				cstc.propInitialize();
			}
		}
		else {
			// STORAGE SUPPORT
			cs_tobj.sstor = true;
			if (cstc.propFromUrl() == false) {
				if (cstc.propFromStorage() == false) {
					// FIRST LOAD
					cstc.propInitialize();
				}
			}
				else {
				var urlPropOrd = cs_tobj.propOrd;
					if (cstc.propFromStorage() == true) {
					if(cs_tobj.propOrd.length < urlPropOrd.length) {
						cstc.propFromUrl();
					}
				}
			}
		}
	}
};

var cstc = COMSCORE.SiteRecruit.Tracker.config;

//START CDDS FUNCTIONALITY
if (cstc.isCDDS == true) {
	var cs_tobj = COMSCORE.SiteRecruit.Tracker.surveyData;
	cstc.cddsCheck();

	cs_tobj.sstor = "";						// SET VARIABLE TO DETERMINE WHETHER OR NOT SESSIONSTORAGE IS SUPPORTED
	cs_tobj.bcncnt = cstc.setBcnCnt;		// SET VARIABLE TO COUNT NUMBER OF EXPOSURES DURING TRACKING
	cs_tobj.dnt = false;					// DO NOT TRACK - ADD PROP OR BEACON FOR ONE CYCLE
	cstc.populateProp();
}
//END CROSS-DOMAIN DEPARTURE FUNCTIONALITY

setTimeout("COMSCORE.SiteRecruit.Tracker.start()", cstc.delay);