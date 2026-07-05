export type Merge<A, B> = A & Omit<B, keyof A>;
