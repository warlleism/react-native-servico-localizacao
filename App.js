import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {

  const endereco = {
    logradouro: "",
    bairro: "",
    cep: "",
    uf: "",
    localidade: ""
  }
  const [dados, setDados] = useState(endereco)

  const [cep, setCep] = useState(29124395)

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
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <View>
      <TextInput
        style={{
          height: 40,
          margin: 32,
          borderWidth: 1,
          padding: 10,
        }}
        keyboard12Type="numeric"
        onChangeText={(e) => { setCep(e) }}
      />

      <TouchableOpacity style={{ display: 'flex', justifyContent: 'center', flexDirection: "row", marginBottom: 20 }} onPress={() => getData()}>
        <Text style={{ backgroundColor: "#ffff", textAlign: 'center', padding: 15, borderWidth: 2, borderColor: "red", borderRadius: 10, color: "black" }} >Buscar</Text>
      </TouchableOpacity>

      <View style={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column" }}>
        <View style={{ width: "100%", alignItems: "center", backgroundColor: "#ff000087", borderTopWidth: 2,  borderColor: "black" }}>
          <Text style={{ height: 40, fontSize: 18, fontWeight: "600" }}>Logradouro</Text>
          <Text style={{ width: "100%", textAlign: "center", backgroundColor: "#fff" }}>{dados.logradouro}</Text>
        </View>
        <View style={{ width: "100%", alignItems: "center", backgroundColor: "#00800080", borderTopWidth: 2,  borderColor: "black" }}>
          <Text style={{ height: 40, fontSize: 18, fontWeight: "600" }}>Bairro</Text>
          <Text style={{ width: "100%", textAlign: "center", backgroundColor: "#fff" }}>{dados.bairro}</Text>
        </View>
        <View style={{ width: "100%", alignItems: "center", backgroundColor: "#ffff008c", borderTopWidth: 2, borderColor: "black" }}>
          <Text style={{ height: 40, fontSize: 18, fontWeight: "600" }}>CEP</Text>
          <Text style={{ width: "100%", textAlign: "center", backgroundColor: "#fff" }}>{dados.cep}</Text>
        </View>
        <View style={{ width: "100%", alignItems: "center", backgroundColor: "#0000ffa6", borderTopWidth: 2, borderBottomWidth: 2, borderColor: "black" }}>
          <Text style={{ height: 40, fontSize: 18, fontWeight: "600" }}>Localidade/UF</Text>
          <Text style={{ width: "100%", textAlign: "center", backgroundColor: "#fff" }}>{dados.localidade} / {dados.uf}</Text>
        </View>
      </View>

      {/* <Text>{dados.map((e) => {
        return (
          <div>{e.userId}</div>
        )
      })}</Text> */}
      <StatusBar style="auto" />
    </View>
  );
}
