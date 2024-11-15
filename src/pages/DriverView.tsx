import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SignatureCanvas from '@/components/SignatureCanvas';
import { Shipment } from '@/lib/types';
import { toast } from 'sonner';

const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: '1',
    date: '2024-01-20',
    items: [
      { id: '1', name: 'Package A', quantity: 2, unit: 'boxes' },
      { id: '2', name: 'Package B', quantity: 1, unit: 'pallet' },
    ],
    status: 'pending',
  },
];

const DriverView = () => {
  const [shipments, setShipments] = useState(MOCK_SHIPMENTS);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [showSignature, setShowSignature] = useState(false);

  const handleSign = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setShowSignature(true);
  };

  const handleSaveSignature = async (signatureData: string) => {
    if (selectedShipment) {
      // In a real app, this would be an API call
      const updatedShipments = shipments.map((s) =>
        s.id === selectedShipment.id
          ? { ...s, status: 'signed' as const, signature: signatureData }
          : s
      );
      setShipments(updatedShipments);
      setShowSignature(false);
      setSelectedShipment(null);
      
      toast.success('Shipment signed successfully');
      // Here we would trigger the email sending
      console.log('Sending email to daniel@invig.no');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-primary">Today's Shipments</h1>
        
        {showSignature && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md p-6">
              <h2 className="text-xl font-semibold mb-4">Sign Shipment</h2>
              <SignatureCanvas
                onSave={handleSaveSignature}
                onCancel={() => setShowSignature(false)}
              />
            </Card>
          </div>
        )}

        {shipments.map((shipment) => (
          <Card key={shipment.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">Shipment #{shipment.id}</h3>
                <p className="text-sm text-gray-500">{shipment.date}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  shipment.status === 'signed'
                    ? 'bg-success/20 text-success'
                    : 'bg-secondary/20 text-secondary'
                }`}
              >
                {shipment.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              {shipment.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <span>{item.name}</span>
                  <span className="text-gray-600">
                    {item.quantity} {item.unit}
                  </span>
                </div>
              ))}
            </div>

            {shipment.status === 'pending' && (
              <Button
                onClick={() => handleSign(shipment)}
                className="w-full bg-secondary hover:bg-secondary/90"
              >
                Sign Shipment
              </Button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DriverView;