import React from "react";
import Peer, { DataConnection } from "peerjs";
import { nanoid } from "nanoid";

const BaseNetwork = {
  init: false as boolean,
  connecting: false as boolean,
  connected: false as boolean,

  sourceId: undefined as string | undefined,
  peerId: undefined as string | undefined,

  source: undefined as Peer | undefined,
  peer: undefined as DataConnection | undefined,

  sourceVal: undefined as string | undefined,
  peerVal: undefined as string | undefined,

  setSourceId: (sourceId: string) => {},
  setPeerId: (peerId: string) => {},

  connect: (to: string) => {},
  validate: async () => {},
  send: (data: string) => {},
};

export type PeerNetwork = typeof BaseNetwork;

export const NetState = React.createContext(BaseNetwork);

export const usePeerNet = (): PeerNetwork => {
  // Connection State
  const [init, setInit] = React.useState(false);
  const [connecting, setConnecting] = React.useState(false);
  const [connected, setConnected] = React.useState(false);

  // Identification Data
  const [sourceId, setSourceId] = React.useState<string | undefined>(undefined);
  const [peerId, setPeerId] = React.useState<string>(nanoid());

  // Peer Network State
  const [source, setSource] = React.useState<Peer | undefined>(undefined);
  const [peer, setPeer] = React.useState<DataConnection | undefined>(undefined);

  // Validation Exchange
  const [sourceVal, setSourceVal] = React.useState<string | undefined>(
    undefined
  );
  const [peerVal, setPeerVal] = React.useState<string | undefined>(undefined);

  // Validation Exchange v1: The Valid-Dog
  const validate = async () => {
    if (peer && peer.open) {
      console.log(`Validating Exchange`);
      const data = await fetch("https://dog.ceo/api/breeds/image/random");
      const parsed = await data.json();
      setSourceVal(parsed.message);
      peer.send(parsed.message);
    } else {
      console.error("No Peer :(");
    }
  };

  const send = (data: string) => {
    if (source && peer && peer.open) {
      console.log("Sending Message", data);
      peer.send(data);
    }
  };

  const receiveExchange = (input: string) => {
    setPeerVal(input);
  };

  React.useEffect(() => {
    const shutdownAndDestroy = () => {
      console.log("Shutting down and destroying");
      if (peer) {
        if (peer.open) peer.close();
        setPeer(undefined);
      }
      if (source) {
        source.disconnect();
        setSource(undefined);
      }
    };

    const initialize = (sourceId: string) => {
      setInit(true);

      if (source) source.disconnect();

      console.log(`Initializing PeerNetwork ${sourceId}`);

      const newSource = new Peer(sourceId, {
        debug: 2,
      });

      newSource.on("open", function (id) {
        console.log("ID: " + newSource?.id);
      });

      newSource.on("connection", function (c) {
        console.log("Connected to: " + peer?.peer);
      });

      newSource.on("disconnected", function () {
        console.log("Connection lost. Refresh to reconnect.");
        // globalSource?.reconnect();
      });

      newSource.on("close", function () {
        console.log("Connection closed");
        shutdownAndDestroy();
      });

      newSource.on("error", function (err) {
        console.error(err);
        shutdownAndDestroy();
      });

      setSource(newSource);
    };

    if (sourceId && !init) initialize(sourceId);
  }, [init, sourceId, source, peer]);

  // Connect to ID
  const connect = (to: string) => {
    if (source && !source.disconnected) {
      console.log(`Connecting to ${to}`);

      // Close old connection
      if (peer && peer.open) {
        peer.close();
      }

      // Create connection to destination peer specified in the input field
      const newPeer = source.connect(to, {
        reliable: true,
      });

      newPeer.on("open", async () => {
        console.log("Connected to: " + newPeer?.peer);

        setConnecting(false);
        setConnected(true);
      });

      newPeer.on("close", () => {
        console.log("Connection closed");
        setConnected(false);
      });

      newPeer.on("error", (error) => {
        console.error(error);
      });

      newPeer.on("data", (data) => {
        console.log(`Received!`, data);
        receiveExchange(data);
      });

      setPeer(newPeer);
      setConnecting(true);
    }
  };

  return {
    init,
    connecting,
    connected,

    sourceId,
    peerId,

    source,
    peer,

    sourceVal,
    peerVal,

    setSourceId,
    setPeerId,

    connect,
    validate,
    send,
  };
};
