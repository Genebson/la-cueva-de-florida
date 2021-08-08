const $form = document.querySelector('#form');
const $importe = $form.importe;
const $dropdownA = document.querySelector('.dropdown-content-a');
const $inputAImporte = $form.querySelector('#input-a-importe');
const $contenidoSelect = document.querySelector('.selectbox-de-importe .dropdown');
const $dropdownContenedorDe = document.querySelector('.dropdown-de');
const $dropdownContenedorA = document.querySelector('.dropdown-a');
const $btnConvertir = $form.querySelector('#btn-convertir');
const $textoResultado = $form.querySelector('#resultado');
const $textoImporte = document.querySelector('#texto-importe');
const $textoInputA = document.querySelector('#texto-a-importe');
const audioCambio = document.querySelector('#cambio');
const audioCambioCambio = document.querySelector('#cambio-cambio');
const audioSenioraCambio = document.querySelector('#seniora-cambio');

console.log(audioCambio);
console.log(audioCambioCambio);
console.log(audioSenioraCambio);
let monedaConvertida;

const voces = [audioCambio, audioCambioCambio, audioSenioraCambio]

fetch('https://v6.exchangerate-api.com/v6/acc63c206efbbf790d7ca564/latest/ARS')
  .then(respuesta => respuesta.json())
  .then(respuestaJSON => {
    const $divCurrencyA = document.querySelectorAll('.currency-selected-a')
    const $monedaBase = document.querySelector('.descripcion-de')
    const monedas = Object.keys(respuestaJSON.conversion_rates)
    monedaConvertida = respuestaJSON.conversion_rates
    $monedaBase.textContent = monedas[0]

    monedas.forEach((moneda, index) => {
      const $nombreMoneda = document.createElement('span')
      $nombreMoneda.className = 'descripcion-a'
      $divCurrencyA[index].appendChild($nombreMoneda).textContent = moneda
    })
  })

document.querySelectorAll('.currency-selected-a').forEach((moneda) => {
  moneda.addEventListener('click', (e) => {
    const $elemento = e.currentTarget.cloneNode(true)

    if ($elemento.classList.contains('currency-selected-a')) {
      $elemento.classList.add('active')
      $inputAImporte.placeholder = ''
      $inputAImporte.style.backgroundImage = 'none'
      $inputAImporte.value = ''
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
  const textoInputA = $inputAImporte.value.toUpperCase()
  const $pAInput = $dropdownA.querySelectorAll('.descripcion-a')
  const $imgAImporte = $dropdownA.querySelectorAll('.bandera-input')
  const $monedaNoDisponible = document.querySelector('.moneda-no-disponible')

  for (i = 0; i < $pAInput.length && $imgAImporte.length; i++) {
    let textoMonedas = $pAInput[i].innerText

    if (textoMonedas.toUpperCase().indexOf(textoInputA) > -1) {
      console.log('primer if');
      $pAInput[i].style.display = "";
      $imgAImporte[i].style.display = ''
      $dropdownA.style.height = '360px'
    } else if (textoMonedas.length === 3) {
      console.log('primer else if');
      $pAInput[i].style.display = 'none';
      $imgAImporte[i].style.display = 'none'
      $dropdownA.style.height = '45px'
    }

    if (textoInputA.length > 3) {
      console.log('segundo if');
      $monedaNoDisponible.style.display = 'inline'
      $monedaNoDisponible.textContent = 'No hay resultados disponibles'
      // console.log($monedaNoDisponible);
    }
  }
}

function convertirImporte() {
  const $monedaSeleccionada = document.querySelector('.dropdown-a').firstChild.lastChild

  if ($monedaSeleccionada === null || $importe.value === '') {
    validarInput()
  } else if ($monedaSeleccionada.className === 'descripcion-a' && !isNaN($importe.value)) {
    const obtenerMoneda = monedaConvertida[$monedaSeleccionada.textContent]
    let sumarValores = $importe.value * obtenerMoneda
    $textoResultado.textContent = `${$importe.value} Pesos Argentinos = ${sumarValores} ${$monedaSeleccionada.textContent}`
    $importe.classList.remove('error')
    $inputAImporte.classList.remove('error')
    $textoImporte.innerHTML = ''
    $textoInputA.innerHTML = ''
    vocesRandom()
  }
}

function validarInput() {
  const $monedaSeleccionada = document.querySelector('.dropdown-a').firstChild.lastChild
  let errorImporte;
  let errorAImporte;

  if ($importe.value === '') {
    errorImporte = 'Este campo debe contener al menos 1 numero'
    $importe.classList.add('error')
    $textoImporte.innerHTML = errorImporte
  } else {
    errorImporte = ''
    $importe.classList.remove('error')
  }

  if ($monedaSeleccionada === null) {
    errorAImporte = 'Antes de convertir debes seleccionar una moneda'
    $inputAImporte.classList.add('error')
    $textoInputA.innerHTML = errorAImporte
  } else {
    errorAImporte = ''
    $inputAImporte.classList.remove('error')
  }
}

function validarInputMoneda(e) {
  const $textoInputA = document.querySelector('#texto-a-importe')
  let errorAImporte;

  if (e.target.className.includes('input-a-importe')) {
    if (!isNaN($inputAImporte.value)) {
      $inputAImporte.classList.add('error')
      errorAImporte = 'Este campo solo acepta letras'
      $textoInputA.innerHTML = errorAImporte
      console.log('if concatenado');
    } else if ($inputAImporte.value > 3) {
      console.log('else if primero');
      $inputAImporte.classList.add('error')
      errorAImporte = 'Este campo solo acepta 3 letras'
    } else if ($inputAImporte.value === '') {
      console.log('segundo else if');
      errorAImporte = ''
      $inputAImporte.classList.add('correct')
      $inputAImporte.classList.remove('error')
    }
  }
}

function vocesRandom() {
  const vozAleatoria = voces[Math.floor(Math.random() * voces.length)]
  console.log(vozAleatoria);
  const audio = new Audio(vozAleatoria.attributes[0].src.textContent)
  console.log(audio);
  audio.play()
}

$btnConvertir.addEventListener('click', convertirImporte)
document.querySelector('#input-a-importe').addEventListener('keyup', (e) => validarInputMoneda(e))
document.addEventListener('keyup', filtrarDivisas)
document.addEventListener('click', mostrarDatos)