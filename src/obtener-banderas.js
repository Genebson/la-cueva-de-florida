const fetch = require('node-fetch');
const fs = require('fs');

const banderas = [{ moneda: '?', bandera: 'assets/flag-default/unknown-flag.png' }]

fetch('https://restcountries.eu/rest/v2/all')
  .then(respuesta => respuesta.json())
  .then(respuestaJSON => {
    respuestaJSON.forEach(bandera => {
      const objBanderas = { moneda: bandera.currencies[0].code, bandera: bandera.flag }
      // banderas['moneda'] = bandera.currencies[0].code
      // banderas['bandera'] = bandera.flag
      banderas.push(objBanderas)
      console.log(banderas);
    })
    fs.appendFileSync('obtenerBanderas.json', JSON.stringify(banderas, null, 4))
  })