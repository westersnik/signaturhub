import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shipment, ShipmentItem } from '@/lib/types';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const Dashboard = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [newShipment, setNewShipment] = useState<{
    items: ShipmentItem[];
    date: string;
  }>({
    items: [],
    date: new Date().toISOString().split('T')[0],
  });

  const addItem = () => {
    setNewShipment((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: Math.random().toString(),
          name: '',
          quantity: 1,
          unit: 'boxes',
        },
      ],
    }));
  };

  const removeItem = (id: string) => {
    setNewShipment((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const updateItem = (id: string, field: keyof ShipmentItem, value: string | number) => {
    setNewShipment((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const createShipment = () => {
    if (newShipment.items.length === 0) {
      toast.error('Please add at least one item');
      return;
    }

    const shipment: Shipment = {
      id: (shipments.length + 1).toString(),
      date: newShipment.date,
      items: newShipment.items,
      status: 'pending',
    };

    setShipments((prev) => [...prev, shipment]);
    setNewShipment({
      items: [],
      date: new Date().toISOString().split('T')[0],
    });
    toast.success('Shipment created successfully');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-primary">Project Company Dashboard</h1>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Create New Shipment</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <Input
                type="date"
                value={newShipment.date}
                onChange={(e) =>
                  setNewShipment((prev) => ({ ...prev, date: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              {newShipment.items.map((item) => (
                <div key={item.id} className="flex gap-2 items-start">
                  <Input
                    placeholder="Item name"
                    value={item.name}
                    onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                    className="flex-grow"
                  />
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(item.id, 'quantity', parseInt(e.target.value))
                    }
                    className="w-24"
                  />
                  <Input
                    value={item.unit}
                    onChange={(e) => updateItem(item.id, 'unit', e.target.value)}
                    className="w-24"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button onClick={addItem} variant="outline" className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
              <Button onClick={createShipment} className="bg-secondary hover:bg-secondary/90">
                Create Shipment
              </Button>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Shipments</h2>
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

              <div className="space-y-2">
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
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;