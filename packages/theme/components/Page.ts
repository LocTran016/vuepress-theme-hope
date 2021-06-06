import Vue from "vue";
import Anchor from "@theme/components/Anchor.vue";
import Comment from "@Comment";
import ContentBottom from "@ContentBottom";
import ContentTop from "@ContentTop";
import MyTransition from "@theme/components/MyTransition.vue";
import PageBottom from "@PageBottom";
import PageInfo from "@mr-hope/vuepress-plugin-comment/lib/client/PageInfo.vue";
import PageMeta from "@theme/components/PageMeta.vue";
import PageNav from "@theme/components/PageNav.vue";
import PageTop from "@PageTop";
import Password from "@theme/components/Password.vue";

import type { PageHeader } from "@mr-hope/vuepress-types";
import type { PropType } from "vue";
import type { SidebarItem } from "@theme/util/sidebar";

export default Vue.extend({
  name: "Page",

  components: {
    Anchor,
    Comment,
    ContentBottom,
    ContentTop,
    MyTransition,
    PageBottom,
    PageInfo,
    PageMeta,
    PageNav,
    PageTop,
    Password,
  },
  props: {
    sidebarItems: {
      type: Array as PropType<SidebarItem[]>,
      default: (): SidebarItem[] => [],
    },
    headers: {
      type: Array as PropType<PageHeader[]>,
      default: (): PageHeader[] => [],
    },
  },

  data: () => ({
    password: "",
  }),

  computed: {
    pagePassword(): string {
      const { password } = this.$frontmatter;

      return typeof password === "number"
        ? password.toString()
        : typeof password === "string"
        ? password
        : "";
    },

    pageDescrypted(): boolean {
      return this.password === this.pagePassword;
    },
  },
});
