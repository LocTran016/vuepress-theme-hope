/***************************************************
 * Created by nanyuantingfeng on 2020/3/1 10:10. *
 ***************************************************/
import { decode } from "mdurl";
import * as MarkdownIt from "markdown-it";

export type DecodeURLOption = RegExp | string[] | "*" | "." | "./";

const needDecode = (url: string, config: DecodeURLOption): boolean =>
  config === "./" || config === "."
    ? !/^(\w+?:\/)?\//u.test(url)
    : config instanceof RegExp
    ? config.test(url)
    : Array.isArray(config)
    ? config.some((a) => url.startsWith(a))
    : true;

const urlDecode = (url: string, config: DecodeURLOption): string => {
  const realURL = needDecode(url, config) ? decode(url) : url;

  return /^(\w+?:\/)?\.?\//.test(realURL) ? realURL : `./${realURL}`;
};

export const decodeURL = (
  md: MarkdownIt,
  config: DecodeURLOption = "*"
): void => {
  md.renderer.rules.image = (tokens, idx): string => {
    const token = tokens[idx];

    return `<img src="${urlDecode(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      token.attrs![token.attrIndex("src")][1],
      config
    )}" alt="${md.utils.escapeHtml(token.content)}" />`;
  };
};
