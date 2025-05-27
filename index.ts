'use strict';

const INF = 1 << 28;

export default function bipartiteMatching(leftSize: number, rightSize: number, edges: [number, number][]) {
  //Initalize adjacency list, visit flag, distance
  const adjN: number[][] = new Array(leftSize);
  const g1 = new Uint16Array(leftSize);
  const dist = new Uint16Array(leftSize);
  for (let i = 0; i < leftSize; ++i) {
    g1[i] = -1;
    adjN[i] = [];
    dist[i] = INF;
  }
  const adjM: number[][] = new Array(rightSize);
  const g2 = new Uint16Array(rightSize);
  for (let i = 0; i < rightSize; ++i) {
    g2[i] = -1;
    adjM[i] = [];
  }

  //Build adjacency matrix
  const E = edges.length;
  for (let i = 0; i < E; ++i) {
    const e = edges[i];
    adjN[e[0]].push(e[1]);
    adjM[e[1]].push(e[0]);
  }

  let dmax = INF;
  function dfs(v: number): boolean {
    if (v < 0) {
      return true;
    }
    const adj = adjN[v];
    for (let i = 0, l = adj.length; i < l; ++i) {
      const u = adj[i];
      const pu = g2[u];
      let dpu = dmax;
      if (pu >= 0) {
        dpu = dist[pu];
      }
      if (dpu === dist[v] + 1) {
        if (dfs(pu)) {
          g1[v] = u;
          g2[u] = v;
          return true;
        }
      }
    }
    dist[v] = INF;
    return false;
  }

  //Run search
  const toVisit =new Uint16Array(leftSize);

  let matching = 0;
  while (true) {
    //Initialize queue
    let count = 0;
    for (let i = 0; i < leftSize; ++i) {
      if (g1[i] < 0) {
        dist[i] = 0;
        toVisit[count++] = i;
      } else {
        dist[i] = INF;
      }
    }
    //Run BFS
    let ptr = 0;
    dmax = INF;
    while (ptr < count) {
      const v = toVisit[ptr++];
      const dv = dist[v];
      if (dv < dmax) {
        const adj = adjN[v];
        for (let j = 0, l = adj.length; j < l; ++j) {
          const u = adj[j];
          const pu = g2[u];
          if (pu < 0) {
            if (dmax === INF) {
              dmax = dv + 1;
            }
          } else if (dist[pu] === INF) {
            dist[pu] = dv + 1;
            toVisit[count++] = pu;
          }
        }
      }
    }

    //Check for termination
    if (dmax === INF) {
      break;
    }

    //Run DFS on each vertex in N
    const a = Array.from(Array(leftSize).keys()).sort(
      (a, b) => adjN[b].length - adjN[a].length
    );
    for (const i of a) {
      if (g1[i] < 0) {
        if (dfs(i)) {
          matching += 1;
        }
      }
    }
  }

  //Construct result
  let count = 0;
  const result: [number, number][] = new Array(matching);
  for (let i = 0; i < leftSize; ++i) {
    if (g1[i] < 0) {
      continue;
    }
    result[count++] = [i, g1[i]];
  }

  //Return
  return result;
}
