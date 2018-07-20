'use strict'

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker-bundle.js', {
                scope: '/'
            })
            .then(registration => {
                console.log("Service Worker registration completed ...");
            });
    });
}


const $input = document.getElementById('cid');
const $container = document.getElementById('container');

// load button
document.getElementById('load').addEventListener('click', e => {
    const cid = $input.value;

    var request = new XMLHttpRequest();
    request.open('GET', '/ipfs/' + cid, true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            console.log('Data from IPFS: ' + request.responseText);

            $container.innerHTML = request.responseText;
        }
    };

    request.onerror = function () {
        // There was a connection error of some sort
        console.log('XHR error occured while fetching from IPFS');
    };

    request.send();

});