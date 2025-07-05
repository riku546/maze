import type { InitialUserInfo, UserDirection, UserInfo } from '../user/hook';
import type { Maze, MazeSizes } from './type';

const directions = {
  up: { y: -1, x: 0 },
  down: { y: 1, x: 0 },
  left: { y: 0, x: -1 },
  right: { y: 0, x: 1 },
};

// interface StepIntoWayByDirectionType {
//   frontIsPath: {
//     up: 'up';
//     down: 'down';
//     left: 'left';
//     right: 'right';
//   };
//   frontIsWall: {
//     up: 'right';
//     down: 'left';
//     left: 'up';
//     right: 'down';
//   };
//   leftIsPath: {
//     up: 'left';
//     down: 'right';
//     left: 'down';
//     right: 'up';
//   };
// }

// const stepIntoWayByDirectionType: StepIntoWayByDirectionType = {
//   frontIsPath: {
//     up: 'up',
//     down: 'down',
//     left: 'left',
//     right: 'right',
//   },
//   frontIsWall: {
//     up: 'right',
//     down: 'left',
//     left: 'up',
//     right: 'down',
//   },
//   leftIsPath: {
//     up: 'left',
//     down: 'right',
//     left: 'down',
//     right: 'up',
//   },
// };

const leftByDirection = {
  up: { y: 0, x: -1 },
  down: { y: 0, x: 1 },
  left: { y: 1, x: 0 },
  right: { y: -1, x: 0 },
};

interface FrontWallByDirection {
  up: 'right';
  down: 'left';
  left: 'up';
  right: 'down';
}

interface LeftIsPathByDirection {
  up: { y: 0; x: -1; direction: 'left' };
  down: { y: 0; x: 1; direction: 'right' };
  left: { y: 1; x: 0; direction: 'down' };
  right: { y: -1; x: 0; direction: 'up' };
}

const frontWallByDirection: FrontWallByDirection = {
  up: 'right',
  down: 'left',
  left: 'up',
  right: 'down',
};

const leftIsPathByDirection: LeftIsPathByDirection = {
  up: { y: 0, x: -1, direction: 'left' },
  down: { y: 0, x: 1, direction: 'right' },
  left: { y: 1, x: 0, direction: 'down' },
  right: { y: -1, x: 0, direction: 'up' },
};

export const findRoute = (maze: Maze, userInfo: UserInfo) => {
  maze[0][0] = 'path';
  let { positionX, positionY, directionType } = structuredClone(userInfo);
  const route = [{ y: 0, x: 0, direction: 'right' }];
  while (maze[positionY][positionX] !== 'goal') {
    const nextInfo = stepInto(maze, positionX, positionY, directionType);

    if (!nextInfo) {
      return route;
    }

    positionX = nextInfo.newPositionX;
    positionY = nextInfo.newPositionY;
    directionType = nextInfo.directionType as UserDirection;

    route.push({ y: positionY, x: positionX, direction: directionType });
  }

  return route;
};

const isOutInMaze = (maze: Maze, positionX: number, positionY: number) => {
  const isOut =
    positionX < 0 || positionX >= maze.length || positionY < 0 || positionY >= maze.length;
  return isOut;
};

export const stepInto = (
  maze: Maze,
  positionX: number,
  positionY: number,
  direction: UserDirection,
) => {
  const leftBlockX = positionX + leftByDirection[direction].x;
  const leftBlockY = positionY + leftByDirection[direction].y;

  if (isOutInMaze(maze, leftBlockX, leftBlockY)) {
    const nextPositionY = positionY + directions[direction].y;
    const nextPositionX = positionX + directions[direction].x;

    if (isOutInMaze(maze, nextPositionX, nextPositionY)) {
      return {
        newPositionX: positionX,
        newPositionY: positionY,
        directionType: frontWallByDirection[direction],
      };
    } else if (maze[nextPositionY][nextPositionX] === 'goal') {
      return {
        newPositionX: nextPositionX,
        newPositionY: nextPositionY,
        directionType: direction,
      };
    } else {
      if (
        maze[nextPositionY][nextPositionX] === 'path' ||
        maze[nextPositionY][nextPositionX] === 'route'
      ) {
        return {
          newPositionX: nextPositionX,
          newPositionY: nextPositionY,
          directionType: direction,
        };
      } else if (maze[nextPositionY][nextPositionX] === 'wall') {
        return {
          newPositionX: positionX,
          newPositionY: positionY,
          directionType: frontWallByDirection[direction],
        };
      }
    }
  } else if (maze[leftBlockY][leftBlockX] === 'wall') {
    const nextPositionY = positionY + directions[direction].y;
    const nextPositionX = positionX + directions[direction].x;

    if (isOutInMaze(maze, nextPositionX, nextPositionY)) {
      return {
        newPositionX: positionX,
        newPositionY: positionY,
        directionType: frontWallByDirection[direction],
      };
    } else if (maze[nextPositionY][nextPositionX] === 'goal') {
      return {
        newPositionX: nextPositionX,
        newPositionY: nextPositionY,
        directionType: direction,
      };
    } else {
      if (
        maze[nextPositionY][nextPositionX] === 'path' ||
        maze[nextPositionY][nextPositionX] === 'route'
      ) {
        return {
          newPositionX: nextPositionX,
          newPositionY: nextPositionY,
          directionType: direction,
        };
      } else if (maze[nextPositionY][nextPositionX] === 'wall') {
        return {
          newPositionX: positionX,
          newPositionY: positionY,
          directionType: frontWallByDirection[direction],
        };
      }
    }
  } else if (maze[leftBlockY][leftBlockX] === 'path' || maze[leftBlockY][leftBlockX] === 'route') {
    const nextPositionY = positionY + leftIsPathByDirection[direction].y;
    const nextPositionX = positionX + leftIsPathByDirection[direction].x;
    if (isOutInMaze(maze, nextPositionX, nextPositionY)) {
      return {
        newPositionX: positionX,
        newPositionY: positionY,
        directionType: frontWallByDirection[direction],
      };
    } else if (maze[nextPositionY][nextPositionX] === 'goal') {
      return {
        newPositionX: nextPositionX,
        newPositionY: nextPositionY,
        directionType: direction,
      };
    } else {
      return {
        newPositionX: nextPositionX,
        newPositionY: nextPositionY,
        directionType: leftIsPathByDirection[direction].direction,
      };
    }
  }
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
    userInfo.positionX,
    userInfo.positionY,
    userInfo.directionType,
  );

  if (!nextUserInfo) {
    return mazeCopy;
  }

  const breakIndex = route.findIndex(
    (r) =>
      r.y === nextUserInfo.newPositionY &&
      r.x === nextUserInfo.newPositionX &&
      r.direction === nextUserInfo.directionType,
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
