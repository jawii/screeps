var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");
var roleBuilder = require("role.builder");

var createNewIfNeeded = (creepRole, max) => {
  var harvesters = _.filter(
    Game.creeps,
    (creep) => creep.memory.role == creepRole
  );

  if (harvesters.length < max) {
    var newName = creepRole + Game.time;
    console.log("Creating new " + creepRole);
    Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName, {
      memory: { role: creepRole },
    });
  }
};

module.exports.loop = () => {
  for (var name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log("Clearing non-existing creep memory:", name);
    }
  }

  createNewIfNeeded("harvester", 2);
  createNewIfNeeded("builder", 2);
  createNewIfNeeded("upgrader", 1);

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];

    if (creep.memory.role == "harvester") {
      roleHarvester.run(creep);
    }
    if (creep.memory.role == "upgrader") {
      roleUpgrader.run(creep);
    }
    if (creep.memory.role == "builder") {
      roleBuilder.run(creep);
    }
  }
};
