import React,{Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Produk extends Component {
  constructor() {
    super();
    this.state = {
      produk: [],
      id: "",
      kode_barang: "",
      nama_barang: "",
      jenis_barang: "",
      harga_barang: "",
      jumlah_barang: "",
      action: "",
      find: "",
      message: ""
    }

    // // jika tidak terdapat data token pada local storage
    // if(!localStorage.getItem("Token")){
    //   // direct ke halaman login
    //   window.location = "/login";
    // }
  }

    bind = (event) => {
      this.setState({[event.target.name] : event.target.value});
    }

    Add = () => {
      // membuka modal
      $("#modal_produk").modal("show");
      // mengosongkan data pada form
      this.setState({
        action: "insert",
        kode_barang: "",
        nama_barang: "",
        jenis_barang: "",
        harga_barang: "",
        jumlah_barang: "",
      });
    }

    Edit = (item) => {
      // membuka modal
      $("#modal_produk").modal("show");
      // mengisikan data pada form
      this.setState({
        action: "update",
        kode_barang: item.kode_barang,
        nama_barang: item.nama_barang,
        jenis_barang: item.jenis_barang,
        harga_barang: item.harga_barang,
        jumlah_barang: item.jumlah_barang,
      });
    }

    get_produk = () => {
      $("#loading").toast("show");
      let url = "http://localhost:8000/produk";
      axios.get(url)
      .then(response => {
        this.setState({produk: response.data.produk});
        $("#loading").toast("hide");
      })
      .catch(error => {
        console.log(error);
      });
    }

    Drop = (id) => {
      if(window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
        $("#loading").toast("show");
        let url = "http://localhost:8000/produk/drop/"+id;
        axios.delete(url)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({message: response.data.message});
          $("#message").toast("show");
          this.get_produk();
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    componentDidMount = () => {
      this.get_produk();
      // this.get_pelanggaran_siswa();
      // this.get_pelanggaran();
    }

    Save = (event) => {
      event.preventDefault();
      // menampilkan proses loading
      $("#loading").toast("show");
      // menutup form modal
      $("#modal_produk").modal("hide");
      let url = "http://localhost:8000/siswa/save";
      let form = new FormData();
      form.append("action", this.state.action);
      form.append("kode_barang", this.state.kode_barang);
      form.append("nama_barang", this.state.nama_barang);
      form.append("jenis_barang", this.state.jenis_barang);
      form.append("harga_barang", this.state.harga_barang);
      form.append("jumlah_barang", this.state.jumlah_barang);
      axios.post(url, form)
      .then(response => {
        $("#loading").toast("hide");
        this.setState({message: response.data.message});
        $("#message").toast("show");
        this.get_produk();
      })
      .catch(error => {
        console.log(error);
      });
    }

    search = (event) => {
      if(event.keyCode === 13) {
        $("#loading").toast("show");
        let url = "http://localhost:8000/siswa";
        let form = new FormData();
        form.append("find", this.state.find);
        axios.post(url, form)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({Produk: response.data.Produk});
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    render(){
      return(
        <div className="container">
          <div className="card mt-2">
            {/* header card */}
            <div className="card-header bg-success">
              <div className="row">
                <div className="col-sm-8">
                  <h4 className="text-white">Data Produk</h4>
                </div>
                <div className="col-sm-4">
                  <input type="text" className="form-control" name="find"
                    onChange={this.bind} value={this.state.find} onKeyUp={this.search}
                    placeholder="Pencarian..." />
                </div>
              </div>

            </div>
            {/* content card */}
            <div className="card-body">
              <Toast id="message" autohide="true" title="Informasi">
                {this.state.message}
              </Toast>
              <Toast id="loading" autohide="false" title="Informasi">
                <span className="fa fa-spin fa-spinner"></span> Sedang Memuat
              </Toast>
              <table className="table">
                <thead>
                  <tr>
                    <th>Kode</th>
                    <th>Nama</th>
                    <th>Jenis</th>
                    <th>Harga</th>
                    <th>Jumlah</th>
                    <th>Option</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.produk.map((item) => {
                    return(
                      <tr key={item.id}>
                        <td>{item.kode_barang}</td>
                        <td>{item.nama_barang}</td>
                        <td>{item.jenis_barang}</td>
                        <td>{item.harga_barang}</td>
                        <td><div class="badge badge-warning">{item.jumlah_barang}</div></td>
                        <td>
                          <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>
                            <span className="fa fa-edit"></span>
                          </button>
                          <button className="m-1 btn btn-sm btn-danger"
                            onClick={() => this.Drop(item.id)}>
                            <span className="fa fa-trash"></span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* tombol tambah */}
              <button className="btn btn-success my-2" onClick={this.Add}>
                <span className="fa fa-plus"></span> Tambah Data
              </button>

              {/* form modal siswa*/}
              <Modal id="modal_siswa" title="Form Siswa" bg_header="dark" text_header="white">
                <form onSubmit={this.Save}>
                  Kode Barang
                  <input type="text" className="form-control" name="kode_barang" 
                    value={this.state.kode_barang} onChange={this.bind} required />
                  Nama Barang
                  <input type="text" className="form-control" name="nama_barang"
                    value={this.state.nama_barang} onChange={this.bind} required />
                  Jenis Barang
                  <input type="text" className="form-control" name="jenis_barang"
                    value={this.state.jenis_barang} onChange={this.bind} required />
                  Jumlah Barang
                  <input type="number" className="form-control" name="jumlah_barang" 
                    value={this.state.jumlah_barang} onChange={this.bind} required />
                  <button type="submit" className="btn btn-info pull-right m-2">
                    <span className="fa fa-check"></span> Simpan
                  </button>
                </form>
              </Modal>
            </div>
          </div>


        </div>
      );
    }



}
export default Produk;
