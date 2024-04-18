import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import * as client from '../User/client'
import { resetUser } from '../User/reducer'

const Following = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <>
        </>
    );
};
export default Following;
