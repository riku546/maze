import type { MazeElement, MazeSizeType } from '../../Maze/type';

const Cell = ({ mazeType, cell }: { mazeType: MazeSizeType; cell: MazeElement }) => {
  const backgroundColor: { [key in MazeElement]: string } = {
    wall: 'black',
    route: 'green',
    path: 'white',
    start: 'red',
    goal: 'red',
  };

  const sizes: { [key in MazeSizeType]: { width: string; height: string } } = {
    easy: { width: '30px', height: '30px' },
    medium: { width: '12px', height: '12px' },
    hard: { width: '8px', height: '8px' },
    extreme: { width: '7px', height: '7px' },
  };

  return (
    <div
      style={{
        backgroundColor: backgroundColor[cell],
        width: sizes[mazeType].width,
        height: sizes[mazeType].height,
      }}
    />
  );
};

export default Cell;
