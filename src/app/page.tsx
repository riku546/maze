'use client';

import { useState } from 'react';
import styles from './page.module.css';
import useMaze from '../Maze/hook';

type UserInfo = {
  positionX: number;
  positionY: number;
}
export default function Home() {
  const [userInfo , setUserInfo] = useState<UserInfo>({
    positionX: 0,
    positionY: 0,
  })

  const { maze } = useMaze();
  console.log(maze);

  return (
    <div className={styles.container}>
      <h1>hello</h1>
    </div>
  );
}
