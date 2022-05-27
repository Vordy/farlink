import React from "react";
import { useNavigate, useParams } from "react-router";
import { PeerConnect } from "../components/PeerConnect";
import { NetState } from "../components/PeerNetwork";
import { BaseCard, TextCopyAndQR } from "./Base";
import { nanoid } from "nanoid";

export const EasyPeer = () => {
  const { source, peer } = useParams();
  const navigate = useNavigate();

  const { init, sourceId, peerId, setSourceId, setPeerId } =
    React.useContext(NetState);

  React.useEffect(() => {
    if (!source || !peer) navigate(`/from/${nanoid()}`, { replace: true });
    else if (!init && !sourceId) {
      if (source !== sourceId) setSourceId(source);
      if (peer !== peerId) setPeerId(peer);
    }
  }, [source, peer, init, sourceId, peerId, setSourceId, setPeerId, navigate]);

  return (
    <>
      <BaseCard subtext="[EasyPeer]">
        {sourceId && <TextCopyAndQR title={`Your ID:`} text={sourceId} />}
        {peerId && <TextCopyAndQR title={`Source ID:`} text={peerId} />}
      </BaseCard>
      <PeerConnect hide />
    </>
  );
};
