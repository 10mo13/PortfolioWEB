import{
    controls,
    width,
    SmoothChangeValue,
    current
}from '../index.js';

export function modelSet(i){
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