import React, { Component } from "react";
class category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { show: false },
                { show: false },
                { show: false },
                { show: false },
                { show: false },
                { show: false }
            ],

            result:
                [
                    {
                        "id": 3,
                        "DirName": "Compliance Ops",
                        "DirDescription": "Compliance Ops",
                        "Parent_id": 2,
                        "files": [
                            {
                                "id": 1,
                                "DocName": "AML Due Diligence-Compliance-DDC-531",
                                "DocDescription": "AML Due Diligence-Compliance-DDC-531",
                                "Thumbnail": "",
                                "DocPath": "SOP\\RBG\\RCU\\P\\P-OPS-CPC-DDC-531.pdf",
                                "Fk_Directory_id": 3
                            },
                            {
                                "id": 2,
                                "DocName": "Enhance Due Diligence-734",
                                "DocDescription": "Enhance Due Diligence-734",
                                "Thumbnail": "",
                                "DocPath": "SOP\\RBG\\Fundtransfer\\PFS\\P\\P-OPS-COMPOPS-EDD-734.pdf",
                                "Fk_Directory_id": 3
                            },
                            {
                                "id": 3,
                                "DocName": "MIS & QC-735",
                                "DocDescription": "MIS & QC-735",
                                "Thumbnail": "",
                                "DocPath": "SOP\\RBG\\MIS & QC\\P\\P-OPS-COMPOPS-MIS&QC-735.pdf",
                                "Fk_Directory_id": 3
                            }
                        ],
                        "dir": [
                            {
                                "id": 4,
                                "DirName": "KYC Remediation",
                                "DirDescription": "KYC Remediation",
                                "Parent_id": 3,
                                "files": [
                                    {
                                        "id": 4,
                                        "DocName": "RENEWAL-747",
                                        "DocDescription": "RENEWAL-747",
                                        "Thumbnail": "",
                                        "DocPath": "SOP\\RBG\\KYC Remediation\\P\\P-OPS-COMPOPS-KYC-747.pdf",
                                        "Fk_Directory_id": 4
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 5,
                        "DirName": "Corporate Operations",
                        "DirDescription": "Corporate Operations",
                        "Parent_id": 2,
                        "files": [
                            {
                                "id": 5,
                                "DocName": "Corporate Customer Service Unit-CSU-744",
                                "DocDescription": "Corporate Customer Service Unit-CSU-744",
                                "Thumbnail": "",
                                "DocPath": "SOP\\RBG\\CPS\\CCS\\P\\P-OPS-COPS-CSU-744.pdf",
                                "Fk_Directory_id": 5
                            },
                            {
                                "id": 6,
                                "DocName": "Cash Management Unit-CMU-540",
                                "DocDescription": "Cash Management Unit-CMU-540",
                                "Thumbnail": "",
                                "DocPath": "SOP\\RBG\\CPS\\CMS\\P\\P-OPS-COP-CMU-540.pdf",
                                "Fk_Directory_id": 5
                            },
                            {
                                "id": 7,
                                "DocName": "Communication & Controls-COM-648",
                                "DocDescription": "Communication & Controls-COM-648",
                                "Thumbnail": "",
                                "DocPath": "SOP\\PMO\\COM\\P\\P-OPS-COPS-COM-648.pdf",
                                "Fk_Directory_id": 5
                            },
                            {
                                "id": 8,
                                "DocName": "Customer Service Unit-CSU-745",
                                "DocDescription": "Customer Service Unit-CSU-745",
                                "Thumbnail": "",
                                "DocPath": "SOP\\OPS\\CSU\\P\\P-OPS-COPS-IBG-CSU-745.pdf",
                                "Fk_Directory_id": 5
                            }
                        ]
                    },
                    {
                        "id": 15,
                        "DirName": "Retail Operations",
                        "DirDescription": "Retail Operations",
                        "Parent_id": 2
                    },
                    {
                        "id": 22,
                        "DirName": "TOC & CPC",
                        "DirDescription": "TOC & CPC",
                        "Parent_id": 2
                    },
                    {
                        "id": 28,
                        "DirName": "Shared Services",
                        "DirDescription": "Shared Services",
                        "Parent_id": 2
                    },
                    {
                        "id": 29,
                        "DirName": "GRC",
                        "DirDescription": "GRC",
                        "Parent_id": 2
                    },
                    {
                        "id": 40,
                        "DirName": "Technology",
                        "DirDescription": "Technology",
                        "Parent_id": 2
                    }
                ]


            //console.log('query', this.props.match.params.id)
        }
    }
    //  this.showPanel = this.showPanel.bind(this);

    showPanel(index) {

        this.setState(prevState => {
            let result = prevState.result;
            console.log(result, index);
            console.log(result.length)
            for (var i = 0; i < result.length; i++) {
                if (result[i].id == index) {
                    result[i].show = !result[i].show;
                    break; 
                }
            }


            console.log(result);

             return {result};

        })
    }
    componentWillMount() {
        console.log(this.state.result.length)
    }
    render() {
        return (
            <>
                <main>
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
                                                                {this.state.result.map((data, index) =>
                                                                    Math.ceil(this.state.result.length / 2) > index &&
                                                                    <div key={index} className="sec_acc ">

                                                                        <button onClick={() => this.showPanel(data.id)} className="btn btn-link acc_head" data-toggle="collapse" data-target="#comp_1" aria-expanded="false" aria-controls="comp_1">
                                                                            <i className="iconsminds-folder"></i> {data.DirName} <i data-brackets-id="15856" className="simple-icon-star show-on-hover"></i>
                                                                        </button>
                                                                        {data.show == true &&
                                                                            <div id="comp_1" className="collapse show" data-parent="#accordion" >
                                                                                <ul className="list-unstyled inner-level-menu-new">

                                                                                    {data.files?.length > 0 && data.files.map((file, fileIndex) =>
                                                                                        <li key={file.id} className="list_acc">
                                                                                            <a href="{file.DocPath}" target="_blank">
                                                                                                <i className="simple-icon-doc"></i>
                                                                                                <span className="d-inline-block">{file.DocName}</span><i data-brackets-id="15856" className="simple-icon-star show-on-hover"></i>
                                                                                            </a>
                                                                                        </li>
                                                                                    )}

                                                                                    {data.dir?.length > 0 && data.dir.map((dir, dirIndex) =>
                                                                                        <li key={dir.id} className="list_acc">
                                                                                            <a href="#" data-toggle="collapse" data-target="#inner_comp_1" className="collapsed">

                                                                                                <i className="iconsminds-folder"></i>
                                                                                                <span className="d-inline-block">{dir.DirName}</span><i data-brackets-id="15856" className="simple-icon-star show-on-hover"></i>
                                                                                            </a>
                                                                                            <div id="inner_comp_1" className="collapse">
                                                                                                <ul className="list-unstyled inner-level-menu-new">
                                                                                                    <li className="list_acc second_level">
                                                                                                        <a href="dummy.pdf" target="_blank">
                                                                                                            <i className="simple-icon-doc"></i>
                                                                                                            <span
                                                                                                                className="d-inline-block">KYC File</span><i data-brackets-id="15856" className="simple-icon-star show-on-hover"></i>
                                                                                                        </a>
                                                                                                    </li>


                                                                                                </ul>
                                                                                            </div>
                                                                                        </li>
                                                                                    )}
                                                                                </ul>
                                                                            </div>
                                                                        }


                                                                    </div>

                                                                )}
                                                            </div>




                                                        </div>

                                                        <div className="col-lg-6">
                                                            <div id="accordion" className="">
                                                                {this.state.result.map((data, index) =>
                                                                    Math.ceil(this.state.result.length / 2) <= index &&
                                                                    <div key={index} className="sec_acc ">

                                                                        <button onClick={() => this.showPanel(data.id)} className="btn btn-link acc_head" data-toggle="collapse" data-target="#comp_1" aria-expanded="false" aria-controls="comp_1">
                                                                            <i className="iconsminds-folder"></i> {data.DirName} <i data-brackets-id="15856" className="simple-icon-star show-on-hover"></i>
                                                                        </button>
                                                                        {data.show == true &&
                                                                            <div id="comp_1" className="collapse show" data-parent="#accordion" >
                                                                                <ul className="list-unstyled inner-level-menu-new">

                                                                                    {data.files?.length > 0 && data.files.map((file, fileIndex) =>
                                                                                        <li key={file.id} className="list_acc">
                                                                                            <a href="{file.DocPath}" target="_blank">
                                                                                                <i className="simple-icon-doc"></i>
                                                                                                <span className="d-inline-block">{file.DocName}</span><i data-brackets-id="15856" className="simple-icon-star show-on-hover"></i>
                                                                                            </a>
                                                                                        </li>
                                                                                    )}

                                                                                    {data.dir?.length > 0 && data.dir.map((dir, dirIndex) =>
                                                                                        <li key={dir.id} className="list_acc">
                                                                                            <a href="#" data-toggle="collapse" data-target="#inner_comp_1" className="collapsed">

                                                                                                <i className="iconsminds-folder"></i>
                                                                                                <span className="d-inline-block">{dir.DirName}</span><i data-brackets-id="15856" className="simple-icon-star show-on-hover"></i>
                                                                                            </a>
                                                                                            <div id="inner_comp_1" className="collapse">
                                                                                                <ul className="list-unstyled inner-level-menu-new">
                                                                                                    <li className="list_acc second_level">
                                                                                                        <a href="dummy.pdf" target="_blank">
                                                                                                            <i className="simple-icon-doc"></i>
                                                                                                            <span
                                                                                                                className="d-inline-block">KYC File</span><i data-brackets-id="15856" className="simple-icon-star show-on-hover"></i>
                                                                                                        </a>
                                                                                                    </li>


                                                                                                </ul>
                                                                                            </div>
                                                                                        </li>
                                                                                    )}
                                                                                </ul>
                                                                            </div>
                                                                        }


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
                </main>

            </>

        );
    };
}
category.propTypes = {}
export default category;