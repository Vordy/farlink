import { useParams } from "react-router";
import { Card, Flex, Text } from "rebass";
import { usePeerManager } from "../peerlist/peer-manager";
import { TextCopyAndQR } from "./Base";

export const EasyPeer = () => {
  const { source, peer } = useParams();

  const { nextPeerId } = usePeerManager(peer, source);

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
            <Text fontSize={32}>{`Farl[ink] EasyPeer Exchange`}</Text>
          </Flex>
          <Text>{"Purely Peer2Peer Data Exchange"}</Text>
          <Text>{"Powered by WebRTC and Unique IDs"}</Text>
          <Text>{"Data is encrypted in flight"}</Text>
          {source && <TextCopyAndQR title={`Source ID:`} text={source} />}
          {peer && <TextCopyAndQR title={`Your ID:`} text={peer} />}
        </Flex>
      </Card>
    </Flex>
  );
};
