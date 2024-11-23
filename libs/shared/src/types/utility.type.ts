export type NestedKeysOf<T, K extends PropertyKey> = T extends object
  ? {
      [TKey in keyof T]-?:
        | (TKey extends K ? keyof T[TKey] : never)
        | NestedKeysOf<T[TKey], K>;
    }[keyof T]
  : never;
