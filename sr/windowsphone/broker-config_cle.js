COMSCORE.SiteRecruit.Broker.config={
	version:"5.0.3",
	testMode:false,
	  cookie:{
		name:"msresearch",
		path:"/",
		domain:".comscore.com",
		duration:90,
		rapidDuration:0,
		expireDate:""
	},
	thirdPartyOptOutCookieEnabled:false,
	prefixUrl:"",
	Events:{
		beforeRecruit:function(){		}
	},
	mapping:[	
	{m: 'windowsphone\\.com/en-us', c: 'inv_c_p127227702-CLE.js', f: 100, p: 0, halt: false   	}
	,{m: 'windowsphone\\.com/en-gb', c: 'inv_c_p127227702-CLE-EN-GB.js', f: 100, p: 0, halt: false   	}
	,{m: 'windowsphone\\.com/fr-fr', c: 'inv_c_p127227702-CLE-FR-FR.js', f: 100, p: 0, halt: false   	}
	,{m: 'windowsphone\\.com/de-de', c: 'inv_c_p127227702-CLE-DE-DE.js', f: 100, p: 0, halt: false   	}
	,{m: 'windowsphone\\.com/es-es', c: 'inv_c_p127227702-CLE-ES-ES.js', f: 100, p: 0, halt: false   	}
	,{m: 'windowsphone\\.com/es-mx', c: 'inv_c_p127227702-CLE-ES-MX.js', f: 100, p: 0, halt: false   	}
	,{m: 'windowsphone\\.com/es-cl', c: 'inv_c_p127227702-CLE-ES-CL.js', f: 100, p: 0, halt: false   	}
	,{m: 'windowsphone\\.com/pt-br', c: 'inv_c_p127227702-CLE-PT-BR.js', f: 100, p: 0, halt: false   	}
]};
COMSCORE.SiteRecruit.Broker.run();