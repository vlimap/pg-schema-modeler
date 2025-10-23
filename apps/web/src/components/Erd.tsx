import { ElkLayout } from '@xyflow/elkjs';
import React, { useEffect, useMemo, useState } from 'react';
import ReactFlow, { Edge, Node } from '@xyflow/react';

interface ErdProps {
  model: any;
}

function modelToFlow(model: any): { nodes: Node[]; edges: Edge[] } {
  if (!model || !model.tables) return { nodes: [], edges: [] };

  const nodes: Node[] = model.tables.map((table: any, index: number) => ({
    id: `table_${table.name}`,
    data: { label: table.name },
    position: { x: 0, y: index * 100 },
    type: 'default'
  }));

  const edges: Edge[] = [];
  model.tables.forEach((table: any) => {
    if (table.foreignKeys) {
      table.foreignKeys.forEach((fk: any) => {
        edges.push({
          id: `fk_${table.name}_${fk.columns.join('_')}`,
          source: `table_${table.name}`,
          target: `table_${fk.referencedTable}`,
          type: 'smoothstep'
        });
      });
    }
  });

  return { nodes, edges };
}

export function Erd({ model }: ErdProps) {
  const flowData = useMemo(() => modelToFlow(model), [model]);
  const [layoutedNodes, setLayoutedNodes] = useState<Node[]>([]);
  const [layoutedEdges, setLayoutedEdges] = useState<Edge[]>([]);

  useEffect(() => {
    async function layout() {
      const elk = new ElkLayout({ workerUrl: '/elk-worker.js' });
      const elkGraph = {
        id: 'root',
        layoutOptions: { 'elk.direction': 'DOWN' },
        children: flowData.nodes.map((node) => ({ id: node.id })),
        edges: flowData.edges.map((edge) => ({
          id: edge.id,
          source: edge.source,
          target: edge.target
        }))
      };
      const result = await elk.layout(elkGraph);
      const positionedNodes = flowData.nodes.map((node) => {
        const pos = result.children.find((c) => c.id === node.id)?.x ? { x: result.children.find((c) => c.id === node.id)?.x || 0, y: result.children.find((c) => c.id === node.id)?.y || 0 } : node.position;
        return { ...node, position: pos };
      });
      setLayoutedNodes(positionedNodes);
      setLayoutedEdges(flowData.edges);
    }
    layout();
  }, [flowData]);

  return <ReactFlow nodes={layoutedNodes} edges={layoutedEdges} fitView />;
}
