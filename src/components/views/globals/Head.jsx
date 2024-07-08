import React from 'react';
import css  from '../../../styles/styles.css';
import HOCButton from '../../comps/HOCHeaderButton';
import Button from '../../comps/Button';


const HOCButtonComponent = HOCButton(Button)


const {HeaderContainer, HeaderCSS} = css


const buttonCSS = {
    display: 'block',
    padding: '10px 14px 12px',
    borderRadius: '6px',
    backgroundColor: '#80F347',
    cursor: 'pointer',
    marginLeft: '10px'
}



const Head = () => {

    return (
        <React.Fragment>
            <HeaderContainer>
                <HeaderCSS.Loge>Финансовый менеджер</HeaderCSS.Loge>
                <HeaderCSS.MenuContainer>
                    <HOCButtonComponent text={'/main'} onClick={() => console.log(1)}>Главная страница</HOCButtonComponent>
                    <HOCButtonComponent text={'/stat/расход'} onClick={() => console.log(1)}>Статистика</HOCButtonComponent>
                    <HOCButtonComponent text={'/plan'} onClick={() => console.log(1)}>Планирование</HOCButtonComponent>
                </HeaderCSS.MenuContainer>
            </HeaderContainer>
        </React.Fragment>
    );
}

export default Head