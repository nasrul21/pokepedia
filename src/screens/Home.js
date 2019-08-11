import React from 'react';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PokemonList from 'components/PokemonList';
import { MaterialHeaderButtons, Item } from 'components/MaterialHeaderButtons';
import { clearPokemon, resetPokemon } from 'actions/pokemonAction';

const Home = () => (
  <Container>
    <PokemonList />
  </Container>
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    clearPokemon,
    resetPokemon,
  }, dispatch)
);

const HeaderButton = connect(null, mapDispatchToProps)((props) => {
  const clearPokemon = () => {
    props.clearPokemon();
    props.resetPokemon();
  };

  return (
    <MaterialHeaderButtons>
      <Item title="delete" iconName="delete" onPress={clearPokemon} />
    </MaterialHeaderButtons>
  );
});

Home.navigationOptions = () => ({
  title: 'PokéPedia',
  headerTitleStyle: {
    fontFamily: 'Pokemon Solid',
    color: '#ffc919',
    fontSize: 24,
    textShadowColor: '#345fab',
    textShadowOffset: { width: -3, height: 3 },
    textShadowRadius: 1,
  },
  headerRight: (
    <HeaderButton />
  ),
});

export default Home;
