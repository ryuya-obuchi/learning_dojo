(()=>{
  'use strict';
  kintone.events.on('app.record.create.show',async (event) => {
    const params = {
      app:16
    };
    const resp = await kintone.api(kintone.api.url('/k/v1/app/form/fields.json'), 'GET', params)
    const Array = Object.values(resp.properties.Table.fields.Action5.options);
    console.log(Array);
    const action5s = Object.values(Array.sort((a,b) => a.index - b.index));
    console.log(action5s);
    // 行を追加してる
    const rowList = [];
    action5s.forEach((elem) => {
        const newRow ={
            id: null,
            value: {
              Action5:{
                type: "DROP_DOWN",
                value: elem.label,
                },
              '状況':{
                type:'CHECK_BOX',
                value:['未振り返り']
              },
              '課題':{
                type:'MULTI_LINE_TEXT',
                value:"",
              },
            },
          };
        rowList.push(newRow);
    });
    event.record.Table.value = rowList;
    return event;
  });
})();