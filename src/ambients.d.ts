type McEvent = any;
interface McComponent<Data = {}> {
    data: Data;
}
interface McEntity {
    __type__: string;
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
interface McSystem {
    getComponent(attacked_entity: McEntity, name: 'minecraft:position'): McComponent<McPosition>;
    getComponent(attacked_entity: McEntity, name: 'minecraft:rotation'): McComponent<McRotation>;
    getComponent(attacked_entity: McEntity, name: string): McComponent;
    executeCommand(command: string, whenDone: () => void);
    createEventData(name: string): McEvent;
    broadcastEvent(name: string, event: McEvent): void;
    listenForEvent(name: 'minecraft:player_attacked_entity', handler: (e: {
        data: {
            player: McEntity;
            attacked_entity: McEntity;
        }
    }) => void);
    listenForEvent(name: 'minecraft:block_destruction_started', handler: (e: {
        data: {
            player: McEntity;
            block_position: McPosition;
        }
    }) => void);
    listenForEvent(name: string, handler: (e: any) => void);
    createComponent(entity: McEntity, name: string): McComponent;
    hasComponent(entity: McEntity, name: string): boolean;
    applyComponentChanges(entity: McEntity, component: McComponent): void;
    initialize(): void;
    update(): void;
}
interface Host {
    registerSystem(major: number, minor: number): McSystem;
    log(message: string): void;
}
declare var server: Host;
declare var client: Host;