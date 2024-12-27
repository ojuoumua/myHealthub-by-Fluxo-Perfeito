// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Local Variables
    var self = this;
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    
    //--- User
    self.isLogged = ko.observable('');
    self.email = ko.observable('');
    self.fullName = ko.observable('');
    self.history = ko.observableArray([])
    self.vaccines = ko.observableArray([])
    
    //--- Page Events
    self.activate = function () {
        const user = JSON.parse(localStorage.currentUser);
        self.email(user.email);
        self.isLogged(user.isLogged);
        self.fullName(user.fullName);
        
        self.history(JSON.parse(localStorage.histories)[self.email()]);
        self.vaccines(JSON.parse(localStorage.vaccines)[self.email()]);
        
    };

    function sleep(milliseconds) {
        const start = Date.now();
        while (Date.now() - start < milliseconds);
    }
    //--- start ....
    self.activate();
    console.log("VM initialized!");
};

function loadHistory() {
    const histories = {
        'vhc@gmail.com': [
            {
              "data": "2023-01-15",
              "descricao": "Consulta de rotina",
              "medico": "Dr. Silva",
              "estabelecimento": "Hospital ABC"
            },
            {
              "data": "2023-03-10",
              "descricao": "Exame de sangue",
              "medico": "Laboratório XYZ",
              "estabelecimento": "Laboratório XYZ"
            },
            {
              "data": "2023-06-20",
              "descricao": "Vacina contra gripe",
              "medico": "Enfermeira Maria",
              "estabelecimento": "Clínica Saúde"
            },
            {
              "data": "2023-08-05",
              "descricao": "Consulta cardiológica",
              "medico": "Dr. João Mendes",
              "estabelecimento": "Hospital Coração"
            },
            {
              "data": "2023-09-12",
              "descricao": "Exame de imagem (Raio-X)",
              "medico": null,
              "estabelecimento": "Clínica Diagnóstica"
            }
        ],
        'abo@gmail.com': [
            {
              "data": "2023-02-20",
              "descricao": "Consulta dermatológica",
              "medico": "Dra. Oliveira",
              "estabelecimento": "Clínica Dermatológica"
            },
            {
              "data": "2023-04-15",
              "descricao": "Exame de sangue",
              "medico": "Laboratório XYZ",
              "estabelecimento": "Laboratório XYZ"
            },
            {
              "data": "2023-07-10",
              "descricao": "Vacina contra COVID-19",
              "medico": "Enfermeira Maria",
              "estabelecimento": "Clínica Saúde"
            }
        ]
                  
    }
    localStorage.setItem('histories', JSON.stringify(histories))
}

function loadVaccines() {
    const vaccines = {
        'vhc@gmail.com': [
            {
              "vacina": "Gripe",
              "dataAplicacao": "2023-01-10",
              "proximaDose": "2024-01-10"
            },
            {
              "vacina": "COVID-19 (Pfizer)",
              "dataAplicacao": "2023-06-15",
              "proximaDose": null
            },
            {
              "vacina": "Hepatite B",
              "dataAplicacao": "2022-11-20",
              "proximaDose": null
            },
            {
              "vacina": "Tétano",
              "dataAplicacao": "2019-05-12",
              "proximaDose": null
            }
        ],
        'abo@gmail.com': [
            {
              "vacina": "COVID-19 (Pfizer)",
              "dataAplicacao": "2023-07-10",
              "proximaDose": null
            },
            {
              "vacina": "Hepatite B",
              "dataAplicacao": "2022-11-20",
              "proximaDose": null
            },
            {
              "vacina": "Tétano",
              "dataAplicacao": "2019-05-12",
              "proximaDose": null
            }
        ]
                 
    }
    localStorage.setItem('vaccines', JSON.stringify(vaccines))
}

$(document).ready(function () {
    if (JSON.parse(localStorage.currentUser).role != 'utente') { window.location.replace('index.html') }
    loadHistory();
    loadVaccines();
    ko.applyBindings(new vm());
})