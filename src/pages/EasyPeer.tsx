import { useParams } from "react-router";
import { PeerConnect } from "../components/PeerConnect";
import { usePeerManager } from "../peer-manager";
import { BaseCard, TextCopyAndQR } from "./Base";

export const EasyPeer = () => {
  const { source, peer } = useParams();

  const peerManager = usePeerManager(source, peer);

  const { easyPeerId } = peerManager;

  return (
    <>
      <BaseCard subtext="[EasyPeer]">
        {source && <TextCopyAndQR title={`Your ID:`} text={source} />}
        {peer && <TextCopyAndQR title={`Source ID:`} text={peer} />}
      </BaseCard>
      <PeerConnect peerManager={peerManager} hide />
    </>
  );
};
