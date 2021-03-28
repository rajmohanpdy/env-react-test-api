import React from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY  
const API_URL = `http://newsapi.org/v2/everything?q=ai&apiKey=${API_KEY}`

class HideKey extends React.Component {
  state = {
    articles: [],
    isLoading: true,
    errors: null
  };
  

  getArticles() {
    axios
      .get(
        API_URL
      )
      .then((response) =>
        response.data.articles.map((article) => ({
          date: `${article.publishedAt}`,
          title: `${article.title}`,
          url: `${article.url}`,
          author: `${article.author}`
        }))
      )
      .then((articles) => {
        this.setState({
          articles,
          isLoading: false
        });
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.getArticles();
  }

  render() {
    const { isLoading, articles } = this.state;
    return (
      <React.Fragment>
        <h2>#AI</h2>
        <div>
          {!isLoading ? (
            articles.map((article) => {
              const { date, title, url, author } = article;
              return (
                <div key={title}>
                  <p>{date}</p>
                  <p>{title}</p>
                  <p>{url}</p>
                  <p>{author}</p>
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </React.Fragment>
    );
  }
}
export default HideKey;
