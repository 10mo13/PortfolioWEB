import {
    ClickTopButton,
} from '../index.js';


export function ButtonSetup(){
    //SetUp
    $("#webgl").append("<style>body{ opacity: 1; }</style>");
    setTimeout(function(){ 
    $("#webgl").append("<style>header{ z-index: 25; }</style>");
    $("#webgl").append("<style>.LeftBottom{ opacity: 1; }</style>");
    $("#webgl").append("<style>.contact, .contactDescription, .mail{ opacity: 1; }</style>");
    }, 900);
    //Topのボタンクリック処理
    const button = document.getElementsByClassName('TopButtonItem');
    const HeadButton = document.getElementsByClassName('HeadButtonItem');

    //TopButtonItemを持つ全てのボタンにイベントを設置。クリックで関数が呼び出される。
        for(var i=0; i<button.length; i++){
        button[i].addEventListener('click', ClickTopButton);
    }
  
    for(var i=0; i<HeadButton.length; i++){
        HeadButton[i].addEventListener('click', ClickTopButton);
    }

    //ロゴをクリックしたらTOPに戻る
    const logoButton = document.getElementsByClassName('logoButton');
    logoButton[0].addEventListener('click', function(){
    $.scrollify.move(0);
    });

}