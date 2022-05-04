import { config } from "dotenv";

export const ENV = {
  NODE_ENV: "",
  APP_PORT: 0,
};

export const CONST = {};

// .envファイルをパースする
const result = config();
const parsedConfig = result.parsed;

// パースが成功の場合、環境変数オブジェクトのキーでパース結果オブジェクトより値を取り出す。
if (parsedConfig !== undefined) {
  for (const key in ENV) {
    if (
      Object.prototype.hasOwnProperty.call(ENV, key) &&
      Object.prototype.hasOwnProperty.call(parsedConfig, key)
    ) {
      switch (key) {
        case "NODE_ENV":
          ENV[key] = parsedConfig[key];
          break;
        case "APP_PORT":
          ENV[key] = parseInt(parsedConfig[key], 10);
          break;
      }
    }
    // 環境変数オブジェクトのキーがパース結果オブジェクトに存在しない場合、例外をスローする
    else {
      throw new Error("環境変数読み込みエラー");
    }
  }
} else {
  console.log(result.error?.message);
  throw new Error("環境変数読み込みエラー");
}
