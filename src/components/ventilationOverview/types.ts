export interface VentilationProps {
  ventilation: {
    pump: {
      pumpDescription: string;
      pumpNumber: number;
    };
    area: {
      areaType: string;
    };
    status: {
      statusCondition: boolean;
    };
  };
}
