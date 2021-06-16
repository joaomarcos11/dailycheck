import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { PeriodButton } from '../components/PeriodButton';
import { useNavigation } from '@react-navigation/core';

import { Header } from '../components/Header';
import { ActivityCardPrimary } from '../components/ActivityCardPrimary';
import { Load } from '../components/Load';
import { ActivityProps } from '../libs/storage';

import api from '../services/api';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PeriodProps {
    key: string;
    title: string;
}

export function ActivitySelect() {
    const [ emotionLoaded, setEmotionLoaded ] = useState<string>();
    const [ periods, setPeriods ] = useState<PeriodProps[]>([]);
    const [ periodSelected, setPeriodSelected ] = useState('all');
    const [ activities, setActivities] = useState<ActivityProps[]>([]);
    const [ filteredActivities, setFilteredActivities] = useState<ActivityProps[]>([]);
    
    const [ loading, setLoading ] = useState(true);
    const [ page, setPage ] = useState(1);
    const [ loadingMore, setLoadingMore ] = useState(false);

    const navigation = useNavigation();
    
    function handlePeriodSelected(period: string) {
        setPeriodSelected(period);

        if(period == 'all')
            return setFilteredActivities(activities);
        
        const filtered = activities.filter(activity =>
            activity.period.includes(period)
        );

        setFilteredActivities(filtered);
    }

    async function fetchActivities() {
        const { data } = await api
            .get(`activities?_sort=name&_order=asc&_page=${page}&_limit=6`)
            // .get('activities')
    
        if(!data)
            return setLoading(true);
        
        if(page > 1) {
            setActivities(oldValue => [...oldValue, ...data]);
            setFilteredActivities(oldValue => [...oldValue, ...data]);
        } else {
            setActivities(data);
            setFilteredActivities(data);
        }

        setLoading(false);
        setLoadingMore(false);
    }

    function handleFetchMore(distance: number) {
        if(distance < 1)
            return;
        
        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
        fetchActivities();
    }

    function handleActivitySelect(activity: ActivityProps) {
        navigation.navigate('ActivitySave', { activity });
    }

    useEffect(() => {
        async function handleEmotionLoad() {
            const emotion = await AsyncStorage.getItem('@dailycheck:emotion');
            setEmotionLoaded(emotion || '');
        }

        handleEmotionLoad();
    })

    useEffect(() => {
        async function fetchPeriod() {
            try {
                const { data } = await api
                    .get('activities_period');
                setPeriods([
                    {
                        key: 'all',
                        title: 'Todos'
                    },
                    ...data
                ]);
            } catch(error) {
                console.log(error);
            }
        }

        fetchPeriod();
    }, []);

    useEffect(() => {
        fetchActivities();
    }, []);

    if(loading)
        return <Load />

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />

                <Text style={styles.emotionSub}>
                    Hoje você está se
                </Text>
                <Text style={styles.emotion}>
                    sentindo {emotionLoaded}
                </Text>

                <Text style={styles.title}>
                    Qual turno do dia
                </Text>
                <Text style={styles.subtitle}>
                    você pretende fazer sua tarefa?
                </Text>
            </View>

            <View>
                <FlatList
                    data={periods}
                    keyExtractor={(item) => String(item.key)}
                    renderItem={({ item }) => (
                        <PeriodButton 
                            title={item.title}
                            active={item.key === periodSelected}
                            onPress={() => handlePeriodSelected(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.periodList}
                />
            </View>

            <View style={styles.activities}>
                <FlatList 
                    data={filteredActivities}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <ActivityCardPrimary 
                            data={item}
                            onPress={() => handleActivitySelect(item)}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) => 
                        handleFetchMore(distanceFromEnd)
                    }
                    ListFooterComponent={
                        loadingMore
                        ? <ActivityIndicator color={colors.primary} />
                        : <></>
                    }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    header: {
        paddingHorizontal: 30
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading,
    },
    emotion: {
        fontSize: 21,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        textTransform: 'lowercase'
    },
    emotionSub: {
        fontFamily: fonts.text,
        fontSize: 21,
        lineHeight: 20,
        color: colors.heading,
        marginTop: 15
    },
    periodList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32,
        paddingRight: 32
    },
    activities: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    },
});