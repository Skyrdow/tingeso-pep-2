export enum MotorType {
  Gasolina,
  Diesel,
  Hibrido,
  Electrico,
}
export enum CarType {
  Sedan,
  Hatchback,
  SUV,
  Pickup,
  Furgoneta,
}

export enum ReparationType {
  Frenos,
  Refrigeracion,
  Motor,
  Transmision,
  Electrico,
  Escape,
  Neumaticos,
  Suspension,
  Calefaccion,
  Combustible,
  Parabrisas,
}

export type Car = {
  patent: string;
  brand: string;
  model: string;
  fabDate: Date;
  mileage: number;
  seatCount: number;
  motorType: MotorType | undefined;
  carType: CarType | undefined;
  brandBonus: number;
};

export type Price = {
  id: number;
  gasolinePrice: number;
  dieselPrice: number;
  hibridoPrice: number;
  electricoPrice: number;
};

export type Reparation = {
  patent: string;
  admissionDate: Date;
  reparationTypes: string[];
  repairExitDate: Date;
  retrievalDate: Date;
};
