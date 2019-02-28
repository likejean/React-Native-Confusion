import React, { Component } from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

function ContactInfo() {
    return(        
        <Card title="Contact Information">
            <Text style={styles.baseText}>
                121, Clear Water Bay Road{'\n'}            
            </Text>
            <Text style={styles.baseText}>
                Clear Water Bay, Kowloon{'\n'}
            </Text>
            <Text style={styles.baseText}>
                HONG KONG{'\n'}
            </Text> 
            <Text>
                Tel: +852 1234 5678{'\n'}
            </Text>
            <Text>
                Fax: +852 8765 4321{'\n'}
            </Text>
            <Text>
                Email:confusion@food.net
            </Text>
        </Card>
    );    
}

class Contact extends Component {
    
    static navigationOptions = {
        title: 'Contact Us'
    };

    render(){       
        return(
            <ScrollView>
                <ContactInfo />
            </ScrollView>
        );
    }    
}

const styles = StyleSheet.create({
    baseText: {
        fontFamily: 'Baskerville-SemiBoldItalic',
    },

    storyCounters: {
        width: 25,
    },
    
    iconCounter: {
        fontSize: 21,
        color: '#bbbbbb',
        textAlign: 'center',
    },
    
    iconCounterText: {
        color: '#bbbbbb',
        fontSize: 12,
        textAlign: 'center'
    }
});



export default Contact;