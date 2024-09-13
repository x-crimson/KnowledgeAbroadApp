
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { fetchUserName } from '../services/api';

function HomeScreen({ navigation }) {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedVisaType, setSelectedVisaType] = useState(null);
//    const [userName, setName] = useState('');  // State to store the user's name

    // Dummy data for countries and visa types
    const countries = [
        { name: 'USA', image: require('./assets/usa.jpg') },
        { name: 'Australia', image: require('./assets/australia.jpg') },
        { name: 'Canada', image: require('./assets/canada.jpg') },
        { name: 'UK', image: require('./assets/uk.jpg') }
    ];

    const visaTypes = ['Student Visa', 'Travel Visa', 'Business Visa', 'Work Visa'];

//   useEffect(() => {
//        const getName = async () => {
//            const userName = await fetchUserName();
//            setName(userName);
//        };
//        getName();
//    }, []);


    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
    };

    const handleVisaTypeSelect = (visaType) => {
        setSelectedVisaType(visaType);
    };

    const proceedToBooking = () => {
        navigation.navigate('SlotBooking', { selectedCountry, selectedVisaType });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome To Knowledge Abroad</Text>
            <ScrollView>
                <Text style={styles.subtitle}>Please select your destination and Visa type</Text>
                <View style={styles.grid}>
                    {countries.map((country, index) => (
                        <TouchableOpacity key={index} onPress={() => handleCountrySelect(country.name)} style={styles.gridItem}>
                            <Image source={country.image} style={styles.image} />
                            {selectedCountry === country.name && <Text style={styles.selectedLabel}>{country.name}</Text>}
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.grid}>
                    {visaTypes.map((type, index) => (
                        <TouchableOpacity key={index} onPress={() => handleVisaTypeSelect(type)} style={styles.gridItem}>
                            <Text style={selectedVisaType === type ? styles.selectedText : styles.text}>{type}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <TouchableOpacity style={styles.button} onPress={proceedToBooking}>
                    <Text style={styles.buttonText}>Continue to Book Slot</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    gridItem: {
        width: '45%',
        aspectRatio: 1,
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    selectedLabel: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 5,
    },
    text: {
        textAlign: 'center',
        color: 'black',
    },
    selectedText: {
        textAlign: 'center',
        color: 'green',
        fontWeight: 'bold',
    },
    button: {
        width: '80%',
         marginTop: 0,

        alignItems: 'center',
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 15,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default HomeScreen;
