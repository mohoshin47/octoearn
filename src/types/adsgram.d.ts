export {};

declare global {
  interface Window {
    Adsgram: {
      init(options: {
        blockId: string;
        debug?: boolean;
      }): {
        show(): Promise<{
          done: boolean;
          error: boolean;
          state: string;
          description: string;
        }>;
      };
    };
  }
}