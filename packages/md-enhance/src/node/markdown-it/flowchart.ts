/* eslint-disable max-statements */
import hash from "hash-sum";
import * as MarkdownIt from "markdown-it";
import * as Token from "markdown-it/lib/token";

const flowchart = (md: MarkdownIt): void => {
  const flowchartRender = (tokens: Token[], idx: number): string => {
    const token = tokens[idx];
    const key = `flowchart_${hash(idx)}`;
    const { content, info } = token;

    return `<FlowChart id="${key}" data-code="${encodeURIComponent(
      content
    )}" preset="${info.trim().split(":")[1] || "vue"}"></FlowChart>`;
  };

  // Handle ```flow blocks
  const fence = md.renderer.rules.fence;
  md.renderer.rules.fence = (...args): string => {
    const [tokens, idx] = args;
    const { info } = tokens[idx];

    if (info.trim().split(":")[0] === "flow")
      return flowchartRender(tokens, idx);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return fence!(...args);
  };

  md.renderer.rules.flowchart = flowchartRender;
};

export default flowchart;
