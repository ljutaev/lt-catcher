function wdCatcher(el, config) {

	// Config
	var config     	 = config || {},
		sensitivity  = setDefault(config.sensitivity, 20),
		timer        = setDefault(config.timer, 1000),
		cookieExpire = setDefault(config.cookieExpire, 1), // minutes
		_html        = document.getElementsByTagName('html')[0],
		topPosition  = setDefault(config.top, 0);

	// Set default config values
	function setDefault(_property, _default) {
		return typeof _property === 'undefined' ? _default : _property;
	}

	// Set cookie
	function setCookie(name, value, minutes) {

		var expires = "";

		if (minutes) {
			var date = new Date();
			date.setTime(date.getTime() + minutes * 1000);
			expires = "; expires=" + date.toUTCString();
		}

		document.cookie = name + "=" + (value || "")  + expires + "; path=/";
	}

	// Get cookie
	function readCookie(name) {

		var nameEQ = name + "=";
		var ca = document.cookie.split(';');

		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}

		return null;
	}

	// Attach catcher event
	setTimeout(attachCatcherShow, timer);
	function attachCatcherShow() {
		_html.addEventListener('mouseleave', handleMouseleave);
	}

	// Handle mouse leave
	function handleMouseleave(e) {

		var pos = {
			x: e.pageX,
		};

		var wdCatcherShow      	= readCookie('wdCatcherShow'),
			showOnExitXPosition = pos.x,
			cbkWindowWidth      = jQuery( el ).width(),
			left = showOnExitXPosition - cbkWindowWidth / 2;
			
			left < 0 && (left = 0),
			left + cbkWindowWidth > jQuery( window ).innerWidth() && (left = jQuery( window ).innerWidth() - cbkWindowWidth - 10);
			console.log(cbkWindowWidth)
			

		if ( e.clientY < 20 && readCookie('wdCatcherShow') == null ) {
			
			showOnPosition(left);
			setCookie('wdCatcherShow', 'true', 10)

		}		

	}

	// Show the element in the position where the mouse left the screen
	function showOnPosition(left) {

		if(el) {
			jQuery( el ).css("top", topPosition);
			jQuery( el ).css("left", left + "px");
			jQuery( el ).css("display", "block");
		}

	}

	// Disable plugin
	function disable() {

		_html.removeEventListener('mouseleave', handleMouseleave);

	}

}

var config = {
	sensitivity: 50
}

wdCatcher('.div', config);
