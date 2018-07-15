var crypto = require('crypto');
var dbi = require('./database.js');


//dbi.update_last_login("sorin.badea@gmail.com");
dbi.find_all_users(dbi.do_get_all_users);


//var result = hash.crypt_password('sorin', hash.do_crypt_password);
//console.log(result);

//this.salt = crypto.randomBytes(16).toString('hex');
//var pass = crypto.pbkdf2Sync('abcd', this.salt, 1000, 64, `sha512`).toString(`hex`);
//console.log(pass)
//dbi.insert_a_user(dbi.do_insert_a_user,'liviu.dragnea@gmail.com','Liviu','Dragnea',pass);

/*
 * instanciate the promise object
var p1 = new Promise(
   function(resolve, reject) {
         var res = dbi.find_an_email(dbi.do_find_an_email,'sorin.badea@gmail.com');
         resolve(res);
   });

p1.then(
//promise kept
   function(res){
     console.log(res);
   }).catch(
//Ups...
   function(){
      console.log('Upsss...')
   }
);*/


