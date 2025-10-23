import React, { useState } from 'react';
import { BlocklyEditor } from '../components/BlocklyEditor';

export default function Modeler() {
  const [workspaceJson, setWorkspaceJson] = useState<any>(null);

  return (
    <div style={{ display: 'flex', height: '90vh' }}>
      <div style={{ flex: 1, borderRight: '1px solid #ddd' }}>
        <BlocklyEditor onChange={setWorkspaceJson} />
      </div>
      <div style={{ flex: 1, padding: 10 }}>
        <h3>Workspace JSON</h3>
        <pre style={{ whiteSpace: 'pre-wrap', height: '100%', overflowY: 'auto' }}>
          {JSON.stringify(workspaceJson, null, 2)}
        </pre>
      </div>
    </div>
  );
}
