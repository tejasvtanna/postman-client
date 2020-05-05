import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../actions/postMessageActions'
import PostMessageForm from './PostMessageForm'
import {
    Grid,
    Typography,
    Paper,
    makeStyles,
    List,
    ListItem,
    ListItemText,
    Divider,
    Button,
} from '@material-ui/core'
import ButterToast, { Cinnamon } from 'butter-toast'
import { DeleteSweep } from '@material-ui/icons'

const PostMessages = () => {
    const [currentID, setCurrentID] = useState(0)
    const dispatch = useDispatch()
    const postMessages = useSelector((state) => state.postMessages.list)

    useEffect(() => {
        console.log('useEffect')
        dispatch(actions.fetchAll())
    }, [])

    const onDelete = (id) => {
        const onSuccess = () => {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title='Post Box'
                        content='Deleted successfully'
                        scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                        icon={<DeleteSweep />}
                    ></Cinnamon.Crisp>
                ),
            })
        }

        if (window.confirm('Are you sure?'))
            dispatch(actions.remove(id, onSuccess))
    }

    return (
        <Grid container>
            <Grid item xs={5}>
                <Paper className={classes.paper}>
                    <PostMessageForm {...{ currentID, setCurrentID }} />
                </Paper>
            </Grid>
            <Grid item xs={7}>
                <Paper className={classes.paper}>
                    <List>
                        {postMessages.map((item) => (
                            <React.Fragment key={item._id}>
                                <ListItem>
                                    <ListItemText>
                                        <Typography variant='h5'>
                                            {item.title}
                                        </Typography>
                                        <div>{item.message}</div>
                                        <div className={classes.actionDiv}>
                                            <Button
                                                className={classes.smMargin}
                                                variant='contained'
                                                color='primary'
                                                size='small'
                                                onClick={() =>
                                                    setCurrentID(item._id)
                                                }
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                className={classes.smMargin}
                                                variant='contained'
                                                color='secondary'
                                                size='small'
                                                onClick={() =>
                                                    onDelete(item._id)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </ListItemText>
                                </ListItem>
                                <Divider light />
                            </React.Fragment>
                        ))}
                    </List>
                </Paper>
            </Grid>
        </Grid>
    )
}

const classes = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(3),
        padding: theme.spacing(2),
    },
    smMargin: {
        margin: theme.spacing(1),
    },
    actionDiv: {
        textAlign: 'center',
    },
}))

export default PostMessages
