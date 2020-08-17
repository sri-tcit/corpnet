import React, { Component } from "react";
import { getAnimationType } from "react-scroll/modules/mixins/animate-scroll";
import axios from 'axios';
class category extends Component {
    constructor(props) {
        super(props);

        this.props.history.listen((location, action) => {
            this.getCategoryList(location.pathname)
        });

        this.state = {

            baseUrl: "http://148.72.206.209:93/api/",
            result: [],
            loader : false,
            
        }
        this.hasFileOrDir = this.hasFileOrDir.bind(this)
    }
    //  this.showPanel = this.showPanel.bind(this);

    makeFavorite(id, e) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        //console.log("Make Favourute" + id)
    }
    getFileLists(data) {

    }

    getDirLists(data) {

    }

    showPanel(index, level) {
        this.setState(prevState => {
            let result = prevState.result;

            for (var i = 0; i < result.length; i++) {
                if (result[i].ID == index) {
                    result[i].show = !result[i].show;
                } else {
                    result[i].show = false;
                }
            }
            //console.log(result)
            return { result };

        })
    }

    hasFileOrDir(data) {

        if (data) {
            return data.map((data, key) => {
                return <li key={key} className={"list_acc" + (data.show == true ? '' : ' hide')}>

                    <a style={{ cursor: 'pointer' }} data-toggle="collapse" data-target={"#inner_comp_" + data.id} className={!data.show ? 'collapsed' : ''} aria-expanded={data.show ? 'true' : 'false'}>
                        <span onClick={() => this.showSubTree(data.ID)} >
                            <i className="iconsminds-folder"></i>
                            {data.DirName &&
                                <span className="d-inline-block">{data.DirName != '' ? data.DirName.replace("&amp;", "&") : ''} </span>
                            } </span>
                        {data.ShowFavourite &&

                            <i onClick={(e) => this.makeFavorite(data.ID, e)} data-brackets-id="15856" className="simple-icon-star show-on-hover"></i>
                        }
                        {!data.ShowFavourite &&

                            <i onClick={(e) => this.makeFavorite(data.ID, e)} data-brackets-id="15856" className="simple-icon-star show-on-hover"></i>
                        }

                    </a>

                    <span id={"inner_comp_" + data.ID} className="collapse show">
                        <ul className="list-unstyled inner-level-menu-new">
                            {data.show && data.Files && data.Files.map((file, fileIndex) =>
                                <li key={fileIndex} className="list_acc second_level">
                                    <a href={`${file.DocPath}`} target="_blank">
                                        <i className="simple-icon-doc"></i>
                                        <span
                                            className="d-inline-block">{file.DocName.replace("&amp;", "&")}</span>
                                        {file.ShowFavourite &&

                                            <i onClick={(e) => this.makeFavorite(file.ID, e)} data-brackets-id="15856" className="simple-icon-star show-on-hover"></i>
                                        }
                                        {!file.ShowFavourite &&

                                            <i onClick={(e) => this.makeFavorite(file.ID, e)} data-brackets-id="15856" className="simple-icon-star show-on-hover"></i>
                                        }   </a>
                                </li>
                            )
                            }

                        </ul>
                    </span>
                    {data.Dir && this.hasFileOrDir(data.Dir)}
                </li>

            })
        }
    }

    showSubTree(id) {

        let _result = this.state.result.map((data) => {
            if (data.Dir) {
                let _res = this.getSubTreeDetails(data.Dir, id);
                data.Dir = _res;
                return data;
            } else
                return data;
        })
        this.setState({
            result: _result
        }, () => {

        })

    }
    getSubTreeDetails(data, id) {

        if (data) {
            data.map((_data) => {
                if (_data.ID == id) {
                    _data.show = !_data.show;
                } else {
                    this.getSubTreeDetails(_data.Dir, id)
                }
            }
            )
        }

        return data;
    }

    getCategoryList(id) {
        id = id.split("/");
        id = id[id.length - 1];
        this.setState({ result: [] , loader : true });
        if (id) {
            var link = `http://148.72.206.209:93/api/directory/${id}`;
            axios.get(link)
                .then(res => {
                    if (res.status == 200) {
                        if (Object.keys(res.data[0]).length > 0)
                            this.setState({ result: res.data[0]?.Dir , loader : false });
                    }
                })
        }

    }


    componentDidMount() {
        this.getCategoryList(this.props.location.pathname);
    }



    render() {


        return (
            <>
            {this.state.loader && <div className="loading" /> }
            {!this.state.loader &&   <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">

                                <nav className="breadcrumb-container d-none d-sm-block d-lg-inline-block" aria-label="breadcrumb">
                                    <ol className="breadcrumb pt-0">
                                        <li className="breadcrumb-item">
                                            <a href="./index.html">Home</a>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <a href="./index.html">SOP's</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">O &amp; T</li>
                                    </ol>
                                </nav>
                                <div className="head_top"> <h1>Standard Operating Procedures</h1></div>

                                <div className="row">
                                    <div className="col-lg-12 col-sm-12 mb-4">
                                        <div className="card dashboard-progress height-auto">
                                            <div className="card-body ">
                                                <h2 className="page_title">O &amp; T</h2>
                                                <div className="col-lg-12">
                                                    <div className="row">


                                                        <div className="col-lg-6">
                                                            <div id="accordion" className="">
                                                                {this.state.result?.length > 0 && this.state.result.map((data, index) =>

                                                                    Math.ceil(this.state.result.length / 2) > index &&
                                                                    <div key={data.ID + index} className="sec_acc ">
                                                                        <button className={"btn btn-link acc_head" + (data.show == true ? '' : ' collapsed')} data-toggle="collapse" data-target="#comp_1" aria-expanded={data.show == true ? true : false} aria-controls="comp_1">
                                                                            {data.DirName &&

                                                                                <span onClick={() => this.showPanel(data.ID, 1)}><i className="iconsminds-folder"></i> {data.DirName != '' ? data.DirName.replace("&amp;", "&") : ''}  </span>}
                                                                            <i onClick={(e) => this.makeFavorite(data.ID, e)} data-brackets-id="15856" className="simple-icon-star show-on-hover"></i>
                                                                        </button>
                                                                        <div id="comp_1" style={{ transition: '3s all ease' }} className={"collapse " + (data.show == true ? ' show' : '')} data-parent="#accordion">
                                                                            <ul className="list-unstyled inner-level-menu-new">
                                                                                {data.Files?.length > 0 && data.Files.map((file, fileIndex) =>
                                                                                    <li key={fileIndex} className="list_acc">
                                                                                        {file.ShowFavourite &&
                                                                                            <a href={`${this.state.baseUrl + file.DocPath}`} target="_blank">
                                                                                                <i className="simple-icon-doc"></i>
                                                                                                <span className="d-inline-block">{file.DocName.replace("&amp;", "&")}</span><i onClick={(e) => this.makeFavorite(data.ID, e)} data-brackets-id="15856" className="simple-icon-star show-on-hover"></i>
                                                                                            </a>}
                                                                                        {!file.ShowFavourite &&
                                                                                            <a href={`${this.state.baseUrl + file.DocPath}`} target="_blank">
                                                                                                <i className="simple-icon-doc"></i>
                                                                                                <span className="d-inline-block">{file.DocName.replace("&amp;", "&")}</span><i onClick={(e) => this.makeFavorite(data.ID, e)} data-brackets-id="15856" className="simple-icon-star show-on-hover"></i>
                                                                                            </a>}
                                                                                    </li>
                                                                                )}
                                                                                {this.hasFileOrDir(data.Dir)}
                                                                            </ul>
                                                                        </div>

                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>


                                                        <div className="col-lg-6">
                                                            <div id="accordion" className="">
                                                                {this.state.result.length > 0 && this.state.result.map((data, index) =>
                                                                    Math.ceil(this.state.result?.length / 2) <= index &&
                                                                    <div key={data.ID + index} className="sec_acc ">
                                                                        <button className={"btn btn-link acc_head" + (data.show == true ? '' : ' collapsed')} data-toggle="collapse" data-target="#comp_1" aria-expanded={data.show == true ? true : false} aria-controls="comp_1">
                                                                            {data.DirName &&
                                                                                <span onClick={() => this.showPanel(data.ID, 1)}><i className="iconsminds-folder"></i> {data.DirName != '' ? data.DirName.replace("&amp;", "&") : ''}  </span>} <i onClick={(e) => this.makeFavorite(data.ID, e)} data-brackets-id="15856" className="simple-icon-star show-on-hover"></i>

                                                                        </button>
                                                                        <div id="comp_1" style={{ transition: '3s all ease' }} className={"collapse " + (data.show == true ? ' show' : '')} data-parent="#accordion">
                                                                            <ul className="list-unstyled inner-level-menu-new">
                                                                                {data.Files?.length > 0 && data.Files.map((file, fileIndex) =>
                                                                                    <li key={fileIndex} className="list_acc">
                                                                                        {file.ShowFavourite &&
                                                                                            <a href={`${this.state.baseUrl + file.DocPath}`} target="_blank">
                                                                                                <i className="simple-icon-doc"></i>
                                                                                                <span className="d-inline-block">{file.DocName.replace("&amp;", "&")}</span><i onClick={(e) => this.makeFavorite(data.ID, e)} data-brackets-id="15856" className="simple-icon-star show-on-hover"></i>
                                                                                            </a>
                                                                                        }
                                                                                        {!file.ShowFavourite &&
                                                                                            <a href={`${this.state.baseUrl + file.DocPath}`} target="_blank">
                                                                                                <i className="simple-icon-doc"></i>
                                                                                                <span className="d-inline-block">{file.DocName.replace("&amp;", "&")}</span><i onClick={(e) => this.makeFavorite(data.ID, e)} data-brackets-id="15856" className="simple-icon-star show-on-hover"></i>
                                                                                            </a>
                                                                                        }
                                                                                    </li>
                                                                                )}
                                                                                {this.hasFileOrDir(data.Dir)}
                                                                            </ul>
                                                                        </div>

                                                                    </div>
                                                                )}
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    }
            </>

        );
    };
}
category.propTypes = {}
export default category;