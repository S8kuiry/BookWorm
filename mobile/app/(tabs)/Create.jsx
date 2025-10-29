import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { LinearGradient } from 'expo-linear-gradient'
import { Feather, FontAwesome } from '@expo/vector-icons'
import COLORS from '../../constants/colors'
import axios from 'axios'
import { AppContext } from '../../context/AppContext'

const Create = () => {
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState('')
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState(null)
  const {backendUrl,token} = useContext(AppContext)

  const stars = [1, 2, 3, 4, 5]

  // 📸 Pick image from gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  useEffect(()=>{
    console.log(rating)
  })
  const handleAddBook = async () => {
  try {
    if (!title || !caption || !rating || !image) {
      Alert.alert('Please fill all fields');
      return;
    }

    const formData = new FormData();

    // ✅ Append text fields
    formData.append('title', title);
    formData.append('caption', caption);
    formData.append('rating', rating);

    // ✅ Append image as file object
    const fileExtension = image.split('.').pop();
    const mimeType =
      fileExtension === 'png'
        ? 'image/png'
        : fileExtension === 'jpg' || fileExtension === 'jpeg'
        ? 'image/jpeg'
        : 'image/*';

    formData.append('image', {
      uri: image,
      name: `upload_${Date.now()}.${fileExtension}`,
      type: mimeType,
    });

    // ✅ Send request
    const { data } = await axios.post(`${backendUrl}/api/books/add`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(data);
    Alert.alert('Book added successfully!');
    setTitle('');
    setRating(0);
    setCaption('');
    setImage(null);
  } catch (error) {
    console.error('Upload Error:', error.response?.data || error.message);
    Alert.alert('Error', error.response?.data?.message || error.message);
  }
};


  return (
    <LinearGradient
      colors={['#FF6A88', '#FF9A8B', '#FF6A88']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15,
        paddingHorizontal: 15,
      }}
    >
      <ScrollView
        style={{ flex: 1, width: '100%' }}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 5,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 26,
              fontWeight: 'bold',
              color: COLORS.textPrimary,
              textAlign: 'center',
              marginBottom: 5,
            }}
          >
            Add Book Recommendation
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: COLORS.textSecondary,
              textAlign: 'center',
              marginBottom: 25,
            }}
          >
            Share your favourite reads with others 📚
          </Text>

          {/* Book Title */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 15, color: COLORS.textPrimary, fontWeight: '600', marginBottom: 8 }}>
              Book Title
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: '#FF6A88',
                borderWidth: 1,
                borderRadius: 10,
                paddingHorizontal: 12,
                backgroundColor: '#FAFAFA',
                
              }}
            >
              <Feather name="book-open" size={20} color="#FF6A88" style={{ marginRight: 8 }} />
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Enter book title"
                placeholderTextColor="#AAA"
                style={{ flex: 1, fontSize: 15, color: '#333', paddingVertical: 10 }}
              />
            </View>
          </View>

          {/* Rating */}
          <View style={{ marginBottom: 25 }}>
            <Text style={{ fontSize: 15, color: COLORS.textPrimary, fontWeight: '600', marginBottom: 8 }}>
              Your Rating
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                borderColor: '#FF6A88',
                borderWidth: 1,
                borderRadius: 10,
                paddingVertical: 10,
                backgroundColor: '#FAFAFA',
              }}
            >
              {stars.map((id) => (
                <TouchableOpacity
                  key={id}
                  onPress={() => setRating((prev) => (prev === id ? id - 1 : id))}
                  style={{ marginHorizontal: 6 }}
                >
                  <FontAwesome
                    name={id <= rating ? 'star' : 'star-o'}
                    size={30}
                    color={id <= rating ? '#FFD700' : '#908a8aff'}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Image Upload */}
          <View style={{ marginBottom: 25 }}>
            <Text style={{ fontSize: 15, color: COLORS.textPrimary, fontWeight: '600', marginBottom: 8 }}>
              Book Image
            </Text>
            <TouchableOpacity
              onPress={pickImage}
              style={{
                borderColor: '#FF6A88',
                borderWidth: 1,
                borderRadius: 12,
                height: 220,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FAFAFA',
                overflow: 'hidden',
              }}
            >
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 12,
                    resizeMode: 'cover',
                  }}
                />
              ) : (
                <View style={{ alignItems: 'center', gap: 8 }}>
                  <Feather name="image" size={40} color="#FF6A88" />
                  <Text style={{ color: '#888', fontSize: 14 }}>Tap to upload image</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Caption */}
          <View style={{ marginBottom: 25 }}>
            <Text style={{ fontSize: 15, color: COLORS.textPrimary, fontWeight: '600', marginBottom: 8 }}>
              Caption
            </Text>
            <View
              style={{
                borderColor: '#FF6A88',
                borderWidth: 1,
                borderRadius: 10,
                backgroundColor: '#FAFAFA',
                height:100
              }}
            >
              <TextInput
              
                value={caption}
                onChangeText={setCaption}
                placeholder="Write your review or thoughts about this book..."
                placeholderTextColor="#AAA"
                multiline
                numberOfLines={20}
                style={{
                  textAlignVertical: 'top',
                  fontSize: 15,
                  color: '#333',
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  
                }}
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
          onPress={handleAddBook}
            style={{
              marginTop: 15,
              backgroundColor: '#FF6A88',
              borderRadius: 10,
              paddingVertical: 14,
              alignItems: 'center',
              shadowColor: '#FF6A88',
              shadowOpacity: 0.3,
              shadowOffset: { width: 0, height: 3 },
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
              Add Book
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

export default Create
