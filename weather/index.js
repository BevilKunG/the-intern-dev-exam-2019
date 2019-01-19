const fs = require('fs');
const parser = require('xml2json');
fs.readFile('./weather.xml',(err,data) => {
  const json = parser.toJson(data);
  // console.log(json);
  fs.writeFile('weather.json',json,(err) => {
    if(err) throw err;
  })
});
