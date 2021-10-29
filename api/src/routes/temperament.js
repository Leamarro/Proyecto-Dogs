const { Router } = require('express');
const router = Router();
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Temperament } = require('../db.js');
const API = "https://api.thedogapi.com/v1/breeds/"

router.get('/', async (req, res, next) => {
    //Obtener todos los temperamentos posibles
    //En una primera instancia deberán obtenerlos desde la API externa
    //y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

    try{
        const dbRes = await Temperament.findAll()
        if(dbRes.length > 0) return res.send(dbRes.map(e => e.name));

        const apiRes = await axios.get(`${API}?api_key=${API_KEY}`)
        let arraySplit = apiRes.data.flatMap(e => e.temperament && e.temperament.split(','))

        const dataArr = new Set(arraySplit.map(strTemp => strTemp && strTemp.trim()));
        let allTemperaments = [...dataArr].filter(el => !!el );   

        await Temperament.bulkCreate(
            allTemperaments.map(temp => {return {name: temp}                       
        }));

        const dbTemperaments = await Temperament.findAll()
        res.send(dbTemperaments.map(e => e.name));

    }catch(err){
        console.log(err);
        next(err);
    }
});

module.exports = router;


