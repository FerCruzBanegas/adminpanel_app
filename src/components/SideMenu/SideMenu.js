import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './SideMenu.css';
import bt from '../../components/commonStyle.css';
import { Nav, Navbar, Collapse, Button } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../locale/messages';
import cx from 'classnames';
import Link from '../Link';
import { adminLogout } from '../../actions/siteadmin/logout';
import { openHeaderModal } from '../../actions/siteadmin/modalActions';
import { connect } from 'react-redux';
import { flowRight as compose } from 'lodash';

//Images
import DashboardIcon from '../../../public/SideMenuIcons/analytics.svg';
import SiteSettingIcon from '../../../public/SideMenuIcons/siteSetting.svg';
import mobileAppIcon from '../../../public/SideMenuIcons/mobileSetting.svg';
import HomeSettingIcon from '../../../public/SideMenuIcons/homePageSetting.svg';
import ManageAdmins from '../../../public/SideMenuIcons/manageAdmin.svg';
import UserIcon from '../../../public/SideMenuIcons/manageUser.svg';
import ServiceProviderIcon from '../../../public/SideMenuIcons/manageServiceProvider.svg';
import CategoriesIcon from '../../../public/SideMenuIcons/mangeCategory.svg';
import ManageLocationIcon from '../../../public/SideMenuIcons/location.svg';

import BookingsIcon from '../../../public/SideMenuIcons/manageBookings.svg';
import PromoCodeIcon from '../../../public/SideMenuIcons/managePromoCode.svg';
import CompletedBooking from '../../../public/SideMenuIcons/completeBookings.svg';
import ChangePasswordIcon from '../../../public/SideMenuIcons/changePassword.svg';
import CancalBookingIcon from '../../../public/SideMenuIcons/cancelledBooking.svg';
import ManageCurrencyIcon from '../../../public/SideMenuIcons/manageCurrency.svg';
import RatingIcon from '../../../public/SideMenuIcons/ratings.svg';
import NotificationIcon from '../../../public/SideMenuIcons/manageNotification.svg';
import LogOutIcon from '../../../public/Icons/logout.svg';
import MainSiteIcon from '../../../public/Icons/mainSite.svg';
import PayOutManageIcon from '../../../public/SideMenuIcons/managePayout.svg';
import PayOutManageFaildIcon from '../../../public/SideMenuIcons/failedPayout.svg';
import CancelFaildIcon from '../../../public/SideMenuIcons/cancelReason.svg';
import StaticPageIcon from '../../../public/SideMenuIcons/contentManagement.svg';
import RightArrowIcon from '../../../public/Icons/right-arrow.png';
import ManageFareIcon from '../../../public/SideMenuIcons/manageFare.svg';
import LanguageIcon from '../../../public/Icons/languageIcon.svg';
import PrecautionIcon from '../../../public/SideMenuIcons/precautionNotification.svg';
import TrackingIcon from '../../../public/SideMenuIcons/tracking.svg';
import smsIcon from '../../../public/Icons/smsIcon.svg';

import history from '../../history'
import { validatePrivilege } from '../../helpers/adminPrivileges';
import { formatLocale } from '../../helpers/formatLocale';
import * as FontAwesome from 'react-icons/lib/fa';

class SideMenu extends React.Component {
  static defaultProps = {
    isSuperAdmin: false,
    privileges: []
  };
  constructor(props) {
    super(props);
    this.state = {
      isOpen: 0,
      location: '',
      homepageSettings: false
    }
    this.openMenu = this.openMenu.bind(this);
    this.openClose = this.openClose.bind(this);
  }
  componentDidMount() {
    this.setState({
      location: history.location.pathname
    })
  }
  componentDidUpdate(prevProps, prevState) {
    const { location } = this.props;
    if (prevState.location !== location) {
      this.setState({
        location
      })
    }
  }
  async openMenu() {
    this.setState({
      isOpen: 1,
    })
  }
  async openClose() {
    this.setState({
      isOpen: 0,
    })
  }
  render() {
    const { location } = this.state;
    const { adminLogout, isSuperAdmin, privileges, currentLocale, openHeaderModal } = this.props;
    let homePageSettingsArray = ['/siteadmin/homepage/banner', '/siteadmin/homepage/category', '/siteadmin/homepage/topfeature', '/siteadmin/homepage/user', '/siteadmin/homepage/partner', '/siteadmin/homepage/footer'];
    let manageAdminsLinks = ['/siteadmin/admin-users', '/siteadmin/admin-roles'];

    return (
      <div className={s.sideMenuBg}>
        <div className={s.siteAdminHeader}>
          <span><FormattedMessage {...messages.siteAdmin} /></span>
        </div>
        <div className={cx(s.sideMenuList, 'sideMenu', 'sideMenuScroll')}>
          <div>
            <Link to={''} onClick={() => adminLogout()} className={cx(s.logoutIconMobile, 'd-block d-md-none', 'logoutIconMobileRTL')}>
              <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                <img src={LogOutIcon} className={cx(s.sideMenuIcon)} />
              </span>
            </Link>
          </div>
          <Navbar expand="lg">
            <div onClick={() => this.openMenu()}>
              <div className="nav-container">
                <div className={cx("button  d-block d-md-none")} tabIndex="0">
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </div>
              </div>
            </div>
            <div className={cx({ [s.menuOpen]: this.state.isOpen == 1 }, s.mobileMenu)}>
              <div className={cx({ [s.menuClose]: this.state.isOpen == 0 }, s.rightMenuClose, 'd-block d-md-none')}>
                <div className={cx(s.closeColor, 'closeColorRTL')} onClick={() => this.openClose()} >
                  ×
                </div>
              </div>
              <Nav className="mr-auto">
                <Link noLink onClick={(e) => openHeaderModal('languageModal')} className={cx(s.sideNavitem, s.displayTable, bt.spaceTop2, s.responsiveDasboradMargin, 'd-block d-md-none', s.languageSelector, 'sideNavitemRTL')}>
                  <span className={cx(s.languageIcon, s.displayTableCell)}>
                    <img src={LanguageIcon} className={cx(s.sideMenuIcon)} />
                  </span>
                  <span className={cx(s.vtrMiddle, s.displayTableCell, s.languageIconLeft)}>
                    {formatLocale(currentLocale)}
                  </span>
                </Link>
                <Link to={'/siteadmin'} className={cx(s.sideNavitem, s.displayTable, 'sideNavitemRTL', { [s.activeMenu]: location == '/siteadmin' })} onClick={() => this.openClose()}>
                  <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                    <img src={DashboardIcon} className={s.sideMenuIcon} />
                  </span>
                  <span className={cx(s.vtrMiddle, s.displayTableCell, 'textAlignRightRTL')}>
                    <FormattedMessage {...messages.manageDashboard} />
                  </span>
                </Link>
                {
                  validatePrivilege(1, privileges) &&
                  <Link to={'/siteadmin/settings/site'} className={cx(s.sideNavitem, s.displayTable, 'sideNavitemRTL', { [s.activeMenu]: location === '/siteadmin/settings/site' })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={SiteSettingIcon} className={cx(s.sideMenuIcon)} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell, 'textAlignRightRTL')}>
                      <FormattedMessage {...messages.siteSettings} />
                    </span>
                  </Link>
                }
                {
                  validatePrivilege(1, privileges) &&
                  <Link to={'/siteadmin/settings/mobile-app'} className={cx(s.sideNavitem, s.displayTable, 'sideNavitemRTL', { [s.activeMenu]: location === '/siteadmin/settings/mobile-app' })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={mobileAppIcon} className={cx(s.sideMenuIcon)} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell, 'textAlignRightRTL')}>
                      <FormattedMessage {...messages.mobileSettings} />
                    </span>
                  </Link>
                }
                {
                  validatePrivilege(2, privileges) &&
                  <div>
                    <div id='Homepage' className={cx(
                      { [s.activeMenu]: homePageSettingsArray.includes(location) })}>
                      <Button
                        bsStyle="link"
                        className={cx(s.button, s.noBorderBtn, s.btnWidth, s.sideNavitem, s.positionRelative, 'sideNavitemRTL', 'btnWidthRTL', { [s.activeMenu]: homePageSettingsArray.includes(location) })}
                        onClick={() => {
                          this.setState({
                            homepageSettings: !this.state.homepageSettings
                          })
                          // let element = document.getElementById("Homepage")
                          // element.classList.add(s.activeMenu);
                        }
                        }>
                        <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                          <img src={HomeSettingIcon} className={cx(s.sideMenuIcon)} />
                        </span>
                        <span className={cx(s.vtrMiddle, s.displayTableCell, 'textAlignRightRTL')}>
                          <FormattedMessage {...messages.HomeSiteSettings} />
                        </span>
                        {
                          this.state.homepageSettings &&
                          <div className={cx(s.displayInlineBlock, s.downArrow, 'downArrowRTL')}>
                            <FontAwesome.FaAngleUp className={s.navigationIcon} />
                          </div>
                        }

                        {
                          !this.state.homepageSettings && <div className={cx(s.displayInlineBlock, s.downArrow, 'downArrowRTL')}><FontAwesome.FaAngleDown className={s.navigationIcon} /></div>
                        }
                      </Button>
                    </div>
                    <Collapse in={this.state.homepageSettings}>
                      <div>
                        <Link to={'/siteadmin/homepage/banner'} className={cx(s.sideNavitem, s.displayTable, s.sideNavitemCollapsePadding, 'sideNavitemRTL', { [s.activeMenu]: location.startsWith('/siteadmin/homepage/banner') })} onClick={() => this.openClose()}>
                          <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell, s.sideNavitemCollapse, 'rightArrowRTL')}>
                            <img src={RightArrowIcon} className={cx(s.sideMenuIcon, s.sideNavitemCollapseIcon)} />
                          </span>
                          <span className={cx(s.vtrMiddle, s.sideNavitemCollapseText, s.displayTableCell, 'textAlignRightRTL')}>
                            <FormattedMessage {...messages.homeSectionSettings} />
                          </span>
                        </Link>
                        <Link to={'/siteadmin/homepage/category'} className={cx(s.sideNavitem, s.displayTable, s.sideNavitemCollapsePadding, 'sideNavitemRTL', { [s.activeMenu]: location.startsWith('/siteadmin/homepage/category') })} onClick={() => this.openClose()}>
                          <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell, s.sideNavitemCollapse, 'rightArrowRTL')}>
                            <img src={RightArrowIcon} className={cx(s.sideMenuIcon, s.sideNavitemCollapseIcon)} />
                          </span>
                          <span className={cx(s.vtrMiddle, s.sideNavitemCollapseText, s.displayTableCell, 'textAlignRightRTL')}>
                            <FormattedMessage {...messages.citySectionSettings} />
                          </span>
                        </Link>
                        <Link to={'/siteadmin/homepage/topfeature'} className={cx(s.sideNavitem, s.displayTable, s.sideNavitemCollapsePadding, 'sideNavitemRTL', { [s.activeMenu]: location.startsWith('/siteadmin/homepage/topfeature') })} onClick={() => this.openClose()}>
                          <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell, s.sideNavitemCollapse, 'rightArrowRTL')}>
                            <img src={RightArrowIcon} className={cx(s.sideMenuIcon, s.sideNavitemCollapseIcon)} />
                          </span>
                          <span className={cx(s.vtrMiddle, s.sideNavitemCollapseText, s.displayTableCell, 'textAlignRightRTL')}>
                            <FormattedMessage {...messages.aboutSectionSettings} />
                          </span>
                        </Link>
                        <Link to={'/siteadmin/homepage/user'} className={cx(s.sideNavitem, s.displayTable, s.sideNavitemCollapsePadding, 'sideNavitemRTL', { [s.activeMenu]: location.startsWith('/siteadmin/homepage/user') })} onClick={() => this.openClose()}>
                          <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell, s.sideNavitemCollapse, 'rightArrowRTL')}>
                            <img src={RightArrowIcon} className={cx(s.sideMenuIcon, s.sideNavitemCollapseIcon)} />
                          </span>
                          <span className={cx(s.vtrMiddle, s.sideNavitemCollapseText, s.displayTableCell, 'textAlignRightRTL')}>
                            <FormattedMessage {...messages.safetySectionSettings} />
                          </span>
                        </Link>
                        <Link to={'/siteadmin/homepage/partner'} className={cx(s.sideNavitem, s.displayTable, s.sideNavitemCollapsePadding, 'sideNavitemRTL', { [s.activeMenu]: location.startsWith('/siteadmin/homepage/partner') })} onClick={() => this.openClose()}>
                          <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell, s.sideNavitemCollapse, 'rightArrowRTL')}>
                            <img src={RightArrowIcon} className={cx(s.sideMenuIcon, s.sideNavitemCollapseIcon)} />
                          </span>
                          <span className={cx(s.vtrMiddle, s.sideNavitemCollapseText, s.displayTableCell, 'textAlignRightRTL')}>
                            <FormattedMessage {...messages.signupSectionSettings} />
                          </span>
                        </Link>
                        <Link to={'/siteadmin/homepage/footer'} className={cx(s.sideNavitem, s.displayTable, s.sideNavitemCollapsePadding, 'sideNavitemRTL', { [s.activeMenu]: location.startsWith('/siteadmin/homepage/footer') })} onClick={() => this.openClose()}>
                          <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell, s.sideNavitemCollapse, 'rightArrowRTL')}>
                            <img src={RightArrowIcon} className={cx(s.sideMenuIcon, s.sideNavitemCollapseIcon)} />
                          </span>
                          <span className={cx(s.vtrMiddle, s.sideNavitemCollapseText, s.displayTableCell, 'textAlignRightRTL')}>
                            <FormattedMessage {...messages.footerSectionSettings} />
                          </span>
                        </Link>
                      </div>
                    </Collapse>
                  </div>
                }
                {isSuperAdmin && <div>
                  <div id='Homepage' className={cx({ [s.activeMenu]: manageAdminsLinks.includes(location) })}>
                    <Button bsStyle="link" className={cx(s.button, s.noBorderBtn, s.btnWidth, s.sideNavitem, s.positionRelative, 'sideNavitemRTL', 'btnWidthRTL', { [s.activeMenu]: manageAdminsLinks.includes(location) })}
                      onClick={() => {
                        this.setState({
                          subAdmin: !this.state.subAdmin
                        })
                        // let element = document.getElementById("Homepage")
                        // element.classList.add(s.activeMenu);
                      }
                      }>
                      <span className={cx(s.vtrTop, s.iconWidth, s.iconWidth, s.displayTableCell)}>
                        <img src={ManageAdmins} className={cx(s.sideMenuIcon)} />
                      </span>
                      <span className={cx(s.vtrMiddle, s.displayTableCell, 'textAlignRightRTL')}>
                        <FormattedMessage {...messages.manageAdmin} />
                      </span>
                      {
                        this.state.subAdmin &&
                        <div className={cx(s.displayInlineBlock, s.downArrow, 'downArrowRTL')}>
                          <FontAwesome.FaAngleUp className={s.navigationIcon} />
                        </div>
                      }

                      {
                        !this.state.subAdmin && <div className={cx(s.displayInlineBlock, s.downArrow, 'downArrowRTL')}><FontAwesome.FaAngleDown className={s.navigationIcon} /></div>
                      }
                    </Button>
                  </div>
                  <Collapse in={this.state.subAdmin} className={s.subMenu}>
                    <div>
                      <Link to={'/siteadmin/admin-users'} className={cx(s.sideNavitem, s.displayTable, s.sideNavitemCollapsePadding, 'sideNavitemRTL', { [s.activeMenu]: location.startsWith('/siteadmin/admin-users') })} onClick={() => this.openClose()}>
                        <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell, s.sideNavitemCollapse, 'rightArrowRTL')}>
                          <img src={RightArrowIcon} className={cx(s.sideMenuIcon, s.sideNavitemCollapseIcon)} />
                        </span>
                        <span className={cx(s.vtrMiddle, s.sideNavitemCollapseText, s.displayTableCell, 'textAlignRightRTL')}>
                          <FormattedMessage {...messages.manageAdminUsers} />
                        </span>
                      </Link>

                      <Link to={'/siteadmin/admin-roles'} className={cx(s.sideNavitem, s.displayTable, s.sideNavitemCollapsePadding, 'sideNavitemRTL', { [s.activeMenu]: location.startsWith('/siteadmin/admin-roles') })} onClick={() => this.openClose()}>
                        <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell, s.sideNavitemCollapse, 'rightArrowRTL')}>
                          <img src={RightArrowIcon} className={cx(s.sideMenuIcon, s.sideNavitemCollapseIcon)} />
                        </span>
                        <span className={cx(s.vtrMiddle, s.sideNavitemCollapseText, s.displayTableCell, 'textAlignRightRTL')}>
                          <FormattedMessage {...messages.manageAdminRoles} />
                        </span>
                      </Link>
                    </div>
                  </Collapse>
                </div>
                }
                {
                  validatePrivilege(3, privileges) &&
                  <Link to={'/siteadmin/users'} className={cx(s.sideNavitem, s.displayTable, 'sideNavitemRTL', 'menuIconRTL', { [s.activeMenu]: location.startsWith('/siteadmin/users') })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={UserIcon} className={s.sideMenuIcon} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell, 'textAlignRightRTL')}>
                      <FormattedMessage {...messages.usersMenu} />
                    </span>
                  </Link>}
                {
                  validatePrivilege(4, privileges) &&
                  <Link to={'/siteadmin/partners'} className={cx(s.sideNavitem, s.displayTable, 'sideNavitemRTL', 'menuIconRTL', { [s.activeMenu]: location.startsWith('/siteadmin/partners') })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={ServiceProviderIcon} className={s.sideMenuIcon} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell, 'textAlignRightRTL')}>
                      <FormattedMessage {...messages.partnerMenu} />
                    </span>
                  </Link>}
                {
                  validatePrivilege(5, privileges) &&
                  <Link to={'/siteadmin/category'} className={cx(s.sideNavitem, s.displayTable, 'sideNavitemRTL', { [s.activeMenu]: location.startsWith('/siteadmin/category') })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={CategoriesIcon} className={s.sideMenuIcon} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell, 'textAlignRightRTL')}>
                      <FormattedMessage {...messages.categoryMenu} />
                    </span>
                  </Link>}
                {
                  validatePrivilege(6, privileges) &&
                  <Link to={'/siteadmin/sub-category'} className={cx(s.sideNavitem, s.displayTable, 'sideNavitemRTL', { [s.activeMenu]: location.startsWith('/siteadmin/sub-category') })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={CategoriesIcon} className={s.sideMenuIcon} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell, 'textAlignRightRTL')}>
                      <FormattedMessage {...messages.subCategoryMenu} />
                    </span>
                  </Link>}
                {
                  validatePrivilege(7, privileges) &&
                  <Link to={'/siteadmin/location'} className={cx(s.sideNavitem, s.displayTable, 'sideNavitemRTL', { [s.activeMenu]: location.startsWith('/siteadmin/location') })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={ManageLocationIcon} className={cx(s.sideMenuIcon)} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell, 'textAlignRightRTL')}>
                      <FormattedMessage {...messages.location} />
                    </span>
                  </Link>}
                {
                  validatePrivilege(8, privileges) &&
                  <Link to={'/siteadmin/pricing/list'} className={cx(s.sideNavitem, s.displayTable, 'sideNavitemRTL', { [s.activeMenu]: location.startsWith('/siteadmin/pricing') })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={ManageFareIcon} className={cx(s.sideMenuIcon)} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell, 'textAlignRightRTL')}>
                      <FormattedMessage {...messages.manageFare} />
                    </span>
                  </Link>}
                {
                  validatePrivilege(9, privileges) &&
                  <Link to={'/siteadmin/jobs'} className={cx(s.sideNavitem, s.displayTable, 'sideNavitemRTL', { [s.activeMenu]: location.startsWith('/siteadmin/jobs') })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={BookingsIcon} className={s.sideMenuIcon} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell, 'textAlignRightRTL')}>
                      <FormattedMessage {...messages.bookingsMenu} />
                    </span>
                  </Link>
                }
                {
                  validatePrivilege(9, privileges) &&
                  <Link to={'/siteadmin/completed-jobs'} className={cx(s.sideNavitem, s.displayTable, 'sideNavitemRTL', { [s.activeMenu]: location.startsWith('/siteadmin/completed-jobs') })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={CompletedBooking} className={cx(s.sideMenuIcon)} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell, 'textAlignRightRTL')}>
                      <FormattedMessage {...messages.manageCompletedBooking} />
                    </span>
                  </Link>}
                {
                  validatePrivilege(9, privileges) &&
                  <Link to={'/siteadmin/cancelled-jobs'} className={cx(s.sideNavitem, s.displayTable, 'sideNavitemRTL', { [s.activeMenu]: location.startsWith('/siteadmin/cancelled-jobs') })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={CancalBookingIcon} className={cx(s.sideMenuIcon)} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell, 'textAlignRightRTL')}>
                      <FormattedMessage {...messages.manageCancelledBookings} />
                    </span>
                  </Link>}

                {
                  validatePrivilege(9, privileges) &&
                  <Link to={'/siteadmin/schedule-jobs'} className={cx(s.sideNavitem, s.displayTable, 'sideNavitemRTL', { [s.activeMenu]: location.startsWith('/siteadmin/schedule-jobs') })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={BookingsIcon} className={s.sideMenuIcon} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell, 'textAlignRightRTL')}>
                      <FormattedMessage {...messages.manageSchedule} />
                    </span>
                  </Link>
                }

                <Link to={'/siteadmin/tracking'} className={cx(s.sideNavitem, s.displayTable, 'sideNavitemRTL', { [s.activeMenu]: location == '/siteadmin/tracking' })} onClick={() => this.openClose()}>
                  <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                    <img src={TrackingIcon} className={cx(s.sideMenuIcon)} />
                  </span>
                  <span className={cx(s.vtrMiddle, s.displayTableCell, 'textAlignRightRTL')}>
                    <FormattedMessage {...messages.tracking} />
                  </span>
                </Link>

                <Link to={'/siteadmin/sms-methods'} className={cx(s.sideNavitem, s.displayTable, 'sideNavitemRTL', { [s.activeMenu]: location == '/siteadmin/sms-methods' })} onClick={() => this.openClose()}>
                  <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                    <img src={smsIcon} className={cx(s.sideMenuIcon)} />
                  </span>
                  <span className={cx(s.vtrMiddle, s.displayTableCell, 'textAlignRightRTL')}>
                    <FormattedMessage {...messages.manageSmsMethod} />
                  </span>
                </Link>

                {
                  validatePrivilege(11, privileges) &&
                  <Link to={'/siteadmin/ratings'} className={cx(s.sideNavitem, s.displayTable, 'sideNavitemRTL', { [s.activeMenu]: location == '/siteadmin/ratings' })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={RatingIcon} className={cx(s.sideMenuIcon)} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell, 'textAlignRightRTL')}>
                      <FormattedMessage {...messages.ratings} />
                    </span>
                  </Link>}
                {
                  validatePrivilege(12, privileges) &&
                  <Link to={'/siteadmin/promo-code/list'} className={cx(s.sideNavitem, s.displayTable, 'sideNavitemRTL', { [s.activeMenu]: location.startsWith('/siteadmin/promo-code') })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={PromoCodeIcon} className={s.sideMenuIcon} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell, 'textAlignRightRTL')}>
                      <FormattedMessage {...messages.managePromoCode} />
                    </span>
                  </Link>}
                <Link to={'/siteadmin/change/admin'} className={cx(s.sideNavitem, s.displayTable, 'sideNavitemRTL', { [s.activeMenu]: location == '/siteadmin/change/admin' })} onClick={() => this.openClose()}>
                  <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                    <img src={ChangePasswordIcon} className={cx(s.sideMenuIcon)} />
                  </span>
                  <span className={cx(s.vtrMiddle, s.displayTableCell, 'textAlignRightRTL')}>
                    <FormattedMessage {...messages.changePassword} />
                  </span>
                </Link>
                {
                  validatePrivilege(13, privileges) &&
                  <Link to={'/siteadmin/notifications'} className={cx(s.sideNavitem, s.displayTable, 'sideNavitemRTL', { [s.activeMenu]: location == '/siteadmin/notifications' })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={NotificationIcon} className={cx(s.sideMenuIcon)} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell, 'textAlignRightRTL')}>
                      <FormattedMessage {...messages.manageNotifications} />
                    </span>
                  </Link>}
                {isSuperAdmin && <Link to={'/siteadmin/currency'} className={cx(s.sideNavitem, s.displayTable, 'sideNavitemRTL', { [s.activeMenu]: location == '/siteadmin/currency' })} onClick={() => this.openClose()}>
                  <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                    <img src={ManageCurrencyIcon} className={cx(s.sideMenuIcon)} />
                  </span>
                  <span className={cx(s.vtrMiddle, s.displayTableCell, 'textAlignRightRTL')}>
                    <FormattedMessage {...messages.manageCurrency} />
                  </span>
                </Link>}
                {
                  validatePrivilege(14, privileges) &&
                  <Link to={'/siteadmin/cancel-reasons'} className={cx(s.sideNavitem, s.displayTable, 'sideNavitemRTL', { [s.activeMenu]: location.startsWith('/siteadmin/cancel-reasons') })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={CancelFaildIcon} className={cx(s.sideMenuIcon)} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell, 'textAlignRightRTL')}>
                      <FormattedMessage {...messages.manageCancelReason} />
                    </span>
                  </Link>}
                {
                  validatePrivilege(15, privileges) &&
                  <Link to={'/siteadmin/payout'} className={cx(s.sideNavitem, s.displayTable, 'sideNavitemRTL', { [s.activeMenu]: location.startsWith('/siteadmin/payout') })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={PayOutManageIcon} className={cx(s.sideMenuIcon)} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell, 'textAlignRightRTL')}>
                      <FormattedMessage {...messages.managePayout} />
                    </span>
                  </Link>}
                {
                  validatePrivilege(15, privileges) &&
                  <Link to={'/siteadmin/failed-payout'} className={cx(s.sideNavitem, s.displayTable, 'sideNavitemRTL', { [s.activeMenu]: location.startsWith('/siteadmin/failed-payout') })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={PayOutManageFaildIcon} className={cx(s.sideMenuIcon)} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell, 'textAlignRightRTL')}>
                      <FormattedMessage {...messages.manageFailedPayout} />
                    </span>
                  </Link>}
                {
                  validatePrivilege(16, privileges) &&
                  <Link to={'/siteadmin/staticpage/manage'} className={cx(s.sideNavitem, s.displayTable, 'sideNavitemRTL', { [s.activeMenu]: location.startsWith('/siteadmin/staticpage/manage') })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={StaticPageIcon} className={cx(s.sideMenuIcon)} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell, 'textAlignRightRTL')}>
                      <FormattedMessage {...messages.staticpageManagement} />
                    </span>
                  </Link>}
                {
                  validatePrivilege(17, privileges) &&
                  <Link to={'/siteadmin/contentpage/manage'} className={cx(s.sideNavitem, s.displayTable, 'sideNavitemRTL', { [s.activeMenu]: location.startsWith('/siteadmin/contentpage/manage') })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={StaticPageIcon} className={cx(s.sideMenuIcon)} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell, 'textAlignRightRTL')}>
                      <FormattedMessage {...messages.contentpageManagement} />
                    </span>
                  </Link>}
                {
                  validatePrivilege(18, privileges) &&
                  <Link to={'/siteadmin/precaution-notification'} className={cx(s.sideNavitem, s.displayTable, 'sideNavitemRTL', { [s.activeMenu]: location == '/siteadmin/precaution-notification' })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={PrecautionIcon} className={cx(s.sideMenuIcon)} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell, 'textAlignRightRTL')}>
                      <FormattedMessage {...messages.precautionNotification} />
                    </span>
                  </Link>}
                <Link to={'/'} className={cx(s.sideNavitem, 'sideNavitemRTL', s.displayTable, s.hiddenMd)} onClick={() => this.openClose()}>
                  <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                    <img src={MainSiteIcon} className={cx(s.sideMenuIcon)} />
                  </span>
                  <span className={cx(s.vtrMiddle, s.displayTableCell, 'textAlignRightRTL')}>
                    <FormattedMessage {...messages.goToMainSite} />
                  </span>
                </Link>
                <Link to={''} onClick={() => adminLogout()} className={cx(s.sideNavitem, s.displayTable, 'sideNavitemRTL', s.paddingBottomextra, s.hiddenMd)}>
                  <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                    <img src={LogOutIcon} className={cx(s.sideMenuIcon)} />
                  </span>
                  <span className={cx(s.vtrMiddle, s.displayTableCell, 'textAlignRightRTL')}>
                    <FormattedMessage {...messages.logout} />
                  </span>
                </Link>
              </Nav>
            </div>
          </Navbar>
        </div>
      </div>
    );
  }
}
const mapState = state => ({
  isSuperAdmin: state.runtime.isSuperAdmin,
  privileges: state.account && state.account.privileges,
  currentLocale: state.intl.locale,
});
const mapDispatch = {
  adminLogout,
  openHeaderModal
};
export default compose(injectIntl,
  withStyles(s, bt),
  (connect(mapState, mapDispatch))
)(SideMenu);