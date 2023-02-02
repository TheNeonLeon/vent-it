export interface VentilationProps {
  id: string;
  status: {
    statusCondition: boolean;
  };
  ventilation: {
    pump: {
      pumpDescription: string;
      pumpNumber: number;
    };
    area: {
      areaType: string;
    };
  };
}
