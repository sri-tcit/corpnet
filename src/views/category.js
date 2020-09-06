import React, { Component } from "react";
import Parser from 'html-react-parser'; 
import axios from 'axios';
import { api,mediaPath} from '../views/Shared/baseurl-api';
import {Baseurl} from '../constants/defaultValues';

class category extends Component {
    constructor(props) {
        super(props);
        this.props.history.listen((location, action) => {
            this.getCategoryList(location.pathname)
        });
        this.state = {
            baseurl: api,
            docBaseUrl: mediaPath,
      base: Baseurl,
      loader: false,
            result: [],
            document: [],
            user: "hakkimb"
            
        }
        this.hasFileOrDir = this.hasFileOrDir.bind(this)
    }
    
    makeFavorite(id, e, type, level) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        console.log("Make Favourute" + id)
        var link = this.state.baseUrl + 'Favourite/Add';
        axios.post(link, {
            "docDirType": type.toString(),
            "fk_DocDir_id": id,
            "ldapUser_id": "admin"
        }).then(res => {
            if (level === 1)
                this.makeFavoriteLocal(id, type);
            else
                this.makeSubLevelFav(id, type);
        })
    }
    makeInnerFav(data, id, type) {
        if (data) {
            data.map((_data) => {
                if (type === 2 && _data.files) {
                    let _file = _data.files.map((file) => {
                        if (file.ID === id) {
                            file.ShowFavourite = file.ShowFavourite === 0 ? 1 : 0;
                        }
                        return file;
                    })
                    _data.files = _file;
                }
                if (_data.ID === id) {
                    _data.ShowFavourite = _data.ShowFavourite === 0 ? 1 : 0;
                } else {
                    this.getSubTreeDetails(_data.Dir, id, type)
                }
            }
            )
        }
        return data;
    }
    makeSubLevelFav(id, type) {
        let _result = this.state.result.map((data) => {
            if (data.Dir) {
                if (type === 2 && data.files) {
                    let _file = data.files.map((file) => {
                        if (file.ID === id) {
                            file.ShowFavourite = file.ShowFavourite === 0 ? 1 : 0;
                        }
                        return file;
                    })
                    data.files = _file;
                } else {
                    if (data.Dir.Id === id) {
                        data.Dir.ShowFavourite = data.Dir.ShowFavourite === 0 ? 1 : 0;
                    }
                }
                let _res = this.makeInnerFav(data.Dir, id, type);
                data.Dir = _res;
                return data;
            } else
                return data;
        })
        console.log(_result);
        this.setState({
            result: _result
        })
    }
    makeFavoriteLocal(id, type) {
        let _result = this.state.result.map((data) => {
            if (data.ID === id) {
                data.ShowFavourite = data.ShowFavourite === 0 ? 1 : 0;
            }
            if (type === 2 && data.files) {
                let _file = data.files.map((file) => {
                    if (file.ID === id) {
                        file.ShowFavourite = file.ShowFavourite === 0 ? 1 : 0;
                    }
                    return file;
                })
                data.files = _file;
            }
            return data;
        })
        this.setState({
            result: _result
        }, () => {
        })
    }
    getFileLists(data) {
    }
    getDirLists(data) {
    }
    showPanel(index, level) {
        this.setState(prevState => {
            let result = prevState.result;
            for (var i = 0; i < result.length; i++) {
                if (result[i].ID === index) {
                    result[i].show = !result[i].show;
                } else {
                    result[i].show = false;
                }
            }
            return { result };
        })
    }
    makeRecent(id, e, user,DocPath) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        console.log("recent" + id)
        var link = this.state.baseUrl + 'Generic/AddRecentLink';
        axios.post(link, {
            "ldapUser_id": user,
            "fk_Document_id": id,
            "createdBy": user,
            "modifiedBy": user
            
        }).then(res => {
           console.log(id)
        })
        let path = `${this.state.docBaseUrl + DocPath}`; 
    
        window.open(path, '_blank');
      
      
      
    }
    hasFileOrDir(data) {
        if (data) {
            return data.map((data, key) => {
                return <li key={key} className={"list_acc" + (data.show === true ? '' : ' hide')}>
                    <a style={{ cursor: 'pointer' }} data-toggle="collapse" data-target={"#inner_comp_" + data.ID} className={!data.show ? 'collapsed' : ''} aria-expanded={data.show ? 'true' : 'false'}>
                        <span onClick={() => this.showSubTree(data.ID)} >
                            <i className="iconsminds-folder"></i>
                            <span className="d-inline-block">{Parser(" "+data.DirName)} </span>
                        </span>
                        <i onClick={(e) => this.makeFavorite(data.ID, e, 1, 2)} data-brackets-id="15856" className={"simple-icon-star  " + (data.ShowFavourite === 1 ? 'fav-icon' : 'show-on-hover')}></i>
                    </a>
                    <span id={"inner_comp_" + data.ID} className="collapse show">
                        <ul className="list-unstyled inner-level-menu-new">
                            {data.show && data.files && data.files.map((file, fileIndex) =>
                                <li key={fileIndex} className="list_acc second_level">
                                    <a href={`${this.state.docBaseUrl}${file.DocPath}`} onClick={(e) => this.makeRecent(data.ID, e, this.state.user,file.DocPath)} target="_blank">
                                        <i className="simple-icon-doc"></i>
                                        <span
                                            className="d-inline-block">{Parser(" "+file.DocName)}</span>
                                        <i onClick={(e) => this.makeFavorite(file.ID, e, 2, 2)} data-brackets-id="15856" className={"simple-icon-star  " + (file.ShowFavourite === 1 ? 'fav-icon' : 'show-on-hover')}></i>
                                    </a>
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
                if (_data.ID === id) {
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
        console.log();
        this.setState({ document: [], result: [], loader: true });
        if (id) {
            var link = this.state.baseurl+`directory/${id}`;
            axios.get(link)
                .then(res => {
                    if (res.status === 200) {
                        let _res = [];
                        
                        if (res.data[1].hasOwnProperty('Content')) {
                        
                            if (res.data[1].Content[0].hasOwnProperty('Dir'))
                        _res = res.data[1]?.Content[0]?.Dir;
                            else{
                        if (res.data[1].Content[0].hasOwnProperty('files')) {
                                _res = [{
                                    ID: res.data[0][0].Title[0].ID,
                                    DirName: res.data[0][0].Title[0].DirName,
                                    ShowFavourite: 0,
                                    files: res.data[1].Content[0].files
                                }]
                            }
                            if (res.data[1].Content[0].hasOwnProperty('files')) {
                                _res = [{
                                    ID: res.data[0][0].Title[0].ID,
                                    DirName: res.data[0][0].Title[0].DirName,
                                    ShowFavourite: 0,
                                    files: res.data[1].Content[0].files
                                }]
                            }
                        }
                        }
                        console.log('test3',_res)
                        var mainTitle = document.querySelector(".sidebar .active ").querySelector("a").getAttribute("data-flag")
                        this.setState({ mainTitle: mainTitle, document: res.data[0][0].Title[0], result: _res, loader: false });
                         console.log('state',this.state);
                    }
                })
        }
    }
    componentDidMount() {
        this.getCategoryList(this.props.location.pathname);
    }
    render() {
        const { user } = this.state
        return (
            <>
                {this.state.loader && <div className="loading" />}
                {!this.state.loader && <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <nav className="breadcrumb-container d-none d-sm-block d-lg-inline-block" aria-label="breadcrumb">
                                    <ol className="breadcrumb pt-0">
                                        <li className="breadcrumb-item">
                                            <a href={"."+this.state.base+"/app/home"} target="_self">Home</a>
                                        </li>
                                        {this.state.mainTitle &&
                                            <li className="breadcrumb-item">
                                                <a>{this.state.mainTitle}</a>
                                            </li>
                                        }
                                        {this.state.document && <li className="breadcrumb-item active" aria-current="page">
                                        {Parser(" "+this.state.document.DirDescription)}
                                        </li>
                                        }
                                    </ol>
                                </nav>
                                <div className="row">
                                    <div className="col-lg-12 col-sm-12 mb-4">
                                        <div className="card dashboard-progress height-auto">
                                            <div className="card-body ">
                                                {this.state.document && <h2 className="page_title">{Parser(" "+this.state.document.DirDescription)}</h2>}
                                                <div className="col-lg-12">
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div id="accordion" className="">
                                                                {this.state.result?.length > 0 && this.state.result.map((data, index) =>
                                                                    Math.ceil(this.state.result.length / 2) > index &&
                                                                    <div key={data.ID + index} className="sec_acc ">
                                                                        <button className={"btn btn-link acc_head" + (data.show === true ? '' : ' collapsed')} data-toggle="collapse" data-target="#comp_1" aria-expanded={data.show === true ? true : false} aria-controls="comp_1">
                                                                            <span onClick={(e) => this.showPanel(data.ID, 1)}><i className="iconsminds-folder"></i> {Parser(" "+data.DirName)}</span> <i onClick={(e) => this.makeFavorite(data.ID, e, 1, 1)}  className={"simple-icon-star  " + (data.ShowFavourite === 1 ? 'fav-icon' : 'show-on-hover')}></i>
                                                                        </button>
                                                                        <div id="comp_1" style={{ transition: '3s all ease' }} className={"collapse " + (data.show === true ? ' show' : '')} data-parent="#accordion">
                                                                            <ul className="list-unstyled inner-level-menu-new">
                                                                                {data.files?.length > 0 && data.files.map((file, fileIndex) =>
                                                                                    <li key={fileIndex} className="list_acc">
                                                                                        <a href={`${this.state.docBaseUrl}${file.DocPath}`} onClick={(e) => this.makeRecent(data.ID, e, user,file.DocPath)}  target="_blank"  className="row col-lg-12">
                                                                                            <i className="simple-icon-doc col-lg-2"></i>
                                                                                            <span className="d-inline-block col-lg-8">{file.DocName}  </span><i onClick={(e) => this.makeFavorite(file.ID, e, 2, 1)}  className={"col-lg-2 simple-icon-star  " + (file.ShowFavourite === 1 ? 'fav-icon' : 'show-on-hover')}></i>
                                                                                        </a>
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
                                                                        <button className={"btn btn-link acc_head" + (data.show === true ? '' : ' collapsed')} data-toggle="collapse" data-target="#comp_1" aria-expanded={data.show === true ? true : false} aria-controls="comp_1">
                                                                            <span onClick={(e) => this.showPanel(data.ID, 1)}><i className="iconsminds-folder"></i> {Parser(" "+data.DirName)}  </span> <i onClick={(e) => this.makeFavorite(data.ID, e, 1, 1)} data-brackets-id="15856" className={"simple-icon-star  " + (data.ShowFavourite === 1 ? 'fav-icon' : 'show-on-hover')}></i>
                                                                        </button>
                                                                        <div id="comp_1" style={{ transition: '3s all ease' }} className={"collapse " + (data.show === true ? ' show' : '')} data-parent="#accordion">
                                                                            <ul className="list-unstyled inner-level-menu-new">
                                                                                {data.files?.length > 0 && data.files.map((file, fileIndex) =>
                                                                                    <li key={fileIndex} className="list_acc">
                                                                                        <a href={`${this.state.docBaseUrl}${file.DocPath}`} onClick={(e) => this.makeRecent(data.ID, e, user,file.DocPath)}  target="_blank"  className="row col-lg-12">
                                                                                            <i className="simple-icon-doc  col-lg-2"></i>
                                                                                            <span className="d-inline-block  col-lg-8">{Parser(" "+file.DocName)}</span><i onClick={(e) => this.makeFavorite(data.ID, e, 2, 1)} data-brackets-id="15856" className={"col-lg-2 simple-icon-star  " + (file.ShowFavourite === 1 ? 'fav-icon' : 'show-on-hover')}></i>
                                                                                        </a>
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
