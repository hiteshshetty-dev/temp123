declare class PublicLogger {
    private static logEvent;
    static error(...data: any[]): void;
    static warn(...data: any[]): void;
    static debug(...data: any[]): void;
}

export { PublicLogger };
