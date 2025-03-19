import { Square } from "./Square";

export const Board = () => {
  
  return  <>
            <div className="board-row">
              <Square />
              <Square />
              <Square />
            </div>
            <div className="board-row">
              <Square />
              <Square />
              <Square />
            </div>
            <div className="board-row">
              <Square />
              <Square />
              <Square />
            </div>
          </>;
};
