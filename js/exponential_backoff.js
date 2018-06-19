let _isConnectedToInternet = false;

function checkOnlineStatus(onOnlineDetected = function (){}) {

}

function fetchGoogleFavicon() {
    let req = new XMLHttpRequest();
    req.open("GET", 'https://www.google.com/s2/favicons?domain=google.com');
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            let reqSucceeded = (req.status >= 200 && req.status < 304);
            if (reqSucceeded) {
                console.log('VpnExtensionEngine.checkPublicIpAddress(): geoip request succeeded. Response: ' + req.responseText);
                _isConnectedToInternet = true;
            }
            else {
                console.log('VpnExtensionEngine.checkPublicIpAddress():  geoip request failed');
                _isConnectedToInternet = false;
            }
        }
    };
    req.send();
}

document.addEventListener("DOMContentLoaded",function() {
    
});