const $form = document.querySelector('#form')
const $importe = $form.importe.value
const $deMoneda = $form['de-moneda']
const $pMoneda = $form['a-moneda']
const $contenidoDropdown = document.querySelector('.dropdown-content')
const $inputDeImporte = $form.querySelector('#input-de-importe')

// fetch('../obtenerBanderas.json')
//   .then(results => results.json())
//   .then(respuesta => {
//     console.log(respuesta);
//   })

// fetch('https://v6.exchangerate-api.com/v6/48810b71d8c2fd943148a756/latest/ARS')
//   .then(respuesta => respuesta.json())
//   .then(respuestaJSON => {
//     Object.keys(respuestaJSON.conversion_rates).forEach(moneda => {
//       const $div = document.createElement('div')
//       const $p = document.createElement('p')
//       const $img = document.createElement('img')
//       $div.className = 'currency-selected'
//       $p.className = 'descripcion'
//       $img.className = 'bandera-moneda'
//       $img.src = ''
//       $contenidoDropdown.appendChild($div)
//       $div.appendChild($img)
//       $div.appendChild($p).innerText = `${moneda}`
//     })
//   })

Promise.all([
  fetch('https://v6.exchangerate-api.com/v6/48810b71d8c2fd943148a756/latest/ARS'),
  fetch('../obtenerBanderas.json')
])
  .then(respuesta => Promise.all(respuesta.map(el => el.json())))
  .then(respuestaJSON => {
    const monedasAPI = respuestaJSON[0].conversion_rates
    const monedasYBanderasJSON = respuestaJSON[1]

    monedasYBanderasJSON.forEach((elementos, index) => {
      console.log(elementos.moneda);
      const $div = document.createElement('div')
      $div.className = 'currency-selected'
      $contenidoDropdown.appendChild($div)
      const $img = document.createElement('img')
      $img.className = 'bandera-moneda'
      $img.dataset.moneda = elementos.moneda
      $img.src = elementos.bandera
      $div.appendChild($img)
    })



    const $divCurrency = document.querySelectorAll('.currency-selected')
    Object.keys(monedasAPI).forEach((moneda, index) => {
      const $p = document.createElement('p')
      $p.className = 'descripcion'
      $divCurrency[index].appendChild($p).textContent = moneda
    })

  })

function mostrarDatos(e) {
  if (e.target.classList.contains('input-de-importe')) {
    $contenidoDropdown.classList.add('show')
  } else {
    $contenidoDropdown.classList.remove('show')
  }
}

function filtrarDivisas() {
  const filtrar = $inputDeImporte.value.toUpperCase();
  const $p = $contenidoDropdown.querySelectorAll('.descripcion');
  const $img = $contenidoDropdown.querySelectorAll('.bandera-moneda')

  for (i = 0; i < $p.length && $img.length; i++) {
    let texto = $p[i].innerText
    if (texto.toUpperCase().indexOf(filtrar) > -1) {
      $p[i].style.display = "";
      $img[i].style.display = ''
    } else {
      $p[i].style.display = "none";
      $img[i].style.display = ''
    }
  }
}

document.addEventListener('keyup', filtrarDivisas)
document.addEventListener('click', mostrarDatos)