var roleBuilder = {
  buildHighestProgress(creep, targets) {
    // Choose target which has highest progress
    var finalTarget = targets[0];
    for (var target in targets) {
      if (target.progress >= finalTarget) {
        finalTarget = target;
      }
    }

    if (creep.build(finalTarget) == ERR_NOT_IN_RANGE) {
      creep.moveTo(finalTarget, { visualizePathStyle: { stroke: "#ffffff" } });
    }
  },

  /** @param {Creep} creep **/
  run: function (creep) {
    if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.building = false;
      //creep.say('Harvest');
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
      creep.memory.building = true;
      //creep.say('Build');
    }

    if (creep.memory.building) {
      var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if (targets.length) {
        this.buildHighestProgress(creep, targets);
      }
    } else {
      let sourcesClose = creep.pos.findClosestByRange(FIND_SOURCES);

      /*
            let sources = creep.room.find(FIND_SOURCES)
            let least = sources[0]
            for (var i = 0; i < sources.length; i++) {
                console.log(sources[i].pos)
                for (
                
            }
            */

      if (creep.harvest(sourcesClose) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sourcesClose, {
          visualizePathStyle: { stroke: "#ffaa00" },
        });
      }
    }
  },
};

module.exports = roleBuilder;
