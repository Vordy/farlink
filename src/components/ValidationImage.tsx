import React from "react";
import { Flex, Image } from "rebass";
import { BaseCard } from "../pages/Base";
import { PeerManager } from "../peer-manager";

export const ValidationImage = ({
  peerManager,
  hide,
}: {
  peerManager: PeerManager;
  hide?: boolean;
}) => {
  const { connected, validation, send } = peerManager;
  const [dog, setDog] = React.useState();

  React.useEffect(() => {
    const fetchDog = async () => {
      const data = await fetch("https://dog.ceo/api/breeds/image/random");
      const parsed = await data.json();

      setDog(parsed.message);
      send("ValidationImage", parsed.message);
      console.log(`Sending validation dog ${parsed.message}`);
    };

    if (connected) {
      fetchDog();
    }
  }, [connected]);

  return (
    <Flex justifyContent={"space-around"}>
      <Image sx={{ height: "auto", maxHeight: "24vw" }} src={dog}></Image>
      <Image
        sx={{ height: "auto", maxHeight: "24vw" }}
        src={validation}
      ></Image>
    </Flex>
  );
};
