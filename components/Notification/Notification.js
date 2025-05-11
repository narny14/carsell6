import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const Notification = ({ userEmail, navigation }) => {
  const route = useRoute();
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Follows', 'Like & Comments'];

  const notifications = [
    {
      name: 'Stephan Louis',
      message: 'Liked your post.',
      time: '10:04 AM',
      avatar: 'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?t=st=1745626579~exp=1745630179~hmac=e44f75bca38eb756ebd51c3e28a8888d0f9c25a3af46097415871bdd886065bc&w=740',
      thumbnail: 'https://placeimg.com/100/100/tech',
      type: 'like',
    },
    {
      name: 'Hannah Flores',
      message: 'Started following you.',
      time: '10:00 AM',
      avatar: 'https://img.freepik.com/free-psd/3d-illustration-with-online-avatar_23-2151303097.jpg?t=st=1745626679~exp=1745630279~hmac=a68be0582b9b7c194610ccb3d653d47a1dc1355316da789e8f970df5fec5710c&w=740',
      showButton: true,
      type: 'follow',
    },
    {
      name: 'Hannah Flores',
      message: 'commented on your post: Good luck',
      time: '9:56 AM',
      avatar: 'https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611759.jpg?t=st=1745626692~exp=1745630292~hmac=d2281d61277a418d1ce485177b1ec84da01fb26fa447484db9d5caff677bc7c1&w=740',
      thumbnail: 'https://placeimg.com/100/100/tech',
      type: 'comment',
    },
    {
      name: 'Ashley Bean',
      message: 'Liked your post.',
      time: '9:55 AM',
      avatar: 'https://img.freepik.com/free-psd/3d-illustration-with-online-avatar_23-2151303093.jpg?t=st=1745626714~exp=1745630314~hmac=102c24a670eb78b8616fda68d45af27c78bd31929be0b46816769978d887c837&w=740',
      thumbnail: 'https://placeimg.com/100/100/tech',
      type: 'like',
    },
    {
      name: 'Hannah Flores',
      message: 'Liked your post.',
      time: '9:55 AM',
      avatar: 'https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100279.jpg?uid=R3032525&semt=ais_hybrid&w=740',
      thumbnail: 'https://placeimg.com/100/100/tech',
      type: 'like',
    },
    {
      name: 'Tim Marshall',
      message: 'Started following you.',
      time: '8:02 PM',
      avatar: 'https://img.freepik.com/free-psd/3d-rendering-hair-style-avatar-design_23-2151869121.jpg?uid=R3032525&semt=ais_hybrid&w=740',
      showButton: true,
      type: 'follow',
    },
    {
      name: 'Tim Marshall',
      message: 'Liked your post.',
      time: '08:00 AM',
      avatar: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?uid=R3032525&semt=ais_hybrid&w=740',
      thumbnail: 'https://placeimg.com/100/100/tech',
      type: 'like',
    },
  ];

  const filteredData = notifications.filter((item) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Follows') return item.type === 'follow';
    if (activeTab === 'Like & Comments') return item.type === 'like' || item.type === 'comment';
  });

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message}>
          {item.message} <Text style={styles.time}>{item.time}</Text>
        </Text>
      </View>

      {item.showButton && (
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followText}>Follow</Text>
        </TouchableOpacity>
      )}

      {item.thumbnail && (
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <TouchableOpacity key={tab} style={styles.tab} onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            {activeTab === tab && <View style={styles.underline} />}
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
  },
  tab: { alignItems: 'center' },
  tabText: { fontSize: 16, color: '#888' },
  activeTabText: { color: '#007bff', fontWeight: 'bold' },
  underline: {
    marginTop: 4,
    height: 2,
    width: '100%',
    backgroundColor: '#007bff',
  },
  list: { paddingBottom: 10 },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  textContainer: { flex: 1, marginHorizontal: 10 },
  name: { fontWeight: 'bold', fontSize: 14 },
  message: { fontSize: 13, color: '#555' },
  time: { fontSize: 12, color: '#aaa' },
  followButton: {
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  followText: { color: '#fff', fontSize: 13 },
  thumbnail: { width: 40, height: 40, borderRadius: 5, marginLeft: 10 },
});

export default Notification;
