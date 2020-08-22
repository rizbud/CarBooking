import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  BackHandler,
  Dimensions,
  TextInput,
  Modal,
  ScrollView
} from "react-native";
import { Rating } from "react-native-ratings";
import LottieView from "lottie-react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";

import firestore from "@react-native-firebase/firestore";

const width = Dimensions.get('screen').width

const format = amount => {
  return Number(amount)
  .toFixed()
  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

export default class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      automatic: null,
      image: null,
      name: '',
      passengers: 0,
      price: 0,
      rating: 0,
      modal: false,
      isLoading: true,
      date: new Date(),
      datePicker: false
    }
  }

  componentDidMount() {
    firestore().collection('cars').doc(this.props.route.params.id).get()
    .then((res) => {
      if(res.exists) {
        let car = res.data()
        this.setState({
          automatic: car.automatic,
          name: car.name,
          image: car.image,
          passengers: car.passengers,
          price: car.price,
          rating: car.rating,
          isLoading: false
        })
      }
    })
  }

  _order = () => {
    this.setState({modal: true})
  }

  _onChange = (event, date) => {
    this.setState({
      date: date.toLocaleDateString(),
      datePicker: false
    })
  }

  render() {
    const { automatic, image, name, passengers, price, rating } = this.state
    
    if(this.state.isLoading) {
      return (
        <View style={styles.loading}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
          <LottieView source={require('../animations/loading.json')} style={styles.media} autoPlay={true} loop={true} />
        </View>
      )
    }
    
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Modal visible={this.state.modal} transparent={true} animationType="slide" onRequestClose={() => this.setState({modal: false})}>
          <View style={styles.cons}>
            <View style={styles.modal}>
              <View style={styles.input}>
                <Text style={styles.label}>Nama</Text>
                <TextInput style={styles.textInput} underlineColorAndroid="#6c6c6c" placeholder="Nama Kamu" label="Name" />
              </View>
              <View style={styles.input}>
                <Text style={styles.label}>E-mail</Text>
                <TextInput style={styles.textInput} underlineColorAndroid="#6c6c6c" placeholder="kamu@mail.com" label="Email" keyboardType="email-address" />
              </View>
              <View style={styles.input}>
                <Text style={styles.label}>Nomor Ponsel</Text>
                <TextInput style={styles.textInput} underlineColorAndroid="#6c6c6c" placeholder="081234567890" label="Phone Number" keyboardType="phone-pad" />
              </View>
              <View style={styles.input}>
                <Text style={styles.label}>{this.state.date.toLocaleDateString()}</Text>
                <TouchableOpacity onPress={() => this.setState({datePicker: true})}>
                  <TextInput editable={false} value={this.state.date} underlineColorAndroid="#6c6c6c" label="Date" />
                </TouchableOpacity>
                {this.state.datePicker && (<DateTimePicker mode="date" timeZoneOffsetInMinutes={0} value={this.state.date} minimumDate={this.state.date} onChange={() => this._onChange()} />)}
              </View>
            </View>
          </View>
        </Modal>
        <View style={[styles.main, this.state.modal ? {backgroundColor: 'rgba(0, 0, 0, 0.5)'}: '']}>
          <Image resizeMode='stretch' source={{uri: image}} style={styles.carImage} />
          <View style={styles.detail}>
            <View style={styles.rating}>
              <Rating style={styles.ratingStar} imageSize={18} readonly ratingCount={5} startingValue={rating} />
              <Text style={styles.ratingText}>{rating}/5</Text>
            </View>
          <Text style={styles.carName}>{name}</Text>
            <Text style={styles.priceText}>Rp{format(price)}/hari</Text>
            <View style={{flexDirection: 'row'}}>
              <Icon style={{marginRight: 10}} size={25} name="car" />
              <Text style={styles.carDetail}>Transmisi {automatic ? ('Otomatis') : ('Manual')}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon style={{marginRight: 10}} size={25} name="person" />
              <Text style={styles.carDetail}>Kapasitas {passengers} penumpang</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon style={{marginRight: 10}} size={25} name="cash-outline" />
              <Text style={styles.carDetail}>Jaminan pengembalian dana</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon style={{marginRight: 10}} size={25} name="time" />
              <Text style={styles.carDetail}>Layanan 24/7</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon style={{marginRight: 10}} size={25} name="speedometer" />
              <Text style={styles.carDetail}>Bensin Full</Text>
            </View>
          </View>
        </View>
        <View style={[styles.bottom, this.state.modal ? {backgroundColor: 'rgba(0, 0, 0, 0.5)'}: '']}>
          <TouchableOpacity style={styles.order} onPress={() => this._order()}>
            <Text style={styles.orderText}>Pesan Sekarang</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  media: {
    width: width-200,
    height: width-200
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  cons: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  modal: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: width-10,
    padding: 25
  },
  input: {

  },
  main: {
    flex: 1
  },
  detail: {
    flex: 1,
    margin: 10
  },
  carImage: {
    width: width,
    height: width-120
  },
  carName: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 26
  },
  rating: {
    flexDirection: 'row',
    marginBottom: 5
  },
  ratingStar: {
    marginRight: 5
  },
  ratingText: {
    fontFamily: 'Ubuntu-Medium',
    textAlignVertical: 'center',
    fontSize: 14
  },
  carDetail: {
    fontFamily: 'Ubuntu',
    fontSize: 16,
    marginVertical: 3
  },
  bottom: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingHorizontal: 10,
    elevation: -2,
    backgroundColor: '#fff'
  },
  priceText: {
    color: '#000',
    fontFamily: 'Ubuntu',
    textAlignVertical: 'center',
    fontSize: 20,
    marginTop: 5,
    marginBottom: 15
  },
  order: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#ef553d'
  },
  orderText: {
    color: '#fff',
    fontFamily: 'Ubuntu-Medium',
    textAlign: 'center',
    fontSize: 16
  }
})