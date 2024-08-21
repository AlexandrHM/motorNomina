
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

function obtenerMontoMaximo(tipoNomina, meses, genero) {
    const montosMaximos = {
        m: {
            A: [4900, 4700, 4600, 4600, 4500],
            B: [4700, 4400, 5000, 4400, 4900],
            C: [5000, 4700, 5000, 4200, 4600],
            D: [4400, 4700, 4300, 4900, 4300]
        },
        f: {
            A: [4000, 4200, 4100, 4200, 4500],
            B: [4700, 4200, 4500, 4300, 4400],
            C: [4600, 4900, 4600, 4700, 4000],
            D: [5000, 4900, 4700, 5000, 4300]
        }
    };

    let index = 0;
    if (meses >= 28) index = 4;
    else if (meses >= 27) index = 3;
    else if (meses >= 26) index = 2;
    else if (meses >= 25) index = 1;

    return montosMaximos[genero][tipoNomina][index];
}

function calcularLineaOptima(montoMinimo, montoMaximo) {
    const p1 = montoMinimo + Math.sqrt(montoMaximo - montoMinimo);
    const p2 = montoMinimo + 0.0175 * (montoMaximo - montoMinimo);
    return Math.max(p1, p2);
}

const resultadoA = calcMotor('A', new Date('2022-06-12'), 'f');
console.log(resultadoA);

const resultadoB =  calcMotor('B', new Date('1993-12-30'), 'f');
console.log(resultadoB); 

const resultadoC =  calcMotor('C', new Date('2020-09-19'), 'm');
console.log(resultadoC);

const resultadoD = calcMotor('D', new Date('2019-01-15'), 'm');
console.log(resultadoD);
