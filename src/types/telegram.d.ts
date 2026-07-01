declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready(): void;
        expand(): void;
        close(): void;

        showPopup(
          params: {
            title?: string;
            message: string;
            buttons: {
              id?: string;
              type?: "default" | "ok" | "close" | "cancel" | "destructive";
              text?: string;
            }[];
          },
          callback?: (buttonId: string) => void
        ): void;
      };
    };
  }
}
