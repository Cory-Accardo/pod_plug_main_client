export interface Location {
  index: number;
  name: string;
  coords: {
    lat: number;
    lon: number;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zip: number;
  };
}
