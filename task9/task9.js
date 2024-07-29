(() => {
  'use strict';
    //イベント：保存ボタンをクリックしたとき
    //入力：自動計算文字列フィールドの値
    //加工：API実行
    //出力：重複したらアラート、OKなら保存して、キャンセルなら保存前に戻る

  const events = [
    'app.record.create.submit',
    'app.record.edit.submit',
  ];
  kintone.events.on(events, async (event) => {
    const newData = event.record.output.value;
    let query = `output = "${newData}"`;
    if (event.recordId) {
      query += `and $id != "${event.recordId}"`;
    }
    const resp = await kintone.api(kintone.api.url('/k/v1/records.json'), 'GET', {
      app: 20,
      query: query
    });
    const records = resp.records;
    if (records.length >= 1){
      if (window.confirm('重複するレコードが存在します。保存しますか？')){
        console.log('OK');
        return event;
      } else{
        return false;
      }
    }
    return event;
  });
})();