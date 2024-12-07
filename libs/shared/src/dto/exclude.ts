import { ObjectType } from '@nestjs/graphql';

export function Exclude<T, K extends keyof T>(
  Parent: new () => T,
  keys: K[],
): new () => Omit<T, (typeof keys)[number]> {
  @ObjectType()
  class Child extends (Parent as any) {}

  for (const key of keys) {
    Object.defineProperty(Child.prototype, key, {
      enumerable: false,
      configurable: true,
      get() {
        if (!(this instanceof Child)) {
          return this._propertyToDelete;
        }
      },
      set(v) {
        if (!(this instanceof Child)) {
          this._propertyToDelete = v;
        }
      },
    });
  }

  Object.freeze(Child.prototype);

  return Child as any;
}
