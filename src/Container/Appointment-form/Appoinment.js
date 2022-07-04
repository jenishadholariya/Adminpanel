import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { NavLink } from "react-router-dom";
import * as yup from 'yup';
import Box from '@mui/material/Box';
import { Formik, useFormik, Form } from 'formik';
import { display } from '@mui/system';

function Appoinment(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let schema = yup.object().shape({
        name: yup.string().required("Enter your name"),
        email: yup.number().required("enter your price").positive().integer(),
        location: yup.string().required("Enter you expiry date"),
        contactnumber: yup.string().required("Enter your equtity"),
        message: yup.string().required("Enter your message")
    });

    const formikobj = useFormik({
        initialValues: {
            name: '',
            price: '',
            expiry: '',
            equtity: '',
        },
        validationSchema: schema,
        onSubmit: values => {
            console.log(values);
            innerdata(values);
            alert(JSON.stringify(values, null, 2));
        },
    });

    const [handleChange, handlesubmit, handleBlur, errors, touched] = formikobj;
    return (
        <div>
            <h1>Appoinment-Form</h1>

            <Button variant="outlined" onClick={handleClickOpen}>
                Appoinment-Form
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Appoinment-Form</DialogTitle>
                <Formik values={formikobj}>
                    <From onSubmit={handlesubmit}>
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
                                    id="demo-helper-text-misaligned"
                                    label="name"
                                    fullWidth
                                />

                                <TextField
                                    id="demo-helper-text-misaligned"
                                    label="email"
                                    fullWidth
                                />

                                <TextField
                                    id="demo-helper-text-misaligned"
                                    label="location"
                                />

                                <TextField
                                    id="demo-helper-text-misaligned"
                                    label="contactnumber"
                                />

                                <TextField
                                    id="demo-helper-text-misaligned"
                                    label="message"
                                    fullWidth
                                />

                            </Box>
                            <DialogActions>
                                <Button >Cancel</Button>
                                <Button type="submit">Submit</Button>
                            </DialogActions>
                        </DialogContent>
                    </From>
                </Formik>
            </Dialog>
        </div>
    );
}

export default Appoinment;