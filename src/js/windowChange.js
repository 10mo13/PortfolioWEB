import {
    TopGIF,
    AboutGIF,
    WorkGIF,
    ContactGIF
} from '../index.js';

export function windowChange(pageNum){

        if(pageNum == 0){
          TopGIF.position.set(0.2, 1, -0.06);
          AboutGIF.position.set(0.2, 1.2, -0.08); //Aboutに移行時にゲーム機の画面を切り替える
          WorkGIF.position.set(0.2, 1, -0.08);
          ContactGIF.position.set(0.2, 1.3, -0.08);
        }
        if(pageNum == 1){
          TopGIF.position.set(0.2, 1, -0.08);
          AboutGIF.position.set(0.2, 1.2, -0.06);
          WorkGIF.position.set(0.2, 1, -0.08);
          ContactGIF.position.set(0.2, 1.3, -0.08);
        }
        if(pageNum == 2){
          TopGIF.position.set(0.2, 1, -0.08);
          AboutGIF.position.set(0.2, 1.2, -0.08);
          WorkGIF.position.set(0.2, 1, -0.06);
          ContactGIF.position.set(0.2, 1.3, -0.08);
        }
        if(pageNum == 3){
          TopGIF.position.set(0.2, 1, -0.08);
          AboutGIF.position.set(0.2, 1.2, -0.08);
          WorkGIF.position.set(0.2, 1, -0.08);
          ContactGIF.position.set(0.2, 1.3, -0.06);
        }
}
