import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import SignatureCanvas from '@/components/SignatureCanvas';
import { Shipment } from '@/lib/types';
import { toast } from 'sonner';
import { FileText } from 'lucide-react';

const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: '1',
    date: '2024-01-20',
    items: [
      { id: '1', name: 'Package A', quantity: 2, unit: 'boxes' },
      { id: '2', name: 'Package B', quantity: 1, unit: 'pallet' },
    ],
    status: 'pending',
    company: 'Aker Solutions',
  },
  {
    id: '2',
    date: '2024-01-20',
    items: [
      { id: '3', name: 'Package C', quantity: 3, unit: 'boxes' },
    ],
    status: 'pending',
    company: 'Aker Solutions',
  },
];

const DriverView = () => {
  const [shipments, setShipments] = useState(MOCK_SHIPMENTS);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [selectedShipments, setSelectedShipments] = useState<string[]>([]);
  const [showSignature, setShowSignature] = useState(false);
  const [signatureName, setSignatureName] = useState('');
  const [partialDeliveries, setPartialDeliveries] = useState<Record<string, Record<string, number>>>({});

  const handleSign = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setShowSignature(true);
  };

  const handleSaveSignature = async (signatureData: string) => {
    if (!signatureName) {
      toast.error('Please enter a signature name');
      return;
    }

    if (selectedShipment) {
      const actualTimeOfArrival = new Date().toLocaleString();
      const updatedShipments = shipments.map((s) =>
        s.id === selectedShipment.id
          ? {
              ...s,
              status: 'signed' as const,
              signature: signatureData,
              signatureName,
              actualTimeOfArrival,
              items: s.items.map((item) => ({
                ...item,
                delivered: partialDeliveries[s.id]?.[item.id] ?? item.quantity,
              })),
            }
          : s
      );
      setShipments(updatedShipments);
      setShowSignature(false);
      setSelectedShipment(null);
      
      toast.success(`Delivery signed by ${signatureName} for ${selectedShipment.company}`, {
        description: `Actual time of arrival: ${actualTimeOfArrival}`,
      });
      console.log('Sending email to daniel@invig.no');
    }
  };

  const handlePartialDeliveryChange = (shipmentId: string, itemId: string, value: number) => {
    setPartialDeliveries((prev) => ({
      ...prev,
      [shipmentId]: {
        ...(prev[shipmentId] || {}),
        [itemId]: value,
      },
    }));
  };

  const toggleShipmentSelection = (shipmentId: string) => {
    setSelectedShipments((prev) =>
      prev.includes(shipmentId)
        ? prev.filter((id) => id !== shipmentId)
        : [...prev, shipmentId]
    );
  };

  const createManifest = () => {
    if (selectedShipments.length === 0) {
      toast.error('Please select at least one shipment');
      return;
    }

    const selectedItems = shipments
      .filter((s) => selectedShipments.includes(s.id))
      .map((s) => ({
        shipmentId: s.id,
        date: s.date,
        items: s.items,
      }));

    console.log('Manifest created for shipments:', selectedItems);
    toast.success(`Manifest created for ${selectedShipments.length} shipments`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Today's Shipments</h1>
          <div className="space-x-4">
            {selectedShipments.length > 0 && (
              <Button onClick={createManifest} className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Create Manifest ({selectedShipments.length})
              </Button>
            )}
          </div>
        </div>
        
        {showSignature && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md p-6">
              <h2 className="text-xl font-semibold mb-4">Sign Shipment</h2>
              <div className="space-y-4 mb-4">
                <Input
                  placeholder="Enter signature name"
                  value={signatureName}
                  onChange={(e) => setSignatureName(e.target.value)}
                  className="w-full"
                />
              </div>
              <SignatureCanvas
                onSave={handleSaveSignature}
                onCancel={() => {
                  setShowSignature(false);
                  setSignatureName('');
                }}
              />
            </Card>
          </div>
        )}

        {shipments.map((shipment) => (
          <Card key={shipment.id} className="p-6">
            <div className="flex items-start gap-4">
              <Checkbox
                checked={selectedShipments.includes(shipment.id)}
                onCheckedChange={() => toggleShipmentSelection(shipment.id)}
                id={`shipment-${shipment.id}`}
              />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">Shipment #{shipment.id}</h3>
                    <p className="text-sm text-gray-500">{shipment.date}</p>
                    <p className="text-sm text-gray-500">Company: {shipment.company}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      shipment.status === 'signed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
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
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="0"
                          max={item.quantity}
                          value={partialDeliveries[shipment.id]?.[item.id] ?? item.quantity}
                          onChange={(e) => 
                            handlePartialDeliveryChange(
                              shipment.id,
                              item.id,
                              Math.min(parseInt(e.target.value) || 0, item.quantity)
                            )
                          }
                          className="w-20"
                        />
                        <span className="text-gray-600">/ {item.quantity} {item.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {shipment.status === 'pending' && (
                  <Button
                    onClick={() => handleSign(shipment)}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Sign Shipment
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DriverView;
