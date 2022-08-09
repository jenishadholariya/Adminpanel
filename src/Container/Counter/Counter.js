import { useSelect } from '@mui/base';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Decrement, Increment } from '../../Redux/Action/Counter.Action';

function Counter(props) {
    const dispatch = useDispatch()
    const c =useSelector(state=>state.counter);

    const handleIncrement=()=>{
        dispatch(Increment());
    }

    const handleDecrement=()=>{
        dispatch(Decrement());
    }

    return (
        <div>
            <button onClick={()=>handleIncrement()}>+</button>
            {c.counter}
            <button onClick={()=>handleDecrement()}>-</button>
        </div>
    );
}

export default Counter;