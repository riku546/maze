import type { Maze } from '../Maze/type';
import type { UserDirection } from './type';

type DirectionMap<T> = { [key in UserDirection]: T };

export const directions = {
  up: { y: -1, x: 0 },
  down: { y: 1, x: 0 },
  left: { y: 0, x: -1 },
  right: { y: 0, x: 1 },
} as const satisfies DirectionMap<{ y: number; x: number }>;

const left = {
  up: { y: 0, x: -1 },
  down: { y: 0, x: 1 },
  left: { y: 1, x: 0 },
  right: { y: -1, x: 0 },
} as const satisfies DirectionMap<{ y: number; x: number }>;

const frontWall = {
  up: 'right',
  down: 'left',
  left: 'up',
  right: 'down',
} as const satisfies DirectionMap<UserDirection>;

const upperLeft = {
  up: 'left',
  down: 'right',
  left: 'down',
  right: 'up',
} as const satisfies DirectionMap<UserDirection>;

interface StepBase {
  newPositionY: number;
  newPositionX: number;
  newDirection: UserDirection;
}

interface FrontWall extends StepBase {
  type: 'changeDirection';
}

interface LeftIspath extends StepBase {
  type: 'forwardAndChangeDicrection';
}

interface Forward extends StepBase {
  type: 'forward';
}

type StepIntoResponse = Forward | FrontWall | LeftIspath;

export const stepInto = (
  maze: Maze,
  positionY: number,
  positionX: number,
  di: UserDirection,
): StepIntoResponse => {
  const nextPositionY = positionY + directions[di].y;
  const nextPositionX = positionX + directions[di].x;

  const isFrontOutWall = isOutInMaze(maze, nextPositionX, nextPositionY);

  const isFrontWall = isFrontOutWall ? false : maze[nextPositionY][nextPositionX] === 'wall';

  const leftPositionY = nextPositionY + left[di].y;
  const leftPositionX = nextPositionX + left[di].x;
  const isLeftOut = isOutInMaze(maze, leftPositionX, leftPositionY);
  const isLeftPath = isLeftOut ? false : maze[leftPositionY][leftPositionX] !== 'wall';

  if (isFrontOutWall) {
    return {
      type: 'changeDirection',
      newPositionY: positionY,
      newPositionX: positionX,
      newDirection: frontWall[di],
    };
  } else if (isFrontWall) {
    return {
      type: 'changeDirection',
      newPositionY: positionY,
      newPositionX: positionX,
      newDirection: frontWall[di],
    };
  } else if (isLeftPath) {
    return {
      type: 'forwardAndChangeDicrection',
      newPositionY: nextPositionY,
      newPositionX: nextPositionX,
      newDirection: upperLeft[di],
    };
  }

  //真っ直ぐ進む
  return {
    type: 'forward',
    newPositionY: nextPositionY,
    newPositionX: nextPositionX,
    newDirection: di,
  };
};

const isOutInMaze = (maze: Maze, positionX: number, positionY: number) => {
  return positionX < 0 || positionX >= maze.length || positionY < 0 || positionY >= maze.length;
};
