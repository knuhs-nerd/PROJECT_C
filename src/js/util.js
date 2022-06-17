function getCookie(cookie_name) {
	  var x, y;
	  var val = document.cookie.split(';');

	  for (var i = 0; i < val.length; i++) {
	    x = val[i].substr(0, val[i].indexOf('='));
	    y = val[i].substr(val[i].indexOf('=') + 1);
	    x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
	    if (x == cookie_name) {
	      return unescape(y); // unescape로 디코딩 후 값 리턴
	    }
	  }
	}
function setCookie(name, value){

	document.cookie=name+'='+escape(value);

}
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function formatDateTime(dateString) {
	date = new Date(dateString);
	var hours = date.getHours();
	  var minutes = date.getMinutes();
	  var ampm = hours >= 12 ? '오후' : '오전';
	  hours = hours % 12;
	  hours = hours ? hours : 12; // the hour '0' should be '12'
	  minutes = minutes < 10 ? '0'+minutes : minutes;
	  var strTime = ampm +' '+hours + ':' + minutes;
	  return date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate() + "  " + strTime;
}

function whoami() {
	return parseJwt(getCookie("access_token"));
}

function parseJwt (token) {
	if(token == null || token == "") {
		return null;
	}
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
}

function getUrlParams() {
    var params = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
    return params;
}

function addComma(num)
{
var regexp = /\B(?=(\d{3})+(?!\d))/g;
return num.toString().replace(regexp, ',');
}

function copyToClipboard(val) {
	  const t = document.createElement("textarea");
	  document.body.appendChild(t);
	  t.value = val;
	  t.select();
	  document.execCommand('copy');
	  document.body.removeChild(t);
	}

function detectMobileDevice(agent) {
  const mobileRegex = [
    /Android/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ]

  return mobileRegex.some(mobile => agent.match(mobile))
}

$( document ).ready(function() {
	const isMobile = detectMobileDevice(window.navigator.userAgent)
	if (isMobile) {
		$(".kakao")[0].href = "https://open.kakao.com/o/gLvgl3cc";
	} else {

	}
	
	
});



/*$('#favorite').on('click', function(e) {
	var bookmarkURL = window.location.href; 
	var bookmarkTitle = document.title; 
	var triggerDefault = false; 
	if (window.sidebar && window.sidebar.addPanel) { // Firefox version < 23 
		window.sidebar.addPanel(bookmarkTitle, bookmarkURL, ''); 
	} else if ((window.sidebar && (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)) || (window.opera && window.print)) { // Firefox version >= 23 and Opera Hotlist 
		var $this = $(this); 
		$this.attr('href', bookmarkURL); 
		$this.attr('title', bookmarkTitle); 
		$this.attr('rel', 'sidebar'); 
		$this.off(e); triggerDefault = true; 
		} else if (window.external && ('AddFavorite' in window.external)) { // IE Favorite 
			window.external.AddFavorite(bookmarkURL, bookmarkTitle); 
		} else { // WebKit - Safari/Chrome 
			alert((navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Cmd' : 'Ctrl') + '+D 키를 눌러 즐겨찾기에 등록하실 수 있습니다.'); 
		} 
	return triggerDefault; 
});*/