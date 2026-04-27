// preguntas.js COMPLETO

auth.onAuthStateChanged(user => {

  if (!user) {
    window.location.href = "../index.html";
    return;
  }

});


/* GUARDAR DIAGNOSTICO */
function guardar() {

  const p1 = parseInt(document.getElementById("p1").value);
  const p2 = parseInt(document.getElementById("p2").value);
  const p3 = parseInt(document.getElementById("p3").value);

  const puntaje = p1 + p2 + p3;

  const uid = auth.currentUser.uid;

  db.collection("usuarios").doc(uid).get()

    .then(doc => {

      let empresa = auth.currentUser.email;

      if (doc.exists) {
        empresa = doc.data().nombre;
      }

      return db.collection("diagnosticos").add({
        uid: uid,
        usuario: empresa,
        correo: auth.currentUser.email,
        puntaje: puntaje,
        fecha: new Date()
      });

    })

    .then(() => {
      alert("Diagnóstico enviado correctamente");
    })

    .catch(error => {
      alert(error.message);
    });

}


/* CERRAR SESION */
function logout() {

  auth.signOut()
    .then(() => {
      window.location.href = "../index.html";
    });

}