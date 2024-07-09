(() => {
  'use strict';
  //イベント：フィールドの値が変更されたとき, app.record.edit.change.フィールドコード
  //入力：date, product, number
  //加工：YYYYMMDD-00-++に整形
  //出力：文字列に整形したものを出力
  const proName = {
    kintone: 'KN',
    Garoon: 'GR',
    "サイボウズ Office": 'OF',
    Mailwise: 'MW'
  };
  const events = [
    'app.record.edit.change.date',
    'app.record.edit.change.products',
    'app.record.edit.change.number',
    'app.record.create.change.date',
    'app.record.create.change.products',
    'app.record.create.change.number'
  ];

  const shows = [
    'app.record.create.show',
    'app.record.edit.show',
  ];

  kintone.events.on(events, (event) => {
    const newDate = dateFns.format(event.record.date.value, 'yyyyMMdd');
    event.record.output.value = `${newDate}-${proName[event.record.products.value]}-${event.record.number.value}`;
    return event;
  });

  kintone.events.on(shows, (event) => {
    event.record['output'].disabled = true;
    return event;
  });
})();