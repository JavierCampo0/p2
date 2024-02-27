
const peticion = function() {
    fetch('https://opentdb.com/api.php?amount=10' + new URLSearchParams({sleep: 1000}), {
      method: 'GET',
      mode: 'cors',
      headers: {'Accept': 'application/json'}
    }).then(respuesta => {
      if (respuesta.ok) {
        return respuesta.json();
      } else {
        throw respuesta.status;
      }
    }).then(objeto => {
      mostrarMensajes(objeto);
    }).catch(error => {
      mostrarError(error);
    });
  }
  // Lógica para cambiar la interfaz de usuario en función
  // de la respuesta recibida:
  const boton = document.getElementById('boton');
  const estado = document.getElementById('estado');
  const mostrarMensajes = function(mensajes) {
    cambiaEstadoBoton('enabled');
    estado.textContent = `0 mensajes - Actualizado a las ${new Date().toLocaleTimeString()}`;
  }
  const mostrarError = function(error) {
    cambiaEstadoBoton('enabled');
    estado.innerHTML = `<i class="bi bi-exclamation-triangle-fill"></i> Error al actualizar (${error})`;
  }
  const mostrarActualizando = function() {
    cambiaEstadoBoton('disabled');
    estado.innerHTML = '<div class="spinner-border spinner-border-sm"></div> Actualizando...';
  }
  const cambiaEstadoBoton = function(estado) {
    boton.disabled = estado === 'disabled';
  }
  const actualizar = function() {
    mostrarActualizando();
    peticion();
  }
  