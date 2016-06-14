#### Screeps Debugger: Logging and Profiling

This is a debug module for screeps.com. You can test it with the contained main.js in a clean screeps.com-branch or including it in the own branch.

Use it in you project with:
```javascript
let Profiler = require('Profiler');
Profiler._.init();
let Logger = require('Logger');
Logger._.init();

Profiler._.report();
```

Contribute by adding code to support more classes and function. You also can add own functions to the logger and profiler with:
```javascript
Profiler._.wrap('className', class, 'method');
Logger._.wrap('className', class, 'method');
```

##### Informations

- CPU costs of report() is currently at 5.
- CPU costs of initialization (method wrapping) is currently <1.
- Activate it when measurements should be done with Debug.ACTIVE = true|false;

##### Adjustments

To only debug own defined methods add the following to Profiler.init() - similar to Logger.

```javascript
    Logger._.wrap(Room, 'lookAt');
    Profiler._.wrap(Room, 'lookAt');
    Profiler._.wrap(Room, 'lookFor');
    Profiler._.wrap(Room, 'lookForAt');
    Profiler._.wrap(Room, 'lookForAtArea');
    Profiler._.wrap(Room, 'find');
    Profiler._.wrap(Room, 'findPath');
    Profiler._.wrap(RoomPosition, 'isNearTo');
    Profiler._.wrap(RoomPosition, 'findPathTo');
    Profiler._.wrap(RoomPosition, 'isEqualTo');
    Profiler._.wrap(RoomPosition, 'findClosestByPath');
    Profiler._.wrap(RoomPosition, 'findClosestByDistance');
    Profiler._.wrap(Creep, 'moveByPath');
    Profiler._.wrap(Creep, 'moveTo');
    Profiler._.wrap(Creep, 'movePredefined');
    Profiler._.wrap(Creep, 'pickup');
    Profiler._.wrap(Creep, 'build');
    Profiler._.wrap(Creep, 'repair');
    Profiler._.wrap(Creep, 'harvest');
    Profiler._.wrap(Creep, 'upgradeController');
    Profiler._.wrap(Spawn, 'createCreep');
    Profiler._.wrap(Spawn, 'spawn');
```
