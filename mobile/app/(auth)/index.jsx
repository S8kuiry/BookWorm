import React, { useContext, useEffect, useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios'
import { AppContext } from '../../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useRouter();
  const [isLoading, setIsLoading] = useState(false);  
  const {backendUrl,token,setToken,setUser} = useContext(AppContext) 
  

  const handleLogin = async() => {
    setIsLoading(true);
    try {
      const {data}=  await axios.post(backendUrl+'/api/auth/login',{
        email,password
      }) 
      console.log(data.data)
      if(data){
         await AsyncStorage.setItem('token', data.data.token);
        await AsyncStorage.setItem('user', JSON.stringify(data.data.user));
        setToken(data.data.token)
        setUser(data.data.user)
        
      setEmail('');
    setPassword('');
    setIsLoading(false);
navigate.replace("/(tabs)");}
      
    } catch (error) {
      console.log(error.message)
      Alert.alert(error.message)

      
    }
  
    
  };

  useEffect(()=>{
  
  })
  return (
    <>
    
    <LinearGradient
      colors={['#FF6A88', '#FF9A8B', '#FF6A88']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1 justify-end items-center"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, width: '100%' }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <Image
            source={require('../../assets/images/i.png')}
            style={{ width: 290, height: 290, marginBottom: 10 }}
            resizeMode="contain"
          />

          {/* Card */}
          <View
            style={{
              width: '90%',
              borderRadius: 10,
              shadowColor: '#FF6A88',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.6,
              shadowRadius: 10,
              elevation: 12,
              paddingBottom: 60,
              marginBottom: 40,
            }}
            className="bg-white rounded-lg flex flex-col items-center p-6 mb-10"
          >
            {/* Email */}
            <View style={{ width: '100%' }}>
              <Text className="text-lg font-bold text-gray-700 mb-2">Email</Text>
              <View
                style={{
                  flexDirection: 'row',
                  borderColor: '#CCCCCC',
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 10,
                  alignItems: 'center',
                }}
              >
                <Feather name="mail" size={20} color="#FF6A88" style={{ marginRight: 8 }} />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor="#999"
                  className="flex-1 text-gray-700"
                />
              </View>
            </View>

            {/* Password */}
            <View style={{ width: '100%', marginTop: 15 }}>
              <Text className="text-lg font-bold text-gray-700 mb-2">Password</Text>
              <View
                style={{
                  flexDirection: 'row',
                  borderColor: '#CCCCCC',
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 10,
                  alignItems: 'center',
                }}
              >
                <Feather name="lock" size={20} color="#FF6A88" style={{ marginRight: 8 }} />
                <TextInput
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#999"
                  className="flex-1 text-gray-700"
                />
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
            className="flex justify-center items-center"
              onPress={handleLogin}
              style={{
                backgroundColor: '#FF6A88',
                borderRadius: 8,
                paddingVertical: 12,
                marginTop: 25,
                width: '100%',
              }}
            >
              <Text className="text-white text-center text-lg font-bold">Login</Text>
            </TouchableOpacity>

            {/* Signup Redirect */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
              <Text className="text-gray-600">Don't have an account? </Text>
              <Text
                onPress={() => navigate.push('./Signup')}
                style={{
                  color: '#FF6A88',
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                }}
              >
                Sign Up
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
    </>
  );
};

export default Login;
