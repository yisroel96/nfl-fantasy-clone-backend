'use strict';
module.exports = (sequelize, DataTypes) => {
  const player = sequelize.define('player', {
    fname: DataTypes.STRING
  }, {});
  player.associate = function(models) {
    // associations can be defined here
  };
  return player;
};