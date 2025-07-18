'use client';

import ReplayIcon from '@mui/icons-material/Replay';
import { useEffect } from 'react';
import useMaze from '../Maze/hook';
import { displayRouteInMaze } from '../Maze/lib';
import { searchSpeed } from '../Maze/type';
import useUser from '../user/hook';
import { initialUserInfo } from '../user/type';
import Cell from './components/cell';
import ConfettiComponent from './components/confetti';
import BasicModal from './components/modal';
import MazeSizeSelect from './components/select';
import styles from './page.module.css';

export default function Home() {
  const { maze, mazeType, regenerateMaze, startSearchRoute, setMazeType } = useMaze();
  const { userInfo, updateUserInfo } = useUser();

  // 早期リターンの前にフックは必ず呼び出す

  const isFinishedSearch = maze?.[userInfo.positionY]?.[userInfo.positionX] === 'goal';
  const isNotStart = !maze || maze[0][0] === 'start';

  useEffect(() => {
    // maze が未定義 or スタートセル or 探索完了時は何もしない
    if (isNotStart) return;

    const interval = setInterval(() => updateUserInfo(maze), searchSpeed[mazeType]);

    if (isFinishedSearch) {
      clearInterval(interval);
      return;
    }

    return () => clearInterval(interval);
  }, [maze, isNotStart, updateUserInfo, isFinishedSearch, mazeType]);

  if (!maze) return <div />;

  return (
    <div className={styles.container}>
      <ConfettiComponent isRun={isFinishedSearch} />
      <div className={styles.gameHeader}>
        <BasicModal maze={maze} startSearchRoute={startSearchRoute} disabled={isFinishedSearch} />
        <MazeSizeSelect
          mazeType={mazeType}
          regenerateMaze={regenerateMaze}
          disabled={isFinishedSearch}
          setMazeType={setMazeType}
        />
        <div className={styles.reloadIcon} onClick={() => window.location.reload()}>
          <ReplayIcon />
        </div>
      </div>
      <div className={styles.mazeBoard}>
        {displayRouteInMaze(maze, userInfo, initialUserInfo).map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.map((cell, cellIndex) => (
              <Cell key={cellIndex} mazeType={mazeType} cell={cell} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
