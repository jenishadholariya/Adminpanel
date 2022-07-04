import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { NavLink } from "react-router-dom";
import Box from '@mui/material/Box';
import { display } from '@mui/system';

function Appoinment(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <h1>Appoinment-Form</h1>

            <Button variant="outlined" onClick={handleClickOpen}>
                Appoinment-Form
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Appoinment-Form</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter your details and submit your document.
                    </DialogContentText>
                    <Box fullWidth
                        sx={{
                            alignItems: 'center',
                            '& > :not(style)': { m: 1 },
                        }}
                    >
                        <TextField
                            helperText="Please enter your name"
                            id="demo-helper-text-misaligned"
                            label="Name"
                            fullWidth
                        />

                        <TextField
                            helperText="Please enter your email"
                            id="demo-helper-text-misaligned"
                            label="email"
                            fullWidth
                        />

                        <TextField
                            helperText="Please enter your location"
                            id="demo-helper-text-misaligned"
                            label="location"
                        // fullWidth
                        />

                        <TextField
                            helperText="Please enter your contact number"
                            id="demo-helper-text-misaligned"
                            label="contact number"
                        // fullWidth
                        />

                        <TextField
                            helperText="Please enter your message"
                            id="demo-helper-text-misaligned"
                            label="message"
                            fullWidth
                        />

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Appoinment;