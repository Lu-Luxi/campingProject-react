import React from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import '../css/base.css';

const MemberCalendar = (props) => {

    return (
        <React.Fragment>
            {/* <!-- 我的行事曆 --> */}
            <div className="col-3 mt-5" style={{ height: "55px" }}>
                {/* <!-- 行事曆標題 --> */}
                <div className="d-flex align-items-center">
                    <h4 className="mb-2 font-weight-bold" style={{ letterSpacing: 2 }}>我的行事曆</h4>
                </div>

                {/* <!-- 行事曆本體 --> */}
                <div className="shadow-sm " >
                    <Calendar className="rounded border-0 " tileClassName="" style={{ height: "50%" }} calendarType="US" />
                </div>
                {/* <!-- 行事曆本體結束 --> */}
            </div>
            {/* <!-- 我的行事曆結束 --> */}
        </React.Fragment>
    );
}


export default MemberCalendar;