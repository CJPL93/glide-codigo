window.function = function (valor) {
  valor = valor.value ?? 0;

  if (valor >= 67) {
    return "Peligro 🔴";
  } else if (valor >= 34) {
    return "Cuidado 🟡";
  } else {
    return "Protegido 🟢";
  }
}
