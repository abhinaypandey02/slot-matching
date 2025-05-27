import bipartiteMatching from './index';

describe('bipartiteMatching', () => {
  it('finds the maximum matching in a simple bipartite graph', () => {
    // Example: 2 nodes on left, 2 on right, both connected
    // 0 - 0
    // 1 - 1
    const leftSize = 2;
    const rightSize = 2;
    const edges: [number, number][] = [
      [0, 0],
      [1, 1],
    ];
    const result = bipartiteMatching(leftSize, rightSize, edges);
    // The result should be [[0,0],[1,1]] or [[1,1],[0,0]]
    expect(result.length).toBe(2);
    expect(result).toEqual(
      expect.arrayContaining([
        [0, 0],
        [1, 1],
      ])
    );
  });

  it('finds the maximum matching in a more complex bipartite graph', () => {
    // 3 left, 3 right, edges: 0-0, 0-1, 1-1, 2-2
    const leftSize = 4;
    const rightSize = 3;
    const edges: [number, number][] = [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 2],
      [2, 2],
      [2, 0],
      [3, 0],
      [3, 1],
      [3, 2],
    ];
    const result = bipartiteMatching(leftSize, rightSize, edges);
    expect(result.length).toBe(3);
    expect(result).toEqual(
      expect.arrayContaining([
        [0, 1],
        [1, 2],
        [3, 0],
      ])
    );
  });
}); 