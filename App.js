import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Localidade from './src/view';

export default function App() {

  return (
    <View>
      <Localidade />
      <StatusBar style="auto" />
    </View>
  );
}
