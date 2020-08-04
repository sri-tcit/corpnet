import React from 'react';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import IconCardsCarousel from '../../../containers/dashboards/IconCardsCarousel';
import RecentOrders from '../../../containers/dashboards/RecentOrders';
import Logs from '../../../containers/dashboards/Logs';
import Tickets from '../../../containers/dashboards/Tickets';
import Calendar from '../../../containers/dashboards/Calendar';
import BestSellers from '../../../containers/dashboards/BestSellers';
import ProfileStatuses from '../../../containers/dashboards/ProfileStatuses';
import GradientCardContainer from '../../../containers/dashboards/GradientCardContainer';
import Cakes from '../../../containers/dashboards/Cakes';
import GradientWithRadialProgressCard from '../../../components/cards/GradientWithRadialProgressCard';
import SortableStaticticsRow from '../../../containers/dashboards/SortableStaticticsRow';
import AdvancedSearch from '../../../containers/dashboards/AdvancedSearch';
import SmallLineCharts from '../../../containers/dashboards/SmallLineCharts';
import SalesChartCard from '../../../containers/dashboards/SalesChartCard';
import ProductCategoriesPolarArea from '../../../containers/dashboards/ProductCategoriesPolarArea';
import WebsiteVisitsChartCard from '../../../containers/dashboards/WebsiteVisitsChartCard';
import ConversionRatesChartCard from '../../../containers/dashboards/ConversionRatesChartCard';
import TopRatedItems from '../../../containers/dashboards/TopRatedItems';

const DefaultDashboard = ({ intl, match }) => {
  const { messages } = intl;

  return (
    <>
      {/* <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.default" match={match} />
          <Separator className="mb-5" />
        </Colxx>
       </Row> */}
      <div className="row">
        <div className="col-12">
          {/*                
                    <nav className="breadcrumb-container d-none d-sm-block d-lg-inline-block" aria-label="breadcrumb" style="display: none !important">
                        <ol className="breadcrumb pt-0">
                            <li className="breadcrumb-item">
                                <a href="#">Home</a>
                            </li>
                          
                        </ol>
                    </nav><br>  */}
          <h1 className="main_head">CorpNet</h1>
          <div className="separator mb-5"></div>
        </div>


        <div className="col-xl-8 col-lg-12 mb-4">


          <div className="banner-outer">

            <div className="cta">
              <a href="">Click here</a>

            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card h-400">
            <div className="card-body">
              <div className="img_sec">
                <img src="/assets/img/landing-page/applications/contact-banner.png"/>
                  <h3>Need help?</h3>
                  <p>knackered cup of char show off show off pick your nose and blow off faff about it's all gone to pot tosser that so I said, happy days do one bite your arm off ummm I'm telling.</p>
                  <div className="cta-contact"><a href="">i help</a> <span></span>
              <a href="" className="invert_style">+9714 45454545</a>
             
                  </div>
             



              </div>
            </div>
          </div>
        </div>


        <div className="row">
          <div className="col-lg-8 col-sm-12 mb-4">
            <div className="card dashboard-progress">

              <div className="card-body">
                <h2 className="title_cn">WELCOME TO CORPNET</h2>
                <p className="welcome_content">SOP knackered cup of char show off show off pick your nose and blow off faff about it's all gone to pot tosser that so I said, happy days do one bite your arm off ummm I'm telling.SOP knackered cup of char show off show off pick your nose and blow off faff about it's all gone to pot tosser that so I said, happy days do one bite your arm off ummm I'm telling.</p>
                <div className="block-section">
                  <div className="row">
                    <div className="col-lg-6"><div className="inner-block">

                      <a href="" className="box_sec">
                        <div className="glyph-icon simple-icon-speech icons_new "></div>
                        <div className="p_content">

                          <p className="font-weight-medium mb-0 ">SOP</p>
                          <p className="text-muted mb-0 text-small">He lost his bottle bubble and squeak knackered.!</p>

                        </div>
                      </a>
                    </div></div>
                    <div className="col-lg-6"><div className="inner-block">

                      <a href="" className="box_sec">
                        <div className="glyph-icon simple-icon-pie-chart icons_new "></div>
                        <div className="p_content">

                          <p className="font-weight-medium mb-0 ">OPM</p>
                          <p className="text-muted mb-0 text-small">He lost his bottle bubble and squeak knackered.!</p>

                        </div>
                      </a>
                    </div></div>
                  </div>

                </div>
                <div className="block-section">
                  <div className="row">
                    <div className="col-lg-6"><div className="inner-block">

                      <a href="" className="box_sec">
                        <div className="glyph-icon simple-icon-doc icons_new "></div>
                        <div className="p_content">

                          <p className="font-weight-medium mb-0 ">ADM</p>
                          <p className="text-muted mb-0 text-small">He lost his bottle bubble and squeak knackered.!</p>

                        </div>
                      </a>
                    </div></div>
                    <div className="col-lg-6"><div className="inner-block">

                      <a href="" className="box_sec">
                        <div className="glyph-icon simple-icon-docs icons_new "></div>
                        <div className="p_content">

                          <p className="font-weight-medium mb-0 ">CPM</p>
                          <p className="text-muted mb-0 text-small">He lost his bottle bubble and squeak knackered.!</p>

                        </div>
                      </a>
                    </div></div>
                  </div>

                </div>

              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 col-12 mb-4 h-400">
            <div className="imp_block"><h3>Corporate Affairs</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>

              <div className="learn_more"><a href="">Learn more <i className="glyph-icon iconsminds-arrow-right-2"></i></a>
              </div>
            </div>

            <div className="card h-195">
              <div className="card-header pl-0 pr-0">
                <ul className="nav nav-tabs card-header-tabs  ml-0 mr-0" role="tablist">
                  <li className="nav-item w-50 text-center">
                    <a className="nav-link active" id="first-tab_" data-toggle="tab" href="#firstFull" role="tab" aria-controls="first" aria-selected="true">Quick Links</a>
                  </li>
                  <li className="nav-item w-50 text-center">
                    <a className="nav-link" id="second-tab_" data-toggle="tab" href="#secondFull" role="tab" aria-controls="second" aria-selected="false">Recent Links</a>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <div className="tab-content">
                  <div className="tab-pane fade active show" id="firstFull" role="tabpanel" aria-labelledby="first-tab_">
                    <a href="afcg.html">
                      <div className="links_with_icon">
                        <i className="glyph-icon iconsminds-link-2"></i><span>AFCG</span>
                      </div>
                    </a>

                    <a href="">
                      <div className="links_with_icon">
                        <i className="glyph-icon iconsminds-link-2"></i><span>OPM</span>
                      </div>
                    </a>



                  </div>
                  <div className="tab-pane fade" id="secondFull" role="tabpanel" aria-labelledby="second-tab_">
                    <a href="">
                      <div className="links_with_icon">
                        <i className="glyph-icon iconsminds-book"></i><span>Enhance Due Diligence</span>
                      </div>
                    </a>
                    <a href="">
                      <div className="links_with_icon">
                        <i className="glyph-icon iconsminds-book"></i><span>MIS & QC-735</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>



      </div>

      <div className="row sortable extra_links">
          <div className="col-xl-3 col-lg-6 mb-4">
            <a href="contract.html">
              <div className="card">

                <div className="card-body d-flex  align-items-center">
                  <div className="glyph-icon simple-icon-note ft_20"></div>
                  <h6 className="mb-0 pl-3">Contracts</h6>

                </div>
              </div></a>
          </div>
          <div className="col-xl-3 col-lg-6 mb-4">
            <a href="">
              <div className="card">

                <div className="card-body d-flex  align-items-center">
                  <div className="glyph-icon simple-icon-book-open ft_20"></div>
                  <h6 className="mb-0 pl-3">User Information</h6>

                </div>
              </div></a>
          </div>
          <div className="col-xl-3 col-lg-6 mb-4">
            <a href="">
              <div className="card">

                <div className="card-body d-flex  align-items-center">
                  <div className="glyph-icon simple-icon-notebook ft_20"></div>
                  <h6 className="mb-0 pl-3">Policies</h6>

                </div>
              </div></a>
          </div>
          <div className="col-xl-3 col-lg-6 mb-4">
            <a href="">
              <div className="card">

                <div className="card-body d-flex  align-items-center">
                  <div className="glyph-icon simple-icon-docs ft_20"></div>
                  <h6 className="mb-0 pl-3">User Manual</h6>

                </div>
              </div></a>
          </div>
        </div>

     {/* <Row>
        <Colxx lg="12" xl="6">
          <IconCardsCarousel />
          <Row>
            <Colxx md="12" className="mb-4">
              <SalesChartCard />
            </Colxx>
          </Row>
        </Colxx>
        <Colxx lg="12" xl="6" className="mb-4">
          <RecentOrders />
        </Colxx>
      </Row>
      <Row>
        <Colxx lg="4" md="12" className="mb-4">
          <ProductCategoriesPolarArea chartClass="dashboard-donut-chart" />
        </Colxx>
        <Colxx lg="4" md="6" className="mb-4">
          <Logs />
        </Colxx>
        <Colxx lg="4" md="6" className="mb-4">
          <Tickets />
        </Colxx>
      </Row>
      <Row>
        <Colxx xl="6" lg="12" className="mb-4">
          <Calendar />
        </Colxx>
        <Colxx xl="6" lg="12" className="mb-4">
          <BestSellers />
        </Colxx>
      </Row>
      <Row>
        <Colxx sm="12" lg="4" className="mb-4">
          <ProfileStatuses />
        </Colxx>
        <Colxx md="6" lg="4" className="mb-4">
          <GradientCardContainer />
        </Colxx>
        <Colxx md="6" lg="4" className="mb-4">
          <Cakes />
        </Colxx>
      </Row>
      <SortableStaticticsRow messages={messages} />
      <Row>
        <Colxx sm="12" md="6" className="mb-4">
          <WebsiteVisitsChartCard />
        </Colxx>
        <Colxx sm="12" md="6" className="mb-4">
          <ConversionRatesChartCard />
        </Colxx>
      </Row>
      <Row> 
        <Colxx lg="12" md="6" xl="4">
          <Row>
            <Colxx lg="4" xl="12" className="mb-4">
              <GradientWithRadialProgressCard
                icon="iconsminds-clock"
                title={`5 ${messages['dashboards.files']}`}
                detail={messages['dashboards.pending-for-print']}
                percent={(5 * 100) / 12}
                progressText="5/12"
              />
            </Colxx>
            <Colxx lg="4" xl="12" className="mb-4">
              <GradientWithRadialProgressCard
                icon="iconsminds-male"
                title={`4 ${messages['dashboards.orders']}`}
                detail={messages['dashboards.on-approval-process']}
                percent={(4 * 100) / 6}
                progressText="4/6"
              />
            </Colxx>
            <Colxx lg="4" xl="12" className="mb-4">
              <GradientWithRadialProgressCard
                icon="iconsminds-bell"
                title={`8 ${messages['dashboards.alerts']}`}
                detail={messages['dashboards.waiting-for-notice']}
                percent={(8 * 100) / 10}
                progressText="8/10"
              />
            </Colxx>
          </Row>
        </Colxx>
        <Colxx lg="6" md="6" xl="4" sm="12" className="mb-4">
          <AdvancedSearch messages={messages} />
        </Colxx>
        <Colxx lg="6" xl="4" className="mb-4">
          <SmallLineCharts />
          <TopRatedItems />
        </Colxx>
      </Row> */}
    </> 
  );
};
export default injectIntl(DefaultDashboard);
