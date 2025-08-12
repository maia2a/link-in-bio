declare module "next" {
  export interface PageProps {
    params: {
      username: string;
    };
    searchParams?: Record<string, any>;
  }
}
