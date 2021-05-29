var system = client.registerSystem(0, 0);
var _a = essentials(system), chat = _a.chat, dump = _a.dump;
system.initialize = function () {
    enableLogging(system);
    system.listenForEvent('minecraft:hit_result_changed', function (e) {
        // chat(JSON.stringify(e));
    });
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
function essentials(system) {
    function dump(obj) {
        var event = system.createEventData('minecraft:display_chat_event');
        event.data.message = JSON.stringify(obj);
        system.broadcastEvent('minecraft:display_chat_event', event);
    }
    function chat(message) {
        var event = system.createEventData('minecraft:display_chat_event');
        event.data.message = message;
        system.broadcastEvent('minecraft:display_chat_event', event);
    }
    return { dump: dump, chat: chat };
}
function ignore() { }
var components = {
    position: 'minecraft:position',
    rotation: 'minecraft:rotation'
};
