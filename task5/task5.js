'use strict';
const table = document.getElementById('table');
const apiUrl = 'https://oykh3vmu623yt5rufrstzlyxyi0kitod.lambda-url.ap-northeast-1.on.aws/'
axios.get(apiUrl, {
    params: {
        id:'dojo',
    }
    }).then((resp) => {
        console.log(resp);
        for (let i = 0; i < 3; i++){
            //表の要素の作成とテキストの挿入
            const trTag = document.createElement('tr');
            const tdDay = document.createElement('td');
            tdDay.textContent = `${resp.data[i].day.value}`;
            trTag.appendChild(tdDay);
            const tdCategory = document.createElement('td');
            tdCategory.textContent =`${resp.data[i].category.value}`;
            trTag.appendChild(tdCategory);
            const tdContent = document.createElement('td');
            
            //aタグの生成と挿入、タブの遷移機能も追加
            const aTag = document.createElement('a');
            aTag.href = resp.data[i].url.value;
            aTag.target = resp.data[i].target.value;
            tdContent.appendChild(aTag);
            aTag.textContent = `${resp.data[i].content.value}`;
            trTag.appendChild(tdContent);

            //動的に背景色色分け ラベルごとにclassを作成
            switch (resp.data[i].label.value){
                case 'company':
                    tdCategory.className += 'company';
                    break;
                case 'ir':
                    tdCategory.className += 'ir';
                    break;
                case 'product':
                    tdCategory.className += 'product';
                    break;
            };
            table.appendChild(trTag);
        };
    }).catch((err) => {
        console.log(err);
    });

