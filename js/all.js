
// 指定 dom 元素
let list = document.querySelector('.list');
let sendData = document.querySelector('.send');
let data = JSON.parse(localStorage.getItem('listData')) || []; // 把字串轉為陣列，方便在以下函式裡使用
let clearData = document.querySelector('.clear');

// 監聽 & 更新
sendData.addEventListener('click', addData); // 新增 data
clearData.addEventListener('click', deleteAll); // 刪除所有資料
updataList(data); // 顯示於網頁，預設就先更新一次

// 新增 : 把計算出的值加入列表，並更新網頁與 localstorage
function addData(e){
    e.preventDefault();
    // BMI
    let h_num = parseInt(document.querySelector('.h-txt').value) / 100; // 公尺
    let w_num = parseInt(document.querySelector('.w-txt').value); // 公斤
    let txt = w_num / (h_num*h_num); // BMI = weight / (height * height)
    txt = txt.toFixed(2);

    // 狀態
    let status;
    let color;
    if(0 <txt && txt < 18.5){ // 判斷式只能判斷一個而已，不能寫成 0 < txt < 18.5
        status = '過輕';
        color = 'colorBlue';
        sendData.setAttribute('class', 'send colorBlue');
    }else if(18.5 <= txt && txt < 24){
        status = '理想';
        color = 'colorGreen';
        sendData.setAttribute('class', 'send colorGreen');
    }else if(24 <= txt && txt < 27){
        status = '過重';
        color = 'colorOrange1';
        sendData.setAttribute('class', 'send colorOrange1');
    }else if(27 <= txt && txt < 30){
        status = '輕度肥胖';
        color = 'colorOrange2';
        sendData.setAttribute('class', 'send colorOrange2');
    }else if(30 <= txt && txt < 35){
        status = '中度肥胖';
        color = 'colorOrange2';
        sendData.setAttribute('class', 'send colorOrange2');
    }else{
        status = '重度肥胖';
        color = 'colorRed';
        sendData.setAttribute('class', 'send colorRed');
    }

    // 取得今天的日期
    let Today = new Date();
    let YY = Today.getFullYear();
    let MM = (Today.getMonth()+1<10 ? '0' : '')+(Today.getMonth()+1);
    let DD = (Today.getDate()<10 ? '0' : '')+Today.getDate();

    let todo = {
        Status: status,
        Color: color,
        BMI: txt,
        height: h_num * 100,
        weight: w_num,
        date: MM+'-'+DD+'-'+YY
    };
    data.push(todo); // 將 todo 物件加入陣列 (陣列中有許多 todo)
    updataList(data); // 更新網頁
    localStorage.setItem('listData', JSON.stringify(data)); // 把陣列轉成字串，放進 localstorage
}

function updataList(items){
    // list
    let str = '';
    let len = items.length;
    // 變色按鈕
    let str_button = '';
    for(let i=0; i<len; i++){
        // list
        // str += '<li data-index="'+i+'" class="'+items[i].Color+'"><p class="status">'+items[i].Status+'</p><p><span>BMI</span>'+items[i].BMI+'</p><p><span>weight</span>'+items[i].weight+' kg</p><p><span>height</span>'+items[i].height+' cm</p><span>'+items[i].date+'</span></li>';
        str += `<li data-index='${i}' class='${items[i].Color}'>
            <p class="status">${items[i].Status}</p>
            <p><span>BMI</span>${items[i].BMI}</p>
            <p><span>weight</span>${items[i].weight}</p>
            <p><span>height</span>${items[i].height}</p>
            <span>${items[i].date}</span>
        </li>`;
        // 變色按鈕
        // str_button = '<img src="./images/icons_loop.png"><span class="'+items[i].Color+'"><p>'+items[i].BMI+'<span>BMI</span><p class="status">'+items[i].Status+'</p></span>';
        let imgUrl = "./images/icons_loop.png";
        str_button = `<img src="${imgUrl}">
        <span class='${items[i].Color}'>
            <p>${items[i].BMI}<span>BMI</span></p>
            <p class="status">${items[i].Status}</p>
        </span>`;
    }
    list.innerHTML = str; // list
    // 變色按鈕
    if(len == 0){
        sendData.innerHTML = '<span>看結果</span>';
        sendData.setAttribute('class', 'send init');
    }else{
        sendData.innerHTML = str_button;
    }
}

function deleteAll(e){
    e.preventDefault();
    data = [];
    localStorage.setItem('listData', JSON.stringify(data)); // 把空陣列放進 localstorage
    updataList(data);
}

// init
sendData.innerHTML = '<span>看結果</span>';
sendData.setAttribute('class', 'send init');