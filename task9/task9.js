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
    const query = `output = "${newData}"`;
    const resp = await kintone.api(kintone.api.url('/k/v1/records.json'), 'GET', {
      app: 20,
      query: query
    });
    const records = resp.records;
    const askSubmit = () =>{
      if (window.confirm('重複するレコードが存在します。保存しますか？')){
        console.log('OK');
        return event;
      } else{
        return false;
      }
    }

    if (records.length >= 2){
      askSubmit();
    }
    else if(records.length == 1 && event.record.$id.value != resp.records[0].$id.value){
      askSubmit();
    }
    else{
      return event;
    }
  });
})();