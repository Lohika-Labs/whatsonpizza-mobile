import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  imageView: {
    height: 250,
    padding: 15,
    marginBottom: 25,
    backgroundColor: '#fff',
    // shadow
    elevation: 3,
    shadowRadius: 5,
    shadowOpacity: 0.5,
    shadowColor: '#000000',
    shadowOffset: { height: 2, width: 0, },
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  textMainTouchable: {
    marginBottom: 25,
    alignSelf: 'center',
    alignItems: 'center',
  },
  textMain: {
    fontSize: 20,
    color: '#333',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: '5%',
    justifyContent: 'space-around',
  },
  button: {
    height: 45,
    width: '40%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a57d3',
  },
  buttonBackImage: {
    width: 19,
    height: 19,
  },
  buttonDataImage: {
    width: 18,
    height: 18,
  },
});