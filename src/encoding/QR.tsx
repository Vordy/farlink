import React from "react";

import QRCode from "qrcode";
import { Image } from "rebass";

export const QR = ({ input }: { input: string }) => {
  const [qr, setQr] = React.useState<string | undefined>(undefined);

  const generateQR = async (input: string) => {
    try {
      const qr = await QRCode.toDataURL(input);
      setQr(qr);
      console.log(qr);
    } catch (err) {
      console.error(err);
    }
  };

  generateQR(input);

  return (
    <Image
      src={qr}
      sx={{ mt: 1, width: "70%", height: "auto", alignSelf: "center" }}
    />
  );
};
