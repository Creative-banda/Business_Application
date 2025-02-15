import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const CustomDropdown = ({ options, selectedValue, setSelectedCategory }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const selectOption = (option) => {
        setSelectedCategory(option);
        setIsDropdownOpen(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
                <Text style={styles.selectedText}>
                    {selectedValue ? selectedValue.label : 'Select an option'}
                </Text>
            </TouchableOpacity>
            {isDropdownOpen && (
                <View style={styles.dropdownList}>
                    {options.map((item) => (
                        <TouchableOpacity
                            key={item.value}
                            style={styles.option}
                            onPress={() => selectOption(item)}
                        >
                            <Text style={styles.optionText}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 10,
    },
    dropdown: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    selectedText: {
        fontSize: 16,
    },
    dropdownList: {
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    option: {
        padding: 10,
    },
    optionText: {
        fontSize: 16,
    },
});

export default CustomDropdown;