import React from "react";
import { useNavigate, useParams } from "react-router";

import { Peer } from "peerjs";
import { nanoid } from "nanoid";

import { Box, Button, Card, Flex, Link, Text } from "rebass";

import copy from "copy-to-clipboard";
import { QR } from "../encoding/QR";
import { usePeerManager } from "../peerlist/peer-manager";

const BASE_URL = "http://10.0.0.172:3000";

export const Base = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { nextPeerId } = usePeerManager(id);

  const [token, setToken] = React.useState<string | undefined>(undefined);
  const [link, setLink] = React.useState<string | undefined>(undefined);

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
      setLink(`${BASE_URL}/peer/${token}/to/${nextPeerId}/`);
    }
  }, [id, token, nextPeerId, navigate]);

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
          </Flex>
          <Text>{"Purely Peer2Peer Data Exchange"}</Text>
          <Text>{"Powered by WebRTC and Unique IDs"}</Text>
          <Text>{"Data is encrypted in flight"}</Text>
          {token && <TextCopyAndQR title={`Your ID:`} text={token} />}
          {link && <TextCopyAndQR title={`Easy-Peer Link:`} text={link} />}
        </Flex>
      </Card>
    </Flex>
  );
};

export const TextCopyAndQR = ({
  title,
  text,
}: {
  title: string;
  text: string;
}) => {
  const [openQr, setOpenQr] = React.useState(false);

  return (
    <Flex
      flexDirection={"column"}
      sx={{
        p: 1,
        mt: 3,
        background: "#363636",
        border: "2px solid #C8C8C8",
        borderRadius: "5px",
      }}
    >
      <Text>{title}</Text>
      <Flex
        sx={{
          width: "100%",
          display: "flex",
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
            whiteSpace: "nowrap",
          }}
        >{`${text}`}</Text>
        <Button
          onClick={() => {
            copy(text);
          }}
          fontSize="1"
          sx={{
            p: 1,
            marginLeft: "1",
            width: "auto",
            background: "#404071",
            border: "1px solid #C8C8C8",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >{`Copy`}</Button>
        <Button
          onClick={() => {
            setOpenQr(!openQr);
          }}
          fontSize="1"
          sx={{
            p: 1,
            marginLeft: "1",
            width: "auto",
            background: "#ec523b",
            border: "1px solid #C8C8C8",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >{`QR`}</Button>
      </Flex>
      {openQr && <QR input={text} />}
    </Flex>
  );
};
