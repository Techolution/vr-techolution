$.ajax({
    //url: "https://jsonplaceholder.typicode.com/posts/1/comments",
    url: "http://dev.techolution.com:5051/api/techo_blogs_v1-0",
    type: "GET",

    contentType: 'application/json; charset=utf-8',
    success: function(resultData) {
        console.log(resultData);
        for (let i = 0; i < resultData.length; i++) {
            console.log(resultData);
            $('#ajax-body').append(`<p>${resultData[i]}</p>`);
        }
    },
    error: function(jqXHR, textStatus, errorThrown) {},

    timeout: 120000,
});
var dataIdTitle = '';

// Create the XHR object.
// function createCORSRequest(method, url) {
//     var xhr = new XMLHttpRequest();
//     if ("withCredentials" in xhr) {
//         // XHR for Chrome/Firefox/Opera/Safari.
//         xhr.open(method, url, true);
//     } else if (typeof XDomainRequest != "undefined") {
//         // XDomainRequest for IE.
//         xhr = new XDomainRequest();
//         xhr.open(method, url);
//     } else {
//         // CORS not supported.
//         xhr = null;
//     }
//     return xhr;
// }

// // Helper method to parse the title tag from the response.
// function getTitle(text) {
//     return text.match('<title>(.*)?</title>')[1];
// }

// // Make the actual CORS request.
// (function() {
//     // This is a sample server that supports CORS.
//     var url = 'http://dev.techolution.com:5051/api/techo_blogs_v1-0';

//     var xhr = createCORSRequest('GET', url);
//     if (!xhr) {
//         alert('CORS not supported');
//         return;
//     }

//     // Response handlers.
//     xhr.onload = function() {
//         var text = xhr.responseText;
//         var title = getTitle(text);
//         alert('Response from CORS request to ' + url + ': ' + title);
//     };

//     xhr.onerror = function() {
//         alert('Woops, there was an error making the request.');
//     };

//     xhr.send();
// })();