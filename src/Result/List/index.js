import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default class List extends React.Component {

  render() {
    const { title, headings, list, sign } = this.props;

    return (
      <View style={styles.view}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.row}>
          {headings.map(item => <Text style={[styles.text, styles.heading]} key={`heading-${item}`}>{item}</Text>)}
        </View>
        {list.map(item =>
          <View style={styles.row} key={`key${item.name}`}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.value}<Text style={styles.sign}>{sign}</Text></Text>
          </View>
        )}
      </View>
    );
  }
}