export interface TimeInt {
  seconds: number;
  minutes: number;
  hours: number;
}

interface Transform {
  transform: string;
}

export interface TimeStyles {
  seconds: Transform;
  minutes: Transform;
  hours: Transform;
}
