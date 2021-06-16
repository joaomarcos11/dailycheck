import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Alert, View, SafeAreaView, FlatList, StyleSheet, Text } from 'react-native';
import { EmotionCard } from '../components/EmotionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { Header } from '../components/Header';
import { Load } from '../components/Load';

interface EmotionProps {
    id: string;
    name: string;
}

export function EmotionSelect() {
    const [emotion, setEmotion] = useState<EmotionProps[]>();
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    async function fetchEmotion() {
        try {
            const { data } = await api.get('emotions');

            if(!data)
                return setLoading(true);
    
            setEmotion(data);
            setLoading(false);
        } catch(error) {
            console.log(error);
        }
    }

    async function handleEmotionSelect(emotionName : string) {
        try {
            await AsyncStorage.setItem('@dailycheck:emotion', emotionName);
            navigation.navigate('Confirmation', {
                title: 'Beleza',
                subtitle: 'Agora vamos ver que tarefas você vai fazer hoje',
                buttonTitle: 'Avançar',
                icon: 'hug',
                nextScreen: 'ActivitySelect'
            });
        } catch {
            return Alert.alert('Não foi possível guardar como você está se sentindo😢');
        }
    }

    useEffect(() => {
        fetchEmotion();
    }, []);

    if(loading)
        return <Load />

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Header /> 

                <Text style={styles.title}>
                    Como você está se
                </Text>
                <Text style={styles.subtitle}>
                    sentindo hoje?
                </Text>
            </View>

            <View style={styles.emotions}>
                <FlatList
                    data={emotion}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <EmotionCard
                            data={item}
                            onPress={() => handleEmotionSelect(item.name)}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}   
                    onEndReachedThreshold={0.1}  
                />
            </View>
        </SafeAreaView>
    )
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
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading,
        marginTop: 15
    },
    subtitle: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
    },
    emotions: {
        flex: 1,
        paddingHorizontal: 32,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

//Notes
// keyExtractor => transforma o id do item (int) em String
//
// ATENÇÃO (ToDo v2)
// Por enquanto, fazer pra escolher uma Emotion
// Mas, depois fazer a lógica para aceitar duas emotions!
//
