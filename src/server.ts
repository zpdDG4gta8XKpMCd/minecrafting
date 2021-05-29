var system = server.registerSystem(0, 0);

var { chat, dump } = essentials(system);

system.initialize = function () {

    enableLogging(system);
    system.listenForEvent('minecraft:block_destruction_started', e => {
        const { data: { player, block_position } } = e;

        const handContainer = system.getComponent(player, 'minecraft:hand_container');
        const [hand, offhand] = handContainer.data;
        if (hand.item == 'minecraft:undefined') {
            bore(player);
        } else {
            const tnt = system.createEntity('entity', 'minecraft:tnt');
            const explode = system.getComponent(tnt, 'minecraft:explode');
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



function bore(player: McEntity): void {
    const playerPosition = system.getComponent(player, components.position);
    const rotation = system.getComponent(player, components.rotation);
    // dump(system, rotation);
    const azimuth = rotation.data.y / 180 * Math.PI;
    const elevation = rotation.data.x / 180 * Math.PI;
    const distance = 50;

    const { x, y, z } = playerPosition.data;

    const dx = Math.sin(-azimuth);
    const dz = Math.cos(azimuth);
    const dy = Math.sin(-elevation);
    let at = 0;
    while (at < distance) {
        const atX = x + Math.ceil(at * dx);
        const atY = y + 1 + Math.ceil(at * dy);
        const atZ = z + Math.ceil(at * dz);
        //chat(system, `${atX} ${atY} ${atZ}`);
        system.executeCommand(`fill ${atX} ${atY} ${atZ} ${atX} ${atY} ${atZ} air`, ignore);
        at += 0.5;
    }
}

let isFirst = true;
system.update = function () {
    if (!isFirst) return;
    isFirst = false;
    chat('Hi!');
    system.executeCommand('/ability @s mayfly true', ignore);
}


