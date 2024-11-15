import { Button } from '@/components/ui/button';
import { QrCode, FileText } from 'lucide-react';

interface ShipmentActionsProps {
  selectedShipments: string[];
  onCreateManifest: () => void;
  onScanQR: () => void;
}

export const ShipmentActions = ({ selectedShipments, onCreateManifest, onScanQR }: ShipmentActionsProps) => {
  return (
    <div className="flex gap-4 mt-4">
      <Button
        onClick={onScanQR}
        className="flex items-center gap-2"
      >
        <QrCode className="h-4 w-4" />
        Scan QR Code
      </Button>
      {selectedShipments.length > 0 && (
        <Button onClick={onCreateManifest} className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Create Manifest ({selectedShipments.length})
        </Button>
      )}
    </div>
  );
};