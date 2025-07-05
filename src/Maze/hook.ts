import { useEffect, useState } from 'react';
import { generateMaze } from './lib';
import { mazeSizeOptions, type Maze, type MazeSizeType } from './type';

const useMaze = () => {
  //奇数じゃないといけない

  const [mazeType, setMazeType] = useState<MazeSizeType>('hard');

  const [maze, setMaze] = useState<Maze | undefined>(undefined);

  const regenerateMaze = (type: MazeSizeType) => {
    const maze = generateMaze(mazeSizeOptions[type]);
    setMaze(maze);
  };

  const startSearchRoute = (mazeLocal: Maze) => {
    const mazeCopy = structuredClone(mazeLocal);
    mazeCopy[0][0] = 'route';
    setMaze(mazeCopy);
  };

  useEffect(() => {
    setMaze(generateMaze(mazeSizeOptions[mazeType]));
  }, [mazeType]);

  return { maze, mazeType, regenerateMaze, startSearchRoute, setMazeType };
};

export default useMaze;
