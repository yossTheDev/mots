import { Command } from '@oclif/core';
import { Server } from '../../services/server';

export default class Serve extends Command {
	static description = 'Initialize Server';

	/* static examples = [
		`<%= config.bin %> <%= command.id %> 
		hello world! from serve (./src/commands/hello/world.ts)
		`,
	]; */

	static flags = {};

	static args = [
		{
			name: 'folder',
			description:
				'(Optional) Folder to be hosted. If it is not provide default Public folder is served, write config datadir to show the default public directory location',
			required: false,
		},
	];

	async run(): Promise<void> {
		const { args } = await this.parse(Serve);

		Server.init(this.config.dataDir, args.folder);
	}
}
