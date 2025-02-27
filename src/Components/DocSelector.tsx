import React, { useState, useEffect } from "react";
import { PortsGlobal, LOCAL_SERVER_URL } from "../ServerDataDefinitions";
import "./DocSelector.css";

interface DocSelectorProps {
  onDocumentSelect: (documentName: string) => void;
}

function DocSelector({ onDocumentSelect }: DocSelectorProps) {
  const [docs, setDocs] = useState([]);

  const serverPort = PortsGlobal.serverPort;
  const url = `${LOCAL_SERVER_URL}:${serverPort}/documents`;

  useEffect(() => {
    (async () => {
      const response = await fetch(url);
      const data = await response.json();
      setDocs(data);
    })();
  }, [url]);

  return (
    <div>
      <h1>Select a document</h1>
      <div className="doc-select-button-container">
        {docs.map((doc: string) => {
          return (
            <button className="doc-select-button" key={doc} onClick={() => onDocumentSelect(doc)}>
              {doc}
            </button>
          );
        })}
      </div>
      <h4>reminder: documents will not refresh if user name is empty</h4>
    </div>
  );
}

export default DocSelector;
