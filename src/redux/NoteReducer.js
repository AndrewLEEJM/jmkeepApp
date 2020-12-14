import {ADD_MEMO, UPDATE_MEMO, REMOVE_MEMO} from './Action';
import axios from 'axios';

const init = async () => {
  try {
    const result = await axios.get('http://localhost:3030/get/memo');
    return result.data.memo;
  } catch (e) {
    console.log(e);
  }
};

const initState = {
  memo: [
    {
      title: '오늘의 일기',
      content: '어제 술마셔서 힘들다 졸리다...',
      id: 1,
    },
  ],
};

const NoteReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_MEMO:
      updateMemo(state.memo, action.memo);
      return {
        memo: [...state.memo],
      };
    case ADD_MEMO:
      return {
        memo: [action.memo, ...state.memo],
      };
    case REMOVE_MEMO:
      const idx = state.memo.findIndex((memo) => memo.id === action.memo.id);
      return {
        memo: [...state.memo.slice(0, idx), ...state.memo.slice(idx + 1)],
      };
    default:
      return state;
  }
};
const updateMemo = (state, memo) => {
  const idx = state.findIndex((n) => n.id === memo.id);
  state[idx] = memo;
};

export default NoteReducer;
