import React from 'react';
import { Feather} from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import style from './style';
import logo from '../../assets/logo.png';
import { Linking } from 'react-native';

export default function Details() {
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const message = `Olá ${incident.name},` + 
        `estou entrando em contato para ajudar no caso` +
         `${incident.title} com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}`;
    function navigateBack() {
        navigation.goBack();
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Herói do caso - ${incident.title}`,
            recipients: [incident.email],
            body: message
        });
    }

    function sendWatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.watsapp}&text=${message}`)
    }

    return (
        <View style={style.container}>

            <View style={style.header}>
                <Image source={logo}/>
                <TouchableOpacity onPress={navigateBack} >
                    <Feather name="arrow-left" size={28} color="#E82041"></Feather>
                </TouchableOpacity>
            </View>

            <View style={style.incident}>
                <Text style={[style.incidentProperty, {marginTop:0}]}>Ong:</Text>
                <Text style={style.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={style.incidentProperty}>Descrição:</Text>
                <Text style={style.incidentValue}>{incident.case}</Text>

                <Text style={style.incidentProperty}>Valor:</Text>
                <Text style={style.incidentValue}> 
                    {Intl.NumberFormat('pt-BR', 
                    {style: 'currency', currency: 'BRL'})
                    .format(incident.value)}
                </Text>
            </View>     

            <View style={style.contactBox}>
                <Text style={style.heroTitle}>Salve o dia!</Text>
                <Text style={style.heroTitle}>Seja o herói desse caso!</Text>
                <Text style={style.heroTitle}>Entre em contato:</Text>
                <View style={style.actions}>
                    <TouchableOpacity style={style.action} onPress={sendWatsapp}>
                        <Text style={style.actionText}>WatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.action} onPress={sendMail}>
                        <Text style={style.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}