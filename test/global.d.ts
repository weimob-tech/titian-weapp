export declare global {
  var ID_CACHE: Map<string, unknown>;
  var CACHE: Record<string, unknown>;

  var PREFIX: string;
  var __TITAN_CHANNEL__: string;

  function getRegExp(reg: RegExp | string): RegExp;
}

export default {};
