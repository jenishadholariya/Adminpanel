import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Formik, useFormik, Form } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { AddDoctor, GetDoctor } from '../../Redux/Action/Doctor.Action';
import { useDispatch, useSelector } from 'react-redux';

function Doctor(props) {

    const [open, setOpen] = React.useState(false);
    const [dopen, setDOpen] = React.useState(false);
    const [update, setUpdate] = useState(false);
    const [did, setDid] = useState(0);
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);

    const handleDClickOpen = () => {
        setDOpen(true);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDOpen(false);
        setUpdate(false)
    };

    const handleEdit = (params) => {
        handleClickOpen()

        setUpdate(true)

        formikobj.setValues(params.row)
    }

    let schema = yup.object().shape({
        name: yup.string().required("Enter your name"),
        department: yup.string().required("enter your departmrnt"),
        designation: yup.string().required("Enter your degignation"),
        salary: yup.string().required("Enter your salary")
    });

    const innerdata = (values) => {

        // let LocalData = JSON.parse(localStorage.getItem("Doctor"));

        let id = Math.floor(Math.random() * 1000);

        let data = {
            id: id,
            ...values
        }

        // if (LocalData === null) {
        //     localStorage.setItem("Doctor", JSON.stringify([data]));
        // } else {
        //     LocalData.push(data);
        //     localStorage.setItem("Doctor", JSON.stringify(LocalData));
        // }

        dispatch(AddDoctor(data))

        LoadData();
        formikobj.resetForm();
        handleClose()

    }

    const handleUpdate = (values) => {
        let localData = JSON.parse(localStorage.getItem("Doctor"));

        let UData = localData.map((d) => {
            if (d.id === values.id) {
                return values
            } else {
                return d;
            }
        })

        localStorage.setItem("Doctor", JSON.stringify(UData));

        LoadData();
        formikobj.resetForm();
        handleClose();
    }

    const formikobj = useFormik({
        initialValues: {
            name: '',
            department: '',
            designation: '',
            salary: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            {
                if (update) {
                    handleUpdate(values);
                } else {
                    innerdata(values);
                }
            }
        },
    });

    const handleDelete = () => {
        console.log(data);
        let LocalData = JSON.parse(localStorage.getItem("Doctor"));
        let fData = LocalData.filter((l) => l.id !== did);
        localStorage.setItem("Doctor", JSON.stringify(fData))
        LoadData();
        handleClose();
    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 170 },
        { field: 'department', headerName: 'department', width: 170 },
        { field: 'designation', headerName: 'designation', width: 170 },
        { field: 'salary', headerName: 'salary', width: 170 },
        {
            field: 'action',
            headerName: 'Action',
            width: 170,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => handleEdit(params)}>
                        <EditIcon
                        />
                    </IconButton>

                    <IconButton aria-label="delete" onClick={() => { handleDClickOpen(); setDid(params.id) }}>
                        <DeleteIcon
                        />
                    </IconButton>
                </>
            )
        },
    ];

    useEffect(() => {

        // LoadData();
        dispatch(GetDoctor())

    }, []);

    const dispatch = useDispatch();

    const d = useSelector(state => state.doctor)

    const LoadData = () => {
        let LocalData = JSON.parse(localStorage.getItem("Doctor"))

        if (LocalData !== null) {
            setData(LocalData)
        }
    }

    const handleSearch = (val) => {

        let localData = JSON.parse(localStorage.getItem("Doctor"));

        let fData = localData.filter((d) => (
            d.name.toLowerCase().includes(val.toLowerCase()) ||
            d.department.toString().includes(val) ||
            d.designation.toString().includes(val) ||
            d.salary.toString().includes(val)
        ));

        setFilterData(fData);
    }

    let finalData = filterData.length > 0 ? filterData : data

    const { handleChange, handleSubmit, handleBlur, errors, touched, values } = formikobj;


    return (
        <div>
            <h1>
                Doctor Details
            </h1>
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Doctor Details
                </Button>
                <TextField
                    margin="dense"
                    name="search"
                    label="Doctor search"
                    type="search"
                    fullWidth
                    variant="standard"
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={d.Doctor}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>
                <Dialog
                    open={dopen}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Are you sure delete?"}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose}>No</Button>
                        <Button onClick={handleDelete} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={open} onClose={handleClose} fullWidth>
                    <DialogTitle>Doctor Details</DialogTitle>

                    <Formik values={formikobj}>
                        <Form onSubmit={handleSubmit}>
                            <DialogContent>
                                <TextField
                                    value={values.name}
                                    margin="dense"
                                    name="name"
                                    label="Doctor Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.name && touched.name ? <p>errors.name</p> : ''}
                                <TextField
                                    margin="dense"
                                    value={values.department}
                                    name="department"
                                    label="Doctor department"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.department && touched.department ? <p>errors.department</p> : ''}
                                <TextField
                                    value={values.equtity}
                                    margin="dense"
                                    name="designation"
                                    label="Doctor designation"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.designation && touched.designation ? <p>errors.designation</p> : ''}

                                <TextField
                                    value={values.equtity}
                                    margin="dense"
                                    name="salary"
                                    label="Doctor salary"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.salary && touched.salary ? <p>errors.salary</p> : ''}

                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    {
                                        update ?
                                            <Button type="submit">update</Button>
                                            :
                                            <Button type="submit">Submit</Button>
                                    }

                                </DialogActions>
                            </DialogContent>

                        </Form>
                    </Formik>

                </Dialog>
            </div>
        </div>
    );
}

export default Doctor;