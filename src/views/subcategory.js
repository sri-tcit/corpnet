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
            user: sessionStorage.getItem("username")
            
        }
        this.hasFileOrDir = this.hasFileOrDir.bind(this)
    }
    
    makeFavorite(id, e, type, level) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        console.log("Make Favourute" + id)
        var link = this.state.baseurl + 'Favourite/Add';
        axios.post(link, {
            "docDirType": type.toString(),
            "fk_DocDir_id": id,
            "ldapUser_id": sessionStorage.getItem("username")
        }).then(res => {
            if (level === 1)
                this.makeFavoriteLocal(id, type);
            else
                this.makeSubLevelFav(id, type);
        })
        // window.location.assign('/app/category/'+id);

    }
    makeInnerFav(data, id, type) {
        console.log('makeInnerFav',id,type)

        if (data) {
            data.map((_data) => {
                if (type === 2 && _data.files) {
                    let _file = _data.files.map((file) => {
        console.log('makeInnerFav2',id,_data.files)
        if (file.id === id) {
        console.log('makeInnerSubLevelFavfile',id,file.ShowFavourite)
        file.ShowFavourite = file.ShowFavourite === 0 ? 1 : 0;
                        }
                        return file;
                    })
                    _data.files = _file;
                }
                if (_data.id === id) {
                    _data.ShowFavourite = _data.ShowFavourite === 0 ? 1 : 0;
                } else {
                    this.getSubTreeDetails(_data.Dir, id, type)
                }
            }
            )
        }
        return data;
    }

    showDocType(DocType)
    {
        if (DocType != null && (DocType === "pdf" || DocType === "txt" || DocType === "doc" || DocType === "docx" || DocType === "xls" || DocType === "xlsx" || DocType === "pptx" || DocType === "ppt" || DocType === "jpg" || DocType === "png"  || DocType === "zip" || DocType === "bmp"))  
         {return(
        <span className="small_icon">
        <img src={this.state.base+"/assets/img/"+DocType+".png"} />
        </span>)
        }
        else
        {
            return(
               <i className="simple-icon-doc col-lg-2"></i>)
        }
    }
    makeSubLevelFav(id, type) {
        console.log('makeSubLevelFav',id,type)
        let _result = this.state.result.map((data) => {
            if (data.Dir) {
                if (type === 2 && data.files) {
        console.log('makeSubLevelFav2',id,data.files)

                    let _file = data.files.map((file) => {
                        if (file.id === id) {
        console.log('makeSubLevelFavfile',id,file.ShowFavourite)
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
            if (data.id === id) {
                data.ShowFavourite = data.ShowFavourite === 0 ? 1 : 0;
            }
            if (type === 2 && data.files) {
                let _file = data.files.map((file) => {
                    if (file.id === id) {
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
    showPanel(index, level) {
        this.setState(prevState => {
            let result = prevState.result;
            for (var i = 0; i < result.length; i++) {
                if (result[i].id === index) {
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
        var link = this.state.baseurl + 'Generic/AddRecentLink';
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
                    <a style={{ cursor: 'pointer' }} data-toggle="collapse" data-target={"#inner_comp_" + data.id} className={!data.show ? 'collapsed' : ''} aria-expanded={data.show ? 'true' : 'false'}>
                        <span onClick={() => this.showSubTree(data.id)} >
                            <i className="iconsminds-folder"></i>
                            <span className="d-inline-block col-lg-8">{Parser(" "+data.DirName)} </span>
                        </span>
                        <i onClick={(e) => this.makeFavorite(data.id, e, 1, 2)} data-brackets-id="15856" className={"simple-icon-star  " + (data.ShowFavourite === 1 ? 'fav-icon' : 'show-on-hover')}></i>
                    </a>
                    <span id={"inner_comp_" + data.id} className="collapse show">
                        <ul className="list-unstyled inner-level-menu-new">
                            {data.show && data.files && data.files.map((file, fileIndex) =>
                                <li key={fileIndex} className="list_acc second_level">
                                    <a onClick={(e) => this.makeRecent(file.id, e, this.state.user,file.DocPath)} target="_blank">
                                    {this.showDocType(file.DocType)}  
                                        <span
                                            className="d-inline-block col-lg-8">{Parser(" "+file.DocName)}</span>
                                        <i onClick={(e) => this.makeFavorite(file.id, e, 2, 2)} data-brackets-id="15856" className={"simple-icon-star  " + (file.ShowFavourite === 1 ? 'fav-icon' : 'show-on-hover')}></i>
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
            console.log('id',data.id,id)

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
                console.log('id',_data.id,id)
                if (_data.id === id) {
                console.log('id2',_data.id,id)
                _data.show = !_data.show;
                } else {
                console.log('id3',_data.id,id)
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
                        var mainTitle = document.querySelector(".sidebar .active ").querySelector("a").getAttribute("data-flag");
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
                                            <a href={this.state.base+"/app/home"} target="_self">Home</a>
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
                                                                    <div key={data.id + index} className="sec_acc ">
                                                                        <button className={"btn btn-link acc_head" + (data.show === true ? '' : ' collapsed')} data-toggle="collapse" data-target="#comp_1" aria-expanded={data.show === true ? true : false} aria-controls="comp_1">
                                                                            <span onClick={(e) => this.showPanel(data.id, 1)}><i className="iconsminds-folder"></i> {Parser(" "+this.state.document.DirDescription)}</span> <i onClick={(e) => this.makeFavorite(data.id, e, 1, 1)}  className={"simple-icon-star  " + (data.ShowFavourite === 1 ? 'fav-icon' : 'show-on-hover')}></i>
                                                                        </button>
                                                                        <div id="comp_1" style={{ transition: '3s all ease' }} className={"collapse " + (data.show === true ? ' show' : '')} data-parent="#accordion">
                                                                            <ul className="list-unstyled inner-level-menu-new">
                                                                                {data.files?.length > 0 && data.files.map((file, fileIndex) =>
                                                                                    <li key={fileIndex} className="list_acc">
                                                                                        <a onClick={(e) => this.makeRecent(file.id, e, user,file.DocPath)}  target="_blank"  className="row col-lg-12">
                                                                                        {this.showDocType(file.DocType)}  
                                                                                            <span className="d-inline-block col-lg-8">{file.DocName}  </span><i onClick={(e) => this.makeFavorite(file.id, e, 2, 1)}  className={"col-lg-2 simple-icon-star  " + (file.ShowFavourite === 1 ? 'fav-icon' : 'show-on-hover')}></i>
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
                                                                    <div key={data.id + index} className="sec_acc ">
                                                                        <button className={"btn btn-link acc_head" + (data.show === true ? '' : ' collapsed')} data-toggle="collapse" data-target="#comp_1" aria-expanded={data.show === true ? true : false} aria-controls="comp_1">
                                                                            <span onClick={(e) => this.showPanel(data.id, 1)}><i className="iconsminds-folder"></i> {Parser(" "+data.DirName)}  </span> <i onClick={(e) => this.makeFavorite(data.id, e, 1, 1)} data-brackets-id="15856" className={"simple-icon-star  " + (data.ShowFavourite === 1 ? 'fav-icon' : 'show-on-hover')}></i>
                                                                        </button>
                                                                        <div id="comp_1" style={{ transition: '3s all ease' }} className={"collapse " + (data.show === true ? ' show' : '')} data-parent="#accordion">
                                                                            <ul className="list-unstyled inner-level-menu-new">
                                                                                {data.files?.length > 0 && data.files.map((file, fileIndex) =>
                                                                                    <li key={fileIndex} className="list_acc">
                                                                                        
                                                                                        <a onClick={(e) => this.makeRecent(file.id, e, this.state.user, file.DocPath)} className="row col-lg-12" target="_blank">
                                                                                            {this.showDocType(file.DocType)}
                                                                                            <span
                                                                                                className="d-inline-block col-lg-8">{Parser(" " + file.DocName)}</span>
                                                                                            <i onClick={(e) => this.makeFavorite(file.id, e, 2, 2)} data-brackets-id="15856" className={"col-lg-2 simple-icon-star  " + (file.ShowFavourite === 1 ? 'fav-icon' : 'show-on-hover')}></i>
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
