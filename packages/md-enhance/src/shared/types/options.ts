import type { KatexOptions } from "katex";
import type { CodeDemoGlobalOptions } from "./code-demo";
import type { PresentationOptions } from "./presentation";
import type { TaskListOptions } from "./tasklist";

/** md-enhance plugin configuration */
export type MarkdownEnhanceOptions = Partial<{
  /**
   * 是否在每个代码块的左侧显示行号
   *
   * Whether to show line numbers to the left of each code block
   *
   * @default true
   */
  lineNumbers: boolean;
  /**
   * 是否修复包含特殊字符的图片路径
   *
   * Whether to fix image links containing special characters
   *
   * @default true
   */
  imageFix: boolean;
  /**
   * 是否启用自定义对齐支持
   *
   * Whether to enable align support
   *
   * @default false
   */
  align: boolean;
  /**
   * 是否启用上角标格式支持
   *
   * Whether to enable superscript format support
   *
   * @default false
   */
  sup: boolean;
  /**
   * 是否启用下角标格式支持
   *
   * Whether to enable subscript format support
   *
   * @default false
   */
  sub: boolean;
  /**
   * 是否启用脚注格式支持
   *
   * Whether to enable footnote format support
   *
   * @default false
   */
  footnote: boolean;
  /**
   * 是否启用标注支持
   *
   * Whether to enable mark format support
   *
   * @default false
   */
  mark: boolean;
  /**
   * 是否启用任务里表支持
   *
   * Whether to enable tastlist format support
   *
   * @default false
   */
  tasklist: TaskListOptions | boolean;
  /**
   * 是否启用 TeX 语法支持
   *
   * Whether to enable TeX syntax support
   *
   * @default false
   */
  tex: KatexOptions | boolean;
  /**
   * 是否启用 Mermaid 流程图支持
   *
   * Whether to enable mermaid support
   *
   * @default false
   */
  mermaid: boolean;
  /**
   * 是否启用代码示例功能
   *
   * Whether to enable code-demo support
   *
   * @default false
   */
  demo: Partial<CodeDemoGlobalOptions> | boolean;
  /**
   * 是否启用幻灯片支持
   *
   * Whether to enable presentation support
   *
   * @default false
   */
  presentation: PresentationOptions | boolean;
  /**
   * 是否启用全部增强
   *
   * Whether to enable all features.
   *
   * @default false
   */
  enableAll: boolean;
}>;
