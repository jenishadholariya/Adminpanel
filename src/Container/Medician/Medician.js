import React, { useState } from 'react';
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
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { AddMedicine, DeleteMedicine, GetMedician, UpdateMedicine } from '../../Redux/Action/Medician.Action';
import { useDispatch, useSelector } from 'react-redux'
import { MedicianReducer } from '../../Redux/Reducer/Medician.Readucer';

function Medician(props) {

    const [open, setOpen] = React.useState(false);

    const [dopen, setDOpen] = React.useState(false);

    const [update, setUpdate] = useState(false);

    const [did, setDid] = useState(0);

    const [data, setData] = useState([]);

    const handleDClickOpen = () => {
        setDOpen(true);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDOpen(false);
    };

    const handleEdit = (params) => {
        handleClickOpen()

        setUpdate(true);

        formikobj.setValues(params.row)
    }

    let schema = yup.object().shape({
        name: yup.string().required("Enter your name"),
        price: yup.number().required("enter your price").positive().integer(),
        expiry: yup.string().required("Enter you expiry date"),
        equtity: yup.string().required("Enter your equtity")
    });

    const innerdata = (values) => {

        let LocalData = JSON.parse(localStorage.getItem("medician"));

        let id = Math.floor(Math.random() * 1000);

        console.log(LocalData, id);

        let data = {
            id: id,
            ...values
        }
        console.log(data);
        dispatch(AddMedicine(data));

        // if (LocalData === null) {
        //     localStorage.setItem("medician", JSON.stringify([data]));
        // } else {
        //     LocalData.push(data);
        //     localStorage.setItem("medician", JSON.stringify(LocalData));
        // }


        LoadData();
        formikobj.resetForm();
        handleClose()

    }
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
            if (update) {
                handleUpdate(values)
            } else {
                innerdata(values);
            }
        },
    });

    const handleDelete = () => {
        console.log(data);
        // let LocalData = JSON.parse(localStorage.getItem("medician"));
        // let fData = LocalData.filter((l) => l.id !== did);
        // localStorage.setItem("medician", JSON.stringify(fData))

        dispatch(DeleteMedicine(did))
        handleClose();
    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 170 },
        { field: 'price', headerName: 'Price', width: 170 },
        { field: 'expiry', headerName: 'Expiry', width: 170 },
        { field: 'equtity', headerName: 'Equtity', width: 170 },
        {
            field: 'action',
            headerName: 'Action',
            width: 170,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="update" onClick={() => handleEdit(params)}>
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
        dispatch(GetMedician());

    }, []);

    const handleUpdate = (values) => {
        // let localData=JSON.parse(localStorage.getItem("medician"));

        // let UData=localData.map((d)=>{
        //     if(d.id===values.id){
        //         return values
        //     }else{
        //         return d;
        //     }
        // })

        // localStorage.setItem("medician",JSON.stringify(UData));

        dispatch(UpdateMedicine(values));

        LoadData();
        formikobj.resetForm();
        handleClose();
    }

    const LoadData = () => {
        let LocalData = JSON.parse(localStorage.getItem("medician"))

        if (LocalData !== null) {
            setData(LocalData)
        }
    }

    const handlesearch = (val) => {
        let localData = localStorage.getItem("medician");

        console.log(localData);
    }
    const dispatch = useDispatch();

    const Medician = useSelector(state => state.medicines);

    // console.log(Medician);

    const { handleChange, handleSubmit, handleBlur, errors, touched, values } = formikobj;

    console.log(errors);

    return (
        <div>
            {
                Medician.isloading ?
                    <p>Loading....</p>
                    :
                    Medician.error !== '' ?
                        <p>{Medician.error}</p>
                        :
                        <div>

                            <h1>Medician</h1>
                            <Button variant="outlined" onClick={handleClickOpen}>
                                Medician Data
                            </Button>
                            <TextField
                                value={values.name}
                                margin="dense"
                                name="search"
                                label="Medician serach"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={(e) => handlesearch(e.target.val)}
                            />
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={Medician.medicines}
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
                                <DialogTitle>Medician Details</DialogTitle>

                                <Formik values={formikobj}>
                                    <Form onSubmit={handleSubmit}>
                                        <DialogContent>
                                            <TextField
                                                value={values.name}
                                                margin="dense"
                                                name="name"
                                                label="Medician Name"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.name && touched.name ? <p>errors.name</p> : ''}
                                            <TextField
                                                margin="dense"
                                                value={values.price}
                                                name="price"
                                                label="price"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.price && touched.price ? <p>errors.price</p> : ''}
                                            <TextField
                                                value={values.expiry}
                                                margin="dense"
                                                name="expiry"
                                                label="expiry"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.expiry && touched.expiry ? <p>errors.expiry</p> : ''}
                                            <TextField
                                                value={values.equtity}
                                                margin="dense"
                                                name="equtity"
                                                label="equtity"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.equtity && touched.equtity ? <p>errors.equtity</p> : ''}

                                            <DialogActions>
                                                <Button onClick={handleClose}>Cancel</Button>

                                                {
                                                    update ?
                                                        <Button type='submit'>update</Button>
                                                        :
                                                        <Button type='submit'>submit</Button>
                                                }

                                            </DialogActions>
                                        </DialogContent>

                                    </Form>
                                </Formik>

                            </Dialog>
                        </div>

            }

        </div>
    );
}

export default Medician;