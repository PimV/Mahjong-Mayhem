'use strict';


module.exports = function($q){
  var service = {};

  service.users = [
  {
    id: 'dgaeijke',
    name: 'Daniel Eijkelenboom',
    email: 'daniel@mail.com',
    nickname: 'Toshyron'
  },
  {
    id: 'pimvmla',
    name: 'Pim verlangen',
    email: 'pim@mail.com',
    nickname: 'Sire Bringo'
  },
  {
    id: 'tajreynd',
    name: 'Thomas Reynders',
    email: 'thomas@avans.nl',
    nickname: 'ninox'
  },
  {
    id: 'itsamemario',
    name: 'Super Mario',
    email: 'mario@mushroom.com',
    nickname: 'Mario'
  },
  ];

  service.add = function(obj){
    service.users.push(obj);
  }

  service.get = function(){
    return $q.when(service.users);
  }

  service.all = function(){
    return (service.users.length > 0) ? service.users : $q.when(service.users).then(function(users) { return users; });
  }

  service.remove = function(item){
    var index = service.users.indexOf(item);
    service.users.splice(index, 1);
  }

  return service;
};