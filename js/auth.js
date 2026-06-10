function registrar() {

    const nombre =
        document.getElementById("nombre").value.trim();

    const fechaNacimiento =
        document.getElementById("fechaNacimiento").value;

    const correo =
        document.getElementById("correo").value.trim();

    const password =
        document.getElementById("password").value;

    if (!nombre || !fechaNacimiento || !correo || !password) {
        alert("Todos los campos son obligatorios");
        return;
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoValido.test(correo)) {
        alert("Ingresa un correo electrónico válido.");
        return;
    }

    const passwordSegura =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!?._\-])[A-Za-z\d@#$%^&*!?._\-]{12,}$/;
    if (!passwordSegura.test(password)) {
        alert(
            "La contraseña debe tener al menos 12 caracteres, " +
            "incluir mayúsculas, minúsculas, números y símbolos."
        );
        return;
    }

    // Validación: partes del nombre
    const partesNombre = nombre.toLowerCase().split(/\s+/);
    for (const parte of partesNombre) {
        if (parte.length >= 3 && password.toLowerCase().includes(parte)) {
            alert("La contraseña no puede contener tu nombre.");
            return;
        }
    }

    // Validación: año de nacimiento
    const anioNacimiento = fechaNacimiento.substring(0, 4);
    if (password.includes(anioNacimiento)) {
        alert("La contraseña no puede contener tu año de nacimiento.");
        return;
    }

    // Validación: formatos de fecha
    const partes = fechaNacimiento.split("-");
    const anio = partes[0];
    const mes  = partes[1];
    const dia  = partes[2];

    const formatosExtra = [
        fechaNacimiento.replaceAll("-", ""),   // 20030828
        dia + mes + anio,                      // 28082003
        dia + mes + anio.slice(2),             // 280803
        mes + dia + anio,                      // 08282003
        mes + dia + anio.slice(2),             // 082803
        anio.slice(2) + mes + dia,             // 030828
    ];

    for (const formato of formatosExtra) {
        if (password.includes(formato)) {
            alert("La contraseña no puede contener tu fecha de nacimiento.");
            return;
        }
    }

    const usuario = { nombre, fechaNacimiento, correo, password };
    localStorage.setItem("usuario", JSON.stringify(usuario));

    alert("Usuario registrado correctamente");
    window.location.href = "index.html";

}

function login() {

    const correo =
        document.getElementById("correo").value;

    const password =
        document.getElementById("password").value;

    const usuario = JSON.parse(
        localStorage.getItem("usuario")
    );

    if (
        usuario &&
        usuario.correo === correo &&
        usuario.password === password
    ) {
        window.location.href = "catalogo.html";
    } else {
        alert("Datos incorrectos");
    }

} 
