import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shipment, ShipmentItem } from '@/lib/types';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface ShipmentFormProps {
  setShipments: React.Dispatch<React.SetStateAction<Shipment[]>>;
}

export const ShipmentForm = ({ setShipments }: ShipmentFormProps) => {
  const [newShipment, setNewShipment] = useState<{
    items: ShipmentItem[];
    date: string;
    driverName?: string;
    address: string;
    project?: string;
    transportCompany?: string;
  }>({
    items: [],
    date: new Date().toISOString().split('T')[0],
    driverName: undefined,
    address: '',
    project: undefined,
    transportCompany: undefined,
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

    if (!newShipment.driverName) {
      toast.error('Please select a driver');
      return;
    }

    if (!newShipment.project) {
      toast.error('Please select a project');
      return;
    }

    if (!newShipment.transportCompany) {
      toast.error('Please select a transport company');
      return;
    }

    if (!newShipment.address) {
      toast.error('Please enter a delivery address');
      return;
    }

    setShipments((prev) => [
      ...prev,
      {
        id: (prev.length + 1).toString(),
        date: newShipment.date,
        items: newShipment.items,
        status: 'pending',
        driverName: newShipment.driverName,
        address: newShipment.address,
        project: newShipment.project,
        transportCompany: newShipment.transportCompany,
      },
    ]);

    setNewShipment({
      items: [],
      date: new Date().toISOString().split('T')[0],
      driverName: undefined,
      address: '',
      project: undefined,
      transportCompany: undefined,
    });
    
    toast.success('Shipment created successfully');
  };

  return (
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Driver
          </label>
          <Select
            value={newShipment.driverName}
            onValueChange={(value) =>
              setNewShipment((prev) => ({ ...prev, driverName: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a driver" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Driver 1">Driver 1</SelectItem>
              <SelectItem value="Driver 2">Driver 2</SelectItem>
              <SelectItem value="Driver 3">Driver 3</SelectItem>
              <SelectItem value="Knut Hansen">Knut Hansen</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project
          </label>
          <Select
            value={newShipment.project}
            onValueChange={(value) =>
              setNewShipment((prev) => ({ ...prev, project: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Aker Solutions">Aker Solutions</SelectItem>
              <SelectItem value="Equinor">Equinor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Transport Company
          </label>
          <Select
            value={newShipment.transportCompany}
            onValueChange={(value) =>
              setNewShipment((prev) => ({ ...prev, transportCompany: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a transport company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Schenker">Schenker</SelectItem>
              <SelectItem value="Royal Transport">Royal Transport</SelectItem>
              <SelectItem value="Tenden Transport">Tenden Transport</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Delivery Address
          </label>
          <Input
            placeholder="Enter delivery address"
            value={newShipment.address}
            onChange={(e) =>
              setNewShipment((prev) => ({ ...prev, address: e.target.value }))
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
  );
};