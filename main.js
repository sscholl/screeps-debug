let Debug = require('Debug');


module.exports.loop = function() {
    
    var debug = new Debug();

    if (Game.cpu.tickLimit < 500) {
        console.log("Execution of loop is not possible, because tick limit is " + Game.cpu.tickLimit + "<500");
        return;
    }
    
    var time = Game.cpu.getUsed();
    console.log("--> LOAD TIME " + time);
    
    console.log("    Game.cpu.limit " + Game.cpu.limit);
    console.log("    Game.cpu.tickLimit " + Game.cpu.tickLimit);
    console.log("    Game.cpu.bucket " + Game.cpu.bucket);
    
    // do someething time consuming
    for (var roomName in Game.rooms) {
        var room = Game.rooms[roomName];
        var spawn = room.find(FIND_MY_SPAWNS)[0];
        for (var i = 0; i < 2; ++i) room.findPath(spawn.pos.findClosestByPath(FIND_SOURCES).pos, spawn.pos);
    }
    
    debug.report();
    
    console.log("<-- MAIN TIME " + (Game.cpu.getUsed() - time));
}
