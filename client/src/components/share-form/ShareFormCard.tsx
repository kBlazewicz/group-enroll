import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Grid, Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { FileCopyOutlined as FileCopyIcon, CheckCircleOutlineOutlined as CheckCircleIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { fetchFormLink } from '../../api/api-utils';

const useStyles = makeStyles(theme => ({
    success: {
        backgroundColor: theme.palette.success.main,
    },
    snackbarContent: {
        display: 'flex',
        alignItems: 'center',
        width: '40%',
    },
    snackbarMessage: {
        marginLeft: theme.spacing(1),
        flexGrow: 1,
    },
}));

export const ShareFormCard = () => {
    const classes = useStyles();
    const [formLink, setFormLink] = useState('');
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const link = await fetchFormLink();
            setFormLink(link);
        };
        fetchData();
    }, []);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(formLink);
        setIsSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setIsSnackbarOpen(false);
    };

    return (
        <Card>
            <CardContent>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h3" align="center">
                            Podziel się swoją ankietą
                        </Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField fullWidth variant="outlined" value={formLink} />
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            startIcon={<FileCopyIcon />}
                            onClick={handleCopyLink}
                        >
                            Skopiuj
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <SnackbarContent
                    className={classes.success}
                    message={
                        <div className={classes.snackbarContent}>
                            <CheckCircleIcon />
                            <Typography variant="body2" className={classes.snackbarMessage}>
                                Skopiowano do schowka
                            </Typography>
                        </div>
                    }
                    action={
                        <IconButton size="small" color="inherit" onClick={handleSnackbarClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                />
            </Snackbar>
        </Card>
    );
};
