import { Selector, t } from "testcafe";

/**
 * 確認ページ
 */
export default class confirmPage {
  message: Selector;
  searchLink: Selector;
  constructor() {
    this.message = Selector("#message");
    this.searchLink = Selector("#searchLink");
  }

  /**
   * リンククリック
   */
  async clickLink() {
    await t.click(this.searchLink);
  }
}
