export interface Shipment {
  id: string;
  date: string;
  items: ShipmentItem[];
  status: 'pending' | 'signed' | 'delivered';
  driverName?: string;
  signature?: string;
  signatureName?: string;
  address?: string;
  project?: string;
  transportCompany?: string;
  partialDelivery?: boolean;
  actualTimeOfArrival?: string;
}

export interface ShipmentItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  delivered?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'driver' | 'company';
}