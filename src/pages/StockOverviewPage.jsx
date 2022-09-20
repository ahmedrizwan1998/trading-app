import React from 'react'
import AutoComplete from '../components/AutoComplete'
import StockList from '../components/StockList'

function stockOverviewPage() {
  return (
    <div>
      Stock Overview Page
      <AutoComplete />
      <StockList />
    </div>
  )
}

export default stockOverviewPage
