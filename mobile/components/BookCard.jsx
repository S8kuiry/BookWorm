import { View, Text, Image } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';

const BookCard = ({ book }) => {
  return (
    <LinearGradient
      colors={['#fff', '#fdf4f5']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        width: '90%',
        marginBottom:14,
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        elevation: 4,
      }}
    >
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 14,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgba(255,255,255,0.8)',
        }}
      >
        {/* --- Header (User Info) --- */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <Image
            source={{
              uri: 'https://api.dicebear.com/7.x/avataaars/png?seed=JohnDoe',
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              marginRight: 10,
            }}
          />
          <View>
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#333' }}>
              John Doe
            </Text>
            <Text style={{ fontSize: 12, color: '#999' }}>@johndoe</Text>
          </View>
        </View>

        {/* --- Book Image --- */}
        <Image
          source={{ uri: book.image }}
          style={{
            width: '100%',
            height: 200,
            borderRadius: 12,
            marginBottom: 12,
          }}
          resizeMode="cover"
        />

        {/* --- Title & Rating --- */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: COLORS.textPrimary || '#2d2d2d',
            marginBottom: 4,
          }}
        >
          {book.title}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 6,
          }}
        >
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <FontAwesome
                key={index}
                name={index < book.rating ? 'star' : 'star-o'}
                size={18}
                color={index < book.rating ? '#FFD700' : '#C0C0C0'}
                style={{ marginHorizontal: 1 }}
              />
            ))}
          <Text style={{ marginLeft: 6, fontSize: 13, color: '#777' }}>
            {book.rating}/5
          </Text>
        </View>

        {/* --- Caption --- */}
        <Text
          style={{
            fontSize: 14,
            color: COLORS.textSecondary || '#555',
            lineHeight: 20,
            marginBottom: 12,
          }}
        >
          {book.caption}
        </Text>

        {/* --- Date Footer --- */}
        <Text
          style={{
            fontSize: 12,
            color: '#888',
            alignSelf: 'flex-end',
          }}
        >
          {new Date().toLocaleDateString()}
        </Text>
      </View>
    </LinearGradient>
  );
};

export default BookCard;
