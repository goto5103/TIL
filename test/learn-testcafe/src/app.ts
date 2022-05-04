import express from "express";
import { join } from "path";
import session from "express-session";
import { ENV } from "./environment";
const app: express.Express = express();

//ビューの設定
app.set("views", join(__dirname, "..", "views"));
app.set("view engine", "ejs");

//ミドルウェア
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "secret" }));

//ルーティング
const router: express.Router = express.Router();
/**
 * トップGET
 */
router.get("/", (req: express.Request, res: express.Response) => {
  res.render("index", req.query);
});
/**
 * トップPOST
 */
router.post("/", (req: express.Request, res: express.Response) => {
  if (req.session) {
    req.session.data = inData(req);
  }
  res.redirect(req.baseUrl + "/confirm");
});
/**
 * 確認画面GET
 */
router.get("/confirm", (req: express.Request, res: express.Response) => {
  var data: resData = new resData();
  if (req.session) {
    data = req.session.data;
  }
  res.render("confirm", { data: data });
});

app.use(router);

// 起動
app.listen(ENV.APP_PORT, () => {
  console.log(`ポート${ENV.APP_PORT}番で起動`);
});

// データ整形
const inData = (req: express.Request): resData => {
  console.log(req.body);
  return {
    name: req.body.name,
    food: req.body.food,
    searchUrl: encodeURI("https://www.google.com/search?q=" + req.body.food),
  };
};
// 確認画面に返却するデータ
export class resData {
  name: string;
  food: string;
  searchUrl: string;
  constructor() {
    this.name = "";
    this.food = "";
    this.searchUrl = "";
  }
}
