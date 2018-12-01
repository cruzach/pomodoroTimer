import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Timer = ( props ) => {
    return (
        <View >
            <Text style={styles.TimerContainer}>
                {(props.minutes < 10 ? `0${props.minutes}` : props.minutes)}
                :
                {(props.seconds < 10 ? `0${props.seconds}` : props.seconds)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    TimerContainer: {
        paddingTop: '20%',
        fontSize: 60
    }
});