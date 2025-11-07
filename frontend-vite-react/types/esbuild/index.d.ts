declare module "esbuild" {
  interface TransformResult {
    code: string;
  }

  interface TransformOptions {
    loader: "js";
    format: "esm";
    target: string;
  }

  export function transform(
    source: string,
    options: TransformOptions
  ): Promise<TransformResult>;
}
