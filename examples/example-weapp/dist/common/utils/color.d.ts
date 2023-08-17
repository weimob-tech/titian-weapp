declare const HSBToRGB: (h: number, s: number, b: number) => [number, number, number];
declare const RGBToHSB: (r: number, g: number, b: number) => [number, number, number];
declare const hexToRGB: (hex: string, a?: number | string) => string;
declare const RGBToHex: (r: number, g: number, b: number) => string;
declare const RGBAToHex: (rgb: string) => string;
declare const hexToHSB: (hex: string) => [number, number, number];
declare const RGBToRGBA: (rgb: string, alpha?: number) => string;
declare const hexToRGBA: (hex: string, alpha?: number) => string;
declare const getNeutralsGrey: (precent?: number, diffs?: number[]) => string[];
export { HSBToRGB, RGBToHSB, hexToRGB, RGBToHex, hexToHSB, getNeutralsGrey, RGBAToHex, RGBToRGBA, hexToRGBA };
