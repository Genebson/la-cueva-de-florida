function validarInputImporte(importe) {
  if (importe.length === 0) {
    return 'Este campo debe contener al menos 1 numero';
  }
  return '';
}

function validarInputAImporte(inputAImporte) {
  if (inputAImporte.length === 0) {
    return 'Seleccione una moneda'
  }
  return '';
}