import "./style.css";
import * as THREE from "three";
import GifLoader from './three-gif-loader/gif-loader';  //temporary
// オブジェクトをロードするための Loader をimportしておきます
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { GLTFLoader } from './three-gif-loader/GLTFLoader.js';
import TrackballControls from 'three-trackballcontrols';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Canvas
const canvas = document.querySelector("#webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );




//背景色のアルファ値を透過になるよう設定
renderer.setClearColor(0x000000, 0);

// const plane = new THREE.Mesh( geometry, material );
// // plane.rotation.z = Math.PI / 2;
// plane.position.set(0.2, 10, 0);
// plane.scale.set(5.2, 5.2, 5.2);
// plane.name = "plane";
// // scene.add(plane);

//ゲーム画面のplane
const geometry = new THREE.PlaneGeometry( 1, 1 );
const material = new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load("texture/01.png")} );

// グループを作る
const wrap = new THREE.Object3D();
let wrapRotaSpeed = 0.01;

// planeの画面アニメーション
const TopAnim = [];  //["01.png", "02.png", "03.png"]
var flame = 0;

function DisplayAnimetion(){
  // console.log(flame);
const Display = scene.getObjectByName("plane"); //planeという名前を付けたオブジェクトを探す
Display.material.map = new THREE.TextureLoader().load("texture/" + TopAnim[flame]);  //変更後のテクスチャ
Display.material.needsUpdate = true; // アップデート
flame += 1;

if(flame == TopAnim.length){
  flame = 0;
}
}
// setInterval(DisplayAnimetion, 500);


// オブジェクトを回転させるときに参照したいため、ここで変数を宣言
var object_switch = null;

// ゲーム機のオブジェクトを読み込む
const mtlLoader = new MTLLoader();
mtlLoader.setPath('models/');
mtlLoader.load('MVovel02_2022_0923.mtl', (materials) => {
  materials.preload();
  const objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.setPath('models/');
  objLoader.load('MVovel02_2022_0923.obj', (object) => {
    const mesh = object;
    object_switch = object;
    object_switch.rotation.x = Math.PI / 2;  //回転で縦に起こす
    object_switch.position.set(0, 9, -1.5);
    // scene.add(mesh);
    // wrap.add(object);
  });
})


// グループに追加する
// wrap.add(plane);
scene.add(wrap);


camera.position.z = 15;
camera.position.y = 5;

// オブジェクトを照らすために環境光源を追加する
const light = new THREE.AmbientLight(0xFFFFFF, 1.0);
light.position.set(5, 15, -5);
scene.add(light);

//Debug
const pointLightHelper = new THREE.PointLightHelper(light, 3);
// scene.add(pointLightHelper);


const animate = function () {
  requestAnimationFrame( animate );
  // そのまま書くとオブジェクトが読み込まれる前に動いてしまうので、ifで括っておく
  if (object_switch){
    // wrap.rotation.x += 0.01;
    wrap.rotation.y += wrapRotaSpeed;
    // console.log(camera.rotation);
  }
  renderer.render( scene, camera );
};
animate();
wrap.rotation.set(-0.5, -0.4, -0.4);
// wrap.position.set(0, 0, 0);


//////gif temporary  ////////
// instantiate a loader
const loader = new GifLoader();

// load a image resource
const texture2 = loader.load(
  // resource URL
  'texture/pixcelArtGif_01_2022_0924.gif',

  // onLoad callback
  function (reader) {
    // You probably don't need to set onLoad, as it is handled for you. However,
    // if you want to manipulate the reader, you can do so here:

    // console.log(reader.numFrames());
  },

  // onProgress callback
  function (xhr) {
    // console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`);
  },

  // onError callback
  function () {
    console.error('An error happened.');
  }
);
const material2 = new THREE.MeshBasicMaterial({
  map: texture2,
  transparent: true
});

//ゲーム画面のplane
const geometry2 = new THREE.PlaneGeometry( 1, 1 );
const material3 = new THREE.MeshBasicMaterial( {map: texture2,
  transparent: true} );
const plane2 = new THREE.Mesh( geometry2, material3 );
plane2.name = "plane";
plane2.position.set(0.2, 1, -0.07);  //-0.07以上後ろに下げるとうぶジェクトに埋まる
plane2.scale.set(5.2, 5.2, 5.2);
scene.add(plane2);
wrap.add(plane2);


//glTFの読み込み
const gltfLoader = new GLTFLoader();
 
gltfLoader.load('./models/MyGame_Fix02.glb',function(data){
    const gltf = data;
    const obj = gltf.scene;
    obj.rotation.x = Math.PI / 2;  //回転で縦に起こす
    obj.position.set(0, 0, -1.5);
    scene.add(obj);
    wrap.add(obj);
});





//マウス操作でオブジェクトを動かす（正確にはカメラが動いている）
const controls = new TrackballControls(camera, renderer.domElement);
 
camera.position.z = 17;
controls.rotateSpeed = 5.0; //回転速度
controls.zoomSpeed = 0.0;//ズーム速度
controls.panSpeed = 0.0;//パン速度
controls.update();
 
const tick = function () {
  requestAnimationFrame(tick);
 
  controls.update();
  renderer.render(scene, camera);
  // console.log(scene.rotation);
}
tick();



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

var NowOpenMordal = "";
//WorkのItemクリック処理
const Item = document.getElementsByClassName('item');
for(var i=0; i<Item.length; i++){
  Item[i].addEventListener('click', {
    val1: i,
    handleEvent: ClickItem
   } );
   $(".content" + String(i + 1)).hide();
}
function ClickItem(){
  // console.log(".content" + String(this.val1 + 1));
  NowOpenMordal = ".content" + String(this.val1 + 1);
  $(".content" + String(this.val1 + 1)).fadeIn();
  $(".modalWindow").fadeIn();  //ボタンによって中身を変える
  $(".pagenation").fadeOut();
  $.scrollify.disable();
  $(".ScrollContent").scrollTop(0);  //モーダル内のスクロール位置リセット
  $('body').css({ overflow: 'hidden' });  //スクロール固定
}
$(".js-modal-close").on("click", function () {
  $(NowOpenMordal).fadeOut();
  $(".modalWindow").fadeOut();
  $(".pagenation").fadeIn();
  $.scrollify.enable();
  $('body').css({ overflow: '' });
  return false;
});

// function flameSet(funcName, targetValue, time){
//   let flame = setInterval(function(){
//     // console.log(funcName);  //Debug
//     if(funcName < targetValue){
//       funcName += 0.05
//       if(funcName >= targetValue){
//         clearInterval(flame);
//       }
//     }
    
//     if(funcName > targetValue){
//       funcName -= 0.05
//       if(funcName <= targetValue){
//         clearInterval(flame);
//       }
//     }
//   }, time);
// }

//値を滑らかに変化させるEase。
function SmoothChangeValue(funcName, targetValue){

  if(funcName == "wrapRotaSpeed"){
    wrapRotaSpeed = targetValue;
  }

  if(funcName == "wrapRota"){
    var count    = 0;
    var end      = 50;  // 繰り返したい回数
    var interval = 15; // 繰り返し処理の実行間隔（ミリ秒数 1000=1秒）

    var id = setInterval(function() {
      wrap.rotation.set(
        ( 1 - count / end ) *  wrap.rotation.x + count / end * targetValue[0],
        ( 1 - count / end ) *  wrap.rotation.y + count / end * targetValue[1],
        ( 1 - count / end ) *  wrap.rotation.z + count / end * targetValue[2]);

      // TargetValue　/　end * count
      // wrap.rotation.set(
      //   targetValue[0] / end * count,
      //   targetValue[1] / end * count,
      //   targetValue[2] / end * count);

        count += 1;
        if (count == end) {
          clearInterval(id);
        }
      },interval);
  }

  if(funcName == "scene"){
    // scene.rotation.set(targetValue[0], targetValue[1], targetValue[2]);
    // console.log(scene.rotation.x == targetValue[0] && scene.rotation.y == targetValue[1] && scene.rotation.z == targetValue[2]);

    var count    = 0;
    var end      = 50;  // 繰り返したい回数
    var interval = 15; // 繰り返し処理の実行間隔（ミリ秒数 1000=1秒）

    var id = setInterval(function() {

      //lerp関数。(1 - a) * currentValue + a targetValue; で求められる。aに入れる値によって曲線補間の動きを変えられる。今回のcount/endは変化が一定で、全体の繰り返す回数に対する現在の進捗％の値となる。
      scene.rotation.set(
        ( 1 - count / end ) *  scene.rotation.x + count / end * targetValue[0],
        ( 1 - count / end ) *  scene.rotation.y + count / end * targetValue[1],
        ( 1 - count / end ) *  scene.rotation.z + count / end * targetValue[2]);
        
      //0からTaragetValueに向かって徐々に回転…スタート値を変えたい
      // scene.rotation.set(
      //   targetValue[0] / end * count,
      //   targetValue[1] / end * count,
      //   targetValue[2] / end * count);

        count += 1;
        if (count == end) {
          clearInterval(id);
        }
      },interval);

  }

  if(funcName == "z"){
    // flameSet("camera.position.z",  targetValue, 10);
    // camera.position.z = targetValue;
    let flame = setInterval(function(){
      // console.log(camera.position.z);  //Debug
      if(camera.position.z < targetValue){
        camera.position.z += 0.05;
        if(camera.position.z >= targetValue){
          clearInterval(flame);
        }
      }
      
      if(camera.position.z > targetValue){
        camera.position.z -= 0.05;
        if(camera.position.z <= targetValue){
          clearInterval(flame);
        }
      }
    }, 10);
  }
}


//移行先のページによってモデルの状態をセット
function PageScrollModelSet(){
  if(current == 0){
    if(width < 479){
      SmoothChangeValue("z", 21);
      // camera.position.z = 21;
    }else{
      SmoothChangeValue("z", 17);
      // camera.position.z = 17;
    }
  }
  if(current != 0){
    controls.noRotate = true;
    SmoothChangeValue("wrapRotaSpeed", 0.0);
    // $("#webgl").append("<style>canvas{ z-index: 0; }</style>");
    $("#webgl").append("<style>canvas{ pointer-events: none; }</style>");
    $("#webgl").append("<style>header{ opacity: 1; }</style>");
  }
  
  if(current == 1){
    SmoothChangeValue("scene", i=[-0.181, 0.124, 0.357]);
      // wrap.rotation.set(-0.5, -0.4, -0.4);
      SmoothChangeValue("wrapRota", i=[-0.5, -0.4, -0.4]);
      
    if(width < 479){
      $("#webgl").append("<style>canvas{ left: 50%; }</style>");
      $("#webgl").append("<style>canvas{ top: 17%; }</style>");
      //SmoothChangeValue("z", 26); //default 16
      camera.position.z = 26;  //上の処理とは違い、Lerpせず一瞬で変更する
    }else{
      $("#webgl").append("<style>canvas{ left: 72%; }</style>");
      $("#webgl").append("<style>canvas{ top: 35%; }</style>");
      SmoothChangeValue("z", 16); //default 11
    }
    
  }else if( current == 2){  //|| current == 3
    // $("#webgl").append("<style>box{ height: 200vh; }</style>");
      $("#webgl").append("<style>canvas{ left: 73%; }</style>");
      SmoothChangeValue("scene", i=[-0.4, 0, 0]);
      // wrap.rotation.set(0, 0, 0);
      SmoothChangeValue("wrapRota", i=[0, 0, 0]);  //1回転y6.3

    if(width < 479){
      $("#webgl").append("<style>canvas{ top: 95%; }</style>");
      SmoothChangeValue("z", 26); //default 16
    }else{
      $("#webgl").append("<style>canvas{ top: 91%; }</style>");
      SmoothChangeValue("z", 16); //default 11
    }
    
  }
  else if(current == 3){
      SmoothChangeValue("scene", i=[-0.181, 0.124, 0.357]);
      // wrap.rotation.set(0, 0, 0);
      SmoothChangeValue("wrapRota", i=[0.0, 0.3, -0.4]);

    if(width < 701){
      $("#webgl").append("<style>canvas{ left: 50%; }</style>");
      $("#webgl").append("<style>canvas{ top: 25%; }</style>");
      //SmoothChangeValue("z", 22); //default 14
      camera.position.z = 21;
    }else{
      $("#webgl").append("<style>canvas{ left: 30%; }</style>");
      $("#webgl").append("<style>canvas{ top: 40%; }</style>");
      SmoothChangeValue("z", 14); //default 11
    }
    
  }
}

//Top以外にページ移行した際の処理
function PageScrollFromNonTop(){
  if(fromVar == 0){  //Topページから来たときはこちらを実行
    $("#webgl").append("<style>canvas{ left: 150%; }</style>"); //一旦画面外へ
    window.setTimeout(function(){
      controls.reset();
      PageScrollModelSet();
    }, 800);

  }else{  //Topページ以外から来たときはこちらを実行
    PageScrollModelSet();
  }
}

//ページ移行の関数
function PageScroll(PageNum){
  
  //TOPページに移動時に実行
  if(PageNum == 0){
    
    controls.noRotate = false;  //ドラッグ不可に
    $("#webgl").append("<style>canvas{ left: 150%; }</style>"); //一旦画面外へ
    $("#webgl").append("<style>header{ opacity: 0; }</style>");
    $("#webgl").append("<style>header{ transition: opacity 0.8s; }</style>");

    //0.8秒後に実行
    window.setTimeout(function(){
      $("#webgl").append("<style>canvas{ left: 50%; }</style>");
      $("#webgl").append("<style>canvas{ top: 35%; }</style>");  //高さを初期位置に戻す
      //$("#webgl").append("<style>canvas{ z-index: 15; }</style>");  //表示優先度を上げてドラッグ可能に
      
    $("#webgl").append("<style>canvas{ pointer-events: auto; }</style>");
      SmoothChangeValue("wrapRotaSpeed", 0.01);  //自動回転速度をセット
      SmoothChangeValue("scene", i=[0,0,0]); //シーンの回転率初期化
      wrap.rotation.set(-0.5, -0.4, -0.4);  //回転率初期化
        // SmoothChangeValue("z", 17);  //カメラからの距離初期化 default 12
      
    }, 800);
  }

  PageScrollFromNonTop();

}

//画面比率によってリサイズ
onResize();
var width = window.innerWidth;  //画面比じゃなくてcanvasの比率持ってきたほうがいい？
var height = window.innerHeight;
var resize = 1.0;  //画面サイズ調整用 default 0.75
// リサイズイベント発生時に実行
window.addEventListener('resize', onResize);

function onResize() {
  // サイズを取得
  width = window.innerWidth;  //画面比じゃなくてcanvasの比率持ってきたほうがいい？
  height = window.innerHeight;
  resize = 1.0;  //画面サイズ調整用 default 0.75

  // if(width <= 479){
  //   resize = 0.6;
  // }
  PageScrollModelSet();  //画面サイズ変更時にもモデルの位置再セット

  // レンダラーのサイズを調整する
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width * resize, height * resize);

  // カメラのアスペクト比を正す
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}


//scrolify
$('.box1').addClass('active');
var scrollNow = false;
var fromVar = 0; //ページ移行前の値
var current = 0;
$.scrollify({
    section:".box",
    setHeights: false,
    overflowScroll: true,
    standardScrollElements: '.box3',  //box3ではScrollifyを使わない
    before:function(i,box){  //ページ移動する前に実行
        fromVar = current;  //移行前、何ページにいたのか記録
        current = i;
        $('.pagenation .active').removeClass('active');
        $('.pagenation').find('a').eq(i).addClass('active'); 

        $('.box').removeClass('active'); //boxの要素を非表示に
        window.setTimeout(function(){
          $('.box').eq(i).addClass('active');  //スライド後、0.7秒後にboxの要素を表示
        }, 700);
        
        PageScroll(i);  //スクロールした際の関数。主にモデルのコントロール
    },

    after:function(i,box){  //ページ移行終了時に実行
      scrollNow = false;
    },
    
    afterRender:function(){
      PageScroll(0);  //開始時にモデルが回転しなくなったので、読み込み時にポジション再読み込み
        var pagenation = '<ul class="pagenation">';
        $('.box').each(function(i){
            pagenation += '<li><a></a></li>';
        });
        pagenation += '</ul>';
        $('body').append(pagenation);
        $('.pagenation a').each(function(i){
            $(this).on('click',function(){
                $.scrollify.move(i);  //横のpagenationクリック時に実行
            });
        });
        $('.pagenation li:first-child').find('a').addClass('active');
    },
    
});
$(window).on('resize',function(){
    if(current){
        var currentScrl = $('.box').eq(current).offset().top;
        $(window).scrollTop(currentScrl);
    }
});


function ClickTopButton(){
  // console.log(this.value);
  if (this.value == 'About') {
    $.scrollify.move(1);
  }else if(this.value == 'Work'){
    $.scrollify.move(2);
  }else if(this.value == 'Contact'){
    $.scrollify.move(3);
  }
}



  // $('.container').hover(
  //   function(){
  //     $.scrollify.disable();
  //     $("#webgl").append("<style>::-webkit-scrollbar-thumb {background-color: #eeeeee;}</style>");  //ホバー時にスクロールバー表示
      
  //   },
  //   function(){
  //     $.scrollify.enable();
  //     $("#webgl").append("<style>::-webkit-scrollbar-thumb {background-color: #eeeeee00;}</style>");
  //   }
  // );
  


// $('.container').hover(
//   function(){
//     $.scrollify.disable();
//   },
//   function(){
//     $.scrollify.enable();
//   }
//  );