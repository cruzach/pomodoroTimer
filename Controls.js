import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

export const Controls = ( props ) => {

    return (
        <View style={styles.ButtonContainer}>
            {(props.running ? 
                <Button style={styles.Button} title='Stop' onPress={props.stopTimer}/>
            :
                <Button style={styles.Button} title='Start' onPress={props.startTimer}/>
            )}
            <Button style={styles.Button} title='Reset' onPress={props.resetTimer}/>
        </View>
    );
}

const styles = StyleSheet.create({
    ButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: '25%'
    },
    Button: {
    }
})