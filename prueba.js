
function calcMotor(tipoNomina, fechaPrimerEmpleo, genero) {
    let montoMinimo = 0;
    let montoMaximo = 0;

    // Convertir la fecha a un formato que permita calcular los meses desde el primer empleo
    const fechaActual = new Date();
    const mesesDesdeEmpleo = (fechaActual.getFullYear() - fechaPrimerEmpleo.getFullYear()) * 12 + (fechaActual.getMonth() - fechaPrimerEmpleo.getMonth());

    // Obtener los valores correspondientes de las tablas
    montoMinimo = obtenerMontoMinimo(tipoNomina, mesesDesdeEmpleo, genero);
    montoMaximo = obtenerMontoMaximo(tipoNomina, mesesDesdeEmpleo, genero);

    // Calcular la linea de credito optima
    const recomendacionLinea = calcularLineaOptima(montoMinimo, montoMaximo);

    return {
        montoMinimo,
        montoMaximo,
        recomendacionLinea
    };
}

