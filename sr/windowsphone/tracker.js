/*
Copyright (c) 2015, comScore Inc. All rights reserved.
version: 5.1.3
*/

if (typeof(COMSCORE) == "undefined") {
	var COMSCORE = {};
}

if (typeof COMSCORE.SiteRecruit == "undefined") {
	COMSCORE.SiteRecruit = {
		version: "5.1.3",
		debug: false,	// enables logger window
		
		CONSTANTS: {
			COOKIE_TYPE: { ALREADY_ASKED: 1, DD_IN_PROGRESS: 2},
			STATE_NAME: { IDLE: "IDLE", DDINPROGRESS: "DDINPROGRESS"}
		}
	};
}


COMSCORE.SiteRecruit.Utils = ( function() {
	return {
		clone: function(obj) {
			if (typeof(obj) != 'object') {
				return obj;
			}
			
			if(obj == null) {
				return obj;
			}
		
			var newObj = {};
		
			for (var i in obj) {
				newObj[i] = COMSCORE.SiteRecruit.Utils.clone(obj[i]);
			}
		
			return newObj;
		},
		
		loadScript: function(url, loadFresh) {
				if (loadFresh) {
					url = _sr.Utils.appendQueryParams(url, (new Date()).getTime());
				}
				
				var s = document.createElement("script");
				s.src = url;
				document.body.appendChild(s);
		},
		
		JSONDeserialize: function(str) {
			try {
				if (str === "") str = '""';
				
				if (str.length > 4) {
					if (window.JSON && window.JSON.parse) {
						if (str.indexOf('"undefined"') == -1) {
							return window.JSON.parse(str.replace("undefined", '"undefined"'));
						}
						else {
							return window.JSON.parse(str);
						}
					} else {
						// Extract cookie state object data and survey array data from the rest of the params
						var _data = str.substring(1, str.indexOf(",")) + str.substring(str.indexOf("}") + 1, str.length - 1);
						var _st = str.slice(str.indexOf('name'), str.indexOf("}")).replace(/"/gi, '')
						var _sv = str.substring(str.indexOf('[') + 1, str.indexOf("]")).replace(/"/gi, '');
						var _p = _data.substring(0, _data.indexOf("surveys") - 1).replace(/"/gi, '') + _data.substring(_data.indexOf("],") + 2, _data.length).replace(/"/gi,'');

						// Convert cookie state, survey, other param string data into separate arrays
						var _stArr = _st.split(",");
						var _svArr = _sv.split(",");
						var _pArr = _p.split(",");
						var obj = {};

						obj.version = _pArr[0].substring(_pArr[0].indexOf(":") + 1);
						obj.state = {};
						obj.state.name = _stArr[0].substring(_stArr[0].indexOf(":") + 1);
						obj.state.url = _stArr[1].substring(_stArr[1].indexOf(":") + 1)
						obj.state.timestamp = parseInt(_stArr[2].substring(_stArr[2].indexOf(":") + 1));
						obj.lastinvited = parseInt(_pArr[1].substring(_pArr[1].indexOf(":") + 1));
						obj.userid = _pArr[2].substring(_pArr[2].indexOf(":") + 1)
						obj.vendorid = parseInt(_pArr[3].substring(_pArr[3].indexOf(":") + 1)); 
						obj.surveys = new Array();

						// Iterate through survey array[], append surveyIDs to obj.survey[]
						for(var i = 0; i < _svArr.length; i++){ 
							obj.surveys.push(_svArr[i]);
						}
					  
						obj.graceperiod = parseInt(_pArr[4].substring(_pArr[4].indexOf(":") + 1));
						obj.trackertimestamp = parseInt(_pArr[5].substring(_pArr[5].indexOf(":") + 1)); 
						return obj;
					}
				} else {
					return null;
				}
			} catch (e) {
				return null;
			}
		},
		
		JSONSerialize: function (obj) { 
			try {
				var t = typeof (obj); 
				if (t != "object" || obj === null) { 
			 
					if (t == "string") obj = '"'+obj+'"'; 
					return String(obj); 
			 
				} 
				else { 
			 
					var n, v, json = [], arr = (obj && obj.constructor == Array); 
			 
					for (n in obj) { 
						v = obj[n]; t = typeof(v); 
			 
						if (t != "function"){ 
						    if (t == "string") v = '"'+v+'"'; 
						    else if (t == "object" && v !== null) v = this.JSONSerialize(v); 
				 
						    json.push((arr ? "" : '"' + n + '":') + String(v)); 
						} 
					} 
			 
					return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}"); 
				}
			}		
			catch(e){
				return "";
			}
		} 
	};
})();
/*
		options: {
			date: null,				// (optional) for fixed date cookie expiry, if empty, use duration
			duration: 1,			// (optional) # days cookie expires, if empty will be session cookie					
			path: "/",				// relative path cookie is good for	
			domain: "comscore.com",	// optional, will use existing fqdn if not specified
			secure: false 			// optional for https
		}
*/		
/*
 Basic Cookie Functionality
 */
 COMSCORE.SiteRecruit.Utils.UserPersistence = {
	maxNumberOfPids : 6,
		//The maximum number of pids allowed at any time in the 'surveys' attribute
	CONSTANTS: {
			STATE_NAME: { IDLE: "IDLE", DDINPROGRESS: "DDINPROGRESS"}
	},
	getCookieName: function(){
			//Get default cookie option from broker if found
			var c;
			if (COMSCORE.SiteRecruit.Broker && COMSCORE.SiteRecruit.Broker.config){
				c = COMSCORE.SiteRecruit.Broker.config.cookie;
				if (c.name){
					return c.name;	
				}
			}
			return "";
	 },
	
	getDefaultCookieOptions: function(){
			var ret= { path: "/", domain: "" };
			return ret;
	 },
	 
	 getVendorId: function(){
			var ret= 1;
			return ret;
	 },
	
	createCookie: function(key, value, options) {
		
		
		value = escape(value);
		
		if (options.duration && options.duration < 0) {
			var date = new Date();
			date.setTime(date.getTime() + options.duration * 24 * 60 * 60 * 1000);
			value += "; expires=" + date.toGMTString();
		}
		else if (options.duration == 's') {
			if (!(/msie|rv\:11|edge/i.test(navigator.userAgent))) {
				value += "; expires=";
			}
		}
		else{
			var date = new Date();
			date.setTime(date.getTime() + 10 * 365 * 24 * 60 * 60 * 1000);
			value += "; expires=" + date.toGMTString();
		}
		
		if (options.path) {
			value += "; path=" + options.path;
		}				
		else {
			
		}
						
		if (options.domain) {
			value += "; domain=" + options.domain;
		}
						
		if (options.secure) {
			value += "; secure";
		}
		if (options.graceperiod) {
			value += "; graceperiod=" + options.graceperiod; 
		}
		
		document.cookie = key + "=" + value;

		return true;
	},

	getCookieValue: function(key) {
		var value = document.cookie.match("(?:^|;)\\s*" + key + "=([^;]*)");
		return value ? unescape(value[1]) : false;
	},
	
	removeCookie: function(name, options) {
		
		
		options = options || {};
		options.duration = -999;
		
		this.createCookie(name, "", options);
	},
	
	createUserObj: function(params){
			/*
			{
				version:<Site Recruit version>,
				state:{
				            name:<State Name>,
				            url: <url>,
				            timestamp:<datetime>
				            },
				lastinvited: <datetime>,
				userid: <date>+<random>,
				vendorid: <assigned to comscore >,
				surveys: ["pid","pid",....]
			}

			STATES:
			not in progress/idle
			dd in progress
			edd
			*/
			
			var date = new Date();
			var inputpid = params.pid;
			var inputurl = params.url;
			var inputstate = this.CONSTANTS.STATE_NAME.IDLE;
			if (params.statename){
				 inputstate = params.statename;
			}
			var inputtimestamp = date.getTime();
			if (params.timestamp){
				 inputtimestamp = params.timestamp;
			}
			var inputcookiename = this.getCookieName();
			if (params.cookiename){
				 inputcookiename = params.cookiename;
			}
			if (!params.cookieoptions){
				 params.cookieoptions = this.getDefaultCookieOptions();
			}
			
			var userObj = {};
			userObj.version = "5.1";
			userObj.state = {};
			userObj.state.name = inputstate;
			userObj.state.url = inputurl;
			userObj.state.timestamp = inputtimestamp;
			userObj.lastinvited = inputtimestamp;
			userObj.userid = date.getTime().toString() + Math.floor(Math.random()*9999999999999999).toString() ;
			userObj.vendorid = this.getVendorId();
			userObj.surveys = new Array();
			userObj.surveys.push(inputpid);
			userObj.graceperiod = 5;
			
			var cookieString = COMSCORE.SiteRecruit.Utils.JSONSerialize(userObj);
			
			this.createCookie(inputcookiename,cookieString,params.cookieoptions)
			return userObj;
			
	},
	
	/* Start Public Functions*/
	setUserObj: function(params){
			/*
				Public function to set values for the user object
			*/
			
			var inputpid, inputurl, inputstate, inputtimestamp;
			var inputcookiename, inputgraceperiod, inputtrackertimestamp;
			var date;
			
			var userObj = this.getUserObj(params);
			if (!userObj)
			{
				userObj = this.createUserObj(params);
			}
	
			date = new Date();
			
			//MP: default values
			inputtimestamp = 0;//date.getTime();
			inputcookiename = this.getCookieName();
			inputgraceperiod = 5;
			inputtrackertimestamp = 0;
			inputstate = this.CONSTANTS.STATE_NAME.IDLE; 
				
			//MP: pid and url are directly read from the input object
			inputpid = params.pid;
			
			if (params.url) {
				inputurl = params.url;
			}
			else if (userObj.state.url) {
				inputurl = userObj.state.url;
			}
			
			/**MP:Read values from params object, if not set, read from current cookie (preserve existent value)**/
			
			//MP:state should always be explicitly set, if not, state value will be taken from current cookie
			if (params.statename){
				 inputstate = params.statename;
			} 
			else if (userObj.state && userObj.state.name) {
				inputstate = userObj.state.name
			}
			
			if (params.timestamp) {
				inputtimestamp = params.timestamp;
			}
			else if (userObj.state && userObj.state.timestamp) {
				inputtimestamp = userObj.state.timestamp;
			}
			
			if (params.cookiename){
				 inputcookiename = params.cookiename;
			}
				//MP: cookiename is always passed on the params object
			
			if (!params.cookieoptions){
				 params.cookieoptions = this.getDefaultCookieOptions();
			}
			//MP: cookieoptions do not exist in the userObject, if those values need to be preserved, they should be explicitly read here, one by one
			
			
			if (params.graceperiod) {
				inputgraceperiod = params.graceperiod;
			}
			else if (userObj.graceperiod) {
				inputgraceperiod = userObj.graceperiod;
			}
			//MP: graceperiod is only set once, from then on, it should be preserved
			
			if (params.trackertimestamp)
			{
				inputtrackertimestamp = params.trackertimestamp
			}
			else if (userObj.trackertimestamp)
			{
				inputtrackertimestamp = userObj.trackertimestamp;
			}

			//userObj.lastinvited = inputtimestamp;
			userObj.lastinvited = date.getTime();
			
			if (inputpid)
			{
				var doespidexist = false;
				for (i=0; i < userObj.surveys.length; i++) {
					if (userObj.surveys[i] && userObj.surveys[i].toLowerCase() == inputpid.toLowerCase()) {
						doespidexist = true;
					}
				}
				if (doespidexist == false){
					if (userObj.surveys.length) {
						// if there are more than maxNumberOfPids elements on the array, only the last maxNumberOfPids-1 will be kept
						// and the new element will be added to the end, thus maintaining maxNumberOfPids elements in the array
						if (userObj.surveys.length < this.maxNumberOfPids) {
							userObj.surveys.push(inputpid);
						} else {
							userObj.surveys.splice(0,1);
							userObj.surveys.push(inputpid);
						}
					} else {
						userObj.surveys.push(inputpid);
					}
				}
				//remove nulls
				for (i=0; i < userObj.surveys.length; i++) {
					if (userObj.surveys[i] == null) {
						userObj.surveys.splice(i,1);
					}
				}
			}
			if (inputstate)
			{
				userObj.state.name = inputstate;
				userObj.state.url = inputurl;
				userObj.state.timestamp = inputtimestamp;
				userObj.graceperiod = inputgraceperiod;
				userObj.trackertimestamp = inputtrackertimestamp;
			}
			
			var cookieString = COMSCORE.SiteRecruit.Utils.JSONSerialize(userObj);
			//this.removeCookie(inputcookiename, { path: params.cookieoptions.path, domain: params.cookieoptions.domain });
			this.createCookie(inputcookiename,cookieString,params.cookieoptions);
			
			return userObj;
	},
	
	getUserObj: function(params) {
		
		var inputcookiename = this.getCookieName();
		if (params.cookiename){
			 inputcookiename = params.cookiename;
		}
		
		var uservalue=this.getCookieValue(inputcookiename);
		
		if (uservalue && uservalue!=""){
			var userObj = COMSCORE.SiteRecruit.Utils.JSONDeserialize(uservalue);
			//SR4.5 cookies do not store user objects, use this to overwrite
			//For future dev, we probably want to increment this version number if we want
			//to prevent scripts of different version from accessing certain cookies
			if (userObj && userObj.version && !isNaN(userObj.version) && userObj.version >= 4.6)
			{
			    return userObj;
			}
			else 
			{
				
			}
		}
		
		return null;
	}
	
};	
		
COMSCORE.SiteRecruit.DDChecker = ( function() {
	// private methods and properties
	var _interval = 1000, _timeoutId;
	
	var _lastUpdateTime = (new Date()).getTime();
	var _match, _gracePeriod, _isCaptureTrail, _cookieConfig;
	
	var _clickStream = [];
	
	// shorthand
	var _sr = COMSCORE.SiteRecruit;
	var _utils = _sr.Utils;
	
	return {
		
		isDDInProgress: function() {
			//var c = _utils.UserPersistence.get(_cookieConfig.name);
			//return (c && c.indexOf(_sr.CONSTANTS.COOKIE_TYPE.DD_IN_PROGRESS) === 0);
			
			var ddinprogress = false;
			var params = {};
			params.cookiename = _cookieConfig.name;
			var userObj = _utils.UserPersistence.getUserObj(params);
			
			if (userObj){
				if (userObj.state.name == _sr.CONSTANTS.STATE_NAME.DDINPROGRESS){
					ddinprogress = true
					
				}
			}
			
			return ddinprogress;
		},
		
		getDataFromDDKeepAlive: function() {
			// parse url and time from cookie
			var data = { url: "", time: "" };
			
			var params = {};
			params.cookiename = _cookieConfig.name;
			var userObj = _utils.UserPersistence.getUserObj(params);
			
			if (userObj){
				if (userObj.state && userObj.state.url && userObj.state.timestamp){
				
					
				
					data.url = userObj.state.url;
					data.time = userObj.state.timestamp;
				}
				
			}
			
			
			return data;
		},
		
		isWithinBrowsableArea: function(data) {
			// Check for the correct path.
	        if (_match) {       
	            var r = new RegExp(_match, 'i');
	            return data.url.search(r) != -1;
	        }
	        else {
				
				return true;
			}
		},
		
		isGracePeriodExpired: function() {
			if (typeof(_lastUpdateTime) == "undefined") {
				return true;
			}
			var currTime = (new Date()).getTime();
			var timeDiff = currTime - _lastUpdateTime;
			
	        return (timeDiff > _gracePeriod * 1000);
		},
		
		isValidData: function(data) {
			// regex match?
			if (this.isWithinBrowsableArea(data)) {
				return this.isGracePeriodExpired(data);
			}
						
			return false;
		},
		
		isClickStreamAlreadyLogged: function(data) {
			if (typeof(COMSCORE.SiteRecruit.Tracker.surveyData.propOrd) != "undefined") {
				if (_clickStream.length > 0) {
					if (data.url === _clickStream[_clickStream.length-1].url || data.url === escape(_clickStream[_clickStream.length-1].url)) {
						return true;
					}
				}
			}
			else {
				for (var i = _clickStream.length - 1; i >= 0; i--) {
					if (data.url === _clickStream[i].url) {
						return true;
					}
				}
			}
			return false;
		},
		
		logClickStream: function(data) {
			if (!this.isClickStreamAlreadyLogged(data)) {
				_clickStream.push(data);
				
				// CDDS
				if (typeof(COMSCORE.SiteRecruit.Tracker.surveyData.propOrd) != "undefined") {
					if (cs_tobj.dnt == false) {
						if (cs_tobj.ns__p == "0") {
							cs_tobj.ns__p = (new Date).getTime();
							cs_tobj.ns__ts = cs_tobj.ns__p;
						}
						else {
							cs_tobj.ns__ts = (new Date).getTime();
						}
						
						// INCREMENT bcncnt
						cs_tobj.bcncnt++;
						
						//c4=3 will log page view while tracker is active
						var i = new Image();
						i.onload = function() { cs_tobj.bcn = true; }
						i.src = "//sb.scorecardresearch.com/p?" +
							"c1=12" + 
							"&c2=" + COMSCORE.SiteRecruit.Tracker.projectId +
							"&c4=3" +
							"&c8=" + escape(data.url) +
							"&c9=1" +
							"&c12=" + COMSCORE.SiteRecruit.Tracker.surveyData.userid +
							"&c11=" + cs_tobj.bcncnt +
							"&ns__p=" + cs_tobj.ns__p +
							"&ns__ts=" + cs_tobj.ns__ts;
						
						var i = COMSCORE.SiteRecruit.Tracker.surveyData;
						var curProp = "";

						var p = COMSCORE.SiteRecruit.Tracker.config.propMappings;
						var q = COMSCORE.SiteRecruit.Tracker.config.pathMappings;

						if (p.prop016m.test(data.url)) { i.prop016++;curProp="016"; }
						else if (p.prop010m.test(data.url)) { i.prop010++;curProp="010"; }
						else if (p.prop001m.test(data.url)) { i.prop001++;curProp="001"; }
						else if (p.prop002m.test(data.url)) { i.prop002++;curProp="002"; }
						else if (p.prop003m.test(data.url)) { i.prop003++;curProp="003"; }
						else if (p.prop004m.test(data.url)) { i.prop004++;curProp="004"; }
						else if (p.prop005m.test(data.url)) { i.prop005++;curProp="005"; }
						else if (p.prop006m.test(data.url)) { i.prop006++;curProp="006"; }
						else if (p.prop017m.test(data.url)) { i.prop017++;curProp="017"; }
						else if (p.prop007m.test(data.url)) { i.prop007++;curProp="007"; }
						else if (p.prop008m.test(data.url)) { i.prop008++;curProp="008"; }
						else if (p.prop009m.test(data.url)) { i.prop009++;curProp="009"; }
						else if (p.prop011m.test(data.url)) { i.prop011++;curProp="011"; }
						else if (p.prop012m.test(data.url)) { i.prop012++;curProp="012"; }
						else if (p.prop013m.test(data.url)) { i.prop013++;curProp="013"; }
						else if (p.prop014m.test(data.url)) { i.prop014++;curProp="014"; }
						else if (p.prop015m.test(data.url)) { i.prop015++;curProp="015"; }
						else if (p.prop018m.test(data.url)) { i.prop018++;curProp="018"; }
						else if (p.prop019m.test(data.url)) { i.prop019++;curProp="019"; }
						else if (data.url == "") { i.prop999++;curProp="999"; }
						else { i.prop998++;curProp="998"; }

						if (i.propOrd == "") { i.propOrd = curProp; }
						else {
							var endProp = i.propOrd.substring(i.propOrd.length - 3, i.propOrd.length);
							if (curProp != endProp) {
								i.propOrd += "_" + curProp;
							}
						}
						
						var rp001 = new RegExp(q.path001m,"i");
						var rp002 = new RegExp(q.path002m,"i");
						if (rp001.test(data.url)) {	i.path001 = "1";	}	// LOG PATH 1 EXPOSURE
						if (rp002.test(data.url) && endProp == "014") {	i.path002 = "1";	}	// LOG PATH 2 TRAVEL
						
						// SESSION STORAGE
						var propStr = "bcn=" + cs_tobj.bcn +
							"&prop001=" + i.prop001 +
							"&prop002=" + i.prop002 +
							"&prop003=" + i.prop003 +
							"&prop004=" + i.prop004 +
							"&prop005=" + i.prop005 +
							"&prop006=" + i.prop006 +
							"&prop007=" + i.prop007 +
							"&prop008=" + i.prop008 +
							"&prop009=" + i.prop009 +
							"&prop010=" + i.prop010 +
							"&prop011=" + i.prop011 +
							"&prop012=" + i.prop012 +
							"&prop013=" + i.prop013 +
							"&prop014=" + i.prop014 +
							"&prop015=" + i.prop015 +
							"&prop016=" + i.prop016 +
							"&prop017=" + i.prop017 +
							"&prop018=" + i.prop018 +
							"&prop019=" + i.prop019 +
							"&prop998=" + i.prop998 +
							"&prop999=" + i.prop999 +
							"&path001=" + i.path001 +
							"&path002=" + i.path002 +
							"&bcncnt="  + i.bcncnt  +
							"&ns__p=" + cs_tobj.ns__p +
							"&ns__ts" + cs_tobj.ns__ts +
							"&propOrd=" + i.propOrd + "&";

						sessionStorage.setItem('csProp', propStr);
					}
					else {
						cs_tobj.dnt = false;
					}
				}
			}
		},
		
		getDataFromOpener: function() {
			var data;
			try {
				data = {
					url: opener.location.toString(),
					time: (new Date()).getTime()
				}						
			}
			catch (e) {	
			}
			
			return data;
		},
		
		setTrackerCookie: function() { 
			//Updates the trackerTimestamp in the msresearch cookie.
			//This allows the broker to see tracker is alive and running
			
			var params = {};
			params.cookiename = _cookieConfig.name;
			params.trackertimestamp = (new Date()).getTime();
			params.cookieoptions = _cookieConfig;
			
			_utils.UserPersistence.setUserObj(params);
		},
		
		start: function(match, gracePeriod, graceFlag, isWithinGraceTime, isCaptureTrail, cookieConfig) {
			var csup =  COMSCORE.SiteRecruit.Utils.UserPersistence;
			_match = match;
			_gracePeriod = gracePeriod;
			_isCaptureTrail = isCaptureTrail;
			_cookieConfig = cookieConfig;

			var that = this;
			
			_timeoutId = setInterval(function() {
			
			//TRACKING3P COOKIE VALUE MATCHES DOMAIN LIST, STOP TRACKING
			if (COMSCORE.SiteRecruit.Tracker.config.domainMatch != undefined) {
				var domMatchRE = new RegExp(COMSCORE.SiteRecruit.Tracker.config.domainMatch,'i');
				var ds = _utils.UserPersistence.getCookieValue(COMSCORE.SiteRecruit.Tracker.config.domainSwitch);
				if (ds != false && domMatchRE.test(ds)) { 
					
					that.stop();
				}
			}
			
			if (that.isDDInProgress()) {
				if(csup.getCookieValue("graceIncr")){
					if(csup.getCookieValue("graceIncr") == "1"){
						_gracePeriod = 120;
						graceFlag = true;
					}
				 	else {
				 		if(graceFlag) {
				 			_lastUpdateTime = (new Date()).getTime();
				 			isWithinGraceTime=true;
				 		}
				 		graceFlag=false;
				 		if (COMSCORE.SiteRecruit.Tracker.config && COMSCORE.SiteRecruit.Tracker.config.gracePeriod) {
				 			_gracePeriod = COMSCORE.SiteRecruit.Tracker.config.gracePeriod;
				 		}
				 		else {
				 			_gracePeriod = 5;
				 		}
				 	}
				}

				
				var isOpenerAccessible = true;
				var data = that.getDataFromOpener();

				if (!data) {	// opener is not accessible, parse out of cookie!
					isOpenerAccessible = false;
					
					
					data = that.getDataFromDDKeepAlive();
				}
						
				if (data) {
					
						
					if (_isCaptureTrail) {
						
						that.logClickStream(data);								
					}
					if (that.isWithinBrowsableArea(data) && !graceFlag) {
						if(!isWithinGraceTime){_lastUpdateTime = data.time;}
						isWithinGraceTime=false;
							
						// we need to check the graceperiod if we got the data from a cookie
						if (!isOpenerAccessible && that.isGracePeriodExpired()) {
							
							that.stop();
						}
						else {
							//capture trail used to be here
							that.setTrackerCookie();
						}
					}
					else {
						
						if (that.isGracePeriodExpired()) {
							
							that.stop();
						}							
					}
				}
				else {
					
					that.stop();
				}
					
			}
			else {
						
				that.stop();
			}
		}, _interval);
	},
		
	storeClickStream: function() {
		if (_clickStream.length) {
			var urls = "", times = "", i = 0, len = _clickStream.length;
			
			for (;i < len; i++) {
				urls = urls.concat(_clickStream[i].url, ";");
				times = times.concat(_clickStream[i].time, ";");
			}
			
			var s = COMSCORE.SiteRecruit.Tracker.surveyData;
			s["locationList"] = urls;
			s["timeList"] = times;
		}
	},
		
		stop: function() {
			clearInterval(_timeoutId);
			
			// push clickstream data into surveyData format
			this.storeClickStream();
			
			COMSCORE.SiteRecruit.Tracker.finishTracking();
		}
	};
})();
COMSCORE.isDDInProgress = COMSCORE.SiteRecruit.DDChecker.isDDInProgress;

COMSCORE.SiteRecruit.Tracker = (function () {
	// shorthand
	var _sr = COMSCORE.SiteRecruit;
	var _utils = COMSCORE.SiteRecruit.Utils;

	function _isVersionMatch() {
		try {
			return opener.COMSCORE.SiteRecruit.version === _sr.version;
		}
		catch (e) {}
		
		return true;	
	}

	// public methods and properties
	return {
		initialize: function() {
			
			if (_isVersionMatch()) {
				//this.start();
				this.getConfiguration();
			}
							
		},
		
		getCurrentExecutingPath: function() {
			var url = document.location.href.split('?')[0];
			var path = url.substring(0, url.lastIndexOf('/') + 1);
			return path;
		},
		
		getDomain: function(url) {
			if (/\/\/(.+?)\//.test(url)) {
				var host = RegExp.$1;
				var parts = host.split('.');
				if (parts.length >= 3) {
					parts = parts.slice(1);
					return parts.join('.');
				}
				return host;
			}
			else
			{
				return false;
			}
		},
		
		isValidHost: function(url) {
		    //check if the tracker URL is valid
		    var trackerUrlCheck = COMSCORE.SiteRecruit.debug ? "" : "";
		    
		    
			
		    var trackerUrlCheckRegEx = new RegExp(trackerUrlCheck)
			if (trackerUrlCheckRegEx.test(url)) {
				
				
				return true;
			}
			
			
			
			return false;
		},
		
		getConfiguration: function() {				
			this.surveyData = this.getQueryStringParams(document.location.toString());
			var s = this.surveyData;
			
			//XSS Check: make sure this is really a URL and
			//make sure trackerPageConfigUrl is configured on same domain as the tracker page by checking if it starts with the same domain
			currentPath = this.getCurrentExecutingPath();
			currentPathDomain = this.getDomain(currentPath);
			trackerPathDomain = this.getDomain(s.trackerPageConfigUrl);
			
			if (trackerPathDomain == 's-microsoft.com') { trackerPathDomain = 'microsoft.com'}

			var srtest = /^http(s)?:\/\/(js|www|i3|i|siterecruit)\.((s\-|)microsoft|comscore)\.com\/(library\/svy\/|sr\/)[\w\/-]+\/trackerconfig_[\w-]+\.js$/i;
			if (currentPathDomain != trackerPathDomain || !this.isValidHost(s.trackerPageConfigUrl)){
				var _testsr = srtest.test(s.trackerPageConfigUrl);
				if (!_testsr) {
				  s.trackerPageConfigUrl = "";
				}
			}

			var p = location.protocol;
			var q = s.trackerPageConfigUrl.substring(0,s.trackerPageConfigUrl.indexOf(":") + 1);
				
			if ( (p != q) && p == "https:" ) {
				s.trackerPageConfigUrl = s.trackerPageConfigUrl.replace("http:","https:");
			}

			this.surveyUrl = s.surveyUrl;
			this.projectId = s.projectId;
			
			this.cookieConfig = {
				name: s.cookieName,
				path: s.cookiePath,
				domain: s.cookieDomain,
				duration: s.cookieDuration,
				date: s.cookieDate,
				trackerPageConfigUrl: s.trackerPageConfigUrl
			};
			
			// remove params that shouldn't get passed to survey
			delete s.cookieName;
			delete s.cookiePath;
			delete s.cookieDomain;
			delete s.cookieDuration;
			delete s.cookieDate;
			delete s.surveyUrl;
			_utils.loadScript(this.cookieConfig.trackerPageConfigUrl);
		},
		
		getQueryStringParams: function(url) {
			var params = {};
			if (!url ) {
				return params;
			}
			
			var pairs = url.replace(/^[^\?]+\??/,'').split(/[;&]/);
			for (var i = 0; i < pairs.length; i++) {
				var keyVal = pairs[i].split('=');
				if (!keyVal || keyVal.length != 2) continue;

				var key = unescape(keyVal[0]);
				var val = unescape(keyVal[1]);

				val = val.replace(/\+/g, ' ');
				params[key] = val;
			}

			return params;
		},
		
		injectContent: function() {
			var c = document.getElementById("content");
			c.innerHTML = this.config.content;	
			var script = document.getElementById("customScript");
			if (script != null) {
				eval(script.innerHTML);
			}
			document.title = this.config.title;
		},
		
		start: function() {
			
			this.injectContent();
			
			if (this.config.isAutoFocus) {
				
				window.focus();
			}
			else {
				
				try {
					window.blur();
				}
				catch (e) {}
			}
			
			_sr.DDChecker.start(this.config.match, this.config.gracePeriod, this.config.graceFlag, this.config.isWithinGraceTime, this.config.isCaptureTrail, this.cookieConfig);
		},
		
		injectForm: function() {
			//XSS Check: make sure this is really a URL, otherwise dont create the form element
			if (!/^http(s)?:\/\/(ar|survey2|dev-survey2)\.(surveysite|securestudies|voicefive|opinionsquare)\.com\/(wi|wix|bmx3)\/((p[0-9]+\.aspx)|(p.*s\/srSplash\.htm))/i.test(this.surveyUrl)){
				return;
			}
			
			this.form = document.createElement("form");
			this.form.method = "POST";
			this.form.action = this.surveyUrl;
			
			for (var i in this.surveyData) {
				var h = document.createElement("input");
				h.type = "hidden";
				h.name = i.toString();
				h.value = unescape(this.surveyData[i].toString());
				
				this.form.appendChild(h);
			}
			
			document.body.appendChild(this.form);
			
		},  
		
		finishTracking: function() {
			// Run beforeSubmit event
			if (typeof(COMSCORE.SiteRecruit.Tracker.config.Events) != "undefined" && typeof(COMSCORE.SiteRecruit.Tracker.config.Events.beforeSubmit()) != "undefined") {
				COMSCORE.SiteRecruit.Tracker.config.Events.beforeSubmit();
			}

			// CDDS - VERIFY THAT PROP VARIABLES HAVE BEEN UPDATED
			if (typeof(COMSCORE.SiteRecruit.Tracker.surveyData.propOrd) != "undefined") {
				if (COMSCORE.SiteRecruit.Tracker.surveyData.propOrd == "") {
					var curUrl = COMSCORE.SiteRecruit.DDChecker.getDataFromDDKeepAlive().url;
					
					if (cs_tobj.ns__p == "0") {
						cs_tobj.ns__p = (new Date).getTime();
						cs_tobj.ns__ts = cs_tobj.ns__p;
					}
					else {
						cs_tobj.ns__ts = (new Date).getTime();
					}
					
					// INCREMENT bcncnt
					cs_tobj.bcncnt++;
					
					//c4=3 will log page view while tracker is active
					var i = new Image();
					i.onload = function() { cs_tobj.bcn = true; }
					i.src = "//sb.scorecardresearch.com/p?" +
						"c1=12" + 
						"&c2=" + COMSCORE.SiteRecruit.Tracker.projectId +
						"&c4=3" +
						"&c8=" + escape(curUrl) +
						"&c9=2" +
						"&c12=" + COMSCORE.SiteRecruit.Tracker.surveyData.userid +
						"&c11=" + cs_tobj.bcncnt +
						"&ns__p=" + cs_tobj.ns__p +
						"&ns__ts=" + cs_tobj.ns__ts;
					
					var i = COMSCORE.SiteRecruit.Tracker.surveyData;
					var curProp = "";

					var p = COMSCORE.SiteRecruit.Tracker.config.propMappings;
					var q = COMSCORE.SiteRecruit.Tracker.config.pathMappings;

					if (p.prop016m.test(curUrl)) { i.prop016++;curProp="016"; }
					else if (p.prop010m.test(curUrl)) { i.prop010++;curProp="010"; }
					else if (p.prop001m.test(curUrl)) { i.prop001++;curProp="001"; }
					else if (p.prop002m.test(curUrl)) { i.prop002++;curProp="002"; }
					else if (p.prop003m.test(curUrl)) { i.prop003++;curProp="003"; }
					else if (p.prop004m.test(curUrl)) { i.prop004++;curProp="004"; }
					else if (p.prop005m.test(curUrl)) { i.prop005++;curProp="005"; }
					else if (p.prop006m.test(curUrl)) { i.prop006++;curProp="006"; }
					else if (p.prop017m.test(curUrl)) { i.prop017++;curProp="017"; }
					else if (p.prop007m.test(curUrl)) { i.prop007++;curProp="007"; }
					else if (p.prop008m.test(curUrl)) { i.prop008++;curProp="008"; }
					else if (p.prop009m.test(curUrl)) { i.prop009++;curProp="009"; }
					else if (p.prop011m.test(curUrl)) { i.prop011++;curProp="011"; }
					else if (p.prop012m.test(curUrl)) { i.prop012++;curProp="012"; }
					else if (p.prop013m.test(curUrl)) { i.prop013++;curProp="013"; }
					else if (p.prop014m.test(curUrl)) { i.prop014++;curProp="014"; }
					else if (p.prop015m.test(curUrl)) { i.prop015++;curProp="015"; }
					else if (p.prop018m.test(curUrl)) { i.prop018++;curProp="018"; }
					else if (p.prop019m.test(curUrl)) { i.prop019++;curProp="019"; }
					else if (curUrl == "") { i.prop999++;curProp="999"; }
					else { i.prop998++;curProp="998"; }
					
					if (i.propOrd == "") { i.propOrd = curProp; }
					else {
						var endProp = i.propOrd.substring(i.propOrd.length - 3, i.propOrd.length);
						if (curProp != endProp) {
							i.propOrd += "_" + curProp;
						}
					}
					
					var rp001 = new RegExp(q.path001m,"i");
					var rp002 = new RegExp(q.path002m,"i");
					if (rp001.test(curUrl)) {	i.path001 = "1";	}	// LOG PATH 1 EXPOSURE
					if (rp002.test(curUrl) && endProp == "014") {	i.path002 = "1";	}	// LOG PATH 2 TRAVEL
			
					// SESSION STORAGE
					var propStr = "bcn=" + cs_tobj.bcn +
						"&prop001=" + i.prop001 +
						"&prop002=" + i.prop002 +
						"&prop003=" + i.prop003 +
						"&prop004=" + i.prop004 +
						"&prop005=" + i.prop005 +
						"&prop006=" + i.prop006 +
						"&prop007=" + i.prop007 +
						"&prop008=" + i.prop008 +
						"&prop009=" + i.prop009 +
						"&prop010=" + i.prop010 +
						"&prop011=" + i.prop011 +
						"&prop012=" + i.prop012 +
						"&prop013=" + i.prop013 +
						"&prop014=" + i.prop014 +
						"&prop015=" + i.prop015 +
						"&prop016=" + i.prop016 +
						"&prop017=" + i.prop017 +
						"&prop018=" + i.prop018 +
						"&prop019=" + i.prop019 +
						"&prop998=" + i.prop998 +
						"&prop999=" + i.prop999 +
						"&path001=" + i.path001 +
						"&path002=" + i.path002 +
						"&bcncnt="  + i.bcncnt  +
						"&propOrd=" + i.propOrd;
					sessionStorage.setItem('csProp', propStr);
				}
			}

			//Modified for cross-domain departure functionality 11/08/2013
			
			//CAPTURE TIMELIST AND LOCATIONLIST
			var locList, timeList;
			var cdds = false;
			var _st = COMSCORE.SiteRecruit.Tracker;
			var _sd = COMSCORE.SiteRecruit.Tracker.surveyData;

			if (_st.config.isCaptureTrail == true && ( _st.cddsData != undefined && _st.cddsData != false)) {
				locList = unescape(_st.cddsData.substring(13, _st.cddsData.indexOf("timeList=") - 1))
					+ _st.surveyData["locationList"];
				timeList = unescape(_st.cddsData.substring(_st.cddsData.indexOf("timeList=") + 9,_st.cddsData.length))
					+ _st.surveyData["timeList"];
			}
			else {
				locList = _st.surveyData["locationList"];
				timeList = _st.surveyData["timeList"];
			}
			
			//GRAB TRACKER MAPPINGS
			var tm = _st.config.trackerMappings;
			
			//ISOLATE DOMAINSWITCH COOKIE 
			var t3p = _utils.UserPersistence.getCookieValue(_st.config.domainSwitch);
			
			//REMOVE DOMAINSWITCH COOKIE
			if (t3p) {
				_utils.UserPersistence.removeCookie(_st.config.domainSwitch, 
					{ path: _st.config.cookie.path, domain: _st.config.cookie.domain } );
			}
					
			//GRAB DOMAIN MATCH REGULAR EXPRESSION - DETERMINES DOMAIN FOUND IN TRACKING3P COOKIE
			var domMatchRE = new RegExp(_st.config.domainMatch,'i');

			//IF TRACKER MAPPINGS EXIST AND A DOMAIN VALUE CAN BE FOUND IN TRACKING3P
			if (tm != undefined && domMatchRE.test(t3p) && COMSCORE.SiteRecruit.Tracker.config.isCDDS && COMSCORE.SiteRecruit.Tracker.config.isCDDS == true) {
				//LOOP THROUGH TRACKER MAPPINGS
				for (var i = 0; tm && i < tm.length; i++) {
					//SET UP REGULAR EXPRESSION TO MATCH THE DESTINATION DOMAIN
					var destDomRE = new RegExp(tm[i].d,'i');
					
					//TEST THE DESTINATION DOMAIN REGULAR EXPRESSION AGAINST THE DOMAIN VALUE IN TRACKING3P
					if (destDomRE.test(t3p)) {
						//SWAP THE TRACKER CONFIG IN THE LOCATION ARGS
						var args = document.location.href.split('?')[1].toString();
						
						//SET UP REGULAR EXPRESSION TO GRAB TRACKERCONFIGURL FROM URL ARGS
						var tConfigRE = new RegExp('trackerPageConfigUrl=.+\/\/(.+.js)','i');
						var curConfig = tConfigRE.test(args);
						args = args.replace(RegExp.$1,tm[i].c.toString());

						//REPLACE COOKIENAME
						args = args.replace(/cookieName=\w+/i,"cookieName=" + tm[i].k);
						
						//REPLACE COOKIEDOMAIN
						var ckDomRE = new RegExp("(\\.[\\da-z-]+\\.[a-z]{2,6}($|/$))");
						if (ckDomRE.test(tm[i].d)) {
							args = args.replace(/cookieDomain=\.\w+\.\w+/i,"cookieDomain=" + RegExp.$1);
						}
						
						//IF CAPTURETRAIL, STORE LOCATIONLIST/TIMELIST IN COOKIE
						if (_st.config.isCaptureTrail == true) {
							if (/ns__p/i.test(args)) {
								args = args.split('ns__p')[0].toString();
							}
							
							args += "&ns__p="+_sd.ns__p+
								"&bcn="+_sd.bcn+
								"&path001="+_sd.path001+
								"&path002="+_sd.path002+
								"&prop001="+_sd.prop001+
								"&prop002="+_sd.prop002+
								"&prop003="+_sd.prop003+
								"&prop004="+_sd.prop004+
								"&prop005="+_sd.prop005+
								"&prop006="+_sd.prop006+
								"&prop007="+_sd.prop007+
								"&prop008="+_sd.prop008+
								"&prop009="+_sd.prop009+
								"&prop010="+_sd.prop010+
								"&prop011="+_sd.prop011+
								"&prop012="+_sd.prop012+
								"&prop013="+_sd.prop013+
								"&prop014="+_sd.prop014+
								"&prop015="+_sd.prop015+
								"&prop016="+_sd.prop016+
								"&prop017="+_sd.prop017+
								"&prop018="+_sd.prop018+
								"&prop019="+_sd.prop019+
								"&prop998="+_sd.prop998+
								"&prop999="+_sd.prop999+
								"&bcncnt=" +_sd.bcncnt +
								"&propOrd="+_sd.propOrd;
						}
						
						cdds = true;
						args += "&crossDomain=1";
						try {sessionStorage.removeItem("csProp");}catch(e){};
						window.location.href = tm[i].t + "?" + args;
					}
				}
			}

			if (cdds == false) {
				//STANDARD CODE
				this.injectForm();						
							
				// set ALREADYASKED cookie
				//_utils.UserPersistence.set(this.cookieConfig.name, _sr.CONSTANTS.COOKIE_TYPE.ALREADY_ASKED, this.cookieConfig);
				var params = {};
				params.cookiename = this.cookieConfig.name;
				params.cookieoptions = this.cookieConfig;
				params.statename = _sr.CONSTANTS.STATE_NAME.IDLE;
				params.pid = this.projectId;
				_utils.UserPersistence.setUserObj(params);
							
				//BUILD CROSS-DOMAIN LOCATIONLIST AND TIMELISTS
				if (locList && timeList) {
					if (this.form.locationList == null || this.form.timeList == null) {
						var l = document.createElement("input");
						l.type='hidden';
						l.name='locationList'; 
						l.value=unescape(locList); 
											
						var t = document.createElement("input");
						t.type='hidden';
						t.name='timeList'; 
						t.value=timeList; 
											
						this.form.appendChild(l);
						this.form.appendChild(t);
					  }
					  else {
						this.form.locationList.value = unescape(locList);
						this.form.timeList.value = timeList;
					}
				}

				// if tracing enabled, make them click something before it redirects to survey...
				//if (!_sr.debug) {
					this.submitForm();
				//}
				
				//END STANDARD CODE
			}
		},
		
		submitForm: function() {
			var that = this;
			if (that.form)
			{
				setTimeout(function() { that.form.submit(); }, 5);
			}
		}
	};
})();