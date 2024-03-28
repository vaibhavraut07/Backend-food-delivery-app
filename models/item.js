module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('Item', {
      type: {
        type: DataTypes.ENUM('perishable', 'non-perishable'),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {});
  
    Item.associate = function (models) {
      Item.hasMany(models.Pricing, {
        foreignKey: 'itemId',
        as: 'pricings',
      });
    };
  
    return Item;
  };