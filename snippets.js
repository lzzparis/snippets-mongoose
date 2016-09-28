var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//what is this    vvv
mongoose.connect("mongodb://localhost");

mongoose.connection.on("error", function(err){
  console.error("Could not connect.  Error:", err);
});

mongoose.connection.once("open", function(){
  var snippetSchema = mongoose.Schema({
    name: {type: String, unique: true},
    content: String
  });
  
  var Snippet = mongoose.model('Snippet', snippetSchema);
  //where do i put CRUD?
  var create = function(name, content){
    var snippet = {
      name: name, 
      content: content
    };

    Snippet.create(snippet, function(err, snippet){
      if (err || !snippet){
        console.error("Could not create snippet", name);
        mongoose.disconnect();
        return;
      }

      console.log("Created snippet",snippet.name);
      mongoose.disconnect();
    });
  };

  var read = function(name){
    var query = {
      name: name
    };
    
    Snippet.findOne(query, function(err, snippet){
      if(err || !snippet){
        console.error("Could not read snippet", name);
        mongoose.disconnect();
        return;
      }

      console.log("REad snippet", snippet.name);
      console.log(snippet.content);
      mongoose.disconnect(); 
    });
    

  };

  var update = function(name, content){
    
    Snippet.findOneAndUpdate({name:name},{content:content}, function(err, snippet){
      if(err || !snippet){
        console.error("Couldn't update snippet", name);
        mongoose.disconnect();
        return;
      }
      
      console.log("Updated snippet", snippet.name);
      mongoose.disconnect();

    });
  };

  var del = function(name){
    Snippet.findOneAndRemove({name:name},function(err, snippet){
      if(err || !snippet){
        console.error("Couldn't delete snippet",name);
        mongoose.disconnect();
        return;
      }
      console.log("Deleted snippet", snippet.name);
      mongoose.disconnect();
    });
  };

  var main = function(){
    if(process.argv[2]=="create"){
      create(process.argv[3], process.argv[4]);
    }
    else if(process.argv[2]=="read"){
      read(process.argv[3], process.argv[4]);
    }
    else if(process.argv[2]=="update"){
      update(process.argv[3], process.argv[4]);
    }
    else if(process.argv[2]=="delete"){
      del(process.argv[3], process.argv[4]);
    }
    else {
      console.error("Command not recognized", process.argv[2]);
    }

  }
  main();


});




