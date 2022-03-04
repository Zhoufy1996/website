import { useEffect, useRef } from 'react';
import QRCodeR from 'qrcode';

interface QRCodeProps {
  value:string;
  width?:number;
  height?:number;
}
const QRCode = ({ value, width = 400, height = 300 }:QRCodeProps) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && value) {
      QRCodeR.toCanvas(ref.current, value, (error) => {
        if (error) {
          console.error(error);
        }
      });
    }
  }, [value]);

  return (
    <canvas style={{ border: '1px solid black' }} width={width} height={height} ref={ref} />
  );
};

export default QRCode;
