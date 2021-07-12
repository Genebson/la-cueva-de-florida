const $form = document.querySelector('#form')
const $importe = $form.importe.value
const $deMoneda = $form['de-moneda']
const $aMoneda = $form['a-moneda']

fetch('https://v6.exchangerate-api.com/v6/48810b71d8c2fd943148a756/latest/ARS')
  .then(respuesta => respuesta.json())
  .then(respuestaJSON => {
    console.log(respuestaJSON);
    Object.keys(respuestaJSON.conversion_rates).forEach(moneda => {
      const $option = document.createElement('option')
      $deMoneda.appendChild($option).innerText = `${moneda}`
    })
  })

fetch('https://restcountries.eu/rest/v2/all')
  .then(respuesta => respuesta.json())
  .then(respuestaJSON => {
    console.log(respuestaJSON);
    respuestaJSON.forEach(bandera => {
      console.log(bandera.flag);
      const $option = document.createElement('option')
      $option.dataset.source = `${bandera.flag}`
      // const $img = document.createElement('img')
      // const $imagen = document.querySelector('img')
      // $imagen.style.backgroundImage = `${bandera.flag}`
      $aMoneda.appendChild($option)
      // $option.appendChild($img).src = `${bandera.flag}`
    })
  })
