import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import '../admin/AdminSidebar.css';
import {
  IoPeopleOutline,
  IoCopyOutline,
  IoCartOutline,
  IoPricetagsOutline,
  IoLogOutOutline,
  IoOptionsOutline,
  IoTicketOutline,
  IoLockClosedOutline,
  IoPodiumOutline
} from 'react-icons/io5';
import axios from 'axios';

const AdminSidebar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(prevState => !prevState); // Asegúrate de que este estado cambia correctamente
  };

  const handleLogout = async (event) => {
    event.preventDefault();  // Evita la navegación por defecto del NavLink

    try {
      const response = await axios.post('http://localhost:5000/users/logout', {
        remember_token: user.remember_token,
      });
      if (response.status === 200) {
        const confirmLogout = window.confirm('¿Seguro quieres cerrar la sesión?');
        if (confirmLogout) {
          setUser(null);
          alert('Sesión cerrada exitosamente');
          navigate('/login');
        }
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert('Hubo un error al cerrar sesión');
    }
  };

  return (
    <div className={`admin-sidebar ${isExpanded ? 'expanded' : ''}`}>
      <button className="expand-button" onClick={toggleSidebar}>
        {isExpanded ? '<<' : '>>'}
      </button>
      <br />
      <br />
      <ul className="mt-6">
        <li className="li-sidebar">
          <NavLink to="/admin/" className={({ isActive }) => (isActive ? 'active' : '')}>
            <IoPodiumOutline className="icon" />
            <span className="ml-4">Dash</span>
          </NavLink>
        </li>
        <li className="li-sidebar">
          <NavLink to="/admin/usuarios/listado" className={({ isActive }) => (isActive ? 'active' : '')}>
            <IoPeopleOutline className="icon" />
            <span className="ml-4">Creadores</span>
          </NavLink>
        </li>
        <li className="li-sidebar">
          <NavLink to="/admin/productos/listado" className={({ isActive }) => (isActive ? 'active' : '')}>
            <IoCopyOutline className="icon" />
            <span className="ml-4">Catálogo</span>
          </NavLink>
        </li>
        <li className="li-sidebar">
          <NavLink to="/admin/compras/listado" className={({ isActive }) => (isActive ? 'active' : '')}>
            <IoCartOutline className="icon" />
            <span className="ml-4">Compras</span>
          </NavLink>
        </li>
        <li className="li-sidebar">
          <NavLink to="/admin/permisos/listado" className={({ isActive }) => (isActive ? 'active' : '')}>
            <IoLockClosedOutline className="icon" />
            <span className="ml-4">Permisos</span>
          </NavLink>
        </li>
        <li className="li-sidebar">
          <NavLink to="/admin/roles/listado" className={({ isActive }) => (isActive ? 'active' : '')}>
            <IoOptionsOutline className="icon" />
            <span className="ml-4">Roles</span>
          </NavLink>
        </li>
        <li className="li-sidebar">
          <NavLink to="/admin/cupones/listado" className={({ isActive }) => (isActive ? 'active' : '')}>
            <IoTicketOutline className="icon" />
            <span className="ml-4">Cupones</span>
          </NavLink>
        </li>
        <li className="li-sidebar">
          <NavLink to="/admin/ofertas/listado" className={({ isActive }) => (isActive ? 'active' : '')}>
            <IoPricetagsOutline className="icon" />
            <span className="ml-4">Ofertas</span>
          </NavLink>
        </li>
        <li className="li-sidebar">
          <NavLink to="/admin/logout" onClick={handleLogout} className="logout-link">
            <IoLogOutOutline className="icon" />
            <span className="ml-4">Cerrar sesión</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
