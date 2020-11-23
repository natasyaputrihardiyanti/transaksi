import React, {Component} from 'react';
import {Link} from "react-router-dom";
class Navbar extends Component {
  // Logout = () => {
  //   localStorage.removeItem("Token");
  //   window.location = "/login"
  // }
  render() {
    return (
      <div className="navbar navbar-expand-lg bg-success navbar-dark">
        <button type="button" className="navbar-toggler navbar-toggler-right"
          data-toggle="collapse" data-target="#menu">
          <span className="navbar navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="menu">
          <ul className="navbar-nav">

            <li className="navbar-item">
              <Link className="nav-link" to="/siswa">Siswa</Link>
            </li>
            <li className="navbar-item">
              <Link className="nav-link" to="/pelanggaran">Data Pelanggaran</Link>
            </li>
            <li className="navbar-item">
              <Link className="nav-link" to="/user">Data User</Link>
            </li>
            <li className="navbar-item">
              <Link className="nav-link" to="/pelanggaran_siswa">Data Pelanggaran Siswa</Link>
            </li>
            <li className="navbar-item">
              <a className="nav-link" onClick={this.Logout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default Navbar;
