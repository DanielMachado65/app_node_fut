var DB = {
    times: [
        {
            "id": "1",
            "name": "Time A",
            "city": "Curitiba",
            "state": "PR",
            "serie": "A",
            "titles": [
                { type: "estadual", name: 'Titulo Intersérie' }
            ],
            "payment_check": {
                "id": "1",
                "value": '10.000'
            }
        },
        {
            "id": "2",
            "name": "Time B",
            "city": "Curitiba",
            "state": "PR",
            "serie": "A",
            "titles": [
                { type: "internacional", name: 'Titulo Intersérie' }
            ],
            "payment_check": {
                "id": "1",
                "value": '10.000'
            }
        }
    ]
}
module.exports = DB;