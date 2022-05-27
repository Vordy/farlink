import React from "react";
import { useNavigate, useParams } from "react-router";

import { nanoid } from "nanoid";

import { Button, Card, Flex, Text } from "rebass";

import copy from "copy-to-clipboard";
import { QR } from "../components/QR";
import { PeerConnect } from "../components/PeerConnect";
import { pButton, sButton } from "../styles/buttons";
import { NetState } from "../components/PeerNetwork";

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

  const { init, sourceId, peerId, setSourceId } = React.useContext(NetState);

  const [easyPeerLink, setEasyPeerLink] = React.useState<string | undefined>(
    undefined
  );

  React.useEffect(() => {
    if (!source) navigate(`/from/${nanoid()}`, { replace: true });
    else if (!init && !sourceId) {
      setSourceId(source);
      setEasyPeerLink(`${window.location.origin}/from/${peerId}/to/${source}/`);
    }
  }, [source, init, sourceId, peerId, setSourceId, navigate]);

  return (
    <>
      <BaseCard>
        {sourceId && <TextCopyAndQR title={`Your ID:`} text={sourceId} />}
        {easyPeerLink && (
          <TextCopyAndQR title={`Easy-Peer Link:`} text={easyPeerLink} />
        )}
      </BaseCard>
      <PeerConnect />
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
