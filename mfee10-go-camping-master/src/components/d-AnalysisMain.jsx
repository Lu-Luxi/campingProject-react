import React from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import AnalysisArea from './d-AnalysisArea';
import AnalysisCommonRadar from './d-AnalysisCommonRadar';
import AnalysisYearSale from './d-AnalysisYearSale';

const AnalysisMain = (props) => {
    const { campId, localeSetting, startAnal, setStartAnal, endAnal, setEndAnal, analysisData } = props;
    return (
        <React.Fragment>
            <main className="col-10 my-4">
                {/* <div className="mb-4">
                    <div className="row d-flex justify-content-center h-100">
                        <div className="col-4">
                            <div className="card text-center index-info " style={{ height: 120, fontSize: 20 }}>
                                <div className="card-body ">
                                    <p className="card-title ">本月總營收</p>
                                    <p className="card-text">200,000</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card text-center index-info" style={{ height: 120, fontSize: 20 }}>
                                <div className="card-body">
                                    <p className="card-title ">營收月增率</p>
                                    營收月增率=(本月營收-上月營收)*100%
                                    <p className="card-text">10%</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card text-center index-info" style={{ height: 120, fontSize: 20 }}>
                                <div className="card-body">
                                    <p className="card-title ">評價總分</p>
                                    <p className="card-text">5星</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="row">
                    <div className="col-12">
                        {/* 各區銷售分析  */}
                        <div className="mb-5 bar-style">

                            <div className="d-flex align-items-center justify-content-between">

                                <h3 className=" pl-4  mt-3 font-weight-bold" style={{ color: "var(--darkColor)" }}>各區域銷售分析</h3>


                                <form className="pl-4 pr-1 mt-3" action="">
                                    <label className="font-text font-weight-bold" for="chooseDate" style={{ fontSize: 18 }}>選擇日期：</label>
                                    <DateRangePicker
                                        initialSettings={{
                                            autoApply: true,
                                            maxSpan: { "days": 7 },
                                            locale: localeSetting,
                                            startDate: startAnal,
                                            endDate: endAnal,
                                            minDate: "2000年01月02日",
                                            maxDate: "2020年12月31日"
                                        }}
                                        startDate={startAnal}
                                        endDate={endAnal}
                                        onApply={(e, p) => { setStartAnal(p.startDate.format('LL')); setEndAnal(p.endDate.format('LL')); }}
                                    >
                                        <input
                                            id="chooseDate"
                                            type="text"
                                            className="font-weight-bold dashboardInput"
                                            name="dates"


                                        />
                                    </DateRangePicker>
                                </form>

                            </div>



                            <div className="w-100 mt-2">
                                <AnalysisArea
                                    analysisData={analysisData}
                                />

                            </div>


                        </div>
                    </div>

                    {/* 評分雷達圖 */}
                    {/* <div className="col-5">
                        <div className="radar-style" style={{ overflow: "hidden" }}  >
                            <h6 className=" pl-4 pt-4 small-title">各項評價分析</h6>
                            <div style={{ transform: "translate(0%,30%) scale(1.3)", }}>
                                <AnalysisCommonRadar />
                            </div>
                        </div>
                    </div> */}
                    {/* 評分雷達圖結束 */}
                </div>
                {/* <!-- 年度銷售狀況線條圖 --> */}
                {/* <div className="row">
                    <div className="line-style">
                        <h6 className=" pl-4 py-4 small-title">2020年年度銷售狀況</h6>
                        <AnalysisYearSale />
                    </div>
                </div> */}
                {/* <!-- 年度銷售狀況線條圖結束 --> */}


            </main>
        </React.Fragment>
    );
}

export default AnalysisMain;