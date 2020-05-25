import React, { Component } from 'react';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characterDetail: {}
        }
    }
    static getDerivedStateFromProps(props, state) {
        let updateState = {};
        const { characterDetail } = props;
        if (Object.keys(characterDetail).length) {
            updateState = {
                characterDetail
            };
        }
        return updateState;
    }
    changeToDateFormat(characterDetailObj) {
        let createdDate = new Date(characterDetailObj.characterDetail.created);
        let todayDate = new Date();
        let years = this.diff_months(createdDate, todayDate);
         return <span>id:{characterDetailObj.characterDetail.id} Created {years} years ago</span>
    }

    diff_months(dt2, dt1) {
        let diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= (60 * 60 * 24 * 7 * 4);
        let months = Math.abs(Math.round(diff));
        let years = Math.round(months / 12);
        return years;
    }

render() {
    const { characterDetail } = this.state;
    return (
        <li>
            <div className="char-img">
                <img src={characterDetail.image} alt="" />
                <div className="img-text">
                    <h2>{characterDetail.name}</h2>
                    {
                        this.changeToDateFormat({ characterDetail })
                    }
                </div>
            </div>
            <div className="table-class">
                <table>
                    <tbody>
                        <tr>
                            <td>STATUS</td>
                            <td>{characterDetail.status}</td>
                        </tr>
                        <tr>
                            <td>SPECIES</td>
                            <td>{characterDetail.species}</td>
                        </tr>
                        <tr>
                            <td>GENDER</td>
                            <td>{characterDetail.gender}</td>
                        </tr>
                        <tr>
                            <td>ORIGIN</td>
                            <td>{characterDetail.origin.name}</td>
                        </tr>
                        <tr>
                            <td>LAST LOCATION</td>
                            <td>{characterDetail.location.name}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </li>);
}
}
export default Card;