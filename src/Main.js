import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

import Navbar from "./component/Navbar";

import Siswa from "./page/Siswa";
import Produk from "./page/Produk";
import Pelanggaran from "./page/Pelanggaran";
import User from "./page/User";
import PelanggaranSiswa from "./page/PelanggaranSiswa";
import Login from "./page/Login";

class Main extends Component{
    render = () => {
        return(
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/siswa">
                    <Navbar />
                    <Siswa />
                </Route>
                <Route path="/produk">
                    <Navbar />
                    <Produk />
                </Route>
            </Switch>
        );
    }
}

export default Main;
