import React, {useEffect} from "react";
import _ from "lodash";
import {WidthProvider, Responsive, Layout} from "react-grid-layout";
import {Card, CardContent} from "@mui/material";
import "./styles.css";
import {useTheme} from "@mui/material/styles";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface MinMaxLayoutProps {
  isDraggable?: boolean;
  isResizable?: boolean;
  layout?: JSX.Element[]; // Aggiunto il campo layout
  rowHeight?: number;
  editMode?: boolean;
  onLayoutChange?: (layout: JSX.Element[]) => void;
  onDroppedItem?: (item: any) => void;
  cols?: { [breakpoint: string]: number };
  loading?: boolean;
}


const GridLayout: React.FC<MinMaxLayoutProps> = (
  {
    isDraggable,
    isResizable,
    layout,
    rowHeight = 120,
    editMode,
    onLayoutChange = () => {
    },
    onDroppedItem = () => {
    },
    cols = {lg: 12, md: 10, sm: 8, xs: 6, xxs: 2},
  }
) => {

  const theme = useTheme();

  useEffect(() => {
  }, []);


  const handleLayoutChange = (layout: Layout[]): void => {
    onLayoutChange(layout);
  };

  return (
    <ResponsiveReactGridLayout
      onLayoutChange={handleLayoutChange}
      isDraggable={isDraggable}
      isResizable={isResizable}
      isDroppable={editMode && false}
      onDrop={(elemParams) => {
        onDroppedItem(elemParams.pop());
      }}
      style={{
        minHeight: '200px',
      }}
      rowHeight={rowHeight}
      cols={cols}
    >
      {layout}
    </ResponsiveReactGridLayout>
  );
};

export default GridLayout;
