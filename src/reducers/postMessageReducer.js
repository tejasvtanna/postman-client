import { ACTION_TYPES } from '../actions/postMessageActions'

const initialState = {
    list: [],
}

export const postMessageReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ACTION_TYPES.FETCH_ALL:
            return { ...state, list: [...payload] }

        case ACTION_TYPES.CREATE:
            return { ...state, list: [...state.list, payload] }

        case ACTION_TYPES.UPDATE:
            return {
                ...state,
                list: state.list.map((item) =>
                    item._id === payload._id ? payload : item
                ),
            }

        case ACTION_TYPES.DELETE:
            return {
                ...state,
                list: state.list.filter((item) => item._id !== payload),
            }

        default:
            return state
    }
}
