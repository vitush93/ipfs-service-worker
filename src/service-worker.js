'use strict';

import {
    getResponse
} from 'ipfs-http-response';
import ipfsNode from './ipfs-node-provider';

const VERSION = 'v1';


self.addEventListener('install', event => {
    log("INSTALLING");

    const waitForIpfs = new Promise((resolve, reject) => {
        ipfsNode.on('ready', () => {
            log('IPFS node is ready!');

            // FIXME: connect to private swarm
            // ipfsNode.swarm.connect('..')
            //     .then(() => log('Connected to swarm!'))
            //     .catch(err => log(err));

            resolve();
        });

        ipfsNode.on('error', err => reject(err));
    });

    event.waitUntil(waitForIpfs.then(() => {
        caches.open('ipfs-cache').then(() => self.skipWaiting());
    }));
});


self.addEventListener('activate', event => {
    log("ACTIVATING");

    event.waitUntil(self.clients.claim());
});


self.addEventListener('fetch', event => {
    log("HTTP call intercepted - " + event.request.url);

    const path = event.request.url;
    const isIpfsRequest = path.startsWith(`${self.location.origin}/ipfs`);

    if (!isIpfsRequest) {
        log('Not IPFS request: ' + path);

        return event.respondWith(fetch(event.request.url));
    }

    // extract IPFS CID hash
    const regex = /^.+?(\/ipfs\/.+)$/g;
    const match = regex.exec(path);
    const ipfsPath = match[1];

    return event.respondWith(
        caches.open('ipfs-cache').then(cache => {

            return cache.match(ipfsPath).then(res => {

                log('Trying to load ' + ipfsPath + ' from cache..');

                return res || getResponse(ipfsNode, ipfsPath)
                    .then(result => {

                        ipfsNode.files.add(result.body, (err, files) => {
                            console.log('IPFS add: ');
                            console.log(files);
                        });

                        log('Storing ' + ipfsPath + ' to cache..');

                        cache.put(ipfsPath, result.clone());

                        return result;
                    });
            });
        })
    );
});


function log(message) {
    console.log(VERSION, message);
}