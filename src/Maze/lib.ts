import { directions, stepInto } from '../user/lib';
import type { InitialUserInfo, UserDirection, UserInfo } from '../user/type';
import type { Maze, MazeSizes } from './type';

export const findRoute = (maze: Maze, userInfo: UserInfo) => {
  maze[0][0] = 'path';

  let { positionX, positionY, directionType } = structuredClone(userInfo);

  const route: { y: number; x: number; direction: UserDirection }[] = [
    { y: 0, x: 0, direction: 'right' },
  ];

  while (maze[positionY][positionX] !== 'goal') {
    const { newPositionX, newPositionY, newDirection } = stepInto(
      maze,
      positionY,
      positionX,
      directionType,
    );

    positionX = newPositionX;
    positionY = newPositionY;
    directionType = newDirection;

    route.push({ y: positionY, x: positionX, direction: directionType });
  }

  return route;
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
