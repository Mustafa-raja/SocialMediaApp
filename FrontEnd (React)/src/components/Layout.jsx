import React from "react";
import { Outlet } from "react-router-dom";

class Layout extends React.PureComponent {
    render() {
        return (
            <div style={{ height: "100vh", width: "100vw", margin: 0, padding: 0 }}>
                <Outlet />
            </div>
        );
    }
}

export default Layout;
