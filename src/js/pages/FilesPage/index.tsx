import Loadable from 'react-loadable';
import FullscreenLoader from '../../compositions/FullscreenLoader/FullscreenLoader';

const LoadableHomePage = Loadable({
    loader: () => import('./FilesPage'),
    loading: FullscreenLoader,
});


export default LoadableHomePage;
