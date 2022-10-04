// eslint-disable-next-line node/no-extraneous-import
import * as fs from 'fs-extra';
import path = require('path');

interface config {
	defaultPort: number;
	cors: boolean;
}

/**
 * Get MOTS user configuration file
 * @param dataDir MOTS data directory
 * @returns config
 */
export async function getConfig(dataDir: string): Promise<config> {
	//  Verify if Configuration File Exists
	if (!fs.existsSync(path.join(dataDir, 'config.json'))) {
		// Create new Configuration Object
		const newConfig: config = { defaultPort: 4000, cors: true };

		// Write new Configuration File
		fs.writeJSON(path.join(dataDir, 'config.json'), newConfig);
	}

	// Read Configuration File
	const userConfig = (await fs.readJSON(
		path.join(dataDir, 'config.json'),
	)) as config;

	return userConfig;
}
