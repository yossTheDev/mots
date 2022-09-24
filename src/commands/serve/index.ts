import { Command, Flags } from '@oclif/core';
import { Server } from '../../services/server';
import colors = require('ansicolors');

export default class Serve extends Command {
	static description = 'Initialize Server';

	static examples = [
		`<%= config.bin %> <%= command.id %> path/to/folder -p 8080
		`,
	];

	static flags = {
		port: Flags.integer({
			char: 'p',
			description:
				'App PORT Ex:8080. If this is not defined default port has to be used (4000)',
			required: false,
		}),
	};

	static args = [
		{
			name: 'folder',
			description:
				'(Optional) Folder to be hosted. If it is not provide default Public folder is served, write config datadir to show the default public directory location',
			required: false,
		},
	];

	async run(): Promise<void> {
		const { args, flags } = await this.parse(Serve);

		// Initialize server and get the app port
		const port = await Server.init(
			this.config.dataDir,
			args.folder,
			flags.port,
		);

		// Log this
		console.log(`
		----------------------------			
		| ${colors.blue('⚡️ THE SERVER IS READY ⚡️')} |
		----------------------------

🌐 HOST -> Server is running at http://localhost:${port}
		`);

		if (args.folder) {
			this.log(`📁 FOLDERS -> ${args.folder}`);
		} else {
			this.log(`📁 FOLDERS-> ${this.config.dataDir}/public/`);
		}
	}
}
