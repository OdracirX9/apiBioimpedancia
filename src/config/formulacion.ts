import { text } from 'express';
import * as formu from './Formulas'



//OBJETO QUE DEVOLVERA TODO LO QUE SE NECESITA
export const ResultsPam = (getPacId: any) => {

    function calculateAge(birthDateString: any, fechaExamen: any) {
        const today = new Date(fechaExamen);
        const birthDate = new Date(birthDateString);

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        const dayDifference = today.getDate() - birthDate.getDate();

        // Ajustar la edad si el cumpleaños no ha ocurrido aún en el año actual
        if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
            age--;
        }

        return age;
    }
     const imcCal: number = parseFloat(formu.IMC(getPacId.antropometria.peso, getPacId.antropometria.talla).toFixed(2))
     const cadeCintuCal: number = parseFloat(formu.cinturaCadera(getPacId.antropometria.cintura, getPacId.antropometria.cadera).toFixed(2))

     const stringToNumber = (string:string):number=>{
        return parseFloat(parseFloat(string).toFixed(2))
     }

     const grasaP = (): number =>{
        let result:number = 0;

        let grasaUSNAVY:number = parseFloat(formu.porcenGrasaUSNAVY(getPacId.sexo,parseInt(getPacId.antropometria.cintura),parseInt(getPacId.antropometria.cuello),parseInt(getPacId.antropometria.talla),parseInt(getPacId.antropometria.cadera)))



        if(getPacId.sexo == 'm'){
            result = parseFloat(((grasaUSNAVY + parseFloat(getPacId.bioimpedanciometria.grasa_corporal)) / 2).toFixed(2));
     
            return result
        } else {
            result = grasaUSNAVY
       
            return result
        }
     }
     
     const entidad = (item:string | number):string=>{
        if(item == 100) return 'PARTICULAR'
        else if(item == 101) return 'ECOPETROL'
        else if(item == 102) return 'COLMÉDICA'
        else if(item == 103) return 'COLSÁNITAS'
        else if(item == 104) return 'POSITIVA'
        else if(item == 105) return 'COOMEVA MP'
        else if(item == 106) return 'AXA'
        else if(item == 107) return 'SURA'
        else if(item == 108) return 'MEDPLUS'
        else if(item == 109) return 'ALLIANZ'
        else if(item == 110) return 'SEGUROS BOLÍVAR'
        else if(item == 111) return 'LIBERTY'
        else if(item == 112) return 'FIDUPREVISORA'
        else return 'Sin regimen'
     }

 


     const tablaG =  formu.tablaGp(getPacId.sexo, calculateAge(getPacId.fecha_nacimiento, getPacId.antropometria.created_at), grasaP())

    const all = {
        fechaI: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
        nombre: getPacId.nombre,
        apellido: getPacId.apellido,
        identificacion: getPacId.cedula,
        direccion: getPacId.direccion,
        celular1: getPacId?.celular[0],
        celular2: getPacId?.celular[1]? getPacId?.celular[1]: 'No registrado',
        fechaN: `${new Date(getPacId.fecha_nacimiento).getDate()}/${new Date(getPacId.fecha_nacimiento).getMonth() + 1}/${new Date(getPacId.fecha_nacimiento).getFullYear()}`,
        edad: calculateAge(getPacId.fecha_nacimiento, getPacId.antropometria.created_at),
        sexo: getPacId.sexo == "f" ? 'Femenino' : 'Masculino',

        estadoCivil: getPacId.estado_civil == 1 ? 'Solter@' : getPacId.estado_civil == 2 ? 'Casad@' : getPacId.estado_civil == 3 ? 'Union libre o unión de hecho' : getPacId.estado_civil == 4 ? 'Separad@' : getPacId.estado_civil == 5 ? 'Divorciad@' : getPacId.estado_civil == 6 ? 'Viud@' : 'No calculado',
        regimen:  getPacId.bioimpedanciometria.regimen,
        entidad: entidad(getPacId.bioimpedanciometria.entidad),
        historiaN: "00000",

        fechaE: `${new Date(getPacId.antropometria.created_at).getDate()}/${new Date(getPacId.antropometria.created_at).getMonth() + 1}/${new Date(getPacId.antropometria.created_at).getFullYear()}`,
        pesoAntro: getPacId.antropometria.peso,
        cuelloAntro: getPacId.antropometria.cuello,
        tallaAntro: getPacId.antropometria.talla,
        munecaAntro: getPacId.antropometria.muneca,
        cinturaAntro: getPacId.antropometria.cintura,
        imc: formu.IMC(getPacId.antropometria.peso, getPacId.antropometria.talla).toFixed(2),
        imcIndi: imcCal < 18.5? 'Bajo Peso': imcCal >= 18.5 && imcCal <= 24.9? 'Normal': imcCal >= 25 && imcCal <= 29.9? 'Sobrepeso':imcCal >= 30 && imcCal <= 34.9? 'Obesidad 1': imcCal >= 35 && imcCal <= 39.9? 'Obesidad 2': imcCal >= 40 && imcCal <= 49.9? 'Obesidad 3': imcCal >= 50? 'Obesidad 4':'Indefinido',
        caderaAntro: getPacId.antropometria.cadera,
        cinturaCadera: formu.cinturaCadera(getPacId.antropometria.cintura, getPacId.antropometria.cadera).toFixed(2),
        cinturaCaderaIndi: formu.cintuCadeSexo(getPacId.sexo,cadeCintuCal),
        grasaCorpPORCENT: grasaP(),
        grasaCorpKG: formu.masaGrasa(getPacId.antropometria.peso, grasaP()),
        grasaCorpIndi: grasaP() < 8? 'Delgado':grasaP() < 16? 'Optimo':grasaP() < 21? 'Ligero Sobrepeso':grasaP() < 25? 'Sobrepeso':grasaP() >= 25? 'Obesidad':'Indefinido',

        pesoPerderRES: (getPacId.antropometria.peso - formu.pesoIdeal(getPacId.antropometria.peso, grasaP(), formu.pGrasaIdealJP(getPacId.sexo, calculateAge(getPacId.fecha_nacimiento, getPacId.antropometria.created_at)))).toFixed(2),

        pesoIdealRES: formu.pesoIdeal(getPacId.antropometria.peso, grasaP(), formu.pGrasaIdealJP(getPacId.sexo, calculateAge(getPacId.fecha_nacimiento, getPacId.antropometria.created_at))).toFixed(2),


        kcalBasal: getPacId.bioimpedanciometria.kca_basal,
        kcalBasalIdealRES: formu.tmb(getPacId.sexo, formu.pesoIdeal(getPacId.antropometria.peso, grasaP(), formu.pGrasaIdealJP(getPacId.sexo, calculateAge(getPacId.fecha_nacimiento, getPacId.antropometria.created_at))), getPacId.antropometria.talla, calculateAge(getPacId.fecha_nacimiento, getPacId.antropometria.created_at)).toFixed(0),
        edadCorporal: getPacId.bioimpedanciometria.edad_corporal,

        grasaVisceral: parseFloat(getPacId.bioimpedanciometria.grasa_visceral),

        rb1gp: tablaG.rb1gp,
        rb2gp: tablaG.rb2gp,
        rb3gp: tablaG.rb3gp,
        rp1gp: tablaG.rp1gp,
        rp2gp: tablaG.rp2gp,
        rp3gp: tablaG.rp3gp,
        calc100: tablaG.calc100,
        colorGrasa: tablaG.colorGrasa,
        textIndi: tablaG.textIndi,
    
    }

    return all;
}