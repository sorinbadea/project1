var crypto = require('crypto');
var dbi = require('./database.js');


//dbi.update_last_login("sorin.badea@gmail.com");
//dbi.drop_collection('articles');
//

//dbi.insert_article('sorin.badea@gmail.com', 'Gabriela Firea il ataca pe Liviu Dragnea', 'Ședința maraton a conducerii PSD și cea a grupurilor parlamentare s-au încheiat. Liviu Dragnea și oamenii săi au câștigat în fața contestatarilor din partid. Dragnea a anunțat că nu va candida la președinție, iar partidul ar putea susține, în premieră, un candidat din afara PSD, respectiv pe liderul ALDE Călin Popescu Tăriceanu. Dragnea și-a impus punctul de vedere în fața Gabrielei Firea care a cerut, fără succes, demiterea ministrului de interne Carmen Dan, ca urmare a violențelor din 10 august. Firea a lansat o serie de atacuri la adresa lui Dragnea și a protejatei sale, Carmen Dan.', 'None', dbi.insert_article_done);
//dbi.insert_article('emil.kohn@gmail.com', 'None', 'None', 'None', dbi.insert_article_done);
//dbi.insert_article('mihai.dudas@yahoo.com', 'None', 'None', 'None', dbi.insert_article_done);

dbi.find_all('articles', dbi.do_display_all);

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


