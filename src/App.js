import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setData as setDataFromRedux } from './redux-state/reducers/data';
import Main from './components/pages/Main';
import Stat from './components/pages/Stat';
import Head from './components/views/globals/Head';
import Foot from './components/views/globals/Foot';
import Plan from './components/pages/Plan';
import { getAllTransactions } from './Api/Api';

function App() {

  const data = useSelector(state => state.dataReducer.data)
  const dispatch = useDispatch()

  const setData = (param) => dispatch(setDataFromRedux(param))

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactions = await getAllTransactions();
        setData(transactions);
        console.log(transactions)
      } catch (error) {
        console.error('Failed to fetch transactions', error);
      }
    };

    fetchTransactions();
  }, [dispatch]);

  return (
    <React.Fragment>
        <Head></Head>
        <Routes>
          <Route
            path={'/main'}
            element={<Main action={setData}/>}
          />
           <Route
            path={'/stat/:viewType'}
            element={<Stat statData={data}/>}
          />
           <Route
            path={'/plan'}
            element={<Plan statData={data}/>}
          />
          <Route
            path={'*'}
            element={<Main action={setData}/>}
          />
        </Routes>

        <Foot></Foot>
    </React.Fragment>
  );
}

export default App;
