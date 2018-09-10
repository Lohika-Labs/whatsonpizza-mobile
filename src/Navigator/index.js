import { StackNavigator } from 'react-navigation';
import Home from '../Home';
import Photo from '../Photo';
import Gallery from '../Gallery';
import Url from '../Url';

export default StackNavigator({
  Home: { screen: Home },
  Photo: { screen: Photo },
  Gallery: { screen: Gallery },
  Url: { screen: Url },
});
