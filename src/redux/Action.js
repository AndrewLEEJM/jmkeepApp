export const ADD_MEMO = 'ADD_MEMO';
export const REMOVE_MEMO = 'REMOVE_MEMO';
export const UPDATE_MEMO = 'UPDATE_MEMO';
export const NONE = 'NONE';

import 'react-native-get-random-values';
import {v4 as uuidV4} from 'uuid';

export function addMemo(memo) {
  console.log(memo);
  if (memo.id) {
    return {
      type: UPDATE_MEMO,
      memo: {
        ...memo,
      },
    };
  } else if (memo.title !== '') {
    return {
      type: ADD_MEMO,
      memo: {
        ...memo,
        id: uuidV4(),
      },
    };
  }
  return {type: NONE};
}

export function removeMemo(memo) {
  return {
    type: REMOVE_MEMO,
    memo,
  };
}
