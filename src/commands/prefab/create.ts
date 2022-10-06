import { Command } from '@oclif/core';
import path from 'node:path';
import { createDefaultPrefab } from '../../services/prefabs';

export default class Prefabs extends Command {
	static description =
		'Create a new prefab with the default structure in the Prefabs folder';

	static examples = ['<%= config.bin %> <%= command.id %>'];

	static flags = {};

	static args = [
		{
			name: 'prefab',
			description: 'Name of Prefab to be created',
			required: true,
		},
	];

	public async run(): Promise<void> {
		const { args } = await this.parse(Prefabs);

		await createDefaultPrefab(args.prefab, this.config.dataDir);

		this.log(
			`💾 Prefab Saved in ${path.join(this.config.dataDir, 'prefabs')}/${
				args.prefab
			}.json`,
		);
	}
}
