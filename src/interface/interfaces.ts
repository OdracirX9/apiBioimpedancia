export interface client {
    id_paciente?:number | string;
    nombre:string;
	apellido:string;
	cedula:string | number;
	sexo:string | any
	celular:string[]
	fecha_nacimiento:string | Date;
	ocupacion:string;
    create_at?:Date | string;
}

export interface antropometria {
    id?: number | string;
    id_paciente: number | string;
    peso: number | string;
    talla: number | string;
    cms_perimetro_cintura: number | string;
    cms_perimetro_cadera: number | string;
    cms_perimetro_cuello: number | string;
    contorno_muneca: number | string;
    create_at?:Date | string;
}


export interface bioimpedancia {
    id?: number | string;
    id_paciente:number | string;
    grasa_corporal:number | string;
	masa_muscular:number | string;
	kca_basal:number | string;
	edad_corporal:number | string; 
	grasa_visceral:number | string;
    create_at?:Date | string;
}

export interface antro_bio {
    antropometria: antropometria;
    bioimpedancia: bioimpedancia;
}