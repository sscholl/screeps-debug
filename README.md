Screeps Debugger, Logger and Profiler
----

This is a debug module for screeps.com. You can test it with the main.js in a clean screeps.com-branch.

Use it in you project with:
 1. let Debug = require('Debug');
 2. var debug = new Debug();
 3. debug.report();

Contribute by adding code to support more classes. I plan to improve the module to add own methods to the profiler.

Informations
___

- CPU costs of report() is currently at 5.
- CPU costs of initialization (method wrapping) is currently <1.
- Activate it when measurements should be done with Debug.ACTIVE = true|false;

Adjustments
___

To only debug own defined methods add the following to Debug.constructor().

```javascript
    this.wrapTimer(Room, 'lookAt');
    this.wrapTimer(Room, 'lookFor');
    this.wrapTimer(Room, 'lookForAt');
    this.wrapTimer(Room, 'lookForAtArea');
    this.wrapTimer(Room, 'find');
    this.wrapTimer(Room, 'findPath');
    this.wrapTimer(RoomPosition, 'isNearTo');
    this.wrapTimer(RoomPosition, 'findPathTo');
    this.wrapTimer(RoomPosition, 'isEqualTo');
    this.wrapTimer(RoomPosition, 'findClosestByPath');
    this.wrapTimer(RoomPosition, 'findClosestByDistance');
    this.wrapTimer(Creep, 'moveByPath');
    this.wrapTimer(Creep, 'moveTo');
    this.wrapTimer(Creep, 'movePredefined');
    this.wrapTimer(Creep, 'pickup');
    this.wrapTimer(Creep, 'build');
    this.wrapTimer(Creep, 'repair');
    this.wrapTimer(Creep, 'harvest');
    this.wrapTimer(Creep, 'upgradeController');
    this.wrapTimer(Spawn, 'createCreep');
    this.wrapTimer(Spawn, 'spawn');
´´´
