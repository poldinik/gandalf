import React, {Fragment} from "react";

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

const SideNavigation = ({ image, collapsed, rtl, toggled, handleToggleSidebar, children, style }) => {
    const intl = useIntl();
    return (
        <ProSidebar
            rtl={rtl}
            collapsed={collapsed}
            toggled={toggled}
            breakPoint="md"
            onToggle={handleToggleSidebar}
            className={style}
        >
            <SidebarHeader>
                <div
                    style={{
                        padding: '24px',
                        // textTransform: 'uppercase',
                        fontWeight: '700',
                        fontSize: 22,
                        letterSpacing: '0px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        textAlign: 'center',
                        color: "#28a745"
                    }}
                >
                    {intl.formatMessage({ id: 'title' })}
                </div>
            </SidebarHeader>

            <SidebarContent>
                {children}
            </SidebarContent>

            <SidebarFooter style={{ textAlign: 'center' }}>
                <div
                    className="sidebar-btn-wrapper"
                    style={{
                        padding: '20px 24px',
                    }}
                >
                    <a
                        href="https://github.com/azouaoui-med/react-pro-sidebar"
                        target="_blank"
                        className="sidebar-btn"
                        rel="noopener noreferrer"
                    >
                        <FaGithub />
                        <span> {intl.formatMessage({ id: 'viewSource' })}</span>
                    </a>
                </div>
            </SidebarFooter>
        </ProSidebar>
    );
};

export default SideNavigation;
