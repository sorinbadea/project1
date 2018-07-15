//variables
var mongoclient=require('mongodb').MongoClient;
var url='mongodb://172.18.0.3:27017/';
var record = undefined;

//constants
const users = "users"
const db_name = "MongoDB";

/*
 * find all from "users" collection
 */
exports.find_all_users = function(callback) {
   mongoclient.connect(url, function(err,db) {
   if(err)
        throw(err);
   var dbo = db.db(db_name);
   console.log('connected');
   dbo.collection(users).find({}).toArray(function(err, record) {
      if (err) 
          throw err;
       db.close()
       callback(record)
    });
  });
};

exports.do_get_all_users = function(result) {
   console.log(result)
}

/*
 * search for a speciffic e-mail in "users" colection
 * if the user is found, verify passwords
 */
exports.auth_a_user= function(callback, email, pass, res) {
   mongoclient.connect(url, function(err,db) {
      if(err)
         throw('Big problem');
      var dbo = db.db(db_name);
      console.log("looking for:"+email);
      dbo.collection(users).find( { email:email } ).toArray(function(err, record) {
      if (err) {
          throw err;
      }
      db.close();
      if (record.length == 1) {
         callback(record, email, pass, res);
      }
      else {
         console.log('User does not exists!')
         res.render('auth_nok.ejs', {
            err_message:email });
         }
      });
   });
};

/*
 * user authentication
 */
exports.do_auth_a_user = function (record, email, pass, res) {
   var db_pass    = record[0].password;
   var first_name = record[0].firstname
   var last_name  = record[0].lastname
   var last_login = record[0].lastlogin

   if (db_pass == pass) {
      //password match, set cookies
      res.cookie('email',email);
      res.cookie('first_name',first_name);
      res.cookie('last_name',last_name);
      res.cookie('last_login',last_login);
      console.log('auth token:' + email)
      res.render('auth_ok.ejs', {fullname:first_name + ' ' + last_name, lastlogin:last_login});
      update_last_login(do_update_last_login, email);
   }
   else {
      res.render('auth_nok.ejs', {err_message:'Wrong username or password!'});
   }
}

/*
 * search an e-mail in "users" colection
 */
exports.insert_a_user= function(callback, email, first_name, last_name, pass, res) {
   mongoclient.connect(url, function(err,db) {
      if(err)
         throw(err);
      var dbo = db.db(db_name);
      console.log("looking for:"+email);
      dbo.collection(users).find( { email:email } ).toArray(function(err, record) {
          if (err) {
	      throw err;
          }
          db.close();
          if (record.length == 0) {
              callback(email, first_name, last_name, pass, res);
          }
          else {
             console.log('User already exists!')
             res.render('signup_nok.ejs', {
             err_message:first_name +' '+last_name + ' already exists' });
	 }
      });
   });
};

exports.do_insert_a_user = function(email, first_name, last_name, pass, res) {
   insert_db(email, first_name, last_name, pass, res )
}

/*
 * insert a record in "users" collection
 */
insert_db=function( email, first_name, last_name, pass, web_res ) {
    mongoclient.connect(url, function(err,db) {
        if(err)
            throw(err);
        var dbo = db.db(db_name);
        console.log('connected');
        var myobj = {email: email, 
                 firstname:first_name, 
	         lastname:last_name,
                 lastlogin: new Date(),
                 password:pass};
        dbo.collection(users).insertOne(myobj, function(err, res) {
           if (err)
              throw err;
           db.close();
           console.log("1 record created");
           //set cookies
           web_res.cookie('email',email);
           web_res.cookie('first_name',first_name);
           web_res.cookie('last_name',last_name);
           web_res.cookie('last_login',new Date());
           web_res.render('auth_ok.ejs', {fullname:first_name +' '+ last_name, lastlogin:new Date()});
      });
   });
}

/*
 Update the last login field
*/
update_last_login=function(callback, email) {
   mongoclient.connect(url, function(err,db) {
      if(err)
         throw(err);
      var dbo = db.db(db_name);
      var query = { email: email };
      var new_values = { $set: { lastlogin: new Date() } };
      dbo.collection(users).updateOne(query, new_values, (function(err, obj) {
         if (err)
             throw err;
         db.close();
         callback("last login updated")
      }));
   });
}

do_update_last_login=function(message) {
   console.log(message)
}



