var system = client.registerSystem(0, 0);
var {chat, dump} = essentials(system);

system.initialize = function () {

    enableLogging(system);
    
    system.listenForEvent('minecraft:hit_result_changed', e => {
        // chat(JSON.stringify(e));
    }); 
};

system.update = function () {
}
