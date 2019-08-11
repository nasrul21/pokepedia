import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  List,
  ListItem,
  Text,
  Spinner,
  Content,
  Thumbnail,
  Left,
  Body,
  Right,
  Icon,
} from 'native-base';
import { Alert } from 'react-native';
import { bindActionCreators } from 'redux';
import { fetchPokemon, requestPokemon } from 'actions/pokemonAction';
import { URL_IMAGE_POKEMON } from 'config';
import { debounce, capitalize } from 'lodash';
import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';

const PokemonList = (props) => {
  useEffect(() => {
    if (props.results.length > 0) { return; }
    props.fetchPokemon();
  }, []);

  const { results, loading, isError } = props;

  const renderRow = () => (
    results.map(item => (
      <ListItem thumbnail key={item.id} onPress={() => Alert.alert('Pokemon Info', item.name)}>
        <Left>
          <Thumbnail source={{ uri: `${URL_IMAGE_POKEMON + (item.id)}.png` }} />
        </Left>
        <Body>
          <Text>{capitalize(item.name)}</Text>
        </Body>
        <Right>
          <Icon name="ios-arrow-forward" />
        </Right>
      </ListItem>
    ))
  );

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => (
    layoutMeasurement.height + contentOffset.y >= contentSize.height - 1
  );

  const onScrollDebounce = debounce((nativeEvent) => {
    if (isCloseToBottom(nativeEvent)) {
      props.fetchPokemon();
    }
  }, 100);

  const onScroll = ({ nativeEvent }) => {
    onScrollDebounce(nativeEvent);
  };

  return (
    <Content
      onScroll={onScroll}
    >
      <List>
        {renderRow()}
      </List>
      {loading ? <Spinner /> : null}
      {isError ? <ErrorMessage onButtonPress={props.fetchPokemon} /> : null}
    </Content>
  );
};

PokemonList.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  fetchPokemon: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const {
    results,
    loading,
    isError,
  } = state.pokemon;
  return { results, loading, isError };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchPokemon,
    requestPokemon,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(PokemonList);
