"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tmb = exports.pGrasaIdealJP = exports.cinturaCadera = exports.texturaCuerpo = exports.pesoIdeal = exports.masaMagra = exports.masaGrasa = exports.porcenGrasaIMC = exports.IMC = exports.porcenGrasaCUNBAE = exports.porcenGrasaUSNAVY = void 0;
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
const pGrasaIdealJP = (sexo, edad) => {
    let result = 0;
    if (edad >= 20 && edad <= 25) {
        if (sexo === 'f')
            result = 17.7 + (((18.4 - 17.7) * (edad - 20)) / (25 - 20));
        if (sexo === 'm')
            result = 8.5 + (((10.5 - 8.5) * (edad - 20)) / (25 - 20));
        return result;
    }
    if (edad >= 25 && edad <= 30) {
        if (sexo === 'f')
            result = 18.4 + (((19.3 - 18.4) * (edad - 25)) / (30 - 25));
        if (sexo === 'm')
            result = 10.5 + (((12.7 - 10.5) * (edad - 25)) / (30 - 25));
        return result;
    }
    if (edad >= 30 && edad <= 35) {
        if (sexo === 'f')
            result = 19.3 + (((21.5 - 19.3) * (edad - 30)) / (35 - 30));
        if (sexo === 'm')
            result = 12.7 + (((13.7 - 12.7) * (edad - 30)) / (35 - 30));
        return result;
    }
    if (edad >= 35 && edad <= 40) {
        if (sexo === 'f')
            result = 21.5 + (((22.2 - 21.5) * (edad - 35)) / (40 - 35));
        if (sexo === 'm')
            result = 13.7 + (((15.3 - 13.7) * (edad - 35)) / (40 - 35));
        return result;
    }
    if (edad >= 40 && edad <= 45) {
        if (sexo === 'f')
            result = 22.2 + (((22.9 - 22.2) * (edad - 40)) / (45 - 40));
        if (sexo === 'm')
            result = 15.3 + (((16.4 - 15.3) * (edad - 40)) / (45 - 40));
        return result;
    }
    if (edad >= 45 && edad <= 50) {
        if (sexo === 'f')
            result = 22.9 + (((25.2 - 22.9) * (edad - 45)) / (50 - 45));
        if (sexo === 'm')
            result = 16.4 + (((18.9 - 16.4) * (edad - 45)) / (50 - 45));
        return result;
    }
    if (edad >= 50 && edad <= 55) {
        if (sexo === 'f')
            result = 25.2 + (((26.3 - 25.2) * (edad - 50)) / (55 - 50));
        if (sexo === 'm')
            result = 18.9 + (((20.9 - 18.9) * (edad - 50)) / (55 - 50));
        return result;
    }
    return result;
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
