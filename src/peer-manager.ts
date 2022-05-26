import React from "react";
import { nanoid } from "nanoid";
import Peer, { DataConnection } from "peerjs";

export type PeerManager = {
  easyPeerId?: string;
  connecting: boolean;
  connected: boolean;
  validation?: string;
  connect: (to?: string) => void;
  send: (lane: string, data: any) => void;
};

interface Message {
  lane: string;
  data: any;
}

export let globalSource: Peer | null = null;
export let globalPeer: DataConnection | null = null;

export const usePeerManager = (id?: string, easyPeer?: string): PeerManager => {
  const [sourceId] = React.useState(id);
  const [easyPeerId] = React.useState(easyPeer ? easyPeer : nanoid());
  const [connecting, setConnecting] = React.useState(false);
  const [connected, setConnected] = React.useState(false);
  const [validation, setValidation] = React.useState(undefined);

  if (sourceId && globalSource === null) {
    console.log(`Initializing PeerNetwork ${sourceId}`);

    globalSource = new Peer(sourceId, {
      debug: 2,
    });

    console.log(globalSource);

    globalSource.on("open", function (id) {
      console.log("ID: " + globalSource?.id);
    });

    globalSource.on("connection", function (c) {
      console.log("Connected to: " + globalPeer?.peer);
    });

    globalSource.on("disconnected", function () {
      console.log("Connection lost. Reconnecting...");
      // globalSource?.reconnect();
    });

    globalSource.on("close", function () {
      console.log("Connection destroyed");
      globalSource = null;
    });

    globalSource.on("error", function (err) {
      console.error(err);
    });
  }

  // Connect to easyPeer or custom ID
  const connect = (to?: string) => {
    if (sourceId && globalSource) {
      console.log(
        `Connecting to ${to ? to : easyPeer ? easyPeer : easyPeerId}`
      );

      // Close old connection
      if (globalPeer) {
        globalPeer.close();
        globalPeer = null;
      }

      // Create connection to destination peer specified in the input field
      globalPeer = globalSource.connect(
        to ? to : easyPeer ? easyPeer : easyPeerId,
        {
          reliable: true,
        }
      );

      globalPeer.on("open", function () {
        console.log("Connected to: " + globalPeer?.peer);
        setConnecting(false);
        setConnected(true);
      });

      globalPeer.on("close", function () {
        console.log("Connection closed");
        setConnected(false);
      });

      globalPeer.on("error", function (error) {
        console.error(error);
      });

      globalPeer.on("data", function (data) {
        console.log(data);
        setValidation(data);
      });

      setConnecting(true);
    }
  };

  const send = (data: string) => {
    if (globalSource && globalPeer && globalPeer.open) {
      globalPeer.send(data);
    }
  };

  return {
    easyPeerId,
    connecting,
    connected,
    validation,
    connect,
    send,
  };
};
