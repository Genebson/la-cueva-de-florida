const $form = document.querySelector('#form')
const $importe = $form.importe.value
const $contenidoDropdownDe = document.querySelector('.dropdown-content-de')
const $contenidoDropdownA = document.querySelector('.dropdown-content-a')
const $inputDeImporte = $form.querySelector('#input-de-importe')
const $contenidoSelect = document.querySelector('.selectbox-de-importe .dropdown')
const hiddenInput = document.querySelector('#inputSelect')

fetch('https://v6.exchangerate-api.com/v6/48810b71d8c2fd943148a756/latest/ARS')
  .then(respuesta => respuesta.json())
  .then(respuestaJSON => {
    const $divCurrencyDe = document.querySelectorAll('.currency-selected-de')
    const $divCurrencyA = document.querySelectorAll('.currency-selected-a')
    Object.keys(respuestaJSON.conversion_rates).forEach((moneda, index) => {
      const $p = document.createElement('span')
      $p.className = 'descripcion'
      $divCurrencyDe[index].appendChild($p).textContent = moneda
    })
    Object.keys(respuestaJSON.conversion_rates).forEach((moneda, index) => {
      const $p = document.createElement('p')
      $p.className = 'descripcion'
      $divCurrencyA[index].appendChild($p).textContent = moneda
    })
  })

document.querySelectorAll('#dropdown-description > .currency-selected-de').forEach((moneda) => {
  moneda.addEventListener('click', (e) => {
    const $dropdown = document.querySelector('#dropdown')
    const $elemento = e.currentTarget
    const $divElementos = document.querySelectorAll('.currency-selected-de')

    for (let i = 0; i < $divElementos.length; i++) {
      if ($elemento.classList.contains('currency-selected-de')) {
        $elemento.classList.add('active')
        $inputDeImporte.placeholder = ''
        $dropdown.prepend($elemento)
        $dropdown.replaceChild($elemento, $dropdown.firstChild)
      } else if ($elemento.classList.contains('currency-selected-de active')) {

      }
    }
  })
})

function mostrarDatos(e) {
  if (e.target.classList.contains('input-de-importe')) {
    $contenidoDropdownDe.classList.add('show')
  } else {
    $contenidoDropdownDe.classList.remove('show')
  }
  if (e.target.classList.contains('input-a-importe')) {
    $contenidoDropdownA.classList.add('show')
  } else {
    $contenidoDropdownA.classList.remove('show')
  }
}

function filtrarDivisas() {
  const filtrar = $inputDeImporte.value.toUpperCase();
  const $p = $contenidoDropdownDe.querySelectorAll('.descripcion');
  const $img = $contenidoDropdownDe.querySelectorAll('.bandera-input')

  for (i = 0; i < $p.length && $img.length; i++) {
    let texto = $p[i].innerText
    if (texto.toUpperCase().indexOf(filtrar) > -1) {
      $p[i].style.display = "";
      $img[i].style.display = ''
      $contenidoDropdownDe.style.height = '360px'
      $contenidoDropdownA.style.height = '360px'
      console.log('dentro del if');
    } else {
      $p[i].style.display = "none";
      console.log('fuera');
      $img[i].style.display = 'none'
      $contenidoDropdownDe.style.height = '45px'
      $contenidoDropdownA.style.height = '45px'
      // No hay resultados disponible
    }
  }
}

document.addEventListener('keyup', filtrarDivisas)
document.addEventListener('click', mostrarDatos)