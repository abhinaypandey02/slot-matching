declare module 'typedarray-pool' {
  interface Pool {
    malloc: (n: number) => Int32Array;
    free: (array: Int32Array) => void;
  }
  
  const pool: Pool;
  export default pool;
} 