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
var system = server.registerSystem(0, 0);
var _a = essentials(system), chat = _a.chat, dump = _a.dump;
system.initialize = function () {
    enableLogging(system);
    system.listenForEvent('minecraft:block_destruction_started', function (e) {
        var _a = e.data, player = _a.player, block_position = _a.block_position;
        var handContainer = system.getComponent(player, 'minecraft:hand_container');
        var _b = handContainer.data, hand = _b[0], offhand = _b[1];
        if (hand.item == 'minecraft:undefined') {
            bore(player);
        }
        else {
            var tnt = system.createEntity('entity', 'minecraft:tnt');
            var explode = system.getComponent(tnt, 'minecraft:explode');
            explode.data.power = 1000;
            explode.data.fuse_length.range_max = 1;
            explode.data.fuse_length.range_min = 1;
            explode.data.causes_fire = true;
            chat(JSON.stringify(explode));
            system.applyComponentChanges(tnt, explode);
        }
        // position.data.x = x + dx;
        // position.data.z = z + dz;
        // position.data.y += 2;
        // system.applyComponentChanges(victim, position);
    });
};
function bore(player) {
    var playerPosition = system.getComponent(player, components.position);
    var rotation = system.getComponent(player, components.rotation);
    // dump(system, rotation);
    var azimuth = rotation.data.y / 180 * Math.PI;
    var elevation = rotation.data.x / 180 * Math.PI;
    var distance = 50;
    var _a = playerPosition.data, x = _a.x, y = _a.y, z = _a.z;
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
}
var isFirst = true;
system.update = function () {
    if (!isFirst)
        return;
    isFirst = false;
    chat('Hi!');
    system.executeCommand('/ability @s mayfly true', ignore);
};
