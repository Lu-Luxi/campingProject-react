import React from 'react';

import '../css/base.css';
import '../css/index.css';
import '../css/camp_intro.css';

const IntroduceGoogleMap = (props) => {

    return (
        <React.Fragment>
            {/* <section id="camp-map-link" className=""> */}
            <div className="mt-0" >
                <div id="camp-map-wrapper " className="card mt-2 mb-3 border-0 ">
                    <div className="card-body" style={{
                        position: "relative", width: "100%"
                    }}>

                        <section id="camp-map-link" style={{ display: "block", position: "absolute", top: "-66px", height: 600 }}></section>

                        < h3 className="card-title font-weight-bold" > 地圖</h3>

                        {/* <iframe width="100%" height="450" frameBorder="0" style={{ border: 0 }} title="googleMap"
                            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBEW6YRdLNQ7JxZaiMhcNqlcxHkwNpHz-M&q=Payan露營區"
                            allowFullScreen>
                        </iframe> */}

                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3642.739379378849!2d120.87499601435017!3d24.075480684430133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3469208a16295be1%3A0x6d3fa1d70731d34!2z5bGx5bWQ6KyQ6Z2c!5e0!3m2!1szh-TW!2stw!4v1606786499085!5m2!1szh-TW!2stw" width="100%" height="450" frameBorder="0" style={{ border: "0" }} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>

                    </div>
                </div>
            </div>
            {/* </section> */}
        </React.Fragment >
    );
}

export default IntroduceGoogleMap;