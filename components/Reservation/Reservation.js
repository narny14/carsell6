import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const cars = [
  {
    id: '1',
    name: 'INFINITI QX80',
    image: require('../../assets/car2.png'),
    battery: 12.5,
    transmission: 'A',
    seats: 7,
    price: 1200,
  },
  {
    id: '2',
    name: 'INFINITI QX80',
    image: require('../../assets/car1.png'),
    battery: 10,
    transmission: 'A',
    seats: 7,
    price: 1500,
  },
  {
    id: '3',
    name: 'INFINITI QX80',
    image: require('../../assets/car3.png'),
    battery: 12.5,
    transmission: 'A',
    seats: 5,
    price: 1300,
  },
  {
    id: '4',
    name: 'INFINITI QX80',
    image: require('../../assets/car2.png'),
    battery: 12.5,
    transmission: 'A',
    seats: 7,
    price: 1200,
  },
  {
    id: '5',
    name: 'INFINITI QX80',
    image: require('../../assets/car1.png'),
    battery: 10,
    transmission: 'A',
    seats: 7,
    price: 1500,
  },
  {
    id: '6',
    name: 'INFINITI QX80',
    image: require('../../assets/car3.png'),
    battery: 12.5,
    transmission: 'A',
    seats: 5,
    price: 1300,
  },
];

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {cars.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.title}>{item.name}</Text>
              <MaterialIcons name="favorite-border" size={24} color="lightgray" />
            </View>
            <Image source={item.image} style={styles.carImage} resizeMode="contain" />
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <MaterialIcons name="battery-full" size={20} color="gray" />
                <Text style={styles.infoText}>{item.battery}</Text>
              </View>
              <View style={styles.infoItem}>
                <MaterialIcons name="settings" size={20} color="gray" />
                <Text style={styles.infoText}>{item.transmission}</Text>
              </View>
              <View style={styles.infoItem}>
                <MaterialIcons name="event-seat" size={20} color="gray" />
                <Text style={styles.infoText}>{item.seats}</Text>
              </View>
              <Text style={styles.price}>${item.price}/day</Text>
            </View>
            <View style={styles.separator} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  card: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  carImage: {
    width: '100%',
    height: 120,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  infoText: {
    marginLeft: 5,
    fontSize: 14,
    color: 'gray',
  },
  price: {
    marginLeft: 'auto',
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginTop: 10,
  },
});
