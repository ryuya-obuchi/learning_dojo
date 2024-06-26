(()=> {
    'use strict';
    
// イベント：レコード追加画面を表示した後	app.record.create.show
// 入力：1.Action5+1の項目
// 加工：チェックボックスにチェックを付ける、行の追加
// 出力：Action5+1を表示
    kintone.events.on('app.record.create.show',(event) => {
        const actions = event.record.Table.value[0].value.Action5;
        const actionList = ['あくなき探求', '不屈の心体', '理想への共感', '心を動かす', '知識を増やす','公明正大'];
        console.log(actionList);
        console.log(event);
        const rowList = [];
        actionList.forEach((elem) => {
            const newRow =
                {
                    id: null,
                    value: {
                        Action5:{
                            type: "DROP_DOWN",
                            value: elem,
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
        // console.log(rowList);
        event.record.Table.value = rowList;
        return event;
    });
})();