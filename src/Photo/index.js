import React from 'react';
import { Camera, Permissions } from 'expo';
import { View, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import Result from '../Result';
import styles from './styles';
import commonStyles from '../../src/common/styles';
import CameraImg from '../assets/images/camera.png';

export default class Photo extends React.Component {

  state = {
    photo: null,
    permission: null,
  };
  
  async componentWillMount() {
    const { goBack } = this.props.navigation;
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
  
    status === 'granted' ? this.setState({ permission: true }) : goBack();
  }

  /**
   * Take picture
   */
  snap = () => {
    if (this.camera) {
      this.camera.takePictureAsync({
        base64: true,
        quality: 0.2,
      }).then(photo => {
        this.setState({ photo });
      });
    }
  };
  
  render() {
    const { state: { photo, permission }, props: { navigation: { goBack } } } = this;
  
    if (photo) {
      return <Result photo={photo} goBack={goBack} />
    } else if (permission) {
      return (
        <View style={styles.view}>
          <Camera ref={ref => { this.camera = ref; }} style={styles.camera} ratio={'16:9'} autoFocus={Camera.Constants.AutoFocus.on}>
            <View style={styles.buttonView}>
              <TouchableOpacity style={styles.button} onPress={this.snap.bind(this)}>
                <Image style={styles.buttonImage} source={CameraImg} />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    } else {
      return <View style={commonStyles.centerView}>
        <ActivityIndicator size="large" color="#2a57d3" />
      </View>;
    }
  }
}
