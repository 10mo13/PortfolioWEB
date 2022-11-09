import "./style.css";
import * as THREE from "three";
import GifLoader from './three-gif-loader/gif-loader';  //temporary
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';  //オブジェクトを読み込むためのLoader
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { GLTFLoader } from './three-gif-loader/GLTFLoader.js';
import TrackballControls from 'three-trackballcontrols';

import { ButtonSetup } from './js/ButtonSetup';
import { windowChange } from "./js/windowChange";
import { modelSet } from "./js/modelSet";
import { lerp } from "./js/lerp";

//import method
ButtonSetup();

//Three.js SetUp
export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//3Dモデル用 Canvas
const canvas = document.querySelector("#webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//背景色のアルファ値を透過になるよう設定
renderer.setClearColor(0x000000, 0);

// グループを作る
export const wrap = new THREE.Object3D();
export let wrapRotaSpeed = 0.01;


// オブジェクトを回転させるときに参照したいため、ここで変数を宣言
var object_game = null;

// ゲーム機のオブジェクトを読み込む
const mtlLoader = new MTLLoader();
mtlLoader.setPath('models/');
mtlLoader.load('MVoxel.mtl', (materials) => {
  materials.preload();
  const objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.setPath('models/');
  objLoader.load('MVoxel.obj', (object) => {
    object_game = object;
    object_game.rotation.x = Math.PI / 2;  //回転で縦に起こす
    object_game.position.set(0, 9, -1.5);
  });
})

// グループに追加する
scene.add(wrap);

camera.position.z = 15;
camera.position.y = 5;

// オブジェクトを照らすために環境光源を追加する
const light = new THREE.AmbientLight(0xFFFFFF, 1.0);
light.position.set(5, 15, -5);
scene.add(light);

const animate = function () {
  requestAnimationFrame( animate );
  // そのまま書くとオブジェクトが読み込まれる前に動いてしまうので、ifで括っておく
  if (object_game){
    wrap.rotation.y += wrapRotaSpeed;
  }
  renderer.render( scene, camera );
};
animate();
wrap.rotation.set(-0.5, -0.4, -0.4);

//////gifの準備（ゲーム機の画面）////////
const loader = new GifLoader();  // instantiate a loader

// load a image resource
const TopTexture = loader.load(
  // resource URL
  'texture/Top_01.gif',

  // onLoad callback
  function (reader) {
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
// const material2 = new THREE.MeshBasicMaterial({
//   map: TopTexture,
//   transparent: true
// });

//ゲーム画面のplane
const geometry2 = new THREE.PlaneGeometry( 1, 1 );
const material3 = new THREE.MeshBasicMaterial( {map: TopTexture, transparent: true} );
export const TopGIF = new THREE.Mesh( geometry2, material3 );
TopGIF.name = "plane";
TopGIF.position.set(0.2, 1, -0.07);  //-0.07以上後ろに下げるとオブジェクトに埋まる
TopGIF.scale.set(5.2, 5.2, 5.2);
scene.add(TopGIF);
wrap.add(TopGIF);

//Aboutのゲーム画面
const AboutTexture = loader.load(
  'texture/About_01.gif',
);
const geometry3 = new THREE.PlaneGeometry( 1, 1 );
const About = new THREE.MeshBasicMaterial( {map: AboutTexture,
  transparent: true} );
  export const AboutGIF = new THREE.Mesh( geometry3, About );
AboutGIF.name = "plane";
AboutGIF.position.set(0.2, 1.2, -0.09);  //-0.07以上後ろに下げるとオブジェクトに埋まる
AboutGIF.scale.set(5.2, 5.2, 5.2);
scene.add(AboutGIF);
wrap.add(AboutGIF);

//Workのゲーム画面
const WorkTexture = loader.load(
  'texture/Work_01.gif',
);
const geometry4 = new THREE.PlaneGeometry( 1, 1 );
const Work = new THREE.MeshBasicMaterial( {map: WorkTexture,
  transparent: true} );
  export const WorkGIF = new THREE.Mesh( geometry4, Work );
WorkGIF.name = "plane";
WorkGIF.position.set(0.2, 1, -0.09);  //-0.07以上後ろに下げるとオブジェクトに埋まる
WorkGIF.scale.set(5.2, 5.2, 5.2);
scene.add(WorkGIF);
wrap.add(WorkGIF);

//Contactのゲーム画面
const ContactTexture = loader.load(
  'texture/Contact_01.gif',
);
const geometry5 = new THREE.PlaneGeometry( 1, 1 );
const Contact = new THREE.MeshBasicMaterial( {map: ContactTexture,
  transparent: true} );
  export const ContactGIF = new THREE.Mesh( geometry5, Contact );
ContactGIF.name = "plane";
ContactGIF.position.set(0.2, 1.3, -0.09);  //-0.07以上後ろに下げるとオブジェクトに埋まる
ContactGIF.scale.set(5.2, 5.2, 5.2);
scene.add(ContactGIF);
wrap.add(ContactGIF);


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
export const controls = new TrackballControls(camera, renderer.domElement);
 
camera.position.z = 17;
controls.rotateSpeed = 5.0; //回転速度
controls.zoomSpeed = 0.0;//ズーム速度
controls.panSpeed = 0.0;//パン速度
controls.update();
 
const tick = function () {
  requestAnimationFrame(tick);
 
  controls.update();
  renderer.render(scene, camera);
}
tick();


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

function ChangeGIF(pageNum){
  //import method
  windowChange(pageNum);
}

//値を滑らかに変化させるEase。
export function SmoothChangeValue(funcName, targetValue){
  if(funcName == "wrapRotaSpeed"){
    wrapRotaSpeed = targetValue;
  }

  lerp(funcName, targetValue); //import method
}


//移行先のページによってモデルの状態をセット
function PageScrollModelSet(){
  ChangeGIF(current);  //画面移行時にゲーム機の映像も変える
  modelSet(i);  //import method
}

//Top以外にページ移行した際の処理
function PageScrollFromNonTop(){
  if(fromVar == 0){  //Topページから来たときはこちらを実行
    $("#webgl").append("<style>canvas{ left: 150%; }</style>"); //ゲーム機を一旦画面外へ
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
export var width = window.innerWidth;
var height = window.innerHeight;
var resize = 1.0;  //画面サイズ調整用 default 0.75

// リサイズイベント発生時に実行
window.addEventListener('resize', onResize);

function onResize() {
  // サイズを取得
  width = window.innerWidth;
  height = window.innerHeight;
  resize = 1.0;  //画面サイズ調整用

  PageScrollModelSet();  //画面サイズ変更時にもモデルの位置再セット

  // レンダラーのサイズを調整する
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width * resize, height * resize);

  // カメラのアスペクト比を正す
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}


//scrolify  ページ自動切換え
$('.box1').addClass('active');
var scrollNow = false;
var fromVar = 0; //ページ移行前の値
export var current = 0;
$.scrollify({
    section:".box",
    setHeights: false,
    overflowScroll: true,
    // standardScrollElements: '.box3',  //box3ではScrollifyを使わない
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


export function ClickTopButton(){
  if (this.value == 'About') {
    $.scrollify.move(1);
  }else if(this.value == 'Work'){
    $.scrollify.move(2);
  }else if(this.value == 'Contact'){
    $.scrollify.move(3);
  }
}
