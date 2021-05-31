const express = require('express');
const routes = express.Router();

// Db
const DB = require('./database');

routes.get('/times', (req, res) => {
    res.status(200).json(DB.times);
})

routes.get('/times/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        // não é um número
        res.sendStatus(400);
    } else {
        const id = parseInt(req.params.id);
        const character = DB.times.find((c) => c.id == id);

        if (character != undefined) {
            res.status(200).json(character);
        } else {
            res.status(404).json({ msg: "not found" })
        }
    }
})

routes.post('/times', (req, res) => {
    const {
        name,
        species,
        house,
        ancestry,
        wand,
        hogwartsStudent,
        hogwartsStaff,
    } = req.body

    if ((name && species && house) != undefined) {
        const id = DB.times.length + 1;
        DB.times.push({
            name, species, id, species, house, ancestry, wand,
            hogwartsStudent, hogwartsStaff
        })
        res.status(200).json({ msg: 'personagem incluido com sucesso' })
    } else {
        res.status(404).json({ msg: 'Dados obrigatórios não preenchidos [name, species, house]' })
    }
})

routes.put('/times/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400).json({ msg: 'não é númerico' })
    } else {
        const id = req.params.id;
        const character = DB.times.find((c) => c.id == id);

        if (character != undefined) {
            const {
                name,
                species,
                house,
                ancestry,
                wand,
                hogwartsStudent,
                hogwartsStaff,
            } = req.body

            // HACK: poderia ser feito com o outra modo    
            if (name != undefined) character.name = name;
            if (species != undefined) character.species = species;
            if (house != undefined) character.house = house;
            if (ancestry != undefined) character.ancestry = ancestry;
            if (wand != undefined) character.wand = wand;
            if (hogwartsStaff != undefined) character.hogwartsStaff;
            if (hogwartsStudent != undefined) character.hogwartsStudent;

            res.status(200).json({ msg: 'update' });
        } else {
            res.status(404).json({ msg: "not found" })
        }
    }
})

routes.delete('/times/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400).json({ msg: 'não é númerico' })
    } else {
        const id = parseInt(req.params.id);
        const index = DB.times.findIndex(c => c.id == id);
        if (index = -1) res.status(404).json({ msg: 'Person not found' })
        else {
            DB.times.splice(index, 1);
            res.status(200).json({ msg: 'Personagem removido com sucesso' })
        }
    }
})

module.exports = routes;