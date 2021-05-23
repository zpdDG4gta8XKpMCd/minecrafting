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
var system = server.registerSystem(0, 0);
system.initialize = function () {
    server.log('i am server');
    enableLogging(system);
    system.listenForEvent('minecraft:block_destruction_started', function (e) {
        var _a = e.data, player = _a.player, block_position = _a.block_position;
        // chat(system, 'Explosion set!!');
        // dump(system, player);
        var playerPosition = system.getComponent(player, components.position);
        var rotation = system.getComponent(player, components.rotation);
        // dump(system, rotation);
        var azimuth = rotation.data.y / 180 * Math.PI;
        var elevation = rotation.data.x / 180 * Math.PI;
        var distance = 50;
        var _b = playerPosition.data, x = _b.x, y = _b.y, z = _b.z;
        var dx = Math.sin(-azimuth);
        var dz = Math.cos(azimuth);
        var dy = Math.sin(-elevation);
        var at = 0;
        while (at < distance) {
            var atX = x + Math.ceil(at * dx);
            var atY = y + 1 + Math.ceil(at * dy);
            var atZ = z + Math.ceil(at * dz);
            //chat(system, `${atX} ${atY} ${atZ}`);
            system.executeCommand("fill " + atX + " " + atY + " " + atZ + " " + atX + " " + atY + " " + atZ + " air", ignore);
            at += 0.5;
        }
        // position.data.x = x + dx;
        // position.data.z = z + dz;
        // position.data.y += 2;
        // system.applyComponentChanges(victim, position);
    });
};
var isFirst = true;
system.update = function () {
    if (!isFirst)
        return;
    isFirst = false;
    chat(system, 'Hi!');
    system.executeCommand('/ability @s mayfly true', ignore);
};
