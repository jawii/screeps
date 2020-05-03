var roleHarvester = {
  run: (creep) => {
    const spawn = Game.spawns["Spawn1"];

    if (creep.store.getFreeCapacity() > 0) {
      let sourcesClose = creep.pos.findClosestByRange(FIND_SOURCES);
      if (creep.harvest(sourcesClose) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sourcesClose, {
          visualizePathStyle: { stroke: "#ffaa00" },
        });
      }
    } else {
      var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (
            (structure.structureType == STRUCTURE_EXTENSION ||
              structure.structureType == STRUCTURE_SPAWN) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          );
        },
      });

      if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], {
            visualizePathStyle: { stroke: "#ffffff" },
          });
        }
      }
    }
  },
};

module.exports = roleHarvester;
