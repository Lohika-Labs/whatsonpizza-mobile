import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  view: {
    flex: 1,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#dfdfdf',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: '#666',
    textAlign: 'left',
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  heading: {
    fontSize: 14,
    color: '#999',
    paddingTop: 2,
    lineHeight: 28,
  },
  text: {
    fontSize: 16,
    color: '#333',
    lineHeight: 26,
  },
  sign: {
    fontSize: 13,
  },
});