function enableLogging(system: McSystem): void {
    const event = system.createEventData('minecraft:script_logger_config');
    event.data.log_errors = true;
    event.data.log_information = true;
    event.data.log_warnings = true;
    system.broadcastEvent('minecraft:script_logger_config', event);
}

function essentials(system: McSystem) {
    function dump(obj: unknown): void {
        const event = system.createEventData('minecraft:display_chat_event');
        event.data.message = JSON.stringify(obj);
        system.broadcastEvent('minecraft:display_chat_event', event);
    }
    function chat(message: string): void {
        const event = system.createEventData('minecraft:display_chat_event');
        event.data.message = message;
        system.broadcastEvent('minecraft:display_chat_event', event);
    }
    return { dump, chat };
}
function ignore(): void { }

const components = {
    position: 'minecraft:position',
    rotation: 'minecraft:rotation',
} as const;