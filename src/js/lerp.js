 import {
    wrap,
    camera,
    scene
 } from  '../index.js';
 
 
 export function lerp(funcName, targetValue){
    

  if(funcName == "wrapRota"){
    var count    = 0;
    var end      = 50;  // 繰り返したい回数
    var interval = 15; // 繰り返し処理の実行間隔（ミリ秒数 1000=1秒）

    var id = setInterval(function() {
      wrap.rotation.set(
        ( 1 - count / end ) *  wrap.rotation.x + count / end * targetValue[0],
        ( 1 - count / end ) *  wrap.rotation.y + count / end * targetValue[1],
        ( 1 - count / end ) *  wrap.rotation.z + count / end * targetValue[2]);

        count += 1;
        if (count == end) {
          clearInterval(id);
        }
      },interval);
  }

  if(funcName == "scene"){

    var count    = 0;
    var end      = 50;  // 繰り返したい回数
    var interval = 15; // 繰り返し処理の実行間隔（ミリ秒数 1000=1秒）

    var id = setInterval(function() {

      //lerp関数。(1 - a) * currentValue + a targetValue; で求められる。aに入れる値によって曲線補間の動きを変えられる。今回のcount/endは変化が一定で、全体の繰り返す回数に対する現在の進捗％の値となる。
      scene.rotation.set(
        ( 1 - count / end ) *  scene.rotation.x + count / end * targetValue[0],
        ( 1 - count / end ) *  scene.rotation.y + count / end * targetValue[1],
        ( 1 - count / end ) *  scene.rotation.z + count / end * targetValue[2]);

        count += 1;
        if (count == end) {
          clearInterval(id);
        }
      },interval);

  }

  if(funcName == "z"){
    let flame = setInterval(function(){
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