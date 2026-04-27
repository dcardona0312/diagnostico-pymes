// script.js COMPLETO CORREGIDO

function login() {

  const email = document.getElementById("usuario").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email === "" || password === "") {
    alert("Completa todos los campos");
    return;
  }

  auth.signInWithEmailAndPassword(email, password)

    .then((res) => {

      const uid = res.user.uid;

      return db.collection("usuarios").doc(uid).get();
    })

    .then((doc) => {

      if (!doc.exists) {
        alert("Usuario sin rol asignado");
        auth.signOut();
        return;
      }

      const data = doc.data();

      if (data.rol === "admin") {
        window.location.href = "dashboard/dashboard.html";
      }

      else if (data.rol === "empresa") {
        window.location.href = "empresa/preguntas.html";
      }

      else {
        alert("Rol inválido");
        auth.signOut();
      }

    })

    .catch((error) => {
      alert(error.message);
    });

}