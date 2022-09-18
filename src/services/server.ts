import { Express } from 'express';
import express = require('express');
import { mkdirSync } from 'node:fs';
import cors = require('cors');

export const Server = {
	async init(dataDir: string, folder: string): Promise<void> {
		// Verify if Public direcotry exist

		dataDir + mkdirSync(`${dataDir}/public/`, { recursive: true });

		// Create express app
		const app: Express = express();
		const port = process.env.PORT || 4000;

		// Configs
		app.set('port', port);
		app.set('json spaces', 2);

		// Middleware
		app.use(express.urlencoded({ extended: false }));
		app.use(express.json());
		app.use(cors());

		let fol = '';

		if (folder) {
			app.use(express.static(folder));
			fol = `📁 'FOLDER' -> ${folder}`;
		} else {
			// app.use('/static', express.static(path.join(__dirname, '/public')));
			app.use(express.static(`${dataDir}/public/`));
			fol = `📁 'FOLDER'-> ${dataDir}/public/`;
		}

		// App Inicialization
		app.listen(port, () => {
			console.log(`
			⚡️ 'THE SERVER IS READY' ⚡️

🌐 'HOST' -> Server is running at http://localhost:${port}
${fol}
            `);
		});
	},
};
