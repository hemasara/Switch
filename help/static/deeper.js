/*This file was created by DELL GSD.  
  This file is being included as per Mantis Issue: 11733: Modification of index.html to handle deeplinks*/
  
/*  Google Analytics */
var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-36679013-1']);
	_gaq.push(['_trackPageview']);
	
(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


function dispatch() {
	var query = getQueryParams(document.location.search),
		page = 'index.htm';
	if (query.page) page = query.page;

	//alert("I am at: " + window.location + "\r\nTop parent is at: " + window.top.parent.location.href + "\r\nReferrer: " + document.referrer + "\r\nIs field? " + (window.location+'').indexOf('/Field') + "\r\nid: " + query.id + "\r\npage: " + query.page);
	// https://educate.dell.com/Saba/Web_wdk/Internal/content/contentrepository/Launch.rdf?title="Dispatch%20Page%20(J-P)&id=.....
	// https://educate.dell.com/Saba/Web_wdk/Field/content/contentrepository/Launch.rdf?.....
	// https://educate.dell.com/devcontent/cninv000000000007887/content.htm has no referrer
	
	if (query.id) { 
		//alert("This alert just shows you that it's starting on this page and will now direct you to: \r\n" + page);
		document.getElementById('destination').innerHTML = ' to ' + query.id + " / " + page;
		createCookie('page', page, 60000);
		if((window.location+'').indexOf('/Field')>-1) {
			window.location = 'https://educate.dell.com/Saba/Web/Field/goto/ContentInventoryDetailURL?id=' + query.id + '&actionKey2=true';
		} else if((window.location+'').indexOf('/TechDirect')>-1) {
				window.location = 'https://educate.dell.com/Saba/Web/TechDirect/goto/ContentInventoryDetailURL?id=' + query.id + '&actionKey2=true';
			} else {
				window.location = 'https://educate.dell.com/Saba/Web/Internal/goto/ContentInventoryDetailURL?id=' + query.id + '&actionKey2=true';
		};  // if Field .. else if TechDirect .. else
		// https://educate.dell.com/devcontent/cninv000000000007887/content.htm?id=cninv000000000004379&page=safety.htm
	} else {
		//window.location = 'https://educate.dell.com/';
	};
};  // dispatch();

function redirect_to_page() {
	var name = 'page', file = readCookie(name);
	eraseCookie(name);
	if (!file) file = 'index.htm';
	//document.getElementById('destination').innerHTML = ' to ' + file;
	window.location = path + file;
};  // redirect_to_page();



function getQueryParams(qs) {
	qs = qs.split("+").join(" ");
	var params = {}, 
		tokens, 
		re = /[?&]?([^=]+)=([^&]*)/g;
	while (tokens = re.exec(qs)) {
		params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
	};  // while
	return params;
};  // getQueryParams();


function createCookie(name,value,seconds) {
	if (seconds) {
		var date = new Date();
		date.setTime(date.getTime()+(seconds*1000));
		var expires = "; expires="+date.toGMTString();
	} else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
};  // createCookie();

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	};  // for i
	return null;
};  // readCookie();

function eraseCookie(name) { createCookie(name,"",-3600); };
