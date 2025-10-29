import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, View, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios'
import { useContext } from 'react';
import {AppContext} from '../../context/AppContext'

const Signup = () => {
  const navigate = useRouter();
  const {backendUrl} = useContext(AppContext)
  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);  

 const handleSignUp = async () => {
  setIsLoading(true);
  try {
    console.log("Requesting:", `${backendUrl}/api/auth/register`);

    const response = await fetch(`${backendUrl}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    console.log("Status:", response.status);
    const data = await response.json();
    

    if (!response.ok || !data.success) {
      throw new Error(data.message || `HTTP ${response.status}`);
    }
setEmail("")
setName("")
setPassword("")
    Alert.alert("Success", "User created successfully! Now Please Log In to continue");
    navigate.push('/(auth)')
  } catch (error) {
    console.log("Fetch Error:", error.message);
    Alert.alert("Error", error.message || "Network Error");
  } finally {
    setIsLoading(false);
  }
};


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
          {/* Image (Top Section) */}
          <Image
            source={require('../../assets/images/i.png')}
            style={{ width: 220, height: 220, marginBottom: 10 }}
            resizeMode="contain"
          />

          {/* Card Section */}
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
                            marginBottom: 35,

            }}
            className="bg-white rounded-lg flex flex-col items-center p-6 mb-10"
          >
            {/* Header */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <Text
                style={{ color: '#FF6A88', marginRight: 6 }}
                className="text-3xl font-bold"
              >
                BooKWorm
              </Text>
              <Image
                style={{ width: 28, height: 28 }}
                source={require('../../assets/images/icon.png')}
              />
            </View>

            {/* Full Name Input */}
            <View style={{ width: '100%', marginBottom: 12 }}>
              <Text className="text-lg font-bold text-gray-700 mb-2">Full Name</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: '#CCCCCC',
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 10,
                }}
              >
                <Feather name="user" size={20} color="#FF6A88" style={{ marginRight: 8 }} />
                <TextInput
                required
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your name"
                  placeholderTextColor="#999"
                  className="flex-1 text-gray-700"
                />
              </View>
            </View>

            {/* Email Input */}
            <View style={{ width: '100%', marginBottom: 12 }}>
              <Text className="text-lg font-bold text-gray-700 mb-2">Email</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: '#CCCCCC',
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 10,
                }}
              >
                <Feather name="mail" size={20} color="#FF6A88" style={{ marginRight: 8 }} />
                <TextInput
                  required
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor="#999"
                  className="flex-1 text-gray-700"
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={{ width: '100%', marginBottom: 20 }}>
              <Text className="text-lg font-bold text-gray-700 mb-2">Password</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: '#CCCCCC',
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 10,
                }}
              >
                <Feather name="lock" size={20} color="#FF6A88" style={{ marginRight: 8 }} />
                <TextInput
                required
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#999"
                  className="flex-1 text-gray-700"
                />
              </View>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              onPress={handleSignUp}
              className="flex justify-center items-center"
              style={{
                backgroundColor: '#FF6A88',
                borderRadius: 8,
                paddingVertical: 12,
                width: '100%',
              }}
            >
              <Text className="text-white text-lg font-bold text-center">Sign Up</Text>
            </TouchableOpacity>

            {/* Redirect to Login */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 20,
              }}
            >
              <Text className="text-gray-600">Already have an account? </Text>
              <Text
                onPress={() => navigate.push('/(auth)')}
                style={{
                  color: '#FF6A88',
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                }}
              >
                Log In
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
    </>
  );
};

export default Signup;
