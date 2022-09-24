import { Express } from 'express';
import express = require('express');
import { mkdirSync } from 'node:fs';
import cors = require('cors');
import colors = require('ansicolors');

export const Server = {
	/**
	 * Initialize server with provided folder
	 * @param dataDir App Data Dir
	 * @param folder Folder to be hosted
	 * @param port  App Port ex:8080
	 * @return void
	 */
	async init(
		dataDir: string,
		folder: string,
		port: string | number,
	): Promise<void> {
		// Verify if Public direcotry exist
		dataDir + mkdirSync(`${dataDir}/public/`, { recursive: true });

		// Create express app
		const app: Express = express();
		if (!port) port = process.env.PORT || 4000;

		// Configs
		app.set('port', port);
		app.set('json spaces', 2);

		// Middlewares
		app.use(express.urlencoded({ extended: false }));
		app.use(express.json());
		app.use(cors());

		// Fol is used to log
		let fol = '';

		if (folder) {
			// Verify if the user pass more than one folder
			if (folder.includes(',')) {
				const folders = folder.split(',');
				for (const i of folders) {
					// Serve this folder
					app.use(express.static(i));
				}
			}

			app.use(express.static(folder));
			fol = `📁 FOLDERS -> ${folder}`;
		} else {
			app.get('/', () => {
				console.log('fdfd');
			});
			// app.use('/static', express.static(path.join(__dirname, '/public')));
			app.use(express.static(`${dataDir}/public/`));
			fol = `📁 FOLDERS-> ${dataDir}/public/`;
		}

		// Server Inicialization
		app.listen(port, () => {
			console.log(`
			----------------------------			
			| ${colors.blue('⚡️ THE SERVER IS READY ⚡️')} |
			----------------------------

🌐 HOST -> Server is running at http://localhost:${port}
${fol}
            `);
		});
	},
};
