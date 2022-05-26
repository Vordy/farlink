import React from "react";

import { Box, Button, Flex } from "rebass";
import { Input } from "@rebass/forms";

import { BaseCard } from "../pages/Base";
import { PeerManager } from "../peer-manager";
import { pButton, sButton } from "../styles/buttons";

import { CircleLoader } from "react-spinners";
import { ValidationImage } from "./ValidationImage";

export const PeerConnect = ({
  peerManager,
  hide,
}: {
  peerManager: PeerManager;
  hide?: boolean;
}) => {
  const { connecting, connected, connect } = peerManager;

  return (
    <>
      <BaseCard hide>
        {connecting && (
          <Flex flexDirection="column" alignItems="center" sx={{ py: 2 }}>
            <CircleLoader color={"#ec523b"} loading={connecting} />
          </Flex>
        )}
        {!connected && (
          <Flex flexDirection="column" alignItems="center">
            {!hide && (
              <Flex sx={{ width: "100%" }}>
                <Input
                  sx={{
                    p: 1,
                    width: "100%",
                    background: "#363636",
                    border: "1px solid #C8C8C8",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  name="email"
                  type="url"
                  placeholder="Peer ID"
                />
                <Button sx={pButton} onClick={() => connect()}>
                  Connect
                </Button>
              </Flex>
            )}
            <Button sx={sButton} onClick={() => connect()}>
              EasyPeer Connect
            </Button>
          </Flex>
        )}
        {connected && <ValidationImage peerManager={peerManager} />}
      </BaseCard>
    </>
  );
};
