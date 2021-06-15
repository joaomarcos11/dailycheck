import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect }  from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import userImg from '../assets/rodrigo.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header() {
    const [userName, setUserName] = useState<string>();

    useEffect(() => {
        async function loadStorageUserName() {
            const user = await AsyncStorage.getItem('@dailycheck:user');
            console.log(user);
            setUserName(user || '');
        }

        loadStorageUserName();
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>
                    {userName}
                </Text>
            </View>
            <Image source={userImg} style={styles.image}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,  
        marginTop: 20,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 40
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    }
});

//Notes
// no UseEffect não pode ter async diretamente no callback
// por isso, cria-se dentro da callback e já chama a função


