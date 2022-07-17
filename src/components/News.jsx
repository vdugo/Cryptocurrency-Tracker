import React, { useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'

const { Text, Title } = Typography
const { Option } = Select

const demoImage = 'https://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg'

const News = ({ simplified }) => {
  const count = simplified ? 6 : 12
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory: 'Cryptocurrency', count})

  if (!cryptoNews?.value) return 'Loading...'

  return (
    <Row gutter={[24, 24]}>
      {cryptoNews?.value.map(
        (article, i) => 
      (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={article.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {article.name}
                </Title>
                <img style={{maxWidth: '200px', maxHeight: '100px'}} src={article?.image?.thumbnail?.contentUrl || demoImage} alt="news"/>
              </div>
              <p>
                {article.description > 100 ? `${article.description.substring(0,100)}...` : article.description}
              </p>
              <div className="provider-container">
                <Avatar src={article.provider[0]?.image?.thumbnail?.contentUrl || demoImage} />
                <Text className="provider-name">{article.provider[0]?.name}</Text>
              </div>
              <Text>{moment(article.datePublished).startOf('ss').fromNow()}</Text>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News