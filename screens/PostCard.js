import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';

let posts = require('./temp_posts.json');

export default class StoryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: true,
      post_id: this.props.post.key,
      post_data: this.props.post.value,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', (snapshot) => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === 'light' });
      });
  };

  render() {
    let post = this.state.post_data;
    let images = {
      image_1: require('../assets/image_1.jpg'),
      image_2: require('../assets/image_2.jpg'),
      image_3: require('../assets/image_3.jpg'),
      image_4: require('../assets/image_4.jpg'),
      image_5: require('../assets/image_5.jpg'),
    };
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          this.props.navigation.navigate('PostScreen', {
            post: this.props.post,
          })
        }>
        <SafeAreaView style={styles.droidSafeArea} />
        <View
          style={
            this.state.light_theme
              ? styles.cardContainerLight
              : styles.cardContainer
          }>
          <Image
            source={images[post.preview_image]}
            style={styles.postImage}></Image>
          <View style={styles.titleContainer}>
            <View style={styles.titleTextContainer}>
              <Text
                style={
                  this.state.light_theme
                    ? styles.postCaptionTextLight
                    : styles.postCaptionText
                }>
                {post.caption}
              </Text>
              <Text
                style={
                  this.state.light_theme
                    ? styles.postAuthorTextLight
                    : styles.postAuthorText
                }>
                {post.author}
              </Text>
            </View>
          </View>

          <View style={styles.actionContainer}>
            <View style={styles.likeButton}>
              <Ionicons
                name={'heart'}
                size={RFValue(30)}
                color={this.state.light_theme ? 'black' : 'white'}
              />
              <Text
                style={
                  this.state.light_theme
                    ? styles.likeTextLight
                    : styles.likeText
                }>
                12k
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: '#2f345d',
    borderRadius: RFValue(20),
  },
  cardContainerLight: {
    margin: RFValue(13),
    backgroundColor: 'white',
    borderRadius: RFValue(20),
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: RFValue(0.5),
    shadowRadius: RFValue(5),
    elevation: RFValue(2),
  },
  postImage: {
    resizeMode: 'contain',
    width: '95%',
    alignSelf: 'center',
    height: RFValue(250),
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: 'center',
  },
  titleTextContainer: {
    flex: 0.8,
  },
  iconContainer: {
    flex: 0.2,
  },
  postCaptionText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(25),
    color: 'white',
  },
  postCaptionTextLight: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(25),
    color: 'black',
  },
  postAuthorText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(18),
    color: 'white',
  },
  postAuthorTextLight: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(18),
    color: 'black',
  },
  actionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: RFValue(10),
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#eb3948',
    borderRadius: RFValue(30),
  },
  likeText: {
    color: 'white',
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
  likeTextLight: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
});
