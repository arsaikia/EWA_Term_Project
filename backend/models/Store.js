import { Sequelize } from 'sequelize';
import { SQL } from '../config/db.js';
import { v4 as uuid } from 'uuid';
import Address from './Address.js';
import Products from './Product.js';

const Stores = SQL.define(
    'stores',
    {
        storeId: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: uuid(),
        },
        storeName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        // addressId: {
        //     type: Sequelize.UUID,
        //     references: {
        //         model: 'addresses',
        //         key: 'addressId',
        //     },
        // },
    },
    {
        timestamps: false,
    }
);

Stores.belongsTo(Address, {
    foreignKey: {
      name: 'addressId'
    }
  });

//Stores.belongsTo(Address)

const StoreProducts = SQL.define('storeproducts', {
    storeId: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
            model: 'stores',
            key: 'storeId',
        },
    },
    productId: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
            model: 'products',
            key: 'productId',
        },
    },
});

Stores.belongsToMany(Products, { through: StoreProducts });
Products.belongsToMany(Stores, { through: StoreProducts });



Stores.beforeCreate((stores, _) => {
    return (stores.storeId = uuid());
});

Stores.sync()
    .then(() => {
        console.log(`Stores created`.cyan.bold);
    })
    .catch((error) => console.log('ERROR', error));

StoreProducts.sync()
    .then(() => {
        console.log(`Stores created`.cyan.bold);
    })
    .catch((error) => console.log('ERROR', error));
// ----------------------------------------------------------------------------


    const Movie = SQL.define('Movie', { name: Sequelize.STRING });
    const Actor = SQL.define('Actor', { name: Sequelize.STRING });
    const ActorMovies = SQL.define('ActorMovies', {
      MovieId: {
        type: Sequelize.INTEGER,
        references: {
          model: Movie, // 'Movies' would also work
          key: 'id'
        }
      },
      ActorId: {
        type: Sequelize.INTEGER,
        references: {
          model: Actor, // 'Actors' would also work
          key: 'id'
        }
      }
    });
    Movie.belongsToMany(Actor, { through: ActorMovies });
    Actor.belongsToMany(Movie, { through: ActorMovies });

    ActorMovies.sync()
    .then(() => {
        console.log(`Stores created`.cyan.bold);
    })
    .catch((error) => console.log('ERROR', error));


export default Stores;
