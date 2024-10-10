"use client";

import { QRCodeSVG } from "qrcode.react";

interface QrCodeProps {
  value: string;
}

export default function QrCode({ value }: QrCodeProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-inner">
      <QRCodeSVG
        value={`tel:${value}`}
        size={200}
        level="H"
        includeMargin={true}
        className="mx-auto"
      />
    </div>
  );
}
