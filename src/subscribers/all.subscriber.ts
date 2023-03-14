import { EventArgs, EventSubscriber } from '@mikro-orm/core';

export class AllSubscriber implements EventSubscriber {
	async afterCreate<T>(args: EventArgs<T>): Promise<void> {
		console.log(args.changeSet.type, JSON.stringify(args.changeSet.payload, null, 4));
	}
	async afterUpdate<T>(args: EventArgs<T>): Promise<void> {
		console.log(args.changeSet.type, JSON.stringify(args.changeSet.payload, null, 4));
	}
	async afterDelete<T>(args: EventArgs<T>): Promise<void> {
		console.log(args.changeSet.type, JSON.stringify(args.changeSet.payload, null, 4));
	}
}
