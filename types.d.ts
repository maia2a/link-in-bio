export type PageParamsPromise<T extends Record<string, string>> = {
  params: Promise<T>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};
