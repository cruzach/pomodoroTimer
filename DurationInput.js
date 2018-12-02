import React from 'react';
import { StyleSheet, View } from 'react-native';

export const DurationInput = ( props ) => {
    return (
        <View style={styles.timeSelection}>
          <Text style={styles.font32}>Work for: </Text>
          <TextInput style={styles.font32}
            returnKeyType='done' keyboardType='number-pad' 
            value={props.length} 
            onChangeText={props.onChangeLength(value)}
          />
          <Text style={styles.font32}> minutes</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    timeSelection: {
        flexDirection: "row",
        padding: 10,
    },
    font32: {
        fontSize: 32
    },
})