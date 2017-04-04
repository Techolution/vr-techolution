//  Create the XHR object.
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}

// Make the actual CORS request.
(function() {
    // This is a sample server that supports CORS.
    var url = 'http://dev.techolution.com:5051/api/techo_blogs_v1-0';

    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        return;
    }

    // Response handlers.
    xhr.onload = function(e) {
        var response = JSON.parse(xhr.responseText);
        if (window.location.href.indexOf('?q=') > -1) {
            var blogSubject = window.location.href.split('?q=');
            response.map(function(object) {
                if (object.field_id[0].value == blogSubject[1]) {
                    $('#ajax-title, #ajax-title-mobile').text(object.title[0].value);
                    var bodyData = '';
                    if (object.body[0].value.indexOf('/sites/default/files/') > -1) {

                        bodyData = object.body[0].value.replace(/\/sites/gi, 'http://dev.techolution.com:5051/sites');
                        $('#ajax-body').html(bodyData);
                    } else {
                        $('#ajax-body').html(object.body[0].value);
                    }
                }
            });
        }
    };

    xhr.onerror = function(e) {
        e.preventDefault();
    };

    xhr.send();
})();