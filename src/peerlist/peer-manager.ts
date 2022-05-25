import React from "react";
import { nanoid } from "nanoid";
import Peer, { DataConnection } from "peerjs";
import { useParams } from "react-router";

interface Links {
  [peerId: string]: DataConnection;
}

export const usePeerManager = (id?: string, easyPeer?: string) => {
  const [sourceId, setSourceId] = React.useState(id);
  const [nextPeerId, setNextPeerId] = React.useState(
    easyPeer ? easyPeer : nanoid()
  );
  const [sourcePeer, setSourcePeer] = React.useState<Peer | undefined>(
    sourceId ? new Peer(sourceId) : undefined
  );
  const [easyPeerOpenLink, setEasyPeerOpenLink] = React.useState<
    DataConnection | undefined
  >(sourcePeer ? sourcePeer.connect(nextPeerId) : undefined);

  const [links, setLinks] = React.useState<Links | undefined>(undefined);

  React.useEffect(() => {
    if (sourceId && !sourcePeer) {
      console.log(`opening peer`);
      setSourcePeer(new Peer(sourceId));
    }
  }, [sourceId, sourcePeer]);

  React.useEffect(() => {
    if (sourcePeer && !easyPeerOpenLink) {
      console.log(`opening easy peer link`);
      setEasyPeerOpenLink(sourcePeer.connect(nextPeerId));
    }
  }, [sourcePeer, nextPeerId, easyPeerOpenLink]);

  React.useEffect(() => {
    const newEasyPeer = () => {
      if (easyPeerOpenLink && sourcePeer) {
        const newLinks = { ...links };
        newLinks[nextPeerId] = easyPeerOpenLink;

        setNextPeerId(nanoid());

        console.log(`opening easy peer link`);
        setEasyPeerOpenLink(sourcePeer.connect(nextPeerId));
      }
    };

    if (easyPeerOpenLink) {
      console.log(`registering easy-peer  listeners`);

      easyPeerOpenLink.on("open", (id) => {
        console.log(`successful connection source: ${sourceId} peer: ${id}`);
        newEasyPeer();
      });
    }
  }, [sourcePeer, nextPeerId, easyPeerOpenLink, links, sourceId]);

  return {
    nextPeerId,
  };
};
