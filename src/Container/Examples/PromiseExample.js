import React, { useEffect } from 'react';

function PromiseExample(props) {

    const one = () => {
        return "One"
    }

    const two = () => {

        // promise with

        const p = new Promise((resolve, reject) => {
            setTimeout(() =>{
                resolve ("Two");
                },2000)
        })

        // promise without
        // setTimeout(() =>{
        //     return "Two"
        // },2000)
        
    }

    const three = () => {
        return "Three"
    }

    const All = () => {
        let oneAns = one();
        console.log(oneAns);

        let twoAns = two();
        console.log(twoAns);

        let threeAns = three();
        console.log(threeAns);
    }

    useEffect(() => {
        All();
    }, []);

    //promise All

    const e1 = "jeni";
    const e2 = 122;
    const e3 = new Promise((resolve,reject) =>{
        setTimeout(() =>{
            resolve ("Three");
            },2000)  
    })

    Promise.all([e1,e2,e3]).then((values) =>{
        console.log(values);
    })

    const pr = (c) => {
        console.log(c);
    }

    const sum = (a,b,callbackfun) => {
        let sum=0;
        sum=a+b;
        callbackfun(sum);
    }

    sum(10,20,pr)
    
    return (
        <div>

        </div>
    );
}

export default PromiseExample;