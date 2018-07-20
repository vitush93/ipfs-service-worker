
export default {
    ipfs: {
        start: true,
        relay: {
            enable: true,
            hop: {
                enabled: true,
                active: false
            }
        },
        EXPERIMENTAL: {
            pubsub: true,
            // dht: true
        },
        config: {
            Addresses: {
                Swarm: [
                    '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star/',
                    '/dns4/star-signal.cloud.ipfs.team/tcp/443/wss/p2p-webrtc-star',
                ]
            }
        }
    }
}