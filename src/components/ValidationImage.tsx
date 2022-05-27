import React from "react";
import { Button, Flex, Image } from "rebass";
import { sButton } from "../styles/buttons";
import { NetState } from "./PeerNetwork";

export const ValidationImage = ({ hide }: { hide?: boolean }) => {
  const { peerVal, sourceVal, validate } = React.useContext(NetState);

  return (
    <Flex justifyContent={"space-around"}>
      {!peerVal && !sourceVal && (
        <Button sx={sButton} onClick={() => validate()}>
          Validate
        </Button>
      )}
      <Image sx={{ height: "auto", maxHeight: "24vw" }} src={sourceVal}></Image>
      <Image sx={{ height: "auto", maxHeight: "24vw" }} src={peerVal}></Image>
    </Flex>
  );
};
