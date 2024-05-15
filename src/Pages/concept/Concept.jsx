import {Layout} from 'antd'
import Logo from '../../Components/logo/Logo';
import Menulist from '../../Components/menulist/Menulist';


const {Sider} = Layout;
const Concept = () => {
    return (
        <Layout>
          <Sider theme= 'dark' className='sidebar'>
            <Logo/>
            <Menulist/>
          </Sider>
        </Layout>
        
      );
};

export default Concept;