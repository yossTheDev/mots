// eslint-disable-next-line node/no-extraneous-import
import * as fs from 'fs-extra';
import { Express } from 'express';
import express = require('express');
import path = require('path');
import * as ip from 'ip';
import chalk from 'chalk';

interface prefab {
	port: number;
	paths: endpoint[];
}

interface endpoint {
	name: string;
	folder: string;
	status: number;
	type?: string;
	response: string;
}

// eslint-disable-next-line valid-jsdoc
/**
 * Get Prefab Item
 * @param dataDir MOTS data dir
 * @param prefab  Prefab Name
 */
export async function getPrefabItem(
	dataDir: string,
	prefab: string,
): Promise<boolean> {
	// Get prefabs folder or create it
	fs.mkdirSync(`${dataDir}/prefabs`, { recursive: true });

	// Get all files in the folder
	const files = fs.readdirSync(path.join(dataDir, 'prefabs'));

	for (const item of files) {
		// Verify if prefab item exists and it is valid
		if (
			path.extname(item) === '.json' &&
			path.basename(item) === prefab + '.json'
		) {
			// eslint-disable-next-line no-await-in-loop
			const prefabItem = (await fs.readJson(
				path.join(dataDir, 'prefabs', item),
			)) as prefab;

			// Create express app
			const app: Express = express();
			const port = prefabItem.port;

			// Serve prefab item, get all paths
			for (const path of prefabItem.paths) {
				// If folder property is provided, serve this folder
				if (path.folder) {
					// Serve static folder
					app.use(express.static(path.folder));
				}

				// Create get endpoint
				app.get(`${path.name}/` || '/', (req, res) => {
					if (path.type === 'redirect') {
						res.status(path.status || 200).redirect(path.response);
					} else {
						res.status(path.status || 200).send(path.response);
					}
				});
			}

			// App listen
			app.listen(port);

			// Logging
			logPrefab(prefabItem.paths, port);

			return true;
		}
	}
}

// eslint-disable-next-line valid-jsdoc
/**
 * Create new prefab with default data
 * @param name Prefab Name
 * @param dataDir Mots Data Dir
 */
export async function createDefaultPrefab(
	name: string,
	dataDir: string,
): Promise<void> {
	// Get prefabs folder or create it
	fs.mkdirSync(`${dataDir}/prefabs`, { recursive: true });

	// Set default prefab data
	const defaultPrefab: prefab = {
		port: 4004,
		paths: [
			{ name: '', folder: '', response: '<h1>MOTS</h1>', status: 200 },
			{
				name: '/Error',
				folder: '',
				response: '<h1>Not Found</h1>',
				status: 404,
			},

			{
				name: '/Success',
				folder: '',
				response: '<h1>Yes, you can 🔥</h1>',
				status: 200,
			},
		],
	};

	// Save default prefab
	fs.writeJSON(
		path.join(dataDir, 'prefabs') + '/' + name + '.json',
		defaultPrefab,
	);
}

// eslint-disable-next-line valid-jsdoc
/**
 * Logging Prefab Item
 * @param paths Prefab Endpoints
 * @param port Port to be used
 */
async function logPrefab(paths: endpoint[], port: number) {
	// Log this
	console.log(`
	----------------------------			
	| ${chalk.blue('⚡️ THE SERVER IS READY ⚡️')}|
	----------------------------

  🌐 ${chalk.bold('HOSTS')} 

    -> Server is running at:
	-> http://localhost:${port}
	-> http://${ip.address()}:${port} 

  🚩 ${chalk.bold('ENDPOINTS')} ->	
	`);

	for (const i of paths) {
		console.log(`      -> http://localhost:${port}${i.name}`);
	}
}
