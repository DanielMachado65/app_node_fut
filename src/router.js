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
        else {
            res.status(200).json({ data: response.data })
        }
    } else {
        res.status(404).json({ msg: 'Dados obrigatórios não preenchidos [name, species, house]' })
    }
})

routes.put('/times/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400).json({ msg: 'não é númerico' })
    } else {
        const id = req.params.id;
        const time = DB.times.find((c) => c.id == id);

        if (time != undefined) {
            let { name, city, state, serie, titles, payment_check } = req.body

            // HACK: poderia ser feito com o outra modo    
            if (name != undefined) time.name = name;
            if (city != undefined) time.city = city;
            if (state != undefined) time.state = state;
            if (payment_check != undefined) time.payment_check = payment_check;

            if (serie != undefined) {
                serie = isValidSerie(serie)
                if(serie) time.serie = serie 
                else return res.status(404).json({ error: 'Serie não é valida'})
            }
            if (titles != undefined) {
                titles = isValidTitle(titles)

                console.log(titles);
                if(titles.length > 0) time.titles = titles
                else return res.status(404).json({ error: 'Titulo não é valida'})
            }
            
            res.status(200).json({ msg: time });
        } else {
            res.status(404).json({ msg: "Time não encontrado" })
        }
    }
})

routes.delete('/times/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400).json({ msg: 'não é númerico' })
    } else {
        const id = parseInt(req.params.id);
        let index = DB.times.findIndex(t => t.id == id);

        if (index == -1) res.status(404).json({ msg: 'Time não encontrado' })
        else {
            DB.times.splice(index, 1);
            res.status(200).json({ msg: 'Time removido com sucesso' })
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
        return { data: DB.times[DB.times.length - 1], code: 200 }
    }
}

function isValidSerie(serie) {
    return ["A", "B", "C", ""].includes(serie) ? serie : null
}

function isValidTitle(titles) {
    return titles.filter(f => ["nacional", "internacional", "estadual"].includes(f.type))
}

module.exports = routes;