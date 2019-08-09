import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Reviews.css";
import StarRating from "react-bootstrap-star-rating";

export default class Reviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      isDeleting: null,
      review: null,
      content: "",
      vote: null
    };
  }

  async componentDidMount() {
    try {
      const review = await this.getReview();
      const { content, vote } = review;

      this.setState({
        review,
        content,
        vote
      });
    } catch (e) {
      alert(e);
    }
  }

  getReview() {
    return API.get("reviews", `/reviews/${this.props.match.params.id}`);
  }

  saveReview(review) {
    return API.put("reviews", `/reviews/${this.props.match.params.id}`, {
      body: review
    });
  }

  deleteReview() {
    return API.del("reviews", `/reviews/${this.props.match.params.id}`);
  }

  validateForm() {
    return this.state.content.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleVoteChange = event => {
    this.setState({
      vote: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    if (this.state.vote == null) {
      alert(`Please vote.`);
      return;
    }

    this.setState({ isLoading: true });

    try {
      await this.saveReview({
        content: this.state.content,
        vote: this.state.vote || this.state.review.vote
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  };

  handleDelete = async event => {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) {
      return;
    }

    this.setState({ isDeleting: true });

    try {
      await this.deleteReview();
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isDeleting: false });
    }
  };

  render() {
    return (
      <div className="Reviews">
        {this.state.review && (
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="content">
              <FormControl
                onChange={this.handleChange}
                value={this.state.content}
                componentClass="textarea"
              />
            </FormGroup>
            <FormGroup controlId="vote">
              <ControlLabel>vote</ControlLabel>
              <StarRating
                onRatingChange={this.handleVoteChange}
                defaultValue={this.state.vote}
                min={0}
                max={5}
                step={0.5}
              />
            </FormGroup>
            <LoaderButton
              block
              bsStyle="primary"
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Save"
              loadingText="Saving…"
            />
            <LoaderButton
              block
              bsStyle="danger"
              bsSize="large"
              isLoading={this.state.isDeleting}
              onClick={this.handleDelete}
              text="Delete"
              loadingText="Deleting…"
            />
          </form>
        )}
      </div>
    );
  }
}
