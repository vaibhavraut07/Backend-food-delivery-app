module.exports = (sequelize, DataTypes) => {
    const Pricing = sequelize.define('Pricing', {
      zone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      baseDistanceInKm: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      kmPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      fixPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    }, {});
  
    Pricing.associate = function (models) {
      Pricing.belongsTo(models.Organization, {
        foreignKey: 'organizationId',
        as: 'organization',
      });
      Pricing.belongsTo(models.Item, {
        foreignKey: 'itemId',
        as: 'item',
      });
    };
  
    return Pricing;
  };