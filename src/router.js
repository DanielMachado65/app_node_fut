const express = require('express');
const routes = express.Router();

// Db
const DB = require('./database');

routes.get('/times', (req, res) => {
    if (req.query.name && isNaN(req.query.name)) {
        results = DB.times.filter(a => a.name.includes(req.query.name))
        if (results != undefined)
            res.status(200).json(results)
        else
            res.status(400).json({ msg: 'not found' })
    } else {
        res.status(200).json(DB.times);

    }

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
    const { name, city, state, serie, titles, payment_check } = req.body

    if ((name && city && state && serie && titles && payment_check) != undefined) {
        const id = DB.times.length + 1;
        let response = post({ ...req.body, id })

        if (response['error'])
            res.status(response.code).json({ error: response.error })
        else
            res.status(200).json({ data: response.data })
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

function post(params) {
    let { id, name, city, state, serie, titles, payment_check } = params

    serie = isValidSerie(serie)
    titles = isValidTitle(titles)

    if (serie == undefined) {
        return { code: 404, error: "a serie deverá ser: {A, B, C ou vazia}" }
    } else if (titles.length == 0) {
        return { code: 404, error: "O titulo deve ser: {estadual, internacional ou nacional" }
    } else {
        DB.times.push({ name, city, id, state, payment_check, serie, titles })
        // return last item
        return { data: DB.times[-1], code: 200 }
    }
}

function isValidSerie(serie) {
    return ["A", "B", "C", ""].includes(serie) ? serie : null
}

function isValidTitle(titles) {
    return titles.filter(f => ["nacional", "internacional", "estadual"].includes(f.type))
}

module.exports = routes;