// dashboard.js COMPLETO

auth.onAuthStateChanged(user => {

  if (!user) {
    window.location.href = "../index.html";
    return;
  }

  cargarResumen();
  cargarHistorial();

});


/* CREAR EMPRESA */
function crearUsuario() {

  const nombre = document.getElementById("newNombre").value.trim();
  const email = document.getElementById("newEmail").value.trim();
  const password = document.getElementById("newPassword").value.trim();

  if (nombre === "" || email === "" || password === "") {
    alert("Completa todos los campos");
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)

    .then(res => {

      return db.collection("usuarios").doc(res.user.uid).set({
        nombre: nombre,
        email: email,
        rol: "empresa",
        fecha: new Date()
      });

    })

    .then(() => {

      alert("Empresa creada correctamente");

      document.getElementById("newNombre").value = "";
      document.getElementById("newEmail").value = "";
      document.getElementById("newPassword").value = "";

      cargarResumen();

    })

    .catch(error => {
      alert(error.message);
    });

}


/* RESUMEN */
function cargarResumen() {

  db.collection("usuarios")
    .where("rol", "==", "empresa")
    .get()
    .then(snapshot => {
      document.getElementById("totalEmpresas").textContent = snapshot.size;
    });

  db.collection("diagnosticos")
    .get()
    .then(snapshot => {
      document.getElementById("totalDiag").textContent = snapshot.size;
    });

}


/* HISTORIAL */
function cargarHistorial() {

  const tabla = document.getElementById("historial");
  tabla.innerHTML = "";

  db.collection("diagnosticos")
    .orderBy("fecha", "desc")
    .get()

    .then(snapshot => {

      if (snapshot.empty) {

        tabla.innerHTML = `
          <tr>
            <td colspan="3">No hay diagnósticos registrados</td>
          </tr>
        `;

        return;
      }

      snapshot.forEach(doc => {

        const data = doc.data();

        let fechaTexto = "Sin fecha";

        if (data.fecha && data.fecha.toDate) {
          fechaTexto = data.fecha.toDate().toLocaleDateString();
        }

        tabla.innerHTML += `
          <tr>
            <td>${data.usuario || "Sin nombre"}</td>
            <td>${data.puntaje || 0}</td>
            <td>${fechaTexto}</td>
          </tr>
        `;

      });

    });

}


/* LOGOUT */
function logout() {

  auth.signOut()
    .then(() => {
      window.location.href = "../index.html";
    });

}