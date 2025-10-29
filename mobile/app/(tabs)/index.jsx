import { View, Text, ScrollView, Image, FlatList } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import BookCard from '../../components/BookCard'


const index = () => {

    const data = [
        {
            "title": "The Silent Forest",
            "caption": "A mysterious journey through an untouched wilderness.",
            "image": "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=300&q=80",
            "imageId": "img_001",
            "rating": 4,
            "user": "64f8b5a2d3f1c2b7e1a1c001"
        },
        {
            "title": "Moonlit Dreams",
            "caption": "Exploring the beauty of dreams under the full moon.",
            "image": "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=300&q=80",
            "imageId": "img_002",
            "rating": 5,
            "user": "64f8b5a2d3f1c2b7e1a1c002"
        },
        {
            "title": "Ocean Whispers",
            "caption": "Tales and secrets whispered by the ocean waves.",
            "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80",
            "imageId": "img_003",
            "rating": 3,
            "user": "64f8b5a2d3f1c2b7e1a1c003"
        },
        {
            "title": "City Lights",
            "caption": "A journey through the sparkling life of the city.",
            "image": "https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&w=300&q=80",
            "imageId": "img_004",
            "rating": 4,
            "user": "64f8b5a2d3f1c2b7e1a1c004"
        },
        {
            "title": "Hidden Treasures",
            "caption": "Adventures in discovering hidden treasures around the world.",
            "image": "https://images.unsplash.com/photo-1525097487452-6278ff080c31?auto=format&fit=crop&w=300&q=80",
            "imageId": "img_005",
            "rating": 5,
            "user": "64f8b5a2d3f1c2b7e1a1c005"
        },
        {
            "title": "Autumn Leaves",
            "caption": "The beauty of nature as autumn paints its colors.",
            "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80",
            "imageId": "img_006",
            "rating": 2,
            "user": "64f8b5a2d3f1c2b7e1a1c006"
        },
        {
            "title": "Desert Mirage",
            "caption": "Exploring illusions and wonders in the desert sands.",
            "image": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=300&q=80",
            "imageId": "img_007",
            "rating": 3,
            "user": "64f8b5a2d3f1c2b7e1a1c007"
        },
        {
            "title": "Starlit Sky",
            "caption": "A poetic journey under the stars.",
            "image": "https://images.unsplash.com/photo-1516910817561-0fa2c2f64835?auto=format&fit=crop&w=300&q=80",
            "imageId": "img_008",
            "rating": 5,
            "user": "64f8b5a2d3f1c2b7e1a1c008"
        },
        {
            "title": "Mountain Echoes",
            "caption": "Echoes of adventure and serenity in the mountains.",
            "image": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=300&q=80",
            "imageId": "img_009",
            "rating": 4,
            "user": "64f8b5a2d3f1c2b7e1a1c009"
        },
        {
            "title": "Whispering Meadows",
            "caption": "Peaceful days spent in meadows filled with life and color.",
            "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=300&q=80",
            "imageId": "img_010",
            "rating": 5,
            "user": "64f8b5a2d3f1c2b7e1a1c010"
        }
    ]

    return (
        <LinearGradient className='flex-1'
            colors={['#FF6A88', '#FF9A8B', '#FF6A88']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
                paddingBottom: 20,
                flexGrow: 1,
                alignItems: 'center'
            }}>

                {/* Header */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: 26,
                        marginTop:20,
                        marginBottom:-40

                    }}
                >
                    <Text
                        style={{ color: 'white', marginRight: 6 ,}}
                        className="text-3xl font-bold active:scale-95"
                    >
                        BookWorm
                    </Text>
                    <Image
                        style={{ width: 28, height: 28 }}
                        source={require('../../assets/images/icon.png')}
                    />
                </View>

               {/**------------------ bbook card section ------------------ */}
               <View className="w-full h-24"></View>
               {data.map((book, index) => (
                <BookCard key={index} book={book} />
               ))}

            </ScrollView>

        </LinearGradient>

    )
}

export default index