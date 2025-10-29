import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import Reccomedation from "../../components/Reccomedation";
import { AppContext } from "../../context/AppContext";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const { user, isLoading, setToken, setUser } = useContext(AppContext);
  const navigate = useRouter();

  const bookData = [
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
  ];

  const [data, setData] = useState(bookData || []);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    console.log("User from context:", user);
  }, [user]);

  // 🔹 Show loading indicator while data is being restored
  if (isLoading || loggingOut) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#FF6A88" />
        <Text style={{ color: "#555", marginTop: 10 }}>
          {loggingOut ? "Logging you out..." : "Loading your profile..."}
        </Text>
      </View>
    );
  }

  // 🔹 If user is not logged in (null), show fallback
  if (!user) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text style={{ color: "#777", fontSize: 16 }}>
          No user data found. Please log in again.
        </Text>
      </View>
    );
  }

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      setToken(null);
      setUser(null);

      // Small delay to allow context reset before navigating
      setTimeout(() => {
        navigate.replace("/(auth)");
        setLoggingOut(false);
      }, 800);
    } catch (error) {
      setLoggingOut(false);
      Alert.alert("Logout Error", error.message);
    }
  };

  // 🔹 Main Profile Screen
  return (
    <LinearGradient
      colors={["#FF9A8B", "#FF6A88", "#FF99AC"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
      }}
    >
      {/* ---------- Profile Card ---------- */}
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 16,
          flexDirection: "row",
          alignItems: "center",
          padding: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 6,
          elevation: 4,
        }}
      >
        <View
          style={{
            height: 70,
            width: 70,
            borderRadius: 35,
            overflow: "hidden",
            borderWidth: 2,
            borderColor: "#FF6A88",
          }}
        >
          <Image
            source={{
              uri: `${user.profileImage}?r=${Date.now()}`,
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </View>

        <View style={{ marginLeft: 15 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
              color: COLORS.textPrimary || "#333",
            }}
          >
            {user.name}
          </Text>
          <Text style={{ fontSize: 14, color: "#777", marginTop: 2 }}>
            {user.email}
          </Text>
          <Text style={{ fontSize: 13, color: "#999", marginTop: 2 }}>
            Member Since {new Date(user.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>

      {/* ---------- Logout ---------- */}
      <TouchableOpacity
        onPress={handleLogout}
        activeOpacity={0.6}
        style={{
          marginTop: 20,
          borderRadius: 12,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: 2,
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 6,
        }}
      >
        <LinearGradient
          colors={["white", "white", "white"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: 50,
            borderRadius: 10,
          }}
        >
          <FontAwesome name="sign-out" size={18} color="#f13131ff" />
          <Text
            style={{
              marginLeft: 10,
              fontSize: 16,
              color: "#f13131ff",
              fontWeight: "600",
            }}
          >
            Logout
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* ---------- Recommendations Section ---------- */}
      <View
        style={{
          marginTop: 25,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: COLORS.textPrimary || "#333",
          }}
        >
          Your Recommendations
        </Text>
        <Text style={{ fontSize: 12, color: "#666" }}>
          {data.length} Books
        </Text>
      </View>

      <ScrollView
        style={{ marginTop: 16, flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {data.map((itm, index) => (
<Reccomedation key={index} item={itm} allData={data} setData={setData} />
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

export default Profile;
