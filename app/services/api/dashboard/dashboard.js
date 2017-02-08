angular.module('dashboard.service', [])
    .factory('dashboardService', ['$http', dashboardService]);



function dashboardService($http) {
    var service = {};

    service.getUserList = getUserList;

    return service;

    function getUserList() {
        var userList = {};

        return userList = {
            "userDetails": [{
                "id": 1,
                "fname": "Wasim",
                "lname": "Sayyed",
                "gender": "male",
                "email": "wasim.sayyed@cuelogic.com",
                "password": "wasim@123",
                "department": "Developer",
                "salary": 1000,
                "image": "http://cache4.asset-cache.net/fk/176794537.jpg?v=1&c=IWSAsset&k=1&f=2&d=4575EEE0F3AA8377CD9D0036C287379E479DFF9E20496F56146E8D247CE15381"
            }, {
                "id": 3,
                "fname": "Bobo",
                "lname": "Jonson",
                "gender": "female",
                "email": "bobo.com",
                "password": "bobo@123",
                "department": "Project manager",
                "salary": 100000,
                "image": "resource/images/textures-selection-nice-high-resolution_2165080.jpg"
            }, {
                "id": 4,
                "fname": "Baby",
                "lname": "Watson",
                "gender": "female",
                "email": "baby@cuelogic.com",
                "password": "baby@123",
                "department": "developer",
                "salary": 2000,
                "image": "resource/images/404.png"
            }, {
                "id": 5,
                "fname": "Nilesh",
                "lname": "Jamdar",
                "gender": "male",
                "email": "nilesh@cuelogic.com",
                "password": "nilesh@123",
                "department": "Designer",
                "salary": 5500,
                "image": "resource/images/6309_1280x800.jpg"
            }, {
                "id": 6,
                "fname": "amol",
                "lname": "Khamankar",
                "gender": "male",
                "email": "amol@cuelogic.com",
                "password": "amol@123",
                "department": "Manager",
                "salary": 100500,
                "image": "resource/images/brand-avatar.jpg"
            }, {
                "id": 7,
                "fname": "ganesh",
                "lname": "Joshi",
                "gender": "male",
                "email": "ganesh@cuelogic.com",
                "password": "ganesh@123",
                "department": "Accountant",
                "salary": 1000,
                "image": "resource/images/ipgeo.png"
            }, {
                "id": 8,
                "fname": "Vaibhav",
                "lname": "Pathak",
                "gender": "male",
                "email": "vaibhav.pathak@cuelogic.com",
                "password": "12345678",
                "department": "Frontend Developer",
                "salary": 2000,
                "image": "resource/images/ipgeo.png"
            }]
        }
    }
    //END
};