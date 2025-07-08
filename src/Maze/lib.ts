import type { InitialUserInfo, UserDirection, UserInfo } from '../user/type';
import type { Maze, MazeSizes } from './type';

const directions = {
  up: { y: -1, x: 0 },
  down: { y: 1, x: 0 },
  left: { y: 0, x: -1 },
  right: { y: 0, x: 1 },
} as const;

const left = {
  up: { y: 0, x: -1 },
  down: { y: 0, x: 1 },
  left: { y: 1, x: 0 },
  right: { y: -1, x: 0 },
} as const;

const frontWall = {
  up: 'right',
  down: 'left',
  left: 'up',
  right: 'down',
} as const;

const upperLeft = {
  up: 'left',
  down: 'right',
  left: 'down',
  right: 'up',
} as const;

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

export const findRoute = (maze: Maze, userInfo: UserInfo) => {
  maze[0][0] = 'path';

  let { positionX, positionY, directionType } = structuredClone(userInfo);

  const route: { y: number; x: number; direction: UserDirection }[] = [
    { y: 0, x: 0, direction: 'right' },
  ];

  while (maze[positionY][positionX] !== 'goal') {
    const newUserInfo = stepInto(maze, positionY, positionX, directionType);

    positionX = newUserInfo.newPositionX;
    positionY = newUserInfo.newPositionY;
    directionType = newUserInfo.newDirection;

    route.push({ y: positionY, x: positionX, direction: directionType });
  }

  return route;
};

const isOutInMaze = (maze: Maze, positionX: number, positionY: number) => {
  return positionX < 0 || positionX >= maze.length || positionY < 0 || positionY >= maze.length;
};

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

export const displayRouteInMaze = (
  maze: Maze,
  userInfo: UserInfo,
  initialUserInfo: InitialUserInfo,
) => {
  if (maze[0][0] === 'start') return maze;

  const mazeCopy = structuredClone(maze);
  const route = findRoute(maze, initialUserInfo);
  const nextUserInfo = stepInto(
    maze,
    userInfo.positionY,
    userInfo.positionX,
    userInfo.directionType,
  );

  const breakIndex = route.findIndex(
    (r) =>
      r.y === nextUserInfo.newPositionY &&
      r.x === nextUserInfo.newPositionX &&
      r.direction === nextUserInfo.newDirection,
  );

  const passedRoutes = breakIndex === -1 ? [...route] : route.slice(0, breakIndex);

  passedRoutes.map((route) => {
    mazeCopy[route.y][route.x] = 'route';
  });

  return mazeCopy;
};

export const generateMaze = (length: MazeSizes): Maze => {
  const maze: Maze = Array.from({ length }, () => Array.from({ length }, () => 'path'));

  maze[0][0] = 'start';
  maze[length - 1][length - 1] = 'goal';

  //２次元配列のmazeに一マスおきに壁を置く必要がある
  //壁を置くインデックスは奇数になるので、奇数の配列を作る
  const oddArray = Array.from({ length: length - 1 }, (_, i) => i).filter((i) => i % 2 === 1);

  oddArray.map((y) => {
    oddArray.map((x) => {
      //壁を作る
      maze[y][x] = 'wall';

      //さっき作った壁を、上下左右のどれかに伸ばす。
      const randomDirection = Object.values(directions)[Math.floor(Math.random() * 4)];
      maze[y + randomDirection.y][x + randomDirection.x] = 'wall';
    });
  });

  return maze;
};
