import React from 'react';
import AreaManagementMain from './d-AreaManagementMain';
import LeftNav from './d-LeftNav';



const AreaManagement = (props) => {
    
    return (
        <React.Fragment>
            
            <div className="container-fluid">
                <div className="row">
                    <LeftNav />
                    <AreaManagementMain />

                </div>
                {/* row 的div end */}
            </div>
            {/* container-fluid 的 div end */}
        </React.Fragment>
    );
}

export default AreaManagement;