import React, { useState } from 'react';
import './Scaffold.css'
import Main from "../Main/Main";
import SideBar from "../SideBar/SideBar";
import {Menu, MenuItem, SidebarContent, SubMenu} from "react-pro-sidebar";
import {FaBars, FaGem, FaHeart, FaList, FaRegLaughWink, FaTachometerAlt} from "react-icons/fa";
import {useIntl} from "react-intl";
import SideNavigation from "../SideNavigation/SideNavigation";
import {SiOpenstreetmap} from "react-icons/si";
import Switch from "react-switch";
import {RiStickyNoteFill} from "react-icons/ri";
import {TiWeatherCloudy} from "react-icons/ti";
import {FiDatabase} from "react-icons/fi";
import Map from "../Map/Map";

const Scaffold = ({setLocale}) => {
    const intl = useIntl();
    const [rtl, setRtl] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [image, setImage] = useState(true);
    const [toggled, setToggled] = useState(false);

    const handleCollapsedChange = (checked) => {
        setCollapsed(checked);
    };

    const handleRtlChange = (checked) => {
        setRtl(checked);
        setLocale(checked ? 'ar' : 'en');
    };
    const handleImageChange = (checked) => {
        setImage(checked);
    };

    const handleToggleSidebar = (value) => {
        setToggled(value);
    };



    return (
        <div className={`app ${rtl ? 'rtl' : ''} ${toggled ? 'toggled' : ''}`}>
            {/*<SideBar*/}
            {/*    image={image}*/}
            {/*    collapsed={collapsed}*/}
            {/*    rtl={rtl}*/}
            {/*    toggled={toggled}*/}
            {/*    handleToggleSidebar={handleToggleSidebar}*/}
            {/*>*/}

            {/*</SideBar>*/}

            <SideNavigation

                image={image}
                collapsed={collapsed}
                rtl={rtl}
                toggled={toggled}
                handleToggleSidebar={handleToggleSidebar}
                style={"side-navigation"}
            >


                <Menu >
                    <SubMenu
                        title={intl.formatMessage({ id: 'progetti' })}
                        icon={
                            <SiOpenstreetmap

                            />
                        }
                    >
                        <MenuItem>{intl.formatMessage({ id: 'submenu' })} 1</MenuItem>
                        <MenuItem>{intl.formatMessage({ id: 'submenu' })} 2</MenuItem>
                        <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3</MenuItem>
                    </SubMenu>
                    <SubMenu
                        title={intl.formatMessage({ id: 'note' })}
                        icon={
                            <RiStickyNoteFill

                            />
                        }
                    >
                        <MenuItem>{intl.formatMessage({ id: 'submenu' })} 1</MenuItem>
                        <MenuItem>{intl.formatMessage({ id: 'submenu' })} 2</MenuItem>
                        <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3</MenuItem>
                    </SubMenu>
                    <SubMenu
                        title={intl.formatMessage({ id: 'dati' })}
                        icon={
                            <FiDatabase

                            />
                        }
                    >
                        <MenuItem>{intl.formatMessage({ id: 'submenu' })} 1</MenuItem>
                        <MenuItem>{intl.formatMessage({ id: 'submenu' })} 2</MenuItem>
                        <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3</MenuItem>
                    </SubMenu>
                </Menu>


            </SideNavigation>

            <SideBar
                image={image}
                collapsed={collapsed}
                rtl={rtl}
                toggled={toggled}
                handleToggleSidebar={handleToggleSidebar}
                handleCollapsedChange={handleCollapsedChange}
                style={"custom-sidebar"}
            />

            <Main
                image={image}
                toggled={toggled}
                collapsed={collapsed}
                rtl={rtl}
                handleToggleSidebar={handleToggleSidebar}
                handleCollapsedChange={handleCollapsedChange}
                handleRtlChange={handleRtlChange}
                handleImageChange={handleImageChange}
            >
                <Map></Map>
                {/*<div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>*/}
                {/*    <FaBars />*/}
                {/*</div>*/}
                {/*<header>*/}
                {/*    <p>{intl.formatMessage({ id: 'description' })}</p>*/}
                {/*    <div className="social-bagdes">*/}
                {/*        <a*/}
                {/*            href="https://github.com/azouaoui-med/react-pro-sidebar"*/}
                {/*            target="_blank"*/}
                {/*            rel="noopener noreferrer"*/}
                {/*        >*/}
                {/*            <img*/}
                {/*                alt="GitHub stars"*/}
                {/*                src="https://img.shields.io/github/stars/azouaoui-med/react-pro-sidebar?style=social"*/}
                {/*            />*/}
                {/*        </a>*/}
                {/*        <a*/}
                {/*            href="https://github.com/azouaoui-med/react-pro-sidebar"*/}
                {/*            target="_blank"*/}
                {/*            rel="noopener noreferrer"*/}
                {/*        >*/}
                {/*            <img*/}
                {/*                alt="GitHub forks"*/}
                {/*                src="https://img.shields.io/github/forks/azouaoui-med/react-pro-sidebar?style=social"*/}
                {/*            />*/}
                {/*        </a>*/}
                {/*    </div>*/}
                {/*</header>*/}
                {/*<div className="block">*/}
                {/*    <Switch*/}
                {/*        height={16}*/}
                {/*        width={30}*/}
                {/*        checkedIcon={false}*/}
                {/*        uncheckedIcon={false}*/}
                {/*        onChange={handleCollapsedChange}*/}
                {/*        checked={collapsed}*/}
                {/*        onColor="#219de9"*/}
                {/*        offColor="#bbbbbb"*/}
                {/*    />*/}
                {/*    <span> {intl.formatMessage({ id: 'collapsed' })}</span>*/}
                {/*</div>*/}
                {/*<div className="block">*/}
                {/*    <Switch*/}
                {/*        height={16}*/}
                {/*        width={30}*/}
                {/*        checkedIcon={false}*/}
                {/*        uncheckedIcon={false}*/}
                {/*        onChange={handleRtlChange}*/}
                {/*        checked={rtl}*/}
                {/*        onColor="#219de9"*/}
                {/*        offColor="#bbbbbb"*/}
                {/*    />*/}
                {/*    <span> {intl.formatMessage({ id: 'rtl' })}</span>*/}
                {/*</div>*/}
                {/*<div className="block">*/}
                {/*    <Switch*/}
                {/*        height={16}*/}
                {/*        width={30}*/}
                {/*        checkedIcon={false}*/}
                {/*        uncheckedIcon={false}*/}
                {/*        onChange={handleImageChange}*/}
                {/*        checked={image}*/}
                {/*        onColor="#219de9"*/}
                {/*        offColor="#bbbbbb"*/}
                {/*    />*/}
                {/*    <span> {intl.formatMessage({ id: 'image' })}</span>*/}
                {/*</div>*/}
                {/*<footer>*/}
                {/*    <small>*/}
                {/*        © 2020 made with <FaHeart style={{ color: 'red' }} /> by -{' '}*/}
                {/*        <a target="_blank" rel="noopener noreferrer" href="https://azouaoui.netlify.com">*/}
                {/*            Mohamed Azouaoui*/}
                {/*        </a>*/}
                {/*    </small>*/}
                {/*    <br />*/}
                {/*    <div className="social-bagdes">*/}
                {/*        <a href="https://github.com/azouaoui-med" target="_blank" rel="noopener noreferrer">*/}
                {/*            <img*/}
                {/*                alt="GitHub followers"*/}
                {/*                src="https://img.shields.io/github/followers/azouaoui-med?label=github&style=social"*/}
                {/*            />*/}
                {/*        </a>*/}
                {/*        <a href="https://twitter.com/azouaoui_med" target="_blank" rel="noopener noreferrer">*/}
                {/*            <img*/}
                {/*                alt="Twitter Follow"*/}
                {/*                src="https://img.shields.io/twitter/follow/azouaoui_med?label=twitter&style=social"*/}
                {/*            />*/}
                {/*        </a>*/}
                {/*    </div>*/}
                {/*</footer>*/}
            </Main>
        </div>
    );
}

export default Scaffold;
