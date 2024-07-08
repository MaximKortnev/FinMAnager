import api from "./Api";
import { setData } from "../redux-state/reducers/data";

export const fetchAllTransactions = () => async (dispatch) => {
    try {
      const response = await api.get('/Transactions/Get');
      dispatch(setData(response.data));
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };
  
  export const fetchTransactionsByType = (type) => async (dispatch) => {
    try {
      const response = await api.get(`/Transactions/GetForType?type=${type}`);
      dispatch(setData(response.data));
    } catch (error) {
      console.error('Error fetching transactions by type:', error);
    }
  };
  
  export const saveTransaction = (transaction) => async (dispatch) => {
    try {
      await api.post('/Transactions/SaveTransaction', transaction);
      dispatch(fetchAllTransactions());
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };