
let Handlebars = require("handlebars");
let template = "Handlebars <b>{{name}}</b> precompiled!";
let compiled = Handlebars.compile(template);

console.log(compiled({ name: "Ritchie" }))
