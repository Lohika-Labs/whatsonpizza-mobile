import React from 'react';
import { Permissions, ImagePicker } from 'expo';
import { View, ActivityIndicator } from 'react-native';
import Result from '../Result';
import commonStyles from '../../src/common/styles';

export default class Gallery extends React.Component {

  state = {
    photo: null,
  };
  
  async componentWillMount() {
    const { goBack } = this.props.navigation;
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    
    status === 'granted' ? this.pick() : goBack();
  }

  /**
   * Open image gallery
   */
  pick = async () => {
    const { goBack } = this.props.navigation;
  
    let photo = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 0.2,
      mediaTypes: 'Images',
    });

    if (photo.cancelled) {
      goBack();
    } else if (!photo.cancelled) {
      this.setState({ photo });
    }
  };

  render() {
    const { state: { photo }, props: { navigation: { goBack } } } = this;
  
    if (photo) {
      return <Result photo={photo} goBack={goBack} />
    } else {
      return (
        <View style={commonStyles.centerView}>
          <ActivityIndicator size="large" color="#2a57d3" />
        </View>
      );
    }
  }
}
