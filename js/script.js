// ViewModel KnockOut
// var vm = function () {
//     console.log('ViewModel initiated...');
//     //---Local Variables
//     var self = this;
//     self.baseUri = ko.observable('http://127.0.0.1:5500/');
//     self.displayName = 'myHealth\'ub';
//     self.Logo = 'img/Logo.png'
//     self.error = ko.observable('');
//     self.passingMessage = ko.observable('');
    
//     //--- User
//     self.isLogged = ko.observable('');
//     // self.nif = ko.observable('');
//     // self.userName = ko.observable('');
//     // self.email = ko.observable('');
//     // self.pw = ko.observable('');
    
//     //--- Page Events
//     self.activate = function () {
//         alert('HAHHAHAHA')
//         self.isLogged('false');
//         if (localStorage.currentUser) {
//             self.isLogged(localStorage.currentUser.isLogged);
//             // self.nif(localStorage.currentUser.nif);
//             // self.userName(localStorage.currentUser.userName);
//             // self.email(localStorage.currentUser.email);
//             // self.pw(localStorage.currentUser.pw);
//         }
//     };

//     function sleep(milliseconds) {
//         const start = Date.now();
//         while (Date.now() - start < milliseconds);
//     }
//     //--- start ....
//     self.activate();
//     console.log("VM initialized!");
// };

const loadUsers = () => {
    const users = [
        // { fullName: "José Bernardo Leite", healthId:"3213213", email: "jbl@gmail.com", password: "leite123", birthDate: "1991-02-08", role: "utente", phone: ""},
        // { fullName: "Ana Beatriz Oliveira", email: "abo@sns.pt", password: "sns@B0pt", role: "técnico", phone: ""}
    ];
    
    // Load users to localStorage
    if (!localStorage.users) { localStorage.setItem("users", JSON.stringify(users)) }
}

//Apply Knockout
$(document).ready(function () {
    loadUsers();
    console.log("ready!");
    // ko.applyBindings(new vm());
});
