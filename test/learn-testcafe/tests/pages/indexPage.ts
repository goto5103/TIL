import { Selector, t } from "testcafe";
import { ENV } from "../../src/environment";

/**
 * トップページ
 */
export default class indexPage {
  title: string;
  url: string;
  inputName: Selector;
  inputFood: Selector;
  buttonSend: Selector;
  constructor() {
    this.title = "TestCafeDemo";
    this.url = `http://localhost:${ENV.APP_PORT}/`;
    this.inputName = Selector("#name");
    this.inputFood = Selector("#food");
    this.buttonSend = Selector('input[name="submit"]');
  }

  /**
   * 入力送信実行
   */
  async formInput(name: string, food: string) {
    await t
      .typeText(this.inputName, name)
      .typeText(this.inputFood, food)
      .click(this.buttonSend);
  }
}
