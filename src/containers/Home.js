import React, { Component } from "react";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import StarRating from "react-bootstrap-star-rating";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      reviews: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const reviews = await this.reviews();
      this.setState({ reviews });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  reviews() {
    return API.get("reviews", "/reviews");
  }

  renderReviewsList(reviews) {
    return [{}].concat(reviews).map(
      (review, i) =>
        i !== 0 ? (
          <LinkContainer
            key={review.reviewId}
            to={`/reviews/${review.reviewId}`}
          >
            <ListGroupItem header={review.content.trim().split("\n")[0]}>
              <StarRating
                defaultValue={review.vote}
                min={0}
                max={5}
                step={0.5}
                readonly
              />
              {"Created: " + new Date(review.createdAt).toLocaleString()}
            </ListGroupItem>
          </LinkContainer>
        ) : (
          <LinkContainer key="new" to="/reviews/new">
            <ListGroupItem>
              <h4>
                <b>{"\uFF0B"}</b> Create a new review
              </h4>
            </ListGroupItem>
          </LinkContainer>
        )
    );
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Revidoo</h1>
        <p>A review app</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    );
  }

  renderReviews() {
    return (
      <div className="reviews">
        <PageHeader>Your Reviews</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderReviewsList(this.state.reviews)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated
          ? this.renderReviews()
          : this.renderLander()}
      </div>
    );
  }
}
