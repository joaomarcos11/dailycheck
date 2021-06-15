import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

// interface EmotionCardProps extends RectButtonProps {
//     title: string;
//     selected: boolean;
//     // selected?: boolean;
// }
interface EmotionCardProps extends RectButtonProps {
    data: {
        // id: number;
        name: string;
    },
    // selected: boolean;
    // selected?: boolean;
}

export function EmotionCard({
    data,
    // selected = false,
    ...rest
} : EmotionCardProps) {
    return(
        <RectButton
            style={[
                styles.container,
            ]}
            {...rest}
        >
            <Text 
                style={[
                    styles.text,
            ]}>
                { data.name }
            </Text>

        </RectButton>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary_light,
        width: 140,
        height: 50,   
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginHorizontal: 10,
        marginVertical: 15
    },
    text: {
        color: colors.primary_dark,
        fontFamily: fonts.text
    }
});

// Note
// algumas interface terão export pois será usado em mais de um lugar
//
// não entendi pq deveria usar selected?: => pode ser null?
// 
// atenção ao extends e {...rest} para usar os recursos do que se está estendendo
//