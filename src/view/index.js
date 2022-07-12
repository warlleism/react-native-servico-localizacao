import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Keyboard } from 'react-native';

export default function Localidade() {

    const endereco = {
        logradouro: "",
        bairro: "",
        cep: "",
        uf: "",
        localidade: ""
    }
    const [dados, setDados] = useState(endereco)

    const [cep, setCep] = useState('')

    const [mostrar, setMostrar] = useState(false)

    const getData = async () => {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        setDados(
            {
                logradouro: response.data.logradouro,
                bairro: response.data.bairro,
                cep: response.data.cep,
                uf: response.data.uf,
                localidade: response.data.localidade
            }
        )
        setMostrar(true)
        Keyboard.dismiss()
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
            <View style={{ width: "100%", height: "100%", alignContent: "center", alignItems: "center" }}>

                <Text style={{ marginTop: 50, fontSize: 20, fontWeight: "800", color: "#23CE6B" }} >Localidade Via CEP</Text>


                <TextInput
                    style={{ height: 40, width: "80%", margin: 32, borderWidth: 1, padding: 10, }}
                    keyboard12Type="numeric"
                    onChangeText={(e) => { setCep(e) }}
                    placeholder="00000-000"
                />

                <TouchableOpacity style={{ display: 'flex', justifyContent: 'center', flexDirection: "row", marginBottom: 20 }} onPress={() => getData()}>
                    <Text style={{ backgroundColor: "#272D2D", textAlign: 'center', paddingVertical: 10, paddingHorizontal: 20, borderWidth: 2, borderColor: "#23CE6B", borderRadius: 10, color: "#23CE6B" }} >Buscar</Text>
                </TouchableOpacity>
                {mostrar &&
                    (
                        <>
                            <View style={{width: "100%", display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                <View style={{ padding: 10, width: "100%", alignItems: "center", backgroundColor: "#272D2D", borderTopWidth: 2, borderColor: "#23CE6B" }}>
                                    <Text style={{ height: 40, fontSize: 18, fontWeight: "600", color: "#23CE6B" }}>Logradouro</Text>
                                    <Text style={{ width: "100%", textAlign: "center", backgroundColor: "#fff", fontSize: 20, padding: 10, borderRadius: 50 }}>{dados.logradouro}</Text>
                                </View>
                                <View style={{ padding: 10, width: "100%", alignItems: "center", backgroundColor: "#272D2D", borderTopWidth: 2, borderColor: "#23CE6B" }}>
                                    <Text style={{ height: 40, fontSize: 18, fontWeight: "600", color: "#23CE6B" }}>Bairro</Text>
                                    <Text style={{ width: "100%", textAlign: "center", backgroundColor: "#fff", fontSize: 20, padding: 10, borderRadius: 50 }}>{dados.bairro}</Text>
                                </View>
                                <View style={{ padding: 10, width: "100%", alignItems: "center", backgroundColor: "#272D2D", borderTopWidth: 2, borderColor: "#23CE6B" }}>
                                    <Text style={{ height: 40, fontSize: 18, fontWeight: "600", color: "#23CE6B" }}>CEP</Text>
                                    <Text style={{ width: "100%", textAlign: "center", backgroundColor: "#fff", fontSize: 20, padding: 10, borderRadius: 50 }}>{dados.cep}</Text>
                                </View>
                                <View style={{ padding: 10, width: "100%", alignItems: "center", backgroundColor: "#272D2D", borderTopWidth: 2, borderColor: "#23CE6B" }}>
                                    <Text style={{ height: 40, fontSize: 18, fontWeight: "600", color: "#23CE6B" }}>Localidade/UF</Text>
                                    <Text style={{ width: "100%", textAlign: "center", backgroundColor: "#fff", fontSize: 20, padding: 10, borderRadius: 50 }}>{dados.localidade} / {dados.uf}</Text>
                                </View>
                            </View>
                        </>
                    )
                }

                <StatusBar style="auto" barStyle="default" hidden={false} animated={true} />
            </View>
        </TouchableWithoutFeedback>
    );
}
