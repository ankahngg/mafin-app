import { Text,View } from 'react-native';
import { Link } from 'expo-router';
import Home from '../src/Home';
import { Redirect } from 'expo-router';
import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { dataSlice, fetchData } from '../redux/reducer/dataSlice';
import { store } from '../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchNoteData } from '../redux/reducer/noteSlice';


export default function Page() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNoteData());
        dispatch(fetchData());
    },[]);
    return (
            <Redirect href="/HOME/HOME" />
        
    )
}