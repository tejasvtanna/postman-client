import api from './api.js'

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL',
}

export const fetchAll = () => (dispatch) => {
    api.postMessage()
        .fetchAll()
        .then((res) => {
            // console.log(res)
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: res.data,
            })
        })
        .catch((err) => console.log(err))
}

export const create = (newRecord, onSuccess) => (dispatch) => {
    api.postMessage()
        .create(newRecord)
        .then((res) => {
            // console.log(res)
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data,
            })
            onSuccess()
        })
        .catch((err) => console.log(err))
}

export const update = (id, record, onSuccess) => (dispatch) => {
    api.postMessage()
        .update(id, record)
        .then((res) => {
            // console.log(res)
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: res.data,
            })
            onSuccess()
        })
        .catch((err) => console.log(err))
}

export const remove = (id, onSuccess) => (dispatch) => {
    api.postMessage()
        .remove(id)
        .then((res) => {
            // console.log(res)
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id,
            })
            onSuccess()
        })
        .catch((err) => console.log(err))
}
