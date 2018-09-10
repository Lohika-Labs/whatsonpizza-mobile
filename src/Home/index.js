import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import commonStyles from '../../src/common/styles';
import logoImg from '../assets/images/logo.png';

export default class Home extends React.Component {
  
  static navigationOptions = {
    title: 'Whats On Pizza',
  };
  
  render() {
    const { navigate } = this.props.navigation;
    
    return (
      <View style={commonStyles.centerView}>
        <Image style={styles.logoImage} source={logoImg} />

        <TouchableOpacity style={styles.menuItem} onPress={() => navigate('Photo')} activeOpacity={.5}>
          <Text style={styles.menuItemText}>Take a photo</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.menuItem} onPress={() => navigate('Gallery')} activeOpacity={.5}>
          <Text style={styles.menuItemText}>Choose from gallery</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.menuItem} onPress={() => navigate('Url')} activeOpacity={.5}>
          <Text style={styles.menuItemText}>Enter photo URL</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
