export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

export type NonPromiseReturnType<T> = T extends (...args: any[]) => infer R
  ? UnwrapPromise<R>
  : never;
