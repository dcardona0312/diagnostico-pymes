// ==========================
// LOGIN
// ==========================
function login() {
  console.log("🔥 Click login");

  const email = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Completa todos los campos");
    return;
  }

  console.log("📧 Email:", email);

  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      console.log("✅ Login OK");

      const uid = userCredential.user.uid;
      console.log("🆔 UID:", uid);

      return db.collection("usuarios").doc(uid).get();
    })
    .then(doc => {
      console.log("📄 Firestore doc:", doc);

      if (!doc.exists) {
        alert("❌ No tienes rol asignado en Firestore");
        return;
      }

      const data = doc.data();
      console.log("📊 Rol:", data.rol);

      // ADMIN
      if (data.rol === "admin") {
        document.getElementById("login").style.display = "none";
        document.getElementById("adminPanel").style.display = "block";
        cargarUsuarios();
      }

      // EMPRESA
      else if (data.rol === "empresa") {
        document.getElementById("login").style.display = "none";
        document.getElementById("empresaPanel").style.display = "block";
      }

      else {
        alert("Rol no válido");
      }
    })
    .catch(error => {
      console.error("❌ ERROR LOGIN:", error);
      alert(error.message);
    });
}

// ==========================
// CREAR USUARIO (ADMIN)
// ==========================
function crearUsuarioAdmin() {
  console.log("➕ Crear usuario");

  const email = document.getElementById("newEmail").value;
  const password = document.getElementById("newPassword").value;
  const rol = document.getElementById("newRol").value;

  if (!email || !password) {
    alert("Completa los campos");
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      console.log("✅ Usuario creado en Auth");

      const uid = userCredential.user.uid;

      return db.collection("usuarios").doc(uid).set({
        email: email,
        rol: rol
      });
    })
    .then(() => {
      alert("✅ Usuario creado correctamente");

      document.getElementById("newEmail").value = "";
      document.getElementById("newPassword").value = "";

      cargarUsuarios();
    })
    .catch(error => {
      console.error("❌ ERROR CREAR:", error);
      alert(error.message);
    });
}

// ==========================
// LISTAR USUARIOS
// ==========================
function cargarUsuarios() {
  console.log("📋 Cargando usuarios");

  const lista = document.getElementById("listaUsuarios");
  lista.innerHTML = "";

  db.collection("usuarios").get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data();

        const li = document.createElement("li");
        li.textContent = data.email + " - " + data.rol;

        lista.appendChild(li);
      });
    })
    .catch(error => {
      console.error("❌ ERROR LISTAR:", error);
    });
}

// ==========================
// GUARDAR DIAGNÓSTICO
// ==========================
function guardarDiagnostico() {
  console.log("💾 Guardando diagnóstico");

  const user = auth.currentUser;

  if (!user) {
    alert("No autenticado");
    return;
  }

  const data = {
    uid: user.uid,
    empresa: document.getElementById("nombreEmpresa").value,
    nit: document.getElementById("nitEmpresa").value,
    empleados: document.getElementById("empleados").value,
    web: document.getElementById("web").value,
    digital: document.getElementById("digital").value,
    procesos: document.getElementById("procesos").value,
    finanzas: document.getElementById("finanzas").value,
    fecha: new Date()
  };

  console.log("📊 Datos a guardar:", data);

  db.collection("diagnosticos").add(data)
    .then(() => {
      alert("✅ Diagnóstico guardado correctamente");
    })
    .catch(error => {
      console.error("❌ ERROR GUARDAR:", error);
      alert(error.message);
    });
}

// ==========================
// LOGOUT
// ==========================
function logout() {
  console.log("🚪 Logout");

  auth.signOut()
    .then(() => {
      location.reload();
    });
}