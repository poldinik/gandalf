import React, {Fragment} from "react";
import { useIntl } from 'react-intl';
import Switch from 'react-switch';
import { FaHeart, FaBars } from 'react-icons/fa';

const Main = ({
                  collapsed,
                  rtl,
                  image,
                  handleToggleSidebar,
                  handleCollapsedChange,
                  handleRtlChange,
                  handleImageChange,
                  children
              }) => {

    return (
        <main>
            {children}
        </main>
    );
};

export default Main;
