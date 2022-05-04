import "testcafe";
import { ClientFunction, Selector } from "testcafe";
import IndexPage from "../pages/indexPage";
import ConfirmPage from "../pages/confirmPage";
import { ENV } from "../../src/environment";

const topPage = new IndexPage();
const confirmPage = new ConfirmPage();

const name = "hoge",
  food = "カレー";

fixture("Getting started'").page(topPage.url);

test("初期表示", async (t: TestController) => {
  //ページタイトル
  await t.expect(Selector("title").innerText).eql(topPage.title);
  //各項目が活性状態
  await t.expect(topPage.inputName.hasAttribute("disabled")).notOk();
  await t.expect(topPage.inputFood.hasAttribute("disabled")).notOk();
  await t.expect(topPage.buttonSend.hasAttribute("disabled")).notOk();

  //スクショ
  await t.takeScreenshot();
});

test("画面遷移", async (t: TestController) => {
  await topPage.formInput(name, food);
  const docUrl = ClientFunction(() => window.location.href);

  //遷移先URLの確認
  const expectedUrl = `http://localhost:${ENV.APP_PORT}/confirm`;
  await t.expect(docUrl()).eql(expectedUrl);

  //メッセージの確認
  const msg = `${name} さんは ${food} が好きなんですね。`;
  await t.expect(confirmPage.message.innerText).eql(msg);

  //リンクの確認
  const encodeFood = encodeURI(food);
  const expectedLinkUrl = `https://www.google.com/search?q=${encodeFood}`;
  await t
    .expect(confirmPage.searchLink.getAttribute("href"))
    .eql(expectedLinkUrl);

  //スクショ
  await t.takeScreenshot();

  await confirmPage.clickLink();
  const docGoogleUrl = ClientFunction(() => window.location.href);
  await t.expect(docGoogleUrl()).eql(expectedLinkUrl);

  //スクショ
  await t.takeScreenshot();
});
