

export const porcenGrasaUSNAVY = (sexo: string, cintura: number, cuello: number, talla: number, cadera: number): string => {
    let pGrasa: number = 0;

    if (sexo === 'f') {
        let formulaF = (495 / (1.29579 - 0.35004 * Math.log10(cintura + cadera - cuello) + 0.22100 * Math.log10(talla))) - 450;
        pGrasa = formulaF;
    } else if (sexo === 'm') {
        let formulaM = (495 / (1.0324 - 0.19077 * Math.log10(cintura - cuello) + 0.15456 * Math.log10(talla))) - 450;
        pGrasa = formulaM;
    }

    return pGrasa.toFixed(2);
}

console.log(porcenGrasaUSNAVY('f',83,32,150,99))


export const porcenGrasaCUNBAE = (sexo: string, edad: number, imc: number): number => {
    let numSexo: number = 0;
    if (sexo === 'f') numSexo = 0;
    if (sexo === 'm') numSexo = 1;

    let result = -44.988 + (0.503 * edad) + (10.689 * numSexo) + (3.172 * imc) - (0.026 * Math.pow(imc, 2)) + (0.181 * imc * numSexo) - (0.02 * imc * edad) + (0.00021 * Math.pow(imc, 2) * edad);

    return result;
}

export const IMC = (peso: number, talla: number): number => {
    let tallaMetros = talla / 100;
    let result = peso / Math.pow(tallaMetros, 2);
    return result;
}

export const porcenGrasaIMC = (sexo: string, edad: number, imc: number): number => {
    let result: number = 0;
    if (sexo === 'f') result = (1.20 * imc) + (0.23 * edad) - 5.4;
    if (sexo === 'm') result = (1.20 * imc) + (0.23 * edad) - 16.2;
    return result;
}

export const masaGrasa = (peso: number, pGrasa: number): string => {
    return (peso * (pGrasa / 100)).toFixed(2);
}

export const masaMagra = (peso: number, masaGrasa: number): string => {
    return (peso - masaGrasa).toFixed(2);
}

export const pesoIdeal = (peso: number, pGrasa: number, pGrasaIdealJP: number): number => {
    let result = (peso * (1 - (pGrasa / 100))) / (1 - (pGrasaIdealJP / 100));
    return result;
}

export const texturaCuerpo = (talla: number, muneca: number): number => {
    let result = talla / muneca;
    return result;
}

export const cinturaCadera = (cintura: number, cadera: number): number => {
    let result = cintura / cadera;
    return result;
}

export const cintuCadeSexo = (sexo:string, indi:number): string =>{
    let indice = 'Indefinido'
    if(sexo == 'f'){
        indice = indi <= 0.80? 'Bajo Riesgo': indi >= 0.81 && indi <= 0.85? 'Moderado':indi >= 0.86? 'Alto':'Indefinido'
    }
    if(sexo == 'm'){
        indice = indi <= 0.95? 'Bajo Riesgo': indi >= 0.96 && indi <= 1? 'Moderado':indi > 1? 'Alto':'Indefinido'
    }
    return indice;
}

export const pGrasaIdealJP = (sexo: 'f' | 'm', edad: number): number => {
    const ranges = [
        { min: 20, max: 39, fStart: 21, fEnd: 24, mStart: 11.5, mEnd: 12.5 },
        { min: 40, max: 59, fStart: 23, fEnd: 27, mStart: 14.0, mEnd: 16 },
        { min: 60, max: 79, fStart: 24, fEnd: 31, mStart: 18.0, mEnd: 20 }
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

export const tmb = (sexo: string, pesoIdeal: number, talla: number, edad: number): number => {
    let result: number = 0;
    if (sexo === 'f') result = 447.593 + (9.247 * pesoIdeal) + (3.098 * talla) - (4.330 * edad);
    if (sexo === 'm') result = 88.362 + (13.397 * pesoIdeal) + (4.799 * talla) - (5.677 * edad);
    return result;
}


interface tablaGp {
    rb1gp:number;
    rb2gp:number;
    rb3gp:number;
    rp1gp:number;
    rp2gp:number;
    rp3gp:number;
    calc100:number;
    colorGrasa:string;
    textIndi:string;
}

export const tablaGp =(sexo: 'm' | 'f', edad:number, grasaP:number):tablaGp=>{
    let rb1gp : number = 0;
    let rb2gp : number = 0;
    let rb3gp : number = 0;
    let rp1gp : number = 0;
    let rp2gp : number = 0;
    let rp3gp : number = 0;
    let calc100 : number = 0;
    let colorGrasa: string = '';
    let textIndi: string = '';

    const ranges = [
        { min:20, max:39, level:[
                { gen:'f', ran:[21, 33, 39] },
                { gen:'m', ran:[8, 20, 25] }
            ] 
        },
        { min:40, max:59, level:[
                { gen:'f', ran:[23, 34, 40] },
                { gen:'m', ran:[11, 22, 28] }
            ]
        },
        { min:60, max:79, level:[
                { gen:'f', ran:[24, 36, 42] },
                { gen:'m', ran:[13, 25, 30] }
            ]
        }
    ]

    for (const range of ranges){
        if(edad >= range.min && edad <= range.max){
            for(const lev of range.level){
                if(sexo == lev.gen){
                    calc100 = lev.ran[2] / 88
                    let porc88 = lev.ran[2] / 88
                    rb1gp = lev.ran[0] / porc88
                    rb2gp = (lev.ran[1] - lev.ran[0]) / porc88
                    rb3gp = (lev.ran[2] - lev.ran[1]) / porc88
                    rp1gp = lev.ran[0]
                    rp2gp = lev.ran[1]
                    rp3gp = lev.ran[2]
                }
            }
        }
    }
    console.log(grasaP)
    
    if(grasaP < rp1gp){
        textIndi = 'Delgado'
        colorGrasa = 'indigo-900'
    }
    if(grasaP >= rp1gp && grasaP <= rp2gp){
        textIndi = 'Optimo'
        colorGrasa = 'indigo-500'
    }
    if(grasaP >= rp2gp && grasaP <= rp3gp){
        textIndi = 'Sobrepeso'
        colorGrasa = 'orange-400'
    }
    if(grasaP > rp3gp){
        textIndi = 'Obesidad'
        colorGrasa = 'red-600'
    }

    return {rb1gp,rb2gp,rb3gp,rp1gp,rp2gp,rp3gp,calc100,colorGrasa,textIndi}
}

//console.log(tablaGp('m',21,25.38))