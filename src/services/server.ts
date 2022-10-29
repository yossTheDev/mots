import { Express } from 'express';
import express = require('express');
import { mkdirSync } from 'node:fs';
import cors = require('cors');
import { getConfig } from './config';
import * as ip from 'ip';
import chalk from 'chalk';

export async function server(
	dataDir: string,
	folder: string,
	port: string | number,
): Promise<string | number> {
	// Verify if Public directory exists
	mkdirSync(`${dataDir}/public/`, { recursive: true });

	// Create express app
	const app: Express = express();
	if (!port) port = process.env.PORT || (await getConfig(dataDir)).defaultPort;

	// Configs
	app.set('port', port);
	app.set('json spaces', 2);

	// Middlewares
	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());

	if ((await getConfig(dataDir)).cors) app.use(cors());

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
	} else {
		app.use(express.static(`${dataDir}/public/`));
	}

	// Server Inicialization
	app.listen(port);

	return port;
}

export async function logServer(
	dataDir: string,
	folder: string,
	port: string | number,
): Promise<void> {
	// Log this
	console.log(`
	----------------------------			
	| ${chalk.bold(chalk.blue('⚡️ THE SERVER IS READY ⚡️'))}|
	----------------------------

  🌐 ${chalk.bold('HOSTS')} 
	-> Server is running at:
	-> http://localhost:${port}
	-> http://${ip.address()}:${port} 
	`);

	if (folder) {
		if (folder.includes(',')) {
			const f = (folder as string).split(',');
			console.log(`  📁 ${chalk.bold('FOLDERS')}:'`);
			for (const i of f) console.log(`     -> 📁 ${i}`);
		} else {
			console.log(`  📁 ${chalk.bold('FOLDERS')} -> ${folder}`);
		}
	} else {
		console.log(`  📁 ${chalk.bold('FOLDERS')} -> ${dataDir}/public/`);
	}
}
