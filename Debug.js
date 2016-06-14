module.exports =  class Debug {
   
    /**
     * Instantiate the Debug class and apply the wrapper functions to classes to measure timings
     * 
     * @constructor
     * @this {Debug}
     */ 
    constructor() {
        this.ACTIVE = true;
        this.MODULES = {
            ROOM:           true,
            ROOMPOSITION:   true,
        };
        this.REPORT_INTERVALL = 1000;
        
        console.log("apply warp");
        if (this.ACTIVE) {
            Memory.timer = Memory.timer || {};
            var methods = [];
            if (this.MODULES.ROOM) {
                methods = Object.getOwnPropertyNames(Room.prototype).filter(function (p) {
                    return typeof Room.prototype[p] === 'function' && p != 'constructor' && p != 'toString' && p != 'toJSON';
                });
                console.log('adding methods: ' + JSON.stringify(methods));
                for (var i in methods) this.wrapTimer('Room', Room, methods[i]);
            }
            if (this.MODULES.ROOMPOSITION) {
                methods = Object.getOwnPropertyNames(RoomPosition.prototype).filter(function (p) {
                    return typeof RoomPosition.prototype[p] === 'function' && p != 'constructor' && p != 'toString' && p != 'toJSON';
                });
                console.log('adding methods: ' + JSON.stringify(methods));
                for (var i in methods) this.wrapTimer('RoomPosition', RoomPosition, methods[i]);
            }
            
        }
    }
    
    /**
     * wrap function of class c
     * 
     * @param {String} class name
     * @param {Object} class object
     * @param {String} method name
     */
    wrapTimer (className, c, method) {
        var timer = Memory.timer[className + '.' + method] || { usage: 0, count: 0 };
        Memory.timer[className + '.' + method] = timer;
    
        var f = c.prototype[method];
        c.prototype[method] = function() {
            var startTime   = Game.cpu.getUsed();
            var returnValue = f.apply(this, arguments);
            timer.usage     += Game.cpu.getUsed() - startTime;
            ++ timer.count;
            return returnValue;
        };
    }
    
    /**
     * report the measured data to console and email
     */
    report(){
        if (this.ACTIVE && Game.time % this.REPORT_INTERVALL === 0) {
            var summary = 0;
            for (var n in Memory.timer) {
                var p = Memory.timer[n];
                if (p.count === 0) {
                    p.average = 0;
                    continue;
                }
                p.average = p.usage / p.count;
                summary += p.average;
            }
            var msg;
            for (var n in Memory.timer) {
                var timer = Memory.timer[n];
                msg = n + ': ' + timer.usage.toFixed(2) + '/' + timer.count + ' == ' + timer.average.toFixed(2)
                            + ' (' + (timer.average * 100 / summary).toFixed(2) + '%)';
                console.log(msg);
                Game.notify(msg, 1);
            }
            msg = '--- ' + summary.toFixed(2);
            console.log(msg);
            Game.notify(msg, 1);
        }
    }
    
};
