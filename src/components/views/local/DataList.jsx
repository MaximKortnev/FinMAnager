import React, { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import css from "../../../styles/dataList.css";

const { DataContainer, ContentLine, ContentCell,  ButtonsLine, ButtonItem} = css

const dataSum = (paramData, view) => {
    const returned = paramData.filter(item => item.viewType === view)
    .reduce((summ, item) => {
      return summ + +(item.value)
     }, 0)

     return returned
}


const Datalist = (props) => {

    const navigate = useNavigate()

    const { data = [], setShow, viewType } = props

    const [ bold, setBold ] = useState()

    const filterData = data.filter(item => item.viewType === viewType)
    const filterDataSum = useMemo(() => dataSum(data, viewType),[ data, viewType ])

    const filterDataDelta = data.reduce((summ, item) => {
                                if(item.viewType === 'доход')
                                 return  summ + +(item.value)
                                if(item.viewType === 'расход')
                                    return  summ - +(item.value)
                                }, 0)
    
    const reduceDataType1 = () => {
        setShow(false)
        navigate('/stat/доход')
    }
    const reduceDataType2 = () => {
        setShow(true)
        navigate('/stat/расход')
    }
    const reduceDataType3 = () => navigate('/stat/общее')

    return(
        <React.Fragment>
             <ButtonsLine>
                    <ButtonItem style={{ fontWeight: viewType==='доход'? 'bold' : ''}}  onClick={reduceDataType1}>Доходы</ButtonItem>
                    <ButtonItem style={{ fontWeight: viewType==='расход'? 'bold' : ''}} onClick={reduceDataType2}>Расходы</ButtonItem>
                    <ButtonItem style={{ fontWeight: viewType==='общее'? 'bold' : ''}} onClick={reduceDataType3}>Общее</ButtonItem>
                </ButtonsLine>
            <DataContainer>
                { filterData.length > 0 && <React.Fragment>
                { filterData.map((item, index) => {
                    return (
                        <ContentLine key={index}>
                            <ContentCell width={"15%"}>{item.value}</ContentCell>
                            <ContentCell width={"15%"}>{item.viewType}</ContentCell>
                            <ContentCell width={"60%"}>{item.comment}</ContentCell>
                        </ContentLine>
                    )
                })}
                    <ContentLine>
                        <ContentCell onClick={ ()=> setBold(!bold)} style={{ fontWeight: bold && 'bold' }} width={"15%"}>{filterDataSum}</ContentCell>
                        <ContentCell width={"15%"}>{"---"}</ContentCell>
                        <ContentCell width={"60%"}>{"---"}</ContentCell>
                    </ContentLine>
                </React.Fragment> }
                
                { filterData.length === 0 && <React.Fragment>
                { data.map((item, index) => {
                    return (
                        <ContentLine key={index}>
                            <ContentCell width={"15%"}>{item.value}</ContentCell>
                            <ContentCell width={"15%"}>{item.viewType}</ContentCell>
                            <ContentCell width={"60%"}>{item.comment}</ContentCell>
                        </ContentLine>
                    )
                })}
                    <ContentLine>
                        <ContentCell width={"15%"}>{filterDataDelta}</ContentCell>
                        <ContentCell width={"15%"}>{"---"}</ContentCell>
                        <ContentCell width={"60%"}>{"---"}</ContentCell>
                    </ContentLine>
                </React.Fragment> }

            </DataContainer>
        </React.Fragment>
    )
}


export default Datalist 