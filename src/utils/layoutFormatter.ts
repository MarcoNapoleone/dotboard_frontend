import {BoardItem} from "../services/boardItems.services";
import {Layout} from "react-grid-layout";

export const layoutFormatter = (boardItems: BoardItem []) : Layout[] => {

  let layout = [] as Layout[];
  boardItems.map((bi, index) => {
    layout.push({
      w: bi?.w,
      h: bi?.h,
      x: bi?.x,
      y: bi?.y,
      i: bi.id,
      moved: false,
      static: false,
    })
  })

  return layout;
}