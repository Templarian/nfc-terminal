declare const canvas: CanvasRenderingContext2D;
declare const width: number;
declare const height: number;
declare const charWidth: number;
declare const charHeight: number;
declare const background: string;
declare const foreground: string;

declare function log(message: string): void;
declare function clear(background: string): void;
/**
 * Render Text
 *
 * @param x Offset from left
 * @param y Offset from top
 * @param text Rendered monospace font
 * 
 * @example
 *     text(10, 10, 'Hello World!');
 */
declare function text(x: number, y: number, text: string): void;