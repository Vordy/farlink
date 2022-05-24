import React from "react";
import { useNavigate, useParams } from "react-router";

import { Peer } from "peerjs";
import { nanoid } from "nanoid";

import { Box, Button, Card, Flex, Link, Text } from "rebass";

import copy from "copy-to-clipboard";

const BASE_URL = "http://localhost:3000";

export const Base = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [token, setToken] = React.useState<string | undefined>(undefined);
  const [link, setLink] = React.useState<string | undefined>(undefined);
  const [peer, setPeer] = React.useState<Peer | undefined>(undefined);

  React.useEffect(() => {
    if (!token) {
      if (!id) {
        // Navigate to valid token
        const newPath = `${nanoid()}`;
        navigate(newPath);
      } else {
        setToken(id);
      }
    } else {
      setLink(`${BASE_URL}/link/${token}`);
      setPeer(new Peer(token));
    }

    if (peer) {
    }

    return () => {
      if (peer) {
        peer.destroy();
      }
    };
  }, [id, token, navigate, peer]);

  return (
    <Flex justifyContent="center">
      <Card
        sx={{
          background: "#161616",
          p: "5px",
          border: "3px solid #C8C8C8",
          borderRadius: "5px",
          width: "100%",
          mx: "10px",
          marginTop: "10px",
          maxWidth: "512px",
        }}
      >
        <Flex flexDirection={"column"} justifyContent="center">
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize={32}>Farl[ink]</Text>
            {peer?.disconnected ? (
              <Text fontSize={24} color="red">
                [InAct]
              </Text>
            ) : (
              <Text fontSize={24} color="green">
                {`[Act]`}
              </Text>
            )}
          </Flex>
          <Text>{"Purely Peer2Peer Data Exchange "}</Text>
          <Text>{"Powered by encrypted WebRTC and unique IDs"}</Text>
          <Text>{`Your ID is: ${token}`}</Text>
          <Text>{`Your Link is:`}</Text>
          <Text sx={{ display: "inline" }} color="dodgerblue">
            Copy
          </Text>
          <Text>{`${link}`}</Text>
          <Box
            onClick={() => {
              if (link) copy(link);
            }}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              background: "#363636",
              border: "3px solid #C8C8C8",
              borderRadius: "5px",
              cursor: "pointer",
              mx: "auto",
            }}
          >{`Click to Copy`}</Box>
        </Flex>
      </Card>
    </Flex>
  );
};
