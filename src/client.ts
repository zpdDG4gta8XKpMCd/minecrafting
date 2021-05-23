var system = client.registerSystem(0, 0);
system.initialize = function () {

    client.log('i am server');
    enableLogging(system);
};
system.update = function () {
}
