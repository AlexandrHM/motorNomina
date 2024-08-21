
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
function obtenerMontoMinimo(tipoNomina, meses, genero) {
    const montosMinimos = {
        m: {
            A: [100, 400, 900, 100, 600],
            B: [1000, 600, 1000, 1000, 1000],
            C: [400, 200, 200, 1000, 600],
            D: [400, 300, 500, 900, 1000]
        },
        f: {
            A: [800, 800, 800, 600, 200],
            B: [800, 700, 100, 600, 700],
            C: [200, 900, 700, 800, 100],
            D: [500, 1000, 600, 400, 700]
        }
    };

    let index = 0;
    if (meses >= 28) index = 4;
    else if (meses >= 27) index = 3;
    else if (meses >= 26) index = 2;
    else if (meses >= 25) index = 1;

    return montosMinimos[genero][tipoNomina][index];
}
