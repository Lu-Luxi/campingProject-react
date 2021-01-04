import React from 'react';

import '../css/base.css';
import '../css/index.css';
import '../css/camp_intro.css';

const IntroduceNote = (props) => {
    const { campGuide } = props;
    // console.log(props);

    return (
        <React.Fragment>
            <section id="camp-map">
                <div id="camp-map-wrapper " className="card mt-2  border-0 ">
                    <div className="card-body">
                        <h3 className="card-title font-weight-bold">營區須知</h3>
                        <div className="card-text">
                            {campGuide[0] ? campGuide[0].campGuide : null}
                        </div>


                        <div className=" text-right">
                            <a className="" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false"
                                aria-controls="collapseExample">
                                <h5 className="card-title font-weight-bold text-right btn  text-white" style={{ backgroundColor: "var(--priceColor)" }}>查看更多內容</h5>
                            </a>
                        </div>
                        <div className="collapse" id="collapseExample">
                            <div className="card-body p-0">

                                <p className="card-text">
                                    ★本園區禁止抽菸。
                                    ★勿隨意升火，以維護安全。
                                    ★每區皆設有停車場，一帳配置一個車位，請配合營區停放車輛。
                                    ★營區內孩童玩耍皆需家長自行全程陪同。
                                    ★營地植栽維護不易，請珍惜花草樹木。
                                    ★為維護園區安全，進出營區請減速慢行。
                                    ★為響應環保及不浪費資源，營區內將不提供個人盥洗用品等備品。
                                    ★營區提供完善衛浴設備，沐浴間24小時提供免費熱水，請珍惜使用。
                                    ★晚上10:00~早上08:00為管制時段，請勿大聲喧嘩，以免影響其他露友安寧。
                                    </p>
                            </div>
                        </div>
                    </div>
                </div>









            </section>

        </React.Fragment >
    );
}


export default IntroduceNote;