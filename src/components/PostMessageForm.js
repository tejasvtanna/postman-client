import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles, TextField, Button } from '@material-ui/core'
import useForm from './useForm'
import * as actions from '../actions/postMessageActions'
import ButterToast, { Cinnamon } from 'butter-toast'
import { AssignmentTurnedIn } from '@material-ui/icons'

const PostMessageForm = (props) => {
    const dispatch = useDispatch()
    const postMessageList = useSelector((state) => state.postMessages.list)

    const initialFieldValues = {
        title: '',
        message: '',
    }
    const {
        values,
        setValues,
        handleInputChange,
        errors,
        setErrors,
        resetForm,
    } = useForm(initialFieldValues, props.setCurrentID)

    useEffect(() => {
        if (props.currentID !== 0) {
            setValues({
                ...postMessageList.find((item) => item._id === props.currentID),
            })
            setErrors({})
        }
    }, [props.currentID])

    const validate = () => {
        let temp = { ...errors }
        temp.title = values.title ? '' : 'This field is required'
        temp.message = values.message ? '' : 'This field is required'
        setErrors({ ...temp })
        return Object.values(temp).every((x) => x === '')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const onSuccess = () => {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title='Post Box'
                        content={
                            props.currentID === 0
                                ? 'Submitted successfully'
                                : 'Edited successfully'
                        }
                        scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                        icon={<AssignmentTurnedIn />}
                    ></Cinnamon.Crisp>
                ),
            })
        }
        if (validate()) {
            if (props.currentID === 0)
                dispatch(actions.create(values, onSuccess))
            else {
                dispatch(actions.update(props.currentID, values, onSuccess))
            }
            resetForm()
        }
    }

    return (
        <div>
            {/* {values.title} : {values.message} */}
            <form
                autoComplete='off'
                noValidate
                className={`${classes.root} ${classes.form}`}
                onSubmit={handleSubmit}
            >
                <TextField
                    name='title'
                    label='Title'
                    variant='outlined'
                    fullWidth
                    value={values.title}
                    onChange={handleInputChange}
                    {...(errors.title && {
                        error: true,
                        helperText: errors.title,
                    })}
                />
                <TextField
                    name='message'
                    label='Message'
                    variant='outlined'
                    fullWidth
                    multiline
                    rows={4}
                    value={values.message}
                    onChange={handleInputChange}
                    {...(errors.message && {
                        error: true,
                        helperText: errors.title,
                    })}
                />
                <Button
                    className={classes.postBtn}
                    variant='contained'
                    color='primary'
                    size='large'
                    type='submit'
                >
                    Submit
                </Button>
            </form>
        </div>
    )
}

const classes = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    postBtn: {
        width: '50%',
    },
}))

export default PostMessageForm
