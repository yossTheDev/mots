import { Command } from '@oclif/core';

export default class DataDir extends Command {
	static description = 'Configuration of mots';

	/* static examples = [
		`<%= config.bin %> <%= command.id %>
/home/USER/.local/share/mserv
`,
	]; */

	static flags = {};

	static args = [];

	async run(): Promise<void> {
		this.log('Write help to show all available commands');
	}
}
