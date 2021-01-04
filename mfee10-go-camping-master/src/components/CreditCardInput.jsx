import React, { Component } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

class CreditCardInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cvc: '',
            expiry: '',
            focus: '',
            name: '',
            number: '',
        };

    }

    handleInputFocus = (e) => {
        this.setState({
            focus: e.target.name,
            // expiry: e.target.
        });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <React.Fragment>
                <div id="PaymentForm" className="row mb-4">
                    <div className="col-6 pl-0 pr-5" style={{ objectFit: "fill" }}>
                        <Cards
                            cvc={this.state.cvc}
                            expiry={this.state.expiry}
                            focused={this.state.focus}
                            name={this.state.name}
                            number={this.state.number}
                            style={{ width: "200px" }}
                        />
                    </div>
                    <div className="col-6">
                        <div className="d-flex">
                            <span className="mr-4"><span className="text-danger" style={{ fontSize: 20 }}>*</span>持卡人姓名</span>
                            <input
                                type="text"
                                name="name"
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                                className="form-control text-center" style={{ width: "180px" }}
                            />
                        </div>
                        <div className="my-2 d-flex">
                            <span className="mr-4"><span className="text-danger p-0" style={{ fontSize: 20 }}>*</span>信用卡卡號</span>
                            <input
                                type="tel"
                                name="number"
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                                className="form-control text-center"
                                style={{ width: "180px" }}
                                maxLength="16"
                                pattern="[0-9]*"
                            />
                        </div>
                        <div className="my-2 d-flex">
                            <span className="mr-2"><span className="text-danger" style={{ fontSize: 20 }}>*</span>卡片有效期限</span>
                            <input
                                type="text"
                                name="expiry"
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                                placeholder="MM&nbsp;/&nbsp;YY"
                                className="text-center form-control text-center"
                                style={{ width: "180px" }}
                                maxLength="5"
                            />
                        </div>
                        <div className="my-2 d-flex">
                            <span className="mr-4"><span className="text-danger" style={{ fontSize: 20 }}>*</span>背面末三碼</span>
                            <input
                                type="text"
                                name="cvc"
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                                className="form-control text-center"
                                style={{ width: "180px" }}
                                maxLength="3"
                            />
                        </div>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CreditCardInput;