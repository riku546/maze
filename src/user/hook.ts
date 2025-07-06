import { useState } from 'react';
import { stepInto } from '../Maze/lib';
import type { Maze } from '../Maze/type';
import { initialUserInfo, type UserInfo } from './type';

const useUser = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);

  const updateUserInfo = (maze: Maze) => {
    const nextUserInfo = stepInto(
      maze,
      userInfo.positionY,
      userInfo.positionX,
      userInfo.directionType,
    );

    setUserInfo({
      positionY: nextUserInfo.newPositionY,
      positionX: nextUserInfo.newPositionX,
      directionType: nextUserInfo.newDirection,
    });
  };

  return { userInfo, updateUserInfo };
};

export default useUser;
