export interface VentilationForm {
    ventilation:{
        pumpNumber: number;
        pumpArea:string;
        pumpStatus:boolean;
    }
}

export interface AreaDataProps {
    areaType: string;
}