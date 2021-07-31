const $form = document.querySelector('#form')
const $importe = $form.importe.value
const $dropdownA = document.querySelector('.dropdown-content-a')
const $inputAImporte = $form.querySelector('#input-a-importe')
const $contenidoSelect = document.querySelector('.selectbox-de-importe .dropdown')
const $dropdownContenedorDe = document.querySelector('.dropdown-de')
const $dropdownContenedorA = document.querySelector('.dropdown-a')
const $btnConvertir = $form.querySelector('#btn-convertir')
const $textoResultado = $form.querySelector('#resultado')

fetch('https://v6.exchangerate-api.com/v6/48810b71d8c2fd943148a756/latest/ARS')
  .then(respuesta => respuesta.json())
  .then(respuestaJSON => {
    const $divCurrencyA = document.querySelectorAll('.currency-selected-a')
    const $span = document.querySelector('.descripcion-de')
    const monedas = Object.keys(respuestaJSON.conversion_rates)
    const valorMonedas = Object.values(respuestaJSON.conversion_rates)
    console.log(valorMonedas);
    $span.textContent = monedas[0]
    console.log(respuestaJSON.conversion_rates);
    monedas.forEach((moneda, index) => {
      const $span = document.createElement('span')
      $span.className = 'descripcion-a'
      $divCurrencyA[index].appendChild($span).textContent = moneda
    })
  })

document.querySelectorAll('.currency-selected-a').forEach((moneda) => {
  moneda.addEventListener('click', (e) => {
    const $elemento = e.currentTarget.cloneNode(true)

    if ($elemento.classList.contains('currency-selected-a')) {
      $elemento.classList.add('active')
      $inputAImporte.placeholder = ''
      $inputAImporte.style.backgroundImage = ''
    }
    if ($dropdownContenedorA.firstElementChild.classList.contains('input-a-importe')) {
      $dropdownContenedorA.prepend($elemento)
    } else {
      $dropdownContenedorA.replaceChild($elemento, $dropdownContenedorA.firstChild)
    }
  })
})

$inputAImporte.addEventListener('click', () => {
  const $divCurrencyA = document.querySelector('.dropdown-a > .currency-selected-a')
  if ($divCurrencyA) {
    $divCurrencyA.remove()
  }
  $inputAImporte.placeholder = 'Selecciona tu moneda'
})

function mostrarDatos(e) {
  if (e.target.classList.contains('input-a-importe')) {
    $dropdownA.classList.add('show')
  } else {
    $dropdownA.classList.remove('show')
  }
}

function filtrarDivisas() {
  const filtrarAImporte = $inputAImporte.value.toUpperCase()
  const $pAInput = $dropdownA.querySelectorAll('.descripcion-a')
  const $imgAImporte = $dropdownA.querySelectorAll('.bandera-input')

  for (i = 0; i < $pAInput.length && $imgAImporte.length; i++) {
    let textoAInput = $pAInput[i].innerText

    if (textoAInput.toUpperCase().indexOf(filtrarAImporte) > -1) {
      $pAInput[i].style.display = "";
      $imgAImporte[i].style.display = ''
      $dropdownA.style.height = '360px'
    } else if (textoAInput.length === 3) {
      $pAInput[i].style.display = "none";
      $imgAImporte[i].style.display = 'none'
      $dropdownA.style.height = '45px'
      // No hay resultados disponible
    }
  }
}

function convertirImporte(e) {
  const $elemento = e.currentTarget.firstChild.lastChild
  console.log($elemento);
  const obtenerMoneda = monedas.find(moneda => moneda === $elemento.value)
  console.log(obtenerMoneda);
}
convertirImporte()

document.addEventListener('keyup', filtrarDivisas)
document.addEventListener('click', mostrarDatos)