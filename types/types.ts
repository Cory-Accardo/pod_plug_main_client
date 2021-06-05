export interface Location {
  index: number;
  name: string;
  coords: {
    latitude: number;
    longitude: number;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zip: number;
  };
}