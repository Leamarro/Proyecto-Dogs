const { Router } = require('express');
const router = Router();
const { Dog } = require('../db.js');
const { v4: uuidv4 } = require('uuid');

router.post('/', async (req, res, next) => {
    //Recibe los datos recolectados desde el formulario controlado de la ruta 
    // de creación de raza de perro por body
    //Crea una raza de perro en la base de datos

    const { name,
        height,
        weight,
        life_span,
        image,
        temperaments } = req.body;

    console.log(req.body);
    try {
        let id = uuidv4()
        createNewDog = await Dog.create({ name, height, image, weight, life_span, id })
        await createNewDog.setTemperaments(temperaments);
    } catch (error) {
        next(error)
    };
});


module.exports = router;