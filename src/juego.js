fetch('https://opentdb.com/api.php?amount=10&category=18')
  .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    mostrarPreguntas(data.results);
  })
  .catch(error => {
    console.error('Hubo un problema con la petición fetch:', error);
  });

function mostrarPreguntas(preguntas) {
  preguntas.forEach(pregunta => {
    console.log(pregunta.question);
  });
}
