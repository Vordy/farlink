import React from "react";

import { Box, Button, Card, Flex, Link, Text } from "rebass";

import copy from "copy-to-clipboard";

export interface PeerConn {
  connected: boolean;
  token: string;
  link: string;
}

export const Peer = ({ peer }: { peer: PeerConn }) => {
  const { token, link } = peer;

  return (
    <Flex justifyContent="center">
      <Card
        sx={{
          background: "#161616",
          p: "5px",
          border: "3px solid #C8C8C8",
          borderRadius: "5px",
          width: "100%",
          mx: "1",
          marginTop: "10px",
          maxWidth: "512px",
        }}
      >
        <Flex flexDirection={"column"} justifyContent="center">
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize={32}>Farl[ink]</Text>
            {peer.connected ? (
              <Text fontSize={24} color="green">
                {`[Connected]`}
              </Text>
            ) : (
              <Text fontSize={24} color="red">
                {`[Disconnected]`}
              </Text>
            )}
          </Flex>
          <Text>{"Purely Peer2Peer Data Exchange"}</Text>
          <Text>{"Powered by WebRTC and Unique IDs"}</Text>
          <Text>{"Data is encrypted in flight"}</Text>
          <Text>{`ID: ${token}`}</Text>
          <Text>{`Link:`}</Text>

          <Flex
            onClick={() => {
              if (link) copy(link);
            }}
            sx={{
              p: 1,
              width: "100%",
              display: "flex",
              background: "#363636",
              border: "2px solid #C8C8C8",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            <Text
              fontSize="1"
              sx={{
                p: 1,
                flex: 1,
                display: "flex",
                overflow: "auto",
                alignItems: "center",
                background: "#363636",
                border: "1px solid #C8C8C8",
                borderRadius: "5px",
              }}
            >{`${link}`}</Text>
            <Button
              fontSize="1"
              sx={{
                p: 1,
                marginLeft: "1",
                width: "auto",
                background: "#404071",
                border: "1px solid #C8C8C8",
                borderRadius: "5px",
              }}
            >{`Copy`}</Button>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};
