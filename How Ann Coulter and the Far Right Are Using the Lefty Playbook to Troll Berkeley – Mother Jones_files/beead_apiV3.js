BeeadAds=new Beead();
function Beead(){

	this.height=425;
	this.width=970;

	this.mode="NONE";
	this.timeout=5000;
	this.security=0;
	this.adsUrl;
	this.durationValid=3*3600*1000;
	this.home;
	this.skipIE;
	this.beead_target;
	
	this.init=function(config){
		this.rootUrl="http://as.ebz.io/api/";
		if(config!=null){	
			this.pid=config.pid;			//NE PAS MODIFIER CETTE LIGNE sert au pluggage en beead.net/co.uk/it remplacé par maven
			this.url=config.returnUrl;
			this.adsUrl=config.adsUrl;
			this.test=config.test;
			this.ip=config.ip;
			this.fichier=config.fichier;
			this.home=config.home;
			
			this.cid=config.cid;
			
			this.publisherTracking=config.publisherTracking;
			this.beead_target=config.beead_target;
			this.jsCallback=config.jsCallback;
			if(config.height!=null)
				this.height=config.height;
			if(config.width!=null)
				this.width=config.width;
			if(config.timeout!=null)
				this.timeout=config.timeout;
			if(config.mode=="GET"){
				this.mode=config.mode;
				this.security=1;
			}
			if(config.jsPopup!=null)
				this.jsPopup=config.jsPopup;
			if(config.dlMode!=null)
				this.dlMode=config.dlMode;
			if(config.rootUrl!=null)
				this.rootUrl=config.rootUrl;
			if(config.skipIE!=null)
				this.skipIE=config.skipIE;
			if(config.tId!=null)
				this.tId=config.tId;
			if(config.debugMode!=null)
				this.debugMode=config.debugMode;
			if(config.noPubCallback!=null)
				this.noPubCallback=config.noPubCallback;
			if(config.onCloseCallback!=null)
				this.onCloseCallback=config.onCloseCallback;
			if(config.sdk!=null)
				this.sdk=config.sdk;
		}
		return this;
	};
	
	this.loadScript = function(document,url, callback){
		
	    var script = document.createElement("script");
	    script.type = "text/javascript";
	    
	    if(callback != null) {
		    if (script.readyState){  //IE
		        script.onreadystatechange = function(){
		            if (script.readyState == "loaded" ||
		                    script.readyState == "complete"){
		                script.onreadystatechange = null;
		                callback();
		            }
		        };
		    } else {  //Others
		        script.onload = function(){
		            callback();
		        };
		    }
	    }
	    script.src = url;
	    document.getElementsByTagName("body")[0].appendChild(script);
	};
	
	this.buildUrl = function(){
		var src = this.rootUrl + "choixPubJS.htm?pid=" + this.pid
				+ this.addArg("fichier", this.fichier)
				+ this.addArg("jsCallback", this.jsCallback)
				+ this.addArg("mode", this.mode)
				+ this.addArg("sec", this.security)
				+ this.addArg("test", this.test)
				+ this.addArg("ip", this.ip)
				+ this.addArg("skipIE", this.skipIE)
				+ this.addArg("dlMode", this.dlMode)
				+ this.addArg("jsPopup", this.jsPopup)
				+ this.addArg("beead_target", this.beead_target)
				+ this.addArg("publisherTracking", this.publisherTracking)
				+ this.addArg("tId", this.tId)
				+ this.addArg("debugMode", this.debugMode)
				+ this.addArg("noPubCallback", this.noPubCallback)
				+ this.addArg("onCloseCallback", this.onCloseCallback)
				+ this.addArg("sdk", this.sdk);
		
		//add cids in choixpub
		if (this.cid && this.cid.length) {
			for (var i = 0; i < this.cid.length; i++) {
				src += "&cid=" + this.cid[i];
			}
		}
		
		if(document.referrer!=null && typeof(document.referrer) != "undefined")
			src=src+this.addArg("referer",document.referrer);
		return this.beead_rewrite_secure(src);
	};
	
	this.screenLayerTo=function(){
		var src = this.buildUrl();
		src = src +this.addArg("url",this.url)+this.addArg("screenLayer",2);
		this.loadScript(document, src, null);
	};
	
	this.screenLayer=function(){
		var src = this.buildUrl();
		src = src + this.addArg("home",this.home)+this.addArg("screenLayer",1);
		this.loadScript(document, src, null);
	};
	this.dfpTo=function(){
		var src = this.buildUrl();
		src = src + this.addArg("url",this.url)+this.addArg("screenLayer",2);
		this.loadScript(parent.document, src, null);
	};
	this.dfp=function(){
		var src = this.buildUrl();
		src = src + this.addArg("home",this.home)+this.addArg("screenLayer",1);
		this.loadScript(parent.document, src, null);
	};
	this.check=function(){
		var src=this.rootUrl+"checkPub.htm?pid="+this.pid+this.addArg("test",this.test);
		if(this.security>0)
			src+=this.addArg("sec",this.security);
		this.loadScript(document, src, null);
	};	
	this.appendArg=function(url,name,value){
		if(url.indexOf('?')>=0){
			return url+"&"+name+"="+encodeURIComponent(value);
		}
		else
			return url+"?"+name+"="+encodeURIComponent(value);
	};
	
	this.addArg=function(name,value){
		if(value!=null)
			return "&"+name+"="+encodeURIComponent(value);
		else
			return "";
	};
	this.beead_rewrite_secure= function(url){
		if ("https:" == document.location.protocol) {
			return url.replace("http://","https://");
		} else {
			return url;
		}		
	};

};