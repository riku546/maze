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
