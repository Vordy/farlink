import React from "react";
import { useNavigate, useParams } from "react-router";

import { Peer } from "peerjs";
import { nanoid } from "nanoid";

import { Box, Button, Card, Flex, Link, Text } from "rebass";

import copy from "copy-to-clipboard";
import { QR } from "../encoding/QR";
import { usePeerManager } from "../peer-manager";
import { PeerConnect } from "../components/PeerConnect";
import { pButton, sButton } from "../styles/buttons";

// const BASE_URL = "https://www.farl.ink";

export const BaseCard = ({
  children,
  hide,
  title,
  subtext,
}: {
  children?: React.ReactNode | React.ReactNode[];
  hide?: boolean;
  title?: string;
  subtext?: string;
}) => {
  return (
    <Flex justifyContent="center">
      <Card
        sx={{
          width: "100%",
          maxWidth: "512px",
          p: "2",
          mx: "1",
          mt: "2",
          border: "3px solid #C8C8C8",
          borderRadius: "5px",
          background: "#161616",
        }}
      >
        <Flex flexDirection={"column"} justifyContent="center">
          {!hide && (
            <>
              <Flex justifyContent="space-between" alignItems="center">
                {title ? (
                  <Text fontSize={32}>{title}</Text>
                ) : (
                  <Text fontSize={32}>{`Farl[ink]`}</Text>
                )}
                {subtext && <Text fontSize={24}>{subtext}</Text>}
              </Flex>
              <Text>{"Direct Peer2Peer Encrypted Exchange"}</Text>
              <Text>{"Powered by WebRTC and Unique IDs"}</Text>
              <Text>{`Vordy was here 💖`}</Text>
            </>
          )}
          {children}
        </Flex>
      </Card>
    </Flex>
  );
};

export const Base = () => {
  const { source } = useParams();
  const navigate = useNavigate();

  const peerManager = usePeerManager(source);

  const { easyPeerId } = peerManager;

  const [token, setToken] = React.useState<string | undefined>(undefined);
  const [link, setLink] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    if (!token) {
      if (!source) {
        // Navigate to valid token
        const newPath = `/from/${nanoid()}`;
        navigate(newPath, { replace: true });
      } else {
        setToken(source);
      }
    } else {
      setLink(`${window.location.origin}/from/${easyPeerId}/to/${token}/`);
    }
  }, [source, token, easyPeerId, navigate]);

  return (
    <>
      <BaseCard>
        {token && <TextCopyAndQR title={`Your ID:`} text={token} />}
        {link && <TextCopyAndQR title={`Easy-Peer Link:`} text={link} />}
      </BaseCard>
      <PeerConnect peerManager={peerManager} />
    </>
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
          sx={pButton}
        >{`Copy`}</Button>
      </Flex>
      <Button
        onClick={() => {
          setOpenQr(!openQr);
        }}
        fontSize="1"
        sx={sButton}
      >{`QR`}</Button>
      {openQr && <QR input={text} />}
    </Flex>
  );
};
