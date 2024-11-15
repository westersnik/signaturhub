import { useRef, useEffect } from 'react';
import SignaturePad from 'signature_pad';
import { Button } from './ui/button';

interface SignatureCanvasProps {
  onSave: (signature: string) => void;
  onCancel: () => void;
}

const SignatureCanvas = ({ onSave, onCancel }: SignatureCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signaturePadRef = useRef<SignaturePad | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      signaturePadRef.current = new SignaturePad(canvasRef.current);
    }

    return () => {
      if (signaturePadRef.current) {
        signaturePadRef.current.clear();
      }
    };
  }, []);

  const handleSave = () => {
    if (signaturePadRef.current) {
      const dataUrl = signaturePadRef.current.toDataURL();
      onSave(dataUrl);
    }
  };

  const handleClear = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-lg p-2 bg-white">
        <canvas
          ref={canvasRef}
          className="w-full touch-none"
          width={400}
          height={200}
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={handleClear} variant="outline">
          Clear
        </Button>
        <Button onClick={handleSave} className="bg-success hover:bg-success/90">
          Save
        </Button>
        <Button onClick={onCancel} variant="destructive">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default SignatureCanvas;