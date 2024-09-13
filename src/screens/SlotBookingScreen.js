import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { getAvailableSlots } from '../services/api'; // Adjust the path to your API service

function SlotBookingScreen({ navigation }) {
    const [destination, setDestination] = useState("Australia"); // Default or from previous selection
    const [visaType, setVisaType] = useState("Student Visa"); // Default or from previous selection
    const [slots, setSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const fetchSlots = async () => {
        try {
            const availableSlots = await getAvailableSlots(destination, visaType);
            setSlots(availableSlots);
            if (availableSlots.length > 0) {
                setSelectedSlot(availableSlots[0].time);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchSlots();
    }, [destination, visaType]); // Fetch slots when destination or visa type changes

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Select a Slot</Text>
            <ScrollView>
                {slots.map((slot, index) => (
                    <Button
                        key={index}
                        title={`${slot.time} - ${slot.date}`}
                        onPress={() => setSelectedSlot(slot.time)}
                        color={selectedSlot === slot.time ? 'green' : 'grey'}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    }
});

export default SlotBookingScreen;



//import React, { useState } from 'react';
//import { View, Text, Button, StyleSheet } from 'react-native';
//import { Picker } from '@react-native-picker/picker';
//
//
//function SlotBookingScreen() {
//    const [selectedSlot, setSelectedSlot] = useState('09:00');
//
//    return (
//        <View style={styles.container}>
//            <Text style={styles.header}>Book Your Slot</Text>
//            <Picker
//                selectedValue={selectedSlot}
//                style={styles.picker}
//                onValueChange={(itemValue, itemIndex) => setSelectedSlot(itemValue)}
//            >
//                <Picker.Item label="09:00 AM" value="09:00" />
//                <Picker.Item label="11:00 AM" value="11:00" />
//                <Picker.Item label="01:00 PM" value="13:00" />
//                <Picker.Item label="03:00 PM" value="15:00" />
//            </Picker>
//            <Button title="Confirm Slot" onPress={() => alert(`Slot booked for ${selectedSlot}`)} />
//        </View>
//    );
//}
//
//const styles = StyleSheet.create({
//    container: {
//        flex: 1,
//        justifyContent: 'center',
//        alignItems: 'center',
//    },
//    header: {
//        fontSize: 20,
//        marginBottom: 20,
//    },
//    picker: {
//        width: '100%',
//        marginBottom: 20,
//    },
//});
//
//export default SlotBookingScreen;
