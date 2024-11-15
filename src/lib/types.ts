export interface Shipment {
  id: string;
  date: string;
  items: ShipmentItem[];
  status: 'pending' | 'signed' | 'delivered';
  driverName?: string;
  signature?: string;
  address?: string;
}

export interface ShipmentItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'driver' | 'company';
}