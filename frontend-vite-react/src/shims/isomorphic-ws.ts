type GlobalWebSocket = typeof globalThis extends { WebSocket: infer T }
  ? T | undefined
  : undefined;

const resolvedWebSocket: GlobalWebSocket =
  typeof globalThis !== "undefined" && "WebSocket" in globalThis
    ? (globalThis as typeof globalThis & { WebSocket: GlobalWebSocket })
        .WebSocket
    : undefined;

export const WebSocket = resolvedWebSocket;
export default resolvedWebSocket;
