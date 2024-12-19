// export interface Directive {
//   arguments: {
//     value: {
//       kind: 'Variable';
//       value: string;
//       name: {
//         value: string;
//       };
//     };
//   }[];
//   name: {
//     value: 'include' | 'skip';
//   };
// }
// export interface Info {
//   /**@example "getPosts" */
//   fieldName: string;
//   fieldNodes: AST[];
//   fragments: Record<string, AST>;
//   fieldASTs: AST[];
//   variableValues: Record<string, any>;
// }
// export interface Options {
//   processArguments: boolean;
//   excludedFields?: string[];
// }
// type Kind =
//   | 'FloatValue'
//   | 'IntValue'
//   | 'Variable'
//   | 'ListValue'
//   | 'ObjectValue';
// export interface ValueOfArgument {
//   values: ValueOfArgument[];
//   kind: Kind;
//   value: string;
//   name: { value: string };
//   fields: {
//     name: { value: string };
//     value: ValueOfArgument;
//   }[];
// }
// interface Token {
//   /**@example "Name" | "{" | "}" | "<SOF>" | "<EOF>" */
//   kind: string;
//   /**@example 19 */
//   start: number;
//   /**@example 27 */
//   end: number;
//   /**@example 3 */
//   line: number;
//   /**@example 7 */
//   column: number;
//   /**
//    * @description Fields selected by the client
//    * @example "getPosts" | "query" | "id" | "author"
//    */
//   value?: string;
//   /**@example [Circular] */
//   prev: Token | null;
//   /**@example [Circular] */
//   next: Token;
// }

// export interface AST {
//   kind: 'Field' | 'InlineFragment' | 'FragmentSpread';
//   alias?: string;
//   name: {
//     kind: 'Name';
//     /**@example "getPosts" | "id" */
//     value: string;
//     loc: {
//       /**@example 19 */
//       start: number;
//       /**@example 27 */
//       end: number;
//       startToken: Token;
//       endToken: Token;
//       source: {
//         /**@example "\n    query {\n      getPosts {\n        id\n        author {\n          posts {\n            id\n            author {\n              posts {\n                id\n                author {\n                  posts {\n                    id\n                    author {\n                      id\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  ", */
//         body: string;
//         name: 'GraphQL request';
//         locationOffset: {
//           /**@example 1 */
//           line: number;
//           /**@example 1 */
//           column: number;
//         };
//       };
//     };
//   };
//   arguments: {
//     name: { value: string };
//     value: ValueOfArgument;
//   }[];
//   directives: Directive[];
//   selectionSet?: {
//     /**@example "SelectionSet" | "Field" */
//     kind: string;
//     selections: AST[];
//     _interfaces: [];
//     /**@description This property's key can be "Boolean", "String", or other scalar types */
//     Boolean: ScalarType;
//   };
//   __Schema: {
//     /**@example "__Schema" */
//     name: string;
//     /**@example "A GraphQL Schema defines the capabilities of a GraphQL server. It exposes all available types and directives on the server, as well as the entry points for query, mutation, and subscription operations." */
//     description: string;
//     isTypeOf?: boolean;
//     extensions: unknown;
//     astNode?: unknown;
//     extensionASTNodes: unknown[];
//     _fields: {
//       description: {
//         name: 'description';
//         description?: unknown;
//         type: ScalarType;
//         args: unknown[];
//         /**
//          * @example
//          * ```js
//          * resolve: (schema) => schema.description,
//          * ```
//          */
//         resolve: Function;
//         subscribe?: unknown;
//         deprecationReason?: unknown;
//         extensions: Record<string, unknown>;
//         astNode?: unknown;
//       };
//       types: {
//         name: 'types';
//         description: 'A list of all types supported by this server.';
//         ofType: {
//           ofType: {
//             ofType: BaseOfType & {
//               isTypeOf?: unknown;
//               _fields: {
//                 /**@description key can be one "possibleTypes" | "inputFields" | "enumValues" | "ofType" | "isOneOf" | "name" | "description" | "specifiedByURL" | "fields" | "interfaces" */
//                 kind: __SchemeOfTypeField;
//               };
//               _interfaces: unknown[];
//             };
//           };
//         };
//         args: unknown[];
//         /**
//          * @example
//          * ```js
//          * resolve: function(schema) {
//          *   return Object.values(schema.getTypeMap());
//          * }
//          * ```
//          */
//         resolve: Function;
//         subscribe?: unknown;
//         deprecationReason?: unknown;
//         extensions: Record<string, unknown>;
//         astNode?: unknown;
//       };
//       queryType: QueryType;
//       mutationType: {};
//     };
//   };
// }

// interface __SchemeOfTypeFieldOfType {
//   ofType: {
//     name: '__TypeKind';
//     description: 'An enum describing what kind of type a given `__Type` is.';
//     extensions: {};
//     astNode: undefined;
//     extensionASTNodes: [];
//     _values: {
//       /**@example "SCALAR" | "OBJECT" | "INTERFACE" | "UNION" */
//       name: string;
//       /**@example "Indicates this type is a scalar." | "Indicates this type is an object. `fields` and `interfaces` are valid fields." */
//       description: string;
//       /**@example "SCALAR" | "OBJECT" | "INTERFACE" | "UNION" */
//       value: string;
//       deprecationReason?: string;
//       extensions: Record<string, unknown>;
//       astNode?: unknown;
//     }[];
//   };
// }
// interface __SchemeOfTypeField {
//   /**@example "kind" | "name" */
//   name: string;
//   description?: string;
//   type: __SchemeOfTypeFieldOfType;
//   args: unknown[];
//   /**
//    * @example
//    * ```js
//    * resolve: function(type) {
//    *   if ((0, _definition.isScalarType)(type)) {
//    *     return TypeKind.SCALAR;
//    *   }
//    *   if ((0, _definition.isObjectType)(type)) {
//    *     return TypeKind.OBJECT;
//    *   }
//    *   if ((0, _definition.isInterfaceType)(type)) {
//    *     return TypeKind.INTERFACE;
//    *   }
//    *   if ((0, _definition.isUnionType)(type)) {
//    *     return TypeKind.UNION;
//    *   }
//    *   if ((0, _definition.isEnumType)(type)) {
//    *     return TypeKind.ENUM;
//    *   }
//    *   if ((0, _definition.isInputObjectType)(type)) {
//    *     return TypeKind.INPUT_OBJECT;
//    *   }
//    *   if ((0, _definition.isListType)(type)) {
//    *     return TypeKind.LIST;
//    *   }
//    *   if ((0, _definition.isNonNullType)(type)) {
//    *     return TypeKind.NON_NULL;
//    *   }
//    *   // c8 ignore next 3
//    *   // Not reachable, all possible types have been considered)
//    *   false ||
//    *     (0, _invariant.invariant)(
//    *       false,
//    *       `Unexpected type: "${(0, _inspect.inspect)(type)}".`,
//    *     );
//    * }
//    * ```
//    */
//   resolve: Function;
//   subscribe?: unknown;
//   deprecationReason?: string;
//   extensions: Record<string, unknown>;
//   astNode?: unknown;
// }
