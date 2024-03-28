module.exports = (sequelize, DataTypes) => {
    const Organization = sequelize.define('Organization', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {});
  
    Organization.associate = function (models) {
      Organization.hasMany(models.Pricing, {
        foreignKey: 'organizationId',
        as: 'pricings',
      });
    };
  
    return Organization;
  };