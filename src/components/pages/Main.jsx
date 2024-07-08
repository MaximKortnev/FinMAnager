import React from 'react';
import { changeViewType, changeComment, changeValue } from '../../redux-state/reducers/view-type-for-main';
import { useSelector, useDispatch } from 'react-redux'
import InputComponent from '../comps/Input';
import css from '../../styles/form.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import { useRef } from 'react'

const { FormContainer, Button, Input } = css

const Main = (props) => {

    const { action } = props

    const valueInput = useRef()

    const dispatch = useDispatch()
    const viewType = useSelector(state => state.viewTypeMain.viewType)
    const value = useSelector(state => state.viewTypeMain.value)
    const comment = useSelector(state => state.viewTypeMain.comment)

    const handleChange = (event) => {
        dispatch(changeViewType(event.target.value));
    }

    const handleChangeComment = (param) => {
        dispatch(changeComment(param))
    }
    const handleChangeRadio = (event) => {
        dispatch(changeComment(event.target.value))
    }

    const handleChangeValue = (param) =>{
        dispatch(changeValue(param))
    }

    const validation = () => {
        if( value.length > 2 && viewType ) {
            console.log("Валидация прошла")

            const dataLine = `${value}::${viewType}::${comment}`

            axios.post('https://localhost:7282/SaveTransaction', {
                value: value,
                viewType: viewType,
                comment: comment
            })
            .then(response => {
                console.log('Transaction saved successfully:', response.data);
                action(dataLine);
                dispatch(changeValue(''));
                dispatch(changeViewType("доход"));
                dispatch(changeComment(''));
            })
            .catch(error => {
                console.error('There was an error saving the transaction:', error);
            });
        } else  {console.log("Валидация не прошла")}
    }


    const setFocus = () => {
        valueInput.current.disabled = false
        valueInput.current.focus()
    }

    return (
        <React.Fragment>
                <FormContainer style={{ alignItems: 'flex-start' }}>
                    <Button 
                    backgroundColor={"rgb(176, 243, 71)"}
                    onClick={setFocus}
                    style={{ marginBottom: '12px' }}
                    >
                    Начать заполнение
                    </Button>
                    <Input
                    ref={valueInput}
                    value={value}
                    type={"text"}
                    placeholder={"Введите сумму транзакции"}
                    maxLength={"100"}
                    disabled
                    onChange={event => {
                        const newValue = event.target.value
                        handleChangeValue(newValue)
                    }}
                    />
                    {false && <InputComponent action={handleChangeValue} inputValue={value} placeholder={"Введите сумму"}/>}
                    <FormControl style={{ marginTop: '9px', marginBottom: '12px' }}>
                        <FormLabel id="demo-controlled-radio-buttons-group">Выберите тип транзакции</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={viewType}
                            onChange={handleChange}
                            style={{ marginTop: '5px', marginLeft: '6px' }}
                        >
                            <FormControlLabel value="расход" control={<Radio />} label="Расходы" />
                            <FormControlLabel value="доход" control={<Radio />} label="Доходы" />
                        </RadioGroup>
                    </FormControl>
                    { viewType === 'доход'? <InputComponent action={handleChangeComment} inputValue={comment} placeholder={"Введите комментарий"}/> : 
                    <FormControl style={{ marginTop: '0px', marginBottom: '14px' }}>
                        <FormLabel id="demo-controlled-radio-buttons-group">Выберите тип расходов</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={comment}
                            onChange={handleChangeRadio}
                            style={{ marginTop: '5px', marginLeft: '6px' }}
                        >
                            <FormControlLabel value="покупка продуктов" control={<Radio />} label="Покупка продуктов" />
                            <FormControlLabel value="оплата счетов" control={<Radio />} label="Оплата счетов" />
                            <FormControlLabel value="покупка одежды" control={<Radio />} label="Покупка одежды" />
                            <FormControlLabel value="расходы на транспорт" control={<Radio />} label="Расходы на транспорт" />
                            <FormControlLabel value="развлечения" control={<Radio />} label="Развлечения" />
                            <FormControlLabel value="путешествия" control={<Radio />} label="Путешествия" />
                        </RadioGroup>
                    </FormControl>}
                    <Button 
                        backgroundColor={ value.length < 2 ?  "grey" : viewType.length < 2 ? "grey" : "green"}
                        onClick={ validation }
                    >Сохранить</Button>
                </FormContainer>
        </React.Fragment>
    );
}

export default Main