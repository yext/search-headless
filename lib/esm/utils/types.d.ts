/**
 * Produces a union type from the enum passed as a generic which consists of the enum values
 * and the string literals of the enum.
 * @public
 */
export declare type EnumOrLiteral<T extends string> = T | `${T}`;
//# sourceMappingURL=types.d.ts.map