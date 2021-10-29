const { Router } = require('express');
const router = Router();
require("dotenv").config();
const axios = require('axios');
const { API_KEY } = process.env;
const { Dog, Temperament } = require('../db.js');
const { Op } = require('sequelize')
const  API = "https://api.thedogapi.com/v1/breeds"

//============== Routes ================//

router.get('/', async (req, res, next) => {
    //Obtener un listado de las primeras 8 razas de perro
    //Debe devolver solo los datos necesarios para la ruta principal
    try {
        console.log('entreee')
        const { name } = req.query;

        if (!name) {
            let db = await Dog.findAll({
                include: {
                    model: Temperament,
                    attributes: {
                        include: ['name'],
                        exclude: ['createdAt', 'updatedAt']
                    },
                    through: {
                        attributes: []
                    }
                }
            });
            let api = await axios.get(`${API}?api_key=${API_KEY}`);
            console.log('entre a /Dogs')

            let response = await Promise.all([db, api])
            const [dbResponse, apiResponse] = response;
            const breeds = dbResponse.concat(apiResponse.data);

            res.send(breeds);
           
        } else {
            let db = await Dog.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}`
                    }
                },
                include: {
                    model: Temperament,
                    attributes: {
                        include: ['name'],
                        exclude: ['createdAt', 'updatedAt']
                    },
                    through: {
                        attributes: []
                    }
                }
            });
            let api = await axios.get(`${API}/search?name=${name}&api_key=${API_KEY}`);
            console.log('entre a /Dogs query')
                
            let response = await Promise.all([db, api])
            const [dbResponse, apiResponse] = response;
            const breeds = dbResponse.concat(apiResponse.data);
            breeds.length > 0 ? res.send([...breeds]) : res.send(['Breed Not Found']);
              
        }
    } catch (err) {
        res.send('Error desconocido')
    }

});

router.get('/:id', async (req, res, next) => {
    // Obtener el detalle de una raza de perro en particular
    //Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
    //Incluir los temperamentos asociados
    const { id } = req.params;
    try {
        if (id.length > 0 && id.length <= 3) {
            const api = await axios.get(`${API}/${id}&api_key={${API_KEY}}`)
            api.data.name ? res.send(api.data) : res.send('Invalid id')

        } else {
            return Dog.findByPk(id)
                .then((dbRes) => {
                    dbRes.name
                        ? res.send(dbRes)
                        : res.send('Invalid id')
                })
                .catch((err) => next(err));
        };
    } catch (err) {
        next(err)
    }
});


module.exports = router;