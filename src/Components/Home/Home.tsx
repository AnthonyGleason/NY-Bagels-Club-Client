import React, {useEffect, useState} from 'react';
import Sidebar from './Sidebar/Sidebar';
import './Home.css';
import StoreItems from './StoreItems/StoreItems';
import Footer from './Footer/Footer';
import storefrontImg from '../../Assets/storefront.jpeg'
import InitLoad from '../InitLoad/InitLoad';

export default function Home(){
  const [totalCartItems,setTotalCartItems] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  if (isLoaded){
    return(
      <section className='home'>
        <section className='about-us'>
          <h3>Brendel's Bagels</h3>
          <h3>Made With Love</h3>
          <p>
            We offer gourmet food and catering solutions at three convenient locations across Long Island; in Hauppauge, Glen Cove and Syosset. We offer traditional tastes with refreshing creativity and use only the freshest ingredients in everything we prepare.
          </p>
          <img src={storefrontImg} alt='store front' />
        </section>
        <Sidebar totalCartItems={totalCartItems} setTotalCartItems={setTotalCartItems} />
        <div className='shop-wrapper'>
          <h3>Web Store</h3>
          <StoreItems totalCartItems={totalCartItems} setTotalCartItems={setTotalCartItems} />
        </div>
        <Footer />
      </section>
    )
  }else{
    return(
      <InitLoad setIsLoaded={setIsLoaded} />
    )
  }
}