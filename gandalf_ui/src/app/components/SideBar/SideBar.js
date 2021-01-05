import React, {Fragment, useState} from "react";

import { useIntl } from 'react-intl';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import {HiMenuAlt1} from "react-icons/hi";
import Row from "react-bootstrap/Row";
import {BiLayerPlus} from "react-icons/bi";
import {MdEdit} from "react-icons/md";
import Button from "react-bootstrap/Button";
import {AiOutlinePlus} from "react-icons/ai";
import AddLayersModal from "../AddLayersModal/AddLayersModal";

const SideBar = ({ image, collapsed, rtl, toggled, handleToggleSidebar, handleCollapsedChange, children, style }) => {
    const intl = useIntl();
    const [collapse, setCollapse] = useState(true);
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <ProSidebar
            rtl={rtl}
            toggled={toggled}
            breakPoint="md"
            onToggle={handleToggleSidebar}
            className={style}
        >
            <SidebarHeader>
                <div
                    style={{
                        // textTransform: 'uppercase',
                        letterSpacing: '1px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    <Row
                        style={{
                            position: "relative",
                            flex: "0 0 auto",
                            padding: "0 15px",
                            minHeight: "50px"
                        }}
                    >
                        <HiMenuAlt1
                            onClick={() => {
                                setCollapse(!collapse);
                                handleCollapsedChange(collapse);
                            }}
                            style={{
                                position: "absolute",
                                left: "30px",
                                top: "15px",
                                cursor: "pointer",
                                color: "black",
                                fontSize: "22px"
                            }}
                        />
                        <div style={{

                            alignItems: "center",
                            minHeight: "50px",
                            textAlign: "center",
                            display: "inline-grid",
                            width: "100%",
                            fontSize: "15px"
                        }}>


                            {intl.formatMessage({ id: 'layer' })}

                        </div>
                        <MdEdit
                            style={{
                                position: "absolute",
                                right: "30px",
                                top: "15px",
                                cursor: "pointer",
                                color: "black",
                                fontSize: "22px"
                            }}
                        />
                    </Row>
                </div>
            </SidebarHeader>

            <SidebarContent>
                {children}
                {/*<Menu iconShape="circle">*/}
                {/*    <MenuItem*/}
                {/*        icon={<FaTachometerAlt />}*/}
                {/*        suffix={<span className="badge red">{intl.formatMessage({ id: 'new' })}</span>}*/}
                {/*    >*/}
                {/*        {intl.formatMessage({ id: 'dashboard' })}*/}
                {/*    </MenuItem>*/}
                {/*    <MenuItem icon={<FaGem />}> {intl.formatMessage({ id: 'components' })}</MenuItem>*/}
                {/*</Menu>*/}
                {/*<Menu iconShape="circle">*/}
                {/*    <SubMenu*/}
                {/*        suffix={<span className="badge yellow">3</span>}*/}
                {/*        title={intl.formatMessage({ id: 'withSuffix' })}*/}
                {/*        icon={<FaRegLaughWink />}*/}
                {/*    >*/}
                {/*        <MenuItem>{intl.formatMessage({ id: 'submenu' })} 1</MenuItem>*/}
                {/*        <MenuItem>{intl.formatMessage({ id: 'submenu' })} 2</MenuItem>*/}
                {/*        <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3</MenuItem>*/}
                {/*    </SubMenu>*/}
                {/*    <SubMenu*/}
                {/*        prefix={<span className="badge gray">3</span>}*/}
                {/*        title={intl.formatMessage({ id: 'withPrefix' })}*/}
                {/*        icon={<FaHeart />}*/}
                {/*    >*/}
                {/*        <MenuItem>{intl.formatMessage({ id: 'submenu' })} 1</MenuItem>*/}
                {/*        <MenuItem>{intl.formatMessage({ id: 'submenu' })} 2</MenuItem>*/}
                {/*        <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3</MenuItem>*/}
                {/*    </SubMenu>*/}
                {/*    <SubMenu title={intl.formatMessage({ id: 'multiLevel' })} icon={<FaList />}>*/}
                {/*        <MenuItem>{intl.formatMessage({ id: 'submenu' })} 1 </MenuItem>*/}
                {/*        <MenuItem>{intl.formatMessage({ id: 'submenu' })} 2 </MenuItem>*/}
                {/*        <SubMenu title={`${intl.formatMessage({ id: 'submenu' })} 3`}>*/}
                {/*            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3.1 </MenuItem>*/}
                {/*            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3.2 </MenuItem>*/}
                {/*            <SubMenu title={`${intl.formatMessage({ id: 'submenu' })} 3.3`}>*/}
                {/*                <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3.3.1 </MenuItem>*/}
                {/*                <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3.3.2 </MenuItem>*/}
                {/*                <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3.3.3 </MenuItem>*/}
                {/*            </SubMenu>*/}
                {/*        </SubMenu>*/}
                {/*    </SubMenu>*/}
                {/*</Menu>*/}
            </SidebarContent>

            <SidebarFooter style={{ textAlign: 'center' }}>
                <div
                    className="sidebar-btn-wrapper"
                    style={{
                        padding: '20px 24px',
                    }}
                >
                    {/*<a*/}
                    {/*    href="https://github.com/azouaoui-med/react-pro-sidebar"*/}
                    {/*    target="_blank"*/}
                    {/*    className="sidebar-btn"*/}
                    {/*    rel="noopener noreferrer"*/}
                    {/*>*/}
                    {/*    <FaGithub />*/}
                    {/*    <span> {intl.formatMessage({ id: 'addLayers' })}</span>*/}
                    {/*</a>*/}

                    <Button onClick={() => setModalShow(true)} block size="lg" variant="success" style={{fontSize: "18px"}}>  <AiOutlinePlus/> {intl.formatMessage({ id: 'addLayers' })}</Button>{' '}
                </div>
            </SidebarFooter>
            <AddLayersModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </ProSidebar>
    );
};

export default SideBar;
