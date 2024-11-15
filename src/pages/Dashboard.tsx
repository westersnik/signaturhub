import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shipment, ShipmentItem } from '@/lib/types';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { ShipmentForm } from '@/components/ShipmentForm';
import { ShipmentList } from '@/components/ShipmentList';

const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: '1',
    date: '2024-01-20',
    items: [{ id: '1', name: 'Electronics Package', quantity: 3, unit: 'boxes' }],
    status: 'pending',
    driverName: 'Driver 1',
    address: '123 Main St, Oslo',
    company: 'Aker Solutions'
  },
  {
    id: '2',
    date: '2024-01-20',
    items: [{ id: '2', name: 'Office Supplies', quantity: 5, unit: 'boxes' }],
    status: 'pending',
    driverName: 'Driver 2',
    address: '456 Park Ave, Bergen',
    company: 'Aker Solutions'
  },
  {
    id: '3',
    date: '2024-01-21',
    items: [{ id: '3', name: 'Furniture', quantity: 2, unit: 'pallets' }],
    status: 'pending',
    driverName: 'Driver 3',
    address: '789 Oak Rd, Trondheim',
    company: 'Equinor'
  },
  {
    id: '4',
    date: '2024-01-21',
    items: [{ id: '4', name: 'Medical Supplies', quantity: 4, unit: 'boxes' }],
    status: 'pending',
    driverName: 'Knut Hansen',
    address: '321 Pine St, Stavanger',
    company: 'Equinor'
  },
  {
    id: '5',
    date: '2024-01-22',
    items: [{ id: '5', name: 'Construction Materials', quantity: 1, unit: 'pallet' }],
    status: 'pending',
    driverName: 'Driver 2',
    address: '654 Elm St, Tromsø',
    company: 'Aker Solutions'
  }
];

const Dashboard = () => {
  const [shipments, setShipments] = useState<Shipment[]>(MOCK_SHIPMENTS);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-primary">Project Company Dashboard</h1>
        <ShipmentForm setShipments={setShipments} />
        <ShipmentList shipments={shipments} />
      </div>
    </div>
  );
};

export default Dashboard;