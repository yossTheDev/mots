import { Command } from '@oclif/core';
import { servePrefab } from '../../services/prefabs';

export default class Prefabs extends Command {
	static description =
		'Host Prefabs locally. Prefabs are Json files that contains the structure of an API';

	static examples = ['<%= config.bin %> <%= command.id %>'];

	static flags = {};

	static args = [
		{
			name: 'prefab',
			description: 'Prefab to be hosted',
			required: true,
		},
	];

	public async run(): Promise<void> {
		const { args } = await this.parse(Prefabs);

		/* if (!(await serverdPrefab(this.config.dataDir, args.prefab))) {
			this.error('Incorrect Prefab Name');
		} */

		await servePrefab(this.config.dataDir, args.prefab);
	}
}
