// eslint-disable-next-line node/no-extraneous-import
import * as fs from 'fs-extra';
import { Express } from 'express';
import express = require('express');
import path = require('path');
import * as ip from 'ip';
import chalk from 'chalk';
import cors = require('cors');
import url from 'node:url';
import { Server } from 'node:http';

// #region
interface prefab {
	port: number;
	paths: endpoint[];
	cors: boolean;
}
interface endpoint {
	name: string;
	params?: param[];
	folder: string;
	status: number;
	type?: string;
	errorResponse?: string;
	response: string;
}
interface param {
	name: string;
	default: any;
	isRequired: boolean;
}
// #endregion

// eslint-disable-next-line valid-jsdoc
/**
 * Get Prefab Item
 * @param dataDir MOTS data dir
 * @param prefab  Prefab Name
 */
export async function getPrefab(
	dataDir: string,
	prefab: string,
): Promise<Server> {
	// Read Prefab File
	const prefabItem = (await fs.readJson(
		`${dataDir}/prefabs/${prefab}.json`,
	)) as prefab;

	// Create Express app
	const app: Express = express();
	const port = prefabItem.port;

	// Verify is CORS is used
	if (prefabItem.cors) {
		app.use(cors());
	}

	// Get all paths and serve Prefab item
	for (const path of prefabItem.paths) {
		// If folder property is provided, serve this folder
		if (path.folder) {
			// if folder property contains spacial varialbles
			// like $DATADIR, replace this
			if (path.folder.includes('$DATADIR')) {
				// Serve static folder
				app.use(express.static(path.folder.replace('$DATADIR', dataDir)));
			} else {
				// Serve static folder
				app.use(express.static(path.folder));
			}
		}

		// Create get endpoint
		app.get(`${path.name}/` || '/', (req, res) => {
			let response = path.response;

			if (path.params) {
				for (const param of path.params) {
					// Get parameter from url
					const resParam = url.parse(req.url, true).query[param.name];

					// Verify if this parameter is required
					if (param.isRequired) {
						if (resParam) {
							// If the parameter is reuired and te user submits it
							response = parseParamsInResponse(
								param.name,
								resParam as string,
								response,
							);
						} else {
							console.log();
							// If the parameter is required, but is not sent but has a default value
							// eslint-disable-next-line max-depth
							if (param.default) {
								response = parseParamsInResponse(
									param.name,
									param.default,
									response,
								);
							} else {
								// Parameter not send and not has a default value
								return res.status(path.status || 200).send(path.errorResponse);
							}
						}
					} else {
						// If the user does not send the parameter but has a default value,
						// this is taken as if it was the parameter sent by the user

						// Optional sended parameter
						response = resParam
							? parseParamsInResponse(param.name, resParam as string, response)
							: parseParamsInResponse(param.name, param.default, response);
					}
				}
			}

			if (path.type === 'redirect') {
				res.status(path.status || 200).redirect(response);
			} else {
				res.status(path.status || 200).send(response);
			}
		});
	}

	// App listen
	const server = app.listen(port);

	// Logging
	logPrefab(prefabItem.paths, port);

	return server;
}

// eslint-disable-next-line valid-jsdoc
/**
 *  Serve prefabs locally
 * @param dataDir Mots data dir
 * @param prefab Name of the prefab to be hosted
 *
 */
export async function servePrefab(
	dataDir: string,
	prefab: string,
): Promise<void> {
	// Get prefabs folder or create it
	fs.mkdirSync(`${dataDir}/prefabs`, { recursive: true });

	// Get all files in the folder
	const files = fs.readdirSync(path.join(dataDir, 'prefabs'));

	for (const item of files) {
		if (
			path.extname(item) === '.json' &&
			path.basename(item) === prefab + '.json'
		) {
			// Serve Prefab item
			// eslint-disable-next-line no-await-in-loop
			let app = await getPrefab(dataDir, prefab);

			fs.watchFile(`${dataDir}/prefabs/${prefab}.json`, async () => {
				// Notify Reloading
				console.log(`
				⚡️ ${chalk.bold('RELOADING SERVER')} ⚡️`);

				// Close previous server
				app.close();

				// Start new server
				app = await getPrefab(dataDir, prefab);
			});
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
		cors: true,
		paths: [
			{
				name: '',
				folder: '',
				response:
					'<h1>MOTS loves you $USER</h1><h2>Add ?user=[ANY] to url to change the bear for a name or anything else</h2>',
				params: [{ name: 'user', default: '🐼', isRequired: false }],
				status: 200,
			},
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

/**
 * Replace the value of the parameters in the response
 * Ex:
 * <h1>$ID</h1>
 * The $ID keyword will be replaced by the value that user has sent for the parameter
 * @param param Parameter name
 * @param value Value to replace
 * @param response Response
 * @returns Returns the answer with the parameters replaced
 */
function parseParamsInResponse(
	param: string,
	value: string,
	response: string,
): string {
	return response.replace(`$${param.toUpperCase()}`, value);
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
	| ${chalk.bold(chalk.blue('⚡️ THE SERVER IS READY ⚡️'))}|
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
