import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import LatestProducts from '../components/LatestProducts'
import Category from '../components/Category'
import NewArrivals from '../components/NewArrivals'
import Bestselling from '../components/Bestselling'
import TopSelling from '../components/TopSelling'
import TopRating from '../components/TopRating'


const Home = () => {
  return (
    <div>
      < Navbar />
      < Hero />
      <Category />
      <LatestProducts />
      <Bestselling />
      <TopSelling />
      <TopRating />
    </div>
  )
}

export default Home
