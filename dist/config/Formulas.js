"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tablaGp = exports.tmb = exports.pGrasaIdealJP = exports.cintuCadeSexo = exports.cinturaCadera = exports.texturaCuerpo = exports.pesoIdeal = exports.masaMagra = exports.masaGrasa = exports.porcenGrasaIMC = exports.IMC = exports.porcenGrasaCUNBAE = exports.porcenGrasaUSNAVY = void 0;
const porcenGrasaUSNAVY = (sexo, cintura, cuello, talla, cadera) => {
    let pGrasa = 0;
    if (sexo === 'f') {
        let formulaF = (495 / (1.29579 - 0.35004 * Math.log10(cintura + cadera - cuello) + 0.22100 * Math.log10(talla))) - 450;
        pGrasa = formulaF;
    }
    else if (sexo === 'm') {
        let formulaM = (495 / (1.0324 - 0.19077 * Math.log10(cintura - cuello) + 0.15456 * Math.log10(talla))) - 450;
        pGrasa = formulaM;
    }
    return pGrasa.toFixed(2);
};
exports.porcenGrasaUSNAVY = porcenGrasaUSNAVY;
const porcenGrasaCUNBAE = (sexo, edad, imc) => {
    let numSexo = 0;
    if (sexo === 'f')
        numSexo = 0;
    if (sexo === 'm')
        numSexo = 1;
    let result = -44.988 + (0.503 * edad) + (10.689 * numSexo) + (3.172 * imc) - (0.026 * Math.pow(imc, 2)) + (0.181 * imc * numSexo) - (0.02 * imc * edad) + (0.00021 * Math.pow(imc, 2) * edad);
    return result;
};
exports.porcenGrasaCUNBAE = porcenGrasaCUNBAE;
const IMC = (peso, talla) => {
    let tallaMetros = talla / 100;
    let result = peso / Math.pow(tallaMetros, 2);
    return result;
};
exports.IMC = IMC;
const porcenGrasaIMC = (sexo, edad, imc) => {
    let result = 0;
    if (sexo === 'f')
        result = (1.20 * imc) + (0.23 * edad) - 5.4;
    if (sexo === 'm')
        result = (1.20 * imc) + (0.23 * edad) - 16.2;
    return result;
};
exports.porcenGrasaIMC = porcenGrasaIMC;
const masaGrasa = (peso, pGrasa) => {
    return (peso * (pGrasa / 100)).toFixed(2);
};
exports.masaGrasa = masaGrasa;
const masaMagra = (peso, masaGrasa) => {
    return (peso - masaGrasa).toFixed(2);
};
exports.masaMagra = masaMagra;
const pesoIdeal = (peso, pGrasa, pGrasaIdealJP) => {
    let result = (peso * (1 - (pGrasa / 100))) / (1 - (pGrasaIdealJP / 100));
    return result;
};
exports.pesoIdeal = pesoIdeal;
const texturaCuerpo = (talla, muneca) => {
    let result = talla / muneca;
    return result;
};
exports.texturaCuerpo = texturaCuerpo;
const cinturaCadera = (cintura, cadera) => {
    let result = cintura / cadera;
    return result;
};
exports.cinturaCadera = cinturaCadera;
const cintuCadeSexo = (sexo, indi) => {
    let indice = 'Indefinido';
    if (sexo == 'f') {
        indice = indi <= 0.80 ? 'Bajo Riesgo' : indi >= 0.81 && indi <= 0.85 ? 'Moderado' : indi >= 0.86 ? 'Alto' : 'Indefinido';
    }
    if (sexo == 'm') {
        indice = indi <= 0.95 ? 'Bajo Riesgo' : indi >= 0.96 && indi <= 1 ? 'Moderado' : indi > 1 ? 'Alto' : 'Indefinido';
    }
    return indice;
};
exports.cintuCadeSexo = cintuCadeSexo;
const pGrasaIdealJP = (sexo, edad) => {
    const ranges = [
        { min: 20, max: 25, fStart: 17.7, fEnd: 18.4, mStart: 8.5, mEnd: 10.5 },
        { min: 25, max: 30, fStart: 18.4, fEnd: 19.3, mStart: 10.5, mEnd: 12.7 },
        { min: 30, max: 35, fStart: 19.3, fEnd: 21.5, mStart: 12.7, mEnd: 13.7 },
        { min: 35, max: 40, fStart: 21.5, fEnd: 22.2, mStart: 13.7, mEnd: 15.3 },
        { min: 40, max: 45, fStart: 22.2, fEnd: 22.9, mStart: 15.3, mEnd: 16.4 },
        { min: 45, max: 50, fStart: 22.9, fEnd: 25.2, mStart: 16.4, mEnd: 18.9 },
        { min: 50, max: 55, fStart: 25.2, fEnd: 26.3, mStart: 18.9, mEnd: 20.9 }
    ];
    for (const range of ranges) {
        if (edad >= range.min && edad <= range.max) {
            const start = sexo === 'f' ? range.fStart : range.mStart;
            const end = sexo === 'f' ? range.fEnd : range.mEnd;
            return start + ((end - start) * (edad - range.min)) / (range.max - range.min);
        }
    }
    // Si la edad no está en el rango definido, puedes devolver un valor predeterminado o lanzar un error
    return 0;
};
exports.pGrasaIdealJP = pGrasaIdealJP;
const tmb = (sexo, pesoIdeal, talla, edad) => {
    let result = 0;
    if (sexo === 'f')
        result = 447.593 + (9.247 * pesoIdeal) + (3.098 * talla) - (4.330 * edad);
    if (sexo === 'm')
        result = 88.362 + (13.397 * pesoIdeal) + (4.799 * talla) - (5.677 * edad);
    return result;
};
exports.tmb = tmb;
const tablaGp = (sexo, edad, grasaP) => {
    let rb1gp = 0;
    let rb2gp = 0;
    let rb3gp = 0;
    let rp1gp = 0;
    let rp2gp = 0;
    let rp3gp = 0;
    let calc100 = 0;
    let colorGrasa = '';
    let textIndi = '';
    const ranges = [
        { min: 20, max: 39, level: [
                { gen: 'f', ran: [21, 33, 39] },
                { gen: 'm', ran: [8, 20, 25] }
            ]
        },
        { min: 40, max: 59, level: [
                { gen: 'f', ran: [23, 34, 40] },
                { gen: 'm', ran: [11, 22, 28] }
            ]
        },
        { min: 60, max: 79, level: [
                { gen: 'f', ran: [24, 36, 42] },
                { gen: 'm', ran: [13, 25, 30] }
            ]
        }
    ];
    for (const range of ranges) {
        if (edad >= range.min && edad <= range.max) {
            for (const lev of range.level) {
                if (sexo == lev.gen) {
                    calc100 = lev.ran[2] / 88;
                    let porc88 = lev.ran[2] / 88;
                    rb1gp = lev.ran[0] / porc88;
                    rb2gp = (lev.ran[1] - lev.ran[0]) / porc88;
                    rb3gp = (lev.ran[2] - lev.ran[1]) / porc88;
                    rp1gp = lev.ran[0];
                    rp2gp = lev.ran[1];
                    rp3gp = lev.ran[2];
                }
            }
        }
    }
    console.log(grasaP);
    if (grasaP < rp1gp) {
        textIndi = 'Delgado';
        colorGrasa = 'indigo-900';
    }
    if (grasaP >= rp1gp && grasaP <= rp2gp) {
        textIndi = 'Optimo';
        colorGrasa = 'indigo-500';
    }
    if (grasaP >= rp2gp && grasaP <= rp3gp) {
        textIndi = 'Sobrepeso';
        colorGrasa = 'orange-400';
    }
    if (grasaP > rp3gp) {
        textIndi = 'Obesidad';
        colorGrasa = 'red-600';
    }
    return { rb1gp, rb2gp, rb3gp, rp1gp, rp2gp, rp3gp, calc100, colorGrasa, textIndi };
};
exports.tablaGp = tablaGp;
console.log((0, exports.tablaGp)('m', 21, 25.38));
