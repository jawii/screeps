var roleUpgrader = {
  collectResources: function (creep) {
    var sources = creep.room.find(FIND_SOURCES);
    // TODO Select nearest resource
    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[0]);
    }
  },

  goToUpgradeController: function (creep) {
    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller);
    }
  },

  /** @param {Creep} creep **/
  run: function (creep) {
    //const capacity = creep.store.getCapacity();
    const freeCapacity = creep.store.getFreeCapacity();
    const resourceNow = creep.store[RESOURCE_ENERGY];

    if (resourceNow == 0 || creep.memory["collecting"]) {
      creep.memory["collecting"] = true;
      this.collectResources(creep);

      if (freeCapacity == 0) {
        creep.memory["collecting"] = false;
      }
      return;
    }

    if (resourceNow) {
      this.goToUpgradeController(creep);
    }
  },
};

module.exports = roleUpgrader;
