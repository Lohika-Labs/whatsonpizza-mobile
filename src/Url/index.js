import React from 'react';
import { Text, Image, View, TouchableOpacity, KeyboardAvoidingView, TextInput, ImageEditor, ImageStore, ActivityIndicator, Clipboard } from 'react-native';
import Result from '../Result';
import styles from './styles';
import commonStyles from '../../src/common/styles';
import UploadImg from '../assets/images/upload.png';

export default class Url extends React.Component {

  state = {
    url: '',
    photo: null,
    loading: false,
    error: false,
  };
  
  componentDidMount () {
    Clipboard.getString().then(text => {
      text.startsWith('http') && this.setState({ url: text });
    });

    this.input && this.input.focus();
  };

  /**
   * Display error message on image download failure
   */
  error = () => {
    this.setState({ loading: false, error: true });
  };

  /**
   * Upload image by url
   * @param url, image path
   */
  upload = url => {
    if (url.trim()) {
      this.setState({ loading: true, error: false });
    
      Image.getSize(url, (width, height) => {
        ImageEditor.cropImage(url, { offset: { x: 0, y: 0 }, size: { width, height } }, uri => {
          ImageStore.getBase64ForTag(uri, base64 => {
            this.setState({ photo: { base64, width, height, uri }, loading: false, error: false });
          }, this.error);
        }, this.error);
      }, this.error);
    }
  };

  render() {
    const { state: { url, photo, loading, error }, props: { navigation: { goBack } } } = this;
  
    if (photo) {
      return <Result photo={photo} goBack={goBack}/>;
    } else if (loading) {
      return <View style={styles.view}>
        <ActivityIndicator size="large" color="#2a57d3" />
      </View>;
    } else {
      return (
        <KeyboardAvoidingView style={styles.view} behavior="padding">
          {error && <Text style={commonStyles.error}>Something went wrong, is URL correct?</Text>}
          <TextInput style={styles.input} value={url} onChangeText={url => this.setState({ url })} ref={ref => this.input = ref} underlineColorAndroid="transparent" />
          <TouchableOpacity style={styles.button} onPress={() => this.upload(url)} activeOpacity={.5}>
            <Image style={styles.buttonImage} source={UploadImg} />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      );
    }
  }
}
