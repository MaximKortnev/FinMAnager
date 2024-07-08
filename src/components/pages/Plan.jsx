import React from 'react';
import Datalist from '../views/local/DataList';

export default class Plan extends React.Component {

    constructor(props) {
        super(props)
    }


    render() {
        return(
            <>
                <Datalist viewType={'расход'} data={this.props.statData}/>
            </>
    )}
}