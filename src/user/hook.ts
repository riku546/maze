import { useState } from 'react';
import { stepInto } from '../Maze/lib';
import type { Maze } from '../Maze/type';
export type UserDirection = 'up' | 'down' | 'left' | 'right';

export interface UserInfo {
  positionX: number;
  positionY: number;
  directionType: UserDirection;
}

export const initialUserInfo = {
  positionX: 0,
  positionY: 0,
  directionType: 'right',
} as const;

export type InitialUserInfo = typeof initialUserInfo;

const useUser = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    positionX: 0,
    positionY: 0,
    directionType: 'right',
  });

  const updateUserInfo = (maze: Maze) => {
    const nextUserInfo = stepInto(
      maze,
      userInfo.positionX,
      userInfo.positionY,
      userInfo.directionType,
    );

    if (!nextUserInfo) {
      return;
    }

    setUserInfo({
      positionX: nextUserInfo.newPositionX,
      positionY: nextUserInfo.newPositionY,
      directionType: nextUserInfo.directionType,
    });
  };

  return { userInfo, initialUserInfo, updateUserInfo };
};

export default useUser;
