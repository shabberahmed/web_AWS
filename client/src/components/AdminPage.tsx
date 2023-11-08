import React from 'react';
import BJPLogo from './BJP.gif';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const navigate = useNavigate();

    function gotoUserLogin() {
        navigate('/user/signup');
    }

    const goToList = async () => {
        navigate('/list');
    };

    const goToallKaryakartha = () => {
        navigate('/all');
    };

    const logout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div className="container min-vh-100 d-flex flex-column align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, orange, lemonchiffon)' }}>
              <img src={BJPLogo} alt="BJP Logo" style={{ width: '200px', height: 'auto', marginBottom: '20px' }} />
            <button className="btn btn-danger fw-bold mb-4" onClick={logout}>
                Logout
            </button>
            <div className="d-grid gap-3 mt-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                <div className="card bg-info d-flex align-items-center justify-content-center cursor-pointer" style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} onClick={gotoUserLogin}>
                    <span className="fs-5 fw-bold text-dark text-center">Add Karyakartha</span>
                </div>
                <div className="card bg-info d-flex align-items-center justify-content-center cursor-pointer" style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} onClick={goToallKaryakartha}>
                    <span className="fs-5 fw-bold text-dark text-center">List of Karyakartha</span>
                </div>
                <div className="card bg-info d-flex align-items-center justify-content-center cursor-pointer" style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} onClick={goToList}>
                    <span className="fs-5 fw-bold text-dark text-center">Forms submitted by Karyakartha</span>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
