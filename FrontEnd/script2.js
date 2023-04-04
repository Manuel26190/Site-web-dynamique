let dataTable2 = [];


fetch('http://localhost:5678/api/works')
    .then(res => res.json ())
    .then(function (values) {
        //console.log ('values', values)
        values.forEach(function (element) {
            dataTable2.push(element); //je veux stocker dans un tableau la data retournée             
        });
    });

    
//console.log('dataTable 2', dataTable2)
//console.log('dataTable2 ligne 1 ', dataTable2)


