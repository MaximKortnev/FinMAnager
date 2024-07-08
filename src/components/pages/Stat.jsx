import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Datalist from '../views/local/DataList';
import DataChart from '../views/local/DataChart';


const Stat = (props) => {

    const { statData } = props
    const [isShowChart, setisShowChart] = useState(true)

    const { viewType } = useParams()

    return (
        <React.Fragment>
            <Datalist viewType={viewType} data={statData} setShow={setisShowChart}/>
            <DataChart viewType={viewType} data={statData} show={isShowChart}/>
        </React.Fragment>
    );
}

export default Stat