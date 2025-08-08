import { Box } from '@mui/material';
import { Edge, Node, ReactFlow } from '@xyflow/react';

type Props = {
  nodes: Node[];
  edges: Edge[];
};

export const BracketsFlow = ({ nodes, edges }: Props) => {
  const noNodes = nodes.length / 4;
  const calculatedHeight = noNodes * 180 + 200;
  const height = calculatedHeight < 1000 ? calculatedHeight : 1000;

  return (
    <Box height={height}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        draggable={false}
        elementsSelectable={true}
        fitView
      ></ReactFlow>
    </Box>
  );
};
