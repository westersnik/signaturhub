import { useState } from 'react';
import { ShipmentForm } from '@/components/ShipmentForm';
import { ShipmentList } from '@/components/ShipmentList';
import { Button } from '@/components/ui/button';
import { Shipment } from '@/lib/types';

const Dashboard = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-primary">Project Company Dashboard</h1>
        <ShipmentForm setShipments={setShipments} />
        <ShipmentList shipments={shipments} />
        
        <div className="flex gap-4 mt-8">
          <Button variant="outline" className="w-full">
            Sync with Sedna
          </Button>
          <Button variant="outline" className="w-full">
            Sync with Cargowise
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;