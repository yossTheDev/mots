import { Command } from '@oclif/core';
// eslint-disable-next-line node/no-extraneous-require
const colors = require('ansicolors');

export default class About extends Command {
	static description = 'Show About';

	static examples = ['<%= config.bin %> <%= command.id %>'];

	static flags = {};

	static args = [];

	public async run(): Promise<void> {
		this.log(`
        -----------------------
        |        ${colors.blue('MOTS')}         |
        |       V0.0.6        |
        -----------------------

       Make with ❤️ and Typescript
        by Yoannis Sánchez Soto

    Github -> https://github.com/yossTheDev/
    Telegram -> https://t.me/yossthedev
        `);
	}
}
