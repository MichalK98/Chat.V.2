module.exports = {
    entry: {
        "app": "./src/index.js"
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js"
    },
    mode: "development",
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [
                "babel-loader"
            ]
        }, {
            test: /\.css$/,
            use: [
                "style-loader",
                "css-loader"
            ]
        }, {
            test: /\.scss$/,
            use: [
                "style-loader",
                "css-loader",
                "sass-loader"
            ]
        }, {
            test: /\.svg$/,
            use: [
                "@svgr/webpack"
            ]
        }]
    }
};