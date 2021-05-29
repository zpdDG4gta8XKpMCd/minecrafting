type McEvent = any;
interface McComponent<Data> {
    __type__: 'component';
    __identifier__: string;
    data: Data;
}
interface McEntity {
    __type__: 'entity';
    __identifier__: string;
    id: number;
    __unique_id__: {
        "64bit_low": number;
        "64bit_high": number;
    };
}
interface McPosition {
    x: number; y: number; z: number;
}
interface McRotation {
    x: number; y: number;
}
interface McItem {
}
interface McItemStack {
    __type__: 'item_stack';
    __identifier__: string;
    count: number;
    item: 'minecraft:undefined';
}
interface McBlockDestructionStartedEvent {
    __type__: 'event_data',
    __identifier__: 'minecraft:block_destruction_started',
    data: {
        player: McEntity;
        block_position: McPosition;
    };
}
interface McExplode {
    breaks_blocks: boolean;
    causes_fire: boolean;
    destroy_affected_by_griefing: boolean;
    fire_addected_by_griefing: boolean;
    fuse_length: {
        range_max: number;
        range_min: number;
    };
    fuse_lit: boolean;
    max_resistance: number;
    power: number;
}
interface McSystem {
    isValidEntity: never;
    getBlock: never;
    getBlocks: never;

    getComponent(attacked_entity: McEntity, name: 'minecraft:position'): McComponent<McPosition>;
    getComponent(attacked_entity: McEntity, name: 'minecraft:rotation'): McComponent<McRotation>;
    getComponent(attacked_entity: McEntity, name: 'minecraft:hand_container'): McComponent<[McItemStack, McItemStack]>;
    getComponent(entity: McEntity, name: 'minecraft:explode'): McComponent<McExplode>;
    getComponent(attacked_entity: McEntity, name: string): McComponent<unknown>;
    executeCommand(command: string, whenDone: () => void);
    createEventData(name: string): McEvent;
    broadcastEvent(name: string, event: McEvent): void;
    listenForEvent(name: 'minecraft:player_attacked_entity', handler: (e: {
        data: {
            player: McEntity;
            attacked_entity: McEntity;
        }
    }) => void);
    listenForEvent(name: 'minecraft:block_destruction_started', handler: (e: McBlockDestructionStartedEvent) => void);
    listenForEvent(name: string, handler: (e: any) => void);
    createComponent(entity: McEntity, name: string): McComponent<unknown>;
    hasComponent(entity: McEntity, name: string): boolean;
    applyComponentChanges(entity: McEntity, component: McComponent<unknown>): void;
    initialize(): void;
    update(): void;

    createEntity(type: 'entity', identifier: string): McEntity;
}
interface McHost {
    registerSystem(major: number, minor: number): McSystem;
    log(message: string): void;
    level: McLevel;
}
interface McLevel {
    __type__: 'level';
    level_id: number;
}
declare var server: McHost;
declare var client: McHost;