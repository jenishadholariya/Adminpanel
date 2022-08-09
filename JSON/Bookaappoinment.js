import React, { useState,useEffect } from 'react';
import * as yup from 'yup';
import { Formik, useFormik, Form } from 'formik';
import { NavLink, useHistory } from 'react-router-dom';

function Bookappointment(props) {

    const history = useHistory();
    const [update,setUpdate] =useState(false);

    let schema = yup.object().shape({
        name: yup.string().required("Enter your name"),
        phone: yup.number().required().positive().integer(),
        email: yup.string().email().required("Enter your email"),
        message: yup.string().required("Enter your message"),
        department: yup.string().required("select your Department"),
        date: yup.date().required("Enter Appointment date"),
    });

    const handleInsert = (values) => {

        let localData = JSON.parse(localStorage.getItem("apt"));

        let id=Math.floor(Math.random()*1000);

        let data={
            id:id,
            ...values
        }


        if(localData === null){
            localStorage.setItem("apt",JSON.stringify([data]));
        }
        else{
            localData.push(data);
            localStorage.setItem("apt",JSON.stringify(localData));
        }

        history.push("/Listappointment");
        console.log(localData);
    }

    const handleUpadate=(values)=>{

        let localData=JSON.parse(localStorage.getItem("apt"));

        let uData=localData.map((d)=>{
            if(d.id === values.id){
                return values;
            }else{
                return d;
            }
        })

        localStorage.setItem("apt",JSON.stringify(uData));

        history.replace();
        setUpdate(false);
        formik.resetForm();
        history.push('/Listappointment')

    }

    useEffect(() => {

        let localData=JSON.parse(localStorage.getItem("apt"));

        if(props.location.state && localData !== null){
            let fData=localData.filter((d)=>d.id === props.location.state.id);

            formik.setValues(fData[0]);

            setUpdate(true);
        }
        
    }, []);

    // history.push("/Listappointment");

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            message: '',
            department: '',
            date: ''
        },

        validationSchema: schema,

        onSubmit: values => {

            if(update){
                handleUpadate(values);
            }else{
                handleInsert(values);
            }
            
        },

    });

    const { handleChange, errors, handleSubmit, handleBlur, touched ,values} = formik;

    return (
        <main id="main">
            <section id="appointment" className="appointment">
                <div className="container">
                    <div className="section-title">
                        <h2>Make an Appointment</h2>
                        <div className='row'>
                            <div className='col-6' >
                                <NavLink to={"/Bookappointment"}>Bookappointment</NavLink>
                            </div>
                            <div className='col-6'>
                                <NavLink to={"/Listappointment"}>Listappointment</NavLink>
                            </div>
                        </div>
                    </div>
                    <Formik values={formik}>
                        <Form className="php-email-form" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-4 form-group">
                                    <input 
                                    type="text" 
                                    name="name" 
                                    value={values.name}
                                    className="form-control" 
                                    id="name" placeholder="Your Name" 
                                    data-rule="minlen:4" data-msg="Please enter at least 4 chars" 
                                    onChange={handleChange} 
                                    onBlur={handleBlur} 
                                    />
                                    <p className="text-danger">
                                        {errors.name && touched.name ? errors.name : ''}
                                        </p>
                                    <div className="validate" />
                                </div>
                                <div className="col-md-4 form-group mt-3 mt-md-0">
                                    <input 
                                    type="email" 
                                    className="form-control" 
                                    name="email" 
                                    value={values.email}
                                    id="email" 
                                    placeholder="Your Email" 
                                    data-rule="email" 
                                    data-msg="Please enter a valid email" 
                                    onChange={handleChange} 
                                    onBlur={handleBlur} 
                                    />
                                    <p className="text-danger">
                                        {errors.email && touched.email ? errors.email : ''}
                                        </p>
                                    <div className="validate" />
                                </div>
                                <div className="col-md-4 form-group mt-3 mt-md-0">
                                    <input 
                                    type="tel" 
                                    className="form-control" 
                                    name="phone" 
                                    id="phone" 
                                    value={values.phone}
                                    placeholder="Your Phone" 
                                    data-rule="minlen:4" 
                                    data-msg="Please enter at least 4 chars" 
                                    onChange={handleChange} 
                                    onBlur={handleBlur} 
                                    />
                                    <p className="text-danger">
                                        {errors.phone && touched.phone ? errors.phone : ''}
                                        </p>
                                    <div className="validate" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 form-group mt-3">
                                    <input 
                                    type="date" 
                                    name="date" 
                                    className="form-control datepicker" 
                                    id="date" 
                                    value={values.date}
                                    placeholder="Appointment Date" 
                                    data-rule="minlen:4" 
                                    data-msg="Please enter at least 4 chars"
                                    onChange={handleChange} 
                                    onBlur={handleBlur} 
                                    />
                                    <p className="text-danger">
                                        {errors.date && touched.date ? errors.date : ''}
                                    </p>
                                    <div className="validate" />
                                </div>
                                <div className="col-md-4 form-group mt-3 ">
                                    <select 
                                    name="department" 
                                    id="department" 
                                    className="form-select" 
                                    onChange={handleChange} 
                                    onBlur={handleBlur}>
                                        value={values.department}
                                        <option value>Select Department</option>
                                        <option value="Department 1">Department 1</option>
                                        <option value="Department 2">Department 2</option>
                                        <option value="Department 3">Department 3</option>
                                    </select>
                                    <p className="text-danger">{errors.department && touched.department ? errors.department : ''}</p>
                                    <div className="validate" />
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <textarea 
                                className="form-control" 
                                name="message" 
                                rows={5} 
                                value={values.message}
                                placeholder="Message (Optional)" 
                                defaultValue={""} 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                />
                                <p className="text-danger">{errors.message && touched.message ? errors.message : ''}</p>
                                <div className="validate" />
                            </div>
                            <div className="mb-3">
                                <div className="loading">Loading</div>
                                <div className="error-message" />
                                <div className="sent-message">Your appointment request has been sent successfully. Thank you!</div>
                            </div>
                            <div className="text-center">
                                {
                                    update ?
                                    <button type="submit">update an Appointment</button>
                                    :
                                    <button type="submit">Make an Appointment</button>
                                }
                                
                            </div>
                        </Form>
                    </Formik>
                </div>
            </section>
        </main>

    );
}

export default Bookappointment;