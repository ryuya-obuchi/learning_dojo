(() => {
  'use strict';
    //イベント：保存ボタンをクリックしたとき
    //入力：自動計算文字列フィールドの値
    //加工：API実行
    //出力：重複したらアラート、OKなら保存して、キャンセルなら保存前に戻る

  var events = [
    'app.record.create.submit',
    'app.record.edit.submit',
  ];
  kintone.events.on(events, async (event) => {
    const newData = event.record.output.value;
    const query = `output = "${newData}"`;
    const resp = await kintone.api(kintone.api.url('/k/v1/records.json'), 'GET', {
      app: 20,
      // fields: ["output"],
      query: query
    });
    const records = resp.records;
    console.log(records.length);
    if (records.length > 0){
      const submitConfirmed = window.confirm('重複するレコードが存在します。保存しますか？')
        if (submitConfirmed){
          console.log('OK');
          return event;
        } else{
          return false;
        };
    };
  });
})();