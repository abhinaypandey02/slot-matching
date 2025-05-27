# Slot Matching

A TypeScript implementation of the Hopcroft-Karp algorithm for finding maximum matching in bipartite graphs.

## Installation

```bash
npm install slot-matching
```

## Usage

```typescript
import bipartiteMatching from 'slot-matching';

// Example: Find maximum matching in a bipartite graph
const leftSize = 3;  // Number of nodes in left partition
const rightSize = 3; // Number of nodes in right partition
const edges: [number, number][] = [
  [0, 0], // Edge from left node 0 to right node 0
  [0, 1], // Edge from left node 0 to right node 1
  [1, 1], // Edge from left node 1 to right node 1
  [2, 2]  // Edge from left node 2 to right node 2
];

const matching = bipartiteMatching(leftSize, rightSize, edges);
console.log(matching);
// Output: [[0, 1], [1, 1], [2, 2]]
```

## API

### `bipartiteMatching(leftSize: number, rightSize: number, edges: [number, number][]): [number, number][]`

Finds the maximum matching in a bipartite graph.

#### Parameters:
- `leftSize`: Number of nodes in the left partition
- `rightSize`: Number of nodes in the right partition
- `edges`: Array of edges, where each edge is a tuple `[leftNode, rightNode]`

#### Returns:
Array of matched pairs `[leftNode, rightNode]` representing the maximum matching.

## License

ISC 