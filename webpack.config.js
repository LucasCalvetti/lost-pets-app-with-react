const path = require("path");
const TsconfigPathPlugin = require("tsconfig-paths-webpack-plugin");
const dev = process.env.NODE_ENV == "development";
const liveServer = require("live-server");

if (dev) {
    liveServer.start({
        root: "./",
        file: "index.html",
    });
}

module.exports = {
    entry: "./src/index.tsx",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css?$/i,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                        },
                    },
                ],
            },
            {
                test: /\.(jpg|png|svg|gif)$/,
                loader: "file-loader",
                options: {
                    name: "[path][name].[hash].[ext]",
                },
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".js", ".ts", ".png"],
        plugins: [new TsconfigPathPlugin({})],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
};
