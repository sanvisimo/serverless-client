import React, { Component } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import StarRating from "react-bootstrap-star-rating";
import "./NewReview.css";

export default class NewReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      content: "",
      vote: null
    };
  }

  createReview(review) {
    return API.post("reviews", "/reviews", {
      body: review
    });
  }

  validateForm() {
    return this.state.content.length > 0;
  }

  handleChange = event => {
    console.log("ev: ", event.target.id, event.target.value);
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
      alert(`Please select a vote.`);
      return;
    }

    this.setState({ isLoading: true });

    try {
      await this.createReview({
        vote: this.state.vote,
        content: this.state.content
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <div className="NewReview">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="vote">
            <ControlLabel>Vote</ControlLabel>
            <StarRating
              onRatingChange={this.handleVoteChange}
              defaultValue={this.state.vote}
              min={0}
              max={5}
              step={0.5}
            />
          </FormGroup>
          <FormGroup controlId="content">
            <FormControl
              onChange={this.handleChange}
              value={this.state.content}
              componentClass="textarea"
            />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
        </form>
      </div>
    );
  }
}
