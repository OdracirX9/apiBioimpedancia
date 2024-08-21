export interface client {
    uuid?:any | string;
    nombre:string;
	apellido:string;
	cedula:string | number;
	sexo:string | any
	celular:string[]
	fecha_nacimiento:string | Date;
	ocupacion:string;
    direccion:string;
    estado_civil:string | number;
    created_at?:Date | string;
}

export interface antropometria {
    uuid?: any | string;
    id_paciente: any | string;
    peso: number | string;
    talla: number | string;
    cintura: number | string;
    cadera: number | string;
    cuello: number | string;
    muneca: number | string;
    created_at?:Date | string;
}


export interface bioimpedancia {
    uuid?: any | string;
    id_paciente:any | string;
    grasa_corporal:number | string;
	masa_muscular:number | string;
	kca_basal:number | string;
	edad_corporal:number | string; 
	grasa_visceral:number | string;
    created_at?:Date | string;
    regimen?: number | string;
    entidad?: number | string;
}

export interface antro_bio {
    antropometria: antropometria;
    bioimpedancia: bioimpedancia;
}