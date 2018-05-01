'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');

// IntentsのAction名
const NAME_ACTION = 'make_donut_cal';
// Intentsのparameter名
const DONUT_ARGUMENT = 'donut';
// 会話継続のための問いかけ
const ASK_QUESTION = '他にカロリーの知りたいドーナツはありますか？';

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  // ドーナツ＋カロリーのメッセージ作成処理
  function makeDonutCal (app) {
    // ユーザから受け取ったEntitiesの内容（ex. エンゼルフレンチ）
    const donut = app.getArgument(DONUT_ARGUMENT);
    let calorie;

    // ユーザから受け取った内容がnullの場合
    if (donut === null) {
      app.ask('すみません。よくわかりませんでした。'
        + ASK_QUESTION);
      return;
    }

    switch (donut) {
      case '紅茶のマンナンスティック プレーン':
        calorie = 136;
        break;
      case '紅茶のマンナンスティック 黒糖シュガー':
        calorie = 139;
        break;
      case 'ポン・デ・リング':
        calorie = 232;
        break;
      case 'ポン・デ・黒糖':
        calorie = 215;
        break;
      case 'ポン・デ・ストロベリー':
        calorie = 254;
        break;
      case 'オールドファッション':
        calorie = 328;
        break;
      case 'チョコファッション':
        calorie = 364;
        break;
      case 'オールドファッション ハニー':
        calorie = 390;
        break;
      case 'フレンチクルーラー':
        calorie = 170;
        break;
      case 'エンゼルフレンチ':
        calorie = 201;
        break;
      case 'ストロベリーカスタードフレンチ':
        calorie = 209;
        break;
      case 'ハニーディップ':
        calorie = 230;
        break;
      case 'シュガーレイズド':
        calorie = 221;
        break;
      case 'チョコリング':
        calorie = 268;
        break;
      case 'ストロベリーリング':
        calorie = 264;
        break;
      case 'カスタードクリーム':
        calorie = 219;
        break;
      case 'エンゼルクリーム':
        calorie = 206;
        break;
      case 'チョコレート':
        calorie = 252;
        break;
      case 'ココナツチョコレート':
        calorie = 268;
        break;
      case 'ダブルチョコレート':
        calorie = 267;
        break;
      case 'ゴールデンチョコレート':
        calorie = 285;
        break;
      case 'ハニーチュロ':
        calorie = 216;
        break;
      case 'エンゼルクリームボール':
        calorie = 40;
        break;
      case 'ポン・デ・ストロベリーボール':
        calorie = 47;
        break;
      case 'ゴールデンチョコレートボール':
        calorie = 50;
        break;
      case 'ココナツチョコレートボール':
        calorie = 49;
        break;
      case 'オールドファッションボール':
        calorie = 61;
        break;
      case 'チョコファッションボール':
        calorie = 74;
        break;
      case 'ふかふか焼きドーナッツ プレーン':
        calorie = 216;
        break;
    }

    if (donut === 'ドーナツポップ') {
      app.ask(donut + 'は、'
      + 'エンゼルクリームボールが40キロカロリー、'
      + 'ポン・デ・ストロベリーボールが47キロカロリー、'
      + 'ゴールデンチョコレートボールが50キロカロリー、'
      + 'ココナツチョコレートボールが49キロカロリー、'
      + 'オールドファッションボールが61キロカロリー、'
      + 'チョコファッションボールが74キロカロリー、'
      + '合計6個で321キロカロリーです。'
      + ASK_QUESTION);
      return;
    }
    
    if (donut === '一番カロリーの高いドーナツ') {
      app.ask('一番カロリーの高いドーナツは、オールドファッション ハニーの390キロカロリーです。'
        + ASK_QUESTION);
      return;
    }

    if (donut === '一番カロリーの低いドーナツ') {
      app.ask('一番カロリーの低いドーナツは、紅茶のマンナンスティック プレーンの136キロカロリーです。'
        + ASK_QUESTION);
      return;
    }

    app.ask(donut + 'は、' + calorie + 'キロカロリーです。'
      + ASK_QUESTION);
  }

  let actionMap = new Map();
  actionMap.set(NAME_ACTION, makeDonutCal);

  app.handleRequest(actionMap);
});
