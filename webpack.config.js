/**
 * Created by root on 15-12-29.
 */
module.exports={
    entry:"./public/js/app.jsx",
    output:{
        path:"./public/js",
        filename:"bundle.js"
    },
    resolve:{
        extensions: ['', '.js', '.jsx']
    },
    module:{
        loaders:[
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
}