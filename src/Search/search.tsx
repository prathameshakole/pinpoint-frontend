import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Routes, Route, Navigate } from "react-router";
import { useState } from 'react';
import CreatePost from '../Post/Create';

const Search = () => {
  const { pathname } = useLocation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const user = useSelector((state: any) => state.userReducer.user);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  return (
    <div></div>
  );
};
export default Search;
