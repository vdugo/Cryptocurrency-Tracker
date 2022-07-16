import React, { useState, useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'

import { useGetCryptosQuery } from '../services/cryptoApi'

const Cryptocurrencies = ( { simplified } ) => {
  const count = simplified ? 10 : 100
  const { data, isFetching } = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState()

  useEffect(() => {
    setCryptos(data?.data?.coins)
  }, [data])

  if (isFetching) return 'Loading...'

  return (
    <>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((crypto) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={crypto.uuid}>
            <Link to={`/crypto/${crypto.uuid}`}>
              <Card title={`${crypto.rank}. ${crypto.name}`}
               extra={<img className="crypto-image" src={crypto.iconUrl}
               hoverable="true" alt={`${crypto.symbol}`}/>}>

                <p>Price: ${millify(crypto.price)}</p>
                <p>Market Cap: ${millify(crypto.marketCap)}</p>
                <p>Daily Change: {millify(crypto.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies