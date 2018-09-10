import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './module';
import List from './List';
import { ScrollView, View, Text, Image, RefreshControl, TouchableOpacity } from 'react-native';
import styles from './styles';
import commonStyles from '../../src/common/styles';
import UndoImg from '../assets/images/undo.png';
import PercentageImg from '../assets/images/percentage.png';

class Result extends React.Component {

  state = {
    open: false,
  };
  
  componentDidMount() {
    this.props.request( this.props.photo.base64 );
  }

  arrSort = arr => arr.sort((a, b) => (a.value - b.value) * -1);

  arrCapitalize = arr => arr.map(item => ({ name: this.capitalize(item.name), value: item.value}));

  arrPercentages = arr => arr.map(item => ({ name: item.name, value: Math.round(item.value * 100)}));

  toArray = obj => Object.keys(obj).map(key => ({ name: key, value: obj[key]}));

  capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

  /**
   * Get most confident guess of pizza type
   * @param list, guesses list
   * @returns {*}
   */
  mostConfident = list => {
    let type = null;
    
    for (let i = 0; i < list.length; i += 1) {
      if (!type || list[i].value > type.value) {
        type = list[i];
      }
    }

    return type && this.capitalize(type.name);
  };
  
  toggle = () => {
    this.setState({ open: !this.state.open });
  };
  
  onRefresh = () => {
    this.props.request( this.props.photo.base64 );
  };

  render() {
    const { open } = this.state;
    const { photo, data: { mxnet, tensorflow, profiler }, error, loading, message, goBack } = this.props;
    
    const name = Array.isArray(mxnet) && Array.isArray(tensorflow) && this.mostConfident([...mxnet, ...tensorflow]);

    return (
      <ScrollView style={styles.scrollView} refreshControl={
        <RefreshControl refreshing={loading} onRefresh={this.onRefresh} colors={[ '#2a57d3' ]} tintColor="#2a57d3" />
      }>
        {photo && photo.uri && <View style={styles.imageView}>
          <Image resizeMode={'contain'} style={styles.image} source={{ uri: photo.uri }} />
        </View>}

        {loading && <Text style={styles.textMain}>Loading...</Text>}

        {error && <Text style={commonStyles.error}>{message}</Text>}

        {!loading && !error && name && <Text style={styles.textMain}>I think this is a {name} Pizza</Text>}
  
        {!loading && !error && !name && <Text style={styles.textMain}>I think this is not a pizza</Text>}

        {open && mxnet && <List title="MXNet" headings={['Type', 'Confidence']} list={this.arrPercentages(this.arrSort(mxnet))} sign="%" />}

        {open && tensorflow && <List title="Tensorflow" headings={['Type', 'Confidence']} list={this.arrPercentages(this.arrSort(tensorflow))} sign="%" />}

        {open && profiler && <List title="Profiler" headings={['Type', 'Time elapsed']} list={this.arrCapitalize(this.toArray(profiler))} sign="s" />}
  
        <View style={styles.footer}>
          {!loading && <TouchableOpacity style={styles.button} onPress={() => goBack()} activeOpacity={.5}>
            <Image style={styles.buttonBackImage} source={UndoImg} />
          </TouchableOpacity>}
          {!loading && !error && name && <TouchableOpacity style={styles.button} onPress={this.toggle} activeOpacity={.5}>
            <Image style={styles.buttonDataImage} source={PercentageImg} />
          </TouchableOpacity>}
        </View>
      </ScrollView>
    );
  }
}

const stateToProps = state => {
  return {
    data: state.result.data,
    error: state.result.error,
    loading: state.result.loading,
    message: state.result.message
  };
};

export default connect(stateToProps, dispatch => bindActionCreators(actions, dispatch))(Result);