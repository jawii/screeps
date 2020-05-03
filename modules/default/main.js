var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");
var roleBuilder = require("role.builder");
var roleRepairer = require("role.repairer");

const HARVEST_TYPE = [WORK, CARRY, CARRY, MOVE, MOVE];
const UPGRADER_TYPE = [WORK, WORK, CARRY, MOVE];
const BUILDER_TYPE = [WORK, CARRY, CARRY, MOVE];
const REPAIRER_TYPE = [WORK, MOVE, MOVE, CARRY];

const createNewIfNeeded = (creepRole, max, type) => {
  var harvesters = _.filter(
    Game.creeps,
    (creep) => creep.memory.role == creepRole
  );

  if (harvesters.length < max) {
    var newName = creepRole + Game.time;
    console.log("Creating new " + creepRole);
    Game.spawns["Spawn1"].spawnCreep(type, newName, {
      memory: { role: creepRole },
    });
    return true;
  }

  return false;
};

const clearMemory = () => {
  for (var name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log("Clearing non-existing creep memory:", name);
    }
  }
};

const logNextOneDying = (creeps) => {
  var lowestTicksToLive = 4000;
  var lowestTickToLiveName = "";
  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.ticksToLive < lowestTicksToLive) {
      lowestTicksToLive = creep.ticksToLive;
      lowestTickToLiveName = creep;
    }
  }
  console.log(
    "Next one is dying: " + lowestTickToLiveName + ": " + lowestTicksToLive
  );
};

module.exports.loop = () => {
  clearMemory();
  //logNextOneDying();

  // Create new creeps. Do harvester first
  if (!createNewIfNeeded("harvester", 2, HARVEST_TYPE)) {
    createNewIfNeeded("repairer", 2, REPAIRER_TYPE);
    createNewIfNeeded("builder", 2, BUILDER_TYPE);
    createNewIfNeeded("upgrader", 2, UPGRADER_TYPE);
  }

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

    if (creep.memory.role == "repairer") {
      roleRepairer.run(creep);
    }
  }
};
