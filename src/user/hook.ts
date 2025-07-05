import { useState } from 'react';
import { stepInto } from '../Maze/lib';
import type { Maze } from '../Maze/type';
import type { UserInfo } from './type';

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

  return { userInfo, updateUserInfo };
};

export default useUser;
