var path = require('path');

module.exports = {
    mode: 'development',
    // mode: 'production',
    entry: {
        'service-worker-bundle': './src/service-worker.js',
        'bundle': './src/script.js'
    },
    output: {
        path: path.join(__dirname, "public"),
        filename: '[name].js'
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    resolve: {
        alias: {
            zlib: 'browserify-zlib-next'
        }
    }
}