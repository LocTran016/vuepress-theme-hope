---
title: Config
icon: config
---

## Frontmatter Options

### sitemap.changefreq

- Type: `"always"|"hourly"|"daily"|"weekly"|"monthly"|"yearly"|"never"`
- Default: `"daily"`

Page default update frequency

### sitemap.exclude

- Type: `boolean`
- Default: `false`

Whether exclude the page from sitemap

### sitemap.priority

- Type: `number`
- Default: `0.5`

页面优先级，范围 0~1

## Plugin options

### hostname

- Type: `string`
- Required: Yes

The domain name where the current site is deployed, please at least pass it into the plugin option, or fill in `themeConfig.hostname`, otherwise the plugin will not work.

### urls

- Type: `string[]`
- Required: No

Extra links to be included

### exclude

- Type: `string[]`
- Required: No

Pages not included

### outFile

- Type: `string`
- Default value: `"sitemap.xml"`

The output filename

### changefreq

- Type: `"always" | "hourly" | "daily" | "weekly" |"monthly" | "yearly" | "never"`
- Default value: `"daily"`

Page default update frequency

### dateFormatter

- Type: `($page: PageComputed) => string`
- Required: No

Time formatter. The timestamp will be automatically generated by default. If you find time zone issues, please set this option.
