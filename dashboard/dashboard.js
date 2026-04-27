// dashboard.js COMPLETO

let graficaDetalle = null;

auth.onAuthStateChanged(user => {

  if (!user) {
    window.location.href = "../index.html";
    return;
  }

  cargarResumen();
  cargarHistorial();

});


function crearUsuario(){

  const nombre = newNombre.value.trim();
  const email = newEmail.value.trim();
  const password = newPassword.value.trim();

  if(nombre === "" || email === "" || password === ""){
    alert("Completa todos los campos");
    return;
  }

  auth.createUserWithEmailAndPassword(email,password)

    .then(res => {

      return db.collection("usuarios").doc(res.user.uid).set({
        nombre:nombre,
        email:email,
        rol:"empresa",
        fecha:new Date()
      });

    })

    .then(()=>{
      alert("Empresa creada correctamente");

      newNombre.value = "";
      newEmail.value = "";
      newPassword.value = "";

      cargarResumen();
    })

    .catch(error => alert(error.message));

}


function cargarResumen(){

  db.collection("usuarios")
    .where("rol","==","empresa")
    .get()
    .then(s => totalEmpresas.textContent = s.size);

  db.collection("diagnosticos")
    .get()
    .then(s => totalDiag.textContent = s.size);

}


function cargarHistorial(){

  historial.innerHTML = "";

  db.collection("diagnosticos")
    .orderBy("fecha","desc")
    .get()

    .then(snapshot => {

      snapshot.forEach(doc => {

        const d = doc.data();

        let fecha = "Sin fecha";

        if(d.fecha && d.fecha.toDate){
          fecha = d.fecha.toDate().toLocaleDateString();
        }

        historial.innerHTML += `
          <tr>
            <td>${d.usuario}</td>
            <td>${d.nivel}</td>
            <td>${d.porcentaje}%</td>
            <td>${fecha}</td>
            <td>
              <button onclick="verDetalle('${doc.id}')">
                Ver más
              </button>
            </td>
          </tr>
        `;

      });

    });

}


function verDetalle(id){

  db.collection("diagnosticos")
    .doc(id)
    .get()

    .then(doc => {

      const d = doc.data();

      const ctx = document.getElementById("detalleGrafica");

      if(graficaDetalle){
        graficaDetalle.destroy();
      }

      graficaDetalle = new Chart(ctx, {
        type:"radar",
        data:{
          labels:["General","Identificar","Proteger"],
          datasets:[{
            label:d.usuario,
            data:[
              d.porcentaje,
              d.identificar,
              d.proteger
            ],
            fill:true
          }]
        },
        options:{
          responsive:true,
          maintainAspectRatio:false,
          scales:{
            r:{
              min:0,
              max:100
            }
          }
        }
      });

      const badge = document.getElementById("estadoDetalle");

      badge.className = "badge-detalle";

      if(d.nivel === "Crítico"){
        badge.classList.add("critico");
      }
      else if(d.nivel === "Medio"){
        badge.classList.add("medio");
      }
      else{
        badge.classList.add("maduro");
      }

      badge.textContent = d.nivel;

      let fallasHtml = "";

      d.fallas.forEach(f => {
        fallasHtml += `<li>${f}</li>`;
      });

      let recomendaciones = "";

      if(d.identificar < 60){
        recomendaciones += `
          <li>Crear inventario de activos y software.</li>
          <li>Clasificar información crítica.</li>
        `;
      }

      if(d.proteger < 60){
        recomendaciones += `
          <li>Fortalecer accesos y contraseñas.</li>
          <li>Implementar backups automáticos.</li>
        `;
      }

      if(d.nivel === "Maduro"){
        recomendaciones += `
          <li>Mantener controles actuales y monitoreo continuo.</li>
        `;
      }

      detalleInfo.innerHTML = `
        <h4>${d.usuario}</h4>

        <p>Resultado técnico del diagnóstico empresarial.</p>

        <div class="kpi-grid">

          <div class="kpi-box">
            <span>General</span>
            <strong>${d.porcentaje}%</strong>
          </div>

          <div class="kpi-box">
            <span>Identificar</span>
            <strong>${d.identificar}%</strong>
          </div>

          <div class="kpi-box">
            <span>Proteger</span>
            <strong>${d.proteger}%</strong>
          </div>

          <div class="kpi-box">
            <span>Nivel</span>
            <strong>${d.nivel}</strong>
          </div>

        </div>

        <div class="section-title">Hallazgos</div>
        <ul>${fallasHtml}</ul>

        <div class="section-title">Recomendaciones</div>
        <ul>${recomendaciones}</ul>
      `;

    });

}


function logout(){

  auth.signOut()
    .then(()=>{
      window.location.href = "../index.html";
    });

}