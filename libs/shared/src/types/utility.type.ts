// Brand is a intersection type of base type + our custom brand
// I.e. it's equivalent to: number & { __brandName: 'NotZeroOrNegative' }
// https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types
type Brand<Base, BrandName> = Base & { __brandName: BrandName };

export type NestedKeysOf<T, K extends PropertyKey> = T extends object
  ? {
      [TKey in keyof T]-?:
        | (TKey extends K ? keyof T[TKey] : never)
        | NestedKeysOf<T[TKey], K>;
    }[keyof T]
  : never;

export type NotNegativeNumber = Brand<number, 'NotNegativeNumber'>;
export interface Class<T> {
  new (...args: any[]): T;
}
