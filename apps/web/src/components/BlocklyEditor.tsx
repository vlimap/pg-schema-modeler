import * as Blockly from 'blockly';
import { toolboxJson } from './toolbox';
import './blocks';
import { useEffect, useRef } from 'react';

interface BlocklyEditorProps {
  onChange?: (workspaceJson: any) => void;
  initialWorkspaceJson?: any;
}

export function BlocklyEditor({ onChange, initialWorkspaceJson }: BlocklyEditorProps) {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspace = useRef<Blockly.WorkspaceSvg | null>(null);

  useEffect(() => {
    if (blocklyDiv.current && !workspace.current) {
      workspace.current = Blockly.inject(blocklyDiv.current, {
        toolbox: toolboxJson,
        scrollbars: true,
        trashcan: true
      });

      if (initialWorkspaceJson) {
        Blockly.serialization.workspaces.load(initialWorkspaceJson, workspace.current);
      }

      workspace.current.addChangeListener(() => {
        if (workspace.current) {
          const json = Blockly.serialization.workspaces.save(workspace.current);
          if (onChange) {
            onChange(json);
          }
        }
      });
    }
  }, [blocklyDiv, initialWorkspaceJson, onChange]);

  return <div ref={blocklyDiv} style={{ height: '100%', width: '100%' }} />;
}
