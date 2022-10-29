import { Command, Flags } from '@oclif/core';
import { logServer, server } from '../../services/server';

// import chalks = require('chalk');
// const chalk = chalks.default;
// const chalk = (await import('chalk')).default;

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
		const port = await server(this.config.dataDir, args.folder, flags.port);

		// Log server
		logServer(this.config.dataDir, args.folder, port);
	}
}
