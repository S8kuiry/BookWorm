import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import COLORS from '../constants/colors';
import { FontAwesome } from '@expo/vector-icons';

const Reccomedation = ({ item, allData = [], setData }) => {
  const handleDelete = () => {
    if (!item?.imageId) {
      console.warn('Missing imageId for item:', item);
      return;
    }

    if (!Array.isArray(allData)) {
      console.warn('Expected array for allData, got:', allData);
      return;
    }

    const filtered = allData.filter(itm => itm?.imageId !== item.imageId);
    setData(filtered);
  };

  if (!item) {
    return (
      <View style={{ padding: 10, alignItems: 'center' }}>
        <Text style={{ color: 'gray' }}>Invalid item data</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 11,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* --- Book Image --- */}
      {item.image ? (
        <Image
          style={{ height: 100, width: 80, borderRadius: 10 }}
          source={{ uri: item.image }}
        />
      ) : (
        <View
          style={{
            height: 100,
            width: 80,
            borderRadius: 10,
            backgroundColor: '#eee',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#aaa', fontSize: 10 }}>No Image</Text>
        </View>
      )}

      {/* --- Info --- */}
      <View style={{ flex: 1, marginHorizontal: 10 }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '700',
            color: COLORS.textPrimary || '#2d2d2d',
            marginBottom: 4,
          }}
        >
          {item.title || 'Untitled'}
        </Text>

        {/* Rating */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <FontAwesome
                key={index}
                name={index < (item.rating || 0) ? 'star' : 'star-o'}
                size={14}
                color={index < (item.rating || 0) ? '#FFD700' : '#C0C0C0'}
                style={{ marginHorizontal: 1 }}
              />
            ))}
          <Text style={{ marginLeft: 6, fontSize: 10, color: '#777' }}>
            {item.rating || 0}/5
          </Text>
        </View>

        {/* Caption */}
        <Text
          numberOfLines={10}
          style={{
            fontSize: 10,
            color: COLORS.textSecondary || '#555',
            lineHeight: 20,
            marginBottom: 12,
          }}
        >
          {item.caption || 'No description available.'}
        </Text>
      </View>

      {/* --- Delete Icon --- */}
      <TouchableOpacity onPress={handleDelete}>
        <FontAwesome name="trash" size={17} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

export default Reccomedation;
