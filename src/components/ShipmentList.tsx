import { Card } from '@/components/ui/card';
import { Shipment } from '@/lib/types';

interface ShipmentListProps {
  shipments: Shipment[];
}

export const ShipmentList = ({ shipments }: ShipmentListProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Recent Shipments</h2>
      {shipments.map((shipment) => (
        <Card key={shipment.id} className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold">Shipment #{shipment.id}</h3>
              <p className="text-sm text-gray-500">{shipment.date}</p>
              <p className="text-sm text-gray-500">Driver: {shipment.driverName}</p>
              <p className="text-sm text-gray-500">Company: {shipment.company}</p>
              <p className="text-sm text-gray-500">Address: {shipment.address}</p>
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

          <div className="space-y-2">
            {shipment.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-2"
              >
                <span>{item.name}</span>
                <span className="text-gray-600">
                  {item.delivered !== undefined ? `${item.delivered}/` : ''}{item.quantity} {item.unit}
                </span>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};