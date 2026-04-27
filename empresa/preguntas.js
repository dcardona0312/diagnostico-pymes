auth.onAuthStateChanged(user => {

  if (!user) {
    window.location.href = "../index.html";
  }

});

function guardar() {

  const p1 = parseInt(document.getElementById("p1").value);
  const p2 = parseInt(document.getElementById("p2").value);
  const p3 = parseInt(document.getElementById("p3").value);

  const puntaje = p1 + p2 + p3;

  const usuario = auth.currentUser.email;

  db.collection("diagnosticos").add({
    usuario: usuario,
    puntaje: puntaje,
    fecha: new Date()
  })
  .then(() => {
    alert("Diagnóstico guardado");
  })
  .catch(err => {
    alert(err.message);
  });
}