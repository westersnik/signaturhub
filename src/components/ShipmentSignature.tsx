import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SignatureCanvas from '@/components/SignatureCanvas';

interface ShipmentSignatureProps {
  signatureName: string;
  setSignatureName: (name: string) => void;
  onSave: (signatureData: string) => void;
  onCancel: () => void;
}

export const ShipmentSignature = ({ signatureName, setSignatureName, onSave, onCancel }: ShipmentSignatureProps) => {
  return (
    <Card className="w-full max-w-md p-6">
      <h2 className="text-xl font-semibold mb-4">Sign Shipment</h2>
      <div className="space-y-4">
        <Input
          placeholder="Enter signature name"
          value={signatureName}
          onChange={(e) => setSignatureName(e.target.value)}
          className="mb-4"
        />
        <SignatureCanvas
          onSave={onSave}
          onCancel={onCancel}
        />
      </div>
    </Card>
  );
};