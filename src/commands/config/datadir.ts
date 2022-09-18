import { Command } from '@oclif/core';

export default class Datadfir extends Command {
	static description = 'Show default hosted folder';

	static examples = [
		`<%= config.bin %> <%= command.id %>
/home/USER/.local/share/mserv
`,
	];

	static flags = {};

	static args = [];

	async run(): Promise<void> {
		this.log(`📁${this.config.dataDir}/public`);
	}
}
