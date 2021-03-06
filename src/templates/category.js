import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Wrapper from '../components/Wrapper'
import Header from '../components/Header'
import Subline from '../components/Subline'
import SectionTitle from '../components/SectionTitle'
import Article from '../components/Article'
import SEO from '../components/SEO'
import config from '../../config'
import { categoriesUrl, categoryUrl } from '../modules/url'

const Category = ({ pageContext: { category }, data: { allMdx } }) => {
  const { nodes, totalCount } = allMdx
  const subline = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } com a tag "${category}"`

  const firstAudioTitles = nodes
    .slice(0, 6)
    .map((post) => `"${post.frontmatter.title}"`)
    .join(', ')

  return (
    <Layout customSEO>
      <Wrapper>
        <SEO
          path={categoryUrl(category)}
          title={`Categoria: ${category} | ${config.siteTitle}`}
          description={`Áudios do WhatsApp para escutar e baixar classificados como "${category}". Áudios como: ${firstAudioTitles}.`}
        />
        <Header />

        <SectionTitle as="h1">Categoria &ndash; {category}</SectionTitle>
        <Subline sectionTitle>
          {subline} (Ver <Link to={categoriesUrl()}>todas as categorias</Link>)
        </Subline>
        {nodes.map((post) => (
          <Article
            title={post.frontmatter.title}
            date={post.frontmatter.date}
            audio={post.frontmatter.audio}
            excerpt={post.excerpt}
            slug={post.fields.slug}
            categories={post.frontmatter.categories}
            key={post.fields.slug}
          />
        ))}
      </Wrapper>
    </Layout>
  )
}

export default Category

Category.propTypes = {
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
      totalCount: PropTypes.number.isRequired,
    }),
  }).isRequired,
}

export const postQuery = graphql`
  query CategoryPage($category: String!) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { eq: $category } } }
    ) {
      totalCount
      nodes {
        frontmatter {
          title
          audio
          date(formatString: "DD/MM/YYYY")
          categories
        }
        fields {
          slug
        }
        excerpt(pruneLength: 200)
        timeToRead
      }
    }
  }
`
