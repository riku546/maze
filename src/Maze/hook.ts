import { useEffect, useState } from 'react';
import type { Maze } from './type';

const useMaze = () => {
  const [maze, setMaze] = useState<Maze>();

  const generateMaze = (): Maze => {};

  useEffect(() => {
    const generatedMaze = generateMaze();
    setMaze(generatedMaze);
  }, []);

  return { maze };
};

export default useMaze;
