export type ReturnGenericObj<T> = T & { id: string };

export type GetById = { docId: string; where?: never };

export type GetByCondition<T> = { docId?: never; where: WhereCondition<T> };

export type FirestoreError = { error: Error | unknown };

export type FieldConditions<T> = {
  $not: T;
  $contains: T;
  $greaterThan: T;
  $lessThan: T;
  $startsWith: T;
  $endsWith: T;
};

export type WhereCondition<T> = {
  [K in keyof T]?:
    | T[K]
    | Partial<FieldConditions<T[K]>>
    | (T[K] extends object ? WhereCondition<T[K]> : never);
};
