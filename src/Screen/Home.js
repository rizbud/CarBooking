import React, { Component } from "react";
import { 
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  BackHandler,
  TextInput,
  Dimensions
} from "react-native";
import LottieView from "lottie-react-native";
import { Rating } from "react-native-ratings";

import firestore from '@react-native-firebase/firestore'

import AsyncStorage from "@react-native-community/async-storage";

const width = Dimensions.get('screen').width

const format = amount => {
  return Number(amount)
  .toFixed()
  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      hasil: 0,
      cars: [],
      text: ''
    }
  }

  _onBackPress() {
    BackHandler.exitApp()
    return true
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this._onBackPress)
    let data = []
    firestore().collection('cars').get()
    .then((res) => {
      this.setState({hasil: res.size})
      res.forEach((result) => {
        const { automatic, image, name, passengers, price, rating } = result.data()
        data.push({
          id: result.id,
          automatic,
          image,
          name,
          passengers,
          price,
          rating
        })
      })
      this.setState({
        cars: data,
        isLoading: false
      })
    })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._onBackPress)
  }

  signOut = () => {
    AsyncStorage.removeItem('signedIn')
  }

  search = () => {
    this.setState({isLoading: true})
    let data = []
    firestore().collection('cars').where('passengers', '==', this.state.text).get()
    .then((res) => {
      if(res.exist) {
        this.setState({isLoading: false})
        this.setState({hasil: res.size})
        res.forEach((result) => {
          const { automatic, image, name, passengers, price, rating } = result.data()
          data.push({
            id: result.id,
            automatic,
            image,
            name,
            passengers,
            price,
            rating
          })
        })
      } else {
        this.setState({isLoading: false})
        alert('Tidak ada hasil')
      }
    })
  }

  render() {
    const {isLoading, cars} = this.state
    
    return(
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor='#ef553d' barStyle="light-content" />
        <View style={styles.header}>
          {/* <View style={styles.search}>
            <TextInput placeholder="Cari..." onChangeText={(text) => this.setState({text})} style={styles.searchInput} />
            <TouchableOpacity onPress={() => this.search()} style={styles.searchButton}>
              <Text style={styles.searchButtonText}>Cari</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={this.signOut}>
            <Text>Sign Out</Text>
          </TouchableOpacity> */}
          <View style={styles.headerMenu}>
            <TouchableOpacity style={styles.sort} onPress={() => this.signOut()} >
              <Text style={styles.headerText}>Urutkan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filter}>
              <Text style={styles.headerText}>Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
        {isLoading ? (
          <View style={styles.loading}>
            <LottieView source={require('../animations/loading.json')} style={styles.media} autoPlay={true} loop={true} />
          </View>
        ) : (
          <ScrollView>
            <Text style={{fontFamily: 'Ubuntu', fontSize: 14, margin: 5}}>Menampilkan {this.state.hasil} hasil</Text>
              {cars.map((item, i) => (
                <TouchableOpacity style={styles.list} key={i} onPress={() => this.props.navigation.navigate('Detail', {name: item.name, id: item.id, img: item.image})}>
                  <Image source={{uri: item.image}} style={styles.img} />
                  <View style={styles.detail}>
                    <Text style={styles.carName}>{item.name}</Text>
                    <View style={styles.carRating}>
                      <Rating imageSize={16} readonly ratingCount={1} startingValue={item.rating/5} />
                      <Text style={{marginLeft: 5, fontFamily: 'Ubuntu-Medium'}}>{item.rating}</Text>
                    </View>
                    <Text style={styles.carDetail}>{item.automatic ? ('Otomatis') : ('Manual')}</Text>
                    <Text style={styles.carDetail}>{item.passengers} penumpang</Text>
                    <Text style={styles.carDetail}>Mulai dari Rp{format(item.price)}/hari</Text>
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>
        )}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfdfdf',
  },
  header: {
    backgroundColor: '#ef553d'
  },
  headerMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  sort: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
    borderRightWidth: 0.5,
    borderRightColor: '#fff'
  },
  filter: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
    borderLeftWidth: 0.5,
    borderLeftColor: '#fff'
  },
  headerText: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 16,
    color: '#fff'
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  media: {
    width: width-200,
    height: width-200
  },
  list: {
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center'
  },
  img: {
    width: 160,
    height: 100,
    resizeMode: 'stretch',
    borderRadius: 10
  },
  detail: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  carName: {
    fontFamily: "Ubuntu-Medium",
    fontSize: 18
  },
  carRating: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  carDetail: {
    fontFamily: 'Ubuntu',
    fontSize: 15
  }
})

export default Home