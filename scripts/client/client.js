var system = client.registerSystem(0, 0);
system.initialize = function () {
    client.log('i am server');
    enableLogging(system);
};
system.update = function () {
};
function enableLogging(system) {
    var event = system.createEventData('minecraft:script_logger_config');
    event.data.log_errors = true;
    event.data.log_information = true;
    event.data.log_warnings = true;
    system.broadcastEvent('minecraft:script_logger_config', event);
}
function dump(system, obj) {
    var event = system.createEventData('minecraft:display_chat_event');
    event.data.message = JSON.stringify(obj);
    system.broadcastEvent('minecraft:display_chat_event', event);
}
function chat(system, message) {
    var event = system.createEventData('minecraft:display_chat_event');
    event.data.message = message;
    system.broadcastEvent('minecraft:display_chat_event', event);
}
function ignore() { }
var components = {
    position: 'minecraft:position',
    rotation: 'minecraft:rotation'
};
