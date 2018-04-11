import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Segment, Loader, Message } from "semantic-ui-react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

import CreateMovie from "./CreateMovie";

class Create extends Component {
  render() {
    if (this.props.allRatings.loading ||
      this.props.allGenres.loading ||
      this.props.allTags.loading) {
      return (
        <Container>
          <Segment>
            <Loader>Loading</Loader>
          </Segment>
        </Container>
      );
    } else if (this.props.allRatings.error ||
      this.props.allGenres.error ||
      this.props.allTags.error) {
      return (
        <Container>
          <Message negative>
            <Message.Header>Error</Message.Header>
            {this.props.allRatings.error && (<p>{this.props.allRatings.error.message} Ratings</p>)}
            {this.props.allGenres.error && (<p>{this.props.allGenres.error.message} Genres</p>)}
            {this.props.allTags.error && (<p>{this.props.allTags.error.message} Tags</p>)}
          </Message>
        </Container>
      );
    }
    return (
      <CreateMovie
        allRatings={this.props.allRatings}
        allGenres={this.props.allGenres}
        allTags={this.props.allTags}
        addMovie={this.props.addMovie}
      />
    );
  }
}

Create.propTypes = {
  allRatings: PropTypes.object.isRequired,
  allGenres: PropTypes.object.isRequired,
  allTags: PropTypes.object.isRequired,
  addMovie: PropTypes.func.isRequired,
};

const ALL_GENRES_QUERY = gql`
  query AllGenresQuery {
    allGenres {
      id
      code
      description
    }
  }
`;

const ALL_RATINGS_QUERY = gql`
  query AllRatingsQuery {
    allRatings {
      id
      rating
      description
    }
  }
`;

const ALL_TAGS_QUERY = gql`
  query AllTagsQuery {
    allTags {
      id
      category
      tag
      name
      description
    }
  }
`;

const ADD_MOVIE_MUTATION = gql`
  mutation AddMovieMutation($title: String!, $prodCode: String!, $genre: String!, $rating: String!, $tags: [String]!) {
    addMovie(title: $title, prodCode: $prodCode, genre: $genre, rating: $rating, tags: $tags) {
      id
    }
  }
`;

export default compose(
  graphql(ALL_GENRES_QUERY, { name: "allGenres" }),
  graphql(ALL_RATINGS_QUERY, { name: "allRatings" }),
  graphql(ALL_TAGS_QUERY, { name: "allTags" }),
  graphql(ADD_MOVIE_MUTATION, { name: "addMovie" }),
)(Create);
