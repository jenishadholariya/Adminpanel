import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

function Listappointment(props) {

    const [data, setData] = useState([]);

    const history=useHistory();

    const getData = (id) => {
        let localData = JSON.parse(localStorage.getItem("apt"));

        setData(localData);
        // console.log(LocalData);
    }

    useEffect(() => {
        getData();
    }, []);

    const handleDelete = (id) => {
        let localData = JSON.parse(localStorage.getItem("apt"));

        let fData = localData.filter((d) => d.id !== id);

        localStorage.setItem("apt",JSON.stringify(fData));

        getData();

        console.log(fData);
    }

    const handleEdit=(id)=>{
       
        // let localData = JSON.parse(localStorage.getItem("apt"));

        history.push("/Bookappointment" ,{id:id});

        console.log(id);
    }

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
                        {
                            data.map((d, i) => {
                                return (
                                    <Card key={i}>
                                        <CardBody>
                                            <CardTitle tag="h5">
                                                {d.name}
                                            </CardTitle>
                                            <CardSubtitle
                                                className="mb-2 text-muted"
                                                tag="h6"
                                            >
                                                {d.email}
                                            </CardSubtitle>
                                            <Button onClick={()=>handleEdit(d.id)}>
                                                Edit
                                            </Button>
                                            <Button onClick={() => handleDelete(d.id)}>
                                                Delete
                                            </Button>
                                        </CardBody>
                                    </Card>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Listappointment;