import React, { Component } from 'react';
import { Text, ScrollView, Platform, StyleSheet } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { MailComposer } from 'expo';

function ContactInfo(props) {
    return( 
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
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
                <Button
                    title='Send Email'
                    buttonStyle={{ backgroundColor: '#512DA8' }}
                    icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                    onPress={props.method}
                >
                </Button>
                
            </Card>
        </Animatable.View>       
    );    
}

class Contact extends Component {

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['popachs@yahoo.com'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        });
    }
    
    static navigationOptions = {
        title: 'Contact Us'
    };

    render(){       
        return(
            <ScrollView>
                <ContactInfo method={this.sendMail} />
            </ScrollView>
        );
    }    
}

const styles = StyleSheet.create({
    baseText: {
        flex: 1,
        ...Platform.select({
            ios: {
                fontFamily: 'Baskerville-SemiBoldItalic'
            },
            android: {
                fontFamily: "Roboto"
            }
        })      
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