const FileManagerPlugin = require('filemanager-webpack-plugin');
const path = require('path');

module.exports = {
	lintOnSave: true,
	outputDir: __dirname + '/src/main/webapp/dist',
	// Proxy?
	devServer: {
		proxy: {
			'^/api': {
				target: 'http://localhost:80',
				ws: true,
				changeOrigin: true
			}
		}
	},
	chainWebpack: config => {
		config.plugin('html').tap(args => {
			args[0].template = path.resolve(__dirname, 'src/main/webapp/index.html');
			return args;
		});
		config.plugins.delete('pwa');
		config.plugins.delete('workbox');
	},
	configureWebpack: {
		resolve: {
			alias: {
				'@': __dirname + '/src/main/webapp/'
			}
		},
		entry: {
			app: './src/main/webapp/main.js'
		},
		plugins: [
			new FileManagerPlugin({
				onEnd: [
					{
						copy: [
							{
								source: path.resolve(__dirname, 'src/main/webapp/dist'),
								destination: path.resolve(__dirname, 'src/main/resources/static')
							}
						]
					},
				]
			})
		]
	}
};
