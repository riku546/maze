export type MazeElement = 'wall' | 'path' | 'goal' | 'start' | 'route';
export type Maze = MazeElement[][];


export const mazeSizeOptions = {
  easy: 21,
  medium: 51,
  hard: 81,
  extreme: 101,
} as const;

export type MazeSizeType = keyof typeof mazeSizeOptions;
export type MazeSizes = (typeof mazeSizeOptions)[MazeSizeType];
