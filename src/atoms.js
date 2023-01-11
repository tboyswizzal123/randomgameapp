import {atom, useRecoilState} from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist()


export const gamesState = atom({
  key: 'gamesState', 
  default: [], 
  effects_UNSTABLE: [persistAtom],
});

export const moneyState = atom({
  key: 'moneyState', 
  default: 0, 
  effects_UNSTABLE: [persistAtom],
});

export const oMoneyState = atom({
  key: 'oMoneyState', 
  default:0, 
  effects_UNSTABLE: [persistAtom],
});
